---
layout: post
title: "設計模式（13）組合模式：樹狀結構統一操作設計指南 Composite Pattern"
date: 2024-12-10 22:28:00 +0800
description: "深入解析組合模式 Composite Pattern 實作技巧，學習如何統一處理個別物件與物件集合，掌握樹狀結構管理與遞迴操作的結構型設計模式核心應用技術。"
tags: [Design Patterns, Composite Pattern, Structural Patterns, Tree Structure, Software Architecture, OOP, Kotlin, Java, Hierarchical Design]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

我們收到了一個需求：實作一個檔案系統，其目錄可以包含檔案或子目錄，並且需要提供統一的操作介面來列出目錄內容。此系統應支援以下功能：

- 支援樹狀結構的表示。
- 可操作單一檔案和目錄。
- 新增檔案或目錄時無需大幅修改現有程式碼。

## 物件導向分析 (OOA)

理解需求後，讓我們來快速實作物件導向分析吧!

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_1.png" title="design_pattern_composite_pattern_uml_1" %}

## 察覺 Forces

在未使用設計模式的情況下，上述需求可能會遇到以下問題：

1. **高耦合性 (Tight Coupling)**：
   - 單一檔案和目錄集合的操作邏輯分散在多個類別中，導致系統維護困難。
2. **重複代碼 (Code Duplication)**：
   - 每次操作目錄內容時，需分別處理檔案與子目錄，導致相似邏輯多處重複。

3. **難以擴展 (Difficulty in Extending)**：
   - 新增檔案或目錄類型時，需大幅修改程式碼，影響系統穩定性。

4. **靈活性差 (Lack of Flexibility)**：
   - 操作層需清楚區分單一檔案與目錄集合，增加程式碼複雜度。

## 套用 Composite Pattern ( Solution ) 得到新的 Context ( Resulting Context )

做完 OOA，察覺 Forces，看清楚整個 Context 後，就可以來套用 Composite Pattern 解決這個問題。

先來看一下 Composite Pattern 的 UML：

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_2.png" title="design_pattern_composite_pattern_uml_2" %}

### Composite Pattern 的三個核心角色：

**1. Component (組件介面)**
- 定義所有組件（葉子和組合）的通用介面
- 對客戶端提供一致的操作方式
- 在我們的檔案系統中，就是 `FileSystemComponent`

**2. Leaf (葉子節點)**
- 代表樹狀結構中的末端節點，不能再包含其他組件
- 實現 Component 介面的基本行為
- 在我們的例子中，就是單一檔案 `File`

**3. Composite (組合節點)**
- 代表可以包含子組件的容器節點
- 實現 Component 介面，並將操作委託給子組件
- 這就是我們的目錄 `Directory`，它可以包含檔案和子目錄

### 套用到我們的檔案系統

現在讓我們將 Composite Pattern 應用到檔案系統的設計中：

{% include figure.liquid path="assets/img/design_pattern_composite_pattern_uml_3.png" title="design_pattern_composite_pattern_uml_3" %}

## 物件導向程式設計 (OOP)

[Component: FileSystemComponent]

```kotlin
abstract class FileSystemComponent(val name: String) {
    open fun display(indent: String = "") {
        println("$indent$name")
    }

    open fun add(component: FileSystemComponent) {
        throw UnsupportedOperationException("Cannot add component to a leaf.")
    }

    open fun remove(component: FileSystemComponent) {
        throw UnsupportedOperationException("Cannot remove component from a leaf.")
    }
}
```

[Leaf: File]

```kotlin
class File(name: String) : FileSystemComponent(name) {
    override fun display(indent: String) {
        println("$indent- File: $name")
    }
}
```

[Composite: Directory]

```kotlin
class Directory(name: String) : FileSystemComponent(name) {
    private val children = mutableListOf<FileSystemComponent>()

    override fun add(component: FileSystemComponent) {
        children.add(component)
    }

    override fun remove(component: FileSystemComponent) {
        children.remove(component)
    }

    override fun display(indent: String) {
        println("$indent+ Directory: $name")
        children.forEach { it.display("$indent  ") }
    }
}
```

[Client]

```kotlin
fun main() {
    // Build Directories and files
    val root = Directory("Root")
    val folder1 = Directory("Folder1")
    val folder2 = Directory("Folder2")

    val file1 = File("File1.txt")
    val file2 = File("File2.txt")
    val file3 = File("File3.txt")

    // Add files & directories into directories
    root.add(folder1)
    root.add(file1)

    folder1.add(folder2)
    folder1.add(file2)

    folder2.add(file3)

    // display file structure
    root.display()
}
```

[Output]

```bash
+ Directory: Root
  + Directory: Folder1
    + Directory: Folder2
      - File: File3.txt
    - File: File2.txt
  - File: File1.txt
```

## 結論

通過套用 Composite Pattern，我們成功實現了單一檔案與目錄集合的統一操作。有效降低了系統的耦合性，並且提供了高效的擴展性，當需要新增新的檔案類型或目錄結構時，無需大幅修改現有程式碼。透過此模式，開發者能夠以簡潔且一致的方式處理樹狀結構的邏輯，提升了程式的靈活性與可維護性。

## 系列文章導覽

### 結構型設計模式系列
- [適配器模式 (Adapter Pattern)](/zh/blog/2024/design-pattern-11-adapter-pattern/) - 讓不相容的介面能夠協同工作
- [橋接模式 (Bridge Pattern)](/zh/blog/2024/design-pattern-12-bridge-pattern/) - 將抽象與實作分離，支援獨立演化
- [裝飾者模式 (Decorator Pattern)](/zh/blog/2024/design-pattern-14-decorator-pattern/) - 動態增加物件功能而不修改結構
- [外觀模式 (Facade Pattern)](/zh/blog/2024/design-pattern-15-facade-pattern/) - 提供統一介面簡化複雜子系統
- [享元模式 (Flyweight Pattern)](/zh/blog/2024/design-pattern-16-flyweight-pattern/) - 有效管理大量相似物件的記憶體使用
- [代理模式 (Proxy Pattern)](/zh/blog/2024/design-pattern-17-proxy-pattern/) - 透過智慧代理物件控制資源存取

### 行為型設計模式系列
- [責任鏈模式 (Chain of Responsibility)](/zh/blog/2024/design-pattern-18-chain-of-responsibility-pattern/) - 建立動態請求處理鏈
- [命令模式 (Command Pattern)](/zh/blog/2024/design-pattern-19-command-pattern/) - 將請求封裝為物件實現撤銷重做

### 創建型設計模式基礎
- [單例模式 (Singleton Pattern)](/zh/blog/2024/design-pattern-10-singleton-pattern/) - 確保類別只有一個實例
- [設計原則](/zh/blog/2024/design-pattern-2-design-principle/) - 掌握 SOLID 原則與設計基礎

透過組合模式，我們掌握了樹狀結構的統一操作技巧，在下一篇裝飾者模式中，我們將探討如何透過包裝技術動態擴展物件功能。
