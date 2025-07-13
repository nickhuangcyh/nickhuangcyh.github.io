---
layout: post
title: "Design Pattern 13: Composite Pattern - Unified Tree Structure Management for File Systems and UI Components"
date: 2024-12-10 22:28:00 +0800
description: "Master the Composite Pattern to treat individual objects and collections uniformly. Learn how to implement tree structures for file systems, UI components, and organizational hierarchies with practical examples and best practices."
tags: [Composite Pattern, Design Patterns, Tree Structure, File System, UI Components, Object-Oriented Design, Software Architecture, Kotlin, Java, Swift]
categories: [Design Patterns, Software Development, Object-Oriented Programming]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Power of Unified Tree Structures

The Composite Pattern is a structural design pattern that allows you to compose objects into tree structures and treat individual objects and compositions uniformly. This pattern is essential for building complex hierarchical systems like file systems, UI component trees, and organizational structures.

## Real-World Applications

The Composite Pattern is widely used in:

- **File Systems**: Directories containing files and subdirectories
- **UI Frameworks**: Widget trees with containers and leaf components
- **Organization Charts**: Departments with employees and sub-departments
- **Graphics Systems**: Shapes that can contain other shapes
- **Menu Systems**: Menus with submenus and menu items

## Problem Statement: File System Management

We need to implement a file system where directories can contain files or subdirectories, providing a unified interface to list directory contents. The system should support:

- Tree structure representation
- Operations on both individual files and directories
- Easy addition of new file or directory types without major code modifications

## Object-Oriented Analysis (OOA)

Let's analyze the requirements and design our initial solution:

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_1.png" title="Initial file system design without Composite Pattern" %}

## Identifying Design Forces

Without using design patterns, we encounter several challenges:

1. **High Coupling**: File and directory operations are scattered across multiple classes, making maintenance difficult
2. **Code Duplication**: Similar logic is repeated when handling files vs. directories
3. **Poor Extensibility**: Adding new file or directory types requires significant code changes
4. **Lack of Flexibility**: Client code must distinguish between individual files and directory collections

## Applying Composite Pattern Solution

The Composite Pattern provides an elegant solution by creating a unified interface for both individual objects and collections.

### Composite Pattern UML Structure

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_2.png" title="Composite Pattern UML diagram" %}

**Key Components:**
- **Component**: Defines the unified interface for both individual objects and collections
- **Leaf**: Represents individual objects (files) that cannot contain children
- **Composite**: Represents collections (directories) that can contain children and implement recursive operations

### Applied to File System

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_3.png" title="File system with Composite Pattern" %}

## Implementation: Object-Oriented Programming (OOP)

### Component Interface

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
    
    open fun getSize(): Long {
        throw UnsupportedOperationException("Size not implemented for this component.")
    }
}
```

### Leaf Implementation (File)

```kotlin
class File(name: String, private val size: Long = 0) : FileSystemComponent(name) {
    override fun display(indent: String) {
        println("$indent- File: $name (${size} bytes)")
    }
    
    override fun getSize(): Long = size
}
```

### Composite Implementation (Directory)

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
    
    override fun getSize(): Long {
        return children.sumOf { it.getSize() }
    }
    
    fun getChildCount(): Int = children.size
}
```

### Client Usage

```kotlin
fun main() {
    // Build directory structure
    val root = Directory("Root")
    val documents = Directory("Documents")
    val images = Directory("Images")
    val work = Directory("Work")

    val readme = File("README.md", 1024)
    val config = File("config.json", 512)
    val photo1 = File("photo1.jpg", 2048576)
    val photo2 = File("photo2.jpg", 1536000)
    val report = File("report.pdf", 1048576)

    // Build hierarchy
    root.add(documents)
    root.add(images)
    root.add(readme)
    root.add(config)

    documents.add(work)
    work.add(report)

    images.add(photo1)
    images.add(photo2)

    // Display structure
    println("File System Structure:")
    root.display()
    
    println("\nSize Analysis:")
    println("Root size: ${root.getSize()} bytes")
    println("Documents size: ${documents.getSize()} bytes")
    println("Images size: ${images.getSize()} bytes")
}
```

**Output:**
```bash
File System Structure:
+ Directory: Root
  + Directory: Documents
    + Directory: Work
      - File: report.pdf (1048576 bytes)
  + Directory: Images
    - File: photo1.jpg (2048576 bytes)
    - File: photo2.jpg (1536000 bytes)
  - File: README.md (1024 bytes)
  - File: config.json (512 bytes)

Size Analysis:
Root size: 4634688 bytes
Documents size: 1048576 bytes
Images size: 3584576 bytes
```

## Advanced Implementation: UI Component Tree

The Composite Pattern is also perfect for UI frameworks:

```kotlin
abstract class UIComponent(val name: String) {
    abstract fun render(): String
    abstract fun getBounds(): Rectangle
    
    open fun add(component: UIComponent) {
        throw UnsupportedOperationException("Cannot add to leaf component")
    }
    
    open fun remove(component: UIComponent) {
        throw UnsupportedOperationException("Cannot remove from leaf component")
    }
}

class Button(name: String, private val text: String) : UIComponent(name) {
    override fun render(): String = "<button>$text</button>"
    override fun getBounds(): Rectangle = Rectangle(0, 0, 100, 30)
}

class Panel(name: String) : UIComponent(name) {
    private val children = mutableListOf<UIComponent>()
    
    override fun render(): String {
        val childRenders = children.joinToString("\n") { "  ${it.render()}" }
        return "<div class='panel'>\n$childRenders\n</div>"
    }
    
    override fun getBounds(): Rectangle {
        // Calculate bounds based on children
        return Rectangle(0, 0, 200, 150)
    }
    
    override fun add(component: UIComponent) {
        children.add(component)
    }
    
    override fun remove(component: UIComponent) {
        children.remove(component)
    }
}
```

## Best Practices and Considerations

### 1. **Type Safety**
```kotlin
// Good: Type-safe operations
abstract class Component {
    abstract fun operation()
    open fun add(component: Component) {
        throw UnsupportedOperationException()
    }
}

// Avoid: Runtime type checking
fun processComponent(component: Component) {
    if (component is Composite) {
        // Handle composite
    } else if (component is Leaf) {
        // Handle leaf
    }
}
```

### 2. **Memory Management**
```kotlin
class Composite(name: String) : Component(name) {
    private val children = WeakHashMap<Component, Boolean>()
    
    override fun add(component: Component) {
        children[component] = true
    }
}
```

### 3. **Visitor Pattern Integration**
```kotlin
interface ComponentVisitor {
    fun visitFile(file: File)
    fun visitDirectory(directory: Directory)
}

abstract class FileSystemComponent(val name: String) {
    abstract fun accept(visitor: ComponentVisitor)
}
```

## Performance Considerations

| Operation | Leaf | Composite | Notes |
|-----------|------|-----------|-------|
| Add/Remove | O(1) | O(1) | Direct operation |
| Search | O(1) | O(n) | Linear search through children |
| Traversal | O(1) | O(n) | Visit all children |
| Memory | Low | Higher | Stores child references |

## Related Design Patterns

- **Decorator Pattern**: Adds responsibilities to individual objects
- **Chain of Responsibility**: Passes requests along a chain of handlers
- **Visitor Pattern**: Separates algorithms from object structure
- **Iterator Pattern**: Traverses composite structures

## Conclusion

The Composite Pattern provides a powerful way to build tree structures while treating individual objects and collections uniformly. Key benefits include:

- **Unified Interface**: Same operations work on both individual objects and collections
- **Simplified Client Code**: Clients don't need to distinguish between leaf and composite objects
- **Easy Extension**: New component types can be added without changing existing code
- **Recursive Operations**: Natural support for operations that traverse the entire tree

This pattern is essential for building complex hierarchical systems and is widely used in file systems, UI frameworks, and organizational structures.

## Related Articles

- [Design Pattern 12: Bridge Pattern](/2024-12-08-design-pattern-12-bridge-pattern/)
- [Design Pattern 14: Decorator Pattern](/2024-12-11-design-pattern-14-decorator-pattern/)
- [Design Pattern 15: Facade Pattern](/2024-12-12-design-pattern-15-facade-pattern/)
- [Object-Oriented Design Principles](/2024-07-03-design-pattern-2-design-principle/)
