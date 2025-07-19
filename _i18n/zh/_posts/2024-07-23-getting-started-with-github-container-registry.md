---
layout: post
title: "GitHub Container Registry (GHCR) 入門全攻略：容器映像管理與 CI/CD 實戰"
date: 2024-07-23 18:00:00 +0800
description: "全面掌握 GitHub Container Registry，涵蓋 Docker 映像管理、GitHub Actions 自動化與容器化應用 CI/CD 最佳實踐。"
tags:
  [
    GitHub Container Registry,
    Docker,
    Container Registry,
    GitHub Actions,
    CI/CD,
    DevOps,
    Container Images,
    Docker Hub Alternative,
    Container Management,
  ]
categories: [DevOps, GitHub, Container Technology, CI/CD]
toc:
  sidebar: right
thumbnail: /assets/img/github_container_registry.png
---

## 🚀 **為什麼選擇 GitHub Container Registry？**

隨著專案數量和環境需求的增長，我們將原本基於 Docker 的 Android Jenkins Server 架構升級為主 Jenkins Server（Master）+ 多個 Android 建構環境（Slave），後者透過 Docker 動態建立，確保環境乾淨。本文記錄了這一轉型過程，既是個人學習總結，也為其他開發者提供參考。

**GHCR 主要優勢：**

- 🏛️ **公有包免費**，開源專案零成本
- 🔒 **內建安全**，自動漏洞掃描
- 🔄 **GitHub Actions 無縫整合**，CI/CD 自動化
- 📦 **統一映像管理**，集中儲存
- 🛡️ **細緻權限控制**

---

## 🗂️ **文章結構與學習目標**

本指南適合初學者與希望深入整合 GitHub 新工具的開發者。透過清晰步驟與實用技巧，帶你掌握如何將容器映像推送到 GHCR，並用 GitHub Actions 自動化建構與部署流程。

**你將學到：**

- 🐳 **Docker 映像建立與管理**
- 🛠️ **GHCR 設定與使用**
- ⚡ **GitHub Actions 自動化容器建構**
- 🔒 **容器安全最佳實踐**
- 📈 **CI/CD 流水線整合策略**

---

## 🛠️ **環境準備與專案初始化**

以 Node.js + Express 為例，快速建立示範專案：

### **1. 建立專案目錄**

```bash
mkdir node_sample
cd node_sample
```

### **2. 初始化 Node.js 專案**

```bash
npm init -y
npm install express
```

### **3. 建立應用主檔案**

```bash
vim app.js
```

**範例程式碼：**

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

### **4. 建立 .gitignore 檔案**

> 💡 **專業建議：** 使用 [gitignore.io](https://gitignore.io/) 產生適合 Node.js 的 `.gitignore` 檔案。

### **5. 本地測試應用**

```bash
node app.js
```

瀏覽器訪問 `localhost:3000` 查看效果。

{% include figure.liquid path="assets/img/github_container_registry_sample_website.png" title="範例網站輸出" %}

---

## 🐳 **撰寫 Dockerfile 實現容器化**

```bash
vim Dockerfile
```

**Dockerfile 範例：**

```dockerfile
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
```

**關鍵說明：**

- **FROM node:latest**：基礎映像
- **WORKDIR /usr/src/app**：工作目錄
- **COPY ...**：複製相依與主程式
- **RUN npm install**：安裝相依
- **EXPOSE 3000**：暴露埠口
- **CMD ...**：啟動指令

---

## 📦 **上傳 Docker 映像到 GHCR**

映像建構完成後，有兩種上傳方式：

1. **命令列手動上傳**
2. **GitHub Actions 自動上傳**

---

### **方法一：命令列手動上傳**

#### **1. 建構映像**

```bash
docker build -t node_sample .
```

#### **2. 查看映像**

```bash
docker images
```

#### **3. 映像打標籤**

```bash
docker tag node_sample:latest ghcr.io/{NAMESPACE}/node_sample:latest
```

> ⚠️ `{NAMESPACE}` 請替換為你的 GitHub 使用者名稱

#### **4. 產生 Personal Access Token**

1. GitHub 個人設定 → Developer settings → Personal access tokens
2. 產生新 token，勾選 `write:packages`、`read:packages`、`delete:packages`（可選）

#### **5. 登入 GHCR**

```bash
export CR_PAT=YOUR_TOKEN
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```

#### **6. 推送映像**

```bash
docker push ghcr.io/{NAMESPACE}/node_sample:latest
```

---

### **方法二：GitHub Actions 自動化上傳**

在 `node_sample` 目錄下建立工作流程：

```bash
mkdir -p .github/workflows
vim .github/workflows/deploy-image.yml
```

**workflow 設定：**

```yaml
name: Build and Push Docker Image
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```

---

## 🔍 **驗證與拉取映像**

1. GitHub 個人主頁 → Packages 查看上傳的映像
2. 拉取映像並執行：

```bash
docker pull ghcr.io/{NAMESPACE}/node_sample:latest
docker run -p 3000:3000 ghcr.io/{NAMESPACE}/node_sample:latest
```

---

## 📊 **GHCR 與 Docker Hub 對比**

| 功能        | GHCR              | Docker Hub  |
| ----------- | ----------------- | ----------- |
| 公有包免費  | ✅ 無限           | ✅ 無限     |
| 私有包免費  | ✅ 500MB/月       | ❌ 付費     |
| GitHub 整合 | ✅ 原生           | ⚠️ 有限     |
| 漏洞掃描    | ✅ 內建           | ✅ 可用     |
| 權限控制    | ✅ 細緻           | ⚠️ 基礎     |
| CI/CD 整合  | ✅ GitHub Actions | ⚠️ 需第三方 |

---

## 🛡️ **容器安全最佳實踐**

### 1. 指定基礎映像版本

```dockerfile
# ❌ 不推薦
FROM node:latest
# ✅ 推薦
FROM node:18-alpine
```

### 2. 多階段建構

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

### 3. 漏洞掃描

```yaml
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
    format: "sarif"
    output: "trivy-results.sarif"
```

---

## 🚨 **常見問題與解決方案**

### 1. 認證失敗

```bash
Error: unauthorized: authentication required
```

**解決：** 檢查 token 權限、使用者名稱與 token 是否正確

### 2. 權限拒絕

```bash
Error: denied: permission_denied
```

**解決：** 檢查包可見性、倉庫權限、token 範圍

### 3. 映像未找到

```bash
Error: manifest for ghcr.io/user/image:tag not found
```

**解決：** 檢查映像名稱、tag、命名空間與推送狀態

---

## 📈 **進階用法與自動化場景**

### 1. 多架構映像建構

```yaml
- name: Build and push multi-arch image
  uses: docker/build-push-action@v5
  with:
    context: .
    platforms: linux/amd64,linux/arm64
    push: true
    tags: ${{ steps.meta.outputs.tags }}
```

### 2. 自動版本號產生

```yaml
- name: Generate version tag
  id: version
  run: echo "::set-output name=version::$(date +'%Y%m%d')-$(git rev-parse --short HEAD)"
```

### 3. 條件發佈

```yaml
- name: Push to Registry
  if: github.ref == 'refs/heads/main'
  run: docker push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.version.outputs.version }}
```

---

## 🔗 **相關文章推薦**

- [完整 Git 工作流指南](/2025-05-18-how-to-use-multiple-github-accounts-using-ssh)
- [macOS 開發環境建置](/2024-01-11-setup-development-environment-on-a-new-macos)
- [Jenkins 伺服器設定](/2024-08-15-jenkins-2-how-to-setup-jenkins-server)
- [SSH 金鑰管理](/2024-08-02-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8.8)

---

## ✅ **總結**

GitHub Container Registry 為容器映像管理與 CI/CD 提供了強大的一體化解決方案。透過本指南，你已學會：

**核心收穫：**

- 🐳 **高效建立與管理 Docker 映像**
- 🛠️ **用 GitHub Actions 實現自動化工作流程**
- 🔒 **容器安全最佳實踐**
- 📦 **流水線整合與自動化管理**

**後續建議：**

1. 深入體驗漏洞掃描等進階功能
2. 實現多架構映像建構
3. 設定映像自動化測試
4. 考慮映像簽章增強安全

---

**💡 專業建議：** 善用 GHCR 內建漏洞掃描，自動發現並修復安全隱患。

**🔔 關注我們：** 持續關注 DevOps 系列，獲取更多容器與 CI/CD 實戰乾貨！

---

**📚 延伸閱讀：**

- [GHCR 官方文件](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker 最佳實踐](https://docs.docker.com/develop/dev-best-practices/)
- [GitHub Actions 文件](https://docs.github.com/en/actions)
- [容器安全指南](https://cloud.google.com/architecture/best-practices-for-building-containers)
