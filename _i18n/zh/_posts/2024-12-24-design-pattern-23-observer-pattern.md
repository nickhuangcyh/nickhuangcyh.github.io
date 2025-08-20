---
layout: post
title: Design Pattern (23) - Observer Pattern (觀察者模式)
date: 2024-12-22 14:00:00 +0800
description: 透過觀察者模式，實現安全系統主機的警報通知機制，當警報觸發時，主機自動通知平板、iOS 和 Android 手機。
tags: [Observer Pattern]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

想像你正在設計一個家庭安全系統。我們的任務是設計一個 **安全系統主機 (Panel)**，它就像是整個安全系統的大腦。

具體需求如下：

- 主機負責監控不同的感測器，例如煙霧探測器或門窗感測器
- 當警報觸發時，主機需要立即通知所有已註冊的設備
- 通知的對象包含平板、iOS 手機和 Android 手機等不同類型的設備
- 設備可以動態地加入或移除通知清單，確保系統的靈活性

這個場景在現實生活中很常見。每當感測器偵測到異常狀況時，我們希望所有相關設備都能即時收到警報通知。

## 物件導向分析 (OOA)

理解需求後，讓我們開始進行物件導向分析。透過分析，我們可以更清楚地看到系統的結構和各元件間的關係。

{% include figure.liquid path="assets/img/design_pattern_observer_pattern_uml_1.png" title="design_pattern_observer_pattern_uml_1" %}

### 察覺 Forces

在設計這個安全系統時，如果我們不使用適當的設計模式，會遇到哪些問題呢？讓我們分析一下可能面臨的挑戰：

1. **高耦合性 (High Coupling)**
   
   如果主機直接與每一個設備互動，程式碼會變得難以維護。想像一下，每次新增或移除設備都需要修改主機的核心邏輯，這會讓系統變得非常脆弱。

2. **缺乏彈性 (Lack of Flexibility)**
   
   當我們想要新增一種新型設備時，必須修改現有的程式碼。這違反了軟體設計的開放關閉原則 (OCP)，也就是「對擴展開放，對修改關閉」的原則。

3. **通知不一致 (Inconsistent Notifications)**
   
   在緊急情況下，如何確保每個設備都能正確且及時地接收到警報通知？如果通知機制沒有統一的標準，很容易出現遺漏或錯誤。

這些問題都指向一個核心議題：我們需要一個能夠有效管理「一對多」關係的解決方案。

---

## 套用 Observer Pattern (Solution) 得到新的 Context (Resulting Context)

完成了 OOA 分析並察覺到 Forces 後，我們現在清楚地了解整個問題的脈絡。接下來，讓我們套用 Observer Pattern 來解決這個問題。

### Observer Pattern 的核心概念

先來看一下 Observer Pattern 的標準 UML 結構：

{% include figure.liquid path="assets/img/design_pattern_observer_pattern_uml_2.png" title="design_pattern_observer_pattern_uml_2" %}

觀察者模式提供了一個優雅的一對多通知機制。當主體（Subject）的狀態發生改變時，會自動通知所有已訂閱的觀察者（Observer）。

讓我們了解各個角色的職責：

- **Subject (主體)**：安全系統主機，負責管理所有設備並在警報觸發時發送通知
- **Observer (觀察者)**：各種設備，例如平板、iOS 和 Android 手機，負責接收通知並執行相應操作
- **ConcreteSubject (具體主體)**：實際的安全系統主機實現，包含完整的警報邏輯
- **ConcreteObserver (具體觀察者)**：具體的設備實現，例如 Android 設備或 iOS 設備

### 應用到我們的安全系統

現在將 Observer Pattern 套用到我們的安全系統應用中：

{% include figure.liquid path="assets/img/design_pattern_observer_pattern_uml_3.png" title="design_pattern_observer_pattern_uml_3" %}

透過這個設計，我們解決了先前識別的所有問題。主機不再需要直接依賴每個具體設備，而是透過統一的介面進行通訊。

## 實作

現在讓我們將 Observer Pattern 的設計轉換為實際的程式碼。我們將逐步實作每個元件，並解釋其功能。

### Subject 介面：AlarmSystem

首先定義主體介面，它規範了警報系統必須具備的基本功能：

```kotlin
interface AlarmSystem {
    fun addObserver(observer: Device)
    fun removeObserver(observer: Device)
    fun notifyObservers(alarmMessage: String)
}
```

這個介面定義了三個核心方法：新增觀察者、移除觀察者，以及通知所有觀察者。

### Observer 介面：Device

接下來定義觀察者介面，代表所有可接收警報通知的設備：

```kotlin
interface Device {
    fun onAlarmTriggered(alarmMessage: String)
}
```

每個設備都必須實作 `onAlarmTriggered` 方法，用來處理收到的警報訊息。

### ConcreteSubject：SecurityPanel

現在實作具體的安全系統主機：

```kotlin
class SecurityPanel : AlarmSystem {
    private val devices = mutableListOf<Device>()

    override fun addObserver(observer: Device) {
        devices.add(observer)
    }

    override fun removeObserver(observer: Device) {
        devices.remove(observer)
    }

    override fun notifyObservers(alarmMessage: String) {
        for (device in devices) {
            device.onAlarmTriggered(alarmMessage)
        }
    }

    fun triggerAlarm(zone: String) {
        val message = "警報觸發於 $zone!"
        println("主機通知: $message")
        notifyObservers(message)
    }
}
```

`SecurityPanel` 維護一個設備清單，並提供新增、移除和通知設備的功能。當觸發警報時，會自動通知所有已註冊的設備。

### ConcreteObserver：各種設備

接下來實作不同類型的設備：

```kotlin
class Tablet : Device {
    override fun onAlarmTriggered(alarmMessage: String) {
        println("平板收到通知: $alarmMessage")
    }
}

class IOSDevice : Device {
    override fun onAlarmTriggered(alarmMessage: String) {
        println("iOS 設備收到通知: $alarmMessage")
    }
}

class AndroidDevice : Device {
    override fun onAlarmTriggered(alarmMessage: String) {
        println("Android 設備收到通知: $alarmMessage")
    }
}
```

每種設備都實作了相同的介面，但可以根據自身特性執行不同的處理邏輯。

### Client 測試程式

最後，讓我們看看如何使用這個系統：

```kotlin
fun main() {
    val securityPanel = SecurityPanel()

    val tablet = Tablet()
    val iosDevice = IOSDevice()
    val androidDevice = AndroidDevice()

    // add observers
    securityPanel.addObserver(tablet)
    securityPanel.addObserver(iosDevice)
    securityPanel.addObserver(androidDevice)

    // trigger alarm
    securityPanel.triggerAlarm("客廳")
    securityPanel.triggerAlarm("廚房")

    // remove observer
    securityPanel.removeObserver(androidDevice)
    securityPanel.triggerAlarm("臥室")
}
```

這個測試程式展示了系統的完整流程：註冊設備、觸發警報，以及動態移除設備的功能。

### 執行結果

讓我們看看這個程式的執行輸出：

```kotlin
主機通知: 警報觸發於 客廳!
平板收到通知: 警報觸發於 客廳!
iOS 設備收到通知: 警報觸發於 客廳!
Android 設備收到通知: 警報觸發於 客廳!

主機通知: 警報觸發於 廚房!
平板收到通知: 警報觸發於 廚房!
iOS 設備收到通知: 警報觸發於 廚房!
Android 設備收到通知: 警報觸發於 廚房!

主機通知: 警報觸發於 臥室!
平板收到通知: 警報觸發於 臥室!
iOS 設備收到通知: 警報觸發於 臥室!
```

從輸出結果可以看到，當 Android 設備被移除後，最後一次警報只通知了平板和 iOS 設備。這完美展示了 Observer Pattern 的動態管理能力。

## 結論

透過 Observer Pattern 的實作，我們成功構建了一個靈活且可擴展的安全系統通知機制。這個解決方案帶來了多項顯著的優勢：

### 主要優點

- **低耦合性**：主機與各種設備之間透過抽象介面通訊，降低了彼此的依賴關係
- **高擴展性**：可以輕鬆新增新類型的設備，而不需要修改現有的主機邏輯
- **動態管理**：設備可以在執行時期動態地加入或移除通知清單
- **符合 OCP 原則**：對擴展開放，對修改關閉，符合軟體設計的最佳實踐

### 實際應用場景

Observer Pattern 在現實世界中有廣泛的應用，特別適合以下場景：

- **即時警報系統**：如我們實作的安全系統，需要同時通知多個設備
- **訊息推送系統**：應用程式需要向多個用戶同時發送通知
- **事件分發系統**：GUI 程式中的事件處理，或是遊戲中的狀態更新
- **數據監控系統**：當數據發生變化時，需要更新多個顯示元件

這個模式的核心價值在於建立了一個標準化的通訊機制，讓系統能夠優雅地處理一對多的通知需求。
