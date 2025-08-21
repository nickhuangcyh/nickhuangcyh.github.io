---
layout: post
title: "Design Pattern (5) Simple Factory Pattern Complete Tutorial - Encapsulating Object Creation Logic"
date: 2024-07-06 23:00:00 +0800
description: "Learn the core concepts of Simple Factory Pattern through a beverage ordering system example. Deep dive into encapsulating object creation logic, reducing code duplication, and improving maintainability. Includes UML design, Swift/Kotlin implementation, and best practices."
tags: [Simple Factory Pattern, Factory Pattern, Creational Pattern, Object Creation, Design Pattern, Software Architecture, OOP Design, Programming]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Project Requirements

Imagine you're developing an ordering system for a beverage shop. This system needs to dynamically create different types of beverage objects based on customer selections.

The core requirements of the system include:

- Support for multiple beverage types (black tea, green tea, etc.)
- Unified preparation process (add sugar, add ice, shake, package)
- Good extensibility for easily adding new beverage items in the future

Let's first analyze the basic structure of the system through UML diagrams, then gradually delve into the implementation details.

## Object-Oriented Analysis (OOA)

First, let's examine the initial system design. In this version, all beverage creation logic is written directly within the `order` method of the `BeverageShop` class.

{% include figure.liquid path="assets/img/design_pattern_simple_factory_pattern_uml_1.png" title="design_pattern_simple_factory_pattern_uml_1" %}

### Initial Implementation Approach

The following code demonstrates the most straightforward implementation approach. We define a `Beverage` interface that includes the basic steps of beverage preparation, then have concrete beverage classes (like `BlackTea`, `GreenTea`) implement this interface.

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

## Identifying Problems: Recognizing Forces

### Extensibility Issues Emerge

When the beverage shop's business grows and the owner decides to add more drink options, problems arise. Every time we add a new beverage type, we must modify the `order` method of `BeverageShop`.

This approach violates an important software design principle: **closed to modification, open to extension**. Even worse, modifying the `order` method might accidentally affect other stable, running code.

### Separating Variable from Stable Code

The key to solving this problem is identifying which code changes frequently and which code remains stable. Let's analyze:

#### Frequently Changing Code

Every time we add a beverage item, this switch/when block must be modified:

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

#### Stable Code

In contrast, the beverage preparation process is fixed. No matter how many types of beverages we add, these steps never change:

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

### Solution: Introducing the Simple Factory Pattern

Since we've clearly identified the variable and stable code, the next step is to separate them. This is exactly what the **Simple Factory Pattern** excels at solving.

The core concept of the Simple Factory Pattern is: **encapsulate object creation logic in an independent factory class**. This way, when we need to add new products, we only need to modify the factory class without affecting other code that uses these objects.

## Implementing the Solution

### Simple Factory Pattern Structure

Before diving into implementation, let's understand the standard structure of the Simple Factory Pattern:

{% include figure.liquid path="assets/img/design_pattern_simple_factory_pattern_uml_3.png" title="design_pattern_simple_factory_pattern_uml_3" %}

The core of the Simple Factory Pattern is creating a specialized factory class responsible for handling all object creation logic. This factory class typically contains a static method or instance method that decides which concrete product to create based on input parameters.

### Applying to the Beverage System

Now let's apply the Simple Factory Pattern to the beverage ordering system. The redesigned system structure is as follows:

{% include figure.liquid path="assets/img/design_pattern_simple_factory_pattern_uml_2.png" title="design_pattern_simple_factory_pattern_uml_2" %}

## Object-Oriented Programming (OOP)

### Refactored Implementation

Now we can start implementing the refactored system. The key change is introducing the `BeverageFactory` class, which is specifically responsible for beverage object creation.

### Key Points of Architectural Improvement

1. **Separation of Responsibilities**: `BeverageFactory` handles object creation, `BeverageShop` handles order processing
2. **Dependency Injection**: `BeverageShop` receives factory instances through its constructor, improving flexibility
3. **Single Responsibility**: Each class has a clear and single responsibility

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

### Refactoring Results Analysis

Through the application of the Simple Factory Pattern, we successfully achieved the following goals:

1. **Code Separation**: Successfully separated **frequently changing** and **stable** code
2. **Enhanced Extensibility**: When adding beverage items, only need to modify `BeverageFactory` without affecting other code
3. **Improved Maintainability**: Each class has clearer responsibilities, reducing maintenance costs
4. **Test-Friendly**: Can independently test factory logic and order processing logic

### Important Note

> Simple Factory isn't actually a design pattern, but rather more like a programming idiom
>
> Some developers do mistake this programming idiom for the **Factory Pattern**
>
> Don't ignore its usefulness just because Simple Factory isn't a **true** pattern.
>
> -- Head First Design Pattern Ch.4 P.117

Although Simple Factory is not one of the GoF 23 design patterns, it is an important foundation for learning more complex factory patterns and is also a very practical programming technique in daily development.

## Summary and Reflection

### Learning Outcomes

Although the Simple Factory Pattern is not among the GoF 23 classic design patterns, it has important learning value:

1. **Simple and Easy to Understand**: Suitable as an introduction to the factory pattern series
2. **High Practicality**: Frequently used programming techniques in daily development
3. **Cultivating Good Habits**: Trains us to identify and separate variable from stable code

### Applied Design Principles

In implementing the Simple Factory Pattern, we applied the following important [design principles]({{ site.baseurl }}/design%20pattern/design-pattern-1-design-principle/):

- **Encapsulate What Varies**: Encapsulate frequently changing object creation logic in the factory
- **Single Responsibility Principle**: Each class has a clear and single responsibility

### Next Steps in Learning

Having mastered the concept of Simple Factory, we've laid the foundation for learning more complex factory patterns. The next article will formally enter the first of the GoF 23 design patterns: **Factory Method Pattern**, exploring how to further enhance system flexibility and extensibility.

## References

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [Design Patterns](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Waterball Pan - Design Pattern Journey](https://www.youtube.com/watch?v=yOe-uywb2qs&list=PLicQRHHL75d7EXEI9nWfUYJyrPdI79M70&pp=iAQB)

**Note:** If you have any suggestions, questions, or different ideas, feel free to leave a comment or send me an email. We can discuss and learn together🙂
{: .notice--success}
