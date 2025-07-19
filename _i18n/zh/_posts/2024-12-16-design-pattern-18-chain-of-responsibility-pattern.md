---
layout: post
title: "設計模式 18：責任鏈模式（Chain of Responsibility Pattern）——彈性請求處理與日誌系統實戰"
date: 2024-12-16 23:00:00 +0800
description: "精通責任鏈模式，學會建立彈性請求處理鏈，動態組合多層處理器，打造高可擴展日誌與中介軟體系統。圖文範例與進階應用。"
tags:
  [
    Chain of Responsibility Pattern,
    Design Patterns,
    Request Processing,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Behavioral Patterns,
    Logging,
    Middleware,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **下載完整設計模式系列程式碼**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 什麼是責任鏈模式（Chain of Responsibility Pattern）？

責任鏈模式是一種行為型設計模式，允許你將請求沿著處理器鏈傳遞，每個處理器可選擇處理或傳遞給下一個。此模式促進低耦合、彈性組合，適合日誌、驗證、事件處理等多層級請求場景。

**主要優點：**

- 低耦合：處理器獨立，易於擴展與調整
- 彈性組合：可動態調整處理鏈順序
- 職責單一：每個處理器專注一項任務
- 易於擴展：新增處理器無需更動既有程式
- 多層處理：同一請求可被多個處理器處理

---

## 實務情境：多層級日誌系統

設計一個多層級日誌系統，需求如下：

- 支援多種日誌等級（INFO, WARNING, ERROR, DEBUG）
- 處理器鏈可動態增減、調整順序
- 各處理器獨立處理特定等級
- 易於擴展新日誌目的地（Console, File, Database, Email）
- 高效能，適合高頻日誌處理

---

## 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_1.png" title="Chain of Responsibility Pattern - 問題分析" %}

### 設計痛點

1. 高耦合：客戶端需直接控制每個日誌處理器
2. 彈性不足：難以調整處理器順序或新增處理器
3. 違反開放封閉原則：新增處理器需更動客戶端

---

## 責任鏈模式解決方案

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_2.png" title="Chain of Responsibility Pattern - 一般結構" %}

### 組成元件

1. 處理器介面：定義請求處理方法
2. 具體處理器：實作特定處理邏輯
3. 鏈建構器：動態組合處理器鏈
4. 客戶端：只需發送請求，不需關心鏈細節

**優點：**

- 動態組合，彈性高
- 低耦合，易於擴展
- 多層處理，靈活應對複雜需求

---

## 實作：多層級日誌系統

（此處保留原有 UML、Kotlin 範例，僅將說明與註解翻譯為中文）

---

## 責任鏈模式 vs 其他做法

| 做法           | 優點                         | 缺點                               |
| -------------- | ---------------------------- | ---------------------------------- |
| 責任鏈模式     | 低耦合、動態組合、易擴展     | 潛在效能損耗、鏈路除錯較難         |
| 直接呼叫處理器 | 實作簡單、無額外開銷、易除錯 | 高耦合、難擴展、違反OCP            |
| 策略模式       | 執行時切換策略、分離清楚     | 僅單一處理、無鏈式處理             |
| 觀察者模式     | 多觀察者、解耦合             | 無法控制處理順序、所有觀察者都處理 |

---

## 什麼時候用責任鏈模式？

**適合：**

- 請求處理管線（Web Middleware、日誌系統）
- 事件處理系統（GUI、遊戲事件）
- 驗證鏈（表單驗證、資料處理）
- 錯誤處理（例外鏈）
- 認證/授權（安全中介軟體）

**不適合：**

- 單一處理需求（單一處理器即可）
- 極度效能敏感（鏈路開銷）
- 固定處理順序（靜態配置即可）
- 僅同步處理（不需鏈式彈性）

---

## 進階應用：條件處理、優先權、錯誤處理

（此處保留原有進階責任鏈、Kotlin 範例，僅將說明與註解翻譯為中文）

---

## 結論

責任鏈模式是打造彈性請求處理、日誌與中介軟體系統的關鍵設計模式。無論是多層級日誌、Web Middleware、事件處理，責任鏈模式都能大幅提升系統彈性與可維護性。

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
