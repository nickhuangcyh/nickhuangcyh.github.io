---
layout: post
title: "P2P Technology (3) Complete Implementation of WebRTC and AWS KVS - In-depth Tutorial on Real-time Communication and Streaming Technology"
date: 2022-01-04 23:13:00 +0800
description: "Learn how WebRTC integrates STUN/TURN/ICE technologies for real-time communication. Deep dive into Signaling Server design, SDP exchange process, AWS Kinesis Video Streams cloud streaming service. From theory to practice, build complete P2P communication systems."
tags: [WebRTC Technology, AWS KVS, Real-time Communication, P2P Streaming, Signaling Server, SDP Protocol, IoT Communication, Cloud Streaming]
categories: [P2P, AWS]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/nasa-1lfI7wkGWZ4-unsplash.jpg
---

## What is WebRTC?

WebRTC (Web Real-Time Communication) is an open-source standard led by Google, and also a collection of APIs native to browsers. Its goal is to enable developers to implement real-time voice, video, and data communication functions in browsers without installing any plugins.

In the previous two articles, we learned the theoretical foundations of P2P and core technologies like STUN, TURN, and ICE. WebRTC is the practical framework that integrates these technologies. Its underlying layer is based on protocols like ICE, SDP, STUN, and TURN for NAT traversal, ultimately establishing reliable P2P connections.

📖 [WebRTC Wiki](https://zh.wikipedia.org/wiki/WebRTC)

---

## What Does Signaling Server Do?

In the WebRTC architecture, the Signaling Server plays the role of a "matchmaker" or "introducer". Its main task is to help two endpoints exchange the basic information needed to establish P2P connections.

**Information that Signaling Server is responsible for exchanging includes:**

- **SDP** (Session Description Protocol): Session description protocol defining media formats and transport parameters
- **ICE Candidates**: Various possible connection path information
- **Control Signals**: Call start, end, and other state management

**Important Concept:** Signaling Server only participates in the preliminary work of connection establishment. Once P2P connection is successfully established, actual audio and video data will be transmitted directly between the two endpoints, no longer going through the Signaling Server.

Regarding implementation technology, the WebRTC standard does not mandate specific Signaling implementation methods. You can freely choose protocols like WebSocket, HTTP, or MQTT for implementation.

> ##### TIP
>
> Signaling Server does not participate in audio/video data transmission, only handles connection information exchange, so communication protocols can be chosen based on requirements.
> {: .block-tip }

---

## What is SDP?

SDP (Session Description Protocol) is a session description protocol (RFC 2327), like the "communication rules" that two people who want to talk agree on beforehand.

SDP's main function is to define all parameters of media streams in detail, including:

- **Media Formats**: Which audio and video codecs are supported
- **Transport Parameters**: Network protocols and port ranges used
- **Connection Information**: IP addresses, ports, and other network connection details
- **Media Attributes**: Whether bidirectional communication is supported, can receive or only send

Simply put, SDP allows two endpoints that want to conduct WebRTC communication to understand each other: "What can you support? What can I support? How should we communicate?"

Here's an SDP example:

```bash
v=0
o=mhandley 2890844526 2890842807 IN IP4 126.16.64.4
s=SDP Seminar
i=A Seminar on the session description protocol
u=http://www.cs.ucl.ac.uk/staff/M.Handley/sdp.03.ps
e=mjh@isi.edu (Mark Handley)
c=IN IP4 224.2.17.12/127
t=2873397496 2873404696
a=recvonly
m=audio 49170 RTP/AVP 0
m=video 51372 RTP/AVP 31
m=application 32416 udp wb
a=orient:portrait
```

---

## What is ICE Candidate?

ICE Candidate is a very important concept in WebRTC, representing "candidate connection paths". You can think of it as various different route choices from your home to a friend's house.

**Information contained in ICE Candidate:**

- **IP Address**: Could be internal IP, public IP, or TURN server IP
- **Port Number**: Port used for connection
- **Transport Protocol**: Different transport methods like UDP, TCP
- **Candidate Type**: host (local), srflx (obtained via STUN), relay (TURN relay)

**Generation Process:**

Each time WebRTC initiates a connection, it automatically generates multiple Candidates for each network interface (network card), including local network, public addresses obtained via STUN, TURN relay addresses, etc. After two endpoints exchange their respective Candidate lists, they perform connection testing and ultimately select the best transmission path.

**ICE Candidate Format Example:**

```json
{
  "sdpMLineIndex": 0,
  "sdpMid": "",
  "candidate": "a=candidate:2999745851 1 udp 2113937151 192.168.56.1 51411 typ host generation 0"
}
```

Let's parse this candidate string:

- `2999745851`: candidate ID
- `1`: component ID (usually 1 is RTP, 2 is RTCP)
- `udp`: transport protocol
- `2113937151`: priority (higher number = higher priority)
- `192.168.56.1`: IP address
- `51411`: Port
- `typ host`: candidate type (host = local address)

**Exchange and Selection Process:**

1. Two endpoints exchange their respective Candidate lists through Signaling Server
2. WebRTC uses ICE mechanism to perform connection testing on all possible paths
3. Finally select the communication method with lowest latency and best stability

This process is like finding the fastest and most stable route among multiple roads to reach the destination.

---

## WebRTC Connection Establishment Flow

{% include figure.liquid path="assets/img/p2p_webrtc.png" title="Complete WebRTC Connection Flow Diagram" %}

The WebRTC connection establishment process seems complex but can be organized into the following four clear phases:

### Phase 1: Message Exchange (Signaling)

- Both endpoints connect to Signaling Server
- Exchange SDP information (media capabilities and desired communication parameters)
- Exchange ICE Candidates (various possible connection paths)

### Phase 2: Network Discovery

- Each endpoint queries its Public IP and NAT type from STUN Server
- Collect local network interfaces, public addresses obtained via STUN, etc.

### Phase 3: Connectivity Checks

- ICE mechanism performs connection testing on all Candidate combinations
- Prioritize direct P2P connections (via STUN)
- If P2P fails, try TURN relay connections

### Phase 4: Connection Establishment

- Select the best path from all successful connections
- Establish stable bidirectional communication channel
- Begin media stream transmission (audio, video, data)

The entire process is designed to ensure connections can be established in various network environments while prioritizing the most efficient communication methods.

---

## What is AWS KVS?

AWS Kinesis Video Streams for WebRTC (abbreviated as KVS) is Amazon's fully managed WebRTC cloud solution. Its emergence solves various challenges developers face when building WebRTC infrastructure themselves.

**Core Advantages of KVS:**

### Complete Infrastructure

- **Signaling Server**: Built-in WebSocket-based signaling server
- **STUN/TURN Services**: Globally distributed NAT traversal infrastructure
- **Load Balancing**: Automatically handles high-concurrency connection requests

### Enterprise-grade Security

- **IAM Integration**: Seamless integration with AWS identity authentication system
- **Data Encryption**: Supports end-to-end encrypted transmission
- **Access Control**: Fine-grained permission management

### Multi-platform Support

- **Web**: Native JavaScript SDK
- **iOS**: Native Swift/Objective-C SDK
- **Android**: Native Java/Kotlin SDK

**Use Cases:**

KVS is particularly suitable for scenarios requiring quick deployment without maintaining complex infrastructure, such as remote monitoring, IoT device control, online education platforms, etc. You just need to integrate the corresponding SDK to establish stable bidirectional audio-video streaming services in a short time.

[📖 AWS Official Documentation](https://docs.aws.amazon.com/zh_tw/kinesisvideostreams-webrtc-dg/latest/devguide/what-is-kvswebrtc.html)

> ##### TIP
>
> KVS is suitable for IoT, remote monitoring, IPCam and other scenarios. No need to maintain signaling or relay servers yourself, saving significant development and operational costs.
> {: .block-tip }

---

## Results Demonstration

Below are the streaming results on iOS and Android after successful implementation:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ios_webrtc.png" title="iOS WebRTC Demo" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/android_webrtc.png" title="Android WebRTC Demo" %}
    </div>
</div>

---

## Practical Gotcha Notes

During development, I encountered some technical issues worth sharing, hoping to help other developers avoid the same troubles.

### AWS KVS WebRTC Android SDK Issue

**Problem Description:**
When implementing AWS KVS WebRTC for Android, replacing the WebSocket connection library from the officially recommended tyrus to the commonly used okhttp resulted in a 403 Forbidden error during runtime.

**Root Cause:**
After investigation, the problem was due to double URL encoding. When using okhttp, it automatically encodes URLs, but AWS's Signature V4 signing is already calculated based on the original URL, causing signature verification to fail after double encoding.

**Solution:**
Need to specially handle URL encoding issues when using okhttp, or stick with the officially recommended tyrus library.

**Related Resources:**
🔗 [GitHub Issue #74](https://github.com/awslabs/amazon-kinesis-video-streams-webrtc-sdk-android/issues/74)

This example reminds us that when using third-party libraries, we need to pay special attention to their internal implementation details, which may affect cloud service authentication mechanisms.

---

## Series Summary: Complete P2P Technology Map

Through three in-depth articles, we have established a complete P2P technology knowledge system:

### First Article: Basic Architecture and NAT Problems

- Understood the differences between centralized, decentralized, and distributed architectures
- Grasped the relationship between IPv4 address scarcity and NAT technology
- Learned characteristics and limitations of various NAT types

### Second Article: Core NAT Traversal Technologies

- STUN: Solves device discovery problems, letting devices know their public IP
- TURN: Provides relay services, solving connection issues in strict NAT environments
- ICE: Integration framework, intelligently selecting optimal communication paths

### Third Article: Practical Frameworks and Cloud Services

- WebRTC: Mainstream standard implementation for modern P2P communication
- SDP and ICE Candidates: Core information exchange mechanisms for connection establishment
- AWS KVS: Commercial-grade WebRTC cloud solution

**Technology Development Context:**

```
P2P Requirements → NAT Problems → STUN/TURN/ICE → WebRTC → Cloud Services
Basic Architecture   Traversal Challenges   Core Technologies   Practical Framework   Commercial Applications
```

This technology stack forms a complete P2P communication solution from underlying network principles to cloud service applications. Understanding the development context of these technologies helps in choosing appropriate technical solutions for different scenarios.

> ##### TIP
>
> If you encounter implementation bottlenecks while developing WebRTC or integrating AWS KVS, feel free to comment or email for discussion. I will continue to organize practical experience to help more developers.
> {: .block-tip }

---

## Reference Resources

- [WebRTC API - MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/WebRTC_API)
- [WebRTC Wiki](https://zh.wikipedia.org/wiki/WebRTC)
- [SDP Wiki](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D%E6%8F%8F%E8%BF%B0%E5%8D%8F%E8%AE%AE)
- [RTCIceCandidate - MDN](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate)
- [Amazon Kinesis Video Streams for WebRTC](https://docs.aws.amazon.com/zh_tw/kinesisvideostreams-webrtc-dg/latest/devguide/what-is-kvswebrtc.html)
- [P2P Technology Detailed Explanation Series](http://www.52im.net/thread-50-1-1.html)
- [WebSocket vs Socket.IO](https://leesonhsu.blogspot.com/2018/07/socketwebsocketsocketio.html)
- [Flaticon](https://www.flaticon.com/)
