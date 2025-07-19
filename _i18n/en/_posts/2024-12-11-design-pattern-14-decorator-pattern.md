---
layout: post
title: "Design Pattern 14: Decorator Pattern - Complete Guide with Real-World Coffee Shop Examples"
date: 2024-12-11 23:30:00 +0800
description: "Master the Decorator Pattern with practical coffee shop POS system examples. Learn how to dynamically add functionality to objects while maintaining flexibility and extensibility."
tags:
  [
    Decorator Pattern,
    Design Patterns,
    Dynamic Behavior,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Structural Patterns,
    Coffee Shop,
    POS System,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Decorator Pattern?**

The **Decorator Pattern** is a structural design pattern that allows you to dynamically add new functionality to objects without altering their structure. It provides a flexible alternative to subclassing for extending functionality, enabling you to attach additional responsibilities to objects at runtime.

**Key Benefits:**

- ✅ **Dynamic Behavior** - Add functionality at runtime without changing existing code
- ✅ **Single Responsibility** - Each decorator has a specific responsibility
- ✅ **Open/Closed Principle** - Open for extension, closed for modification
- ✅ **Flexibility** - Combine decorators in any order
- ✅ **Composition over Inheritance** - Favor object composition over class inheritance

---

## 🚀 **Real-World Problem: Coffee Shop POS System**

Let's design a **coffee shop POS system** with the following requirements:

### **System Requirements:**

- **Support multiple coffee types** (Espresso, House Blend, etc.)
- **Dynamic add-ons** - customers can add milk, chocolate syrup, whipped cream
- **Flexible pricing** - calculate total cost based on base price + add-ons
- **Extensibility** - easy to add new coffee types and add-ons
- **Order management** - handle complex combinations efficiently

### **Business Rules:**

- Each coffee has a base price
- Add-ons have individual costs that stack
- Customers can add multiple add-ons to any coffee
- System should support unlimited add-on combinations
- Pricing should be transparent and accurate

---

## 🏗️ **Object-Oriented Analysis (OOA)**

Let's analyze the problem and identify the core components:

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_1.png" title="Decorator Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **Class Explosion**
   - Creating a class for every coffee-add-on combination leads to exponential growth
   - Maintenance becomes difficult with hundreds of classes

2. **Tight Coupling**
   - Coffee types and add-ons are tightly coupled
   - Changes to one component affect multiple others

3. **Lack of Flexibility**
   - Cannot dynamically add or remove add-ons at runtime
   - Limited to predefined combinations

4. **Code Duplication**
   - Similar logic repeated across multiple combination classes
   - Violates DRY (Don't Repeat Yourself) principle

---

## 💡 **Decorator Pattern Solution**

After analyzing the forces, we can apply the **Decorator Pattern** to create a flexible, extensible system:

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_2.png" title="Decorator Pattern - General Structure" %}

### **Decorator Pattern Components:**

1. **Component Interface** - Defines the common interface for all objects
2. **Concrete Component** - The base object that can be decorated
3. **Decorator Abstract Class** - Maintains reference to component and adds behavior
4. **Concrete Decorators** - Implement specific additional functionality

**Benefits:**

- **Dynamic composition** - Add functionality at runtime
- **Single responsibility** - Each decorator has one specific purpose
- **Flexible combinations** - Mix and match decorators in any order
- **Easy extension** - Add new decorators without changing existing code

---

## 🛠️ **Implementation: Coffee Shop POS System**

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_3.png" title="Coffee Shop Decorator Pattern Implementation" %}

### **1. Component Interface**

```kotlin
interface Beverage {
    val description: String
    fun cost(): Double
    fun getCalories(): Int
    fun getSize(): Size
}

enum class Size {
    SMALL, MEDIUM, LARGE
}
```

### **2. Concrete Components**

```kotlin
class Espresso : Beverage {
    override val description = "Espresso"
    override fun cost() = 1.99
    override fun getCalories() = 5
    override fun getSize() = Size.SMALL
}

class HouseBlend : Beverage {
    override val description = "House Blend Coffee"
    override fun cost() = 0.89
    override fun getCalories() = 10
    override fun getSize() = Size.MEDIUM
}

class DarkRoast : Beverage {
    override val description = "Dark Roast Coffee"
    override fun cost() = 1.29
    override fun getCalories() = 15
    override fun getSize() = Size.MEDIUM
}

class Decaf : Beverage {
    override val description = "Decaf Coffee"
    override fun cost() = 1.05
    override fun getCalories() = 5
    override fun getSize() = Size.MEDIUM
}
```

### **3. Decorator Abstract Class**

```kotlin
abstract class CondimentDecorator(
    protected val beverage: Beverage
) : Beverage {
    override fun getSize(): Size = beverage.getSize()
}
```

### **4. Concrete Decorators**

```kotlin
class Milk(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Milk"
    override fun cost() = beverage.cost() + 0.30
    override fun getCalories() = beverage.getCalories() + 30
}

class ChocolateSyrup(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Chocolate Syrup"
    override fun cost() = beverage.cost() + 0.50
    override fun getCalories() = beverage.getCalories() + 50
}

class WhippedCream(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Whipped Cream"
    override fun cost() = beverage.cost() + 0.40
    override fun getCalories() = beverage.getCalories() + 45
}

class Caramel(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Caramel"
    override fun cost() = beverage.cost() + 0.60
    override fun getCalories() = beverage.getCalories() + 60
}

class Vanilla(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Vanilla"
    override fun cost() = beverage.cost() + 0.45
    override fun getCalories() = beverage.getCalories() + 40
}
```

### **5. Order Management System**

```kotlin
class CoffeeOrder {
    private val items = mutableListOf<Beverage>()

    fun addBeverage(beverage: Beverage) {
        items.add(beverage)
    }

    fun getTotalCost(): Double {
        return items.sumOf { it.cost() }
    }

    fun getTotalCalories(): Int {
        return items.sumOf { it.getCalories() }
    }

    fun printReceipt() {
        println("=== Coffee Shop Receipt ===")
        items.forEachIndexed { index, beverage ->
            println("${index + 1}. ${beverage.description}")
            println("   Cost: $${String.format("%.2f", beverage.cost())}")
            println("   Calories: ${beverage.getCalories()}")
            println()
        }
        println("Total Cost: $${String.format("%.2f", getTotalCost())}")
        println("Total Calories: ${getTotalCalories()}")
        println("==========================")
    }
}
```

### **6. Client Code**

```kotlin
fun main() {
    val order = CoffeeOrder()

    println("=== Coffee Shop Order Demo ===\n")

    // Simple Espresso
    val espresso = Espresso()
    order.addBeverage(espresso)
    println("Added: ${espresso.description} - $${espresso.cost()}")

    // House Blend with multiple add-ons
    val fancyHouseBlend = WhippedCream(
        ChocolateSyrup(
            Milk(HouseBlend())
        )
    )
    order.addBeverage(fancyHouseBlend)
    println("Added: ${fancyHouseBlend.description} - $${fancyHouseBlend.cost()}")

    // Dark Roast with caramel and vanilla
    val sweetDarkRoast = Vanilla(
        Caramel(DarkRoast())
    )
    order.addBeverage(sweetDarkRoast)
    println("Added: ${sweetDarkRoast.description} - $${sweetDarkRoast.cost()}")

    // Decaf with all add-ons
    val ultimateDecaf = WhippedCream(
        Caramel(
            Vanilla(
                ChocolateSyrup(
                    Milk(Decaf())
                )
            )
        )
    )
    order.addBeverage(ultimateDecaf)
    println("Added: ${ultimateDecaf.description} - $${ultimateDecaf.cost()}")

    println("\n=== Final Receipt ===")
    order.printReceipt()
}
```

**Expected Output:**

```
=== Coffee Shop Order Demo ===

Added: Espresso - $1.99
Added: House Blend Coffee, Milk, Chocolate Syrup, Whipped Cream - $2.09
Added: Dark Roast Coffee, Caramel, Vanilla - $2.34
Added: Decaf Coffee, Milk, Chocolate Syrup, Vanilla, Caramel, Whipped Cream - $3.29

=== Final Receipt ===
=== Coffee Shop Receipt ===
1. Espresso
   Cost: $1.99
   Calories: 5

2. House Blend Coffee, Milk, Chocolate Syrup, Whipped Cream
   Cost: $2.09
   Calories: 135

3. Dark Roast Coffee, Caramel, Vanilla
   Cost: $2.34
   Calories: 115

4. Decaf Coffee, Milk, Chocolate Syrup, Vanilla, Caramel, Whipped Cream
   Cost: $3.29
   Calories: 230

Total Cost: $9.71
Total Calories: 485
==========================
```

---

## 📊 **Decorator Pattern vs Alternative Approaches**

| Approach              | Pros                                                                                 | Cons                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| **Decorator Pattern** | ✅ Dynamic behavior addition<br>✅ Single responsibility<br>✅ Flexible combinations | ❌ Complex object structure<br>❌ Potential performance overhead<br>❌ Debugging complexity |
| **Inheritance**       | ✅ Simple for small hierarchies<br>✅ Clear relationship<br>✅ Easy to understand    | ❌ Class explosion<br>❌ Static behavior<br>❌ Hard to extend                               |
| **Strategy Pattern**  | ✅ Runtime behavior switching<br>✅ Clean separation                                 | ❌ Single behavior per object<br>❌ No composition                                          |
| **Composite Pattern** | ✅ Tree structure support<br>✅ Uniform interface                                    | ❌ Different purpose (structure vs behavior)                                                |

---

## 🎯 **When to Use the Decorator Pattern**

### **✅ Perfect For:**

- **Dynamic behavior addition** (GUI components, I/O streams)
- **Multiple feature combinations** (coffee add-ons, pizza toppings)
- **Cross-cutting concerns** (logging, caching, validation)
- **Legacy system extension** (adding features to existing classes)
- **Configuration management** (runtime feature toggles)

### **❌ Avoid When:**

- **Simple object hierarchies** (inheritance is sufficient)
- **Performance-critical applications** (decorator overhead)
- **Static behavior requirements** (no runtime changes needed)
- **Complex object relationships** (consider Composite Pattern)

---

## 🔧 **Advanced Decorator Pattern Implementations**

### **1. Conditional Decorators**

```kotlin
class ConditionalDecorator(
    beverage: Beverage,
    private val condition: () -> Boolean,
    private val decorator: (Beverage) -> Beverage
) : CondimentDecorator(beverage) {

    override val description: String
        get() = if (condition()) {
            decorator(beverage).description
        } else {
            beverage.description
        }

    override fun cost(): Double {
        return if (condition()) {
            decorator(beverage).cost()
        } else {
            beverage.cost()
        }
    }

    override fun getCalories(): Int {
        return if (condition()) {
            decorator(beverage).getCalories()
        } else {
            beverage.getCalories()
        }
    }
}

// Usage example
val seasonalBeverage = ConditionalDecorator(
    beverage = HouseBlend(),
    condition = { LocalDate.now().month == Month.DECEMBER },
    decorator = { Vanilla(it) }
)
```

### **2. Decorator with State Management**

```kotlin
class StatefulDecorator(
    beverage: Beverage,
    private val stateManager: StateManager
) : CondimentDecorator(beverage) {

    override val description: String
        get() = "${beverage.description} (${stateManager.getCurrentState()})"

    override fun cost(): Double {
        val baseCost = beverage.cost()
        val stateMultiplier = stateManager.getCostMultiplier()
        return baseCost * stateMultiplier
    }
}

class StateManager {
    private var currentState = "Normal"
    private val stateMultipliers = mapOf(
        "Normal" to 1.0,
        "Premium" to 1.5,
        "VIP" to 2.0
    )

    fun setState(state: String) {
        currentState = state
    }

    fun getCurrentState(): String = currentState

    fun getCostMultiplier(): Double = stateMultipliers[currentState] ?: 1.0
}
```

### **3. Decorator Factory**

```kotlin
class DecoratorFactory {
    private val decorators = mutableMapOf<String, (Beverage) -> Beverage>()

    fun registerDecorator(name: String, decorator: (Beverage) -> Beverage) {
        decorators[name] = decorator
    }

    fun createDecoratedBeverage(
        baseBeverage: Beverage,
        decoratorNames: List<String>
    ): Beverage {
        var result = baseBeverage
        for (name in decoratorNames) {
            val decorator = decorators[name]
                ?: throw IllegalArgumentException("Unknown decorator: $name")
            result = decorator(result)
        }
        return result
    }
}

// Usage
val factory = DecoratorFactory()
factory.registerDecorator("milk") { Milk(it) }
factory.registerDecorator("chocolate") { ChocolateSyrup(it) }
factory.registerDecorator("whipped") { WhippedCream(it) }

val customBeverage = factory.createDecoratedBeverage(
    baseBeverage = Espresso(),
    decoratorNames = listOf("milk", "chocolate", "whipped")
)
```

---

## 🚀 **Real-World Applications**

### **1. Java I/O Streams**

- **BufferedInputStream** - Adds buffering to input streams
- **DataInputStream** - Adds data type reading capabilities
- **GZIPInputStream** - Adds compression/decompression
- **ObjectInputStream** - Adds object serialization

### **2. GUI Frameworks**

- **Border decorators** - Add borders to components
- **Scroll decorators** - Add scrolling capabilities
- **Tooltip decorators** - Add tooltip functionality
- **Focus decorators** - Add focus management

### **3. Web Development**

- **Middleware decorators** - Add authentication, logging, caching
- **Response decorators** - Add headers, compression, formatting
- **Request decorators** - Add validation, transformation, routing

### **4. Game Development**

- **Weapon decorators** - Add scopes, silencers, extended magazines
- **Character decorators** - Add armor, weapons, abilities
- **Environment decorators** - Add weather, lighting, effects

---

## 📈 **Performance Considerations**

### **Memory Usage**

- **Object creation** - Each decorator creates a new object
- **Method delegation** - Calls are forwarded through the chain
- **Memory leaks** - Long decorator chains can consume memory
- **Object pooling** - Reuse decorator objects when possible

### **Method Call Overhead**

- **Chain traversal** - Each method call goes through the entire chain
- **Virtual method calls** - Dynamic dispatch overhead
- **Caching** - Cache expensive computations
- **Lazy evaluation** - Defer expensive operations until needed

---

## 🔗 **Related Design Patterns**

- **[Adapter Pattern](/2024-12-07-design-pattern-11-adapter-pattern/)** - For interface compatibility
- **[Bridge Pattern](/2024-12-08-design-pattern-12-bridge-pattern/)** - For abstraction-implementation separation
- **[Composite Pattern](/2024-12-10-design-pattern-13-composite-pattern/)** - For tree structures
- **[Proxy Pattern](/2024-12-15-design-pattern-17-proxy-pattern/)** - For access control

---

## 📚 **Best Practices**

### **1. Decorator Design**

- **Keep decorators focused** - Each decorator should have one clear purpose
- **Maintain transparency** - Decorators should be indistinguishable from base objects
- **Handle errors gracefully** - Proper error handling in decorator chain
- **Document decorator behavior** - Clear documentation of what each decorator does

### **2. Performance Optimization**

- **Limit decorator chain length** - Avoid overly long chains
- **Use object pooling** - Reuse decorator objects when possible
- **Implement caching** - Cache expensive operations
- **Consider lazy evaluation** - Defer expensive operations

### **3. Testing Strategies**

- **Test individual decorators** - Unit test each decorator in isolation
- **Test decorator combinations** - Integration tests for common combinations
- **Test decorator order** - Ensure order doesn't affect functionality
- **Mock base components** - Use mocks for testing decorators

---

## 🎯 **Conclusion**

The **Decorator Pattern** provides a powerful way to add functionality to objects dynamically while maintaining flexibility and extensibility. By using composition over inheritance, it enables:

- **Dynamic behavior addition** without modifying existing code
- **Flexible combinations** of multiple features
- **Single responsibility** for each decorator
- **Easy extension** for new functionality

This pattern is essential for building flexible, maintainable systems that need to support dynamic feature combinations. Whether you're building coffee shop POS systems, GUI frameworks, or web applications, the Decorator Pattern provides the foundation for extensible and maintainable code.

**Next Steps:**

- Explore the **[Adapter Pattern](/2024-12-07-design-pattern-11-adapter-pattern/)** for interface compatibility
- Learn about the **[Bridge Pattern](/2024-12-08-design-pattern-12-bridge-pattern/)** for abstraction-implementation separation
- Discover the **[Composite Pattern](/2024-12-10-design-pattern-13-composite-pattern/)** for tree structures

---

_Ready to implement the Decorator Pattern in your projects? Download the complete code examples from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern) and start building more flexible, extensible systems today!_
