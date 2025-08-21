---
layout: post
title: "Design Pattern (18) Chain of Responsibility Pattern: Dynamic Log Processing System Design Guide"
date: 2024-12-16 23:00:00 +0800
description: "Complete analysis of Chain of Responsibility Pattern implementation techniques, learn to design flexible log systems through dynamic processing chains, master core applications and best practices of behavioral design patterns."
tags: [Design Patterns, Chain of Responsibility, Behavioral Patterns, Software Architecture, OOP, Kotlin, Java, Logging System, Design Principles]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Requirements

## Entering the World of Behavioral Patterns

Welcome to an important milestone in the Design Pattern series! In previous articles, we explored structural patterns in depth, including [Flyweight Pattern](/en/blog/2024/design-pattern-16-flyweight-pattern/) and [Proxy Pattern](/en/blog/2024/design-pattern-17-proxy-pattern/). These patterns primarily focus on how objects and classes combine to form larger structures.

Starting today, we officially enter the study of **Behavioral Patterns**. Unlike [structural patterns](/en/blog/2024/design-pattern-11-adapter-pattern/), behavioral patterns don't focus on object structure. Instead, they concentrate on how objects interact, communicate, and collaborate to accomplish complex tasks.

## Our Requirement: Intelligent Log Processing System

Today our task is to design a highly flexible log processing system. In modern software development, logging systems often need to support multiple different output destinations and processing strategies.

To build a truly practical system, we need to meet the following three core requirements:

**1. Multi-level Log Output Support**

The system must support multiple log output methods simultaneously. For example, console display (Console), file logging (File), and database storage (Database).

Importantly, different log levels may need to use different output channels. This allows the system to choose appropriate storage methods based on message importance.

**2. Dynamic Processing Chain Flexibility**

The system should be able to dynamically adjust the combination and order of processors based on different requirement scenarios. For example, development environments might only need console output, while production environments might need to write to both files and databases.

This flexible design allows the same system to adapt to various deployment environments.

**3. Scalability and Independence**

The responsibility of each log processor should be independent of each other. More importantly, the system should be able to easily add new processors without modifying existing code.

This ensures system stability while reserving space for future feature expansion.

## Object-Oriented Analysis (OOA)

After understanding the requirements, let's quickly implement object-oriented analysis!

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_1.png" title="design_pattern_chain_of_responsibility_pattern_uml_1" %}

## Recognizing Forces

## Challenges and Limitations of Traditional Approaches

Without appropriate design patterns, directly implementing a multi-level log processing system faces three main challenges:

**1. Tight Coupling and Complexity Issues**

If the client directly manages all log processors, it will lead to very complex code. Imagine that the client needs to know which processors to use for each log level. It also needs to know how to choose the correct output method in different environments.

This tight coupling makes code difficult to understand and maintain. Every time log processing logic needs to be adjusted, the client code must be deeply modified.

**2. Lack of Dynamic Adjustment Capability**

Traditional approaches lack flexibility and make it difficult to dynamically change processing strategies at runtime. For example, if you want to use different log configurations in different environments, it becomes very difficult.

Another common requirement is to dynamically adjust log levels based on system load. Such flexible adjustments are almost impossible to achieve in traditional architectures.

**3. Conflict Between Scalability and Stability**

Every time a new log processing method needs to be added (such as supporting new databases or cloud log services), the client's core logic must be modified. This approach clearly violates the Open-Closed Principle.

Worse, every modification may introduce new defects, affecting system stability. This makes system maintenance a nightmare.

**Solution-Oriented**

Facing these challenges, we need a mechanism that can connect request handlers into a chain. This mechanism allows requests to flow dynamically along this chain until they find an appropriate handler.

This is the essence of the Chain of Responsibility pattern.

## Applying Chain of Responsibility Pattern (Solution) to Get New Context (Resulting Context)

## Solution Philosophy of Chain of Responsibility Pattern

The Chain of Responsibility Pattern provides us with an elegant solution. Its core idea is to connect multiple handlers into a chain, allowing requests to be passed along this chain until they are handled by an appropriate handler.

This design has three important advantages:

- **Decouple sender and receiver**: The request sender doesn't need to know which specific handler will process the request
- **Dynamic composition**: The structure of the processing chain can be dynamically changed at runtime
- **Independent processing**: Each handler only needs to focus on its own responsibility scope

**Pattern Structure Overview**

Let's first understand the general structure of the Chain of Responsibility pattern:

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_2.png" title="design_pattern_chain_of_responsibility_pattern_uml_2" %}

The Chain of Responsibility pattern enables log requests to flow dynamically along the chain by connecting multiple processors into an intelligent responsibility chain, until they find an appropriate handler.

This design not only significantly reduces coupling between system components but also provides the system with powerful flexibility and scalability.

**Core Pattern Roles**

The Chain of Responsibility pattern includes three main roles, each bearing clear responsibilities:

**Handler (Abstract Handler Class)**

Defines the standard interface for handling requests and contains a reference to the next handler. It also provides a general method for passing requests to the next handler, ensuring chain continuity.

**ConcreteHandler (Concrete Handler)**

Implements specific processing logic. Each concrete handler checks whether the request meets its handling conditions. If it matches, it processes; otherwise, it passes to the next handler.

In our example, these are `ConsoleLogger`, `FileLogger`, and `DatabaseLogger`.

**Client**

Responsible for sending log requests and setting up the chain structure configuration during initialization. Once the chain structure is established, the client only needs to pass requests to the first handler in the chain.

**Application to Log Processing System**

Now let's apply this behavioral pattern to our intelligent log processing system:

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_3.png" title="design_pattern_chain_of_responsibility_pattern_uml_3" %}

## Object-Oriented Programming (OOP)

**Step 1: Define Abstract Handler Class**

The `Logger` abstract class serves as the foundation for all log handlers, defining the core structure of the responsibility chain:

```kotlin
abstract class Logger(private val nextLogger: Logger? = null) {

    abstract fun log(level: LogLevel, message: String)

    protected fun passToNext(level: LogLevel, message: String) {
        nextLogger?.log(level, message)
    }
}
```

[LogLevel Enum]

```kotlin
enum class LogLevel {
    INFO, WARNING, ERROR
}
```

**Step 2: Implement Concrete Handler - Console Logger**

`ConsoleLogger` handles general information (INFO) level logs, outputting content to the console:

```kotlin
class ConsoleLogger(nextLogger: Logger? = null) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level == LogLevel.INFO) {
            println("ConsoleLogger: $message")
        }
        passToNext(level, message)
    }
}
```

**Step 3: Implement Concrete Handler - File Logger**

`FileLogger` specifically handles warning (WARNING) level logs, writing important information to files for later review:

```kotlin
class FileLogger(nextLogger: Logger? = null) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level == LogLevel.WARNING) {
            println("FileLogger: $message")
        }
        passToNext(level, message)
    }
}
```

**Step 4: Implement Concrete Handler - Database Logger**

`DatabaseLogger` handles the highest priority error (ERROR) logs, permanently storing critical error messages in the database:

```kotlin
class DatabaseLogger(nextLogger: Logger? = null) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level == LogLevel.ERROR) {
            println("DatabaseLogger: $message")
        }
        passToNext(level, message)
    }
}
```

**Step 5: Build and Test the Responsibility Chain**

Now let's build a complete responsibility chain and test its performance at different log levels:

```kotlin
fun main() {
    val loggerChain = ConsoleLogger(FileLogger(DatabaseLogger()))

    println("Sending INFO log...")
    loggerChain.log(LogLevel.INFO, "This is an informational message.")

    println("\nSending WARNING log...")
    loggerChain.log(LogLevel.WARNING, "This is a warning message.")

    println("\nSending ERROR log...")
    loggerChain.log(LogLevel.ERROR, "This is an error message.")
}
```

**Execution Result Analysis**

From the following output results, we can clearly see the core characteristics of the Chain of Responsibility pattern:

```bash
Sending INFO log...
ConsoleLogger: This is an informational message.

Sending WARNING log...
FileLogger: This is a warning message.

Sending ERROR log...
DatabaseLogger: This is an error message.
```

We can see that each log level was passed to the correct handler. INFO level messages are handled by ConsoleLogger, WARNING level by FileLogger, and ERROR level by DatabaseLogger.

This demonstrates how the responsibility chain automatically routes requests to appropriate handlers based on request characteristics.

## Conclusion

## Core Value of Chain of Responsibility Pattern

By implementing the Chain of Responsibility pattern, we successfully solved all challenges faced in multi-level log processing:

**Dynamic Responsibility Assignment**

Each handler only focuses on its own responsibility scope, and the system can automatically route requests to the correct handler based on log level. This makes system behavior predictable and easy to understand.

**High Decoupling**

Client code only needs to pass log requests to the first handler in the chain, without needing to know which specific handler will process the request. This design significantly reduces system coupling.

**Excellent Scalability**

Adding new log handlers (such as cloud log services, email notifications, etc.) becomes very simple. Just create new concrete handler classes and insert them into the chain without modifying existing code.

## Characteristics of Behavioral Patterns

The Chain of Responsibility pattern perfectly demonstrates the core characteristics of behavioral patterns:

**Object Collaboration**

Unlike structural patterns that focus on object composition, the Chain of Responsibility pattern focuses on how objects collaborate to complete tasks. Each handler knows how to communicate with the next handler.

**Dynamic Behavior**

This pattern supports dynamically changing the processing chain structure at runtime to adapt to different business scenarios. This allows the system to flexibly respond to various changes.

**Responsibility Separation**

Each handler has a clear single responsibility, adhering to the Single Responsibility Principle. This makes code easier to maintain and test.

## Common Application Scenarios

The Chain of Responsibility pattern has many practical applications in software development:

**1. Request Validation Systems**

Multi-level permission checking, input validation, business rule validation. Each validator focuses on specific check items, ensuring system security.

**2. Web Middleware**

Authentication, logging, performance monitoring, error handling, etc. These middleware form a processing pipeline that handles HTTP requests sequentially.

**3. Event Processing Systems**

Mouse events and keyboard events propagating through component hierarchies in GUIs. Events propagate up or down the component tree until they find suitable handlers.

**4. Workflow Systems**

Approval processes for different departments or roles. Documents or requests go through various approval stages sequentially, with each stage having a clear scope of responsibility.

**Universal Value of the Pattern**

These application scenarios all reflect the core advantages of the Chain of Responsibility pattern: decomposing complex processing logic into multiple independent handlers. Through chain structures, they achieve flexible collaboration, providing strong maintainability and scalability for system design.

## Series Navigation

### Behavioral Design Patterns Series
- [Command Pattern](/en/blog/2024/design-pattern-19-command-pattern/) - Encapsulate requests as objects, support operation undo and redo
- [Iterator Pattern](/en/blog/2024/design-pattern-20-iterator-pattern/) - Provide standard methods for sequentially accessing aggregate objects
- [Mediator Pattern](/en/blog/2024/design-pattern-21-mediator-pattern/) - Define interaction methods between objects, reducing coupling
- [Observer Pattern](/en/blog/2024/design-pattern-23-observer-pattern/) - Implement event-driven notification mechanisms

### Structural Design Patterns Series
- [Adapter Pattern](/en/blog/2024/design-pattern-11-adapter-pattern/) - Enable incompatible interfaces to work together
- [Bridge Pattern](/en/blog/2024/design-pattern-12-bridge-pattern/) - Separate abstraction from implementation, support independent evolution

### Creational Design Patterns Foundation
- [Design Pattern Concepts](/en/blog/2024/design-pattern-3-design-pattern/) - Understand basic design pattern concepts
- [Design Principles](/en/blog/2024/design-pattern-2-design-principle/) - Master SOLID principles and design foundations

Through the Chain of Responsibility pattern, we learned how to design dynamic and flexible request processing mechanisms. In the next article, we will explore another important behavioral pattern, continuing our deep dive into object collaboration design techniques.