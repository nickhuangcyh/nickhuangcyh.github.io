---
layout: post
title: "Design Pattern 19: Command Pattern - Complete Guide with Undo/Redo and Remote Control Examples"
date: 2024-12-21 15:00:00 +0800
description: "Master the Command Pattern with practical remote control and undo/redo examples. Learn how to decouple operations, implement flexible controls, and support extensible command history."
tags:
  [
    Command Pattern,
    Design Patterns,
    Undo Redo,
    Remote Control,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Behavioral Patterns,
    Command History,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Command Pattern?**

The **Command Pattern** is a behavioral design pattern that encapsulates a request as an object, allowing you to parameterize clients, queue or log requests, and support undoable operations. It decouples the object that invokes the operation from the one that knows how to perform it.

**Key Benefits:**

- ✅ **Decouples sender and receiver**
- ✅ **Supports undo/redo**
- ✅ **Flexible command history**
- ✅ **Extensible for new commands**
- ✅ **Centralizes control logic**

---

## 🚀 **Real-World Problem: Music Player Remote Control**

Suppose you are building a **music player remote control system** with the following requirements:

- Users can control play, pause, and stop via remote
- Support for undo (e.g., undo pause resumes play)
- Button actions should be flexible for future features (e.g., next, repeat)

### **Business Rules:**

- All actions are encapsulated as command objects
- Remote control manages command history for undo
- Easy to add new commands without changing existing code

---

## 🏗️ **Object-Oriented Analysis (OOA)**

{% include figure.liquid path="assets/img/design_pattern_command_pattern_uml_1.png" title="Command Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **High coupling** - Client must know all device details
2. **Lack of flexibility** - Hard to add new devices or actions
3. **Undo/redo complexity** - No unified way to manage history

---

## 💡 **Command Pattern Solution**

By encapsulating actions as command objects, we decouple the invoker from the receiver and enable flexible, extensible control.

{% include figure.liquid path="assets/img/design_pattern_command_pattern_uml_2.png" title="Command Pattern - General Structure" %}

### **Command Pattern Components:**

- **Receiver** - Executes the actual operation
- **Command Interface** - Defines execute/undo
- **Concrete Command** - Implements specific actions
- **Invoker** - Triggers commands and manages history
- **Client** - Sets up relationships

---

## 🛠️ **Implementation: Music Player Remote Control**

{% include figure.liquid path="assets/img/design_pattern_command_pattern_uml_3.png" title="Command Pattern - Remote Control Example" %}

### **1. Receiver: Music Player**

```kotlin
class MusicPlayer {
    fun play() { println("Music is playing") }
    fun pause() { println("Music is paused") }
    fun stop() { println("Music is stopped") }
}
```

### **2. Command Interface**

```kotlin
interface Command {
    fun execute()
    fun undo()
}
```

### **3. Concrete Commands**

```kotlin
class PlayCommand(private val player: MusicPlayer) : Command {
    override fun execute() { player.play() }
    override fun undo() { player.pause() }
}
class PauseCommand(private val player: MusicPlayer) : Command {
    override fun execute() { player.pause() }
    override fun undo() { player.play() }
}
class StopCommand(private val player: MusicPlayer) : Command {
    override fun execute() { player.stop() }
    override fun undo() { println("Cannot undo stop") }
}
```

### **4. Invoker: Remote Control**

```kotlin
class RemoteControl {
    private val commandHistory = mutableListOf<Command>()
    fun pressButton(command: Command) {
        command.execute()
        commandHistory.add(command)
    }
    fun pressUndo() {
        if (commandHistory.isNotEmpty()) {
            val lastCommand = commandHistory.removeLast()
            lastCommand.undo()
        } else {
            println("No command to undo")
        }
    }
}
```

### **5. Client Code**

```kotlin
fun main() {
    val player = MusicPlayer()
    val playCommand = PlayCommand(player)
    val pauseCommand = PauseCommand(player)
    val stopCommand = StopCommand(player)
    val remoteControl = RemoteControl()
    remoteControl.pressButton(playCommand)
    remoteControl.pressButton(pauseCommand)
    remoteControl.pressUndo()
    remoteControl.pressButton(stopCommand)
    remoteControl.pressUndo()
}
```

**Expected Output:**

```
Music is playing
Music is paused
Music is playing
Music is stopped
```

---

## 📊 **Command Pattern vs Alternative Approaches**

| Approach            | Pros                                                 | Cons                                              |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| **Command Pattern** | ✅ Decouples sender/receiver<br>✅ Undo/redo support | ❌ More classes<br>❌ Command management overhead |
| **Direct Calls**    | ✅ Simple for small apps                             | ❌ High coupling<br>❌ No undo/redo               |
| **Event Bus**       | ✅ Decoupled communication                           | ❌ Harder to trace logic<br>❌ Global state       |

---

## 🎯 **When to Use the Command Pattern**

### **✅ Perfect For:**

- **Remote controls** (music, TV, smart home)
- **Undo/redo systems**
- **Macro recording/playback**
- **Task scheduling and queuing**
- **GUI button actions**

### **❌ Avoid When:**

- **Simple, one-off actions**
- **Small, stateless systems**

---

## 🔧 **Advanced Command Pattern Implementations**

- **Macro commands** (batch actions)
- **Command logging and replay**
- **Asynchronous command execution**
- **Command queues and scheduling**

---

## 📈 **Real-World Applications**

- Remote controls (TV, music, smart home)
- Text editors (undo/redo)
- Transaction management
- Workflow engines

---

## 🚨 **Common Pitfalls and Best Practices**

- Avoid excessive command classes (use parameterized commands)
- Document command history logic
- Use clear naming for commands

---

## 🔗 **Related Articles**

- [Design Pattern 1: Object-Oriented Concepts](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [Design Pattern 2: Design Principles](/2024-07-03-design-pattern-2-design-principle)
- [Memento Pattern](/2024-12-23-design-pattern-22-memento-pattern)
- [State Pattern](/2024-12-25-design-pattern-24-state-pattern)
- [Observer Pattern](/2024-12-24-design-pattern-23-observer-pattern)

---

## ✅ **Conclusion**

Through the Command Pattern, we successfully decoupled operations, enabled undo/redo, and made the system more flexible and extensible.

**Key Advantages:**

- 🎯 **Decouples sender and receiver**
- 🔧 **Undo/redo support**
- 📈 **Flexible command history**
- 🛡️ **Maintainability**
- ⚡ **Extensibility**

**Design Principles Followed:**

- **Single Responsibility Principle (SRP)**: Each command has one responsibility
- **Open-Closed Principle (OCP)**: Add new commands easily
- **Don't Repeat Yourself (DRY)**: Centralize command logic

**Perfect For:**

- **Remote controls**
- **Undo/redo systems**
- **Workflow engines**

The Command Pattern provides an elegant solution for flexible, extensible control in modern applications!

---

**💡 Pro Tip:** Use macro commands and command logging for advanced automation and debugging.

**🔔 Stay Updated:** Follow our Design Pattern series for more software architecture insights!
