---
layout: post
title: 設計模式（4）UML 統一建模語言完整指南：類別圖與設計模式視覺化表達
date: 2024-07-05 23:00:00 +0800
description: 學會 UML 類別圖的基礎元素與關係表示法，包含 Class、Interface、繼承、關聯、組合與聚合等核心概念。掌握如何用 UML 視覺化表達設計模式，提升系統架構設計能力。
tags: [UML, Unified Modeling Language, Class Diagram, Software Design, System Architecture, Visual Modeling, Design Pattern, Object-Oriented Design]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## UML (Unified Modeling Language)

UML 是統一建模語言的縮寫，是一套標準化的視覺化建模語言。它提供了一種通用的方式，讓開發者能夠用圖形來描述軟體系統的結構和行為。

在軟體開發過程中，UML 扮演著重要的溝通橋樑角色。無論是團隊成員之間的討論，還是與客戶的需求確認，UML 圖都能夠清晰地表達複雜的軟體概念。

{% include figure.liquid path="assets/img/design_pattern_4_uml.png" title="design_pattern_4_uml" %}

> 不要急著寫程式，尤其是遇到較複雜的功能，先思考如何設計架構畫出 UML 圖，程式才會具有可讀性、維護性及擴展性。

接下來，我們將逐一介紹 UML 類別圖中最重要的元素和關係，這些概念將成為理解設計模式的基礎工具。

## Class 類別

在 UML 類別圖中，類別是最基本的建模元素。每個類別使用矩形框來表示，內部分為三個區域，由上至下依序包含：

1. **Class 名稱**：類別的識別名稱，通常使用大寫字母開頭
2. **Attribute 屬性**：類別的資料成員，定義物件的狀態
3. **Operations 方法**：類別提供的功能，定義物件的行為

這種三層結構提供了完整的類別資訊，讓開發者一眼就能了解類別的組成。

{% include figure.liquid path="assets/img/design_pattern_4_uml_class.png" title="design_pattern_4_uml_class" %}

## Interface 介面

介面 (Interface) 定義了類別必須實作的方法契約，但不包含實際的實作內容。在 UML 中，介面有兩種常見的表示方法：

### 一般表示法

這種表示法的外觀與類別相似，都是使用矩形框。區別在於需要在類別名稱上方加上 `<<interface>>` 標記，明確標示這是一個介面而非一般類別。

{% include figure.liquid path="assets/img/design_pattern_4_uml_interface_1.png" title="design_pattern_4_uml_interface_1" %}

### 棒棒糖表示法

這是一種更簡潔的表示方式，使用圓形符號來代表介面。這種表示法在複雜的類別圖中特別有用，因為它能節省空間並提高圖表的可讀性。

{% include figure.liquid path="assets/img/design_pattern_4_uml_interface_2.png" title="design_pattern_4_uml_interface_2" %}

## Attribute 屬性

屬性代表類別中的資料成員，它們定義了物件的狀態和特徵。在 UML 中，屬性的可視範圍 (Visibility) 是一個重要概念，它決定了屬性可以被哪些程式碼存取。

### Visibility 可視範圍

UML 使用特定的符號來標示屬性的可視範圍，這些符號位於屬性名稱之前：

| Sign | Modifiers | 說明 |
| ---- | --------- | ---- |
| `+`  | Public    | 公開存取，任何地方都可以存取 |
| `#`  | Protected | 受保護存取，僅限類別本身和子類別 |
| `~`  | Package   | 套件存取，同一套件內的類別可存取 |
| `-`  | Private   | 私有存取，僅限類別本身內部使用 |

正確使用可視範圍有助於實現封裝原則，保護物件內部狀態不被不當存取或修改。

{% include figure.liquid path="assets/img/design_pattern_4_uml_attribute.png" title="design_pattern_4_uml_interface_2" %}

## Multiplicity 關聯多重性

關聯多重性描述了物件之間的數量關係。當兩個類別之間存在關聯時，多重性標記能夠清楚表達每一端可以有多少個物件參與這個關聯關係。

如果沒有特別標示，預設的多重性為 1，表示一對一的關係。

| Sign    | amount               | 實際應用範例 |
| ------- | -------------------- | ------------ |
| `1`     | 1 個                 | 一個人有一個身分證 |
| `*`     | 無限多個             | 一間學校有很多學生 |
| `n...m` | 至少 n 個，至多 m 個 | 一個專案團隊有 3-10 個成員 |

理解多重性對於設計資料庫關聯和類別間的關係非常重要，它能幫助開發者正確實作物件間的互動邏輯。

## Dependency 依賴

依賴關係是 UML 中最弱的一種關聯形式，它表示一個類別在某種程度上依賴另一個類別才能正常運作。這種關係通常是暫時性的，不會在類別中建立持久的參照。

**依賴關係的特點：**
- 表示「A uses B」的關係
- 通常出現在方法參數、區域變數或回傳值中
- 依賴的類別改變可能會影響使用者類別
- 箭頭從使用者指向被依賴的對象

**圖形表示法：**以 `虛線` + `箭頭` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_dependency_sign.png" title="design_pattern_4_uml_dependency_sign" %}

**實際例子：**動物在呼吸過程中使用（依賴）氧氣來維持生存。這是一種暫時性的使用關係。

{% include figure.liquid path="assets/img/design_pattern_4_uml_dependency.png" title="design_pattern_4_uml_dependency" %}

## Association 關聯

關聯關係比依賴關係更強，它表示兩個類別之間存在持久的結構性連接。在關聯關係中，一個物件會持有另一個物件的參考，通常作為類別的屬性或全域變數存在。

**關聯關係的特點：**
- 表示「A has a B」的關係
- 建立在類別的屬性層級，是持久性的關係
- 關聯的物件在生命週期上相對獨立
- 包含了 Aggregation（聚合）和 Composition（組合）兩種特殊形式

**圖形表示法：**以 `實線` + `箭頭` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_association_sign.png" title="design_pattern_4_uml_association_sign" %}

**實際例子：**每個人都有（關聯）一個地址。人和地址之間存在明確的對應關係，但彼此可以獨立存在。

{% include figure.liquid path="assets/img/design_pattern_4_uml_association.png" title="design_pattern_4_uml_association" %}

## Aggregation 聚合

聚合是關聯關係的一種特殊形式，表示「整體-部分」的關係。在聚合關係中，整體擁有部分，但部分可以獨立於整體而存在。這是一種較弱的擁有關係。

**聚合關係的特點：**
- 表示「A owns B」的關係
- 是 Association 的特殊形式，比一般關聯更具語意
- 部分物件可以脫離整體物件而獨立存在
- 整體消失時，部分仍然可以存在
- 菱形符號指向擁有者（整體）

**圖形表示法：**以 `實線` + `空心菱形` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_aggregation_sign.png" title="design_pattern_4_uml_aggregation_sign" %}

**實際例子：**人擁有（聚合）衣服。即使這個人不存在了，衣服依然可以存在並被其他人使用。這說明了聚合關係中部分的獨立性。

{% include figure.liquid path="assets/img/design_pattern_4_uml_aggregation.png" title="design_pattern_4_uml_aggregation" %}

## Composition 組合

組合是最強的關聯關係，同樣表示「整體-部分」的關係，但與聚合不同的是，部分完全依賴整體而存在。一旦整體消失，部分也會隨之消失。

**組合關係的特點：**
- 表示「B is part of A」的關係
- 是最強烈的擁有關係
- 部分物件無法脫離整體物件而獨立存在
- 整體消失時，部分也會跟著消失
- 生命週期完全綁定
- 菱形符號指向擁有者（整體）

**圖形表示法：**以 `實線` + `實心菱形` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_composition_sign.png" title="design_pattern_4_uml_composition_sign" %}

**實際例子：**人類擁有器官，當人死亡時，器官也失去了存在的意義和功能。這種生命週期的完全依賴就是組合關係的特徵。

> (這邊先不討論器官可移植到別人身上的情況 😂 )

{% include figure.liquid path="assets/img/design_pattern_4_uml_composition.png" title="design_pattern_4_uml_composition" %}

## Association、Aggregation 及 Composition 三者關係

理解這三種關係的差異對於正確建模物件間的互動至關重要。它們代表了不同程度的耦合強度：

**關係強度遞增：**
1. **Association（關聯）**：最基本的結構性關係
2. **Aggregation（聚合）**：Association 的特殊形式，表示弱擁有關係
3. **Composition（組合）**：Association 的特殊形式，表示強擁有關係

**核心差異在於獨立性：**

> **Aggregation（聚合）** 表示子物件可以獨立於父物件存在。
> 
> 例如：班級（父）和學生（子）。即使班級被解散，學生仍然存在。
>
> **Composition（組合）** 表示子物件無法獨立於父物件存在。
> 
> 例如：房屋（父）和房間（子）。沒有房屋，房間就失去了存在的意義。

這種設計考慮會直接影響程式的記憶體管理和物件生命週期的設計。

{% include figure.liquid path="assets/img/design_pattern_4_uml_compare_association_aggregation_composition.png" title="design_pattern_4_uml_compare_association_aggregation_composition" %}

## Realization / Implementation 實現 / 實作

實現關係表示具體類別對介面契約的實作。當一個類別實作某個介面時，它必須提供介面中定義的所有方法的具體實現。

**實現關係的特點：**
- 表示「B implements A」的關係
- 介面定義方法簽章，實作類別提供具體邏輯
- 實現了多型的基礎，同一介面可有多種實作
- 箭頭從實作類別指向介面
- 支援設計原則中的「依賴抽象，不依賴具體」

**圖形表示法：**以 `虛線` + `空心箭頭` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_realization_implementation_sign.png" title="design_pattern_4_uml_realization_implementation_sign" %}

**實際例子：**心臟、肝臟、胃、腸等都必須實作「器官」介面。每個具體器官都有自己的特殊功能，但都遵循器官的基本契約。

{% include figure.liquid path="assets/img/design_pattern_4_uml_realization_implementation.png" title="design_pattern_4_uml_realization_implementation" %}

## Generalization / Inheritance 泛化 / 繼承

繼承關係表示子類別從父類別繼承屬性和方法。這是物件導向程式設計的核心概念之一，實現了程式碼重用和多型的基礎。

**繼承關係的特點：**
- 表示「C is-a A」的關係
- 子類別自動擁有父類別的所有公開和保護成員
- 子類別可以覆寫（override）父類別的方法
- 子類別可以新增自己特有的屬性和方法
- 箭頭從子類別指向父類別
- 支援多型機制，父類別變數可以參照子類別物件

**圖形表示法：**以 `實線` + `空心箭頭` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_generalization_inheritance_sign.png" title="design_pattern_4_uml_generalization_inheritance_sign" %}

**實際例子：**人類是一種動物。人類繼承了動物的基本特徵（如呼吸、進食），同時也具備人類特有的特徵（如語言、思考能力）。

{% include figure.liquid path="assets/img/design_pattern_4_uml_generalization_inheritance.png" title="design_pattern_4_uml_generalization_inheritance" %}

## 總結

UML 類別圖是軟體設計中不可或缺的溝通工具。通過本文的介紹，我們學習了：

**基本元素：**
- **Class（類別）**：三層結構的矩形框，包含名稱、屬性、方法
- **Interface（介面）**：定義契約的抽象概念，有兩種表示方法
- **Visibility（可視範圍）**：控制存取權限的符號系統

**關係類型與強度：**
1. **Dependency（依賴）**：最弱的關係，暫時性使用
2. **Association（關聯）**：基本的結構性關係，持久的連接
3. **Aggregation（聚合）**：弱擁有關係，部分可獨立存在
4. **Composition（組合）**：強擁有關係，部分完全依賴整體
5. **Realization（實作）**：介面的具體實現
6. **Inheritance（繼承）**：is-a 關係，程式碼重用的基礎

**實務應用價值：**
掌握這些 UML 概念將幫助您更好地理解接下來的設計模式文章。每個設計模式都會用 UML 圖來清楚展示類別間的關係和互動方式，讓複雜的設計概念變得直觀易懂。

準備好了嗎？下一篇文章我們將進入第一個具體的 Design Pattern，開始探索軟體設計的經典解決方案！

## 參考

- [【UML】Class Diagram 類別圖 (上)：Introduction 簡介](https://spicyboyd.blogspot.com/2018/07/umlclass-diagram-introduction.html)
- [【UML】Class Diagram 類別圖 (下)：Relationships 關係](https://spicyboyd.blogspot.com/2018/07/umlclass-diagram-relationships.html)
- [UML Relationships Types: Association, Dependency, Generalization](https://www.guru99.com/uml-relationships-with-example.html#5)
- [What is the difference between association, aggregation and composition?](https://stackoverflow.com/questions/885937/what-is-the-difference-between-association-aggregation-and-composition)
- [UML Association vs Aggregation vs Composition](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-aggregation-vs-composition/)

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長 🙂
{: .notice--success}
