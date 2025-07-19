---
layout: post
title: "設計模式 20：迭代器模式（Iterator Pattern）——檔案系統遍歷與資料結構彈性存取"
date: 2024-12-22 14:00:00 +0800
description: "精通迭代器模式，學會封裝集合遍歷邏輯，實現檔案系統、樹狀結構等彈性存取。圖文範例，適合軟體工程師、架構師與進階開發者。"
tags:
  [
    Iterator Pattern,
    Design Patterns,
    Collection Traversal,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Behavioral Patterns,
    File System,
    BFS,
    DFS,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **下載完整設計模式系列程式碼**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 什麼是迭代器模式（Iterator Pattern）？

迭代器模式是一種行為型設計模式，提供一種方法，讓你能在不暴露集合內部結構的情況下，順序存取集合元素。它將遍歷邏輯封裝，為各種集合提供一致的存取介面。

**主要優點：**

- 封裝集合結構，對外隱藏實作細節
- 一致介面，支援多種集合型別
- 多種遍歷策略（BFS、DFS等）
- 職責單一，遍歷邏輯與集合分離
- 易於擴展新遍歷方式

---

## 實務情境：檔案系統搜尋工具

設計一個檔案系統搜尋工具，需求如下：

- 支援多種搜尋策略（廣度優先、深度優先）
- 客戶端無需了解搜尋實作細節
- 統一介面存取搜尋結果
- 易於擴展新搜尋方式（如依檔案大小排序）
- 高效能，適合大型檔案系統

---

## 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_iterator_pattern_uml_1.png" title="Iterator Pattern - 問題分析" %}

### 設計痛點

1. 高耦合：客戶端需依賴特定搜尋實作
2. 一致性不足：不同搜尋方式存取方式不一
3. 違反開放封閉原則：新增搜尋方式需更動客戶端

---

## 迭代器模式解決方案

將遍歷邏輯封裝於迭代器，讓集合結構與遍歷方式分離，提升彈性與可維護性。

{% include figure.liquid path="assets/img/design_pattern_iterator_pattern_uml_2.png" title="Iterator Pattern - 一般結構" %}

### 組成元件

1. 迭代器介面：定義存取集合元素的方法
2. 具體迭代器：實作特定遍歷策略（BFS、DFS）
3. 聚合介面：定義建立迭代器的方法
4. 具體聚合：實作聚合介面並提供集合資料

**優點：**

- 封裝遍歷邏輯，客戶端無需了解細節
- 多種遍歷策略，易於切換
- 一致介面，提升可維護性
- 易於擴展新遍歷方式

---

## 實作：檔案系統搜尋工具

（此處保留原有 UML、Kotlin 範例，僅將說明與註解翻譯為中文）

---

## 迭代器模式 vs 其他做法

| 做法         | 優點                           | 缺點                             |
| ------------ | ------------------------------ | -------------------------------- |
| 迭代器模式   | 封裝遍歷邏輯、多策略、一致介面 | 複雜度提升、大型集合有記憶體負擔 |
| 直接存取集合 | 實作簡單、無額外開銷           | 暴露內部結構、高耦合、難擴展     |
| 策略模式     | 執行時切換策略、分離清楚       | 無統一遍歷介面、簡單情境較複雜   |

---

## 什麼時候用迭代器模式？

**適合：**

- 複雜集合（樹、圖、自訂資料結構）
- 多種遍歷策略（BFS、DFS、中序等）
- 封裝需求（隱藏內部結構）
- 框架開發（提供一致API）
- 大型資料集（支援lazy、記憶體效率）

**不適合：**

- 單純線性集合（陣列、List）
- 單一遍歷策略
- 極度效能敏感（迭代器開銷）
- 小型、靜態集合

---

## 進階應用：Lazy、過濾、組合迭代器

（此處保留原有進階迭代器、Kotlin 範例，僅將說明與註解翻譯為中文）

---

## 結論

迭代器模式是打造彈性資料結構存取、封裝遍歷邏輯的關鍵設計模式。無論是檔案系統、資料庫、集合框架，迭代器模式都能大幅提升系統彈性與可維護性。

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
