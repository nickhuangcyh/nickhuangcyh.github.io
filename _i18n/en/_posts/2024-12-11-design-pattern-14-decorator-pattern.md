---
layout: post
title: "Design Pattern (14) Decorator Pattern: Dynamic Feature Extension and Composition Design Guide"
date: 2024-12-11 23:30:00 +0800
description: "Deep dive into Decorator Pattern implementation techniques, learn how to dynamically extend functionality through object wrapping techniques, master compositional feature enhancement and flexible system design methods in structural design patterns."
tags: [Design Patterns, Decorator Pattern, Structural Patterns, Dynamic Enhancement, Software Architecture, OOP, Kotlin, Java, Flexible Design]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

After learning the [Adapter Pattern](/en/blog/2024/design-pattern-11-adapter-pattern/), [Bridge Pattern](/en/blog/2024/design-pattern-12-bridge-pattern/), and [Composite Pattern](/en/blog/2024/design-pattern-13-composite-pattern/), we have mastered several important concepts of structural patterns. Now let's explore a pattern that can **dynamically extend object functionality**: the Decorator Pattern.

## Requirements

We need to develop a flexible POS system for a boutique **coffee shop**. The challenge of this system lies in handling various combinations of coffee and add-ons.

### Core Requirements:

- **Base Coffee Types**: The system supports multiple base coffees (Espresso, House Blend, etc.)
- **Add-on Options**: Each coffee can have multiple add-ons (milk, chocolate syrup, whipped cream, etc.)
- **Unlimited Combinations**: Customers can combine different add-ons without restrictions

### Technical Requirements:

- **Dynamic Composition**: The system must support dynamically combining different add-ons at runtime
- **Price Calculation**: Accurately calculate total prices for all combinations
- **Order Description**: Provide clear order content descriptions

### Design Challenges:

- **Combinatorial Explosion**: If we create a class for every combination, the number of classes will grow exponentially
- **Extensibility**: It should be easy to add new base coffees or add-ons in the future
- **Flexibility**: Customers should be able to freely combine without restrictions

## Object-Oriented Analysis (OOA)

Before diving into the design, let's first conduct object-oriented analysis to identify the core elements in the coffee ordering system:

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_1.png" title="design_pattern_decorator_pattern_uml_1" %}

## Identifying Forces

When dealing with **dynamic composition** requirements like the coffee ordering system, without using appropriate design patterns, we face the following serious challenges:

### 1. Combinatorial Explosion Crisis

**Problem Scale**:

- 2 base coffees × 3 add-ons = at least 8 classes needed (no add-ons + single add-ons + double add-ons + triple add-ons)
- If expanded to 5 base coffees and 5 add-ons, combinations can reach 2^5 × 5 = 160 types

**Concrete Impact**:

- Number of classes grows exponentially, making the codebase difficult to manage
- Each new add-on requires creating new classes for all existing combinations

### 2. Static Structure Limitations

**Problem Description**:

- All possible combinations must be determined at compile time
- Cannot dynamically add or remove add-ons at runtime
- Cannot support special requirements like "double whipped cream" or "triple chocolate syrup"

**Concrete Impact**:

- Customer personalization needs are difficult to satisfy
- System's business value is limited

### 3. High Coupling & Low Reusability

**Problem Description**:

- Various combination classes lack common abstraction
- Same add-on logic is repeatedly implemented in different combinations
- When modifying an add-on's price, updates are needed in multiple places

**Concrete Impact**:

- High maintenance cost and error-prone
- Slow new feature development

### 4. Poor Extensibility

**Problem Description**:

- When adding new base coffee types, corresponding classes need to be created for each add-on combination
- When adding new add-on types, corresponding classes need to be created for each existing combination
- Any addition in later system development may become a massive project

**Concrete Impact**:

- Slow product iteration, declining competitiveness
- Development team productivity severely affected

## Applying Decorator Pattern (Solution) to Achieve New Context (Resulting Context)

Facing the challenge of dynamic composition, the **Decorator Pattern** provides us with a powerful and elegant solution.

### Core Concept of Decorator Pattern

The essence of the Decorator Pattern lies in **"dynamically extending object functionality through wrapping"**. Its core philosophy is:

- **Wrapper Inheritance**: Decorators and decorated objects implement the same interface, making them interchangeable
- **Incremental Enhancement**: Each decorator adds new functionality without modifying the original object
- **Recursive Composition**: Multiple decorators can be nested and combined, forming chain structures

### Real-Life Analogy

Imagine decorating a Christmas tree:

1. **Base Tree**: This is our base coffee (Espresso)
2. **Add Lights**: First layer of decoration (adding milk)
3. **Add Ribbons**: Second layer of decoration (adding chocolate syrup)
4. **Add Ornaments**: Third layer of decoration (adding whipped cream)

Each layer of decoration preserves the original beauty while adding new elements.

### UML Structure of Decorator Pattern

Let's first understand the standard structure of the Decorator Pattern:

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_2.png" title="design_pattern_decorator_pattern_uml_2" %}

### Four Core Roles of Decorator Pattern:

**1. Component (Component Interface)**

- Defines common interface for basic components and decorators
- Ensures decorators and decorated objects can be interchangeable
- In our example, this is the `Beverage` interface

**2. ConcreteComponent (Concrete Component)**

- Concrete classes that implement basic functionality
- This is the starting point of the decoration chain, providing the most basic functionality
- In our example: `Espresso` and `HouseBlend`

**3. Decorator (Decorator Base Class)**

- Maintains reference to Component, implements common logic for decoration behavior
- Provides unified basic structure for all concrete decorators
- In our example: `CondimentDecorator`

**4. ConcreteDecorator (Concrete Decorator)**

- Implements specific decoration functionality, adding new behavior or state
- Can add additional logic before or after calling the decorated object
- In our example: `Milk`, `ChocolateSyrup`, `WhippedCream`

### Applying to Our Coffee System

Now let's apply the Decorator Pattern to the coffee ordering system:

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_3.png" title="design_pattern_decorator_pattern_uml_3" %}

## Object-Oriented Programming (OOP)

Now let's implement this Decorator Pattern design using Kotlin. We'll gradually build each component of the coffee ordering system:

### 1. Component - Beverage Interface

First define the component interface, providing a unified operation interface for all coffee products:

```kotlin
interface Beverage {
    val description: String
    fun cost(): Double
}
```

### 2. ConcreteComponent - Base Coffee Types

Next implement concrete base coffee classes:

```kotlin
class Espresso : Beverage {
    override val description = "Espresso"
    override fun cost() = 1.99
}

class HouseBlend : Beverage {
    override val description = "House Blend Coffee"
    override fun cost() = 0.89
}
```

### 3. Decorator - CondimentDecorator Base Class

Define the abstract base class for decorators, providing unified structure for all add-ons:

```kotlin
abstract class CondimentDecorator(protected val beverage: Beverage) : Beverage() {
    override abstract val description: String
}
```

### 4. ConcreteDecorator - Specific Add-ons

Implement various concrete add-on decorators:

```kotlin
class Milk(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Milk"
    override fun cost() = beverage.cost() + 0.3
}

class ChocolateSyrup(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Chocolate Syrup"
    override fun cost() = beverage.cost() + 0.5
}

class WhippedCream(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Whipped Cream"
    override fun cost() = beverage.cost() + 0.4
}
```

### Client Usage Example

Now let's see how the Decorator Pattern allows customers to flexibly combine different coffees:

```kotlin
fun main() {
    // Make an Espresso
    val espresso = Espresso()
    println("${espresso.description}: $${espresso.cost()}")

    // Make an Espresso with Milk, Chocolate Syrup and Whipped Cream
    val customBeverage = WhippedCream(
        ChocolateSyrup(
            Milk(Espresso())
        )
    )
    println("${customBeverage.description}: $${customBeverage.cost()}")

    // Make an HouseBlend with Milk and double Whipped Cream
    val layeredBeverage = WhippedCream(
        WhippedCream(
            Milk(HouseBlend())
        )
    )
    println("${layeredBeverage.description}: $${layeredBeverage.cost()}")
}
```

[Output]

```bash
Espresso: $1.99
Espresso, Milk, Chocolate Syrup, Whipped Cream: $3.19
House Blend, Milk, Whipped Cream, Whipped Cream: $2.49
```

## Execution Results and Analysis

When we execute the above code, we get the following output:

```
Espresso: $1.99
Espresso, Milk, Chocolate Syrup, Whipped Cream: $3.19
House Blend, Milk, Whipped Cream, Whipped Cream: $2.49
```

This result perfectly demonstrates the power of the Decorator Pattern:

- **First line**: Pure base Espresso
- **Second line**: Rich Espresso with multiple layers of decoration
- **Third line**: Even the same add-ons can be added repeatedly

## Conclusion

By applying the **Decorator Pattern**, we successfully solved all challenges of dynamic composition:

### Core Benefits Achieved:

**1. Incremental Feature Extension**

- Each decorator focuses only on its specific functionality with single, clear responsibility
- Adds new functionality through wrapping without modifying the original object
- Complies with the Open-Closed Principle

**2. Complete Solution to Combinatorial Explosion**

- Number of classes reduced from O(m^n) to O(m+n)
- 2 base coffees + 3 add-ons = only 5 classes needed
- Adding add-ons or base coffees only requires adding one class each

**3. Unlimited Flexibility**

- Supports arbitrary order and number of combinations
- Can dynamically combine different add-ons at runtime
- Supports nested combinations, meeting personalization needs

**4. Elegant Code Structure**

- High decoupling between decorators, can be developed and tested independently
- Same code structure makes it easy for newcomers to get started
- High readability and maintainability

### Practical Application Scenarios:

Decorator Pattern is particularly useful in:

- **Beverage Ordering Systems**: Like Starbucks, Noble Family add-on configurations
- **GUI Components**: Adding borders, scrollbars, shadows to buttons, text boxes
- **IO Stream Processing**: Like Java's BufferedReader, FileReader hierarchical wrapping
- **Middleware**: Adding logging, authentication, caching functionality to web requests

### Relationships with Other Patterns:

Decorator Pattern complements patterns we've learned before:

- **With Composite Pattern**: Both use recursive structures, but with different purposes (decoration vs structural organization)
- **With Adapter Pattern**: Both change object behavior, but in different ways (adaptation vs enhancement)
- **With Bridge Pattern**: Both focus on flexible design, but solve different problems

Through the Decorator Pattern, we learned how to elegantly handle dynamic feature extension. This design thinking provides a solid foundation for learning more complex design patterns later.

## Series Navigation

### Structural Design Pattern Series

- [Adapter Pattern](/en/blog/2024/design-pattern-11-adapter-pattern/) - Making incompatible interfaces work together
- [Bridge Pattern](/en/blog/2024/design-pattern-12-bridge-pattern/) - Separating abstraction from implementation, supporting independent evolution
- [Composite Pattern](/en/blog/2024/design-pattern-13-composite-pattern/) - Uniformly handling individual objects and object combinations
- [Facade Pattern](/en/blog/2024/design-pattern-15-facade-pattern/) - Providing unified interface to simplify complex subsystems
- [Flyweight Pattern](/en/blog/2024/design-pattern-16-flyweight-pattern/) - Efficiently managing memory usage of large numbers of similar objects
- [Proxy Pattern](/en/blog/2024/design-pattern-17-proxy-pattern/) - Controlling resource access through smart proxy objects

### Behavioral Design Pattern Series

- [Chain of Responsibility Pattern](/en/blog/2024/design-pattern-18-chain-of-responsibility-pattern/) - Building dynamic request handling chains
- [Command Pattern](/en/blog/2024/design-pattern-19-command-pattern/) - Encapsulating requests as objects to implement undo/redo

### Creational Design Pattern Basics

- [Singleton Pattern](/en/blog/2024/design-pattern-10-singleton-pattern/) - Ensuring a class has only one instance
- [Design Principles](/en/blog/2024/design-pattern-2-design-principle/) - Mastering SOLID principles and design foundations

Through the Decorator Pattern, we mastered core techniques for dynamic feature extension. In the next article on the Facade Pattern, we will explore how to simplify access to complex subsystems through unified interfaces.
