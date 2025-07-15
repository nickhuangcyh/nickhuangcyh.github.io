---
layout: post
title: 設計模式 27：訪問者模式（Visitor Pattern）IoT 實戰全攻略
日期: 2024-12-28 21:30:00 +0800
description: 精通訪問者模式，學會如何為物件結構新增操作、提升系統擴展性，並維持乾淨的程式架構。IoT 與軟體開發實例，適合進階工程師。
tags: [Visitor Pattern, Design Patterns, Extensibility, Object-Oriented Design, Software Architecture, IoT, Kotlin, Programming, Behavioral Patterns, Maintainability]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **設計模式系列完整程式碼下載**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 訪問者模式是什麼？

**訪問者模式（Visitor Pattern）** 是一種行為型設計模式，讓你能在不更動物件結構的前提下，為其新增操作。它將演算法與資料結構分離，讓系統更易於擴展與維護。

**主要優點：**
- ✅ 開放封閉原則：新增操作無需改動物件結構
- ✅ 邏輯集中：相關操作集中管理
- ✅ 易於擴展：支援新操作與新物件型別
- ✅ 易於維護：職責分離，程式乾淨
- ✅ 高擴展性：適合大型、複雜系統

---

## 🚀 實務案例：IoT App 整合多品牌 IPCam

假設你要打造一個 IoT App，需同時支援多家 IPCam（如 HIKVISION、DAHUA），每家品牌串流與快照 API 不同：

**系統需求：**
- 支援多品牌 IPCam
- 各品牌串流、快照方式不同
- App 程式碼不依賴品牌細節
- 易於未來擴充新品牌
- 避免修改 IPCam 核心結構（多為廠商提供）

**商業規則：**
- 所有 IPCam 操作（串流、快照）需可擴展
- 新增操作不應更動既有 IPCam 類別
- 維持乾淨、易維護的程式碼

---

## 🧩 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_1.png" title="Visitor Pattern - Problem Analysis" %}

**核心挑戰：**
1. 新品牌擴展困難
2. 違反開放封閉原則（OCP）
3. 各品牌操作處理不一致

---

## 💡 訪問者模式解決方案

分析完需求後，套用訪問者模式，將操作與物件結構解耦：

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_2.png" title="Visitor Pattern - General Structure" %}

**組件說明：**
1. 訪問者介面：定義每種物件型別的操作
2. 具體訪問者：實作特定操作（如串流、快照）
3. 元素介面：定義 `accept(visitor)` 方法
4. 具體元素：實作 `accept` 與品牌專屬邏輯

**好處：**
- 新增操作只需新增訪問者
- 操作邏輯集中管理
- 物件結構穩定不變

---

## 🛠️ 實作：IPCam 整合範例

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_3.png" title="Visitor Pattern - IoT IPCam Example" %}

### 1. 元素介面

```kotlin
interface IPCam {
    fun accept(visitor: IPCamVisitor)
}
```

### 2. 具體元素

```kotlin
class HikvisionIPCam : IPCam {
    override fun accept(visitor: IPCamVisitor) {
        visitor.visitHikvision(this)
    }
    fun getRTSPStream(): String = "rtsp://hikvision/stream"
    fun captureSnapshot(): String = "Hikvision Snapshot"
}

class DahuaIPCam : IPCam {
    override fun accept(visitor: IPCamVisitor) {
        visitor.visitDahua(this)
    }
    fun startSDKStream(): String = "Dahua SDK Stream"
    fun takeSDKSnapshot(): String = "Dahua Snapshot"
}
```

### 3. 訪問者介面

```kotlin
interface IPCamVisitor {
    fun visitHikvision(ipCam: HikvisionIPCam)
    fun visitDahua(ipCam: DahuaIPCam)
}
```

### 4. 具體訪問者

```kotlin
class IPCamStreamingVisitor : IPCamVisitor {
    override fun visitHikvision(ipCam: HikvisionIPCam) {
        println("串流: ${ipCam.getRTSPStream()}")
    }
    override fun visitDahua(ipCam: DahuaIPCam) {
        println("串流: ${ipCam.startSDKStream()}")
    }
}

class IPCamSnapshotVisitor : IPCamVisitor {
    override fun visitHikvision(ipCam: HikvisionIPCam) {
        println("快照: ${ipCam.captureSnapshot()}")
    }
    override fun visitDahua(ipCam: DahuaIPCam) {
        println("快照: ${ipCam.takeSDKSnapshot()}")
    }
}
```

### 5. 用戶端程式碼

```kotlin
fun main() {
    val ipCams: List<IPCam> = listOf(HikvisionIPCam(), DahuaIPCam())
    val streamingVisitor = IPCamStreamingVisitor()
    val snapshotVisitor = IPCamSnapshotVisitor()
    for (ipCam in ipCams) {
        ipCam.accept(streamingVisitor)
        ipCam.accept(snapshotVisitor)
    }
}
```

**預期輸出：**
```
串流: rtsp://hikvision/stream
快照: Hikvision Snapshot
串流: Dahua SDK Stream
快照: Dahua Snapshot
```

---

## 🏆 結論

訪問者模式讓你能在不更動物件結構的前提下，彈性新增操作，並集中管理邏輯，提升系統可維護性與擴展性。

**適用場景：**
- 複雜物件結構（如 AST、IoT 裝置）
- 需頻繁新增操作的系統
- 編譯器、解譯器、UI 元件樹

**設計原則：**
- 單一職責原則（SRP）：操作與結構分離
- 開放封閉原則（OCP）：新增功能無需改舊程式

立即將訪問者模式應用於你的專案，讓系統更靈活、易於維護！
