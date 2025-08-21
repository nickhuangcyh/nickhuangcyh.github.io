---
layout: post
title: "Design Patterns (2) SOLID Design Principles Complete Guide: Five Principles for Improving Code Quality"
date: 2024-07-03 23:00:00 +0800
description: "In-depth analysis of the five SOLID design principles: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. Learn to design robust, maintainable software systems through practical examples and code demonstrations."
tags:
  [Design Principles, SOLID Principles, Object-Oriented Design, Software Architecture, Clean Code, Design Pattern, Software Development, Code Quality]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> You can download the Design Pattern series source code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Design Principle

Design Principles are important guidelines in software development, specifically used to help us improve object-oriented design.

These principles provide clear direction, enabling us to design more robust, maintainable, and easily extensible software systems. Following these principles not only improves code quality but also reduces future maintenance costs, making development teams more efficient in collaboration.

## SOLID Five Fundamental Principles of Object-Oriented Programming

### Single Responsibility Principle (SRP)

**Core Concept**: Each object should have only one single function and only one reason to change this object.

This principle emphasizes the importance of separation of responsibilities. When a class takes on too many responsibilities, any change in one responsibility may affect other functions, increasing maintenance complexity and the risk of errors.

**Practical Application Example**:
Let's use a common login page functionality as an example. Beginners often put all related functions into the same class:

{% tabs srp-1 %}

{% tab srp-1 Swift %}

```swift
class LoginViewController {
    func loginToServer(account: String, password: String, callback: Result<String, Error>) {
//        Alamofire... { callback() }
//        Volley... { callback() }
    }

    func saveToDB(account: String, password: String) {
        // sql.save()...
    }

    func deleteFromDB(account: String) {
        // sql.delete()
    }
}
```

{% endtab %}

{% tab srp-1 Kotlin %}

```kotlin
class LoginActivity {
    fun loginToServer(account: String, password: String, callback:  model.Result<String, Error>) {
//        Alamofire... { callback() }
//        Volley... { callback() }
    }

    fun saveToDB(account: String, password: String) {
        // sql.save()...
    }

    fun deleteFromDB(account: String) {
        // sql.delete()
    }
}
```

{% endtab %}

{% endtabs %}

**Problem Analysis**:
The above code violates the SRP principle because `LoginViewController` takes on three different responsibilities:

- Handling user interface logic
- Managing network API requests
- Handling database operations

**Solution**:
Following the Single Responsibility Principle, we should separate different responsibilities into their respective classes:

{% tabs srp-2 %}

{% tab srp-2 Swift %}

```swift
class ServerApiRequestService {
    func login(account: String, password: String, callback: Result<String, Error>) {
//        Alamofire... { callback() }
//        Volley... { callback() }
    }
}

class DBService {
    func save(account: String, password: String) {
//        sql.save()
    }

    func delete(account: String) {
//        sql.delete()
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
    fun login(account: String, password: String, callback: model.Result<String, Error>) {
//        Alamofire... { callback() }
//        Volley... { callback() }
    }
}

class DBService {
    fun save(account: String, password: String) {
//        sql.save()
    }

    fun delete(account: String) {
//        sql.delete()
    }
}

class LoginActivitySRP {
    var apiRequestService: ServerApiRequestService? = null
    var dbService: DBService? = null

    fun loginToServer(account: String, password: String, callback: model.Result<String, Error>) {
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

**Improvement Effects**:
Now each class has a clear and single responsibility:

- `ServerApiRequestService`: Focused on network request handling
- `DBService`: Focused on database operations
- `LoginViewControllerSRP`: Focused on coordinating various services and handling UI logic

**Important Reminder**:
Some articles suggest splitting `save` and `delete` functions into different classes (like `DeleteDBService`, `SaveDBService`), considering these as different responsibilities.

However, over-splitting may lead to overly complex design (Over Design), actually reducing code maintainability. Responsibility separation should be appropriate, not excessive, requiring a balance between functional cohesion and responsibility separation.

### Open Closed Principle (OCP)

**Core Concept**: Software entities should be open for extension but closed for modification.

The essence of this principle is that when we need to add new functionality, we should achieve it by extending existing code rather than modifying existing code. This avoids impact on stable running code and reduces the risk of introducing new bugs.

**Practical Application Example**:
During development, we often need to validate various user input data formats. Let's design a generic validator:

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

    static func == (lhs: Self, rhs: Self) -> Bool {
        switch (lhs, rhs) {
        case (.isEmpty(_), .isEmpty(_)):
            return true
        case (.containsSpecialChar(_), .containsSpecialChar(_)):
            return true
        default:
            return false
        }
    }
}

class Validator {
    func validated(_ value: String, validatorType: ValidatorType) throws -> String {
        switch validatorType {
        case .username:
            guard !value.isEmpty else {
                throw ValidationError.isEmpty(errorMessage: "isEmpty")
            }
            guard !value.isContainsSpecialChars() else {
                throw ValidationError.containsSpecialChar(errorMessage: "containsSpecialChar")
            }
        case .password:
            guard !value.isEmpty else {
                throw ValidationError.isEmpty(errorMessage: "isEmpty")
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
    Username,
    Password;
}

sealed class ValidationException: Exception() {
    class IsEmpty(val errorMessage: String): ValidationException()
    class ContainsSpecialChar(val errorMessage: String): ValidationException()

    override fun equals(other: Any?): Boolean {
        return when {
            this is IsEmpty && other is IsEmpty -> true
            this is ContainsSpecialChar && other is ContainsSpecialChar -> true
            else -> false
        }
    }
}

class Validator {
    @Throws(ValidationException::class)
    fun validated(value: String, validatorType: ValidatorType): String {
        when (validatorType) {
            ValidatorType.Username -> when {
                value.isEmpty() -> throw ValidationException.IsEmpty("isEmpty")
                value.isContainsSpecialChars() -> throw ValidationException.ContainsSpecialChar("containsSpecialChar")
            }
            ValidatorType.Password -> when {
                value.isEmpty() -> throw ValidationException.IsEmpty("isEmpty")
            }
        }
        return value
    }
}
```

{% endtab %}

{% endtabs %}

**Problem Analysis**:
The above design has a major problem: when clients request adding new validation types (like Email, Phone Number, Device Mac, etc.), we must modify the code of the `Validator` class.

This violates the Open-Closed Principle because:

- Every new feature requires modifying existing code
- It may affect already stable validation logic
- It increases the risk of introducing bugs

**Solution**:
We can solve this problem through abstraction and polymorphism, making the system open for extension and closed for modification:

{% tabs ocp-2 %}

{% tab ocp-2 Swift %}

```swift
protocol ValidatorConvertible {
    func validated(_ value: String) throws -> String
}

class UserNameValidator: ValidatorConvertible {

    func validated(_ value: String) throws -> String {
        guard !value.isEmpty else {
            throw ValidationError.isEmpty(errorMessage: "isEmpty")
        }
        guard !value.isContainsSpecialChars() else {
            throw ValidationError.containsSpecialChar(errorMessage: "containsSpecialChar")
        }
        return value
    }
}

class PasswordValidator: ValidatorConvertible {

    func validated(_ value: String) throws -> String {
        guard !value.isEmpty else {
            throw ValidationError.isEmpty(errorMessage: "isEmpty")
        }
        return value
    }
}
```

{% endtab %}

{% tab ocp-2 Kotlin %}

```kotlin
interface ValidatorConvertible {
    @Throws(ValidationException::class)
    fun validated(value: String): String
}

class UserNameValidator: ValidatorConvertible {

    override fun validated(value: String): String {
        when {
            value.isEmpty() -> throw ValidationException.IsEmpty("isEmpty")
            value.isContainsSpecialChars() -> throw ValidationException.ContainsSpecialChar("containsSpecialChar")
        }
        return value
    }
}

class PasswordValidator: ValidatorConvertible {

    override fun validated(value: String): String {
        when {
            value.isEmpty() -> throw ValidationException.IsEmpty("isEmpty")
        }
        return value
    }
}
```

{% endtab %}

{% endtabs %}

**Improvement Effects**:
Now when we need to add Email, Phone Number, Device Mac format checks, we only need to:

1. Create corresponding validator classes: `EmailValidator`, `PhoneNumberValidator`, `DeviceMacValidator`
2. Make these classes implement the `ValidatorConvertible` interface
3. No need to modify existing code at all

This design truly achieves:

- **Open for extension**: Easy to add new validators
- **Closed for modification**: No impact on existing stable code

### Liskov Substitution Principle (LSP)

**Core Concept**: Objects in a program should be replaceable with instances of their subtypes without altering program correctness.

This principle emphasizes the correctness of inheritance relationships. Child classes should not only inherit parent classes syntactically, but more importantly, maintain consistent behavior semantically. Violating LSP will cause polymorphism to fail, producing unexpected results when using child classes.

**Practical Application Example**:
Let's understand this principle through a classic geometric shape example. Suppose we need to calculate the area of squares and rectangles:

{% tabs lsp-1 %}

{% tab lsp-1 Swift %}

```swift
class Rectangle {
    var height: Int
    var width: Int

    init(height: Int, weight: Int) {
        self.height = height
        self.width = weight
    }

    func getArea() -> String {
        return "\(height * width)"
    }
}

class Square: Rectangle {
    override func getArea() -> String {
        if height != width {
            return "Length and width must be consistent"
        } else {
            return super.getArea()
        }
    }
}

let rectangle = Rectangle(height: 2, weight: 3)
print("\(rectangle.getArea())")
let square = Square(height: 2, weight: 3)
print("\(square.getArea())")
```

{% endtab %}

{% tab lsp-1 Kotlin %}

```kotlin
open class Rectangle(protected val height: Int, protected val width: Int) {

    open fun getArea(): String {
        return "${height * width}"
    }
}

class Square(height: Int, width: Int) : Rectangle(height, width) {
    override fun getArea(): String {
        return if (height != width) {
            "Length and width must be consistent"
        } else {
            super.getArea()
        }
    }
}

val rectangle = Rectangle(2, 3)
println("${rectangle.getArea()}")
val square = Square(2, 3)
println("${square.getArea()}")
```

{% endtab %}

{% endtabs %}

**Problem Analysis**:
In the above example, we make Square inherit Rectangle, but Square's `getArea()` method behavior is inconsistent with Rectangle. When length and width are not equal, Square returns an error message instead of a calculation result, breaking the LSP principle.

Mathematically, although a square is a special case of a rectangle, in programming, this inheritance relationship breaks substitutability. Users expect all `Rectangle` objects to calculate area normally, but `Square` may return error messages.

**Benefits of Following LSP**:

- **Enhanced code robustness**: Greatly ensures compatibility when using different subclasses
- **Guaranteed polymorphism effectiveness**: Wherever parent classes can be used, child classes can also be used normally
- **Clear functional division**: Child classes should add functionality independently of parent class functionality, avoiding problems when porting between different child classes

### Interface Segregation Principle (ISP)

**Core Concept**: Multiple specific client interfaces are better than one general-purpose interface.

This principle suggests we should not force classes to implement interface methods they don't use. When interfaces are too large, implementing classes may be forced to implement methods that are meaningless to them, increasing coupling and reducing system flexibility.

**Practical Application Example**:
Suppose we need to design a vehicle operation system that allows different types of users to operate cars:

{% tabs isp-1 %}

{% tab isp-1 Swift %}

```swift
protocol Car {
    func startEngine()
    func stopEngine()
    func enableDebugMode()
}

class Driver: Car {
    func startEngine() {
        print("start engine")
    }

    func stopEngine() {
        print("stop engine")
    }

    func enableDebugMode() {
        print("enable debug mode")
    }
}

class Engineer: Car {
    func startEngine() {
        print("start engine")
    }

    func stopEngine() {
        print("stop engine")
    }

    func enableDebugMode() {
        print("enable debug mode")
    }
}
```

{% endtab %}

{% tab isp-1 Kotlin %}

```kotlin
interface Car {
    fun startEngine()
    fun stopEngine()
    fun enableDebugMode()
}

class Driver: Car {
    override fun startEngine() {
        println("start engine")
    }

    override fun stopEngine() {
        println("stop engine")
    }

    override fun enableDebugMode() {
        println("enable debug mode")
    }
}

class Engineer: Car {
    override fun startEngine() {
        println("start engine")
    }

    override fun stopEngine() {
        println("stop engine")
    }

    override fun enableDebugMode() {
        println("enable debug mode")
    }
}
```

{% endtab %}

{% endtabs %}

**Problem Analysis**:
In the above design, all classes implementing the `Car` interface must implement the `enableDebugMode()` method. But in reality:

- Engineers need to enable DebugMode for vehicle diagnostics
- Regular drivers should not and do not need to enable DebugMode

This violates the Interface Segregation Principle because drivers are forced to implement unrelated methods.

**Solution**:
We should isolate `enableDebugMode()` into an independent interface, letting different roles only implement the functionality they truly need:

{% tabs isp-2 %}

{% tab isp-2 Swift %}

```swift
protocol Car1 {
    func startEngine()
    func stopEngine()
}

protocol Debuggable {
    func enableDebugMode()
}

class Driver1: Car1 {
    func startEngine() {
        print("start engine")
    }

    func stopEngine() {
        print("stop engine")
    }
}

class Engineer1: Car1, Debuggable {
    func startEngine() {
        print("start engine")
    }

    func stopEngine() {
        print("stop engine")
    }

    func enableDebugMode() {
        print("enable debug mode")
    }
}
```

{% endtab %}

{% tab isp-2 Kotlin %}

```kotlin
interface Car1 {
    fun startEngine()
    fun stopEngine()
}

interface Debuggable {
    fun enableDebugMode()
}

class Driver1: Car1 {
    override fun startEngine() {
        println("start engine")
    }

    override fun stopEngine() {
        println("stop engine")
    }
}

class Engineer1: Car1, Debuggable {
    override fun startEngine() {
        println("start engine")
    }

    override fun stopEngine() {
        println("stop engine")
    }

    override fun enableDebugMode() {
        println("enable debug mode")
    }
}
```

{% endtab %}

{% endtabs %}

**Improvement Effects**:
Now we have two independent interfaces:

- `Car1`: Contains basic vehicle operation functions (start/stop engine)
- `Debuggable`: Contains debugging functionality

This design ensures:

- Regular drivers only need to implement basic vehicle operation functions
- Only engineers implement debugging functionality
- Each role only implements the interface methods they truly need

### Dependency Inversion Principle (DIP)

**Core Concept**:

- High-level modules should not depend on low-level modules; both should depend on abstractions
- Abstractions should not depend on details; details should depend on abstractions

This principle is the most important among the SOLID principles. It requires us to reverse traditional dependency relationships. By introducing abstraction layers, we can make systems more flexible, easier to test and maintain.

**Practical Application Example**:
Let's design a smart home system that can manage IoT devices in different rooms. For example, the living room has smart speakers and temperature controllers, the kitchen has smoke detectors, etc.:

{% tabs dip-1 %}

{% tab dip-1 Swift %}

```swift
class Room {
    var no: Int
    var device: [String]

    init(no: Int, device: [String]) {
        self.no = no
        self.device = device
    }
}

class SQLiteService {
    func saveRoom(room: Room) {
        print("SQLiteService save")
    }

    func deleteRoom(no: Int) {
        print("SQLiteService delete")
    }
}

class RoomViewController {
    var sqlDBService: SQLiteService? = nil

    init(sqlDBService: SQLiteService) {
        sqlDBService
    }

    func saveRoomToDB(room: Room) {
        sqlDBService?.saveRoom(room: room)
    }

    func deleteRoomFromDB(no: Int) {
        sqlDBService?.deleteRoom(no: no)
    }
}

let roomVC = RoomViewController(sqlDBService: SQLiteService())
let room = Room(no: 1, device: ["IPCam", "VDP"])
roomVC.saveRoomToDB(room: room)
roomVC.deleteRoomFromDB(no: room.no)
```

{% endtab %}

{% tab dip-1 Kotlin %}

```kotlin
class Room {
    val no: Int
    val device: List<String>

    constructor(no: Int, device: List<String>) {
        this.no = no
        this.device = device
    }
}

class SQLiteService {
    fun saveRoom(room: Room) {
        println("SQLiteService save")
    }

    fun deleteRoom(no: Int) {
        println("SQLiteService delete")
    }
}

class RoomActivity {
    var sqlDBService: SQLiteService? = null

    constructor(sqlDBService: SQLiteService) {
        this.sqlDBService = sqlDBService
    }

    fun saveRoomToDB(room: Room) {
        sqlDBService?.saveRoom(room)
    }

    fun deleteRoomFromDB(no: Int) {
        sqlDBService?.deleteRoom(no)
    }
}

val roomVC = RoomActivity(SQLiteService())
val room = Room(1, listOf("IPCam", "VDP"))
roomVC.saveRoomToDB(room)
roomVC.deleteRoomFromDB(room.no)
```

{% endtab %}

{% endtabs %}

**Problem Analysis**:
In the above design, `RoomViewController` directly depends on the concrete `SQLiteService` class. This creates tight coupling problems:

If today we need to switch to CoreData or other database systems due to performance considerations (like SQLite being too slow), we'll find the system cannot be easily swapped. This is because high-level modules (Controller) directly depend on low-level modules (SQLite implementation).

**Solution**:
By depending on abstractions rather than concrete implementations, we can make code very easy to swap and test:

{% tabs dip-2 %}

{% tab dip-2 Swift %}

```swift
protocol DataBaseService {
    func saveRoom(room: Room)
    func deleteRoom(no: Int)
}

class SQLiteDBService: DataBaseService {
    func saveRoom(room: Room) {
        print("SQLiteDBService save")
    }

    func deleteRoom(no: Int) {
        print("SQLiteDBService delete")
    }
}

class CoreDataDBService: DataBaseService {
    func saveRoom(room: Room) {
        print("CoreDataDBService save")
    }

    func deleteRoom(no: Int) {
        print("CoreDataDBService delete")
    }
}

class MySQLDBService: DataBaseService {
    func saveRoom(room: Room) {
        print("MySQLDBService save")
    }

    func deleteRoom(no: Int) {
        print("MySQLDBService delete")
    }
}

class Room2ViewController {
    var databaseService: DataBaseService? = nil

    init(databaseService: DataBaseService) {
        self.databaseService = databaseService
    }

    func saveRoomToDB(room: Room) {
        databaseService?.saveRoom(room: room)
    }

    func deleteRoomFromDB(no: Int) {
        databaseService?.deleteRoom(no: no)
    }
}

let sqliteDB = SQLiteDBService()
let coreDataDB = CoreDataDBService()
let mysqlDB = MySQLDBService()

let room2VC = Room2ViewController(databaseService: sqliteDB)
let room2 = Room(no: 2, device: ["IPCam", "VDP"])

// sql
room2VC.saveRoomToDB(room: room2)
room2VC.deleteRoomFromDB(no: room2.no)

// coredata
room2VC.databaseService = coreDataDB
room2VC.saveRoomToDB(room: room2)
room2VC.deleteRoomFromDB(no: room2.no)

// mysql
room2VC.databaseService = mysqlDB
room2VC.saveRoomToDB(room: room2)
room2VC.deleteRoomFromDB(no: room2.no)
```

{% endtab %}

{% tab dip-2 Kotlin %}

```kotlin
interface DataBaseService {
    fun saveRoom(room: Room)
    fun deleteRoom(no: Int)
}

class SQLiteDBService: DataBaseService {
    override fun saveRoom(room: Room) {
        println("SQLiteDBService save")
    }

    override fun deleteRoom(no: Int) {
        println("SQLiteDBService delete")
    }
}

class CoreDataDBService: DataBaseService {
    override fun saveRoom(room: Room) {
        println("CoreDataDBService save")
    }

    override fun deleteRoom(no: Int) {
        println("CoreDataDBService delete")
    }
}

class MySQLDBService: DataBaseService {
    override fun saveRoom(room: Room) {
        println("MySQLDBService save")
    }

    override fun deleteRoom(no: Int) {
        println("MySQLDBService delete")
    }
}

class Room2Activity {
    var databaseService: DataBaseService? = null

    constructor(databaseService: DataBaseService) {
        this.databaseService = databaseService
    }

    fun saveRoomToDB(room: Room) {
        databaseService?.saveRoom(room)
    }

    fun deleteRoomFromDB(no: Int) {
        databaseService?.deleteRoom(no)
    }
}

val sqliteDB = SQLiteDBService()
val coreDataDB = CoreDataDBService()
val mysqlDB = MySQLDBService()

val room2VC = Room2Activity(sqliteDB)
val room2 = Room(2, listOf("IPCam", "VDP"))

// sql
room2VC.saveRoomToDB(room2)
room2VC.deleteRoomFromDB(room2.no)

// coredata
room2VC.databaseService = coreDataDB
room2VC.saveRoomToDB(room2)
room2VC.deleteRoomFromDB(room2.no)

// mysql
room2VC.databaseService = mysqlDB
room2VC.saveRoomToDB(room2)
room2VC.deleteRoomFromDB(room2.no)
```

{% endtab %}

{% endtabs %}

**Improvement Effects**:
Now `Room2ViewController` depends on the abstract `DataBaseService` interface rather than concrete implementations. This brings tremendous flexibility:

- Can freely switch different database implementations at runtime
- Adding new database types only requires implementing the interface, no need to modify existing code
- Each database implementation is independent and doesn't affect others

**DIP Implementation Methods**:

- **Interface**
- **Protocol**
- **Abstract Class**

**Benefits of Depending on Abstractions**:

- **Enhanced flexibility**: Makes code more flexible and easy to swap dependency objects
- **Improved maintainability**: Adding an abstraction layer makes code easier to maintain and test
- **Simplified testing**: Abstraction layers allow us to easily create mock objects for quickly testing program logic

## Encapsulate What Varies

**Core Concept**: Identify parts of your program that might need to change, separate them from those that stay the same, and encapsulate them independently.

This principle requires us to identify variation points in the system and encapsulate these variations. The benefit is that when requirements change, we only need to modify the varying parts while stable code remains unchanged.

**Practical Application Example**:
Suppose we want to design an ordering system for a pancake shop:

{% tabs encapsulate-what-varies-1 %}

{% tab encapsulate-what-varies-1 Swift %}

```swift
func orderPancake(type: String) {
    var pancake: Pancake?

    // Code that is varying
    switch type {
    case "classic":
        pancake = ClassicPancake()
    case "blueberry":
        pancake = BlueberryPancake()
    case "banana":
        pancake = BananaPancake()
//    case "chocolate chip":
//        pancake = ChocolateChipPancake()
    default:
        pancake = ClassicPancake()
    }

    // Important code that does not vary
    pancake?.cook()
    pancake?.plate()
    pancake?.addButter()
}
```

{% endtab %}

{% tab encapsulate-what-varies-1 Kotlin %}

```kotlin
fun orderPancake(type: String) {

    // Code that is varying
    val pancake: Pancake = when (type) {
        "classic" -> ClassicPancake()
        "blueberry" -> BlueberryPancake()
        "banana" -> BananaPancake()
//        "chocolate chip" -> ChocolateChipPancake()
        else -> ClassicPancake()
    }

    // Important code that does not vary
    pancake.cook()
    pancake.plate()
    pancake.addButter()
}
```

{% endtab %}

{% endtabs %}

**Problem Analysis**:
In the above code, we can identify two different parts:

- **Code that varies**: Logic for creating different pancake objects based on flavor type
- **Code that doesn't vary**: The preparation process of `cook()`, `plate()`, `addButter()`

When the boss wants to add `ChocolateChip` flavor, we must modify the `switch` statement, but the preparation process doesn't need to change at all.

**Solution**:
We should extract the varying code and encapsulate it, reducing impact on stable code:

{% tabs encapsulate-what-varies-2 %}

{% tab encapsulate-what-varies-2 Swift %}

```swift
public class SimplePancakeFactory {
    public class func createPancake(type: String) -> Pancake? {
        var pancake: Pancake?

        // Code that is varying
        switch type {
        case "classic":
            pancake = ClassicPancake()
        case "blueberry":
            pancake = BlueberryPancake()
        case "banana":
            pancake = BananaPancake()
        //    case "chocolate chip":
        //        pancake = ChocolateChipPancake()
        default:
            pancake = ClassicPancake()
        }

        return pancake
    }
}

func orderPancakeWithFactory(type: String) {
    let pancake = SimplePancakeFactory.createPancake(type: type)

    // Important code that does not vary
    pancake?.cook()
    pancake?.plate()
    pancake?.addButter()
}
```

{% endtab %}

{% tab encapsulate-what-varies-2 Kotlin %}

```kotlin
object SimplePancakeFactory {
    fun createPancake(type: String): Pancake {
        return when (type) {
            "classic" -> ClassicPancake()
            "blueberry" -> BlueberryPancake()
            "banana" -> BananaPancake()
//        "chocolate chip" -> ChocolateChipPancake()
            else -> ClassicPancake()
        }
    }
}

fun orderPancakeWithFactory(type: String) {
    val pancake = SimplePancakeFactory.createPancake(type)

    // Important code that does not vary
    pancake.cook()
    pancake.plate()
    pancake.addButter()
}
```

{% endtab %}

{% endtabs %}

**Improvement Effects**:
By encapsulating variation, we successfully separated responsibilities:

- `SimplePancakeFactory`: Specifically handles the varying pancake creation logic
- `orderPancakeWithFactory()`: Focuses on the stable preparation process

Now when we need to add new flavors:

- Only need to modify the creation logic in `SimplePancakeFactory`
- No need to touch the preparation process code at all
- Reduces modification risk and improves code stability

## Favor composition over inheritance

**Core Concept**: HAS-A (composition relationship) is often better than IS-A (inheritance relationship).

This principle suggests we should use composition to replace inheritance whenever possible. This doesn't mean completely avoiding inheritance, but rather prioritizing composition in most situations. Composition provides greater flexibility, avoiding the complexity and limitations that inheritance might bring.

**Why is composition better?**

- Can dynamically change behavior at runtime
- Avoids the problem of overly deep inheritance hierarchies
- Reduces explosive growth in the number of classes
- Provides better code reusability

**Practical Application Example**:
Suppose we want to design an ordering system for a coffee shop, initially we might use inheritance:

{% include figure.liquid path="assets/img/design_pattern_design_principle_favor_composition_over_inheritance_1.png" title="design_pattern_design_principle_favor_composition_over_inheritance_1" %}

**Problems with inheritance approach**:
When customers want both Butter and Milk flavors, we need to define a new class `CoffeeWithButterAndMilk`.

This design encounters serious problems:

- As condiment types increase, coffee combinations grow exponentially
- Explosive increase in number of classes (need `CoffeeWithMilk`, `CoffeeWithButter`, `CoffeeWithMilkAndButter`, etc.)
- When milk price increases, all Coffee classes containing milk must be modified
- Cannot dynamically adjust condiment combinations at runtime

**Composition approach solution**:
Change design thinking from "milk coffee is-a coffee" to "coffee has-a various condiments":

{% include figure.liquid path="assets/img/design_pattern_design_principle_favor_composition_over_inheritance_2.png" title="design_pattern_design_principle_favor_composition_over_inheritance_2" %}

**Advantages of composition approach**:

1. **Runtime flexibility**: Can dynamically replace different condiment objects during program execution
2. **Easy to extend**: Adding a new condiment only requires adding one corresponding class
3. **Avoid duplicate code**: Condiment logic is independent, no duplicate implementation
4. **Control complexity**: Avoid explosive increase in number of classes
5. **Independent maintenance**: Price and logic of each condiment can be modified independently

**Important Reminder**:
We're not completely abandoning inheritance, but "prioritizing" composition. Appropriate inheritance still has its value, as in the above example where Mocha, Butter, and Milk also inherit from Condiment to implement common interfaces.

The key is finding the optimal balance between composition and inheritance.

## Loose Coupling

**Core Concept**: Keep each component independent, minimizing mutual influence between parts.

Loose coupling is an important goal in software design, allowing different parts of the system to change independently without affecting other parts. Tightly coupled systems are difficult to maintain, test, and extend, while loosely coupled systems have better flexibility and maintainability.

**Practical Application Example**:
Let's design a weather application that can get temperature data and display it on screen:

{% include figure.liquid path="assets/img/design_pattern_design_principle_loose_coupling_1.png" title="design_pattern_design_principle_loose_coupling_1" %}

**Problems with tight coupling**:
In the above design, `WeatherApp` is tightly coupled with `LCDScreen`, causing the following problems:

- When requirements change (like switching to Widget or LED display), must modify `WeatherApp` code
- Cannot dynamically replace display devices at runtime
- Difficult to perform unit testing (cannot easily create fake display objects)
- System lacks flexibility and poor extensibility

**Decoupling solution**:
We can eliminate tight coupling by introducing an abstraction layer:

{% include figure.liquid path="assets/img/design_pattern_design_principle_loose_coupling_2.png" title="design_pattern_design_principle_loose_coupling_2" %}

**Effects of decoupling**:
By introducing the `DisplayDevice` interface, we successfully achieved loose coupling:

- `WeatherApp` now depends on abstract interfaces rather than concrete implementations
- Can easily replace any display device implementing the `DisplayDevice` interface
- Supports dynamic replacement of display devices at runtime
- Facilitates unit testing (can create Mock objects)
- Adding new display device types requires no modification of existing code

**Core strategy for loose coupling**: Use abstract interfaces wisely to decouple two concrete objects, providing systems with better flexibility and maintainability.

## Program to Interfaces

**Core Concept**: When writing programs, code against interfaces (abstractions) rather than concrete implementations.

This principle is an important mindset in modern software development. When you get used to programming to interfaces, you'll find code becomes very flexible and easy to maintain.

**Advantages of programming to interfaces**:

- **High interchangeability**: Any object can be easily replaced
- **Easy to test**: Can easily create mock objects for testing
- **Architecture flexibility**: In MVC, MVP and other architectures, can easily replace components
- **Easy extension**: Adding new functionality becomes simpler

**Industry recognition**:
Even Apple specifically mentioned Swift's [Protocol-Oriented Programming](https://developer.apple.com/videos/play/wwdc2015/408/) at WWDC15, emphasizing the importance of protocol (interface) centered programming thinking.

**Practical Application Example**:
Let's design a basic website system including WebSystem and database for data access:

{% include figure.liquid path="assets/img/design_pattern_design_principle_program_to_interface_1.png" title="design_pattern_design_principle_program_to_interface_1" %}

**Problem scenario**:
Suppose we want to temporarily replace `CommercialDB` with `TestDB` for testing before going live. But in the current design, `KillerWebSystem` directly depends on the concrete `CommercialDB` class, making it difficult to swap easily.

**Solution**:
Solve this problem by introducing abstract interfaces:

{% include figure.liquid path="assets/img/design_pattern_design_principle_program_to_interface_2.png" title="design_pattern_design_principle_program_to_interface_2" %}

**Improvement effects**:
By creating the `AbstractDB` interface, both `CommercialDB` and `TestDB` implement the same interface. Now `KillerWebSystem` depends on abstract interfaces rather than concrete implementations.

This design brings huge benefits:

- Can easily switch between test and production databases
- Adding new database types (like MockDB) becomes simple
- Code is more flexible and maintainable
- Truly implements interface-based programming thinking

## Summary

In this article, we deeply explored the core concepts and practical applications of software design principles. Through rich examples and specific code demonstrations, we learned how to apply these principles to improve code quality.

**Review of design principles we learned**:

**SOLID Principles**:

- **Single Responsibility Principle (SRP)**: Let each class focus on a single function, improving code cohesion
- **Open-Closed Principle (OCP)**: Open for extension, closed for modification, achieving flexible extension through abstraction
- **Liskov Substitution Principle (LSP)**: Ensure child classes can completely replace parent classes, guaranteeing polymorphism correctness
- **Interface Segregation Principle (ISP)**: Use multiple specialized interfaces rather than single general-purpose interfaces, avoiding unnecessary dependencies
- **Dependency Inversion Principle (DIP)**: Depend on abstractions rather than concrete implementations, improving system flexibility

**Other important principles**:

- **Encapsulate What Varies**: Identify and encapsulate variation points in the system, protecting stable code
- **Favor composition over inheritance**: Prioritize composition relationships, avoiding complexity brought by inheritance
- **Loose Coupling**: Reduce mutual dependencies between components, improving system maintainability
- **Program to Interfaces**: Code against abstractions rather than concrete implementations

**Moving toward design patterns**:
Design principles are the cornerstone for building robust, extensible, and flexible systems. They provide us with frameworks for thinking about problems, while design patterns are concrete applications of these principles in specific scenarios.

Having mastered these principles, we now have the foundation for understanding and applying design patterns. In the upcoming series articles, we will explore how various design patterns use these principles to solve more complex design challenges, further enhancing your software design capabilities.

{% include figure.liquid path="assets/img/design_pattern_design_principle_architecture.png" title="design_pattern_design_principle_architecture" %}

> Object-Oriented Concepts -> Design Principle -> Design Pattern

## References

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [大話設計模式](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [水球潘 - Design Pattern 之路](https://www.youtube.com/watch?v=yOe-uywb2qs&list=PLicQRHHL75d7EXEI9nWfUYJyrPdI79M70&pp=iAQB)

**Note:** If you have any suggestions, questions or different ideas, feel free to leave a comment or send me an email, we can discuss and grow together 🙂
{: .notice--success}
