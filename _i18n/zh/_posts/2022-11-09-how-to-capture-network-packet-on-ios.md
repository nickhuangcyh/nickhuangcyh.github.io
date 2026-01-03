---
layout: post
title: "iOS 網路封包捕獲完整教學：使用 rvictl 與 Wireshark 除錯技巧"
date: 2022-11-09 11:30:00 +0800
description: "學會在 iOS 裝置上捕獲與分析網路封包的完整流程。詳細解析 rvictl 虛擬網路介面設定、Wireshark 封包分析與常見問題排除。適用於 iOS App 開發、IoT 除錯與網路安全分析。"
tags: [iOS Network Analysis, Packet Capture, Wireshark Analysis, rvictl Tool, Network Debugging, iOS Development, Mobile Network, Traffic Analysis]
categories: [Tools]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jordan-harrison-40XgDxBfYXM-unsplash.jpg
---

## 前言

在上一篇文章中，我們探討了 [如何抓取 Android 的網路封包]({{ site.baseurl }}/tools/how-to-capture-network-packet-on-android-using-tcpdump/)。這次我們將重點轉向 iOS 平台的網路封包擷取方法。

相較於 Android 需要 root 權限的複雜流程，iOS 的封包擷取過程相對簡潔。不過對於初次操作的開發者來說，仍可能在權限設定或介面操作上遇到挑戰。

這篇教學將一步步引導你完成 iOS 網路封包擷取的完整流程。無論你是在進行 IoT 開發、除錯 App 連線問題，還是分析網路流量，這些技巧都將成為你的得力助手。

---

## 事前準備

在開始之前，請確保你已經準備好以下必要工具：

**硬體需求：**

1. 一台 iOS 裝置（iPhone 或 iPad）
2. 一條 USB 連接線
3. 一台 Mac 電腦

**軟體需求：**

1. `rvictl` 工具（Remote Virtual Interface，通常安裝 Xcode 後會自動包含）
2. [Wireshark](https://www.wireshark.org/download.html) 封包分析工具

> **注意事項：** `rvictl` 是 Apple 提供的命令列工具，專門用於在 Mac 上建立與 iOS 裝置的虛擬網路介面。這個工具讓我們能夠即時監控 iOS 裝置的網路流量。

---

## 步驟一：查看 Mac 上的網路介面

在建立虛擬網路介面之前，我們先來查看 Mac 電腦目前的網路介面狀況。這個步驟有助於確認稍後新增的虛擬介面是否成功建立。

執行以下命令來列出所有可用的網路介面：

```bash
ifconfig -l
```

你會看到類似以下的輸出結果：

```bash
lo0 gif0 stf0 anpi1 anpi0 anpi2 en4 en5 en6 en1 en2 en3 ap1 en0 awdl0 bridge0 utun0 utun1 utun2 en7
```

**說明：** 這些是你的 Mac 上目前所有的網路介面。當我們稍後成功建立虛擬介面時，你會看到一個新的 `rvi0` 介面出現在這個清單中。

---

## 步驟二：查詢 iOS 裝置 UUID

為了建立虛擬網路介面，我們需要取得 iOS 裝置的唯一識別碼（UUID）。這個 UUID 是每台裝置獨有的識別標記，`rvictl` 工具需要它來建立正確的連線。

按照以下步驟來取得你的 iOS 裝置 UUID：

**第一步：連接裝置**

1. 使用 USB 連接線將你的 iPhone 或 iPad 連接到 Mac
2. 確保裝置已解鎖並信任這台電腦

**第二步：開啟 Xcode**

1. 啟動 Xcode 應用程式
2. 在選單列選擇 **Window** ➜ **Devices and Simulators**

**第三步：查看 UUID**

1. 在左側裝置清單中找到你的 iOS 裝置
2. 點選裝置名稱，右側會顯示詳細資訊
3. 複製 **Identifier** 欄位中的 UUID，如下圖所示

{% include figure.liquid path="assets/img/ios_uuid.png" title="iOS 裝置 UUID 查詢" %}

> **小提示：** UUID 通常是一串由數字和字母組成的長字串，例如：`00008030-001E24E02188002E`。請將這個 UUID 複製下來，我們在下一個步驟會用到。

---

## 步驟三：建立虛擬網路介面

現在我們要使用 `rvictl` 工具來建立一個虛擬網路介面。這個介面將作為 iOS 裝置與 Wireshark 之間的橋樑。

**執行建立命令：**

將下面命令中的 UUID 替換為你在步驟二中取得的實際 UUID：

```bash
rvictl -s 00xxxxxx-xxxxxxxxxxxxxx1E
```

### 常見問題排解

如果執行命令後出現以下錯誤訊息：

```bash
bootstrap_look_up(): 1102
Starting device 00xxxxxx-xxxxxxxxxxxxxx1E [FAILED]
```

這通常表示系統服務 `com.apple.rpmuxd` 尚未啟動。請按照以下步驟進行排解：

**第一步：檢查服務狀態**

```bash
sudo launchctl list com.apple.rpmuxd
```

**第二步：如果服務未啟動，請執行：**

```bash
sudo launchctl load -w /Library/Apple/System/Library/LaunchDaemons/com.apple.rpmuxd.plist
```

### 驗證建立結果

成功建立虛擬介面後，再次執行網路介面查詢命令：

```bash
ifconfig -l
```

你應該會看到新增了一個 `rvi0` 虛擬介面：

```bash
lo0 gif0 stf0 ... en10 rvi0
```

**恭喜！** 看到 `rvi0` 表示虛擬網路介面已成功建立，我們現在可以開始監控 iOS 裝置的網路流量了。

---

## 步驟四：使用 Wireshark 進行封包擷取

現在虛擬網路介面已經建立完成，我們可以開始使用 Wireshark 來監控和分析 iOS 裝置的網路流量。

**啟動 Wireshark 並選擇介面：**

1. **開啟 Wireshark 應用程式**
   - 啟動 Wireshark（如果尚未安裝，請先從 [官方網站](https://www.wireshark.org/download.html) 下載）

2. **選擇監控介面**
   - 在主畫面的介面清單中找到 `rvi0`
   - 點擊 `rvi0` 開始封包擷取

{% include figure.liquid path="assets/img/wireshark_rvi0_interface.png" title="選擇 rvi0 虛擬網卡" %}

3. **開始監控**
   - 一旦選擇了 `rvi0` 介面，Wireshark 就會開始即時顯示你 iOS 裝置的所有網路活動
   - 你可以看到所有進出裝置的封包，包括 HTTP/HTTPS 請求、DNS 查詢等

{% include figure.liquid path="assets/img/wireshark_test_2.png" title="iOS 封包抓取畫面" %}

**實用技巧：**

- 使用 Wireshark 的篩選功能來專注於特定類型的流量
- 可以根據 IP 位址、通訊埠、通訊協定等進行篩選
- 對於 HTTPS 流量，雖然內容已加密，但你仍可以看到連線的目標位址和時間資訊

---

## 步驟五：清理虛擬網路介面

當你完成封包分析工作後，記得清理剛才建立的虛擬網路介面。這個步驟可以釋放系統資源並保持系統整潔。

**刪除虛擬介面：**

使用以下命令刪除虛擬網路介面（請將 UUID 替換為你的實際裝置 UUID）：

```bash
rvictl -x 00xxxxxx-xxxxxxxxxxxxxx1E
```

**驗證刪除結果：**

執行 `ifconfig -l` 確認 `rvi0` 介面已從清單中移除：

```bash
ifconfig -l
```

如果清理成功，你應該不會再看到 `rvi0` 介面出現在網路介面清單中。

---

## 總結

透過這篇教學，我們完成了 iOS 網路封包擷取的完整流程。相較於 Android 平台需要複雜的 root 權限設定，iOS 的封包擷取過程相對直觀且安全。

### iOS vs Android 封包擷取比較

**iOS 的優勢：**

- 無需 root 或越獄裝置
- 使用官方提供的 `rvictl` 工具，安全可靠
- 設定過程簡潔，只需要幾個步驟即可完成

**Android 的挑戰：**

- 通常需要 root 權限才能進行深度的封包分析
- 設定過程相對複雜，需要更多的技術背景

如果你還需要處理 Android 裝置的封包擷取，推薦參考我們的另一篇教學：[如何抓取 Android 的網路封包]({{ site.baseurl }}/tools/how-to-capture-network-packet-on-android-using-tcpdump/)。

### 實際應用場景

網路封包分析在現代軟體開發中扮演著關鍵角色：

**IoT 開發：** 當多個智慧裝置需要協同工作時，封包分析能幫你快速定位通訊問題。

**App 開發：** 無論是 API 呼叫失敗、連線逾時，還是資料傳輸異常，都能透過封包分析找出根本原因。

**系統整合：** 在複雜的系統整合專案中，封包分析提供了最直接的問題診斷方式。

> ##### 實務建議
>
> 封包分析是最誠實的除錯工具 - 它不會撒謊，也不會隱藏問題。在 IoT 整合、多平台通訊，或是神祕網路問題的排查上，Wireshark + rvictl 的組合是開發者的最佳夥伴。當 log 檔案無法提供足夠資訊時，封包分析往往能給你最直接的答案。
> {: .block-tip }

---

## 參考資源

- [Wireshark](https://www.wireshark.org/)
- [rvictl 工具參考](https://developer.apple.com/forums/thread/103245)
- [如何抓取 Android 的網路封包]({{ site.baseurl }}/tools/how-to-capture-network-packet-on-android-using-tcpdump/)
