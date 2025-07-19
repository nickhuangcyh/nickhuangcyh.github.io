---
layout: post
title: "3D 圖形引擎基礎：三角形、UV 映射、頂點與索引全解析"
date: 2022-01-02 10:04:00 +0800
description: "3D 圖形程式設計必備知識。掌握建模邏輯、UV 映射觀念、頂點與索引管理，適用於遊戲開發、AR 與 3D 應用。"
tags: [3D Graphics, OpenGL, Game Development, AR, VR, Computer Graphics, Rendering, Modeling, UV Mapping, Vertices, Indices]
categories: [Computer Graphics, Game Development]
toc:
  sidebar: right
thumbnail: /assets/img/nick-brunner-k4xDXNskVsQ-unsplash.jpg
---

## 前言

最近在 iOS、Android 開發 AR 功能時，發現自己對 3D 圖形完全陌生。花了不少時間深入理解，終於拼湊出一些基礎觀念。本文整理幾個核心概念，分享給同樣在 3D 圖形領域探索的朋友。

掌握 3D 圖形基礎對於：

- **遊戲開發**：打造沉浸式 3D 世界
- **AR/VR 應用**：建構擴增與虛擬實境體驗
- **電腦圖學**：理解渲染流程
- **行動開發**：實作 3D 功能於手機平台
  都非常重要。

---

## 3D 世界中的所有物件都是「三角形」組成

{% include figure.liquid path="https://www.researchgate.net/profile/Predrag-Novakovic-2/publication/322096576/figure/fig2/AS:631626539229214@1527602910310/3D-mesh-triangles-with-different-resolution-3D-Modelling-for-programmers-Available-at.png" title="不同解析度的 3D 三角網格模型" %}

在 3D 建模中，幾乎所有物件都是由無數「小三角形」組成，稱為 **Mesh（三角網格）**。解析度越高，三角形越密集。

### 為什麼是三角形？

三角形是 3D 圖形的基礎單位，原因如下：

- **平面性**：三點必共平面，計算簡單
- **GPU 最佳化**：顯示卡硬體專為三角形渲染設計
- **彈性高**：任何複雜形狀都能用三角形近似
- **效率高**：三角形是最簡單的多邊形

### 三角形解析度的影響

| 解析度 | 三角形數量   | 品質     | 效能   |
| ------ | ------------ | -------- | ------ |
| 低     | 100-1,000    | 基本輪廓 | 渲染快 |
| 中     | 1,000-10,000 | 細節佳   | 平衡   |
| 高     | 10,000+      | 高細節   | 較慢   |

---

## 什麼是 UV 映射？

> 將 2D 圖片「貼」到 3D 模型表面，讓模型有真實質感

這個過程稱為 **UV 映射**，就像給 3D 物件「穿皮膚」。

{% include figure.liquid path="https://upload.wikimedia.org/wikipedia/commons/0/04/UVMapping.png" title="UV 映射示意圖" %}

例如立方體的六個面可展平成 2D 平面（像紙盒展開），再將對應紋理貼上，3D 空間就能正確顯示圖片。

### UV 座標系統

UV 座標以 (U, V) 表示：

- **U**：水平軸（0~1）
- **V**：垂直軸（0~1）
- **原點**：左上角 (0,0)
- **終點**：右下角 (1,1)

{% include figure.liquid path="https://wiki.povray.org/uploaded/4/48/RefImgBoxmap.gif" title="UV Box 座標" %}

### 常見 UV 映射技術

#### 1. 平面映射

- 從單一方向投影紋理
- 適合平面物件
- 簡單但易變形

#### 2. 圓柱映射

- 將紋理包覆圓柱體
- 適合瓶子、管狀、角色
- 保持比例

#### 3. 球面映射

- 將紋理貼到球體表面
- 適合行星、球、頭部
- 極點易失真

---

## 頂點與索引（Vertex & Index 管理）

在電腦圖學中，我們不直接畫三角形，而是記錄「哪些頂點組成哪些三角形」，需用：

- **頂點（Vertices）**：記錄每個空間座標
- **索引（Indices）**：定義三角形連接關係

{% include figure.liquid path="https://www.oreilly.com/api/v2/epubs/9781788629690/files/assets/1ccc3e64-684e-4098-b910-505346c4b396.png" title="頂點與索引示意" %}

例如索引順序 [0, 2, 1] 代表從頂點 0 連到 2，再到 1。

### 頂點資料結構

```cpp
struct Vertex {
    float x, y, z;        // 位置
    float u, v;           // UV 座標
    float nx, ny, nz;     // 法向量
    float r, g, b, a;     // 顏色
};
```

### 索引緩衝區範例

```cpp
// 定義頂點
Vertex vertices[] = {
    {0.0f, 0.0f, 0.0f, 0.0f, 0.0f},  // 頂點 0
    {1.0f, 0.0f, 0.0f, 1.0f, 0.0f},  // 頂點 1
    {0.5f, 1.0f, 0.0f, 0.5f, 1.0f}   // 頂點 2
};

// 用索引定義三角形
unsigned int indices[] = {
    0, 2, 1  // 三角形 1
};
```

### 記憶體最佳化

使用索引可大幅節省記憶體：

- **無索引**：每個三角形都存 3 個完整頂點
- **有索引**：頂點可被多個三角形共用
- **節省**：複雜模型可省下 70% 以上記憶體

---

## 面朝向：右手定則

通常用逆時針方向定義「正面」。
若要同時顯示正反面，可定義兩組索引：

```text
Front face: [0, 2, 1]
Back face:  [0, 1, 2]
```

### 右手定則應用

1. **大拇指** 指向你想讓面朝的方向
2. **手指彎曲** 按頂點順序
3. **法向量** 指向大拇指方向

> 💡 利用這方法做雙面三角形，是 AR 與 3D 遊戲常見技巧。

### 剔除（Culling）最佳化

```cpp
// 啟用背面剔除
glEnable(GL_CULL_FACE);
glCullFace(GL_BACK);

// 若需雙面渲染
glDisable(GL_CULL_FACE);
```

---

## 實務應用場景

### 遊戲開發

- **角色建模**：高細節 3D 角色與貼圖
- **場景設計**：建築、地形、道具
- **UI 元素**：3D 選單與 HUD
- **粒子系統**：複雜視覺特效

### AR/VR 應用

- **物件辨識**：3D 模型比對
- **空間重建**：環境掃描
- **虛擬物件**：互動式 3D 元素
- **手勢追蹤**：動作辨識

### 行動開發

- **ARKit（iOS）**：蘋果 AR 框架
- **ARCore（Android）**：Google AR 平台
- **SceneKit**：iOS 3D 圖形框架
- **Sceneform**：Android 3D 渲染庫

---

## 效能考量

### 三角形數量最佳化

| 平台         | 建議三角形數     |
| ------------ | ---------------- |
| 手機（低階） | 1,000 - 5,000    |
| 手機（高階） | 5,000 - 20,000   |
| 桌機         | 10,000 - 100,000 |
| VR           | 50,000 - 200,000 |

### 渲染流程最佳化

1. **細節等級（LOD）**：依距離切換不同細節模型
2. **視錐剔除**：只渲染可見物件
3. **遮擋剔除**：略過被遮擋物件
4. **紋理串流**：按需載入紋理

### 記憶體管理

```cpp
// 高效頂點緩衝區
glGenBuffers(1, &VBO);
glBindBuffer(GL_ARRAY_BUFFER, VBO);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

// 索引緩衝區
glGenBuffers(1, &EBO);
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);
```

---

## 3D 圖形最佳實踐

### 建模建議

- **簡單為主**：先做低多邊形模型
- **優化拓撲**：頂點分布有效率
- **規劃 UV 版型**：紋理空間利用率高
- **效能測試**：實機 profile

### 紋理優化

- **2 的次方**：用 512x512、1024x1024 等尺寸
- **壓縮格式**：選擇合適的紋理格式
- **Mipmaps**：產生多層次紋理提升效能
- **圖集（Atlas）**：多圖合併減少切換

### 程式架構

```cpp
class Mesh {
private:
    std::vector<Vertex> vertices;
    std::vector<unsigned int> indices;
    unsigned int VAO, VBO, EBO;

public:
    void setupMesh();
    void draw();
    void cleanup();
};
```

---

## 常見問題與解法

### UV 映射問題

**問題**：紋理拉伸或變形
**解法**：

- 正確展開 UV
- 避免 UV 重疊
- 保持紋理密度一致

### 效能瓶頸

**問題**：模型複雜導致渲染慢
**解法**：

- 降低三角形數
- 實作 LOD 系統
- 採用高效渲染技術
- Profile 找出瓶頸

### 記憶體問題

**問題**：記憶體佔用過高
**解法**：

- 使用索引緩衝區
- 紋理串流
- 精簡頂點資料
- 採用壓縮技術

---

## 工具與資源

### 3D 建模軟體

- **Blender**：免費強大
- **Maya**：專業級
- **3ds Max**：業界標準
- **SketchUp**：易上手

### 遊戲引擎

- **Unity**：跨平台
- **Unreal Engine**：高畫質
- **Godot**：開源輕量
- **Cocos2d-x**：行動優先

### 學習資源

- [OpenGL 教學](https://learnopengl.com/)
- [WebGL 基礎](https://webglfundamentals.org/)
- [Three.js 文件](https://threejs.org/docs/)
- [Unity 手冊](https://docs.unity3d.com/)

---

## 延伸閱讀

- [iOS AR 開發入門](/2022-01-03-p2p-tech-1-ipv4-nat/)
- [WebRTC 與即時通訊](/2022-01-04-p2p-tech-3-webrtc-kvs/)
- [進階圖片優化技巧](/2024-01-27-advanced-images/)

---

## 小結

不論你做 iOS、Android 還是 Web，這些基礎觀念都是 3D 技術、遊戲開發、AR/VR 應用的必備基石。希望本文能幫助你理解 3D 圖形程式設計的基本邏輯！🚀

### 重點回顧

1. **三角形是基礎**：所有 3D 物件都由三角形組成
2. **UV 映射很重要**：讓 3D 表面能貼圖
3. **頂點與索引管理**：提升記憶體與渲染效率
4. **效能優化**：平衡品質與速度
5. **多練習多實作**：從簡單做起逐步進階

> ##### 小提醒
>
> 如果你有不同觀點、技術經驗，或想討論進階 3D 架構設計，歡迎留言或來信，一起學習成長！🙂
> {: .block-tip }
