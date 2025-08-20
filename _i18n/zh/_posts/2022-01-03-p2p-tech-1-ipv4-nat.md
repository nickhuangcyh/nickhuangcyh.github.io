---
layout: post
title: 搞懂 P2P 技術 (1) - P2P x IPv4 x NAT
date: 2022-01-03 23:45:03 +0800
description: 深入解析 P2P 穿透技術、NAT 類型與通訊限制，掌握物聯網與分佈式架構下的網路連線原理。
tags: [iOS, Android, IPv4, NAT, P2P, NAT Traversal]
categories: [P2P]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/nasa-1lfI7wkGWZ4-unsplash.jpg
---

## 前言

之前在開發 IPCam 與手機進行影音串流時，因為沒有 3D 繪圖或網路通訊背景，對於 P2P 一知半解。  
這篇文章是我深入研究後的筆記，將會用一系列文章介紹完整的 P2P 技術與原理。本文是第一篇，聚焦於 P2P 背後的網路架構與 NAT 問題。

---

## 為什麼會需要 P2P？

在了解 P2P 穿透或打洞技術之前，我們要先知道它是為了解決什麼問題。  
P2P 目的是讓裝置之間**不依賴中心伺服器也能直接建立連線**，這在 IoT、AR/VR 裝置、自架系統中非常關鍵。

---

## Centralized vs Decentralized vs Distributed

---

### 中心化網路（Centralized）

{% include figure.liquid path="assets/img/p2p_centralized.png" title="中心化架構" %}

所有 client 都連接至單一 server，由 server 統一管理與分發訊息。  
這就像國家中央銀行發行貨幣，所有人都從央行取得錢。

- ✅ 優點：部署簡單、易於維護、集中管理資料
- ❌ 缺點：單點故障風險高、隱私問題、延遲受限於地理位置

---

### 去中心化網路（Decentralized）

{% include figure.liquid path="assets/img/p2p_decentralized.png" title="去中心化架構" %}

有多台伺服器共用資料，client 可以從任一伺服器取得資訊。

- ✅ 容錯率較高，性能彈性好
- ❌ 系統設計複雜、維運成本較高、安全風險仍在

---

### 分佈式網路（Distributed）

{% include figure.liquid path="assets/img/p2p_distributed.png" title="分佈式架構" %}

去中心化的最進化版，不只沒有中心伺服器，每個節點都能共享、驗證資料。

> 如區塊鏈，每個節點都有完整資訊，不需信任中心機構

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

> 疑問：既然 Server 不參與，那麼「分佈式架構下手機與 IPCam 怎麼直接通訊？」  
> 這就是本篇核心 —— **P2P + NAT Traversal 技術**

---

## 什麼是 P2P（Peer to Peer）

P2P 是一種「去中心化」架構，每台裝置既是 client 也是 server。  
裝置之間可互相存取與分享資源，不依賴中介節點。

---

## IPv4 是什麼？為何會有 NAT？

IPv4 是網際網路的基礎，每台裝置要上網就需要一組獨立 IP 位址（類似地址）。  
然而 IPv4 只有約 43 億組，不夠現代需求，因此產生了「NAT」這個替代方案。

---

## NAT（Network Address Translation）

{% include figure.liquid path="assets/img/p2p_nat_1.png" title="NAT 基本概念" %}

NAT 是讓多台裝置共用一個公共 IP 的技術。它透過內部 IP ↔ 外部 IP 的映射，節省 IP 使用量。  
但也導致「**外部裝置無法主動連線到內部裝置**」的問題，這就是 P2P 最大障礙。

---

## 如何在雙方都處於 NAT 時建立 P2P？

以下用圖逐步說明 NAT 穿透的邏輯流程：

{% include figure.liquid path="assets/img/p2p_nat_6.png" title="雙 NAT 情境下的 P2P 穿透過程" %}

1. A 發出封包 → 建立 A NAT 對映
2. A 封包被 B NAT 阻擋 → 失敗
3. B 發出封包 → 建立 B NAT 對映
4. B 封包通過 A NAT → 成功連通
5. 兩方皆有 NAT 記錄 → 後續雙向 P2P 成立

---

## 常見的 NAT 類型解析

---

### ✅ Full Cone NAT（完全錐型）

{% include figure.liquid path="assets/img/p2p_full_cone_nat.png" title="Full Cone NAT" %}

- 任意外部主機皆可與內部裝置通訊
- 最友善的 P2P NAT 類型

> ##### TIP
>
> 若你在開發初期無法判斷使用者 NAT 類型，建議預設優化邏輯為 Full Cone，可搭配 STUN server 回報 NAT 屬性。
> {: .block-tip }

---

### 🟡 Restricted Cone NAT（受限錐型）

{% include figure.liquid path="assets/img/p2p_restricted_cone_nat.png" title="Restricted Cone NAT" %}

- 僅曾被內部主機連過的外部主機可回傳封包
- 還算可接受，但需先有 outbound 流量建立 mapping

---

### 🟠 Port Restricted Cone NAT（端口限制型）

{% include figure.liquid path="assets/img/p2p_port_restricted_cone_nat.png" title="Port Restricted Cone NAT" %}

- 與 Restricted 相似，但進一步要求 port 完全對應
- 穿透難度較高

---

### 🔴 Symmetric NAT（對稱型）

{% include figure.liquid path="assets/img/p2p_symmetric_nat.png" title="Symmetric NAT" %}

> ##### WARNING
>
> Symmetric NAT 幾乎無法直接打洞成功，需結合 TURN 伺服器作為中繼，否則雙方 mapping table 無法建立連通。
> {: .block-warning }

---

## 結論

P2P 架構與 NAT 類型是 IoT 裝置通訊不可忽視的底層核心。  
理解不同情境下的連線行為，是確保穩定性與可擴展性的第一步。

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
