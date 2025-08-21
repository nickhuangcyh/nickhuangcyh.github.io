---
layout: post
title: "Design Pattern (6) - Factory Method Pattern (工廠方法模式)"
date: 2024-07-07 23:00:00 +0800
description: "深入探討工廠方法模式，通過實例展示其應用，提升程式碼的靈活性和可擴展性。"
tags: [Factory Method Pattern]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 引言：一個全球化的挑戰

想像一下，你的飲料點餐系統在全球範圍內大受歡迎。隨著業務的擴展，你面臨著一個挑戰：如何滿足不同地區顧客的特定偏好？

上一篇我們利用[簡單工廠模式]({% post_url 2024-07-06-design-pattern-5-simple-factory-pattern %})模式成功地將**需要變動** 以及 **不需變動** 的程式碼分離。今天，我們將探討如何進一步提升我們系統的靈活性和擴展性。

## 需求：滿足全球化的味蕾

飲料點餐系統受到客戶的喜愛，業績非常好，於是客戶在世界各地迅速擴店。但很快的問題出現了——不同地區的顧客有著不同的偏好。

- **案例分析**:
  - 美國喜歡錫蘭紅茶
  - 歐洲喜歡伯爵紅茶

我們的目標是，不增加過多成本的同時，滿足這些多樣化的需求。
(成本考量我們不將所有紅茶種類都加入菜單，只用最符合當地口味的茶葉製作紅茶)

## 物件導向分析(OOA)

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_1.png" title="design_pattern_factory_method_pattern_uml_1" %}

於是我們修改簡單工廠的程式碼，新增 USBeverageFactory 及 EUBeverageFactory 來製作符合美國及歐洲當地口味的飲品

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

## 察覺 Forces

這樣做雖然可以滿足分店從不同工廠取得該地區的飲品，但每當有新的分店加入，就必須動到 BeverageShop 的程式碼來添加新的分店工廠，違反了 **Open Closed Principle**

## 套用 Solution

看清楚整個 Context，察覺 Forces 後，就可以套用 Factory Method Pattern 來解決這個問題

先來看一下 Factory Method Pattern 的 UML

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_2.png" title="design_pattern_factory_method_pattern_uml_2" %}

提供一個介面用來創建物件，真正實體化的類別由子類別實作決定。
讓我們修改一下上面的 UML

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_3.png" title="design_pattern_factory_method_pattern_uml_3" %}

如此我們就得到了一個全新的 Resulting Context

## 物件導向程式設計 (OOP)

再來我們就可以開始進行物件導向程式開發

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

透過工廠方法模式，我們透過將工廠抽象化，達到可擴充性，之後如果要拓展其他分店像是日本分店，只需新增一個 JPBeverageFactory ，就能創建能做出符合日本人口味的飲料工廠，而不需修改到其他不需變動的程式碼。

## 總結

通過工廠方法模式，我們可以在不犧牲系統整體架構的前提下，靈活地擴展我們的產品線，滿足全球化市場的需求。這不僅提升了我們系統的可維護性和擴展性，也為我們的業務帶來了更大的機會。

我們來看看工廠方法用到哪些 [Design Principle]({{ site.baseurl }}/design%20pattern/design-pattern-1-design-principle/)

- Encapsulate What Varies
- Loose Coupling
- Program to Interfaces
- Single Responsibility Principle
- Open Closed Principle
- Dependency Inversion Principle

下一篇要介紹最後一個工廠模式 Abstract Factory Pattern 抽象工廠模式

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
