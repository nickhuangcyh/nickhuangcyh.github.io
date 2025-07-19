---
layout: post
title: "Design Pattern 26: Template Method Pattern - Complete Guide with Real-World Examples"
date: 2024-12-28 19:30:00 +0800
description: "Master the Template Method Pattern with practical examples. Learn how to create reusable algorithm frameworks, implement data format conversions, and build extensible systems."
tags:
  [
    Template Method Pattern,
    Design Patterns,
    Algorithm Framework,
    Code Reuse,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Behavioral Patterns,
    Data Processing,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Template Method Pattern?**

The **Template Method Pattern** is a behavioral design pattern that defines the skeleton of an algorithm in a base class, allowing subclasses to override specific steps without changing the algorithm's structure. This pattern promotes code reuse and ensures consistent algorithm execution while providing flexibility for customization.

**Key Benefits:**

- ✅ **Code reuse** - Common algorithm structure shared across subclasses
- ✅ **Consistent execution** - Algorithm flow remains the same
- ✅ **Flexibility** - Subclasses can customize specific steps
- ✅ **Maintainability** - Changes to algorithm structure affect all subclasses
- ✅ **Extensibility** - Easy to add new algorithm variations

---

## 🚀 **Real-World Problem: Data Format Conversion System**

Let's design a **data format conversion system** with the following requirements:

### **System Requirements:**

- **Support multiple format conversions** (JSON, XML, CSV, YAML)
- **Maintain consistent conversion workflow** across all formats
- **Easy extensibility** for new formats
- **Avoid code duplication** in conversion logic
- **Handle different data sources** (files, databases, APIs)

### **Business Rules:**

- All conversions follow the same 3-step process: Read → Format → Output
- Each format has specific formatting rules
- System should handle errors gracefully
- Performance optimization for large datasets
- Support for validation and transformation

---

## 🏗️ **Object-Oriented Analysis (OOA)**

Let's analyze the problem and identify the core components:

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_1.png" title="Template Method Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **Code Duplication**
   - Each format conversion implements the same 3-step process
   - Common logic repeated across multiple classes

2. **Violation of Open-Closed Principle (OCP)**
   - Adding new formats requires modifying existing code
   - Changes to conversion workflow affect all implementations

3. **Maintenance Complexity**
   - Conversion logic scattered across multiple classes
   - Difficult to ensure consistency across all formats

4. **Inconsistent Error Handling**
   - Each format handles errors differently
   - No standardized validation approach

---

## 💡 **Template Method Pattern Solution**

After analyzing the forces, we can apply the **Template Method Pattern** to create a flexible conversion framework:

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_2.png" title="Template Method Pattern - General Structure" %}

### **Template Method Pattern Components:**

1. **Abstract Class**
   - Defines the template method with algorithm skeleton
   - Provides default implementations for common steps
   - Declares abstract methods for customizable steps

2. **Concrete Classes**
   - Inherit from abstract class
   - Implement specific formatting logic
   - Can override default implementations if needed

3. **Template Method**
   - Orchestrates the algorithm execution
   - Ensures consistent workflow
   - Handles common operations

**Benefits:**

- **Consistent algorithm structure** across all implementations
- **Code reuse** through shared template method
- **Flexible customization** through method overriding
- **Easy maintenance** and extension

---

## 🛠️ **Implementation: Data Format Conversion System**

Here's the complete implementation using the Template Method Pattern:

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_3.png" title="Data Format Conversion Template Method Implementation" %}

### **1. Abstract Base Class**

```kotlin
abstract class DataFormatter {

    // Template method - defines the algorithm structure
    fun convert(data: Map<String, Any>): ConversionResult {
        return try {
            val rawData = readData(data)
            val validatedData = validateData(rawData)
            val formattedData = formatData(validatedData)
            val result = outputData(formattedData)

            ConversionResult.Success(result, getFormatType())
        } catch (e: Exception) {
            ConversionResult.Error("Conversion failed: ${e.message}", getFormatType())
        }
    }

    // Hook method - can be overridden by subclasses
    protected open fun validateData(data: String): String {
        return data.trim()
    }

    // Common implementation - shared by all subclasses
    private fun readData(data: Map<String, Any>): String {
        return data.entries.joinToString(", ") { "${it.key}=${it.value}" }
    }

    // Abstract methods - must be implemented by subclasses
    protected abstract fun formatData(data: String): String
    protected abstract fun outputData(data: String): String
    protected abstract fun getFormatType(): String

    // Optional hook method for performance optimization
    protected open fun shouldOptimize(): Boolean = false
}

// Result classes for better error handling
sealed class ConversionResult {
    data class Success(val data: String, val format: String) : ConversionResult()
    data class Error(val message: String, val format: String) : ConversionResult()
}
```

### **2. Concrete Implementations**

```kotlin
class JsonFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        val entries = data.split(", ").associate { entry ->
            val (key, value) = entry.split("=", limit = 2)
            key to value
        }

        return buildJsonObject {
            entries.forEach { (key, value) ->
                put(key, value)
            }
        }.toString()
    }

    override fun outputData(data: String): String {
        return if (shouldOptimize()) {
            "JSON (Optimized): $data"
        } else {
            "JSON Output: $data"
        }
    }

    override fun getFormatType(): String = "JSON"

    override fun shouldOptimize(): Boolean = true
}

class XmlFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        val entries = data.split(", ").associate { entry ->
            val (key, value) = entry.split("=", limit = 2)
            key to value
        }

        return buildString {
            appendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
            appendLine("<data>")
            entries.forEach { (key, value) ->
                appendLine("  <$key>$value</$key>")
            }
            append("</data>")
        }
    }

    override fun outputData(data: String): String {
        return "XML Output: $data"
    }

    override fun getFormatType(): String = "XML"

    override fun validateData(data: String): String {
        // XML-specific validation
        return data.replace("<", "&lt;").replace(">", "&gt;")
    }
}

class CsvFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        val entries = data.split(", ").map { entry ->
            val (key, value) = entry.split("=", limit = 2)
            "$key,$value"
        }

        return buildString {
            appendLine("key,value") // Header
            entries.forEach { entry ->
                appendLine(entry)
            }
        }
    }

    override fun outputData(data: String): String {
        return "CSV Output: $data"
    }

    override fun getFormatType(): String = "CSV"
}

class YamlFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        val entries = data.split(", ").associate { entry ->
            val (key, value) = entry.split("=", limit = 2)
            key to value
        }

        return buildString {
            entries.forEach { (key, value) ->
                appendLine("$key: $value")
            }
        }
    }

    override fun outputData(data: String): String {
        return "YAML Output: $data"
    }

    override fun getFormatType(): String = "YAML"
}
```

### **3. Advanced Implementation with Hooks**

```kotlin
abstract class AdvancedDataFormatter : DataFormatter() {

    // Template method with additional hooks
    fun convertWithMetadata(data: Map<String, Any>): ConversionResult {
        val startTime = System.currentTimeMillis()

        val result = convert(data)

        val endTime = System.currentTimeMillis()
        val processingTime = endTime - startTime

        return when (result) {
            is ConversionResult.Success -> {
                ConversionResult.Success(
                    "${result.data}\n<!-- Processing time: ${processingTime}ms -->",
                    result.format
                )
            }
            is ConversionResult.Error -> result
        }
    }

    // Hook method for preprocessing
    protected open fun preprocess(data: Map<String, Any>): Map<String, Any> {
        return data
    }

    // Hook method for postprocessing
    protected open fun postprocess(formattedData: String): String {
        return formattedData
    }
}

class OptimizedJsonFormatter : AdvancedDataFormatter() {
    override fun preprocess(data: Map<String, Any>): Map<String, Any> {
        // Remove null values and sort keys
        return data.filterValues { it != null }
            .toSortedMap()
    }

    override fun postprocess(formattedData: String): String {
        // Minify JSON
        return formattedData.replace(Regex("\\s+"), "")
    }

    override fun formatData(data: String): String {
        // Implementation similar to JsonFormatter but optimized
        return super.formatData(data)
    }

    override fun outputData(data: String): String {
        return "Optimized JSON: $data"
    }

    override fun getFormatType(): String = "Optimized JSON"
}
```

### **4. Client Code**

```kotlin
fun main() {
    println("=== Data Format Conversion Demo ===")

    val data = mapOf(
        "name" to "John Doe",
        "age" to 30,
        "city" to "New York",
        "occupation" to "Software Engineer"
    )

    // Test different formatters
    val formatters = listOf(
        JsonFormatter(),
        XmlFormatter(),
        CsvFormatter(),
        YamlFormatter(),
        OptimizedJsonFormatter()
    )

    formatters.forEach { formatter ->
        println("\n--- ${formatter.javaClass.simpleName} ---")
        val result = formatter.convert(data)

        when (result) {
            is ConversionResult.Success -> {
                println("✅ ${result.format} conversion successful:")
                println(result.data)
            }
            is ConversionResult.Error -> {
                println("❌ ${result.format} conversion failed:")
                println(result.message)
            }
        }
    }

    // Test with metadata
    println("\n--- Advanced Formatter with Metadata ---")
    val advancedFormatter = OptimizedJsonFormatter()
    val advancedResult = advancedFormatter.convertWithMetadata(data)

    when (advancedResult) {
        is ConversionResult.Success -> {
            println("✅ Advanced conversion successful:")
            println(advancedResult.data)
        }
        is ConversionResult.Error -> {
            println("❌ Advanced conversion failed:")
            println(advancedResult.message)
        }
    }
}
```

**Expected Output:**

```
=== Data Format Conversion Demo ===

--- JsonFormatter ---
✅ JSON conversion successful:
JSON (Optimized): {"age":"30","city":"New York","name":"John Doe","occupation":"Software Engineer"}

--- XmlFormatter ---
✅ XML conversion successful:
XML Output: <?xml version="1.0" encoding="UTF-8"?>
<data>
  <age>30</age>
  <city>New York</city>
  <name>John Doe</name>
  <occupation>Software Engineer</occupation>
</data>

--- CsvFormatter ---
✅ CSV conversion successful:
CSV Output: key,value
name,John Doe
age,30
city,New York
occupation,Software Engineer

--- YamlFormatter ---
✅ YAML conversion successful:
YAML Output: name: John Doe
age: 30
city: New York
occupation: Software Engineer

--- OptimizedJsonFormatter ---
✅ Optimized JSON conversion successful:
Optimized JSON: {"age":"30","city":"New York","name":"John Doe","occupation":"Software Engineer"}

--- Advanced Formatter with Metadata ---
✅ Advanced conversion successful:
Optimized JSON: {"age":"30","city":"New York","name":"John Doe","occupation":"Software Engineer"}
<!-- Processing time: 15ms -->
```

---

## 🔧 **Advanced Template Method Patterns**

### **1. Template Method with Strategy Pattern**

```kotlin
interface ValidationStrategy {
    fun validate(data: String): Boolean
}

class StrictValidationStrategy : ValidationStrategy {
    override fun validate(data: String): Boolean {
        return data.isNotEmpty() && data.length < 1000
    }
}

class LenientValidationStrategy : ValidationStrategy {
    override fun validate(data: String): Boolean {
        return data.isNotEmpty()
    }
}

abstract class ConfigurableDataFormatter(
    private val validationStrategy: ValidationStrategy
) : DataFormatter() {

    override fun validateData(data: String): String {
        return if (validationStrategy.validate(data)) {
            data.trim()
        } else {
            throw IllegalArgumentException("Data validation failed")
        }
    }
}
```

### **2. Template Method with Factory Pattern**

```kotlin
object DataFormatterFactory {
    fun createFormatter(format: String): DataFormatter {
        return when (format.lowercase()) {
            "json" -> JsonFormatter()
            "xml" -> XmlFormatter()
            "csv" -> CsvFormatter()
            "yaml" -> YamlFormatter()
            else -> throw IllegalArgumentException("Unsupported format: $format")
        }
    }
}

// Usage
val formatter = DataFormatterFactory.createFormatter("json")
val result = formatter.convert(data)
```

### **3. Template Method with Observer Pattern**

```kotlin
interface ConversionObserver {
    fun onConversionStart(format: String)
    fun onConversionComplete(format: String, result: ConversionResult)
    fun onConversionError(format: String, error: String)
}

abstract class ObservableDataFormatter : DataFormatter() {
    private val observers = mutableListOf<ConversionObserver>()

    fun addObserver(observer: ConversionObserver) {
        observers.add(observer)
    }

    override fun convert(data: Map<String, Any>): ConversionResult {
        observers.forEach { it.onConversionStart(getFormatType()) }

        return try {
            val result = super.convert(data)
            observers.forEach { it.onConversionComplete(getFormatType(), result) }
            result
        } catch (e: Exception) {
            val errorResult = ConversionResult.Error(e.message ?: "Unknown error", getFormatType())
            observers.forEach { it.onConversionError(getFormatType(), e.message ?: "Unknown error") }
            errorResult
        }
    }
}
```

---

## 📊 **Template Method Pattern vs Alternative Approaches**

| Approach                 | Pros                                                          | Cons                                                           |
| ------------------------ | ------------------------------------------------------------- | -------------------------------------------------------------- |
| **Template Method**      | ✅ Code reuse<br>✅ Consistent structure<br>✅ Easy extension | ❌ Inheritance coupling<br>❌ Limited flexibility              |
| **Strategy Pattern**     | ✅ Runtime flexibility<br>✅ No inheritance                   | ❌ No shared structure<br>❌ More complex setup                |
| **Command Pattern**      | ✅ Undo/redo support<br>✅ Queue operations                   | ❌ Overkill for simple algorithms<br>❌ Complex implementation |
| **Function Composition** | ✅ Functional approach<br>✅ High flexibility                 | ❌ No enforced structure<br>❌ Learning curve                  |

---

## 🎯 **When to Use the Template Method Pattern**

### **✅ Perfect For:**

- **Algorithm frameworks** with consistent structure
- **Data processing pipelines** (ETL, format conversion)
- **Document generation** (reports, exports)
- **Build processes** (compilation, deployment)
- **Test frameworks** (setup → test → teardown)
- **Workflow engines** (approval processes, workflows)

### **❌ Avoid When:**

- **Simple one-off algorithms** (use direct implementation)
- **Highly variable algorithms** (use Strategy pattern)
- **Runtime algorithm selection** (use Strategy pattern)
- **Multiple inheritance needed** (use composition)

---

## 🔗 **Related Design Patterns**

- **Strategy Pattern**: For runtime algorithm selection
- **Factory Method**: For creating algorithm instances
- **Command Pattern**: For encapsulating algorithm execution
- **Chain of Responsibility**: For step-by-step processing

---

## 📈 **Real-World Applications**

### **1. Build Systems**

```kotlin
abstract class BuildProcess {
    fun build(): BuildResult {
        clean()
        compile()
        test()
        package()
        return deploy()
    }

    protected abstract fun clean()
    protected abstract fun compile()
    protected abstract fun test()
    protected abstract fun package()
    protected abstract fun deploy(): BuildResult
}

class JavaBuildProcess : BuildProcess() {
    override fun clean() = println("Cleaning Java project...")
    override fun compile() = println("Compiling Java sources...")
    override fun test() = println("Running JUnit tests...")
    override fun package() = println("Creating JAR file...")
    override fun deploy(): BuildResult = BuildResult.Success("Deployed to Maven Central")
}
```

### **2. Database Operations**

```kotlin
abstract class DatabaseOperation<T> {
    fun execute(): OperationResult<T> {
        connect()
        val result = performOperation()
        commit()
        disconnect()
        return result
    }

    protected abstract fun connect()
    protected abstract fun performOperation(): OperationResult<T>
    protected abstract fun commit()
    protected abstract fun disconnect()
}

class UserInsertOperation(private val user: User) : DatabaseOperation<User>() {
    override fun connect() = println("Connecting to database...")
    override fun performOperation(): OperationResult<User> {
        println("Inserting user: ${user.name}")
        return OperationResult.Success(user)
    }
    override fun commit() = println("Committing transaction...")
    override fun disconnect() = println("Disconnecting from database...")
}
```

### **3. Web Request Processing**

```kotlin
abstract class RequestHandler {
    fun handle(request: Request): Response {
        authenticate(request)
        authorize(request)
        val response = processRequest(request)
        log(request, response)
        return response
    }

    protected abstract fun authenticate(request: Request)
    protected abstract fun authorize(request: Request)
    protected abstract fun processRequest(request: Request): Response
    protected abstract fun log(request: Request, response: Response)
}

class ApiRequestHandler : RequestHandler() {
    override fun authenticate(request: Request) = println("Validating API key...")
    override fun authorize(request: Request) = println("Checking permissions...")
    override fun processRequest(request: Request): Response = Response("API Response")
    override fun log(request: Request, response: Response) = println("Logging API call...")
}
```

### **4. Test Frameworks**

```kotlin
abstract class TestCase {
    fun run(): TestResult {
        setUp()
        val result = runTest()
        tearDown()
        return result
    }

    protected abstract fun setUp()
    protected abstract fun runTest(): TestResult
    protected abstract fun tearDown()
}

class UserServiceTest : TestCase() {
    override fun setUp() = println("Setting up test database...")
    override fun runTest(): TestResult = TestResult.Passed("User creation test passed")
    override fun tearDown() = println("Cleaning up test data...")
}
```

---

## 🚨 **Common Pitfalls and Best Practices**

### **1. Overuse of Template Methods**

```kotlin
// ❌ Avoid: Too many template methods
abstract class BadTemplate {
    fun method1() { /* template */ }
    fun method2() { /* template */ }
    fun method3() { /* template */ }
    // ... many more
}

// ✅ Prefer: Focus on core algorithm
abstract class GoodTemplate {
    fun execute() { /* main template */ }
    protected abstract fun step1()
    protected abstract fun step2()
}
```

### **2. Inappropriate Hook Methods**

```kotlin
// ❌ Avoid: Too many hooks making it complex
abstract class ComplexTemplate {
    protected open fun hook1() { /* default */ }
    protected open fun hook2() { /* default */ }
    protected open fun hook3() { /* default */ }
    // ... many hooks
}

// ✅ Prefer: Minimal, meaningful hooks
abstract class SimpleTemplate {
    protected open fun validate() { /* default validation */ }
    protected abstract fun process()
}
```

### **3. Proper Error Handling**

```kotlin
// ✅ Good: Comprehensive error handling
abstract class RobustTemplate {
    fun execute(): Result {
        return try {
            val result = performAlgorithm()
            Result.Success(result)
        } catch (e: Exception) {
            Result.Error(e.message ?: "Unknown error")
        }
    }

    protected abstract fun performAlgorithm(): Any
}
```

---

## 🔗 **Related Articles**

- [Design Pattern 1: Object-Oriented Concepts](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [Design Pattern 2: Design Principles](/2024-07-03-design-pattern-2-design-principle)
- [Strategy Pattern](/2024-12-26-design-pattern-25-strategy-pattern)
- [Factory Method Pattern](/2024-07-07-design-pattern-6-factory-method-pattern)
- [Command Pattern](/2024-12-21-design-pattern-19-command-pattern)

---

## ✅ **Conclusion**

Through the Template Method Pattern, we successfully created a flexible data format conversion system that maintains consistent workflow while allowing customization of specific steps.

**Key Advantages:**

- 🎯 **Code reuse** - Common algorithm structure shared across implementations
- 🔧 **Consistent execution** - Algorithm flow remains the same for all formats
- 📈 **Easy extension** - New formats can be added without modifying existing code
- 🛡️ **Maintainability** - Changes to algorithm structure affect all subclasses
- ⚡ **Performance optimization** - Hook methods allow for format-specific optimizations

**Design Principles Followed:**

- **Single Responsibility Principle (SRP)**: Each class handles one format conversion
- **Open-Closed Principle (OCP)**: Open for extension (new formats), closed for modification
- **Don't Repeat Yourself (DRY)**: Common logic shared in template method
- **Template Method Pattern**: Defines algorithm skeleton with customizable steps

**Perfect For:**

- **Data processing pipelines** (ETL, format conversion, validation)
- **Build systems** (compilation, testing, deployment)
- **Workflow engines** (approval processes, business processes)
- **Test frameworks** (setup → test → teardown)
- **Document generation** (reports, exports, templates)

The Template Method Pattern provides an elegant solution for creating reusable algorithm frameworks while maintaining flexibility and consistency!

---

**💡 Pro Tip:** Use hook methods sparingly and only when they provide meaningful customization points. Too many hooks can make the template method complex and hard to understand.

**🔔 Stay Updated:** Follow our Design Pattern series for more software architecture insights!
