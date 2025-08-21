---
layout: post
title: P2P 技術（1）IPv4 與 NAT 穿透完整解析：網路架構與連線原理深入教學
date: 2022-01-03 23:45:03 +0800
description: 學會 P2P 網路通訊的核心概念與 IPv4/NAT 架構限制。深入了解四種 NAT 類型、穿透挑戰與解決方案。從 IPCam 影音串流實例學習物聯網裝置通訊原理，為後續 STUN/TURN/ICE 協定奠基礎。
tags: [P2P Technology, IPv4 Network, NAT Traversal, Network Architecture, IoT Communication, Distributed Systems, Network Protocol, Real-time Communication]
categories: [P2P]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/nasa-1lfI7wkGWZ4-unsplash.jpg
---

## 前言

之前在開發 IPCam 與手機進行影音串流時，因為沒有網路通訊背景，對於 P2P 一知半解。

這篇文章是我深入研究後的筆記，將會用一系列文章介紹完整的 P2P 技術與原理。

本文是第一篇，聚焦於 P2P 背後的網路架構與 NAT 問題。透過理解這些基礎概念，我們將為後續的 STUN、TURN、ICE 協議學習打下穩固基礎。

---

## 為什麼會需要 P2P？

在了解 P2P 穿透或打洞技術之前，我們要先知道它是為了解決什麼問題。

P2P 目的是讓裝置之間**不依賴中心伺服器也能直接建立連線**。這個能力在現代網路應用中極為關鍵，特別是在以下場景：

- **IoT 裝置控制**：智慧家電直接與手機通訊
- **IPCam 應用**：即時互動需要低延遲連線
- **自架系統**：降低伺服器維護成本與依賴

---

## Centralized vs Decentralized vs Distributed

---

### 中心化網路（Centralized）

{% include figure.liquid path="assets/img/p2p_centralized.png" title="中心化架構" %}

所有 client 都連接至單一 server，由 server 統一管理與分發訊息。

這就像國家中央銀行發行貨幣，所有人都從央行取得錢。所有的資料交換都必須經過這個中心點，沒有伺服器就無法運作。

- ✅ 優點：部署簡單、易於維護、集中管理資料
- ❌ 缺點：單點故障風險高、隱私問題、延遲受限於地理位置

---

### 去中心化網路（Decentralized）

{% include figure.liquid path="assets/img/p2p_decentralized.png" title="去中心化架構" %}

有多台伺服器共用資料，client 可以從任一伺服器取得資訊。

這種架構提供了更好的容錯能力。即使其中一台伺服器故障，其他伺服器仍能繼續提供服務。

- ✅ 容錯率較高，性能彈性好
- ❌ 系統設計複雜、維運成本較高、安全風險仍在

---

### 分佈式網路（Distributed）

{% include figure.liquid path="assets/img/p2p_distributed.png" title="分佈式架構" %}

去中心化的最進化版，不只沒有中心伺服器，每個節點都能共享、驗證資料。

在這種架構中，每個參與者既是服務的使用者，也是服務的提供者。

> 如區塊鏈，每個節點都有完整資訊，不需信任中心機構。所有節點共同維護系統的運作，沒有單一控制點。

- ✅ 高容錯性、透明、安全、節省成本
- ❌ 系統架構與部署更複雜、程式需考慮設備差異

---

## IoT 控制場景比較

📌 **中心化控制：**

{% include figure.liquid path="assets/img/p2p_centralized_connect.png" title="中心化控制 IPCam" %}

- 優點：Server 可控、部署快速、維護集中
- 缺點：Server 故障即癱瘓、租機/頻寬成本高

📌 **分佈式控制：**

{% include figure.liquid path="assets/img/p2p_distributed_connect.png" title="分佈式控制 IPCam" %}

- 優點：不依賴 Server、不需租費
- 缺點：程式複雜、App/Firmware 更新困難、頻繁斷線需重連

> **關鍵疑問**：既然 Server 不參與，那麼「分佈式架構下手機與 IPCam 怎麼直接通訊？」
> 
> 這就是本篇核心 —— **P2P + NAT Traversal 技術**。我們需要解決的是：兩台分別位於不同網路環境的裝置，如何突破 NAT 限制建立直接連線？

---

## 什麼是 P2P（Peer to Peer）

P2P 是一種「去中心化」架構，每台裝置既是 client 也是 server。

在傳統的 client-server 模式中，角色是固定的：client 請求，server 回應。但在 P2P 網路中，每台裝置都能同時扮演這兩種角色。

裝置之間可互相存取與分享資源，不依賴中介節點。這種對等關係讓網路更有彈性，也降低了對中心基礎設施的依賴。

---

## IPv4 是什麼？為何會有 NAT？

IPv4 是網際網路的基礎通訊協議，就像現實世界的地址系統一樣。每台裝置要上網就需要一組獨立的 IP 位址，才能被其他裝置找到並建立通訊。

然而 IPv4 採用 32 位元位址空間，理論上只能提供約 43 億組 IP 位址。面對全球數十億的上網裝置，這個數量遠遠不夠使用。

因此產生了「NAT」這個替代方案，讓多台裝置可以共用一個公共 IP 位址上網。

---

## NAT（Network Address Translation）

{% include figure.liquid path="assets/img/p2p_nat_1.png" title="NAT 基本概念" %}

NAT 是讓多台裝置共用一個公共 IP 的技術。它的運作原理是在路由器內部維護一張映射表，記錄內部 IP 與外部 IP 的對應關係。

當內部裝置要對外通訊時，NAT 會將內部 IP 轉換為公共 IP 並記錄這個映射。當外部回應回來時，再根據映射表將封包轉回正確的內部裝置。

這個機制有效節省了 IP 使用量，但也導致「**外部裝置無法主動連線到內部裝置**」的問題。因為外部裝置不知道內部裝置的真實位址，這就是 P2P 建立連線時的最大障礙。

---

## 如何在雙方都處於 NAT 時建立 P2P？

以下用圖逐步說明 NAT 穿透的邏輯流程：

{% include figure.liquid path="assets/img/p2p_nat_6.png" title="雙 NAT 情境下的 P2P 穿透過程" %}

**NAT 穿透的關鍵步驟：**

1. **A 發出封包** → 在 A 的 NAT 路由器上建立對映記錄
2. **A 封包被 B NAT 阻擋** → B 的 NAT 沒有對應記錄，封包被丟棄
3. **B 發出封包** → 在 B 的 NAT 路由器上建立對映記錄  
4. **B 封包通過 A NAT** → A 的 NAT 已有記錄，允許封包通過
5. **雙向通道建立** → 兩方 NAT 都有記錄，後續可進行雙向 P2P 通訊

這個過程被稱為「打洞」（Hole Punching），因為我們在 NAT 的「防火牆」上打出了一個通訊孔洞。

---

## 常見的 NAT 類型解析

---

### ✅ Full Cone NAT（完全錐型）

{% include figure.liquid path="assets/img/p2p_full_cone_nat.png" title="Full Cone NAT" %}

Full Cone NAT 是最寬鬆的 NAT 類型。一旦內部裝置建立了對外連線，任何知道對應公共 IP 和 Port 的外部裝置都能主動連線進來。

**特性：**
- 任意外部主機皆可與內部裝置通訊
- 最友善的 P2P NAT 類型
- 穿透成功率最高

> ##### TIP
>
> 若你在開發初期無法判斷使用者 NAT 類型，建議預設優化邏輯為 Full Cone，可搭配 STUN server 回報 NAT 屬性。
> {: .block-tip }

---

### 🟡 Restricted Cone NAT（受限錐型）

{% include figure.liquid path="assets/img/p2p_restricted_cone_nat.png" title="Restricted Cone NAT" %}

Restricted Cone NAT 增加了 IP 位址限制。只有內部裝置曾經主動連線過的外部 IP 位址，才能透過建立的映射回傳封包。

**特性：**
- 僅曾被內部主機連過的外部主機可回傳封包
- 安全性比 Full Cone 更高
- P2P 穿透還算可接受，但需先有 outbound 流量建立 mapping

---

### 🟠 Port Restricted Cone NAT（端口限制型）

{% include figure.liquid path="assets/img/p2p_port_restricted_cone_nat.png" title="Port Restricted Cone NAT" %}

Port Restricted Cone NAT 是最嚴格的錐型 NAT。除了 IP 位址限制外，還要求外部裝置的 Port 必須完全對應。

**特性：**
- 與 Restricted Cone 相似，但進一步要求 port 完全對應
- 安全性最高，但 P2P 穿透難度較高
- 需要精確的 Port 預測或協調機制

---

### 🔴 Symmetric NAT（對稱型）

{% include figure.liquid path="assets/img/p2p_symmetric_nat.png" title="Symmetric NAT" %}

Symmetric NAT 是最嚴格的 NAT 類型。每次連線到不同的外部位址時，都會產生不同的映射記錄，使得 P2P 穿透極為困難。

> ##### WARNING
>
> Symmetric NAT 幾乎無法直接打洞成功，需結合 TURN 伺服器作為中繼，否則雙方 mapping table 無法建立連通。
> {: .block-warning }

---

## 結論

P2P 架構與 NAT 類型是 IoT 裝置通訊不可忽視的底層核心。

理解不同 NAT 類型的行為特性，有助於我們在設計 P2P 應用時選擇合適的穿透策略。從 Full Cone 到 Symmetric NAT，穿透難度逐漸提高，這也是為什麼現代 P2P 技術需要結合多種協議的原因。

在下一篇文章中，我們將深入探討 STUN、TURN、ICE 等協議，了解它們如何解決各種 NAT 穿透挑戰。

> ##### TIP
>
> 如果你有更多實作經驗、遇到穿透失敗等問題，歡迎留言討論或寫信交流，我會持續更新這系列文章，也歡迎分享給有需要的朋友或團隊 🙌
> {: .block-tip }

---

## 參考資源

- [Centralized vs Decentralized vs Distributed](https://medium.com/berty-tech/berty-tech-centralized-vs-decentralized-vs-distributed-systems-2e9efd856c2)
- [P2P 技术详解（52im）](http://www.52im.net/thread-50-1-1.html)
- [Wikipedia: 對等網路](https://zh.wikipedia.org/wiki/%E5%B0%8D%E7%AD%89%E7%B6%B2%E8%B7%AF)
- [Wikipedia: NAT](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2)
- [RFC1918 - Private IP Ranges](https://datatracker.ietf.org/doc/rfc1918/)
