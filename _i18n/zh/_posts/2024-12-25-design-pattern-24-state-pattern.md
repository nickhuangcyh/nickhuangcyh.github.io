---
layout: post
title: "設計模式（24）狀態模式：智慧飲水機狀態管理，實現物件行為動態切換"
date: 2024-12-22 15:00:00 +0800
description: "深度解析狀態模式（State Pattern）核心概念，透過智慧飲水機系統實例，學習如何優雅管理物件狀態轉換，降低程式耦合度並提升系統擴展性。"
tags: [State Pattern, Design Patterns, Behavioral Patterns, State Management, Object Behavior, Software Architecture]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

---

## 需求

我們的任務是設計一個智慧 **飲水機系統**。這個系統需要模擬真實生活中的飲水機操作模式。

### 核心功能需求

飲水機需要支援三種運作狀態：
- **加熱中**：提升水溫至熱水溫度
- **冷卻中**：降低水溫至冷水溫度  
- **待機中**：維持現有水溫，節能模式

### 操作需求

使用者可透過控制面板上的按鈕來切換飲水機的運作狀態。飲水機必須根據當前所處的狀態，執行對應的正確行為。

例如：當飲水機處於加熱狀態時，只能執行加熱動作，而不能同時進行冷卻操作。這種狀態約束確保了設備運作的安全性和效率。

---

## 物件導向分析 (OOA)

理解需求後，讓我們進行物件導向分析，找出系統的核心問題！

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_1.png" title="design_pattern_state_pattern_uml_1" %}

從上圖可以看出，傳統的設計方式將所有狀態邏輯都集中在飲水機類別中。這種做法看似直觀，但實際上會帶來許多問題。

### 察覺 Forces

如果我們不使用設計模式，直接將狀態邏輯寫在飲水機類別中，將會面臨以下三個主要挑戰：

#### 1. **高耦合性 (High Coupling)**

狀態切換的邏輯與飲水機的核心功能緊密結合在一起。當我們需要修改某個狀態的行為時，必須深入飲水機的主要程式碼中進行修改。

這種緊密耦合使得程式碼變得難以理解和維護。

#### 2. **違反單一職責原則 (SRP)**

飲水機類別承擔了過多的責任。它既要管理狀態轉換，又要實現每個狀態下的具體行為邏輯。

當系統變得複雜時，這個類別會變得越來越龐大，難以管理。

#### 3. **難以擴展 (Hard to Extend)**

當我們需要新增新的狀態（例如「清潔模式」）或修改現有狀態的行為時，必須修改飲水機的核心邏輯。

這違反了開放關閉原則 (OCP)，增加了引入新 bug 的風險。

---

## 套用 State Pattern (Solution) 得到新的 Context (Resulting Context)

完成物件導向分析並察覺到 Forces 後，我們已經清楚掌握了整個問題的脈絡。現在可以套用 **State Pattern** 來解決這些問題！

### State Pattern 的解決方案

**狀態模式**的核心思想是將每個狀態的邏輯封裝成獨立的類別。這樣做可以將複雜的狀態管理問題分解成更小、更易管理的部分。

狀態模式與[策略模式]({% post_url 2024-12-26-design-pattern-25-strategy-pattern %})有相似的結構，但兩者的應用場景不同：狀態模式著重於狀態的轉換與管理，而策略模式專注於演算法的選擇與替換。

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_2.png" title="design_pattern_state_pattern_uml_2" %}

### 狀態模式的三個核心角色

狀態模式包含三個重要的參與者，每個都有明確的職責分工：

#### 1. **State (狀態介面)**  

這是一個抽象介面，定義了所有具體狀態都必須實現的行為方法。它為不同狀態提供了統一的操作介面。

#### 2. **ConcreteState (具體狀態)**  

每個具體狀態類別都實現了 State 介面。每個狀態類別專注於處理該狀態下的特定行為邏輯，職責單一且清晰。

#### 3. **Context (上下文)**  

上下文類別負責維護當前的狀態物件，並提供外部操作的介面。當外部請求操作時，上下文會將請求委派給當前狀態物件來處理。

### 套用狀態模式的優勢

透過這種設計，我們可以達到以下重要改善：

- **降低耦合度**：飲水機類別只負責狀態管理，具體的行為實現由各狀態類別負責
- **符合單一職責**：每個狀態類別專注於自身的行為邏輯，職責明確
- **易於擴展**：新增或修改狀態時，無需影響飲水機的核心邏輯，完全符合開放關閉原則

### 實際應用架構

讓我們將 State Pattern 套用到飲水機系統中：

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_3.png" title="design_pattern_state_pattern_uml_3" %}

---

## 物件導向設計 (OOP)

現在讓我們將 State Pattern 的理論轉化為具體的程式碼實作。我們將逐步建構每個元件，從最基本的介面開始。

### State 介面：WaterDispenserState

首先定義狀態介面，這是所有具體狀態的共同契約：

```kotlin
interface WaterDispenserState {
    fun handleRequest()
}
```

這個介面非常簡潔，只定義了一個 `handleRequest()` 方法。每個具體狀態都必須實現這個方法來定義該狀態下的特定行為。

### 具體狀態：HeatingState, CoolingState, StandbyState

接下來實作三個具體的狀態類別，每個都有自己獨特的行為邏輯：

```kotlin
class HeatingState : WaterDispenserState {
    override fun handleRequest() {
        println("加熱中：水溫正在提升，請稍候...")
    }
}

class CoolingState : WaterDispenserState {
    override fun handleRequest() {
        println("冷卻中：水溫正在降低，請稍候...")
    }
}

class StandbyState : WaterDispenserState {
    override fun handleRequest() {
        println("待機中：飲水機維持現有水溫，隨時可用。")
    }
}
```

每個狀態類別都專注於自己的核心職責。這種設計使得程式碼更加清晰，也更容易進行單元測試。

### Context 類別：WaterDispenser

飲水機類別作為 Context，負責管理當前狀態並委派請求：

```kotlin
class WaterDispenser {
    private var currentState: WaterDispenserState = StandbyState()

    fun setState(state: WaterDispenserState) {
        currentState = state
        println("狀態切換：${state::class.simpleName}")
    }

    fun pressButton() {
        currentState.handleRequest()
    }
}
```

注意這裡的設計重點：
- 飲水機初始狀態設定為待機模式，這符合實際使用情境
- `setState()` 方法允許外部切換狀態，並提供視覺化的狀態切換提示
- `pressButton()` 方法將實際的處理邏輯委派給當前狀態物件

### 客戶端程式：使用範例

讓我們看看如何使用這個狀態機制：

```kotlin
fun main() {
    val dispenser = WaterDispenser()

    // 初始狀態為待機中
    dispenser.pressButton()

    // 切換到加熱狀態
    dispenser.setState(HeatingState())
    dispenser.pressButton()

    // 切換到冷卻狀態
    dispenser.setState(CoolingState())
    dispenser.pressButton()

    // 回到待機狀態
    dispenser.setState(StandbyState())
    dispenser.pressButton()
}
```

這個範例展示了狀態切換的完整流程，模擬了使用者實際操作飲水機的情境。

### 執行結果

程式執行後會產生以下輸出，清楚展示狀態切換的過程：

```kotlin
待機中：飲水機維持現有水溫，隨時可用。
狀態切換：HeatingState
加熱中：水溫正在提升，請稍候...
狀態切換：CoolingState
冷卻中：水溫正在降低，請稍候...
狀態切換：StandbyState
待機中：飲水機維持現有水溫，隨時可用。
```

從輸出可以看出，每次狀態切換都有明確的提示，而每個狀態的行為也都按照預期執行。

## 結論

透過實作 State Pattern，我們成功地將飲水機的狀態邏輯與核心功能完全分離。這個轉變為我們帶來了顯著的程式碼品質提升。

### 獲得的關鍵優勢

#### 1. **顯著降低耦合度**

飲水機類別現在只需專注於狀態的切換與管理，而不必關心每個狀態的具體實作細節。各種狀態行為的實現完全由對應的狀態類別負責，實現了真正的責任分離。

#### 2. **完全符合物件導向設計原則**

我們的設計完美遵循了兩個重要的設計原則：
- **單一職責原則 (SRP)**：每個狀態類別只專注於自身的行為邏輯，職責單一且明確
- **開放關閉原則 (OCP)**：當需要新增新狀態時，我們只需要創建新的狀態類別，完全不需要修改現有程式碼

#### 3. **出色的擴展性**

當需要新增或修改狀態行為時，這些變更完全局限在對應的狀態類別中，不會對系統的其他部分造成任何影響。這種設計使得系統具有優秀的可維護性。

### 實際應用場景

狀態模式特別適合處理具有複雜狀態轉換邏輯的系統。以下是一些典型的應用場景：

#### 金融系統
- **ATM 機**：插卡、密碼驗證、操作選擇、取卡等不同狀態
- **信用卡系統**：正常、凍結、逾期、註銷等狀態管理

#### 辦公軟體
- **文檔編輯器**：編輯模式、檢視模式、列印預覽模式
- **多媒體播放器**：播放、暫停、停止、快轉等狀態

#### 遊戲開發
- **角色狀態**：移動、攻擊、防禦、受傷等不同行為狀態
- **遊戲關卡**：開始、進行中、暫停、結束等狀態轉換

### 最終總結

**狀態模式**為我們提供了一種優雅且強大的方式來管理物件的狀態相關行為。它不僅讓程式結構更具彈性和可維護性，更是開發複雜狀態機制應用時的最佳選擇。

當你的系統需要根據物件的內部狀態來改變行為，且這些狀態轉換邏輯較為複雜時，狀態模式將是你最可靠的設計夥伴！

在行為型設計模式系列中，狀態模式與[觀察者模式]({% post_url 2024-12-24-design-pattern-23-observer-pattern %})、[命令模式]({% post_url 2024-12-21-design-pattern-19-command-pattern %})等模式共同構成了完整的行為管理工具庫。掌握狀態模式，將為您的軟體架構設計增添重要的技術基石。
