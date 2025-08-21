---
layout: post
title: 設計模式（3）設計模式核心概念 Design Pattern 完整入門：四大要素與分類系統
date: 2024-07-04 23:00:00 +0800
description: 學會 Design Pattern 的定義、目的與結構化思維。深入了解設計模式的四大要素：Context、Forces、Problem與Solution，以及創建型、結構型和行為型模式的完整分類系統。
tags: [Design Pattern, Software Design, Gang of Four, Creational Pattern, Structural Pattern, Behavioral Pattern, Software Architecture, Programming]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## Design Pattern 是什麼？

Design Pattern（設計模式）是軟體工程中一套久經考驗的問題解決方案。想像一下，當建築師設計房屋時，他們會運用已知的建築模式來解決常見的結構問題。同樣地，設計模式就是軟體開發者的「建築藍圖」。

這些模式並非憑空創造，而是經過無數開發者在實際專案中反覆驗證的最佳實踐。每個設計模式都針對特定的設計問題提供標準化的解決方案，讓開發者不必重新發明輪子。

更重要的是，設計模式提供了開發者之間的共通語言。當你說「我們用Observer Pattern來處理這個問題」時，有經驗的開發者立即就能理解你的設計思路和實作方向。

## 設計模式的組成要素

每個設計模式都由四個核心要素組成，這四個要素共同描述了模式的完整面貌。理解這些要素有助於我們正確地識別和應用設計模式。

### Context（情境）

Context 是指設計模式應用的具體場景或環境背景。它回答了「在什麼情況下使用這個模式？」的問題。

例如，當你需要確保某個類別在整個應用程式中只有一個實例時，這就是 Singleton Pattern 的典型 Context。

### Forces（約束力）

Forces 是指在設計過程中需要平衡考量的各種因素和限制。這些因素往往相互衝突，需要找到最佳的平衡點。

常見的 Forces 包括：
- **性能需求**：系統需要多快的響應速度？
- **可擴展性**：未來是否需要輕易添加新功能？
- **維護性**：程式碼是否容易理解和修改？
- **記憶體使用**：是否需要節省記憶體空間？

### Problem（問題）

Problem 是指在特定 Context 和 Forces 約束下，開發者面臨的具體設計挑戰。它清楚描述了需要解決的核心問題。

這個問題通常表現為設計上的兩難：既要滿足功能需求，又要兼顧各種約束條件。

### Solution（解決方案）

Solution 是設計模式提供的具體解決方案。它不是程式碼的實作細節，而是一個可重複使用的設計結構，說明了類別之間的關係和協作方式。

好的 Solution 會巧妙地平衡各種 Forces，提供一個經過驗證且優雅的解決方案。

## 設計模式的應用步驟

成功應用設計模式需要遵循一個結構化的流程。這個七步驟方法確保我們能系統性地分析問題並選擇最適合的解決方案。

### 1. 物件導向程式分析（OOA）
從高層次分析和理解應用程式的需求與整體結構。這個階段需要繪製 UML 圖來視覺化系統的現狀，幫助我們掌握全局視野。

### 2. 看清楚 Context
透過 UML 圖深入理解設計模式需要應用的具體場景和環境條件。明確回答「我們現在面臨什麼樣的情境？」

### 3. 察覺 Forces
識別和分析影響設計決策的關鍵因素。這些因素可能包括性能要求、擴展性需求、維護難度等相互衝突的約束條件。

### 4. 找到 Problem
在特定 Context 和 Forces 的約束下，明確定義需要解決的核心設計問題。問題的描述應該具體且可操作。

### 5. 套用模式
根據已識別的 Problem 和 Forces，從設計模式庫中選擇最適合的模式。這個選擇過程需要權衡各種取捨。

### 6. 得到新的 Resulting Context
應用設計模式後，重新分析和檢視改進後的設計方案。同樣需要繪製新的 UML 圖來呈現改進後的系統架構。

### 7. 物件導向程式設計（OOP）
基於新的 Resulting Context UML 圖，開始實際的程式碼撰寫和實作工作。此時的實作應該遵循 UML 圖所定義的結構。

## 設計模式的分類

設計模式根據其主要解決的問題類型，可以分為三大類別。每個類別針對軟體設計中的不同面向提供解決方案。

### Creational 創建型模式

**主要目的**：解決物件創建過程中的各種問題，讓物件的創建更加靈活且可控。

這類模式關注的是「如何創建物件」，而不是「創建什麼物件」。它們提供了創建物件的最佳方式，同時隱藏創建邏輯的複雜性。

**常見模式**：
- **Factory Method Pattern**：透過工廠方法創建物件
- **Abstract Factory Pattern**：創建相關物件家族
- **Builder Pattern**：逐步構建複雜物件
- **Prototype Pattern**：透過複製現有物件來創建新物件
- **Singleton Pattern**：確保類別只有一個實例

### Structural 結構型模式

**主要目的**：解決類別和物件之間的組合問題，幫助不同的元件更好地協同工作。

這類模式專注於如何將類別和物件組合成更大、更複雜的結構，同時保持結構的靈活性和效率。

**常見模式**：
- **Adapter Pattern**：讓不相容的介面可以協同工作
- **Bridge Pattern**：將抽象與實作分離
- **Decorator Pattern**：動態地為物件添加新功能
- **Facade Pattern**：為複雜子系統提供簡化介面
- **Proxy Pattern**：為其他物件提供代理或占位符
- **Flyweight Pattern**：有效地支援大量細粒度物件
- **Composite Pattern**：將物件組合成樹形結構

### Behavioural 行為型模式

**主要目的**：解決物件之間的通訊和協作問題，定義物件間的交互方式和責任分配。

這類模式關注的是演算法和物件間責任的分配，不僅描述物件或類別的模式，也描述它們之間的通訊方式。

**常見模式**：
- **Chain of Responsibility Pattern**：將請求沿著處理鏈傳遞
- **Mediator Pattern**：定義物件間如何交互
- **Iterator Pattern**：提供訪問集合元素的統一方式
- **State Pattern**：允許物件在內部狀態改變時改變行為
- **Observer Pattern**：定義一對多的依賴關係
- **Command Pattern**：將請求封裝為物件
- **Strategy Pattern**：定義演算法家族並使其可互換
- **Template Method Pattern**：定義演算法骨架
- **Interpreter Pattern**：為語言創建解釋器
- **Memento Pattern**：保存和恢復物件狀態
- **Visitor Pattern**：在不修改類別的前提下定義新操作

## 總結

通過本篇文章，我們建立了對設計模式的全面理解。我們學習到設計模式不僅僅是程式碼範本，更是經過驗證的問題解決框架。

### 關鍵收穫

**理論基礎**：我們掌握了設計模式的四大組成要素（Context、Forces、Problem、Solution），這些要素幫助我們系統性地分析和應用模式。

**實踐方法**：七步驟應用流程提供了從問題分析到程式碼實作的完整路徑，確保我們能正確地選擇和使用設計模式。

**分類體系**：三大類別（創建型、結構型、行為型）的分類方式讓我們能夠快速定位適合的模式類型，提高解決問題的效率。

### 設計模式的價值

設計模式的真正價值在於它提供了一套共同的詞彙和思維框架。當團隊成員都理解設計模式時，溝通變得更加高效，設計決策也更容易被理解和維護。

更重要的是，設計模式教會我們如何在相互衝突的需求中找到平衡點，這正是軟體設計的核心挑戰。

### 下一步學習

在接下來的文章中，我們將深入探討 UML 圖的應用。UML（統一建模語言）是視覺化軟體設計的標準工具，它將幫助我們更清楚地表達和溝通設計想法。

掌握 UML 圖的繪製和讀取技能，將讓我們能夠更有效地應用設計模式，並與其他開發者進行更精確的技術交流。

> 下一篇：深入UML圖 - 設計模式的視覺化工具

{% include figure.liquid path="assets/img/design_pattern_design_principle_architecture.png" title="design_pattern_design_principle_architecture" %}

> Object-Oriented Concepts -> Design Principle -> Design Pattern

## 參考

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [大話設計模式](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [水球潘 - Design Pattern 之路](https://www.youtube.com/watch?v=yOe-uywb2qs&list=PLicQRHHL75d7EXEI9nWfUYJyrPdI79M70&pp=iAQB)

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長 🙂
{: .notice--success}
