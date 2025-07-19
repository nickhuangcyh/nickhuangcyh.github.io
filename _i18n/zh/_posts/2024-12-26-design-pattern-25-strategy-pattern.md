---
layout: post
title: 設計模式 25：策略模式（Strategy Pattern）完整實戰指南
日期: 2024-12-26 23:50:00 +0800
description: 精通策略模式，學會打造彈性演算法、動態切換行為，讓程式碼低耦合、易維護。圖文範例，適合軟體工程師與架構師。
tags:
  [Strategy Pattern, Design Patterns, Algorithm Selection, Object-Oriented Design, Software Architecture, Kotlin, Programming, Behavioral Patterns]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **設計模式系列完整程式碼下載**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 策略模式是什麼？

**策略模式（Strategy Pattern）** 是一種行為型設計模式，能將一系列演算法封裝成獨立類別，讓它們可互換、動態切換，並與主程式解耦，提升彈性與維護性。

**主要優點：**

- ✅ 演算法彈性：可於執行時切換
- ✅ 低耦合：演算法與主程式分離
- ✅ 易於擴展：新增策略無需改舊程式
- ✅ 單一職責：每個策略專注一種演算法
- ✅ 開放封閉原則：可擴展、易維護

---

## 🚀 實務案例：電商運費計算系統

設計一個「電商運費計算系統」，需求如下：

1. 支援多種運費計算方式：
   - 一般配送：固定運費
   - 快速配送：依重量計價
   - 國際配送：依地區與重量計價
2. 系統需具高擴展性，方便新增新運費計算方式
3. 避免大量 if-else 或 switch-case
4. 使用者可輕鬆切換運費計算方式

**商業規則：**

- 一般配送：固定費用
- 快速配送：每公斤計價
- 國際配送：依地區與重量變動
- 未來可擴充新運費方式

---

## 🧩 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_1.png" title="Strategy Pattern - Problem Analysis" %}

**核心挑戰：**

1. 維護困難：運費邏輯與主業務混雜，修改影響大
2. 違反開放封閉原則（OCP）：新增運費需改主邏輯
3. 違反單一職責原則（SRP）：主類同時負責運費與業務

---

## 💡 策略模式解決方案

分析完需求後，套用策略模式，將演算法封裝成獨立類別：

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_2.png" title="Strategy Pattern - General Structure" %}

**組件說明：**

1. 策略介面：定義所有演算法共用方法
2. 具體策略：各自實作專屬演算法
3. 上下文（Context）：維護當前策略，將請求委派給策略物件

**好處：**

- 演算法與主程式分離，易於維護
- 執行時可動態切換策略
- 易於擴展，無需改舊程式

---

## 🛠️ 實作：電商運費計算系統

{% include figure.liquid path="assets/img/design_pattern_strategy_pattern_uml_3.png" title="Shipping Calculator Strategy Implementation" %}

### 1. 策略介面

```kotlin
interface ShippingStrategy {
    fun calculateShippingCost(weight: Double, region: String): Double
    fun getStrategyName(): String
}
```

### 2. 具體策略類別

```kotlin
class RegularShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double = 50.0 // 固定運費
    override fun getStrategyName(): String = "一般配送"
}

class ExpressShipping : ShippingStrategy {
    override fun calculateShippingCost(weight: Double, region: String): Double = weight * 10 // 每公斤 10 元
    override fun getStrategyName(): String = "快速配送"
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
    override fun getStrategyName(): String = "國際配送"
}
```

### 3. 上下文類別

```kotlin
class ShippingCalculator(private var strategy: ShippingStrategy) {
    fun setStrategy(strategy: ShippingStrategy) {
        this.strategy = strategy
        println("🔄 策略切換為：${strategy.getStrategyName()}")
    }
    fun calculateCost(weight: Double, region: String): Double {
        val cost = strategy.calculateShippingCost(weight, region)
        println("📦 ${strategy.getStrategyName()}: $${cost}，${weight}kg，地區：$region")
        return cost
    }
    fun getCurrentStrategy(): String = strategy.getStrategyName()
}
```

### 4. 用戶端程式碼

```kotlin
fun main() {
    println("=== 電商運費計算系統示範 ===")
    val calculator = ShippingCalculator(RegularShipping())
    val testWeight = 5.0
    val testRegion = "Asia"
    calculator.calculateCost(testWeight, testRegion)
    calculator.setStrategy(ExpressShipping())
    calculator.calculateCost(testWeight, testRegion)
    calculator.setStrategy(InternationalShipping())
    calculator.calculateCost(testWeight, testRegion)
    println("\n=== 各地區費用比較 ===")
    val regions = listOf("Asia", "Europe", "America", "Africa")
    regions.forEach { region ->
        calculator.calculateCost(2.0, region)
    }
}
```

**預期輸出：**

```
=== 電商運費計算系統示範 ===
📦 一般配送: $50.0，5.0kg，地區：Asia
🔄 策略切換為：快速配送
📦 快速配送: $50.0，5.0kg，地區：Asia
🔄 策略切換為：國際配送
📦 國際配送: $75.0，5.0kg，地區：Asia

=== 各地區費用比較 ===
📦 國際配送: $30.0，2.0kg，地區：Asia
📦 國際配送: $40.0，2.0kg，地區：Europe
📦 國際配送: $50.0，2.0kg，地區：America
📦 國際配送: $60.0，2.0kg，地區：Africa
```

---

## 🏆 結論

策略模式讓你能彈性切換演算法，讓系統更易維護、擴展，適合多種演算法選擇、動態行為切換等場景。

**適用場景：**

- 多種演算法選擇（排序、折扣、運費等）
- 需動態切換行為的系統
- 低耦合、易維護的架構

**設計原則：**

- 單一職責原則（SRP）：每個策略專注一種演算法
- 開放封閉原則（OCP）：新增策略無需改舊程式

立即將策略模式應用於你的專案，讓系統更彈性、易於維護！
