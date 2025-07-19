---
layout: page
title: TSP-1-BUS Touchscreen Keypad
description: A hardwired 7" touchscreen keypad with RS485 BUS communication and smart home integration
img: assets/img/project_climax_tsp1_bus.jpg
importance: 2
category: Work At Climax
related_publications: false
published: true
---

## Introduction

**TSP-1-BUS** is a hardwired touchscreen keypad that connects to Climax’s **Hybrid Panel** via **RS485 BUS**, providing reliable security control and smart home access. Featuring a **7” full-color, high-resolution touchscreen**, it delivers intuitive and fast operation for **arming/disarming the system**, automation control, and video verification through **IP cameras or video phones**.

Official Links:

- [Product Page](https://www.climax.com.tw/tsp-1-bus.php)
- [Wired BUS Security System Brochure (PDF)](https://www.climax.com.tw/new/downloads/Climax_Wired_BUS_Security_System_Brochure_20250304.pdf)

---

## 🚪 Key Features

- 🔒 **Hardwired BUS Communication (RS485)**  
  Ensures real-time stability and redundancy via BUS topology. Multiple devices can connect simultaneously for scalable system integration.

- 📱 **7” Touchscreen Display**  
  High-resolution user interface for intuitive security and automation control.

- 🏠 **Wi-Fi Smart Home Integration**  
  Enables automation device control and IP camera streaming once connected to a wireless network.

- 📹 **Video Verification**  
  Stream footage from IP cameras and video phones directly on the keypad for immediate context.

- 🧱 **Flexible Installation**  
  Wall-mounted or tabletop, suitable for different residential/commercial environments.

---

## 🧑‍💻 My Role

I independently **planned and implemented the entire BUS communication module**, including:

- Developed **custom RS485 protocol**:
  - Handshake & Acknowledgment
  - Encrypted packet structure
  - Custom packet framing & error detection (like TCP/UDP)

- Built **core system logic and integration** with Hybrid Panel
- Coordinated with backend and hardware teams for end-to-end system validation
- Developed **UI workflow and network logic** in a scalable MVP architecture

---

## ⚙️ Tech Stack

- **Architecture:** MVP
- **Hardware Communication:** RS485 (custom protocol similar to TCP/UDP)
- **Network:** TCP/UDP, HTTPS, MQTT
- **Multimedia:** RTSP, H.264, FFMpeg
- **Testing:** mockito (Java), mockK (Kotlin)

> 📡 “In TSP-1-BUS, I built a robust RS485 communication stack from the ground up to ensure hardwired stability with real-time performance.”

---
