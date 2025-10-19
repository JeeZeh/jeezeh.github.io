+++
title = "My home server and entertainment setup"
template = "mermaid.html"
date = 2025-10-14
external_links_target_blank = true
+++

## Overview

This is living documentation of my home network setup. The diagram below serves as both a visual reference and a table of contents—click on nodes to jump to detailed sections.

## {% mermaiddiagram(full_bleed=true) %}

---

config:
layout: elk
look: classic
theme: light

---

flowchart TB
ISP[Virgin Media ISP]
CFDNS[Cloudflare DNS-over-HTTPS]:::external
PLAYIT[PlayIt.gg Service]:::external

    ROUTER[Router]
    PIHOLE[Pi-Hole]:::docker
    SERVER[Home Server]
    PS3[PS3 Network Server]:::docker
    HUE[Hue Analytics]:::bareMetal
    MC[Minecraft Server]:::docker
    IMMICH[Immich]:::docker
    AUDIOBOX[Audiobox]:::docker

    REACTRAIL[React Rail]:::docker
    TAILSCALE[Tailscale]:::docker
    CFTUNNEL[Cloudflare Tunnel]:::external

    TRAINS[trains.jesse.ie]:::public
    REACTRAIL_DOMAIN[reactrail.ie]:::public
    IMMICH_DOMAIN[immich.jesse.ie]:::public
    PLAYIT_ENDPOINT[PlayIt.gg Endpoint]:::public
    IMMICH_APP[Immich App]:::public

    MC_CLIENT[Minecraft Client]:::public
    TS_CLIENTS[Tailscale Clients]:::public

    ISP --> ROUTER
    ROUTER --> SERVER
    ROUTER -->|DHCP| PIHOLE
    PIHOLE -.DNS/DoH.-> CFDNS

    TAILSCALE -->|advertises 192.168.0.0/16| ROUTER

    PS3 -->|runs on| SERVER
    HUE -->|runs on| SERVER
    AUDIOBOX -->|runs on| SERVER

    TAILSCALE -->|runs on| SERVER
    CFTUNNEL -->|runs on| SERVER
    REACTRAIL -->|runs on| SERVER
    IMMICH -->|runs on| SERVER
    MC -->|runs on| SERVER
    PLAYIT -->|runs on| SERVER

    TRAINS -.resolves.-> CFTUNNEL
    REACTRAIL_DOMAIN -.resolves.-> CFTUNNEL
    CFTUNNEL -->|exposes| REACTRAIL

    IMMICH_DOMAIN -.resolves.-> CFTUNNEL
    CFTUNNEL -->|exposes| IMMICH

    PLAYIT -->|exposes| MC

    PLAYIT_ENDPOINT --> PLAYIT
    TS_CLIENTS --> TAILSCALE
    IMMICH_APP --> IMMICH_DOMAIN
    MC_CLIENT -->|connects| PLAYIT_ENDPOINT

    classDef docker fill:#3b82f6,stroke:#1e40af,color:#fff
    classDef bareMetal fill:#6b7280,stroke:#374151,color:#fff
    classDef network fill:#a78bfa,stroke:#7c3aed,color:#fff
    classDef public fill:#10b981,stroke:#059669,color:#fff
    classDef external fill:#f97316,stroke:#ea580c,color:#fff

    click ROUTER "#router"
    click PIHOLE "#pi-hole"
    click PS3 "#ps3-network-server"
    click HUE "#hue-analytics"
    click MC "#minecraft-server"
    click IMMICH "#immich"
    click REACTRAIL "#react-rail"
    click AUDIOBOX "#audiobox"
    click TAILSCALE "#tailscale"
    click CFTUNNEL "#cloudflare-tunnel"

{% end %}

## Network Components

### Routers

**Primary**: Asus AX-6000 (running Asus Merlin firmware)
**ISP**: Virgin Media Fiber Hub (5x)

The Asus is the primary router and serves all clients at home, though defers to the Pi-Hole for DHCP and DNS. More on this [later](#pi-hole).

> So, why the extra router?

**If you mean the Asus one:** I like being able to control things like DNS, splitting networks by wireless bands, and other fun settings that most ISPs don't allow. And importantly, **using my own router means that I can move my network to a new home or ISP without needing to re-configure anything.**

**If you mean the ISP one, well...**

In Ireland, most 1Gb+ fiber broadband providers install an <abbr title="Optical Network Terminator">ONT</abbr> in the premises to terminate the fibre connection to an ethernet cable; this means that you are free to use whichever router you like with these providers.

## {% mermaiddiagram() %}

---

config:
layout: elk
look: classic
theme: light

---

graph TB
ISP[Virgin Media ISP]

subgraph House
TP[Termination Point]
ONT[Optical Network Terminal]
Router[Router]
Outlets[[sockets]]
end

ISP -->|FTTP| TP
TP -->|fiber cable| ONT
Outlets -->|power|Router
Outlets -->|power|ONT

{% end %}

Unfortunately, Virgin Media Ireland decided that it's more economical (but probably more wasteful) to _not_ install an ONT in your home—which would technically work for any other provider of broadband in the country—but instead provide a router that accepts the fiber connection directly. This capable little router (the _"Hub 5x"_) is _also a modem_, by way of its on-board <abbr title="10-Gigabit-capable (symmetric) passive optical network">XGS-PON</abbr> terminal ([not to be foolishly confused with XG-PON](https://web.archive.org/web/20230907074628/https://www.nokia.com/blog/xg-pon-or-xgs-pon-dont-make-costly-spelling-mistake/)).

Providing a router/modem combo is not unusual for Virgin Media—their coax-based home routers (_"Super Hub"_) also include a DOCSIS modem—however, their Hub5x differs in one crucial way: **it does not include a dedicated modem mode**.

Although controls seem to exist in the router itself, the option is explicitly hidden for my device version (`mv3`, apparently):

```js
if (globalSettings.deviceGeneration == "mv3") {
  $('ul.side-menu li:has(a[data-content$="modemmode"])').remove();
}
```

Exposing the settings panel by removing the previous `.remove()` statement is promising, but sadly returns a `403` with a divine `"Bridge mode is forbidden!"` message if you try to apply the settings.

![alt text](modem-mode.png#no-hover)

So, for the time being, I've disabled as much as I can on the 5x (Wi-Fi, DHCP, Firewall, etc.) and enabled DMZ for the Asus router behind it.

### Pi-Hole

**Image:** `pihole/pihole`

Provides DNS-over-HTTPS via Pi-Hole, using a DNS-over-HTTPS upstream connection to Cloudflare for improved privacy and security.

### Primary Server

#### Bare Metal Services

##### PS3 Network Server

**Tags:** #personal-project

**Docker:** `ghcr.io/shawnjns/ps3netsrv`

A personal project providing network server functionality for PS3 systems.

##### Hue Analytics

**Tags:** #personal-project #aws #rust

**Stack:** Rust/Django + DynamoDB

A personal project for analytics, built with Rust and Django, utilizing AWS DynamoDB for data storage.

##### Minecraft Server

**Server Image:** `itzg/minecraft-server`  
**Backup Image:** `itzg/mc-backup`

Running a Minecraft server with automated backups. Getting around CG-NAT (Carrier-Grade NAT) using PlayIt.gg for external access, which provides TCPUDP support through their endpoint service.

#### Docker Services

##### Immich

**Tags:** #docker  
**Image:** `ghcr.io/immich-app/immich-server`  
**Links:** [GitHub](https://github.com/immich-app/immich-app)

Photo management and backup solution. Server accessible via Cloudflare tunnel, allowing the mobile app to connect from anywhere.

##### React Rail

**Tags:** #docker #react #personal-project  
**Links:** [GitHub](https://github.com/jessepcc/react-rail)

A personal project built with React. Hosted at reactrail.ie and exposed via Cloudflare tunnel.

##### Audiobox

**Image:** `ghcr.io/linuxserver/lidarr`

Music collection manager (Lidarr) for organizing and managing audio files.

### Network Services

#### Tailscale

**Image:** `tailscale/tailscale`

Provides direct SSH and home network access remotely. Agents advertise 102.10d.0.x IPv4 addresses on the network, allowing me to connect to and manage any devices on the home network remotely.

#### Cloudflare Tunnel

**Image:** `cloudflare/cloudflared`

Used to expose services to the public internet behind Cloudflare. This allows me to host services on my domains (jesse.ie, reactrail.ie) without opening ports directly on my router, providing an additional layer of security.

### Public Access

#### jesse.ie

_Coming soon_

#### reactrail.ie

_Coming soon_

#### PlayIt.gg Endpoint

Used to work around CG-NAT (Carrier-Grade NAT) limitations for the Minecraft server. PlayIt.gg provides TCPUDP support, creating a publicly accessible endpoint that tunnels traffic to the Minecraft server running on my local network.

---

## TODO

### Phase 1: Proof of Concept (Mermaid)

- [x] Create initial Mermaid diagram structure
  - [x] Map ISP router → Personal router → Server relationships
  - [x] Add subgraph for server (bare metal vs Docker services)
  - [x] Include DHCP and DNS/DoH connections to Cloudflare
  - [x] List connected devices
  - [x] Add click events linking to sections
- [x] Integrate Mermaid into Zola
  - [x] Add mermaid.js to base template or create shortcode
  - [x] Add CSS for max-width constraint (`.mermaid { max-width: 800px; margin: 0 auto; }`)
  - [x] Test rendering in local dev environment
  - [x] Test mobile responsiveness
- [ ] Write initial content
  - [ ] Document router setup
  - [ ] Document server setup (bare metal services)
  - [ ] Document Docker stack
  - [ ] Document network configuration (Pi-Hole, DNS, DoH)
  - [ ] Document Tailscale remote access
  - [ ] Document Cloudflare Tunnel setup

**Note on Mermaid limitations:**

- Cannot constrain horizontal diagram width directly (layout engine is rigid)
- Scaling via CSS only scales the rendered image, doesn't reflow layout
- Limited mobile responsiveness
- Consider React Flow if mobile readability becomes an issue

### Phase 2: Enhancement (React Flow - Recommended)

- [ ] Design React Flow implementation
  - [ ] Choose integration approach (standalone page vs embedded component)
  - [ ] Design node styling to mimic Obsidian canvas aesthetic
  - [ ] Plan custom node types (server, router, service, device)
  - [ ] Set max node widths for better mobile experience
  - [ ] Implement responsive layout constraints
- [ ] Build interactive diagram
  - [ ] Implement drag-and-drop canvas
  - [ ] Add click-to-navigate functionality
  - [ ] Style nodes and edges for visual hierarchy
  - [ ] Add mobile-optimized view/controls
- [ ] Integrate with Zola
  - [ ] Deploy as standalone artifact or embedded iframe
  - [ ] Ensure cross-linking works with static blog posts

**React Flow advantages over Mermaid:**

- Full control over node dimensions and spacing
- True responsive layouts
- Better mobile experience
- More interactive capabilities

### Ongoing Maintenance

- [ ] Keep diagram updated as network changes
- [ ] Add new services/devices as they're deployed
- [ ] Expand blog content with code snippets and configs
