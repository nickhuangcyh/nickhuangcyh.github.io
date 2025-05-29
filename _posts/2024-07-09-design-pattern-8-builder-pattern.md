---
layout: post
title: Design Pattern (8) - Builder Pattern (建造者模式)
date: 2024-07-09 23:00:00 +0800
description: 探索建造者模式，學習如何分步構建複雜對象，使程式碼更加靈活和易於維護。通過實例展示如何使用建造者模式簡化對象創建過程，提升程式碼的可讀性和可擴展性。
tags: [Builder Pattern]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

今天我們要設計一個能自動做出手搖飲的機器，但如果手搖飲店只賣紅茶、綠茶，肯定滿足不了廣大的客群需求，因此我們要能夠讓手搖飲加入各種配料，來吸引顧客。

- 珍珠 (Pearls)
- 椰果 (Coconut Jelly)
- 紅豆 (Red Beans)
- 仙草凍 (Grass Jelly)
- 布丁 (Pudding)

## 物件導向分析 (OOA)

理解需求後，讓我們來快速實作物件導向分析吧!

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_1.png" title="design_pattern_builder_pattern_uml_1" %}

但這麼做會有一個問題，假如我們今天只要加入紅豆以及布丁，就必須在其他用不到的參數傳入 false or null，參數越多越難以維護且可讀性也不高。

因此聰明的你可能想到了，可以利用寫多個不同的 constructor 來解決，如此就不需傳入不需要的參數。

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_2.png" title="design_pattern_builder_pattern_uml_2" %}

## 察覺 Forces

這邊我們會發現當參數越多, 所需寫的 constructor 就越多，這樣既不好維護，也使得類別的實例化過程錯綜複雜，這個現象可以稱為 `telescoping constructor`

> Telescoping constructor 是當一個類別有多個構造器，每個構造器參數數量不同，導致類別難以維護和使用的問題。

## 套用 Builder Pattern ( `Solution` ) 得到新的 Context ( `Resulting Context` )

做完 OOA，察覺 Forces，看清楚整個 Context 後，就可以來套用 Builder Pattern 解決這個問題

先來看一下 Builder Pattern 的 UML

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_3.png" title="design_pattern_builder_pattern_uml_3" %}

建構者模式主要包含以下四個角色：

1. **Product（產品）**：Product 是 Builder Pattern 負責構建的複雜對象。它可能包含多個組件或部分，其結構根據實現的不同而變化。Product 通常是一個類，其屬性代表 Builder 構建的不同部分。
2. **Builder（建造者）**：Builder 是一個介面或抽象類，宣告了構建複雜對象的步驟。它通常包括用於構建產品各個部分的方法。通過定義一個介面，Builder 允許創建不同的具體建造者，這些建造者可以生產產品的不同變體 1。
3. **ConcreteBuilder（具體建造者）**：ConcreteBuilder 類實現了 Builder 介面，提供了構建產品每個部分的具體實現。每個 ConcreteBuilder 都是為創建產品的特定變體而量身定制的。它跟踪正在構建的產品，並提供設置或構建每個部分的方法 1。
4. **Director（指導者）**：Director 負責管理複雜對象的構建過程。它與 Builder 合作，但不知道對象的每個部分是如何構建的。它提供了一個高級介面，用於構建產品和管理創建複雜對象所需的步驟 1。
5. **Client（客戶端）**：Client 是啟動複雜對象構建過程的程式碼。它創建一個 Builder 對象並將其傳遞給 Director 以啟動構建過程。在構建完成後，Client 可能會從 Builder 那裡檢索最終產品 1。

我們來將製作手搖飲套用 Builder Pattern

{% include figure.liquid path="assets/img/design_pattern_builder_pattern_uml_4.png" title="design_pattern_builder_pattern_uml_4" %}

如此我們就得到了一個全新的 `Resulting Context`

## 物件導向程式設計 (OOP)

再來我們就可以開始進行物件導向程式開發

[Beverage]

```kotlin
interface Beverage {
    var hasPearls: Boolean
    var hasCoconutJelly: Boolean
    var hasRedBeans: Boolean
    var hasGrassJelly: Boolean
    var hasPudding: Boolean
}
```

[BubbleTea]

```kotlin
data class BubbleTea(override var hasPearls: Boolean,
                     override var hasCoconutJelly: Boolean = false,
                     override var hasRedBeans: Boolean = false,
                     override var hasGrassJelly: Boolean = false,
                     override var hasPudding: Boolean = false
): Beverage {
}
```

[GrassJellyPuddingTea]

```kotlin
data class GrassJellyPuddingTea(override var hasPearls: Boolean = false,
                     override var hasCoconutJelly: Boolean = false,
                     override var hasRedBeans: Boolean = false,
                     override var hasGrassJelly: Boolean,
                     override var hasPudding: Boolean
): Beverage {
}
```

[Builder]

```kotlin
interface Builder {
    fun addPearls(): Builder
    fun addPudding(): Builder
    fun addGrassJelly(): Builder

    fun build(): Beverage
}
```

[BubbleTeaBuilder]

```kotlin
class BubbleTeaBuilder: Builder {
    private var bubbleTea = BubbleTea(false)

    override fun addPearls(): BubbleTeaBuilder {
        bubbleTea.hasPearls = true
        return this
    }

    override fun addPudding(): Builder {
        return this
    }

    override fun addGrassJelly(): Builder {
        return this
    }

    override fun build(): BubbleTea {
        return bubbleTea
    }
}
```

[GrassJellyPuddingTeaBuilder]

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
        return this
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

[BeverageMaker]

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

[BuilderPattern.kt]

```kotlin
fun main() {
    val bubbleTeaBuilder = BubbleTeaBuilder()
    val bubbleTeaBeverageMaker = BeverageMaker(bubbleTeaBuilder)
    val bubbleTea = bubbleTeaBeverageMaker.makeBubbleTea()
    println(bubbleTea)

    val grassJellyPuddingTeaBuilder = GrassJellyPuddingTeaBuilder()
    val grassJellyPuddingTeaBeverageMaker = BeverageMaker(grassJellyPuddingTeaBuilder)
    val grassJellyPuddingTea = grassJellyPuddingTeaBeverageMaker.makeGrassJellyPuddingTea()
    println(grassJellyPuddingTea)
}
```

如此就能很清楚的分步驟製作手搖飲了 🙌
