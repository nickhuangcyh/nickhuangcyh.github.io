---
layout: post
title: Design Pattern (26) Template Method Pattern: Defining Algorithm Skeleton, Enhancing Code Reusability and System Extensibility
date: 2024-12-28 19:30:00 +0800
description: In-depth analysis of Template Method Pattern, learn how to define algorithm skeletons and achieve code reuse, through data format conversion system examples, master core application techniques of behavioral design patterns.
tags: [Template Method Pattern, Design Patterns, Behavioral Patterns, Code Reusability, Algorithm Structure, Software Architecture]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

---

## Requirements

When designing a **data format conversion system**, we need to meet the following requirements:

### 1. Multi-format Support Requirements
Support conversion functionality for multiple data formats:
   - **JSON Format Conversion**: Convert data to JSON format
   - **XML Format Conversion**: Convert data to XML format
   - **CSV Format Conversion**: Convert data to CSV format

### 2. System Extensibility Requirements
The system must have good extensibility capabilities. When business needs to add other formats (such as YAML, Protocol Buffers), it should be able to integrate quickly without affecting existing functionality.

### 3. Process Consistency Requirements
**Maintaining core consistency of conversion processes** is a key requirement. Regardless of which format conversion, all must follow standard processes:
   - Read raw data
   - Format data content
   - Output final results

### 4. Code Quality Requirements
**Avoid duplicate code** generation, improve code maintainability and readability.

---

## Object-Oriented Analysis (OOA)

After understanding the requirements, we clarify the system's core problems through object-oriented analysis.

First, let's observe the current system architecture:

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_1.png" title="design_pattern_template_method_pattern_uml_1" %}

### Recognizing Forces

If we don't apply design patterns, we'll face the following core problems:

#### 1. Code Duplication Problem
Each format's conversion logic contains the same processing steps. These common steps are repeatedly written in various implementations, causing code redundancy.

When we have 10 formats, we might have 10 copies of almost identical process code.

#### 2. Violates Open-Closed Principle (OCP)
Every time we need to add a format conversion, we must modify existing core conversion logic. This violates the "open for extension, closed for modification" design principle.

#### 3. Maintenance and Extension Difficulties
Conversion logic for various formats is scattered in different places, lacking unified management. When core processes need adjustment, all related implementations must be modified synchronously, increasing error risks.

---

## Applying Template Method Pattern (Solution) to Get New Context (Resulting Context)

After completing OOA analysis and recognizing problem cores, we can apply Template Method Pattern to elegantly solve these challenges.

### Basic Concepts of Template Method Pattern

**Template Method Pattern** is an important behavioral design pattern. It defines an algorithm's skeleton, allowing subclasses to override specific steps without changing the algorithm's overall structure.

This pattern's core idea is "define invariant processes in parent classes, implement variable details in subclasses," working together with [Strategy Pattern]({% post_url 2024-12-26-design-pattern-25-strategy-pattern %}) and [State Pattern]({% post_url 2024-12-25-design-pattern-24-state-pattern %}) to form important components of behavioral patterns.

Let's first understand Template Method Pattern's standard structure:

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_2.png" title="design_pattern_template_method_pattern_uml_2" %}

### Core Components of Template Method Pattern

Template Method Pattern contains two main roles:

#### 1. AbstractClass (Abstract Class)
The abstract class is the pattern's core, responsible for the following duties:
- **Define Template Method**: Encapsulate complete algorithm process skeleton
- **Provide Common Implementation**: Implement universal steps that don't need changes
- **Declare Abstract Methods**: Let subclasses implement specific steps needing customization

#### 2. ConcreteClass (Concrete Class)
Concrete classes inherit abstract classes, focusing on implementing business logic:
- **Implement Abstract Methods**: Provide concrete implementations for specific steps
- **Follow Established Processes**: Cannot change algorithm structure defined by parent class

Here's Template Method Pattern's specific application in our system:

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_3.png" title="design_pattern_template_method_pattern_uml_3" %}

---

## Object-Oriented Design (OOP)

Based on Template Method Pattern's architectural analysis, we begin concrete object-oriented design.

### Core Design Philosophy

We'll create an abstract data formatter as a template, defining standard conversion processes. Various concrete format converters inherit this template, implementing their respective formatting logic.

### Implementation Details

#### AbstractClass: DataFormatter

```kotlin
abstract class DataFormatter {
    // Template Method - Define complete conversion process
    fun convert(data: Map<String, Any>): String {
        val rawData = readData(data)
        val formattedData = formatData(rawData)
        return outputData(formattedData)
    }

    // Common step - All formats use same data reading logic
    private fun readData(data: Map<String, Any>): String {
        return data.toString()
    }

    // Abstract step - Implemented by subclasses for specific formatting logic
    protected abstract fun formatData(data: String): String

    // Abstract step - Implemented by subclasses for specific output formats
    protected abstract fun outputData(data: String): String
}
```

#### ConcreteClasses: Specific Format Converters

Each concrete format converter focuses on implementing its own specific formatting logic:

```kotlin
class JsonFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        return "{\"data\": \"$data\"}" // Simulate JSON formatting
    }

    override fun outputData(data: String): String {
        return "JSON Output: $data"
    }
}

class XmlFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        return "<data>$data</data>" // Simulate XML formatting
    }

    override fun outputData(data: String): String {
        return "XML Output: $data"
    }
}

class CsvFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        return data.replace(", ", "\n") // Simulate CSV formatting
    }

    override fun outputData(data: String): String {
        return "CSV Output: $data"
    }
}
```

#### Client: Client Usage Example

Client code demonstrates how to use different format converters:

```kotlin
fun main() {
    val data = mapOf("name" to "John", "age" to 30, "city" to "New York")

    val jsonFormatter = JsonFormatter()
    println(jsonFormatter.convert(data))

    val xmlFormatter = XmlFormatter()
    println(xmlFormatter.convert(data))

    val csvFormatter = CsvFormatter()
    println(csvFormatter.convert(data))
}
```

#### Execution Results

Program execution output results:

```plaintext
JSON Output: {"data": "{name=John, age=30, city=New York}"}
XML Output: <data>{name=John, age=30, city=New York}</data>
CSV Output: name=John\nage=30\ncity=New York
```

---

## Conclusion

Through Template Method Pattern application, we successfully solved core problems faced by the data format conversion system.

### Core Advantages of the Solution

#### 1. Significantly Improved Code Reusability
Common conversion process logic is centrally implemented in abstract classes, completely avoiding code duplication problems. All format converters share the same core process, ensuring consistency.

#### 2. Greatly Enhanced System Extensibility
When adding any format conversion functionality, only need to:
- Inherit `DataFormatter` abstract class
- Implement `formatData()` and `outputData()` two methods
- No need to modify any existing code

#### 3. Fully Complies with Important Design Principles
- **Single Responsibility Principle (SRP)**: Core process control completely separated from specific format logic
- **Open-Closed Principle (OCP)**: System open for extension, closed for modification

### Applicable Scenarios and Practical Applications

Template Method Pattern is particularly suitable for the following business scenarios:

#### Data Processing Domain
- Multiple data format conversion processes (JSON, XML, CSV, YAML)
- Data validation processing (unified validation processes for different data sources)
- Data cleaning and standardization processing

#### Document Generation Domain
- Multi-format report generation (PDF, Excel, Word)
- Document template processing for different styles
- Batch document processing systems

#### Workflow Management
- Standardized business process handling
- Unified management of multi-stage tasks
- Template-based design for approval processes

### Summary

**Template Method Pattern** provides an elegant and practical solution. It not only ensures system core process consistency but also establishes solid architectural foundations for flexible and efficient functional expansion.

This pattern's core value lies in "define skeleton, flexible filling," allowing developers to quickly respond to changing business requirements while maintaining system stability.

In behavioral design patterns, Template Method Pattern works complementarily with [Observer Pattern]({% post_url 2024-12-24-design-pattern-23-observer-pattern %}), [Command Pattern]({% post_url 2024-12-21-design-pattern-19-command-pattern %}) and other patterns, collectively building a comprehensive software architecture design system. Mastering Template Method Pattern will add important design tools to your software development skills.