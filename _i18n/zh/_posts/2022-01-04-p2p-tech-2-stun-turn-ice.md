---
layout: post
title: 搞懂 P2P 技術 (2) - STUN x TURN x ICE
date: 2022-01-04 15:09:00 +0800
description: 解析 STUN、TURN 與 ICE 協議，搞懂 P2P 穿透技術，突破 NAT 限制建立穩定連線，打造強大 iOS / Android 即時通訊架構。
tags: [iOS, Android, STUN, TURN, ICE, NAT Traversal]
categories: [P2P]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/nasa-1lfI7wkGWZ4-unsplash.jpg
---

## 前言

在上一篇文章中，我們探討了中心化、去中心化、分佈式網路架構，以及 IPv4、NAT 與其穿透困難的問題。

雖然理解了 NAT 穿透的基本原理，但在實際應用中還有幾個關鍵問題需要解決：

- **發現問題**：A/B 雙方如何知道彼此的內/外部 IP 位址？（STUN）
- **穿透失敗**：若遇到 Symmetric NAT，該怎麼辦？（TURN）
- **統一管理**：有無一種框架能整合整個 NAT 穿透流程？（ICE）

本篇將深入介紹這三個解決 P2P 穿透問題的核心技術。透過理解 STUN、TURN、ICE 的運作機制，你將掌握現代 P2P 通訊的完整技術棧。

---

## STUN 是什麼？

STUN（Session Traversal Utilities for NAT）是一種輕量級的網路協定，專門用來解決 NAT 環境下的裝置發現問題。它能讓 NAT 後的裝置查詢自己的 **Public IP、Port 與 NAT 類型**。

> 簡單來說，STUN 就像是一面鏡子，讓你知道「外界看到的自己長什麼樣」。

當你的裝置位於 NAT 後方時，它只知道自己的內網 IP（如 192.168.1.100），但不知道對外顯示的公共 IP 是什麼。STUN Server 充當這面「魔鏡」，告訴你的裝置：「你的公共 IP 是 203.0.113.5，Port 是 12345」。

📘 RFC 定義：RFC 5389  
📖 [STUN Wiki](https://zh.wikipedia.org/wiki/STUN)

{% include figure.liquid path="assets/img/p2p_stun.png" title="STUN 架構原理示意圖" %}

**STUN 的工作流程：**

1. **查詢階段**：裝置 A 向 STUN Server 發送查詢請求
2. **回應階段**：STUN Server 回傳 A 的公共 IP 和 Port 資訊  
3. **交換階段**：A 和 B 透過 Signaling Server 交換各自的公網位址
4. **穿透階段**：雙方使用獲得的資訊進行 NAT 打洞，建立直接 P2P 連線

這個過程讓原本「看不見對方」的兩台內網裝置，能夠找到彼此並建立直接通訊管道。

> ##### TIP
>
> STUN 是實作 P2P 通訊不可或缺的第一步，但若遇到 Symmetric NAT，它就無能為力了。
> {: .block-tip }

---

## TURN 是什麼？

TURN（Traversal Using Relay NAT）是一種「中繼協定」，是 STUN 的強化版本。當 STUN 打洞失敗時（如遇到 Symmetric NAT），就得靠 TURN 來拯救連線。

TURN 的核心概念是「中繼轉發」。當兩台裝置無法建立直接 P2P 連線時，它們會透過 TURN Server 作為中間人來傳輸資料。

**TURN 的運作邏輯：**

1. **申請階段**：Client 向 TURN Server 要求分配一個中繼端口（relay port）
2. **建立階段**：TURN Server 為每個 Client 建立專用的轉發通道
3. **通訊階段**：所有資料都先送往 TURN Server，再由 Server 轉發到目標對象

> 這就像你和朋友 A、B 無法直接通話，只好請另一個朋友 C 幫你們轉話。雖然不是最有效率的方式，但至少能確保通訊成功。

📖 [TURN Wiki](https://zh.wikipedia.org/wiki/TURN)

{% include figure.liquid path="assets/img/p2p_turn.png" title="TURN 流程圖" %}

> ##### WARNING
>
> TURN 解決連線問題，但所有資料都會繞過 TURN server，因此會增加頻寬成本與延遲，商業服務通常需部署自有 TURN 伺服器。
> {: .block-warning }

---

## ICE 是什麼？

ICE（Interactive Connectivity Establishment）是一種綜合性 NAT 穿透框架，可以說是 P2P 通訊的「智慧管家」。它整合了 STUN、TURN、RSIP 等多種協定，讓整個連線建立過程變得更加自動化和智慧化。

ICE 的設計哲學是「多路徑嘗試，智慧選擇」。它不會只依賴單一技術，而是同時嘗試多種連線方式，最終選出最佳路徑。

**ICE 的運作邏輯：**

1. **收集階段**：同時收集所有可能的連線路徑（Candidates）
2. **優先階段**：優先嘗試使用 STUN 建立 P2P 直連
3. **備援階段**：若 STUN 失敗，自動切換至 TURN 中繼通訊
4. **最佳化階段**：分析所有成功路徑，選擇最優連線方式
5. **確立階段**：建立穩定的雙向通訊管道

這種設計確保了在各種網路環境下都能找到可行的通訊方案。

📖 [ICE Wiki](https://zh.wikipedia.org/wiki/%E4%BA%92%E5%8B%95%E5%BC%8F%E9%80%A3%E6%8E%A5%E5%BB%BA%E7%AB%8B)

{% include figure.liquid path="assets/img/p2p_ice.png" title="ICE 自動路徑判斷架構" %}

> ##### TIP
>
> ICE 是現代 P2P 通訊的主流做法，像 WebRTC、Zoom、Google Meet 都內建 ICE 機制處理 NAT 穿透。
> {: .block-tip }

---

## 技術整合：STUN + TURN + ICE

三個技術的角色分工明確，形成完整的 P2P 通訊解決方案：

| 協定 | 功能說明                              | 適用場景                    |
| ---- | ------------------------------------- | -------------------------- |
| STUN | 幫你知道「我在外部網路的樣子」        | 大部分 NAT 環境下的裝置發現 |
| TURN | 幫你中繼資料，當打洞失敗時使用        | Symmetric NAT 或網路限制嚴格的環境 |
| ICE  | 幫你選擇最好的通訊方式，自動 fallback | 統一管理整個連線建立流程    |

**技術發展脈絡：**

- **STUN（第一代）**：解決裝置發現問題，但面對複雜 NAT 有限制
- **TURN（第二代）**：提供可靠備案，但增加頻寬成本
- **ICE（第三代）**：整合前兩者優勢，實現智慧化連線管理

> ##### TIP
>
> 建議所有即時影音 / 裝置連線服務都導入 ICE 框架，確保連線成功率最大化，並保留 STUN / TURN 備援機制。
> {: .block-tip }

---

## 下一篇預告：實戰應用

在理解了 STUN、TURN、ICE 的理論基礎後，下一篇我將帶你進入實戰階段：

- **Signaling Server 設計**：如何實作資訊交換的中樞系統
- **WebRTC 深度應用**：現代瀏覽器原生的 P2P 通訊框架
- **AWS KVS 實戰**：雲端託管的 WebRTC 解決方案部署技巧

透過具體的程式碼和架構設計，你將學會如何將這些理論轉化為實際可用的 P2P 應用系統。

> ##### TIP
>
> 如果你對 STUN、TURN、ICE 的實作流程有其他理解，或正在嘗試 WebRTC、AWS KVS 等技術，歡迎留言或來信交流，一起討論 P2P 的各種應用與挑戰！
> {: .block-tip }

---

## 參考資源

- [STUN](https://zh.wikipedia.org/wiki/STUN)
- [TURN](https://zh.wikipedia.org/wiki/TURN)
- [ICE](https://zh.wikipedia.org/wiki/%E4%BA%92%E5%8B%95%E5%BC%8F%E9%80%A3%E6%8E%A5%E5%BB%BA%E7%AB%8B)
- [P2P 技术详解 @52im](http://www.52im.net/thread-50-1-1.html)
- [flaticon 圖片來源](https://www.flaticon.com/)
