---
layout: post
title: Design Pattern (28) - Interpreter Pattern (解譯器模式)
date: 2024-12-29 16:30:00 +0800
description: 解譯器模式用於構建一個可解讀特定語言或語法的系統，適合於處理複雜的規則判斷或指令語法。
excerpt: 深入探討解譯器模式（Interpreter Pattern）在軟體設計中的應用：如何構建可解讀特定語言和語法的系統。包含完整的 Kotlin 程式碼範例，展示布林運算解譯系統的實作。適合處理複雜的規則判斷、指令語法、數學表達式計算器、SQL 查詢條件解析等情境。學習物件導向程式設計、提升系統架構能力的必備經典教學。
tags: [interpreter-pattern, design-patterns, software-architecture, object-oriented-programming, behavioral-patterns, kotlin, expression-parsing, software-design, programming-patterns, code-examples]
categories: [design-patterns, software-engineering, programming, object-oriented-design]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

---

## 需求

在現代軟體設計和系統架構中，我們經常需要處理複雜的邏輯運算和表達式解析。使用解譯器模式（Interpreter Pattern）可以建立一個高度可擴展且維護性佳的布林運算解譯系統。這種行為型設計模式在程式設計中對於處理規則引擎和域特定語言非常有用。

這個使用物件導向程式設計（OOP）原則的系統需要具備以下核心功能：

1. **表達式解譯能力**：能夠正確解譯包含布林值、AND 運算與 OR 運算的複雜表達式。
2. **可擴展性**：符合開放關閉原則，能夠方便地新增其他運算符（如 NOT、XOR 等）。
3. **維護性**：系統結構清晰，程式碼易於理解、維護與擴展。

透過這個實例，我們將學習如何運用解譯器模式來優雅地解決表達式解析的問題。

---

## 物件導向分析 (OOA)

在開始設計之前，我們需要深入理解問題的本質。讓我們透過物件導向分析來釐清系統的核心結構。

{% include figure.liquid path="assets/img/design_pattern_interpreter_pattern_uml_1.png" title="design_pattern_interpreter_pattern_uml_1" %}

### 察覺 Forces

在分析需求過程中，我們發現了幾個關鍵的設計挑戰：

1. **複雜性增加的問題**
   - 當系統需要支援更多運算符類型時，傳統的手動解析邏輯會變得極其複雜。
   - 程式碼的可讀性和可維護性會隨著運算符數量的增加而急劇下降。

2. **重複代碼的困擾**
   - 不同運算符的處理邏輯往往存在相似的模式，導致大量重複代碼。
   - 這種重複不僅增加了維護成本，也提高了出錯的風險。

3. **擴展性的挑戰**
   - 每當需要新增運算符時，開發人員必須修改多處代碼。
   - 這種做法違反了開放關閉原則 (OCP)，使系統變得脆弱且難以維護。

這些問題促使我們尋找一個更優雅的解決方案，而解譯器模式正是應對這些挑戰的理想選擇。

---

## 套用 Interpreter Pattern (Solution) 得到新的 Context (Resulting Context)

完成物件導向分析並識別出設計挑戰後，我們現在可以運用解譯器模式來解決這些問題。解譯器模式提供了一個優雅的架構，讓我們能夠系統性地處理表達式解析。

### 解譯器模式的核心架構

讓我們先了解解譯器模式的標準 UML 結構：

{% include figure.liquid path="assets/img/design_pattern_interpreter_pattern_uml_2.png" title="design_pattern_interpreter_pattern_uml_2" %}

### Interpreter Pattern 的核心組件

解譯器模式主要由以下三個關鍵組件構成：

1. **抽象表達式 (Expression)**
   - 定義所有表達式的通用介面，建立統一的處理規範。
   - 確保不同類型的表達式都能透過相同的方式被調用和處理。

2. **終端表達式 (Terminal Expression)**
   - 負責處理語法中的基本單位，例如布林值 `true` 和 `false`。
   - 這些是表達式樹中的葉節點，不包含其他子表達式。

3. **非終端表達式 (Non-Terminal Expression)**
   - 表示複雜運算的組合，例如 `AND` 和 `OR` 運算符。
   - 透過遞迴方式處理子表達式，實現複合邏輯的解譯。

### 模式的核心思想

解譯器模式的精髓在於將每個運算符與操作數視為一個獨立的「表達式」物件。透過遞迴組合的方式，我們可以將複雜的布林運算拆解為多個小型且可重複使用的單元。

這種設計方法不僅保持了系統結構的清晰性，更重要的是提供了極佳的靈活性和擴展性。

### 應用到我們的布林運算系統

現在讓我們將解譯器模式具體應用到我們的布林運算解譯系統：

{% include figure.liquid path="assets/img/design_pattern_interpreter_pattern_uml_3.png" title="design_pattern_interpreter_pattern_uml_3" %}

---

## 物件導向程式設計 (OOP)

有了清晰的設計架構後，讓我們將解譯器模式轉化為具體的 Kotlin 程式碼。我們將逐步實作每個組件，並展示它們如何協同工作。

### 抽象表達式: Expression

首先定義所有表達式的通用介面。這個介面確保了所有表達式類別都具備相同的解譯能力：

```kotlin
interface Expression {
    fun interpret(): Boolean
}
```

### 終端表達式: BooleanValue

終端表達式代表布林運算中的基本值。它是表達式樹中的葉節點，直接返回儲存的布林值：

```kotlin
class BooleanValue(private val value: Boolean) : Expression {
    override fun interpret(): Boolean = value
}
```

這個類別的設計非常簡潔，但它是整個系統的基礎建構模塊。

### 非終端表達式: AndExpression, OrExpression

非終端表達式處理複雜的邏輯運算。它們包含其他子表達式，並透過遞迴方式進行解譯：

```kotlin
class AndExpression(private val left: Expression, private val right: Expression) : Expression {
    override fun interpret(): Boolean = left.interpret() && right.interpret()
}

class OrExpression(private val left: Expression, private val right: Expression) : Expression {
    override fun interpret(): Boolean = left.interpret() || right.interpret()
}
```

這兩個類別展現了解譯器模式的核心特色：透過組合子表達式來實現複雜邏輯。

### 客戶端代碼實作

現在讓我們看看如何使用這些類別來建構和解譯布林表達式：

```kotlin
fun main() {
    // 定義布林表達式：true AND false OR true
    val expression = OrExpression(
        AndExpression(
            BooleanValue(true),
            BooleanValue(false)
        ),
        BooleanValue(true)
    )

    // 計算結果
    val result = expression.interpret()
    println("Result of the expression is: $result")
}
```

這個例子展示了表達式 `(true AND false) OR true` 的建構過程。透過組合不同的表達式物件，我們創造了一個表達式樹，並且可以輕鬆地透過 `interpret()` 方法進行求值。

### 執行結果

```kotlin
Result of the expression is: true
```

這個結果驗證了我們的實作正確性：`(true AND false)` 為 `false`，但 `false OR true` 最終結果為 `true`。

---

## 結論

透過這個布林運算系統的實作，我們深入探討了解譯器模式如何優雅地解決表達式解析的挑戰。這個設計模式為我們帶來了顯著的優勢。

### 解譯器模式的核心優勢

1. **結構清晰且直觀**
   - 每個運算符和操作數都被封裝成獨立的表達式類別。
   - 這種組織方式使得系統架構一目了然，便於理解和維護。

2. **優秀的可擴展性**
   - 當需要新增運算符（如 NOT、XOR）時，只需實現新的表達式類別。
   - 這完全符合開放關閉原則 (OCP)，既開放擴展，又關閉修改。

3. **高度的靈活性**
   - 支援動態構建複雜的表達式結構。
   - 可以輕鬆組合不同的運算符，適應各種業務場景的需求。

### 實際應用場景

解譯器模式特別適合以下場景：
- 配置文件的規則解析
- 數學表達式計算器
- SQL 查詢條件解析
- 業務規則引擎

### 使用時的注意事項

雖然解譯器模式具有諸多優點，但在使用時也需要注意其適用範圍。這個模式更適合處理結構相對簡單的語法規則。

如果面對過於複雜的語法結構，可能會導致類別數量大幅增加，反而影響系統的可維護性。在這種情況下，我們可以考慮結合其他設計模式（如組合模式或訪問者模式）來進行優化。

總的來說，解譯器模式為表達式解析問題提供了一個結構化且可擴展的解決方案，是軟體架構師工具箱中的重要工具。
