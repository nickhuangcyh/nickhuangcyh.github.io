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

最近因工作需要，我深入研究了 Google Wallet Smart Tap 相關技術。這項技術正在改變我們對行動支付的理解和使用方式。

撰寫這篇文章的目的有兩個：首先是記錄自己的學習心得，方便日後複習。其次是希望能幫助其他開發者快速理解這項技術的核心概念和實作方法。

在這篇文章中，我將從基礎概念開始，逐步介紹如何實際部署和使用 Smart Tap 技術。

---

## 什麼是 NFC

NFC（Near Field Communication，近場通訊）是一種短距離無線通訊技術。簡單來說，它讓兩個裝置可以在極短距離內（通常是幾厘米）進行資料傳輸。

這項技術的主要特點包括：
- **超近距離通訊**：有效範圍約 4 厘米，確保安全性
- **低功耗**：不會大量消耗電池
- **快速連接**：建立連接只需不到一秒

NFC 技術在日常生活中的應用相當廣泛，包括行動支付、交通票卡、門禁卡，以及各種資料交換應用。

---

## Google Wallet Smart Tap 簡介

Smart Tap 是 Google 基於 NFC 技術開發的專有通訊協議。它的核心功能是讓使用者能夠透過手機，在支援的終端機上進行快速且安全的交易。

這項技術的優勢在於：
- **快速交易**：只需輕觸終端機即可完成操作
- **安全可靠**：採用加密通訊協議
- **使用便利**：不需要額外的實體卡片

**重要提醒：開發者認證要求**

如果您的公司要開發支援 Smart Tap 的終端設備，必須先通過 Google 的認證程序。根據我向 Google 詢問得到的回覆，整個流程如下：

> If you are a terminal provider and would like to certify your terminal for use with Google Wallet, please provide more details about your terminal, intended functionality and target country/region. The documentation needed for Smart Tap certification is locked behind an NDA.

> Once I have this information, my team and I will review and if the decision is to move forward with your request, we will begin the process of onboarding, starting with an NDA.

簡而言之，您需要提供終端設備的詳細資訊、預期功能和目標市場，Google 會根據這些資訊決定是否批准您的申請。一旦通過審核，Google 會要求簽署保密協議（NDA），然後提供技術文件。

---

## 開始之前：必要條件

在實作 Smart Tap 功能之前，我們需要先滿足兩個基本條件。這些條件確保整個系統能夠正常運作：

### 1. 創建數位票證系統
首先，您需要建立完整的數位票證架構，包括：
- **Pass Class（票證類別）**：定義票證的基本模板和屬性
- **Pass Objects（票證物件）**：實際發給使用者的個別票證

### 2. 建立終端設備合作關係
其次，您必須與支援 Smart Tap 技術的終端供應商建立合作關係。

**目前支援的主要供應商包括：**
- Verifone
- Ingenico  
- Pax
- HID
- Equinox
- XAC
- 以及其他經 Google 認證的供應商

這些供應商能提供相容的硬體設備和技術支援，確保您的 Smart Tap 實作能夠順利運行。

---

## 核心識別系統：重要的 ID 概念

Smart Tap 協議使用多種識別碼來管理不同的實體和權限。在開始建立票證之前，我們必須先理解這些核心概念：

**三個關鍵識別碼：**
- **Redemption Issuer ID**（兌換核發機構 ID）：代表特定商家或兌換方
- **Collector ID**：終端設備的身份識別碼
- **Pass Class ID**：票證類別的唯一識別碼

接下來，我們將逐一詳細說明這些識別碼的用途和設定方法。

---

### Issuer ID（核發機構 ID）

**基本概念**

Issuer ID 是 Google Wallet 系統中每個發卡機構的唯一識別碼。這個 ID 就像是您在 Google Wallet 生態系統中的「身份證號碼」。

**取得方式**

您可以在 [Google Pay & Wallet Console](https://pay.google.com/business/console/home?hl=zh-cn) 中找到您的 Issuer ID。這個控制台是管理所有 Google Wallet 相關服務的中央平台。

---

### Redemption Issuer ID（兌換核發機構 ID）

**角色定義**

Redemption Issuer ID 是一種特殊的 Issuer ID，專門用來代表「可以兌換票證的商家」。我們可以用一個簡單的比喻來理解：

- **Issuer ID** = 購物中心管理公司（管理多個商家的平台）
- **Redemption Issuer ID** = 購物中心內的個別商店（實際提供服務的商家）

**應用範圍**

Issuer ID 可以代表各種不同的實體：
- 個別商家（如咖啡店、餐廳）
- 優惠券發行商
- 大型商場（如 SOGO、新光三越）
- 終端機製造商

**ID 格式規範**

當您創建 pass class 和 pass objects 時，它們會與 Redemption Issuer ID 建立關聯。系統採用以下格式：

| ID 類型    | 格式                  | 說明                                                        |
| --------- | --------------------- | ---------------------------------------------------------- |
| Class ID  | issuerId.classSuffix  | classSuffix 是開發者為特定票證類別定義的唯一值（如會員等級） |
| Object ID | issuerId.objectSuffix | objectSuffix 是開發者為特定票證物件定義的唯一值（如使用者 ID）|

---

### Collector ID（收款方 ID）

**核心功能**

Collector ID 是終端設備的身份識別碼，在 Smart Tap 通訊過程中扮演關鍵角色。

**技術規格**
- **格式**：8 位數字的 ID
- **作用範圍**：每個支援 Smart Tap 的商家終端都有專屬的 Collector ID

**運作機制**

當使用者將手機靠近支援 Smart Tap 的終端時，會發生以下過程：

1. **終端識別**：終端機將自己的 Collector ID 發送到使用者設備
2. **金鑰驗證**：使用者設備使用該 Collector ID 對應的 public key 進行身份驗證
3. **資料交換**：驗證成功後開始安全的資料傳輸

**重要限制**
> **分配規則**：
> 1. 一個 Issuer ID 只能分配一組 Collector ID
> 2. Collector ID 在整個系統中必須是唯一的

---

### Pass Class ID（票證類別 ID）

**定義與用途**

Pass Class ID 用來標示特定的票證類型或層級，例如不同等級的會員卡、不同種類的優惠券等。

**ID 格式**
```
issuerId.classSuffix
```

**組成說明**
- **issuerId**：您的核發機構 ID
- **classSuffix**：由您自定義的票證類別識別碼

這個 classSuffix 是您為每個票證類別設計的獨特標識符。透過這個 Pass Class，您可以創建多個 Pass Objects，這些物件都會繼承該類別的基本屬性。

**權限管理**
> **所有權規則**：
> - Pass Class ID 屬於單一 Issuer 帳號
> - 但可以與多個 Redemption Issuer 建立關聯
> 
> 這意味著一個票證類別可以在多個商家使用，增加了系統的靈活性。

---

## Smart Tap 通訊流程解析

Smart Tap 的通訊機制是整個系統的核心。理解這個流程有助於您更好地設計和偵錯您的應用程式。

**基本通訊原理**

整個通訊過程可以分為四個階段：

1. **終端識別階段**：終端使用 Collector ID 來識別自己的身份
2. **ID 對映階段**：Collector ID 會對應到特定的 Redemption Issuer ID  
3. **票證搜尋階段**：當 Smart Tap 觸發時，終端將 Collector ID 發送給使用者設備
4. **票證傳輸階段**：Google Wallet App 搜尋匹配的票證並回傳給終端

**詳細處理流程**

當使用者將手機靠近終端時：

1. **終端廣播**：終端機發送自己的 Collector ID
2. **應用程式檢索**：Google Wallet App 掃描設備中所有儲存的票證
3. **匹配驗證**：系統比對票證的 Pass Class ID 和終端的 Collector ID
4. **結果回傳**：找到匹配的票證後，App 將相關票證資訊傳送至終端

這個設計確保只有授權的票證才能在對應的終端上使用，大大提升了系統的安全性。

---

### 實際案例 1：單一商家模式

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example1.png" title="單一 Redemption Issuer 通訊流程" %}

**情境說明**

這個案例展示了最常見的 Smart Tap 部署模式：一個票證開發平台為單一商家提供服務。

**參與角色解析**

在這個範例中，有兩個不同的參與者：

- **Issuer `2018`**：票證開發者（扮演 Aggregator 角色）
- **Issuer `1990`**：fooPizza 披薩店（扮演 Redemption Issuer 角色）

**實作步驟詳解**

假設 fooPizza 想要在他們的店內啟用 Smart Tap 功能，以下是完整的設定流程：

| 步驟 | 負責角色          | 具體操作內容                                                                                        |
| :--: | :---------------: | :------------------------------------------------------------------------------------------------- |
|  1   | Aggregator        | **建立票證架構**：創建票證類別（Class ID: abc）和票證物件（Object ID: 123）                        |
|  2   | Aggregator        | **設定兌換權限**：在票證類別的 `redemptionIssuers` 屬性中加入 fooPizza 的 Issuer ID (1990)        |
|  3   | Redemption Issuer | **取得設備識別碼**：向 Google 申請並獲得專屬的 Collector ID（範例中為 12345678）                   |
|  4   | Redemption Issuer | **配置終端設備**：在店內所有支援 Smart Tap 的刷卡機上設定 Collector ID 12345678                   |

**運作結果**

設定完成後，任何同時符合以下條件的票證都會在 fooPizza 的終端上順利運作：
- 票證的 Class ID 為 `abc`
- 終端的 Collector ID 為 `12345678`

這確保了只有授權的票證才能在指定商家使用。

---

### 實際案例 2：多商家聯盟模式

**應用情境**

這個案例展示了更進階的部署模式：一個票證類別可以在多個不同的商家使用。這種架構特別適用於：
- 購物中心的統一會員卡系統
- 連鎖品牌的多店面整合
- 聯盟商家的共用優惠券

**重要概念**

在多商家模式中，核心原則是：「一個 Pass Class 可以對應多個 Redemption Issuer」。為了讓特定商家能夠兌換票證，該商家的 Redemption Issuer ID 必須在 Pass Class 創建時就加入 `redemptionIssuers` 屬性中。

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example2.png" title="多個 Redemption Issuer 通訊流程" %}

**參與角色解析**

這個範例涉及三個不同的參與者：

- **Issuer `8088`**：票證開發平台（Aggregator）
- **Issuer `1990`**：fooPizza 披薩店（Redemption Issuer）
- **Issuer `2018`**：yumPie 烘焙坊（Redemption Issuer）

**設定流程詳解**

為了讓同一張票證能在兩家不同店面使用，需要完成以下步驟：

| 步驟 | 負責角色          | 具體操作內容                                                                                      |
| :--: | :---------------: | :----------------------------------------------------------------------------------------------- |
|  1   | Aggregator        | **建立共用票證**：創建票證類別（Class ID: abc）和票證物件（Object ID: 123）                     |
|  2   | Aggregator        | **授權多商家**：在 `redemptionIssuers` 屬性中同時加入兩家店的 ID (1990 和 2018)                |
|  3   | Redemption Issuer | **各自取得 ID**：fooPizza 獲得 Collector ID `12345678`，yumPie 獲得 Collector ID `18802001`   |
|  4   | Redemption Issuer | **各店配置終端**：每家店在自己的終端設備上配置專屬的 Collector ID                              |

**系統運作邏輯**

設定完成後，持有 Class ID 為 `abc` 票證的用戶可以在兩家店使用：
- 在 fooPizza：終端 Collector ID `12345678` 會識別並接受該票證
- 在 yumPie：終端 Collector ID `18802001` 同樣會識別並接受該票證

這種架構大大提升了票證的使用彈性，同時維持各商家終端的獨立性。

---

### 實際案例 3：自主開發模式（無中介平台）

**應用情境**

這個案例展示了最簡化的部署模式：商家自己開發和管理票證系統，不需要第三方平台代理。這種模式特別適合：
- 具備技術團隊的大型企業
- 想要完全掌控票證系統的商家
- 不需要與其他商家整合的獨立業者

**核心特色**

在這種模式下，開發者和兌換方是同一個實體。換句話說，「我開發的票證，我自己使用」。這簡化了權限管理和溝通流程。

{% include figure.liquid path="assets/img/google_wallet_smart_tap_communication_flow_example3.png" title="無 Aggregator 模式" %}

**角色整合**

在這個範例中，只有一個主要參與者：
- **Issuer `2018`**：同時扮演票證開發者和 Redemption Issuer 的角色

**實作流程**

由於開發者就是使用者，設定流程變得相對簡單：

| 步驟 | 負責角色       | 具體操作內容                                                                               |
| :--: | :------------: | :----------------------------------------------------------------------------------------- |
|  1   | Pass Developer | **建立票證系統**：創建票證類別（Class ID: abc）和票證物件（Object ID: 123）               |
|  2   | Pass Developer | **自我授權**：在 `redemptionIssuers` 屬性中加入自己的 Issuer ID (2018)                   |
|  3   | Pass Developer | **申請設備 ID**：向 Google 申請並獲得 Collector ID（範例中為 12345678）                   |
|  4   | Pass Developer | **配置自家終端**：在自己的所有 Smart Tap 終端設備上配置 Collector ID 12345678             |

**優勢與考量**

這種模式的主要優勢：
- **簡化管理**：不需要與其他角色協調
- **完全控制**：對票證系統有絕對的掌控權
- **快速部署**：減少溝通成本，加快上線速度

需要考慮的因素：
- **技術門檻**：需要具備完整的開發和維護能力
- **擴展性**：如果未來想與其他商家合作，需要重新架構系統

---

## 使用者體驗與行為模式

Smart Tap 的使用體驗會根據使用者當下與 Google Wallet 應用程式的互動方式而有所不同。了解這些行為模式有助於設計更好的用戶體驗。

系統會根據使用者的操作狀態，智慧決定要傳送哪些票證資訊給終端設備。

---

### 使用情境 1：主動選擇特定票證

**使用流程**

這是最直接的使用方式，使用者明確知道要使用哪張票證：

| 步驟 | 操作角色 | 詳細說明                                                                                   |
| :--: | :------: | :---------------------------------------------------------------------------------------- |
|  1   |   使用者 | **選擇票證**：在 Google Wallet 應用程式中主動選取要使用的特定票證                        |
|  2   |   使用者 | **執行 Smart Tap**：將手機靠近支援 Smart Tap 的感應式讀卡機                             |
|  3   |   終端   | **驗證與回應**：系統檢查 Collector ID 是否匹配，決定是否傳送票證                         |

**系統行為邏輯**

- **ID 匹配成功**：票證順利傳送至終端機，完成交易
- **ID 不匹配**：票證不會傳送，保護系統安全

**重要提醒**

> **票證有效性檢查**：只要 Collector ID 匹配，系統就會傳送票證，即使該票證可能已經過期。這意味著票證的有效性檢查主要由終端設備負責處理。

---

### 使用情境 2：從首頁或鎖定畫面操作

**使用流程**

這種情況下，使用者沒有預先選擇特定票證，系統需要智慧判斷：

| 步驟 | 操作角色 | 詳細說明                                                                                 |
| :--: | :------: | :-------------------------------------------------------------------------------------- |
|  1   |   使用者 | **準備狀態**：停留在 Google Wallet 首頁，或在鎖定畫面狀態                             |
|  2   |   使用者 | **執行 Smart Tap**：將手機靠近支援 Smart Tap 的感應式讀卡機                           |
|  3   |   終端   | **智慧選擇**：系統根據可用票證數量，採用不同的處理策略                                |

**系統智慧判斷機制**

系統會根據匹配結果採用不同策略：

- **單一匹配**：如果只有一張票證的 Collector ID 與終端匹配，直接傳送該票證
- **多重匹配**：如果有多張票證都符合條件，系統會：
  - 顯示票證選擇介面
  - 讓使用者從有效票證中選擇
  - 傳送使用者最終選定的票證

這種設計確保了即使在複雜情況下，使用者仍能獲得良好的使用體驗。

---

## 系統設定教學：從零開始建立 Smart Tap

現在讓我們進入實作階段。本節將詳細說明如何從頭開始設定一個完整的 Smart Tap 系統。

### 第一步：啟用 Google Wallet API

**為什麼需要這個步驟？**

Google Wallet API 是整個 Smart Tap 系統的基礎。沒有啟用這個 API，您的應用程式無法與 Google Wallet 服務進行通訊。

**操作步驟**

1. **登入管理平台**：前往 [Google Cloud Console](https://console.cloud.google.com/) 並使用您的 Google 帳號登入

2. **建立或選擇專案**：
   - 如果您還沒有 Google Cloud 專案，請建立一個新專案
   - 詳細步驟可參考 [Google 官方文件](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

3. **啟用 API 服務**：
   - 前往 [Google Wallet API 頁面](https://console.cloud.google.com/apis/library/walletobjects.googleapis.com)
   - 點擊「啟用」按鈕
   - ※ 此 API 有時也稱為「Google Pay for Passes API」

---

### 第二步：建立服務帳號與金鑰

**基本概念說明**

在開始之前，讓我們先理解幾個關鍵概念：

- **Service Account（服務帳號）**：這是您的應用程式在 Google 系統中的身份證明
- **Service Account Key（服務帳號金鑰）**：包含私密金鑰的檔案，用來證明您的應用程式身份
- **重要性**：這個金鑰檔案極為敏感，請妥善保管，避免外洩

**為什麼需要 Service Account？**

當您的應用程式要呼叫 Google Wallet API 時，Google 需要驗證呼叫者的身份。Service Account 就是這個身份驗證機制的核心。

---

#### 步驟 2-1：建立服務帳號

**操作流程**

1. **進入服務帳號頁面**：
   - 在 Google Cloud Console 中前往 [Service Accounts 頁面](https://console.cloud.google.com/iam-admin/serviceaccounts/create)

2. **填寫帳號資訊**：
   - **服務帳號名稱**：建議使用有意義的名稱，如「wallet-smart-tap-service」
   - **服務帳號 ID**：系統會自動產生，您也可以自行修改
   - **描述**：簡述此帳號的用途，如「用於 Google Wallet Smart Tap API 存取」

3. **完成建立**：
   - 點擊「**CREATE AND CONTINUE**」
   - 點擊「**DONE**」完成建立

---

#### 步驟 2-2：產生服務帳號金鑰

**操作流程**

1. **選擇帳號**：在服務帳號列表中，點擊您剛建立的服務帳號

2. **進入金鑰管理**：點擊「**KEYS**」標籤頁

3. **建立新金鑰**：
   - 點擊「**ADD KEY**」
   - 選擇「**Create new key**」

4. **選擇格式**：
   - 選擇「**JSON**」格式（這是推薦格式）
   - 點擊「**CREATE**」

5. **儲存金鑰檔案**：
   - 系統會自動下載 JSON 檔案
   - 請將此檔案儲存在安全的位置

---

#### 步驟 2-3：設定環境變數

**為什麼需要環境變數？**

`GOOGLE_APPLICATION_CREDENTIALS` 環境變數告訴 Google SDK 在哪裡找到您的服務帳號金鑰檔案。這是 Google Cloud 官方推薦的身份驗證方法。

**設定方法**

1. **參考官方文件**：
   - 請依照 [Google Cloud 官方指南](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-key) 設定環境變數

2. **實際操作**：
   - 在終端機執行以下指令（請修改檔案路徑）：
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/Users/nickhuang/Documents/wallet_serviceaccount_key.json"
   ```

3. **永久設定**：
   - 若要永久生效，請將上述指令加入 `.bashrc` 或 `.zshrc` 檔案

4. **驗證設定**：
   - 執行以下指令確認設定成功：
   ```bash
   echo $GOOGLE_APPLICATION_CREDENTIALS
   ```

---

#### 步驟 2-4：授權服務帳號

**最後一步：授予權限**

建立服務帳號後，還需要在 Google Wallet 系統中授予它管理票證的權限。

**操作步驟**

1. **開啟 Wallet 控制台**：前往 [Google Pay & Wallet Console](https://pay.google.com/business/console)

2. **進入使用者管理**：點擊「**Users**」選項

3. **邀請服務帳號**：
   - 點擊「**Invite a user**」
   - 輸入服務帳號的 email 地址（格式通常為：`your-service-name@your-project.iam.gserviceaccount.com`）

4. **設定權限等級**：
   - 從「**Access level**」下拉選單選擇「**Developer**」或「**Admin**」
   - **Developer**：適合一般開發需求
   - **Admin**：適合需要完整管理權限的情況

5. **完成邀請**：點擊「**Invite**」

---

## 第三步：核發機構帳戶設定

現在我們要設定 Issuer 帳戶，這是管理所有票證類別和物件的中央控制中心。

---

### 建立新的 Issuer 帳戶

**設定流程**

1. **開啟管理控制台**：前往 [Google Pay & Wallet Console](https://pay.google.com/business/console)

2. **建立發行者帳戶**：
   - 按照畫面上的指示逐步完成帳戶建立
   - 系統會引導您完成必要的資訊填寫

3. **選擇服務類型**：選擇「**Google Wallet API**」

4. **確認條款**：仔細閱讀並確認您了解服務條款和隱私政策

5. **記錄重要資訊**：
   - **複製 Issuer ID**：這是您帳戶的唯一識別碼，請儲存在安全的地方
   - 這個 ID 在後續所有程式碼中都會用到

6. **設定測試環境**：
   - 在「**Manager**」標籤下選擇「**Set up test accounts**」
   - 新增您想要參與測試的 email 地址
   - 這些帳戶將能夠在測試階段使用您開發的票證

---

### 上傳公開金鑰（Public Key）

**重要提醒**

在開始之前，您需要了解一個可能的順序問題：

> **先有雞還是先有蛋的問題**：有些終端供應商可能要求您先提供 Collector ID，他們才會給您 Public Key。但是要產生 Collector ID，您又需要先上傳 Public Key。
> 
> **解決方案**：您可以先使用下方提供的示範金鑰來產生 Collector ID，等終端供應商提供實際的公開金鑰後，再替換掉示範金鑰。

**示範公開金鑰**

以下是用於測試的公開金鑰：

```apacheconf
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEchyXj869zfmKhRi9xP7f2AK07kEo
4lE7ZlWTN14jh4YBTny+hRGRXcUzevV9zSSPJlPHpqqu5pEwlv1xyFvE1w==
-----END PUBLIC KEY-----
```

**上傳金鑰的程式碼**

🗂️ [add_a_smart_tap_key.js] - 用於上傳公開金鑰的腳本

```javascript
const { GoogleAuth } = require("google-auth-library");

// 設定檔案路徑和基本 URL
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "/path/to/key.json";
const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";
const credentials = require(keyFilePath);

// 建立 HTTP 客戶端，用於 API 呼叫
const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

(async () => {
  /**
   * 新增公開金鑰到 Issuer 帳戶
   *
   * @param {string} issuerId 您的 Issuer ID
   */
  async function addSmartTapKey(issuerId) {
    // 準備要上傳的金鑰資料
    let patchBody = {
      smartTapMerchantData: {
        authenticationKeys: [
          {
            id: 1, // 金鑰 ID
            publicKeyPem:
              "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEchyXj869zfmKhRi9xP7f2AK07kEo\n4lE7ZlWTN14jh4YBTny+hRGRXcUzevV9zSSPJlPHpqqu5pEwlv1xyFvE1w==\n-----END PUBLIC KEY-----",
          },
        ],
      },
    };

    try {
      // 發送 PATCH 請求更新 Issuer 設定
      let response = await httpClient.request({
        url: `${baseUrl}/issuer/${issuerId}`,
        method: "PATCH",
        data: patchBody,
      });

      console.log("✅ 公開金鑰上傳成功");
      console.log(response);
    } catch (err) {
      console.error("❌ 上傳公開金鑰時發生錯誤:", err);
    }
  }

  // 🔧 請將下方的 "Your issuer ID" 替換為您實際的 Issuer ID
  let issuerId = "Your issuer ID";
  await addSmartTapKey(issuerId);
})();
```

**執行腳本**

在終端機中執行以下指令：

```bash
node add_a_smart_tap_key.js
```

**確認結果**

上傳成功後，您可以在 Google Pay & Wallet Console 中確認：

1. 前往「**Google Wallet API**」→「**其他功能**」
2. 您會看到公開金鑰已成功上傳
3. 系統會自動產生對應的 Collector ID

{% include figure.liquid path="assets/img/google_wallet_smart_tap_public_key.png" title="Smart Tap 公鑰上傳後顯示畫面" %}

---

### 取得 Collector ID

上傳公開金鑰後，系統會自動產生一個 Collector ID。您可以透過程式方式取得這個重要的識別碼。

🗂️ [get_collector_id.js] - 取得 Collector ID 的腳本

```javascript
const { GoogleAuth } = require("google-auth-library");

// 🔧 請將下方的 "Your issuer ID" 替換為您實際的 Issuer ID
let issuerId = "Your issuer ID";
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "/path/to/key.json";

const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";

const credentials = require(keyFilePath);

// 建立驗證客戶端
const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

/**
 * 從 Issuer 帳戶取得 Collector ID
 * 
 * @param {string} issuerId 您的 Issuer ID
 * @returns {string} Collector ID
 */
async function getCollectorId(issuerId) {
  try {
    // 向 Google API 請求 Issuer 資訊
    let response = await httpClient.request({
      url: `${baseUrl}/issuer/${issuerId}`,
      method: "GET",
    });

    console.log("📋 Issuer 帳戶資訊:");
    console.log(response);

    // 從回應中提取 Collector ID
    return response.data.smartTapMerchantData.smartTapMerchantId;
  } catch (error) {
    console.error("❌ 取得 Collector ID 時發生錯誤:", error);
    throw error;
  }
}

// 執行函數並顯示結果
getCollectorId(issuerId)
  .then((collectorId) => {
    console.log("✅ 成功取得 Collector ID:", collectorId);
  })
  .catch((error) => {
    console.error("💥 取得 Collector ID 失敗:", error);
  });
```

**執行腳本**

```bash
node get_collector_id.js
```

**預期結果**

如果一切設定正確，您會看到類似以下的輸出：

```
✅ 成功取得 Collector ID: 12345678
```

這個 8 位數的 Collector ID 將用於配置您的終端設備。

---

## 第四步：商家配置設定

這個階段涉及商家端的設定工作，包括與終端供應商的協調以及實際設備的配置。

**需要準備的資訊**

在開始商家設定之前，請確保您已經準備好以下資訊：
- 特定商家的 Issuer Account ID
- 要啟用 Smart Tap 功能的 Redemption Issuer ID  
- 已完成 Smart Tap 設定的票證類別

---

### 商家設定流程

**完整設定步驟**

以下是商家啟用 Smart Tap 功能的完整流程：

**步驟 1：與終端供應商協調**
- 向感應式刷卡機供應商索取公開金鑰和金鑰版本
- 如果供應商要求您先提供 Collector ID，請完成前述的核發者設定步驟來產生 Collector ID

**步驟 2：提供 Collector ID**
- 將您取得的 Collector ID 提供給感應式刷卡機供應商
- 供應商會使用這個 ID 來配置他們的終端設備

**步驟 3：商家資訊交付**
將以下關鍵資訊提供給商家：
- **Redemption Issuer ID**：商家的唯一識別碼
- **Google Pay & Wallet Console 連結**：方便商家管理和查看
- **Collector ID**：終端設備需要配置的識別碼

**步驟 4：長期資料保存**
提醒商家永久保存 Redemption Issuer ID 和 Collector ID。這些資訊在未來新增票證類別時仍會用到。

---

### 終端設備配置

**供應商責任**

感應式刷卡機供應商負責為商家的所有終端設備配置以下參數：

**必要設定項目**
- **Collector ID**：設備的唯一識別碼
- **Key Version**：金鑰版本號
- **Private Key**：與公開金鑰配對的私密金鑰

**配置完成後的優勢**

終端設備完成 Smart Tap 配置後，您就可以：
- 在該商家的刷卡機上啟用任何票證類別
- 新增更多票證類別支援時，無需額外的終端設定
- 享受彈性的票證管理系統

這種設計讓系統具有很好的擴展性，商家只需要進行一次終端配置，就能支援多種不同的票證類型。

---

## 第五步：票證系統配置

現在我們進入票證系統的核心配置階段。這包括建立票證類別（Pass Class）和票證物件（Pass Object）。

---

### 票證類別設定（Pass Class Configuration）

**核心設定要求**

要讓票證類別支援 Smart Tap 功能，您必須設定兩個關鍵屬性：

**必要屬性設定**
- **`enableSmartTap`**：設為 `true`，啟用 Smart Tap 功能
- **`redemptionIssuers`**：陣列，包含所有可以兌換此類別票證的 Redemption Issuer ID

**設定的重要性**

這兩個設定決定了：
1. 票證是否能透過 Smart Tap 使用
2. 哪些商家終端可以接受此類票證

**建立會員卡票證類別的完整程式碼**

以下範例示範如何建立一個支援 Smart Tap 的會員卡票證類別：

```javascript
const { GoogleAuth } = require("google-auth-library");

// 🔧 設定您的基本資訊
let issuerId = "Your issuer ID";        // 您的 Issuer ID
let classSuffix = "Your classSuffix";   // 票證類別後綴（自定義）
const classId = `${issuerId}.${classSuffix}`; // 完整的票證類別 ID
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "/path/to/key.json";

// Google Wallet API 基礎 URL
const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";

// 載入服務帳號憑證
const credentials = require(keyFilePath);

// 建立 HTTP 客戶端
const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

// 建立支援 Smart Tap 的會員卡票證類別
let loyaltyClass = {
  id: `${classId}`,
  issuerName: "Climax technology",
  programName: "Climax Loyalty SmartTap 2 Program Test",
  
  // ⭐ Smart Tap 的核心設定
  enableSmartTap: true,              // 啟用 Smart Tap 功能
  redemptionIssuers: [               // 可兌換此票證的商家 ID 列表
    "Your Redemption issuer ID",    // 🔧 請替換為實際的 Redemption Issuer ID
  ],
  
  reviewStatus: "underReview",       // 審核狀態
  // 會員計畫標誌設定
  programLogo: {
    sourceUri: {
      uri: "https://www.sourcesecurity.com/img/companies/300/climax-logo_1560425415.jpg",
    },
    contentDescription: {
      defaultValue: {
        language: "en-US",
        value: "Program Logo",
      },
    },
  },
  // 文字模組：會員卡上顯示的文字訊息
  textModulesData: [
    {
      header: "Welcome to Your Loyalty SmartTap 2 Program",
      body: "Thank you for joining our loyalty SmartTap 2 program. Enjoy exclusive rewards and benefits.",
      id: "welcome_message",
    },
  ],
  // 連結模組：在會員卡上提供相關連結
  linksModuleData: {
    uris: [
      {
        uri: "https://www.climax.com.tw/",
        description: "Visit our loyalty SmartTap 2 program",
        id: "website",
      },
    ],
  },
  // 圖片模組：會員卡上的圖片元素
  imageModulesData: [
    {
      mainImage: {
        sourceUri: {
          uri: "https://www.sourcesecurity.com/img/companies/300/climax-logo_1560425415.jpg",
        },
        contentDescription: {
          defaultValue: {
            language: "en-US",
            value: "Loyalty SmartTap 2 Program Banner",
          },
        },
      },
      id: "loyalty_banner",
    },
  ],
  // 消息模組：可推播給用戶的消息
  messages: [
    {
      header: "Welcome",
      body: "Thanks for joining our loyalty SmartTap 2 program!",
      id: "welcome_message",
    },
  ],
};

// 檢查票證類別是否已存在
httpClient
  .request({
    url: `${baseUrl}/loyaltyClass/${classId}`,
    method: "GET",
  })
  .then((response) => {
    console.log("✅ 票證類別已存在");
    console.log(response);

    console.log("🏷️ 票證類別 ID:");
    console.log(response.data.id);
  })
  .catch((err) => {
    if (err.response && err.response.status === 404) {
      // 票證類別不存在，現在建立一個新的
      console.log("📝 正在建立新的票證類別...");
      
      httpClient
        .request({
          url: `${baseUrl}/loyaltyClass`,
          method: "POST",
          data: loyaltyClass,
        })
        .then((response) => {
          console.log("✅ 票證類別建立成功！");
          console.log(response);

          console.log("🏷️ 新建的票證類別 ID:");
          console.log(response.data.id);
        })
        .catch((createErr) => {
          console.error("❌ 建立票證類別失敗:", createErr);
        });
    } else {
      // 其他錯誤
      console.error("❌ 發生未知錯誤:", err);
    }
  });
```

---

---

### 票證物件設定（Pass Object Configuration）

**核心設定要求**

對於票證物件（Pass Object），Smart Tap 功能需要設定一個關鍵屬性：

**必要屬性**
- **`smartTapRedemptionValue`**：當票證透過 Smart Tap 使用時傳送給終端的數值

**用途說明**

這個數值可以代表：
- 會員點數餘額
- 優惠券面額
- 票證剩餘次數
- 其他商業邏輯相關的數值

**建立票證物件的完整程式碼**

```javascript
const { GoogleAuth } = require("google-auth-library");
const jwt = require("jsonwebtoken");

// 🔧 設定您的基本資訊
let issuerId = "Your issuer ID";         // 您的 Issuer ID
let classSuffix = "Your classSuffix";    // 使用之前建立的票證類別 ID
let objectSuffix = "Your objectSuffix";  // 票證物件後綴（通常是用戶 ID）
const objectId = `${issuerId}.${objectSuffix}`; // 完整的票證物件 ID
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "/path/to/key.json";

// Google Wallet API 基礎 URL
const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";

// 載入服務帳號憑證
const credentials = require(keyFilePath);

// 建立 HTTP 客戶端
const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

// 建立支援 Smart Tap 的會員卡票證物件
let loyaltyObject = {
  id: `${objectId}`,                      // 票證物件的唯一 ID
  classId: `${issuerId}.${classSuffix}`,  // 對應的票證類別 ID
  state: "active",                       // 票證狀態：活躍
  accountId: "123",                      // 用戶帳號 ID
  accountName: "Nick Huang",             // 用戶姓名
  // 文字模組：顯示會員點數資訊
  textModulesData: [
    {
      header: "Your Loyalty Points",
      body: "You have 500 points.",
      id: "loyalty_points",
    },
  ],
  // 地理位置設定（可選）
  locations: [
    {
      latitude: 37.422,   // 緯度
      longitude: -122.084, // 經度
    },
  ],
  
  // ⭐ Smart Tap 的核心設定：兑換數值
  smartTapRedemptionValue: "500",  // 當使用 Smart Tap 時傳送的數值（這裡是 500 點）
  // 資訊模組：顯示額外的票證資訊
  infoModuleData: {
    labelValueRows: [
      {
        columns: [
          {
            label: "Smart Tap ID",
            value: "1234567890",
          },
        ],
      },
    ],
  },
};

// 檢查票證物件是否已存在
httpClient
  .request({
    url: `${baseUrl}/loyaltyObject/${objectId}`,
    method: "GET",
  })
  .then((response) => {
    console.log("✅ 票證物件已存在");
    console.log(response);

    console.log("🏷️ 票證物件 ID:");
    console.log(response.data.id);
  })
  .catch((err) => {
    if (err.response && err.response.status === 404) {
      // 票證物件不存在，現在建立一個新的
      console.log("📝 正在建立新的票證物件...");
      
      httpClient
        .request({
          url: `${baseUrl}/loyaltyObject`,
          method: "POST",
          data: loyaltyObject,
        })
        .then((response) => {
          console.log("✅ 票證物件建立成功！");
          console.log(response);

          console.log("🏷️ 新建的票證物件 ID:");
          console.log(response.data.id);

          // 產生「加入 Google Wallet」連結
          generateAddToWalletLink(objectId);
        })
        .catch((createErr) => {
          console.error("❌ 建立票證物件失敗:", createErr);
        });
    } else {
      // 其他錯誤
      console.error("❌ 發生未知錯誤:", err);
    }
  });

/**
 * 產生「加入 Google Wallet」連結
 * 用戶可以通過這個連結將票證加入他們的 Google Wallet
 */
function generateAddToWalletLink(objectId) {
  // 建立 JWT 負載
  const payload = {
    iss: credentials.client_email,  // 服務帳號電子郵件
    aud: "google",                  // 目標受眾
    origins: ["http://localhost:3000"], // 允許的域名
    typ: "savetowallet",            // 標記為「保存到錢包」類型
    payload: {
      loyaltyObjects: [             // 會員卡物件列表
        {
          id: objectId,
        },
      ],
    },
  };

  // 使用 RS256 演算法簽名 JWT
  const token = jwt.sign(payload, credentials.private_key, {
    algorithm: "RS256",
  });
  
  // 組合成完整的「加入 Google Wallet」連結
  const addToWalletLink = `https://pay.google.com/gp/v/save/${token}`;

  console.log("🔗 加入 Google Wallet 連結:");
  console.log(addToWalletLink);
}
```

**使用說明**

執行完成後，您會得到一組 JWT 令牌。將這個令牌填入以下 URL 格式：

```
https://pay.google.com/gp/v/save/{JWT}
```

用戶點擊這個連結後，即可將您建立的票證加入他們的 Google Wallet 中。

---

## 第六步：實際測試與展示

現在讓我們來測試整個 Smart Tap 系統是否正常運作。

### 下載測試應用程式

**取得測試工具**

1. 下載 Google 官方提供的 [Smart Tap Sample App](https://github.com/google-wallet/smart-tap-sample-app)
2. 這個應用程式可以模擬商家的刷卡機終端

**配置測試環境**

1. **修改 Collector ID**：
   - 開啟 sample code
   - 將其中的 Collector ID 替換為您之前取得的 Collector ID
   - 這樣您的手機就會將這個應用程式識別為您的商家終端

2. **準備測試票證**：
   - 確保您的手機已經安裝了之前建立的票證
   - 票證狀態為「active」

### 測試步驟

1. **啟動測試應用程式**：在另一台設備上執行修改後的 Smart Tap Sample App
2. **開啟 Google Wallet**：在您的手機上開啟 Google Wallet 應用程式
3. **執行 Smart Tap**：將手機靠近執行測試應用程式的設備
4. **確認結果**：觀察票證是否成功傳輸到測試終端

### 測試成功畫面

以下是 Smart Tap 成功執行時的實際畫面：

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

**測試成功的指標**

當看到上述畫面時，表示您的 Smart Tap 系統已成功運作：
- 手機成功識別終端的 Collector ID
- 票證資料順利傳輸到終端應用程式
- `smartTapRedemptionValue` 正確顯示在終端上

---

## 總結

通過本文的詳細介紹，我們完整了解了 Google Wallet Smart Tap 技術的各個面向：

**技術架構理解**
- NFC 近場通訊的基本原理
- Smart Tap 協議的通訊機制
- 各種 ID 系統的角色和關係

**實作能力建立**
- 完整的系統設定流程
- 票證類別和物件的建立方法
- 測試和驗證的具體步驟

**商業應用價值**
- 支援多種商業模式（單商家、多商家聯盟、自主開發）
- 提供彈性的票證管理系統
- 為使用者創造便利的支付體驗

Smart Tap 技術不僅僅是一個技術實作，它代表了未來行動支付的發展方向。隨著 NFC 技術的普及和消費者對便利性需求的增加，這類技術將在我們的日常生活中扮演越來越重要的角色。

---

## 延伸學習資源

- [Smart Tap overview](https://developers.google.com/wallet/smart-tap/introduction/overview) - Google 官方技術概覽
- [Smart tap sample app](https://github.com/google-wallet/smart-tap-sample-app) - 官方測試應用程式
- [Google Pay & Wallet Console](https://pay.google.com/business/console/home) - 管理控制台
- [Create passes on Android using the Google Wallet API](https://codelabs.developers.google.com/add-to-wallet-android#1) - Android 實作教學
- [Create passes on Web using the Google Wallet API](https://codelabs.developers.google.com/add-to-wallet-web#1) - Web 實作教學

> ##### 交流與討論
>
> 如果您在實作過程中遇到任何問題，或是有不同的想法和建議，歡迎留言或寄信給我。技術的進步來自於彼此的交流和分享，讓我們一起探索和學習這個令人興奮的技術領域！
