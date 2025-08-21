---
layout: post
title: "設計模式（5）簡單工廠模式 Simple Factory Pattern 完整教學：封裝物件創建邏輯"
date: 2024-07-06 23:00:00 +0800
description: "從飲料店點餐系統實例學會簡單工廠模式的核心概念。深入了解如何封裝物件創建邏輯、減少程式碼重複、提升可維護性。包含 UML 設計、Swift/Kotlin 實作與最佳實踐。"
tags: [Simple Factory Pattern, Factory Pattern, Creational Pattern, Object Creation, Design Pattern, Software Architecture, OOP Design, Programming]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 專案需求

想像你正在開發一套飲料店的點餐系統。這個系統需要能夠根據客人的選擇，動態創建不同種類的飲料物件。

系統的核心需求包括：
- 支援多種飲料類型（紅茶、綠茶等）
- 統一的製作流程（加糖、加冰、搖晃、包裝）
- 具備良好的擴展性，方便未來新增飲料品項

讓我們先通過UML圖來分析系統的基本結構，再逐步深入實作細節。

## 物件導向分析 (OOA)

首先，我們來看看初始的系統設計。在這個版本中，所有的飲料創建邏輯都直接寫在 `BeverageShop` 類別的 `order` 方法內。

{% include figure.liquid path="assets/img/design_pattern_simple_factory_pattern_uml_1.png" title="design_pattern_simple_factory_pattern_uml_1" %}

### 初始實作方式

下面的程式碼展示了最直接的實作方式。我們定義了一個 `Beverage` 介面，包含飲料製作的基本步驟，然後讓具體的飲料類別（如 `BlackTea`、`GreenTea`）實作這個介面。

{% tabs simple-factory-pattern-1 %}

{% tab simple-factory-pattern-1 Swift %}

```swift
public protocol Beverage {
    func addSuger(level: Int)
    func addIce(level: Int)
    func shake()
    func packageUp()
}

public extension Beverage {
    func addSuger(level: Int) {
        print("[\(self)] addSuger \(level)")
    }

    func addIce(level: Int) {
        print("[\(self)] addIce \(level)")
    }

    func shake() {
        print("[\(self)] shake")
    }

    func packageUp() {
        print("[\(self)] packageUp")
    }
}

public class BlackTea: Beverage {

}

public class GreenTea: Beverage {

}

public class BeverageShop {
    public init() {}

    public func order(beverageName: String) -> Beverage? {
        var beverage: Beverage?

        switch beverageName {
        case "black tea":
            beverage = BlackTea()
        case "green tea":
            beverage = GreenTea()
        default:
            break
        }

        beverage?.addSuger(level: 5)
        beverage?.addIce(level: 5)
        beverage?.shake()
        beverage?.packageUp()

        return beverage
    }
}

let beverageShop = BeverageShop()
let blackTea = beverageShop.order(beverageName: "black tea")
let greenTea = beverageShop.order(beverageName: "green tea")
```

{% endtab %}

{% tab simple-factory-pattern-1 Kotlin %}

```kotlin
interface Beverage {
    fun addSuger(level: Int) {
        println("[$this] addSuger $level")
    }

    fun addIce(level: Int) {
        println("[$this] addIce $level")
    }

    fun shake() {
        println("[$this] shake")
    }

    fun packageUp() {
        println("[$this] packageUp")
    }
}

class BlackTea: Beverage {
}

class GreenTea: Beverage {
}

class BeverageShop {
    fun order(beverageName: String): Beverage? {
        val beverage: Beverage? = when (beverageName) {
            "black tea" -> BlackTea()
            "green tea" -> GreenTea()
            else -> null
        }

        beverage?.addSuger(5)
        beverage?.addIce(5)
        beverage?.shake()
        beverage?.packageUp()

        return  beverage
    }
}
```

{% endtab %}

{% endtabs %}

## 發現問題：察覺 Forces

### 擴展性問題浮現

當飲料店的生意越來越好，老闆決定要新增更多飲品選項時，問題就來了。每次新增一種飲料，我們都必須修改 `BeverageShop` 的 `order` 方法。

這種做法違反了軟體設計的重要原則：**對修改封閉，對擴展開放**。更糟糕的是，修改 `order` 方法可能會意外影響到其他穩定運行的程式碼。

### 分離變動與穩定的程式碼

解決這個問題的關鍵是識別出哪些程式碼經常變動，哪些程式碼保持穩定。讓我們來分析一下：

#### 經常變動的程式碼

每當新增飲料品項時，這個 switch/when 區塊就必須被修改：

{% tabs simple-factory-pattern-2 %}

{% tab simple-factory-pattern-2 Swift %}

```swift
switch beverageName {
case "black tea":
    beverage = BlackTea()
case "green tea":
    beverage = GreenTea()
// case "milk tea":
    // beverage = MilkTea()
default:
    break
}
```

{% endtab %}

{% tab simple-factory-pattern-2 Kotlin %}

```kotlin
val beverage: Beverage? = when (beverageName) {
    "black tea" -> BlackTea()
    "green tea" -> GreenTea()
    else -> null
}
```

{% endtab %}

{% endtabs %}

#### 保持穩定的程式碼

相對地，飲料的製作流程是固定的，無論新增多少種飲料，這些步驟都不會改變：

{% tabs simple-factory-pattern-3 %}

{% tab simple-factory-pattern-3 Swift %}

```swift
beverage?.addSuger(level: 5)
beverage?.addIce(level: 5)
beverage?.shake()
beverage?.packageUp()
```

{% endtab %}

{% tab simple-factory-pattern-3 Kotlin %}

```kotlin
beverage?.addSuger(5)
beverage?.addIce(5)
beverage?.shake()
beverage?.packageUp()
```

{% endtab %}

{% endtabs %}

### 解決方案：引入簡單工廠模式

既然我們已經明確識別出變動與穩定的程式碼，下一步就是將它們分離。這正是 **簡單工廠模式（Simple Factory Pattern）** 擅長解決的問題。

簡單工廠模式的核心概念是：**將物件的創建邏輯封裝在一個獨立的工廠類別中**。這樣一來，當需要新增產品時，只需要修改工廠類別，而不會影響到使用這些物件的其他程式碼。

## 實施解決方案

### 簡單工廠模式的結構

在深入實作之前，讓我們先了解簡單工廠模式的標準結構：

{% include figure.liquid path="assets/img/design_pattern_simple_factory_pattern_uml_3.png" title="design_pattern_simple_factory_pattern_uml_3" %}

簡單工廠模式的核心就是建立一個專門的工廠類別，負責處理所有物件創建的邏輯。這個工廠類別通常包含一個靜態方法或實體方法，根據輸入參數決定要創建哪種具體產品。

### 套用到飲料系統

現在讓我們將簡單工廠模式套用到飲料點餐系統中。重新設計後的系統結構如下：

{% include figure.liquid path="assets/img/design_pattern_simple_factory_pattern_uml_2.png" title="design_pattern_simple_factory_pattern_uml_2" %}

## 物件導向程式設計 (OOP)

### 重構後的實作

現在我們可以開始實作重構後的系統。關鍵的改變是引入了 `BeverageFactory` 類別，它專門負責飲料物件的創建。

### 架構改善的重點

1. **職責分離**：`BeverageFactory` 負責物件創建，`BeverageShop` 負責訂單處理
2. **依賴注入**：`BeverageShop` 透過建構函式接收工廠實例，提升彈性
3. **單一職責**：每個類別都有明確且單一的職責

{% tabs simple-factory-pattern-4 %}

{% tab simple-factory-pattern-4 Swift %}

```swift
open class BeverageFactory {
    public init() {}

    func createBeverage(beverageName: String) -> Beverage? {
        var beverage: Beverage?

        switch beverageName {
        case "black tea":
            beverage = BlackTea()
        case "green tea":
            beverage = GreenTea()
        default:
            break
        }

        return beverage
    }
}

public class BeverageShop {

    private let factory: BeverageFactory

    public init(factory: BeverageFactory) {
        self.factory = factory
    }

    public func order(beverageName: String) -> Beverage? {
        let beverage: Beverage? = factory.createBeverage(beverageName: beverageName)

        beverage?.addSuger(level: 5)
        beverage?.addIce(level: 5)
        beverage?.shake()
        beverage?.packageUp()

        return beverage
    }
}

let beverageShop = BeverageShop(factory: BeverageFactory())
let blackTea = beverageShop.order(beverageName: "black tea")
let greenTea = beverageShop.order(beverageName: "green tea")
```

{% endtab %}

{% tab simple-factory-pattern-4 Kotlin %}

```kotlin
class BeverageFactory {
    fun createBeverage(beverageName: String): Beverage? {
        return when (beverageName) {
            "black tea" -> BlackTea()
            "green tea" -> GreenTea()
            else -> null
        }
    }
}

class BeverageShop(private val factory: BeverageFactory) {

    fun order(beverageName: String): Beverage? {
        val beverage: Beverage? = factory.createBeverage(beverageName)

        beverage?.addSuger(5)
        beverage?.addIce(5)
        beverage?.shake()
        beverage?.packageUp()

        return  beverage
    }
}

val beverage = BeverageShop(BeverageFactory())
val blackTea = beverage.order("black tea")
val greenTea = beverage.order("green tea")
```

{% endtab %}

{% endtabs %}

### 重構成果分析

透過簡單工廠模式的應用，我們成功達成了以下目標：

1. **程式碼分離**：將 **經常變動** 與 **保持穩定** 的程式碼成功分離
2. **擴展性提升**：新增飲料品項時，只需修改 `BeverageFactory`，不會影響其他程式碼
3. **維護性改善**：每個類別的職責更加明確，降低維護成本
4. **測試友善**：可以獨立測試工廠邏輯和訂單處理邏輯

### 重要提醒

> 簡單工廠其實不是設計模式，反而比較像是一種編程習慣
>
> 有些開發者的確是把這個編程習慣誤認為 **工廠模式 (Factory Pattern)**
>
> 不要因為簡單工廠不是一個 **真正的** 模式，就忽略了它的用法。
>
> -- Head First Design Pattern Ch.4 P.117

雖然簡單工廠不是 GoF 23 種設計模式之一，但它是學習更複雜工廠模式的重要基礎，也是在日常開發中非常實用的程式設計技巧。

## 總結與反思

### 學習成果

簡單工廠模式雖然不在 GoF 23 個經典設計模式之列，但它具有重要的學習價值：

1. **概念簡單易懂**：適合作為工廠模式系列的入門
2. **實用性很高**：在日常開發中經常使用到類似的程式設計技巧
3. **培養良好習慣**：訓練我們識別並分離變動與穩定的程式碼

### 應用的設計原則

在實作簡單工廠模式的過程中，我們運用了以下重要的 [設計原則]({{ site.baseurl }}/design%20pattern/design-pattern-1-design-principle/)：

- **封裝變化 (Encapsulate What Varies)**：將經常變動的物件創建邏輯封裝在工廠中
- **單一職責原則 (Single Responsibility Principle)**：每個類別都有明確且單一的職責

### 下一步學習

掌握了簡單工廠的概念後，我們已經為學習更複雜的工廠模式奠定了基礎。下一篇文章將正式進入 GoF 23 個設計模式的第一個：**工廠方法模式 (Factory Method Pattern)**，探討如何進一步提升系統的彈性與擴展性。

## 參考

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [大話設計模式](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [水球潘 - Design Pattern 之路](https://www.youtube.com/watch?v=yOe-uywb2qs&list=PLicQRHHL75d7EXEI9nWfUYJyrPdI79M70&pp=iAQB)

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長🙂
{: .notice--success}
