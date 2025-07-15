---
layout: post
title: "设计模式 21：中介者模式全解析与实战聊天室案例"
date: 2024-12-22 14:00:00 +0800
description: "掌握中介者模式，结合聊天室与系统协调实战案例，深入理解如何降低耦合、提升可扩展性、集中通信逻辑。"
tags: [Mediator Pattern, Design Patterns, Decoupling, Object-Oriented Design, Software Architecture, Chatroom, Kotlin, Programming, Behavioral Patterns, Communication]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **获取完整设计模式系列代码**：[design_pattern 仓库](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 **中介者模式简介**

**中介者模式（Mediator Pattern）**是一种行为型设计模式，通过引入中介者对象，将多个对象之间复杂的通信与控制集中管理。各对象不再直接引用彼此，而是通过中介者进行交互，从而降低耦合度，使系统更易维护与扩展。

**核心优势：**
- ✅ 降低组件间耦合
- ✅ 集中通信逻辑
- ✅ 易于扩展新功能
- ✅ 简化维护
- ✅ 适合大型系统扩展

---

## 🚀 **实际场景：聊天室应用**

假设你正在开发一个**聊天室应用**，需求如下：
- 用户可向聊天室发送消息
- 用户无需直接管理其他用户信息
- 新增或移除用户不影响现有用户

### **业务规则：**
- 所有通信由中介者统一管理
- 用户仅与中介者交互，不直接通信
- 系统需易于扩展（如消息过滤、广播等）

---

## 🏗️ **面向对象分析（OOA）**

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_1.png" title="中介者模式 - 问题分析" %}

### **主要痛点：**
1. **高耦合**：用户间直接通信，维护成本高
2. **难以扩展**：新增功能需修改多处代码
3. **复杂度提升**：用户越多，连接数呈指数增长

---

## 💡 **中介者模式解决方案**

引入中介者后，所有通信均通过中心对象路由，极大简化依赖关系与系统结构。

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_2.png" title="中介者模式 - 通用结构" %}

### **中介者模式核心角色：**
- **中介者接口**：定义通信方法
- **具体中介者**：实现通信逻辑
- **同事接口**：参与者抽象
- **具体同事**：实现参与者行为

---

## 🛠️ **实战实现：聊天室案例**

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_3.png" title="中介者模式 - 聊天室示例" %}

### **1. 中介者接口**
```kotlin
interface ChatMediator {
    fun sendMessage(message: String, user: User)
    fun addUser(user: User)
}
```

### **2. 具体中介者**
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

### **3. 同事抽象类**
```kotlin
abstract class User(protected val mediator: ChatMediator, val name: String) {
    abstract fun send(message: String)
    abstract fun receive(message: String)
}
```

### **4. 具体同事类**
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

### **5. 客户端代码**
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

**输出示例：**
```
Alice sends: Hello, everyone!
Bob receives: Hello, everyone!
Charlie receives: Hello, everyone!
Bob sends: Hi, Alice!
Alice receives: Hi, Alice!
Charlie receives: Hi, Alice!
```

---

## 📊 **中介者模式与其他方案对比**

| 方案 | 优点 | 缺点 |
|------|------|------|
| **中介者模式** | ✅ 降低耦合<br>✅ 集中逻辑 | ❌ 中介者过于复杂<br>❌ 存在单点风险 |
| **直接通信** | ✅ 小型系统简单 | ❌ 高耦合<br>❌ 难以扩展 |
| **事件总线** | ✅ 解耦通信 | ❌ 逻辑难追踪<br>❌ 全局状态复杂 |

---

## 🎯 **中介者模式适用场景**

### ✅ 适合：
- 聊天室系统
- GUI 组件通信
- 事件驱动架构
- 工作流引擎
- 复杂系统协调

### ❌ 不适合：
- 简单小型系统
- 中介者逻辑过于复杂时

---

## 🔧 **进阶用法与扩展**

- **消息过滤**：中介者可实现消息过滤或转换
- **广播机制**：支持全员或定向广播
- **日志与监控**：集中日志记录与监控
- **动态用户管理**：运行时动态增删用户

---

## 📈 **实际应用场景**
- 聊天室与消息系统
- 空中交通管制系统
- GUI 框架（对话框协调）
- 工作流与流程引擎

---

## 🚨 **常见误区与最佳实践**
- 避免中介者过度膨胀（可拆分多个中介者）
- 明确文档化通信流程
- 中介者方法命名清晰

---

## 🔗 **相关文章**
- [设计模式 1：面向对象概念](/2024-07-02-design-pattern-1-object-oriented-concepts)
- [设计模式 2：设计原则](/2024-07-03-design-pattern-2-design-principle)
- [命令模式](/2024-12-21-design-pattern-19-command-pattern)
- [观察者模式](/2024-12-24-design-pattern-23-observer-pattern)
- [状态模式](/2024-12-25-design-pattern-24-state-pattern)

---

## ✅ **总结**

通过中介者模式，我们有效降低了用户间的耦合度，并将通信逻辑集中管理，使系统更易维护与扩展。

**主要优势：**
- 🎯 降低耦合
- 🔧 集中通信逻辑
- 📈 易于扩展
- 🛡️ 便于维护
- ⚡ 具备良好可扩展性

**遵循的设计原则：**
- **单一职责原则（SRP）**：中介者专注通信
- **开闭原则（OCP）**：新增功能无需修改用户
- **DRY 原则**：通信逻辑集中

**典型应用：**
- 聊天室系统
- GUI 框架
- 工作流引擎

中介者模式为可扩展系统中的复杂通信提供了优雅的解决方案！

---

**💡 专业建议：** 若中介者过于复杂，可按功能拆分为多个中介者。

**🔔 关注我们：** 持续关注设计模式系列，获取更多架构实战干货！
