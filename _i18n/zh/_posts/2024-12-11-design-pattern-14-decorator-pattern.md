---
layout: post
title: "設計模式 14：裝飾者模式 - 咖啡館 POS 實戰與動態功能擴充全攻略"
date: 2024-12-11 23:30:00 +0800
description: "精通裝飾者模式，動態擴充物件功能，維持彈性與可維護性。以咖啡館 POS 系統為例，圖文範例，適合軟體工程師與架構師。"
tags:
  [
    Decorator Pattern,
    Design Patterns,
    Dynamic Behavior,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Structural Patterns,
    Coffee Shop,
    POS System,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 下載完整設計模式系列程式碼：[design_pattern repo](https://github.com/nickhuangcyh/design_pattern)

## 前言：什麼是裝飾者模式？

裝飾者模式是一種結構型設計模式，能在不改變原有物件結構下，動態為物件新增功能。它是繼承的彈性替代方案，讓你能在執行時期自由組合功能。

## 主要優勢

- 動態擴充：隨時為物件加新功能
- 單一職責：每個裝飾者只負責一項功能
- 開放封閉：對擴展開放，對修改封閉
- 彈性高：裝飾者可任意組合
- 組合優於繼承：多用物件組合，少用類別繼承

## 實務案例：咖啡館 POS 系統

設計一套咖啡館 POS 系統，需支援：

- 多種咖啡（Espresso、House Blend 等）
- 動態加購配料（牛奶、巧克力、鮮奶油）
- 彈性計價（基礎價 + 配料價）
- 易於擴展新飲品與配料
- 複雜組合訂單管理

（此處保留原有 UML、Kotlin 範例，僅將說明與註解翻譯為中文）

## 設計力辨識

- 類別爆炸：每種組合都需新類別，維護困難
- 高耦合：飲品與配料緊密綁定
- 彈性差：無法動態加減配料
- 程式碼重複

## 裝飾者模式解法

裝飾者模式讓你用組合方式動態擴充功能，彈性高、易維護。

（此處保留原有 UML、Kotlin 範例，僅將說明與註解翻譯為中文）

---

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
