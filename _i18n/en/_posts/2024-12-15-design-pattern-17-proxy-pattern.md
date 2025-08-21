---
layout: post
title: "Design Pattern (17) Proxy Pattern: Smart Caching System Design Guide"
date: 2024-12-15 21:30:00 +0800
description: "Deep dive into Proxy Pattern implementation techniques, learn how to control access permissions through smart proxy objects, implement caching mechanisms and performance optimization, master advanced application techniques in structural design patterns."
tags: [Design Patterns, Proxy Pattern, Structural Patterns, Software Architecture, OOP, Kotlin, Java, Caching, Performance Optimization]
categories: [Design Pattern]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

## Requirements

Imagine we are developing a modern video playback application. In this digital age, video content is usually stored on remote servers (such as YouTube), and each viewing requires downloading through the network.

This download process not only consumes significant bandwidth but also requires waiting time. If users repeatedly watch the same video, repeated downloads are obviously a waste of resources.

Our system needs to meet the following three core requirements:

**1. Smart Caching Mechanism**

When the application plays multiple videos, it must avoid repeatedly downloading the same content. Each re-download not only wastes bandwidth but also severely affects user experience.

**2. Lazy Loading**

Videos should adopt an "on-demand download" strategy. That is, downloads only occur when users first request playback. Subsequent playback requests are served directly from local cache, effectively saving system resources.

**3. Transparency and Simplification**

Most importantly, the system must provide a transparent operation interface. Client code doesn't need to know whether video data comes from network downloads or local cache. This design significantly reduces code complexity and makes development more concise.

## Object-Oriented Analysis (OOA)

After understanding the requirements, let's quickly implement object-oriented analysis!

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_1.png" title="design_pattern_proxy_pattern_uml_1" %}

## Identifying Forces

When we try to directly implement a video playback system, we encounter three key challenges. If these problems are not properly handled, they will severely affect system performance and user satisfaction.

**1. Bandwidth Resource Waste Problem**

Suppose users want to replay an interesting video. If each playback re-downloads from YouTube, it causes massive unnecessary network traffic. This approach not only increases operational costs but may also cause network congestion in environments with limited bandwidth.

**2. User Experience Delay Problem**

Each re-download means users must wait. Modern users are accustomed to instant digital experiences, and any unnecessary waiting time reduces application usability. Especially when users want to quickly replay certain segments, this delay creates frustration.

**3. System Design Complexity Problem**

If client code directly handles all logic (downloading, cache checking, error handling), the program becomes complex and difficult to maintain. Worse, this creates tight coupling between client and download system, reducing system flexibility.

**Problem Essence**

Analyzing these challenges, we find they all point to the same core need: we need a smart intermediary layer that can transparently control and optimize video resource access.

## Applying Proxy Pattern (Solution) to Achieve New Context (Resulting Context)

Since we have identified the system's core challenges, now let's see how the Proxy Pattern elegantly solves these problems.

**Proxy Pattern Solution Approach**

The Proxy Pattern provides a clever solution: insert a proxy layer between the client and the real video player. This proxy acts like a smart assistant that knows when real video downloading is needed and when content can be retrieved directly from cache.

Most importantly, this design requires no modification to existing YouTube player code - we only need to wrap an intelligent proxy layer around it.

**Understanding Basic Structure of Proxy Pattern**

Before diving into our specific implementation, let's first understand the general architecture of the Proxy Pattern:

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_2.png" title="design_pattern_proxy_pattern_uml_2" %}

The Proxy Pattern consists of three key components, each with clear responsibility division:

**Subject (Subject Interface)**

This is the unified operation contract. It defines the common interface that both proxy objects and real objects must follow, ensuring clients can transparently use either one.

**RealSubject (Concrete Subject)**

This is the core object that actually performs the work. In our case, it's the `YoutubeVideoPlayer` responsible for downloading videos from YouTube. It focuses on executing resource-intensive actual operations.

**Proxy (Proxy Object)**

This is the key intermediary layer, our `ProxyVideoPlayer`. It controls access to the real object, implements caching logic, and decides when to delegate operations to the real object.

**Applying to Our Video Playback System**

Now let's concretely apply these concepts to the video playback scenario:

{% include figure.liquid path="assets/img/design_pattern_proxy_pattern_uml_3.png" title="design_pattern_proxy_pattern_uml_3" %}

## Object-Oriented Programming (OOP)

Now let's implement the Proxy Pattern through code. We'll build the complete video playback system step by step in logical order.

**Step 1: Create Unified Operation Interface**

First, we need to define a common contract that both proxy objects and real objects can follow with the same operation method:

```kotlin
interface VideoPlayer {
    fun download(name: String): String
    fun play(data: String)
}
```

This interface is simple but important. It ensures that whether clients use proxy objects or real objects, the operation method is completely consistent.

**Step 2: Implement Real Video Player**

Next, implement the core class actually responsible for downloading and playing. This class focuses on actual interaction with the YouTube platform:

```kotlin
class YoutubeVideoPlayer : VideoPlayer {
    override fun download(name: String): String {
        println("Downloading video from YouTube: $name")
        // Simulate video data returned from download
        return "VideoData($name)"
    }

    override fun play(data: String) {
        println("Playing video: $data")
    }
}
```

Note the design here is pure - `YoutubeVideoPlayer` only handles actual download and playback actions, without any caching logic. This follows the Single Responsibility Principle.

**Step 3: Create Smart Proxy Object**

Now comes the key part: implementing the proxy class. This class will decide when actual downloading is needed and when cache can be used:

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

This proxy object demonstrates the essence of the Proxy Pattern: it makes intelligent decisions behind the scenes while being completely transparent to clients.

**Step 4: Create Client Manager**

Finally, we create a manager to demonstrate how to use this system. Importantly, this manager doesn't need to know about the caching logic behind the scenes:

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

Note that `VideoPlayerManager` receives the `VideoPlayer` interface, not a concrete implementation class. This means it can collaborate with any object implementing this interface, fully embodying the transparency of the Proxy Pattern.

**Actual Execution Effect Demonstration**

Let's run this program and observe the actual operation effects of the Proxy Pattern:

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

From this output, we can clearly see the intelligent behavior of the Proxy Pattern: the first request for a video performs actual downloading, while subsequent identical requests are served directly from cache, dramatically improving efficiency.

## Conclusion

Through implementing this video playback system, we see how the Proxy Pattern elegantly solves complex system design problems.

## Core Value of Proxy Pattern

After implementing the Proxy Pattern, all three challenges we originally faced have been perfectly resolved:

**Significant Resource Efficiency Improvement**

The execution results clearly show that identical videos are downloaded only once. This not only dramatically reduces network bandwidth usage but also lowers server load pressure. In actual production environments, this optimization can bring considerable cost savings.

**Dramatic User Experience Enhancement**

When replaying the same video, users hardly need to wait. Video data is retrieved directly from local cache, providing near-instant playback experience. This smoothness is a basic requirement for modern applications.

**System Design Remains Simple**

The most important achievement is system transparency. `VideoPlayerManager` doesn't need any modification to enjoy caching functionality benefits. It doesn't need to know whether video sources come from network downloads or local cache - this design significantly reduces system complexity.

## Practical Application Scenarios of Proxy Pattern

The Proxy Pattern has widespread applications in modern software development. Here are several common usage scenarios:

**1. Remote Proxy**

When interaction with objects on remote servers is needed, remote proxies handle the complexity of network communication. For example, in microservice architecture, one service calls another service's API through a proxy.

**2. Virtual Proxy**

For objects with high creation costs, virtual proxies can delay their actual creation timing. Typical examples include lazy loading of large images or delayed initialization of database connections.

**3. Protection Proxy**

In scenarios requiring access control, protection proxies are responsible for verifying user identity and permissions. This is particularly important in security-sensitive applications.

**4. Smart Proxy**

Beyond basic proxy functionality, smart proxies can provide additional value-added services, such as the caching mechanism in our example, logging, performance monitoring, or reference counting.

## Power of Design Patterns

The Proxy Pattern demonstrates the true value of design patterns: it allows us to elegantly add new functionality without breaking existing code. This non-invasive design approach provides systems with powerful flexibility and scalability - an important skill every software developer should master.

## Series Navigation

### Structural Design Pattern Series

- [Adapter Pattern](/en/blog/2024/design-pattern-11-adapter-pattern/) - Making incompatible interfaces work together
- [Bridge Pattern](/en/blog/2024/design-pattern-12-bridge-pattern/) - Separating abstraction from implementation, supporting independent evolution
- [Composite Pattern](/en/blog/2024/design-pattern-13-composite-pattern/) - Uniformly handling individual objects and object combinations
- [Decorator Pattern](/en/blog/2024/design-pattern-14-decorator-pattern/) - Dynamically adding object functionality without modifying structure
- [Facade Pattern](/en/blog/2024/design-pattern-15-facade-pattern/) - Providing unified interface to simplify complex subsystems
- [Flyweight Pattern](/en/blog/2024/design-pattern-16-flyweight-pattern/) - Efficiently managing memory usage of large numbers of similar objects

### Behavioral Design Pattern Series

- [Chain of Responsibility Pattern](/en/blog/2024/design-pattern-18-chain-of-responsibility-pattern/) - Building dynamic request handling chains

### Creational Design Pattern Basics

- [Design Pattern Concepts](/en/blog/2024/design-pattern-3-design-pattern/) - Understanding basic concepts of design patterns
- [Design Principles](/en/blog/2024/design-pattern-2-design-principle/) - Mastering SOLID principles and design foundations

Through the Proxy Pattern, we learned how to control resource access through smart proxy objects and implement efficient caching mechanisms. In the next article, we will enter the realm of behavioral design patterns and explore advanced techniques for object interaction.
