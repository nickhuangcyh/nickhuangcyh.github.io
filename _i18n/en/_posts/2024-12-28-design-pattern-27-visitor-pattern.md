---
layout: post
title: "Design Pattern (27) - Visitor Pattern"
date: 2024-12-28 21:30:00 +0800
description: "The Visitor Pattern provides a way to add new operation logic to objects without modifying their structure, achieving high extensibility."
excerpt: "In-depth exploration of Visitor Pattern application in IoT development: how to uniformly handle multi-brand IPCam devices. Complete Kotlin code examples showing how to add operations without modifying object structures. Suitable for software architecture design, object-oriented programming, behavioral design pattern learning. Implement highly extensible systems conforming to Open-Closed Principle, improving code maintainability and system stability."
tags: [visitor-pattern, design-patterns, behavioral-patterns, iot-development, software-architecture, object-oriented-programming, kotlin, mobile-app-development, system-design, code-maintainability]
categories: [design-patterns, software-engineering, iot, mobile-development]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> You can download the Design Pattern series code from this [design_pattern repo](https://github.com/nickhuangcyh/design_pattern).

---

## Requirements

When developing modern **IoT smart home applications integrating multi-brand IPCam surveillance systems**, we face a common challenge in software architecture design: how to use the visitor pattern to uniformly handle products from different manufacturers. This scenario is very common in Internet of Things (IoT) and embedded systems development. Let's look at specific requirements:

### 1. Multi-brand Support
We need to support multiple IPCam brands, each with its own unique interface methods:

- **HIKVISION**: Uses standard RTSP protocol, providing universal streaming and screenshot functions
- **DAHUA**: Uses proprietary SDK, all operations must go through its specific API methods

### 2. Architectural Independence
**App code structure should not depend on IPCam brand implementation details**. This means our core logic should be decoupled from specific brands, maintaining open extensibility. This way, when adding other brands, it won't affect existing code architecture.

### 3. Preserve Original Structure
**Avoiding modification of IPCam core structure** is another important consideration. Since these brand implementations are usually provided by manufacturers, we cannot and should not directly modify their core code.

---

## Object-Oriented Analysis (OOA)

Before diving into solutions, let's first perform object-oriented analysis to understand current system architecture and potential problems.

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_1.png" title="design_pattern_visitor_pattern_uml_1" %}

### Recognizing Forces (Problem Pain Points)

Through analysis, we discover that without appropriate design patterns, we'll face the following core problems:

#### 1. Difficult to Extend New Brands
Every time we want to add a new brand of IPCam, we must modify the App's core logic. This approach not only increases error risks but also makes code increasingly complex.

#### 2. Violates Open-Closed Principle (OCP)
Since core logic is tightly coupled with brand implementation details, every time we add functionality, we need to modify core code. This violates the "open for extension, closed for modification" design principle.

#### 3. Cannot Uniformly Handle Operations from Different Brands
Each brand has different streaming and screenshot methods. Without unified processing mechanisms, code becomes chaotic and difficult to maintain. This leads to duplicate code and scattered logic problems.

---

## Applying Visitor Pattern: Solution and New Architecture

After completing OOA and identifying problem pain points, let's now use Visitor Pattern to elegantly solve these challenges.

### Basic Architecture of Visitor Pattern

First, let's understand the standard architecture of Visitor Pattern:

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_2.png" title="design_pattern_visitor_pattern_uml_2" %}

### Core Components of Visitor Pattern

The visitor pattern consists of four main components, each playing a key role:

#### 1. Visitor (Visitor Interface)
**Function**: Defines operation methods for each type of object
**Characteristics**: Provides a visit method for each concrete element type

#### 2. ConcreteVisitor (Concrete Visitor)
**Function**: Implements specific operation logic
**Characteristics**: Executes corresponding operations for different types of elements

#### 3. Element (Element Interface)
**Function**: Defines standard interface for accepting visitors
**Core Method**: `accept()` method, receives visitor and passes itself to the visitor

#### 4. ConcreteElement (Concrete Element)
**Function**: Implements specific element logic
**Characteristics**: Through `accept()` method, allows visitors to access and operate on itself

### Application to Our IPCam System

Now let's apply this pattern to our multi-brand IPCam integration requirements:

{% include figure.liquid path="assets/img/design_pattern_visitor_pattern_uml_3.png" title="design_pattern_visitor_pattern_uml_3" %}

---

## Object-Oriented Design (OOP)

Now let's convert theory into actual code implementation. We'll gradually construct each component and explain their roles in the system.

### Element Interface: IPCam

First define the IPCam element interface, which is the common contract for all camera brands:

```kotlin
interface IPCam {
    fun accept(visitor: IPCamVisitor)
}
```

**Key Concept**: This interface only defines one `accept()` method, allowing visitors to "visit" this camera object.

### ConcreteElements: Specific Camera Implementations

Next implement different brand cameras, each with their own unique functionality:

```kotlin
class HikvisionIPCam : IPCam {
    override fun accept(visitor: IPCamVisitor) {
        visitor.visitHikvision(this)
    }

    fun getRTSPStream(): String {
        return "rtsp://hikvision/stream"
    }

    fun captureSnapshot(): String {
        return "Hikvision Snapshot"
    }
}

class DahuaIPCam : IPCam {
    override fun accept(visitor: IPCamVisitor) {
        visitor.visitDahua(this)
    }

    fun startSDKStream(): String {
        return "Dahua SDK Stream"
    }

    fun takeSDKSnapshot(): String {
        return "Dahua Snapshot"
    }
}
```

**Important Observations**:
- Each camera implements the `accept()` method, passing itself to the corresponding visitor method
- Each brand retains its own special methods (HIKVISION uses RTSP, DAHUA uses SDK)

### Visitor Interface: IPCamVisitor

Define the visitor interface, providing specialized visit methods for each camera type:

```kotlin
interface IPCamVisitor {
    fun visitHikvision(ipCam: HikvisionIPCam)
    fun visitDahua(ipCam: DahuaIPCam)
}
```

**Design Highlight**: Each visit method receives the corresponding concrete camera type, ensuring type safety and operation correctness.

### ConcreteVisitors: Specific Operation Implementations

Implement different operation logic, here we separately implement streaming and screenshot functionality:

```kotlin
class IPCamStreamingVisitor : IPCamVisitor {
    override fun visitHikvision(ipCam: HikvisionIPCam) {
        println("Streaming: ${ipCam.getRTSPStream()}")
    }

    override fun visitDahua(ipCam: DahuaIPCam) {
        println("Streaming: ${ipCam.startSDKStream()}")
    }
}

class IPCamSnapshotVisitor : IPCamVisitor {
    override fun visitHikvision(ipCam: HikvisionIPCam) {
        println("Snapshot: ${ipCam.captureSnapshot()}")
    }

    override fun visitDahua(ipCam: DahuaIPCam) {
        println("Snapshot: ${ipCam.takeSDKSnapshot()}")
    }
}
```

**Core Advantage**: Logic for the same operation is centralized in one visitor class, with different brand handling methods clearly separated.

### Client Usage Method

Finally demonstrate how to use this architecture in client programs:

```kotlin
fun main() {
    val ipCams: List<IPCam> = listOf(HikvisionIPCam(), DahuaIPCam())
    val streamingVisitor = IPCamStreamingVisitor()
    val snapshotVisitor = IPCamSnapshotVisitor()

    for (ipCam in ipCams) {
        ipCam.accept(streamingVisitor)
        ipCam.accept(snapshotVisitor)
    }
}
```

**Execution Results**:

```plaintext
Streaming: rtsp://hikvision/stream
Snapshot: Hikvision Snapshot
Streaming: Dahua SDK Stream
Snapshot: Dahua Snapshot
```

**User Experience**: Client code is clean and clear, doesn't need to know specific implementation details of each brand, only needs to create appropriate visitors and let cameras accept visits.

---

## Conclusion

Through implementing Visitor Pattern, we successfully solved the challenges of multi-brand IPCam integration. Let's review the specific improvements this solution brings:

### Main Achievements

#### 1. Easy to Extend New Brands
When needing to support new camera brands (like AXIS or Panasonic), we only need to:
- Create new `ConcreteElement` class (like `AxisIPCam`)
- Add corresponding visit methods in existing visitor interfaces
- Implement brand-specific logic in each concrete visitor

**Importantly**: This entire process won't affect existing code structure.

#### 2. Centralized Operation Logic Management
Same operations for different brands (like streaming, snapshots) are all centralized in corresponding visitor classes. This centralization brings two benefits:
- **Simplified Maintenance**: Modifying streaming logic only needs to be done in `IPCamStreamingVisitor`
- **Clear Code**: Each visitor focuses on single responsibility

#### 3. Complies with Core Design Principles
Our solution perfectly embodies two important design principles:
- **Single Responsibility Principle (SRP)**: Operation logic completely separated from object structure
- **Open-Closed Principle (OCP)**: Open for extension, closed for modification

### Applicable Scenarios

Visitor Pattern is particularly suitable for the following development scenarios:

#### Scenario 1: Unified Operations on Multi-type Objects
When you have multiple types of objects needing to perform same category but differently implemented operations.

#### Scenario 2: Stable Structure vs Variable Operations
Object structure is relatively stable (camera brands don't change frequently), but operation logic changes often (might add recording, settings adjustment functions).

### Overall Value

Visitor Pattern provides us with an elegant and maintainable solution. It not only solves current multi-brand integration problems but also lays solid foundations for future functional expansion.

Through this pattern, our system possesses **high extensibility** and **high flexibility**, able to calmly handle constantly changing business requirements.