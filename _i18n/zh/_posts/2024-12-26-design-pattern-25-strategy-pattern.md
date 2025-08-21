---
layout: post
title: 設計模式（25）策略模式：動態演算法切換，打造高擴展性電商運費系統
date: 2024-12-26 23:50:00 +0800
description: 完整解析策略模式（Strategy Pattern）的核心概念與實際應用，透過電商運費計算系統範例，學習如何實現動態演算法切換，提升程式碼的擴展性與維護性。
tags: [Strategy Pattern, Design Patterns, Behavioral Patterns, Algorithm Switching, E-commerce System, Software Architecture]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

---

## 需求

假設我們正在開發一個 **電商運費計算系統**。隨著業務發展，不同的配送方式需要不同的運費計算邏輯。

我們需要滿足以下核心需求：

1. **支援多種運費計算方式**，包括：
   - **一般配送**：固定運費模式
   - **快速配送**：依重量計費模式
   - **國際配送**：根據地區與重量雙重計費模式

2. **系統擴展性考量**：
   - 未來需要輕鬆新增更多運費計算方式
   - 不影響現有功能的穩定性

3. **程式碼品質要求**：
   - 避免使用大量的 if-else 或 switch-case 判斷
   - 保持程式碼整潔且易於維護

4. **使用便利性**：
   - 使用者應能即時切換不同運費計算方式

---

## 物件導向分析 (OOA)

在深入探討解決方案之前，我們先進行物件導向分析。透過分析現有架構，能讓我們更清楚地理解問題所在。

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_1.png" title="design_pattern_strategy_pattern_uml_1" %}

### 察覺 Forces

當我們採用傳統的程式設計方式時，通常會將所有運費計算邏輯集中在一個類別中。這種做法看似簡單，但實際上會產生許多問題：

1. **維護困難**
   - 所有運費計算邏輯混雜在主程式中
   - 修改一種計算方式時，容易意外影響其他計算邏輯
   - 程式碼變得冗長且難以理解

2. **違反開放關閉原則 (OCP)**
   - 每次新增運費計算方式都需要修改核心業務邏輯
   - 無法在不修改現有程式碼的前提下擴展功能

3. **違反單一職責原則 (SRP)**
   - 一個類別同時承擔運費計算與核心業務邏輯兩種責任
   - 職責分散導致類別過於複雜

---

## 套用 Strategy Pattern (Solution) 得到新的 Context (Resulting Context)

完成物件導向分析並察覺到現有架構的問題後，我們可以運用 **Strategy Pattern（策略模式）** 來解決這些挑戰。

**策略模式**的核心思想是將不同的演算法封裝成獨立的策略類別，讓系統能在執行時動態選擇適合的策略。這種設計方式與[狀態模式]({% post_url 2024-12-25-design-pattern-24-state-pattern %})有相似之處，但策略模式著重於演算法的替換，而非狀態的轉換。

### Strategy Pattern 標準架構

首先，讓我們了解策略模式的標準結構：

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_2.png" title="design_pattern_strategy_pattern_uml_2" %}

### Strategy Pattern 的三大核心組件

策略模式由三個關鍵組件組成，每個組件都有明確的職責：

1. **Strategy (策略介面)**  
   - 定義所有具體策略必須實現的共同行為規範
   - 確保不同策略具有相同的介面，讓客戶端能統一調用

2. **ConcreteStrategy (具體策略)**  
   - 實現策略介面中定義的行為
   - 每個具體策略封裝一種特定的演算法邏輯
   - 策略之間彼此獨立，互不影響

3. **Context (上下文)**  
   - 維護對當前策略物件的參考
   - 提供策略切換的機制
   - 將客戶端的請求委派給當前策略執行

### 套用到運費計算系統

接下來，讓我們將策略模式套用到運費計算系統中：

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_3.png" title="design_pattern_strategy_pattern_uml_3" %}

---

## 物件導向設計 (OOP)

了解策略模式的理論架構後，讓我們透過實際程式碼來實現運費計算系統。我們將逐一建立每個組件，並展示它們如何協同運作。

### 第一步：建立策略介面 (Strategy Interface)

首先定義所有運費計算策略的共同介面：

```kotlin
interface ShippingStrategy {
    fun calculateShippingCost(weight: Double, region: String): Double
}
```

這個介面規範了所有具體策略必須實現的方法，確保不同策略具有統一的調用方式。

### 第二步：實現具體策略 (Concrete Strategies)

接下來實現三種不同的運費計算策略：

```kotlin
class RegularShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        return 50.0 // 固定運費
    }
}

class ExpressShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        return weight * 10 // 每公斤 10 元
    }
}

class InternationalShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double {
        val regionMultiplier = when (region) {
            "Asia" -> 15
            "Europe" -> 20
            "America" -> 25
            else -> 30
        }
        return weight * regionMultiplier
    }
}
```

每個具體策略都封裝了不同的運費計算邏輯，彼此獨立且易於維護。

### 第三步：建立上下文類別 (Context)

上下文類別負責維護當前使用的策略，並提供策略切換功能：

```kotlin
class ShippingCalculator(private var strategy: ShippingStrategy) {

    fun setStrategy(strategy: ShippingStrategy) {
        this.strategy = strategy
    }

    fun calculateCost(weight: Double, region: String): Double {
        return strategy.calculateShippingCost(weight, region)
    }
}
```

`ShippingCalculator` 將運費計算的具體實現委派給當前策略，實現了靈活的策略切換機制。

### 第四步：客戶端使用示例 (Client Usage)

最後，讓我們看看客戶端如何使用這個系統：

```kotlin
fun main() {
    val calculator = ShippingCalculator(RegularShipping())

    println("一般配送運費: ${calculator.calculateCost(5.0, "Asia")} 元") // 固定 50 元

    calculator.setStrategy(ExpressShipping())
    println("快速配送運費: ${calculator.calculateCost(5.0, "Asia")} 元") // 5.0 * 10 = 50 元

    calculator.setStrategy(InternationalShipping())
    println("國際配送運費 (Asia): ${calculator.calculateCost(5.0, "Asia")} 元") // 5.0 * 15 = 75 元
}
```

### 執行結果

```kotlin
一般配送運費: 50.0 元
快速配送運費: 50.0 元
國際配送運費 (Asia): 75.0 元
```

## 結論

透過實施 **Strategy Pattern（策略模式）**，我們成功解決了運費計算系統面臨的挑戰。讓我們回顧一下這個解決方案帶來的具體優勢：

### 核心優勢分析

1. **擴展性大幅提升**
   - 新增運費計算方式時，只需實作新的策略類別
   - 完全不需要修改現有程式碼，降低了引入錯誤的風險
   - 符合「對擴展開放，對修改關閉」的設計理念

2. **低耦合、高內聚**
   - 運費計算邏輯與核心業務邏輯完全分離
   - 每個策略類別專注於單一運費計算邏輯
   - 系統各部分職責清晰，互不干擾

3. **遵循重要設計原則**
   - **單一職責原則 (SRP)**：每個策略類別只負責一種運費計算方式
   - **開放關閉原則 (OCP)**：無需修改現有程式碼即可新增功能
   - **依賴倒轉原則 (DIP)**：高層模組不依賴低層模組的具體實現

### 實際應用場景

策略模式特別適合需要根據不同條件執行不同行為的場景，常見的應用包括：

- **電商系統**：不同的折扣策略（滿額折扣、會員優惠、季節性促銷）
- **演算法選擇**：不同的排序算法（快速排序、合併排序、堆積排序）
- **金融系統**：各類稅收計算方式、利息計算策略
- **遊戲開發**：不同角色的移動模式、攻擊方式

### 總結

**策略模式**透過封裝演算法家族，讓系統在保持穩定的同時具備高度彈性。

這不僅解決了當前的技術挑戰，更為未來的需求變更奠定了良好的基礎。當業務邏輯變得複雜時，策略模式提供了一個優雅、可維護的解決方案。

在行為型設計模式的學習路徑中，策略模式與[觀察者模式]({% post_url 2024-12-24-design-pattern-23-observer-pattern %})、[模板方法模式]({% post_url 2024-12-28-design-pattern-26-template-method-pattern %})等模式相互補充，共同構建了豐富的軟體設計工具庫。掌握策略模式，將大幅提升您處理複雜業務邏輯的能力。
