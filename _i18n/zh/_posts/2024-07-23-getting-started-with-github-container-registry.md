---
layout: post
title: GitHub Container Registry 完整教學：容器映像管理與 CI/CD 部署指南
date: 2024-07-23 18:00:00 +0800
description: 學會如何使用 GitHub Container Registry 管理 Docker 映像與建置 CI/CD 流程。從 Jenkins Master-Slave 架構實例深入了解容器化部署、版本管理、身份驗證與最佳實踐。適用於 DevOps 工程師。
tags: [GitHub Container Registry, Docker Registry, Container Management, CI/CD Pipeline, DevOps, Jenkins Master-Slave, GitHub Actions, Image Versioning]
categories: [DevOps]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/github_container_registry.png
---

## 為什麼會寫這篇文章

隨著公司專案數量增加，每個專案的環境需求也變得更加多樣化。我們決定將原本使用 Docker 建置的 Android Jenkins Server 轉型為更靈活的架構。

新架構包含一個主要的 Jenkins Server（Master）搭配多個 Android Build Environment（Slave）。這些 Slave 透過 Docker 創建乾淨的環境，確保每次建置都在一致的環境中進行。

這篇文章旨在記錄此轉型過程。不僅作為個人學習的回顧，也希望能對其他面臨類似挑戰的開發者提供實用幫助。

---

## 文章簡介

本文將引導兩類讀者：CI/CD 初學者以及希望深入了解 GitHub 新工具的開發者。透過簡明的指南和實用的技巧，你將學會如何將容器映像推送至 GitHub Container Registry。

我將一步步展示如何設定 GitHub Actions，讓構建與部署過程完全自動化。這將讓你的開發工作變得更加高效，同時減少人為錯誤的機會。

---

## 開始之前

在深入 GitHub Container Registry 之前，我們需要準備一個示範應用程式。讓我們透過 `express` 框架，快速搭建一個運行於 Node.js 上的簡易應用。

這個應用程式將作為我們後續容器化和部署的基礎範例。

---

### 建立專案資料夾

首先，我們需要為示範應用程式建立一個專案資料夾：

```bash
mkdir node_sample
cd node_sample
```

---

### 安裝 Express 套件

接下來初始化 Node.js 專案並安裝 Express 框架。`-y` 參數會自動接受所有預設設定：

```bash
npm init -y
npm install express
```

---

### 建立應用程式主檔案

現在建立應用程式的主要檔案 `app.js`：

```bash
vim app.js
```

將下列程式碼貼入 `app.js` 檔案中。這是一個簡單的 Express 伺服器，會在根路徑回應 "Hello, World!"：

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

---

### 建立 `.gitignore` 檔案

為了避免將不必要的檔案推送到版本控制系統，我們需要建立 `.gitignore` 檔案：

> ##### TIP
>
> 請至 [gitignore.io](https://gitignore.io/) 產生 `.gitignore` 檔案，選擇 Node 類型即可。
> {: .block-tip }

---

### 測試應用程式

現在讓我們測試應用程式是否正常運作：

```bash
node app.js
```

在瀏覽器中打開 `localhost:3000`，你應該會看到以下畫面：

{% include figure.liquid path="assets/img/github_container_registry_sample_website.png" title="Sample Website Output" %}

---

## 建立 Dockerfile

接下來我們要將應用程式容器化。Dockerfile 是告訴 Docker 如何建置容器映像的腳本檔案：

```bash
vim Dockerfile
```

將以下內容加入 Dockerfile。這個檔案定義了容器的基礎映像、工作目錄、需要複製的檔案以及啟動指令：

```dockerfile
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
```

---

## 上傳 Docker Image 到 GitHub Container Registry

完成 Dockerfile 後，我們要將建置好的容器映像上傳到 GitHub Container Registry (GHCR)。GHCR 是 GitHub 提供的容器映像託管服務，與 GitHub 帳號整合度很高。

有兩種方式可以將映像上傳到 GHCR：

1. **命令列手動上傳** - 適合快速測試或一次性部署
2. **GitHub Actions 自動化上傳** - 適合持續整合/部署 (CI/CD) 流程

---

## 方法一：命令列手動上傳

讓我們先學習如何透過命令列手動上傳容器映像。這種方法可以讓你直接控制整個上傳流程。

---

### 步驟 1：建置 Docker 映像

使用 Dockerfile 建置容器映像。`.` 表示在當前目錄尋找 Dockerfile：

```bash
docker build -t node_sample .
```

{% include figure.liquid path="assets/img/github_container_registry_docker_build_image.png" title="Build Image" %}

---

### 步驟 2：檢視建置結果

確認映像是否成功建置：

```bash
docker images
```

你應該會看到剛才建置的 `node_sample` 映像出現在清單中。

{% include figure.liquid path="assets/img/github_container_registry_docker_images.png" title="Docker Images" %}

---

### 步驟 3：為映像加上標籤

為了上傳到 GHCR，我們需要將映像標記為符合 GHCR 格式的名稱：

```bash
docker tag node_sample:latest ghcr.io/{NAMESPACE}/node_sample:latest
```

> ##### TIP
>
> 記得將 `{NAMESPACE}` 替換為你的 GitHub 帳號名稱。例如：`ghcr.io/john-doe/node_sample:latest`
> {: .block-tip }

---

### 步驟 4：產生個人存取權杖

在登入 GHCR 之前，我們需要生成一組個人存取權杖 (Personal Access Token) 來進行身份驗證。

按照以下步驟在 GitHub 上產生權杖：

> 打開 GitHub → 右上角 Profile → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

在權限設定中，請勾選以下三個套件相關權限：
- `write:packages` - 上傳套件權限
- `read:packages` - 讀取套件權限  
- `delete:packages` - 刪除套件權限

{% include figure.liquid path="assets/img/github_container_registry_generate_github_token.png" title="Generate GitHub Token" %}

---

### 步驟 5：登入 GitHub Container Registry

使用剛才產生的權杖登入 GHCR。首先設定環境變數：

```bash
export CR_PAT=YOUR_TOKEN
```

然後使用 Docker 登入指令：

```bash
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```

看到 "Login Succeeded" 訊息就表示登入成功！

---

### 步驟 6：推送映像到 GHCR

現在可以將映像推送到 GitHub Container Registry：

```bash
docker push ghcr.io/{NAMESPACE}/node_sample:latest
```

推送完成後，你可以在 GitHub 的 Packages 頁面看到剛才上傳的容器映像。

{% include figure.liquid path="assets/img/github_container_registry_github_package.png" title="Image Uploaded to GHCR" %}

---

## 方法二：使用 GitHub Actions 自動化上傳

相較於手動上傳，GitHub Actions 提供了更優雅的自動化解決方案。每當程式碼有變更時，它會自動建置並推送容器映像，大幅提升開發效率。

GitHub Actions 的優勢包括：
- **自動觸發**：程式碼推送時自動執行
- **無需本機環境**：在 GitHub 的雲端環境中執行
- **內建權限管理**：無需手動設定存取權杖

---

### 建立 Workflow 檔案

首先在專案中建立 GitHub Actions 的工作流程檔案：

```bash
mkdir -p .github/workflows
vim .github/workflows/deploy-image.yml
```

將以下 YAML 配置貼入檔案中。這個工作流程會在推送到 `release` 分支時自動執行：

```yaml
name: Create and publish a Docker image
on:
  push:
    branches: ["release"]
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      attestations: write
      id-token: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Log in to the Container registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
      - name: Build and push Docker image
        id: push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
      - name: Generate artifact attestation
        uses: actions/attest-build-provenance@v1
        with:
          subject-name: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME}}
          subject-digest: ${{ steps.push.outputs.digest }}
          push-to-registry: true
```

### Workflow 設定說明

這個 GitHub Actions 工作流程包含以下關鍵設定：

- **觸發條件**：當推送到 `release` 分支時執行
- **權限設定**：包含讀取程式碼和寫入套件的權限
- **執行步驟**：自動檢出程式碼、登入 GHCR、建置並推送映像

---

### 推送專案到 GitHub

現在將完整的 `node_sample` 專案推送到 GitHub 儲存庫。建議先推送到 `main` 分支，然後建立 `release` 分支來觸發自動化流程：

```bash
git init
git add .
git commit -m "Initial commit with Node.js app and GitHub Actions workflow"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/node_sample.git
git push -u origin main

# 建立並推送 release 分支來觸發 workflow
git checkout -b release
git push -u origin release
```

當你推送到 `release` 分支時，GitHub Actions 會自動執行以下流程：
1. 檢出程式碼
2. 建置 Docker 映像
3. 推送到 GitHub Container Registry

{% include figure.liquid path="assets/img/github_container_registry_github_package.png" title="Published Package on GitHub" %}

---

## 使用已上傳的容器映像

當容器映像成功上傳到 GHCR 後，你和其他開發者就可以在任何地方使用這個映像。以下是兩種常見的使用方式：

---

### 方式一：直接下載並執行

使用 Docker 指令直接從 GHCR 下載並執行容器：

```bash
docker pull ghcr.io/nickhuangcyh/node_sample:TAG
docker run -p 3000:3000 ghcr.io/nickhuangcyh/node_sample:TAG
```

---

### 方式二：作為基礎映像使用

在其他專案的 Dockerfile 中，將 GHCR 上的映像作為基礎映像：

```dockerfile
FROM ghcr.io/nickhuangcyh/node_sample:TAG
# 在此基礎上添加額外的配置或應用程式
```

這種方式特別適合建立複合式應用程式或在既有映像上進行客製化。

{% include figure.liquid path="assets/img/github_container_registry_download_image.png" title="Download Image" %}

> ##### TIP
>
> 您可於此 [node_sample](https://github.com/nickhuangcyh/design_pattern) 下載 `node_sample` 的完整程式碼來練習。
> {: .block-tip }

---

## 總結

透過本文的學習，你已經掌握了 GitHub Container Registry 的兩種使用方式：

**手動上傳方式**適合快速測試和學習，讓你了解整個容器化流程的每個步驟。

**GitHub Actions 自動化方式**則是生產環境的最佳選擇，提供了可靠的 CI/CD 整合。當程式碼有任何變更時，系統會自動建置新的容器映像並部署，大幅提升開發團隊的工作效率。

下一步，你可以嘗試將這些技術應用到自己的專案中，或是探索更進階的 GitHub Actions 功能，如多階段建置、條件部署等。
