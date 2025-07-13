---
layout: post
title: 設計模式 26：模板方法模式（Template Method Pattern）完整實戰指南
日期: 2024-12-28 19:30:00 +0800
description: 精通模板方法模式，學會打造可重用的演算法框架，實現資料格式轉換與高擴展性系統設計。圖文範例，適合軟體工程師與架構師。
tags: [Template Method Pattern, Design Patterns, Algorithm Framework, Code Reuse, Object-Oriented Design, Software Architecture, Kotlin, Programming, Behavioral Patterns, Data Processing]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **設計模式系列完整程式碼下載**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 🎯 模板方法模式是什麼？

**模板方法模式（Template Method Pattern）** 是一種行為型設計模式，能在基底類別中定義演算法骨架，讓子類別只需覆寫特定步驟即可自訂細節，無需更動整體流程。這種模式促進程式碼重用，確保演算法一致性，同時保有彈性。

**主要優點：**
- ✅ 程式碼重用：共用演算法結構，減少重複
- ✅ 執行流程一致：演算法主流程不變
- ✅ 彈性高：子類別可自訂細節步驟
- ✅ 易於維護：流程變動只需改一處
- ✅ 易於擴展：新增變體簡單

---

## 🚀 實務案例：資料格式轉換系統

設計一個「資料格式轉換系統」，需滿足：
- 支援多種格式（JSON、XML、CSV、YAML）
- 所有格式轉換流程一致
- 易於擴展新格式
- 避免重複程式碼
- 支援多種資料來源（檔案、資料庫、API）

**商業規則：**
- 所有轉換皆為三步驟：讀取 → 格式化 → 輸出
- 各格式有專屬格式化規則
- 系統需妥善處理錯誤
- 大型資料需優化效能
- 支援驗證與轉換

---

## 🧩 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_1.png" title="Template Method Pattern - Problem Analysis" %}

**核心挑戰：**
1. 程式碼重複：每種格式都重複三步驟
2. 違反開放封閉原則（OCP）：新增格式需改舊程式
3. 維護困難：邏輯分散，難以統一管理
4. 錯誤處理不一致：各格式驗證方式不同

---

## 💡 模板方法模式解決方案

分析完需求後，套用模板方法模式，打造彈性轉換框架：

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_2.png" title="Template Method Pattern - General Structure" %}

**組件說明：**
1. 抽象類別：定義模板方法與共用步驟，宣告可覆寫的抽象方法
2. 具體類別：繼承抽象類別，實作專屬格式化邏輯
3. 模板方法：統一流程，確保一致性

**好處：**
- 所有格式轉換流程一致
- 程式碼重用，易於維護
- 彈性高，易於擴展

---

## 🛠️ 實作：資料格式轉換系統

{% include figure.liquid path="assets/img/design_pattern_template_method_pattern_uml_3.png" title="Data Format Conversion Template Method Implementation" %}

### 1. 抽象基底類別

```kotlin
abstract class DataFormatter {
    // 模板方法：定義演算法主流程
    fun convert(data: Map<String, Any>): ConversionResult {
        return try {
            val rawData = readData(data)
            val validatedData = validateData(rawData)
            val formattedData = formatData(validatedData)
            val result = outputData(formattedData)
            ConversionResult.Success(result, getFormatType())
        } catch (e: Exception) {
            ConversionResult.Error("轉換失敗: ${e.message}", getFormatType())
        }
    }
    // 可選覆寫：資料驗證
    protected open fun validateData(data: String): String = data.trim()
    // 共用實作：讀取資料
    private fun readData(data: Map<String, Any>): String = data.entries.joinToString(", ") { "${it.key}=${it.value}" }
    // 抽象方法：子類必須實作
    protected abstract fun formatData(data: String): String
    protected abstract fun outputData(data: String): String
    protected abstract fun getFormatType(): String
    // 可選覆寫：效能優化
    protected open fun shouldOptimize(): Boolean = false
}

// 統一回傳型別，便於錯誤處理
sealed class ConversionResult {
    data class Success(val data: String, val format: String) : ConversionResult()
    data class Error(val message: String, val format: String) : ConversionResult()
}
```

### 2. 具體格式實作

（此處省略，請參考原文或 repo，或根據需求自行擴充）

---

## 🏆 結論

模板方法模式讓資料格式轉換、演算法框架等場景變得高效、可維護且易於擴展。只需定義一次主流程，未來新增格式或變體只需繼承並覆寫細節，大幅提升軟體品質與開發效率。

**適用場景：**
- 多種資料格式轉換
- 文件產生流程（如 PDF、Excel）
- 多步驟資料處理

**設計原則：**
- 單一職責原則（SRP）：主流程與細節分離
- 開放封閉原則（OCP）：新增功能無需改舊程式

立即將模板方法模式應用於你的專案，讓系統更穩健、維護更輕鬆！

