---
layout: post
title: Design Pattern (16) - Flyweight Pattern (享元模式)
date: 2024-12-14 15:00:00 +0800
description: 探索享元模式如何透過共享技術有效減少記憶體使用，提升應用效能。
tags: [Flyweight Pattern]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

假設我們正在開發一個森林場景的渲染系統。該系統需要在螢幕上顯示數百棵甚至數千棵樹木，為遊戲或視覺化應用提供豐富的森林環境。

在設計這個系統時，我們發現每棵樹包含兩類不同性質的資料：

1. **內部狀態 (Intrinsic State)**：不隨環境改變的共同資料，例如樹的種類、顏色、紋理等。這些資料在所有相同種類的樹之間都是一致的。
2. **外部狀態 (Extrinsic State)**：因環境位置而異的獨特資料，例如每棵樹在畫面上的座標 (x, y)。

**問題的核心**：如果為每棵樹都建立完整的物件，將導致記憶體消耗過大。想像一下，當我們需要渲染 10,000 棵橡樹時，每個樹物件都儲存著相同的種類、顏色和紋理資訊。

因此，我們需要一種能夠共享內部狀態的方式來優化記憶體使用。

## 物件導向分析 (OOA)

理解需求後，讓我們來快速實作物件導向分析吧！

{% include figure.liquid path="assets/img/design_pattern_flyweight_pattern_uml_1.png" title="design_pattern_flyweight_pattern_uml_1" %}

## 察覺 Forces

在深入分析設計需求時，我們識別出了三個主要的設計挑戰：

**1. 大量重複資料問題**
每棵樹都包含相同的種類、顏色和紋理資料。這種重複儲存造成了不必要的記憶體浪費，特別是當森林中有成千上萬棵相同種類的樹時。

**2. 效能瓶頸問題**
對於需要渲染數千棵樹的大型場景，過多的物件實例會導致記憶體不足或嚴重的效能瓶頸。系統可能因為記憶體壓力而變得緩慢或甚至崩潰。

**3. 共享與獨立性的平衡問題**
我們需要在共享通用資料的同時，確保每棵樹仍能保有其獨立的位置資訊。這個平衡點的拿捏是設計的關鍵。

**解決方案導向**：面對這些挑戰，享元模式 (Flyweight Pattern) 提供了一個優雅的解決方案，讓我們能夠有效地共享物件的內部狀態。

## 套用 Flyweight Pattern (Solution) 得到新的 Context (Resulting Context)

現在我們已經完成了物件導向分析，並清楚識別出了設計中的各種限制與挑戰。接下來，讓我們套用享元模式來解決這個記憶體最佳化問題。

首先，讓我們瞭解享元模式的通用結構：

{% include figure.liquid path="assets/img/design_pattern_flyweight_pattern_uml_2.png" title="design_pattern_flyweight_pattern_uml_2" %}

享元模式包含四個核心角色，每個都有其特定的職責：

- **Flyweight (享元介面)**：定義所有享元物件必須實作的共同介面，規範共享物件的操作方法。
- **ConcreteFlyweight (具體享元類別)**：實作享元介面的具體類別，負責儲存和管理可以共享的內部狀態。
- **FlyweightFactory (享元工廠)**：負責創建和管理享元物件的工廠類別，確保相同特徵的物件只會被創建一次，並提供快速存取機制。
- **Client (客戶端)**：使用享元物件的程式碼，同時負責管理和傳遞不能共享的外部狀態。

**套用到我們的森林渲染系統**

現在讓我們將這個模式的概念具體應用到我們的樹木渲染需求中：

{% include figure.liquid path="assets/img/design_pattern_flyweight_pattern_uml_3.png" title="design_pattern_flyweight_pattern_uml_3" %}

## 物件導向程式設計 (OOP)

**步驟一：定義享元物件與上下文物件**

我們將樹的資料分離成兩個類別：`TreeType`（享元物件，儲存共享的內部狀態）和 `Tree`（上下文物件，儲存獨特的外部狀態）。

```kotlin
class Tree(
    private val x: Int,
    private val y: Int,
    private val type: TreeType
) {
    fun draw() {
        type.draw(x, y)
    }
}

class TreeType(
    val name: String,
    val color: String,
    val texture: String
) {
    fun draw(x: Int, y: Int) {
        println("Drawing tree: $name, color: $color, texture: $texture at ($x, $y)")
    }
}
```

**步驟二：建立享元工廠**

`TreeFactory` 負責管理和複用 `TreeType` 物件，確保相同特徵的樹種只會被創建一次。

```kotlin
object TreeFactory {
    private val treeTypes = mutableMapOf<String, TreeType>()

    fun getTreeType(name: String, color: String, texture: String): TreeType {
        return treeTypes.computeIfAbsent(name) {
            println("Creating new TreeType: $name")
            TreeType(name, color, texture)
        }
    }
}
```

**步驟三：實作客戶端管理類別**

`Forest` 類別作為客戶端，負責管理所有樹木物件並協調內部狀態與外部狀態的結合。

```kotlin
class Forest {
    private val trees = mutableListOf<Tree>()

    fun plantTree(x: Int, y: Int, name: String, color: String, texture: String) {
        val treeType = TreeFactory.getTreeType(name, color, texture)
        val tree = Tree(x, y, treeType)
        trees.add(tree)
    }

    fun draw() {
        for (tree in trees) {
            tree.draw()
        }
    }
}
```

**步驟四：測試與驗證**

透過主函式來測試我們的享元模式實作，觀察記憶體最佳化的效果。

```kotlin
fun main() {
    val forest = Forest()

    // Planting trees in the forest
    forest.plantTree(10, 20, "Oak", "Green", "Rough")
    forest.plantTree(15, 25, "Pine", "Dark Green", "Smooth")
    forest.plantTree(10, 20, "Oak", "Green", "Rough") // Reuses the same TreeType as the first Oak

    // Draw all trees
    forest.draw()
}
```

**執行結果分析**

從輸出結果可以清楚看到享元模式的核心效益：

```bash
Creating new TreeType: Oak
Creating new TreeType: Pine
Drawing tree: Oak, color: Green, texture: Rough at (10, 20)
Drawing tree: Pine, color: Dark Green, texture: Smooth at (15, 25)
Drawing tree: Oak, color: Green, texture: Rough at (10, 20)
```

## 結論

## 享元模式的核心效益

透過實作享元模式，我們成功達成了以下關鍵改善：

**記憶體最佳化**：透過共享技術，大幅降低了系統的記憶體使用量。在我們的範例中，即使種植了多棵相同種類的樹，`TreeType` 物件只會被創建一次。

**效能提升**：減少物件創建的開銷，提升了整體系統效能，特別是在處理大量相似物件時更為明顯。

**良好的可擴展性**：新增不同種類的樹木變得簡單，只需要在工廠中註冊新的樹種即可。

## 適用場景與注意事項

享元模式特別適合以下應用情境：
- **文字編輯器**：字元物件的共享（相同字元、字型、大小的文字）
- **遊戲開發**：場景中大量相似的遊戲物件（子彈、粒子效果、NPC）
- **圖形渲染**：重複的圖形元素或材質

**設計時的關鍵考量**：使用享元模式時，最重要的是正確區分內部狀態與外部狀態。內部狀態必須是可以安全共享的不變資料，而外部狀態則是每個物件實例的獨特資訊。只有清楚掌握這個區別，才能確保系統設計的正確性與靈活性。
