---
layout: post
title: "P2P 技術（3）WebRTC 與 AWS KVS 完整實作：即時通訊與串流技術深入教學"
date: 2022-01-04 23:13:00 +0800
description: "學會 WebRTC 如何整合 STUN/TURN/ICE 技術實現即時通訊。深入了解 Signaling Server 設計、SDP 交換流程、AWS Kinesis Video Streams 雲端串流服務。從理論到實作，打造完整的 P2P 通訊系統。"
tags: [WebRTC Technology, AWS KVS, Real-time Communication, P2P Streaming, Signaling Server, SDP Protocol, IoT Communication, Cloud Streaming]
categories: [P2P, AWS]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/nasa-1lfI7wkGWZ4-unsplash.jpg
---

## WebRTC 是什麼？

WebRTC（Web Real-Time Communication）是 Google 主導開發的開源標準，也是一套原生於瀏覽器的 API 集合。它的目標是讓開發者無需安裝任何外掛程式，就能在瀏覽器中實現即時語音、視訊與資料通訊功能。

在前面兩篇文章中，我們學習了 P2P 的理論基礎和 STUN、TURN、ICE 等核心技術。WebRTC 就是將這些技術整合起來的實用框架，其底層正是基於 ICE、SDP、STUN、TURN 等協定進行 NAT 穿透，最終建立可靠的 P2P 連線。

📖 [WebRTC Wiki](https://zh.wikipedia.org/wiki/WebRTC)

---

## Signaling Server 是做什麼的？

在 WebRTC 架構中，Signaling Server（信令伺服器）扮演的角色就像是「媒人」或「介紹人」。它的主要任務是協助兩個端點交換建立 P2P 連線所需的基本資訊。

**Signaling Server 負責交換的資訊包括：**

- **SDP**（Session Description Protocol）：會話描述協定，定義媒體格式與傳輸參數
- **ICE Candidates**：各種可能的連線路徑資訊
- **控制信號**：通話開始、結束等狀態管理

**重要觀念：**Signaling Server 只參與連線建立的前置作業，一旦 P2P 連線成功建立，實際的音訊、視訊資料就會直接在兩個端點間傳輸，不再經過 Signaling Server。

關於實作技術，WebRTC 標準並未強制規定 Signaling 的實作方式，你可以自由選擇 WebSocket、HTTP、MQTT 等協議來實作。

> ##### TIP
>
> Signaling Server 並不參與音訊/影像資料的傳輸，只做連線資訊交換，因此可依需求選擇通訊協定。
> {: .block-tip }

---

## SDP 是什麼？

SDP（Session Description Protocol）是一種會話描述協定（RFC 2327），它就像是兩個要通話的人事先協商好的「通話規則」。

SDP 的主要作用是詳細定義媒體流的所有參數，包括：

- **媒體格式**：支援哪些音訊、視訊編解碼器（codec）
- **傳輸參數**：使用的網路協定、埠號範圍
- **連線資訊**：IP 位址、Port 等網路對接詳情
- **媒體屬性**：是否支援雙向通訊、能否接收或僅能發送

簡單來說，SDP 就是讓兩個要進行 WebRTC 通訊的端點互相了解：「你能支援什麼？我能支援什麼？我們該怎麼通訊？」

以下為 SDP 範例：

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

## ICE Candidate 是什麼？

ICE Candidate 是 WebRTC 中非常重要的概念，它代表的是「候選連線路徑」。你可以把它想像成從你家到朋友家的各種不同路線選擇。

**ICE Candidate 包含的資訊：**

- **IP 位址**：可能是內網 IP、公共 IP、或 TURN 伺服器的 IP
- **Port 編號**：用於連線的端口號
- **傳輸協議**：UDP、TCP 等不同的傳輸方式
- **Candidate 類型**：host（本地）、srflx（STUN 獲得）、relay（TURN 中繼）

**產生過程：**

WebRTC 每次啟動連線時，會自動為每個網路介面（網卡）產生多個 Candidate，包括本地網路、STUN 獲得的公共位址、TURN 中繼位址等。兩個端點交換各自的 Candidate 清單後，會進行連接測試，最終選出最佳的傳輸路徑。

**ICE Candidate 格式範例：**

```json
{
  "sdpMLineIndex": 0,
  "sdpMid": "",
  "candidate": "a=candidate:2999745851 1 udp 2113937151 192.168.56.1 51411 typ host generation 0"
}
```

讓我們解析這個 candidate 字串：

- `2999745851`：candidate ID
- `1`：component ID（通常 1 是 RTP，2 是 RTCP）
- `udp`：傳輸協議
- `2113937151`：優先級（數字越大優先級越高）
- `192.168.56.1`：IP 位址
- `51411`：Port
- `typ host`：candidate 類型（host = 本地位址）

**交換與選擇流程：**

1. 兩個端點透過 Signaling Server 交換各自的 Candidate 清單
2. WebRTC 使用 ICE 機制對所有可能的路徑進行連接測試
3. 最終選出延遲最低、穩定性最好的通訊方式

這個過程就像是在多條道路中找出最快、最穩定的一條來達成目的地。

---

## WebRTC 建立連線流程

{% include figure.liquid path="assets/img/p2p_webrtc.png" title="WebRTC 完整連線流程圖" %}

WebRTC 連線建立流程看似複雜，但可以整理為以下四個清晰的階段：

### 階段一：訊息交換（Signaling）

- 雙方端點連接至 Signaling Server
- 交換 SDP 資訊（媒體能力與願望通訊參數）
- 交換 ICE Candidates（各種可能的連線路徑）

### 階段二：網路探測（Network Discovery）

- 各端點向 STUN Server 查詢自己的 Public IP 與 NAT 類型
- 收集本地網路介面、STUN 獲得的公共位址等資訊

### 階段三：連接測試（Connectivity Checks）

- ICE 機制對所有 Candidate 組合進行連接測試
- 優先嘗試直接 P2P 連線（透過 STUN）
- 若 P2P 失敗，則嘗試 TURN 中繼連線

### 階段四：連線確立（Connection Establishment）

- 從所有成功的連接中選擇最佳路徑
- 確立穩定的雙向通訊通道
- 開始媒體流傳輸（音訊、視訊、數據）

整個流程的設計目標是確保在各種網路環境下都能建立連線，同時優先選擇最高效率的通訊方式。

---

## AWS KVS 是什麼？

AWS Kinesis Video Streams for WebRTC（簡稱 KVS）是 Amazon 推出的 WebRTC 雲端全託管解決方案。它的出現解決了開發者在自行建置 WebRTC 基礎設施時面臨的各種挑戰。

**KVS 的核心優勢：**

### 全套基礎設施

- **Signaling Server**：內建 WebSocket 基的信令伺服器
- **STUN/TURN 服務**：全球分佈的 NAT 穿透基礎設施
- **負載平衡**：自動處理高併發連線請求

### 企業級安全

- **IAM 整合**：與 AWS 身份認證系統無縫整合
- **資料加密**：支援端到端加密傳輸
- **存取控制**：細粒度的權限管理

### 多平台支援

- **Web**：原生 JavaScript SDK
- **iOS**：原生 Swift/Objective-C SDK
- **Android**：原生 Java/Kotlin SDK

**使用情境：**

KVS 特別適合需要快速上線且不想維護複雜基礎設施的場景，如遠端監控、IoT 裝置控制、線上教育平台等。你只需要串接對應的 SDK，就能在短時間內建立穩定的雙向音視訊串流服務。

[📖 AWS 官方文件](https://docs.aws.amazon.com/zh_tw/kinesisvideostreams-webrtc-dg/latest/devguide/what-is-kvswebrtc.html)

> ##### TIP
>
> KVS 適合用於 IoT、遠端監控、IPCam 等場景，不需要自己維護 signaling 或 relay server，節省大量開發與維運成本。
> {: .block-tip }

---

## 成果展示

以下為實作成功後，於 iOS 與 Android 上的串流畫面：

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ios_webrtc.png" title="iOS WebRTC Demo" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/android_webrtc.png" title="Android WebRTC Demo" %}
    </div>
</div>

---

## 實戰蹩雷筆記

在開發過程中，我遇到了一些值得分享的技術問題，希望能幫助其他開發者避免同樣的困擾。

### AWS KVS WebRTC Android SDK 問題

**問題描述：**
在實作 AWS KVS WebRTC for Android 時，將 WebSocket 連線庫從官方推薦的 tyrus 更換為最常用的 okhttp，結果運行時出現 403 Forbidden 錯誤。

**問題原因：**
經過調查發現，問題出在 URL 被重複 encode 上。當使用 okhttp 時，它會自動對 URL 進行 encode，但 AWS 的 Signature V4 簽名已經是基於原始 URL 計算的，導致重複 encode 後簽名驗證失敗。

**解決方案：**
需要在使用 okhttp 時特別處理 URL encode 問題，或者保持使用官方推薦的 tyrus 庫。

**相關資源：**
🔗 [GitHub Issue #74](https://github.com/awslabs/amazon-kinesis-video-streams-webrtc-sdk-android/issues/74)

這個例子提醒我們，在使用第三方庫時，需要特別注意它們的內部實現細節，這些細節可能會影響到雲端服務的認證機制。

---

## 系列總結：P2P 技術完整地圖

經過三篇文章的深入探討，我們已經建立了完整的 P2P 技術知識體系：

### 第一篇：基礎架構與 NAT 問題

- 理解了中心化、去中心化、分佈式架構的區別
- 掌握了 IPv4 位址稀缺和 NAT 技術的關係
- 學會了各種 NAT 類型的特性與限制

### 第二篇：NAT 穿透核心技術

- STUN：解決裝置發現問題，讓裝置知道自己的公共 IP
- TURN：提供中繼服務，解決嚴格 NAT 環境下的連線問題
- ICE：整合框架，智慧選擇最佳通訊路徑

### 第三篇：實用框架與雲端服務

- WebRTC：現代 P2P 通訊的主流標準實作
- SDP 與 ICE Candidates：連線建立的核心資訊交換機制
- AWS KVS：商業級的 WebRTC 雲端解決方案

**技術發展脅絡：**

```
P2P 需求 → NAT 問題 → STUN/TURN/ICE → WebRTC → 雲端服務
基礎架構   穿透挑戰     核心技術      實用框架   商業應用
```

這個技術棧從底層網路原理到雲端服務應用，形成了完整的 P2P 通訊解決方案。理解這些技術的進展脈絡，有助於在不同場景下選擇合適的技術方案。

> ##### TIP
>
> 如果你在開發 WebRTC 或整合 AWS KVS 時有遇到實作瓶頸，歡迎留言或寫信交流，我會持續整理實戰經驗幫助更多開發者。
> {: .block-tip }

---

## 參考資源

- [WebRTC API - MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/WebRTC_API)
- [WebRTC Wiki](https://zh.wikipedia.org/wiki/WebRTC)
- [SDP Wiki](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D%E6%8F%8F%E8%BF%B0%E5%8D%8F%E8%AE%AE)
- [RTCIceCandidate - MDN](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate)
- [Amazon Kinesis Video Streams for WebRTC](https://docs.aws.amazon.com/zh_tw/kinesisvideostreams-webrtc-dg/latest/devguide/what-is-kvswebrtc.html)
- [《P2P 技术详解》系列文章](http://www.52im.net/thread-50-1-1.html)
- [WebSocket vs Socket.IO](https://leesonhsu.blogspot.com/2018/07/socketwebsocketsocketio.html)
- [Flaticon](https://www.flaticon.com/)
