---
layout: post
title: "設計模式 11：介面卡模式（Adapter Pattern）——跨系統整合與相容性最佳實踐"
date: 2024-12-07 23:00:00 +0800
description: "精通介面卡模式，學會讓不相容介面協同運作，整合舊系統與新架構，打造靈活可擴展的軟體。以股票資料整合為例，圖文範例與進階應用。"
tags:
  [
    Adapter Pattern,
    Design Patterns,
    Interface Compatibility,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Structural Patterns,
    Legacy Integration,
    API Integration,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **下載完整設計模式系列程式碼**：[design_pattern repository](https://github.com/nickhuangcyh/design_pattern)

---

## 什麼是介面卡模式（Adapter Pattern）？

介面卡模式是一種結構型設計模式，讓不相容的介面能協同運作。它透過包裝（Wrapper）現有類別，建立一個新介面，讓原本無法直接合作的物件能無縫整合。

**主要優點：**

- 介面相容性：讓不相容介面協同運作
- 舊系統整合：無痛整合舊有系統與新架構
- 第三方整合：輕鬆串接外部 API 與函式庫
- 程式碼重用：無需修改原有程式即可重用
- 彈性擴展：支援多種介面變體

---

## 實務情境：股票資料整合系統

設計一個股票資料整合系統，需求如下：

- 整合現有 XML 股票系統與新 JSON 分析系統
- 支援多種資料格式（XML、JSON、CSV）
- 維持對舊 XML 系統的相容性
- 提供統一介面給所有資料來源
- 實現即時資料處理與錯誤復原

---

## 物件導向分析（OOA）

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_1.png" title="Adapter Pattern - 問題分析" %}

### 設計痛點

1. 介面不相容：XML 與 JSON 系統介面不同，無法直接整合
2. 舊系統限制：無法修改既有 XML 系統，需維持相容
3. 整合複雜度：需進行資料格式轉換與錯誤處理

---

## 介面卡模式解決方案

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_2.png" title="Adapter Pattern - 一般結構" %}

### 組成元件

1. 目標介面（Target Interface）：客戶端期望的介面
2. 被適配者（Adaptee）：現有但不相容的類別
3. 介面卡（Adapter）：負責轉換與包裝
4. 客戶端（Client）：只與目標介面互動

**優點：**

- 無縫整合：客戶端只需面對統一介面
- 不動舊程式：舊系統無需修改
- 彈性設計：可針對不同來源設計多個 Adapter
- 易於測試：可針對 Adapter 做單元測試

---

## 實作：股票資料整合系統

{% include figure.liquid path="assets/img/design_pattern_adapter_pattern_uml_3.png" title="股票資料整合 Adapter 實作" %}

### 1. 目標介面（JSON 分析器）

```kotlin
interface JsonAnalyzer {
    fun analyzeJsonData(json: String): AnalysisResult
    fun validateJsonData(json: String): ValidationResult
    fun getSupportedFormats(): List<String>
}

data class AnalysisResult(
    val success: Boolean,
    val data: Map<String, Any>,
    val timestamp: Long,
    val processingTime: Long,
    val errors: List<String> = emptyList()
)

data class ValidationResult(
    val isValid: Boolean,
    val errors: List<String> = emptyList(),
    val warnings: List<String> = emptyList()
)
```

### 2. 被適配者（XML 股票資料系統）

```kotlin
class XmlStockData {
    private val stockData = mapOf(
        "stocks" to listOf(
            mapOf(
                "symbol" to "TSLA",
                "price" to "675.50",
                "volume" to "12500000",
                "change" to "+12.30",
                "changePercent" to "+1.86%"
            ),
            mapOf(
                "symbol" to "AMZN",
                "price" to "3201.65",
                "volume" to "8900000",
                "change" to "-15.20",
                "changePercent" to "-0.47%"
            ),
            mapOf(
                "symbol" to "GOOGL",
                "price" to "2850.25",
                "volume" to "15600000",
                "change" to "+8.75",
                "changePercent" to "+0.31%"
            )
        )
    )

    fun getXmlData(): String {
        return buildString {
            appendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
            appendLine("<stocks>")
            stockData["stocks"]?.forEach { stock ->
                appendLine("  <stock>")
                appendLine("    <symbol>${stock["symbol"]}</symbol>")
                appendLine("    <price>${stock["price"]}</price>")
                appendLine("    <volume>${stock["volume"]}</volume>")
                appendLine("    <change>${stock["change"]}</change>")
                appendLine("    <changePercent>${stock["changePercent"]}</changePercent>")
                appendLine("  </stock>")
            }
            appendLine("</stocks>")
        }
    }

    fun getStockCount(): Int = stockData["stocks"]?.size ?: 0

    fun getLastUpdateTime(): Long = System.currentTimeMillis()
}
```

### 3. 介面卡實作

```kotlin
class StockDataAdapter(
    private val xmlStockData: XmlStockData
) : JsonAnalyzer {

    override fun analyzeJsonData(json: String): AnalysisResult {
        val startTime = System.currentTimeMillis()

        return try {
            // Parse JSON data
            val jsonData = parseJson(json)

            // Perform analysis
            val analysisData = performAnalysis(jsonData)

            val processingTime = System.currentTimeMillis() - startTime

            AnalysisResult(
                success = true,
                data = analysisData,
                timestamp = System.currentTimeMillis(),
                processingTime = processingTime
            )

        } catch (e: Exception) {
            AnalysisResult(
                success = false,
                data = emptyMap(),
                timestamp = System.currentTimeMillis(),
                processingTime = System.currentTimeMillis() - startTime,
                errors = listOf("Analysis failed: ${e.message}")
            )
        }
    }

    override fun validateJsonData(json: String): ValidationResult {
        return try {
            parseJson(json)
            ValidationResult(isValid = true)
        } catch (e: Exception) {
            ValidationResult(
                isValid = false,
                errors = listOf("Invalid JSON: ${e.message}")
            )
        }
    }

    override fun getSupportedFormats(): List<String> = listOf("JSON", "XML")

    // Adapter-specific method to convert XML to JSON
    fun convertAndAnalyze(): AnalysisResult {
        val startTime = System.currentTimeMillis()

        return try {
            // Get XML data from existing system
            val xmlData = xmlStockData.getXmlData()

            // Convert XML to JSON
            val jsonData = convertXmlToJson(xmlData)

            // Analyze the converted data
            val analysisData = performAnalysis(jsonData)

            val processingTime = System.currentTimeMillis() - startTime

            AnalysisResult(
                success = true,
                data = analysisData,
                timestamp = System.currentTimeMillis(),
                processingTime = processingTime
            )

        } catch (e: Exception) {
            AnalysisResult(
                success = false,
                data = emptyMap(),
                timestamp = System.currentTimeMillis(),
                processingTime = System.currentTimeMillis() - startTime,
                errors = listOf("Conversion failed: ${e.message}")
            )
        }
    }

    private fun convertXmlToJson(xml: String): Map<String, Any> {
        // Simulate XML to JSON conversion
        return mapOf(
            "stocks" to listOf(
                mapOf(
                    "symbol" to "TSLA",
                    "price" to 675.50,
                    "volume" to 12500000,
                    "change" to 12.30,
                    "changePercent" to 1.86
                ),
                mapOf(
                    "symbol" to "AMZN",
                    "price" to 3201.65,
                    "volume" to 8900000,
                    "change" to -15.20,
                    "changePercent" to -0.47
                ),
                mapOf(
                    "symbol" to "GOOGL",
                    "price" to 2850.25,
                    "volume" to 15600000,
                    "change" to 8.75,
                    "changePercent" to 0.31
                )
            ),
            "metadata" to mapOf(
                "source" to "XML System",
                "conversionTime" to System.currentTimeMillis(),
                "totalStocks" to xmlStockData.getStockCount()
            )
        )
    }

    private fun parseJson(json: String): Map<String, Any> {
        // Simulate JSON parsing
        return mapOf("parsed" to true, "data" to json)
    }

    private fun performAnalysis(data: Map<String, Any>): Map<String, Any> {
        val stocks = data["stocks"] as? List<Map<String, Any>> ?: emptyList()

        val totalValue = stocks.sumOf {
            (it["price"] as? Number)?.toDouble() ?: 0.0
        }
        val averagePrice = if (stocks.isNotEmpty()) totalValue / stocks.size else 0.0
        val totalVolume = stocks.sumOf {
            (it["volume"] as? Number)?.toLong() ?: 0L
        }

        return mapOf(
            "summary" to mapOf(
                "totalStocks" to stocks.size,
                "totalValue" to totalValue,
                "averagePrice" to averagePrice,
                "totalVolume" to totalVolume
            ),
            "topPerformers" to stocks
                .filter { (it["changePercent"] as? Number)?.toDouble() ?: 0.0 > 0 }
                .sortedByDescending { (it["changePercent"] as? Number)?.toDouble() ?: 0.0 }
                .take(3),
            "worstPerformers" to stocks
                .filter { (it["changePercent"] as? Number)?.toDouble() ?: 0.0 < 0 }
                .sortedBy { (it["changePercent"] as? Number)?.toDouble() ?: 0.0 }
                .take(3),
            "analysis" to mapOf(
                "timestamp" to System.currentTimeMillis(),
                "dataSource" to "XML Adapter"
            )
        )
    }
}
```

### 4. 進階多來源介面卡

```kotlin
class MultiSourceStockAdapter : JsonAnalyzer {
    private val xmlAdapter = StockDataAdapter(XmlStockData())
    private val csvAdapter = CsvStockDataAdapter()
    private val jsonAdapter = DirectJsonAdapter()

    override fun analyzeJsonData(json: String): AnalysisResult {
        return jsonAdapter.analyzeJsonData(json)
    }

    override fun validateJsonData(json: String): ValidationResult {
        return jsonAdapter.validateJsonData(json)
    }

    override fun getSupportedFormats(): List<String> = listOf("JSON", "XML", "CSV")

    fun analyzeFromXml(): AnalysisResult = xmlAdapter.convertAndAnalyze()

    fun analyzeFromCsv(csvData: String): AnalysisResult = csvAdapter.convertAndAnalyze(csvData)

    fun analyzeFromJson(jsonData: String): AnalysisResult = jsonAdapter.analyzeJsonData(jsonData)
}

class CsvStockDataAdapter {
    fun convertAndAnalyze(csvData: String): AnalysisResult {
        // Simulate CSV to JSON conversion and analysis
        return AnalysisResult(
            success = true,
            data = mapOf("source" to "CSV", "converted" to true),
            timestamp = System.currentTimeMillis(),
            processingTime = 50
        )
    }
}

class DirectJsonAdapter : JsonAnalyzer {
    override fun analyzeJsonData(json: String): AnalysisResult {
        return AnalysisResult(
            success = true,
            data = mapOf("source" to "JSON", "direct" to true),
            timestamp = System.currentTimeMillis(),
            processingTime = 10
        )
    }

    override fun validateJsonData(json: String): ValidationResult {
        return ValidationResult(isValid = true)
    }

    override fun getSupportedFormats(): List<String> = listOf("JSON")
}
```

### 5. 客戶端範例

```kotlin
fun main() {
    println("=== Stock Data Integration Demo ===\n")

    // Create adapter
    val adapter = StockDataAdapter(XmlStockData())
    val multiAdapter = MultiSourceStockAdapter()

    // Test XML to JSON conversion and analysis
    println("📊 Analyzing stock data from XML system...")
    val xmlResult = adapter.convertAndAnalyze()

    if (xmlResult.success) {
        println("✅ XML analysis successful!")
        println("📈 Processing time: ${xmlResult.processingTime}ms")
        println("📊 Analysis results:")

        val summary = xmlResult.data["summary"] as? Map<String, Any>
        println("   • Total Stocks: ${summary?.get("totalStocks")}")
        println("   • Total Value: $${summary?.get("totalValue")}")
        println("   • Average Price: $${summary?.get("averagePrice")}")
        println("   • Total Volume: ${summary?.get("totalVolume")}")

        val topPerformers = xmlResult.data["topPerformers"] as? List<Map<String, Any>>
        println("   • Top Performers: ${topPerformers?.map { "${it["symbol"]} (+${it["changePercent"]}%)" }}")

    } else {
        println("❌ XML analysis failed: ${xmlResult.errors}")
    }

    println()

    // Test direct JSON analysis
    println("📊 Analyzing direct JSON data...")
    val jsonData = """
    {
        "stocks": [
            {"symbol": "AAPL", "price": 150.25, "change": 2.50},
            {"symbol": "MSFT", "price": 280.75, "change": -1.25}
        ]
    }
    """.trimIndent()

    val jsonResult = adapter.analyzeJsonData(jsonData)
    if (jsonResult.success) {
        println("✅ JSON analysis successful!")
        println("📈 Processing time: ${jsonResult.processingTime}ms")
    } else {
        println("❌ JSON analysis failed: ${jsonResult.errors}")
    }

    println()

    // Test multi-source adapter
    println("🔄 Testing multi-source adapter...")
    println("📋 Supported formats: ${multiAdapter.getSupportedFormats()}")

    val xmlMultiResult = multiAdapter.analyzeFromXml()
    val csvMultiResult = multiAdapter.analyzeFromCsv("AAPL,150.25,2.50")
    val jsonMultiResult = multiAdapter.analyzeFromJson(jsonData)

    println("✅ Multi-source analysis complete!")
    println("   • XML: ${if (xmlMultiResult.success) "✅" else "❌"}")
    println("   • CSV: ${if (csvMultiResult.success) "✅" else "❌"}")
    println("   • JSON: ${if (jsonMultiResult.success) "✅" else "❌"}")

    println()

    // Performance comparison
    println("📊 Performance Comparison:")
    println("   • XML Analysis: ${xmlResult.processingTime}ms")
    println("   • JSON Analysis: ${jsonResult.processingTime}ms")
    println("   • Direct JSON: ${jsonMultiResult.processingTime}ms")
}
```

**Expected Output:**

```
=== Stock Data Integration Demo ===

📊 Analyzing stock data from XML system...
✅ XML analysis successful!
📈 Processing time: 45ms
📊 Analysis results:
   • Total Stocks: 3
   • Total Value: 6727.4
   • Average Price: 2242.47
   • Total Volume: 37000000
   • Top Performers: [TSLA (+1.86%), GOOGL (+0.31%)]

📊 Analyzing direct JSON data...
✅ JSON analysis successful!
📈 Processing time: 12ms

🔄 Testing multi-source adapter...
📋 Supported formats: [JSON, XML, CSV]
✅ Multi-source analysis complete!
   • XML: ✅
   • CSV: ✅
   • JSON: ✅

📊 Performance Comparison:
   • XML Analysis: 45ms
   • JSON Analysis: 12ms
   • Direct JSON: 10ms
```

---

## 介面卡模式 vs 其他做法

| 做法       | 優點                               | 缺點                                   |
| ---------- | ---------------------------------- | -------------------------------------- |
| 介面卡模式 | 介面相容、無需動舊程式、可重用設計 | 增加一層包裝、潛在效能損耗、複雜度提升 |
| 直接修改   | 無包裝開銷、直接整合、實作簡單     | 破壞既有程式、高風險、維護困難         |
| 包裝類別   | 封裝、介面乾淨                     | 目的不同（封裝 vs 相容）               |
| 介面分離   | 介面清晰、設計佳                   | 需重構系統、不一定可行                 |

---

## 什麼時候用介面卡模式？

**適合：**

- 舊系統整合（無法修改原始碼）
- 第三方 API 串接
- 介面不相容但需協同運作
- 多格式資料轉換

**不適合：**

- 介面變動頻繁（維護成本高）
- 效能極度敏感（多一層包裝有損耗）
- 新系統設計（建議直接設計相容介面）

---

## 進階應用：快取、錯誤復原、監控

### 1. 快取型介面卡

```kotlin
class CachedStockDataAdapter(
    private val xmlStockData: XmlStockData,
    private val cache: MutableMap<String, AnalysisResult> = mutableMapOf(),
    private val cacheTimeout: Long = 60000 // 1 minute
) : JsonAnalyzer {

    override fun analyzeJsonData(json: String): AnalysisResult {
        val cacheKey = "json_${json.hashCode()}"
        val cached = cache[cacheKey]

        if (cached != null && !isExpired(cached.timestamp)) {
            println("📋 Returning cached result for JSON analysis")
            return cached
        }

        val result = performJsonAnalysis(json)
        cache[cacheKey] = result
        return result
    }

    fun convertAndAnalyze(): AnalysisResult {
        val cacheKey = "xml_conversion"
        val cached = cache[cacheKey]

        if (cached != null && !isExpired(cached.timestamp)) {
            println("📋 Returning cached result for XML conversion")
            return cached
        }

        val result = performXmlConversion()
        cache[cacheKey] = result
        return result
    }

    private fun isExpired(timestamp: Long): Boolean {
        return System.currentTimeMillis() - timestamp > cacheTimeout
    }

    private fun performJsonAnalysis(json: String): AnalysisResult {
        // Implementation for JSON analysis
        return AnalysisResult(
            success = true,
            data = mapOf("source" to "JSON", "cached" to false),
            timestamp = System.currentTimeMillis(),
            processingTime = 15
        )
    }

    private fun performXmlConversion(): AnalysisResult {
        // Implementation for XML conversion
        return AnalysisResult(
            success = true,
            data = mapOf("source" to "XML", "cached" to false),
            timestamp = System.currentTimeMillis(),
            processingTime = 50
        )
    }

    fun clearCache() {
        cache.clear()
        println("🗑️ Cache cleared")
    }

    fun getCacheSize(): Int = cache.size
}
```

### 2. 錯誤復原型介面卡

```kotlin
class ResilientStockDataAdapter(
    private val xmlStockData: XmlStockData,
    private val maxRetries: Int = 3
) : JsonAnalyzer {

    override fun analyzeJsonData(json: String): AnalysisResult {
        return retryOperation("JSON Analysis") {
            performJsonAnalysis(json)
        }
    }

    fun convertAndAnalyze(): AnalysisResult {
        return retryOperation("XML Conversion") {
            performXmlConversion()
        }
    }

    private fun <T> retryOperation(operationName: String, operation: () -> T): T {
        var lastException: Exception? = null

        for (attempt in 1..maxRetries) {
            try {
                return operation()
            } catch (e: Exception) {
                lastException = e
                println("⚠️ $operationName attempt $attempt failed: ${e.message}")

                if (attempt < maxRetries) {
                    val delay = attempt * 1000L // Exponential backoff
                    println("⏳ Retrying in ${delay}ms...")
                    Thread.sleep(delay)
                }
            }
        }

        throw RuntimeException("$operationName failed after $maxRetries attempts", lastException)
    }

    private fun performJsonAnalysis(json: String): AnalysisResult {
        // Simulate potential failure
        if (Math.random() < 0.3) {
            throw RuntimeException("Simulated JSON analysis failure")
        }

        return AnalysisResult(
            success = true,
            data = mapOf("source" to "JSON", "retry" to false),
            timestamp = System.currentTimeMillis(),
            processingTime = 20
        )
    }

    private fun performXmlConversion(): AnalysisResult {
        // Simulate potential failure
        if (Math.random() < 0.2) {
            throw RuntimeException("Simulated XML conversion failure")
        }

        return AnalysisResult(
            success = true,
            data = mapOf("source" to "XML", "retry" to false),
            timestamp = System.currentTimeMillis(),
            processingTime = 60
        )
    }
}
```

### 3. 監控型介面卡

```kotlin
class MonitoredStockDataAdapter(
    private val adapter: JsonAnalyzer,
    private val monitor: AdapterMonitor
) : JsonAnalyzer {

    override fun analyzeJsonData(json: String): AnalysisResult {
        val startTime = System.currentTimeMillis()

        return try {
            monitor.recordOperation("json_analysis", startTime)
            val result = adapter.analyzeJsonData(json)
            monitor.recordSuccess("json_analysis", System.currentTimeMillis() - startTime)
            result
        } catch (e: Exception) {
            monitor.recordError("json_analysis", e.message ?: "Unknown error")
            throw e
        }
    }

    override fun validateJsonData(json: String): ValidationResult {
        return adapter.validateJsonData(json)
    }

    override fun getSupportedFormats(): List<String> = adapter.getSupportedFormats()
}

class AdapterMonitor {
    private val operations = mutableListOf<OperationRecord>()
    private val errors = mutableListOf<ErrorRecord>()

    fun recordOperation(type: String, startTime: Long) {
        operations.add(OperationRecord(type, startTime, null, null))
        println("📊 Started operation: $type")
    }

    fun recordSuccess(type: String, duration: Long) {
        operations.lastOrNull { it.type == type && it.duration == null }?.let {
            it.duration = duration
            it.success = true
        }
        println("✅ Operation completed: $type (${duration}ms)")
    }

    fun recordError(type: String, error: String) {
        errors.add(ErrorRecord(type, error, System.currentTimeMillis()))
        operations.lastOrNull { it.type == type && it.duration == null }?.let {
            it.duration = System.currentTimeMillis() - it.startTime
            it.success = false
        }
        println("❌ Operation failed: $type - $error")
    }

    fun getReport(): String {
        val successfulOps = operations.filter { it.success == true }
        val failedOps = operations.filter { it.success == false }
        val avgDuration = successfulOps.mapNotNull { it.duration }.average()

        return buildString {
            appendLine("=== Adapter Monitor Report ===")
            appendLine("Total Operations: ${operations.size}")
            appendLine("Successful: ${successfulOps.size}")
            appendLine("Failed: ${failedOps.size}")
            appendLine("Average Duration: ${String.format("%.2f", avgDuration)}ms")
            appendLine("Recent Errors:")
            errors.takeLast(3).forEach { error ->
                appendLine("  - ${error.type}: ${error.message}")
            }
            appendLine("=============================")
        }
    }
}

data class OperationRecord(
    val type: String,
    val startTime: Long,
    var duration: Long?,
    var success: Boolean?
)

data class ErrorRecord(
    val type: String,
    val message: String,
    val timestamp: Long
)
```

---

## 結論

介面卡模式是整合舊系統、第三方 API、異質資料來源的最佳利器。它能讓不相容介面協同運作，提升系統彈性與可維護性。無論是資料格式轉換、API 串接還是跨平台整合，介面卡模式都能大幅簡化開發與維護成本。

> 歡迎收藏本系列，持續關注更多設計模式與軟體架構實戰！
