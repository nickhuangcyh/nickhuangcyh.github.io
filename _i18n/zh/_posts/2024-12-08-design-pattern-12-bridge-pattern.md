---
layout: post
title: "設計模式（12）橋接模式 Bridge Pattern 完整解析：解耦抽象與實現，打造靈活系統架構"
date: 2024-12-08 20:00:00 +0800
description: "深入剖析橋接模式如何解決多維度設計難題，透過分離抽象與實現避免類別爆炸問題。從保全系統實例學會 Bridge Pattern 核心概念、UML設計、Kotlin實作與最佳實踐。"
tags:
  [Bridge Pattern, Design Pattern, Software Architecture, Structural Pattern, OOP Design, System Design, Kotlin Programming, Enterprise Development]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

在上一篇 Adapter Pattern 中，我們學習了如何解決介面不匹配的問題。現在讓我們繼續探討另一個重要的結構型模式：Bridge Pattern（橋接模式）。

## 需求

我們接到一個複雜的企業級需求：

公司的智能 **保全系統** 需要在偵測到不同安全事件時，能夠透過多種通訊管道向相關人員發送警報。這個系統需要具備高度的靈活性和可擴展性。

### 支援的通知管道：

- **APNS** (Apple iOS Push Notification)
- **FCM** (Google Firebase Cloud Messaging)
- **Email** (電子郵件)
- **SMS** (簡訊)

### 警報事件類型：

- **Fire** (火災警報)
- **Burglar** (入侵警報)

### 系統要求：

每種警報類型都应該能透過任意通知管道發送，且未來可能會增加新的警報類型或通知方式。

## 物件導向分析 (OOA)

在開始設計之前，讓我們先進行物件導向分析，了解系統中的核心元件及其關係：

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_1.png" title="design_pattern_bridge_pattern_uml_1" %}

## 察覺 Forces

在面對這種多維度的設計問題時，如果不使用適當的設計模式，會面臨以下挑戰：

### 1. 組合爆炸問題 (Combinatorial Explosion)

當我們有 2 種警報類型和 4 種通知方式時，若為每個組合都建立一個類別：

- 我們需要 2 × 4 = 8 個具體類別
- 若新增一種警報類型，就需要再增加 4 個類別
- 若新增一種通知方式，就需要再增加 2 個類別

### 2. 緊密耦合問題 (Tight Coupling)

- **警報類型** 和 **通知方式** 被強制繫定在一起
- 修改其中一個維度時，可能影響到多個類別
- 系統各部分之間的依賴關係過於緊密

### 3. 擴展性不足 (Poor Extensibility)

- **新增警報類型**：需要為每個通知方式都建立對應的類別
- **新增通知方式**：需要為每個警報類型都建立對應的類別
- 每次擴展都可能導致大規模的程式碼修改

### 4. 程式碼重複問題 (Code Duplication)

- 相似的警報處理邏輯在多個類別中重複出現
- 相同的通知方式實現被複製到多個地方
- 當需要修改核心邏輯時，必須在多處同步更新

### 5. 維護成本高 (High Maintenance Cost)

- 任何一個維度的變化都可能影響多個類別
- 難以預測修改的影響範圍
- 系統的複雜度隨著組合數量指數型增長

## 套用 Bridge Pattern ( Solution ) 得到新的 Context ( Resulting Context )

做完 OOA，察覺 Forces，看清楚整個 Context 後，就可以來套用 Bridge Pattern 解決這個問題

先來看一下 Bridge Pattern 的 UML

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_2.png" title="design_pattern_bridge_pattern_uml_2" %}

- Abstraction (抽象層)：定義通知功能，負責使用具體的消息發送方式來發送通知。
- RefinedAbstraction (具體化的抽象層)：擴展抽象層，實現不同類型的警報通知，例如火警通知或竊盜警鈴通知。
- Implementor (實作層)：定義消息發送的接口，負責處理具體的消息發送邏輯。
- ConcreteImplementor (具體的實作層)：提供具體的消息發送實作，例如 APNS、FCM、Email、SMS。

將 Bridge Pattern 套用到我們的應用吧

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_3.png" title="design_pattern_bridge_pattern_uml_3" %}

## 物件導向程式設計 (OOP)

[Abstraction: AlarmNotification]

```kotlin
abstract class AlarmNotification(sender: MessageSender) {
    protected var sender: MessageSender

    init {
        this.sender = sender
    }

    abstract fun notifyUser(details: String?)
}
```

[RefinedAbstraction: FireAlarmNotification and BurglarAlarmNotification]

```kotlin
class FireAlarmNotification(sender: MessageSender) : AlarmNotification(sender) {
    override fun notifyUser(details: String?) {
        sender.sendMessage("Fire Alarm: $details")
    }
}

class BurglarAlarmNotification(sender: MessageSender) : AlarmNotification(sender) {
    override fun notifyUser(details: String?) {
        sender.sendMessage("Theft Alarm: $details")
    }
}
```

[Implementor: MessageSender]

```kotlin
interface MessageSender {
    fun sendMessage(message: String?)
}
```

[ConcreteImplementor: APNSSender, FCMSender, EmailSender, and SMSSender]

```kotlin
class APNSSender : MessageSender {
    override fun sendMessage(message: String?) {
        println("Sending APNS Notification: $message")
    }
}

class FCMSender : MessageSender {
    override fun sendMessage(message: String?) {
        println("Sending FCM Notification: $message")
    }
}

class EmailSender : MessageSender {
    override fun sendMessage(message: String?) {
        println("Sending Email: $message")
    }
}

class SMSSender : MessageSender {
    override fun sendMessage(message: String?) {
        println("Sending SMS: $message")
    }
}
```

[Client]

```kotlin
fun main() {
    // Sending Fire Alarm via APNS
    val fireAPNS: AlarmNotification = FireAlarmNotification(APNSSender())
    fireAPNS.notifyUser("Smoke detected in Zone 1.")

    // Sending Burglar Alarm via FCM
    val burglarFCM: AlarmNotification = BurglarAlarmNotification(FCMSender())
    burglarFCM.notifyUser("Unauthorized access detected at Main Door.")

    // Sending Fire Alarm via Email
    val fireEmail: AlarmNotification = FireAlarmNotification(EmailSender())
    fireEmail.notifyUser("Temperature exceeds threshold in Zone 3.")

    // Sending Burglar Alarm via SMS
    val burglarSMS: AlarmNotification = BurglarAlarmNotification(SMSSender())
    burglarSMS.notifyUser("Motion detected in Warehouse.")
}
```

## 執行結果與分析

當我們執行上述程式碼時，會獲得以下輸出：

```
Sending APNS Notification: Fire Alarm: Smoke detected in Zone 1.
Sending FCM Notification: Theft Alarm: Unauthorized access detected at Main Door.
Sending Email: Fire Alarm: Temperature exceeds threshold in Zone 3.
Sending SMS: Theft Alarm: Motion detected in Warehouse.
```

這個結果顯示了不同的警報類型可以結合不同的通知方式，而且組合方式非常靈活。

## 結論

透過套用 **Bridge Pattern**，我們成功解決了多維度設計的挑戰：

### 獲得的好處：

**1. 分離關注點**

- 警報類型和通知方式彼此獨立，可以各自演化
- 修改其中一個維度不會影響另一個維度

**2. 優雅的擴展性**

- 新增警報類型：只需建立一個新的 RefinedAbstraction
- 新增通知方式：只需建立一個新的 ConcreteImplementor
- 避免了組合爆炸的問題

**3. 提高程式碼重用性**

- 相同的通知方式可以被不同的警報類型重用
- 相同的警報邏輯可以配合不同的通知方式

**4. 降低系統複雜度**

- 類別數量從 O(m×n) 減少到 O(m+n)
- 系統的可理解性和可維護性大幅提升

### 適用場景：

Bridge Pattern 特別適合於：

- 需要在抽象和實現之間提供彈性的系統
- 有多個組合維度的設計問題
- 需要在運行時動態切換實現方式的情況

Bridge Pattern 與 Adapter Pattern 一起，組成了結構型模式中的兩個重要基礎，為我們後面學習其他更複雜的結構型模式奠定了堅實的基礎。
