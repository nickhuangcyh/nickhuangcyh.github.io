---
layout: post
title: "Design Pattern (10) - Singleton Pattern Complete Tutorial - Ensuring Single Instance with Global Access"
date: 2024-08-10 15:00:00 +0800
description: "Deep dive into Singleton Pattern - how to ensure a class has only one instance and provide global access point"
excerpt: "Complete analysis of Singleton Pattern implementation and application in software design - how to ensure a class has only one instance and provide global access point. Includes multiple implementation approaches - lazy initialization, thread safety, double-checked locking, etc. Suitable for database connection management, system configuration, logger, cache management scenarios. Essential tutorial for learning object-oriented programming and improving software architecture skills."
tags: [singleton-pattern, design-patterns, creational-patterns, software-architecture, object-oriented-programming, thread-safety, lazy-initialization, global-access, database-connection, system-design]
categories: [design-patterns, software-engineering, programming, system-architecture]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Preface

In previous articles, we've learned about the Prototype Pattern, which is the second-to-last member of creational design patterns. Today we'll introduce the last important member of creational patterns - the Singleton Pattern.

The Singleton Pattern is the most widely known creational design pattern that almost every software engineer encounters in object-oriented programming. Its core purpose is to ensure that a class can only have one instance in the entire system architecture and provide a global access point. This is very important for resource management and system performance optimization.

## Requirements Background

Suppose we receive a specific development requirement: build an enterprise-level application that needs frequent and continuous data interaction with a database.

To ensure database connection efficiency and reasonable system resource utilization, we need to design a unified database connection management system. This system must be able to centrally manage all database operations while avoiding resource waste.

## Initial Design Analysis (OOA)

After understanding the requirements, let's conduct object-oriented analysis to design a basic database operation class:

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_1.png" title="design_pattern_singleton_pattern_uml_1" %}

In this initial design, the `DatabaseClient` class contains standard CRUD (Create, Read, Update, Delete) four basic operation methods, plus a standard constructor to create `DatabaseClient` instances.

This direct design approach looks simple, but it brings some key challenges in actual enterprise applications.

## Problem Analysis (Forces)

When we use the above simple design in enterprise applications, we encounter the following key problems:

### Resource Management Issues
In enterprise-level systems, each database connection consumes significant system resources (memory, network connections, threads). If we repeatedly create multiple `DatabaseClient` instances in different places, it will cause resource exhaustion and performance degradation.

### Data Consistency Issues
In multi-threaded environments, if different program modules use different database connection instances, it may lead to transaction state inconsistency, data synchronization problems, and other serious situations.

### Performance Cost Issues
Database connection establishment and destruction are time-consuming operations. Frequently creating and closing connections not only affects system performance but also increases program complexity and maintenance difficulty.

These problems all point to the same solution direction: we need a unified database connection management mechanism.

## Singleton Pattern Solution

After identifying the core problems, we can apply the Singleton Pattern to fundamentally solve these challenges. The core concept of the Singleton Pattern is to ensure that only one instance of a certain class can exist in the entire system.

### Pattern Structure Design
Let's first look at the standard UML structure of the Singleton Pattern:

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_2.png" title="design_pattern_singleton_pattern_uml_2" %}

### Core Implementation Mechanism
The Singleton Pattern's implementation mechanism is quite elegant and practical:

1. **Lazy Initialization**: Obtain instances through the `getInstance()` static method, not directly exposing the constructor.

2. **Instance State Check**: Every time `getInstance()` is called, it checks whether the internal `instance` property is `null`.

3. **Conditional Creation**: If `instance` is `null`, create a new instance and store it; if not `null`, directly return the existing `instance`.

This mechanism can absolutely guarantee that only one instance of this class exists from a thread safety perspective.

### Applying to Database Connection Management

Now let's apply the Singleton Pattern to `DatabaseClient` design:

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_3.png" title="design_pattern_singleton_pattern_uml_3" %}

By introducing the Singleton Pattern, `DatabaseClient` now has the following characteristics:

- **Unified Entry Point**: All database operations go through the same `DatabaseClient` instance
- **Resource Conservation**: The entire system maintains only one database connection instance
- **State Consistency**: All database operations are performed on the same connection, ensuring data consistency

This design gives us a more robust and efficient database management architecture.

## Program Implementation (OOP)

After understanding the design concept, let's proceed with concrete code implementation. Let's see how to implement the standard Singleton Pattern in Kotlin:

[DatabaseClient]

```kotlin
class DatabaseClient {

    fun create(tableName:String, data: Map<String, Any>): Int {
        return 0
    }

    fun read(tableName:String, conditions: Map<String, Any>): Int {
        return 0
    }

    fun update(tableName:String, data: Map<String, Any>, conditions: Map<String, Any>): Int {
        return 0
    }

    fun delete(tableName:String, conditions: Map<String, Any>): Int {
        return 0
    }

    companion object {
        var mInstance: DatabaseClient? = null
        fun getInstance(): DatabaseClient {
            if (mInstance == null) {
                mInstance = DatabaseClient()
            }
            return mInstance!!
        }
    }
}
```

[Client]

```kotlin
fun main() {
    val db = DatabaseClient.getInstance()
    db.create("test", mapOf(Pair("test", "123")))
}
```

### Standard Singleton Pattern Implementation

The above demonstrates the standard implementation of the Singleton Pattern. This implementation follows classic design pattern principles and is applicable to various programming languages.

### Kotlin Language's Elegant Implementation

It's worth mentioning that Kotlin provides the `object` keyword, allowing us to implement the Singleton Pattern more concisely:

[DatabaseClient]

```kotlin
object DatabaseClient {

    fun create(tableName:String, data: Map<String, Any>): Int {
        return 0
    }

    fun read(tableName:String, conditions: Map<String, Any>): Int {
        return 0
    }

    fun update(tableName:String, data: Map<String, Any>, conditions: Map<String, Any>): Int {
        return 0
    }

    fun delete(tableName:String, conditions: Map<String, Any>): Int {
        return 0
    }
}
```

[Client]

```kotlin
fun main() {
    val db = DatabaseClient
    db.create("test", mapOf(Pair("test", "123")))
}
```

### Language Feature Advantages

Using Kotlin's `object` keyword, we get the following advantages:

- **Automatic Thread Safety**: Kotlin compiler guarantees thread-safe initialization of `object`
- **Lazy Loading**: Only initializes the instance when first accessed
- **Concise Syntax**: No need to manually implement `getInstance()` method and null checks
- **Simplified Usage**: Can access directly through class name, more intuitive

This is syntactic sugar that modern programming languages provide for common design patterns, allowing developers to use the Singleton Pattern more easily.

## Series Summary

At this point, we've completed the learning journey of all Creational Design Patterns. From Factory Method's object creation abstraction, to Abstract Factory's product family management, to Builder's complex object construction, Prototype's object cloning technology, and finally Singleton's global instance management.

In the next phase, we'll begin exploring Structural Design Patterns. Structural patterns mainly focus on how to combine classes and objects to build larger structures while maintaining system flexibility and extensibility. Let's look forward to the exciting content of upcoming patterns like Adapter, Bridge, Composite, and others!