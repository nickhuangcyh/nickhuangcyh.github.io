---
layout: post
title: "Design Pattern (16) Flyweight Pattern: Memory Optimization and Performance Enhancement Guide"
date: 2024-12-14 15:00:00 +0800
description: "Deep dive into Flyweight Pattern implementation techniques, learn how to dramatically reduce memory usage through object sharing technology, master large-scale object management and performance optimization core concepts in structural design patterns."
tags: [Design Patterns, Flyweight Pattern, Structural Patterns, Memory Optimization, Performance, Software Architecture, OOP, Kotlin, Java]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Requirements

Suppose we are developing a forest scene rendering system. This system needs to display hundreds or even thousands of trees on screen, providing rich forest environments for games or visualization applications.

When designing this system, we discovered that each tree contains two different types of data:

1. **Intrinsic State**: Common data that doesn't change with the environment, such as tree species, color, texture, etc. This data is consistent among all trees of the same type.
2. **Extrinsic State**: Unique data that varies by environmental position, such as each tree's coordinates (x, y) on screen.

**Core Problem**: If we create complete objects for each tree, it will lead to excessive memory consumption. Imagine when we need to render 10,000 oak trees, each tree object stores the same species, color, and texture information.

Therefore, we need a way to share intrinsic state to optimize memory usage.

## Object-Oriented Analysis (OOA)

After understanding the requirements, let's quickly implement object-oriented analysis!

{% include figure.liquid path="assets/img/design_pattern_flyweight_pattern_uml_1.png" title="design_pattern_flyweight_pattern_uml_1" %}

## Identifying Forces

When analyzing design requirements in depth, we identified three main design challenges:

**1. Massive Duplicate Data Problem**
Each tree contains the same species, color, and texture data. This redundant storage causes unnecessary memory waste, especially when the forest has thousands of trees of the same type.

**2. Performance Bottleneck Problem**
For large scenes that need to render thousands of trees, too many object instances can lead to memory insufficiency or severe performance bottlenecks. The system may become slow or even crash due to memory pressure.

**3. Balance Between Sharing and Independence Problem**
We need to share common data while ensuring each tree can still maintain its independent position information. Finding this balance point is key to the design.

**Solution-Oriented**: Facing these challenges, the Flyweight Pattern provides an elegant solution that allows us to effectively share objects' intrinsic state.

## Applying Flyweight Pattern (Solution) to Achieve New Context (Resulting Context)

Now we have completed object-oriented analysis and clearly identified various constraints and challenges in the design. Next, let's apply the Flyweight Pattern to solve this memory optimization problem.

First, let's understand the general structure of the Flyweight Pattern:

{% include figure.liquid path="assets/img/design_pattern_flyweight_pattern_uml_2.png" title="design_pattern_flyweight_pattern_uml_2" %}

The Flyweight Pattern contains four core roles, each with specific responsibilities:

- **Flyweight (Flyweight Interface)**: Defines the common interface that all flyweight objects must implement, specifying operation methods for shared objects.
- **ConcreteFlyweight (Concrete Flyweight Class)**: Concrete class implementing the flyweight interface, responsible for storing and managing sharable intrinsic state.
- **FlyweightFactory (Flyweight Factory)**: Factory class responsible for creating and managing flyweight objects, ensuring objects with same characteristics are created only once and providing fast access mechanisms.
- **Client (Client)**: Code that uses flyweight objects, also responsible for managing and passing non-sharable extrinsic state.

**Applying to Our Forest Rendering System**

Now let's concretely apply this pattern concept to our tree rendering requirements:

{% include figure.liquid path="assets/img/design_pattern_flyweight_pattern_uml_3.png" title="design_pattern_flyweight_pattern_uml_3" %}

## Object-Oriented Programming (OOP)

**Step 1: Define Flyweight Objects and Context Objects**

We separate tree data into two classes: `TreeType` (flyweight object, stores shared intrinsic state) and `Tree` (context object, stores unique extrinsic state).

```kotlin
class Tree(
    private val x: Int,
    private val y: Int,
    private val type: TreeType
) {
    fun draw() {
        type.draw(x, y)
    }
}

class TreeType(
    val name: String,
    val color: String,
    val texture: String
) {
    fun draw(x: Int, y: Int) {
        println("Drawing tree: $name, color: $color, texture: $texture at ($x, $y)")
    }
}
```

**Step 2: Build Flyweight Factory**

`TreeFactory` is responsible for managing and reusing `TreeType` objects, ensuring tree types with same characteristics are created only once.

```kotlin
object TreeFactory {
    private val treeTypes = mutableMapOf<String, TreeType>()

    fun getTreeType(name: String, color: String, texture: String): TreeType {
        return treeTypes.computeIfAbsent(name) {
            println("Creating new TreeType: $name")
            TreeType(name, color, texture)
        }
    }
}
```

**Step 3: Implement Client Management Class**

`Forest` class serves as the client, responsible for managing all tree objects and coordinating the combination of intrinsic and extrinsic states.

```kotlin
class Forest {
    private val trees = mutableListOf<Tree>()

    fun plantTree(x: Int, y: Int, name: String, color: String, texture: String) {
        val treeType = TreeFactory.getTreeType(name, color, texture)
        val tree = Tree(x, y, treeType)
        trees.add(tree)
    }

    fun draw() {
        for (tree in trees) {
            tree.draw()
        }
    }
}
```

**Step 4: Testing and Validation**

Test our Flyweight Pattern implementation through the main function, observing the memory optimization effects.

```kotlin
fun main() {
    val forest = Forest()

    // Planting trees in the forest
    forest.plantTree(10, 20, "Oak", "Green", "Rough")
    forest.plantTree(15, 25, "Pine", "Dark Green", "Smooth")
    forest.plantTree(10, 20, "Oak", "Green", "Rough") // Reuses the same TreeType as the first Oak

    // Draw all trees
    forest.draw()
}
```

**Execution Results Analysis**

From the output results, we can clearly see the core benefits of the Flyweight Pattern:

```bash
Creating new TreeType: Oak
Creating new TreeType: Pine
Drawing tree: Oak, color: Green, texture: Rough at (10, 20)
Drawing tree: Pine, color: Dark Green, texture: Smooth at (15, 25)
Drawing tree: Oak, color: Green, texture: Rough at (10, 20)
```

## Conclusion

## Core Benefits of Flyweight Pattern

Through implementing the Flyweight Pattern, we successfully achieved the following key improvements:

**Memory Optimization**: Through sharing technology, dramatically reduced the system's memory usage. In our example, even when planting multiple trees of the same type, `TreeType` objects are created only once.

**Performance Enhancement**: Reduced object creation overhead, improving overall system performance, especially noticeable when handling large numbers of similar objects.

**Good Scalability**: Adding different tree types became simple, only requiring registration of new tree species in the factory.

## Applicable Scenarios and Considerations

The Flyweight Pattern is particularly suitable for the following application scenarios:
- **Text Editors**: Sharing character objects (text with same characters, fonts, sizes)
- **Game Development**: Large numbers of similar game objects in scenes (bullets, particle effects, NPCs)
- **Graphics Rendering**: Repeated graphic elements or materials

**Key Design Considerations**: When using the Flyweight Pattern, the most important thing is correctly distinguishing intrinsic state from extrinsic state. Intrinsic state must be safely sharable immutable data, while extrinsic state is unique information for each object instance. Only by clearly understanding this distinction can we ensure the correctness and flexibility of system design.

## Series Navigation

### Structural Design Pattern Series
- [Adapter Pattern](/en/blog/2024/design-pattern-11-adapter-pattern/) - Making incompatible interfaces work together
- [Bridge Pattern](/en/blog/2024/design-pattern-12-bridge-pattern/) - Separating abstraction from implementation, supporting independent evolution
- [Composite Pattern](/en/blog/2024/design-pattern-13-composite-pattern/) - Uniformly handling individual objects and object combinations
- [Decorator Pattern](/en/blog/2024/design-pattern-14-decorator-pattern/) - Dynamically adding object functionality without modifying structure
- [Facade Pattern](/en/blog/2024/design-pattern-15-facade-pattern/) - Providing unified interface to simplify complex subsystems
- [Proxy Pattern](/en/blog/2024/design-pattern-17-proxy-pattern/) - Controlling resource access through smart proxy objects

### Behavioral Design Pattern Series
- [Chain of Responsibility Pattern](/en/blog/2024/design-pattern-18-chain-of-responsibility-pattern/) - Building dynamic request handling chains
- [Command Pattern](/en/blog/2024/design-pattern-19-command-pattern/) - Encapsulating requests as objects to implement undo/redo

### Creational Design Pattern Basics
- [Singleton Pattern](/en/blog/2024/design-pattern-10-singleton-pattern/) - Ensuring a class has only one instance
- [Design Principles](/en/blog/2024/design-pattern-2-design-principle/) - Mastering SOLID principles and design foundations

Through the Flyweight Pattern, we learned how to effectively manage large numbers of similar objects through object sharing technology. In the next article on the Proxy Pattern, we will explore another structural design technique for controlling object access.