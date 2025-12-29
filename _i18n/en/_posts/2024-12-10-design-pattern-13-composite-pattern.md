---
layout: post
title: "Design Pattern (13) Composite Pattern: Tree Structure Unified Operation Design Guide"
date: 2024-12-10 22:28:00 +0800
description: "Deep dive into Composite Pattern implementation techniques, learn how to uniformly handle individual objects and object collections, master tree structure management and recursive operations in structural design patterns core application techniques."
tags: [Design Patterns, Composite Pattern, Structural Patterns, Tree Structure, Software Architecture, OOP, Kotlin, Java, Hierarchical Design]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Requirements

We received a requirement: implement a file system where directories can contain files or subdirectories, and provide a unified operation interface to list directory contents. This system should support the following features:

- Support tree structure representation.
- Can operate on individual files and directories.
- No need for major code modifications when adding new files or directories.

## Object-Oriented Analysis (OOA)

After understanding the requirements, let's quickly implement object-oriented analysis!

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_1.png" title="design_pattern_composite_pattern_uml_1" %}

## Identifying Forces

Without using design patterns, the above requirements may encounter the following problems:

1. **Tight Coupling**:

   - Operation logic for individual files and directory collections is scattered across multiple classes, making system maintenance difficult.

2. **Code Duplication**:

   - Each time operating on directory contents, files and subdirectories need to be handled separately, causing similar logic to be repeated in multiple places.

3. **Difficulty in Extending**:

   - When adding new file or directory types, major code modifications are needed, affecting system stability.

4. **Lack of Flexibility**:
   - The operation layer needs to clearly distinguish between individual files and directory collections, increasing code complexity.

## Applying Composite Pattern (Solution) to Achieve New Context (Resulting Context)

After completing OOA, identifying Forces, and understanding the entire Context, we can apply the Composite Pattern to solve this problem.

Let's first look at the UML of the Composite Pattern:

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_2.png" title="design_pattern_composite_pattern_uml_2" %}

### Three Core Roles of Composite Pattern:

**1. Component (Component Interface)**

- Defines common interface for all components (leaves and composites)
- Provides consistent operation method for clients
- In our file system, this is `FileSystemComponent`

**2. Leaf (Leaf Node)**

- Represents terminal nodes in the tree structure that cannot contain other components
- Implements basic behavior of the Component interface
- In our example, this is the individual file `File`

**3. Composite (Composite Node)**

- Represents container nodes that can contain child components
- Implements Component interface and delegates operations to child components
- This is our directory `Directory`, which can contain files and subdirectories

### Applying to Our File System

Now let's apply the Composite Pattern to the file system design:

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_3.png" title="design_pattern_composite_pattern_uml_3" %}

## Object-Oriented Programming (OOP)

[Component: FileSystemComponent]

```kotlin
abstract class FileSystemComponent(val name: String) {
    open fun display(indent: String = "") {
        println("$indent$name")
    }

    open fun add(component: FileSystemComponent) {
        throw UnsupportedOperationException("Cannot add component to a leaf.")
    }

    open fun remove(component: FileSystemComponent) {
        throw UnsupportedOperationException("Cannot remove component from a leaf.")
    }
}
```

[Leaf: File]

```kotlin
class File(name: String) : FileSystemComponent(name) {
    override fun display(indent: String) {
        println("$indent- File: $name")
    }
}
```

[Composite: Directory]

```kotlin
class Directory(name: String) : FileSystemComponent(name) {
    private val children = mutableListOf<FileSystemComponent>()

    override fun add(component: FileSystemComponent) {
        children.add(component)
    }

    override fun remove(component: FileSystemComponent) {
        children.remove(component)
    }

    override fun display(indent: String) {
        println("$indent+ Directory: $name")
        children.forEach { it.display("$indent  ") }
    }
}
```

[Client]

```kotlin
fun main() {
    // Build Directories and files
    val root = Directory("Root")
    val folder1 = Directory("Folder1")
    val folder2 = Directory("Folder2")

    val file1 = File("File1.txt")
    val file2 = File("File2.txt")
    val file3 = File("File3.txt")

    // Add files & directories into directories
    root.add(folder1)
    root.add(file1)

    folder1.add(folder2)
    folder1.add(file2)

    folder2.add(file3)

    // display file structure
    root.display()
}
```

[Output]

```bash
+ Directory: Root
  + Directory: Folder1
    + Directory: Folder2
      - File: File3.txt
    - File: File2.txt
  - File: File1.txt
```

## Conclusion

By applying the Composite Pattern, we successfully achieved unified operations for individual files and directory collections. We effectively reduced system coupling and provided efficient extensibility. When new file types or directory structures need to be added, no major modifications to existing code are required. Through this pattern, developers can handle tree structure logic in a concise and consistent manner, improving program flexibility and maintainability.

## Series Navigation

### Structural Design Pattern Series

- [Adapter Pattern](/en/blog/2024/design-pattern-11-adapter-pattern/) - Making incompatible interfaces work together
- [Bridge Pattern](/en/blog/2024/design-pattern-12-bridge-pattern/) - Separating abstraction from implementation, supporting independent evolution
- [Decorator Pattern](/en/blog/2024/design-pattern-14-decorator-pattern/) - Dynamically adding object functionality without modifying structure
- [Facade Pattern](/en/blog/2024/design-pattern-15-facade-pattern/) - Providing unified interface to simplify complex subsystems
- [Flyweight Pattern](/en/blog/2024/design-pattern-16-flyweight-pattern/) - Efficiently managing memory usage of large numbers of similar objects
- [Proxy Pattern](/en/blog/2024/design-pattern-17-proxy-pattern/) - Controlling resource access through smart proxy objects

### Behavioral Design Pattern Series

- [Chain of Responsibility Pattern](/en/blog/2024/design-pattern-18-chain-of-responsibility-pattern/) - Building dynamic request handling chains
- [Command Pattern](/en/blog/2024/design-pattern-19-command-pattern/) - Encapsulating requests as objects to implement undo/redo

### Creational Design Pattern Basics

- [Singleton Pattern](/en/blog/2024/design-pattern-10-singleton-pattern/) - Ensuring a class has only one instance
- [Design Principles](/en/blog/2024/design-pattern-2-design-principle/) - Mastering SOLID principles and design foundations

Through the Composite Pattern, we mastered unified operation techniques for tree structures. In the next article on the Decorator Pattern, we will explore how to dynamically extend object functionality through wrapping techniques.
