---
layout: post
title: 設計模式（1）物件導向概念 OOP Concepts 完整教學：封裝繼承多型抽象核心原理
date: 2024-07-02 23:00:00 +0800
description: 深入學習物件導向程式設計四大核心概念：封裝、繼承、多型與抽象。透過生活化比喻與實用範例，為後續學習 Design Pattern 系列奠下穩固的技術基礎。
tags: [Object-Oriented Programming, OOP Concepts, Encapsulation, Inheritance, Polymorphism, Abstraction, Design Pattern, Software Development]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## Object-Oriented Concepts 物件導向概念

在深入探討設計模式之前，我們需要先建立穩固的基礎。物件導向設計有四大核心概念，這些概念就像建築的地基一樣，為後續複雜的設計模式理解奠定基礎。

讓我們透過清晰的說明和生活化的比喻，一步步掌握這些重要概念。每個概念都是相互關聯的，理解它們將幫助您更好地運用設計模式解決實際問題。

### Encapsulation 封裝

**封裝的核心理念**：將物件的內部細節隱藏起來，只提供必要的接口讓外界使用。

封裝是物件導向的第一個重要概念。它的作用是將屬性和方法的實作細節隱藏在類別內部，只暴露必要的方法給使用者。這樣做的好處是保護內部屬性和方法不被隨意修改，確保物件的完整性和安全性。

**生活中的封裝**：
> 想像您在開車時，只需要知道踩油門車子會加速，踩煞車車子會停止。您不需要了解引擎內部的燃燒過程、變速箱的齒輪運作，或是煞車系統的液壓原理。這些複雜的機械細節都被「封裝」在引擎蓋下，讓駕駛變得簡單直觀。

**程式設計中的意義**：封裝讓程式碼更安全、更易維護，也降低了使用者的學習負擔。

### Inheritance 繼承

**繼承的核心理念**：子類別可以獲得父類別的特性，同時添加自己的獨特功能。

繼承是物件導向的第二個重要概念。它允許子類別繼承父類別的屬性和方法，達到程式碼重複使用的目的。透過繼承，我們可以建立階層化的類別結構，避免重複撰寫相同的程式碼。

**自然界的繼承**：
> 在生物分類學中，我們可以清楚看到繼承的概念。狗和貓都是動物，牠們都繼承了動物的基本特性：能夠呼吸、需要食物、會成長和繁殖。同樣地，玫瑰和向日葵都是植物，都繼承了植物的共同特性：進行光合作用、需要陽光和水分、有根莖葉的結構。

**繼承的優勢**：這種階層關係讓我們能夠將共同特性抽取到父類別中，而特殊功能則在子類別中實現，大大提高了程式碼的重用性和維護性。

### Polymorphism 多型

**多型的核心理念**：用相同的介面操作不同的物件，讓程式碼更具彈性和擴展性。

多型是物件導向的第三個重要概念。它為不同的類別提供統一的介面或抽象類別，讓我們能夠用相同的方式操作不同的實體物件。多型的威力在於，我們可以在不修改現有程式碼的情況下，加入新的物件類型。

**生活中的多型概念**：
> 考慮手機充電這個行為。無論您使用的是 iPhone、Samsung Galaxy 或其他品牌的手機，當您看到「充電中」的提示時，您知道所有手機都在執行相同的功能。雖然每個品牌的充電機制可能不同（無線充電、快充技術、電池管理），但對使用者而言，「充電」這個介面是統一的。

另一個例子是不同品牌的遙控器：
> 雖然 Sony、LG、Samsung 電視的遙控器內部電路設計不同，但當您按下「音量+」按鈕時，所有電視都會提高音量。這就是多型的體現。

**程式設計的靈活性**：多型讓我們能夠編寫更靈活的程式碼，輕鬆應對未來的需求變化。

### Abstraction 抽象

**抽象的核心理念**：專注於物件的本質特性，忽略不重要的細節。

抽象是物件導向的第四個重要概念。它通過類別或介面隱藏複雜的實作細節，只提供必要的功能給使用者。抽象幫助我們建立更清晰、更易理解的程式架構。

**日常生活中的抽象思維**：
> 當我們說「手機 App」時，這個詞彙本身就是一種抽象。無論是社交軟體、遊戲、還是工具類應用，它們在手機桌面上都以相同的方式呈現：一個圖示和名稱。我們不需要知道每個 App 是用什麼程式語言開發，或是使用了什麼演算法，只需要點擊圖示就能使用。

另一個生活例子：
> 去超市購買「水果」時，蘋果、香蕉、橘子都被歸類為水果。這個分類讓我們能夠快速理解它們的共同特性：營養價值高、可以直接食用、含有維生素等，而不必關心每種水果的具體產地或栽培方式。

**抽象與封裝的關係**：抽象關注「做什麼」，而封裝關注「怎麼做」。兩者相輔相成，共同提高程式的可讀性和可維護性。

## 總結

**四大概念的相互關係**

現在我們已經掌握了物件導向設計的四大核心概念，讓我們回顧它們之間的關係：

- **封裝**：保護物件內部的複雜性，提供簡潔的外部介面
- **繼承**：建立類別之間的階層關係，實現程式碼的重複使用
- **多型**：讓不同物件能夠以統一的方式被操作和使用
- **抽象**：專注於重要特性，隱藏不必要的實作細節

這四個概念並非各自獨立，而是緊密配合的整體。它們共同為我們提供了創建模塊化、可重用和易於維護程式碼的基礎。

**邁向設計原則的橋樑**

掌握了這些基礎概念後，我們就準備好進入下一個階段：設計原則的世界。設計原則將教我們如何有效地應用這些物件導向概念，來解決更複雜的設計問題。

在接下來的系列文章中，我們將探討這些原則，並了解它們如何幫助我們實現高質量的軟體設計。每一個設計模式都是這些基礎概念和原則的具體應用。

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
