---
layout: post
title: Design Pattern (1) - Object-Oriented Concepts (物件導向概念)
date: 2024-07-02 23:00:00 +0800
description: 探索封裝、繼承、多態和抽象的力量，為理解複雜設計模式奠定基礎。
tags: [Object-Oriented Concepts]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## Object-Oriented Concepts 物件導向概念

物件導向設計的四大核心概念，為設計模式的理解奠定基礎。讓我們一同簡單探索這些概念。

### Encapsulation 封裝

封裝是將屬性及方法的實作細節隱藏在類別中，只暴露必要的方法給使用者，保護內部屬性和方法不被隨意修改。

> 就像開車時，我們只需知道踩油門會加速，踩煞車會停止，而不必了解馬達、電瓶、發動機等原理。這些細節都被封裝在引擎蓋下。

### Inheritance 繼承

繼承使子類別可以繼承父類別的屬性和方法，達到程式碼重複使用的目的。

> 在自然界中，狗與貓都是動物，都能呼吸和行動；花草和樹木都是植物，都能進行光合作用。這就是繼承的概念。

### Polymorphism 多型

多型為不同的類別提供統一的介面或抽象類別，以操作不同的實體物件。

> 以 iPhone 6S 為例，不論是由台積電還是三星代工的晶片，使用者拿到的 iPhone 6S 功能都一樣。這就是多型。

### Abstraction 抽象

抽象通過類型或接口隱藏實作細節，只提供必要的功能給使用者。

> 我們在手機上安裝的 App 是對各種應用程式的抽象名稱；去市場買水果，不論是蘋果還是香蕉，水果也是一種抽象名稱。這就是抽象。

## 總結

理解了物件導向的核心概念後，我們將進一步探討這些概念如何引導我們進入設計原則的世界。物件導向概念為我們提供了創建模塊化、可重用和易於維護程式碼的基礎，而設計原則則教我們如何有效地應用這些概念來解決更複雜的設計問題。接下來，我們將探討這些原則，並了解它們如何幫助我們實現高質量的軟體設計。

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
