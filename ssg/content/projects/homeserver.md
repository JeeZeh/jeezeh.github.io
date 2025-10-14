+++
title = "My home server and entertainment setup"
template = "mermaid.html"
date = 2025-10-14
external_links_target_blank = true
+++

## Overview

This is living documentation of my home network setup. The diagram below serves as both a visual reference and a table of contents—click on nodes to jump to detailed sections.

{% mermaiddiagram() %}
graph TB
subgraph Internet
ISP[Virgin Media ISP]
CF[Cloudflare]
PLAYIT[PlayIt.gg Service]
end

    subgraph "Home Network"
        ROUTER[Asus AX-6000 Router<br/>Asus Merlin Firmware<br/>192.168.8.0/24]
        PIHOLE[Pi-Hole DNS<br/>Cloudflare DoH]

        subgraph "Primary Server"
            subgraph "Bare Metal Services"
                PS3[PS3 Network Server<br/>#personal-project]
                HUE[Hue Analytics<br/>#personal-project #aws<br/>Rust/Django]
                MC[Minecraft Server<br/>itzg/minecraft-server<br/>Backups: itzg/mc-backup]
            end

            subgraph "Docker Services"
                IMMICH[Immich<br/>Photo Management<br/>ghcr.io/immich-app]
                REACTRAIL[React Rail<br/>#docker #react<br/>#personal-project]
                AUDIOBOX[Audiobox - Lidarr<br/>ghcr.io/linuxserver]
            end
        end

        subgraph "Network Services"
            TAILSCALE[Tailscale Endpoint<br/>102.10d.0.x addresses]
            CFTUNNEL[Cloudflare Tunnel<br/>cloudflared]
        end
    end

    subgraph "Public Access"
        JESSE[jesse.ie]
        REACTRAIL_DOMAIN[reactrail.ie]
        PLAYIT_ENDPOINT[PlayIt.gg Endpoint<br/>Minecraft Access]
    end

    subgraph "Clients"
        BROWSERS[Web Browsers]
        IMMICH_APP[Immich Mobile App]
        MC_CLIENT[Minecraft Client]
    end

    ISP --> ROUTER
    ROUTER --> PIHOLE
    PIHOLE -.DNS/DoH.-> CF
    ROUTER --> PS3
    ROUTER --> HUE
    ROUTER --> MC
    ROUTER --> IMMICH
    ROUTER --> REACTRAIL
    ROUTER --> AUDIOBOX

    ROUTER --> TAILSCALE
    TAILSCALE -.Remote Access.-> ROUTER

    ROUTER --> CFTUNNEL
    CFTUNNEL --> CF
    CF --> JESSE
    CF --> REACTRAIL_DOMAIN

    MC -.CG-NAT Workaround.-> PLAYIT
    PLAYIT --> PLAYIT_ENDPOINT

    JESSE --> BROWSERS
    REACTRAIL_DOMAIN --> BROWSERS
    IMMICH -.via Cloudflare.-> IMMICH_APP
    PLAYIT_ENDPOINT --> MC_CLIENT

    click ROUTER "#router"
    click PIHOLE "#dns-configuration"
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

### Router

**Model:** Asus AX-6000 (running Asus Merlin firmware)

Acts as the primary router with several key functions:
- **Network:** 192.168.8.0/24
- **Virgin Media routes:** Configured to handle Virgin Media ISP connectivity
- The AX-6000 doesn't support 802.1ad (QinQ) mode natively, but works well enough for the current setup

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
*Coming soon*

#### reactrail.ie
*Coming soon*

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
- [ ] Integrate Mermaid into Zola
  - [ ] Add mermaid.js to base template or create shortcode
  - [ ] Add CSS for max-width constraint (`.mermaid { max-width: 800px; margin: 0 auto; }`)
  - [ ] Test rendering in local dev environment
  - [ ] Test mobile responsiveness
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

