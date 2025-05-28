---
layout: post
title: 3D Graphic Engine Tips - 三角形 x UV mapping x Vertices & Indices
date: 2022-01-02 10:04:00 +0800
description: 寫 3D 繪圖程式必需要知道的知識，這篇帶你快速掌握基本建模邏輯與映射概念。
tags: [iOS, Android, 3D, OpenGL, ARKit, ARCore, Sceneform, SceneKit]
categories: [Mobile]
toc:
#   beginning: true
  sidebar: right
thumbnail: /assets/img/nick-brunner-k4xDXNskVsQ-unsplash.jpg
---

## 前言

前陣子在 iOS、Android 上開發 AR 功能，發現自己對 3D 繪圖完全陌生。後來花了一些時間深入理解，終於拼湊出一些觀念，這篇筆記整理了幾個核心概念，分享給也在摸索 3D 的你。

---

## 3D 世界中的所有物件，都是由「三角形」構成的

{% include figure.liquid path="https://www.researchgate.net/profile/Predrag-Novakovic-2/publication/322096576/figure/fig2/AS:631626539229214@1527602910310/3D-mesh-triangles-with-different-resolution-3D-Modelling-for-programmers-Available-at.png" title="不同解析度的三角形組合 3D 模型" %}

在 3D 建模中，幾乎所有物件都是由無數「小三角形」構成，這些三角形稱為 Mesh。解析度越高，Mesh 越密集。

---

## UV Mapping 是什麼？

> 將 2D 圖像投影到 3D 模型表面，讓模型擁有貼圖的過程

這個過程就像把一張皮膚貼到一個立體物件上，稱為 UV 映射。

{% include figure.liquid path="https://upload.wikimedia.org/wikipedia/commons/0/04/UVMapping.png" title="UV Mapping 示意圖" %}

舉例來說，立方體的六個面可以展開成 2D 平面（像剪紙一樣），再把對應的貼圖壓上去，就能在 3D 空間正確呈現圖像。

UV 座標以 (U, V) 表示，U 為橫軸，V 為縱軸，左上為 (0,0)，右下為 (1,1)。

{% include figure.liquid path="https://wiki.povray.org/uploaded/4/48/RefImgBoxmap.gif" title="UV Box Coordinates" %}

---

## Vertices & Indices（頂點與索引）

在電腦繪圖中，我們不會直接畫三角形，而是透過記錄「哪些頂點構成哪些三角形」，這就需要：

- **Vertices（頂點）**：記錄每個空間位置  
- **Indices（索引）**：定義三角形的連接關係

{% include figure.liquid path="https://www.oreilly.com/library/view/real-time-3d-graphics/9781788629690/assets/1ccc3e64-684e-4098-b910-505346c4b396.png" title="頂點與索引" %}

例如三角形順序為 [0, 2, 1]，代表從第 0 個頂點連接到第 2、再到第 1。

我們通常會採用逆時鐘方向定義一個「面」的正面。

---

### 補充：使用「安培右手定則」來判斷面朝向

手掌沿著索引順序旋轉，大拇指所指的方向就是該面的朝向。  
若希望同時呈現正反兩面，可以定義兩組索引：

```text
正面： [0, 2, 1]  
背面： [0, 1, 2]
```

> 💡 使用這種方式畫出雙面三角形，是 AR 與 3D 遊戲中常見技巧。

---

## 總結

不管是 iOS、Android 還是 Web，只要涉及 3D 技術、遊戲開發、AR 或 VR，這些基礎觀念都是不可或缺的。希望這篇筆記能幫助你入門 3D 世界的繪圖邏輯 🚀

> ##### TIP
> 
> 如果你有不同觀點、技術經驗或想要討論進一步的 3D 架構設計，歡迎留言或寄信給我，我們一起交流成長 🙂
{: .block-tip }