---
layout: post
title: Design Pattern (9) - Prototype Pattern (原型模式)
date: 2024-07-21 23:00:00 +0800
description: 深入原型模式：探索如何透過物件複製技術，有效提升軟體開發中的資源管理與設計模式的靈活性。
tags: [Prototype Pattern]
categories: [Design Pattern]
toc:
#   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 前言

這次的 Pattern 讓我想到以前做過的一個 App，但當時還沒有學習到 Pattern，所以沒有用 Pattern 來處理，現在發現這個功能很適合套用 prototype pattern

這是一個用來編輯音樂燈光秀的 App，有興趣的讀者可以下載玩玩看 🙂

- [Asante TapTap 3](https://apps.apple.com/tw/app/asante-taptap-3/id1581054107?platform=iphone)

{% include figure.liquid path="assets/img/taptap_app_edit.png" title="taptap_app_edit" %}

## 需求

今天收到了客人的需求，客人反應編輯完一條燈光還要編輯另外六條好浪費時間，能不能新增 Copy & Paste 的功能，加快編輯以節省時間，如下圖

{% include figure.liquid path="assets/img/taptap_app_copy.png" title="taptap_app_copy" %}

{% include figure.liquid path="assets/img/taptap_app_paste.png" title="taptap_app_paste" %}

## 物件導向分析 (OOA)

理解需求後，讓我們來快速實作物件導向分析吧!

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_1.png" title="design_pattern_prototype_pattern_uml_1" %}

當我們需要複製 `LightShowData` 時，只需要同樣的 jsonObject 資料重新 new 一個 `LightShowData` 即可複製一份

## 察覺 Forces

來看看上面這樣的設計會有哪些問題

1. 如果我們的 constructor 很複雜，參數非常多，那麼重新 new 一個實體會需要知道很多細節。
2. 如果 constructor 創建實體的過程，是很耗時複雜的計算，重新 new 一個實體會讓創建過程效率變差。

## 套用 Prototype Pattern ( Solution ) 得到新的 Context ( Resulting Context )

做完 OOA，察覺 Forces，看清楚整個 Context 後，就可以來套用 Prototype Pattern 解決這個問題

先來看一下 Prototype Pattern 的 UML

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_2.png" title="design_pattern_prototype_pattern_uml_2" %}

原型模式主要包含以下兩個角色：

1. **Prototype（原型）**：這是一個抽象介面，定義了複製自身的方法。在實體實現中，這個介面可以是一個抽象類或者實體類，主要目的是提供一個複製自己的方法。這使得在不需要知道物件實體類別的情況下也能創建物件的副本。

2. **Concrete Prototype（實體原型）**：實現或繼承自原型介面的類。這個類實現了在原型介面中定義的複製（clone）方法，用於創建自身的一個精確副本。在實體實現時，這個類需要提供一個方法來複製自身的屬性，確保新創建的物件與原有物件在狀態上是相同的，但在記憶體中是獨立的。

我們來將 LightShow App 套用 Prototype Pattern

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_3.png" title="design_pattern_prototype_pattern_uml_3" %}

如此我們就得到了一個全新的 `Resulting Context`

## 物件導向程式設計 (OOP)

再來我們就可以開始進行物件導向程式開發

[LightShowDataPrototype]

```kotlin
interface LightShowDataPrototype {
    val startIndex: Int
    val lightDataList: List<Int>
    fun clone(): LightShowDataPrototype
}
```

[LightShowData]

```kotlin
package prototypepattern.source

class LightShowData: LightShowDataPrototype {

    override val startIndex: Int
    override val lightDataList: List<Int>

    constructor(originalDataList: List<Int>) {
        startIndex = originalDataList[0]
        lightDataList = originalDataList.subList(1, originalDataList.size).map { it * 2 }
    }

    constructor(startIndex: Int, lightDataList: List<Int>) {
        this.startIndex = startIndex
        this.lightDataList = lightDataList
    }

    override fun clone(): LightShowDataPrototype {
        return LightShowData(startIndex, lightDataList.toList())
    }
}
```

[main]

```kotlin
fun main() {
    val originalData = listOf(1, 2, 3, 4, 5)

    // Before using prototype pattern
    val originalLightShowData: LightShowDataPrototype = LightShowData(originalData)
    val newLightShowData: LightShowDataPrototype = LightShowData(originalData)

    println(originalLightShowData)
    println(newLightShowData)

    // After using prototype pattern
    val clonedLightShowData: LightShowDataPrototype = LightShowData(originalData)

    println(originalLightShowData)
    println(clonedLightShowData)
}
```

我們可以發現，透過 clone() 方法複製，就可以不重複執行下面的程式碼，提升程式碼效能了

```kotlin
originalDataList.subList(1, originalDataList.size).map { it * 2 }
```
