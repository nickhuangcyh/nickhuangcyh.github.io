---
layout: post
title: "設計模式（18）責任鏈模式：動態日誌處理系統設計指南 Chain of Responsibility Pattern"
date: 2024-12-16 23:00:00 +0800
description: "完整解析責任鏈模式 Chain of Responsibility Pattern 實作技巧，學習透過動態處理鏈設計靈活的日誌系統，掌握行為型設計模式的核心應用與最佳實踐方法。"
tags: [Design Patterns, Chain of Responsibility, Behavioral Patterns, Software Architecture, OOP, Kotlin, Java, Logging System, Design Principles]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

## 進入行為型模式的世界

歡迎來到 Design Pattern 系列的一個重要里程碑！在前面的文章中，我們深入探索了結構型模式，包括[享元模式 (Flyweight)](/zh/blog/2024/design-pattern-16-flyweight-pattern/) 和[代理模式 (Proxy)](/zh/blog/2024/design-pattern-17-proxy-pattern/)。這些模式主要關注物件和類別如何組合成更大的結構。

從今天開始，我們正式進入 **行為型模式 (Behavioral Patterns)** 的學習。與[結構型模式](/zh/blog/2024/design-pattern-11-adapter-pattern/)不同，行為型模式不關注物件的結構。相反地，它專注於物件之間如何交互、溝通和協作來完成複雜的任務。

## 我們的需求：智慧型日誌處理系統

今天我們的任務是設計一個高度靈活的日誌處理系統。在現代軟體開發中，日誌系統往往需要支援多種不同的輸出目標和處理策略。

為了建立一個真正實用的系統，我們需要滿足以下三個核心需求：

**1. 多層次日誌輸出支援**

系統必須能夠同時支援多種日誌輸出方式。例如控制台顯示 (Console)、檔案記錄 (File)、以及資料庫儲存 (Database) 等。

重要的是，不同的日誌等級可能需要使用不同的輸出渠道。這讓系統能根據訊息的重要性選擇適當的儲存方式。

**2. 動態處理鏈的靈活性**

系統應該能夠根據不同的需求情境，動態調整處理器的組合和順序。舉例來說，開發環境可能只需要控制台輸出，而生產環境可能需要同時寫入檔案和資料庫。

這種彈性設計讓同一套系統能適應各種不同的部署環境。

**3. 可擴展性與獨立性**

每個日誌處理器的責任應該相互獨立。更重要的是，系統應該能夠在不修改既有代碼的情況下，輕易地增加新的處理器。

這確保了系統的穩定性，同時為未來的功能擴展預留了空間。

## 物件導向分析 (OOA)

理解需求後，讓我們來快速實作物件導向分析吧！

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_1.png" title="design_pattern_chain_of_responsibility_pattern_uml_1" %}

## 察覺 Forces

## 傳統做法的挑戰與限制

在沒有適當設計模式的情況下，直接實作多層日誌處理系統會面臨三個主要挑戰：

**1. 緊密耦合與複雜性問題**

如果讓客戶端直接管理所有日誌處理器，將導致代碼變得非常複雜。想像一下，客戶端需要知道每種日誌等級應該用哪些處理器。同時還要知道如何在不同環境下選擇正確的輸出方式。

這種緊密的耦合關係讓代碼難以理解和維護。每次需要調整日誌處理邏輯時，都必須深入客戶端代碼進行修改。

**2. 缺乏動態調整能力**

傳統做法缺乏靈活性，難以在運行時動態改變處理策略。舉例來說，如果想要在不同環境下使用不同的日誌配置，會變得非常困難。

另一個常見需求是根據系統負載動態調整日誌等級。在傳統架構下，這樣的彈性調整幾乎不可能實現。

**3. 擴展性與穩定性的衝突**

每當需要增加新的日誌處理方式時（如支援新的資料庫或雲端日誌服務），必須修改客戶端的核心邏輯。這種做法明顯違反了開放關閉原則 (Open-Closed Principle)。

更糟糕的是，每次修改都可能引入新的缺陷，影響系統的穩定性。這讓系統維護變成一場噩夢。

**解決方案導向**

面對這些挑戰，我們需要一種能夠將請求處理者連接成鏈的機制。這個機制讓請求能在這條鏈上動態流轉，直到找到適當的處理者。

這正是責任鏈模式的精髓所在。

## 套用 Chain of Responsibility Pattern (Solution) 得到新的 Context (Resulting Context)

## 責任鏈模式的解決理念

責任鏈模式 (Chain of Responsibility Pattern) 為我們提供了一個優雅的解決方案。它的核心想法是將多個處理者連接成一條鏈，讓請求沿著這條鏈流傳，直到被適當的處理者處理。

這種設計有三個重要的優勢：

- **解耦發送者與接收者**：請求的發送者不需要知道具體是哪個處理者會處理請求
- **動態組合**：可以在運行時動態改變處理鏈的結構
- **獨立處理**：每個處理者只需要關注自己的責任範圍

**模式結構總覽**

讓我們先來了解責任鏈模式的通用結構：

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_2.png" title="design_pattern_chain_of_responsibility_pattern_uml_2" %}

責任鏈模式通過將多個處理器連接成一條智慧的責任鏈，使日誌請求能在鏈上動態流轉，直到找到適當的處理者。

這種設計不僅大幅降低了系統各組件之間的耦合度，也為系統提供了強大的靈活性和可擴展性。

**模式核心角色**

責任鏈模式包含三個主要角色，各自承擔明確的職責：

**Handler (處理者抽象類別)**

定義處理請求的標準介面，並包含指向下一個處理者的引用。它還提供了將請求傳遞給下一個處理者的通用方法，確保鏈的連續性。

**ConcreteHandler (具體處理者)**

實作具體的處理邏輯。每個具體處理者都會檢查請求是否符合自己的處理條件。如果符合就處理，否則傳遞給下一個處理者。

在我們的例子中，這就是 `ConsoleLogger`、`FileLogger` 和 `DatabaseLogger`。

**Client (客戶端)**

負責發送日誌請求，並在初始化階段設定處理者的鏈結構配置。一旦鏈結構建立，客戶端就只需要將請求傳遞給鏈的第一個處理者即可。

**套用至日誌處理系統**

現在讓我們將這個行為型模式應用到我們的智慧型日誌處理系統中：

{% include figure.liquid path="assets/img/design_pattern_chain_of_responsibility_pattern_uml_3.png" title="design_pattern_chain_of_responsibility_pattern_uml_3" %}

## 物件導向程式設計 (OOP)

**步驟一：定義處理者抽象類別**

`Logger` 抽象類別作為所有日誌處理者的基礎，定義了責任鏈的核心結構：

```kotlin
abstract class Logger(private val nextLogger: Logger? = null) {

    abstract fun log(level: LogLevel, message: String)

    protected fun passToNext(level: LogLevel, message: String) {
        nextLogger?.log(level, message)
    }
}
```

[LogLevel Enum]

```kotlin
enum class LogLevel {
    INFO, WARNING, ERROR
}
```

**步驟二：實作具體處理者 - 控制台日誌**

`ConsoleLogger` 負責處理一般資訊 (INFO) 等級的日誌，將內容輸出到控制台：

```kotlin
class ConsoleLogger(nextLogger: Logger? = null) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level == LogLevel.INFO) {
            println("ConsoleLogger: $message")
        }
        passToNext(level, message)
    }
}
```

**步驟三：實作具體處理者 - 檔案日誌**

`FileLogger` 專門處理警告 (WARNING) 等級的日誌，將重要資訊寫入檔案以便後續查閱：

```kotlin
class FileLogger(nextLogger: Logger? = null) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level == LogLevel.WARNING) {
            println("FileLogger: $message")
        }
        passToNext(level, message)
    }
}
```

**步驟四：實作具體處理者 - 資料庫日誌**

`DatabaseLogger` 負責處理最高優先級的錯誤 (ERROR) 日誌，將關鍵錯誤訊息永久儲存到資料庫：

```kotlin
class DatabaseLogger(nextLogger: Logger? = null) : Logger(nextLogger) {

    override fun log(level: LogLevel, message: String) {
        if (level == LogLevel.ERROR) {
            println("DatabaseLogger: $message")
        }
        passToNext(level, message)
    }
}
```

**步驟五：建立和測試責任鏈**

現在讓我們建立一個完整的責任鏈，並測試它在不同日誌等級下的表現：

```kotlin
fun main() {
    val loggerChain = ConsoleLogger(FileLogger(DatabaseLogger()))

    println("Sending INFO log...")
    loggerChain.log(LogLevel.INFO, "This is an informational message.")

    println("\nSending WARNING log...")
    loggerChain.log(LogLevel.WARNING, "This is a warning message.")

    println("\nSending ERROR log...")
    loggerChain.log(LogLevel.ERROR, "This is an error message.")
}
```

**執行結果分析**

從以下輸出結果可以清楚看到責任鏈模式的核心特性：

```bash
Sending INFO log...
ConsoleLogger: This is an informational message.

Sending WARNING log...
FileLogger: This is a warning message.

Sending ERROR log...
DatabaseLogger: This is an error message.
```

可以看到，每種日誌等級都被傳遞到了正確的處理者。INFO 等級的訊息由 ConsoleLogger 處理，WARNING 等級由 FileLogger 處理，而 ERROR 等級則由 DatabaseLogger 處理。

這展示了責任鏈如何根據請求的特性，自動將請求路由到適當的處理者。

## 結論

## 責任鏈模式的核心價值

透過實作責任鏈模式，我們成功地解決了在多層次日誌處理中面臨的所有挑戰：

**動態責任分配**

每個處理者都只關注自己的責任範圍，系統能夠根據日誌等級自動將請求路由到正確的處理者。這讓系統行為變得可預測且易於理解。

**高度解耦**

客戶端代碼只需要將日誌請求傳遞給鏈的第一個處理者，完全不需要知道具體哪個處理者會處理請求。這種設計大幅降低了系統的耦合度。

**優異的可擴展性**

增加新的日誌處理者（如雲端日誌服務、電子郵件通知等）變得非常簡單。只需要創建新的具體處理者類別並插入鏈中即可，無需修改既有代碼。

## 行為型模式的特色展現

責任鏈模式完美地展現了行為型模式的核心特色：

**物件間協作**

不同於結構型模式關注物件的組合，責任鏈模式關注的是物件之間如何協作完成任務。每個處理者都知道如何與下一個處理者溝通。

**動態行為**

該模式支持在運行時動態改變處理鏈的結構，適應不同的業務場景。這讓系統能夠靈活應對各種變化。

**責任分離**

每個處理者都有明確的單一責任，符合單一責任原則。這讓代碼更容易維護和測試。

## 常見應用場景

責任鏈模式在軟體開發中有許多實用的應用：

**1. 請求驗證系統**

多層次的權限檢查、輸入驗證、業務規則驗證。每一層驗證器都專注於特定的檢查項目，確保系統安全性。

**2. Web 中間件 (Middleware)**

身份驗證、日誌記錄、效能監控、錯誤處理等。這些中間件形成一條處理管道，依序處理 HTTP 請求。

**3. 事件處理系統**

GUI 中的滑鼠事件、鍵盤事件在組件層次中的傳遞。事件會沿著組件樹向上或向下傳播，直到找到合適的處理器。

**4. 工作流系統**

不同部門或角色的審批流程。文件或請求會依序經過各個審批階段，每個階段都有明確的職責範圍。

**模式的普遍價值**

這些應用場景都體現了責任鏈模式的核心優勢：將複雜的處理邏輯分解成多個獨立的處理者。通過鏈式結構實現靈活的協作，為系統設計提供強大的可維護性和可擴展性。

## 系列文章導覽

### 行為型設計模式系列
- [命令模式 (Command Pattern)](/zh/blog/2024/design-pattern-19-command-pattern/) - 將請求封裝為物件，支援操作的撤銷與重做
- [迭代器模式 (Iterator Pattern)](/zh/blog/2024/design-pattern-20-iterator-pattern/) - 提供循序訪問聚合物件的標準方法
- [中介者模式 (Mediator Pattern)](/zh/blog/2024/design-pattern-21-mediator-pattern/) - 定義物件間的互動方式，降低耦合度
- [觀察者模式 (Observer Pattern)](/zh/blog/2024/design-pattern-23-observer-pattern/) - 實作事件驅動的通知機制

### 結構型設計模式系列
- [適配器模式 (Adapter Pattern)](/zh/blog/2024/design-pattern-11-adapter-pattern/) - 讓不相容的介面能夠協同工作
- [橋接模式 (Bridge Pattern)](/zh/blog/2024/design-pattern-12-bridge-pattern/) - 將抽象與實作分離，支援獨立演化

### 創建型設計模式基礎
- [設計模式概念](/zh/blog/2024/design-pattern-3-design-pattern/) - 了解設計模式的基本概念
- [設計原則](/zh/blog/2024/design-pattern-2-design-principle/) - 掌握 SOLID 原則與設計基礎

透過責任鏈模式，我們學會了如何設計動態且靈活的請求處理機制。在下一篇文章中，我們將探討另一個重要的行為型模式，繼續深入學習物件間的協作設計技巧。
