---
layout: post
title: "Design Pattern (24) State Pattern: Smart Water Dispenser State Management, Implementing Dynamic Object Behavior Switching"
date: 2024-12-22 15:00:00 +0800
description: "Deep analysis of State Pattern core concepts, through smart water dispenser system examples, learn how to elegantly manage object state transitions, reduce program coupling and improve system extensibility."
tags: [State Pattern, Design Patterns, Behavioral Patterns, State Management, Object Behavior, Software Architecture]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

---

## Requirements

Our task is to design a smart **water dispenser system**. This system needs to simulate real-life water dispenser operation modes.

### Core Functional Requirements

The water dispenser needs to support three operating states:
- **Heating**: Raising water temperature to hot water temperature
- **Cooling**: Lowering water temperature to cold water temperature
- **Standby**: Maintaining current water temperature, energy-saving mode

### Operation Requirements

Users can switch the water dispenser's operating state through buttons on the control panel. The water dispenser must execute corresponding correct behaviors based on its current state.

For example: When the water dispenser is in heating state, it can only perform heating actions and cannot simultaneously perform cooling operations. This state constraint ensures equipment operation safety and efficiency.

---

## Object-Oriented Analysis (OOA)

After understanding the requirements, let's perform object-oriented analysis to identify the system's core problems!

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_1.png" title="design_pattern_state_pattern_uml_1" %}

From the above diagram, we can see that traditional design approaches concentrate all state logic in the water dispenser class. This approach seems intuitive but actually brings many problems.

### Recognizing Forces

If we don't use design patterns and directly write state logic in the water dispenser class, we'll face the following three main challenges:

#### 1. **High Coupling**

State switching logic is tightly coupled with the water dispenser's core functionality. When we need to modify certain state behavior, we must deeply modify the water dispenser's main code.

This tight coupling makes code difficult to understand and maintain.

#### 2. **Violates Single Responsibility Principle (SRP)**

The water dispenser class takes on too many responsibilities. It must manage state transitions while implementing specific behavior logic for each state.

When the system becomes complex, this class becomes increasingly large and difficult to manage.

#### 3. **Hard to Extend**

When we need to add new states (such as "cleaning mode") or modify existing state behavior, we must modify the water dispenser's core logic.

This violates the Open-Closed Principle (OCP) and increases the risk of introducing new bugs.

---

## Applying State Pattern (Solution) to Get New Context (Resulting Context)

After completing object-oriented analysis and recognizing Forces, we now clearly grasp the entire problem context. Now we can apply **State Pattern** to solve these problems!

### State Pattern Solution

The core idea of **State Pattern** is to encapsulate each state's logic into independent classes. This approach can decompose complex state management problems into smaller, more manageable parts.

State Pattern has similar structure to [Strategy Pattern]({% post_url 2024-12-26-design-pattern-25-strategy-pattern %}), but their application scenarios differ: State Pattern focuses on state transitions and management, while Strategy Pattern concentrates on algorithm selection and replacement.

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_2.png" title="design_pattern_state_pattern_uml_2" %}

### Three Core Roles of State Pattern

State Pattern contains three important participants, each with clear responsibility division:

#### 1. **State (State Interface)**  

This is an abstract interface defining behavioral methods that all concrete states must implement. It provides a unified operation interface for different states.

#### 2. **ConcreteState (Concrete State)**  

Each concrete state class implements the State interface. Each state class focuses on handling specific behavioral logic for that state, with single and clear responsibilities.

#### 3. **Context**  

The context class is responsible for maintaining the current state object and providing external operation interfaces. When external requests operations, the context delegates requests to the current state object for processing.

### Advantages of Applying State Pattern

Through this design, we can achieve the following important improvements:

- **Reduced Coupling**: Water dispenser class only handles state management, specific behavior implementation is handled by respective state classes
- **Complies with Single Responsibility**: Each state class focuses on its own behavioral logic with clear responsibilities
- **Easy to Extend**: Adding or modifying states doesn't affect water dispenser's core logic, fully complying with Open-Closed Principle

### Practical Application Architecture

Let's apply State Pattern to the water dispenser system:

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_3.png" title="design_pattern_state_pattern_uml_3" %}

---

## Object-Oriented Design (OOP)

Now let's transform State Pattern theory into concrete code implementation. We'll gradually build each component, starting from the most basic interface.

### State Interface: WaterDispenserState

First define the state interface, which is the common contract for all concrete states:

```kotlin
interface WaterDispenserState {
    fun handleRequest()
}
```

This interface is very concise, defining only one `handleRequest()` method. Each concrete state must implement this method to define specific behavior for that state.

### Concrete States: HeatingState, CoolingState, StandbyState

Next implement three concrete state classes, each with its own unique behavioral logic:

```kotlin
class HeatingState : WaterDispenserState {
    override fun handleRequest() {
        println("Heating: Water temperature is rising, please wait...")
    }
}

class CoolingState : WaterDispenserState {
    override fun handleRequest() {
        println("Cooling: Water temperature is decreasing, please wait...")
    }
}

class StandbyState : WaterDispenserState {
    override fun handleRequest() {
        println("Standby: Water dispenser maintains current temperature, ready for use.")
    }
}
```

Each state class focuses on its core responsibility. This design makes code clearer and easier to unit test.

### Context Class: WaterDispenser

The water dispenser class serves as Context, responsible for managing current state and delegating requests:

```kotlin
class WaterDispenser {
    private var currentState: WaterDispenserState = StandbyState()

    fun setState(state: WaterDispenserState) {
        currentState = state
        println("State switched: ${state::class.simpleName}")
    }

    fun pressButton() {
        currentState.handleRequest()
    }
}
```

Note the design key points here:
- Water dispenser initial state is set to standby mode, which matches actual usage scenarios
- `setState()` method allows external state switching and provides visual state switching prompts
- `pressButton()` method delegates actual processing logic to current state object

### Client Program: Usage Example

Let's see how to use this state mechanism:

```kotlin
fun main() {
    val dispenser = WaterDispenser()

    // Initial state is standby
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

This example demonstrates the complete state switching process, simulating actual user operation of the water dispenser.

### Execution Results

After program execution, the following output is produced, clearly showing the state switching process:

```kotlin
Standby: Water dispenser maintains current temperature, ready for use.
State switched: HeatingState
Heating: Water temperature is rising, please wait...
State switched: CoolingState
Cooling: Water temperature is decreasing, please wait...
State switched: StandbyState
Standby: Water dispenser maintains current temperature, ready for use.
```

From the output, we can see that each state switch has clear prompts, and each state's behavior executes as expected.

## Conclusion

Through implementing State Pattern, we successfully separated the water dispenser's state logic from its core functionality. This transformation brings significant code quality improvements.

### Key Advantages Gained

#### 1. **Significantly Reduced Coupling**

The water dispenser class now only needs to focus on state switching and management without caring about specific implementation details of each state. Various state behavior implementations are completely handled by corresponding state classes, achieving true responsibility separation.

#### 2. **Fully Complies with Object-Oriented Design Principles**

Our design perfectly follows two important design principles:
- **Single Responsibility Principle (SRP)**: Each state class focuses only on its own behavioral logic with single and clear responsibilities
- **Open-Closed Principle (OCP)**: When adding new states, we only need to create new state classes without modifying any existing code

#### 3. **Excellent Extensibility**

When adding or modifying state behavior, these changes are completely confined to corresponding state classes without affecting any other parts of the system. This design gives the system excellent maintainability.

### Practical Application Scenarios

State Pattern is particularly suitable for handling systems with complex state transition logic. Here are some typical application scenarios:

#### Financial Systems
- **ATM Machines**: Different states like card insertion, password verification, operation selection, card ejection
- **Credit Card Systems**: State management for normal, frozen, overdue, cancelled states

#### Office Software
- **Document Editors**: Edit mode, view mode, print preview mode
- **Multimedia Players**: Play, pause, stop, fast forward states

#### Game Development
- **Character States**: Different behavioral states like moving, attacking, defending, injured
- **Game Levels**: State transitions for start, in progress, paused, ended

### Final Summary

**State Pattern** provides us with an elegant and powerful way to manage object state-related behaviors. It not only makes program structure more flexible and maintainable but is also the best choice when developing complex state mechanism applications.

When your system needs to change behavior based on object internal state, and these state transition logics are relatively complex, State Pattern will be your most reliable design partner!

In the behavioral design pattern series, State Pattern works together with [Observer Pattern]({% post_url 2024-12-24-design-pattern-23-observer-pattern %}), [Command Pattern]({% post_url 2024-12-21-design-pattern-19-command-pattern %}) and other patterns to form a complete behavior management toolkit. Mastering State Pattern will add important technical foundation to your software architecture design.