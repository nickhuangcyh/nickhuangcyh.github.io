---
layout: post
title: Design Pattern (27) - Visitor Pattern (訪問者模式)
date: 2024-12-28 21:30:00 +0800
description: 訪問者模式提供了一種方式，讓我們能在不修改物件結構的前提下，為其增加新的操作邏輯，實現高擴展性。
tags: [Visitor Pattern]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

---

## 需求

在設計一個 **IoT App 整合多品牌 IPCam 的功能** 時，我們面臨一個常見的軟體設計挑戰：如何統一處理不同廠商的產品。讓我們來看看具體的需求：

### 1. 多品牌支援
我們需要支援多種 IPCam 品牌，而每個品牌都有自己獨特的接口方式：

- **HIKVISION**：採用標準 RTSP 協定，提供通用的串流與截圖功能
- **DAHUA**：使用專屬 SDK，所有操作都必須透過其特定的 API 方法

### 2. 架構獨立性
**App 的程式碼結構不應依賴 IPCam 品牌的實現細節**。這意味著我們的核心邏輯要與特定品牌解耦，保持開放擴展性。這樣當需要新增其他品牌時，不會影響既有的程式碼架構。

### 3. 保持原有結構
**避免修改 IPCam 的核心結構**是另一個重要考量。由於這些品牌的實現通常由廠商提供，我們無法也不應該直接修改其核心程式碼。

---

## 物件導向分析 (OOA)

在深入解決方案之前，讓我們先進行物件導向分析，了解目前的系統架構和潛在問題。

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_1.png" title="design_pattern_visitor_pattern_uml_1" %}

### 察覺 Forces（問題癥結點）

透過分析，我們發現如果不使用適當的設計模式，將會面臨以下核心問題：

#### 1. 難以擴展新品牌
每當要新增一個品牌的 IPCam，我們就必須修改 App 的核心邏輯。這種做法不僅增加了出錯風險，也讓程式碼變得越來越複雜。

#### 2. 違反開放關閉原則 (OCP)
由於核心邏輯與品牌實現細節緊密耦合，每次新增功能都需要修改核心程式碼。這違背了「對擴展開放，對修改關閉」的設計原則。

#### 3. 無法統一處理不同品牌的操作
每個品牌的串流與截圖方式都不同，如果沒有統一的處理機制，程式碼將變得混亂且難以維護。這會導致重複程式碼和邏輯分散的問題。

---

## 套用 Visitor Pattern：解決方案與新架構

完成 OOA 並識別出問題癥結點後，現在讓我們運用 Visitor Pattern 來優雅地解決這些挑戰。

### Visitor Pattern 基本架構

首先，讓我們了解 Visitor Pattern 的標準架構：

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_2.png" title="design_pattern_visitor_pattern_uml_2" %}

### Visitor Pattern 的核心組件

訪問者模式由四個主要組件構成，每個都扮演著關鍵角色：

#### 1. Visitor (訪問者介面)
**作用**：定義對每種類型物件的操作方法
**特點**：為每種具體元素類型提供一個訪問方法

#### 2. ConcreteVisitor (具體訪問者)
**作用**：實現特定的操作邏輯
**特點**：針對不同類型的元素，執行相對應的操作

#### 3. Element (元素介面)
**作用**：定義接受訪問者的標準介面
**核心方法**：`accept()` 方法，接收訪問者並將自己傳遞給訪問者

#### 4. ConcreteElement (具體元素)
**作用**：實現具體的元素邏輯
**特點**：透過 `accept()` 方法讓訪問者能夠訪問並操作自己

### 應用到我們的 IPCam 系統

現在讓我們將這個模式套用到我們的多品牌 IPCam 整合需求上：

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_3.png" title="design_pattern_visitor_pattern_uml_3" %}

---

## 物件導向設計 (OOP)

現在讓我們將理論轉換為實際的程式碼實作。我們將逐步建構每個組件，並說明其在系統中的角色。

### Element 介面：IPCam

首先定義 IPCam 元素介面，它是所有攝影機品牌的共同契約：

```kotlin
interface IPCam {
    fun accept(visitor: IPCamVisitor)
}
```

**關鍵概念**：這個介面只定義了一個 `accept()` 方法，讓訪問者能夠「拜訪」這個攝影機物件。

### ConcreteElements：具體攝影機實作

接下來實作不同品牌的攝影機，每個都有自己獨特的功能：

```kotlin
class HikvisionIPCam : IPCam {
    override fun accept(visitor: IPCamVisitor) {
        visitor.visitHikvision(this)
    }

    fun getRTSPStream(): String {
        return "rtsp://hikvision/stream"
    }

    fun captureSnapshot(): String {
        return "Hikvision Snapshot"
    }
}

class DahuaIPCam : IPCam {
    override fun accept(visitor: IPCamVisitor) {
        visitor.visitDahua(this)
    }

    fun startSDKStream(): String {
        return "Dahua SDK Stream"
    }

    fun takeSDKSnapshot(): String {
        return "Dahua Snapshot"
    }
}
```

**重要觀察**：
- 每個攝影機都實作了 `accept()` 方法，將自己傳遞給對應的訪問者方法
- 各品牌保留了自己的特殊方法（HIKVISION 用 RTSP，DAHUA 用 SDK）

### Visitor 介面：IPCamVisitor

定義訪問者介面，為每種攝影機類型提供專門的訪問方法：

```kotlin
interface IPCamVisitor {
    fun visitHikvision(ipCam: HikvisionIPCam)
    fun visitDahua(ipCam: DahuaIPCam)
}
```

**設計亮點**：每個 visit 方法都接收對應的具體攝影機類型，確保類型安全和操作正確性。

### ConcreteVisitors：具體操作實作

實作不同的操作邏輯，這裡我們分別實作串流和截圖功能：

```kotlin
class IPCamStreamingVisitor : IPCamVisitor {
    override fun visitHikvision(ipCam: HikvisionIPCam) {
        println("Streaming: ${ipCam.getRTSPStream()}")
    }

    override fun visitDahua(ipCam: DahuaIPCam) {
        println("Streaming: ${ipCam.startSDKStream()}")
    }
}

class IPCamSnapshotVisitor : IPCamVisitor {
    override fun visitHikvision(ipCam: HikvisionIPCam) {
        println("Snapshot: ${ipCam.captureSnapshot()}")
    }

    override fun visitDahua(ipCam: DahuaIPCam) {
        println("Snapshot: ${ipCam.takeSDKSnapshot()}")
    }
}
```

**核心優勢**：相同操作的邏輯集中在一個訪問者類別中，不同品牌的處理方式清晰分離。

### Client 端使用方式

最後展示如何在客戶端程式中使用這個架構：

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

**執行結果**：

```plaintext
Streaming: rtsp://hikvision/stream
Snapshot: Hikvision Snapshot
Streaming: Dahua SDK Stream
Snapshot: Dahua Snapshot
```

**使用體驗**：客戶端程式碼簡潔明瞭，不需要知道各品牌的具體實作細節，只需要建立合適的訪問者並讓攝影機接受訪問即可。

---

## 結論

透過實作 Visitor Pattern，我們成功地解決了多品牌 IPCam 整合的挑戰。讓我們來回顧這個解決方案帶來的具體改善：

### 主要成效

#### 1. 易於擴展新品牌
當需要支援新的攝影機品牌（如 AXIS 或 Panasonic）時，我們只需要：
- 建立新的 `ConcreteElement` 類別（如 `AxisIPCam`）
- 在現有的訪問者介面中新增對應的訪問方法
- 在各個具體訪問者中實作品牌特定的邏輯

**重要的是**：這整個過程不會影響到現有的程式碼結構。

#### 2. 操作邏輯集中管理
不同品牌的相同操作（如串流、截圖）都集中在對應的訪問者類別中。這種集中化帶來兩個好處：
- **維護簡化**：修改串流邏輯只需要在 `IPCamStreamingVisitor` 中進行
- **程式碼清晰**：每個訪問者都專注於單一職責

#### 3. 符合核心設計原則
我們的解決方案完美體現了兩個重要的設計原則：
- **單一職責原則 (SRP)**：操作邏輯與物件結構完全分離
- **開放關閉原則 (OCP)**：對擴展開放，對修改關閉

### 適用場景

Visitor Pattern 特別適合以下開發情境：

#### 情境一：多類型物件的統一操作
當你有多種類型的物件，需要對它們執行相同類別但實作方式不同的操作時。

#### 情境二：穩定結構 vs 多變操作
物件結構相對穩定（攝影機品牌不會頻繁變動），但操作邏輯經常變化（可能新增錄影、設定調整等功能）。

### 總體價值

Visitor Pattern 為我們提供了一個優雅且可維護的解決方案。它不僅解決了當前的多品牌整合問題，更為未來的功能擴展奠定了堅實的基礎。

透過這種模式，我們的系統具備了**高擴展性**與**高靈活性**，能夠從容應對不斷變化的業務需求。
