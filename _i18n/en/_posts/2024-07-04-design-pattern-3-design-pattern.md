---
layout: post
title: "Design Patterns (3) Core Design Pattern Concepts Complete Introduction: Four Elements and Classification System"
date: 2024-07-04 23:00:00 +0800
description: "Master the definition, purpose, and structured thinking of Design Patterns. Deep dive into the four elements of design patterns: Context, Forces, Problem, and Solution, plus a complete classification system for Creational, Structural, and Behavioral patterns."
tags: [Design Pattern, Software Design, Gang of Four, Creational Pattern, Structural Pattern, Behavioral Pattern, Software Architecture, Programming]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series source code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## What is a Design Pattern?

Design Pattern is a set of time-tested problem-solving solutions in software engineering. Imagine when architects design houses, they apply known architectural patterns to solve common structural problems. Similarly, design patterns are the "architectural blueprints" for software developers.

These patterns are not created from thin air, but are best practices repeatedly validated by countless developers in real projects. Each design pattern provides standardized solutions for specific design problems, so developers don't have to reinvent the wheel.

More importantly, design patterns provide a common language among developers. When you say "let's use the Observer Pattern to handle this problem," experienced developers immediately understand your design approach and implementation direction.

## Elements of Design Patterns

Every design pattern consists of four core elements that together describe the complete picture of the pattern. Understanding these elements helps us correctly identify and apply design patterns.

### Context

Context refers to the specific scenario or environmental background where the design pattern is applied. It answers the question "under what circumstances should this pattern be used?"

For example, when you need to ensure that a class has only one instance throughout the entire application, this is the typical Context for the Singleton Pattern.

### Forces

Forces refer to various factors and constraints that need to be balanced during the design process. These factors often conflict with each other, requiring finding the optimal balance point.

Common Forces include:
- **Performance requirements**: How fast should the system response be?
- **Scalability**: Will it need to easily add new features in the future?
- **Maintainability**: Is the code easy to understand and modify?
- **Memory usage**: Is there a need to conserve memory space?

### Problem

Problem refers to the specific design challenge developers face under particular Context and Forces constraints. It clearly describes the core problem that needs to be solved.

This problem usually manifests as a design dilemma: needing to satisfy functional requirements while considering various constraints.

### Solution

Solution is the concrete solution provided by the design pattern. It's not the implementation details of code, but a reusable design structure that explains the relationships and collaboration methods between classes.

A good Solution skillfully balances various Forces, providing a validated and elegant solution.

## Steps for Applying Design Patterns

Successfully applying design patterns requires following a structured process. This seven-step method ensures we can systematically analyze problems and choose the most suitable solutions.

### 1. Object-Oriented Analysis (OOA)
Analyze and understand application requirements and overall structure from a high level. This stage requires drawing UML diagrams to visualize the current state of the system, helping us grasp the global perspective.

### 2. Understand the Context
Through UML diagrams, deeply understand the specific scenario and environmental conditions where design patterns need to be applied. Clearly answer "what kind of situation are we facing now?"

### 3. Perceive Forces
Identify and analyze key factors that influence design decisions. These factors may include performance requirements, extensibility needs, maintenance difficulty, and other conflicting constraints.

### 4. Find the Problem
Under the constraints of specific Context and Forces, clearly define the core design problem that needs to be solved. The problem description should be specific and actionable.

### 5. Apply the Pattern
Based on the identified Problem and Forces, select the most suitable pattern from the design pattern library. This selection process requires weighing various trade-offs.

### 6. Get New Resulting Context
After applying the design pattern, re-analyze and review the improved design solution. Similarly, new UML diagrams need to be drawn to present the improved system architecture.

### 7. Object-Oriented Programming (OOP)
Based on the new Resulting Context UML diagrams, begin actual code writing and implementation work. Implementation at this time should follow the structure defined by UML diagrams.

## Classification of Design Patterns

Design patterns can be classified into three major categories based on the types of problems they primarily solve. Each category provides solutions for different aspects of software design.

### Creational Patterns

**Main Purpose**: Solve various problems in the object creation process, making object creation more flexible and controllable.

This category of patterns focuses on "how to create objects" rather than "what objects to create." They provide optimal ways to create objects while hiding the complexity of creation logic.

**Common Patterns**:
- **Factory Method Pattern**: Create objects through factory methods
- **Abstract Factory Pattern**: Create families of related objects
- **Builder Pattern**: Construct complex objects step by step
- **Prototype Pattern**: Create new objects by cloning existing objects
- **Singleton Pattern**: Ensure a class has only one instance

### Structural Patterns

**Main Purpose**: Solve composition problems between classes and objects, helping different components work together better.

This category of patterns focuses on how to combine classes and objects into larger, more complex structures while maintaining structural flexibility and efficiency.

**Common Patterns**:
- **Adapter Pattern**: Make incompatible interfaces work together
- **Bridge Pattern**: Separate abstraction from implementation
- **Decorator Pattern**: Dynamically add new functionality to objects
- **Facade Pattern**: Provide simplified interfaces for complex subsystems
- **Proxy Pattern**: Provide proxy or placeholder for other objects
- **Flyweight Pattern**: Efficiently support large numbers of fine-grained objects
- **Composite Pattern**: Compose objects into tree structures

### Behavioral Patterns

**Main Purpose**: Solve communication and collaboration problems between objects, defining interaction methods and responsibility allocation between objects.

This category of patterns focuses on algorithms and responsibility allocation between objects, describing not only object or class patterns but also communication patterns between them.

**Common Patterns**:
- **Chain of Responsibility Pattern**: Pass requests along a processing chain
- **Mediator Pattern**: Define how objects interact
- **Iterator Pattern**: Provide unified way to access collection elements
- **State Pattern**: Allow objects to change behavior when internal state changes
- **Observer Pattern**: Define one-to-many dependency relationships
- **Command Pattern**: Encapsulate requests as objects
- **Strategy Pattern**: Define algorithm families and make them interchangeable
- **Template Method Pattern**: Define algorithm skeleton
- **Interpreter Pattern**: Create interpreters for languages
- **Memento Pattern**: Save and restore object states
- **Visitor Pattern**: Define new operations without modifying classes

## Summary

Through this article, we have established a comprehensive understanding of design patterns. We learned that design patterns are not just code templates, but validated problem-solving frameworks.

### Key Takeaways

**Theoretical Foundation**: We mastered the four constituent elements of design patterns (Context, Forces, Problem, Solution), which help us systematically analyze and apply patterns.

**Practical Methods**: The seven-step application process provides a complete path from problem analysis to code implementation, ensuring we can correctly select and use design patterns.

**Classification System**: The three major categories (Creational, Structural, Behavioral) allow us to quickly locate suitable pattern types, improving problem-solving efficiency.

### Value of Design Patterns

The true value of design patterns lies in providing a common vocabulary and thinking framework. When team members all understand design patterns, communication becomes more efficient, and design decisions are easier to understand and maintain.

More importantly, design patterns teach us how to find balance points among conflicting requirements, which is the core challenge of software design.

### Next Steps in Learning

In the upcoming articles, we will dive deep into the application of UML diagrams. UML (Unified Modeling Language) is the standard tool for visualizing software design, helping us express and communicate design ideas more clearly.

Mastering UML diagram drawing and reading skills will enable us to apply design patterns more effectively and engage in more precise technical communication with other developers.

> Next: Deep Dive into UML Diagrams - Visual Tools for Design Patterns

{% include figure.liquid path="assets/img/design_pattern_design_principle_architecture.png" title="design_pattern_design_principle_architecture" %}

> Object-Oriented Concepts -> Design Principle -> Design Pattern

## References

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [大話設計模式](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [水球潘 - Design Pattern 之路](https://www.youtube.com/watch?v=yOe-uywb2qs&list=PLicQRHHL75d7EXEI9nWfUYJyrPdI79M70&pp=iAQB)

**Note:** If you have any suggestions, questions or different ideas, feel free to leave a comment or send me an email, we can discuss and grow together 🙂
{: .notice--success}