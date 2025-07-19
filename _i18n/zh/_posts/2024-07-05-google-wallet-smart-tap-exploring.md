---
layout: post
title: "Google Wallet Smart Tap 深度解析：無接觸支付技術與未來趨勢"
date: 2024-07-05 20:00:00 +0800
description: "全面解讀 Google Wallet Smart Tap 技術，探索 NFC 通訊、終端整合與無接觸支付的未來。"
tags:
  [
    Google Wallet,
    Smart Tap,
    NFC,
    Contactless Payments,
    Payment Systems,
    Mobile Payments,
    Digital Wallets,
    Payment Technology,
    Terminal Integration,
    Security,
  ]
categories: [Payments, Technology, Mobile Development, Digital Wallets]
toc:
  sidebar: right
thumbnail: /assets/img/mika-baumeister-m7HWPWVjfJ4-unsplash.jpg
---

> 本文聚焦 Google Wallet Smart Tap 技術實現，助力開發者與企業深入理解無接觸支付整合方案。

## 引言：無接觸支付的演進

近期因專案需求，深入研究了 Google Wallet Smart Tap 技術。本文既是個人復盤，也為開發者提供創新支付技術的實用參考。

## 什麼是 NFC？

NFC（近場通訊）是一種短距離無線通訊技術，支援裝置間公分級資料交換，廣泛應用於支付、票務、資料傳輸等場景。

## Google Wallet Smart Tap 概述

Smart Tap 是 Google 基於 NFC 推出的專有協議，支援用戶透過行動裝置在支援終端上實現快速安全的交易與資料交換。

> **終端廠商注意：** 若需整合 Smart Tap，必須通過 Google 認證。認證流程需提交終端資訊、功能說明與目標市場，簽署 NDA 後方可取得相關文件。

## 整合前置條件

1. 建立 pass class 與 pass object
2. 與 Smart Tap 支援的終端廠商建立合作

主流支援廠商包括：Verifone、Ingenico、Pax、HID、Equinox、XAC 等。

## 關鍵識別碼說明

- **Redemption Issuer ID**（兌換發行方 ID）
- **Collector ID**（收款方 ID）
- **Pass class ID**（票證類型 ID）

### Issuer ID

Google Wallet 卡券發行方唯一識別，可在 [Google Pay & Wallet Console](https://pay.google.com/business/console/home?hl=zh-cn) 查詢。

### Redemption Issuer ID

兌換發行方 ID 通常代表單一商戶，Issuer ID 則可視為多商戶平台。開發完成後，pass class 與 object 需關聯 Redemption Issuer ID。

| ID        | 格式                    | 說明                      |
| --------- | ----------------------- | ------------------------- |
| Class ID  | `issuerId.classSuffix`  | classSuffix 由開發者自訂  |
| Object ID | `issuerId.objectSuffix` | objectSuffix 由開發者自訂 |

### Collector ID

- 終端支援 Smart Tap 時，Redemption Issuer 會有唯一 Collector ID（8 位數字）
- 終端透過 Collector ID 與用戶裝置通訊，裝置用 Collector ID 公鑰完成認證
- 一個 Issuer ID 僅對應一個 Collector ID，Collector ID 全域唯一

### Pass Class ID

用於識別具體票證類型，格式為 `issuerId.classSuffix`，同一 Issuer 可關聯多個 Redemption Issuer。

## 通訊流程與場景

終端透過 Collector ID 識別自身，Google Wallet App 檢查本地 pass class 與 Collector ID，找到匹配後將 pass 傳輸至終端。

### 場景一：單 Redemption Issuer

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example1.png" title="單 Redemption Issuer 通訊流程" %}

- Aggregator 建立 pass class 與 object
- Redemption Issuer 取得 Collector ID 並設定到終端
- 終端與 Google Wallet 透過 Collector ID 匹配傳輸 pass

### 場景二：多 Redemption Issuer

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example2.png" title="多 Redemption Issuer 通訊流程" %}

- Aggregator 在 pass class redemptionIssuers 屬性中新增多個 Redemption Issuer ID
- 各 Redemption Issuer 取得並設定各自 Collector ID

### 場景三：無 Aggregator（直發模式）

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example3.png" title="無 Aggregator 模式" %}

- 開發者直接建立 pass class 與 object
- Redemption Issuer ID 設定到 pass class redemptionIssuers 屬性
- 取得 Collector ID 並設定到終端

## 用戶體驗與行為

- 用戶在 Google Wallet App 選擇指定 pass 或解鎖主畫面後，觸碰終端即可傳輸 pass
- 若 Collector ID 匹配，pass 會被傳輸；否則不會傳輸
- 多個匹配時，用戶可選擇傳輸的 pass

## 技術實現要點

### Pass Class 設定範例

```json
{
  "issuerId": "2018",
  "classId": "2018.abc",
  "redemptionIssuers": ["1990", "2018"],
  "reviewStatus": "UNDER_REVIEW",
  "allowMultipleUsersPerObject": true,
  "redemptionChannel": "ONLINE",
  "enableSmartTap": true
}
```

### Pass Object 設定範例

```json
{
  "issuerId": "2018",
  "classId": "2018.abc",
  "objectId": "2018.123",
  "state": "ACTIVE",
  "heroImage": {
    "sourceUri": {
      "uri": "https://example.com/hero.jpg"
    }
  },
  "textModulesData": [
    {
      "header": "LOYALTY POINTS",
      "body": "500 points"
    }
  ]
}
```

## 安全與隱私設計

### 1. 認證流程

- 終端發送 Collector ID 至用戶裝置
- 裝置驗證 Collector ID 並用公鑰認證
- 傳輸 pass 資料至終端

### 2. 資料保護

- 傳輸全程加密
- Collector ID 唯一且不可重複使用
- 終端認證防止未授權存取

### 3. 隱私控制

- 用戶自主選擇傳輸哪些 pass
- 未經同意不共享個人資訊
- 僅匹配 Collector ID 時才傳輸 pass

## 實施最佳實踐

### 1. 終端設定

```bash
COLLECTOR_ID=12345678
REDEMPTION_ISSUER_ID=1990
TERMINAL_TYPE=VERIFONE
LOCATION_ID=STORE_001
```

### 2. Pass 開發

```kotlin
class SmartTapPassBuilder {
    fun createPass(
        issuerId: String,
        classSuffix: String,
        redemptionIssuers: List<String>
    ): PassClass {
        return PassClass(
            issuerId = issuerId,
            classId = "$issuerId.$classSuffix",
            redemptionIssuers = redemptionIssuers,
            enableSmartTap = true
        )
    }
}
```

### 3. 錯誤處理

```kotlin
sealed class SmartTapError {
    object CollectorIdMismatch : SmartTapError()
    object PassExpired : SmartTapError()
    object TerminalNotSupported : SmartTapError()
    object NetworkError : SmartTapError()
}

fun handleSmartTapError(error: SmartTapError) {
    when (error) {
        is SmartTapError.CollectorIdMismatch -> { /* 處理不匹配 */ }
        is SmartTapError.PassExpired -> { /* 處理過期 */ }
        // ... 其他情況
    }
}
```

## 效能與常見問題

| 方面      | 影響       | 優化建議          |
| --------- | ---------- | ----------------- |
| NFC 通訊  | 需低延遲   | 優化資料包大小    |
| Pass 驗證 | 即時性要求 | 快取驗證結果      |
| 終端回應  | 影響體驗   | 增加逾時處理      |
| 電池消耗  | NFC 耗電   | 減少 NFC 啟動時長 |

### 常見問題

- **Collector ID 不匹配**：檢查終端與 pass 設定
- **Pass 未被識別**：檢查 redemptionIssuers 設定
- **終端無回應**：確認終端認證與硬體支援

## 未來展望

- 生物認證與更強加密
- 交通、門禁、票務等多場景拓展
- iOS、可穿戴與 IoT 裝置整合

## 相關技術與標準

- NFC：ISO/IEC 14443、7816
- 支付協議：EMV、PCI DSS
- 行動平台：Android HCE、iOS Core NFC
- 安全標準：FIDO、OAuth 2.0

## 總結

Google Wallet Smart Tap 代表無接觸支付技術的重要進步，具備多層安全、極致體驗與彈性整合優勢。理解其技術實現與通訊流程，有助於開發者和企業把握數位支付未來。

**核心優勢：**

- 多層安全認證與加密
- 流暢用戶體驗
- 彈性終端整合
- 易於擴展新商戶與票證

## 相關文章

- [行動支付安全最佳實踐](/2024-12-01-google-adsense/)
- [NFC 技術實現指南](/2024-07-16-how-to-build-chiptool-for-android/)
- [數位錢包開發實戰](/2024-07-23-getting-started-with-github-container-registry/)
