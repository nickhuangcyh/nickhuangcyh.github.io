---
layout: post
title: "Design Pattern 12: Bridge Pattern - Complete Guide with Real-World Security System Examples"
date: 2024-12-08 20:00:00 +0800
description: "Master the Bridge Pattern with practical security system examples. Learn how to decouple abstraction from implementation, create flexible architectures, and build extensible systems."
tags:
  [
    Bridge Pattern,
    Design Patterns,
    Abstraction-Implementation Separation,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Structural Patterns,
    Security System,
    Notification System,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Bridge Pattern?**

The **Bridge Pattern** is a structural design pattern that decouples an abstraction from its implementation, allowing both to vary independently. It provides a bridge between the abstraction and implementation, enabling you to change either without affecting the other.

**Key Benefits:**

- ✅ **Decoupling** - Separate abstraction from implementation
- ✅ **Extensibility** - Add new abstractions and implementations independently
- ✅ **Flexibility** - Mix and match abstractions with implementations
- ✅ **Maintainability** - Changes to one don't affect the other
- ✅ **Open/Closed Principle** - Open for extension, closed for modification

---

## 🚀 **Real-World Problem: Security System with Multiple Notification Methods**

Let's design a **security system** with the following requirements:

### **System Requirements:**

- **Multiple alarm types** (Fire, Burglar, Environmental, Medical)
- **Various notification methods** (APNS, FCM, Email, SMS, Slack)
- **Flexible combinations** - any alarm type with any notification method
- **Easy extension** - add new alarm types or notification methods
- **High performance** - handle multiple concurrent alarms

### **Business Rules:**

- Each alarm type has specific message formatting and priority
- Different notification methods have different delivery characteristics
- System should support dynamic alarm-notification combinations
- New alarm types or notification methods should be easy to add
- System should handle notification failures gracefully

---

## 🏗️ **Object-Oriented Analysis (OOA)**

Let's analyze the problem and identify the core components:

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_1.png" title="Bridge Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **Class Explosion**
   - Creating a class for every alarm-notification combination leads to exponential growth
   - Maintenance becomes difficult with many classes
   - Code duplication across similar combinations

2. **Tight Coupling**
   - Alarm types and notification methods are tightly coupled
   - Changes to one affect multiple classes
   - Difficult to add new alarm types or notification methods

3. **Inflexible Design**
   - Cannot dynamically change notification methods
   - Hard to test individual components
   - Limited reusability

---

## 💡 **Bridge Pattern Solution**

After analyzing the forces, we can apply the **Bridge Pattern** to create a flexible, decoupled system:

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_2.png" title="Bridge Pattern - General Structure" %}

### **Bridge Pattern Components:**

1. **Abstraction** - Defines the interface for the abstraction
2. **Refined Abstraction** - Extends the abstraction with specific functionality
3. **Implementor** - Defines the interface for the implementation
4. **Concrete Implementor** - Implements the implementor interface

**Benefits:**

- **Decoupled design** - Abstraction and implementation vary independently
- **Flexible combinations** - Mix and match abstractions with implementations
- **Easy extension** - Add new abstractions or implementations without affecting existing code
- **Better testing** - Test abstractions and implementations separately

---

## 🛠️ **Implementation: Security System with Multiple Notification Methods**

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_3.png" title="Security System Bridge Pattern Implementation" %}

### **1. Implementor Interface (Notification Methods)**

```kotlin
interface MessageSender {
    fun sendMessage(message: String, priority: Priority): SendResult
    fun getSupportedPriorities(): List<Priority>
    fun getDeliveryTime(): Long
    fun isAvailable(): Boolean
}

enum class Priority {
    LOW, MEDIUM, HIGH, CRITICAL
}

data class SendResult(
    val success: Boolean,
    val messageId: String? = null,
    val deliveryTime: Long = 0,
    val error: String? = null
)
```

### **2. Concrete Implementors (Notification Methods)**

```kotlin
class APNSSender : MessageSender {
    private var isConnected = true

    override fun sendMessage(message: String, priority: Priority): SendResult {
        if (!isAvailable()) {
            return SendResult(false, error = "APNS not available")
        }

        val deliveryTime = getDeliveryTime()
        val messageId = "apns_${System.currentTimeMillis()}"

        println("📱 APNS: Sending message (Priority: $priority)")
        println("   Message: $message")
        println("   Delivery Time: ${deliveryTime}ms")

        return SendResult(
            success = true,
            messageId = messageId,
            deliveryTime = deliveryTime
        )
    }

    override fun getSupportedPriorities(): List<Priority> =
        listOf(Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.CRITICAL)

    override fun getDeliveryTime(): Long = 100 // 100ms average delivery time

    override fun isAvailable(): Boolean = isConnected

    fun setConnectionStatus(connected: Boolean) {
        isConnected = connected
    }
}

class FCMSender : MessageSender {
    override fun sendMessage(message: String, priority: Priority): SendResult {
        val deliveryTime = getDeliveryTime()
        val messageId = "fcm_${System.currentTimeMillis()}"

        println("📲 FCM: Sending message (Priority: $priority)")
        println("   Message: $message")
        println("   Delivery Time: ${deliveryTime}ms")

        return SendResult(
            success = true,
            messageId = messageId,
            deliveryTime = deliveryTime
        )
    }

    override fun getSupportedPriorities(): List<Priority> =
        listOf(Priority.MEDIUM, Priority.HIGH, Priority.CRITICAL)

    override fun getDeliveryTime(): Long = 150 // 150ms average delivery time

    override fun isAvailable(): Boolean = true
}

class EmailSender : MessageSender {
    override fun sendMessage(message: String, priority: Priority): SendResult {
        val deliveryTime = getDeliveryTime()
        val messageId = "email_${System.currentTimeMillis()}"

        println("📧 Email: Sending message (Priority: $priority)")
        println("   Subject: [${priority.name}] Security Alert")
        println("   Body: $message")
        println("   Delivery Time: ${deliveryTime}ms")

        return SendResult(
            success = true,
            messageId = messageId,
            deliveryTime = deliveryTime
        )
    }

    override fun getSupportedPriorities(): List<Priority> =
        listOf(Priority.LOW, Priority.MEDIUM, Priority.HIGH)

    override fun getDeliveryTime(): Long = 5000 // 5 seconds average delivery time

    override fun isAvailable(): Boolean = true
}

class SMSSender : MessageSender {
    override fun sendMessage(message: String, priority: Priority): SendResult {
        val deliveryTime = getDeliveryTime()
        val messageId = "sms_${System.currentTimeMillis()}"

        println("📱 SMS: Sending message (Priority: $priority)")
        println("   Message: $message")
        println("   Delivery Time: ${deliveryTime}ms")

        return SendResult(
            success = true,
            messageId = messageId,
            deliveryTime = deliveryTime
        )
    }

    override fun getSupportedPriorities(): List<Priority> =
        listOf(Priority.HIGH, Priority.CRITICAL)

    override fun getDeliveryTime(): Long = 2000 // 2 seconds average delivery time

    override fun isAvailable(): Boolean = true
}

class SlackSender : MessageSender {
    override fun sendMessage(message: String, priority: Priority): SendResult {
        val deliveryTime = getDeliveryTime()
        val messageId = "slack_${System.currentTimeMillis()}"

        val channel = when (priority) {
            Priority.CRITICAL -> "#security-critical"
            Priority.HIGH -> "#security-alerts"
            Priority.MEDIUM -> "#security-notifications"
            Priority.LOW -> "#security-info"
        }

        println("💬 Slack: Sending message to $channel (Priority: $priority)")
        println("   Message: $message")
        println("   Delivery Time: ${deliveryTime}ms")

        return SendResult(
            success = true,
            messageId = messageId,
            deliveryTime = deliveryTime
        )
    }

    override fun getSupportedPriorities(): List<Priority> =
        listOf(Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.CRITICAL)

    override fun getDeliveryTime(): Long = 300 // 300ms average delivery time

    override fun isAvailable(): Boolean = true
}
```

### **3. Abstraction (Alarm Notifications)**

```kotlin
abstract class AlarmNotification(
    protected val sender: MessageSender
) {
    abstract fun notifyUser(details: String, priority: Priority): SendResult
    abstract fun getAlarmType(): String
    abstract fun getDefaultPriority(): Priority

    fun isSenderCompatible(): Boolean {
        return sender.getSupportedPriorities().contains(getDefaultPriority())
    }

    fun getSenderInfo(): String {
        return "${sender::class.simpleName} (${sender.getDeliveryTime()}ms delivery)"
    }
}
```

### **4. Refined Abstractions (Specific Alarm Types)**

```kotlin
class FireAlarmNotification(sender: MessageSender) : AlarmNotification(sender) {
    override fun notifyUser(details: String, priority: Priority): SendResult {
        val message = buildString {
            appendLine("🔥 FIRE ALARM ACTIVATED")
            appendLine("Location: $details")
            appendLine("Time: ${java.time.LocalDateTime.now()}")
            appendLine("Priority: $priority")
            appendLine("Action Required: Immediate evacuation")
        }

        return sender.sendMessage(message, priority)
    }

    override fun getAlarmType(): String = "Fire Alarm"

    override fun getDefaultPriority(): Priority = Priority.CRITICAL
}

class BurglarAlarmNotification(sender: MessageSender) : AlarmNotification(sender) {
    override fun notifyUser(details: String, priority: Priority): SendResult {
        val message = buildString {
            appendLine("🚨 BURGLAR ALARM ACTIVATED")
            appendLine("Location: $details")
            appendLine("Time: ${java.time.LocalDateTime.now()}")
            appendLine("Priority: $priority")
            appendLine("Action Required: Contact security immediately")
        }

        return sender.sendMessage(message, priority)
    }

    override fun getAlarmType(): String = "Burglar Alarm"

    override fun getDefaultPriority(): Priority = Priority.HIGH
}

class EnvironmentalAlarmNotification(sender: MessageSender) : AlarmNotification(sender) {
    override fun notifyUser(details: String, priority: Priority): SendResult {
        val message = buildString {
            appendLine("🌡️ ENVIRONMENTAL ALARM ACTIVATED")
            appendLine("Issue: $details")
            appendLine("Time: ${java.time.LocalDateTime.now()}")
            appendLine("Priority: $priority")
            appendLine("Action Required: Check environmental systems")
        }

        return sender.sendMessage(message, priority)
    }

    override fun getAlarmType(): String = "Environmental Alarm"

    override fun getDefaultPriority(): Priority = Priority.MEDIUM
}

class MedicalAlarmNotification(sender: MessageSender) : AlarmNotification(sender) {
    override fun notifyUser(details: String, priority: Priority): SendResult {
        val message = buildString {
            appendLine("🏥 MEDICAL ALARM ACTIVATED")
            appendLine("Patient: $details")
            appendLine("Time: ${java.time.LocalDateTime.now()}")
            appendLine("Priority: $priority")
            appendLine("Action Required: Immediate medical attention")
        }

        return sender.sendMessage(message, priority)
    }

    override fun getAlarmType(): String = "Medical Alarm"

    override fun getDefaultPriority(): Priority = Priority.CRITICAL
}
```

### **5. Enhanced Security System with Multiple Notifications**

```kotlin
class SecuritySystem {
    private val notifications = mutableListOf<AlarmNotification>()
    private val alarmHistory = mutableListOf<AlarmRecord>()

    fun addNotification(notification: AlarmNotification) {
        if (notification.isSenderCompatible()) {
            notifications.add(notification)
            println("✅ Added ${notification.getAlarmType()} with ${notification.getSenderInfo()}")
        } else {
            println("❌ ${notification.getAlarmType()} not compatible with ${notification.getSenderInfo()}")
        }
    }

    fun triggerAlarm(alarmType: String, details: String, priority: Priority? = null) {
        println("\n🚨 Triggering $alarmType alarm...")
        println("Details: $details")

        val compatibleNotifications = notifications.filter {
            it.getAlarmType() == alarmType
        }

        if (compatibleNotifications.isEmpty()) {
            println("❌ No compatible notifications found for $alarmType")
            return
        }

        val results = mutableListOf<SendResult>()

        compatibleNotifications.forEach { notification ->
            val actualPriority = priority ?: notification.getDefaultPriority()
            println("\n📤 Sending via ${notification.getSenderInfo()}")

            val result = notification.notifyUser(details, actualPriority)
            results.add(result)

            if (result.success) {
                println("✅ Notification sent successfully (ID: ${result.messageId})")
            } else {
                println("❌ Notification failed: ${result.error}")
            }
        }

        // Record alarm
        alarmHistory.add(AlarmRecord(
            alarmType = alarmType,
            details = details,
            priority = priority,
            timestamp = System.currentTimeMillis(),
            results = results
        ))

        println("\n📊 Alarm Summary:")
        println("- Total notifications sent: ${results.size}")
        println("- Successful: ${results.count { it.success }}")
        println("- Failed: ${results.count { !it.success }}")
    }

    fun getAlarmHistory(): List<AlarmRecord> = alarmHistory.toList()

    fun getNotificationStats(): Map<String, Int> {
        return notifications.groupBy { it.getAlarmType() }
            .mapValues { it.value.size }
    }
}

data class AlarmRecord(
    val alarmType: String,
    val details: String,
    val priority: Priority?,
    val timestamp: Long,
    val results: List<SendResult>
)
```

### **6. Client Code**

```kotlin
fun main() {
    println("=== Security System Bridge Pattern Demo ===\n")

    val securitySystem = SecuritySystem()

    // Create different notification senders
    val apnsSender = APNSSender()
    val fcmSender = FCMSender()
    val emailSender = EmailSender()
    val smsSender = SMSSender()
    val slackSender = SlackSender()

    // Add different alarm-notification combinations
    println("🔧 Setting up alarm notifications...")

    // Fire alarms with different notification methods
    securitySystem.addNotification(FireAlarmNotification(apnsSender))
    securitySystem.addNotification(FireAlarmNotification(emailSender))
    securitySystem.addNotification(FireAlarmNotification(slackSender))

    // Burglar alarms with different notification methods
    securitySystem.addNotification(BurglarAlarmNotification(fcmSender))
    securitySystem.addNotification(BurglarAlarmNotification(smsSender))
    securitySystem.addNotification(BurglarAlarmNotification(slackSender))

    // Environmental alarms
    securitySystem.addNotification(EnvironmentalAlarmNotification(emailSender))
    securitySystem.addNotification(EnvironmentalAlarmNotification(slackSender))

    // Medical alarms
    securitySystem.addNotification(MedicalAlarmNotification(apnsSender))
    securitySystem.addNotification(MedicalAlarmNotification(smsSender))

    println("\n📊 Notification Statistics:")
    securitySystem.getNotificationStats().forEach { (alarmType, count) ->
        println("   • $alarmType: $count notification methods")
    }

    println("\n" + "=" * 60)

    // Trigger various alarms
    println("\n🔥 Triggering Fire Alarm...")
    securitySystem.triggerAlarm("Fire Alarm", "Building A, Floor 3", Priority.CRITICAL)

    println("\n🚨 Triggering Burglar Alarm...")
    securitySystem.triggerAlarm("Burglar Alarm", "Main Entrance", Priority.HIGH)

    println("\n🌡️ Triggering Environmental Alarm...")
    securitySystem.triggerAlarm("Environmental Alarm", "HVAC System Failure", Priority.MEDIUM)

    println("\n🏥 Triggering Medical Alarm...")
    securitySystem.triggerAlarm("Medical Alarm", "Room 205 - Patient John Doe", Priority.CRITICAL)

    println("\n" + "=" * 60)

    // Demonstrate flexibility - change notification method at runtime
    println("\n🔄 Demonstrating runtime flexibility...")

    // Add a new notification method for existing alarm type
    securitySystem.addNotification(FireAlarmNotification(fcmSender))

    // Trigger fire alarm again to see new notification method
    println("\n🔥 Triggering Fire Alarm with additional notification method...")
    securitySystem.triggerAlarm("Fire Alarm", "Building B, Floor 1", Priority.HIGH)

    println("\n" + "=" * 60)

    // Show alarm history
    println("\n📋 Alarm History Summary:")
    securitySystem.getAlarmHistory().forEachIndexed { index, record ->
        println("${index + 1}. ${record.alarmType}")
        println("   Details: ${record.details}")
        println("   Priority: ${record.priority ?: "Default"}")
        println("   Time: ${java.time.Instant.ofEpochMilli(record.timestamp)}")
        println("   Results: ${record.results.count { it.success }}/${record.results.size} successful")
        println()
    }
}
```

**Expected Output:**

```
=== Security System Bridge Pattern Demo ===

🔧 Setting up alarm notifications...
✅ Added Fire Alarm with APNSSender (100ms delivery)
✅ Added Fire Alarm with EmailSender (5000ms delivery)
✅ Added Fire Alarm with SlackSender (300ms delivery)
✅ Added Burglar Alarm with FCMSender (150ms delivery)
✅ Added Burglar Alarm with SMSSender (2000ms delivery)
✅ Added Burglar Alarm with SlackSender (300ms delivery)
✅ Added Environmental Alarm with EmailSender (5000ms delivery)
✅ Added Environmental Alarm with SlackSender (300ms delivery)
✅ Added Medical Alarm with APNSSender (100ms delivery)
✅ Added Medical Alarm with SMSSender (2000ms delivery)

📊 Notification Statistics:
   • Fire Alarm: 3 notification methods
   • Burglar Alarm: 3 notification methods
   • Environmental Alarm: 2 notification methods
   • Medical Alarm: 2 notification methods

============================================================

🔥 Triggering Fire Alarm...
🚨 Triggering Fire Alarm alarm...
Details: Building A, Floor 3

📤 Sending via APNSSender (100ms delivery)
📱 APNS: Sending message (Priority: CRITICAL)
   Message: 🔥 FIRE ALARM ACTIVATED
Location: Building A, Floor 3
Time: 2024-12-08T20:00:00
Priority: CRITICAL
Action Required: Immediate evacuation
   Delivery Time: 100ms
✅ Notification sent successfully (ID: apns_1702044000000)

📤 Sending via EmailSender (5000ms delivery)
📧 Email: Sending message (Priority: CRITICAL)
   Subject: [CRITICAL] Security Alert
   Body: 🔥 FIRE ALARM ACTIVATED
Location: Building A, Floor 3
Time: 2024-12-08T20:00:00
Priority: CRITICAL
Action Required: Immediate evacuation
   Delivery Time: 5000ms
✅ Notification sent successfully (ID: email_1702044000001)

📤 Sending via SlackSender (300ms delivery)
💬 Slack: Sending message to #security-critical (Priority: CRITICAL)
   Message: 🔥 FIRE ALARM ACTIVATED
Location: Building A, Floor 3
Time: 2024-12-08T20:00:00
Priority: CRITICAL
Action Required: Immediate evacuation
   Delivery Time: 300ms
✅ Notification sent successfully (ID: slack_1702044000002)

📊 Alarm Summary:
- Total notifications sent: 3
- Successful: 3
- Failed: 0

[... similar output for other alarms ...]

============================================================

📋 Alarm History Summary:
1. Fire Alarm
   Details: Building A, Floor 3
   Priority: CRITICAL
   Time: 2024-12-08T20:00:00Z
   Results: 3/3 successful

2. Burglar Alarm
   Details: Main Entrance
   Priority: HIGH
   Time: 2024-12-08T20:00:01Z
   Results: 3/3 successful

[... more alarm history ...]
```

---

## 📊 **Bridge Pattern vs Alternative Approaches**

| Approach             | Pros                                                                 | Cons                                                                            |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Bridge Pattern**   | ✅ Decoupled design<br>✅ Flexible combinations<br>✅ Easy extension | ❌ Increased complexity<br>❌ Additional abstraction layer<br>❌ Learning curve |
| **Inheritance**      | ✅ Simple for small hierarchies<br>✅ Clear relationship             | ❌ Class explosion<br>❌ Tight coupling<br>❌ Hard to extend                    |
| **Composition**      | ✅ Reuse existing code<br>✅ Flexible design                         | ❌ No clear abstraction boundary<br>❌ Potential complexity                     |
| **Strategy Pattern** | ✅ Runtime behavior switching<br>✅ Clean separation                 | ❌ Different purpose (behavior vs structure)                                    |

---

## 🎯 **When to Use the Bridge Pattern**

### **✅ Perfect For:**

- **Multiple implementations** (different platforms, protocols, formats)
- **Runtime flexibility** (change implementation at runtime)
- **Extensible systems** (add new abstractions or implementations)
- **Platform independence** (abstract platform-specific details)
- **Complex hierarchies** (avoid class explosion)

### **❌ Avoid When:**

- **Simple systems** (overkill for basic requirements)
- **Static implementations** (no need for runtime flexibility)
- **Performance-critical applications** (abstraction overhead)
- **Tight coupling acceptable** (when flexibility isn't needed)

---

## 🔧 **Advanced Bridge Pattern Implementations**

### **1. Bridge with Factory Pattern**

```kotlin
class NotificationFactory {
    private val senders = mutableMapOf<String, MessageSender>()
    private val notifications = mutableMapOf<String, AlarmNotification>()

    fun registerSender(name: String, sender: MessageSender) {
        senders[name] = sender
        println("📝 Registered sender: $name")
    }

    fun createNotification(alarmType: String, senderName: String): AlarmNotification? {
        val sender = senders[senderName] ?: return null

        return when (alarmType.lowercase()) {
            "fire" -> FireAlarmNotification(sender)
            "burglar" -> BurglarAlarmNotification(sender)
            "environmental" -> EnvironmentalAlarmNotification(sender)
            "medical" -> MedicalAlarmNotification(sender)
            else -> null
        }
    }

    fun getAvailableSenders(): List<String> = senders.keys.toList()

    fun getAvailableAlarmTypes(): List<String> = listOf("Fire", "Burglar", "Environmental", "Medical")
}

// Usage
val factory = NotificationFactory()
factory.registerSender("apns", APNSSender())
factory.registerSender("fcm", FCMSender())
factory.registerSender("email", EmailSender())

val fireNotification = factory.createNotification("Fire", "apns")
val burglarNotification = factory.createNotification("Burglar", "email")
```

### **2. Bridge with Configuration**

```kotlin
class ConfigurableSecuritySystem(
    private val config: SecurityConfig
) {
    private val notifications = mutableListOf<AlarmNotification>()

    fun initialize() {
        config.getAlarmConfigurations().forEach { alarmConfig ->
            val sender = createSender(alarmConfig.senderType)
            val notification = createNotification(alarmConfig.alarmType, sender)

            if (notification != null) {
                notifications.add(notification)
                println("✅ Configured ${alarmConfig.alarmType} with ${alarmConfig.senderType}")
            }
        }
    }

    private fun createSender(senderType: String): MessageSender {
        return when (senderType.lowercase()) {
            "apns" -> APNSSender()
            "fcm" -> FCMSender()
            "email" -> EmailSender()
            "sms" -> SMSSender()
            "slack" -> SlackSender()
            else -> throw IllegalArgumentException("Unknown sender type: $senderType")
        }
    }

    private fun createNotification(alarmType: String, sender: MessageSender): AlarmNotification? {
        return when (alarmType.lowercase()) {
            "fire" -> FireAlarmNotification(sender)
            "burglar" -> BurglarAlarmNotification(sender)
            "environmental" -> EnvironmentalAlarmNotification(sender)
            "medical" -> MedicalAlarmNotification(sender)
            else -> null
        }
    }

    fun triggerAlarm(alarmType: String, details: String) {
        val compatibleNotifications = notifications.filter {
            it.getAlarmType() == alarmType
        }

        compatibleNotifications.forEach { notification ->
            notification.notifyUser(details, notification.getDefaultPriority())
        }
    }
}

data class SecurityConfig(
    private val alarmConfigurations: List<AlarmConfiguration>
) {
    fun getAlarmConfigurations(): List<AlarmConfiguration> = alarmConfigurations
}

data class AlarmConfiguration(
    val alarmType: String,
    val senderType: String,
    val priority: Priority
)
```

### **3. Bridge with Monitoring and Metrics**

```kotlin
class MonitoredSecuritySystem(
    private val securitySystem: SecuritySystem,
    private val monitor: SecurityMonitor
) {
    fun triggerAlarm(alarmType: String, details: String, priority: Priority? = null) {
        val startTime = System.currentTimeMillis()

        monitor.recordAlarmTrigger(alarmType, priority)

        try {
            securitySystem.triggerAlarm(alarmType, details, priority)
            monitor.recordAlarmSuccess(alarmType, System.currentTimeMillis() - startTime)
        } catch (e: Exception) {
            monitor.recordAlarmFailure(alarmType, e.message ?: "Unknown error")
            throw e
        }
    }

    fun getMetrics(): SecurityMetrics = monitor.getMetrics()
}

class SecurityMonitor {
    private val alarmTriggers = mutableMapOf<String, Int>()
    private val alarmSuccesses = mutableMapOf<String, Int>()
    private val alarmFailures = mutableMapOf<String, Int>()
    private val responseTimes = mutableMapOf<String, MutableList<Long>>()

    fun recordAlarmTrigger(alarmType: String, priority: Priority?) {
        alarmTriggers[alarmType] = (alarmTriggers[alarmType] ?: 0) + 1
        println("📊 Alarm triggered: $alarmType (Priority: ${priority ?: "Default"})")
    }

    fun recordAlarmSuccess(alarmType: String, responseTime: Long) {
        alarmSuccesses[alarmType] = (alarmSuccesses[alarmType] ?: 0) + 1
        responseTimes.getOrPut(alarmType) { mutableListOf() }.add(responseTime)
        println("✅ Alarm success: $alarmType (${responseTime}ms)")
    }

    fun recordAlarmFailure(alarmType: String, error: String) {
        alarmFailures[alarmType] = (alarmFailures[alarmType] ?: 0) + 1
        println("❌ Alarm failure: $alarmType - $error")
    }

    fun getMetrics(): SecurityMetrics {
        return SecurityMetrics(
            alarmTriggers = alarmTriggers.toMap(),
            alarmSuccesses = alarmSuccesses.toMap(),
            alarmFailures = alarmFailures.toMap(),
            averageResponseTimes = responseTimes.mapValues { (_, times) ->
                times.average()
            }
        )
    }
}

data class SecurityMetrics(
    val alarmTriggers: Map<String, Int>,
    val alarmSuccesses: Map<String, Int>,
    val alarmFailures: Map<String, Int>,
    val averageResponseTimes: Map<String, Double>
)
```

---

## 🚀 **Real-World Applications**

### **1. Platform Abstraction**

- **Cross-platform applications** - Abstract platform-specific implementations
- **Database drivers** - Different database implementations
- **Graphics rendering** - Different rendering engines
- **Network protocols** - Different communication protocols

### **2. Device Integration**

- **Hardware abstraction** - Different device implementations
- **Sensor systems** - Different sensor types and protocols
- **IoT devices** - Different IoT platform integrations
- **Payment systems** - Different payment processor integrations

### **3. Framework Development**

- **Plugin systems** - Different plugin implementations
- **Middleware** - Different middleware implementations
- **Caching systems** - Different cache implementations
- **Logging systems** - Different logging implementations

### **4. Enterprise Systems**

- **Notification systems** - Different notification channels
- **Authentication** - Different authentication providers
- **File storage** - Different storage backends
- **Message queues** - Different queue implementations

---

## 📈 **Performance Considerations**

### **Bridge Overhead**

- **Method delegation** - Additional method calls through bridge
- **Object creation** - Bridge object creation and management
- **Memory usage** - Bridge object memory footprint
- **Interface calls** - Virtual method call overhead

### **Optimization Techniques**

- **Object pooling** - Reuse bridge objects when possible
- **Caching** - Cache expensive bridge operations
- **Lazy initialization** - Defer bridge creation until needed
- **Connection pooling** - Reuse expensive connections

---

## 🔗 **Related Design Patterns**

- **[Adapter Pattern](/2024-12-07-design-pattern-11-adapter-pattern/)** - For interface compatibility
- **[Strategy Pattern]** - For runtime behavior switching
- **[Factory Method Pattern](/2024-07-07-design-pattern-6-factory-method-pattern/)** - For creating implementations
- **[Abstract Factory Pattern](/2024-07-08-design-pattern-7-abstract-factory-pattern/)** - For creating related implementations

---

## 📚 **Best Practices**

### **1. Bridge Design**

- **Clear separation** - Maintain clear boundaries between abstraction and implementation
- **Stable interfaces** - Design stable abstraction and implementation interfaces
- **Single responsibility** - Each bridge component should have one clear purpose
- **Documentation** - Document the relationship between abstractions and implementations

### **2. Implementation Guidelines**

- **Interface design** - Design clean, stable interfaces for both abstraction and implementation
- **Error handling** - Proper error handling in both abstraction and implementation layers
- **Resource management** - Properly manage resources in implementation layer
- **Testing strategies** - Test abstractions and implementations separately

### **3. Performance Optimization**

- **Minimize overhead** - Keep bridge overhead minimal
- **Efficient delegation** - Optimize method delegation
- **Object reuse** - Reuse bridge objects when possible
- **Connection pooling** - Pool expensive connections

---

## 🎯 **Conclusion**

The **Bridge Pattern** provides a powerful way to decouple abstraction from implementation, enabling flexible, extensible systems. By creating a bridge between abstraction and implementation, it enables:

- **Independent evolution** of abstractions and implementations
- **Flexible combinations** of different abstractions and implementations
- **Easy extension** without modifying existing code
- **Better maintainability** through clear separation of concerns

This pattern is essential for building flexible, maintainable systems that need to support multiple implementations or platforms. Whether you're building cross-platform applications, integrating multiple services, or creating extensible frameworks, the Bridge Pattern provides the foundation for robust, flexible system design.

**Next Steps:**

- Explore the **[Adapter Pattern](/2024-12-07-design-pattern-11-adapter-pattern/)** for interface compatibility
- Learn about the **[Strategy Pattern]** for runtime behavior switching
- Discover the **[Factory Method Pattern](/2024-07-07-design-pattern-6-factory-method-pattern/)** for creating implementations

---

_Ready to implement the Bridge Pattern in your projects? Download the complete code examples from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern) and start building more flexible, extensible systems today!_
