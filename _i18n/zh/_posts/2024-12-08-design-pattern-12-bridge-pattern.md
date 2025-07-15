---
layout: post
title: "設計模式 12：橋接模式（Bridge Pattern）——抽象與實作分離的彈性架構設計"
date: 2024-12-08 20:00:00 +0800
description: "精通橋接模式，學會抽象與實作分離，打造高彈性、易擴展的安全系統與通知架構。圖文範例，適合軟體工程師、架構師與進階開發者。"
tags: [Bridge Pattern, Design Patterns, Abstraction-Implementation Separation, Object-Oriented Design, Software Architecture, Kotlin, Programming, Structural Patterns, Security System, Notification System]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **下載完整設計模式系列程式碼**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 什麼是橋接模式（Bridge Pattern）？

橋接模式是一種結構型設計模式，將抽象與實作分離，使兩者可以獨立變化。它為抽象與實作之間建立一座橋樑，讓你能在不影響彼此的情況下，靈活擴展系統功能。

**主要優點：**
- 抽象與實作分離，降低耦合
- 易於擴展，新增抽象或實作皆方便
- 彈性組合，任意搭配抽象與實作
- 易於維護，單一變動不影響全局
- 符合開放封閉原則

---

## 實務情境：多通知方式的安全警報系統

設計一個安全系統，需求如下：
- 多種警報類型（火災、竊盜、環境、醫療）
- 多種通知方式（APNS、FCM、Email、SMS、Slack）
- 任意組合警報與通知方式
- 易於擴展新警報或通知方式
- 高效能，支援多警報並發處理

---

## 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_1.png" title="Bridge Pattern - 問題分析" %}

### 設計痛點
1. 類別爆炸：每種組合都需新類別，維護困難
2. 高耦合：警報與通知方式緊密綁定，難以擴展
3. 彈性不足：無法動態切換通知方式，測試困難

---

## 橋接模式解決方案

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_2.png" title="Bridge Pattern - 一般結構" %}

### 組成元件
1. 抽象層（Abstraction）：定義抽象介面
2. 擴充抽象層（Refined Abstraction）：具體功能擴展
3. 實作層（Implementor）：定義實作介面
4. 具體實作層（Concrete Implementor）：實作細節

**優點：**
- 抽象與實作可獨立變化
- 彈性組合，易於擴展
- 測試方便，單元測試更簡單

---

## 實作：多通知方式安全系統

{% include figure.liquid path="assets/img/design_pattern_bridge_pattern_uml_3.png" title="安全系統 Bridge 實作" %}

### 1. 實作層（通知方式）

```kotlin
interface MessageSender { ... }
// ...各種通知方式實作略...
```

### 2. 抽象層（警報通知）

```kotlin
abstract class AlarmNotification(protected val sender: MessageSender) { ... }
// ...各種警報類型擴展略...
```

### 3. 客戶端範例

```kotlin
fun main() {
    // ...示範警報與通知方式任意組合、觸發與統計...
}
```

---

## 橋接模式 vs 其他做法

| 做法 | 優點 | 缺點 |
|------|------|------|
| 橋接模式 | 抽象與實作分離、彈性高、易擴展 | 複雜度提升、多一層抽象、學習曲線 |
| 繼承 | 小型層級簡單、關係明確 | 類別爆炸、耦合高、難擴展 |
| 組合 | 可重用、彈性設計 | 抽象界線不明、潛在複雜度 |
| 策略模式 | 行為可切換、分離清楚 | 目的不同（行為 vs 結構） |

---

## 什麼時候用橋接模式？

**適合：**
- 多實作需求（多平台、多協定、多格式）
- 執行時彈性（可動態切換實作）
- 易於擴展（新增抽象或實作）
- 跨平台設計（抽象平台細節）
- 複雜層級（避免類別爆炸）

**不適合：**
- 簡單系統（過度設計）
- 靜態實作（無需彈性）
- 效能極度敏感（多一層抽象有損耗）
- 可接受耦合（彈性非首要）

---

## 進階應用：工廠、組態、監控

### 1. 工廠結合橋接

```kotlin
class NotificationFactory { ... }
// ...註冊與建立通知範例...
```

### 2. 組態式安全系統

```kotlin
class ConfigurableSecuritySystem(...) { ... }
// ...根據組態自動建立通知...
```

### 3. 監控與統計

```kotlin
class MonitoredSecuritySystem(...) { ... }
// ...觸發警報時記錄與報表...
```

---

## 結論

橋接模式能有效分離抽象與實作，讓系統具備高度彈性與可擴展性。無論是多通知方式的安全系統、跨平台應用，還是複雜層級的架構設計，橋接模式都是打造高品質軟體的關鍵利器。

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
