---
layout: post
title: "Design Pattern (9) Prototype Pattern Complete Tutorial - Object Cloning and Performance Optimization"
date: 2024-07-21 23:00:00 +0800
description: "Learn how Prototype Pattern solves performance issues through object cloning. Deep dive into shallow and deep copy concepts, Cloneable interface implementation, and best practices through game character creation system examples. Includes UML design and example code."
tags: [Prototype Pattern, Design Pattern, Creational Pattern, Object Cloning, Performance Optimization, Deep Copy, Shallow Copy, Software Architecture]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Preface

In our journey through Creational Design Patterns, we've explored Factory Method, Abstract Factory, Builder, and other patterns. Today we'll introduce the Prototype Pattern, which primarily solves object copying problems.

This pattern reminds me of a music light show editing app I developed in the past. At that time, I hadn't learned about design patterns yet, so I didn't use patterns to handle related functionality. Looking back now, I realize that functional scenario was very suitable for applying the Prototype Pattern.

This is an app for editing music light shows. Interested readers can download it and try it out 🙂

- [Asante TapTap 3](https://apps.apple.com/tw/app/asante-taptap-3/id1581054107?platform=iphone)

{% include figure.liquid path="assets/img/taptap_app_edit.png" title="taptap_app_edit" %}

## Requirements Background

During the development of the music light show app, I received feedback from clients. They indicated that after editing one light sequence, they still needed to edit six other similar light sequences, which was quite time-consuming.

Clients hoped to add Copy & Paste functionality, allowing them to quickly generate new sequences by copying already-edited light sequences and making minor adjustments, greatly saving editing time. The specific workflow is shown in the following diagrams:

{% include figure.liquid path="assets/img/taptap_app_copy.png" title="taptap_app_copy" %}

{% include figure.liquid path="assets/img/taptap_app_paste.png" title="taptap_app_paste" %}

## Initial Design Analysis (OOA)

After understanding the requirements, let's conduct object-oriented analysis to design a simple and intuitive solution.

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_1.png" title="design_pattern_prototype_pattern_uml_1" %}

In the most direct approach, when we need to copy `LightShowData`, we can use the same jsonObject data to recreate a new `LightShowData` instance. This approach seems simple, but it actually brings some problems.

## Problem Analysis (Forces)

Through initial analysis, we can discover the following key problems with the above simple design:

### Complexity Issues
If the `LightShowData` constructor becomes complex, requiring many parameters, then every copy would need to understand all internal implementation details. This violates the encapsulation principle and increases code coupling.

### Performance Issues
Suppose the constructor needs to perform complex calculations or data processing during instance creation (such as music beat analysis, lighting effect calculations, etc.). Then every time we create a new instance, we would repeat these time-consuming operations, seriously affecting program performance.

These problems drive us to seek a more elegant solution.

## Prototype Pattern Solution

After identifying the core problems, we can apply the Prototype Pattern to solve these challenges. The core idea of the Prototype Pattern is "create new objects by copying existing objects" rather than reconstructing them.

### Pattern Structure
Let's first look at the standard UML structure of the Prototype Pattern:

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_2.png" title="design_pattern_prototype_pattern_uml_2" %}

### Core Role Explanations

The Prototype Pattern mainly includes the following two key roles:

#### 1. Prototype (Prototype Interface)
This is an abstract interface or abstract class that defines the standard method for copying itself (usually the `clone()` method). The main purpose of this interface is to provide a unified copying specification, allowing clients to create object copies without needing to know the specific object class.

#### 2. Concrete Prototype
Concrete classes that implement the prototype interface. These classes must implement the `clone()` method, responsible for creating exact copies of themselves. During implementation, it's necessary to ensure that newly created objects are exactly the same in state as the original objects, but are completely independent entities in memory.

### Applying to Light Show Application

Now let's apply the Prototype Pattern to the LightShow App design:

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_3.png" title="design_pattern_prototype_pattern_uml_3" %}

By introducing the Prototype Pattern, we've redesigned the system architecture. `LightShowData` now implements the `LightShowDataPrototype` interface, providing the `clone()` method for efficient object copying. This design gives us a more flexible and efficient new architecture.

## Program Implementation (OOP)

After understanding the design structure, let's proceed with concrete code implementation. Let's gradually build a complete Prototype Pattern implementation:

[LightShowDataPrototype]

```kotlin
interface LightShowDataPrototype {
    val startIndex: Int
    val lightDataList: List<Int>
    fun clone(): LightShowDataPrototype
}
```

[LightShowData]

```kotlin
package prototypepattern.source

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

[main]

```kotlin
fun main() {
    val originalData = listOf(1, 2, 3, 4, 5)

    // Before using prototype pattern
    val originalLightShowData: LightShowDataPrototype = LightShowData(originalData)
    val newLightShowData: LightShowDataPrototype = LightShowData(originalData)

    println(originalLightShowData)
    println(newLightShowData)

    // After using prototype pattern
    val clonedLightShowData: LightShowDataPrototype = LightShowData(originalData)

    println(originalLightShowData)
    println(clonedLightShowData)
}
```

### Performance Advantage Analysis

Through the above implementation, we can clearly see the advantages of the Prototype Pattern. When using the `clone()` method for copying, we can avoid repeatedly executing time-consuming initialization logic:

```kotlin
originalDataList.subList(1, originalDataList.size).map { it * 2 }
```

This line of code represents complex light data processing logic. In the original design, every new object creation required recalculation. But through the Prototype Pattern, we only need to calculate once during the first creation, and subsequent copies can directly reuse the processed data, greatly improving program performance.

## Pattern Summary

The Prototype Pattern is the last important member of Creational Design Patterns. It solves performance problems in complex object creation through object copying, particularly suitable for:

- Scenarios where object creation costs are high
- Situations where complex constructor parameters need to be avoided
- Cases where similar objects need to be created

At this point, we've completed learning all Creational Design Patterns. The next phase will enter exploration of Structural Design Patterns, learning how to elegantly combine objects and classes to create more flexible system architectures.