---
layout: post
title: "Design Pattern (6) Factory Method Pattern Complete Tutorial - Extensible Object Creation"
date: 2024-07-07 23:00:00 +0800
description: "Learn how Factory Method Pattern solves the extensibility issues of Simple Factory. Deep dive into designing extensible object creation systems through a global beverage chain example. Includes UML design, implementation examples, and best practices."
tags: [Factory Method Pattern, Design Pattern, Creational Pattern, Polymorphism, Extensibility, Object Creation, Software Architecture, OOP]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: From Success to Challenge

Imagine your beverage ordering system has become tremendously popular globally. As your business expands, you face a new challenge: how to satisfy the specific preferences of customers in different regions?

In the previous article, we used the [Simple Factory Pattern]({% post_url 2024-07-06-design-pattern-5-simple-factory-pattern %}) to successfully separate **code that needs to change** from **code that doesn't need to change**. This pattern works well in a single region, but when we want to expand to the global market, we encounter new limitations.

Today, we'll explore how to use the **Factory Method Pattern** to further enhance system flexibility and extensibility.

## Requirements: Satisfying Global Tastes

The beverage ordering system has been loved by customers and has performed very well, so the client is rapidly expanding stores worldwide. However, problems soon emerge - customers in different regions have vastly different preferences.

### Market Research Findings

- **US Market**: Customers prefer the rich taste of Ceylon black tea
- **European Market**: Customers favor the elegant aroma of Earl Grey black tea

### Business Goals

Our goal is to satisfy these diverse regional requirements without significantly increasing operational costs. Based on cost considerations, we've decided that each region will only use tea varieties that best match local taste preferences to make black tea, rather than adding all varieties to the menu.

## Object-Oriented Analysis (OOA)

### Initial Solution Approach

Facing the demands of globalization, our first thought is to extend the Simple Factory Pattern. Let's look at the preliminary design:

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_1.png" title="design_pattern_factory_method_pattern_uml_1" %}

We modified the Simple Factory code, adding `USBeverageFactory` and `EUBeverageFactory` to respectively produce beverages that match American and European local tastes. This way, stores in each region can obtain beverages that suit local preferences from their corresponding factories.

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

## Recognizing Problems (Forces)

### Limitations of the Initial Approach

Although the above approach can satisfy stores obtaining region-specific beverages from different factories, upon deeper analysis, we discover a serious problem:

**Extensibility Issue**: Every time a new regional store joins (such as Japan or Korea), we must modify the `BeverageShop` code to add new store factories. This violates the **Open Closed Principle**.

**Maintenance Costs**: As regions increase, the scope of code modifications will grow larger, and maintenance costs will rise accordingly.

We need a more elegant solution that can support expansion to new regions without modifying existing code.

## Applying the Factory Method Pattern (Solution)

### Pattern Introduction

After clearly understanding the entire problem context and recognizing the problem points (Forces), we can apply the **Factory Method Pattern** to solve this issue.

Let's first understand the standard structure of the Factory Method Pattern:

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_2.png" title="design_pattern_factory_method_pattern_uml_2" %}

**Core Concept**: Provide an interface for creating objects, but let subclasses decide the actual instantiation process. This way, we can extend new product types through inheritance without modifying existing code.

### Applying to Our Beverage System

Let's apply the Factory Method Pattern to the beverage system:

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_3.png" title="design_pattern_factory_method_pattern_uml_3" %}

Through this design, we get a completely new and more flexible solution (Resulting Context).

## Object-Oriented Programming (OOP)

### Implementing the Factory Method Pattern

Now let's convert the design into code implementation. The key change is introducing the `BeverageFactory` interface, allowing regional factories to implement this common interface.

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

### Pattern Advantages Demonstrated

Through the Factory Method Pattern, we successfully achieved true extensibility by abstracting the factory:

**Expanding to New Regions Becomes Simple**: If we want to expand to Japan stores, we only need to:

1. Add a `JPBeverageFactory` that implements the `BeverageFactory` interface
2. Implement beverage creation logic that suits Japanese tastes within it

**No Need to Modify Existing Code**: Other unchanged code is completely unaffected, perfectly adhering to the Open Closed Principle.

**Clear Separation of Responsibilities**: Each regional factory is only responsible for that region's product creation logic, conforming to the Single Responsibility Principle.

## Summary

### Pattern Value

Through the Factory Method Pattern, we successfully solved the challenge of global expansion. This pattern allows us to flexibly expand product lines to meet the diverse needs of the global market without sacrificing the overall system architecture.

### Key Benefits

- **Enhanced Maintainability**: Logic for each region is independently encapsulated, easy to maintain
- **Increased Extensibility**: Adding new regions requires no modification of existing code
- **Reduced Coupling**: Achieve loose coupling through interfaces
- **Adheres to Design Principles**: Follows multiple important object-oriented design principles

### Applied Design Principles

The Factory Method Pattern embodies the following important [Design Principles]({{ site.baseurl }}/design%20pattern/design-pattern-1-design-principle/):

- **Encapsulate What Varies**: Encapsulate changing product creation logic in respective factories
- **Loose Coupling**: Reduce coupling between components through interfaces
- **Program to Interfaces**: Depend on abstract interfaces rather than concrete implementations
- **Single Responsibility Principle**: Each factory is only responsible for specific regional product creation
- **Open Closed Principle**: Open to extension, closed to modification
- **Dependency Inversion Principle**: High-level modules don't depend on low-level modules; both depend on abstractions

### Future Outlook

In the next article, we'll introduce the **Abstract Factory Pattern**, exploring how to further enhance factory pattern applications when we need to create a series of related products.

## References

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [Design Patterns](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [refactoring](https://refactoring.guru/design-patterns/factory-method)
- [Waterball Pan - Design Pattern Journey](https://www.youtube.com/watch?v=yOe-uywb2qs&list=PLicQRHHL75d7EXEI9nWfUYJyrPdI79M70&pp=iAQB)

**Note:** If you have any suggestions, questions, or different ideas, feel free to leave a comment or send me an email. We can discuss and learn together🙂
{: .notice--success}
