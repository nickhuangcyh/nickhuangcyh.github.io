---
layout: post
title: "設計模式（20）迭代器模式：統一資料遍歷介面，優雅存取多種集合結構"
date: 2024-12-22 14:00:00 +0800
description: "詳細探討迭代器模式（Iterator Pattern）的設計精髓，透過音樂播放清單管理實例，學習如何建立統一的遍歷介面，隱藏集合內部結構複雜度。"
tags: [Iterator Pattern, Design Patterns, Behavioral Patterns, Data Structure, Collection Traversal, Music Playlist]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

我們的任務是設計一個檔案系統搜尋工具，具備以下核心需求：

- **多種搜尋策略**：使用者可以選擇不同的檔案搜尋方式。主要包括 **廣度優先搜尋 (BFS)** 和 **深度優先搜尋 (DFS)** 兩種遍歷策略。
- **統一存取介面**：客戶端不需要了解各種搜尋邏輯的實作細節。所有搜尋結果都應透過統一的迭代器介面進行存取。
- **良好擴展性**：系統架構要支援未來新增其他搜尋演算法。例如基於檔案大小、修改時間或檔案類型的排序搜尋。

這個需求場景展現了**行為型設計模式**的典型應用特徵。我們需要管理不同演算法物件之間的互動關係，同時提供一致的存取方式。

## 物件導向分析 (OOA)

理解需求後，我們進行物件導向分析。在這個場景中，我們需要識別系統中的關鍵元素。

從需求分析可知，我們有以下重要元素：

- 檔案系統結構（樹狀資料結構）
- 多種遍歷演算法（BFS、DFS等）
- 統一的存取介面
- 可擴展的搜尋策略

核心挑戰在於如何讓不同的遍歷演算法都能提供一致的存取方式。同時，這些演算法還需要保持各自的獨立性，避免彼此干擾。

{% include figure.liquid path="assets/img/design_pattern_iterator_pattern_uml_1.png" title="design_pattern_iterator_pattern_uml_1" %}

## 察覺 Forces

在未使用設計模式的直接實作中，我們會遭遇以下核心挑戰：

### 1. 高耦合性問題 (High Coupling)

客戶端需要直接操作每種搜尋方式的具體實作細節。這意味著客戶端必須了解 BFS 使用佇列、DFS 使用堆疊等內部邏輯。

這種緊密耦合導致程式碼變得臃腫且難以維護。當搜尋演算法需要調整時，客戶端程式碼也必須跟著修改。

更重要的是，這種設計違背了行為型模式的核心原則：**行為的使用者不應該了解行為的實作細節**。

### 2. 存取方式不一致 (Inconsistent Access)

不同搜尋演算法可能採用不同的結果回傳方式。例如 BFS 回傳 List，DFS 回傳 Array。這種不一致性增加了客戶端的使用複雜度。

這個問題直接影響了**行為的一致性**。客戶端必須針對不同的回傳類型寫出不同的處理邏輯。結果是程式碼變得難以維護且容易出錯。

### 3. 違反開放關閉原則 (Violates OCP)

每當需要新增搜尋演算法或修改現有搜尋邏輯時，客戶端程式碼也必須跟著修改。這違反了軟體設計的開放關閉原則，大幅增加了維護成本。

在行為型設計中，這表示**新行為的加入會影響現有程式碼**。這種設計明顯違背了行為擴展性的基本原則。

### 4. 演算法與資料結構緊密耦合

搜尋演算法與檔案系統的內部資料結構緊密耦合，導致演算法難以獨立測試和重複使用。這種緊密結合限制了程式碼的靈活性。

這種耦合阻礙了**行為的模組化**。理想情況下，每種遍歷行為都應該能夠獨立運作，不受特定資料結構的限制。

### 根本問題分析

這些問題的根源在於**資料遍歷邏輯**與**資料存取介面**缺乏適當的抽象層。沒有抽象層的保護，各種實作細節直接暴露給客戶端。

從行為型設計的角度來看，我們缺少了一個統一的**行為介面**來管理不同的遍歷策略。這個缺失導致物件間的交互變得複雜且難以控制。

## 套用 Iterator Pattern 解決問題

經過物件導向分析並察覺到系統面臨的挑戰後，我們可以套用 Iterator Pattern 來解決這些問題。

### Iterator Pattern 的行為型特性

**Iterator Pattern（迭代器模式）**是一種行為型設計模式。它提供了一種順序存取聚合物件元素的方法，而不需要暴露該物件的內部表示。

這個模式体現了行為型設計的核心精神：**將複雜的物件交互行為簡化為統一的介面**。透過這種簡化，它成功將遍歷演算法與資料結構分離。讓我們能夠獨立地改變遍歷行為，不會影響到其他部分。

更重要的是，它實現了**行為的統一化管理**。無論是 BFS、DFS 或任何其他遍歷策略，客戶端都能以完全相同的方式使用，大幅降低學習和使用成本。

### Iterator Pattern 核心概念

迭代器模式的精髓在於將「如何遍歷」的邏輯從「遍歷什麼」的資料結構中分離出來。這種分離帶來了極大的靈活性。

對於檔案搜尋系統而言，這意味著我們可以用相同的方式存取 BFS 和 DFS 的搜尋結果。客戶端不需要學習兩套不同的使用方法。

這種分離就是**行為管理**的核心。它讓我們能夠獨立地管理「如何遍歷」的行為，而不受「遍歷什麼」的資料結構影響。

{% include figure.liquid path="assets/img/design_pattern_iterator_pattern_uml_2.png" title="design_pattern_iterator_pattern_uml_2" %}

### 角色與職責

Iterator Pattern 透過以下四個核心角色來解決系統問題。每個角色都負責特定的行為管理任務：

#### 1. Iterator（迭代器介面）

定義遍歷元素的標準協議。主要包括 `hasNext()` 檢查是否還有元素，以及 `next()` 取得下一個元素。

這個介面確保所有遍歷方式都有一致的存取方法。不論底層使用什麼演算法，客戶端都能用相同的方式操作。它是**行為統一性**的關鍵，讓不同的遍歷策略都能以相同的介面提供服務。

#### 2. ConcreteIterator（具體迭代器）

實現具體的遍歷演算法。例如 BFS 迭代器使用佇列結構、DFS 迭代器使用堆疊結構。每種迭代器都有自己的實作細節。

每個具體迭代器都封裝了特定的搜尋邏輯和狀態管理。這些類別實現了**行為的封裝化**，將複雜的演算法邏輯隱藏在簡單的介面後面。客戶端只需要知道如何使用，不必了解內部如何運作。

#### 3. Aggregate（聚合介面）

定義建立迭代器的工廠方法。它規範了聚合物件如何產生對應的迭代器實例。這個介面就像是一個迭代器的製造工廠。

這個介面尤其重要，因為它建立了**資料與行為的連結**。透過這個連結，資料結構能夠根據不同需要提供不同的遍歷行為。

#### 4. ConcreteAggregate（具體聚合類別）

實現聚合介面，代表實際的檔案系統資料結構。它根據指定的遍歷策略建立對應的具體迭代器。這就是實際的迭代器工廠實作。

這個類別實現了**行為的動態選擇**。它能夠根據不同的需求提供不同的遍歷行為，而不需要暴露內部的資料結構細節。

### 應用到檔案系統搜尋工具

{% include figure.liquid path="assets/img/design_pattern_iterator_pattern_uml_3.png" title="design_pattern_iterator_pattern_uml_3" %}

## 物件導向程式設計實作

現在我們將 Iterator Pattern 的理論轉化為實際程式碼。每個元件都有明確的職責分工，共同形成完整的迭代器體系。

這個實作充分展現了**行為型模式的設計哲學**：透過統一的介面管理各種不同的行為。這讓客戶端無需關心具體的實作細節，可以專注於使用行為本身。

### Iterator - 迭代器介面

迭代器介面定義了所有遍歷操作必須實作的標準協議。這個介面是**行為統一性**的基礎。它確保所有遍歷行為都遵循相同的使用約定：

```kotlin
interface Iterator<T> {
    fun hasNext(): Boolean
    fun next(): T
}
```

### Aggregate - 檔案系統聚合介面

聚合介面定義了建立迭代器的工廠方法。它建立了**資料與行為的連結**。透過這個介面，資料結構能夠產生對應的遍歷行為：

```kotlin
interface FileSystem {
    fun createIterator(): Iterator<File>
}
```

### ConcreteIterator - 具體迭代器實作

每個具體迭代器封裝特定的遍歷演算法和狀態管理邏輯。這些類別展現了**行為的具體實現**。它們將抽象的遍歷介面轉化為可執行的演算法：

```kotlin
class BFSIterator(private val root: File) : Iterator<File> {
    private val queue = ArrayDeque<File>()

    init {
        queue.add(root)
    }

    override fun hasNext(): Boolean {
        return queue.isNotEmpty()
    }

    override fun next(): File {
        if (!hasNext()) throw NoSuchElementException()
        val current = queue.removeFirst()
        if (current.isDirectory) {
            queue.addAll(current.listFiles().orEmpty())
        }
        return current
    }
}

class DFSIterator(private val root: File) : Iterator<File> {
    private val stack = ArrayDeque<File>()

    init {
        stack.add(root)
    }

    override fun hasNext(): Boolean {
        return stack.isNotEmpty()
    }

    override fun next(): File {
        if (!hasNext()) throw NoSuchElementException()
        val current = stack.removeLast()
        if (current.isDirectory) {
            stack.addAll(current.listFiles().orEmpty())
        }
        return current
    }
}
```

### ConcreteAggregate - 預設檔案系統實作

具體聚合類別根據指定的搜尋策略建立對應的迭代器。這個類別實現了**行為的動態管理**。它能夠根據不同的策略需求提供對應的遍歷行為：

```kotlin
class DefaultFileSystem(private val root: File, private val searchMethod: SearchMethod) : FileSystem {
    override fun createIterator(): Iterator<File> {
        return when (searchMethod) {
            SearchMethod.BFS -> BFSIterator(root)
            SearchMethod.DFS -> DFSIterator(root)
        }
    }
}

enum class SearchMethod {
    BFS, DFS
}
```

### File - 檔案資料結構

簡單的檔案資料結構，支援目錄和一般檔案。這個資料結構保持簡單且專注，不包含任何遍歷邏輯。它完美體現了**資料與行為分離**的設計原則：

```kotlin
data class File(val name: String, val isDirectory: Boolean, val children: List<File> = emptyList()) {
    fun listFiles(): List<File> = if (isDirectory) children else emptyList()
}
```

### Client - 客戶端使用範例

客戶端展示如何使用統一的迭代器介面來遍歷檔案系統。注意客戶端如何透過**統一的行為介面**使用不同的遍歷策略。整個過程中，客戶端完全不需要了解內部實作細節：

```kotlin
fun main() {
    val fileSystem = DefaultFileSystem(
        root = File(
            name = "root",
            isDirectory = true,
            children = listOf(
                File("file1.txt", false),
                File("folder1", true, listOf(
                    File("file2.txt", false),
                    File("file3.txt", false)
                )),
                File("folder2", true, listOf(
                    File("file4.txt", false)
                ))
            )
        ),
        searchMethod = SearchMethod.BFS
    )

    val iterator = fileSystem.createIterator()
    println("Files:")
    while (iterator.hasNext()) {
        println("- ${iterator.next().name}")
    }
}
```

### 執行結果

使用 BFS 搜尋策略的執行結果如下：

```bash
Files:
- root
- file1.txt
- folder1
- folder2
- file2.txt
- file3.txt
- file4.txt
```

## 結論與效益

透過套用 Iterator Pattern，我們成功解決了原本系統面臨的核心問題。這個實作充分展現了**行為型設計模式**在管理複雜物件交互行為方面的強大能力。

### 主要改善效果

**1. 統一存取介面**

所有搜尋演算法都透過相同的 Iterator 介面進行存取。這讓客戶端程式碼變得簡潔且一致，不再需要學習多套不同的操作方法。

這種統一性体現了**行為抽象化**的核心價值：將複雜、各異的行為統一在簡單的介面之下。這種設計大幅降低了使用複雜度。

**2. 演算法獨立性**

BFS 和 DFS 的實作完全獨立，各自封裝遍歷邏輯和狀態管理，互不影響。一個演算法的修改不會波及到其他演算法。

這種獨立性讓我們能夠**獨立管理每種行為**。不同的遍歷策略可以獨立開發、測試和維護，大幅提升了程式碼的可管理性。

**3. 良好擴展性**

新增搜尋演算法時只需實作新的 ConcreteIterator，無需修改現有程式碼。這個設計完全符合開放關閉原則。

這種擴展性展現了**行為的組合能力**：新行為可以輕鬆整合到現有系統中，而不會影響既有的行為實作。系統的演化變得更加容易。

**4. 責任分離**

遍歷邏輯與資料結構完全分離，大幅提高了程式碼的可維護性和可測試性。每個元件都有清楚的職責界限。

這種分離是行為型模式的精髓：**讓每個物件專注於自己的核心責任**。物件不需要了解或管理其他物件的內部實作，降低了整體複雜度。

### 行為型模式的價值體現

Iterator Pattern 完美詮釋了行為型設計模式的核心價值：

- **行為抽象化**：將複雜多樣的遍歷行為統一在簡單介面之下
- **責任分離**：讓每個物件專注於特定的行為管理任務
- **交互簡化**：透過統一介面降低物件間的複雜依賴關係
- **動態管理**：在執行時期選擇和切換不同的行為策略

### 適用場景

Iterator Pattern 特別適合以下應用情境：

- **複雜資料結構遍歷**：如樹狀、圖形、網狀結構的不同遍歷方式
- **集合類別操作**：需要提供多種遍歷順序的資料集合
- **演算法策略切換**：同一資料需要支援多種處理演算法的場景
- **大型資料集處理**：需要惰性載入或分批處理的情境

### 核心價值總結

這種模式的核心價值在於**將遍歷行為抽象化**。它讓客戶端能夠以統一的方式處理不同的遍歷策略，大大增強了系統的靈活性和可維護性。

透過 Iterator Pattern，我們不僅解決了當前的技術問題，更建立了一個具備優秀**行為管理能力**的系統架構。這個架構能夠靈活應對各種不同的遍歷需求和未來的功能擴展，為系統的長期發展奠定了堅實基礎。
