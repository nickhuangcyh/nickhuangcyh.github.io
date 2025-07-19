---
layout: post
title: "Design Pattern 7: Abstract Factory Pattern - Creating Families of Related Objects for Multi-Region Applications"
date: 2024-07-08 23:00:00 +0800
description: "Master the Abstract Factory Pattern to create families of related objects. Learn how to implement region-specific product families for global applications with practical examples and best practices."
tags:
  [
    Abstract Factory Pattern,
    Design Patterns,
    Product Families,
    Globalization,
    Software Architecture,
    Kotlin,
    Java,
    Swift,
    Factory Pattern,
    Object Creation,
  ]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Globalization]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Challenge of Global Product Families

The Abstract Factory Pattern is a creational design pattern that provides an interface for creating families of related objects without specifying their concrete classes. This pattern is essential for building applications that need to support multiple product families, such as region-specific configurations or platform-specific implementations.

## Real-World Applications

The Abstract Factory Pattern is widely used in:

- **Global Applications**: Region-specific UI components and configurations
- **Cross-Platform Development**: Platform-specific implementations (iOS, Android, Web)
- **Database Systems**: Different database providers (MySQL, PostgreSQL, MongoDB)
- **GUI Frameworks**: Theme-specific UI components (Light, Dark, High Contrast)
- **Game Development**: Different character types and equipment sets

## Problem Statement: Global Beverage System Expansion

Imagine expanding your beverage ordering system globally, where different regions have specific preferences. We need to support various beverage types while accommodating regional variations.

## Object-Oriented Analysis (OOA)

Let's analyze the requirements and design our initial solution:

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_3.png" title="Initial factory method design" %}

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

When we need to handle multiple product families across different regions, the **Abstract Factory Pattern** becomes essential.

## Identifying Design Forces

When we add new beverages to the menu, we must modify all factory methods, violating the **Open-Closed Principle**. The Abstract Factory Pattern solves this by creating families of related products.

## Applying Abstract Factory Pattern Solution

The Abstract Factory Pattern provides an elegant solution by abstracting the creation of product families.

### Abstract Factory Pattern UML Structure

{% include figure.liquid path="assets/img/design_pattern_abstract_factory_pattern_uml_1.png" title="Abstract Factory Pattern UML diagram" %}

By abstracting the factory, subclasses can create series of concrete objects.

### Product Family Matrix

The Abstract Factory is ideal when you need to create entire product families with different requirements. This creates a two-dimensional relationship:

| Country / Tea | BlackTea       | GreenTea      | MilkTea                   |
| ------------- | -------------- | ------------- | ------------------------- |
| US Flavor     | Ceylon(錫蘭)   | Gyokuro(玉露) | Thai (泰奶)               |
| EU Flavor     | EarlGrey(伯爵) | Sencha(煎茶)  | Masala Chai (印度馬薩拉)) |
| JP Flavor     | Assam(阿薩姆)  | Matcha(抹茶)  | Hokkaido(北海道奶茶)      |

### Applied to Beverage System

{% include figure.liquid path="assets/img/design_pattern_abstract_factory_pattern_uml_2.png" title="Beverage system with Abstract Factory Pattern" %}

## Implementation: Object-Oriented Programming (OOP)

### Product Interfaces

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public protocol BlackTea {
    var name: String { get }
    var origin: String { get }
}

public protocol GreenTea {
    var name: String { get }
    var origin: String { get }
}

public protocol MilkTea {
    var name: String { get }
    var milkType: String { get }
}
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
interface BlackTea {
    val name: String
    val origin: String
}

interface GreenTea {
    val name: String
    val origin: String
}

interface MilkTea {
    val name: String
    val milkType: String
}
```

{% endtab %}

{% endtabs %}

### Concrete Products

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public class CeylonBlackTea: BlackTea {
    public let name = "Ceylon Black Tea"
    public let origin = "Sri Lanka"
}

public class EarlGreyBlackTea: BlackTea {
    public let name = "Earl Grey Black Tea"
    public let origin = "United Kingdom"
}

public class AssamBlackTea: BlackTea {
    public let name = "Assam Black Tea"
    public let origin = "India"
}

public class GyokuroGreenTea: GreenTea {
    public let name = "Gyokuro Green Tea"
    public let origin = "Japan"
}

public class SenchaGreenTea: GreenTea {
    public let name = "Sencha Green Tea"
    public let origin = "Japan"
}

public class MatchaGreenTea: GreenTea {
    public let name = "Matcha Green Tea"
    public let origin = "Japan"
}
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
class CeylonBlackTea: BlackTea {
    override val name = "Ceylon Black Tea"
    override val origin = "Sri Lanka"
}

class EarlGreyBlackTea: BlackTea {
    override val name = "Earl Grey Black Tea"
    override val origin = "United Kingdom"
}

class AssamBlackTea: BlackTea {
    override val name = "Assam Black Tea"
    override val origin = "India"
}

class GyokuroGreenTea: GreenTea {
    override val name = "Gyokuro Green Tea"
    override val origin = "Japan"
}

class SenchaGreenTea: GreenTea {
    override val name = "Sencha Green Tea"
    override val origin = "Japan"
}

class MatchaGreenTea: GreenTea {
    override val name = "Matcha Green Tea"
    override val origin = "Japan"
}
```

{% endtab %}

{% endtabs %}

### Abstract Factory Interface

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public protocol BeverageFactory {
    func createBlackTea() -> BlackTea
    func createGreenTea() -> GreenTea
    func createMilkTea() -> MilkTea
}
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
interface BeverageFactory {
    fun createBlackTea(): BlackTea
    fun createGreenTea(): GreenTea
    fun createMilkTea(): MilkTea
}
```

{% endtab %}

{% endtabs %}

### Concrete Factories

{% tabs data-struct %}

{% tab data-struct Swift %}

public class USBeverageFactory: BeverageFactory {
public init() {}

    public func createBlackTea() -> BlackTea {
        return CeylonBlackTea()
    }

    public func createGreenTea() -> GreenTea {
        return GyokuroGreenTea()
    }

    public func createMilkTea() -> MilkTea {
        return ThaiMilkTea()
    }

}

public class EUBeverageFactory: BeverageFactory {
public init() {}

    public func createBlackTea() -> BlackTea {
        return EarlGreyBlackTea()
    }

    public func createGreenTea() -> GreenTea {
        return SenchaGreenTea()
    }

    public func createMilkTea() -> MilkTea {
        return MasalaChaiMilkTea()
    }

}

public class JPBeverageFactory: BeverageFactory {
public init() {}

    public func createBlackTea() -> BlackTea {
        return AssamBlackTea()
    }

    public func createGreenTea() -> GreenTea {
        return MatchaGreenTea()
    }

    public func createMilkTea() -> MilkTea {
        return HokkaidoMilkTea()
    }

}

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
class USBeverageFactory: BeverageFactory {
    override fun createBlackTea(): BlackTea {
        return CeylonBlackTea()
    }

    override fun createGreenTea(): GreenTea {
        return GyokuroGreenTea()
    }

    override fun createMilkTea(): MilkTea {
        return ThaiMilkTea()
    }
}

class EUBeverageFactory: BeverageFactory {
    override fun createBlackTea(): BlackTea {
        return EarlGreyBlackTea()
    }

    override fun createGreenTea(): GreenTea {
        return SenchaGreenTea()
    }

    override fun createMilkTea(): MilkTea {
        return MasalaChaiMilkTea()
    }
}

class JPBeverageFactory: BeverageFactory {
    override fun createBlackTea(): BlackTea {
        return AssamBlackTea()
    }

    override fun createGreenTea(): GreenTea {
        return MatchaGreenTea()
    }

    override fun createMilkTea(): MilkTea {
        return HokkaidoMilkTea()
    }
}
```

{% endtab %}

{% endtabs %}

### Client Usage

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
// US Region
let usFactory = USBeverageFactory()
let usBlackTea = usFactory.createBlackTea()
let usGreenTea = usFactory.createGreenTea()
let usMilkTea = usFactory.createMilkTea()

print("US Black Tea: \(usBlackTea.name) from \(usBlackTea.origin)")
print("US Green Tea: \(usGreenTea.name) from \(usGreenTea.origin)")
print("US Milk Tea: \(usMilkTea.name) with \(usMilkTea.milkType)")

// EU Region
let euFactory = EUBeverageFactory()
let euBlackTea = euFactory.createBlackTea()
let euGreenTea = euFactory.createGreenTea()
let euMilkTea = euFactory.createMilkTea()

print("EU Black Tea: \(euBlackTea.name) from \(euBlackTea.origin)")
print("EU Green Tea: \(euGreenTea.name) from \(euGreenTea.origin)")
print("EU Milk Tea: \(euMilkTea.name) with \(euMilkTea.milkType)")
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
// US Region
val usFactory = USBeverageFactory()
val usBlackTea = usFactory.createBlackTea()
val usGreenTea = usFactory.createGreenTea()
val usMilkTea = usFactory.createMilkTea()

println("US Black Tea: ${usBlackTea.name} from ${usBlackTea.origin}")
println("US Green Tea: ${usGreenTea.name} from ${usGreenTea.origin}")
println("US Milk Tea: ${usMilkTea.name} with ${usMilkTea.milkType}")

// EU Region
val euFactory = EUBeverageFactory()
val euBlackTea = euFactory.createBlackTea()
val euGreenTea = euFactory.createGreenTea()
val euMilkTea = euFactory.createMilkTea()

println("EU Black Tea: ${euBlackTea.name} from ${euBlackTea.origin}")
println("EU Green Tea: ${euGreenTea.name} from ${euGreenTea.origin}")
println("EU Milk Tea: ${euMilkTea.name} with ${euMilkTea.milkType}")
```

{% endtab %}

{% endtabs %}

## Advanced Implementation: UI Component Factory

```kotlin
// Abstract UI Components
interface Button {
    fun render(): String
}

interface TextField {
    fun render(): String
}

interface Checkbox {
    fun render(): String
}

// Concrete UI Components
class MaterialButton: Button {
    override fun render(): String = "<button class='material'>Click me</button>"
}

class BootstrapButton: Button {
    override fun render(): String = "<button class='btn btn-primary'>Click me</button>"
}

class MaterialTextField: TextField {
    override fun render(): String = "<input class='material-input' type='text'>"
}

class BootstrapTextField: TextField {
    override fun render(): String = "<input class='form-control' type='text'>"
}

// Abstract Factory
interface UIFactory {
    fun createButton(): Button
    fun createTextField(): TextField
    fun createCheckbox(): Checkbox
}

// Concrete Factories
class MaterialUIFactory: UIFactory {
    override fun createButton(): Button = MaterialButton()
    override fun createTextField(): TextField = MaterialTextField()
    override fun createCheckbox(): Checkbox = MaterialCheckbox()
}

class BootstrapUIFactory: UIFactory {
    override fun createButton(): Button = BootstrapButton()
    override fun createTextField(): TextField = BootstrapTextField()
    override fun createCheckbox(): Checkbox = BootstrapCheckbox()
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
            factory.createBlackTea(),
            factory.createGreenTea(),
            factory.createMilkTea()
        )
    }
}
```

### 2. **Product Family Consistency**

```kotlin
// Good: Ensuring product family consistency
abstract class AbstractBeverageFactory {
    abstract fun createBlackTea(): BlackTea
    abstract fun createGreenTea(): GreenTea
    abstract fun createMilkTea(): MilkTea

    // Template method to ensure consistency
    fun createCompleteMenu(): BeverageMenu {
        return BeverageMenu(
            blackTea = createBlackTea(),
            greenTea = createGreenTea(),
            milkTea = createMilkTea()
        )
    }
}
```

### 3. **Extensibility**

```kotlin
// Good: Easy to extend with new product families
interface BeverageFactory {
    fun createBlackTea(): BlackTea
    fun createGreenTea(): GreenTea
    fun createMilkTea(): MilkTea
    fun createHerbalTea(): HerbalTea // New product type
}

class USBeverageFactory: BeverageFactory {
    override fun createBlackTea(): BlackTea = CeylonBlackTea()
    override fun createGreenTea(): GreenTea = GyokuroGreenTea()
    override fun createMilkTea(): MilkTea = ThaiMilkTea()
    override fun createHerbalTea(): HerbalTea = ChamomileHerbalTea() // New implementation
}
```

## Performance Considerations

| Operation       | Abstract Factory | Simple Factory | Direct Instantiation |
| --------------- | ---------------- | -------------- | -------------------- |
| Object Creation | Medium           | Fast           | Fastest              |
| Memory Usage    | Low              | Low            | Low                  |
| Extensibility   | High             | Medium         | Low                  |
| Complexity      | High             | Medium         | Low                  |

## Related Design Patterns

- **Factory Method**: Creates objects without specifying exact classes
- **Builder**: Constructs complex objects step by step
- **Prototype**: Creates new objects by cloning existing ones
- **Singleton**: Ensures only one instance exists

## Conclusion

The Abstract Factory Pattern provides a powerful way to create families of related objects while maintaining consistency and extensibility. Key benefits include:

- **Product Family Consistency**: Ensures all products in a family are compatible
- **Easy Extension**: New product families can be added without modifying existing code
- **Configuration Flexibility**: Supports different configurations for different contexts
- **Maintainability**: Centralizes product creation logic

This pattern is essential for building applications that need to support multiple product families or configurations.

## Related Articles

- [Design Pattern 6: Factory Method Pattern](/2024-07-07-design-pattern-6-factory-method-pattern/)
- [Design Pattern 8: Builder Pattern](/2024-07-09-design-pattern-8-builder-pattern/)
- [Design Pattern 9: Prototype Pattern](/2024-07-19-design-pattern-9-prototype-pattern/)
- [Object-Oriented Design Principles](/2024-07-03-design-pattern-2-design-principle/)
