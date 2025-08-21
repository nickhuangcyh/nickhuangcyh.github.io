---
layout: post
title: "Design Pattern (8) Builder Pattern Complete Tutorial - Step-by-Step Construction of Complex Objects"
date: 2024-07-09 23:00:00 +0800
description: "Learn how Builder Pattern solves complex object creation problems. Deep dive into designing step-by-step builders through beverage customization system examples, improving object initialization readability and flexibility. Includes UML design, implementation examples, and best practices."
tags: [Builder Pattern, Design Pattern, Creational Pattern, Complex Object Creation, Fluent Interface, Software Architecture, OOP, Step by Step Construction]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: From Factory to Customization

In the previous two articles, we explored the Factory Method Pattern and Abstract Factory Pattern, both of which focus on the problem of "what products to create." Today, we will face a new challenge: "how to create complex products."

## Requirements: The Customization Challenge of Bubble Tea

### Business Upgrade Requirements

Today we want to design an intelligent machine that can automatically make bubble tea. After market research, we found that if a bubble tea shop only sells basic black tea and green tea, it definitely cannot satisfy the diverse needs of modern consumers.

Modern customers pursue personalized experiences, and they hope to be able to:
- **Freely choose toppings**: Add different toppings based on personal preferences
- **Flexible combinations**: The same drink can contain multiple types of toppings
- **Personalized taste**: Create their own unique flavors

### Available Toppings List

We've decided to provide the following rich topping options to attract customers:

- **Pearls**: Classic chewy texture
- **Coconut Jelly**: Refreshing coconut flavor
- **Red Beans**: Traditional sweet taste
- **Grass Jelly**: Cool and refreshing taste
- **Pudding**: Rich creamy enjoyment

## Object-Oriented Analysis (OOA)

### Initial Design Attempt

After understanding the requirements, let's conduct object-oriented analysis. The intuitive approach is to add all possible topping properties to the beverage class:

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_1.png" title="design_pattern_builder_pattern_uml_1" %}

### Problems with the First Approach

This design brings serious problems: if we only want to add red beans and pudding today, we must pass `false` or `null` for other unused parameters.

**Problem Points**:
- **Lengthy Parameters**: As toppings increase, the parameter list becomes very long
- **Poor Readability**: Difficult to understand the meaning of each parameter
- **Maintenance Difficulties**: All calling locations need modification when adding toppings
- **High Error Rate**: Easy to pass wrong parameters or miss parameters

### Second Approach: Multiple Constructors

You might think of using multiple different constructors to solve this, so you don't need to pass unused parameters:

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_2.png" title="design_pattern_builder_pattern_uml_2" %}

## Recognizing Problems (Forces)

### The Dilemma of Multiple Constructor Approach

After deep analysis of the second approach, we discovered more serious problems:

**Combinatorial Explosion**: As the number of toppings increases, the number of required constructors grows exponentially. With 5 types of toppings, we theoretically need 2^5 = 32 different constructors to cover all combinations!

**Maintenance Nightmare**:
- Every time we add toppings, we need to significantly modify existing code
- Constructors can easily be confused, increasing the risk of usage errors
- The class becomes extremely large and difficult to understand

### Telescoping Constructor Anti-pattern

This phenomenon is called the **Telescoping Constructor** anti-pattern:

> **Definition**: When a class has multiple constructors with different numbers of parameters, leading to code that's difficult to maintain and use.

**Typical Characteristics**:
- Number of constructors grows exponentially with parameter combinations
- High code duplication
- Users easily choose wrong constructors
- Extremely high maintenance costs when adding parameters

We need a more elegant solution to handle this complex object construction requirement.

## Applying Builder Pattern (Solution)

### Pattern Introduction

After completing object-oriented analysis (OOA), recognizing problem points (Forces), and understanding the entire problem context (Context), we can apply the **Builder Pattern** to solve this complex object construction problem.

Let's first understand the standard structure of the Builder Pattern:

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_3.png" title="design_pattern_builder_pattern_uml_3" %}

### Core Roles of Builder Pattern

The Builder Pattern mainly includes the following five key roles:

#### 1. Product
The final result of complex objects. It may contain multiple components or parts, whose structure varies according to different builder implementations. Product is usually a class whose attributes represent different parts constructed by the Builder.

#### 2. Builder (Abstract Builder)
Defines the abstract interface for constructing complex objects. It declares methods for constructing various parts of the product, allowing creation of different concrete builders to produce different variants of the product.

#### 3. ConcreteBuilder (Concrete Builder)
Implements the Builder interface, providing concrete implementations for constructing each part of the product. Each ConcreteBuilder is tailored for specific product variants and is responsible for tracking the state of the product being constructed.

#### 4. Director
Responsible for managing the construction process of complex objects. It works with the Builder to provide high-level construction process control, but doesn't need to know the specific construction details of each part of the object.

#### 5. Client
The code that initiates the complex object construction process. It creates Builder objects and passes them to the Director, retrieving the final product from the Builder after construction is complete.

### Applying to Bubble Tea System

Let's apply the Builder Pattern to the bubble tea making system:

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_4.png" title="design_pattern_builder_pattern_uml_4" %}

Through this design, we get a completely new and elegant solution (Resulting Context) that can flexibly handle complex bubble tea construction requirements.

## Object-Oriented Programming (OOP)

### Implementing Builder Pattern

Now let's convert the Builder Pattern design into code implementation. Through step-by-step construction processes, we can elegantly handle the creation of complex beverages.

#### Product Interface Definition

First, define the abstract interface for beverages:

```kotlin
interface Beverage {
    var hasPearls: Boolean
    var hasCoconutJelly: Boolean
    var hasRedBeans: Boolean
    var hasGrassJelly: Boolean
    var hasPudding: Boolean
}
```

#### Concrete Product Classes

Next, implement concrete beverage products:

**Bubble Tea**:
```kotlin
data class BubbleTea(override var hasPearls: Boolean,
                     override var hasCoconutJelly: Boolean = false,
                     override var hasRedBeans: Boolean = false,
                     override var hasGrassJelly: Boolean = false,
                     override var hasPudding: Boolean = false
): Beverage {
}
```

**Grass Jelly Pudding Tea**:
```kotlin
data class GrassJellyPuddingTea(override var hasPearls: Boolean = false,
                     override var hasCoconutJelly: Boolean = false,
                     override var hasRedBeans: Boolean = false,
                     override var hasGrassJelly: Boolean,
                     override var hasPudding: Boolean
): Beverage {
}
```

#### Abstract Builder Interface

Define the common interface for builders:

```kotlin
interface Builder {
    fun addPearls(): Builder
    fun addPudding(): Builder
    fun addGrassJelly(): Builder

    fun build(): Beverage
}
```

#### Concrete Builder Implementations

**Bubble Tea Builder**:
```kotlin
class BubbleTeaBuilder: Builder {
    private var bubbleTea = BubbleTea(false)

    override fun addPearls(): BubbleTeaBuilder {
        bubbleTea.hasPearls = true
        return this
    }

    override fun addPudding(): Builder {
        return this  // Bubble tea doesn't support pudding, return directly
    }

    override fun addGrassJelly(): Builder {
        return this  // Bubble tea doesn't support grass jelly, return directly
    }

    override fun build(): BubbleTea {
        return bubbleTea
    }
}
```

**Grass Jelly Pudding Tea Builder**:
```kotlin
class GrassJellyPuddingTeaBuilder: Builder {
    private var grassJellyPuddingTea = GrassJellyPuddingTea(
        false,
        hasCoconutJelly = false,
        hasRedBeans = false,
        hasGrassJelly = false,
        hasPudding = false
    )

    override fun addPearls(): Builder {
        return this  // Grass jelly pudding tea doesn't support pearls, return directly
    }

    override fun addGrassJelly(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasGrassJelly = true
        return this
    }

    override fun addPudding(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasPudding = true
        return this
    }

    override fun build(): GrassJellyPuddingTea {
        return grassJellyPuddingTea
    }
}
```

#### Director Class

Responsible for controlling the high-level logic of the construction process:

```kotlin
class BeverageMaker(val builder: Builder) {
    fun makeBubbleTea(): Beverage {
        return builder.addPearls().build()
    }

    fun makeGrassJellyPuddingTea(): Beverage {
        return builder.addGrassJelly().addPudding().build()
    }
}
```

#### Client Usage Example

Finally, the actual usage code:

```kotlin
fun main() {
    // Make bubble tea
    val bubbleTeaBuilder = BubbleTeaBuilder()
    val bubbleTeaBeverageMaker = BeverageMaker(bubbleTeaBuilder)
    val bubbleTea = bubbleTeaBeverageMaker.makeBubbleTea()
    println(bubbleTea)

    // Make grass jelly pudding tea
    val grassJellyPuddingTeaBuilder = GrassJellyPuddingTeaBuilder()
    val grassJellyPuddingTeaBeverageMaker = BeverageMaker(grassJellyPuddingTeaBuilder)
    val grassJellyPuddingTea = grassJellyPuddingTeaBeverageMaker.makeGrassJellyPuddingTea()
    println(grassJellyPuddingTea)
}
```

### Pattern Advantages Demonstrated

Through the Builder Pattern, we successfully solved the problem of complex object construction:

**Fluent Construction Process**: Able to clearly make bubble tea step by step, with each step's intention very clear.

**Avoiding Telescoping Constructor**: No longer need huge parameter lists or numerous constructors.

**Flexibility**: Can easily support new beverage types and topping combinations.

**Readability**: Code intention is clear, easy to understand and maintain.

## Builder Pattern Application Scenarios

### Applicable Timing Judgment

The Builder Pattern is particularly useful in the following situations:

**Complex Object Construction**: When objects contain multiple optional properties, and these property combinations are very complex.

**Step-by-Step Construction Requirements**: When object construction processes require multiple steps, and these steps have specific orders or logic.

**Avoiding Telescoping Constructor**: When constructor parameters are too many, leading to code that's difficult to maintain and understand.

**Different Representation Requirements**: When the same construction process needs to create objects with different representations.

### Real-World Examples

**SQL Query Builder**:
```kotlin
val query = QueryBuilder()
    .select("name", "email")
    .from("users")
    .where("age > 18")
    .orderBy("name")
    .build()
```

**HTTP Request Builder**:
```kotlin
val request = HttpRequestBuilder()
    .url("https://api.example.com/users")
    .method(GET)
    .header("Authorization", "Bearer token")
    .timeout(30000)
    .build()
```

## Evolution of Creational Patterns

### Progression from Simple to Complex

Through this series of learning, we've seen the evolution of creational patterns:

1. **Simple Factory Pattern**: Solves basic object creation problems
2. **Factory Method Pattern**: Increases extensibility, supports different product types
3. **Abstract Factory Pattern**: Handles product family creation, supports two-dimensional relationships
4. **Builder Pattern**: Focuses on step-by-step construction processes of complex objects

Each pattern targets specific problem scenarios, and choosing the appropriate pattern is an important skill in software design.

## Summary

### Pattern Value

The Builder Pattern provides us with an elegant way to handle complex object construction problems. It separates construction logic from representation, making code clearer and more flexible.

### Key Benefits

- **Solves Telescoping Constructor**: Avoids problems with overly long parameter lists
- **Improves Readability**: Construction process is clear and easy to understand
- **Enhances Flexibility**: Easy to support new product variants
- **Separates Concerns**: Construction logic is separated from product representation

### Design Principles Embodied

The Builder Pattern embodies multiple important design principles:

- **Single Responsibility Principle**: Each builder is only responsible for specific type of product construction
- **Open Closed Principle**: Open to extension, easy to add new builders
- **Program to Interfaces**: Depend on abstract builder interfaces rather than concrete implementations
- **Encapsulate What Varies**: Encapsulate changing construction logic in different builders

### Relationship with Other Creational Patterns

- **vs Abstract Factory**: Builder focuses on "how to construct," Abstract Factory focuses on "what to construct"
- **vs Factory Method**: Builder supports step-by-step construction, Factory Method typically creates at once
- **Complementarity**: Can be used together, for example using Factory Method to create builder instances

### Future Outlook

Learning design patterns is an important part of improving software design capabilities. Mastering these patterns can not only solve specific technical problems but also cultivate good design thinking, laying a solid foundation for developing complex software systems.

**Note:** If you have any suggestions, questions, or different ideas, feel free to leave a comment or send me an email. We can discuss and learn together
{: .notice--success}