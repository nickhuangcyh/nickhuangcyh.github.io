---
layout: post
title: Design Pattern (10) - Singleton Pattern (單例模式)
date: 2024-08-10 15:00:00 +0800
description: 深入單例模式：如何確保一個類別只有一個實體，提供一個全域
excerpt: 完整解析單例模式（Singleton Pattern）在軟體設計中的實作與應用：如何確保類別只有一個實體並提供全域存取點。包含多種實作方式：懶惰初始化、執行緒安全、雙重檢查鎖定等。適用於資料庫連接管理、系統設定、記錄器、快取管理等情境。學習物件導向程式設計、提升軟體架構能力的必備教學。
tags: [singleton-pattern, design-patterns, creational-patterns, software-architecture, object-oriented-programming, thread-safety, lazy-initialization, global-access, database-connection, system-design]
categories: [design-patterns, software-engineering, programming, system-architecture]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 前言

在前面的文章中，我們已經學習了原型模式（Prototype Pattern），這是創造型設計模式的倒數第二個成員。今天要介紹的是創造型模式的最後一個重要成員——單例模式（Singleton Pattern）。

單例模式是最廣為人知且在物件導向程式設計中幾乎每個軟體工程師都會接觸到的創造型設計模式。它的核心目的是確保一個類別在整個系統架構中只能存在一個實體，並提供一個全域訪問點。這對於資源管理和系統效能最佳化非常重要。

## 需求背景

假設我們收到一個具體的開發需求：建造一個企業級的應用程式，這個系統需要與資料庫進行頻繁且持續的資料交互。

為了確保資料庫連接的高效性和系統資源的合理利用，我們需要設計一個統一的資料庫連接管理系統。這個系統必須能夠集中管理所有的資料庫操作，同時避免資源浪費。

## 初步設計分析 (OOA)

理解需求後，讓我們進行物件導向分析，設計一個基本的資料庫操作類別：

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_1.png" title="design_pattern_singleton_pattern_uml_1" %}

在這個初步設計中，`DatabaseClient` 類別包含了標準的 CRUD（Create, Read, Update, Delete）四個基本操作方法，以及一個標準的 constructor 來建立 `DatabaseClient` 實體。

這種直接的設計方式看起來很簡單，但在實際的企業應用中會帶來一些關鍵挑戰。

## 問題分析 (Forces)

當我們在企業應用中使用上述簡單設計時，會遇到以下幾個關鍵問題：

### 資源管理問題
在企業級系統中，每個資料庫連接都會消耗大量的系統資源（記憶體、網絡連接、執行緒）。如果在不同的地方重複創建多個 `DatabaseClient` 實體，將會造成資源耗盡和性能下降。

### 資料一致性問題
在多執行緒環境中，如果不同的程式模塊使用不同的資料庫連接實體，可能會導致交易狀態不一致、資料同步問題等嚴重狀況。

### 效能經濟性問題
資料庫連接的建立和銷毀都是耗時的操作。頻繁地創建和關閉連接不僅會影響系統效能，還會增加程式複雜性和維護難度。

這些問題都指向同一個解決方向：我們需要一個統一的資料庫連接管理機制。

## 單例模式解決方案 (Singleton Pattern)

識別出核心問題後，我們可以套用單例模式（Singleton Pattern）來從根本上解決這些挑戰。單例模式的核心理念是確保整個系統中某個類別只能存在一個實體。

### 模式結構設計
讓我們先來看一下單例模式的標準 UML 結構：

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_2.png" title="design_pattern_singleton_pattern_uml_2" %}

### 核心實作機制
單例模式的實作機制相當优雅而實用：

1. **備懶初始化（Lazy Initialization）**：透過 `getInstance()` 静態方法取得實體，不直接暴露 constructor。

2. **實體狀態檢查**：每次調用 `getInstance()` 時，都會檢查內部的 `instance` 屬性是否為 `null`。

3. **條件式創建**：如果 `instance` 為 `null`，就創建一個新的實體並儲存；如果不為 `null`，就直接返回現有的 `instance`。

這稭機制從線程安全的角度來看能夠絕對保證該類別的實體只會有一個。

### 套用到資料庫連接管理

現在讓我們將單例模式套用到 `DatabaseClient` 的設計中：

{% include figure.liquid path="assets/img/design_pattern_singleton_pattern_uml_3.png" title="design_pattern_singleton_pattern_uml_3" %}

透過引入單例模式，`DatabaseClient` 現在具備了以下特性：

- **統一入口**：所有資料庫操作都透過同一個 `DatabaseClient` 實體進行
- **資源節約**：整個系統只維護一個資料庫連接實體
- **狀態一致**：所有的資料庫操作都在同一個連接上進行，確保資料一致性

這稭設計給我們帶來了一個更加健壯且高效的資料庫管理架構。

## 程式實作 (OOP)

理解了設計理念後，接下來我們進行具體的程式碼實作。讓我們看看如何在 Kotlin 中實現標準的單例模式：

[DatabaseClient]

```kotlin
class DatabaseClient {

    fun create(tableName:String, data: Map<String, Any>): Int {
        return 0
    }

    fun read(tableName:String, conditions: Map<String, Any>): Int {
        return 0
    }

    fun update(tableName:String, data: Map<String, Any>, conditions: Map<String, Any>): Int {
        return 0
    }

    fun delete(tableName:String, conditions: Map<String, Any>): Int {
        return 0
    }

    companion object {
        var mInstance: DatabaseClient? = null
        fun getInstance(): DatabaseClient {
            if (mInstance == null) {
                mInstance = DatabaseClient()
            }
            return mInstance!!
        }
    }
}
```

[Client]

```kotlin
fun main() {
    val db = DatabaseClient.getInstance()
    db.create("test", mapOf(Pair("test", "123")))
}
```

### 標準單例模式實作

以上展示了單例模式的標準實作方式。這種實現方式遵循了經典的設計模式原則，適用於各種程式語言。

### Kotlin 語言的優雅實現

值得一提的是，Kotlin 語言提供了 `object` 關鍵字，讓我們能夠更加簡潔地實作單例模式：

[DatabaseClient]

```kotlin
object DatabaseClient {

    fun create(tableName:String, data: Map<String, Any>): Int {
        return 0
    }

    fun read(tableName:String, conditions: Map<String, Any>): Int {
        return 0
    }

    fun update(tableName:String, data: Map<String, Any>, conditions: Map<String, Any>): Int {
        return 0
    }

    fun delete(tableName:String, conditions: Map<String, Any>): Int {
        return 0
    }
}
```

[Client]

```kotlin
fun main() {
    val db = DatabaseClient
    db.create("test", mapOf(Pair("test", "123")))
}
```

### 語言特性優勢

使用 Kotlin 的 `object` 關鍵字，我們可以得到以下優勢：

- **自動線程安全**：Kotlin 編譯器保證了 `object` 的線程安全初始化
- **延遲加載**：只有在首次訪問時才會初始化實體
- **語法簡潔**：無需手動實現 `getInstance()` 方法和 null 檢查
- **簡化使用**：可以直接透過類別名稱訪問，更加直觀

這就是現代程式語言為常用設計模式提供的語法糖（Syntactic Sugar），讓開發者能夠更輕鬆地使用單例模式。

## 系列總結

至此，我們已經完成了所有創造型設計模式的學習旅程。從 Factory Method 的物件創建抽象化，到 Abstract Factory 的產品族管理，再到 Builder 的複雜對象建構、Prototype 的物件複製技術，最後是 Singleton 的全域實體管理。

在下一個階段，我們將開始探索結構型設計模式（Structural Design Patterns）。結構型模式主要關注如何組合類別和物件，建立更大的結構，同時保持系統的靈活性和可擴展性。讓我們期待接下來的 Adapter、Bridge、Composite 等模式的精彩內容吧！
