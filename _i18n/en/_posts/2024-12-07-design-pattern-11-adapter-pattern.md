---
layout: post
title: "Design Pattern (11) Adapter Pattern Complete Tutorial: Solving Interface Incompatibility Issues"
date: 2024-12-07 23:00:00 +0800
description: "Learn how the Adapter Pattern solves interface incompatibility issues in system integration. Master design pattern core concepts, UML architecture, Kotlin implementation, applicable scenarios, and best practices through a stock data XML-JSON conversion example."
tags:
  [
    Adapter Pattern,
    Design Pattern,
    System Integration,
    Structural Pattern,
    OOP Design,
    Interface Compatibility,
    Kotlin Programming,
    Enterprise Development,
  ]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

After completing the study of Creational Patterns, we now move into the exploration of Structural Patterns. Structural Patterns focus on how to compose classes and objects to work together and form larger structures.

## Requirements

We have received a practical system integration requirement:

The company's existing **stock data system** has long used **XML format** to store and transmit data. However, a recently introduced **third-party stock analysis system** only supports **JSON format**.

This format mismatch situation is very common in enterprise environments. To integrate the two systems, we need to design a solution that allows existing XML data to be correctly received and processed by the third-party analysis system.

## Object-Oriented Analysis (OOA)

After understanding the requirements, let's first conduct object-oriented analysis to identify the core components in the system and their relationships:

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_1.png" title="design_pattern_adapter_pattern_uml_1" %}

## Identifying Forces

In a direct implementation without design patterns, although functionality can work normally, it faces several important issues:

### 1. Responsibility Distribution Problem

- The `Client` takes on the responsibility of data conversion, which violates the Single Responsibility Principle (SRP)
- When conversion logic becomes complex, the `Client`'s code will become bloated and difficult to maintain

### 2. Code Duplication Problem

- If other systems also need the same XML to JSON conversion logic, they must implement it repeatedly
- This duplication not only wastes development time but also increases maintenance costs

### 3. High Coupling Problem

- The `Client` must have deep understanding of the specific implementation details of `XmlStockData` and `JsonAnalyzer`
- When data source formats or target system interfaces change, the `Client` must undergo significant modifications

### 4. Insufficient Extensibility

- If support for more data formats (such as CSV, YAML, etc.) is needed in the future, each new format requires adding conversion logic to the `Client`
- This approach makes the system difficult to extend and continuously increases maintenance costs

## Applying Adapter Pattern (Solution) to Achieve New Context (Resulting Context)

After completing object-oriented analysis and identifying design challenges, we can apply the **Adapter Pattern** to solve these problems.

### Adapter Pattern Core Concepts

The Adapter Pattern works like a power adapter in real life. When your laptop charger has a three-prong plug but the wall outlet only has two holes, you need an adapter to solve this mismatch problem.

Let's first look at the standard UML structure of the Adapter Pattern:

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_2.png" title="design_pattern_adapter_pattern_uml_2" %}

### Three Core Roles of Adapter Pattern:

**Target (Target Interface)**

- Defines the interface that the client expects to use
- In our example, this is the `analyzeJsonData` method of JsonAnalyzer
- It represents the data format and operation method expected by the third-party analysis system

**Adaptee (Adaptee)**

- Represents the existing class that needs to be adapted
- In our example, this is the `XmlStockData` that provides XML format data
- It has its own interface but is incompatible with the target system

**Adapter (Adapter)**

- Implements the Target interface while internally holding a reference to the Adaptee
- Responsible for converting Adaptee's data to the format expected by the Target
- In our example, `StockDataAdapter` is responsible for converting XML to JSON

### Applying to Our Stock System

Now let's apply the Adapter Pattern to the stock data system:

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_3.png" title="design_pattern_adapter_pattern_uml_3" %}

## Object-Oriented Programming (OOP)

Next, let's implement this design using Kotlin. Let's build each role step by step:

### Target Interface - JsonAnalyzer

First, define the target interface, which is the interface expected by the third-party analysis system:

```kotlin
interface JsonAnalyzer {
    fun analyzeJsonData(json: String)
}
```

### Adaptee - XmlStockData

This is the existing XML data source that provides stock data in XML format:

```kotlin
class XmlStockData {
    fun getXmlData(): String {
        return """
            <stocks>
                <stock>
                    <symbol>TSLA</symbol>
                    <price>675.50</price>
                </stock>
                <stock>
                    <symbol>AMZN</symbol>
                    <price>3201.65</price>
                </stock>
            </stocks>
        """
    }
}
```

### Adapter - StockDataAdapter

This is our adapter, which implements the `JsonAnalyzer` interface and is responsible for converting XML data to JSON:

```kotlin
class StockDataAdapter(private val xmlStockData: XmlStockData) : JsonAnalyzer {
    override fun analyzeJsonData(json: String) {
        println("Analyzing JSON data: $json")
    }

    fun convertAndAnalyze() {
        val xml = xmlStockData.getXmlData()
        val json = XML.toJSONObject(xml).toString(4)
        analyzeJsonData(json)
    }
}
```

### Client Usage

The client code becomes very concise, only needing to operate through the adapter:

```kotlin
fun main() {
    val xmlStockData = XmlStockData()
    val adapter = StockDataAdapter(xmlStockData)

    adapter.convertAndAnalyze()
}
```

## Execution Results and Analysis

When we run the above code, the adapter will:

1. Get XML format stock data from `XmlStockData`
2. Convert XML to JSON format
3. Call the analysis method to process JSON data

## Conclusion

By applying the **Adapter Pattern**, we successfully solved the system integration problem:

### Benefits Achieved:

- **Clear Responsibilities**: Data conversion logic is encapsulated in a dedicated adapter
- **Reduced Coupling**: Client no longer needs to understand XML to JSON conversion details
- **Improved Reusability**: `StockDataAdapter` can be reused in other places that need the same conversion
- **Easy to Extend**: If support for other formats is needed in the future, just create new adapters

### Applicable Scenarios:

Adapter Pattern is particularly suitable for:

- Integrating third-party libraries or legacy systems
- Data format conversion
- Integration of classes with incompatible interfaces

This pattern provides us with an elegant way to handle common interface mismatch problems in system integration, making it one of the most practical patterns among structural patterns.
