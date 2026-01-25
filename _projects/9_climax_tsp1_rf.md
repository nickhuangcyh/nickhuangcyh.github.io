---
layout: page
title: TSP-1-RF Touchscreen Keypad
description: A wireless 7" touchscreen keypad with Wi-Fi & RF communication for smart home and security management
img: assets/img/project_climax_tsp1_rf.jpg
importance: 1
category: Work At Climax
related_publications: false
published: true
---

## Introduction

**TSP-1-RF** is a wireless touchscreen keypad featuring a 7" full-color display that provides intuitive, on-premises management of your security system via Wi-Fi or RF (868MHz / 919MHz / 433MHz) connection to the control panel. Through Wi-Fi connection, the keypad supports IP camera and video phone live-view monitoring, enables smart automation control, and provides two-way VoIP communication via video phone integration.

Official Links:

- [Product News (PDF)](https://www.climax.com.tw/new/downloads/TSP-1-RF_product_news_20260105.pdf)
- [Official Website](https://www.climax.com.tw/tsp-1-rf.php)

---

## 🚪 Key Features

- 📡 **Wireless Communication (Wi-Fi / RF)**  
  Flexible connection options using Wi-Fi or RF frequencies (868MHz / 919MHz / 433MHz) for seamless communication with the control panel.

- 📱 **7” Touchscreen Display**  
  High-resolution user interface with adjustable brightness for intuitive security and automation control.

- 🏠 **Wi-Fi Smart Home Integration**  
  Enables automation device control (Scenes, Devices) and IP camera streaming once connected to a wireless network.

- 📹 **Video Verification & VoIP**  
  Stream footage from IP cameras and video phones directly on the keypad. Supports two-way voice communication via built-in microphone and speaker.

- 🔄 **OTA Firmware Update**  
  Supports Over-The-Air (OTA) firmware updates via Wi-Fi for easy maintenance.

- 🧱 **Flexible Installation**  
  Wall-mounted or tabletop options, suitable for different residential and commercial environments.

---

## 🧑‍💻 My Role

I was responsible for the **software implementation and system integration** of the keypad, including:

- **Wireless Connectivity Integration:**
  - Implemented stable connection logic for both **Wi-Fi and RF** communication channels.
  - Handled network state management and automatic reconnection strategies.

- **System Logic & UI:**
  - Built **core system logic** for security panel interaction.
  - Developed **UI workflows** for arming/disarming, scene activation, and device control.

- **Multimedia Features:**
  - Integrated **VoIP and Camera Streaming** features using SIP and RTSP protocols.

---

## ⚙️ Tech Stack

- **Architecture:** MVP
- **Hardware Communication:** Wi-Fi, RF (868/919/433 MHz)
- **Network:** TCP/UDP, HTTPS, MQTT, SIP
- **Multimedia:** RTSP, H.264, FFMpeg
- **Testing:** mockito (Java), mockK (Kotlin)

> 📡 "In TSP-1-RF, I focused on delivering a reliable wireless experience, ensuring seamless keypad interaction through robust Wi-Fi and RF connectivity handling."
