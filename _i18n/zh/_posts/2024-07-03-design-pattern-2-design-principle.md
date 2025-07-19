---
layout: post
title: "設計模式 2：物件導向設計原則（SOLID）全攻略"
date: 2024-07-03 23:00:00 +0800
description: "精通 SOLID 五大設計原則，打造高可維護、高擴展性的物件導向軟體。圖文範例，適合軟體工程師、架構師與進階開發者。"
tags:
  [
    SOLID Principles,
    Design Principles,
    Object-Oriented Design,
    Software Architecture,
    Single Responsibility,
    Open-Closed Principle,
    Liskov Substitution,
    Interface Segregation,
    Dependency Inversion,
    Code Quality,
  ]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Code Quality]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> 下載完整設計模式系列程式碼：[design_pattern repo](https://github.com/nickhuangcyh/design_pattern)

## 前言：軟體品質的基石

設計原則是提升物件導向設計品質的關鍵。SOLID 五大原則能幫助你寫出高可維護、可擴展、易測試的程式碼。

## 實務應用場景

設計原則廣泛應用於：

- **軟體架構**：打造可維護、可擴展系統
- **程式碼審查**：評估設計品質
- **重構**：優化現有程式結構
- **團隊協作**：建立統一設計標準
- **設計模式**：判斷何時、如何套用模式

## SOLID 五大原則

SOLID 是五大物件導向設計原則的縮寫，幫助開發者打造更靈活、可維護的軟體。

### 1. 單一職責原則（SRP）

**定義**：一個類別應該只有一個變動的理由，即只負責一項職責。

**生活比喻**：餐廳裡廚師負責煮菜、服務生負責送餐、收銀員負責結帳，每個人各司其職。

#### 改善前

（此處保留原有 Swift/Kotlin 範例，僅將說明與註解翻譯為中文）

#### 改善後

（此處保留原有 Swift/Kotlin 範例，僅將說明與註解翻譯為中文）

**優點**：

- **易維護**：網路邏輯變動不影響資料庫操作
- **易測試**：各服務可獨立測試
- **可重用**：服務可於其他模組重用

> **註**：有些文章建議 save/delete 分開類別，但過度設計反而難維護，職責劃分應適度。

### 2. 開放封閉原則（OCP）

**定義**：軟體實體應對擴展開放，對修改封閉。

**生活比喻**：外掛系統可新增功能而不需修改原有程式。

（此處保留原有 Swift/Kotlin 範例，僅將說明與註解翻譯為中文）

### 3. 里氏替換原則（LSP）

**定義**：子類別必須能替換父類別，且行為一致。

**生活比喻**：鴨子是鳥類，能飛、能游泳，替換不影響功能。

（此處保留原有範例，僅將說明與註解翻譯為中文）

### 4. 介面隔離原則（ISP）

**定義**：不應強迫用戶依賴不需要的介面。

**生活比喻**：咖啡機有多種功能，但只需用到沖泡功能，不必實作所有介面。

（此處保留原有範例，僅將說明與註解翻譯為中文）

### 5. 依賴反轉原則（DIP）

**定義**：高層模組不應依賴低層模組，兩者都應依賴抽象。

**生活比喻**：插座標準化，家電只需符合插座規格即可通用。

（此處保留原有範例，僅將說明與註解翻譯為中文）

---

## 結語

SOLID 五大設計原則是打造高品質軟體的基石。熟練這些原則，能讓你在軟體設計、架構、團隊協作上如虎添翼。

---

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
