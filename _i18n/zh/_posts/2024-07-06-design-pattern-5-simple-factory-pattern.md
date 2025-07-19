---
layout: post
title: "設計模式 5：簡單工廠模式 - 動態飲品訂單系統的物件創建解法"
date: 2024-07-06 23:00:00 +0800
description: "精通簡單工廠模式，集中管理物件創建邏輯，分離變動與不變程式碼，提升維護性與彈性。圖文範例，適合軟體工程師與架構師。"
tags:
  [
    Simple Factory Pattern,
    Design Patterns,
    Object Creation,
    Factory Pattern,
    Software Architecture,
    Kotlin,
    Java,
    Swift,
    Code Separation,
    Maintainability,
  ]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Code Quality]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> 下載完整設計模式系列程式碼：[design_pattern repo](https://github.com/nickhuangcyh/design_pattern)

## 前言：集中物件創建的威力

簡單工廠模式是一種創建型設計模式，將物件創建邏輯集中管理，讓客戶端無需關心實例化細節，特別適合分離變動與不變程式碼。

## 實務應用場景

- **飲品訂單系統**：根據用戶選擇動態生成飲品物件
- **支付處理**：動態產生不同支付閘道
- **資料庫連線**：動態產生不同資料庫連接器
- **UI 元件**：動態產生不同 UI 元素
- **遊戲開發**：動態產生不同遊戲物件

## 問題分析：動態飲品訂單

我們要打造一個能根據用戶選擇動態生成飲品物件的系統。先用 UML 分析基本結構。

（此處保留原有 UML、Swift/Kotlin 範例，僅將說明與註解翻譯為中文）

## 設計力辨識

隨著飲品種類增加，order 方法需不斷修改，易影響穩定性。需分離「變動程式碼」與「不變程式碼」。

## 簡單工廠模式解法

簡單工廠模式將物件創建邏輯集中於工廠類別，提升彈性與維護性。

（此處保留原有 UML、程式碼，僅將說明與註解翻譯為中文）

---

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
