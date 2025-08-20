---
layout: post
title: Design Pattern (6) - Factory Method Pattern (工廠方法模式)
date: 2024-07-07 23:00:00 +0800
description: 深入探討工廠方法模式，通過實例展示其應用，提升程式碼的靈活性和可擴展性。
tags: [Factory Method Pattern]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 引言：從成功到挑戰

想像一下，你的飲料點餐系統在全球範圍內大受歡迎。隨著業務的擴展，你面臨著一個新的挑戰：如何滿足不同地區顧客的特定偏好？

上一篇我們運用[簡單工廠模式]({% post_url 2024-07-06-design-pattern-5-simple-factory-pattern %})成功地將**需要變動**以及**不需變動**的程式碼分離。這個模式在單一地區運作良好，但當我們要擴展到全球市場時，卻遇到了新的限制。

今天，我們將探討如何運用**工廠方法模式**進一步提升系統的靈活性和擴展性。

## 需求：滿足全球化的味蕾

飲料點餐系統受到客戶的喜愛，業績非常好，於是客戶在世界各地迅速擴店。然而，很快問題就出現了——不同地區的顧客有著截然不同的偏好。

### 市場調研發現

- **美國市場**：顧客偏愛錫蘭紅茶的濃郁口感
- **歐洲市場**：顧客鐘情於伯爵紅茶的優雅香氣

### 業務目標

我們的目標是在不大幅增加營運成本的前提下，滿足這些多樣化的地域需求。基於成本考量，我們決定每個地區只選用最符合當地口味偏好的茶葉來製作紅茶，而非將所有種類都加入菜單。

## 物件導向分析(OOA)

### 初步解決方案

面對全球化的需求，我們首先想到的解決方案是擴展簡單工廠模式。讓我們看看初步的設計：

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_1.png" title="design_pattern_factory_method_pattern_uml_1" %}

我們修改了簡單工廠的程式碼，新增了 `USBeverageFactory` 及 `EUBeverageFactory` 來分別製作符合美國及歐洲當地口味的飲品。這樣每個地區的分店都能從對應的工廠取得符合當地偏好的飲料。

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public class CeylonBlackTea: Beverage {

}

public class EarlGreyBlackTea: Beverage {

}

public class GyokuroGreenTea: Beverage {

}

public class SenchaGreenTea: Beverage {

}

open class USBeverageFactory {

    public init() {}

    func createBeverage(beverageName: String) -> Beverage? {
        var beverage: Beverage?

        switch beverageName {
        case "black tea":
            beverage = CeylonBlackTea()
        case "green tea":
            beverage = GyokuroGreenTea()
        default:
            break
        }

        return beverage
    }
}

open class EUBeverageFactory {

    public init() {}

    class func createBeverage(beverageName: String) -> Beverage? {
        var beverage: Beverage?

        switch beverageName {
        case "black tea":
            beverage = EarlGreyBlackTea()
        case "green tea":
            beverage = SenchaGreenTea()
        default:
            break
        }

        return beverage
    }
}
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
class CeylonBlackTea: Beverage {
}

class EarlGreyBlackTea: Beverage {
}

class GyokuroGreenTea: Beverage {
}

class SenchaGreenTea: Beverage {
}

class USBeverageFactory {
    fun createBeverage(beverageName: String): Beverage? {
        return when (beverageName) {
            "black tea" -> CeylonBlackTea()
            "green tea" -> GyokuroGreenTea()
            else -> null
        }
    }
}

class EUBeverageFactory {
    fun createBeverage(beverageName: String): Beverage? {
        return when (beverageName) {
            "black tea" -> EarlGreyBlackTea()
            "green tea" -> SenchaGreenTea()
            else -> null
        }
    }
}
```

{% endtab %}

{% endtabs %}

## 察覺問題 (Forces)

### 初步方案的限制

雖然上述方案可以滿足分店從不同工廠取得該地區的飲品，但深入分析後我們發現了一個嚴重問題：

**擴展性問題**：每當有新的地區分店加入（例如日本、韓國），我們就必須修改 `BeverageShop` 的程式碼來添加新的分店工廠。這違反了**開放封閉原則 (Open Closed Principle)**。

**維護成本**：隨著地區增加，程式碼的修改範圍會越來越大，維護成本也會隨之上升。

我們需要一個更優雅的解決方案，能夠在不修改現有程式碼的前提下支援新地區的擴展。

## 套用工廠方法模式 (Solution)

### 模式介紹

看清楚整個問題脈絡（Context）並察覺問題點（Forces）後，我們可以套用**工廠方法模式 (Factory Method Pattern)** 來解決這個問題。

讓我們先來了解工廠方法模式的標準結構：

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_2.png" title="design_pattern_factory_method_pattern_uml_2" %}

**核心概念**：提供一個介面用來創建物件，但真正的實體化過程由子類別決定。這樣我們就能夠在不修改既有程式碼的情況下，透過繼承來擴展新的產品類型。

### 應用到我們的飲料系統

讓我們將工廠方法模式應用到飲料系統中：

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_3.png" title="design_pattern_factory_method_pattern_uml_3" %}

透過這個設計，我們得到了一個全新且更加靈活的解決方案 (Resulting Context)。

## 物件導向程式設計 (OOP)

### 實作工廠方法模式

現在讓我們將設計轉換為程式碼實作。關鍵的改變是引入 `BeverageFactory` 介面，讓各地區的工廠都實作這個共同的介面。

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public protocol BeverageFactory {
    func createBeverage(beverageName: String) -> Beverage?
}

open class USBeverageFactory: BeverageFactory {

    public init() {}

    public func createBeverage(beverageName: String) -> Beverage? {
        var beverage: Beverage?

        switch beverageName {
        case "black tea":
            beverage = CeylonBlackTea()
        case "green tea":
            beverage = GyokuroGreenTea()
        default:
            break
        }

        return beverage
    }
}

open class EUBeverageFactory: BeverageFactory {

    public init() {}

    public func createBeverage(beverageName: String) -> Beverage? {
        var beverage: Beverage?

        switch beverageName {
        case "black tea":
            beverage = EarlGreyBlackTea()
        case "green tea":
            beverage = SenchaGreenTea()
        default:
            break
        }

        return beverage
    }
}

let usBeverageShop = BeverageShop(factory: USBeverageFactory())
let usBlackTea = usBeverageShop.order(beverageName: "black tea")
let usGreenTea = usBeverageShop.order(beverageName: "green tea")

let euBeverageShop = BeverageShop(factory: EUBeverageFactory())
let euBlackTea = euBeverageShop.order(beverageName: "black tea")
let euGreenTea = euBeverageShop.order(beverageName: "green tea")
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
interface BeverageFactory {
    fun createBeverage(beverageName: String): Beverage?
}

class USBeverageFactory: BeverageFactory {
    override fun createBeverage(beverageName: String): Beverage? {
        return when (beverageName) {
            "black tea" -> CeylonBlackTea()
            "green tea" -> GyokuroGreenTea()
            else -> null
        }
    }
}

class EUBeverageFactory: BeverageFactory {
    override fun createBeverage(beverageName: String): Beverage? {
        return when (beverageName) {
            "black tea" -> EarlGreyBlackTea()
            "green tea" -> SenchaGreenTea()
            else -> null
        }
    }
}

val usBeverageShop = BeverageShop(USBeverageFactory())
val usBlackTea = usBeverageShop.order("black tea")
val usGreenTea = usBeverageShop.order("green tea")

val euBeverageShop = BeverageShop(EUBeverageFactory())
val euBlackTea = euBeverageShop.order("black tea")
val euGreenTea = euBeverageShop.order("green tea")
```

{% endtab %}

{% endtabs %}

### 模式優勢展現

透過工廠方法模式，我們成功將工廠抽象化，達到了真正的可擴展性：

**擴展新地區變得簡單**：如果要擴展到日本分店，我們只需要：
1. 新增一個 `JPBeverageFactory` 實作 `BeverageFactory` 介面
2. 在其中實作符合日本人口味的飲料創建邏輯

**無需修改既有程式碼**：其他不需變動的程式碼完全不受影響，完美符合開放封閉原則。

**職責分離清晰**：每個地區的工廠只負責該地區的產品創建邏輯，符合單一職責原則。

## 總結

### 模式價值

通過工廠方法模式，我們成功解決了全球化擴展的挑戰。這個模式讓我們能夠在不犧牲系統整體架構的前提下，靈活地擴展產品線，滿足全球化市場的多樣化需求。

### 關鍵收益

- **提升可維護性**：每個地區的邏輯獨立封裝，便於維護
- **增強擴展性**：新增地區無需修改既有程式碼
- **降低耦合度**：透過介面實現鬆散耦合
- **符合設計原則**：遵循多項重要的物件導向設計原則

### 運用的設計原則

工廠方法模式體現了以下重要的 [Design Principle]({{ site.baseurl }}/design%20pattern/design-pattern-1-design-principle/)：

- **Encapsulate What Varies**：將變化的產品創建邏輯封裝在各自的工廠中
- **Loose Coupling**：透過介面降低元件間的耦合度
- **Program to Interfaces**：依賴抽象介面而非具體實作
- **Single Responsibility Principle**：每個工廠只負責特定地區的產品創建
- **Open Closed Principle**：對擴展開放，對修改封閉
- **Dependency Inversion Principle**：高層模組不依賴低層模組，都依賴抽象

### 下一步展望

下一篇我們將介紹**抽象工廠模式 (Abstract Factory Pattern)**，探討當我們需要創建一系列相關產品時，如何進一步提升工廠模式的應用。

## 參考

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [大話設計模式](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [refactoring](https://refactoring.guru/design-patterns/factory-method)
- [水球潘 - Design Pattern 之路](https://www.youtube.com/watch?v=yOe-uywb2qs&list=PLicQRHHL75d7EXEI9nWfUYJyrPdI79M70&pp=iAQB)

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長🙂
{: .notice--success}
