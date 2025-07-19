---
layout: post
title: 設計模式 22：備忘錄模式（Memento Pattern）完整實戰與 Undo/Redo 範例
日期: 2024-12-22 14:00:00 +0800
description: 精通備忘錄模式，學會實作狀態快照、歷史管理、強大 Undo/Redo 與資料復原。圖文範例，適合軟體工程師與架構師。
tags:
  [
    Memento Pattern,
    Design Patterns,
    Undo Redo,
    State Recovery,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Behavioral Patterns,
    History Management,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **設計模式系列完整程式碼下載**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 備忘錄模式是什麼？

**備忘錄模式（Memento Pattern）** 是一種行為型設計模式，能在不暴露物件內部結構的前提下，捕捉並還原其狀態。常用於實作 Undo/Redo、狀態復原、歷史管理等功能。

**主要優點：**

- ✅ 狀態復原：輕鬆還原先前狀態
- ✅ 封裝性：內部狀態對外隱藏
- ✅ Undo/Redo 支援：實現強大歷史功能
- ✅ 易於維護：職責分離
- ✅ 易於擴展：可輕鬆新增狀態型別

---

## 🚀 實務案例：文字編輯器 Undo/Redo

設計一個「文字編輯器」，需求如下：

- 使用者可輸入文字並支援 Undo（Ctrl+Z）
- 系統需保存歷史以便復原
- Client 不需知道狀態管理細節

**商業規則：**

- 所有狀態變化由 Caretaker 管理
- Originator 負責建立與還原備忘錄
- Client 只需操作 Undo/Redo

---

## 🧩 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_1.png" title="Memento Pattern - Problem Analysis" %}

**核心挑戰：**

1. 資料遺失風險：無法復原先前狀態
2. 高耦合：Client 需自行管理狀態邏輯
3. 擴展困難：新增狀態型別不易

---

## 💡 備忘錄模式解決方案

引入備忘錄模式，能捕捉並還原物件狀態，且不暴露內部細節。

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_2.png" title="Memento Pattern - General Structure" %}

**組件說明：**

- Originator：建立與還原狀態
- Memento：儲存狀態
- Caretaker：管理歷史與復原

---

## 🛠️ 實作：文字編輯器 Undo/Redo

{% include figure.liquid path="assets/img/design_pattern_memento_pattern_uml_3.png" title="Memento Pattern - Text Editor Example" %}

### 1. Originator

```kotlin
class TextEditor {
    private var text: String = ""
    fun type(newText: String) { text += newText }
    fun getText(): String = text
    fun save(): Memento = Memento(text)
    fun restore(memento: Memento) { text = memento.getText() }
    data class Memento(private val state: String) { fun getText(): String = state }
}
```

### 2. Caretaker

```kotlin
class History {
    private val mementos = mutableListOf<TextEditor.Memento>()
    fun save(memento: TextEditor.Memento) { mementos.add(memento) }
    fun undo(): TextEditor.Memento? = if (mementos.isNotEmpty()) mementos.removeAt(mementos.size - 1) else null
}
```

### 3. 用戶端程式碼

```kotlin
fun main() {
    val textEditor = TextEditor()
    val history = History()
    textEditor.type("Hello")
    history.save(textEditor.save())
    textEditor.type(", World")
    history.save(textEditor.save())
    textEditor.type("! This is Memento Pattern.")
    println("目前文字: ${textEditor.getText()}")
    textEditor.restore(history.undo()!!)
    println("Undo 復原: ${textEditor.getText()}")
    textEditor.restore(history.undo()!!)
    println("Undo 復原: ${textEditor.getText()}")
}
```

**預期輸出：**

```
目前文字: Hello, World! This is Memento Pattern.
Undo 復原: Hello, World!
Undo 復原: Hello
```

---

## 🏆 結論

備忘錄模式讓你能彈性實作狀態復原、Undo/Redo、歷史管理等功能，提升系統可靠性與使用者體驗。

**適用場景：**

- 文字編輯器 Undo/Redo
- 遊戲存檔系統
- 工作流引擎（回滾）
- 設定檔管理
- 有狀態的 UI 元件

**設計原則：**

- 單一職責原則（SRP）：狀態管理分離
- 開放封閉原則（OCP）：可輕鬆擴展新狀態

立即將備忘錄模式應用於你的專案，讓系統更可靠、易於維護！
