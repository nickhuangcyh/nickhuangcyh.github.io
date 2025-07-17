---
layout: post
title: "設計模式 21：中介者模式全解析與實戰聊天室案例"
date: 2024-12-22 14:00:00 +0800
description: "掌握中介者模式，結合聊天室與系統協調實戰案例，深入理解如何降低耦合、提升可擴展性、集中通信邏輯。"
tags: [Mediator Pattern, Design Patterns, Decoupling, Object-Oriented Design, Software Architecture, Chatroom, Kotlin, Programming, Behavioral Patterns, Communication]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **獲取完整設計模式系列程式碼**：[design_pattern 倉庫](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 **中介者模式簡介**

**中介者模式（Mediator Pattern）**是一種行為型設計模式，透過引入中介者物件，將多個物件之間複雜的通信與控制集中管理。各物件不再直接引用彼此，而是透過中介者進行互動，從而降低耦合度，使系統更易維護與擴展。

**核心優勢：**
- ✅ 降低元件間耦合
- ✅ 集中通信邏輯
- ✅ 易於擴展新功能
- ✅ 簡化維護
- ✅ 適合大型系統擴展

---

## 🚀 **實際場景：聊天室應用**

假設你正在開發一個**聊天室應用**，需求如下：
- 使用者可向聊天室發送訊息
- 使用者無需直接管理其他使用者資訊
- 新增或移除使用者不影響現有使用者

### **業務規則：**
- 所有通信由中介者統一管理
- 使用者僅與中介者互動，不直接通信
- 系統需易於擴展（如訊息過濾、廣播等）

---

## 🏗️ **面向對象分析（OOA）**

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_1.png" title="中介者模式 - 問題分析" %}

### **主要痛點：**
1. **高耦合**：使用者間直接通信，維護成本高
2. **難以擴展**：新增功能需修改多處程式碼
3. **複雜度提升**：使用者越多，連線數呈指數增長

---

## 💡 **中介者模式解決方案**

引入中介者後，所有通信均透過中心物件路由，大幅簡化依賴關係與系統結構。

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_2.png" title="中介者模式 - 通用結構" %}

### **中介者模式核心角色：**
- **中介者介面**：定義通信方法
- **具體中介者**：實現通信邏輯
- **同事介面**：參與者抽象
- **具體同事**：實現參與者行為

---

## 🛠️ **實戰實現：聊天室案例**

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_3.png" title="中介者模式 - 聊天室範例" %}

### **1. 中介者介面**
```kotlin
interface ChatMediator {
    fun sendMessage(message: String, user: User)
    fun addUser(user: User)
}
```

### **2. 具體中介者**
```kotlin
class ChatRoomMediator : ChatMediator {
    private val users = mutableListOf<User>()
    override fun sendMessage(message: String, user: User) {
        users.filter { it != user }.forEach { it.receive(message) }
    }
    override fun addUser(user: User) {
        users.add(user)
    }
}
```

### **3. 同事抽象類**
```kotlin
abstract class User(protected val mediator: ChatMediator, val name: String) {
    abstract fun send(message: String)
    abstract fun receive(message: String)
}
```

### **4. 具體同事類**
```kotlin
class ChatUser(mediator: ChatMediator, name: String) : User(mediator, name) {
    override fun send(message: String) {
        println("$name sends: $message")
        mediator.sendMessage(message, this)
    }
    override fun receive(message: String) {
        println("$name receives: $message")
    }
}
```

### **5. 客戶端程式碼**
```kotlin
fun main() {
    val chatMediator = ChatRoomMediator()
    val user1 = ChatUser(chatMediator, "Alice")
    val user2 = ChatUser(chatMediator, "Bob")
    val user3 = ChatUser(chatMediator, "Charlie")
    chatMediator.addUser(user1)
    chatMediator.addUser(user2)
    chatMediator.addUser(user3)
    user1.send("Hello, everyone!")
    user2.send("Hi, Alice!")
}
```

**輸出範例：**
```
Alice sends: Hello, everyone!
Bob receives: Hello, everyone!
Charlie receives: Hello, everyone!
Bob sends: Hi, Alice!
Alice receives: Hi, Alice!
Charlie receives: Hi, Alice!
```

---

## 📊 **中介者模式與其他方案對比**

| 方案 | 優點 | 缺點 |
|------|------|------|
| **中介者模式** | ✅ 降低耦合<br>✅ 集中邏輯 | ❌ 中介者過於複雜<br>❌ 存在單點風險 |
| **直接通信** | ✅ 小型系統簡單 | ❌ 高耦合<br>❌ 難以擴展 |
| **事件總線** | ✅ 解耦通信 | ❌ 邏輯難追蹤<br>❌ 全域狀態複雜 |

---

## 🎯 **中介者模式適用場景**

### ✅ 適合：
- 聊天室系統
- GUI 元件通信
- 事件驅動架構
- 工作流程引擎
- 複雜系統協調

### ❌ 不適合：
- 簡單小型系統
- 中介者邏輯過於複雜時

---

## 🔧 **進階用法與擴展**

- **訊息過濾**：中介者可實現訊息過濾或轉換
- **廣播機制**：支援全員或定向廣播
- **日誌與監控**：集中日誌記錄與監控
- **動態用戶管理**：執行時動態增刪用戶

---

## 📈 **實際應用場景**
- 聊天室與訊息系統
- 空中交通管制系統
- GUI 框架（對話框協調）
- 工作流程與流程引擎

---

## 🚨 **常見誤區與最佳實踐**
- 避免中介者過度膨脹（可拆分多個中介者）
- 明確文件化通信流程
- 中介者方法命名清晰

---

## 🔗 **相關文章**
- [設計模式 1：面向對象概念](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [設計模式 2：設計原則](/2024-07-03-design-pattern-2-design-principle)
- [命令模式](/2024-12-21-design-pattern-19-command-pattern)
- [觀察者模式](/2024-12-24-design-pattern-23-observer-pattern)
- [狀態模式](/2024-12-25-design-pattern-24-state-pattern)

---

## ✅ **總結**

透過中介者模式，我們有效降低了使用者間的耦合度，並將通信邏輯集中管理，使系統更易維護與擴展。

**主要優勢：**
- 🎯 降低耦合
- 🔧 集中通信邏輯
- 📈 易於擴展
- 🛡️ 便於維護
- ⚡ 具備良好可擴展性

**遵循的設計原則：**
- **單一職責原則（SRP）**：中介者專注通信
- **開閉原則（OCP）**：新增功能無需修改使用者
- **DRY 原則**：通信邏輯集中

**典型應用：**
- 聊天室系統
- GUI 框架
- 工作流程引擎

中介者模式為可擴展系統中的複雜通信提供了優雅的解決方案！

---

**💡 專業建議：** 若中介者過於複雜，可按功能拆分為多個中介者。

**🔔 關注我們：** 持續關注設計模式系列，獲取更多架構實戰乾貨！
