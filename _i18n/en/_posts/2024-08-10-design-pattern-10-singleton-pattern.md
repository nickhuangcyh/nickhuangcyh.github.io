---
layout: post
title: "Design Pattern 10: Singleton Pattern - Ensuring Single Instance Access for Database Connections and Global State Management"
date: 2024-08-10 15:00:00 +0800
description: "Master the Singleton Pattern to ensure only one instance of a class exists. Learn how to implement thread-safe singletons for database connections, logging systems, and global configuration management with best practices."
tags:
  [
    Singleton Pattern,
    Design Patterns,
    Global State,
    Database Connection,
    Thread Safety,
    Resource Management,
    Software Architecture,
    Kotlin,
    Java,
    Swift,
    Lazy Initialization,
  ]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Database]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Power of Single Instance Control

The Singleton Pattern is a creational design pattern that ensures a class has only one instance and provides a global point of access to that instance. This pattern is essential for managing shared resources, global state, and ensuring consistent behavior across an application.

## Real-World Applications

The Singleton Pattern is widely used in:

- **Database Connections**: Managing connection pools and ensuring single connection instance
- **Logging Systems**: Centralized logging with consistent configuration
- **Configuration Management**: Global application settings and preferences
- **Cache Management**: Shared cache instances across the application
- **Service Locators**: Centralized service management and dependency injection

## Problem Statement: Database Connection Management

We need to develop an application that frequently interacts with a database. To ensure efficient database connections and proper resource management, we need to design a system that manages database connections effectively.

## Object-Oriented Analysis (OOA)

Let's analyze the requirements and design our initial solution:

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_1.png" title="Initial database client design without Singleton Pattern" %}

We have CRUD operations and a constructor to create DatabaseClient instances.

## Identifying Design Forces

Without the Singleton Pattern, we encounter several challenges:

1. **Resource Management**: Multiple database connections consume excessive resources, leading to performance degradation
2. **Consistency**: Need to ensure all database operations use the same connection to avoid data inconsistency
3. **Efficiency**: Frequent creation and destruction of database connections reduces system efficiency
4. **Connection Limits**: Database servers often have connection limits that can be exceeded

## Applying Singleton Pattern Solution

The Singleton Pattern provides an elegant solution by ensuring only one instance exists throughout the application lifecycle.

### Singleton Pattern UML Structure

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_2.png" title="Singleton Pattern UML diagram" %}

The Singleton pattern uses a `getInstance()` method to retrieve the instance, checking if the internal `instance` property is null. If null, it creates a new instance; otherwise, it returns the existing instance, ensuring only one instance exists.

### Applied to Database Client

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_3.png" title="Database client with Singleton Pattern" %}

## Implementation: Object-Oriented Programming (OOP)

### Basic Singleton Implementation

```kotlin
class DatabaseClient {
    fun create(tableName: String, data: Map<String, Any>): Int {
        println("Creating record in $tableName")
        return 1
    }

    fun read(tableName: String, conditions: Map<String, Any>): Int {
        println("Reading from $tableName")
        return 1
    }

    fun update(tableName: String, data: Map<String, Any>, conditions: Map<String, Any>): Int {
        println("Updating $tableName")
        return 1
    }

    fun delete(tableName: String, conditions: Map<String, Any>): Int {
        println("Deleting from $tableName")
        return 1
    }

    companion object {
        @Volatile
        private var instance: DatabaseClient? = null

        fun getInstance(): DatabaseClient {
            return instance ?: synchronized(this) {
                instance ?: DatabaseClient().also { instance = it }
            }
        }
    }
}
```

### Client Usage

```kotlin
fun main() {
    val db1 = DatabaseClient.getInstance()
    val db2 = DatabaseClient.getInstance()

    println("Are instances the same? ${db1 === db2}") // true

    db1.create("users", mapOf("name" to "John", "email" to "john@example.com"))
    db2.read("users", mapOf("name" to "John"))
}
```

### Kotlin Object Declaration (Simplified Singleton)

Kotlin provides a built-in `object` declaration that automatically implements the Singleton pattern:

```kotlin
object DatabaseClient {
    fun create(tableName: String, data: Map<String, Any>): Int {
        println("Creating record in $tableName")
        return 1
    }

    fun read(tableName: String, conditions: Map<String, Any>): Int {
        println("Reading from $tableName")
        return 1
    }

    fun update(tableName: String, data: Map<String, Any>, conditions: Map<String, Any>): Int {
        println("Updating $tableName")
        return 1
    }

    fun delete(tableName: String, conditions: Map<String, Any>): Int {
        println("Deleting from $tableName")
        return 1
    }
}
```

### Client Usage with Object Declaration

```kotlin
fun main() {
    val db = DatabaseClient // Direct access, no getInstance() needed
    db.create("users", mapOf("name" to "John", "email" to "john@example.com"))
}
```

## Advanced Implementation: Thread-Safe Singleton

### Double-Checked Locking Pattern

```kotlin
class ThreadSafeDatabaseClient private constructor() {
    fun create(tableName: String, data: Map<String, Any>): Int {
        println("Creating record in $tableName")
        return 1
    }

    fun read(tableName: String, conditions: Map<String, Any>): Int {
        println("Reading from $tableName")
        return 1
    }

    fun update(tableName: String, data: Map<String, Any>, conditions: Map<String, Any>): Int {
        println("Updating $tableName")
        return 1
    }

    fun delete(tableName: String, conditions: Map<String, Any>): Int {
        println("Deleting from $tableName")
        return 1
    }

    companion object {
        @Volatile
        private var instance: ThreadSafeDatabaseClient? = null

        fun getInstance(): ThreadSafeDatabaseClient {
            return instance ?: synchronized(this) {
                instance ?: ThreadSafeDatabaseClient().also { instance = it }
            }
        }
    }
}
```

### Lazy Initialization with Delegate

```kotlin
class LazyDatabaseClient private constructor() {
    fun create(tableName: String, data: Map<String, Any>): Int {
        println("Creating record in $tableName")
        return 1
    }

    fun read(tableName: String, conditions: Map<String, Any>): Int {
        println("Reading from $tableName")
        return 1
    }

    fun update(tableName: String, data: Map<String, Any>, conditions: Map<String, Any>): Int {
        println("Updating $tableName")
        return 1
    }

    fun delete(tableName: String, conditions: Map<String, Any>): Int {
        println("Deleting from $tableName")
        return 1
    }

    companion object {
        val instance: LazyDatabaseClient by lazy { LazyDatabaseClient() }
    }
}
```

## Real-World Example: Configuration Manager

```kotlin
object ConfigurationManager {
    private val properties = mutableMapOf<String, String>()

    init {
        // Load configuration from file or environment
        properties["database.url"] = System.getenv("DB_URL") ?: "localhost:5432"
        properties["database.username"] = System.getenv("DB_USERNAME") ?: "default"
        properties["database.password"] = System.getenv("DB_PASSWORD") ?: "password"
        properties["app.environment"] = System.getenv("APP_ENV") ?: "development"
    }

    fun getProperty(key: String): String? {
        return properties[key]
    }

    fun setProperty(key: String, value: String) {
        properties[key] = value
    }

    fun getAllProperties(): Map<String, String> {
        return properties.toMap()
    }
}

// Usage
fun main() {
    val dbUrl = ConfigurationManager.getProperty("database.url")
    println("Database URL: $dbUrl")

    ConfigurationManager.setProperty("app.debug", "true")
    println("Debug mode: ${ConfigurationManager.getProperty("app.debug")}")
}
```

## Best Practices and Considerations

### 1. **Thread Safety**

```kotlin
// Good: Thread-safe singleton
object ThreadSafeSingleton {
    private val lock = Any()
    @Volatile
    private var instance: ThreadSafeSingleton? = null

    fun getInstance(): ThreadSafeSingleton {
        return instance ?: synchronized(lock) {
            instance ?: ThreadSafeSingleton().also { instance = it }
        }
    }
}

// Avoid: Non-thread-safe singleton
class BadSingleton {
    companion object {
        private var instance: BadSingleton? = null

        fun getInstance(): BadSingleton {
            if (instance == null) {
                instance = BadSingleton() // Race condition!
            }
            return instance!!
        }
    }
}
```

### 2. **Lazy Initialization**

```kotlin
// Good: Lazy initialization
object LazySingleton {
    val instance by lazy {
        // Expensive initialization
        ExpensiveObject()
    }
}

// Avoid: Eager initialization
object EagerSingleton {
    val instance = ExpensiveObject() // Created immediately
}
```

### 3. **Testing Considerations**

```kotlin
// Good: Testable singleton
class TestableDatabaseClient private constructor() {
    companion object {
        @Volatile
        private var instance: TestableDatabaseClient? = null

        fun getInstance(): TestableDatabaseClient {
            return instance ?: synchronized(this) {
                instance ?: TestableDatabaseClient().also { instance = it }
            }
        }

        // For testing
        fun resetInstance() {
            instance = null
        }
    }
}
```

## Performance Comparison

| Implementation         | Thread Safety | Performance | Memory Usage | Complexity |
| ---------------------- | ------------- | ----------- | ------------ | ---------- |
| Eager Singleton        | Yes           | High        | High         | Low        |
| Lazy Singleton         | Yes           | Medium      | Low          | Medium     |
| Double-Checked Locking | Yes           | High        | Low          | High       |
| Kotlin Object          | Yes           | High        | Low          | Low        |

## Common Anti-Patterns to Avoid

### 1. **Global State Abuse**

```kotlin
// Avoid: Using singleton for everything
object GlobalState {
    var userData: MutableMap<String, Any> = mutableMapOf()
    var appSettings: MutableMap<String, Any> = mutableMapOf()
    var cache: MutableMap<String, Any> = mutableMapOf()
}
```

### 2. **Tight Coupling**

```kotlin
// Avoid: Direct singleton dependency
class UserService {
    fun createUser(user: User) {
        DatabaseClient.getInstance().create("users", user.toMap())
    }
}

// Better: Dependency injection
class UserService(private val databaseClient: DatabaseClient) {
    fun createUser(user: User) {
        databaseClient.create("users", user.toMap())
    }
}
```

## Related Design Patterns

- **Factory Method**: Creates objects without specifying exact classes
- **Abstract Factory**: Creates families of related objects
- **Builder**: Constructs complex objects step by step
- **Prototype**: Creates new objects by cloning existing ones

## Conclusion

The Singleton Pattern provides a powerful way to ensure only one instance of a class exists while providing global access. Key benefits include:

- **Resource Management**: Efficient use of system resources
- **Consistency**: Ensures consistent state across the application
- **Global Access**: Provides easy access to shared resources
- **Performance**: Avoids repeated object creation overhead

This pattern is essential for managing shared resources like database connections, logging systems, and configuration management.

## Related Articles

- [Design Pattern 9: Prototype Pattern](/2024-07-19-design-pattern-9-prototype-pattern/)
- [Design Pattern 11: Adapter Pattern](/2024-12-07-design-pattern-11-adapter-pattern/)
- [Design Pattern 7: Abstract Factory Pattern](/2024-07-08-design-pattern-7-abstract-factory-pattern/)
- [Object-Oriented Design Principles](/2024-07-03-design-pattern-2-design-principle/)
