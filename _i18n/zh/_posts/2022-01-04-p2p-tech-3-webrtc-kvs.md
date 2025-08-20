---
layout: post
title: 搞懂 P2P 技術 (3) - WebRTC x AWS x KVS
date: 2022-01-04 23:13:00 +0800
description: 深入解析 WebRTC 架構、Signaling Server 設計、ICE 協議流程與 AWS KVS 串流實作，搞懂 P2P 在即時通訊與 IoT 中的應用。
tags: [iOS, Android, WebRTC, KVS, ICE, SDP, Signaling]
categories: [P2P, AWS]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/nasa-1lfI7wkGWZ4-unsplash.jpg
---

## WebRTC 是什麼？

WebRTC（Web Real-Time Communication）是一套原生於瀏覽器的 API，能夠實現即時語音、視訊與資料通訊功能。  
其底層基於 ICE、SDP、STUN、TURN 等協定進行 NAT 穿透，建立可靠 P2P 連線。

📖 [WebRTC Wiki](https://zh.wikipedia.org/wiki/WebRTC)

---

## Signaling Server 是做什麼的？

信令伺服器的角色是協助交換連線前的資訊：

- SDP（Session Description Protocol）
- ICE Candidates

你可以使用 WebSocket、HTTP、MQTT 等協議實作 signaling server，WebRTC 並未強制規定。

> ##### TIP
>
> Signaling Server 並不參與音訊/影像資料的傳輸，只做連線資訊交換，因此可依需求選擇通訊協定。
> {: .block-tip }

---

## SDP 是什麼？

SDP 是一種會話描述協定（RFC 2327），負責定義媒體流參數，例如媒體格式、頻道、傳輸協定與傳輸埠等。

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

ICE Candidate 是候選連線路徑資訊，包含 IP、Port、傳輸協議類型（如 UDP、TCP）等。  
WebRTC 每次啟動連線時，會為每個網路介面產生多個 Candidate，交換後選擇最佳傳輸路徑。

範例如下：

```json
{
  "sdpMLineIndex": 0,
  "sdpMid": "",
  "candidate": "a=candidate:2999745851 1 udp 2113937151 192.168.56.1 51411 typ host generation 0"
}
```

這些 Candidate 會透過 Signaling Server 傳遞給遠端 Peer，雙方整理完所有路徑後，WebRTC 會使用 ICE 機制決定最終的通訊方式。

---

## WebRTC 建立連線流程

{% include figure.liquid path="assets/img/p2p_webrtc.png" title="WebRTC 完整連線流程圖" %}

整體流程分為四大階段：

1. 雙方連上 Signaling Server，交換 SDP 與 ICE Candidates
2. Peer 向 STUN 伺服器請求 public IP
3. 若無法直連，則改透過 TURN Server 轉送
4. 雙方最終選定路徑建立 P2P 通道

---

## AWS KVS 是什麼？

AWS Kinesis Video Streams for WebRTC（簡稱 KVS）是 Amazon 提供的 WebRTC 全託管解決方案。
它內建：

- Signaling Server（WebSocket）
- STUN / TURN
- 權限驗證、加密、IAM 整合

你只需要串接 SDK，就能快速在 Web / iOS / Android 建立雙向音視訊串流。

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

## 踩雷補充

在實作 AWS KVS WebRTC for Android 時：

- 官方 Sample 使用 tyrus 連線 WebSocket
- 更換為 okhttp 會出現 403 Forbidden 錯誤
- 最終發現是 URL 被重複 encode，導致簽名驗證失敗

🔗 解法參考 GitHub Issue：
https://github.com/awslabs/amazon-kinesis-video-streams-webrtc-sdk-android/issues/74

---

## 總結

本篇完整介紹了 WebRTC 中的 ICE、SDP、Signaling、Candidate 流程，以及如何使用 AWS KVS 快速實現 WebRTC。
從底層協議原理到雲端服務應用，都有了初步理解。

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
