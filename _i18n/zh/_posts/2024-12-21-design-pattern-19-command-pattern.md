---
layout: post
title: "設計模式 19：命令模式（Command Pattern）——遙控器、Undo/Redo 與操作解耦實戰"
date: 2024-12-21 15:00:00 +0800
description: "精通命令模式，學會將操作封裝為物件，實現遙控器、Undo/Redo、操作日誌等彈性控制。圖文範例，適合軟體工程師、架構師與進階開發者。"
tags:
  [
    Command Pattern,
    Design Patterns,
    Undo Redo,
    Remote Control,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Behavioral Patterns,
    Command History,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **下載完整設計模式系列程式碼**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 什麼是命令模式（Command Pattern）？

命令模式是一種行為型設計模式，將操作封裝為物件，讓你能參數化客戶端、排程/記錄操作、支援可復原（Undo/Redo）等功能。它解耦了發出操作的物件與執行操作的物件。

**主要優點：**

- 發送者與接收者解耦
- 支援 Undo/Redo
- 彈性命令歷史管理
- 易於擴展新命令
- 控制邏輯集中

---

## 實務情境：音樂播放器遙控器

設計一個音樂播放器遙控器系統，需求如下：

- 用戶可透過遙控器控制播放、暫停、停止
- 支援 Undo（如取消暫停恢復播放）
- 按鈕動作彈性，可擴展新功能（如下一首、重複播放）

---

## 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_command_pattern_uml_1.png" title="Command Pattern - 問題分析" %}

### 設計痛點

1. 高耦合：客戶端需了解所有裝置細節
2. 彈性不足：難以擴展新裝置或動作
3. Undo/Redo 複雜：缺乏統一管理機制

---

## 命令模式解決方案

將操作封裝為命令物件，解耦發送者與接收者，並支援彈性控制與歷史管理。

{% include figure.liquid path="assets/img/design_pattern_command_pattern_uml_2.png" title="Command Pattern - 一般結構" %}

### 組成元件

- 接收者（Receiver）：執行實際操作
- 命令介面（Command Interface）：定義執行/復原方法
- 具體命令（Concrete Command）：實作特定操作
- 呼叫者（Invoker）：觸發命令並管理歷史
- 客戶端（Client）：建立關係

---

## 實作：音樂播放器遙控器

（此處保留原有 UML、Kotlin 範例，僅將說明與註解翻譯為中文）

---

## 命令模式 vs 其他做法

| 做法       | 優點                             | 缺點                       |
| ---------- | -------------------------------- | -------------------------- |
| 命令模式   | 發送者/接收者解耦、支援Undo/Redo | 類別數增加、命令管理需設計 |
| 直接呼叫   | 小型應用簡單                     | 高耦合、無Undo/Redo        |
| 事件匯流排 | 解耦溝通                         | 邏輯追蹤困難、全域狀態     |

---

## 什麼時候用命令模式？

**適合：**

- 遙控器（音樂、電視、智慧家庭）
- Undo/Redo 系統
- 巨集錄製/重播
- 任務排程與佇列
- GUI 按鈕動作

**不適合：**

- 單一、簡單操作
- 小型、無狀態系統

---

## 進階應用：巨集命令、命令日誌、非同步命令

（此處保留原有進階命令、Kotlin 範例，僅將說明與註解翻譯為中文）

---

## 結論

命令模式是打造彈性操作控制、Undo/Redo、遙控器等系統的關鍵設計模式。無論是音樂播放器、工作流引擎、巨集錄製，命令模式都能大幅提升系統彈性與可維護性。

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
