---
layout: post
title: Design Pattern (22) Memento Pattern: Implementing Text Editor Undo Functionality, Perfect Encapsulation of Object State Snapshots
date: 2024-12-22 14:00:00 +0800
description: In-depth analysis of Memento Pattern core principles, through text editor undo functionality examples, learn how to safely save and restore object states, implementing complete state management systems.
tags: [Memento Pattern, Design Patterns, Behavioral Patterns, State Management, Undo Functionality, Text Editor]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Requirements

Our task is to design a text editor with the following core requirements:

- **State Editing Functionality**: Users can input text and perform various text editing operations. The system needs to track each state change during the editing process.
- **Undo Operation Support**: Users can press `Ctrl+Z` at any time to revert to the previous state. The system must accurately restore to the previous text content.
- **State History Management**: The system needs to automatically save each editing history state to support multiple undo operations.
- **Encapsulation Requirements**: The client doesn't need to understand internal implementation details of state saving and restoration, only needs to use simple APIs.

Imagine when you use Word or Google Docs, after each text input or content deletion, you can easily press `Ctrl+Z` to return to the previous state. This seemingly simple functionality actually involves complex state management mechanisms.

This is a typical **behavioral design pattern** application scenario, requiring management of object internal state saving and restoration mechanisms.

## Object-Oriented Analysis (OOA)

After understanding the requirements, we perform object-oriented analysis. In this text editor scenario, the core challenge we face is how to effectively manage object state saving and restoration.

From a system perspective, we can identify four key elements:
- **Text Editor Object**: As the state owner, responsible for text content processing
- **Text Content State**: Core data that needs to be saved and restored
- **State Snapshot**: Encapsulates states for convenient transmission and storage
- **History Manager**: Responsible for managing multiple state snapshots, providing undo functionality

The core challenge here is: How can we safely save and restore object internal states without breaking object encapsulation? In other words, we need to allow external state saving while preventing direct access to internal implementation details.

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_1.png" title="design_pattern_memento_pattern_uml_1" %}

## Recognizing Forces

In direct implementation without design patterns, we encounter the following core challenges:

### 1. State Management Complexity (State Management Complexity)
If we only keep the current state, we cannot implement undo functionality. But to save historical states creates complex management problems.

We need to decide: Which state data needs to be saved? How to efficiently save it? When to clean up expired old states? These questions make code complex and difficult to maintain.

### 2. Encapsulation Violation (Encapsulation Violation)
To implement state saving, clients often need direct access to editor's internal state data. This approach breaks object encapsulation principles.

When editor's internal implementation details are exposed externally, system coupling increases significantly. Any internal structural changes may affect code that uses it.

### 3. Performance and Memory Issues (Performance and Memory Issues)
When document content is large, directly copying entire object state consumes significant memory. Each state save requires copying complete data.

Under frequent user operations, this full copying becomes a serious performance bottleneck and may even cause application crashes.

### 4. Limited Extensibility (Limited Extensibility)
When we want to add advanced features like redo operations, multi-step undo, or state persistent storage, we often need to significantly modify existing architecture.

Such modifications have broad impact and may require redesigning the entire system, increasing development costs and risks.

**The root of these problems lies in improper allocation of state saving responsibilities**, and the system lacks unified and effective state management mechanisms.

## Applying Memento Pattern to Solve Problems

After object-oriented analysis and recognizing system challenges, we can apply the Memento Pattern to solve these problems.

**Memento Pattern** is a behavioral design pattern. Its goal is to capture and save an object's internal state without violating encapsulation, and be able to restore the object to its previous state later.

### Core Concepts of Memento Pattern

The core idea of Memento Pattern is quite intuitive: encapsulate object state snapshots in independent memento objects.

This memento object has an important characteristic: only the original object can access its complete content, other objects cannot directly modify it. This design cleverly protects encapsulation while providing state saving capability.

It's like taking a "state photo" of the object, where only the object itself knows how to interpret and use this photo to restore state.

### Memento Pattern UML Structure

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_2.png" title="design_pattern_memento_pattern_uml_2" %}

### Roles and Responsibilities

Memento Pattern solves system problems through the following three core roles:

#### 1. Originator - Text Editor
This is the main object that owns internal state, responsible for creating memento snapshots and restoring state from mementos.

In our example, the text editor is the originator. It knows how to save its own text content state and how to recover to previous states from snapshots.

#### 2. Memento - State Snapshot
This is an immutable snapshot object specifically used to store the originator's internal state at specific time points.

The memento object design is clever: it provides a limited interface for caretakers to use, but simultaneously allows originators to access all necessary data to restore state. This "dual interface" ensures encapsulation.

#### 3. Caretaker - History Manager
The caretaker is responsible for safekeeping all memento snapshots, but with an important principle: it never modifies or examines memento contents.

The caretaker only needs to know "when" to save snapshots and "when" to execute restoration operations, but doesn't need to know what the snapshot's specific content is. This responsibility separation makes the system more robust.

### Application to Text Editor

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_3.png" title="design_pattern_memento_pattern_uml_3" %}

## Object-Oriented Programming Implementation

Now we'll transform Memento Pattern theory into actual code. Through clear responsibility division, each component plays a specific role, collectively forming a complete state management system.

### Originator - Text Editor

The text editor, as the originator, is responsible for managing its own state and creating/restoring mementos. Let's see its implementation:

```kotlin
class TextEditor {
    private var text: String = ""

    fun type(newText: String) {
        text += newText
    }

    fun getText(): String = text

    fun save(): Memento = Memento(text)

    fun restore(memento: Memento) {
        text = memento.getText()
    }

    data class Memento(private val state: String) {
        fun getText(): String = state
    }
}
```

### Caretaker - History Manager

The history manager plays the role of snapshot keeper. Its responsibility is simple: save mementos and provide undo functionality, but never directly manipulate snapshot contents:

```kotlin
class History {
    private val mementos = mutableListOf<TextEditor.Memento>()

    fun save(memento: TextEditor.Memento) {
        mementos.add(memento)
    }

    fun undo(): TextEditor.Memento? {
        if (mementos.isNotEmpty()) {
            return mementos.removeAt(mementos.size - 1)
        }
        return null
    }
}
```

### Client - Client Usage Example

Now let's see how the client uses this system. Notice the client code is very concise, completely not needing to understand internal state management details:

```kotlin
fun main() {
    val textEditor = TextEditor()
    val history = History()

    // Typing string
    textEditor.type("Hello")
    history.save(textEditor.save())

    textEditor.type(", World")
    history.save(textEditor.save())

    textEditor.type("! This is Memento Pattern.")
    println("Current Text: ${textEditor.getText()}") // Output: Hello, World! This is Memento Pattern.

    // Pressed Ctrl+Z
    textEditor.restore(history.undo()!!)
    println("Execute undo Text: ${textEditor.getText()}") // Output: Hello, World!

    // Pressed Ctrl+Z again
    textEditor.restore(history.undo()!!)
    println("Execute undo Text: ${textEditor.getText()}") // Output: Hello
}
```

### Execution Results

Program execution output results are as follows:

```bash
Current Text: Hello, World! This is Memento Pattern.
Execute undo Text: Hello, World!
Execute undo Text: Hello
```

## Conclusion and Benefits

By applying the Memento Pattern, we successfully solved the core problems originally faced by the system. Let's review the specific improvements this pattern brought.

### Main Improvement Effects

**1. Encapsulation Protection**
Object internal state receives complete protection, external objects cannot directly access or modify editor's internal state. This ensures object integrity, any state changes must go through proper channels.

**2. State Management Simplification**
Through memento objects encapsulating state snapshots, state saving and restoration becomes simple and reliable. Each snapshot is immutable, fundamentally avoiding state inconsistency problems.

**3. Independent History Management**
History manager is completely separated from business logic, can be independently extended or modified. When we need to adjust undo strategies, it won't affect text editor's core functionality.

**4. Safe State Rollback**
The system can safely rollback to any previously saved state without causing data inconsistency or corruption. This safety comes from memento's immutable characteristics and clear responsibility division.

### Applicable Scenarios

Memento Pattern is particularly suitable for the following application scenarios:

- **Text Editors**: Implementing Undo/Redo functionality, supporting multi-step operation rollback
- **Game Save Systems**: Saving game states, allowing players to load previous save points
- **Transaction Systems**: Supporting transaction rollback mechanisms, ensuring data consistency and reliability
- **Configuration Management**: Saving system configuration snapshots, enabling quick configuration rollback when problems occur
- **Web Browsers**: Implementing back/forward functionality, remembering browsing history states

### Design Considerations During Implementation

When implementing Memento Pattern, special attention should be paid to the following points:

**Memory Usage Optimization**
For large state objects, directly copying entire state may cause memory problems. Consider using incremental snapshots or compressed storage methods for optimization.

**Snapshot Quantity Limits**
Setting reasonable history record limits is important to avoid unlimited snapshot accumulation causing memory overflow. LRU (Least Recently Used) strategies can be adopted to manage snapshots.

**Snapshot Immutability**
Ensure memento objects cannot be modified after creation, this is a key principle for maintaining system stability.

**In summary, the core value of Memento Pattern lies in: providing safe state management mechanisms while maintaining encapsulation**. It allows objects to support state saving and restoration without exposing internal implementation details, making it an elegant solution for state management problems.