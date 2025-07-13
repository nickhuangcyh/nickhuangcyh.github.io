---
layout: post
title: "Design Pattern 2: Object-Oriented Design Principles - SOLID Principles for Building Maintainable Software Systems"
date: 2024-07-03 23:00:00 +0800
description: "Master the SOLID principles to improve object-oriented design quality. Learn Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles with practical examples."
tags: [SOLID Principles, Design Principles, Object-Oriented Design, Software Architecture, Single Responsibility, Open-Closed Principle, Liskov Substitution, Interface Segregation, Dependency Inversion, Code Quality]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Code Quality]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> Download the complete Design Pattern series code from the [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Introduction: The Foundation of Quality Software Design

Design Principles are guidelines that help us improve object-oriented design and create better software systems. These principles provide a solid foundation for writing maintainable, extensible, and robust code.

## Real-World Applications

Design principles are fundamental to:

- **Software Architecture**: Building scalable, maintainable systems
- **Code Reviews**: Evaluating code quality and design decisions
- **Refactoring**: Improving existing code structure
- **Team Collaboration**: Establishing coding standards
- **Design Patterns**: Understanding when and how to apply patterns

## The SOLID Principles

SOLID is an acronym for five fundamental object-oriented design principles that help developers create more maintainable and flexible software.

### 1. Single Responsibility Principle (SRP)

**Definition**: A class should have only one reason to change, meaning it should have only one responsibility.

**Real-World Analogy**: In a restaurant, the chef cooks, the waiter serves, and the cashier handles payments. Each person has a single, well-defined responsibility.

#### Before Applying SRP

{% tabs srp-1 %}

{% tab srp-1 Swift %}

```swift
class LoginViewController {
    func loginToServer(account: String, password: String, callback: Result<String, Error>) {
        // Network request logic
        // Alamofire... { callback() }
        // Volley... { callback() }
    }

    func saveToDB(account: String, password: String) {
        // Database operations
        // sql.save()...
    }

    func deleteFromDB(account: String) {
        // Database operations
        // sql.delete()
    }
}
```

{% endtab %}

{% tab srp-1 Kotlin %}

```kotlin
class LoginActivity {
    fun loginToServer(account: String, password: String, callback: Result<String, Error>) {
        // Network request logic
        // Alamofire... { callback() }
        // Volley... { callback() }
    }

    fun saveToDB(account: String, password: String) {
        // Database operations
        // sql.save()...
    }

    fun deleteFromDB(account: String) {
        // Database operations
        // sql.delete()
    }
}
```

{% endtab %}

{% endtabs %}

#### After Applying SRP

{% tabs srp-2 %}

{% tab srp-2 Swift %}

```swift
class ServerApiRequestService {
    func login(account: String, password: String, callback: Result<String, Error>) {
        // Network request logic
        // Alamofire... { callback() }
        // Volley... { callback() }
    }
}

class DBService {
    func save(account: String, password: String) {
        // Database operations
        // sql.save()
    }

    func delete(account: String) {
        // Database operations
        // sql.delete()
    }
}

class LoginViewControllerSRP {
    var apiRequestService: ServerApiRequestService? = nil
    var dbService: DBService? = nil

    func loginToServer(account: String, password: String, callback: Result<String, Error>) {
        apiRequestService?.login(account: account, password: password, callback: callback)
    }

    func saveToDB(account: String, password: String) {
        dbService?.save(account: account, password: password)
    }

    func deleteFromDB(account: String) {
        dbService?.delete(account: account)
    }
}
```

{% endtab %}

{% tab srp-2 Kotlin %}

```kotlin
class ServerApiRequestService {
    fun login(account: String, password: String, callback: Result<String, Error>) {
        // Network request logic
        // Alamofire... { callback() }
        // Volley... { callback() }
    }
}

class DBService {
    fun save(account: String, password: String) {
        // Database operations
        // sql.save()
    }

    fun delete(account: String) {
        // Database operations
        // sql.delete()
    }
}

class LoginActivitySRP {
    var apiRequestService: ServerApiRequestService? = null
    var dbService: DBService? = null

    fun loginToServer(account: String, password: String, callback: Result<String, Error>) {
        apiRequestService?.login(account, password, callback)
    }

    fun saveToDB(account: String, password: String) {
        dbService?.save(account, password)
    }

    fun deleteFromDB(account: String) {
        dbService?.delete(account)
    }
}
```

{% endtab %}

{% endtabs %}

**Benefits**:
- **Maintainability**: Changes to network logic don't affect database operations
- **Testability**: Each service can be tested independently
- **Reusability**: Services can be reused in other parts of the application

> **Note**: Some articles suggest separating save and delete functions into different classes (DeleteDBService, SaveDBService) because they are different responsibilities. However, this might be over-design and harder to maintain. Responsibility separation should be appropriate, not excessive.

### 2. Open-Closed Principle (OCP)

**Definition**: Software entities should be open for extension but closed for modification.

**Real-World Analogy**: A plugin system where you can add new functionality without modifying existing code.

#### Before Applying OCP

{% tabs ocp-1 %}

{% tab ocp-1 Swift %}

```swift
enum ValidatorType {
    case username
    case password
}

enum ValidationError: Error, Equatable {
    case isEmpty(errorMessage: String)
    case containsSpecialChar(errorMessage: String)
}

class Validator {
    func validated(_ value: String, validatorType: ValidatorType) throws -> String {
        switch validatorType {
        case .username:
            if value.isEmpty {
                throw ValidationError.isEmpty(errorMessage: "Username cannot be empty")
            }
            if value.contains("!@#$%") {
                throw ValidationError.containsSpecialChar(errorMessage: "Username contains special characters")
            }
        case .password:
            if value.isEmpty {
                throw ValidationError.isEmpty(errorMessage: "Password cannot be empty")
            }
            if value.count < 8 {
                throw ValidationError.containsSpecialChar(errorMessage: "Password must be at least 8 characters")
            }
        }
        return value
    }
}
```

{% endtab %}

{% tab ocp-1 Kotlin %}

```kotlin
enum class ValidatorType {
    USERNAME,
    PASSWORD
}

sealed class ValidationError(message: String) : Exception(message) {
    class Empty(message: String) : ValidationError(message)
    class ContainsSpecialChar(message: String) : ValidationError(message)
}

class Validator {
    fun validated(value: String, validatorType: ValidatorType): String {
        return when (validatorType) {
            ValidatorType.USERNAME -> {
                if (value.isEmpty()) {
                    throw ValidationError.Empty("Username cannot be empty")
                }
                if (value.contains(Regex("[!@#$%]"))) {
                    throw ValidationError.ContainsSpecialChar("Username contains special characters")
                }
                value
            }
            ValidatorType.PASSWORD -> {
                if (value.isEmpty()) {
                    throw ValidationError.Empty("Password cannot be empty")
                }
                if (value.length < 8) {
                    throw ValidationError.ContainsSpecialChar("Password must be at least 8 characters")
                }
                value
            }
        }
    }
}
```

{% endtab %}

{% endtabs %}

#### After Applying OCP

{% tabs ocp-2 %}

{% tab ocp-2 Swift %}

```swift
protocol ValidationRule {
    func validate(_ value: String) throws -> String
}

class UsernameValidationRule: ValidationRule {
    func validate(_ value: String) throws -> String {
        if value.isEmpty {
            throw ValidationError.isEmpty(errorMessage: "Username cannot be empty")
        }
        if value.contains("!@#$%") {
            throw ValidationError.containsSpecialChar(errorMessage: "Username contains special characters")
        }
        return value
    }
}

class PasswordValidationRule: ValidationRule {
    func validate(_ value: String) throws -> String {
        if value.isEmpty {
            throw ValidationError.isEmpty(errorMessage: "Password cannot be empty")
        }
        if value.count < 8 {
            throw ValidationError.containsSpecialChar(errorMessage: "Password must be at least 8 characters")
        }
        return value
    }
}

class EmailValidationRule: ValidationRule {
    func validate(_ value: String) throws -> String {
        if value.isEmpty {
            throw ValidationError.isEmpty(errorMessage: "Email cannot be empty")
        }
        if !value.contains("@") {
            throw ValidationError.containsSpecialChar(errorMessage: "Invalid email format")
        }
        return value
    }
}

class ValidatorOCP {
    private var rules: [ValidationRule] = []
    
    func addRule(_ rule: ValidationRule) {
        rules.append(rule)
    }
    
    func validate(_ value: String) throws -> String {
        var result = value
        for rule in rules {
            result = try rule.validate(result)
        }
        return result
    }
}
```

{% endtab %}

{% tab ocp-2 Kotlin %}

```kotlin
interface ValidationRule {
    fun validate(value: String): String
}

class UsernameValidationRule : ValidationRule {
    override fun validate(value: String): String {
        if (value.isEmpty()) {
            throw ValidationError.Empty("Username cannot be empty")
        }
        if (value.contains(Regex("[!@#$%]"))) {
            throw ValidationError.ContainsSpecialChar("Username contains special characters")
        }
        return value
    }
}

class PasswordValidationRule : ValidationRule {
    override fun validate(value: String): String {
        if (value.isEmpty()) {
            throw ValidationError.Empty("Password cannot be empty")
        }
        if (value.length < 8) {
            throw ValidationError.ContainsSpecialChar("Password must be at least 8 characters")
        }
        return value
    }
}

class EmailValidationRule : ValidationRule {
    override fun validate(value: String): String {
        if (value.isEmpty()) {
            throw ValidationError.Empty("Email cannot be empty")
        }
        if (!value.contains("@")) {
            throw ValidationError.ContainsSpecialChar("Invalid email format")
        }
        return value
    }
}

class ValidatorOCP {
    private val rules = mutableListOf<ValidationRule>()
    
    fun addRule(rule: ValidationRule) {
        rules.add(rule)
    }
    
    fun validate(value: String): String {
        var result = value
        for (rule in rules) {
            result = rule.validate(result)
        }
        return result
    }
}
```

{% endtab %}

{% endtabs %}

**Benefits**:
- **Extensibility**: New validation rules can be added without modifying existing code
- **Maintainability**: Each validation rule is isolated and easy to maintain
- **Flexibility**: Validation rules can be combined dynamically

### 3. Liskov Substitution Principle (LSP)

**Definition**: Subtypes must be substitutable for their base types without altering the correctness of the program.

**Real-World Analogy**: If you have a program that works with rectangles, it should also work with squares (since a square is a type of rectangle).

#### Violating LSP

```kotlin
open class Rectangle {
    open var width: Int = 0
    open var height: Int = 0
    
    fun getArea(): Int = width * height
}

class Square : Rectangle() {
    override var width: Int = 0
        set(value) {
            field = value
            height = value // This violates LSP
        }
    
    override var height: Int = 0
        set(value) {
            field = value
            width = value // This violates LSP
        }
}

// This function expects a Rectangle but breaks with Square
fun calculateArea(rectangle: Rectangle): Int {
    rectangle.width = 5
    rectangle.height = 4
    return rectangle.getArea() // Expected 20, but with Square it might be 16
}
```

#### Following LSP

```kotlin
interface Shape {
    fun getArea(): Int
}

class Rectangle : Shape {
    var width: Int = 0
    var height: Int = 0
    
    override fun getArea(): Int = width * height
}

class Square : Shape {
    var side: Int = 0
    
    override fun getArea(): Int = side * side
}

// This function works with any Shape
fun calculateArea(shape: Shape): Int {
    return shape.getArea()
}
```

### 4. Interface Segregation Principle (ISP)

**Definition**: Clients should not be forced to depend on interfaces they do not use.

**Real-World Analogy**: A restaurant menu where you can order individual items instead of being forced to buy a complete meal.

#### Violating ISP

```kotlin
interface Worker {
    fun work()
    fun eat()
    fun sleep()
}

class Robot : Worker {
    override fun work() {
        println("Robot working")
    }
    
    override fun eat() {
        // Robots don't eat - forced to implement unused method
        throw UnsupportedOperationException("Robots don't eat")
    }
    
    override fun sleep() {
        // Robots don't sleep - forced to implement unused method
        throw UnsupportedOperationException("Robots don't sleep")
    }
}
```

#### Following ISP

```kotlin
interface Workable {
    fun work()
}

interface Eatable {
    fun eat()
}

interface Sleepable {
    fun sleep()
}

class Human : Workable, Eatable, Sleepable {
    override fun work() {
        println("Human working")
    }
    
    override fun eat() {
        println("Human eating")
    }
    
    override fun sleep() {
        println("Human sleeping")
    }
}

class Robot : Workable {
    override fun work() {
        println("Robot working")
    }
    // No need to implement eat() or sleep()
}
```

### 5. Dependency Inversion Principle (DIP)

**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions.

**Real-World Analogy**: A light switch (high-level) doesn't depend on a specific light bulb (low-level), but on the concept of a switchable device (abstraction).

#### Violating DIP

```kotlin
class EmailNotifier {
    fun sendEmail(to: String, message: String) {
        println("Sending email to $to: $message")
    }
}

class UserService {
    private val emailNotifier = EmailNotifier() // Direct dependency
    
    fun createUser(email: String) {
        // User creation logic
        emailNotifier.sendEmail(email, "Welcome!")
    }
}
```

#### Following DIP

```kotlin
interface Notifier {
    fun send(to: String, message: String)
}

class EmailNotifier : Notifier {
    override fun send(to: String, message: String) {
        println("Sending email to $to: $message")
    }
}

class SMSNotifier : Notifier {
    override fun send(to: String, message: String) {
        println("Sending SMS to $to: $message")
    }
}

class UserService(private val notifier: Notifier) { // Depends on abstraction
    fun createUser(email: String) {
        // User creation logic
        notifier.send(email, "Welcome!")
    }
}

// Usage
val emailNotifier = EmailNotifier()
val smsNotifier = SMSNotifier()

val userService1 = UserService(emailNotifier)
val userService2 = UserService(smsNotifier)
```

## Advanced Design Principles

### 1. **Don't Repeat Yourself (DRY)**

```kotlin
// Bad: Repeated code
class UserService {
    fun validateUser(user: User): Boolean {
        if (user.name.isEmpty()) return false
        if (user.email.isEmpty()) return false
        if (user.age < 0) return false
        return true
    }
}

class ProductService {
    fun validateProduct(product: Product): Boolean {
        if (product.name.isEmpty()) return false
        if (product.price < 0) return false
        if (product.category.isEmpty()) return false
        return true
    }
}

// Good: Reusable validation
interface Validatable {
    fun validate(): Boolean
}

class User : Validatable {
    val name: String = ""
    val email: String = ""
    val age: Int = 0
    
    override fun validate(): Boolean {
        return name.isNotEmpty() && email.isNotEmpty() && age >= 0
    }
}

class Product : Validatable {
    val name: String = ""
    val price: Double = 0.0
    val category: String = ""
    
    override fun validate(): Boolean {
        return name.isNotEmpty() && price >= 0 && category.isNotEmpty()
    }
}

class ValidationService {
    fun validate(validatable: Validatable): Boolean {
        return validatable.validate()
    }
}
```

### 2. **Composition Over Inheritance**

```kotlin
// Prefer composition
interface Flyable {
    fun fly()
}

interface Swimmable {
    fun swim()
}

class Duck {
    private val flyable: Flyable = SimpleFlyable()
    private val swimmable: Swimmable = SimpleSwimmable()
    
    fun fly() = flyable.fly()
    fun swim() = swimmable.swim()
}

// Avoid deep inheritance hierarchies
open class Animal
open class Bird : Animal()
open class FlyingBird : Bird()
open class Duck : FlyingBird() // Too deep!
```

## Best Practices and Considerations

### 1. **Start Simple**

- Begin with simple solutions
- Apply principles only when complexity demands it
- Don't over-engineer simple problems

### 2. **Consider Context**

- Principles work best in specific contexts
- Adapt principles to your specific needs
- Balance between flexibility and simplicity

### 3. **Refactor Gradually**

- Apply principles incrementally
- Test thoroughly after each change
- Document your design decisions

### 4. **Team Consensus**

- Establish coding standards with your team
- Use code reviews to enforce principles
- Provide training and examples

## Performance Considerations

| Principle | Memory Usage | Performance | Maintainability | Extensibility |
|-----------|--------------|-------------|-----------------|---------------|
| SRP | Low | High | High | Medium |
| OCP | Medium | Medium | High | High |
| LSP | Low | High | High | High |
| ISP | Low | High | High | High |
| DIP | Medium | Medium | High | High |

## Common Anti-Patterns

### 1. **God Classes**
```kotlin
// Avoid: Classes with too many responsibilities
class UserManager {
    fun createUser() { /* ... */ }
    fun updateUser() { /* ... */ }
    fun deleteUser() { /* ... */ }
    fun sendEmail() { /* ... */ }
    fun generateReport() { /* ... */ }
    fun backupData() { /* ... */ }
    // ... 20 more methods
}
```

### 2. **Tight Coupling**
```kotlin
// Avoid: Direct dependencies on concrete classes
class OrderService {
    private val database = MySQLDatabase() // Tight coupling
    private val emailService = GmailService() // Tight coupling
    
    fun processOrder(order: Order) {
        database.save(order)
        emailService.sendConfirmation(order)
    }
}
```

### 3. **Interface Pollution**
```kotlin
// Avoid: Interfaces with too many methods
interface FileOperations {
    fun read(): String
    fun write(data: String)
    fun delete()
    fun compress()
    fun encrypt()
    fun backup()
    fun restore()
    fun validate()
    // ... 10 more methods
}
```

## Related Design Patterns

- **Strategy**: Uses DIP to define interchangeable algorithms
- **Observer**: Uses DIP for loose coupling between components
- **Decorator**: Uses OCP to add functionality without modification
- **Adapter**: Uses ISP to create compatible interfaces

## Conclusion

Understanding and applying design principles is essential for creating maintainable, extensible, and robust software systems. The SOLID principles provide a solid foundation for object-oriented design and help developers write better code.

Key benefits of following design principles include:

- **Maintainability**: Code is easier to modify and extend
- **Testability**: Components can be tested independently
- **Reusability**: Code can be reused across different parts of the application
- **Flexibility**: Systems can adapt to changing requirements

These principles form the foundation for understanding and implementing design patterns effectively.

## Related Articles

- [Design Pattern 1: Object-Oriented Concepts](/2024-07-02-design-pattern-1-object-oriented-concepts/)
- [Design Pattern 3: Design Patterns Overview](/2024-07-04-design-pattern-3-design-pattern/)
- [Design Pattern 4: UML Diagrams](/2024-07-05-design-pattern-4-uml/)
- [Design Pattern 5: Simple Factory Pattern](/2024-07-06-design-pattern-5-simple-factory-pattern/)
