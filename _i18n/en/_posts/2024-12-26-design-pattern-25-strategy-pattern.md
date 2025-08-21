---
layout: post
title: Design Pattern (25) Strategy Pattern: Dynamic Algorithm Switching, Building Highly Extensible E-commerce Shipping System
date: 2024-12-26 23:50:00 +0800
description: Complete analysis of Strategy Pattern core concepts and practical applications, through e-commerce shipping calculation system examples, learn how to implement dynamic algorithm switching, improving code extensibility and maintainability.
tags: [Strategy Pattern, Design Patterns, Behavioral Patterns, Algorithm Switching, E-commerce System, Software Architecture]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

---

## Requirements

Suppose we are developing an **e-commerce shipping calculation system**. As business grows, different delivery methods require different shipping calculation logic.

We need to meet the following core requirements:

1. **Support Multiple Shipping Calculation Methods**, including:
   - **Regular Shipping**: Fixed shipping rate model
   - **Express Shipping**: Weight-based billing model
   - **International Shipping**: Dual billing model based on region and weight

2. **System Extensibility Considerations**:
   - Need to easily add more shipping calculation methods in the future
   - Do not affect existing functionality stability

3. **Code Quality Requirements**:
   - Avoid using extensive if-else or switch-case statements
   - Keep code clean and maintainable

4. **Usage Convenience**:
   - Users should be able to switch between different shipping calculation methods instantly

---

## Object-Oriented Analysis (OOA)

Before diving into solutions, let's first perform object-oriented analysis. By analyzing existing architecture, we can more clearly understand where the problems lie.

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_1.png" title="design_pattern_strategy_pattern_uml_1" %}

### Recognizing Forces

When we adopt traditional programming approaches, we usually centralize all shipping calculation logic in one class. This approach seems simple but actually creates many problems:

1. **Maintenance Difficulties**
   - All shipping calculation logic is mixed in the main program
   - Modifying one calculation method easily affects other calculation logic accidentally
   - Code becomes lengthy and difficult to understand

2. **Violates Open-Closed Principle (OCP)**
   - Every time we add shipping calculation methods, we need to modify core business logic
   - Cannot extend functionality without modifying existing code

3. **Violates Single Responsibility Principle (SRP)**
   - One class simultaneously bears responsibilities for shipping calculation and core business logic
   - Scattered responsibilities lead to overly complex classes

---

## Applying Strategy Pattern (Solution) to Get New Context (Resulting Context)

After completing object-oriented analysis and recognizing existing architecture problems, we can use **Strategy Pattern** to solve these challenges.

The core idea of **Strategy Pattern** is to encapsulate different algorithms into independent strategy classes, allowing the system to dynamically select appropriate strategies at runtime. This design approach is similar to [State Pattern]({% post_url 2024-12-25-design-pattern-24-state-pattern %}), but Strategy Pattern focuses on algorithm replacement rather than state transitions.

### Standard Architecture of Strategy Pattern

First, let's understand the standard structure of Strategy Pattern:

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_2.png" title="design_pattern_strategy_pattern_uml_2" %}

### Three Core Components of Strategy Pattern

Strategy Pattern consists of three key components, each with clear responsibilities:

1. **Strategy (Strategy Interface)**  
   - Defines common behavioral specifications that all concrete strategies must implement
   - Ensures different strategies have the same interface for unified client invocation

2. **ConcreteStrategy (Concrete Strategy)**  
   - Implements behaviors defined in the strategy interface
   - Each concrete strategy encapsulates specific algorithm logic
   - Strategies are independent of each other and don't affect one another

3. **Context**  
   - Maintains reference to current strategy object
   - Provides strategy switching mechanisms
   - Delegates client requests to current strategy for execution

### Application to Shipping Calculation System

Next, let's apply Strategy Pattern to the shipping calculation system:

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_3.png" title="design_pattern_strategy_pattern_uml_3" %}

---

## Object-Oriented Design (OOP)

After understanding Strategy Pattern's theoretical architecture, let's implement the shipping calculation system through actual code. We'll build each component one by one and show how they work together.

### Step 1: Create Strategy Interface (Strategy Interface)

First define the common interface for all shipping calculation strategies:

```kotlin
interface ShippingStrategy {
    fun calculateShippingCost(weight: Double, region: String): Double
}
```

This interface specifies the method that all concrete strategies must implement, ensuring different strategies have unified invocation methods.

### Step 2: Implement Concrete Strategies (Concrete Strategies)

Next implement three different shipping calculation strategies:

```kotlin
class RegularShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        return 50.0 // Fixed shipping fee
    }
}

class ExpressShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        return weight * 10 // 10 dollars per kilogram
    }
}

class InternationalShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        val regionMultiplier = when (region) {
            "Asia" -> 15
            "Europe" -> 20
            "America" -> 25
            else -> 30
        }
        return weight * regionMultiplier
    }
}
```

Each concrete strategy encapsulates different shipping calculation logic, independent of each other and easy to maintain.

### Step 3: Create Context Class (Context)

The context class is responsible for maintaining the currently used strategy and providing strategy switching functionality:

```kotlin
class ShippingCalculator(private var strategy: ShippingStrategy) {

    fun setStrategy(strategy: ShippingStrategy) {
        this.strategy = strategy
    }

    fun calculateCost(weight: Double, region: String): Double {
        return strategy.calculateShippingCost(weight, region)
    }
}
```

`ShippingCalculator` delegates specific shipping calculation implementation to the current strategy, implementing flexible strategy switching mechanisms.

### Step 4: Client Usage Example (Client Usage)

Finally, let's see how clients use this system:

```kotlin
fun main() {
    val calculator = ShippingCalculator(RegularShipping())

    println("Regular shipping cost: ${calculator.calculateCost(5.0, "Asia")} dollars") // Fixed 50 dollars

    calculator.setStrategy(ExpressShipping())
    println("Express shipping cost: ${calculator.calculateCost(5.0, "Asia")} dollars") // 5.0 * 10 = 50 dollars

    calculator.setStrategy(InternationalShipping())
    println("International shipping cost (Asia): ${calculator.calculateCost(5.0, "Asia")} dollars") // 5.0 * 15 = 75 dollars
}
```

### Execution Results

```kotlin
Regular shipping cost: 50.0 dollars
Express shipping cost: 50.0 dollars
International shipping cost (Asia): 75.0 dollars
```

## Conclusion

Through implementing **Strategy Pattern**, we successfully solved challenges faced by the shipping calculation system. Let's review the specific advantages this solution brings:

### Core Advantage Analysis

1. **Significantly Improved Extensibility**
   - When adding new shipping calculation methods, only need to implement new strategy classes
   - Completely no need to modify existing code, reducing risk of introducing errors
   - Complies with "open for extension, closed for modification" design philosophy

2. **Low Coupling, High Cohesion**
   - Shipping calculation logic is completely separated from core business logic
   - Each strategy class focuses on single shipping calculation logic
   - System components have clear responsibilities and don't interfere with each other

3. **Follows Important Design Principles**
   - **Single Responsibility Principle (SRP)**: Each strategy class only handles one shipping calculation method
   - **Open-Closed Principle (OCP)**: Can add functionality without modifying existing code
   - **Dependency Inversion Principle (DIP)**: High-level modules don't depend on low-level module concrete implementations

### Practical Application Scenarios

Strategy Pattern is particularly suitable for scenarios requiring different behaviors based on different conditions, common applications include:

- **E-commerce Systems**: Different discount strategies (full amount discounts, member benefits, seasonal promotions)
- **Algorithm Selection**: Different sorting algorithms (quicksort, merge sort, heap sort)
- **Financial Systems**: Various tax calculation methods, interest calculation strategies
- **Game Development**: Different character movement modes, attack methods

### Summary

**Strategy Pattern** allows systems to maintain stability while having high flexibility by encapsulating algorithm families.

This not only solves current technical challenges but also lays good foundation for future requirement changes. When business logic becomes complex, Strategy Pattern provides elegant, maintainable solutions.

In the behavioral design pattern learning path, Strategy Pattern complements [Observer Pattern]({% post_url 2024-12-24-design-pattern-23-observer-pattern %}), [Template Method Pattern]({% post_url 2024-12-28-design-pattern-26-template-method-pattern %}) and other patterns, collectively building a rich software design toolkit. Mastering Strategy Pattern will significantly enhance your ability to handle complex business logic.