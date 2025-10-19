+++
title = "Home Server: Network"
date = 2025-10-19
external_links_target_blank = true
[extra]
featured = true
toc = true
+++

<!-- Move to script -->
<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
  import elkLayouts from "https://cdn.jsdelivr.net/npm/@mermaid-js/layout-elk@0/dist/mermaid-layout-elk.esm.min.mjs";
  // load and register the engine
  mermaid.registerLayoutLoaders(elkLayouts);
  mermaid.initialize({ startOnLoad: true });
</script>

{% alert(note=true) %}
This post is part of a living documentation series I'm working on for my home network setup. The purpose is to:

1. Document my network setup for myself or others to replicate
2. Share insights, challenges, fun, and learnings along the way
3. Practice my writing
{% end %}

**In this post, I'll be discussing my network setup**. I'll explain my current dual-router situation, adding DNS filtering with Pi-hole, and mitigating DNS hijacking with Cloudflare DNS-over-HTTPS.

---

## The Routers

- **Primary**: Asus AX-6000 (running Asus Merlin firmware)
- **ISP**: Virgin Media Fiber Hub 5x

The Asus is the primary router and serves all clients at home, though defers to the Pi-Hole for DHCP and DNS. More on this [later](#dns-filtering-with-pi-hole).

### So, why the extra router?

#### **If you mean the Asus one**

I like being able to control things like DNS, splitting networks by wireless bands, and other fun settings that most ISPs don't allow.

Importantly, **using my own router means that I can move my network to a new home or ISP without needing to re-configure anything.**

#### **If you mean the ISP one, well...**

In Ireland, most 1Gb+ fiber broadband providers install an <abbr title="Optical Network Terminator">ONT</abbr> in the premises to terminate the fibre connection to an ethernet cable; this means that you are free to use whichever router you like with these providers.

{{mermaiddiagram(file_path="content/projects/diagrams/home-server/virgin-media.mmd")}}

Unfortunately, Virgin Media Ireland decided that it's more economical to _not_ install an ONT in your home—which would technically work for any other provider of broadband in the country—but instead provide a router that accepts the fiber connection directly. This capable little router is _also a <abbr title="10-Gigabit-capable (symmetric) passive optical network">XGS-PON</abbr> modem_ ([not to be foolishly confused with XG-PON](https://web.archive.org/web/20230907074628/https://www.nokia.com/blog/xg-pon-or-xgs-pon-dont-make-costly-spelling-mistake/)).

Providing a router/modem combo is not unusual for Virgin Media—their coax-based home routers (_"Super Hub"_) also include a DOCSIS modem—however, the Hub 5x differs in one crucial way: **it does not include a dedicated modem mode**.

Although controls seem to exist in the router itself, the option is explicitly hidden for my device version (`mv3`, apparently):

```js
if (globalSettings.deviceGeneration == "mv3") {
  $('ul.side-menu li:has(a[data-content$="modemmode"])').remove();
}
```

Exposing the settings panel by removing the previous `.remove()` statement is promising, but sadly returns a `403` with a divine `"Bridge mode is forbidden!"` message if you try to apply the settings.

![Virgin Media's router settings page showing an exposed "modem mode" panel that returns an error on trying to enable it](modem-mode.png#no-hover)

So, for the time being, I've disabled as much as I can on the 5x (Wi-Fi, DHCP, Firewall, etc.) and enabled DMZ for the Asus router behind it. It's a shame that the software is so restrictive; it really is a capable modem/router built for the 1Gb+ era.

## Making things a little more private

I take a generally relaxed approach to privacy, but I still feel it's important to have at least _some_ minimum level of control over what companies and advertisers collect from me. I'm not going to de-Google my life (_yet_), but I'm really not a fan of my LG TV trying to phone home thousands of times per hour with analytics about what I'm watching and God-knows-what-else.

A bigger concern than advertisers, though, is my ISP. While I can't hide everything, HTTPS and using a trusted DNS provider can go a long way in preventing basic measures of tracking and analytics data an ISP might be interested in collecting.

### DNS filtering with Pi-hole

[Pi-hole](https://pi-hole.net/) is the de-facto standard in DNS filtering (e.g., ad/tracking blocking). Its efficacy in actually blocking tracking is [debated](https://www.reddit.com/r/raspberry_pi/comments/111gkih/are_piholes_still_relevant/), and while it can't block paywalls or YouTube ads, it still provides at least a baseline level of filtering.

I run [Pi-hole via Docker](https://docs.pi-hole.net/docker/) on my home server.

<details>
<summary>I also use the Pi-hole for DHCP.</summary>
<p>
I'm still undecided on this in the long-term, but I haven't found it limiting for my use cases. It's fast, easy to configure, and means I can separate leases from my router.

<b>The downside:</b> if my server is down, clients have a hard time connecting!

</details>

**Maybe more valuable than blocking by-default, it gives visibility into what is happening on my network**; I sleep easier at night knowing I can review exactly what (and how often) devices on my network are reaching out to, and that I'm empowered to block that if I like.

However, I noticed that sometimes, my requests weren't being filtered as expected...

### DNS Hijacking

Usually, setting a custom DNS like `1.1.1.1` or `8.8.8.8` on your device or router is enough to bypass whatever your ISP might provide by default. However, I still have an [active Virgin Media router](#if-you-mean-the-isp-one-well) running at the entrypoint of my network, and unfortunately, these are [known to hijack DNS queries](https://community.virginmedia.com/discussions/Wireless/hub-5-intercepting-all-dns-queries/5378038); _conveniently unavailable_, a "modem mode" would likely prevent this at least at the router-level.

With the router in place, a DNS request `1.1.1.1` might be modified to instead hit a Virgin Media owned address. Using [Cloudflare's 1.1.1.1 help page](https://one.one.one.one/help/), I confirmed that **about half the time, my requests to `1.1.1.1` would resolve as Virgin Media instead of Cloudflare**!

No good.

### Working around DNS Hijacking

DNS-over-HTTPS (DoH) allows you to perform—as the name suggests—DNS requests over HTTPS. **Crucially** these are are encrypted as other HTTPS requests would be, meaning an observer or bad actor (like an ISP) can no longer see what domains you are trying to resolve.

Unfortunately, being a relatively new web technology, adoption is good but not great. Recent versions of Windows 11 support DoH, but you will struggle to find support in my client applications, devices like smart TVs and consoles, and the rest of what you're likely to connect to your network.

### Providing DNS-over-HTTPS to all devices on the network

Rather than trying to configure each device to use DoH individually, we can **proxy local DNS requests to a DoH endpoint**. Since I'm already running Pi-hole on my home server as a DNS server for clients, I just need to configure it to point to Cloudflare's DoH endpoint (my choice for DNS provider).

This is well-documented by [Pi-hole already](https://docs.pi-hole.net/guides/dns/cloudflared/), but my setup differs in that **I prioritize a Docker for services whenever available**. Luckily, someone already [dockerized the Cloudflared proxy service](https://github.com/crazy-max/docker-cloudflared) (thanks [@crazy-max](https://github.com/crazy-max)!):

```yaml
services:
  cloudflare-doh:
    image: crazymax/cloudflared:latest
    network_mode: "host"
    ports:
      - target: 5054
        published: 5054
        protocol: udp
      - target: 49313
        published: 49313
        protocol: tcp
    environment:
      - "TZ=Europe/Paris"
      - "TUNNEL_DNS_UPSTREAM=https://1.1.1.1/dns-query,https://1.0.0.1/dns-query"
      - "TUNNEL_DNS_PORT=5054"
      - "TUNNEL_METRICS=0.0.0.0:49313"
    restart: always
```

Now, all I need to do is point Pi-hole to the Cloudflare DoH container at `#5054`:

```yaml
services:
  pihole:
    image: pihole/pihole:latest
    container_name: pihole
    hostname: pihole
    network_mode: "host"
    environment:
      # ...
      FTLCONF_dns_upstreams: "127.0.0.1#5054"
    # ...
```

and voila! Any devices which use Pi-hole as a DNS server are treated to DNS-over-HTTPS, no hijacking or snooping allowed:

![The result of a DNS test performed on 1.1.1.1/help, showing DNS-over-HTTPS being successful](cf-doh.png#no-hover)

## Conclusion

In the next post in the series, I'll dive deep into the home server itself, some of the public-facing services I run on it, and how I make these accessible to the world despite CG-NAT (thanks again, VM Ireland).
