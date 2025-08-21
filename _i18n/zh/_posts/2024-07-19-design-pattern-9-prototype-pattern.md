---
layout: post
title: "設計模式（9）原型模式 Prototype Pattern 完整教學：物件複製與效能優化"
date: 2024-07-21 23:00:00 +0800
description: "學會 Prototype Pattern 如何透過物件複製解決性能問題。從遊戲角色創建系統實例深入了解淺層與深層複製概念、Cloneable 介面實作與最佳實踐。包含 UML 設計與範例程式碼。"
tags: [Prototype Pattern, Design Pattern, Creational Pattern, Object Cloning, Performance Optimization, Deep Copy, Shallow Copy, Software Architecture]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 前言

在創造型設計模式（Creational Design Patterns）的學習旅程中，我們已經探索了 Factory Method、Abstract Factory、Builder 等多種模式。今天要介紹的是原型模式（Prototype Pattern），這個模式主要解決物件複製的問題。

這次的 Pattern 讓我想到以前開發過的一個音樂燈光秀編輯 App。當時還沒有學習到設計模式，所以沒有用 Pattern 來處理相關功能。現在回想起來，發現那個功能場景很適合套用 Prototype Pattern。

這是一個用來編輯音樂燈光秀的 App，有興趣的讀者可以下載玩玩看 🙂

- [Asante TapTap 3](https://apps.apple.com/tw/app/asante-taptap-3/id1581054107?platform=iphone)

{% include figure.liquid path="assets/img/taptap_app_edit.png" title="taptap_app_edit" %}

## 需求背景

在開發音樂燈光秀 App 的過程中，收到了客戶的反饋需求。客戶表示：編輯完一條燈光序列後，還需要重新編輯另外六條類似的燈光序列，這個過程相當耗時。

客戶希望能夠新增 Copy & Paste 的功能，透過複製已編輯好的燈光序列，快速產生新的序列並進行微調，大幅節省編輯時間。具體的操作流程如下圖所示：

{% include figure.liquid path="assets/img/taptap_app_copy.png" title="taptap_app_copy" %}

{% include figure.liquid path="assets/img/taptap_app_paste.png" title="taptap_app_paste" %}

## 初步設計分析 (OOA)

理解需求後，讓我們進行物件導向分析，設計一個簡單直觀的解決方案。

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_1.png" title="design_pattern_prototype_pattern_uml_1" %}

在最直接的做法中，當我們需要複製 `LightShowData` 時，可以使用相同的 jsonObject 資料重新建立一個新的 `LightShowData` 實體。這種方式看似簡單，但實際上會帶來一些問題。

## 問題分析 (Forces)

透過初步分析，我們可以發現上述簡單設計存在以下幾個關鍵問題：

### 複雜度問題
如果 `LightShowData` 的建構子（constructor）變得複雜，需要傳入大量參數，那麼每次複製都需要了解所有內部實作細節。這違反了封裝原則，增加了程式碼的耦合度。

### 效能問題
假設建構子在創建實體的過程中需要進行複雜的計算或資料處理（如音樂節拍分析、燈光效果運算等），那麼每次重新 new 一個實體都會重複執行這些耗時的操作，嚴重影響程式效能。

這些問題促使我們需要尋找一個更優雅的解決方案。

## 原型模式解決方案 (Prototype Pattern)

識別出問題癥結後，我們可以套用 Prototype Pattern 來解決這些挑戰。原型模式的核心思想是「透過複製現有物件來創建新物件」，而不是重新建構。

### 模式結構
讓我們先來看一下 Prototype Pattern 的標準 UML 結構：

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_2.png" title="design_pattern_prototype_pattern_uml_2" %}

### 核心角色說明

原型模式主要包含以下兩個關鍵角色：

#### 1. Prototype（原型介面）
這是一個抽象介面或抽象類，定義了複製自身的標準方法（通常是 `clone()` 方法）。這個介面的主要目的是提供一個統一的複製規範，讓用戶端可以在不需要知道具體物件類別的情況下創建物件副本。

#### 2. Concrete Prototype（具體原型）
實現原型介面的具體類別。這個類別必須實現 `clone()` 方法，負責創建自身的精確副本。在實作時，需要確保新創建的物件與原物件在狀態上完全相同，但在記憶體中是完全獨立的兩個實體。

### 套用到燈光秀應用程式

現在讓我們將 Prototype Pattern 套用到 LightShow App 的設計中：

{% include figure.liquid path="assets/img/design_pattern_prototype_pattern_uml_3.png" title="design_pattern_prototype_pattern_uml_3" %}

透過引入原型模式，我們重新設計了系統架構。`LightShowData` 現在實現了 `LightShowDataPrototype` 介面，提供了 `clone()` 方法來進行高效的物件複製。這種設計讓我們得到了一個更加靈活且高效的新架構。

## 程式實作 (OOP)

理解了設計結構後，接下來我們進行具體的程式碼實作。讓我們逐步建構出完整的原型模式實現：

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

### 效能優勢分析

透過上面的實作，我們可以清楚看到原型模式的優勢。使用 `clone()` 方法進行複製時，可以避免重複執行耗時的初始化邏輯：

```kotlin
originalDataList.subList(1, originalDataList.size).map { it * 2 }
```

這行程式碼代表複雜的燈光資料處理邏輯。在原本的設計中，每次創建新物件都需要重新計算。但透過原型模式，我們只需要在第一次建立時計算一次，之後的複製都能直接重用已處理的資料，大幅提升程式效能。

## 模式總結

原型模式是創造型設計模式的最後一個重要成員。它透過物件複製的方式解決了複雜物件創建的效能問題，特別適用於：

- 物件創建成本較高的場景
- 需要避免複雂建構子參數的情況
- 需要創建相似物件的場合

至此，我們已經完成了所有創造型設計模式的學習。下一階段將進入結構型設計模式（Structural Design Patterns）的探索，學習如何優雅地組合物件和類別，創建更靈活的系統架構。
