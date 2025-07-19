---
layout: post
title: "Design Pattern 21: Mediator Pattern - Complete Guide with Real-World Chatroom Example"
date: 2024-12-22 14:00:00 +0800
description: "Master the Mediator Pattern with practical chatroom and system coordination examples. Learn how to reduce coupling, improve extensibility, and centralize communication logic."
tags:
  [
    Mediator Pattern,
    Design Patterns,
    Decoupling,
    Object-Oriented Design,
    Software Architecture,
    Chatroom,
    Kotlin,
    Programming,
    Behavioral Patterns,
    Communication,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Mediator Pattern?**

The **Mediator Pattern** is a behavioral design pattern that centralizes complex communications and control between related objects. Instead of objects referring to each other directly, they communicate through a mediator, reducing dependencies and making the system easier to maintain and extend.

**Key Benefits:**

- ✅ **Reduces coupling** between components
- ✅ **Centralizes communication logic**
- ✅ **Improves extensibility** for new features
- ✅ **Simplifies maintenance**
- ✅ **Scales well** for large systems

---

## 🚀 **Real-World Problem: Chatroom Application**

Suppose you are building a **chatroom application** with the following requirements:

- Users can send messages to the chatroom
- Users do not need to manage other users' information directly
- Adding or removing users should not affect others

### **Business Rules:**

- All communication is managed by a central mediator
- Users interact only with the mediator, not with each other directly
- The system should be easy to extend (e.g., add message filtering, broadcasting)

---

## 🏗️ **Object-Oriented Analysis (OOA)**

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_1.png" title="Mediator Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **High Coupling** - Direct communication between users increases maintenance cost
2. **Hard to Extend** - Adding new features requires modifying multiple classes
3. **Increased Complexity** - More users means exponentially more connections

---

## 💡 **Mediator Pattern Solution**

By introducing a mediator, all communication is routed through a central object, reducing dependencies and simplifying the system.

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_2.png" title="Mediator Pattern - General Structure" %}

### **Mediator Pattern Components:**

- **Mediator Interface** - Defines methods for communication
- **Concrete Mediator** - Implements communication logic
- **Colleague Interface** - Represents participants
- **Concrete Colleague** - Implements participant behavior

---

## 🛠️ **Implementation: Chatroom Example**

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_3.png" title="Mediator Pattern - Chatroom Example" %}

### **1. Mediator Interface**

```kotlin
interface ChatMediator {
    fun sendMessage(message: String, user: User)
    fun addUser(user: User)
}
```

### **2. Concrete Mediator**

```kotlin
class ChatRoomMediator : ChatMediator {
    private val users = mutableListOf<User>()
    override fun sendMessage(message: String, user: User) {
        users.filter { it != user }.forEach { it.receive(message) }
    }
    override fun addUser(user: User) {
        users.add(user)
    }
}
```

### **3. Colleague Interface**

```kotlin
abstract class User(protected val mediator: ChatMediator, val name: String) {
    abstract fun send(message: String)
    abstract fun receive(message: String)
}
```

### **4. Concrete Colleague**

```kotlin
class ChatUser(mediator: ChatMediator, name: String) : User(mediator, name) {
    override fun send(message: String) {
        println("$name sends: $message")
        mediator.sendMessage(message, this)
    }
    override fun receive(message: String) {
        println("$name receives: $message")
    }
}
```

### **5. Client Code**

```kotlin
fun main() {
    val chatMediator = ChatRoomMediator()
    val user1 = ChatUser(chatMediator, "Alice")
    val user2 = ChatUser(chatMediator, "Bob")
    val user3 = ChatUser(chatMediator, "Charlie")
    chatMediator.addUser(user1)
    chatMediator.addUser(user2)
    chatMediator.addUser(user3)
    user1.send("Hello, everyone!")
    user2.send("Hi, Alice!")
}
```

**Expected Output:**

```
Alice sends: Hello, everyone!
Bob receives: Hello, everyone!
Charlie receives: Hello, everyone!
Bob sends: Hi, Alice!
Alice receives: Hi, Alice!
Charlie receives: Hi, Alice!
```

---

## 📊 **Mediator Pattern vs Alternative Approaches**

| Approach                 | Pros                                        | Cons                                                         |
| ------------------------ | ------------------------------------------- | ------------------------------------------------------------ |
| **Mediator Pattern**     | ✅ Reduces coupling<br>✅ Centralizes logic | ❌ Mediator can become complex<br>❌ Single point of failure |
| **Direct Communication** | ✅ Simple for small systems                 | ❌ High coupling<br>❌ Hard to extend                        |
| **Event Bus**            | ✅ Decoupled communication                  | ❌ Harder to trace logic<br>❌ Global state                  |

---

## 🎯 **When to Use the Mediator Pattern**

### **✅ Perfect For:**

- **Chatroom systems**
- **GUI component communication**
- **Event-driven architectures**
- **Workflow engines**
- **Complex system coordination**

### **❌ Avoid When:**

- **Simple, small systems**
- **Mediator logic becomes too complex**

---

## 🔧 **Advanced Mediator Pattern Implementations**

- **Message Filtering**: Add logic in mediator to filter or transform messages
- **Broadcasting**: Support for broadcasting to all or specific users
- **Logging and Monitoring**: Centralize logging in mediator
- **Dynamic User Management**: Add/remove users at runtime

---

## 📈 **Real-World Applications**

- Chatroom and messaging apps
- Air traffic control systems
- GUI frameworks (dialog coordination)
- Workflow and process engines

---

## 🚨 **Common Pitfalls and Best Practices**

- Avoid making the mediator too complex (split responsibilities if needed)
- Document all communication flows
- Use clear naming for mediator methods

---

## 🔗 **Related Articles**

- [Design Pattern 1: Object-Oriented Concepts](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [Design Pattern 2: Design Principles](/2024-07-03-design-pattern-2-design-principle)
- [Command Pattern](/2024-12-21-design-pattern-19-command-pattern)
- [Observer Pattern](/2024-12-24-design-pattern-23-observer-pattern)
- [State Pattern](/2024-12-25-design-pattern-24-state-pattern)

---

## ✅ **Conclusion**

Through the Mediator Pattern, we successfully reduced coupling between users and centralized communication logic, making the system more maintainable and extensible.

**Key Advantages:**

- 🎯 **Reduces coupling**
- 🔧 **Centralizes communication logic**
- 📈 **Easy extension**
- 🛡️ **Maintainability**
- ⚡ **Scalability**

**Design Principles Followed:**

- **Single Responsibility Principle (SRP)**: Mediator handles communication
- **Open-Closed Principle (OCP)**: Add new features without modifying users
- **Don't Repeat Yourself (DRY)**: Centralize logic in mediator

**Perfect For:**

- **Chatroom systems**
- **GUI frameworks**
- **Workflow engines**

The Mediator Pattern provides an elegant solution for managing complex communications in scalable systems!

---

**💡 Pro Tip:** If the mediator becomes too complex, consider splitting it into multiple mediators for different concerns.

**🔔 Stay Updated:** Follow our Design Pattern series for more software architecture insights!
