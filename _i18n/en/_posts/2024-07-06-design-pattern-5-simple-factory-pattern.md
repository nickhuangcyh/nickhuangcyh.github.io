---
layout: post
title: "Design Pattern 5: Simple Factory Pattern - Centralized Object Creation for Dynamic Beverage Ordering Systems"
date: 2024-07-06 23:00:00 +0800
description: "Master the Simple Factory Pattern to centralize object creation logic. Learn how to separate variable and constant code, improve maintainability, and create flexible object instantiation systems."
tags: [Simple Factory Pattern, Design Patterns, Object Creation, Factory Pattern, Software Architecture, Kotlin, Java, Swift, Code Separation, Maintainability]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Code Quality]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Power of Centralized Object Creation

The Simple Factory Pattern is a creational design pattern that provides a centralized way to create objects without exposing the instantiation logic to the client. This pattern is particularly useful when you need to separate object creation logic from the rest of your application code.

## Real-World Applications

The Simple Factory Pattern is widely used in:

- **Beverage Ordering Systems**: Creating different types of drinks based on customer orders
- **Payment Processing**: Creating different payment gateways (PayPal, Stripe, etc.)
- **Database Connections**: Creating different database adapters
- **UI Components**: Creating different types of UI elements
- **Game Development**: Creating different types of game objects

## Problem Statement: Dynamic Beverage Ordering System

Our goal is to create a beverage ordering system that can dynamically generate beverage objects based on user selections. Let's start by analyzing the basic system structure through UML.

## Object-Oriented Analysis (OOA)

{% include figure.liquid path="assets/img/design_pattern_simple_factory_pattern_uml_1.png" title="Initial beverage ordering system design" %}

{% tabs simple-factory-pattern-1 %}

{% tab simple-factory-pattern-1 Swift %}

```swift
public protocol Beverage {
    func addSugar(level: Int)
    func addIce(level: Int)
    func shake()
    func packageUp()
}

public extension Beverage {
    func addSugar(level: Int) {
        print("[\(self)] addSugar \(level)")
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
    // Black tea specific implementation
}

public class GreenTea: Beverage {
    // Green tea specific implementation
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

        beverage?.addSugar(level: 5)
        beverage?.addIce(level: 5)
        beverage?.shake()
        beverage?.packageUp()

        return beverage
    }
}

// Usage
let beverageShop = BeverageShop()
let blackTea = beverageShop.order(beverageName: "black tea")
let greenTea = beverageShop.order(beverageName: "green tea")
```

{% endtab %}

{% tab simple-factory-pattern-1 Kotlin %}

```kotlin
interface Beverage {
    fun addSugar(level: Int) {
        println("[$this] addSugar $level")
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
    // Black tea specific implementation
}

class GreenTea: Beverage {
    // Green tea specific implementation
}

class BeverageShop {
    fun order(beverageName: String): Beverage? {
        val beverage: Beverage? = when (beverageName) {
            "black tea" -> BlackTea()
            "green tea" -> GreenTea()
            else -> null
        }

        beverage?.addSugar(5)
        beverage?.addIce(5)
        beverage?.shake()
        beverage?.packageUp()

        return beverage
    }
}

// Usage
val beverageShop = BeverageShop()
val blackTea = beverageShop.order("black tea")
val greenTea = beverageShop.order("green tea")
```

{% endtab %}

{% endtabs %}

## Identifying Design Forces

As the beverage shop adds more new drinks, we need to modify the `order` method, which can easily affect code that shouldn't change. We need to identify and separate **variable code** from **constant code**.

### Variable Code (Code that changes)

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
    // "milk tea" -> MilkTea()
    else -> null
}
```

{% endtab %}

{% endtabs %}

### Constant Code (Code that doesn't change)

{% tabs simple-factory-pattern-3 %}

{% tab simple-factory-pattern-3 Swift %}

```swift
beverage?.addSugar(level: 5)
beverage?.addIce(level: 5)
beverage?.shake()
beverage?.packageUp()
```

{% endtab %}

{% tab simple-factory-pattern-3 Kotlin %}

```kotlin
beverage?.addSugar(5)
beverage?.addIce(5)
beverage?.shake()
beverage?.packageUp()
```

{% endtab %}

{% endtabs %}

## Applying Simple Factory Pattern Solution

The Simple Factory Pattern provides an elegant solution by centralizing the object creation logic in a separate factory class.

### Simple Factory Pattern UML Structure

{% include figure.liquid path="assets/img/design_pattern_simple_factory_pattern_uml_2.png" title="Simple Factory Pattern UML diagram" %}

**Key Components:**
- **Product**: The interface for the objects being created
- **Concrete Products**: Specific implementations of the product
- **Factory**: Centralized class responsible for creating objects
- **Client**: Uses the factory to create objects

## Implementation: Object-Oriented Programming (OOP)

### Product Interface

```kotlin
interface Beverage {
    fun addSugar(level: Int) {
        println("[$this] addSugar $level")
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
```

### Concrete Products

```kotlin
class BlackTea: Beverage {
    override fun toString(): String = "BlackTea"
}

class GreenTea: Beverage {
    override fun toString(): String = "GreenTea"
}

class MilkTea: Beverage {
    override fun toString(): String = "MilkTea"
}
```

### Simple Factory

```kotlin
class BeverageFactory {
    fun createBeverage(beverageName: String): Beverage? {
        return when (beverageName.lowercase()) {
            "black tea" -> BlackTea()
            "green tea" -> GreenTea()
            "milk tea" -> MilkTea()
            else -> null
        }
    }
}
```

### Updated Client

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
fun main() {
    val factory = BeverageFactory()
    val shop = BeverageShop(factory)
    
    val blackTea = shop.order("black tea")
    val greenTea = shop.order("green tea")
    val milkTea = shop.order("milk tea")
}
```

## Advanced Implementation: Enhanced Factory with Validation

```kotlin
class EnhancedBeverageFactory {
    private val supportedBeverages = setOf("black tea", "green tea", "milk tea", "oolong tea")
    
    fun createBeverage(beverageName: String): Beverage? {
        if (!supportedBeverages.contains(beverageName.lowercase())) {
            println("Unsupported beverage: $beverageName")
            return null
        }
        
        return when (beverageName.lowercase()) {
            "black tea" -> BlackTea()
            "green tea" -> GreenTea()
            "milk tea" -> MilkTea()
            "oolong tea" -> OolongTea()
            else -> null
        }
    }
    
    fun getSupportedBeverages(): Set<String> = supportedBeverages.toSet()
}

class OolongTea: Beverage {
    override fun toString(): String = "OolongTea"
}
```

## Real-World Example: Payment Gateway Factory

```kotlin
interface PaymentGateway {
    fun processPayment(amount: Double): Boolean
    fun getGatewayName(): String
}

class PayPalGateway: PaymentGateway {
    override fun processPayment(amount: Double): Boolean {
        println("Processing $amount via PayPal")
        return true
    }
    
    override fun getGatewayName(): String = "PayPal"
}

class StripeGateway: PaymentGateway {
    override fun processPayment(amount: Double): Boolean {
        println("Processing $amount via Stripe")
        return true
    }
    
    override fun getGatewayName(): String = "Stripe"
}

class PaymentGatewayFactory {
    fun createGateway(gatewayType: String): PaymentGateway? {
        return when (gatewayType.lowercase()) {
            "paypal" -> PayPalGateway()
            "stripe" -> StripeGateway()
            else -> null
        }
    }
}

class PaymentProcessor(private val factory: PaymentGatewayFactory) {
    fun processPayment(gatewayType: String, amount: Double): Boolean {
        val gateway = factory.createGateway(gatewayType)
        return gateway?.processPayment(amount) ?: false
    }
}
```

## Best Practices and Considerations

### 1. **Error Handling**

```kotlin
// Good: Proper error handling
class RobustBeverageFactory {
    fun createBeverage(beverageName: String): Result<Beverage> {
        return try {
            val beverage = when (beverageName.lowercase()) {
                "black tea" -> BlackTea()
                "green tea" -> GreenTea()
                "milk tea" -> MilkTea()
                else -> throw IllegalArgumentException("Unsupported beverage: $beverageName")
            }
            Result.success(beverage)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

### 2. **Factory Method with Caching**

```kotlin
// Good: Factory with object caching
class CachedBeverageFactory {
    private val cache = mutableMapOf<String, Beverage>()
    
    fun createBeverage(beverageName: String): Beverage? {
        return cache.getOrPut(beverageName.lowercase()) {
            when (beverageName.lowercase()) {
                "black tea" -> BlackTea()
                "green tea" -> GreenTea()
                "milk tea" -> MilkTea()
                else -> return null
            }
        }
    }
}
```

### 3. **Configuration-Based Factory**

```kotlin
// Good: Configuration-driven factory
class ConfigurableBeverageFactory(private val config: Map<String, String>) {
    fun createBeverage(beverageName: String): Beverage? {
        val className = config[beverageName.lowercase()] ?: return null
        
        return try {
            Class.forName(className).getDeclaredConstructor().newInstance() as Beverage
        } catch (e: Exception) {
            null
        }
    }
}

// Usage
val config = mapOf(
    "black tea" to "com.example.BlackTea",
    "green tea" to "com.example.GreenTea",
    "milk tea" to "com.example.MilkTea"
)
val factory = ConfigurableBeverageFactory(config)
```

## Performance Considerations

| Approach | Memory Usage | Performance | Maintainability | Extensibility |
|----------|--------------|-------------|-----------------|---------------|
| Direct Instantiation | Low | High | Low | Low |
| Simple Factory | Medium | Medium | High | Medium |
| Factory Method | Medium | Medium | High | High |
| Abstract Factory | High | Medium | High | High |

## Related Design Patterns

- **Factory Method**: Creates objects without specifying exact classes
- **Abstract Factory**: Creates families of related objects
- **Builder**: Constructs complex objects step by step
- **Singleton**: Ensures only one instance exists

## Conclusion

The Simple Factory Pattern provides a powerful way to centralize object creation logic while separating variable code from constant code. Key benefits include:

- **Code Separation**: Clear separation between object creation and business logic
- **Maintainability**: Easy to modify object creation logic in one place
- **Flexibility**: Easy to add new product types
- **Testability**: Easier to test object creation logic separately

This pattern is essential for building maintainable applications where object creation logic needs to be centralized and managed effectively.

## Related Articles

- [Design Pattern 6: Factory Method Pattern](/2024-07-07-design-pattern-6-factory-method-pattern/)
- [Design Pattern 7: Abstract Factory Pattern](/2024-07-08-design-pattern-7-abstract-factory-pattern/)
- [Design Pattern 8: Builder Pattern](/2024-07-09-design-pattern-8-builder-pattern/)
- [Object-Oriented Design Principles](/2024-07-03-design-pattern-2-design-principle/)
