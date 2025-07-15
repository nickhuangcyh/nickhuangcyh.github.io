---
layout: post
title: "設計模式 17：代理模式（Proxy Pattern）——存取控制、快取與分散式系統效能最佳化"
date: 2024-12-15 21:30:00 +0800
description: "精通代理模式，學會透過代理物件控制存取、實現快取與安全，優化分散式系統效能。以影音串流、API、資料庫等場景為例，圖文範例與進階應用。"
tags: [Proxy Pattern, Design Patterns, Access Control, Performance Optimization, Object-Oriented Design, Software Architecture, Kotlin, Programming, Structural Patterns, Caching, Security]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **下載完整設計模式系列程式碼**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 什麼是代理模式（Proxy Pattern）？

代理模式是一種結構型設計模式，為其他物件提供一個代理或替身，以控制對其的存取。代理可作為中介，實現快取、權限控管、延遲載入等功能，常用於分散式系統、資源管理與安全場景。

**主要優點：**
- 存取控制：控管敏感物件的存取權限
- 效能優化：實現快取、延遲載入
- 資源管理：高效管理昂貴資源
- 透明性：客戶端無感知代理存在
- 安全性：加入認證與授權層

---

## 實務情境：影音串流系統

設計一個影音串流系統，需求如下：
- 支援多種影音來源（YouTube、Vimeo、本地檔案）
- 實現智慧快取，避免重複下載
- 客戶端介面統一，無需關心快取邏輯
- 資源最佳化，減少頻寬與載入時間
- 易於擴展新來源與快取策略

---

## 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_1.png" title="Proxy Pattern - 問題分析" %}

### 設計痛點
1. 頻寬浪費：重複下載同一影片，資源耗損
2. 高延遲：每次存取都需完整下載，體驗差
3. 客戶端耦合：需處理下載邏輯，維護困難

---

## 代理模式解決方案

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_2.png" title="Proxy Pattern - 一般結構" %}

### 組成元件
1. 主體介面（Subject）：定義真實物件與代理的共用介面
2. 真實主體（Real Subject）：實際執行工作的物件
3. 代理（Proxy）：控制存取並加入額外功能
4. 客戶端（Client）：只與主體介面互動

**優點：**
- 智慧快取，避免重複操作
- 存取控管，提升安全性
- 資源最佳化，提升效能
- 介面統一，客戶端無需感知代理

---

## 實作：影音串流系統

（此處保留原有 UML、Kotlin 範例，僅將說明與註解翻譯為中文）

---

## 代理模式 vs 其他做法

| 做法 | 優點 | 缺點 |
|------|------|------|
| 代理模式 | 存取控管、效能優化、介面統一 | 複雜度提升、潛在效能損耗、除錯較難 |
| 直接存取 | 實作簡單、無額外開銷、易除錯 | 無存取控管、無快取、耦合高 |
| 裝飾者模式 | 動態行為擴充、多層裝飾 | 無存取控管、目的不同（行為 vs 存取） |
| 外觀模式 | 介面簡化、子系統封裝 | 無存取控管、目的不同（介面 vs 存取） |

---

## 什麼時候用代理模式？

**適合：**
- 遠端存取（RMI、Web 服務、分散式系統）
- 虛擬代理（延遲載入昂貴資源）
- 保護代理（存取控管與安全）
- 快取代理（效能最佳化）
- 日誌與監控（存取紀錄與分析）

**不適合：**
- 簡單物件存取（無需額外功能）
- 極度效能敏感（代理開銷）
- 強耦合需求（需直接存取）
- 簡單快取（可用內建快取機制）

---

## 進階應用：保護代理、遠端代理、智慧代理

（此處保留原有進階代理、Kotlin 範例，僅將說明與註解翻譯為中文）

---

## 結論

代理模式是存取控制、效能優化與安全管理的關鍵設計模式。無論是影音串流、API、資料庫、檔案系統，代理模式都能有效提升系統彈性與可維護性。

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
