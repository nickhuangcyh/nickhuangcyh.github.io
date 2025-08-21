---
layout: post
title: "Design Patterns (1) Object-Oriented Programming Concepts Complete Guide: Core Principles of Encapsulation, Inheritance, Polymorphism, and Abstraction"
date: 2024-07-02 23:00:00 +0800
description: "Deep dive into the four core concepts of Object-Oriented Programming: encapsulation, inheritance, polymorphism, and abstraction. Build a solid technical foundation for learning Design Pattern series through practical examples and relatable analogies."
tags: [Object-Oriented Programming, OOP Concepts, Encapsulation, Inheritance, Polymorphism, Abstraction, Design Pattern, Software Development]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series source code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Object-Oriented Concepts

Before diving deep into design patterns, we need to establish a solid foundation. Object-oriented design has four core concepts that serve as the bedrock for understanding complex design patterns, much like the foundation of a building.

Let's master these essential concepts step by step through clear explanations and relatable analogies. Each concept is interconnected, and understanding them will help you better apply design patterns to solve real-world problems.

### Encapsulation

**Core Principle**: Hide the internal details of an object and only provide necessary interfaces for external use.

Encapsulation is the first important concept in object-oriented programming. It involves hiding the implementation details of properties and methods within a class, exposing only necessary methods to users. This protects internal properties and methods from arbitrary modification, ensuring object integrity and security.

**Encapsulation in Daily Life**:
> Imagine when you're driving a car, you only need to know that pressing the gas pedal makes the car accelerate and pressing the brake pedal makes it stop. You don't need to understand the internal combustion process of the engine, the gear mechanisms of the transmission, or the hydraulic principles of the brake system. These complex mechanical details are all "encapsulated" under the hood, making driving simple and intuitive.

**Significance in Programming**: Encapsulation makes code safer, more maintainable, and reduces the learning burden for users.

### Inheritance

**Core Principle**: Child classes can acquire characteristics from parent classes while adding their own unique functionality.

Inheritance is the second important concept in object-oriented programming. It allows child classes to inherit properties and methods from parent classes, achieving code reuse. Through inheritance, we can build hierarchical class structures and avoid writing duplicate code.

**Inheritance in Nature**:
> In biological taxonomy, we can clearly see the concept of inheritance. Dogs and cats are both animals, inheriting basic animal characteristics: ability to breathe, need for food, growth and reproduction. Similarly, roses and sunflowers are both plants, inheriting common plant characteristics: photosynthesis, need for sunlight and water, and root-stem-leaf structures.

**Advantages of Inheritance**: This hierarchical relationship allows us to extract common characteristics into parent classes while implementing specialized functionality in child classes, greatly improving code reusability and maintainability.

### Polymorphism

**Core Principle**: Use the same interface to operate different objects, making code more flexible and extensible.

Polymorphism is the third important concept in object-oriented programming. It provides a unified interface or abstract class for different classes, allowing us to operate different concrete objects in the same way. The power of polymorphism lies in the ability to add new object types without modifying existing code.

**Polymorphism in Daily Life**:
> Consider the act of charging a phone. Whether you're using an iPhone, Samsung Galaxy, or other brand phones, when you see the "charging" notification, you know all phones are performing the same function. Although each brand's charging mechanism may differ (wireless charging, fast charging technology, battery management), to users, the "charging" interface is unified.

Another example is remote controls from different brands:
> Although Sony, LG, and Samsung TV remote controls have different internal circuit designs, when you press the "Volume+" button, all TVs increase volume. This is an embodiment of polymorphism.

**Programming Flexibility**: Polymorphism allows us to write more flexible code that easily adapts to future requirement changes.

### Abstraction

**Core Principle**: Focus on essential characteristics of objects while ignoring unimportant details.

Abstraction is the fourth important concept in object-oriented programming. It hides complex implementation details through classes or interfaces, providing only necessary functionality to users. Abstraction helps us establish clearer, more understandable program architecture.

**Abstract Thinking in Daily Life**:
> When we say "mobile app," this term itself is a form of abstraction. Whether it's social media, games, or utility applications, they all appear the same way on the phone desktop: an icon and a name. We don't need to know what programming language each app was developed in or what algorithms were used; we just need to tap the icon to use it.

Another everyday example:
> When shopping for "fruit" at the supermarket, apples, bananas, and oranges are all categorized as fruit. This classification helps us quickly understand their common characteristics: high nutritional value, can be eaten directly, contain vitamins, etc., without worrying about each fruit's specific origin or cultivation methods.

**Relationship between Abstraction and Encapsulation**: Abstraction focuses on "what to do," while encapsulation focuses on "how to do it." They complement each other, together improving code readability and maintainability.

## Summary

**Interrelationship of the Four Concepts**

Now that we've mastered the four core concepts of object-oriented design, let's review their relationships:

- **Encapsulation**: Protects internal complexity of objects, providing clean external interfaces
- **Inheritance**: Establishes hierarchical relationships between classes, enabling code reuse
- **Polymorphism**: Allows different objects to be operated and used in a unified manner
- **Abstraction**: Focuses on important characteristics, hiding unnecessary implementation details

These four concepts are not independent but work together as an integrated whole. They collectively provide us with the foundation for creating modular, reusable, and easily maintainable code.

**Bridge to Design Principles**

Having mastered these fundamental concepts, we're ready to enter the next phase: the world of design principles. Design principles will teach us how to effectively apply these object-oriented concepts to solve more complex design problems.

In the upcoming series articles, we will explore these principles and understand how they help us achieve high-quality software design. Every design pattern is a concrete application of these fundamental concepts and principles.

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