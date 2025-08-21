---
layout: post
title: "設計模式（8）建造者模式 Builder Pattern 完整教學：分步構建複雜物件"
date: 2024-07-09 23:00:00 +0800
description: "學會 Builder Pattern 如何解決複雜物件的創建問題。從飲料客製化系統實例深入了解如何設計步驟式構建器，提升物件初始化的可讀性與靈活性。包含 UML 設計、實作範例與最佳實踐。"
tags: [Builder Pattern, Design Pattern, Creational Pattern, Complex Object Creation, Fluent Interface, Software Architecture, OOP, Step by Step Construction]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 引言：從工廠到客製化

在前兩篇文章中，我們分別探討了工廠方法模式和抽象工廠模式，這兩種模式都專注於「創建什麼產品」的問題。今天，我們將面對一個新的挑戰：「如何創建複雜的產品」。

## 需求：手搖飲的客製化挑戰

### 業務升級需求

今天我們要設計一個能夠自動製作手搖飲的智能機器。經過市場調研後發現，如果手搖飲店只賣基本的紅茶、綠茶，肯定無法滿足現代消費者多樣化的需求。

現代顧客追求個人化體驗，他們希望能夠：
- **自由選擇配料**：根據個人喜好添加不同配料
- **靈活組合**：同一杯飲品可能包含多種配料
- **個性化口感**：創造屬於自己的獨特口味

### 可選配料清單

我們決定提供以下豐富的配料選項來吸引顧客：

- **珍珠 (Pearls)**：經典Q彈口感
- **椰果 (Coconut Jelly)**：清爽椰香風味
- **紅豆 (Red Beans)**：傳統甜蜜滋味
- **仙草凍 (Grass Jelly)**：清涼解膩口感
- **布丁 (Pudding)**：濃郁奶香享受

## 物件導向分析 (OOA)

### 初步設計嘗試

理解需求後，讓我們來進行物件導向分析。直覺的做法是為飲料類別新增所有可能的配料屬性：

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_1.png" title="design_pattern_builder_pattern_uml_1" %}

### 第一種方案的問題

這種設計會帶來嚴重問題：假如我們今天只想加入紅豆和布丁，就必須在其他用不到的參數傳入 `false` 或 `null`。

**問題點**：
- **參數冗長**：隨著配料增加，參數列表會變得非常長
- **可讀性差**：難以理解每個參數的意義
- **維護困難**：新增配料時所有呼叫處都需要修改
- **錯誤率高**：容易傳錯參數或遺漏參數

### 第二種方案：多重建構子

聰明的你可能想到了利用多個不同的建構子來解決，這樣就不需傳入不需要的參數：

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_2.png" title="design_pattern_builder_pattern_uml_2" %}

## 察覺問題 (Forces)

### 多重建構子方案的困境

深入分析第二種方案後，我們發現了更嚴重的問題：

**組合爆炸**：當配料種類越多，所需的建構子數量會呈指數級成長。以5種配料為例，理論上需要 2^5 = 32 個不同的建構子來涵蓋所有組合！

**維護噩夢**：
- 每次新增配料，都需要大幅修改現有程式碼
- 建構子之間容易混淆，增加使用錯誤的風險
- 類別會變得極其龐大且難以理解

### Telescoping Constructor 反模式

這個現象被稱為 **Telescoping Constructor（望遠鏡建構子）** 反模式：

> **定義**：當一個類別擁有多個建構子，每個建構子的參數數量不同，導致程式碼難以維護和使用的問題。

**典型特徵**：
- 建構子數量隨參數組合呈指數增長
- 程式碼重複度高
- 使用者容易選錯建構子
- 新增參數時維護成本極高

我們需要一個更優雅的解決方案來處理這種複雜物件的建構需求。

## 套用建造者模式 (Solution)

### 模式介紹

完成物件導向分析（OOA）、察覺問題點（Forces）、看清楚整個問題脈絡（Context）後，我們可以套用**建造者模式 (Builder Pattern)** 來解決這個複雜物件建構的問題。

讓我們先了解建造者模式的標準結構：

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_3.png" title="design_pattern_builder_pattern_uml_3" %}

### 建造者模式的核心角色

建造者模式主要包含以下五個關鍵角色：

#### 1. Product（產品）
複雜對象的最終成品。它可能包含多個組件或部分，其結構根據不同的建造者實現而變化。Product 通常是一個類，其屬性代表 Builder 構建的不同部分。

#### 2. Builder（抽象建造者）
定義構建複雜對象的抽象介面。它宣告了構建產品各個部分的方法，允許創建不同的具體建造者來生產產品的不同變體。

#### 3. ConcreteBuilder（具體建造者）
實現 Builder 介面，提供構建產品每個部分的具體實現。每個 ConcreteBuilder 都為特定的產品變體量身定制，負責跟踪正在構建的產品狀態。

#### 4. Director（指導者）
負責管理複雜對象的構建過程。它與 Builder 合作，提供高層次的建構流程控制，但不需要知道對象每個部分的具體構建細節。

#### 5. Client（客戶端）
啟動複雜對象構建過程的程式碼。它創建 Builder 對象並將其傳遞給 Director，在構建完成後從 Builder 檢索最終產品。

### 應用到手搖飲系統

讓我們將建造者模式應用到手搖飲製作系統中：

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_4.png" title="design_pattern_builder_pattern_uml_4" %}

透過這個設計，我們得到了一個全新且優雅的解決方案 (Resulting Context)，能夠靈活處理複雜的手搖飲建構需求。

## 物件導向程式設計 (OOP)

### 實作建造者模式

現在讓我們將建造者模式的設計轉換為程式碼實作。透過分步驟的建構過程，我們能夠優雅地處理複雜飲料的創建。

#### 產品介面定義

首先定義飲料的抽象介面：

```kotlin
interface Beverage {
    var hasPearls: Boolean
    var hasCoconutJelly: Boolean
    var hasRedBeans: Boolean
    var hasGrassJelly: Boolean
    var hasPudding: Boolean
}
```

#### 具體產品類別

接著實作具體的飲料產品：

**珍珠奶茶 (BubbleTea)**：
```kotlin
data class BubbleTea(override var hasPearls: Boolean,
                     override var hasCoconutJelly: Boolean = false,
                     override var hasRedBeans: Boolean = false,
                     override var hasGrassJelly: Boolean = false,
                     override var hasPudding: Boolean = false
): Beverage {
}
```

**仙草布丁茶 (GrassJellyPuddingTea)**：
```kotlin
data class GrassJellyPuddingTea(override var hasPearls: Boolean = false,
                     override var hasCoconutJelly: Boolean = false,
                     override var hasRedBeans: Boolean = false,
                     override var hasGrassJelly: Boolean,
                     override var hasPudding: Boolean
): Beverage {
}
```

#### 抽象建造者介面

定義建造者的通用介面：

```kotlin
interface Builder {
    fun addPearls(): Builder
    fun addPudding(): Builder
    fun addGrassJelly(): Builder

    fun build(): Beverage
}
```

#### 具體建造者實作

**珍珠奶茶建造者**：
```kotlin
class BubbleTeaBuilder: Builder {
    private var bubbleTea = BubbleTea(false)

    override fun addPearls(): BubbleTeaBuilder {
        bubbleTea.hasPearls = true
        return this
    }

    override fun addPudding(): Builder {
        return this  // 珍珠奶茶不支援布丁，直接返回
    }

    override fun addGrassJelly(): Builder {
        return this  // 珍珠奶茶不支援仙草凍，直接返回
    }

    override fun build(): BubbleTea {
        return bubbleTea
    }
}
```

**仙草布丁茶建造者**：
```kotlin
class GrassJellyPuddingTeaBuilder: Builder {
    private var grassJellyPuddingTea = GrassJellyPuddingTea(
        false,
        hasCoconutJelly = false,
        hasRedBeans = false,
        hasGrassJelly = false,
        hasPudding = false
    )

    override fun addPearls(): Builder {
        return this  // 仙草布丁茶不支援珍珠，直接返回
    }

    override fun addGrassJelly(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasGrassJelly = true
        return this
    }

    override fun addPudding(): GrassJellyPuddingTeaBuilder {
        grassJellyPuddingTea.hasPudding = true
        return this
    }

    override fun build(): GrassJellyPuddingTea {
        return grassJellyPuddingTea
    }
}
```

#### 指導者類別

負責控制建構過程的高層邏輯：

```kotlin
class BeverageMaker(val builder: Builder) {
    fun makeBubbleTea(): Beverage {
        return builder.addPearls().build()
    }

    fun makeGrassJellyPuddingTea(): Beverage {
        return builder.addGrassJelly().addPudding().build()
    }
}
```

#### 客戶端使用範例

最後是實際使用的程式碼：

```kotlin
fun main() {
    // 製作珍珠奶茶
    val bubbleTeaBuilder = BubbleTeaBuilder()
    val bubbleTeaBeverageMaker = BeverageMaker(bubbleTeaBuilder)
    val bubbleTea = bubbleTeaBeverageMaker.makeBubbleTea()
    println(bubbleTea)

    // 製作仙草布丁茶
    val grassJellyPuddingTeaBuilder = GrassJellyPuddingTeaBuilder()
    val grassJellyPuddingTeaBeverageMaker = BeverageMaker(grassJellyPuddingTeaBuilder)
    val grassJellyPuddingTea = grassJellyPuddingTeaBeverageMaker.makeGrassJellyPuddingTea()
    println(grassJellyPuddingTea)
}
```

### 模式優勢展現

透過建造者模式，我們成功解決了複雜物件建構的問題：

**流暢的建構過程**：能夠清楚地分步驟製作手搖飲，每個步驟的意圖都很明確。

**避免 Telescoping Constructor**：不再需要龐大的參數列表或大量的建構子。

**靈活性**：可以輕鬆支援新的飲料類型和配料組合。

**可讀性**：程式碼意圖清晰，容易理解和維護。

## 建造者模式的應用場景

### 適用時機判斷

建造者模式在以下情況特別有用：

**複雜物件建構**：當物件包含多個可選屬性，且這些屬性的組合很複雜時。

**分步驟建構需求**：當物件的建構過程需要多個步驟，且這些步驟有特定的順序或邏輯時。

**避免 Telescoping Constructor**：當建構子參數過多，導致程式碼難以維護和理解時。

**不同的表示需求**：當同樣的建構過程需要創建不同表示的物件時。

### 現實世界的範例

**SQL 查詢建構器**：
```kotlin
val query = QueryBuilder()
    .select("name", "email")
    .from("users")
    .where("age > 18")
    .orderBy("name")
    .build()
```

**HTTP 請求建構器**：
```kotlin
val request = HttpRequestBuilder()
    .url("https://api.example.com/users")
    .method(GET)
    .header("Authorization", "Bearer token")
    .timeout(30000)
    .build()
```

## 創建型模式的進化歷程

### 從簡單到複雜的演進

通過這個系列的學習，我們看到了創建型模式的演進：

1. **簡單工廠模式**：解決基本的物件創建問題
2. **工廠方法模式**：增加擴展性，支援不同的產品類型
3. **抽象工廠模式**：處理產品系列的創建，支援二維關係
4. **建造者模式**：專注複雜物件的分步驟建構過程

每種模式都針對特定的問題場景，選擇適合的模式是軟體設計的重要技能。

## 總結

### 模式價值

建造者模式為我們提供了一種優雅的方式來處理複雜物件的建構問題。它將建構邏輯與表示分離，讓程式碼更加清晰和靈活。

### 關鍵收益

- **解決 Telescoping Constructor**：避免參數列表過長的問題
- **提升可讀性**：建構過程清晰易懂
- **增強靈活性**：容易支援新的產品變體
- **分離關注點**：建構邏輯與產品表示分離

### 設計原則體現

建造者模式體現了多項重要的設計原則：

- **Single Responsibility Principle**：每個建造者只負責特定類型的產品建構
- **Open Closed Principle**：對擴展開放，容易添加新的建造者
- **Program to Interfaces**：依賴抽象建造者介面而非具體實作
- **Encapsulate What Varies**：將變化的建構邏輯封裝在不同的建造者中

### 與其他創建型模式的關係

- **vs 抽象工廠**：建造者專注於「如何建構」，抽象工廠專注於「建構什麼」
- **vs 工廠方法**：建造者支援分步驟建構，工廠方法通常一次性創建
- **互補性**：可以結合使用，例如用工廠方法創建建造者實例

### 展望未來

設計模式的學習是軟體設計能力提升的重要一環。掌握這些模式不僅能解決具體的技術問題，更能培養良好的設計思維，為複雜軟體系統的開發奠定堅實基礎。

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長
{: .notice--success}
