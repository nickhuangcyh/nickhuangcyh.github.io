---
layout: post
title: "Design Pattern 20: Iterator Pattern - Complete Guide with Real-World File System Examples"
date: 2024-12-22 14:00:00 +0800
description: "Master the Iterator Pattern with practical file system traversal examples. Learn how to provide sequential access to collection elements without exposing internal structure, improving code flexibility and maintainability."
tags:
  [
    Iterator Pattern,
    Design Patterns,
    Collection Traversal,
    Object-Oriented Design,
    Software Architecture,
    Kotlin,
    Programming,
    Behavioral Patterns,
    File System,
    BFS,
    DFS,
  ]
categories: [Design Pattern, Software Engineering, Programming]
toc:
  sidebar: right
thumbnail: /assets/img/design_patterns.jpg
---

> 📁 **Download the complete Design Pattern series code** from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern).

---

## 🎯 **What is the Iterator Pattern?**

The **Iterator Pattern** is a behavioral design pattern that provides a way to access elements of a collection sequentially without exposing its underlying representation. It encapsulates the traversal logic and provides a uniform interface for accessing collection elements.

**Key Benefits:**

- ✅ **Encapsulation** - Hide internal collection structure from clients
- ✅ **Uniform interface** - Consistent access method across different collections
- ✅ **Multiple traversal strategies** - Support different iteration algorithms (BFS, DFS, etc.)
- ✅ **Single Responsibility** - Separate traversal logic from collection logic
- ✅ **Extensibility** - Easy to add new traversal methods

---

## 🚀 **Real-World Problem: File System Search Tool**

Let's design a **file system search tool** with the following requirements:

### **System Requirements:**

- **Support multiple search strategies** (Breadth-First Search, Depth-First Search)
- **Client transparency** - Clients shouldn't need to know search implementation details
- **Unified interface** - Consistent way to access search results
- **Extensibility** - Easy to add new search methods (e.g., size-based sorting)
- **Performance optimization** - Efficient traversal for large file systems

### **Business Rules:**

- All search results should be accessible through a common iterator interface
- Search strategies should be interchangeable without client code changes
- System should handle different file system structures efficiently
- Support for filtering and sorting during traversal

---

## 🏗️ **Object-Oriented Analysis (OOA)**

Let's analyze the problem and identify the core components:

{% include figure.liquid path="assets/img/design_pattern_iterator_pattern_uml_1.png" title="Iterator Pattern - Problem Analysis" %}

### **Identified Forces:**

1. **High Coupling**
   - Client code directly depends on specific search implementation details
   - Changes to search logic require client code modifications

2. **Lack of Consistency**
   - Different search methods may have inconsistent result access patterns
   - No standardized way to traverse search results

3. **Violation of Open-Closed Principle (OCP)**
   - Adding new search methods requires modifying existing client code
   - System becomes rigid and hard to extend

---

## 💡 **Iterator Pattern Solution**

After analyzing the forces, we can apply the **Iterator Pattern** to decouple traversal logic from collection structure:

{% include figure.liquid path="assets/img/design_pattern_iterator_pattern_uml_2.png" title="Iterator Pattern - General Structure" %}

### **Iterator Pattern Components:**

1. **Iterator Interface** - Defines methods for accessing collection elements
2. **Concrete Iterators** - Implement specific traversal strategies (BFS, DFS)
3. **Aggregate Interface** - Defines method to create iterator
4. **Concrete Aggregate** - Implements aggregate interface and provides collection data

**Benefits:**

- **Encapsulated traversal logic** - Clients don't need to know implementation details
- **Multiple traversal strategies** - Easy to switch between BFS, DFS, etc.
- **Consistent interface** - Uniform access pattern across all iterators
- **Easy extension** - Add new traversal methods without changing existing code

---

## 🛠️ **Implementation: File System Search Tool**

{% include figure.liquid path="assets/img/design_pattern_iterator_pattern_uml_3.png" title="File System Iterator Pattern Implementation" %}

### **1. Iterator Interface**

```kotlin
interface Iterator<T> {
    fun hasNext(): Boolean
    fun next(): T
}
```

### **2. Aggregate Interface**

```kotlin
interface FileSystem {
    fun createIterator(): Iterator<File>
}
```

### **3. Concrete Iterators**

```kotlin
class BFSIterator(private val root: File) : Iterator<File> {
    private val queue = ArrayDeque<File>()

    init {
        queue.add(root)
    }

    override fun hasNext(): Boolean {
        return queue.isNotEmpty()
    }

    override fun next(): File {
        if (!hasNext()) throw NoSuchElementException()
        val current = queue.removeFirst()
        if (current.isDirectory) {
            queue.addAll(current.listFiles().orEmpty())
        }
        return current
    }
}

class DFSIterator(private val root: File) : Iterator<File> {
    private val stack = ArrayDeque<File>()

    init {
        stack.add(root)
    }

    override fun hasNext(): Boolean {
        return stack.isNotEmpty()
    }

    override fun next(): File {
        if (!hasNext()) throw NoSuchElementException()
        val current = stack.removeLast()
        if (current.isDirectory) {
            stack.addAll(current.listFiles().orEmpty())
        }
        return current
    }
}

class SizeBasedIterator(private val root: File) : Iterator<File> {
    private val files = mutableListOf<File>()
    private var currentIndex = 0

    init {
        collectFiles(root)
        files.sortBy { it.size }
    }

    private fun collectFiles(directory: File) {
        if (directory.isDirectory) {
            directory.listFiles()?.forEach { file ->
                if (file.isFile) {
                    files.add(file)
                } else {
                    collectFiles(file)
                }
            }
        }
    }

    override fun hasNext(): Boolean {
        return currentIndex < files.size
    }

    override fun next(): File {
        if (!hasNext()) throw NoSuchElementException()
        return files[currentIndex++]
    }
}
```

### **4. Concrete Aggregate**

```kotlin
class DefaultFileSystem(
    private val root: File,
    private val searchMethod: SearchMethod
) : FileSystem {

    override fun createIterator(): Iterator<File> {
        return when (searchMethod) {
            SearchMethod.BFS -> BFSIterator(root)
            SearchMethod.DFS -> DFSIterator(root)
            SearchMethod.SIZE_BASED -> SizeBasedIterator(root)
        }
    }
}

enum class SearchMethod {
    BFS, DFS, SIZE_BASED
}
```

### **5. File Model**

```kotlin
data class File(
    val name: String,
    val isDirectory: Boolean,
    val size: Long = 0,
    val children: List<File> = emptyList()
) {
    fun listFiles(): List<File> = if (isDirectory) children else emptyList()
}
```

### **6. Client Code**

```kotlin
fun main() {
    val fileSystem = DefaultFileSystem(
        root = File(
            name = "root",
            isDirectory = true,
            children = listOf(
                File("file1.txt", false, 1024),
                File("folder1", true, children = listOf(
                    File("file2.txt", false, 2048),
                    File("file3.txt", false, 512)
                )),
                File("folder2", true, children = listOf(
                    File("file4.txt", false, 3072)
                ))
            )
        ),
        searchMethod = SearchMethod.BFS
    )

    val iterator = fileSystem.createIterator()
    println("BFS Traversal:")
    while (iterator.hasNext()) {
        val file = iterator.next()
        println("- ${file.name} (${if (file.isDirectory) "DIR" else "${file.size} bytes"})")
    }
}
```

**Expected Output:**

```
BFS Traversal:
- root (DIR)
- file1.txt (1024 bytes)
- folder1 (DIR)
- folder2 (DIR)
- file2.txt (2048 bytes)
- file3.txt (512 bytes)
- file4.txt (3072 bytes)
```

---

## 📊 **Iterator Pattern vs Alternative Approaches**

| Approach                     | Pros                                                                                 | Cons                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| **Iterator Pattern**         | ✅ Encapsulated traversal logic<br>✅ Multiple strategies<br>✅ Consistent interface | ❌ Additional complexity<br>❌ Memory overhead for large collections       |
| **Direct Collection Access** | ✅ Simple implementation<br>✅ No overhead                                           | ❌ Exposes internal structure<br>❌ Tight coupling<br>❌ Hard to extend    |
| **Strategy Pattern**         | ✅ Runtime strategy switching<br>✅ Clean separation                                 | ❌ No standardized traversal interface<br>❌ More complex for simple cases |

---

## 🎯 **When to Use the Iterator Pattern**

### **✅ Perfect For:**

- **Complex collections** (trees, graphs, custom data structures)
- **Multiple traversal strategies** (BFS, DFS, inorder, etc.)
- **Encapsulation requirements** (hide internal structure)
- **Framework development** (provide consistent APIs)
- **Large datasets** (lazy evaluation, memory efficiency)

### **❌ Avoid When:**

- **Simple linear collections** (arrays, lists)
- **Single traversal strategy**
- **Performance-critical applications** (iterator overhead)
- **Small, static collections**

---

## 🔧 **Advanced Iterator Pattern Implementations**

### **1. Lazy Iterator for Large Collections**

```kotlin
class LazyFileIterator(private val root: File) : Iterator<File> {
    private val stack = ArrayDeque<File>()
    private var currentFile: File? = null

    init {
        if (root.exists()) {
            stack.push(root)
        }
    }

    override fun hasNext(): Boolean {
        if (currentFile != null) return true

        while (stack.isNotEmpty()) {
            val file = stack.pop()
            if (file.isDirectory) {
                file.listFiles()?.forEach { stack.push(it) }
            } else {
                currentFile = file
                return true
            }
        }
        return false
    }

    override fun next(): File {
        if (!hasNext()) throw NoSuchElementException()
        val file = currentFile!!
        currentFile = null
        return file
    }
}
```

### **2. Filtering Iterator**

```kotlin
class FilteringIterator<T>(
    private val iterator: Iterator<T>,
    private val predicate: (T) -> Boolean
) : Iterator<T> {
    private var nextElement: T? = null
    private var hasNextElement = false

    override fun hasNext(): Boolean {
        if (hasNextElement) return true

        while (iterator.hasNext()) {
            val element = iterator.next()
            if (predicate(element)) {
                nextElement = element
                hasNextElement = true
                return true
            }
        }
        return false
    }

    override fun next(): T {
        if (!hasNext()) throw NoSuchElementException()
        val element = nextElement!!
        nextElement = null
        hasNextElement = false
        return element
    }
}
```

### **3. Composite Iterator**

```kotlin
class CompositeIterator(private val iterators: List<Iterator<File>>) : Iterator<File> {
    private var currentIteratorIndex = 0

    override fun hasNext(): Boolean {
        while (currentIteratorIndex < iterators.size) {
            if (iterators[currentIteratorIndex].hasNext()) {
                return true
            }
            currentIteratorIndex++
        }
        return false
    }

    override fun next(): File {
        if (!hasNext()) throw NoSuchElementException()
        return iterators[currentIteratorIndex].next()
    }
}
```

---

## 🚀 **Real-World Applications**

### **1. File System Browsers**

- **Windows Explorer, macOS Finder** - Use iterators for file traversal
- **IDE file trees** - Navigate project structure efficiently
- **Backup systems** - Traverse file hierarchies for backup operations

### **2. Database Query Results**

- **JDBC ResultSet** - Iterator pattern for database results
- **ORM frameworks** - Lazy loading of related objects
- **Stream processing** - Handle large result sets efficiently

### **3. Collection Frameworks**

- **Java Collections Framework** - Standard iterator implementations
- **C++ STL** - Iterator-based algorithms
- **Python generators** - Iterator pattern for memory efficiency

---

## 📈 **Performance Considerations**

### **Memory Efficiency**

- **Lazy evaluation** - Load elements only when needed
- **Stream processing** - Handle large datasets without loading everything into memory
- **Iterator pooling** - Reuse iterator objects for better performance

### **Time Complexity**

- **BFS vs DFS** - Choose based on search requirements
- **Caching** - Cache frequently accessed elements
- **Parallel iteration** - Use multiple threads for large collections

---

## 🔗 **Related Design Patterns**

- **[Strategy Pattern](/2024-12-26-design-pattern-25-strategy-pattern/)** - For different traversal algorithms
- **[Composite Pattern](/2024-12-10-design-pattern-13-composite-pattern/)** - For tree-like structures
- **[Factory Method Pattern](/2024-07-07-design-pattern-6-factory-method-pattern/)** - For creating appropriate iterators
- **[Command Pattern](/2024-12-21-design-pattern-19-command-pattern/)** - For undoable traversal operations

---

## 📚 **Best Practices**

### **1. Iterator Design**

- **Keep iterators lightweight** - Avoid storing large amounts of state
- **Handle concurrent modification** - Detect when collection changes during iteration
- **Provide fail-fast behavior** - Fail immediately when collection is modified

### **2. Performance Optimization**

- **Use lazy evaluation** for large collections
- **Implement caching** for expensive operations
- **Consider parallel iteration** for CPU-intensive operations

### **3. Error Handling**

- **Validate iterator state** before operations
- **Handle empty collections** gracefully
- **Provide meaningful error messages**

---

## 🎯 **Conclusion**

The **Iterator Pattern** provides a powerful way to traverse collections while maintaining encapsulation and flexibility. By separating traversal logic from collection structure, it enables:

- **Clean, maintainable code** with clear separation of concerns
- **Multiple traversal strategies** without changing client code
- **Consistent interfaces** across different collection types
- **Easy extension** for new traversal methods

This pattern is essential for building robust, scalable systems that need to handle complex data structures efficiently. Whether you're building file system tools, database applications, or collection frameworks, the Iterator Pattern provides the foundation for flexible and maintainable traversal logic.

**Next Steps:**

- Explore the **[Strategy Pattern](/2024-12-26-design-pattern-25-strategy-pattern/)** for different traversal algorithms
- Learn about the **[Composite Pattern](/2024-12-10-design-pattern-13-composite-pattern/)** for tree-like structures
- Discover the **[Factory Method Pattern](/2024-07-07-design-pattern-6-factory-method-pattern/)** for creating iterators

---

_Ready to implement the Iterator Pattern in your projects? Download the complete code examples from our [design_pattern repository](https://github.com/nickhuangcyh/design_pattern) and start building more flexible, maintainable systems today!_
