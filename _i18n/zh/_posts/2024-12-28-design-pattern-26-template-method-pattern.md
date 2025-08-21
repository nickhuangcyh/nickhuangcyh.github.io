---
layout: post
title: "設計模式（26）模板方法模式：定義演算法骨架，提升程式碼復用性與系統擴展能力"
date: 2024-12-28 19:30:00 +0800
description: "深入解析模板方法模式（Template Method Pattern），學習如何定義演算法骨架、實現程式碼復用，並透過資料格式轉換系統實例，掌握行為型設計模式的核心應用技巧。"
tags: [Template Method Pattern, Design Patterns, Behavioral Patterns, Code Reusability, Algorithm Structure, Software Architecture]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

---

## 需求

在設計一個 **資料格式轉換系統** 時，我們需要滿足以下需求：

### 1. 多格式支援需求
支援多種資料格式的轉換功能：
   - **JSON 格式轉換**：將資料轉換為 JSON 格式
   - **XML 格式轉換**：將資料轉換為 XML 格式
   - **CSV 格式轉換**：將資料轉換為 CSV 格式

### 2. 系統擴展性需求
系統必須具備良好的擴展能力。當業務需要新增其他格式（如 YAML、Protocol Buffers）時，應該能夠快速整合而不影響現有功能。

### 3. 流程一致性需求
**保持轉換流程的核心一致性**是關鍵要求。無論哪種格式轉換，都必須遵循標準流程：
   - 讀取原始資料
   - 格式化資料內容
   - 輸出最終結果

### 4. 程式碼品質需求
**避免重複程式碼** 的產生，提升程式碼的維護性和可讀性。

---

## 物件導向分析 (OOA)

理解需求後，我們透過物件導向分析來釐清系統的核心問題。

首先，讓我們觀察目前的系統架構：

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_1.png" title="design_pattern_template_method_pattern_uml_1" %}

### 察覺 Forces

如果未套用設計模式，我們將面臨以下核心問題：

#### 1. 程式碼重複問題
每種格式的轉換邏輯都包含相同的處理步驟。這些共通步驟在各個實作中被重複撰寫，造成程式碼冗餘。

當我們有 10 種格式時，就可能有 10 份幾乎相同的流程程式碼。

#### 2. 違反開放關閉原則 (OCP)
每當需要新增一種格式轉換時，就必須修改現有的核心轉換邏輯。這違反了「對擴展開放、對修改封閉」的設計原則。

#### 3. 維護與擴展困難
各種格式的轉換邏輯分散在不同地方，缺乏統一的管理方式。當核心流程需要調整時，必須同步修改所有相關的實作，增加出錯的風險。

---

## 套用 Template Method Pattern (Solution) 得到新的 Context (Resulting Context)

完成 OOA 分析並察覺問題核心後，我們可以套用 Template Method Pattern 來優雅地解決這些挑戰。

### Template Method Pattern 基本概念

**模板方法模式**（Template Method Pattern）是一種重要的行為型設計模式。它定義了一個演算法的骨架，讓子類別能夠覆寫特定步驟，而不改變演算法的整體結構。

這個模式的核心思想是「在父類別中定義不變的流程，在子類別中實作變化的細節」，與[策略模式]({% post_url 2024-12-26-design-pattern-25-strategy-pattern %})和[狀態模式]({% post_url 2024-12-25-design-pattern-24-state-pattern %})共同構成行為型模式的重要組成部分。

讓我們先了解 Template Method Pattern 的標準結構：

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_2.png" title="design_pattern_template_method_pattern_uml_2" %}

### Template Method Pattern 的核心組件

模板方法模式包含兩個主要角色：

#### 1. AbstractClass (抽象類別)
抽象類別是整個模式的核心，它負責以下職責：
- **定義模板方法 (Template Method)**：封裝完整的演算法流程骨架
- **提供共用實作**：實作不需要變化的通用步驟
- **宣告抽象方法**：讓子類別實作需要客製化的特定步驟

#### 2. ConcreteClass (具體類別)
具體類別繼承抽象類別，專注於實作業務邏輯：
- **實作抽象方法**：提供特定步驟的具體實作
- **遵循既定流程**：不能改變父類別定義的演算法結構

以下是 Template Method Pattern 在我們系統中的具體應用：

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_3.png" title="design_pattern_template_method_pattern_uml_3" %}

---

## 物件導向設計 (OOP)

基於 Template Method Pattern 的架構分析，我們開始進行具體的物件導向設計。

### 核心設計理念

我們將建立一個抽象的資料格式化器作為模板，定義標準的轉換流程。各種具體的格式轉換器則繼承此模板，實作各自特有的格式化邏輯。

### 實作細節

#### AbstractClass: DataFormatter

```kotlin
abstract class DataFormatter {
    // Template Method - 定義完整的轉換流程
    fun convert(data: Map<String, Any>): String {
        val rawData = readData(data)
        val formattedData = formatData(rawData)
        return outputData(formattedData)
    }

    // 通用步驟 - 所有格式都使用相同的資料讀取邏輯
    private fun readData(data: Map<String, Any>): String {
        return data.toString()
    }

    // 抽象步驟 - 由子類別實作特定的格式化邏輯
    protected abstract fun formatData(data: String): String

    // 抽象步驟 - 由子類別實作特定的輸出格式
    protected abstract fun outputData(data: String): String
}
```

#### ConcreteClasses: 具體的格式轉換器

每個具體的格式轉換器都專注於實作自己特有的格式化邏輯：

```kotlin
class JsonFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        return "{\"data\": \"$data\"}" // 模擬 JSON 格式化
    }

    override fun outputData(data: String): String {
        return "JSON Output: $data"
    }
}

class XmlFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        return "<data>$data</data>" // 模擬 XML 格式化
    }

    override fun outputData(data: String): String {
        return "XML Output: $data"
    }
}

class CsvFormatter : DataFormatter() {
    override fun formatData(data: String): String {
        return data.replace(", ", "\n") // 模擬 CSV 格式化
    }

    override fun outputData(data: String): String {
        return "CSV Output: $data"
    }
}
```

#### Client: 客戶端使用範例

客戶端程式碼展示如何使用不同的格式轉換器：

```kotlin
fun main() {
    val data = mapOf("name" to "John", "age" to 30, "city" to "New York")

    val jsonFormatter = JsonFormatter()
    println(jsonFormatter.convert(data))

    val xmlFormatter = XmlFormatter()
    println(xmlFormatter.convert(data))

    val csvFormatter = CsvFormatter()
    println(csvFormatter.convert(data))
}
```

#### 執行結果

程式執行後的輸出結果：

```plaintext
JSON Output: {"data": "{name=John, age=30, city=New York}"}
XML Output: <data>{name=John, age=30, city=New York}</data>
CSV Output: name=John\nage=30\ncity=New York
```

---

## 結論

透過 Template Method Pattern 的應用，我們成功解決了資料格式轉換系統面臨的核心問題。

### 解決方案的核心優勢

#### 1. 程式碼復用性顯著提升
通用的轉換流程邏輯集中在抽象類別中實作，徹底避免了程式碼重複的問題。所有格式轉換器都共享相同的核心流程，確保一致性。

#### 2. 系統擴展能力大幅增強
新增任何格式轉換功能時，只需要：
- 繼承 `DataFormatter` 抽象類別
- 實作 `formatData()` 和 `outputData()` 兩個方法
- 無需修改任何既有程式碼

#### 3. 完全符合重要設計原則
- **單一職責原則 (SRP)**：核心流程控制與特定格式邏輯完全分離
- **開放關閉原則 (OCP)**：系統對擴展開放，對修改封閉

### 適用場景與實際應用

Template Method Pattern 特別適合以下業務場景：

#### 資料處理領域
- 多種資料格式轉換流程（JSON、XML、CSV、YAML）
- 資料驗證處理（不同資料來源的統一驗證流程）
- 資料清理與標準化處理

#### 文檔生成領域
- 多格式報表生成（PDF、Excel、Word）
- 不同樣式的文檔模板處理
- 批次文檔處理系統

#### 工作流程管理
- 業務流程的標準化處理
- 多階段任務的統一管理
- 審批流程的模板化設計

### 總結

**模板方法模式**提供了一個優雅且實用的解決方案。它不僅確保了系統核心流程的一致性，更為實現靈活且高效的功能擴展奠定了穩固的架構基礎。

這個模式的核心價值在於「定義骨架，靈活填充」，讓開發者能夠在保持系統穩定性的前提下，快速響應業務變化的需求。

在行為型設計模式中，模板方法模式與[觀察者模式]({% post_url 2024-12-24-design-pattern-23-observer-pattern %})、[命令模式]({% post_url 2024-12-21-design-pattern-19-command-pattern %})等模式相輔相成，共同構建了完善的軟體架構設計體系。掌握模板方法模式，將為您的軟體開發技能增添重要的設計工具。
