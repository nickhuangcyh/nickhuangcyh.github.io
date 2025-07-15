---
layout: post
title: 設計模式 28：解譯器模式（Interpreter Pattern）完整實戰指南
日期: 2024-12-29 16:30:00 +0800
description: 精通解譯器模式，學會打造語言解譯器、運算式解析器與彈性規則引擎。適合開發 DSL、規則系統與表達式處理的工程師。
tags: [Interpreter Pattern, Design Patterns, Software Architecture, Object-Oriented Design, Expression Parsing, DSL, Kotlin, Programming]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **設計模式系列完整程式碼下載**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 解譯器模式是什麼？

**解譯器模式（Interpreter Pattern）** 是一種行為型設計模式，適合用來解析語法規則、運算式或自訂語言。常見於 DSL（領域專用語言）、規則引擎、表達式求值等場景。

**主要應用：**
- ✅ 運算式求值
- ✅ DSL（自訂語言）實作
- ✅ 規則引擎
- ✅ 數學運算式解析
- ✅ 設定檔解析

---

## 🚀 實務案例：布林運算式解譯器

設計一個布林運算式解譯器，能處理複雜邏輯運算：
- `true AND false OR true`
- `(true OR false) AND true`
- `NOT (false AND true)`

**需求：**
1. 支援 AND、OR、NOT 運算子
2. 支援括號分組
3. 遵循開放封閉原則，易於擴展
4. 程式結構清晰、易維護

---

## 🧩 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_interpreter_pattern_uml_1.png" title="Interpreter Pattern - Problem Analysis" %}

**核心挑戰：**
1. 複雜度管理：運算子多時，手動解析難以維護
2. 程式碼重複：不同運算子處理邏輯類似
3. 擴展困難：新增運算子需改舊程式，違反 OCP

---

## 💡 解譯器模式解決方案

解譯器模式將每個語法規則封裝成獨立類別，遞迴處理運算式：

{% include figure.liquid path="assets/img/design_pattern_interpreter_pattern_uml_2.png" title="Interpreter Pattern - General Structure" %}

**核心組件：**
1. 抽象運算式介面：定義所有運算式的共用介面
2. 終端運算式：處理基本元素（如布林值）
3. 非終端運算式：處理複雜運算（AND、OR、NOT），遞迴處理子運算式

---

## 🛠️ 實作：布林運算式解譯器

{% include figure.liquid path="assets/img/design_pattern_interpreter_pattern_uml_3.png" title="Boolean Expression Interpreter Implementation" %}

### 1. 抽象運算式介面

```kotlin
interface Expression {
    fun interpret(): Boolean
}
```

### 2. 終端運算式：布林值

```kotlin
class BooleanValue(private val value: Boolean) : Expression {
    override fun interpret(): Boolean = value
}
```

### 3. 非終端運算式：邏輯運算子

```kotlin
class AndExpression(private val left: Expression, private val right: Expression) : Expression {
    override fun interpret(): Boolean = left.interpret() && right.interpret()
}

class OrExpression(private val left: Expression, private val right: Expression) : Expression {
    override fun interpret(): Boolean = left.interpret() || right.interpret()
}

class NotExpression(private val expression: Expression) : Expression {
    override fun interpret(): Boolean = !expression.interpret()
}
```

### 4. 用戶端程式碼：建構與求值

```kotlin
fun main() {
    // 建立運算式：true AND false OR true
    val expression = OrExpression(
        AndExpression(
            BooleanValue(true),
            BooleanValue(false)
        ),
        BooleanValue(true)
    )

    // 求值
    val result = expression.interpret()
    println("運算式: true AND false OR true")
    println("結果: $result")
    // 預期輸出: true
}
```

**輸出：**
```
運算式: true AND false OR true
結果: true
```

---

## 🏆 結論

解譯器模式讓你能彈性解析與求值複雜運算式，適合 DSL、規則引擎、設定檔等場景。每個語法規則獨立封裝，易於擴展與維護。

**適用場景：**
- DSL 實作
- 運算式求值系統
- 設定檔解析
- 規則引擎
- 數學運算式解析

**設計原則：**
- 單一職責原則（SRP）：每個運算式類別專注一種規則
- 開放封閉原則（OCP）：新增運算子無需改舊程式

立即將解譯器模式應用於你的專案，讓系統更彈性、易於維護！
