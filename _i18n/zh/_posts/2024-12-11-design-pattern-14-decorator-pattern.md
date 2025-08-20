---
layout: post
title: Design Pattern (14) - Decorator Pattern (裝飾者模式)
date: 2024-12-11 23:30:00 +0800
description: 深入了解裝飾者模式如何動態為物件增加功能，同時保持系統的靈活性與開放性。
tags: [Decorator Pattern]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

在學習了 Adapter、Bridge 和 Composite Pattern 後，我們已經掌握了結構型模式的多個重要概念。現在讓我們探討一個能夠 **動態擴展物件功能** 的模式：Decorator Pattern（裝飾者模式）。

## 需求

我們需要為一家精品 **咖啡店** 開發一個靈活的 POS 系統。這個系統的挑戰在於需要處理各種咖啡和附加項的組合。

### 核心需求：
- **基礎咖啡種類**：系統支援多種基礎咖啡（Espresso、House Blend 等）
- **附加項選擇**：每種咖啡都可以添加多種附加項（牛奶、巧克力糖漿、奶泡等）
- **無限組合**：客戶可以不受限制地組合不同的附加項

### 技術要求：
- **動態組合**：系統必須支援在運行時動態組合不同的附加項
- **價格計算**：能夠准確計算所有組合的總價格
- **託單描述**：提供清晰的託單內容描述

### 設計挑戰：
- **組合爆炸**：如果為每種組合都建立類別，類別數量將指數型增長
- **擴展性**：未來需要容易添加新的基礎咖啡或附加項
- **靈活性**：客戶應該能在不受限制的情況下自由組合

## 物件導向分析 (OOA)

在深入設計之前，讓我們先進行物件導向分析，識別咖啡訂購系統中的核心元素：

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_1.png" title="design_pattern_decorator_pattern_uml_1" %}

## 察覺 Forces

在處理咖啡訂購系統這種 **動態組合** 的需求時，如果不使用恰當的設計模式，會面臨以下嚴重挑戦：

### 1. 組合爆炸危機 (Combinatorial Explosion Crisis)
**問題規模**：
- 2 種基礎咖啡 × 3 種附加項 = 至少需要 8 個類別（無附加項 + 單附加項 + 雙附加項 + 三附加項）
- 若增加到 5 種基礎咖啡和 5 種附加項，組合數可達 2^5 × 5 = 160 種

**具體影響**：
- 類別數量指數型增長，代碼庫變得難以管理
- 每新增一種附加項就需要為所有現有組合建立新的類別

### 2. 靜態結構的局限 (Static Structure Limitations)
**問題描述**：
- 所有可能的組合都必須在編譯時期就確定
- 無法在運行時期動態添加或移除附加項
- 不能支援「雙份奶泡」或「三倍巧克力糖漿」這種特殊需求

**具體影響**：
- 客戶的個人化需求難以滿足
- 系統的商業價值受到限制

### 3. 高耦合度與低重用性 (High Coupling & Low Reusability)
**問題描述**：
- 各種組合類別之間缺乏共同抽象
- 相同的附加項邏輯在不同組合中重複實現
- 修改某個附加項的價格時，需要在多處同步更新

**具體影響**：
- 維護成本高且容易出錯
- 新功能開發速度緩慢

### 4. 可擴展性不足 (Poor Extensibility)
**問題描述**：
- 新增新的基礎咖啡種類時，需要為每個附加項組合都建立對應的類別
- 新增新的附加項類型時，需要為每個現有組合都建立對應的類別
- 系統發展到後期，任何新增都可能成為巨大的工程

**具體影響**：
- 產品疑代嘈緩慢，競爭力下降
- 開發團隊的生產力受到嚴重影響

## 套用 Decorator Pattern (Solution) 得到新的 Context (Resulting Context)

面對動態組合的挑戰，**Decorator Pattern（裝飾者模式）** 為我們提供了一個強大而優雅的解決方案。

### Decorator Pattern 的核心思想

Decorator Pattern 的精髓在於 **“透過包裝來動態擴展物件功能”**。它的核心理念是：

- **包裝繼承**：裝飾者和被裝飾者實現相同的介面，使得它們可以相互替代
- **遞增加強**：每個裝飾者都在不修改原始對象的情況下添加新功能
- **遞歸組合**：多個裝飾者可以嵌套組合，形成連鎖結構

### 現實生活中的類比

想像一下你在裝飾一顆聖誕樹：
1. **基礎樹**：這就是我們的基礎咖啡（Espresso）
2. **添加燈飾**：第一層裝飾（添加牛奶）
3. **添加絲帶**：第二層裝飾（添加巧克力糖漿）
4. **添加彩球**：第三層裝飾（添加奶泡）

每一層裝飾都保持了原有的美感，同時添加了新的元素。

### Decorator Pattern 的 UML 結構

讓我們先來了解 Decorator Pattern 的標準結構：

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_2.png" title="design_pattern_decorator_pattern_uml_2" %}

### Decorator Pattern 的四個核心角色：

**1. Component (組件介面)**
- 定義基本組件和裝飾者的通用介面
- 確保裝飾者和被裝飾者可以相互替代
- 在我們的例子中，就是 `Beverage` 介面

**2. ConcreteComponent (具體組件)**
- 實現基本功能的具體類別
- 這是裝飾鏈的起點，提供最基礎的功能
- 在我們的例子中：`Espresso` 和 `HouseBlend`

**3. Decorator (裝飾者基類)**
- 維護對 Component 的參考，實現裝飾行為的共同逼輯
- 為所有具體裝飾者提供統一的基礎結構
- 在我們的例子中：`CondimentDecorator`

**4. ConcreteDecorator (具體裝飾者)**
- 實現具體的裝飾功能，添加新的行為或狀態
- 可以在調用被裝飾者的前後添加過連逼輯
- 在我們的例子中：`Milk`、`ChocolateSyrup`、`WhippedCream`

### 套用到我們的咖啡系統

現在讓我們將 Decorator Pattern 應用到咖啡訂購系統中：

{% include figure.liquid path="assets/img/design_pattern_decorator_pattern_uml_3.png" title="design_pattern_decorator_pattern_uml_3" %}

## 物件導向程式設計 (OOP)

現在讓我們用 Kotlin 來實現這個 Decorator Pattern 設計。我們將逐步建立咖啡訂購系統的各個組件：

### 1. Component - Beverage 介面

首先定義組件介面，為所有咖啡產品提供統一的操作介面：

```kotlin
interface Beverage {
    val description: String
    fun cost(): Double
}
```

### 2. ConcreteComponent - 基礎咖啡種類

接下來實現具體的基礎咖啡類別：

```kotlin
class Espresso : Beverage {
    override val description = "Espresso"
    override fun cost() = 1.99
}

class HouseBlend : Beverage {
    override val description = "House Blend Coffee"
    override fun cost() = 0.89
}
```

### 3. Decorator - CondimentDecorator 基類

定義裝飾者的抽象基類，為所有附加項提供統一的結構：

```kotlin
abstract class CondimentDecorator(protected val beverage: Beverage) : Beverage() {
    override abstract val description: String
}
```

### 4. ConcreteDecorator - 具體附加項

實現各種具體的附加項裝飾者：

```kotlin
class Milk(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Milk"
    override fun cost() = beverage.cost() + 0.3
}

class ChocolateSyrup(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Chocolate Syrup"
    override fun cost() = beverage.cost() + 0.5
}

class WhippedCream(beverage: Beverage) : CondimentDecorator(beverage) {
    override val description = "${beverage.description}, Whipped Cream"
    override fun cost() = beverage.cost() + 0.4
}
```

### Client 使用示例

現在讓我們看看 Decorator Pattern 如何讓客戶能夠靈活地組合不同的咖啡：

```kotlin
fun main() {
    // Make an Espresso
    val espresso = Espresso()
    println("${espresso.description}: $${espresso.cost()}")

    // Make an Espresso with Milk、Chocolate Syrup and Whipped Cream
    val customBeverage = WhippedCream(
        ChocolateSyrup(
            Milk(Espresso())
        )
    )
    println("${customBeverage.description}: $${customBeverage.cost()}")

    // Make an HouseBlend with Milk and double Whipped Cream
    val layeredBeverage = WhippedCream(
        WhippedCream(
            Milk(HouseBlend())
        )
    )
    println("${layeredBeverage.description}: $${layeredBeverage.cost()}")
}
```

[Output]

```bash
Espresso: $1.99
Espresso, Milk, Chocolate Syrup, Whipped Cream: $3.19
House Blend, Milk, Whipped Cream, Whipped Cream: $2.49
```

## 執行結果與分析

當我們執行上述程式碼時，會獲得以下輸出：

```
Espresso: $1.99
Espresso, Milk, Chocolate Syrup, Whipped Cream: $3.19
House Blend, Milk, Whipped Cream, Whipped Cream: $2.49
```

這個結果完美地展示了 Decorator Pattern 的強大之處：
- **第一行**：純粹的基礎 Espresso
- **第二行**：經過多層裝飾的豐富 Espresso
- **第三行**：連相同附加項都可以重複加入

## 結論

透過套用 **Decorator Pattern**，我們成功解決了動態組合的所有挑戦：

### 獲得的核心好處：

**1. 增量式功能擴展**
- 每個裝飾者只關注自己的特定功能，責任單一且清晰
- 不修改原始對象，透過包裝來增加新功能
- 符合開放封閉原則（Open-Closed Principle）

**2. 組合爆炸問題的完全解決**
- 類別數量從 O(m^n) 減少到 O(m+n)
- 2 種基礎咖啡 + 3 種附加項 = 僅需 5 個類別
- 新增附加項或基礎咖啡都只需加一個類別

**3. 無限的靈活性**
- 支援任意次序和次數的組合
- 可以在運行時動態組合不同的附加項
- 支援嵌套組合，滿足個人化需求

**4. 優雅的代碼結構**
- 各個裝飾者之間高度解耦，可獨立開發和測試
- 相同的代碼結構讓新手也容易上手
- 高度的可讀性和可維護性

### 實際應用場景：
Decorator Pattern 在以下情況下特別有用：
- **飲品訂購系統**：如星巴克、貴族世家等的附加項配置
- **GUI 組件**：為按鈕、文本框等添加邊框、滿動條、陰影等效果
- **IO 流處理**：如 Java 的 BufferedReader、FileReader 的層次包裝
- **中間件**：為 Web 請求添加日誌、認證、緩存等功能

### 與其他模式的關係：
Decorator Pattern 與我們之前學習的模式相輔相成：
- **與 Composite Pattern**：都使用遞歸結構，但目的不同（裝飾 vs 結構組織）
- **與 Adapter Pattern**：都改變對象的行為，但方式不同（適配 vs 增強）
- **與 Bridge Pattern**：都關注彈性設計，但解決不同的問題

透過 Decorator Pattern，我們學會了如何優雅地處理動態功能擴展，這種設計思維為我們後續學習更複雜的設計模式提供了堅實的基礎。
