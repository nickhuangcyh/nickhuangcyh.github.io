---
layout: post
title: "設計模式（19）命令模式：智慧家電遙控系統，實現操作封裝與復原機制"
date: 2024-12-21 15:00:00 +0800
description: "深度剖析命令模式（Command Pattern）核心概念，透過智慧家電遙控器實例，學習如何將操作請求封裝成物件，實現復原功能與操作歷史管理。"
tags: [Command Pattern, Design Patterns, Behavioral Patterns, Smart Home, Remote Control, Undo Functionality]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

我們需要建立一個音樂播放器控制系統。這個系統將展示如何優雅地管理不同操作指令，核心需求如下：

- **遠端控制**：使用者可以透過遙控器控制音樂播放器執行基本操作。支援的操作包括「播放」、「暫停」和「停止」功能。
- **撤銷機制**：系統必須提供撤銷 (Undo) 功能。例如，撤銷暫停操作會自動恢復播放狀態。
- **擴展性**：按鈕行為應保持靈活且易於擴充。未來可能需要新增「下一首」、「重播」等進階功能。

### 為什麼需要設計模式？

這個需求場景凸顯了**行為型設計模式**的核心價值。當系統需要處理多種不同的操作指令時，傳統的直接呼叫方式往往會導致程式碼耦合度過高。

我們需要找到一種方法，能夠有效管理操作請求與執行者之間的互動關係。這樣系統才能夠靈活地處理不同的行為操作，同時保持良好的可維護性。

---

## 物件導向分析 (OOA)

理解需求後，我們進行物件導向分析。在這個階段，我們需要識別系統中的主要角色和它們的互動關係。

### 系統角色識別

從需求分析可知，我們的系統包含以下關鍵元素：

- **遙控器**：負責發起操作請求，是行為的觸發者
- **音樂播放器**：實際執行操作的接收者，處理具體的播放邏輯
- **各種操作指令**：包括播放、暫停、停止等不同的行為命令
- **操作歷史管理**：追蹤命令執行歷程，支援撤銷功能

### 設計思維重點

這種架構展現了典型的**行為分離**設計思維。我們將請求的發起、傳遞與執行分別獨立處理，讓每個元件都有明確的職責。

透過這樣的分析，我們可以清楚看到系統中各個角色的定位和相互關係，為後續的模式應用奠定基礎。

{% include figure.liquid path="assets/img/design_pattern_command_pattern_uml_1.png" title="design_pattern_command_pattern_uml_1" %}

## 察覺 Forces

在未使用設計模式的直接實作中，我們會遭遇以下核心挑戰：

### 1. 高耦合性問題 (High Coupling)

**問題描述：** 客戶端（遙控器）需要直接操作每個具體設備的功能。這種直接依賴關係導致系統耦合度過高，不利於後續擴展。

**具體影響：** 當遙控器直接呼叫 `player.play()`、`player.pause()` 等方法時，它必須了解播放器的具體介面。這種緊密耦合使得系統變得僵化且難以測試。

### 2. 靈活性不足 (Lack of Flexibility)

**問題描述：** 當需要新增設備或操作時，客戶端必須修改大量程式碼。這違反了開放關閉原則，大幅增加維護成本。

**實際案例：** 若要新增「重複播放」功能，不僅需要修改播放器類別，還必須更新所有相關的遙控器邏輯。這種連鎖反應讓系統維護變得困難重重。

### 3. 撤銷機制複雜化 (Undo/Redo Complexity)

**問題核心：** 系統缺乏統一的操作歷史管理機制。要實現撤銷和重做功能變得極其困難，每個操作都需要個別處理回退邏輯。

**傳統困境：** 傳統做法需要在每個操作中手動實作相對應的反向操作。這不僅增加了程式碼複雜度，也容易產生狀態不一致的問題。

### 根本問題分析

這些問題的根源在於**請求發起者**與**請求執行者**之間缺乏適當的抽象層。

缺少這個抽象層，使得行為的定義、執行與管理緊密糾結在一起。我們需要一個機制來解耦這些關係，讓系統更加靈活且易於維護。

## 套用 Command Pattern 解決問題

經過物件導向分析並察覺到系統面臨的挑戰後，我們可以套用 Command Pattern 來解決這些問題。

### Command Pattern 核心理念

**Command Pattern (命令模式)** 是一種行為型設計模式，它將請求封裝成物件。這種封裝方式是行為型模式的精髓：透過物件來代表和管理行為，而非直接執行行為。

### 模式帶來的優勢

這個模式讓我們能夠：

- 用不同的請求來參數化客戶端
- 將操作排入佇列或記錄到日誌中
- 支援撤銷和重做操作
- 將行為的定義與執行完全分離

### 核心概念

更重要的是，Command Pattern 體現了**行為管理**的核心概念。它將複雜的物件互動關係簡化為統一的命令介面，讓系統更容易理解和維護。

透過這個模式，我們可以將「做什麼」和「怎麼做」完全分開，實現真正的關注點分離。

### Command Pattern 核心結構

{% include figure.liquid path="assets/img/design_pattern_command_pattern_uml_2.png" title="design_pattern_command_pattern_uml_2" %}

### 角色與職責

Command Pattern 透過以下五個核心角色來解決系統問題，每個角色都承擔特定的行為管理責任：

#### 1. Receiver (接收者) - 音樂播放器

**職責定義：** 實際執行音樂播放邏輯的物件。它知道如何執行具體的業務操作，如播放、暫停和停止功能。

**設計理念：** 在行為型模式中，Receiver 代表**行為的最終執行者**。它專注於業務邏輯的實現，不需要關心誰發起了請求或如何管理這些請求。

#### 2. Command (命令介面)

**職責定義：** 定義所有命令的共同介面。確保每個命令都具備可執行性 (Execute) 與可撤銷性 (Undo) 的能力。

**重要性：** 這個介面是整個模式的核心抽象，它統一了**行為的呼叫方式**。讓所有不同的操作都能透過相同的介面進行管理。

#### 3. ConcreteCommand (具體命令)

**職責定義：** 將特定的播放控制操作封裝成命令物件。每個具體命令（如「播放命令」、「暫停命令」、「停止命令」）都知道如何執行和撤銷自己的操作。

**核心價值：** 具體命令實現了**行為的封裝化**。它將複雜的操作邏輯包裝成簡單的物件，同時維護執行所需的狀態資訊。

#### 4. Invoker (呼叫者) - 遙控器

**主要功能：** 負責執行命令的調用者。它不需要知道命令的具體實作細節，只需呼叫命令的 execute() 方法。

**附加責任：** 同時追蹤命令歷史以支援撤銷功能。Invoker 體現了**行為的協調管理**，負責控制命令的執行時機和順序。

#### 5. Client (客戶端)

**核心任務：** 負責建立具體命令物件並設定其接收者。建立命令、接收者與調用者之間的關聯關係。

**角色定位：** Client 扮演**行為的組織者**角色，負責建構整個命令執行體系，但不直接參與命令的執行過程。

### 應用到音樂播放器系統

{% include figure.liquid path="assets/img/design_pattern_command_pattern_uml_3.png" title="design_pattern_command_pattern_uml_3" %}

---

## 物件導向程式設計實作

接下來我們將 Command Pattern 的理論轉化為實際程式碼。每個元件都有明確的職責分工，形成完整的命令執行體系。

### 實作重點

這個實作展現了**行為型模式的精髓**：透過物件間的協作來管理複雜的行為互動，而不是讓單一物件承擔過多責任。

讓我們逐步檢視每個元件的實作，了解它們如何協同工作來解決原有的設計問題。

### Receiver - 音樂播放器

音樂播放器作為接收者，負責實際執行播放相關的業務邏輯。這個類別專注於**核心業務功能**，不需要了解誰會呼叫這些方法或如何管理這些呼叫：

```kotlin
class MusicPlayer {
    fun play() {
        println("Music is playing")
    }

    fun pause() {
        println("Music is paused")
    }

    fun stop() {
        println("Music is stopped")
    }
}
```

### Command - 命令介面

命令介面定義了所有命令必須實作的標準協議。

**設計目標：** 這個介面確保了**行為執行的一致性**，讓所有命令都遵循相同的呼叫約定：

```kotlin
interface Command {
    fun execute()
    fun undo()
}
```

### ConcreteCommand - 具體命令實作

每個具體命令封裝一個特定的操作，並知道如何執行和撤銷該操作。

**核心概念：** 這些類別展現了**命令物件化**的概念，將行為轉換為可以儲存、傳遞和管理的物件：

```kotlin
class PlayCommand(private val player: MusicPlayer) : Command {
    override fun execute() {
        player.play()
    }

    override fun undo() {
        player.pause() // 撤銷播放則暫停
    }
}

class PauseCommand(private val player: MusicPlayer) : Command {
    override fun execute() {
        player.pause()
    }

    override fun undo() {
        player.play() // 撤銷暫停則播放
    }
}

class StopCommand(private val player: MusicPlayer) : Command {
    override fun execute() {
        player.stop()
    }

    override fun undo() {
        println("Cannot undo stop") // 撤銷停止通常無法恢復
    }
}
```

### Invoker - 遙控器

遙控器作為命令的調用者，管理命令的執行和歷史記錄。

**責任範圍：** 它實現了**行為的協調控制**，負責決定何時執行命令以及如何處理命令歷史：

```kotlin
class RemoteControl {
    private val commandHistory = mutableListOf<Command>()

    fun pressButton(command: Command) {
        command.execute()
        commandHistory.add(command)
    }

    fun pressUndo() {
        if (commandHistory.isNotEmpty()) {
            val lastCommand = commandHistory.removeLast()
            lastCommand.undo()
        } else {
            println("No command to undo")
        }
    }
}
```

### Client - 客戶端使用範例

客戶端展示如何建立和使用整個命令系統。

**設計亮點：** 注意客戶端如何透過**組合不同的物件**來建構完整的行為管理系統，而無需關心內部的複雜互動：

```kotlin
fun main() {
    val player = MusicPlayer()

    val playCommand = PlayCommand(player)
    val pauseCommand = PauseCommand(player)
    val stopCommand = StopCommand(player)

    val remoteControl = RemoteControl()

    // Play music
    remoteControl.pressButton(playCommand)

    // Pause music
    remoteControl.pressButton(pauseCommand)

    // Undo
    remoteControl.pressUndo()

    // Stop music
    remoteControl.pressButton(stopCommand)

    // Undo
    remoteControl.pressUndo()
}
```

### 執行結果

程式執行後的輸出結果如下：

```bash
Music is playing
Music is paused
Music is playing
Music is stopped
Cannot undo stop
```

## 結論與效益

透過套用 Command Pattern，我們成功解決了原本系統面臨的核心問題。這充分展現了**行為型設計模式**在管理複雜物件互動方面的強大能力。

### 主要改善效果

#### 1. 降低耦合度

**改善成果：** 客戶端不再直接依賴具體設備，而是透過命令介面進行操作。這大幅提升了系統的模組化程度。

**設計優勢：** 行為的發起者與執行者之間建立了清晰的抽象界線，讓每個元件都能專注於自身的核心職責。

#### 2. 增強靈活性

**擴展便利性：** 新增功能時只需建立新的命令類別，無需修改現有程式碼。完全符合開放關閉原則。

**長期效益：** 這種設計讓系統具備優秀的**行為擴展性**，能夠輕鬆應對不斷變化的業務需求。

#### 3. 簡化撤銷機制

**實作簡化：** 透過統一的命令介面和歷史管理，撤銷與重做功能變得簡潔且易於維護。

**自動化管理：** 每個命令都自帶撤銷邏輯，形成了**行為的自我管理**機制，大幅簡化了複雜操作的狀態管理。

### 行為型模式的價值體現

Command Pattern 完美詮釋了行為型設計模式的核心理念：

- **行為抽象化**：將複雜的操作轉換為簡單的物件
- **責任分離**：讓每個物件專注於特定的行為管理任務
- **互動簡化**：透過統一介面降低物件間的複雜依賴

### 適用場景

Command Pattern 特別適合以下應用情境：

- **GUI 按鈕操作**：每個按鈕對應一個命令物件，實現行為與介面的分離
- **批次作業系統**：將操作排程並依序執行，支援複雜的工作流程管理
- **操作歷史記錄**：需要支援 Undo/Redo 功能的應用，如文字編輯器、繪圖軟體
- **遠端呼叫**：將本地請求封裝後傳送到遠端執行，實現分散式系統的行為協調

### 核心價值總結

這種模式的核心價值在於**將行為請求者與行為執行者完全解耦**。透過這種解耦，讓系統架構更加清晰且易於擴展。

透過 Command Pattern，我們不僅解決了當前的技術問題，更建立了一個具備優秀**行為管理能力**的系統架構。這為未來的功能擴展奠定了堅實基礎，讓系統能夠持續演進和改善。
