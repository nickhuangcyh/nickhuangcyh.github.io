---
layout: post
title: "Design Pattern 3: Design Patterns Overview - Systematic Approach to Solving Common Software Design Problems"
date: 2024-07-04 23:00:00 +0800
description: "Master the systematic approach to applying design patterns. Learn the Context-Forces-Problem-Solution framework, pattern categories, and step-by-step methodology for solving software design challenges."
tags:
  [
    Design Patterns,
    Software Architecture,
    Object-Oriented Design,
    Problem Solving,
    Software Development,
    Design Methodology,
    Context-Forces-Problem-Solution,
    Creational Patterns,
    Structural Patterns,
    Behavioral Patterns,
  ]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Software Architecture]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Power of Proven Solutions

Design Patterns are standardized solutions to common problems in software engineering. They represent proven approaches that have been tested and refined over time, providing developers with reliable templates for solving recurring design challenges.

## Real-World Applications

Design patterns are fundamental to:

- **Software Architecture**: Building scalable, maintainable systems
- **Framework Development**: Creating reusable software components
- **API Design**: Designing clean, intuitive interfaces
- **Legacy System Maintenance**: Refactoring existing code
- **Team Collaboration**: Establishing common design vocabulary

## What Are Design Patterns?

Design Patterns are standardized methods used in software engineering to solve common problems. They are proven solutions that can be used to address specific design challenges.

## Core Components of Design Patterns

### Context

Context refers to the specific scenario or background where a design pattern is applied. It describes the environment and conditions under which the pattern is used.

### Forces

Forces are the various factors that need to be considered during the design process, including performance requirements, scalability, maintainability, and other constraints.

### Problem

Problem refers to the specific design challenge that developers face under particular Context and Forces.

### Solution

Solution is the design pattern that provides a proven approach to solve the Problem while considering the Forces.

## Systematic Application Methodology

The systematic approach to applying design patterns involves seven key steps:

### 1. Object-Oriented Analysis (OOA)

Start with a high-level understanding of application requirements and structure. This step requires creating UML diagrams to visualize the system.

### 2. Understand the Context

Use UML diagrams to understand the specific scenario where the pattern will be applied.

### 3. Identify Forces

Recognize the key factors that influence the design decisions.

### 4. Define the Problem

Clearly articulate the specific design challenge that needs to be solved.

### 5. Apply the Pattern

Select and implement the appropriate design pattern based on the Problem and Forces.

### 6. Achieve Resulting Context

After applying the pattern, obtain an improved design solution. This step requires creating new UML diagrams.

### 7. Object-Oriented Programming (OOP)

Begin writing code based on the new Resulting Context UML diagrams.

## Design Pattern Categories

Design patterns can be classified into three fundamental types:

### Creational Patterns

Patterns related to object instantiation and creation:

- **Factory Method Pattern**: Creates objects without specifying exact classes
- **Abstract Factory Pattern**: Creates families of related objects
- **Builder Pattern**: Constructs complex objects step by step
- **Prototype Pattern**: Creates new objects by cloning existing ones
- **Singleton Pattern**: Ensures only one instance exists

### Structural Patterns

Patterns that define how objects are composed to form larger structures:

- **Adapter Pattern**: Allows incompatible interfaces to work together
- **Bridge Pattern**: Separates abstraction from implementation
- **Decorator Pattern**: Adds responsibilities to objects dynamically
- **Facade Pattern**: Provides a simplified interface to a complex subsystem
- **Proxy Pattern**: Controls access to another object
- **Flyweight Pattern**: Reduces memory usage by sharing common parts
- **Composite Pattern**: Treats individual objects and compositions uniformly

### Behavioral Patterns

Patterns that define communication between objects:

- **Chain of Responsibility Pattern**: Passes requests along a chain of handlers
- **Mediator Pattern**: Reduces coupling between components
- **Iterator Pattern**: Accesses elements of a collection without exposing its structure
- **State Pattern**: Allows objects to alter behavior when internal state changes
- **Observer Pattern**: Defines a one-to-many dependency between objects
- **Command Pattern**: Encapsulates a request as an object
- **Strategy Pattern**: Defines a family of algorithms and makes them interchangeable
- **Template Method Pattern**: Defines the skeleton of an algorithm
- **Interpreter Pattern**: Provides a way to evaluate language grammar
- **Memento Pattern**: Captures and externalizes object state
- **Visitor Pattern**: Separates algorithms from objects

## Practical Example: Applying Design Patterns

### Scenario: E-commerce Payment System

**Context**: Building a payment processing system for an e-commerce platform that needs to support multiple payment methods.

**Forces**:

- Support for multiple payment gateways (PayPal, Stripe, etc.)
- Easy addition of new payment methods
- Consistent interface for all payment operations
- Maintainable and testable code

**Problem**: How to design a system that can handle different payment methods without tightly coupling the business logic to specific payment implementations?

**Solution**: Apply the Strategy Pattern to encapsulate different payment algorithms.

### Implementation Steps

#### Step 1: OOA - Initial Analysis

```kotlin
// Initial design without patterns
class PaymentProcessor {
    fun processPayment(amount: Double, paymentType: String): Boolean {
        return when (paymentType) {
            "paypal" -> processPayPalPayment(amount)
            "stripe" -> processStripePayment(amount)
            "credit_card" -> processCreditCardPayment(amount)
            else -> false
        }
    }

    private fun processPayPalPayment(amount: Double): Boolean {
        // PayPal specific logic
        return true
    }

    private fun processStripePayment(amount: Double): Boolean {
        // Stripe specific logic
        return true
    }

    private fun processCreditCardPayment(amount: Double): Boolean {
        // Credit card specific logic
        return true
    }
}
```

#### Step 2: Identify Forces

- Adding new payment methods requires modifying existing code
- Business logic is tightly coupled to payment implementations
- Testing individual payment methods is difficult
- Violates Open-Closed Principle

#### Step 3: Apply Strategy Pattern

```kotlin
// Strategy Pattern implementation
interface PaymentStrategy {
    fun processPayment(amount: Double): Boolean
    fun getPaymentType(): String
}

class PayPalStrategy : PaymentStrategy {
    override fun processPayment(amount: Double): Boolean {
        println("Processing $amount via PayPal")
        return true
    }

    override fun getPaymentType(): String = "PayPal"
}

class StripeStrategy : PaymentStrategy {
    override fun processPayment(amount: Double): Boolean {
        println("Processing $amount via Stripe")
        return true
    }

    override fun getPaymentType(): String = "Stripe"
}

class CreditCardStrategy : PaymentStrategy {
    override fun processPayment(amount: Double): Boolean {
        println("Processing $amount via Credit Card")
        return true
    }

    override fun getPaymentType(): String = "Credit Card"
}

class PaymentProcessor {
    private var strategy: PaymentStrategy? = null

    fun setPaymentStrategy(strategy: PaymentStrategy) {
        this.strategy = strategy
    }

    fun processPayment(amount: Double): Boolean {
        return strategy?.processPayment(amount) ?: false
    }
}
```

#### Step 4: Resulting Context

The new design provides:

- **Extensibility**: New payment methods can be added without modifying existing code
- **Maintainability**: Each payment strategy is isolated and easy to maintain
- **Testability**: Individual strategies can be tested independently
- **Flexibility**: Payment strategies can be changed at runtime

## Best Practices for Pattern Application

### 1. **Understand Before Applying**

- Don't force patterns where they're not needed
- Understand the problem thoroughly before selecting a pattern
- Consider the trade-offs of each pattern

### 2. **Start Simple**

- Begin with simple solutions
- Apply patterns only when complexity demands it
- Refactor existing code gradually

### 3. **Consider Context**

- Patterns work best in specific contexts
- Adapt patterns to your specific needs
- Don't be afraid to combine patterns

### 4. **Document Your Decisions**

- Document why you chose a specific pattern
- Explain the trade-offs and alternatives considered
- Keep documentation updated as the system evolves

## Common Anti-Patterns

### 1. **Pattern Overuse**

```kotlin
// Avoid: Using patterns unnecessarily
class SimpleCalculator {
    // Don't need Strategy Pattern for simple operations
    fun add(a: Int, b: Int): Int = a + b
    fun subtract(a: Int, b: Int): Int = a - b
}
```

### 2. **Ignoring Context**

```kotlin
// Avoid: Applying patterns without understanding context
class UserService {
    // Don't use Singleton if you need multiple instances for testing
    companion object {
        private var instance: UserService? = null

        fun getInstance(): UserService {
            if (instance == null) {
                instance = UserService()
            }
            return instance!!
        }
    }
}
```

### 3. **Complex Pattern Combinations**

```kotlin
// Avoid: Over-complicating with multiple patterns
class ComplexService {
    // Using Factory + Strategy + Observer + Decorator for simple functionality
    // This makes the code harder to understand and maintain
}
```

## Performance Considerations

| Pattern Category | Memory Usage | Performance | Complexity | Maintainability |
| ---------------- | ------------ | ----------- | ---------- | --------------- |
| Creational       | Medium       | Medium      | Low        | High            |
| Structural       | Medium       | Medium      | Medium     | High            |
| Behavioral       | Low          | High        | Medium     | High            |

## Related Design Patterns

- **Factory Method**: Often used with Strategy for object creation
- **Observer**: Commonly combined with Command for event handling
- **Decorator**: Frequently used with Component for dynamic behavior
- **Adapter**: Often used with Facade for interface compatibility

## Conclusion

Design patterns provide a systematic approach to solving common software design problems. By understanding the Context-Forces-Problem-Solution framework and following the step-by-step methodology, developers can create more maintainable, extensible, and robust software systems.

Key benefits of using design patterns include:

- **Proven Solutions**: Leverage tested and refined approaches
- **Common Vocabulary**: Establish shared understanding across teams
- **Maintainability**: Create code that's easier to modify and extend
- **Reusability**: Build components that can be reused across projects

In the upcoming articles, we'll focus on UML diagrams and their application. UML (Unified Modeling Language) is a standard graphical language used for planning and visualizing software system designs. We'll learn how to use UML diagrams to represent system structure and behavior, which will deepen our understanding of design pattern applications.

> Next: Deep Dive into UML Diagrams - The Visual Tool for Design Patterns

{% include figure.liquid path="assets/img/design_pattern_design_principle_architecture.png" title="Design pattern learning progression" %}

> Object-Oriented Concepts → Design Principles → Design Patterns

## Related Articles

- [Design Pattern 1: Object-Oriented Concepts](/2024-07-02-design-pattern-1-object-oriented-concepts/)
- [Design Pattern 2: Object-Oriented Design Principles](/2024-07-03-design-pattern-2-design-principle/)
- [Design Pattern 4: UML Diagrams](/2024-07-05-design-pattern-4-uml/)
- [Design Pattern 5: Simple Factory Pattern](/2024-07-06-design-pattern-5-simple-factory-pattern/)
