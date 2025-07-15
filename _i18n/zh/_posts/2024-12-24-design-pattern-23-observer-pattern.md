---
layout: post
title: 設計模式 23：觀察者模式（Observer Pattern）完整實戰指南
日期: 2024-12-22 14:00:00 +0800
description: 精通觀察者模式，學會設計事件驅動系統、通知機制，打造鬆耦合、可擴展的架構。圖文範例，適合軟體工程師與架構師。
tags: [Observer Pattern, Design Patterns, Event-Driven Programming, Notification System, Object-Oriented Design, Software Architecture, Kotlin, Programming, Behavioral Patterns]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **設計模式系列完整程式碼下載**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 觀察者模式是什麼？

**觀察者模式（Observer Pattern）** 是一種行為型設計模式，建立一對多的依賴關係，當主體（Subject）狀態改變時，所有觀察者（Observer）自動收到通知並更新。這是實作事件驅動系統與通知機制的基礎。

**主要優點：**
- ✅ 鬆耦合：主體與觀察者獨立
- ✅ 動態關係：觀察者可隨時加入/移除
- ✅ 事件驅動架構：支援反應式程式設計
- ✅ 易於擴展：新增觀察者無需改主體
- ✅ 即時更新：狀態變動自動通知

---

## 🚀 實務案例：安全系統通知機制

設計一個「安全系統主機（Panel）」系統，需求如下：
- 主機監控多種感測器（煙霧、門窗）
- 警報觸發時自動通知所有已註冊設備
- 設備可動態加入/移除通知清單
- 支援多平台（平板、iOS、Android）

**商業規則：**
- 主機需同時通知所有設備
- 設備可隨時增減，互不影響
- 不同設備可有不同通知邏輯
- 系統可擴展新設備型別

---

## 🧩 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_observer_pattern_uml_1.png" title="Observer Pattern - Problem Analysis" %}

**核心挑戰：**
1. 高耦合：主機與設備直接互動，擴展困難
2. 缺乏彈性：新增設備違反 OCP，系統難維護
3. 通知不一致：難以確保所有設備都收到通知

---

## 💡 觀察者模式解決方案

分析完需求後，套用觀察者模式，打造彈性通知系統：

{% include figure.liquid path="assets/img/design_pattern_observer_pattern_uml_2.png" title="Observer Pattern - General Structure" %}

**組件說明：**
1. 主體介面：定義觀察者管理與通知方法
2. 觀察者介面：定義通知處理方法
3. 具體主體：實作觀察者管理與通知
4. 具體觀察者：實作專屬通知邏輯

**好處：**
- 主體與觀察者鬆耦合
- 觀察者可動態增減
- 通知機制一致

---

## 🛠️ 實作：安全系統通知

{% include figure.liquid path="assets/img/design_pattern_observer_pattern_uml_3.png" title="Security System Observer Implementation" %}

### 1. 主體介面

```kotlin
interface AlarmSystem {
    fun addObserver(observer: Device)
    fun removeObserver(observer: Device)
    fun notifyObservers(alarmMessage: String)
    fun getObserverCount(): Int
}
```

### 2. 觀察者介面

```kotlin
interface Device {
    fun onAlarmTriggered(alarmMessage: String)
    fun getDeviceId(): String
}
```

### 3. 具體主體實作

```kotlin
class SecurityPanel : AlarmSystem {
    private val devices = mutableListOf<Device>()
    private var alarmCount = 0
    override fun addObserver(observer: Device) {
        if (!devices.contains(observer)) {
            devices.add(observer)
            println("📱 裝置 ${observer.getDeviceId()} 已註冊通知")
        }
    }
    override fun removeObserver(observer: Device) {
        if (devices.remove(observer)) {
            println("❌ 裝置 ${observer.getDeviceId()} 已移除通知")
        }
    }
    override fun notifyObservers(alarmMessage: String) {
        println("🚨 廣播警報給 ${devices.size} 個裝置...")
        devices.forEach { device ->
            try {
                device.onAlarmTriggered(alarmMessage)
            } catch (e: Exception) {
                println("⚠️ 通知 ${device.getDeviceId()} 失敗: ${e.message}")
            }
        }
    }
    override fun getObserverCount(): Int = devices.size
    fun triggerAlarm(zone: String, severity: AlarmSeverity = AlarmSeverity.MEDIUM) {
        alarmCount++
        val message = "🚨 警報 #$alarmCount: $severity 區域 $zone!"
        println("🔔 安全主機: $message")
        notifyObservers(message)
    }
    fun getSystemStatus(): String {
        return "安全主機狀態：${devices.size} 台裝置已註冊，已觸發 $alarmCount 次警報"
    }
}
enum class AlarmSeverity {
    LOW, MEDIUM, HIGH, CRITICAL
}
```

### 4. 具體觀察者實作

```kotlin
class Tablet : Device {
    private val deviceId = "Tablet-${System.currentTimeMillis() % 1000}"
    override fun onAlarmTriggered(alarmMessage: String) {
        println("📱 平板 ($deviceId): 顯示警報 - $alarmMessage")
        println("   📺 平板全螢幕顯示警報")
    }
    override fun getDeviceId(): String = deviceId
}

class IOSDevice : Device {
    private val deviceId = "iOS-${System.currentTimeMillis() % 1000}"
    override fun onAlarmTriggered(alarmMessage: String) {
        println("🍎 iOS 裝置 ($deviceId): 推播通知 - $alarmMessage")
        println("   📱 發送 APNS 推播")
        println("   🔔 播放 iOS 通知音效")
    }
    override fun getDeviceId(): String = deviceId
}

class AndroidDevice : Device {
    private val deviceId = "Android-${System.currentTimeMillis() % 1000}"
    override fun onAlarmTriggered(alarmMessage: String) {
        println("🤖 Android 裝置 ($deviceId): FCM 通知 - $alarmMessage")
        println("   📱 發送 FCM 推播")
        println("   🔔 播放 Android 通知音效")
        println("   📳 觸發震動")
    }
    override fun getDeviceId(): String = deviceId
}
```

### 5. 用戶端程式碼

```kotlin
fun main() {
    println("=== 安全系統觀察者模式示範 ===")
    val securityPanel = SecurityPanel()
    val tablet = Tablet()
    val iosDevice = IOSDevice()
    val androidDevice = AndroidDevice()
    securityPanel.addObserver(tablet)
    securityPanel.addObserver(iosDevice)
    securityPanel.addObserver(androidDevice)
    println("\n--- 測試警報通知 ---")
    securityPanel.triggerAlarm("客廳", AlarmSeverity.MEDIUM)
    securityPanel.triggerAlarm("廚房", AlarmSeverity.HIGH)
    securityPanel.removeObserver(androidDevice)
    securityPanel.triggerAlarm("臥室", AlarmSeverity.LOW)
}
```

**預期輸出：**
```
=== 安全系統觀察者模式示範 ===
📱 裝置 Tablet-xxx 已註冊通知
📱 裝置 iOS-xxx 已註冊通知
📱 裝置 Android-xxx 已註冊通知

--- 測試警報通知 ---
🔔 安全主機: 🚨 警報 #1: MEDIUM 區域 客廳!
🚨 廣播警報給 3 個裝置...
📱 平板 (Tablet-xxx): 顯示警報 - 🚨 警報 #1: MEDIUM 區域 客廳!
   📺 平板全螢幕顯示警報
🍎 iOS 裝置 (iOS-xxx): 推播通知 - 🚨 警報 #1: MEDIUM 區域 客廳!
   📱 發送 APNS 推播
   🔔 播放 iOS 通知音效
🤖 Android 裝置 (Android-xxx): FCM 通知 - 🚨 警報 #1: MEDIUM 區域 客廳!
   📱 發送 FCM 推播
   🔔 播放 Android 通知音效
   📳 觸發震動
...
```

---

## 🔧 **進階實作：增強型觀察者模式**

讓我們創建一個更複雜的版本，支援過濾與優先順序：

```kotlin
// 增強型觀察者，支援過濾功能
interface EnhancedDevice : Device {
    fun getNotificationPreferences(): NotificationPreferences
    fun canHandleSeverity(severity: AlarmSeverity): Boolean
}

data class NotificationPreferences(
    val minSeverity: AlarmSeverity = AlarmSeverity.LOW,
    val zones: Set<String> = setOf(),
    val enableSound: Boolean = true,
    val enableVibration: Boolean = true
)

class EnhancedSecurityPanel : AlarmSystem {
    private val devices = mutableListOf<EnhancedDevice>()
    
    override fun addObserver(observer: Device) {
        if (observer is EnhancedDevice) {
            devices.add(observer)
        }
    }
    
    override fun removeObserver(observer: Device) {
        devices.remove(observer as? EnhancedDevice)
    }
    
    override fun notifyObservers(alarmMessage: String) {
        // 增強型通知，支援過濾
        devices.filter { device ->
            device.canHandleSeverity(extractSeverity(alarmMessage))
        }.forEach { device ->
            device.onAlarmTriggered(alarmMessage)
        }
    }
    
    private fun extractSeverity(message: String): AlarmSeverity {
        return when {
            message.contains("CRITICAL") -> AlarmSeverity.CRITICAL
            message.contains("HIGH") -> AlarmSeverity.HIGH
            message.contains("MEDIUM") -> AlarmSeverity.MEDIUM
            else -> AlarmSeverity.LOW
        }
    }
    
    override fun getObserverCount(): Int = devices.size
}
```

---

## 📈 **觀察者模式 vs 其他方法**

| 方法 | 優點 | 缺點 |
|------|------|------|
| **觀察者模式** | ✅ 鬆耦合<br>✅ 動態關係<br>✅ 事件驅動 | ❌ 潛在記憶體洩漏<br>❌ 通知順序不確定 |
| **輪詢** | ✅ 簡單實作 | ❌ 資源密集<br>❌ 延遲更新 |
| **直接參考** | ✅ 執行快速 | ❌ 緊耦合<br>❌ 難以維護 |
| **事件總線** | ✅ 解耦通訊 | ❌ 複雜除錯<br>❌ 全域狀態 |

---

## 🎯 **何時使用觀察者模式**

### **✅ 完美適用：**
- **事件驅動系統**（GUI 框架、遊戲引擎）
- **通知系統**（推播通知、警報）
- **模型-視圖架構**（MVC、MVP）
- **即時更新**（股票行情、聊天應用）
- **外掛架構**（可擴展系統）

### **❌ 避免使用：**
- **簡單一對一關係**（使用直接呼叫）
- **效能關鍵系統**（通知開銷）
- **順序依賴操作**（觀察者執行順序未定）
- **記憶體受限環境**（潛在記憶體洩漏）

---

## 🔗 **相關設計模式**

- **中介者模式**：可協調多個觀察者
- **命令模式**：可封裝觀察者動作
- **責任鏈**：事件處理替代方案
- **事件溯源**：複雜事件驅動架構

---

## 📈 **實務應用**

### **1. GUI 框架**
```kotlin
// 按鈕點擊觀察者
interface ButtonClickListener {
    fun onClick(button: Button)
}

class Button {
    private val listeners = mutableListOf<ButtonClickListener>()
    
    fun addClickListener(listener: ButtonClickListener) {
        listeners.add(listener)
    }
    
    fun click() {
        listeners.forEach { it.onClick(this) }
    }
}
```

### **2. 股票市場應用**
```kotlin
interface StockObserver {
    fun onPriceChange(symbol: String, price: Double)
}

class StockMarket {
    private val observers = mutableListOf<StockObserver>()
    
    fun updatePrice(symbol: String, price: Double) {
        observers.forEach { it.onPriceChange(symbol, price) }
    }
}
```

### **3. 社交媒體通知**
```kotlin
interface NotificationObserver {
    fun onNewPost(userId: String, content: String)
    fun onLike(postId: String, userId: String)
}

class SocialMediaPlatform {
    private val followers = mutableMapOf<String, MutableList<NotificationObserver>>()
    
    fun addFollower(userId: String, observer: NotificationObserver) {
        followers.getOrPut(userId) { mutableListOf() }.add(observer)
    }
}
```

### **4. IoT 裝置管理**
```kotlin
interface SensorObserver {
    fun onSensorReading(sensorId: String, value: Double, timestamp: Long)
}

class IoTHub {
    private val sensorObservers = mutableListOf<SensorObserver>()
    
    fun sensorReading(sensorId: String, value: Double) {
        sensorObservers.forEach { 
            it.onSensorReading(sensorId, value, System.currentTimeMillis()) 
        }
    }
}
```

---

## 📈 **常見陷阱與最佳實踐**

### **1. 記憶體洩漏**
```kotlin
// ❌ 避免：觀察者未正確移除
class BadSubject {
    private val observers = mutableListOf<Observer>()
    
    fun addObserver(observer: Observer) {
        observers.add(observer) // 觀察者可能未被移除
    }
}

// ✅ 推薦：弱參考或適當清理
class GoodSubject {
    private val observers = mutableListOf<WeakReference<Observer>>()
    
    fun addObserver(observer: Observer) {
        observers.add(WeakReference(observer))
    }
    
    fun cleanup() {
        observers.removeAll { it.get() == null }
    }
}
```

### **2. 通知順序**
```kotlin
// ❌ 避免：不確定通知順序
override fun notifyObservers(message: String) {
    observers.forEach { it.update(message) } // 順序未定
}

// ✅ 推薦：定義通知順序
override fun notifyObservers(message: String) {
    observers.sortedBy { it.priority }.forEach { it.update(message) }
}
```

### **3. 例外處理**
```kotlin
// ✅ 良好：優雅處理觀察者例外
override fun notifyObservers(message: String) {
    observers.forEach { observer ->
        try {
            observer.update(message)
        } catch (e: Exception) {
            logger.error("Observer notification failed", e)
            // 可選擇移除失敗的觀察者
            observers.remove(observer)
        }
    }
}
```

---

## 🔗 **相關文章**

- [設計模式 1：物件導向概念](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [設計模式 2：設計原則](/2024-07-03-design-pattern-2-design-principle)
- [狀態模式](/2024-12-25-design-pattern-24-state-pattern)
- [策略模式](/2024-12-26-design-pattern-25-strategy-pattern)
- [命令模式](/2024-12-21-design-pattern-19-command-pattern)

---

## ✅ **結論**

透過觀察者模式，我們成功建構了一個靈活的通知系統，允許設備動態加入或離開，同時維持鬆耦合並遵循開放封閉原則（OCP）。

**關鍵優勢：**
- 🎯 **鬆耦合** - 主體與觀察者獨立
- 🔧 **動態關係** - 觀察者可隨時加入/移除
- 📈 **可擴展性** - 新增觀察者無需改主體
- 🛡️ **一致通知** - 標準化通知機制
- ⚡ **事件驅動架構** - 支援反應式程式設計

**遵循設計原則：**
- **單一職責原則（SRP）**：每個觀察者處理其專屬通知邏輯
- **開放封閉原則（OCP）**：開放擴展（新觀察者），封閉修改
- **依賴反轉原則（DIP）**：依賴抽象，而非具體實作

**完美適用：**
- **即時警報系統**（安全、監控）
- **訊息推送系統**（通知、更新）
- **事件分發系統**（日誌、分析）
- **GUI 框架**（按鈕點擊、表單變更）
- **外掛架構**（可擴展應用）

觀察者模式提供了一個優雅的事件驅動通訊解決方案，是構建響應式、可擴展系統的關鍵！

---

**💡 小貼士：** 考慮使用 WeakReferences 觀察者，特別是在長時間運行的應用程式中，以防止記憶體洩漏。

**🔔 持續更新：** 關注我們的設計模式系列，獲取更多軟體架構見解！
