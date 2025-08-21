---
layout: post
title: 設計模式（2）設計原則 SOLID Principles 完整教學：提升程式碼品質的五大原則
date: 2024-07-03 23:00:00 +0800
description: 深入解析 SOLID 五大設計原則：單一職責、開放封閉、里氏替換、介面隔離與依賴反轉。透過實用範例與程式碼演示，學會如何設計穩健、可維護的軟體系統。
tags: [Design Principles, SOLID Principles, Object-Oriented Design, Software Architecture, Clean Code, Design Pattern, Software Development, Code Quality]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## Design Principle

設計原則（Design Principle）是軟體開發中的重要指導方針，專門用來幫助我們改善物件導向設計。

這些原則提供了清晰的方向，讓我們能夠設計出更加穩健、可維護且易於擴展的軟體系統。遵循這些原則不僅能提升程式碼品質，還能減少未來的維護成本，讓開發團隊更有效率地協作。

## SOLID 物件導向程式設計基本五大原則

### Single Responsibility Principle (SRP) 單一職責原則

**核心概念**：每個物件應該僅具有一種單一功能，且只會有一個理由去改變此物件。

這個原則強調職責分離的重要性。當一個類別承擔太多責任時，任何一個責任的變更都可能影響到其他功能，增加了維護的複雜度和出錯的風險。

**實際應用範例**：
讓我們以常見的登入頁面功能為例。初學者往往會將所有相關功能都塞進同一個類別：

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

**問題分析**：
上述程式碼違反了 SRP 原則，因為 `LoginViewController` 同時承擔了三個不同的職責：
- 處理使用者介面邏輯
- 管理網路 API 請求
- 處理資料庫操作

**解決方案**：
依照單一職責原則，我們應該將不同職責分離到各自的類別中：

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

**改善效果**：
現在每個類別都有明確且單一的職責：
- `ServerApiRequestService`：專注於網路請求處理
- `DBService`：專注於資料庫操作
- `LoginViewControllerSRP`：專注於協調各個服務和處理 UI 邏輯

**重要提醒**：
有些文章建議將 `save` 和 `delete` 功能拆分到不同的類別（如 `DeleteDBService`、`SaveDBService`），認為這兩個是不同的職責。

然而，過度拆分可能導致設計過於複雜（Over Design），反而降低程式碼的可維護性。拆分職責應該適當而不過度，需要在功能內聚性和職責分離之間找到平衡點。

### Open Closed Principle (OCP) 開放封閉原則

**核心概念**：軟體實體應該對擴充開放，對修改封閉。

這個原則的精神在於：當需要添加新功能時，我們應該通過擴充現有程式碼來實現，而不是修改既有的程式碼。這樣可以避免對穩定運行的程式碼造成影響，降低引入新 Bug 的風險。

**實際應用範例**：
在開發過程中，我們經常需要驗證使用者輸入的各種資料格式。讓我們設計一個通用的驗證器：

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

**問題分析**：
上述設計存在一個重大問題：當客戶要求增加新的驗證類型（如 Email、Phone Number、Device Mac 等）時，我們必須修改 `Validator` 類別的程式碼。

這違反了開放封閉原則，因為：
- 每次新增功能都要修改現有程式碼
- 可能影響已經穩定運行的驗證邏輯
- 增加了引入 Bug 的風險

**解決方案**：
我們可以透過抽象化和多型來解決這個問題，讓系統對擴充開放、對修改封閉：

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

**改善效果**：
現在當我們需要新增 Email、Phone Number、Device Mac 等格式檢查時，只需要：

1. 建立對應的驗證器類別：`EmailValidator`、`PhoneNumberValidator`、`DeviceMacValidator`
2. 讓這些類別實作 `ValidatorConvertible` 介面
3. 完全不需要修改既有的程式碼

這樣的設計真正實現了：
- **對擴充開放**：可以輕鬆新增新的驗證器
- **對修改封閉**：不會影響既有的穩定程式碼

### Liskov Substitution Principle (LSP) 里氏替換原則

**核心概念**：程式中的物件應該可以在不改變程式正確性的前提下被它的子類所替換。

這個原則強調的是繼承關係的正確性。子類別不僅要在語法上繼承父類別，更重要的是要在語意上保持一致的行為。違反 LSP 會導致多型失效，使得程式在使用子類別時產生意外的結果。

**實際應用範例**：
讓我們透過一個經典的幾何圖形範例來理解這個原則。假設我們需要計算正方形和長方形的面積：

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
            return "長寬需一致"
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
            "長寬需一致"
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

**問題分析**：
上述範例中，我們讓正方形繼承長方形，但正方形的 `getArea()` 方法行為卻與長方形不一致。當長寬不相等時，正方形會回傳錯誤訊息而非計算結果，這打破了 LSP 原則。

在數學概念上，雖然正方形是長方形的特例，但在程式設計中，這種繼承關係破壞了可替換性。使用者期望所有 `Rectangle` 物件都能正常計算面積，但 `Square` 卻可能回傳錯誤訊息。

**遵循 LSP 的好處**：
- **增強程式碼健全度**：在使用不同子類別時，能大幅保證彼此間的相容性
- **保證多型有效性**：只要父類別可以使用的地方，子類別也能正常使用
- **清晰的功能劃分**：子類別新增功能時應獨立於父類別功能之外，避免在不同子類別間移植時產生問題

### Interface Segregation Principle (ISP) 介面隔離原則

**核心概念**：多個特定客戶端介面要好於一個寬泛用途的介面。

這個原則建議我們不應該強迫類別實作它們不使用的介面方法。當介面過於龐大時，實作類別可能被迫實作一些對它而言毫無意義的方法，這會增加耦合度並降低系統的靈活性。

**實際應用範例**：
假設我們需要設計一個車輛操作系統，讓不同類型的使用者能夠操作車子：

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

**問題分析**：
在上述設計中，所有實作 `Car` 介面的類別都必須實作 `enableDebugMode()` 方法。但實際上：
- 工程師（Engineer）需要開啟 DebugMode 來進行車輛診斷
- 一般駕駛（Driver）不應該也不需要開啟 DebugMode

這違反了介面隔離原則，因為駕駛被強迫實作了不相關的方法。

**解決方案**：
我們應該將 `enableDebugMode()` 隔離成獨立的介面，讓不同角色只實作它們真正需要的功能：

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

**改善效果**：
現在我們有了兩個獨立的介面：
- `Car1`：包含基本的車輛操作功能（啟動/停止引擎）
- `Debuggable`：包含除錯功能

這樣的設計確保：
- 一般駕駛只需實作基本的車輛操作功能
- 只有工程師才實作除錯功能
- 各個角色都只實作它們真正需要的介面方法

### Dependency Inversion Principle (DIP) 依賴反向原則

**核心概念**：
- 高階模組不應該依賴於低階模組，兩者都應該依賴抽象
- 抽象不應該依賴細節，細節應該依賴抽象

這個原則是 SOLID 原則中最重要的一個，它要求我們反轉傳統的依賴關係。透過引入抽象層，我們可以讓系統更加靈活、易於測試和維護。

**實際應用範例**：
讓我們設計一個智慧家居系統，能夠管理不同房間的 IoT 設備。例如客廳有智慧音箱和溫度控制器，廚房有煙霧偵測器等：

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

**問題分析**：
上述設計中，`RoomViewController` 直接依賴於具體的 `SQLiteService` 類別。這造成了緊密耦合的問題：

如果今天因為效能考量（如 SQLite 速度過慢）需要更換為 CoreData 或其他資料庫系統，我們會發現系統無法輕易抽換。這是因為高階模組（Controller）直接依賴於低階模組（SQLite 實作）。

**解決方案**：
透過依賴抽象而非具體實作，我們可以讓程式碼變得非常容易抽換和測試：

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

**改善效果**：
現在 `Room2ViewController` 依賴於抽象的 `DataBaseService` 介面，而非具體的實作。這帶來了巨大的靈活性：

- 可以在執行時期自由切換不同的資料庫實作
- 新增資料庫類型只需實作介面，無需修改現有程式碼
- 每個資料庫實作都是獨立的，互不影響

**DIP 的實作方式**：
- **Interface**（介面）
- **Protocol**（協議）
- **Abstract Class**（抽象類別）

**依賴抽象的好處**：
- **提升彈性**：使程式碼更加靈活，容易抽換依賴物件
- **改善維護性**：多寫一層抽象能讓程式碼更好維護和測試
- **簡化測試**：抽象層讓我們能輕鬆製作假物件（Mock Objects）來快速測試程式邏輯

## Encapsulate What Varies 封裝變化

**核心概念**：找出程式中可能需要更動之處，把它們獨立出來，不要和那些不需要更動的程式碼混在一起。

這個原則要求我們識別系統中的變化點，並將這些變化封裝起來。這樣做的好處是當需求變更時，我們只需要修改變化的部分，而穩定的程式碼保持不變。

**實際應用範例**：
假設我們要設計一間鬆餅店的訂購系統：

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

**問題分析**：
在上述程式碼中，我們可以識別出兩個不同的部分：
- **會變化的程式碼**：根據口味類型建立不同鬆餅物件的邏輯
- **不會變化的程式碼**：`cook()`、`plate()`、`addButter()` 這些製作流程

當老闆想要新增 `ChocolateChip` 口味時，我們必須修改 `switch` 陳述式，但製作流程完全不需要改變。

**解決方案**：
我們應該將會變化的程式碼抽出來封裝，減少對穩定程式碼的影響：

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

**改善效果**：
透過封裝變化，我們成功地將職責分離：
- `SimplePancakeFactory`：專門負責處理會變化的鬆餅建立邏輯
- `orderPancakeWithFactory()`：專注於穩定的製作流程

現在當需要新增新口味時：
- 只需修改 `SimplePancakeFactory` 中的建立邏輯
- 完全不需要觸碰製作流程的程式碼
- 降低了修改風險，提升了程式碼的穩定性

## Favor composition over inheritance 多用合成，少用繼承

**核心概念**：HAS-A（擁有關係/合成）往往比 IS-A（是一種關係/繼承）更好。

這個原則建議我們盡量使用合成來取代繼承。這並不是完全不使用繼承，而是在多數情況下應該優先考慮合成。合成提供了更大的靈活性，避免了繼承可能帶來的複雜性和限制。

**為什麼合成更好？**
- 可以在執行時期動態改變行為
- 避免繼承階層過深的問題
- 減少類別數量的爆炸性增長
- 提供更好的程式碼重用性

**實際應用範例**：
假設我們要設計一間咖啡店的點餐系統，起初可能會採用繼承的方式：

{% include figure.liquid path="assets/img/design_pattern_design_principle_favor_composition_over_inheritance_1.png" title="design_pattern_design_principle_favor_composition_over_inheritance_1" %}

**繼承方式的問題**：
當客人想要 Butter 和 Milk 雙重口味時，我們需要定義新的類別 `CoffeeWithButterAndMilk`。

這種設計會遭遇嚴重問題：
- 隨著調味料種類增多，咖啡組合呈指數增長
- 類別數量爆炸性增加（如需要 `CoffeeWithMilk`、`CoffeeWithButter`、`CoffeeWithMilkAndButter`等）
- 當牛奶價格上漲時，所有包含牛奶的 Coffee 類別都必須修改
- 無法在執行時期動態調整調味料組合

**合成方式的解決方案**：
將設計思維從「牛奶咖啡是（is-A）咖啡」轉換為「咖啡擁有（has-A）各種調味料」：

{% include figure.liquid path="assets/img/design_pattern_design_principle_favor_composition_over_inheritance_2.png" title="design_pattern_design_principle_favor_composition_over_inheritance_2" %}

**合成方式的優勢**：

1. **執行時期靈活性**：可以在程式執行時動態替換不同的調料物件
2. **易於擴展**：新增一種調料只需新增一個對應的類別
3. **避免重複程式碼**：調料邏輯獨立，不會重複實作
4. **控制複雜度**：避免類別數量爆炸性增加
5. **獨立維護**：每種調料的價格和邏輯可以獨立修改

**重要提醒**：
我們並非完全摒棄繼承，而是「優先考慮」使用合成。適當的繼承仍然有其價值，如上圖範例中的 Mocha、Butter 及 Milk 也是透過繼承 Condiment 來實現共同的介面。

關鍵在於找到合成與繼承的最佳平衡點。

## Loose Coupling 鬆耦合

**核心概念**：將每個組件獨立開來，使部件之間的相互影響降到最低。

鬆耦合是軟體設計中的重要目標，它讓系統的各個部分能夠獨立變化而不會影響其他部分。緊密耦合的系統難以維護、測試和擴展，而鬆耦合的系統則具有更好的靈活性和可維護性。

**實際應用範例**：
讓我們設計一個天氣應用程式，它可以取得溫度資料並顯示在螢幕上：

{% include figure.liquid path="assets/img/design_pattern_design_principle_loose_coupling_1.png" title="design_pattern_design_principle_loose_coupling_1" %}

**緊密耦合的問題**：
在上圖的設計中，`WeatherApp` 與 `LCDScreen` 緊密耦合，這造成了以下問題：

- 當需求變更（如改用 Widget 或 LED 顯示）時，必須修改 `WeatherApp` 的程式碼
- 無法在執行時期動態替換顯示設備
- 難以進行單元測試（無法輕易建立假的顯示器物件）
- 系統缺乏彈性，擴展性差

**解耦合的解決方案**：
我們可以透過引入抽象層來解除兩者之間的緊密耦合：

{% include figure.liquid path="assets/img/design_pattern_design_principle_loose_coupling_2.png" title="design_pattern_design_principle_loose_coupling_2" %}

**解耦合的效果**：
透過引入 `DisplayDevice` 介面，我們成功實現了鬆耦合：

- `WeatherApp` 現在依賴於抽象的介面而非具體實作
- 可以輕易替換任何實作 `DisplayDevice` 介面的顯示設備
- 支援執行時期動態替換顯示設備
- 便於單元測試（可建立 Mock 物件）
- 新增顯示設備類型無需修改現有程式碼

**鬆耦合的核心策略**：善用抽象介面來解耦兩個實體物件，讓系統具備更好的靈活性和可維護性。

## Program to Interfaces 基於介面編程

**核心概念**：編寫程式時應該針對介面（抽象）而寫，而不是針對具體實作方式而寫。

這個原則是現代軟體開發的重要思維模式。當你習慣基於介面編程，會發現程式碼變得非常靈活且容易維護。

**基於介面編程的優勢**：
- **高度可抽換性**：任何物件都能輕易替換
- **便於測試**：可以輕鬆建立假物件（Mock Objects）來測試
- **架構靈活性**：在 MVC、MVP 等架構中，能夠輕易替換組件
- **擴展容易**：新功能的加入變得更加簡單

**業界認同**：
連 Apple 都在 WWDC15 中特別提到 Swift 的 [Protocol-Oriented Programming](https://developer.apple.com/videos/play/wwdc2015/408/)，強調以協議（介面）為中心的程式設計思維的重要性。

**實際應用範例**：
讓我們設計一個基本的網站系統，包含 WebSystem 和資料庫來處理資料存取：

{% include figure.liquid path="assets/img/design_pattern_design_principle_program_to_interface_1.png" title="design_pattern_design_principle_program_to_interface_1" %}

**問題場景**：
假設我們想在正式上線前，將 `CommercialDB` 暫時換成 `TestDB` 進行測試。但目前的設計中，`KillerWebSystem` 直接依賴具體的 `CommercialDB` 類別，導致無法輕易抽換。

**解決方案**：
透過引入抽象介面來解決這個問題：

{% include figure.liquid path="assets/img/design_pattern_design_principle_program_to_interface_2.png" title="design_pattern_design_principle_program_to_interface_2" %}

**改善效果**：
透過建立 `AbstractDB` 介面，讓 `CommercialDB` 和 `TestDB` 都實作相同的介面。現在 `KillerWebSystem` 依賴的是抽象介面而非具體實作。

這樣的設計帶來了巨大的好處：
- 可以輕鬆在測試環境和正式環境間切換資料庫
- 新增新的資料庫類型（如 MockDB）變得簡單
- 程式碼更加靈活且易於維護
- 真正實現了基於介面的程式設計思維

## 總結

在本篇文章中，我們深入探討了軟體設計原則的核心概念與實際應用。通過豐富的範例和具體的程式碼演示，我們學習了如何運用這些原則來改善程式碼品質。

**我們學習的設計原則回顧**：

**SOLID 原則**：
- **單一職責原則（SRP）**：讓每個類別專注於單一功能，提升程式碼的內聚性
- **開放封閉原則（OCP）**：對擴充開放、對修改封閉，通過抽象化實現靈活擴展
- **里氏替換原則（LSP）**：確保子類別能夠完全替換父類別，保證多型的正確性
- **介面隔離原則（ISP）**：使用多個專用介面勝過單一萬能介面，避免不必要的依賴
- **依賴反向原則（DIP）**：依賴抽象而非具體實作，提升系統的靈活性

**其他重要原則**：
- **封裝變化**：識別並封裝系統中的變化點，保護穩定的程式碼
- **多用合成，少用繼承**：優先考慮組合關係，避免繼承帶來的複雜性
- **鬆耦合**：降低組件間的相互依賴，提升系統的可維護性
- **基於介面編程**：針對抽象編程，而非具體實作

**邁向設計模式**：
設計原則是構建健壯、可擴展和靈活系統的基石。它們為我們提供了思考問題的框架，而設計模式則是這些原則在特定場景下的具體應用。

掌握了這些原則後，我們已經具備了理解和運用設計模式的基礎。在接下來的系列文章中，我們將探索各種設計模式如何運用這些原則來解決更複雜的設計挑戰，進一步提升您的軟體設計能力。

{% include figure.liquid path="assets/img/design_pattern_design_principle_architecture.png" title="design_pattern_design_principle_architecture" %}

> Object-Oriented Concepts -> Design Principle -> Design Pattern

## 參考

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [大話設計模式](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [水球潘 - Design Pattern 之路](https://www.youtube.com/watch?v=yOe-uywb2qs&list=PLicQRHHL75d7EXEI9nWfUYJyrPdI79M70&pp=iAQB)

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長 🙂
{: .notice--success}
