---
layout: post
title: "Design Pattern (7) Abstract Factory Pattern Complete Tutorial - Unified Creation of Product Families"
date: 2024-07-08 23:00:00 +0800
description: "Learn how Abstract Factory Pattern solves the creation problem of related object groups. Deep dive into designing unified product family creation interfaces through beverage shop themed package examples. Includes UML design, implementation examples, and best practices."
tags: [Abstract Factory Pattern, Design Pattern, Creational Pattern, Product Family, Object Creation, Software Architecture, OOP, Interface Design]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: From Single Products to Product Families

In the previous article, we used the **Factory Method Pattern** to successfully solve the challenge of global expansion, allowing each region to create beverages that match local preferences. However, as business continues to develop, we face a new challenge: how to manage the creation of an entire product family?

## Requirements: The Challenge of Rich Product Lines

### New Needs from Business Expansion

As our business expands globally, we discovered that providing only black tea and green tea can no longer satisfy market demands. To stand out in fierce market competition, we decided to:

- **Enrich Product Lines**: Besides black tea and green tea, we also want to add milk tea series
- **Synchronized Expansion**: Continue expanding to more countries and regions while adding new menu items
- **Maintain Consistency**: Ensure that product families in each region conform to local culture and taste preferences

### New Challenges Emerge

When we began implementing this plan, we quickly discovered the limitations of the Factory Method Pattern when handling multiple product families.

## Object-Oriented Analysis (OOA)

### Reviewing Factory Method Pattern Implementation

Let's review the current Factory Method Pattern design:

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_3.png" title="design_pattern_factory_method_pattern_uml_3" %}

The current implementation approach is as follows:

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
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
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
override fun createBeverage(beverageName: String): Beverage? {
    return when (beverageName) {
        "black tea" -> CeylonBlackTea()
        "green tea" -> GyokuroGreenTea()
        else -> null
    }
}
```

{% endtab %}

{% endtabs %}

### Discovering Problems

When we want to add milk tea to our product line, this single factory method approach begins to reveal problems. We need a solution that can handle **combinations of multiple related product families** across different regions.

This is exactly when the **Abstract Factory Pattern** shines.

## Recognizing Problems (Forces)

### Limitations of Factory Method Pattern

As our product line expands, we discovered the problems with Factory Method Pattern when handling multiple product families:

**Difficult Extension**: Every time we add a new beverage type (like milk tea) to the menu, we must modify the methods in all regional factories, which violates the **Open Closed Principle**.

**Complex Maintenance**: As product varieties increase, each factory's code will become increasingly large, and maintenance difficulty will rise accordingly.

**Type Safety Issues**: Using string parameters to decide which product to create is prone to spelling errors and cannot be checked at compile time.

We need a solution better suited for handling product families.

## Applying Abstract Factory Pattern (Solution)

### Pattern Introduction

After clearly understanding the entire problem context and recognizing the problem points (Forces), we can apply the **Abstract Factory Pattern** to solve this issue.

Let's first understand the standard structure of the Abstract Factory Pattern:

{% include figure.liquid path="assets/img/design_pattern_abstract_factory_pattern_uml_1.png" title="design_pattern_abstract_factory_pattern_uml_1" %}

**Core Concept**: Through factory abstraction, subclasses can create a series of related concrete objects.

### Two-Dimensional Relationship Judgment Criteria

The Abstract Factory Pattern has an important judgment method: **When the products you want to create form a product family, and different requirements need to create different families, if this relationship can be drawn as a two-dimensional relationship table, it's very suitable for using the Abstract Factory Pattern.**

Let's look at our beverage series:

| Country / Tea | BlackTea | GreenTea | MilkTea     |
| ------------- | -------- | -------- | ----------- |
| US Flavor     | Ceylon   | Gyokuro  | Thai        |
| EU Flavor     | EarlGrey | Sencha   | Masala Chai |
| JP Flavor     | Assam    | Matcha   | Hokkaido    |

This two-dimensional table clearly shows our requirements: different regions (horizontal axis) need to create different types of beverage families (vertical axis).

### Applying to Our System

Let's redesign our UML based on this tea beverage series (to clearly demonstrate the concept, we'll first implement the black tea and green tea parts):

{% include figure.liquid path="assets/img/design_pattern_abstract_factory_pattern_uml_2.png" title="design_pattern_abstract_factory_pattern_uml_2" %}

Through this design, we get a completely new solution better suited for handling product families (Resulting Context).

## Object-Oriented Programming (OOP)

### Implementing Abstract Factory Pattern

Now let's convert the Abstract Factory Pattern design into code implementation. The key change is abstracting each product type separately and having the factory provide specialized creation methods for each product.

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public protocol BlackTea {
}

public class CeylonBlackTea: BlackTea {

}

public class EarlGreyBlackTea: BlackTea {

}

public protocol GreenTea {
}

public class GyokuroGreenTea: GreenTea {

}

public class SenchaGreenTea: GreenTea {

}

public protocol BeverageFactory {
    func createBlackTea() -> BlackTea?
    func createGreenTea() -> GreenTea?
}

open class USBeverageFactory: BeverageFactory {

    public init() {}

    public func createBlackTea() -> BlackTea? {
        return CeylonBlackTea()
    }

    public func createGreenTea() -> GreenTea? {
        return GyokuroGreenTea()
    }
}

open class EUBeverageFactory: BeverageFactory {

    public init() {}

    public func createBlackTea() -> BlackTea? {
        return EarlGreyBlackTea()
    }

    public func createGreenTea() -> GreenTea? {
        return SenchaGreenTea()
    }
}

let usBeverageFactory = USBeverageFactory()
let usBlackTea = usBeverageFactory.createBlackTea()
let usGreenTea = usBeverageFactory.createGreenTea()

print("usBlackTea is \(usBlackTea)")
print("usGreenTea is \(usGreenTea)")

let euBeverageFactory = EUBeverageFactory()
let euBlackTea = euBeverageFactory.createBlackTea()
let euGreenTea = euBeverageFactory.createGreenTea()

print("euBlackTea is \(euBlackTea)")
print("euGreenTea is \(euGreenTea)")
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
interface BlackTea {
}

class CeylonBlackTea: BlackTea {
}

class EarlGreyBlackTea: BlackTea {
}

interface GreenTea {
}

class GyokuroGreenTea: GreenTea {
}

class SenchaGreenTea: GreenTea {
}

interface BeverageFactory {
    fun createBlackTea(): BlackTea
    fun createGreenTea(): GreenTea
}

class USBeverageFactory: BeverageFactory {

    override fun createBlackTea(): BlackTea {
        return CeylonBlackTea()
    }

    override fun createGreenTea(): GreenTea {
        return GyokuroGreenTea()
    }
}

class EUBeverageFactory: BeverageFactory {

    override fun createBlackTea(): BlackTea {
        return EarlGreyBlackTea()
    }

    override fun createGreenTea(): GreenTea {
        return SenchaGreenTea()
    }
}

val usBeverageFactory = USBeverageFactory()
val usBlackTea = usBeverageFactory.createBlackTea()
val usGreenTea = usBeverageFactory.createGreenTea()

print("usBlackTea is $usBlackTea")
print("usGreenTea is $usGreenTea")

val euBeverageFactory = EUBeverageFactory()
val euBlackTea = euBeverageFactory.createBlackTea()
val euGreenTea = euBeverageFactory.createGreenTea()

print("euBlackTea is $euBlackTea")
print("euGreenTea is $euGreenTea")
```

{% endtab %}

{% endtabs %}

### Pattern Advantages Demonstrated

After using the Abstract Factory Pattern, we gained the following important advantages:

**High-Level Abstraction**: Stores don't need to know what specific tea varieties they are, they just need to know to get black tea, green tea, or milk tea from their regional beverage factory.

**Dependency Inversion Principle**: This perfectly demonstrates the **Dependency Inversion Principle** - both factories and products depend on abstractions, not concrete implementations.

**Type Safety**: Through specialized methods to create different types of products, we avoid the error risks brought by string parameters.

**Easy Extension**: Adding new regions becomes easy - just implement new concrete factories.

## Abstract Factory Pattern Application Scenarios

### Two-Dimensional Relationship Examples in the Real World

The Abstract Factory Pattern is applied in many actual software development scenarios. Here are some typical two-dimensional relationship examples:

### Cross-Platform UI Development

When developing cross-platform applications, we often encounter combinations of different operating systems with various UI components:

| OS / UI Components | Button      | Checkbox      |
| ------------------ | ----------- | ------------- |
| Linux              | LinuxButton | LinuxCheckbox |
| MacOS              | MacButton   | MacCheckbox   |
| Windows            | WinButton   | WinCheckbox   |

### Theme System Design

Modern applications often need to support multiple themes, which also forms a two-dimensional relationship:

| Theme / UI Components | Button          | Checkbox          |
| --------------------- | --------------- | ----------------- |
| Light Mode            | LightModeButton | LightModeCheckbox |
| Dark Mode             | DarkModeButton  | DarkModeCheckbox  |

### IoT System Architecture

In IoT systems, combinations of different communication protocols with various smart devices are also typical application scenarios:

| Protocol / Device | Dimmer   | Hue   | Thermostat   |
| ----------------- | -------- | ----- | ------------ |
| ZWave             | ZWDimmer | ZWHue | ZWThermostat |
| Zigbee            | ZBDimmer | ZBHue | ZBThermostat |

These examples all demonstrate the applicability of the Abstract Factory Pattern: when you need to create a series of related products, and these product combinations present a two-dimensional relationship.

## Factory Method Pattern vs Abstract Factory Pattern

### Comparative Analysis of Both Patterns

Understanding the differences between these two factory patterns helps us choose appropriate solutions in actual development:

### Factory Method Pattern

**Applicable Scenarios**: Multiple implementations of single products

- **Product Extensibility**: High - easy to add new product types
- **Factory Extensibility**: Medium - each additional product requires corresponding factories
- **Usage Timing**: When you need to create single products but have multiple different implementations

### Abstract Factory Pattern

**Applicable Scenarios**: Multiple implementation combinations of product families

- **Factory Extensibility**: High - easy to add new product families (like new regions)
- **Product Extensibility**: Low - adding product types requires modifying all concrete factories
- **Usage Timing**: When you need to create a series of related products, and these product combinations present a two-dimensional relationship

### Selection Recommendations

- If your requirements are mainly **horizontal expansion** (adding families), choose Abstract Factory Pattern
- If your requirements are mainly **vertical expansion** (adding product types), choose Factory Method Pattern

## Summary

### Pattern Value

In this article, we deeply explored how the Abstract Factory Pattern solves the challenge of product family creation. Compared to the Factory Method Pattern's focus on single product creation, the Abstract Factory Pattern provides creation mechanisms for entire product families, particularly effective when handling two-dimensional relationship product combinations.

### Key Benefits

- **Family Management**: Ability to uniformly manage the creation of an entire product family
- **Type Safety**: Avoid errors from string parameters through specialized methods
- **High-Level Abstraction**: Clients don't need to understand specific product implementation details
- **Easy Horizontal Extension**: Adding product families becomes simple

### Application Timing

Consider using the Abstract Factory Pattern when your system needs to handle the following situations:

- Products have relationships between them, forming product families
- Product combinations to be created present two-dimensional relationships
- System needs to switch between different product families at runtime

### Applied Design Principles

The Abstract Factory Pattern embodies the following important [Design Principles]({{ site.baseurl }}/design%20pattern/design-pattern-1-design-principle/):

- **Encapsulate What Varies**: Encapsulate product family creation logic in concrete factories
- **Loose Coupling**: Reduce coupling between clients and concrete products through abstract interfaces
- **Program to Interfaces**: Depend on abstract factory and abstract product interfaces
- **Single Responsibility Principle**: Each concrete factory is only responsible for one product family
- **Open Closed Principle**: Open to extension of new product families, closed to modification
- **Dependency Inversion Principle**: Both high-level and low-level modules depend on abstractions

### Future Outlook

Next, we'll introduce the **Builder Pattern**, exploring solutions when object construction processes are complex and require step-by-step progression.

## References

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [Design Patterns](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [refactoring](https://refactoring.guru/design-patterns/factory-method)

**Note:** If you have any suggestions, questions, or different ideas, feel free to leave a comment or send me an email. We can discuss and learn together🙂
{: .notice--success}
