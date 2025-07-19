---
layout: post
title: "設計模式 1：物件導向四大核心概念全解析（封裝、繼承、多型、抽象）"
date: 2024-07-02 23:00:00 +0800
description: "精通封裝、繼承、多型、抽象四大物件導向核心，打下設計模式與軟體架構的堅實基礎。圖文範例，適合軟體工程師、架構師與進階開發者。"
tags:
  [
    Object-Oriented Concepts,
    Design Patterns,
    Encapsulation,
    Inheritance,
    Polymorphism,
    Abstraction,
    Software Architecture,
    Programming Fundamentals,
    OOP,
    Software Design,
  ]
categories: [Design Patterns, Software Development, Object-Oriented Programming, Programming Fundamentals]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 下載完整設計模式系列程式碼：[design_pattern repo](https://github.com/nickhuangcyh/design_pattern)

## 前言：現代軟體設計的基石

物件導向程式設計（OOP）是現代軟體開發的基礎。理解封裝、繼承、多型、抽象這四大核心概念，是精通設計模式、打造高可維護性軟體的第一步。

## 實務應用場景

物件導向概念廣泛應用於：

- **軟體架構**：打造模組化、可擴展系統
- **設計模式**：實現經典解決方案
- **框架開發**：設計可重用元件
- **API 設計**：設計直觀易用的介面
- **資料庫設計**：建模複雜資料關係

## 物件導向四大支柱

這四大核心概念是理解複雜設計模式的基礎。以下以實例說明：

### 1. 封裝（Encapsulation）

封裝是將內部實作細節隱藏於類別內，只對外暴露必要方法，保護屬性與方法不被未授權存取。

> **生活比喻**：開車時只需知道油門加速、煞車減速，無需了解引擎、變速箱等細節，這些都被「封裝」起來。

#### 程式碼範例

```kotlin
class BankAccount {
    private var balance: Double = 0.0
    private val accountNumber: String
    constructor(accountNumber: String) {
        this.accountNumber = accountNumber
    }
    fun deposit(amount: Double): Boolean {
        if (amount > 0) {
            balance += amount
            return true
        }
        return false
    }
    fun withdraw(amount: Double): Boolean {
        if (amount > 0 && balance >= amount) {
            balance -= amount
            return true
        }
        return false
    }
    fun getBalance(): Double = balance
    fun getAccountNumber(): String = accountNumber
}
// 使用範例
val account = BankAccount("123456789")
account.deposit(1000.0)
println("餘額: ${account.getBalance()}") // 1000.0
// account.balance = -500 // 編譯錯誤 - private 權限
```

### 2. 繼承（Inheritance）

繼承允許子類別繼承父類別的屬性與方法，實現程式碼重用與階層關係。

> **生活比喻**：狗和貓都是動物，能呼吸、能移動；花和樹都是植物，能行光合作用，這就是繼承。

#### 程式碼範例

```kotlin
open class Animal {
    protected var name: String = ""
    protected var age: Int = 0
    open fun makeSound() {
        println("某種動物的叫聲")
    }
    open fun move() {
        println("像動物一樣移動")
    }
}
class Dog : Animal() {
    private var breed: String = ""
    fun setBreed(breed: String) {
        this.breed = breed
    }
    override fun makeSound() {
        println("汪！汪！")
    }
    override fun move() {
        println("四足奔跑")
    }
    fun fetch() {
        println("撿球")
    }
}
class Cat : Animal() {
    private var color: String = ""
    fun setColor(color: String) {
        this.color = color
    }
    override fun makeSound() {
        println("喵！喵！")
    }
    override fun move() {
        println("優雅地走路")
    }
    fun climb() {
        println("爬樹")
    }
}
// 使用範例
val dog = Dog()
dog.makeSound() // 汪！汪！
dog.fetch() // 撿球
val cat = Cat()
cat.makeSound() // 喵！喵！
cat.climb() // 爬樹
```

### 3. 多型（Polymorphism）

多型讓不同類別的物件可用統一介面操作，提升彈性與擴展性。

> **生活比喻**：iPhone 6S 不論晶片由台積電還是三星生產，對用戶來說功能一致，這就是多型。

#### 程式碼範例

```kotlin
interface PaymentMethod {
    fun processPayment(amount: Double): Boolean
    fun getPaymentType(): String
}
class CreditCard : PaymentMethod {
    private var cardNumber: String = ""
    private var expiryDate: String = ""
    fun setCardDetails(cardNumber: String, expiryDate: String) {
        this.cardNumber = cardNumber
        this.expiryDate = expiryDate
    }
    override fun processPayment(amount: Double): Boolean {
        println("信用卡支付 $amount 元")
        return true
    }
    override fun getPaymentType(): String = "Credit Card"
}
class PayPal : PaymentMethod {
    private var email: String = ""
    fun setEmail(email: String) {
        this.email = email
    }
    override fun processPayment(amount: Double): Boolean {
        println("PayPal 支付 $amount 元")
        return true
    }
    override fun getPaymentType(): String = "PayPal"
}
class PaymentProcessor {
    fun processPayment(paymentMethod: PaymentMethod, amount: Double): Boolean {
        println("使用 ${paymentMethod.getPaymentType()}")
        return paymentMethod.processPayment(amount)
    }
}
// 使用範例
val processor = PaymentProcessor()
val creditCard = CreditCard()
val paypal = PayPal()
processor.processPayment(creditCard, 100.0) // 使用 Credit Card
processor.processPayment(paypal, 50.0) // 使用 PayPal
```

### 4. 抽象（Abstraction）

抽象透過介面或抽象類別，隱藏實作細節，只暴露必要功能。

> **生活比喻**：手機安裝 App，「App」是抽象名稱，蘋果、香蕉等「水果」也是抽象概念。

#### 程式碼範例

```kotlin
abstract class Database {
    abstract fun connect(): Boolean
    abstract fun disconnect()
    abstract fun executeQuery(query: String): List<Map<String, Any>>
    fun isConnected(): Boolean {
        // 所有資料庫共用實作
        return true
    }
}
class MySQLDatabase : Database() {
    override fun connect(): Boolean {
        println("連接 MySQL 資料庫")
        return true
    }
    override fun disconnect() {
        println("斷開 MySQL 資料庫")
    }
    override fun executeQuery(query: String): List<Map<String, Any>> {
        println("在 MySQL 執行查詢: $query")
        return emptyList()
    }
}
class PostgreSQLDatabase : Database() {
    override fun connect(): Boolean {
        println("連接 PostgreSQL 資料庫")
        return true
    }
    override fun disconnect() {
        println("斷開 PostgreSQL 資料庫")
    }
    override fun executeQuery(query: String): List<Map<String, Any>> {
        println("在 PostgreSQL 執行查詢: $query")
        return emptyList()
    }
}
```

---

## 結語

物件導向四大核心概念是學習設計模式、打造高品質軟體的基石。熟練這些觀念，能讓你在軟體設計、架構、團隊協作上如虎添翼。

---

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
