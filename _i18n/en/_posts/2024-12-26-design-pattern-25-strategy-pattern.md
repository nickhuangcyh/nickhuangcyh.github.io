---
layout: post
title: "Design Pattern 25: Strategy Pattern - Complete Guide with Real-World Examples"
date: 2024-12-26 23:50:00 +0800
description: "Master the Strategy Pattern with practical examples. Learn how to implement flexible algorithms, dynamic behavior switching, and create maintainable code with low coupling."
tags:
  [Strategy Pattern, Design Patterns, Algorithm Selection, Object-Oriented Design, Software Architecture, Kotlin, Programming, Behavioral Patterns]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Strategy Pattern?**

The **Strategy Pattern** is a behavioral design pattern that enables you to define a family of algorithms, encapsulate each one, and make them interchangeable. It allows the algorithm to vary independently from clients that use it, providing flexibility and maintainability.

**Key Benefits:**

- ✅ **Algorithm flexibility** - Switch algorithms at runtime
- ✅ **Low coupling** - Algorithms are isolated from client code
- ✅ **Easy extension** - Add new strategies without modifying existing code
- ✅ **Single responsibility** - Each strategy focuses on one algorithm
- ✅ **Open/Closed Principle** - Open for extension, closed for modification

---

## 🚀 **Real-World Problem: E-commerce Shipping Calculator**

Let's design an **e-commerce shipping cost calculation system** with the following requirements:

### **System Requirements:**

1. **Support multiple shipping calculation methods:**
   - **Regular Shipping**: Fixed shipping cost
   - **Express Shipping**: Weight-based pricing
   - **International Shipping**: Region and weight-based pricing
2. **System must be highly extensible:**
   - Easy to add new shipping calculation methods
3. **Avoid extensive if-else or switch-case statements**
4. **Users should easily switch between shipping methods**

### **Business Rules:**

- Regular shipping: Fixed cost regardless of weight/region
- Express shipping: Cost per kilogram
- International shipping: Variable cost based on region and weight
- System should support future shipping methods without code changes

---

## 🏗️ **Object-Oriented Analysis (OOA)**

Let's analyze the problem and identify the core components:

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_1.png" title="Strategy Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **Maintenance Challenges**
   - Shipping calculation logic mixed with main business logic
   - Adding or modifying calculation methods affects other parts

2. **Open-Closed Principle Violation**
   - Adding new shipping methods requires modifying core business logic

3. **Single Responsibility Principle Violation**
   - Main class handles both shipping calculation and core business logic

---

## 💡 **Strategy Pattern Solution**

After analyzing the forces, we can apply the **Strategy Pattern** to encapsulate algorithms into separate classes:

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_2.png" title="Strategy Pattern - General Structure" %}

### **Strategy Pattern Components:**

1. **Strategy Interface**
   - Defines common interface for all algorithms
   - Ensures consistent behavior across strategies

2. **Concrete Strategies**
   - Each strategy implements the interface
   - Contains specific algorithm logic

3. **Context**
   - Maintains reference to current strategy
   - Delegates work to strategy object

**Benefits:**

- **Algorithm isolation** from client code
- **Runtime strategy switching** capability
- **Easy extension** without modifying existing code

---

## 🛠️ **Implementation: E-commerce Shipping Calculator**

Here's the complete implementation using the Strategy Pattern:

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_3.png" title="Shipping Calculator Strategy Implementation" %}

### **1. Strategy Interface**

```kotlin
interface ShippingStrategy {
    fun calculateShippingCost(weight: Double, region: String): Double
    fun getStrategyName(): String
}
```

### **2. Concrete Strategy Classes**

```kotlin
class RegularShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        return 50.0 // Fixed shipping cost
    }

    override fun getStrategyName(): String = "Regular Shipping"
}

class ExpressShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        return weight * 10 // 10 per kilogram
    }

    override fun getStrategyName(): String = "Express Shipping"
}

class InternationalShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        val regionMultiplier = when (region) {
            "Asia" -> 15
            "Europe" -> 20
            "America" -> 25
            else -> 30
        }
        return weight * regionMultiplier
    }

    override fun getStrategyName(): String = "International Shipping"
}
```

### **3. Context Class**

```kotlin
class ShippingCalculator(private var strategy: ShippingStrategy) {

    fun setStrategy(strategy: ShippingStrategy) {
        this.strategy = strategy
        println("🔄 Strategy changed to: ${strategy.getStrategyName()}")
    }

    fun calculateCost(weight: Double, region: String): Double {
        val cost = strategy.calculateShippingCost(weight, region)
        println("📦 ${strategy.getStrategyName()}: $${cost} for ${weight}kg to $region")
        return cost
    }

    fun getCurrentStrategy(): String = strategy.getStrategyName()
}
```

### **4. Client Code**

```kotlin
fun main() {
    println("=== E-commerce Shipping Calculator Demo ===")

    val calculator = ShippingCalculator(RegularShipping())

    // Test different strategies
    val testWeight = 5.0
    val testRegion = "Asia"

    // Regular shipping
    calculator.calculateCost(testWeight, testRegion)

    // Switch to express shipping
    calculator.setStrategy(ExpressShipping())
    calculator.calculateCost(testWeight, testRegion)

    // Switch to international shipping
    calculator.setStrategy(InternationalShipping())
    calculator.calculateCost(testWeight, testRegion)

    // Test different regions
    println("\n=== Regional Cost Comparison ===")
    val regions = listOf("Asia", "Europe", "America", "Africa")
    regions.forEach { region ->
        calculator.calculateCost(2.0, region)
    }
}
```

**Expected Output:**

```
=== E-commerce Shipping Calculator Demo ===
📦 Regular Shipping: $50.0 for 5.0kg to Asia
🔄 Strategy changed to: Express Shipping
📦 Express Shipping: $50.0 for 5.0kg to Asia
🔄 Strategy changed to: International Shipping
📦 International Shipping: $75.0 for 5.0kg to Asia

=== Regional Cost Comparison ===
📦 International Shipping: $30.0 for 2.0kg to Asia
📦 International Shipping: $40.0 for 2.0kg to Europe
📦 International Shipping: $50.0 for 2.0kg to America
📦 International Shipping: $60.0 for 2.0kg to Africa
```

---

## 🔧 **Advanced Implementation: Enhanced Strategy Pattern**

Let's create a more sophisticated version with strategy validation and factory pattern:

```kotlin
// Enhanced strategy with validation
interface EnhancedShippingStrategy : ShippingStrategy {
    fun validateOrder(weight: Double, region: String): Boolean
    fun getEstimatedDeliveryDays(): Int
}

class PremiumShipping : EnhancedShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        return weight * 25 + 100 // Premium base cost + weight-based
    }

    override fun getStrategyName(): String = "Premium Shipping"

    override fun validateOrder(weight: Double, region: String): Boolean {
        return weight <= 50.0 // Premium shipping has weight limit
    }

    override fun getEstimatedDeliveryDays(): Int = 1
}

// Strategy factory
object ShippingStrategyFactory {
    fun createStrategy(type: String): ShippingStrategy {
        return when (type.lowercase()) {
            "regular" -> RegularShipping()
            "express" -> ExpressShipping()
            "international" -> InternationalShipping()
            "premium" -> PremiumShipping()
            else -> throw IllegalArgumentException("Unknown shipping type: $type")
        }
    }
}
```

---

## 📊 **Strategy Pattern vs Alternative Approaches**

| Approach              | Pros                                                             | Cons                                           |
| --------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| **Strategy Pattern**  | ✅ Clean separation<br>✅ Easy to extend<br>✅ Runtime switching | ❌ More classes<br>❌ Slight overhead          |
| **If-Else Chains**    | ✅ Simple for few cases                                          | ❌ Hard to maintain<br>❌ Violates OCP         |
| **Switch Statements** | ✅ Type-safe<br>✅ Compact                                       | ❌ Mixed responsibilities<br>❌ Hard to extend |
| **Inheritance**       | ✅ Reuse code                                                    | ❌ Tight coupling<br>❌ Inflexible             |

---

## 🎯 **When to Use the Strategy Pattern**

### **✅ Perfect For:**

- **Multiple algorithms** for the same task
- **Runtime algorithm selection**
- **Complex conditional logic**
- **Algorithm families** with similar interfaces
- **Testing different algorithms**

### **❌ Avoid When:**

- **Simple conditional logic** (use if-else instead)
- **Performance-critical** applications
- **Few algorithm variations**
- **Static algorithm selection**

---

## 🔗 **Related Design Patterns**

- **State Pattern**: Similar structure, but for state-dependent behavior
- **Command Pattern**: Can encapsulate algorithms as commands
- **Template Method Pattern**: For algorithm skeletons with variations
- **Factory Pattern**: Often used together for strategy creation

---

## 📈 **Real-World Applications**

### **1. Payment Processing Systems**

```kotlin
interface PaymentStrategy {
    fun processPayment(amount: Double): Boolean
}

class CreditCardPayment : PaymentStrategy { /* Implementation */ }
class PayPalPayment : PaymentStrategy { /* Implementation */ }
class CryptocurrencyPayment : PaymentStrategy { /* Implementation */ }
```

### **2. Sorting Algorithms**

```kotlin
interface SortStrategy<T> {
    fun sort(list: List<T>): List<T>
}

class QuickSort<T> : SortStrategy<T> { /* Implementation */ }
class MergeSort<T> : SortStrategy<T> { /* Implementation */ }
class BubbleSort<T> : SortStrategy<T> { /* Implementation */ }
```

### **3. Discount Calculation**

```kotlin
interface DiscountStrategy {
    fun calculateDiscount(price: Double, customer: Customer): Double
}

class PercentageDiscount : DiscountStrategy { /* Implementation */ }
class FixedAmountDiscount : DiscountStrategy { /* Implementation */ }
class SeasonalDiscount : DiscountStrategy { /* Implementation */ }
```

### **4. Data Compression**

```kotlin
interface CompressionStrategy {
    fun compress(data: ByteArray): ByteArray
    fun decompress(data: ByteArray): ByteArray
}

class GzipCompression : CompressionStrategy { /* Implementation */ }
class LZ4Compression : CompressionStrategy { /* Implementation */ }
class ZstdCompression : CompressionStrategy { /* Implementation */ }
```

---

## 🚨 **Common Pitfalls and Best Practices**

### **1. Strategy Selection**

```kotlin
// ❌ Avoid: Hard-coded strategy selection
val strategy = if (condition) StrategyA() else StrategyB()

// ✅ Prefer: Factory or configuration-based selection
val strategy = StrategyFactory.createStrategy(type)
```

### **2. Strategy Validation**

```kotlin
// ✅ Good: Validate strategy before use
fun calculateCost(weight: Double, region: String): Double {
    if (strategy is EnhancedShippingStrategy) {
        if (!strategy.validateOrder(weight, region)) {
            throw IllegalArgumentException("Invalid order for ${strategy.getStrategyName()}")
        }
    }
    return strategy.calculateShippingCost(weight, region)
}
```

### **3. Strategy Composition**

```kotlin
// ✅ Good: Combine multiple strategies
class CompositeShippingStrategy(private val strategies: List<ShippingStrategy>) : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        return strategies.sumOf { it.calculateShippingCost(weight, region) }
    }
}
```

---

## 🔗 **Related Articles**

- [Design Pattern 1: Object-Oriented Concepts](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [Design Pattern 2: Design Principles](/2024-07-03-design-pattern-2-design-principle)
- [State Pattern](/2024-12-25-design-pattern-24-state-pattern)
- [Command Pattern](/2024-12-21-design-pattern-19-command-pattern)
- [Template Method Pattern](/2024-12-28-design-pattern-26-template-method-pattern)

---

## ✅ **Conclusion**

Through the Strategy Pattern, we successfully separated shipping calculation logic from core functionality, achieving the following benefits:

**Key Advantages:**

- 🎯 **Easy extension** - Add new shipping methods without modifying existing code
- 🔧 **Low coupling** - Shipping logic isolated from business logic
- 📈 **Runtime flexibility** - Switch strategies dynamically
- 🛡️ **Better maintainability** - Clear separation of concerns

**Design Principles Followed:**

- **Single Responsibility Principle (SRP)**: Each strategy class has one responsibility
- **Open-Closed Principle (OCP)**: Open for extension, closed for modification
- **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions

**Perfect For:**

- **Different discount strategies** (percentage, fixed amount, seasonal)
- **Various sorting algorithms** (quick sort, merge sort, bubble sort)
- **Multiple tax calculation methods** (progressive, flat, regional)
- **Payment processing systems** (credit card, PayPal, cryptocurrency)

The Strategy Pattern provides an elegant solution for complex conditional logic and makes your system more flexible and maintainable!

---

**💡 Pro Tip:** Combine the Strategy Pattern with the Factory Pattern to create strategies dynamically based on configuration or user input.

**🔔 Stay Updated:** Follow our Design Pattern series for more software architecture insights!
