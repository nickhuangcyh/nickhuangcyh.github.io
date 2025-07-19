---
layout: post
title: "Design Pattern 8: Builder Pattern - Step-by-Step Construction of Complex Objects for Flexible Configuration"
date: 2024-07-09 23:00:00 +0800
description: "Master the Builder Pattern to construct complex objects step by step. Learn how to create flexible object construction with optional parameters, improve code readability, and handle complex initialization scenarios."
tags:
  [
    Builder Pattern,
    Design Patterns,
    Object Construction,
    Complex Objects,
    Fluent Interface,
    Software Architecture,
    Kotlin,
    Java,
    Swift,
    Telescoping Constructor,
  ]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Code Quality]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Challenge of Complex Object Construction

The Builder Pattern is a creational design pattern that allows you to construct complex objects step by step. This pattern is particularly useful when you need to create objects with many optional parameters or when the construction process involves multiple steps.

## Real-World Applications

The Builder Pattern is widely used in:

- **Configuration Objects**: Building complex configuration with optional parameters
- **Database Queries**: Constructing SQL queries with dynamic conditions
- **UI Components**: Building complex UI elements with multiple properties
- **API Requests**: Creating HTTP requests with various headers and parameters
- **Game Development**: Constructing game objects with different attributes

## Problem Statement: Beverage Machine Configuration

We need to design an automated beverage machine that can create various bubble tea combinations. The machine should support multiple toppings and ingredients to attract a wide customer base.

**Available Toppings:**

- Pearls (珍珠)
- Coconut Jelly (椰果)
- Red Beans (紅豆)
- Grass Jelly (仙草凍)
- Pudding (布丁)

## Object-Oriented Analysis (OOA)

Let's analyze the requirements and design our initial solution:

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_1.png" title="Initial beverage design with multiple parameters" %}

However, this approach has a problem: if we only want to add red beans and pudding, we must pass `false` or `null` for other unused parameters. This becomes difficult to maintain and reduces readability as the number of parameters increases.

A smarter approach might be to use multiple constructors to avoid passing unnecessary parameters:

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_2.png" title="Multiple constructors approach" %}

## Identifying Design Forces

As the number of parameters increases, we need more constructors, making the class difficult to maintain and the instantiation process complex. This phenomenon is known as the **telescoping constructor** problem.

> **Telescoping Constructor**: When a class has multiple constructors with different parameter counts, leading to difficult maintenance and usage.

## Applying Builder Pattern Solution

The Builder Pattern provides an elegant solution by separating object construction from its representation.

### Builder Pattern UML Structure

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_3.png" title="Builder Pattern UML diagram" %}

**Key Components:**

- **Product**: The complex object being built
- **Builder**: Interface defining construction steps
- **ConcreteBuilder**: Implements specific construction logic
- **Director**: Manages the construction process
- **Client**: Initiates the building process

### Applied to Beverage System

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_4.png" title="Beverage system with Builder Pattern" %}

## Implementation: Object-Oriented Programming (OOP)

### Product Interface

```kotlin
interface Beverage {
    var hasPearls: Boolean
    var hasCoconutJelly: Boolean
    var hasRedBeans: Boolean
    var hasGrassJelly: Boolean
    var hasPudding: Boolean

    fun getDescription(): String
    fun getPrice(): Double
}
```

### Concrete Products

```kotlin
data class BubbleTea(
    override var hasPearls: Boolean = false,
    override var hasCoconutJelly: Boolean = false,
    override var hasRedBeans: Boolean = false,
    override var hasGrassJelly: Boolean = false,
    override var hasPudding: Boolean = false
): Beverage {
    override fun getDescription(): String {
        val toppings = mutableListOf<String>()
        if (hasPearls) toppings.add("Pearls")
        if (hasCoconutJelly) toppings.add("Coconut Jelly")
        if (hasRedBeans) toppings.add("Red Beans")
        if (hasGrassJelly) toppings.add("Grass Jelly")
        if (hasPudding) toppings.add("Pudding")

        return "Bubble Tea with: ${toppings.joinToString(", ")}"
    }

    override fun getPrice(): Double {
        var basePrice = 5.0
        if (hasPearls) basePrice += 1.0
        if (hasCoconutJelly) basePrice += 0.5
        if (hasRedBeans) basePrice += 0.8
        if (hasGrassJelly) basePrice += 0.6
        if (hasPudding) basePrice += 1.2
        return basePrice
    }
}

data class GrassJellyPuddingTea(
    override var hasPearls: Boolean = false,
    override var hasCoconutJelly: Boolean = false,
    override var hasRedBeans: Boolean = false,
    override var hasGrassJelly: Boolean = false,
    override var hasPudding: Boolean = false
): Beverage {
    override fun getDescription(): String {
        val toppings = mutableListOf<String>()
        if (hasPearls) toppings.add("Pearls")
        if (hasCoconutJelly) toppings.add("Coconut Jelly")
        if (hasRedBeans) toppings.add("Red Beans")
        if (hasGrassJelly) toppings.add("Grass Jelly")
        if (hasPudding) toppings.add("Pudding")

        return "Grass Jelly Pudding Tea with: ${toppings.joinToString(", ")}"
    }

    override fun getPrice(): Double {
        var basePrice = 6.0
        if (hasPearls) basePrice += 1.0
        if (hasCoconutJelly) basePrice += 0.5
        if (hasRedBeans) basePrice += 0.8
        if (hasGrassJelly) basePrice += 0.6
        if (hasPudding) basePrice += 1.2
        return basePrice
    }
}
```

### Builder Interface

```kotlin
interface BeverageBuilder {
    fun addPearls(): BeverageBuilder
    fun addCoconutJelly(): BeverageBuilder
    fun addRedBeans(): BeverageBuilder
    fun addGrassJelly(): BeverageBuilder
    fun addPudding(): BeverageBuilder
    fun reset(): BeverageBuilder
    fun build(): Beverage
}
```

### Concrete Builders

```kotlin
class BubbleTeaBuilder: BeverageBuilder {
    private var bubbleTea = BubbleTea()

    override fun addPearls(): BubbleTeaBuilder {
        bubbleTea.hasPearls = true
        return this
    }

    override fun addCoconutJelly(): BubbleTeaBuilder {
        bubbleTea.hasCoconutJelly = true
        return this
    }

    override fun addRedBeans(): BubbleTeaBuilder {
        bubbleTea.hasRedBeans = true
        return this
    }

    override fun addGrassJelly(): BubbleTeaBuilder {
        bubbleTea.hasGrassJelly = true
        return this
    }

    override fun addPudding(): BubbleTeaBuilder {
        bubbleTea.hasPudding = true
        return this
    }

    override fun reset(): BubbleTeaBuilder {
        bubbleTea = BubbleTea()
        return this
    }

    override fun build(): BubbleTea {
        return bubbleTea
    }
}

class GrassJellyPuddingTeaBuilder: BeverageBuilder {
    private var grassJellyPuddingTea = GrassJellyPuddingTea()

    override fun addPearls(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasPearls = true
        return this
    }

    override fun addCoconutJelly(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasCoconutJelly = true
        return this
    }

    override fun addRedBeans(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasRedBeans = true
        return this
    }

    override fun addGrassJelly(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasGrassJelly = true
        return this
    }

    override fun addPudding(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasPudding = true
        return this
    }

    override fun reset(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea = GrassJellyPuddingTea()
        return this
    }

    override fun build(): GrassJellyPuddingTea {
        return grassJellyPuddingTea
    }
}
```

### Director (Optional)

```kotlin
class BeverageMaker(private val builder: BeverageBuilder) {
    fun makeClassicBubbleTea(): Beverage {
        return builder.reset()
            .addPearls()
            .build()
    }

    fun makeDeluxeBubbleTea(): Beverage {
        return builder.reset()
            .addPearls()
            .addCoconutJelly()
            .addPudding()
            .build()
    }

    fun makeGrassJellyPuddingTea(): Beverage {
        return builder.reset()
            .addGrassJelly()
            .addPudding()
            .build()
    }

    fun makeCustomBeverage(configuration: (BeverageBuilder) -> BeverageBuilder): Beverage {
        return configuration(builder.reset()).build()
    }
}
```

### Client Usage

```kotlin
fun main() {
    // Using Builder directly
    val bubbleTeaBuilder = BubbleTeaBuilder()
    val classicBubbleTea = bubbleTeaBuilder
        .addPearls()
        .build()

    println("Classic Bubble Tea: ${classicBubbleTea.getDescription()}")
    println("Price: $${classicBubbleTea.getPrice()}")

    // Using Director
    val beverageMaker = BeverageMaker(BubbleTeaBuilder())
    val deluxeBubbleTea = beverageMaker.makeDeluxeBubbleTea()

    println("Deluxe Bubble Tea: ${deluxeBubbleTea.getDescription()}")
    println("Price: $${deluxeBubbleTea.getPrice()}")

    // Custom configuration
    val customBeverage = beverageMaker.makeCustomBeverage { builder ->
        builder.addPearls()
            .addRedBeans()
            .addPudding()
    }

    println("Custom Beverage: ${customBeverage.getDescription()}")
    println("Price: $${customBeverage.getPrice()}")
}
```

## Advanced Implementation: Fluent Builder with Validation

```kotlin
class AdvancedBeverageBuilder {
    private var hasPearls = false
    private var hasCoconutJelly = false
    private var hasRedBeans = false
    private var hasGrassJelly = false
    private var hasPudding = false
    private var sweetness: SweetnessLevel = SweetnessLevel.NORMAL
    private var iceLevel: IceLevel = IceLevel.NORMAL

    fun addPearls(): AdvancedBeverageBuilder {
        hasPearls = true
        return this
    }

    fun addCoconutJelly(): AdvancedBeverageBuilder {
        hasCoconutJelly = true
        return this
    }

    fun addRedBeans(): AdvancedBeverageBuilder {
        hasRedBeans = true
        return this
    }

    fun addGrassJelly(): AdvancedBeverageBuilder {
        hasGrassJelly = true
        return this
    }

    fun addPudding(): AdvancedBeverageBuilder {
        hasPudding = true
        return this
    }

    fun setSweetness(level: SweetnessLevel): AdvancedBeverageBuilder {
        sweetness = level
        return this
    }

    fun setIceLevel(level: IceLevel): AdvancedBeverageBuilder {
        iceLevel = level
        return this
    }

    fun build(): AdvancedBeverage {
        // Validation
        if (!hasPearls && !hasCoconutJelly && !hasRedBeans && !hasGrassJelly && !hasPudding) {
            throw IllegalArgumentException("At least one topping must be selected")
        }

        return AdvancedBeverage(
            hasPearls, hasCoconutJelly, hasRedBeans, hasGrassJelly, hasPudding,
            sweetness, iceLevel
        )
    }
}

enum class SweetnessLevel { NO_SUGAR, LESS, NORMAL, MORE, EXTRA }
enum class IceLevel { NO_ICE, LESS, NORMAL, MORE, EXTRA }

data class AdvancedBeverage(
    val hasPearls: Boolean,
    val hasCoconutJelly: Boolean,
    val hasRedBeans: Boolean,
    val hasGrassJelly: Boolean,
    val hasPudding: Boolean,
    val sweetness: SweetnessLevel,
    val iceLevel: IceLevel
) {
    fun getDescription(): String {
        val toppings = mutableListOf<String>()
        if (hasPearls) toppings.add("Pearls")
        if (hasCoconutJelly) toppings.add("Coconut Jelly")
        if (hasRedBeans) toppings.add("Red Beans")
        if (hasGrassJelly) toppings.add("Grass Jelly")
        if (hasPudding) toppings.add("Pudding")

        return "Beverage with: ${toppings.joinToString(", ")}, " +
               "Sweetness: ${sweetness.name}, Ice: ${iceLevel.name}"
    }
}
```

## Best Practices and Considerations

### 1. **Fluent Interface Design**

```kotlin
// Good: Fluent interface with method chaining
class FluentBuilder {
    private var property1 = ""
    private var property2 = 0

    fun setProperty1(value: String): FluentBuilder {
        property1 = value
        return this
    }

    fun setProperty2(value: Int): FluentBuilder {
        property2 = value
        return this
    }

    fun build(): Product {
        return Product(property1, property2)
    }
}

// Usage
val product = FluentBuilder()
    .setProperty1("value")
    .setProperty2(42)
    .build()
```

### 2. **Validation and Error Handling**

```kotlin
// Good: Validation in build method
class ValidatedBuilder {
    private var requiredField = ""
    private var optionalField = ""

    fun setRequiredField(value: String): ValidatedBuilder {
        requiredField = value
        return this
    }

    fun setOptionalField(value: String): ValidatedBuilder {
        optionalField = value
        return this
    }

    fun build(): Product {
        if (requiredField.isEmpty()) {
            throw IllegalStateException("Required field must be set")
        }
        return Product(requiredField, optionalField)
    }
}
```

### 3. **Immutable Products**

```kotlin
// Good: Immutable product with builder
data class ImmutableProduct(
    val name: String,
    val description: String,
    val price: Double,
    val tags: List<String>
) {
    class Builder {
        private var name = ""
        private var description = ""
        private var price = 0.0
        private var tags = mutableListOf<String>()

        fun name(value: String) = apply { name = value }
        fun description(value: String) = apply { description = value }
        fun price(value: Double) = apply { price = value }
        fun addTag(tag: String) = apply { tags.add(tag) }

        fun build() = ImmutableProduct(name, description, price, tags.toList())
    }
}
```

## Performance Considerations

| Approach                | Memory Usage | Performance | Readability | Maintainability |
| ----------------------- | ------------ | ----------- | ----------- | --------------- |
| Telescoping Constructor | Low          | High        | Low         | Low             |
| Builder Pattern         | Medium       | Medium      | High        | High            |
| Setter Methods          | Low          | High        | Medium      | Medium          |
| Factory Method          | Low          | High        | Medium      | Medium          |

## Related Design Patterns

- **Factory Method**: Creates objects without specifying exact classes
- **Abstract Factory**: Creates families of related objects
- **Prototype**: Creates new objects by cloning existing ones
- **Singleton**: Ensures only one instance exists

## Conclusion

The Builder Pattern provides a powerful way to construct complex objects step by step. Key benefits include:

- **Improved Readability**: Clear, fluent interface for object construction
- **Flexible Configuration**: Easy to handle optional parameters
- **Validation Support**: Built-in validation during construction
- **Maintainability**: Easy to add new construction steps

This pattern is essential for building complex objects with many optional parameters or when the construction process involves multiple steps.

## Related Articles

- [Design Pattern 7: Abstract Factory Pattern](/2024-07-08-design-pattern-7-abstract-factory-pattern/)
- [Design Pattern 9: Prototype Pattern](/2024-07-19-design-pattern-9-prototype-pattern/)
- [Design Pattern 10: Singleton Pattern](/2024-08-10-design-pattern-10-singleton-pattern/)
- [Object-Oriented Design Principles](/2024-07-03-design-pattern-2-design-principle/)
