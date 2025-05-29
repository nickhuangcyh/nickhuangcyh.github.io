---
layout: post
title: Design Pattern (4) - UML (統一建模語言)
date: 2024-07-05 23:00:00 +0800
description: 深入了解UML，學習如何用UML圖清晰展現設計模式，提升軟體設計能力。
tags: [UML]
categories: [Design Pattern]
toc:
#   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## UML (Unified Modeling Language)

UML 是一種用視覺圖形化來規劃建構軟體的方法。

{% include figure.liquid path="assets/img/design_pattern_4_uml.png" title="design_pattern_4_uml" %}

> 不要急著寫程式，尤其是遇到較複雜的功能，先思考如何設計架構畫出 UML 圖，程式才會具有可讀性、維護性及擴展性。

## Class 類別

如圖分為三列依序是

1. Class 名稱
2. Attribute 屬性
3. Operations 方法

{% include figure.liquid path="assets/img/design_pattern_4_uml_class.png" title="design_pattern_4_uml_class" %}

## Interface 介面

Interface 有兩種表示法

### 一般表示法

一般型式與 Class 並無太大區別，只要在 Class Name 上方標註 `<<interface>>` 即可

{% include figure.liquid path="assets/img/design_pattern_4_uml_interface_1.png" title="design_pattern_4_uml_interface_1" %}

### 棒棒糖表示法

用球狀來表示介面

{% include figure.liquid path="assets/img/design_pattern_4_uml_interface_2.png" title="design_pattern_4_uml_interface_2" %}

## Attribute 屬性

### Visibility 可視範圍

| Sign | Modifiers |
| ---- | --------- |
| `+` | Public    |
| `#` | Protected |
| `~` | Package   |
| `-` | Private   |

{% include figure.liquid path="assets/img/design_pattern_4_uml_attribute.png" title="design_pattern_4_uml_interface_2" %}

## Multiplicity 關聯多重性

Object 之間的數量關係，預設為 1

| Sign    | amount               |
| ------- | -------------------- |
| `1` | 1 個                 |
| `*` | 無限多個             |
| `n...m` | 至少 n 個，至多 m 個 |

## Dependency 依賴

* 表示不同對象之間相互依賴關係
* 通常用於方法的參數或回傳值
* A uses a B
* 箭頭指向要依賴的對象
* 以 `虛線` + `箭頭` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_dependency_sign.png" title="design_pattern_4_uml_dependency_sign" %}

動物使用(依賴)氧氣呼吸生存

{% include figure.liquid path="assets/img/design_pattern_4_uml_dependency.png" title="design_pattern_4_uml_dependency" %}

## Association 關聯

* 表示一個對象擁有另一個對象
* 通常用於屬性、全域變數
* A has a C
* Aggregation、Composition 為子集
* 箭頭指向要關聯的對象
* 以 `實線` + `箭頭` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_association_sign.png" title="design_pattern_4_uml_association_sign" %}

每個人有(關聯)一個地址

{% include figure.liquid path="assets/img/design_pattern_4_uml_association.png" title="design_pattern_4_uml_association" %}

## Aggregation 聚合

* 表示一個對象擁有另一個對象
* A owns a B
* Association 為超集、Composition 為子集
* 菱形指向要聚合的對象
* 弱關聯，關聯及被關聯對象可互相獨立存在
* 以 `實線` + `空心菱形` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_aggregation_sign.png" title="design_pattern_4_uml_aggregation_sign" %}

人擁有(聚合)衣服，人和衣服可以單獨存在

{% include figure.liquid path="assets/img/design_pattern_4_uml_aggregation.png" title="design_pattern_4_uml_aggregation" %}

## Composition 組合

* 表示一個對象擁有另一個對象
* C is a part of A
* Association、Aggregation 為超集
* 菱形指向要組合的對象
* 強關聯，被關聯對象不可獨立存在
* 以 `實線` + `實心菱形` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_composition_sign.png" title="design_pattern_4_uml_composition_sign" %}

人類有器官，人死了器官就無作用不存在了

> (這邊先不討論器官可移植到別人身上的情況 😂 )

{% include figure.liquid path="assets/img/design_pattern_4_uml_composition.png" title="design_pattern_4_uml_composition" %}

## Association、Aggregation 及 Composition 三者關係

> Aggregation and Composition are subsets of association meaning they are specific cases of association. In both aggregation and composition object of one class "owns" object of another class. But there is a subtle difference:
>
> - Aggregation implies a relationship where the child can exist independently of the parent. Example: Class (parent) and Student (child). Delete the Class and the Students still exist.
> - Composition implies a relationship where the child cannot exist independent of the parent. Example: House (parent) and Room (child). Rooms don't exist separate to a House.

{% include figure.liquid path="assets/img/design_pattern_4_uml_compare_association_aggregation_composition.png" title="design_pattern_4_uml_compare_association_aggregation_composition" %}

## Realization / Implementation 實現 / 實作

* 表示一個對象實作另一個對象
* B implements A
* 箭頭指向 interface
* 以 `虛線` + `空心箭頭` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_realization_implementation_sign.png" title="design_pattern_4_uml_realization_implementation_sign" %}

心、肝、胃、腸要實作器官

{% include figure.liquid path="assets/img/design_pattern_4_uml_realization_implementation.png" title="design_pattern_4_uml_realization_implementation" %}

## Generalization / Inheritance 泛化 / 繼承

* 表示一個對象繼承另一個對象
* C is-a A
* 箭頭指向 父類別
* 以 `實線` + `空心箭頭` 表示

{% include figure.liquid path="assets/img/design_pattern_4_uml_generalization_inheritance_sign.png" title="design_pattern_4_uml_generalization_inheritance_sign" %}

人是一種動物

{% include figure.liquid path="assets/img/design_pattern_4_uml_generalization_inheritance.png" title="design_pattern_4_uml_generalization_inheritance" %}

## 總結

之後的 Design Pattern 系列文章會大量使用到 UML 圖，搞懂這些圖及箭頭的含義在軟體設計上是非常有幫助的，下一篇終於要進入第一個 Design Pattern。

## 參考

* [【UML】Class Diagram 類別圖 (上)：Introduction 簡介](https://spicyboyd.blogspot.com/2018/07/umlclass-diagram-introduction.html)
* [【UML】Class Diagram 類別圖 (下)：Relationships 關係](https://spicyboyd.blogspot.com/2018/07/umlclass-diagram-relationships.html)
* [UML Relationships Types: Association, Dependency, Generalization](https://www.guru99.com/uml-relationships-with-example.html#5)
* [What is the difference between association, aggregation and composition?](https://stackoverflow.com/questions/885937/what-is-the-difference-between-association-aggregation-and-composition)
* [UML Association vs Aggregation vs Composition](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-aggregation-vs-composition/)

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長 🙂
{: .notice--success}
