---
layout: post
title: "Design Pattern 9: Prototype Pattern - Efficient Object Cloning for Resource Management and Performance Optimization"
date: 2024-07-21 23:00:00 +0800
description: "Master the Prototype Pattern to create object copies efficiently. Learn how to implement cloning mechanisms for complex objects, reduce resource overhead, and improve application performance with practical examples."
tags:
  [
    Prototype Pattern,
    Design Patterns,
    Object Cloning,
    Performance Optimization,
    Resource Management,
    Software Architecture,
    Kotlin,
    Java,
    Swift,
    Deep Copy,
    Shallow Copy,
  ]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Performance]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Power of Object Cloning

The Prototype Pattern is a creational design pattern that allows you to create new objects by cloning existing ones, avoiding the overhead of creating objects from scratch. This pattern is particularly useful when object creation is expensive or when you need to create objects with similar initial states.

## Real-World Applications

The Prototype Pattern is widely used in:

- **Graphics Applications**: Cloning shapes, sprites, and UI elements
- **Game Development**: Creating multiple instances of game objects
- **Document Editors**: Copying and pasting complex objects
- **Configuration Management**: Creating variations of configuration objects
- **Database Operations**: Cloning data transfer objects (DTOs)

## Case Study: Music Light Show App

This pattern reminds me of a music light show editing app I developed. The app allows users to create complex light sequences, and users often need to copy and paste light patterns to save time.

- [Asante TapTap 3](https://apps.apple.com/tw/app/asante-taptap-3/id1581054107?platform=iphone)

{% include figure.liquid path="assets/img/taptap_app_edit.png" title="Light show editing interface" %}

## Problem Statement: Copy & Paste Functionality

Users requested a copy & paste feature to avoid recreating similar light patterns from scratch:

{% include figure.liquid path="assets/img/taptap_app_copy.png" title="Copy functionality in light show app" %}

{% include figure.liquid path="assets/img/taptap_app_paste.png" title="Paste functionality in light show app" %}

## Object-Oriented Analysis (OOA)

Let's analyze the requirements and design our initial solution:

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_1.png" title="Initial design without Prototype Pattern" %}

When we need to copy `LightShowData`, we can simply create a new instance with the same JSON data.

## Identifying Design Forces

Without the Prototype Pattern, we encounter several challenges:

1. **Complex Constructors**: If constructors have many parameters, creating new instances requires detailed knowledge
2. **Performance Overhead**: If object creation involves expensive computations, recreating objects becomes inefficient
3. **State Management**: Ensuring copied objects have the same state as originals can be complex
4. **Memory Usage**: Creating objects from scratch may involve unnecessary resource allocation

## Applying Prototype Pattern Solution

The Prototype Pattern provides an elegant solution by allowing objects to clone themselves.

### Prototype Pattern UML Structure

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_2.png" title="Prototype Pattern UML diagram" %}

**Key Components:**

- **Prototype**: Abstract interface defining the clone method
- **Concrete Prototype**: Implements the clone method to create exact copies

### Applied to Light Show App

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_3.png" title="Light show app with Prototype Pattern" %}

## Implementation: Object-Oriented Programming (OOP)

### Prototype Interface

```kotlin
interface LightShowDataPrototype {
    val startIndex: Int
    val lightDataList: List<Int>
    fun clone(): LightShowDataPrototype
}
```

### Concrete Prototype Implementation

```kotlin
class LightShowData: LightShowDataPrototype {
    override val startIndex: Int
    override val lightDataList: List<Int>

    constructor(originalDataList: List<Int>) {
        startIndex = originalDataList[0]
        lightDataList = originalDataList.subList(1, originalDataList.size).map { it * 2 }
    }

    constructor(startIndex: Int, lightDataList: List<Int>) {
        this.startIndex = startIndex
        this.lightDataList = lightDataList
    }

    override fun clone(): LightShowDataPrototype {
        return LightShowData(startIndex, lightDataList.toList())
    }
}
```

### Client Usage

```kotlin
fun main() {
    val originalData = listOf(1, 2, 3, 4, 5)

    // Before using prototype pattern - expensive recreation
    val originalLightShowData: LightShowDataPrototype = LightShowData(originalData)
    val newLightShowData: LightShowDataPrototype = LightShowData(originalData)

    println("Original: $originalLightShowData")
    println("New (expensive): $newLightShowData")

    // After using prototype pattern - efficient cloning
    val clonedLightShowData: LightShowDataPrototype = originalLightShowData.clone()

    println("Original: $originalLightShowData")
    println("Cloned (efficient): $clonedLightShowData")
}
```

By using the `clone()` method, we avoid repeating the expensive computation:

```kotlin
originalDataList.subList(1, originalDataList.size).map { it * 2 }
```

## Advanced Implementation: Deep vs Shallow Copy

### Shallow Copy Implementation

```kotlin
class UserProfile: Cloneable {
    var name: String = ""
    var email: String = ""
    var preferences: MutableList<String> = mutableListOf()

    public override fun clone(): UserProfile {
        return super.clone() as UserProfile
    }
}
```

### Deep Copy Implementation

```kotlin
class UserProfile: Cloneable {
    var name: String = ""
    var email: String = ""
    var preferences: MutableList<String> = mutableListOf()

    public override fun clone(): UserProfile {
        val cloned = super.clone() as UserProfile
        cloned.preferences = preferences.toMutableList() // Deep copy of list
        return cloned
    }
}
```

## Real-World Example: Graphics System

```kotlin
abstract class Shape: Cloneable {
    var color: String = "black"
    var x: Int = 0
    var y: Int = 0

    abstract fun draw()

    public override fun clone(): Shape {
        return super.clone() as Shape
    }
}

class Circle: Shape() {
    var radius: Int = 10

    override fun draw() {
        println("Drawing circle at ($x, $y) with radius $radius and color $color")
    }

    override fun clone(): Circle {
        val cloned = super.clone() as Circle
        cloned.radius = this.radius
        return cloned
    }
}

class Rectangle: Shape() {
    var width: Int = 20
    var height: Int = 15

    override fun draw() {
        println("Drawing rectangle at ($x, $y) with size ${width}x${height} and color $color")
    }

    override fun clone(): Rectangle {
        val cloned = super.clone() as Rectangle
        cloned.width = this.width
        cloned.height = this.height
        return cloned
    }
}
```

## Best Practices and Considerations

### 1. **Clone Method Implementation**

```kotlin
// Good: Proper clone implementation
class ComplexObject: Cloneable {
    private var data: MutableList<String> = mutableListOf()
    private var metadata: Map<String, Any> = mapOf()

    public override fun clone(): ComplexObject {
        val cloned = super.clone() as ComplexObject
        cloned.data = data.toMutableList() // Deep copy
        cloned.metadata = metadata.toMap() // Deep copy
        return cloned
    }
}

// Avoid: Incomplete cloning
class BadClone: Cloneable {
    private var data: MutableList<String> = mutableListOf()

    public override fun clone(): BadClone {
        return super.clone() as BadClone // Shallow copy of mutable list!
    }
}
```

### 2. **Prototype Registry**

```kotlin
class PrototypeRegistry {
    private val prototypes = mutableMapOf<String, Cloneable>()

    fun addPrototype(name: String, prototype: Cloneable) {
        prototypes[name] = prototype
    }

    fun getClone(name: String): Cloneable? {
        return prototypes[name]?.let { it.clone() }
    }
}

// Usage
val registry = PrototypeRegistry()
registry.addPrototype("default-user", UserProfile())
val newUser = registry.getClone("default-user") as UserProfile
```

### 3. **Performance Optimization**

```kotlin
class ExpensiveObject: Cloneable {
    private var computedValue: String? = null

    private fun computeExpensiveValue(): String {
        // Expensive computation
        return "computed result"
    }

    fun getValue(): String {
        if (computedValue == null) {
            computedValue = computeExpensiveValue()
        }
        return computedValue!!
    }

    public override fun clone(): ExpensiveObject {
        val cloned = super.clone() as ExpensiveObject
        cloned.computedValue = this.computedValue // Preserve computed value
        return cloned
    }
}
```

## Performance Comparison

| Approach        | Memory Usage | Performance | Complexity |
| --------------- | ------------ | ----------- | ---------- |
| New Constructor | High         | Low         | High       |
| Prototype Clone | Low          | High        | Low        |
| Factory Method  | Medium       | Medium      | Medium     |

## Related Design Patterns

- **Factory Method**: Creates objects without specifying exact classes
- **Abstract Factory**: Creates families of related objects
- **Builder**: Constructs complex objects step by step
- **Singleton**: Ensures only one instance exists

## Conclusion

The Prototype Pattern provides an efficient way to create object copies while avoiding the overhead of object creation from scratch. Key benefits include:

- **Performance Improvement**: Avoids expensive object creation processes
- **Simplified Object Creation**: Reduces complexity of object instantiation
- **State Preservation**: Ensures copied objects maintain the same state
- **Memory Efficiency**: Reduces resource allocation overhead

This pattern is particularly valuable in scenarios where object creation is expensive or when you need to create multiple similar objects efficiently.

## Related Articles

- [Design Pattern 8: Builder Pattern](/2024-07-09-design-pattern-8-builder-pattern/)
- [Design Pattern 10: Singleton Pattern](/2024-08-10-design-pattern-10-singleton-pattern/)
- [Design Pattern 7: Abstract Factory Pattern](/2024-07-08-design-pattern-7-abstract-factory-pattern/)
- [Object-Oriented Design Principles](/2024-07-03-design-pattern-2-design-principle/)
