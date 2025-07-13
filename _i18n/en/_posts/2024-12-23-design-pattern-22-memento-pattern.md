---
layout: post
title: "Design Pattern 22: Memento Pattern - Complete Guide with Undo/Redo Examples"
date: 2024-12-22 14:00:00 +0800
description: "Master the Memento Pattern with practical undo/redo and state recovery examples. Learn how to implement state snapshots, history management, and robust data recovery."
tags: [Memento Pattern, Design Patterns, Undo Redo, State Recovery, Object-Oriented Design, Software Architecture, Kotlin, Programming, Behavioral Patterns, History Management]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Memento Pattern?**

The **Memento Pattern** is a behavioral design pattern that allows you to capture and restore an object's state without exposing its internal structure. It's widely used for implementing undo/redo, state recovery, and history management in applications.

**Key Benefits:**
- ✅ **State recovery** - Restore previous states easily
- ✅ **Encapsulation** - Internal state is hidden from external objects
- ✅ **Undo/redo support** - Implement robust history features
- ✅ **Maintainability** - Clean separation of concerns
- ✅ **Extensibility** - Add new state types easily

---

## 🚀 **Real-World Problem: Text Editor Undo/Redo**

Suppose you are building a **text editor** with the following requirements:
- Users can input text and undo changes (Ctrl+Z)
- The system must save history for recovery
- The client should not know the details of state management

### **Business Rules:**
- All state changes are managed by a caretaker
- The originator creates and restores mementos
- The client interacts only with simple undo/redo operations

---

## 🏗️ **Object-Oriented Analysis (OOA)**

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_1.png" title="Memento Pattern - Problem Analysis" %}

### **Identified Forces:**
1. **Data loss risk** - No way to recover previous states
2. **High coupling** - Client must manage state logic
3. **Hard to extend** - Adding new state types is difficult

---

## 💡 **Memento Pattern Solution**

By introducing the Memento Pattern, we can capture and restore object states without exposing internal details.

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_2.png" title="Memento Pattern - General Structure" %}

### **Memento Pattern Components:**
- **Originator** - Creates and restores state
- **Memento** - Stores state
- **Caretaker** - Manages history and recovery

---

## 🛠️ **Implementation: Text Editor Undo/Redo**

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_3.png" title="Memento Pattern - Text Editor Example" %}

### **1. Originator**
```kotlin
class TextEditor {
    private var text: String = ""
    fun type(newText: String) { text += newText }
    fun getText(): String = text
    fun save(): Memento = Memento(text)
    fun restore(memento: Memento) { text = memento.getText() }
    data class Memento(private val state: String) { fun getText(): String = state }
}
```

### **2. Caretaker**
```kotlin
class History {
    private val mementos = mutableListOf<TextEditor.Memento>()
    fun save(memento: TextEditor.Memento) { mementos.add(memento) }
    fun undo(): TextEditor.Memento? = if (mementos.isNotEmpty()) mementos.removeAt(mementos.size - 1) else null
}
```

### **3. Client Code**
```kotlin
fun main() {
    val textEditor = TextEditor()
    val history = History()
    textEditor.type("Hello")
    history.save(textEditor.save())
    textEditor.type(", World")
    history.save(textEditor.save())
    textEditor.type("! This is Memento Pattern.")
    println("Current Text: ${textEditor.getText()}")
    textEditor.restore(history.undo()!!)
    println("Undo Text: ${textEditor.getText()}")
    textEditor.restore(history.undo()!!)
    println("Undo Text: ${textEditor.getText()}")
}
```

**Expected Output:**
```
Current Text: Hello, World! This is Memento Pattern.
Undo Text: Hello, World!
Undo Text: Hello
```

---

## 📊 **Memento Pattern vs Alternative Approaches**

| Approach | Pros | Cons |
|----------|------|------|
| **Memento Pattern** | ✅ Encapsulated state<br>✅ Undo/redo support | ❌ Memory usage for large histories<br>❌ Caretaker complexity |
| **Direct State Management** | ✅ Simple for small apps | ❌ High coupling<br>❌ No encapsulation |
| **Event Sourcing** | ✅ Full history<br>✅ Auditing | ❌ Complex implementation<br>❌ Storage overhead |

---

## 🎯 **When to Use the Memento Pattern**

### **✅ Perfect For:**
- **Text editors** (undo/redo)
- **Game save systems**
- **Workflow engines** (rollback)
- **Configuration management**
- **Stateful UI components**

### **❌ Avoid When:**
- **Large, complex states** (memory overhead)
- **Simple, stateless systems**

---

## 🔧 **Advanced Memento Pattern Implementations**
- **Multi-level undo/redo**
- **State compression** for memory optimization
- **Versioning and branching**
- **Persistent storage of mementos**

---

## 📈 **Real-World Applications**
- Text editors (VSCode, Word)
- Drawing and design tools (undo/redo)
- Game save/load systems
- Database transaction rollback

---

## 🚨 **Common Pitfalls and Best Practices**
- Avoid storing large objects in mementos
- Use immutable mementos for safety
- Document state transitions clearly

---

## 🔗 **Related Articles**
- [Design Pattern 1: Object-Oriented Concepts](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [Design Pattern 2: Design Principles](/2024-07-03-design-pattern-2-design-principle)
- [Command Pattern](/2024-12-21-design-pattern-19-command-pattern)
- [State Pattern](/2024-12-25-design-pattern-24-state-pattern)
- [Observer Pattern](/2024-12-24-design-pattern-23-observer-pattern)

---

## ✅ **Conclusion**

Through the Memento Pattern, we successfully implemented robust undo/redo and state recovery features, making the system more reliable and user-friendly.

**Key Advantages:**
- 🎯 **State recovery**
- 🔧 **Encapsulation**
- 📈 **Undo/redo support**
- 🛡️ **Maintainability**
- ⚡ **Extensibility**

**Design Principles Followed:**
- **Single Responsibility Principle (SRP)**: State management is separated
- **Open-Closed Principle (OCP)**: Add new state types easily
- **Don't Repeat Yourself (DRY)**: Centralize state logic

**Perfect For:**
- **Text editors**
- **Game save systems**
- **Workflow engines**

The Memento Pattern provides an elegant solution for state recovery and undo/redo in modern applications!

---

**💡 Pro Tip:** Use immutable mementos and avoid storing large objects to optimize performance.

**🔔 Stay Updated:** Follow our Design Pattern series for more software architecture insights!
