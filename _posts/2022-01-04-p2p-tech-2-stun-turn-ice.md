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

上一篇我們談到中心化、去中心化、分佈式網路架構，以及 IPv4、NAT 與其穿透困難。  
但還有幾個問題沒解決：

- ✅ A/B 雙方如何知道彼此的內/外部 IP？（STUN）
- ✅ 若遇到 Symmetric NAT，該怎麼辦？（TURN）
- ✅ 有無一種框架整合整個 NAT 穿透流程？（ICE）

本篇會帶你搞懂這三個技術主角。

---

## STUN 是什麼？

STUN（Session Traversal Utilities for NAT）是一種協定，  
能讓 NAT 後的裝置查詢自己的 **Public IP、Port 與 NAT 類型**。

> 它就像是一面鏡子，讓你知道「外界看到的自己長什麼樣」。

📘 RFC 定義：RFC 5389  
📖 [STUN Wiki](https://zh.wikipedia.org/wiki/STUN)

{% include figure.liquid path="assets/img/p2p_stun.png" title="STUN 架構原理示意圖" %}

使用 STUN，A 和 B 就能互相交換公網 IP，進行打洞（NAT Traversal），建立直接的 P2P 連線。

> ##### TIP
>
> STUN 是實作 P2P 通訊不可或缺的第一步，但若遇到 Symmetric NAT，它就無能為力了。
{: .block-tip }

---

## TURN 是什麼？

TURN（Traversal Using Relay NAT）是一種「中繼協定」，  
當 STUN 打洞失敗時（如遇 Symmetric NAT），就得靠 TURN。

它的運作邏輯是：

- Client 先與 TURN Server 要求建立中繼連線（relay port）
- 所有資料先送往 TURN Server，再轉發到對方

> 這就像你 A、B 無法直線通話，只好找個朋友幫你轉話

📖 [TURN Wiki](https://zh.wikipedia.org/wiki/TURN)

{% include figure.liquid path="assets/img/p2p_turn.png" title="TURN 流程圖" %}

> ##### WARNING
>
> TURN 解決連線問題，但所有資料都會繞過 TURN server，因此會增加頻寬成本與延遲，商業服務通常需部署自有 TURN 伺服器。
{: .block-warning }

---

## ICE 是什麼？

ICE（Interactive Connectivity Establishment）是一種綜合性 NAT 穿透框架。  
它整合了 STUN、TURN、RSIP 等協定，讓通訊流程更智慧。

運作邏輯：

1. 優先嘗試使用 STUN 建立 P2P 直連  
2. 若 STUN 失敗，再自動 fallback 至 TURN 中繼通訊  
3. 判斷路徑最佳解後，確立穩定連線

📖 [ICE Wiki](https://zh.wikipedia.org/wiki/%E4%BA%92%E5%8B%95%E5%BC%8F%E9%80%A3%E6%8E%A5%E5%BB%BA%E7%AB%8B)

{% include figure.liquid path="assets/img/p2p_ice.png" title="ICE 自動路徑判斷架構" %}

> ##### TIP
>
> ICE 是現代 P2P 通訊的主流做法，像 WebRTC、Zoom、Google Meet 都內建 ICE 機制處理 NAT 穿透。
{: .block-tip }

---

## 總結

三個技術的角色如下：

| 協定 | 功能說明 |
|------|----------|
| STUN | 幫你知道「我在外部網路的樣子」 |
| TURN | 幫你中繼資料，當打洞失敗時使用 |
| ICE  | 幫你選擇最好的通訊方式，自動 fallback |

> ##### TIP
>
> 建議所有即時影音 / 裝置連線服務都導入 ICE 框架，確保連線成功率最大化，並保留 STUN / TURN 備援機制。
{: .block-tip }

---

## 下一篇預告

下一篇，我將分享如何實作 **Signaling Server**，並介紹 **WebRTC** 與 **AWS Kinesis Video Streams（KVS）for WebRTC** 的應用與部署技巧。

> ##### TIP
>
> 如果你對 STUN、TURN、ICE 的實作流程有其他理解，或正在嘗試 WebRTC、AWS KVS 等技術，歡迎留言或來信交流，一起討論 P2P 的各種應用與挑戰！
{: .block-tip }

---

## 參考資源

- [STUN](https://zh.wikipedia.org/wiki/STUN)
- [TURN](https://zh.wikipedia.org/wiki/TURN)
- [ICE](https://zh.wikipedia.org/wiki/%E4%BA%92%E5%8B%95%E5%BC%8F%E9%80%A3%E6%8E%A5%E5%BB%BA%E7%AB%8B)
- [P2P 技术详解 @52im](http://www.52im.net/thread-50-1-1.html)
- [flaticon 圖片來源](https://www.flaticon.com/)
