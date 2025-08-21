---
layout: post
title: "P2P Technology (1) Complete Analysis of IPv4 and NAT Traversal - In-depth Tutorial on Network Architecture and Connection Principles"
date: 2022-01-03 23:45:03 +0800
description: "Master the core concepts of P2P network communication and IPv4/NAT architecture limitations. Deep dive into four types of NAT, traversal challenges and solutions. Learn IoT device communication principles through IPCam video streaming examples, laying the foundation for subsequent STUN/TURN/ICE protocols."
tags:
  [
    P2P Technology,
    IPv4 Network,
    NAT Traversal,
    Network Architecture,
    IoT Communication,
    Distributed Systems,
    Network Protocol,
    Real-time Communication,
  ]
categories: [P2P]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/nasa-1lfI7wkGWZ4-unsplash.jpg
---

## Introduction

Previously, when developing video streaming between IPCam and mobile phones, I had a limited understanding of P2P due to my lack of network communication background.

This article is my research notes after deep diving into the topic. I will use a series of articles to introduce complete P2P technology and principles.

This is the first article, focusing on the network architecture behind P2P and NAT problems. By understanding these fundamental concepts, we will build a solid foundation for learning subsequent STUN, TURN, and ICE protocols.

---

## Why Do We Need P2P?

Before understanding P2P traversal or hole punching techniques, we need to know what problems they solve.

The purpose of P2P is to enable devices to **establish direct connections without relying on central servers**. This capability is extremely critical in modern network applications, especially in the following scenarios:

- **IoT Device Control**: Smart home appliances communicate directly with mobile phones
- **IPCam Applications**: Real-time interaction requires low-latency connections
- **Self-hosted Systems**: Reduce server maintenance costs and dependencies

---

## Centralized vs Decentralized vs Distributed

---

### Centralized Network

{% include figure.liquid path="assets/img/p2p_centralized.png" title="Centralized Architecture" %}

All clients connect to a single server, with the server managing and distributing messages uniformly.

This is like a central bank issuing currency, where everyone gets money from the central bank. All data exchange must go through this central point, and the system cannot operate without the server.

- ✅ Advantages: Simple deployment, easy maintenance, centralized data management
- ❌ Disadvantages: High single point of failure risk, privacy issues, latency limited by geographical location

---

### Decentralized Network

{% include figure.liquid path="assets/img/p2p_decentralized.png" title="Decentralized Architecture" %}

Multiple servers share data, and clients can obtain information from any server.

This architecture provides better fault tolerance. Even if one server fails, other servers can continue to provide services.

- ✅ Higher fault tolerance, good performance flexibility
- ❌ Complex system design, higher operational costs, security risks still exist

---

### Distributed Network

{% include figure.liquid path="assets/img/p2p_distributed.png" title="Distributed Architecture" %}

The most evolved version of decentralization, with no central server, where each node can share and verify data.

In this architecture, each participant is both a user and a provider of the service.

> Like blockchain, each node has complete information and doesn't need to trust central institutions. All nodes jointly maintain the system's operation with no single point of control.

- ✅ High fault tolerance, transparency, security, cost savings
- ❌ More complex system architecture and deployment, programs need to consider device differences

---

## IoT Control Scenario Comparison

📌 **Centralized Control:**

{% include figure.liquid path="assets/img/p2p_centralized_connect.png" title="Centralized IPCam Control" %}

- Advantages: Server controllable, fast deployment, centralized maintenance
- Disadvantages: System fails when server fails, high server rental/bandwidth costs

📌 **Distributed Control:**

{% include figure.liquid path="assets/img/p2p_distributed_connect.png" title="Distributed IPCam Control" %}

- Advantages: No server dependency, no rental fees
- Disadvantages: Complex programming, difficult App/Firmware updates, frequent disconnections requiring reconnection

> **Key Question**: Since the server doesn't participate, how do mobile phones and IPCams communicate directly in a distributed architecture?
>
> This is the core of this article — **P2P + NAT Traversal technology**. What we need to solve is: How can two devices located in different network environments establish direct connections by breaking through NAT limitations?

---

## What is P2P (Peer to Peer)

P2P is a "decentralized" architecture where each device is both a client and a server.

In traditional client-server models, roles are fixed: clients request, servers respond. But in P2P networks, each device can simultaneously play both roles.

Devices can access and share resources with each other without relying on intermediate nodes. This peer relationship makes networks more flexible and reduces dependence on central infrastructure.

---

## What is IPv4? Why Do We Have NAT?

IPv4 is the fundamental communication protocol of the Internet, like the address system in the real world. Each device needs a unique IP address to access the Internet, so it can be found by other devices and establish communication.

However, IPv4 uses a 32-bit address space, which can theoretically only provide about 4.3 billion IP addresses. Facing billions of Internet devices worldwide, this number is far from sufficient.

Therefore, "NAT" emerged as an alternative solution, allowing multiple devices to share a single public IP address for Internet access.

---

## NAT (Network Address Translation)

{% include figure.liquid path="assets/img/p2p_nat_1.png" title="Basic NAT Concept" %}

NAT is a technology that allows multiple devices to share a single public IP. Its working principle is to maintain a mapping table inside the router, recording the correspondence between internal and external IPs.

When an internal device wants to communicate externally, NAT converts the internal IP to a public IP and records this mapping. When an external response comes back, it forwards the packet to the correct internal device based on the mapping table.

This mechanism effectively saves IP usage, but also causes the problem that "**external devices cannot actively connect to internal devices**". Because external devices don't know the real addresses of internal devices, this is the biggest obstacle when establishing P2P connections.

---

## How to Establish P2P When Both Parties Are Behind NAT?

The following diagrams illustrate the logical flow of NAT traversal step by step:

{% include figure.liquid path="assets/img/p2p_nat_6.png" title="P2P Traversal Process in Dual NAT Scenario" %}

**Key Steps in NAT Traversal:**

1. **A sends packet** → Creates mapping record on A's NAT router
2. **A's packet blocked by B's NAT** → B's NAT has no corresponding record, packet is dropped
3. **B sends packet** → Creates mapping record on B's NAT router
4. **B's packet passes through A's NAT** → A's NAT already has record, allows packet through
5. **Bidirectional channel established** → Both NATs have records, subsequent bidirectional P2P communication is possible

This process is called "Hole Punching" because we punch a communication hole in the NAT "firewall".

---

## Analysis of Common NAT Types

---

### ✅ Full Cone NAT

{% include figure.liquid path="assets/img/p2p_full_cone_nat.png" title="Full Cone NAT" %}

Full Cone NAT is the most permissive NAT type. Once an internal device establishes an outbound connection, any external device that knows the corresponding public IP and port can actively connect in.

**Characteristics:**

- Any external host can communicate with internal devices
- Most P2P-friendly NAT type
- Highest traversal success rate

> ##### TIP
>
> If you cannot determine user NAT types during early development, it's recommended to optimize logic for Full Cone by default, which can be combined with STUN server to report NAT properties.
> {: .block-tip }

---

### 🟡 Restricted Cone NAT

{% include figure.liquid path="assets/img/p2p_restricted_cone_nat.png" title="Restricted Cone NAT" %}

Restricted Cone NAT adds IP address restrictions. Only external IP addresses that the internal device has previously actively connected to can send packets back through the established mapping.

**Characteristics:**

- Only external hosts previously connected by internal hosts can send packets back
- Higher security than Full Cone
- P2P traversal is still acceptable, but requires prior outbound traffic to establish mapping

---

### 🟠 Port Restricted Cone NAT

{% include figure.liquid path="assets/img/p2p_port_restricted_cone_nat.png" title="Port Restricted Cone NAT" %}

Port Restricted Cone NAT is the strictest cone NAT. In addition to IP address restrictions, it also requires the external device's port to match exactly.

**Characteristics:**

- Similar to Restricted Cone, but further requires exact port matching
- Highest security, but higher P2P traversal difficulty
- Requires precise port prediction or coordination mechanisms

---

### 🔴 Symmetric NAT

{% include figure.liquid path="assets/img/p2p_symmetric_nat.png" title="Symmetric NAT" %}

Symmetric NAT is the strictest NAT type. Each connection to a different external address generates a different mapping record, making P2P traversal extremely difficult.

> ##### WARNING
>
> Symmetric NAT can almost never succeed in direct hole punching and requires TURN servers as relays, otherwise bidirectional mapping tables cannot establish connectivity.
> {: .block-warning }

---

## Conclusion

P2P architecture and NAT types are underlying cores that cannot be ignored in IoT device communication.

Understanding the behavioral characteristics of different NAT types helps us choose appropriate traversal strategies when designing P2P applications. From Full Cone to Symmetric NAT, traversal difficulty gradually increases, which is why modern P2P technology needs to combine multiple protocols.

In the next article, we will dive deep into STUN, TURN, ICE and other protocols to understand how they solve various NAT traversal challenges.

> ##### TIP
>
> If you have more implementation experience or encounter traversal failures, feel free to comment or email for discussion. I will continue to update this series of articles, and welcome sharing with friends or teams who need it 🙌
> {: .block-tip }

---

## Reference Resources

- [Centralized vs Decentralized vs Distributed](https://medium.com/berty-tech/berty-tech-centralized-vs-decentralized-vs-distributed-systems-2e9efd856c2)
- [P2P Technology Detailed Explanation (52im)](http://www.52im.net/thread-50-1-1.html)
- [Wikipedia: Peer-to-peer](https://zh.wikipedia.org/wiki/%E5%B0%8D%E7%AD%89%E7%B6%B2%E8%B7%AF)
- [Wikipedia: NAT](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2)
- [RFC1918 - Private IP Ranges](https://datatracker.ietf.org/doc/rfc1918/)
