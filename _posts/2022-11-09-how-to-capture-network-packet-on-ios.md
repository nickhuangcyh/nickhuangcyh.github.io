---
layout: post
title: 如何抓取 iOS 的網路封包
date: 2022-11-09 11:30:00 +0800
description: 教你如何使用 rvictl 與 Wireshark 抓取 iOS 裝置封包，快速分析連線問題，是 iOS 與 IoT 開發必備技巧！
tags: [iOS, Network, Packet, Wireshark, rvictl]
categories: [Tools]
toc:
#   beginning: true
  sidebar: right
thumbnail: /assets/img/jordan-harrison-40XgDxBfYXM-unsplash.jpg
---

## 前言

上一篇介紹了 [如何抓取 Android 的網路封包]({{ site.baseurl }}/tools/how-to-capture-network-packet-on-android-using-tcpdump/)，這篇就來補上 iOS 抓封包的方法。  
雖然 iOS 相對簡單許多，但第一次操作還是可能遇到一些權限或介面問題，這邊一次幫你整理。

---

## 事前準備

你需要準備以下工具：

1. 一台 iOS Device  
2. `rvictl` 工具（通常安裝 Xcode 後會內建）  
3. [Wireshark](https://www.wireshark.org/download.html)

---

## 查看 Mac 上的網路介面

```bash
ifconfig -l
```

範例輸出：

```bash
lo0 gif0 stf0 anpi1 anpi0 anpi2 en4 en5 en6 en1 en2 en3 ap1 en0 awdl0 bridge0 utun0 utun1 utun2 en7
```

---

## 查詢 iOS 裝置 UUID

1. 將 iPhone 透過 USB 接上 Mac  
2. 開啟 Xcode ➜ Window ➜ Devices and Simulators  
3. 找到裝置 UUID，如下圖所示

{% include figure.liquid path="assets/img/ios_uuid.png" title="iOS 裝置 UUID 查詢" %}

---

## 建立虛擬網路介面

```bash
rvictl -s 00xxxxxx-xxxxxxxxxxxxxx1E
```

如遇到錯誤：

```bash
bootstrap_look_up(): 1102
Starting device 00xxxxxx-xxxxxxxxxxxxxx1E [FAILED]
```

請確認 `com.apple.rpmuxd` 是否已啟動：

```bash
sudo launchctl list com.apple.rpmuxd
```

若無法找到，請執行：

```bash
sudo launchctl load -w /Library/Apple/System/Library/LaunchDaemons/com.apple.rpmuxd.plist
```

成功建立後，執行：

```bash
ifconfig -l
```

將會看到多出一個虛擬介面 `rvi0`：

```bash
lo0 gif0 stf0 ... en10 rvi0
```

---

## Wireshark 抓包流程

打開 Wireshark，選擇介面 `rvi0`，即可觀察 iOS 裝置上的所有封包。

{% include figure.liquid path="assets/img/wireshark_rvi0_interface.png" title="選擇 rvi0 虛擬網卡" %}
{% include figure.liquid path="assets/img/wireshark_test_2.png" title="iOS 封包抓取畫面" %}

---

## 刪除虛擬網路介面

```bash
rvictl -x 00xxxxxx-xxxxxxxxxxxxxx1E
```

---

## 總結

整體來說，在 iOS 上抓封包其實非常簡單，只需要透過 Xcode 工具建立一個虛擬網卡即可。  
相比之下，Android 抓包就麻煩許多，還需要 root 權限，推薦可以先參考這篇：[如何抓取 Android 的網路封包]({{ site.baseurl }}/tools/how-to-capture-network-packet-on-android-using-tcpdump/)

封包觀察對 IoT 或串流服務開發來說是非常重要的除錯方式。  
不論是 App、Server 還是 Firmware 層面的問題，透過封包往往能第一時間看出來，比對 log 更加直觀有效。

> ##### TIP
>
> 封包不會騙人，尤其在 IoT 整合與多平台通訊環境中，是最可靠的 debug 工具之一。如果你遇到神祕的連線問題，Wireshark + rvictl 是你的神兵利器。
{: .block-tip }

---

## 參考資源

- [Wireshark](https://www.wireshark.org/)
- [rvictl 工具參考](https://developer.apple.com/forums/thread/103245)
- [如何抓取 Android 的網路封包]({{ site.baseurl }}/tools/how-to-capture-network-packet-on-android-using-tcpdump/)