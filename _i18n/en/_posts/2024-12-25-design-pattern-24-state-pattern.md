---
layout: post
title: "Design Pattern 24: State Pattern - Complete Guide with Real-World Examples"
date: 2024-12-22 15:00:00 +0800
description: "Master the State Pattern with practical examples. Learn how to implement state machines, manage object behavior based on state, and create flexible state-driven applications."
tags: [State Pattern, Design Patterns, State Machine, Object-Oriented Design, Software Architecture, Kotlin, Programming, Behavioral Patterns]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the State Pattern?**

The **State Pattern** is a behavioral design pattern that allows an object to alter its behavior when its internal state changes. The object will appear to change its class, making it perfect for implementing state machines and managing complex state-dependent behavior.

**Key Use Cases:**

- ✅ **State machines** and workflow engines
- ✅ **Game development** (character states, AI behavior)
- ✅ **UI components** (button states, form validation)
- ✅ **Network protocols** (connection states)
- ✅ **Business logic** (order processing, workflow management)

---

## 🚀 **Real-World Problem: Water Dispenser State Management**

Let's design a **water dispenser** system with the following requirements:

### **System Requirements:**

- **Three operational states:**
  - **Heating**: Raises water temperature to hot
  - **Cooling**: Lowers water temperature to cold
  - **Standby**: Maintains current water temperature
- **User interaction**: Button presses to switch states
- **State-specific behavior**: Each state performs appropriate actions

### **Business Rules:**

- Heating state cannot cool water simultaneously
- Cooling state cannot heat water simultaneously
- Standby state maintains current temperature
- State transitions should be smooth and predictable

---

## 🏗️ **Object-Oriented Analysis (OOA)**

Let's analyze the problem and identify the core components:

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_1.png" title="State Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **High Coupling**
   - State logic mixed with water dispenser core functionality
   - Difficult to maintain and modify state behavior

2. **Single Responsibility Principle Violation**
   - Water dispenser class handles both state logic and core functionality
   - Class becomes overloaded with responsibilities

3. **Extension Challenges**
   - Adding or modifying states requires changing core logic
   - Violates Open-Closed Principle (OCP)

---

## 💡 **State Pattern Solution**

After analyzing the forces, we can apply the **State Pattern** to encapsulate state logic into separate classes:

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_2.png" title="State Pattern - General Structure" %}

### **State Pattern Components:**

1. **State Interface**
   - Defines common interface for all states
   - Ensures consistent behavior across states

2. **Concrete States**
   - Each state implements the interface
   - Contains state-specific behavior logic

3. **Context**
   - Maintains current state reference
   - Delegates requests to current state object

**Benefits:**

- **Reduced coupling** between context and state logic
- **Single responsibility** for each state class
- **Easy extension** without modifying existing code

---

## 🛠️ **Implementation: Water Dispenser State Machine**

Here's the complete implementation using the State Pattern:

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_3.png" title="Water Dispenser State Implementation" %}

### **1. State Interface**

```kotlin
interface WaterDispenserState {
    fun handleRequest()
    fun getStateName(): String
}
```

### **2. Concrete State Classes**

```kotlin
class HeatingState : WaterDispenserState {
    override fun handleRequest() {
        println("🔥 Heating: Water temperature is rising, please wait...")
    }

    override fun getStateName(): String = "Heating"
}

class CoolingState : WaterDispenserState {
    override fun handleRequest() {
        println("❄️ Cooling: Water temperature is decreasing, please wait...")
    }

    override fun getStateName(): String = "Cooling"
}

class StandbyState : WaterDispenserState {
    override fun handleRequest() {
        println("⏸️ Standby: Water dispenser maintains current temperature, ready to use.")
    }

    override fun getStateName(): String = "Standby"
}
```

### **3. Context Class**

```kotlin
class WaterDispenser {
    private var currentState: WaterDispenserState = StandbyState()
    private var temperature: Int = 25 // Default room temperature

    fun setState(state: WaterDispenserState) {
        currentState = state
        println("🔄 State Transition: ${state.getStateName()}")
    }

    fun pressButton() {
        currentState.handleRequest()
    }

    fun getCurrentState(): String = currentState.getStateName()

    fun getTemperature(): Int = temperature
}
```

### **4. Client Code**

```kotlin
fun main() {
    val dispenser = WaterDispenser()

    // Initial state: Standby
    println("=== Water Dispenser State Machine Demo ===")
    dispenser.pressButton()

    // Switch to heating state
    dispenser.setState(HeatingState())
    dispenser.pressButton()

    // Switch to cooling state
    dispenser.setState(CoolingState())
    dispenser.pressButton()

    // Return to standby state
    dispenser.setState(StandbyState())
    dispenser.pressButton()
}
```

**Expected Output:**

```
=== Water Dispenser State Machine Demo ===
⏸️ Standby: Water dispenser maintains current temperature, ready to use.
🔄 State Transition: Heating
🔥 Heating: Water temperature is rising, please wait...
🔄 State Transition: Cooling
❄️ Cooling: Water temperature is decreasing, please wait...
🔄 State Transition: Standby
⏸️ Standby: Water dispenser maintains current temperature, ready to use.
```

---

## 🔧 **Advanced Implementation: Enhanced State Machine**

Let's create a more sophisticated version with state transitions and validation:

```kotlin
interface State {
    fun enter()
    fun exit()
    fun handleRequest()
    fun canTransitionTo(newState: State): Boolean
}

class EnhancedWaterDispenser {
    private var currentState: State = StandbyState()
    private var temperature: Int = 25

    fun setState(newState: State) {
        if (currentState.canTransitionTo(newState)) {
            currentState.exit()
            currentState = newState
            currentState.enter()
        } else {
            println("❌ Invalid state transition from ${currentState::class.simpleName} to ${newState::class.simpleName}")
        }
    }

    fun pressButton() {
        currentState.handleRequest()
    }
}
```

---

## 📊 **State Pattern vs Alternative Approaches**

| Approach           | Pros                                                                   | Cons                                           |
| ------------------ | ---------------------------------------------------------------------- | ---------------------------------------------- |
| **State Pattern**  | ✅ Clean separation of concerns<br>✅ Easy to extend<br>✅ Follows OCP | ❌ More classes<br>❌ Slight overhead          |
| **If-Else Chains** | ✅ Simple for few states                                               | ❌ Hard to maintain<br>❌ Violates OCP         |
| **Enum-Based**     | ✅ Type-safe<br>✅ Compact                                             | ❌ Mixed responsibilities<br>❌ Hard to extend |

---

## 🎯 **When to Use the State Pattern**

### **✅ Perfect For:**

- **Complex state machines** with many states
- **Objects with state-dependent behavior**
- **UI components** with multiple states
- **Game development** (character states, AI)
- **Workflow engines** and business processes

### **❌ Avoid When:**

- **Simple state logic** (use if-else instead)
- **Performance-critical** applications
- **Few states** with simple transitions

---

## 🔗 **Related Design Patterns**

- **Strategy Pattern**: Similar structure, but for algorithms rather than states
- **Command Pattern**: Can be used together for state transitions
- **Observer Pattern**: For notifying about state changes
- **Memento Pattern**: For saving and restoring state

---

## 📈 **Real-World Applications**

### **1. Game Development**

```kotlin
// Character states in a game
interface CharacterState {
    fun move()
    fun attack()
    fun defend()
}

class IdleState : CharacterState { /* Implementation */ }
class WalkingState : CharacterState { /* Implementation */ }
class FightingState : CharacterState { /* Implementation */ }
```

### **2. Network Connection Management**

```kotlin
// Network connection states
interface ConnectionState {
    fun connect()
    fun disconnect()
    fun send(data: String)
}

class DisconnectedState : ConnectionState { /* Implementation */ }
class ConnectingState : ConnectionState { /* Implementation */ }
class ConnectedState : ConnectionState { /* Implementation */ }
```

### **3. Order Processing System**

```kotlin
// E-commerce order states
interface OrderState {
    fun process()
    fun cancel()
    fun ship()
}

class PendingState : OrderState { /* Implementation */ }
class ProcessingState : OrderState { /* Implementation */ }
class ShippedState : OrderState { /* Implementation */ }
```

---

## 🚨 **Common Pitfalls and Best Practices**

### **1. State Transition Validation**

```kotlin
// ❌ Avoid: No validation
fun setState(newState: State) {
    currentState = newState
}

// ✅ Prefer: Validate transitions
fun setState(newState: State) {
    if (currentState.canTransitionTo(newState)) {
        currentState = newState
    }
}
```

### **2. State Encapsulation**

```kotlin
// ❌ Avoid: Exposing state directly
class Context {
    var state: State = IdleState()
}

// ✅ Prefer: Encapsulate state
class Context {
    private var state: State = IdleState()
    fun setState(newState: State) { /* Implementation */ }
}
```

### **3. State-Specific Data**

```kotlin
// ✅ Good: State-specific data handling
class HeatingState : WaterDispenserState {
    private var targetTemperature: Int = 80

    override fun handleRequest() {
        // Use targetTemperature for heating logic
    }
}
```

---

## 🔗 **Related Articles**

- [Design Pattern 1: Object-Oriented Concepts](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [Design Pattern 2: Design Principles](/2024-07-03-design-pattern-2-design-principle)
- [Strategy Pattern](/2024-12-26-design-pattern-25-strategy-pattern)
- [Command Pattern](/2024-12-21-design-pattern-19-command-pattern)
- [Observer Pattern](/2024-12-24-design-pattern-23-observer-pattern)

---

## ✅ **Conclusion**

Through the State Pattern, we successfully separated the water dispenser's state logic from its core functionality, achieving the following benefits:

**Key Advantages:**

- 🎯 **Reduced coupling** - State logic isolated from main class
- 🔧 **Single responsibility** - Each state class focuses on its behavior
- 📈 **Easy extension** - Add new states without modifying existing code
- 🛡️ **Better maintainability** - Clear separation of concerns

**Design Principles Followed:**

- **Single Responsibility Principle (SRP)**: Each state class has one responsibility
- **Open-Closed Principle (OCP)**: Open for extension, closed for modification
- **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions

**Perfect For:**

- **ATM machines** (card inserted, processing, card ejected)
- **Document editors** (editing, viewing, printing modes)
- **Game characters** (idle, walking, fighting states)
- **Network protocols** (connecting, connected, disconnected)

The State Pattern makes your code structure more flexible and is the best choice for developing state-driven applications!

---

**💡 Pro Tip:** Combine the State Pattern with the Observer Pattern to notify other objects when state changes occur.

**🔔 Stay Updated:** Follow our Design Pattern series for more software architecture insights!
