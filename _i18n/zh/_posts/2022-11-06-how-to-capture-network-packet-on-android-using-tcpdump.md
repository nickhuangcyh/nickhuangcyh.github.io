---
layout: post
title: "Android 網路抓包全攻略：tcpdump + Wireshark 實戰詳解"
date: 2022-11-06 23:30:00 +0800
description: "掌握 Android 網路抓包技巧，結合 tcpdump 與 Wireshark，助力行動開發、流量分析與疑難排查。"
tags: [Android, Network Packet Capture, tcpdump, Wireshark, Network Analysis, Debugging, Network Troubleshooting, ADB, Root Access]
categories: [Android Development, Network Analysis, Debugging, Tools]
toc:
  sidebar: right
thumbnail: /assets/img/jordan-harrison-40XgDxBfYXM-unsplash.jpg
---

## 🚀 Android 網路抓包概述

網路抓包是行動開發中最有價值的除錯手段之一。與 iOS 的 rvictl 抓包不同，Android 主要依賴 tcpdump 工具。本文將手把手教你用 tcpdump + Wireshark 實現高效抓包與分析。

**你將學到：**
- 📱 Android 裝置抓包環境建置
- 🔍 tcpdump 抓包與 Wireshark 分析
- 🛠️ 連線與流量疑難排查技巧
- 📈 效能與安全分析
- 🧩 非 root 裝置抓包替代方案

---

## 🎯 為什麼要抓包？

- API 除錯與後端聯調
- 串流/推流問題定位
- 第三方函式庫網路行為分析
- 效能瓶頸與安全分析
- 跨平台相容性驗證

**抓包優勢：**
- ✅ 揭露日誌無法發現的問題
- ✅ 即時流量監控
- ✅ 協議層級深度分析
- ✅ 跨平台除錯
- ✅ 效能瓶頸定位

---

## 🛠️ 抓包環境準備

- 已 root 的 Android 裝置（推薦）
- tcpdump for Android
- Wireshark
- ADB 工具

**可選工具：**
- tPacketCapture（非 root 方案）
- NetworkMiner、Ettercap（進階分析）

> ⚠️ 非 root 方案如 tPacketCapture 可能丟包，僅適合簡單場景。

---

## 📝 tcpdump 抓包實戰

### 1. 下載並推送 tcpdump
```bash
adb shell getprop ro.product.cpu.abi
adb push tcpdump /data/local/tcpdump
```

### 2. 設定權限並驗證
```bash
adb shell
su
cd /data/local
chmod a+x tcpdump
./tcpdump --version
```

### 3. 開始抓包
```bash
./tcpdump -i any -p -s 0 -w /sdcard/capture.pcap
```

**常用參數說明：**
- `-i any`：監聽所有介面
- `-p`：非混雜模式
- `-s 0`：抓取完整封包
- `-w`：輸出到檔案

### 4. 進階抓包用法
- 指定介面：`-i wlan0`（WiFi）、`-i rmnet_data0`（行動數據）
- 協議過濾：`port 80 or port 443`、`tcp`、`host 192.168.1.100`
- 限制封包大小/檔案輪轉：`-s 1500`、`-W 5 -C 10`
- 即時輸出：`-v`、`-vvv`

---

## 🖥️ 抓包檔案分析

### 1. 拉取檔案到電腦
```bash
adb pull /sdcard/capture.pcap
```

### 2. 用 Wireshark 開啟分析
- 常用過濾：`http`、`ssl or tls`、`ip.addr == 192.168.1.100`、`tcp.port == 8080`、`dns`
- 連線問題排查：`tcp.flags.syn == 1 and tcp.flags.ack == 0`、`tcp.flags.reset == 1`

---

## 🧩 非 root 裝置抓包方案

- tPacketCapture（VPN 方式，易丟包）
- 代理抓包：設定 WiFi 代理，電腦端抓包
- ADB 埠轉發：`adb forward tcp:8080 tcp:8080`

---

## 🚨 常見問題排查

- 權限不足：su 後 chmod 755 /data/local/tcpdump
- 無資料包：檢查 root 權限、介面、命令參數
- 儲存空間不足：用外部儲存或限制檔案大小
- ADB 連線異常：重啟 adb、檢查 USB 除錯

---

## 🏆 真實案例與最佳實踐

- RTSP 推流斷線：抓包分析 keep-alive 問題
- API 逾時：定位 TCP reset
- 第三方函式庫異常：協議相容性分析

**安全合規建議：**
- 僅抓取授權流量，遵守隱私法規
- 用過濾器縮小抓包範圍
- 敏感資料加密儲存，分析後及時刪除

---

## 🔗 相關文章
- [iOS 網路抓包實戰](/2022-11-09-how-to-capture-network-packet-on-ios)
- [P2P 技術基礎](/2022-01-03-p2p-tech-1-ipv4-nat)
- [STUN/TURN/ICE 協議詳解](/2022-01-04-p2p-tech-2-stun-turn-ice)
- [WebRTC 實現](/2022-01-04/p2p-tech-3-webrtc-kvs)

---

## ✅ 總結

網路抓包是行動開發與疑難排查的利器。掌握 tcpdump + Wireshark，你將獲得：
- 🔍 深度網路洞察
- 🚀 快速定位問題
- 📈 效能與安全分析
- 🛠️ 跨平台除錯能力

**最佳實踐：**
1. 用過濾器聚焦目標流量
2. 控制環境，確保資料準確
3. 系統化分析與文件紀錄
4. 尊重隱私與安全合規

> 💡 日誌無聲、控制台無輸出時，網路封包最誠實。精通抓包能讓你除錯效率提升 10 倍！

**🔔 關注我們：** 持續關注網路分析與除錯系列乾貨！

**📚 延伸閱讀：**
- [tcpdump for Android](https://www.androidtcpdump.com/)
- [Wireshark 官方文件](https://www.wireshark.org/docs/)
- [Android 網路除錯](https://developer.android.com/studio/debug/network-profiler)
- [協議分析實戰](https://www.wireshark.org/docs/wsug_html_chunked/)
