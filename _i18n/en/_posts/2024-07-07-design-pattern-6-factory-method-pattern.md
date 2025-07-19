---
layout: post
title: "Design Pattern 6: Factory Method Pattern - Flexible Object Creation for Multi-Region Applications"
date: 2024-07-07 23:00:00 +0800
description: "Master the Factory Method Pattern to create objects without specifying exact classes. Learn how to implement region-specific factories, improve flexibility, and support global application expansion."
tags:
  [Factory Method Pattern, Design Patterns, Object Creation, Globalization, Software Architecture, Kotlin, Java, Swift, Polymorphism, Extensibility]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Globalization]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Challenge of Global Expansion

Imagine your beverage ordering system becoming wildly popular worldwide. As your business expands, you face a challenge: how to satisfy the specific preferences of customers in different regions?

In our previous article, we successfully used the [Simple Factory Pattern](/2024-07-06-design-pattern-5-simple-factory-pattern/) to separate **variable code** from **constant code**. Today, we'll explore how to further enhance our system's flexibility and extensibility.

## Problem Statement: Satisfying Global Taste Preferences

The beverage ordering system has become very popular with customers, leading to rapid expansion worldwide. However, a problem quickly emerged—customers in different regions have different preferences.

**Case Analysis:**

- **US customers** prefer Ceylon black tea
- **EU customers** prefer Earl Grey black tea

Our goal is to satisfy these diverse requirements without significantly increasing costs. (For cost considerations, we won't add all tea varieties to the menu, but use only the tea leaves that best suit local tastes.)

## Object-Oriented Analysis (OOA)

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_1.png" title="Initial multi-region beverage system design" %}

We modify the simple factory code by adding `USBeverageFactory` and `EUBeverageFactory` to create beverages that match local tastes in the US and EU regions.

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public class CeylonBlackTea: Beverage {
    // Ceylon black tea specific implementation
}

public class EarlGreyBlackTea: Beverage {
    // Earl Grey black tea specific implementation
}

public class GyokuroGreenTea: Beverage {
    // Gyokuro green tea specific implementation
}

public class SenchaGreenTea: Beverage {
    // Sencha green tea specific implementation
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
    // Ceylon black tea specific implementation
}

class EarlGreyBlackTea: Beverage {
    // Earl Grey black tea specific implementation
}

class GyokuroGreenTea: Beverage {
    // Gyokuro green tea specific implementation
}

class SenchaGreenTea: Beverage {
    // Sencha green tea specific implementation
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

## Identifying Design Forces

While this approach can satisfy different regional factories for different stores, every time a new store is added, we must modify the `BeverageShop` code to add new regional factories, violating the **Open-Closed Principle**.

## Applying Factory Method Pattern Solution

After understanding the Context and identifying Forces, we can apply the Factory Method Pattern to solve this problem.

### Factory Method Pattern UML Structure

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_2.png" title="Factory Method Pattern UML diagram" %}

The Factory Method Pattern provides an interface for creating objects, letting subclasses decide which class to instantiate.

### Applied to Beverage System

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_3.png" title="Beverage system with Factory Method Pattern" %}

## Implementation: Object-Oriented Programming (OOP)

### Abstract Factory Interface

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
```

{% endtab %}

{% endtabs %}

### Updated Client

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public class BeverageShop {
    private let factory: BeverageFactory

    public init(factory: BeverageFactory) {
        self.factory = factory
    }

    public func order(beverageName: String) -> Beverage? {
        let beverage = factory.createBeverage(beverageName: beverageName)

        beverage?.addSugar(level: 5)
        beverage?.addIce(level: 5)
        beverage?.shake()
        beverage?.packageUp()

        return beverage
    }
}

// Usage
let usFactory = USBeverageFactory()
let usShop = BeverageShop(factory: usFactory)
let usBlackTea = usShop.order(beverageName: "black tea")

let euFactory = EUBeverageFactory()
let euShop = BeverageShop(factory: euFactory)
let euBlackTea = euShop.order(beverageName: "black tea")
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
class BeverageShop(private val factory: BeverageFactory) {
    fun order(beverageName: String): Beverage? {
        val beverage = factory.createBeverage(beverageName)

        beverage?.addSugar(5)
        beverage?.addIce(5)
        beverage?.shake()
        beverage?.packageUp()

        return beverage
    }
}

// Usage
val usFactory = USBeverageFactory()
val usShop = BeverageShop(usFactory)
val usBlackTea = usShop.order("black tea")

val euFactory = EUBeverageFactory()
val euShop = BeverageShop(euFactory)
val euBlackTea = euShop.order("black tea")
```

{% endtab %}

{% endtabs %}

## Advanced Implementation: Configuration-Driven Factory Selection

```kotlin
class BeverageShopFactory {
    fun createShop(region: String): BeverageShop {
        val factory = when (region.lowercase()) {
            "us" -> USBeverageFactory()
            "eu" -> EUBeverageFactory()
            "jp" -> JPBeverageFactory()
            else -> USBeverageFactory() // Default
        }
        return BeverageShop(factory)
    }
}

class JPBeverageFactory: BeverageFactory {
    override fun createBeverage(beverageName: String): Beverage? {
        return when (beverageName) {
            "black tea" -> AssamBlackTea()
            "green tea" -> MatchaGreenTea()
            else -> null
        }
    }
}

class AssamBlackTea: Beverage {
    override fun toString(): String = "AssamBlackTea"
}

class MatchaGreenTea: Beverage {
    override fun toString(): String = "MatchaGreenTea"
}
```

## Real-World Example: Database Connection Factory

```kotlin
interface DatabaseConnection {
    fun connect(): Boolean
    fun disconnect()
    fun executeQuery(query: String): List<Map<String, Any>>
}

class MySQLConnection: DatabaseConnection {
    override fun connect(): Boolean {
        println("Connecting to MySQL database")
        return true
    }

    override fun disconnect() {
        println("Disconnecting from MySQL database")
    }

    override fun executeQuery(query: String): List<Map<String, Any>> {
        println("Executing query on MySQL: $query")
        return emptyList()
    }
}

class PostgreSQLConnection: DatabaseConnection {
    override fun connect(): Boolean {
        println("Connecting to PostgreSQL database")
        return true
    }

    override fun disconnect() {
        println("Disconnecting from PostgreSQL database")
    }

    override fun executeQuery(query: String): List<Map<String, Any>> {
        println("Executing query on PostgreSQL: $query")
        return emptyList()
    }
}

interface DatabaseFactory {
    fun createConnection(): DatabaseConnection
}

class MySQLFactory: DatabaseFactory {
    override fun createConnection(): DatabaseConnection = MySQLConnection()
}

class PostgreSQLFactory: DatabaseFactory {
    override fun createConnection(): DatabaseConnection = PostgreSQLConnection()
}

class DatabaseManager(private val factory: DatabaseFactory) {
    fun performOperation(query: String): List<Map<String, Any>> {
        val connection = factory.createConnection()
        connection.connect()
        val result = connection.executeQuery(query)
        connection.disconnect()
        return result
    }
}
```

## Best Practices and Considerations

### 1. **Factory Selection Strategy**

```kotlin
// Good: Configuration-based factory selection
class BeverageService {
    private val factory: BeverageFactory

    constructor(region: String) {
        factory = when (region.lowercase()) {
            "us" -> USBeverageFactory()
            "eu" -> EUBeverageFactory()
            "jp" -> JPBeverageFactory()
            else -> USBeverageFactory() // Default
        }
    }

    fun createBeverageMenu(): List<Beverage> {
        return listOf(
            factory.createBeverage("black tea"),
            factory.createBeverage("green tea")
        ).filterNotNull()
    }
}
```

### 2. **Parameterized Factory Methods**

```kotlin
// Good: Factory methods with parameters
interface AdvancedBeverageFactory {
    fun createBeverage(beverageName: String, sweetness: Int, iceLevel: Int): Beverage?
}

class USBeverageFactory: AdvancedBeverageFactory {
    override fun createBeverage(beverageName: String, sweetness: Int, iceLevel: Int): Beverage? {
        return when (beverageName) {
            "black tea" -> CeylonBlackTea(sweetness, iceLevel)
            "green tea" -> GyokuroGreenTea(sweetness, iceLevel)
            else -> null
        }
    }
}
```

### 3. **Factory Method with Caching**

```kotlin
// Good: Factory with object caching
abstract class CachedBeverageFactory: BeverageFactory {
    private val cache = mutableMapOf<String, Beverage>()

    override fun createBeverage(beverageName: String): Beverage? {
        return cache.getOrPut(beverageName) {
            createBeverageImpl(beverageName) ?: return null
        }
    }

    protected abstract fun createBeverageImpl(beverageName: String): Beverage?
}
```

## Performance Considerations

| Approach             | Memory Usage | Performance | Flexibility | Extensibility |
| -------------------- | ------------ | ----------- | ----------- | ------------- |
| Simple Factory       | Low          | High        | Low         | Low           |
| Factory Method       | Medium       | Medium      | High        | High          |
| Abstract Factory     | High         | Medium      | High        | High          |
| Direct Instantiation | Low          | High        | Low         | Low           |

## Related Design Patterns

- **Simple Factory**: Centralizes object creation logic
- **Abstract Factory**: Creates families of related objects
- **Builder**: Constructs complex objects step by step
- **Prototype**: Creates new objects by cloning existing ones

## Conclusion

The Factory Method Pattern provides a powerful way to create objects without specifying their exact classes. Key benefits include:

- **Flexibility**: Easy to add new product types without modifying existing code
- **Extensibility**: New factories can be added without changing client code
- **Polymorphism**: Client code works with abstract interfaces
- **Maintainability**: Object creation logic is centralized and organized

This pattern is essential for building flexible applications that need to support multiple product variants or regional differences.

## Related Articles

- [Design Pattern 5: Simple Factory Pattern](/2024-07-06-design-pattern-5-simple-factory-pattern/)
- [Design Pattern 7: Abstract Factory Pattern](/2024-07-08-design-pattern-7-abstract-factory-pattern/)
- [Design Pattern 8: Builder Pattern](/2024-07-09-design-pattern-8-builder-pattern/)
- [Object-Oriented Design Principles](/2024-07-03-design-pattern-2-design-principle/)
