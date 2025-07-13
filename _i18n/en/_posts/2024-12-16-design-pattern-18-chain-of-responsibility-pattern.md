---
layout: post
title: "Design Pattern 18: Chain of Responsibility Pattern - Complete Guide with Real-World Logging Examples"
date: 2024-12-16 23:00:00 +0800
description: "Master the Chain of Responsibility Pattern with practical logging system examples. Learn how to create flexible request processing chains, implement dynamic handlers, and build extensible systems."
tags: [Chain of Responsibility Pattern, Design Patterns, Request Processing, Object-Oriented Design, Software Architecture, Kotlin, Programming, Behavioral Patterns, Logging, Middleware]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Chain of Responsibility Pattern?**

The **Chain of Responsibility Pattern** is a behavioral design pattern that allows you to pass requests along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This pattern promotes loose coupling and provides flexibility in handling requests.

**Key Benefits:**
- ✅ **Loose Coupling** - Handlers are independent and can be easily modified
- ✅ **Flexibility** - Dynamic chain composition and reordering
- ✅ **Single Responsibility** - Each handler has a specific responsibility
- ✅ **Extensibility** - Easy to add new handlers without changing existing code
- ✅ **Request Processing** - Multiple handlers can process the same request

---

## 🚀 **Real-World Problem: Multi-Level Logging System**

Let's design a **multi-level logging system** with the following requirements:

### **System Requirements:**
- **Support multiple log levels** (INFO, WARNING, ERROR, DEBUG)
- **Dynamic handler chain** - handlers can be added/removed at runtime
- **Independent handlers** - each handler processes specific log levels
- **Extensibility** - easy to add new logging destinations (Console, File, Database, Email)
- **Performance optimization** - efficient processing for high-volume logging

### **Business Rules:**
- Each log level should be handled by appropriate handlers
- Handlers should be able to process multiple requests in sequence
- System should support handler ordering and priority
- Failed handlers should not break the entire chain
- Support for conditional processing based on log content

---

## 🏗️ **Object-Oriented Analysis (OOA)**

Let's analyze the problem and identify the core components:

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_1.png" title="Chain of Responsibility Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **High Coupling**
   - Client code directly controls each logging handler
   - Tight coupling between client and handler implementations

2. **Lack of Flexibility**
   - Cannot easily adjust handler order or add new handlers
   - Static handler configuration limits system adaptability

3. **Violation of Open-Closed Principle (OCP)**
   - Adding new logging handlers requires client code changes
   - System becomes rigid and hard to extend

---

## 💡 **Chain of Responsibility Pattern Solution**

After analyzing the forces, we can apply the **Chain of Responsibility Pattern** to create a flexible request processing system:

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_2.png" title="Chain of Responsibility Pattern - General Structure" %}

### **Chain of Responsibility Pattern Components:**

1. **Handler Interface** - Defines the interface for handling requests
2. **Concrete Handlers** - Implement specific handling logic
3. **Chain Builder** - Constructs and manages the handler chain
4. **Client** - Initiates requests without knowing chain details

**Benefits:**
- **Dynamic chain composition** - Handlers can be added/removed at runtime
- **Loose coupling** - Client doesn't need to know about specific handlers
- **Flexible processing** - Multiple handlers can process the same request
- **Easy extension** - Add new handlers without changing existing code

---

## 🛠️ **Implementation: Multi-Level Logging System**

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_3.png" title="Logging Chain of Responsibility Implementation" %}

### **1. Handler Interface**

```kotlin
abstract class Logger(
    private val nextLogger: Logger? = null
) {
    abstract fun log(level: LogLevel, message: String)

    protected fun passToNext(level: LogLevel, message: String) {
        nextLogger?.log(level, message)
    }
}

enum class LogLevel {
    DEBUG, INFO, WARNING, ERROR
}

data class LogRequest(
    val level: LogLevel,
    val message: String,
    val timestamp: Long = System.currentTimeMillis(),
    val source: String = "Application"
)
```

### **2. Concrete Handlers**

```kotlin
class ConsoleLogger(
    nextLogger: Logger? = null,
    private val minLevel: LogLevel = LogLevel.INFO
) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level.ordinal >= minLevel.ordinal) {
            val timestamp = java.time.LocalDateTime.now().format(
                java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            )
            println("📺 [${level.name}] $timestamp - $message")
        }
        passToNext(level, message)
    }
}

class FileLogger(
    nextLogger: Logger? = null,
    private val filename: String = "application.log",
    private val minLevel: LogLevel = LogLevel.WARNING
) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level.ordinal >= minLevel.ordinal) {
            val timestamp = java.time.LocalDateTime.now().format(
                java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            )
            val logEntry = "[${level.name}] $timestamp - $message\n"
            
            try {
                java.io.File(filename).appendText(logEntry)
                println("📄 FileLogger: Logged to $filename")
            } catch (e: Exception) {
                println("❌ FileLogger: Failed to write to $filename - ${e.message}")
            }
        }
        passToNext(level, message)
    }
}

class DatabaseLogger(
    nextLogger: Logger? = null,
    private val minLevel: LogLevel = LogLevel.ERROR
) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level.ordinal >= minLevel.ordinal) {
            val timestamp = java.time.LocalDateTime.now().format(
                java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            )
            
            // Simulate database insertion
            println("🗄️ DatabaseLogger: INSERT INTO logs (level, message, timestamp) VALUES ('${level.name}', '$message', '$timestamp')")
        }
        passToNext(level, message)
    }
}

class EmailLogger(
    nextLogger: Logger? = null,
    private val adminEmail: String = "admin@company.com",
    private val minLevel: LogLevel = LogLevel.ERROR
) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level.ordinal >= minLevel.ordinal) {
            val timestamp = java.time.LocalDateTime.now().format(
                java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            )
            
            // Simulate email sending
            println("📧 EmailLogger: Sending email to $adminEmail - Subject: [${level.name}] $timestamp - $message")
        }
        passToNext(level, message)
    }
}
```

### **3. Chain Builder**

```kotlin
class LoggingChainBuilder {
    private var firstLogger: Logger? = null
    private var currentLogger: Logger? = null

    fun addConsoleLogger(minLevel: LogLevel = LogLevel.INFO): LoggingChainBuilder {
        val logger = ConsoleLogger(null, minLevel)
        addLogger(logger)
        return this
    }

    fun addFileLogger(filename: String = "application.log", minLevel: LogLevel = LogLevel.WARNING): LoggingChainBuilder {
        val logger = FileLogger(null, filename, minLevel)
        addLogger(logger)
        return this
    }

    fun addDatabaseLogger(minLevel: LogLevel = LogLevel.ERROR): LoggingChainBuilder {
        val logger = DatabaseLogger(null, minLevel)
        addLogger(logger)
        return this
    }

    fun addEmailLogger(adminEmail: String = "admin@company.com", minLevel: LogLevel = LogLevel.ERROR): LoggingChainBuilder {
        val logger = EmailLogger(null, adminEmail, minLevel)
        addLogger(logger)
        return this
    }

    private fun addLogger(logger: Logger) {
        if (firstLogger == null) {
            firstLogger = logger
            currentLogger = logger
        } else {
            // Find the last logger in the chain
            var lastLogger = firstLogger
            while (lastLogger?.let { it::class.java.getDeclaredField("nextLogger").apply { isAccessible = true }.get(it) } != null) {
                lastLogger = lastLogger::class.java.getDeclaredField("nextLogger").apply { isAccessible = true }.get(lastLogger) as Logger?
            }
            
            // Set the next logger
            lastLogger?.let {
                it::class.java.getDeclaredField("nextLogger").apply { isAccessible = true }.set(it, logger)
            }
        }
    }

    fun build(): Logger {
        return firstLogger ?: throw IllegalStateException("No loggers added to chain")
    }
}
```

### **4. Client Code**

```kotlin
class LoggingManager(private val logger: Logger) {
    fun logDebug(message: String) {
        logger.log(LogLevel.DEBUG, message)
    }

    fun logInfo(message: String) {
        logger.log(LogLevel.INFO, message)
    }

    fun logWarning(message: String) {
        logger.log(LogLevel.WARNING, message)
    }

    fun logError(message: String) {
        logger.log(LogLevel.ERROR, message)
    }
}

fun main() {
    // Build logging chain
    val logger = LoggingChainBuilder()
        .addConsoleLogger(LogLevel.INFO)
        .addFileLogger("app.log", LogLevel.WARNING)
        .addDatabaseLogger(LogLevel.ERROR)
        .addEmailLogger("admin@company.com", LogLevel.ERROR)
        .build()

    val loggingManager = LoggingManager(logger)

    println("=== Multi-Level Logging Demo ===\n")

    // Test different log levels
    loggingManager.logDebug("This is a debug message - only console should show")
    println()
    
    loggingManager.logInfo("This is an info message - console should show")
    println()
    
    loggingManager.logWarning("This is a warning message - console and file should show")
    println()
    
    loggingManager.logError("This is an error message - all handlers should show")
    println()

    // Test chain with different configuration
    println("=== Custom Logging Chain Demo ===\n")
    
    val customLogger = LoggingChainBuilder()
        .addConsoleLogger(LogLevel.DEBUG)
        .addEmailLogger("dev@company.com", LogLevel.WARNING)
        .build()

    val customManager = LoggingManager(customLogger)
    
    customManager.logDebug("Debug message with custom chain")
    customManager.logWarning("Warning message with custom chain")
}
```

**Expected Output:**
```
=== Multi-Level Logging Demo ===

📺 [INFO] 2024-12-16 23:00:00 - This is an info message - console should show

📺 [WARNING] 2024-12-16 23:00:01 - This is a warning message - console and file should show
📄 FileLogger: Logged to app.log

📺 [ERROR] 2024-12-16 23:00:02 - This is an error message - all handlers should show
📄 FileLogger: Logged to app.log
🗄️ DatabaseLogger: INSERT INTO logs (level, message, timestamp) VALUES ('ERROR', 'This is an error message - all handlers should show', '2024-12-16 23:00:02')
📧 EmailLogger: Sending email to admin@company.com - Subject: [ERROR] 2024-12-16 23:00:02 - This is an error message - all handlers should show

=== Custom Logging Chain Demo ===

📺 [DEBUG] 2024-12-16 23:00:03 - Debug message with custom chain
📺 [WARNING] 2024-12-16 23:00:04 - Warning message with custom chain
📧 EmailLogger: Sending email to dev@company.com - Subject: [WARNING] 2024-12-16 23:00:04 - Warning message with custom chain
```

---

## 📊 **Chain of Responsibility vs Alternative Approaches**

| Approach | Pros | Cons |
|----------|------|------|
| **Chain of Responsibility** | ✅ Loose coupling<br>✅ Dynamic chain composition<br>✅ Easy extension | ❌ Potential performance overhead<br>❌ Chain traversal complexity<br>❌ Debugging challenges |
| **Direct Handler Calls** | ✅ Simple implementation<br>✅ No overhead<br>✅ Easy debugging | ❌ Tight coupling<br>❌ Hard to extend<br>❌ Violates OCP |
| **Strategy Pattern** | ✅ Runtime strategy switching<br>✅ Clean separation | ❌ Single handler per request<br>❌ No chain processing |
| **Observer Pattern** | ✅ Multiple observers<br>✅ Decoupled communication | ❌ No control over processing order<br>❌ All observers process every event |

---

## 🎯 **When to Use the Chain of Responsibility Pattern**

### **✅ Perfect For:**
- **Request processing pipelines** (web middleware, logging systems)
- **Event handling systems** (GUI event processing, game event systems)
- **Validation chains** (form validation, data processing)
- **Error handling** (exception handling chains)
- **Authentication/Authorization** (security middleware)

### **❌ Avoid When:**
- **Simple request handling** (single handler sufficient)
- **Performance-critical applications** (chain traversal overhead)
- **Fixed processing order** (static handler configuration)
- **Synchronous processing** (blocking chain execution)

---

## 🔧 **Advanced Chain of Responsibility Implementations**

### **1. Conditional Chain Processing**

```kotlin
class ConditionalLogger(
    nextLogger: Logger? = null,
    private val condition: (LogLevel, String) -> Boolean
) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (condition(level, message)) {
            println("🔍 ConditionalLogger: Processing message that meets condition")
            // Process the message
        }
        passToNext(level, message)
    }
}

// Usage example
val conditionalLogger = ConditionalLogger(
    condition = { level, message -> 
        level == LogLevel.ERROR && message.contains("database")
    }
)
```

### **2. Chain with Priority**

```kotlin
class PriorityLogger(
    nextLogger: Logger? = null,
    private val priority: Int = 0
) : Logger(nextLogger) {
    
    override fun log(level: LogLevel, message: String) {
        println("⚡ PriorityLogger (Priority: $priority): Processing message")
        passToNext(level, message)
    }
}

class PriorityChainBuilder {
    private val handlers = mutableListOf<Pair<Int, Logger>>()

    fun addHandler(priority: Int, logger: Logger): PriorityChainBuilder {
        handlers.add(priority to logger)
        return this
    }

    fun build(): Logger {
        val sortedHandlers = handlers.sortedBy { it.first }
        
        var currentLogger: Logger? = null
        for (i in sortedHandlers.indices.reversed()) {
            val (priority, logger) = sortedHandlers[i]
            val nextLogger = currentLogger
            currentLogger = object : Logger(nextLogger) {
                override fun log(level: LogLevel, message: String) {
                    logger.log(level, message)
                }
            }
        }
        
        return currentLogger ?: throw IllegalStateException("No handlers added")
    }
}
```

### **3. Chain with Error Handling**

```kotlin
class ErrorHandlingLogger(
    nextLogger: Logger? = null,
    private val errorHandler: (Exception) -> Unit
) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        try {
            println("🛡️ ErrorHandlingLogger: Processing message safely")
            // Simulate potential error
            if (message.contains("error")) {
                throw RuntimeException("Simulated error in processing")
            }
        } catch (e: Exception) {
            errorHandler(e)
            println("⚠️ ErrorHandlingLogger: Error handled, continuing chain")
        }
        passToNext(level, message)
    }
}
```

---

## 🚀 **Real-World Applications**

### **1. Web Application Middleware**
- **Authentication middleware** - Check user credentials
- **Authorization middleware** - Verify user permissions
- **Logging middleware** - Log request/response data
- **Rate limiting middleware** - Control request frequency
- **CORS middleware** - Handle cross-origin requests

### **2. GUI Event Processing**
- **Event bubbling** - Process events up the component hierarchy
- **Input validation** - Validate user input at multiple levels
- **Error handling** - Handle errors at different UI layers
- **Accessibility** - Process accessibility events

### **3. Game Development**
- **Input processing** - Handle user input through multiple systems
- **Collision detection** - Process collisions through different layers
- **AI behavior** - Process AI decisions through behavior trees
- **Event systems** - Handle game events through multiple listeners

### **4. Data Processing Pipelines**
- **ETL processes** - Extract, transform, load data through stages
- **Data validation** - Validate data at multiple checkpoints
- **Data transformation** - Transform data through multiple processors
- **Data routing** - Route data to appropriate destinations

---

## 📈 **Performance Considerations**

### **Chain Traversal**
- **Chain length** - Keep chains reasonably short for performance
- **Early termination** - Stop processing when appropriate
- **Caching** - Cache chain results for repeated requests
- **Parallel processing** - Process independent handlers in parallel

### **Memory Management**
- **Handler lifecycle** - Manage handler creation and destruction
- **Memory leaks** - Avoid circular references in chains
- **Resource cleanup** - Properly clean up handler resources
- **Object pooling** - Reuse handler objects when possible

---

## 🔗 **Related Design Patterns**

- **[Command Pattern](/2024-12-21-design-pattern-19-command-pattern/)** - For encapsulating requests as objects
- **[Decorator Pattern](/2024-12-11-design-pattern-14-decorator-pattern/)** - For adding behavior dynamically
- **[Observer Pattern](/2024-12-24-design-pattern-23-observer-pattern/)** - For event notification systems
- **[Pipeline Pattern]** - For processing data through multiple stages

---

## 📚 **Best Practices**

### **1. Chain Design**
- **Keep chains focused** - Each chain should have a specific purpose
- **Limit chain length** - Avoid overly long chains for performance
- **Handle failures gracefully** - Ensure chain continues even if handlers fail
- **Document chain behavior** - Clear documentation of chain processing

### **2. Handler Implementation**
- **Single responsibility** - Each handler should have one clear purpose
- **Stateless handlers** - Avoid storing state in handlers when possible
- **Error handling** - Proper error handling in each handler
- **Performance optimization** - Optimize handler performance

### **3. Chain Management**
- **Dynamic composition** - Allow runtime chain modification
- **Configuration management** - Externalize chain configuration
- **Monitoring and metrics** - Track chain performance and usage
- **Testing strategies** - Test individual handlers and complete chains

---

## 🎯 **Conclusion**

The **Chain of Responsibility Pattern** provides a powerful way to process requests through multiple handlers while maintaining loose coupling and flexibility. By creating a chain of handlers, it enables:

- **Flexible request processing** with dynamic handler composition
- **Loose coupling** between clients and handlers
- **Easy extension** for new handlers without changing existing code
- **Multiple processing paths** for different types of requests

This pattern is essential for building robust, scalable systems that need to handle complex request processing workflows. Whether you're building web applications, logging systems, or data processing pipelines, the Chain of Responsibility Pattern provides the foundation for flexible and maintainable request handling.

**Next Steps:**
- Explore the **[Command Pattern](/2024-12-21-design-pattern-19-command-pattern/)** for encapsulating requests
- Learn about the **[Observer Pattern](/2024-12-24-design-pattern-23-observer-pattern/)** for event notification
- Discover the **[Decorator Pattern](/2024-12-11-design-pattern-14-decorator-pattern/)** for dynamic behavior addition

---

*Ready to implement the Chain of Responsibility Pattern in your projects? Download the complete code examples from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern) and start building more flexible, maintainable systems today!*
