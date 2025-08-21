---
layout: post
title: "設計模式（7）拽象工廠模式 Abstract Factory Pattern 完整教學：產品系列統一創建"
date: 2024-07-08 23:00:00 +0800
description: "學會 Abstract Factory Pattern 如何解決相關物件群的創建問題。從飲料店主題套裝實例深入了解如何設計統一的產品系列創建介面。包含 UML 設計、實作範例與最佳實踐。"
tags: [Abstract Factory Pattern, Design Pattern, Creational Pattern, Product Family, Object Creation, Software Architecture, OOP, Interface Design]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
tabs: true
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 引言：從單一產品到產品系列

在上一篇文章中，我們運用**工廠方法模式**成功解決了全球化擴展的挑戰，讓每個地區能夠創建符合當地偏好的飲料。然而，隨著業務的進一步發展，我們面臨著一個新的挑戰：如何管理一整個產品系列的創建？

## 需求：豐富產品線的挑戰

### 業務擴展的新需求

隨著業務的全球化擴展，我們發現僅僅提供紅茶和綠茶已經無法滿足市場需求。為了在激烈的市場競爭中脫穎而出，我們決定：

- **豐富產品線**：除了紅茶和綠茶，還要新增奶茶系列
- **同步擴展**：在新增菜單的同時繼續擴展到更多國家和地區
- **保持一致性**：確保每個地區的產品系列都符合當地文化和口味偏好

### 新的挑戰浮現

當我們開始實施這個計劃時，很快就發現了工廠方法模式在處理多產品系列時的限制。

## 物件導向分析(OOA)

### 回顧工廠方法模式的實作

讓我們回顧一下目前工廠方法模式的設計：

{% include figure.liquid path="assets/img/design_pattern_factory_method_pattern_uml_3.png" title="design_pattern_factory_method_pattern_uml_3" %}

目前的實作方式如下：

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public func createBeverage(beverageName: String) -> Beverage? {
    var beverage: Beverage?

    switch beverageName {
    case "black tea":
        beverage = EarlGreyBlackTea()
    case "green tea":
        beverage = SenchaGreenTea()
    default:
        break
    }

    return beverage
}
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
override fun createBeverage(beverageName: String): Beverage? {
    return when (beverageName) {
        "black tea" -> CeylonBlackTea()
        "green tea" -> GyokuroGreenTea()
        else -> null
    }
}
```

{% endtab %}

{% endtabs %}

### 發現問題

當我們要增加奶茶到產品線時，這種單一工廠方法的做法開始顯露出問題。我們需要一種能夠處理**多個相關產品系列**在不同地區組合的解決方案。

這正是 **Abstract Factory Pattern (抽象工廠模式)** 大顯身手的時候。

## 察覺問題 (Forces)

### 工廠方法模式的局限性

隨著產品線的擴展，我們發現了工廠方法模式在處理多產品系列時的問題：

**擴展困難**：當我們每增加一種新飲品（如奶茶）到菜單中時，必須修改所有地區工廠中的方法，這違反了**開放封閉原則 (Open Closed Principle)**。

**維護複雜**：隨著產品種類增加，每個工廠的程式碼會變得越來越龐大，維護難度也隨之提升。

**類型安全問題**：使用字串參數來決定創建哪種產品，容易出現拼寫錯誤，且編譯時期無法檢查。

我們需要一種更適合處理產品系列的解決方案。

## 套用抽象工廠模式 (Solution)

### 模式介紹

看清楚整個問題脈絡（Context）並察覺問題點（Forces）後，我們可以套用**抽象工廠模式 (Abstract Factory Pattern)** 來解決這個問題。

讓我們先了解抽象工廠模式的標準結構：

{% include figure.liquid path="assets/img/design_pattern_abstract_factory_pattern_uml_1.png" title="design_pattern_abstract_factory_pattern_uml_1" %}

**核心概念**：透過將工廠抽象化，使子類別能創建一系列相關的實體物件。

### 二維關係的判斷標準

抽象工廠模式有一個重要的判斷方式：**當你要創建的產品形成一個產品系列，且不同需求要創建不同系列時，這個關係能夠畫成二維關係表格，就非常適合使用抽象工廠模式。**

讓我們看看我們的飲料系列：

| Country / Tea | BlackTea       | GreenTea      | MilkTea                   |
| ------------- | -------------- | ------------- | ------------------------- |
| US Flavor     | Ceylon(錫蘭)   | Gyokuro(玉露) | Thai (泰奶)               |
| EU Flavor     | EarlGrey(伯爵) | Sencha(煎茶)  | Masala Chai (印度馬薩拉)) |
| JP Flavor     | Assam(阿薩姆)  | Matcha(抹茶)  | Hokkaido(北海道奶茶)      |

這個二維表格清楚地展現了我們的需求：不同地區（橫軸）需要創建不同種類的飲料系列（縱軸）。

### 應用到我們的系統

讓我們根據這個茶飲系列重新設計我們的 UML（為了清楚展示概念，我們先實作紅茶及綠茶的部分）：

{% include figure.liquid path="assets/img/design_pattern_abstract_factory_pattern_uml_2.png" title="design_pattern_abstract_factory_pattern_uml_2" %}

透過這個設計，我們得到了一個全新且更適合處理產品系列的解決方案 (Resulting Context)。

## 物件導向程式設計 (OOP)

### 實作抽象工廠模式

現在讓我們將抽象工廠模式的設計轉換為程式碼實作。關鍵的改變是將每種產品類型分別抽象化，並讓工廠為每種產品提供專門的創建方法。

{% tabs data-struct %}

{% tab data-struct Swift %}

```swift
public protocol BlackTea {
}

public class CeylonBlackTea: BlackTea {

}

public class EarlGreyBlackTea: BlackTea {

}

public protocol GreenTea {
}

public class GyokuroGreenTea: GreenTea {

}

public class SenchaGreenTea: GreenTea {

}

public protocol BeverageFactory {
    func createBlackTea() -> BlackTea?
    func createGreenTea() -> GreenTea?
}

open class USBeverageFactory: BeverageFactory {

    public init() {}

    public func createBlackTea() -> BlackTea? {
        return CeylonBlackTea()
    }

    public func createGreenTea() -> GreenTea? {
        return GyokuroGreenTea()
    }
}

open class EUBeverageFactory: BeverageFactory {

    public init() {}

    public func createBlackTea() -> BlackTea? {
        return EarlGreyBlackTea()
    }

    public func createGreenTea() -> GreenTea? {
        return SenchaGreenTea()
    }
}

let usBeverageFactory = USBeverageFactory()
let usBlackTea = usBeverageFactory.createBlackTea()
let usGreenTea = usBeverageFactory.createGreenTea()

print("usBlackTea is \(usBlackTea)")
print("usGreenTea is \(usGreenTea)")

let euBeverageFactory = EUBeverageFactory()
let euBlackTea = euBeverageFactory.createBlackTea()
let euGreenTea = euBeverageFactory.createGreenTea()

print("euBlackTea is \(euBlackTea)")
print("euGreenTea is \(euGreenTea)")
```

{% endtab %}

{% tab data-struct Kotlin %}

```kotlin
interface BlackTea {
}

class CeylonBlackTea: BlackTea {
}

class EarlGreyBlackTea: BlackTea {
}

interface GreenTea {
}

class GyokuroGreenTea: GreenTea {
}

class SenchaGreenTea: GreenTea {
}

interface BeverageFactory {
    fun createBlackTea(): BlackTea
    fun createGreenTea(): GreenTea
}

class USBeverageFactory: BeverageFactory {

    override fun createBlackTea(): BlackTea {
        return CeylonBlackTea()
    }

    override fun createGreenTea(): GreenTea {
        return GyokuroGreenTea()
    }
}

class EUBeverageFactory: BeverageFactory {

    override fun createBlackTea(): BlackTea {
        return EarlGreyBlackTea()
    }

    override fun createGreenTea(): GreenTea {
        return SenchaGreenTea()
    }
}

val usBeverageFactory = USBeverageFactory()
val usBlackTea = usBeverageFactory.createBlackTea()
val usGreenTea = usBeverageFactory.createGreenTea()

print("usBlackTea is $usBlackTea")
print("usGreenTea is $usGreenTea")

val euBeverageFactory = EUBeverageFactory()
val euBlackTea = euBeverageFactory.createBlackTea()
val euGreenTea = euBeverageFactory.createGreenTea()

print("euBlackTea is $euBlackTea")
print("euGreenTea is $euGreenTea")
```

{% endtab %}

{% endtabs %}

### 模式優勢展現

使用抽象工廠模式後，我們獲得了以下重要優勢：

**高層次抽象**：分店不需要知道實際是什麼具體的茶品，只要知道跟自己地區的飲料工廠取得紅茶、綠茶或奶茶即可。

**依賴倒置原則**：這裡完美體現了 **Dependency Inversion Principle**，工廠和產品都依賴於抽象，而非具體實作。

**類型安全**：透過專門的方法來創建不同類型的產品，避免了字串參數帶來的錯誤風險。

**易於擴展**：新增地區變得容易，只需要實作新的具體工廠即可。

## 抽象工廠模式的應用場景

### 現實世界中的二維關係範例

抽象工廠模式在許多實際的軟體開發場景中都有應用，以下是一些典型的二維關係範例：

### 跨平台 UI 開發

在開發跨平台應用時，經常遇到不同作業系統與各種 UI 元件的組合：

| OS / UI Components | Button      | Checkbox      |
| ------------------ | ----------- | ------------- |
| Linux              | LinuxButton | LinuxCheckbox |
| MacOS              | MacButton   | MacCheckbox   |
| Windows            | WinButton   | WinCheckbox   |

### 主題系統設計

現代應用程式常需要支援多種主題，這也形成了二維關係：

| Theme / UI Components | Button          | Checkbox          |
| --------------------- | --------------- | ----------------- |
| Light Mode            | LightModeButton | LightModeCheckbox |
| Dark Mode             | DarkModeButton  | DarkModeCheckbox  |

### IoT 系統架構

在物聯網系統中，不同通訊協議與各種智慧裝置的組合也是典型的應用場景：

| Protocol / Device | Dimmer   | Hue   | Thermostat   |
| ----------------- | -------- | ----- | ------------ |
| ZWave             | ZWDimmer | ZWHue | ZWThermostat |
| Zigbee            | ZBDimmer | ZBHue | ZBThermostat |

這些範例都展現了抽象工廠模式的適用性：當你需要創建一系列相關產品，且這些產品的組合呈現二維關係時。

## 工廠方法模式 vs 抽象工廠模式

### 兩種模式的比較分析

了解這兩種工廠模式的差異，有助於我們在實際開發中選擇適合的解決方案：

### Factory Method Pattern (工廠方法模式)

**適用場景**：單一產品的多種實作

- **產品擴充性**：高 - 容易新增新的產品類型
- **工廠擴充性**：中等 - 每增加一種產品需要對應的工廠
- **使用時機**：當你需要創建單一產品，但有多種不同實作時

### Abstract Factory Pattern (抽象工廠模式)

**適用場景**：產品系列的多種實作組合

- **工廠擴充性**：高 - 容易新增新的產品系列（如新地區）
- **產品擴充性**：低 - 新增產品類型時，所有具體工廠都需要修改
- **使用時機**：當你需要創建一系列相關產品，且這些產品的組合呈現二維關係時

### 選擇建議

- 如果你的需求主要是**橫向擴展**（新增系列），選擇抽象工廠模式
- 如果你的需求主要是**縱向擴展**（新增產品類型），選擇工廠方法模式

## 總結

### 模式價值

在本文中，我們深入探討了抽象工廠模式如何解決產品系列創建的挑戰。相比工廠方法模式專注於單一產品的建立，抽象工廠模式針對整個產品系列提供創建機制，在處理二維關係的產品組合時特別有效。

### 關鍵收益

- **系列化管理**：能夠統一管理一整個產品系列的創建
- **類型安全**：透過專門方法避免字串參數帶來的錯誤
- **高層抽象**：客戶端無需了解具體產品實作細節
- **易於橫向擴展**：新增產品系列變得簡單

### 適用時機

當你的系統需要處理以下情況時，考慮使用抽象工廠模式：

- 產品之間存在關聯性，形成產品系列
- 需要創建的產品組合呈現二維關係
- 系統需要在運行時切換不同的產品系列

### 運用的設計原則

抽象工廠模式體現了以下重要的 [Design Principle]({{ site.baseurl }}/design%20pattern/design-pattern-1-design-principle/)：

- **Encapsulate What Varies**：將產品系列的創建邏輯封裝在具體工廠中
- **Loose Coupling**：透過抽象介面降低客戶端與具體產品的耦合
- **Program to Interfaces**：依賴抽象工廠和抽象產品介面
- **Single Responsibility Principle**：每個具體工廠只負責一個產品系列
- **Open Closed Principle**：對新產品系列的擴展開放，對修改封閉
- **Dependency Inversion Principle**：高層模組和低層模組都依賴抽象

### 下一步展望

接下來我們將介紹**建造者模式 (Builder Pattern)**，探討當物件構造過程複雜且需要分步驟進行時的解決方案。

## 參考

- [Head First Design Patterns](https://www.tenlong.com.tw/products/9789867794529)
- [大話設計模式](https://www.tenlong.com.tw/products/9789866761799)
- [Advanced Design Patterns: Design Principles](https://www.linkedin.com/learning/advanced-design-patterns-design-principles/what-are-design-principles?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Programming Foundations: Design Patterns](https://www.linkedin.com/learning/programming-foundations-design-patterns-2/trying-interfaces?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [Design Patterns: Creational](https://www.linkedin.com/learning/design-patterns-creational/think-about-how-you-create-objects?autoAdvance=true&autoSkip=false&autoplay=true&resume=true)
- [refactoring](https://refactoring.guru/design-patterns/factory-method)

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長🙂
{: .notice--success}
