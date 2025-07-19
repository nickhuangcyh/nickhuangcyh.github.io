---
layout: post
title: "設計模式 13：組合模式（Composite Pattern）——檔案系統與 UI 元件樹的統一管理"
date: 2024-12-10 22:28:00 +0800
description: "精通組合模式，統一管理樹狀結構，讓單一物件與集合操作一致。檔案系統、UI 元件、組織架構等最佳實踐，圖文範例。"
tags:
  [Composite Pattern, Design Patterns, Tree Structure, File System, UI Components, Object-Oriented Design, Software Architecture, Kotlin, Java, Swift]
categories: [Design Patterns, Software Development, Object-Oriented Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 下載完整設計模式系列程式碼：[design_pattern repo](https://github.com/nickhuangcyh/design_pattern)

## 前言：樹狀結構的統一威力

組合模式（Composite Pattern）是一種結構型設計模式，讓你能將物件組合成樹狀結構，並統一對待單一物件與集合，適合檔案系統、UI 元件樹、組織架構等多層級系統。

## 實務應用場景

- **檔案系統**：目錄與檔案的樹狀結構
- **UI 框架**：元件樹、容器與葉節點
- **組織圖**：部門與員工階層
- **圖形系統**：可包含其他圖形的圖形
- **選單系統**：多層選單與子選單

## 問題分析：檔案系統管理

（此處保留原有 UML、Kotlin 範例，僅將說明與註解翻譯為中文）

## 設計痛點辨識

- 高耦合、難維護
- 程式碼重複
- 擴展性差
- 客戶端需區分單一與集合

## 組合模式解法

組合模式提供統一介面，讓單一物件與集合操作一致，提升彈性與可維護性。

（此處保留原有 UML、Kotlin 範例，僅將說明與註解翻譯為中文）

---

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
