---
layout: post
title: "設計模式 10：單例模式（Singleton Pattern）——資料庫連線與全域狀態管理的唯一實例解決方案"
date: 2024-08-10 15:00:00 +0800
description: "深入掌握單例模式（Singleton Pattern），確保類別僅有一個實例，並學會實作執行緒安全的單例，應用於資料庫連線、日誌系統與全域設定管理，提升效能與一致性。"
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
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 下載完整設計模式系列程式碼：[design_pattern repo](https://github.com/nickhuangcyh/design_pattern)

## 單例模式簡介：掌控唯一實例的力量

單例模式（Singleton Pattern）是一種創建型設計模式，確保某個類別在應用程式中僅有一個實例，並提供全域存取點。這對於管理共用資源、全域狀態與確保應用一致性至關重要。

## 實務應用場景

單例模式常見於以下情境：

- **資料庫連線**：集中管理連線池，避免重複建立連線，提升效能
- **日誌系統**：統一日誌設定，確保記錄一致
- **全域設定管理**：集中管理應用程式設定與偏好
- **快取管理**：全域共用快取物件
- **服務定位器**：集中服務註冊與依賴注入

## 問題情境：資料庫連線管理

假設我們開發一個頻繁存取資料庫的應用，若每次操作都建立新連線，將導致資源浪費與效能下降。如何有效管理資料庫連線？

## 物件導向分析（OOA）

初步設計如下：

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_1.png" title="未使用單例模式的資料庫客戶端設計" %}

每次 CRUD 操作都會產生新的 DatabaseClient 實例。

## 設計痛點分析

未採用單例模式時，會遇到：

1. **資源浪費**：多個連線佔用過多資源，影響效能
2. **資料一致性問題**：不同連線導致資料狀態不一致
3. **效率低落**：頻繁建立/銷毀連線拖慢系統
4. **連線數限制**：易超過資料庫最大連線數

## 單例模式解決方案

單例模式可確保全程僅有一個實例，集中管理資源。

### 單例模式 UML 結構

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_2.png" title="單例模式 UML 圖" %}

透過 `getInstance()` 方法取得唯一實例，若尚未建立則新建，否則回傳現有實例。

### 應用於資料庫客戶端

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_3.png" title="應用單例模式的資料庫客戶端設計" %}

## 程式實作：物件導向設計

### 基本單例實作（Kotlin 範例）

```kotlin
class DatabaseClient {
    fun create(tableName: String, data: Map<String, Any>): Int { /* ... */ }
    fun read(tableName: String, conditions: Map<String, Any>): Int { /* ... */ }
    fun update(tableName: String, data: Map<String, Any>, conditions: Map<String, Any>): Int { /* ... */ }
    fun delete(tableName: String, conditions: Map<String, Any>): Int { /* ... */ }
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

### 用戶端使用方式

```kotlin
fun main() {
    val db1 = DatabaseClient.getInstance()
    val db2 = DatabaseClient.getInstance()
    println("兩個實例相同？${db1 === db2}") // true
    db1.create("users", mapOf("name" to "John", "email" to "john@example.com"))
    db2.read("users", mapOf("name" to "John"))
}
```

### Kotlin 物件宣告（更簡潔的單例）

```kotlin
object DatabaseClient {
    fun create(tableName: String, data: Map<String, Any>): Int { /* ... */ }
    fun read(tableName: String, conditions: Map<String, Any>): Int { /* ... */ }
    fun update(tableName: String, data: Map<String, Any>, conditions: Map<String, Any>): Int { /* ... */ }
    fun delete(tableName: String, conditions: Map<String, Any>): Int { /* ... */ }
}
```

### 直接存取物件

```kotlin
fun main() {
    val db = DatabaseClient
    db.create("users", mapOf("name" to "John", "email" to "john@example.com"))
}
```

## 進階實作：執行緒安全單例

### Double-Checked Locking 實作

```kotlin
class ThreadSafeDatabaseClient private constructor() {
    // ... CRUD 方法 ...
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

### Lazy Initialization 委託

```kotlin
class LazyDatabaseClient private constructor() {
    // ... CRUD 方法 ...
    companion object {
        val instance: LazyDatabaseClient by lazy { LazyDatabaseClient() }
    }
}
```

## 實務範例：全域設定管理器

```kotlin
object ConfigurationManager {
    private val properties = mutableMapOf<String, String>()
    init {
        // 載入設定
        properties["database.url"] = System.getenv("DB_URL") ?: "localhost:5432"
        properties["database.username"] = System.getenv("DB_USERNAME") ?: "default"
        properties["database.password"] = System.getenv("DB_PASSWORD") ?: "password"
        properties["app.environment"] = System.getenv("APP_ENV") ?: "development"
    }
    fun getProperty(key: String): String? = properties[key]
    fun setProperty(key: String, value: String) { properties[key] = value }
    fun getAllProperties(): Map<String, String> = properties.toMap()
}
// 使用方式
fun main() {
    val dbUrl = ConfigurationManager.getProperty("database.url")
    println("Database URL: $dbUrl")
    ConfigurationManager.setProperty("app.debug", "true")
    println("Debug mode: ${ConfigurationManager.getProperty("app.debug")}")
}
```

## 最佳實踐與注意事項

### 1. 執行緒安全

```kotlin
// 推薦：執行緒安全單例
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
// 避免：非執行緒安全單例
class BadSingleton {
    companion object {
        private var instance: BadSingleton? = null
        fun getInstance(): BadSingleton {
            if (instance == null) {
                instance = BadSingleton() // 可能產生競態條件！
            }
            return instance!!
        }
    }
}
```

### 2. 延遲初始化

```kotlin
// 推薦：lazy 延遲初始化
object LazySingleton {
    val instance by lazy {
        // 複雜初始化
        ExpensiveObject()
    }
}
// 避免：急切初始化
object EagerSingleton {
    val instance = ExpensiveObject() // 啟動時即建立
}
```

### 3. 測試友善

```kotlin
// 推薦：可重設單例，方便測試
class TestableDatabaseClient private constructor() {
    companion object {
        @Volatile
        private var instance: TestableDatabaseClient? = null
        fun getInstance(): TestableDatabaseClient {
            return instance ?: synchronized(this) {
                instance ?: TestableDatabaseClient().also { instance = it }
            }
        }
        // 測試用重設
        fun resetInstance() { instance = null }
    }
}
```

## 各種實作效能比較

| 實作方式               | 執行緒安全 | 效能 | 記憶體用量 | 複雜度 |
| ---------------------- | ---------- | ---- | ---------- | ------ |
| 急切單例               | 是         | 高   | 高         | 低     |
| lazy 單例              | 是         | 中   | 低         | 中     |
| Double-Checked Locking | 是         | 高   | 低         | 高     |
| Kotlin 物件            | 是         | 高   | 低         | 低     |

## 常見反模式與誤用

### 1. 濫用全域狀態

```kotlin
// 避免：所有狀態都用單例
object GlobalState {
    var userData: MutableMap<String, Any> = mutableMapOf()
    var appSettings: MutableMap<String, Any> = mutableMapOf()
    var cache: MutableMap<String, Any> = mutableMapOf()
}
```

### 2. 過度耦合

```kotlin
// 避免：直接依賴單例
class UserService {
    fun createUser(user: User) {
        DatabaseClient.getInstance().create("users", user.toMap())
    }
}
// 改善：依賴注入
class UserService(private val databaseClient: DatabaseClient) {
    fun createUser(user: User) {
        databaseClient.create("users", user.toMap())
    }
}
```

## 相關設計模式

- **工廠方法（Factory Method）**：動態建立物件
- **抽象工廠（Abstract Factory）**：建立相關物件家族
- **建造者（Builder）**：逐步構建複雜物件
- **原型（Prototype）**：複製現有物件

## 結論

單例模式能有效確保類別唯一實例，並提供全域存取，帶來：

- **資源管理**：提升系統效能
- **一致性**：確保全域狀態一致
- **全域存取**：方便共用資源
- **效能優化**：減少重複建立物件的開銷

此模式特別適合管理資料庫連線、日誌系統與全域設定。

## 延伸閱讀

- [設計模式 9：原型模式](/2024-07-19-design-pattern-9-prototype-pattern/)
- [設計模式 11：介面卡模式](/2024-12-07-design-pattern-11-adapter-pattern/)
- [設計模式 7：抽象工廠模式](/2024-07-08-design-pattern-7-abstract-factory-pattern/)
- [物件導向設計原則](/2024-07-03-design-pattern-2-design-principle/)
