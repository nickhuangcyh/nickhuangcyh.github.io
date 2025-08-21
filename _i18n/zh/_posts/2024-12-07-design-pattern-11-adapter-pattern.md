---
layout: post
title: "設計模式（11）轉接器模式 Adapter Pattern 完整教學：解決介面不相容問題"
date: 2024-12-07 23:00:00 +0800
description: "學會 Adapter Pattern 如何解決系統整合中的介面不相容問題。從股票數據 XML-JSON 轉換實例學會設計模式核心概念、UML架構、Kotlin實作、適用情境與最佳實踐。"
tags: [Adapter Pattern, Design Pattern, System Integration, Structural Pattern, OOP Design, Interface Compatibility, Kotlin Programming, Enterprise Development]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

在完成了建立型模式（Creational Patterns）的學習後，我們現在要進入結構型模式（Structural Patterns）的探討。結構型模式專注於如何組合類別與物件，讓它們能協同工作形成更大的結構。

## 需求

我們收到了一個實際的系統整合需求：

公司現有的 **股票數據系統** 長期使用 **XML 格式** 來存儲與傳遞數據。然而，最近引入的 **第三方股票分析系統** 僅支援 **JSON 格式**。

這種格式不匹配的情況在企業環境中非常常見。為了整合兩個系統，我們需要設計一個解決方案，讓現有的 XML 數據能夠被第三方分析系統正確接收和處理。

## 物件導向分析 (OOA)

理解需求後，讓我們先進行物件導向分析，識別系統中的核心元件和它們之間的關係：

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_1.png" title="design_pattern_adapter_pattern_uml_1" %}

## 察覺 Forces

在沒有使用設計模式的直接實現中，雖然功能可以正常運作，但會面臨幾個重要問題：

### 1. 責任分散問題
- `Client` 承擔了資料轉換的責任，這違反了單一職責原則（SRP）
- 當轉換邏輯變得複雜時，`Client` 的程式碼將變得臃腫且難以維護

### 2. 程式碼重複問題
- 如果其他系統也需要相同的 XML 到 JSON 轉換邏輯，就必須重複實現
- 這種重複不僅浪費開發時間，也增加了維護成本

### 3. 高耦合性問題
- `Client` 必須深入了解 `XmlStockData` 和 `JsonAnalyzer` 的具體實現細節
- 當資料來源格式或目標系統介面發生變化時，`Client` 必須進行大幅修改

### 4. 擴展性不足
- 若未來需要支援更多資料格式（如 CSV、YAML 等），每種新格式都需要在 `Client` 中添加轉換邏輯
- 這種做法使得系統難以擴展，維護成本持續增加

## 套用 Adapter Pattern ( Solution ) 得到新的 Context ( Resulting Context )

完成物件導向分析並識別出設計難題後，我們可以運用 **Adapter Pattern（轉接器模式）** 來解決這些問題。

### Adapter Pattern 核心概念

Adapter Pattern 的作用就像是現實生活中的電源轉接器。當你的筆電充電器是三孔插頭，但牆上只有兩孔插座時，你需要一個轉接器來解決這個不匹配的問題。

讓我們先來看一下 Adapter Pattern 的標準 UML 結構：

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_2.png" title="design_pattern_adapter_pattern_uml_2" %}

### Adapter Pattern 的三個核心角色：

**Target (目標介面)**
- 定義客戶端期望使用的介面
- 在我們的例子中，就是 JsonAnalyzer 的 `analyzeJsonData` 方法
- 它代表了第三方分析系統期望的資料格式和操作方式

**Adaptee (被轉接者)**
- 代表現有的、需要被轉接的類別
- 在我們的例子中，就是提供 XML 格式資料的 `XmlStockData`
- 它有自己的介面，但與目標系統不相容

**Adapter (轉接器)**
- 實現 Target 介面，同時內部持有 Adaptee 的參考
- 負責將 Adaptee 的資料轉換成 Target 期望的格式
- 在我們的例子中，`StockDataAdapter` 負責將 XML 轉換為 JSON

### 套用到我們的股票系統

現在讓我們將 Adapter Pattern 套用到股票資料系統中：

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_3.png" title="design_pattern_adapter_pattern_uml_3" %}

## 物件導向程式設計 (OOP)

接下來我們用 Kotlin 來實現這個設計。讓我們逐一建立各個角色：

### Target Interface - JsonAnalyzer

首先定義目標介面，這是第三方分析系統期望的介面：

```kotlin
interface JsonAnalyzer {
    fun analyzeJsonData(json: String)
}
```

### Adaptee - XmlStockData

這是現有的 XML 資料來源，它提供 XML 格式的股票資料：

```kotlin
class XmlStockData {
    fun getXmlData(): String {
        return """
            <stocks>
                <stock>
                    <symbol>TSLA</symbol>
                    <price>675.50</price>
                </stock>
                <stock>
                    <symbol>AMZN</symbol>
                    <price>3201.65</price>
                </stock>
            </stocks>
        """
    }
}
```

### Adapter - StockDataAdapter

這是我們的轉接器，它實現了 `JsonAnalyzer` 介面，並負責將 XML 資料轉換為 JSON：

```kotlin
class StockDataAdapter(private val xmlStockData: XmlStockData) : JsonAnalyzer {
    override fun analyzeJsonData(json: String) {
        println("Analyzing JSON data: $json")
    }

    fun convertAndAnalyze() {
        val xml = xmlStockData.getXmlData()
        val json = XML.toJSONObject(xml).toString(4)
        analyzeJsonData(json)
    }
}
```

### Client 使用方式

客戶端程式碼變得非常簡潔，只需要透過轉接器來操作即可：

```kotlin
fun main() {
    val xmlStockData = XmlStockData()
    val adapter = StockDataAdapter(xmlStockData)

    adapter.convertAndAnalyze()
}
```

## 執行結果與分析

當我們執行上述程式碼時，轉接器會：
1. 從 `XmlStockData` 獲取 XML 格式的股票資料
2. 將 XML 轉換為 JSON 格式
3. 呼叫分析方法處理 JSON 資料

## 結論

透過套用 **Adapter Pattern**，我們成功解決了系統整合的問題：

### 獲得的好處：
- **責任明確**：資料轉換邏輯被封裝在專門的轉接器中
- **降低耦合**：Client 不再需要了解 XML 到 JSON 的轉換細節
- **提高重用性**：`StockDataAdapter` 可以在其他需要相同轉換的地方重複使用
- **易於擴展**：未來若需要支援其他格式，只需要建立新的轉接器

### 適用場景：
Adapter Pattern 特別適合用於：
- 整合第三方函式庫或遺留系統
- 資料格式轉換
- 介面不相容的類別整合

這個模式為我們提供了一個優雅的方式來處理系統整合中常見的介面不匹配問題，是結構型模式中最實用的模式之一。
