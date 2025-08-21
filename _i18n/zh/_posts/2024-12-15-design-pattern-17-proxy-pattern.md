---
layout: post
title: "設計模式（17）代理模式：智能快取系統設計指南 Proxy Pattern"
date: 2024-12-15 21:30:00 +0800
description: "深入解析代理模式 Proxy Pattern 實作技巧，學習透過智慧代理物件控制存取權限，實現快取機制與效能優化，掌握結構型設計模式的進階應用技術。"
tags: [Design Patterns, Proxy Pattern, Structural Patterns, Software Architecture, OOP, Kotlin, Java, Caching, Performance Optimization]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 您可於此 [design_pattern repo](https://github.com/nickhuangcyh/design_pattern) 下載 Design Pattern 系列程式碼。

## 需求

想像我們正在開發一個現代化的影片播放應用。在這個數位時代，影片內容通常存儲在遠端服務器上（例如 YouTube），每次觀看都需要透過網路下載。

這個下載過程不僅消耗大量頻寬，也需要等待時間。如果使用者反覆觀看同一部影片，重複下載顯然是浪費資源的做法。

我們的系統需要滿足以下三個核心需求：

**1. 智慧快取機制**

當應用播放多個影片時，必須避免重複下載相同內容。每次重新下載不僅浪費頻寬，更會嚴重影響用戶體驗。

**2. 懶惰載入 (Lazy Loading)**

影片應該採用「按需下載」的策略。也就是說，只有在用戶第一次請求播放時才進行下載。之後的播放請求則直接從本地快取中取得，有效節省系統資源。

**3. 透明性與簡化**

最重要的是，系統必須提供一個透明的操作介面。客戶端代碼不需要知道影片資料是來自網路下載還是本地快取。這種設計大幅降低了程式碼複雜度，讓開發更加簡潔。

## 物件導向分析 (OOA)

理解需求後，讓我們來快速實作物件導向分析吧！

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_1.png" title="design_pattern_proxy_pattern_uml_1" %}

## 察覺 Forces

當我們嘗試直接實作影片播放系統時，會遇到三個關鍵挑戰。這些問題如果沒有妥善處理，將嚴重影響系統的效能和用戶滿意度。

**1. 頻寬資源浪費問題**

假設用戶想要重播一段有趣的影片。如果每次播放都從 YouTube 重新下載，會造成大量不必要的網路流量。這種做法不僅增加營運成本，在網路頻寬有限的環境下更可能導致網路擁塞。

**2. 用戶體驗延遲問題**

每次重新下載都意味著用戶必須等待。現代用戶已經習慣即時的數位體驗，任何不必要的等待時間都會降低應用的可用性。特別是當用戶想要快速重播某個片段時，這種延遲會讓人感到挫折。

**3. 系統設計複雜性問題**

如果讓客戶端程式碼直接處理所有邏輯（下載、快取檢查、錯誤處理），會讓程式變得複雜且難以維護。更糟糕的是，這會造成客戶端與下載系統之間的緊密耦合，降低系統的彈性。

**問題的本質**

分析這些挑戰，我們發現它們都指向同一個核心需求：我們需要一個智慧的中介層，能夠透明地控制和最佳化影片資源的存取方式。

## 套用 Proxy Pattern (Solution) 得到新的 Context (Resulting Context)

既然我們已經識別出系統的核心挑戰，現在讓我們看看代理模式如何優雅地解決這些問題。

**代理模式的解決思路**

代理模式提供了一個巧妙的解決方案：在客戶端和真實的影片播放器之間插入一個代理層。這個代理就像是一個聰明的助手，它知道何時需要真正下載影片，何時可以直接從快取中取得。

最重要的是，這種設計完全不需要修改原有的 YouTube 播放器代碼，我們只需要在外圍包裝一層智慧的代理即可。

**理解代理模式的基本結構**

在深入我們的具體實作之前，讓我們先了解代理模式的通用架構：

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_2.png" title="design_pattern_proxy_pattern_uml_2" %}

代理模式由三個關鍵組件組成，每個組件都有明確的職責分工：

**Subject (主題介面)**

這是統一的操作契約。它定義了代理物件和真實物件必須遵循的共同介面，確保客戶端可以透明地使用兩者中的任何一個。

**RealSubject (具體主題)**

這是實際執行工作的核心物件。在我們的案例中，就是負責從 YouTube 下載影片的 `YoutubeVideoPlayer`。它專注於執行資源密集的實際操作。

**Proxy (代理物件)**

這是關鍵的中介層，也就是我們的 `ProxyVideoPlayer`。它控制對真實物件的存取，實作快取邏輯，並決定何時需要委託真實物件執行操作。

**應用到我們的影片播放系統**

現在讓我們將這些概念具體應用到影片播放場景中：

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_3.png" title="design_pattern_proxy_pattern_uml_3" %}

## 物件導向程式設計 (OOP)

現在讓我們透過程式碼來實現代理模式。我們會按照邏輯順序，一步步建構完整的影片播放系統。

**步驟一：建立統一的操作介面**

首先，我們需要定義一個共同的契約，讓代理物件和真實物件都能遵循相同的操作方式：

```kotlin
interface VideoPlayer {
    fun download(name: String): String
    fun play(data: String)
}
```

這個介面很簡單但很重要。它確保無論客戶端使用的是代理物件還是真實物件，操作方式都完全一致。

**步驟二：實作真實的影片播放器**

接下來實作真正負責下載和播放的核心類別。這個類別專注於與 YouTube 平台的實際互動：

```kotlin
class YoutubeVideoPlayer : VideoPlayer {
    override fun download(name: String): String {
        println("Downloading video from YouTube: $name")
        // 模擬下載結果返回的影片資料
        return "VideoData($name)"
    }

    override fun play(data: String) {
        println("Playing video: $data")
    }
}
```

注意這裡的設計很單純，`YoutubeVideoPlayer` 只負責實際的下載和播放動作，不包含任何快取邏輯。這符合單一職責原則。

**步驟三：建立智慧代理物件**

現在來到關鍵部分：實作代理類別。這個類別會決定何時需要實際下載，何時可以使用快取：

```kotlin
class ProxyVideoPlayer(
    private val player: YoutubeVideoPlayer
) : VideoPlayer {

    private val cacheVideoList = mutableMapOf<String, String>()

    override fun download(name: String): String {
        return if (cacheVideoList.containsKey(name)) {
            println("Fetching video from cache: $name")
            cacheVideoList[name]!!
        } else {
            println("First time download for: $name")
            val videoData = player.download(name)
            cacheVideoList[name] = videoData
            videoData
        }
    }

    override fun play(data: String) {
        player.play(data)
    }
}
```

這個代理物件展現了代理模式的精髓：它在背後做了智慧的決策，但對客戶端來說完全透明。

**步驟四：建立客戶端管理器**

最後，我們建立一個管理器來示範如何使用這個系統。重要的是，這個管理器完全不需要知道背後的快取邏輯：

```kotlin
class VideoPlayerManager(private val player: VideoPlayer) {
    fun playVideo(name: String) {
        println("Request to play video: $name")
        val videoData = player.download(name)
        player.play(videoData)
    }
}

fun main() {
    // Using ProxyVideoPlayer
    val youtubePlayer = YoutubeVideoPlayer()
    val proxyPlayer = ProxyVideoPlayer(youtubePlayer)
    val manager = VideoPlayerManager(proxyPlayer)

    // Play video
    manager.playVideo("funny_cats.mp4")
    manager.playVideo("funny_cats.mp4") // using cache
    manager.playVideo("epic_fail.mp4")
    manager.playVideo("funny_cats.mp4") // using cache
}
```

注意 `VideoPlayerManager` 接收的是 `VideoPlayer` 介面，而不是具體的實作類別。這意味著它可以與任何實作該介面的物件協作，完全體現了代理模式的透明性。

**實際執行效果展示**

讓我們執行這個程式，觀察代理模式的實際運作效果：

```bash
Request to play video: funny_cats.mp4
First time download for: funny_cats.mp4
Downloading video from YouTube: funny_cats.mp4
Playing video: VideoData(funny_cats.mp4)

Request to play video: funny_cats.mp4
Fetching video from cache: funny_cats.mp4
Playing video: VideoData(funny_cats.mp4)

Request to play video: epic_fail.mp4
First time download for: epic_fail.mp4
Downloading video from YouTube: epic_fail.mp4
Playing video: VideoData(epic_fail.mp4)

Request to play video: funny_cats.mp4
Fetching video from cache: funny_cats.mp4
Playing video: VideoData(funny_cats.mp4)
```

從這個輸出結果中，我們可以清楚看到代理模式的智慧行為：第一次請求某個影片時會進行實際下載，之後的相同請求則直接從快取中取得，大幅提升了效率。

## 結論

通過這個影片播放系統的實作，我們看到了代理模式如何優雅地解決複雜的系統設計問題。

## 代理模式的核心價值

實施代理模式後，我們原本面臨的三個挑戰都得到了完美解決：

**資源效率顯著提升**

從執行結果可以明顯看出，相同的影片只會被下載一次。這不僅大幅減少了網路頻寬的使用，也降低了伺服器的負載壓力。在實際的生產環境中，這種最佳化能帶來可觀的成本節省。

**用戶體驗大幅改善**

重複播放相同影片時，用戶幾乎不需要等待。影片資料直接從本地快取中取得，提供了近乎即時的播放體驗。這種流暢性是現代應用的基本要求。

**系統設計保持簡潔**

最重要的成就是系統的透明性。`VideoPlayerManager` 完全不需要修改就能享受快取功能的好處。它不需要知道影片來源是網路下載還是本地快取，這種設計大幅降低了系統的複雜度。

## 代理模式的實際應用場景

代理模式在現代軟體開發中有廣泛的應用，以下是幾個常見的使用情境：

**1. 遠端代理 (Remote Proxy)**

當需要與遠端服務器上的物件互動時，遠端代理負責處理網路通訊的複雜性。例如，在微服務架構中，一個服務通過代理呼叫另一個服務的 API。

**2. 虛擬代理 (Virtual Proxy)**

對於創建成本很高的物件，虛擬代理可以延遲其實際創建時機。典型例子包括大型圖片的懶惰載入或資料庫連線的延遲初始化。

**3. 保護代理 (Protection Proxy)**

在需要控制存取權限的場景中，保護代理負責驗證用戶的身份和權限。這在安全敏感的應用中特別重要。

**4. 智慧代理 (Smart Proxy)**

除了基本的代理功能外，智慧代理還可以提供額外的增值服務，如我們例子中的快取機制、日誌記錄、效能監控或引用計數等。

## 設計模式的威力

代理模式展現了設計模式的真正價值：它讓我們能夠在不破壞既有程式碼的前提下，優雅地添加新功能。這種非侵入式的設計方法，為系統提供了強大的靈活性和可擴展性，是每個軟體開發者都應該掌握的重要技能。

## 系列文章導覽

### 結構型設計模式系列

- [適配器模式 (Adapter Pattern)](/zh/blog/2024/design-pattern-11-adapter-pattern/) - 讓不相容的介面能夠協同工作
- [橋接模式 (Bridge Pattern)](/zh/blog/2024/design-pattern-12-bridge-pattern/) - 將抽象與實作分離，支援獨立演化
- [組合模式 (Composite Pattern)](/zh/blog/2024/design-pattern-13-composite-pattern/) - 統一處理個別物件與物件組合
- [裝飾者模式 (Decorator Pattern)](/zh/blog/2024/design-pattern-14-decorator-pattern/) - 動態增加物件功能而不修改結構
- [外觀模式 (Facade Pattern)](/zh/blog/2024/design-pattern-15-facade-pattern/) - 提供統一介面簡化複雜子系統
- [享元模式 (Flyweight Pattern)](/zh/blog/2024/design-pattern-16-flyweight-pattern/) - 有效管理大量相似物件的記憶體使用

### 行為型設計模式系列

- [責任鏈模式 (Chain of Responsibility)](/zh/blog/2024/design-pattern-18-chain-of-responsibility-pattern/) - 建立動態請求處理鏈

### 創建型設計模式基礎

- [設計模式概念](/zh/blog/2024/design-pattern-3-design-pattern/) - 了解設計模式的基本概念
- [設計原則](/zh/blog/2024/design-pattern-2-design-principle/) - 掌握 SOLID 原則與設計基礎

透過代理模式，我們學會了如何透過智慧代理物件控制資源存取，實現高效的快取機制。在下一篇文章中，我們將進入行為型設計模式的領域，探討物件間互動的進階技巧。
