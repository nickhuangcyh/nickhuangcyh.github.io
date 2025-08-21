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

最近工作上遇到需要抓封包分析才能釐清的問題。這種情況在開發網路應用或除錯連線問題時相當常見。

以前開發 iOS 時，用 `rvictl -s [UUID]` 就能創建虛擬網卡，透過 Wireshark 抓封包超簡單。但 Android 的網路封包抓取就沒那麼直觀了。

經過一番研究後，我成功找到了可靠的解決方案。這篇教學將完整記錄整個過程，希望能幫助遇到相同問題的開發者。

---

## 事前準備

開始之前，請確認你已經準備好以下工具和環境：

1. 一台 **root 過的 Android 裝置** - 這是最關鍵的要求
2. [tcpdump](https://www.androidtcpdump.com/) 可執行檔 - 用於在 Android 裝置上抓取封包
3. [Wireshark](https://www.wireshark.org/download.html) - 用於分析抓取到的封包資料

**為什麼需要 root 權限？** 因為網路封包抓取需要系統層級的權限，才能存取底層網路介面。

> ##### WARNING
>
> 如果沒有 root 權限，也能用 [tPacketCapture](https://play.google.com/store/apps/details?id=jp.co.taosoftware.android.packetcapture&hl=zh_TW&gl=US)，但它會以 VPN 方式攔截封包，我實測會有封包漏掉問題，不建議依賴。
> {: .block-warning }

---

## 將 tcpdump 放入 Android 裝置

首先，我們需要將 tcpdump 可執行檔傳送到 Android 裝置上。使用 ADB 指令將檔案推送到 `/data/local/` 目錄：

```bash
adb push tcpdump /data/local/tcpdump
```

**常見問題處理：** 如果出現 `can't execute: Permission denied` 錯誤，這表示需要更高的權限。此時可以先取得 root 權限再上傳：

```bash
adb root
adb push tcpdump /data/local/tcpdump
adb unroot
```

這個步驟會暫時提升 ADB 的權限，完成檔案傳輸後再回復一般權限。

---

## 執行 tcpdump 抓封包

現在 tcpdump 已經在裝置上了，接下來要設定執行權限並開始抓取封包。

**步驟 1：進入裝置並取得權限**

```bash
adb shell
su
cd /data/local
```

這三個指令會依序：連接到 Android shell、切換到 root 用戶、移動到 tcpdump 所在目錄。

**步驟 2：設定執行權限**

```bash
chmod a+x tcpdump
```

這個指令讓 tcpdump 檔案變成可執行狀態。如果跳過這步驟，系統會拒絕執行 tcpdump。

**步驟 3：開始封包抓取**

```bash
./tcpdump -i any -p -s 0 -w /sdcard/capture.pcap
```

**參數說明：**
- `-i any`：監聽所有網路介面
- `-p`：不將網卡設為混雜模式
- `-s 0`：抓取完整封包（不截斷）
- `-w`：將結果寫入檔案

執行後，tcpdump 會開始即時抓取所有網路流量。用 `Control + C` 結束抓取，封包資料就會被儲存在 SD 卡的 `capture.pcap` 檔案中。

---

## 將封包檔案匯出到電腦

封包抓取完成後，需要將 `.pcap` 檔案從 Android 裝置傳輸到電腦進行分析。

```bash
adb pull /sdcard/capture.pcap
```

這個指令會將封包檔案下載到你當前的工作目錄。如果想指定下載位置，可以在指令後加上目標路徑。

**開始分析封包：** 檔案傳輸完成後，使用 Wireshark 開啟 `.pcap` 檔案即可開始詳細分析：

{% include figure.liquid path="assets/img/wireshark_test_1.png" title="Wireshark 抓到封包畫面" %}

---

## 總結

封包分析是除錯技術中最有價值的工具之一。無論遇到什麼網路相關問題，封包都能提供最直接的證據。

**常見應用場景包括：**
- 後端 API 串接異常
- 網路連線不穩定或斷線
- 第三方函式庫無回應
- 串流媒體播放問題

**實戰案例分享：**

我曾經遇到一個棘手的問題：iOS 應用使用 FFMpeg 串接 RTSP 串流時，連線總是在 1 分鐘後自動斷開。日誌文件完全看不出原因，讓人相當困擾。

後來透過 Wireshark 分析封包流量，才發現 FFMpeg 沒有定期發送 `GET_PARAMETER` 保活封包給 RTSP 伺服器。找到根本原因後，修改原始碼加入保活機制，問題立刻迎刃而解！

> ##### TIP
>
> 當 log 看不到東西、console 沉默不語時，封包永遠會說實話。會抓封包，能讓你在 debug 上省下好幾倍時間。
> {: .block-tip }

---

## 參考資源

- [tcpdump for Android](https://www.androidtcpdump.com/)
- [Wireshark](https://www.wireshark.org/)
- [tPacketCapture - Google Play](https://play.google.com/store/apps/details?id=jp.co.taosoftware.android.packetcapture&hl=zh_TW&gl=US)
