---
layout: post
title: "設計模式（22）備忘錄模式：實現文字編輯器復原功能，完美封裝物件狀態快照"
date: 2024-12-22 14:00:00 +0800
description: "深入剖析備忘錄模式（Memento Pattern）核心原理，透過文字編輯器復原（Undo）功能實例，學習如何安全保存與恢復物件狀態，實現完整的狀態管理系統。"
tags: [Memento Pattern, Design Patterns, Behavioral Patterns, State Management, Undo Functionality, Text Editor]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

我們的任務是設計一個文字編輯器，具備以下核心需求：

- **狀態編輯功能**：使用者可以輸入文字，進行各種文字編輯操作。系統需要追蹤編輯過程中的每個狀態變化。
- **Undo 操作支援**：使用者可以隨時按下 `Ctrl+Z` 鍵來回復到上一個狀態。系統必須精確地回復到之前的文字內容。
- **狀態歷史管理**：系統需要自動保存每次編輯的歷史狀態，以支援多次 Undo 操作。
- **封裝性要求**：客戶端不需要了解狀態保存和回復的內部實作細節，只需使用簡單的 API 即可。

想像一下您在使用 Word 或 Google Docs 時，每次輸入文字或刪除內容後，都可以按下 `Ctrl+Z` 輕鬆回到前一個狀態。這個看似簡單的功能，其實涉及複雜的狀態管理機制。

這是一個典型的**行為型設計模式**應用場景，需要管理物件內部狀態的保存和還原機制。

## 物件導向分析 (OOA)

理解需求後，我們進行物件導向分析。在這個文字編輯器場景中，我們面臨的核心挑戦是如何有效管理物件狀態的保存和還原。

從系統的角度分析，我們可以識別出四個關鍵元素：
- **文字編輯器物件**：作為狀態的擁有者，負責文字內容的處理
- **文字內容狀態**：需要被保存和還原的核心資料
- **狀態快照**：將狀態進行封裝，便於傳遞和儲存
- **歷史管理器**：負責管理多個狀態快照，提供 Undo 功能

這裡的核心挑戰是：如何在不破壞物件封裝性的前提下，安全地保存和還原物件的內部狀態？換句話說，我們需要讓外部可以保存狀態，但不能直接存取內部實作細節。

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_1.png" title="design_pattern_memento_pattern_uml_1" %}

## 察覺 Forces

在未使用設計模式的直接實作中，我們會遭遇以下核心挑戰：

### 1. 狀態管理複雜化 (State Management Complexity)
如果我們僅保留當前狀態，就無法實現 Undo 功能。但要保存歷史狀態，又會產生複雜的管理問題。

我們需要決定：哪些狀態資料需要保存？如何有效率地保存？何時清理過期的舊狀態？這些問題會讓程式碼變得複雜且難以維護。

### 2. 封裝性破壞 (Encapsulation Violation)
為了實現狀態保存，客戶端往往需要直接存取編輯器的內部狀態資料。這種做法破壞了物件的封裝性原則。

當編輯器的內部實作細節暴露給外部時，系統的耦合度大幅增加。任何內部結構的變更都可能影響到使用它的程式碼。

### 3. 效能與記憶體問題 (Performance and Memory Issues)
當文件內容很大時，直接複製整個物件狀態會消耗大量記憶體。每次儲存狀態都需要複製完整的資料。

在使用者頻繁操作的情況下，這種全量複製會成為嚴重的效能瓶頸，甚至可能導致應用程式當機。

### 4. 擴展性限制 (Limited Extensibility)
當我們想要新增進階功能時，例如 Redo 操作、多步驟 Undo、或者狀態的持久化儲存，往往需要大幅修改現有的架構。

這種修改的影響範圍很大，可能需要重新設計整個系統，增加開發成本和風險。

**這些問題的根源在於狀態保存責任的不當分配**，系統缺乏統一且有效的狀態管理機制。

## 套用 Memento Pattern 解決問題

經過物件導向分析並察覺到系統面臨的挑戰後，我們可以套用 Memento Pattern 來解決這些問題。

**Memento Pattern（備忘錄模式）**是一種行為型設計模式。它的目標是在不破壞封裝性的前提下，捕獲並保存一個物件的內部狀態，並能在之後將該物件還原為原先的狀態。

### Memento Pattern 核心概念

Memento Pattern 的核心想法相當直觀：將物件的狀態快照封裝在一個獨立的備忘錄物件中。

這個備忘錄物件有個重要特性：只有原始物件可以存取其完整內容，其他物件無法直接修改。這種設計巧妙地保護了封裝性，同時提供了狀態保存的能力。

就像是給物件拍了一張「狀態照片」，只有物件本身知道如何解讀和使用這張照片來恢復狀態。

### Memento Pattern UML 結構

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_2.png" title="design_pattern_memento_pattern_uml_2" %}

### 角色與職責

Memento Pattern 透過以下三個核心角色來解決系統問題：

#### 1. Originator（發起者）- 文字編輯器
這是擁有內部狀態的主要物件，負責建立備忘錄快照和從備忘錄中還原狀態。

在我們的例子中，文字編輯器就是發起者。它知道如何保存自己的文字內容狀態，也知道如何從快照中恢復到之前的狀態。

#### 2. Memento（備忘錄）- 狀態快照
這是一個不可變的快照物件，專門用來存儲發起者在特定時點的內部狀態。

備忘錄物件的設計很巧妙：它提供受限的介面給管理者使用，但同時允許發起者存取所有必要的資料來還原狀態。這種「雙重介面」確保了封裝性。

#### 3. Caretaker（管理者）- 歷史管理器
管理者負責保管所有的備忘錄快照，但有個重要原則：它絕不修改或檢查備忘錄的內容。

管理者只需要知道「何時」保存快照和「何時」執行還原操作，但不需要知道快照的具體內容是什麼。這種職責分離讓系統更加穩固。

### 應用到文字編輯器

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_3.png" title="design_pattern_memento_pattern_uml_3" %}

## 物件導向程式設計實作

現在我們將 Memento Pattern 的理論轉化為實際程式碼。透過清楚的職責分工，每個元件都扮演特定角色，共同形成完整的狀態管理體系。

### Originator - 文字編輯器

文字編輯器作為發起者，負責管理自身狀態和備忘錄的建立與還原。讓我們看看它的實作：

```kotlin
class TextEditor {
    private var text: String = ""

    fun type(newText: String) {
        text += newText
    }

    fun getText(): String = text

    fun save(): Memento = Memento(text)

    fun restore(memento: Memento) {
        text = memento.getText()
    }

    data class Memento(private val state: String) {
        fun getText(): String = state
    }
}
```

### Caretaker - 歷史管理器

歷史管理器扮演快照的保管者角色。它的職責很單純：保存備忘錄和提供 Undo 功能，但絕不直接操作快照內容：

```kotlin
class History {
    private val mementos = mutableListOf<TextEditor.Memento>()

    fun save(memento: TextEditor.Memento) {
        mementos.add(memento)
    }

    fun undo(): TextEditor.Memento? {
        if (mementos.isNotEmpty()) {
            return mementos.removeAt(mementos.size - 1)
        }
        return null
    }
}
```

### Client - 客戶端使用範例

現在讓我們看看客戶端如何使用這套系統。注意客戶端的程式碼非常簡潔，完全不需要了解內部的狀態管理細節：

```kotlin
fun main() {
    val textEditor = TextEditor()
    val history = History()

    // Typing string
    textEditor.type("Hello")
    history.save(textEditor.save())

    textEditor.type(", World")
    history.save(textEditor.save())

    textEditor.type("! This is Memento Pattern.")
    println("Current Text：${textEditor.getText()}") // Output: Hello, World! This is Memento Pattern.

    // Pressed Ctrl+Z
    textEditor.restore(history.undo()!!)
    println("Excute undo Text：${textEditor.getText()}") // Output: Hello, World!

    // Pressed Ctrl+Z again
    textEditor.restore(history.undo()!!)
    println("Excute undo Text：${textEditor.getText()}") // Output: Hello
}
```

### 執行結果

程式執行後的輸出結果如下：

```bash
Current Text： Hello, World! This is Memento Pattern.
Excute undo Text： Hello, World!
Excute undo Text： Hello
```

## 結論與效益

透過套用 Memento Pattern，我們成功解決了原本系統面臨的核心問題。讓我們回顧一下這個模式帶來的具體改善。

### 主要改善效果

**1. 封裝性保護**
物件的內部狀態得到完整保護，外部物件無法直接存取或修改編輯器的內部狀態。這確保了物件的完整性，任何狀態變更都必須透過正當管道進行。

**2. 狀態管理簡化**
透過備忘錄物件封裝狀態快照，狀態的保存和還原變得簡單且可靠。每個快照都是不可變的，從根本上避免了狀態不一致的問題。

**3. 獨立的歷史管理**
歷史管理器與業務邏輯完全分離，可以獨立擴展或修改。當我們需要調整 Undo 的策略時，不會影響到文字編輯器的核心功能。

**4. 安全的狀態回溯**
系統可以安全地回溯到任何之前保存的狀態，不會造成資料不一致或損壞。這種安全性來自於備忘錄的不可變特性和清楚的職責分工。

### 適用場景

Memento Pattern 特別適合以下應用情境：

- **文字編輯器**：實現 Undo/Redo 功能，支援多步驟操作回溯
- **遊戲存檔系統**：保存遊戲狀態，讓玩家能載入之前的存檔點
- **交易系統**：支援交易回滾機制，確保資料一致性和可靠性
- **配置管理**：保存系統配置快照，在出現問題時能快速回滾配置
- **網頁瀏覽器**：實現上一頁/下一頁功能，記住瀏覽歷史狀態

### 實作時的設計考量

在實作 Memento Pattern 時，需要特別注意以下幾點：

**記憶體使用優化**
對於大型狀態物件，直接複製整個狀態可能造成記憶體問題。可以考慮使用增量快照或壓縮儲存的方式來優化。

**快照數量限制**
設置合理的歷史記錄上限很重要，避免無限制地累積快照導致記憶體溢出。可以採用 LRU（最近最少使用）等策略來管理快照。

**快照不可變性**
確保備忘錄物件在建立後不能被修改，這是維持系統穩定性的關鍵原則。

**總結來說，Memento Pattern 的核心價值在於：在維持封裝性的同時提供安全的狀態管理機制**。它讓物件能夠在不暴露內部實作細節的前提下，支援狀態的保存和還原，是解決狀態管理問題的優雅方案。
