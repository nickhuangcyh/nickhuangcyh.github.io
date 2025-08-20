---
layout: post
title: 如何抓取 Android 的網路封包
date: 2022-11-06 23:30:00 +0800
description: 實戰教你如何使用 tcpdump 搭配 Wireshark 抓取 Android 手機的封包資料，解決連線與串流問題的強大除錯技巧。
tags: [Android, Network, Packet, Wireshark, tcpdump]
categories: [Tools]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jordan-harrison-40XgDxBfYXM-unsplash.jpg
---

## 前言

最近工作上遇到需要抓封包分析才能釐清的問題。

以前開發 iOS 時，用 `rvictl -s [UUID]` 就能創建虛擬網卡，透過 Wireshark 抓封包超簡單。  
但 Android 就沒那麼直觀了，研究後成功抓到封包，這篇紀錄分享希望對你也有幫助🙂

---

## 事前準備

你會需要：

1. 一台 **root 過的 Android 裝置**
2. [tcpdump](https://www.androidtcpdump.com/) 可執行檔
3. [Wireshark](https://www.wireshark.org/download.html)

> ##### WARNING
>
> 如果沒有 root 權限，也能用 [tPacketCapture](https://play.google.com/store/apps/details?id=jp.co.taosoftware.android.packetcapture&hl=zh_TW&gl=US)，但它會以 VPN 方式攔截封包，我實測會有封包漏掉問題，不建議依賴。
> {: .block-warning }

---

## 將 tcpdump 放入 Android 裝置

```bash
adb push tcpdump /data/local/tcpdump
```

如果出現 `can't execute: Permission denied` 錯誤，可先取得 root 權限再上傳：

```bash
adb root
adb push tcpdump /data/local/tcpdump
adb unroot
```

---

## 執行 tcpdump 抓封包

1. 進入裝置 shell 並切換目錄：

```bash
adb shell
su
cd /data/local
```

2. 修改 tcpdump 權限為可執行：

```bash
chmod a+x tcpdump
```

3. 開始抓封包，輸出為 `.pcap` 檔：

```bash
./tcpdump -i any -p -s 0 -w /sdcard/capture.pcap
```

用 `Control + C` 結束後，封包就會被儲存在 SD 卡上。

---

## 將封包檔案匯出到電腦

```bash
adb pull /sdcard/capture.pcap
```

使用 Wireshark 開啟 `.pcap` 文件即可開始分析：

{% include figure.liquid path="assets/img/wireshark_test_1.png" title="Wireshark 抓到封包畫面" %}

---

## 總結

封包分析是除錯中最有價值的技術之一。  
不論是後端串接異常、網路斷線、第三方 library 無回應，都可能從封包中看出端倪。

舉例來說：

我曾遇到 iOS + FFMpeg 串 RTSP，1 分鐘後連線就自動斷開。  
後來透過 Wireshark 抓到 FFMpeg 沒發送 `GET_PARAMETER` 保活封包，修改原始碼後問題迎刃而解！

> ##### TIP
>
> 當 log 看不到東西、console 沉默不語時，封包永遠會說實話。會抓封包，能讓你在 debug 上省下好幾倍時間。
> {: .block-tip }

---

## 參考資源

- [tcpdump for Android](https://www.androidtcpdump.com/)
- [Wireshark](https://www.wireshark.org/)
- [tPacketCapture - Google Play](https://play.google.com/store/apps/details?id=jp.co.taosoftware.android.packetcapture&hl=zh_TW&gl=US)
