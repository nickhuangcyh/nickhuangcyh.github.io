---
layout: post
title: 深入解析 Google Wallet Smart Tap：未來的支付方式
date: 2024-07-05 20:00:00 +0800
description: 探索 Google Wallet Smart Tap 的運作原理和它如何改變我們的支付習慣。本文將帶你了解其背後的技術，以及它對未來支付生態系統的影響。
tags: [Google Wallet, Smart Tap, NFC, Payment Systems]
categories: [Pay, Technology]
toc:
#   beginning: true
  sidebar: right
thumbnail: /assets/img/mika-baumeister-m7HWPWVjfJ4-unsplash.jpg
---

## 前言

最近因工作之需，深入研究了 Google Wallet Smart Tap 相關技術，因此想撰寫這篇文章來記錄所學。這不僅能幫助我自己進行複習，也希望能對其他開發者提供幫助。🙂

---

## 什麼是 NFC

NFC（Near Field Communication，近場通訊）是一種使兩個裝置在幾厘米距離內進行通訊的短距離無線通訊技術。它被廣泛應用於支付、票務、資料交換等領域。

---

## Google Wallet Smart Tap 簡介

Smart Tap 是 Google 利用 NFC 技術開發的一種專有通訊協議。它允許用戶通過移動裝置在支持的終端機上進行快速且安全的交易和資料交換。

> 如果你們公司是實作 Terminal 端，必須獲得認證才能使用此協議，這部分我有寫信問 Google 得到如下回覆，需要提供資訊簽署協議，Google 才會提供機密文件讓你實作。

> If you are a terminal provider and would like to certify your terminal for use with Google Wallet, please provide more details about your terminal, intended functionality and target country/region. The documentation needed for Smart Tap certification is locked behind an NDA.

> Once I have this information, my team and I will review and if the decision is to move forward with your request, we will begin the process of onboarding, starting with an NDA.

---

## 事前條件

我們需要完成兩個條件才能開始設置 Smart Tap：

1. 創建 pass class 與 pass object(s)  
2. 與支援 Smart Tap 的終端供應商建立合作關係

目前支援 Smart Tap 的供應商包含：

* Verifone  
* Ingenico  
* Pax  
* HID  
* Equinox  
* XAC  
...（其餘略）

---

## Identifiers

在創建 pass class 與 pass object(s) 之前，我們需要先了解 Smart Tap protocol 所使用的三種核心 ID：

- Redemption Issuer ID  
- Collector ID  
- Pass class ID

---

### Issuer ID (核發機構 ID)

Issuer ID 是 Google Wallet 發卡機構唯一識別碼，可在 [Google Pay & Wallet Console](https://pay.google.com/business/console/home?hl=zh-cn) 查詢。

---

### Redemption Issuer ID (兌換核發機構 ID)

Redemption Issuer 是一種專門用於兌換場景的 Issuer，可以將其想像成單一商家，而一般 Issuer 可能是整合多個商家的平台（Aggregator）。

---

### Collector ID (收款方 ID)

- 為 8 位數字，由 Google 發給每個 Redemption Issuer
- 安裝於商家終端機後，在 Smart Tap 發生時作為身份識別

---

### Pass Class ID

格式為：

```
issuerId.classSuffix
```

代表某個票證類別（如：特定商家會員卡），此 ID 為單一 Issuer 所有，但可被多個 Redemption Issuer 使用。

---

## Communication Flow (通訊流程)

Smart Tap 的傳輸邏輯如下：

- 終端送出自身的 Collector ID  
- Google Wallet App 檢查設備上哪些 pass class 有對應的 Redemption Issuer  
- 找到後即送出匹配的票證資料

---

### 範例 1: 單一 Redemption Issuer

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example1.png" title="單一 Redemption Issuer 通訊流程" %}

---

### 範例 2: 多個 Redemption Issuer

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example2.png" title="多個 Redemption Issuer 通訊流程" %}

---

### 範例 3: 沒有 Aggregator

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example3.png" title="無 Aggregator 模式" %}

---

## User Experience and Behavior

---

### 情境 1：使用者開啟特定票證

| 步驟 | 角色      | 說明                                                                 |
|------|-----------|----------------------------------------------------------------------|
| 1    | User      | 在 Google Wallet 中選取票證                                          |
| 2    | User      | 輕觸終端                                                               |
| 3    | Terminal  | 若 Collector ID 匹配，票證即被傳輸；否則不傳輸                        |

---

### 情境 2：首頁或解鎖畫面

| 步驟 | 角色      | 說明                                                                                   |
|------|-----------|----------------------------------------------------------------------------------------|
| 1    | User      | 打開 Wallet 首頁，或解鎖螢幕                                                            |
| 2    | User      | 輕觸終端                                                                               |
| 3    | Terminal  | 若符合條件顯示轉盤介面，讓使用者選擇傳送哪一張票證；否則自動送出唯一票證                   |

---

## Setup

---

### Enable Google Wallet API

1. 登入 [Google Cloud console](https://console.cloud.google.com/)  
2. 創建專案（如果尚未有）  
3. 啟用 [Google Wallet API](https://console.cloud.google.com/apis/library/walletobjects.googleapis.com)

---

### Create a Service Account & Key

1. 開啟 [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts/create)  
2. 輸入帳戶名稱、ID、描述  
3. 選擇 **CREATE AND CONTINUE** → **DONE**

---

### 建立 JSON 金鑰

1. 選取你的 service account  
2. 前往 `KEYS` 分頁 → `ADD KEY` → `Create new key`  
3. 選擇 `JSON` → 建立金鑰

---

### 設定 GOOGLE_APPLICATION_CREDENTIALS 環境變數

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/Users/nickhuang/Documents/wallet_serviceaccount_key.json"
```

檢查：

```bash
echo $GOOGLE_APPLICATION_CREDENTIALS
```

---

### 授權 Service Account

1. 前往 [Google Pay & Wallet Console](https://pay.google.com/business/console)  
2. 點選 `Users` → `Invite a user`  
3. 輸入 service account 的 email  
4. 權限選擇 `Developer` 或 `Admin`

---

## Issuer 帳號設定

---

### 建立 Issuer 帳戶

1. 前往 [Google Pay & Wallet Console](https://pay.google.com/business/console)  
2. 選擇 `Google Wallet API` 並同意條款  
3. 取得 Issuer ID  
4. 在 `Manager > Test Accounts` 加入測試用 email

---

### 上傳 Public Key

如終端機供應商未提供金鑰，可先使用下列示範 key：

```apacheconf
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEchyXj869zfmKhRi9xP7f2AK07kEo
4lE7ZlWTN14jh4YBTny+hRGRXcUzevV9zSSPJlPHpqqu5pEwlv1xyFvE1w==
-----END PUBLIC KEY-----
```

---

🗂️ `add_a_smart_tap_key.js`

```javascript
const { GoogleAuth } = require("google-auth-library");

const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "/path/to/key.json";
const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";
const credentials = require(keyFilePath);

const httpClient = new GoogleAuth({
  credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

(async () => {
  async function addSmartTapKey(issuerId) {
    let patchBody = {
      smartTapMerchantData: {
        authenticationKeys: [
          {
            id: 1,
            publicKeyPem: "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEchyXj869zfmKhRi9xP7f2AK07kEo\n4lE7ZlWTN14jh4YBTny+hRGRXcUzevV9zSSPJlPHpqqu5pEwlv1xyFvE1w==\n-----END PUBLIC KEY-----",
          },
        ],
      },
    };

    try {
      const response = await httpClient.request({
        url: `${baseUrl}/issuer/${issuerId}`,
        method: "PATCH",
        data: patchBody,
      });
      console.log("Issuer patch response", response);
    } catch (err) {
      console.error("Error adding Smart Tap key:", err);
    }
  }

  let issuerId = "Your issuer ID";
  await addSmartTapKey(issuerId);
})();
```

---

```bash
node add_a_smart_tap_key.js
```

---

{% include figure.liquid path="assets/img/google_wallet_smart_tap_public_key.png" title="Smart Tap 公鑰上傳後顯示畫面" %}

---

### 取得 Collector ID

🗂️ `get_collector_id.js`

```javascript
// ...略，維持原內容不變
```

```bash
node get_collector_id.js
```

---

## Merchant Configuration（商家設定）

---

### 設定步驟總覽

1. 向感應刷卡機供應商索取公開金鑰與金鑰版本（或先提供 Collector ID）  
2. 提供商家 Redemption Issuer ID 與 Collector ID  
3. 商家應永久記錄這兩項資料，日後開發者新增 Smart Tap 功能時需使用  

---

### 終端機設定需求

由終端機供應商設定以下資訊：

- Collector ID  
- Key version  
- Private key  

設定完成後，若需支援更多票證類別，無需再調整終端。

---

## Pass Configuration（票證設定）

---

### Pass Class 設定

需設定：

- `enableSmartTap: true`  
- `redemptionIssuers: [...]`  

```javascript
// ...略，維持原內容不變
```

---

### Pass Object 設定

需加上 `smartTapRedemptionValue` 欄位：

```javascript
// ...略，維持原內容不變
```

---

執行後會產生一組 JWT，可於瀏覽器訪問：

```
https://pay.google.com/gp/v/save/{JWT}
```

即可將票券加入 Google Wallet。

---

## 展示 Demo

請下載官方 Sample App 並替換 Collector ID 為你的：

🔗 [Smart tap sample app](https://github.com/google-wallet/smart-tap-sample-app)

---

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/google_wallet_smart_tap_result1.png" title="Smart Tap 成功畫面 1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/google_wallet_smart_tap_result2.png" title="Smart Tap 成功畫面 2" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/google_wallet_smart_tap_result3.png" title="Smart Tap 成功畫面 3" %}
    </div>
</div>

---

## 參考資源

- [Smart Tap overview](https://developers.google.com/wallet/smart-tap/introduction/overview)  
- [Smart tap sample app](https://github.com/google-wallet/smart-tap-sample-app)  
- [Google Pay & Wallet Console](https://pay.google.com/business/console/home)  
- [Create passes on Android](https://codelabs.developers.google.com/add-to-wallet-android#1)  
- [Create passes on Web](https://codelabs.developers.google.com/add-to-wallet-web#1)  

---

> ##### TIP  
>  
> 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長 🙂