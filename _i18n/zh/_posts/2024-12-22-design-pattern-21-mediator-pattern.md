---
layout: post
title: 設計模式（21）中介者模式：智慧家居系統元件協調，降低物件間複雜耦合關係
date: 2024-12-22 14:00:00 +0800
description: 全面解析中介者模式（Mediator Pattern）設計原理，透過智慧家居控制系統範例，學習如何優雅協調多個物件間的複雜互動，實現低耦合高內聚的系統架構。
tags: [Mediator Pattern, Design Patterns, Behavioral Patterns, Object Coordination, Smart Home System, Low Coupling]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

我們的任務是設計一個 **聊天室應用程式**，這個系統必須處理多個使用者之間的即時通信。以下是三個核心需求：

- **訊息傳遞機制**：使用者可以透過聊天室平台向其他成員傳遞訊息。系統需要支援一對多的廣播通信機制，確保訊息能夠同步傳達給所有相關成員。
- **使用者獨立性**：每個使用者都不需要直接管理或知道其他使用者的詳細資訊。他們只需要與中央平台互動，大幅簡化了個別使用者的實作複雜度。
- **動態成員管理**：系統必須支援使用者的動態加入和離開，而不影響其他成員的正常運作。這種彈性對於實際應用場景至關重要。

從設計模式的角度來看，這是一個典型的**行為型設計模式**應用場景。我們需要妥善管理多個物件之間的複雜互動關係，避免直接耦合所帶來的維護問題。

## 物件導向分析 (OOA)

理解需求後，我們進行物件導向分析。在這個聊天室場景中，我們面臨的核心挑戰是如何有效管理多個使用者之間的複雜互動關係。

從系統架構的角度分析，我們需要面對兩個關鍵問題：

**直接互動模式的問題**：如果讓使用者彼此直接通信，會形成複雜的網狀相依關係。這種設計下，每個使用者都必須知道其他所有使用者的存在。隨著使用者數量增加，這將導致系統複雜度呈指數級增長，大幅提升維護成本。

**中央協調機制的必要性**：為了解決上述問題，我們需要引入一個集中的協調角色。這個角色作為使用者之間的中介者，負責統一管理所有的通信流程。透過這種設計，使用者只需要與中介者互動，而不必直接處理與其他使用者的複雜關係。

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_1.png" title="design_pattern_mediator_pattern_uml_1" %}

## 察覺 Forces

在未使用設計模式的直接實作中，我們會遭遇以下四個核心挑戰：

### 1. 網狀耦合問題 (Mesh Coupling)
使用者彼此之間直接通信，形成複雜的網狀關係。每當新增一個使用者時，需要更新所有其他使用者的程式碼來認知這個新成員。

同樣地，當使用者離開時，也需要清理多處的參考關係。這種設計使得系統維護變得極為困難，任何小改動都可能影響多個元件。

### 2. 功能擴展困難 (Hard to Extend)
當需要增加進階功能時（如訊息過濾、私人聊天、群組管理、訊息歷史等），必須同時修改多個使用者的邏輯。這種做法違反了開放關閉原則，並大幅增加了引入 Bug 的風險。

每次功能擴展都變成一場「牽一髮而動全身」的挑戰，開發效率低下且容易出錯。

### 3. 組合爆炸問題 (Combinatorial Explosion)
隨著使用者數量的增加，使用者之間的可能連結數量呈指數級增長（n(n-1)/2）。當有 10 個使用者時需要管理 45 個連結，100 個使用者時則需要 4950 個連結。

這種數學上的組合爆炸使得系統在規模擴展時變得難以管理和維護。

### 4. 責任混亂 (Responsibility Confusion)
每個使用者都必須承擔通信管理的責任，但這與其主要功能（發送和接收訊息）並無直接關係。

這種責任混亂導致程式碼變得難以理解和維護，違背了單一責任原則的設計精神。

**問題根源分析**：這些問題的共同根源在於**物件之間缺乏中介協調機制**，導致直接互動帶來的複雜性無法有效控制。

## 套用 Mediator Pattern 解決問題

經過物件導向分析並察覺到系統面臨的挑戰後，我們可以套用 Mediator Pattern 來有效解決這些問題。

**Mediator Pattern（中介者模式）**是一種行為型設計模式。它透過定義物件之間的互動方式，有效封裝了複雜的互動邏輯。這個模式的主要目標是促進物件之間的松耦合，同時讓開發者能夠獨立地改變物件間的互動行為。

### Mediator Pattern 核心概念

中介者模式的設計精髓在於**關係重構**：將原本複雜的多對多直接關係轉化為簡潔的一對多星狀關係。

在傳統設計中，每個使用者都需要了解其他所有使用者的存在和狀態。然而，當我們導入中介者後，所有使用者只需要與單一的中介者互動即可。這種轉換大幅簡化了系統架構，降低了維護複雜度。

### Mediator Pattern UML 結構

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_2.png" title="design_pattern_mediator_pattern_uml_2" %}

### 角色與職責

Mediator Pattern 透過以下四個核心角色來系統性地解決互動複雜度問題：

#### 1. Mediator（中介者介面）
定義中介者的標準協議，明確規範如何協調參與者之間的互動。在聊天室場景中，這個介面涵蓋了訊息傳遞、使用者管理等核心功能。

透過介面設計，我們確保了系統的擴展性和可測試性。

#### 2. ConcreteMediator（具體中介者）
實現具體的協調邏輯，承擔管理所有參與者訊息交換的重責大任。它是唯一知道所有參與者存在的角色，負責協調它們之間的所有互動。

這個角色集中了系統的控制邏輯，使得行為更容易預測和維護。

#### 3. Colleague（同事類別）
定義參與者的基本行為規範和與中介者的標準互動方式。這個抽象層確保所有參與者都遵循統一的協議。

重要的是，所有參與者都只能通過中介者來進行互動，而不允許直接與其他參與者通信。

#### 4. ConcreteColleague（具體同事類別）
實現具體參與者的實際行為。在我們的聊天室例子中，這就是不同的使用者實體。

每個具體參與者都完全依賴中介者來發送和接收訊息，這確保了系統的一致性和可控性。

### 應用到聊天室應用程式

{% include figure.liquid path="assets/img/design_pattern_mediator_pattern_uml_3.png" title="design_pattern_mediator_pattern_uml_3" %}

## 物件導向程式設計實作

接下來，我們將 Mediator Pattern 的設計理論轉化為可執行的程式碼。透過清晰的職責分工，每個元件都扮演著特定的角色，共同構成一個完整而高效的中介者協調體系。

讓我們逐步實作每個核心元件，並觀察它們如何協同運作。

### Mediator - 中介者介面

中介者介面是整個系統的核心契約，它定義了協調參與者之間互動的標準協議。這個介面確保了所有具體中介者都遵循一致的行為規範：

```kotlin
interface ChatMediator {
    fun sendMessage(message: String, user: User)
    fun addUser(user: User)
}
```

### ConcreteMediator - 聊天室中介者實作

具體中介者是系統的控制中心，它封裝了所有的協調邏輯。這個類別負責維護使用者清單，並處理所有的訊息傳遞機制：

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

### Colleague - 使用者抽象類別

抽象使用者類別建立了所有參與者的行為基礎。它不僅定義了基本的發送和接收功能，更重要的是確立了與中介者的標準互動方式：

```kotlin
abstract class User(protected val mediator: ChatMediator, val name: String) {
    abstract fun send(message: String)
    abstract fun receive(message: String)
}
```

### ConcreteColleague - 具體聊天室用戶實作

具體使用者類別實現了實際的聊天功能，展現了中介者模式的核心特色：所有通信都必須透過中介者進行。這種設計確保了系統的一致性：

```kotlin
class ChatUser(mediator: ChatMediator, name: String) : User(mediator, name) {
    override fun send(message: String) {
        println("$name 發送訊息：$message")
        mediator.sendMessage(message, this)
    }

    override fun receive(message: String) {
        println("$name 收到訊息：$message")
    }
}
```

### Client - 客戶端使用範例

客戶端程式碼展示了整個系統的使用方式。它清楚地呈現了如何建立聊天室、新增使用者，以及如何透過中介者管理用戶之間的互動：

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

### 執行結果

程式執行後的輸出結果如下：

```kotlin
Alice 發送訊息：Hello, everyone!
Bob 收到訊息：Hello, everyone!
Charlie 收到訊息：Hello, everyone!
Bob 發送訊息：Hi, Alice!
Alice 收到訊息：Hi, Alice!
Charlie 收到訊息：Hi, Alice!
```

## 結論與效益

透過套用 Mediator Pattern，我們成功解決了原本系統面臨的所有核心問題。讓我們檢視具體的改善效果：

### 主要改善效果

**1. 擊破網狀耦合**：我們將原本多對多的複雜關係成功轉化為一對多的星狀關係。使用者不再需要直接了解其他使用者的存在，這種架構轉換大幅降低了系統的耦合度。

從維護角度來看，這意味著修改某個使用者的實作不會影響到其他使用者。

**2. 中央化控制**：所有的互動邏輯都集中在中介者中統一管理。這種設計使得系統行為更容易理解、預測和控制。

當需要調試或監控系統行為時，開發者只需要關注單一的控制點，大幅簡化了系統分析的複雜度。

**3. 功能擴展變得容易**：要新增聊天功能（如訊息過濾、私人聊天、群組管理等）時，只需修改中介者的邏輯即可。這種改動完全不會影響具體使用者的實作。

這種設計遵循了開放關閉原則，使得系統對擴展開放，對修改封閉。

**4. 動態參與者管理**：使用者的加入和離開變得非常簡單，只需要與中介者進行互動。其他使用者完全不會感知到這些變化，確保了系統的穩定運作。

這種設計特別適合需要動態調整參與者的應用場景。

### 適用場景

Mediator Pattern 特別適合以下四類應用情境：

- **多使用者互動系統**：如聊天室、多人合作平台、線上遊戲等。這類系統需要協調多個參與者之間的即時互動。
- **GUI 元件交互**：管理複雜的用戶介面元件之間的互動關係。例如，表單驗證、按鈕狀態聯動、頁面元件同步等。
- **事件系統**：協調多個事件發出者和接收者之間的關係。這種場景下，中介者可以作為事件匯聚和分發的中央樞紐。
- **工作流系統**：管理複雜業務流程中各步驟之間的互動。中介者能夠協調不同階段的狀態轉換和資料傳遞。

**核心價值總結**：這種模式的最大價值在於**關係轉換** — 將複雜的多對多互動關係轉化為簡單的一對多中介關係。透過這種架構轉換，我們不僅大幅簡化了系統的結構設計，更重要的是降低了長期維護的成本和複雜度。
