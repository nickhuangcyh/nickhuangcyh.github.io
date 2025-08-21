---
layout: post
title: Design Pattern (12) Bridge Pattern Complete Analysis: Decoupling Abstraction and Implementation, Building Flexible System Architecture
date: 2024-12-08 20:00:00 +0800
description: Deep dive into how the Bridge Pattern solves multi-dimensional design challenges by separating abstraction and implementation to avoid class explosion problems. Learn Bridge Pattern core concepts, UML design, Kotlin implementation, and best practices through a security system example.
tags: [Bridge Pattern, Design Pattern, Software Architecture, Structural Pattern, OOP Design, System Design, Kotlin Programming, Enterprise Development]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

In the previous Adapter Pattern article, we learned how to solve interface mismatch problems. Now let's continue exploring another important structural pattern: Bridge Pattern.

## Requirements

We received a complex enterprise-level requirement:

The company's smart **security system** needs to send alerts to relevant personnel through multiple communication channels when different security events are detected. This system needs to have high flexibility and scalability.

### Supported Notification Channels:
- **APNS** (Apple iOS Push Notification)
- **FCM** (Google Firebase Cloud Messaging)
- **Email** (Electronic Mail)
- **SMS** (Short Message Service)

### Alert Event Types:
- **Fire** (Fire Alarm)
- **Burglar** (Intrusion Alarm)

### System Requirements:
Each alert type should be able to be sent through any notification channel, and new alert types or notification methods may be added in the future.

## Object-Oriented Analysis (OOA)

Before starting the design, let's first conduct object-oriented analysis to understand the core components in the system and their relationships:

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_1.png" title="design_pattern_bridge_pattern_uml_1" %}

## Identifying Forces

When facing this type of multi-dimensional design problem, without using appropriate design patterns, we face the following challenges:

### 1. Combinatorial Explosion Problem
When we have 2 alert types and 4 notification methods, if we create a class for each combination:
- We need 2 × 4 = 8 concrete classes
- If we add one alert type, we need to add 4 more classes
- If we add one notification method, we need to add 2 more classes

### 2. Tight Coupling Problem
- **Alert types** and **notification methods** are forcibly bound together
- Modifying one dimension may affect multiple classes
- Dependencies between system parts are too tight

### 3. Poor Extensibility
- **Adding alert types**: Need to create corresponding classes for each notification method
- **Adding notification methods**: Need to create corresponding classes for each alert type
- Each extension may lead to large-scale code modifications

### 4. Code Duplication Problem
- Similar alert handling logic appears repeatedly in multiple classes
- Same notification method implementations are copied to multiple places
- When core logic needs modification, must update synchronously in multiple places

### 5. High Maintenance Cost
- Any change in one dimension may affect multiple classes
- Difficult to predict the impact scope of modifications
- System complexity grows exponentially with the number of combinations

## Applying Bridge Pattern (Solution) to Achieve New Context (Resulting Context)

After completing OOA, identifying Forces, and understanding the entire Context, we can apply the Bridge Pattern to solve this problem.

Let's first look at the UML of the Bridge Pattern:

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_2.png" title="design_pattern_bridge_pattern_uml_2" %}

- Abstraction: Defines notification functionality, responsible for using specific message sending methods to send notifications.
- RefinedAbstraction: Extends the abstraction layer, implementing different types of alert notifications, such as fire alarm notifications or burglar alarm notifications.
- Implementor: Defines the interface for message sending, responsible for handling specific message sending logic.
- ConcreteImplementor: Provides specific message sending implementations, such as APNS, FCM, Email, SMS.

Let's apply the Bridge Pattern to our application:

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_3.png" title="design_pattern_bridge_pattern_uml_3" %}

## Object-Oriented Programming (OOP)

[Abstraction: AlarmNotification]

```kotlin
abstract class AlarmNotification(sender: MessageSender) {
    protected var sender: MessageSender

    init {
        this.sender = sender
    }

    abstract fun notifyUser(details: String?)
}
```

[RefinedAbstraction: FireAlarmNotification and BurglarAlarmNotification]

```kotlin
class FireAlarmNotification(sender: MessageSender) : AlarmNotification(sender) {
    override fun notifyUser(details: String?) {
        sender.sendMessage("Fire Alarm: $details")
    }
}

class BurglarAlarmNotification(sender: MessageSender) : AlarmNotification(sender) {
    override fun notifyUser(details: String?) {
        sender.sendMessage("Theft Alarm: $details")
    }
}
```

[Implementor: MessageSender]

```kotlin
interface MessageSender {
    fun sendMessage(message: String?)
}
```

[ConcreteImplementor: APNSSender, FCMSender, EmailSender, and SMSSender]

```kotlin
class APNSSender : MessageSender {
    override fun sendMessage(message: String?) {
        println("Sending APNS Notification: $message")
    }
}

class FCMSender : MessageSender {
    override fun sendMessage(message: String?) {
        println("Sending FCM Notification: $message")
    }
}

class EmailSender : MessageSender {
    override fun sendMessage(message: String?) {
        println("Sending Email: $message")
    }
}

class SMSSender : MessageSender {
    override fun sendMessage(message: String?) {
        println("Sending SMS: $message")
    }
}
```

[Client]

```kotlin
fun main() {
    // Sending Fire Alarm via APNS
    val fireAPNS: AlarmNotification = FireAlarmNotification(APNSSender())
    fireAPNS.notifyUser("Smoke detected in Zone 1.")

    // Sending Burglar Alarm via FCM
    val burglarFCM: AlarmNotification = BurglarAlarmNotification(FCMSender())
    burglarFCM.notifyUser("Unauthorized access detected at Main Door.")

    // Sending Fire Alarm via Email
    val fireEmail: AlarmNotification = FireAlarmNotification(EmailSender())
    fireEmail.notifyUser("Temperature exceeds threshold in Zone 3.")

    // Sending Burglar Alarm via SMS
    val burglarSMS: AlarmNotification = BurglarAlarmNotification(SMSSender())
    burglarSMS.notifyUser("Motion detected in Warehouse.")
}
```

## Execution Results and Analysis

When we execute the above code, we get the following output:
```
Sending APNS Notification: Fire Alarm: Smoke detected in Zone 1.
Sending FCM Notification: Theft Alarm: Unauthorized access detected at Main Door.
Sending Email: Fire Alarm: Temperature exceeds threshold in Zone 3.
Sending SMS: Theft Alarm: Motion detected in Warehouse.
```

This result shows that different alert types can be combined with different notification methods, and the combination methods are very flexible.

## Conclusion

By applying the **Bridge Pattern**, we successfully solved the multi-dimensional design challenge:

### Benefits Achieved:

**1. Separation of Concerns**
- Alert types and notification methods are independent of each other and can evolve separately
- Modifying one dimension does not affect the other dimension

**2. Elegant Extensibility**
- Adding alert types: Only need to create a new RefinedAbstraction
- Adding notification methods: Only need to create a new ConcreteImplementor
- Avoids the combinatorial explosion problem

**3. Improved Code Reusability**
- Same notification methods can be reused by different alert types
- Same alert logic can work with different notification methods

**4. Reduced System Complexity**
- Number of classes reduced from O(m×n) to O(m+n)
- System understandability and maintainability greatly improved

### Applicable Scenarios:
Bridge Pattern is particularly suitable for:
- Systems that need to provide flexibility between abstraction and implementation
- Design problems with multiple combination dimensions
- Situations that need to dynamically switch implementation methods at runtime

Bridge Pattern, together with Adapter Pattern, forms two important foundations in structural patterns, laying a solid foundation for us to learn other more complex structural patterns later.