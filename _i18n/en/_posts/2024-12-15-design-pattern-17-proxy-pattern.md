---
layout: post
title: "Design Pattern 17: Proxy Pattern - Complete Guide with Real-World Video Streaming Examples"
date: 2024-12-15 21:30:00 +0800
description: "Master the Proxy Pattern with practical video streaming examples. Learn how to control object access for improved performance, security, and resource management in distributed systems."
tags: [Proxy Pattern, Design Patterns, Access Control, Performance Optimization, Object-Oriented Design, Software Architecture, Kotlin, Programming, Structural Patterns, Caching, Security]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Proxy Pattern?**

The **Proxy Pattern** is a structural design pattern that provides a surrogate or placeholder for another object to control access to it. It acts as an intermediary between the client and the real object, adding a layer of indirection for various purposes such as caching, access control, or lazy loading.

**Key Benefits:**
- ✅ **Access Control** - Control and monitor access to sensitive objects
- ✅ **Performance Optimization** - Implement caching and lazy loading
- ✅ **Resource Management** - Efficiently manage expensive resources
- ✅ **Transparency** - Clients interact with proxy as if it were the real object
- ✅ **Security** - Add authentication and authorization layers

---

## 🚀 **Real-World Problem: Video Streaming System**

Let's design a **video streaming system** with the following requirements:

### **System Requirements:**
- **Support multiple video sources** (YouTube, Vimeo, local files)
- **Implement intelligent caching** to avoid repeated downloads
- **Transparent client interface** - clients shouldn't know about caching logic
- **Resource optimization** - minimize bandwidth usage and loading times
- **Extensibility** - easy to add new video sources and caching strategies

### **Business Rules:**
- Videos should be downloaded only on first access
- Subsequent accesses should use cached versions
- System should handle different video formats efficiently
- Support for video quality selection and adaptive streaming
- Maintain consistent interface across all video sources

---

## 🏗️ **Object-Oriented Analysis (OOA)**

Let's analyze the problem and identify the core components:

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_1.png" title="Proxy Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **High Bandwidth Usage**
   - Repeated downloads of the same video waste bandwidth
   - No caching mechanism leads to unnecessary resource consumption

2. **High Latency**
   - Each video access requires full download, increasing wait times
   - Poor user experience due to loading delays

3. **Client Coupling**
   - Client code directly handles video download logic
   - Tight coupling between client and video source implementation

---

## 💡 **Proxy Pattern Solution**

After analyzing the forces, we can apply the **Proxy Pattern** to introduce intelligent caching and access control:

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_2.png" title="Proxy Pattern - General Structure" %}

### **Proxy Pattern Components:**

1. **Subject Interface** - Defines common interface for real object and proxy
2. **Real Subject** - The actual object that performs the work
3. **Proxy** - Controls access to real subject and adds additional functionality
4. **Client** - Uses the subject interface without knowing about proxy

**Benefits:**
- **Intelligent caching** - Avoid repeated expensive operations
- **Access control** - Add security and monitoring layers
- **Resource management** - Efficiently handle expensive resources
- **Transparent interface** - Clients work with consistent API

---

## 🛠️ **Implementation: Video Streaming System**

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_3.png" title="Video Streaming Proxy Pattern Implementation" %}

### **1. Subject Interface**

```kotlin
interface VideoPlayer {
    fun download(videoName: String): VideoData
    fun play(videoData: VideoData)
    fun getVideoInfo(videoName: String): VideoInfo
}

data class VideoData(
    val name: String,
    val content: String,
    val format: String,
    val size: Long
)

data class VideoInfo(
    val name: String,
    val duration: Int,
    val quality: String,
    val format: String
)
```

### **2. Real Subject**

```kotlin
class YouTubeVideoPlayer : VideoPlayer {
    override fun download(videoName: String): VideoData {
        println("🔄 Downloading video from YouTube: $videoName")
        // Simulate network delay
        Thread.sleep(2000)
        
        return VideoData(
            name = videoName,
            content = "VideoContent($videoName)",
            format = "MP4",
            size = 1024 * 1024 * 50 // 50MB
        )
    }

    override fun play(videoData: VideoData) {
        println("▶️ Playing video: ${videoData.name} (${videoData.format})")
    }

    override fun getVideoInfo(videoName: String): VideoInfo {
        println("ℹ️ Fetching video info from YouTube: $videoName")
        return VideoInfo(
            name = videoName,
            duration = 180, // 3 minutes
            quality = "1080p",
            format = "MP4"
        )
    }
}

class VimeoVideoPlayer : VideoPlayer {
    override fun download(videoName: String): VideoData {
        println("🔄 Downloading video from Vimeo: $videoName")
        Thread.sleep(1500)
        
        return VideoData(
            name = videoName,
            content = "VideoContent($videoName)",
            format = "WebM",
            size = 1024 * 1024 * 30 // 30MB
        )
    }

    override fun play(videoData: VideoData) {
        println("▶️ Playing video: ${videoData.name} (${videoData.format})")
    }

    override fun getVideoInfo(videoName: String): VideoInfo {
        println("ℹ️ Fetching video info from Vimeo: $videoName")
        return VideoInfo(
            name = videoName,
            duration = 240, // 4 minutes
            quality = "720p",
            format = "WebM"
        )
    }
}
```

### **3. Proxy Implementation**

```kotlin
class CachingVideoProxy(
    private val realPlayer: VideoPlayer
) : VideoPlayer {

    private val videoCache = mutableMapOf<String, VideoData>()
    private val infoCache = mutableMapOf<String, VideoInfo>()
    private val accessLog = mutableListOf<String>()

    override fun download(videoName: String): VideoData {
        return if (videoCache.containsKey(videoName)) {
            logAccess("📋 Fetching video from cache: $videoName")
            videoCache[videoName]!!
        } else {
            logAccess("🆕 First time download for: $videoName")
            val videoData = realPlayer.download(videoName)
            videoCache[videoName] = videoData
            videoData
        }
    }

    override fun play(videoData: VideoData) {
        realPlayer.play(videoData)
    }

    override fun getVideoInfo(videoName: String): VideoInfo {
        return if (infoCache.containsKey(videoName)) {
            logAccess("📋 Fetching video info from cache: $videoName")
            infoCache[videoName]!!
        } else {
            logAccess("🆕 First time fetching info for: $videoName")
            val videoInfo = realPlayer.getVideoInfo(videoName)
            infoCache[videoName] = videoInfo
            videoInfo
        }
    }

    private fun logAccess(message: String) {
        val timestamp = java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss"))
        accessLog.add("[$timestamp] $message")
    }

    fun getCacheStats(): CacheStats {
        return CacheStats(
            cachedVideos = videoCache.size,
            cachedInfo = infoCache.size,
            totalAccesses = accessLog.size
        )
    }

    fun clearCache() {
        videoCache.clear()
        infoCache.clear()
        accessLog.clear()
        println("🗑️ Cache cleared")
    }
}

data class CacheStats(
    val cachedVideos: Int,
    val cachedInfo: Int,
    val totalAccesses: Int
)
```

### **4. Client Code**

```kotlin
class VideoStreamingManager(private val player: VideoPlayer) {
    fun streamVideo(videoName: String) {
        println("🎬 Request to stream video: $videoName")
        
        // Get video info first
        val videoInfo = player.getVideoInfo(videoName)
        println("📊 Video Info: ${videoInfo.name} - ${videoInfo.duration}s - ${videoInfo.quality}")
        
        // Download and play video
        val videoData = player.download(videoName)
        player.play(videoData)
    }
}

fun main() {
    // Create real video player
    val youtubePlayer = YouTubeVideoPlayer()
    
    // Create proxy with caching
    val proxyPlayer = CachingVideoProxy(youtubePlayer)
    
    // Create streaming manager
    val manager = VideoStreamingManager(proxyPlayer)

    println("=== Video Streaming Demo ===\n")

    // Stream videos (first access - download required)
    manager.streamVideo("funny_cats.mp4")
    println()
    
    manager.streamVideo("epic_fail.mp4")
    println()
    
    // Stream same videos again (using cache)
    manager.streamVideo("funny_cats.mp4")
    println()
    
    manager.streamVideo("epic_fail.mp4")
    println()

    // Show cache statistics
    if (proxyPlayer is CachingVideoProxy) {
        val stats = proxyPlayer.getCacheStats()
        println("📈 Cache Statistics:")
        println("- Cached videos: ${stats.cachedVideos}")
        println("- Cached info: ${stats.cachedInfo}")
        println("- Total accesses: ${stats.totalAccesses}")
    }
}
```

**Expected Output:**
```
=== Video Streaming Demo ===

🎬 Request to stream video: funny_cats.mp4
ℹ️ Fetching video info from YouTube: funny_cats.mp4
📊 Video Info: funny_cats.mp4 - 180s - 1080p
🔄 Downloading video from YouTube: funny_cats.mp4
▶️ Playing video: funny_cats.mp4 (MP4)

🎬 Request to stream video: epic_fail.mp4
ℹ️ Fetching video info from YouTube: epic_fail.mp4
📊 Video Info: epic_fail.mp4 - 180s - 1080p
🔄 Downloading video from YouTube: epic_fail.mp4
▶️ Playing video: epic_fail.mp4 (MP4)

🎬 Request to stream video: funny_cats.mp4
📋 Fetching video info from cache: funny_cats.mp4
📊 Video Info: funny_cats.mp4 - 180s - 1080p
📋 Fetching video from cache: funny_cats.mp4
▶️ Playing video: funny_cats.mp4 (MP4)

🎬 Request to stream video: epic_fail.mp4
📋 Fetching video info from cache: epic_fail.mp4
📊 Video Info: epic_fail.mp4 - 180s - 1080p
📋 Fetching video from cache: epic_fail.mp4
▶️ Playing video: epic_fail.mp4 (MP4)

📈 Cache Statistics:
- Cached videos: 2
- Cached info: 2
- Total accesses: 8
```

---

## 📊 **Proxy Pattern vs Alternative Approaches**

| Approach | Pros | Cons |
|----------|------|------|
| **Proxy Pattern** | ✅ Access control<br>✅ Performance optimization<br>✅ Transparent interface | ❌ Additional complexity<br>❌ Potential overhead<br>❌ Debugging complexity |
| **Direct Access** | ✅ Simple implementation<br>✅ No overhead<br>✅ Easy debugging | ❌ No access control<br>❌ No caching<br>❌ Tight coupling |
| **Decorator Pattern** | ✅ Dynamic behavior addition<br>✅ Multiple decorators | ❌ No access control<br>❌ Different purpose (behavior vs access) |
| **Facade Pattern** | ✅ Simplified interface<br>✅ Subsystem encapsulation | ❌ No access control<br>❌ Different purpose (interface vs access) |

---

## 🎯 **When to Use the Proxy Pattern**

### **✅ Perfect For:**
- **Remote access** (RMI, web services, distributed systems)
- **Virtual proxies** (lazy loading of expensive resources)
- **Protection proxies** (access control and security)
- **Caching proxies** (performance optimization)
- **Logging and monitoring** (audit trails and metrics)

### **❌ Avoid When:**
- **Simple object access** (no additional functionality needed)
- **Performance-critical applications** (proxy overhead)
- **Tight coupling requirements** (direct access needed)
- **Simple caching** (use built-in caching mechanisms)

---

## 🔧 **Advanced Proxy Pattern Implementations**

### **1. Protection Proxy**

```kotlin
class ProtectionProxy(
    private val realPlayer: VideoPlayer,
    private val userRole: UserRole
) : VideoPlayer {
    
    override fun download(videoName: String): VideoData {
        if (!hasPermission(userRole, "download")) {
            throw SecurityException("User ${userRole.name} cannot download videos")
        }
        return realPlayer.download(videoName)
    }

    override fun play(videoData: VideoData) {
        if (!hasPermission(userRole, "play")) {
            throw SecurityException("User ${userRole.name} cannot play videos")
        }
        realPlayer.play(videoData)
    }

    override fun getVideoInfo(videoName: String): VideoInfo {
        return realPlayer.getVideoInfo(videoName)
    }

    private fun hasPermission(role: UserRole, action: String): Boolean {
        return when (role) {
            UserRole.ADMIN -> true
            UserRole.USER -> action == "play" || action == "download"
            UserRole.GUEST -> action == "play"
        }
    }
}

enum class UserRole {
    ADMIN, USER, GUEST
}
```

### **2. Remote Proxy**

```kotlin
class RemoteVideoProxy(
    private val serverUrl: String
) : VideoPlayer {
    
    override fun download(videoName: String): VideoData {
        println("🌐 Connecting to remote server: $serverUrl")
        // Simulate network communication
        Thread.sleep(1000)
        
        return VideoData(
            name = videoName,
            content = "RemoteVideoContent($videoName)",
            format = "MP4",
            size = 1024 * 1024 * 25
        )
    }

    override fun play(videoData: VideoData) {
        println("▶️ Streaming remote video: ${videoData.name}")
    }

    override fun getVideoInfo(videoName: String): VideoInfo {
        println("🌐 Fetching info from remote server: $videoName")
        return VideoInfo(
            name = videoName,
            duration = 200,
            quality = "720p",
            format = "MP4"
        )
    }
}
```

### **3. Smart Proxy with Analytics**

```kotlin
class AnalyticsProxy(
    private val realPlayer: VideoPlayer
) : VideoPlayer {
    
    private val analytics = mutableMapOf<String, Int>()
    private val performanceMetrics = mutableListOf<PerformanceMetric>()

    override fun download(videoName: String): VideoData {
        val startTime = System.currentTimeMillis()
        
        try {
            val result = realPlayer.download(videoName)
            
            val duration = System.currentTimeMillis() - startTime
            recordMetric("download", videoName, duration, true)
            
            return result
        } catch (e: Exception) {
            val duration = System.currentTimeMillis() - startTime
            recordMetric("download", videoName, duration, false)
            throw e
        }
    }

    override fun play(videoData: VideoData) {
        val startTime = System.currentTimeMillis()
        
        try {
            realPlayer.play(videoData)
            
            val duration = System.currentTimeMillis() - startTime
            recordMetric("play", videoData.name, duration, true)
        } catch (e: Exception) {
            val duration = System.currentTimeMillis() - startTime
            recordMetric("play", videoData.name, duration, false)
            throw e
        }
    }

    override fun getVideoInfo(videoName: String): VideoInfo {
        return realPlayer.getVideoInfo(videoName)
    }

    private fun recordMetric(action: String, videoName: String, duration: Long, success: Boolean) {
        performanceMetrics.add(PerformanceMetric(action, videoName, duration, success))
        analytics[videoName] = analytics.getOrDefault(videoName, 0) + 1
    }

    fun getAnalyticsReport(): AnalyticsReport {
        val totalRequests = performanceMetrics.size
        val successfulRequests = performanceMetrics.count { it.success }
        val avgDuration = performanceMetrics.map { it.duration }.average()
        
        return AnalyticsReport(
            totalRequests = totalRequests,
            successRate = successfulRequests.toDouble() / totalRequests,
            averageDuration = avgDuration,
            popularVideos = analytics.entries.sortedByDescending { it.value }.take(5)
        )
    }
}

data class PerformanceMetric(
    val action: String,
    val videoName: String,
    val duration: Long,
    val success: Boolean
)

data class AnalyticsReport(
    val totalRequests: Int,
    val successRate: Double,
    val averageDuration: Double,
    val popularVideos: List<Map.Entry<String, Int>>
)
```

---

## 🚀 **Real-World Applications**

### **1. Web Services and APIs**
- **REST API proxies** - Add caching, authentication, rate limiting
- **Microservice gateways** - Route requests and add cross-cutting concerns
- **Load balancers** - Distribute requests across multiple servers

### **2. Database Access**
- **Connection pooling** - Manage database connections efficiently
- **Query caching** - Cache frequently executed queries
- **Access control** - Implement row-level security

### **3. File Systems**
- **Virtual file systems** - Provide unified access to different storage backends
- **File caching** - Cache frequently accessed files
- **Access logging** - Track file access patterns

### **4. Network Services**
- **HTTP proxies** - Add caching, compression, security
- **VPN services** - Route traffic through secure tunnels
- **CDN services** - Distribute content globally

---

## 📈 **Performance Considerations**

### **Caching Strategies**
- **Memory caching** - Fast access for frequently used objects
- **Disk caching** - Persistent storage for large objects
- **Distributed caching** - Share cache across multiple servers
- **Cache invalidation** - Remove stale data efficiently

### **Access Control Overhead**
- **Authentication checks** - Validate user credentials
- **Authorization logic** - Check user permissions
- **Audit logging** - Record access patterns
- **Rate limiting** - Prevent abuse

---

## 🔗 **Related Design Patterns**

- **[Decorator Pattern](/2024-12-11-design-pattern-14-decorator-pattern/)** - For adding behavior dynamically
- **[Facade Pattern](/2024-12-12-design-pattern-15-facade-pattern/)** - For simplifying complex interfaces
- **[Adapter Pattern](/2024-12-07-design-pattern-11-adapter-pattern/)** - For adapting incompatible interfaces
- **[Flyweight Pattern](/2024-12-14-design-pattern-16-flyweight-pattern/)** - For sharing expensive objects

---

## 📚 **Best Practices**

### **1. Proxy Design**
- **Keep proxies lightweight** - Avoid heavy computation in proxy
- **Maintain transparency** - Proxy should be indistinguishable from real object
- **Handle errors gracefully** - Provide meaningful error messages
- **Document proxy behavior** - Clear documentation of proxy functionality

### **2. Performance Optimization**
- **Use appropriate caching strategies** - Choose caching based on access patterns
- **Implement lazy loading** - Load resources only when needed
- **Monitor proxy overhead** - Ensure proxy doesn't become bottleneck
- **Consider async operations** - For time-consuming operations

### **3. Security Considerations**
- **Validate all inputs** - Prevent security vulnerabilities
- **Implement proper authentication** - Secure access to sensitive resources
- **Log security events** - Track access patterns for security analysis
- **Use encryption** - Protect sensitive data in transit and at rest

---

## 🎯 **Conclusion**

The **Proxy Pattern** provides a powerful way to control access to objects while adding valuable functionality like caching, security, and monitoring. By introducing a surrogate object, it enables:

- **Performance optimization** through intelligent caching and lazy loading
- **Access control** with authentication and authorization layers
- **Resource management** for expensive operations
- **Transparent interfaces** that maintain client compatibility

This pattern is essential for building robust, scalable systems that need to handle remote resources, implement security controls, or optimize performance. Whether you're building web services, database applications, or file systems, the Proxy Pattern provides the foundation for controlled and efficient object access.

**Next Steps:**
- Explore the **[Decorator Pattern](/2024-12-11-design-pattern-14-decorator-pattern/)** for dynamic behavior addition
- Learn about the **[Facade Pattern](/2024-12-12-design-pattern-15-facade-pattern/)** for interface simplification
- Discover the **[Adapter Pattern](/2024-12-07-design-pattern-11-adapter-pattern/)** for interface compatibility

---

*Ready to implement the Proxy Pattern in your projects? Download the complete code examples from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern) and start building more secure, efficient systems today!*
