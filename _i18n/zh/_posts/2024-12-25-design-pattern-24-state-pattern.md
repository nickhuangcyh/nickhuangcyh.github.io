---
layout: post
title: 設計模式 24：狀態模式（State Pattern）完整實戰指南
日期: 2024-12-22 15:00:00 +0800
description: 精通狀態模式，學會設計狀態機、根據狀態切換物件行為，打造彈性高、易維護的應用程式。圖文範例，適合軟體工程師與架構師。
tags: [State Pattern, Design Patterns, State Machine, Object-Oriented Design, Software Architecture, Kotlin, Programming, Behavioral Patterns]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **設計模式系列完整程式碼下載**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 狀態模式是什麼？

**狀態模式（State Pattern）** 是一種行為型設計模式，讓物件在內部狀態改變時能自動切換行為。非常適合實作狀態機、流程控制、UI 狀態切換等場景。

**主要應用：**

- ✅ 狀態機與流程引擎
- ✅ 遊戲開發（角色狀態、AI 行為）
- ✅ UI 元件（按鈕狀態、表單驗證）
- ✅ 網路協定（連線狀態）
- ✅ 商業邏輯（訂單流程、工作流）

---

## 🚀 實務案例：飲水機狀態管理

設計一個「飲水機」系統，需求如下：

- 三種運作狀態：
  - 加熱中：提升水溫
  - 冷卻中：降低水溫
  - 待機中：維持現有溫度
- 使用者可按鈕切換狀態
- 各狀態有專屬行為

**商業規則：**

- 加熱狀態不可同時冷卻
- 冷卻狀態不可同時加熱
- 待機狀態維持現有溫度
- 狀態切換需平順、可預期

---

## 🧩 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_1.png" title="State Pattern - Problem Analysis" %}

**核心挑戰：**

1. 高耦合：狀態邏輯與飲水機主功能混雜，難以維護
2. 違反單一職責原則（SRP）：飲水機類別同時負責狀態與主功能
3. 擴展困難：新增或修改狀態需改主邏輯，違反 OCP

---

## 💡 狀態模式解決方案

分析完需求後，套用狀態模式，將狀態邏輯封裝成獨立類別：

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_2.png" title="State Pattern - General Structure" %}

**組件說明：**

1. 狀態介面：定義所有狀態共用方法
2. 具體狀態：各自實作專屬行為
3. 上下文（Context）：維護當前狀態，將請求委派給狀態物件

**好處：**

- 降低耦合，狀態邏輯獨立
- 單一職責，易於維護
- 易於擴展，無需改舊程式

---

## 🛠️ 實作：飲水機狀態機

{% include figure.liquid path="assets/img/design_pattern_state_pattern_uml_3.png" title="Water Dispenser State Implementation" %}

### 1. 狀態介面

```kotlin
interface WaterDispenserState {
    fun handleRequest()
    fun getStateName(): String
}
```

### 2. 具體狀態類別

```kotlin
class HeatingState : WaterDispenserState {
    override fun handleRequest() {
        println("🔥 加熱中：水溫正在提升，請稍候...")
    }
    override fun getStateName(): String = "加熱中"
}

class CoolingState : WaterDispenserState {
    override fun handleRequest() {
        println("❄️ 冷卻中：水溫正在降低，請稍候...")
    }
    override fun getStateName(): String = "冷卻中"
}

class StandbyState : WaterDispenserState {
    override fun handleRequest() {
        println("⏸️ 待機中：飲水機維持現有水溫，隨時可用。")
    }
    override fun getStateName(): String = "待機中"
}
```

### 3. 上下文類別

```kotlin
class WaterDispenser {
    private var currentState: WaterDispenserState = StandbyState()
    private var temperature: Int = 25 // 預設室溫

    fun setState(state: WaterDispenserState) {
        currentState = state
        println("🔄 狀態切換：${state.getStateName()}")
    }

    fun pressButton() {
        currentState.handleRequest()
    }
    fun getCurrentState(): String = currentState.getStateName()
    fun getTemperature(): Int = temperature
}
```

### 4. 用戶端程式碼

```kotlin
fun main() {
    val dispenser = WaterDispenser()
    println("=== 飲水機狀態機示範 ===")
    dispenser.pressButton()
    dispenser.setState(HeatingState())
    dispenser.pressButton()
    dispenser.setState(CoolingState())
    dispenser.pressButton()
    dispenser.setState(StandbyState())
    dispenser.pressButton()
}
```

**預期輸出：**

```
=== 飲水機狀態機示範 ===
⏸️ 待機中：飲水機維持現有水溫，隨時可用。
🔄 狀態切換：加熱中
🔥 加熱中：水溫正在提升，請稍候...
🔄 狀態切換：冷卻中
❄️ 冷卻中：水溫正在降低，請稍候...
🔄 狀態切換：待機中
⏸️ 待機中：飲水機維持現有水溫，隨時可用。
```

---

## 🏆 結論

狀態模式讓你能彈性管理物件行為，根據狀態切換不同邏輯，適合狀態機、流程控制、UI 狀態等場景。

**適用場景：**

- 複雜狀態機
- 需根據狀態切換行為的物件
- UI 狀態、遊戲角色、網路協定

**設計原則：**

- 單一職責原則（SRP）：狀態邏輯獨立
- 開放封閉原則（OCP）：新增狀態無需改舊程式

立即將狀態模式應用於你的專案，讓系統更彈性、易於維護！
