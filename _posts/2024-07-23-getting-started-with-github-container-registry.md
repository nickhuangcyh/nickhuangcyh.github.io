---
layout: post
title: Getting Started with GitHub Container Registry
date: 2024-07-23 18:00:00 +0800
description: A Guide to Using and Managing Container Images
tags: [Docker, Container Registry, GitHub Actions, CI/CD, DevOps Tools]
categories: [DevOps]
toc:
#   beginning: true
  sidebar: right
thumbnail: /assets/img/github_container_registry.png
---

## 為什麼會寫這篇文章

隨著公司專案數量增加，每個專案的環境需求也變得更加多樣化。我們決定將原本使用 Docker 建置的 Android Jenkins Server 轉型為更靈活的架構：一個主要的 Jenkins Server（Master）搭配多個 Android Build Environment（Slave），後者透過 Docker 創建乾淨的環境。這篇文章旨在記錄此過程，不僅作為個人學習的回顧，也希望能對其他開發者提供幫助。

---

## 文章簡介

本文將引導初學者及希望深入了解如何將 GitHub 的新工具融入 CI/CD 流程的開發者，透過簡明的指南和實用的技巧，學習如何將容器映像推送至 GitHub Container Registry。我將一步步展示如何設定 GitHub Actions，自動化構建與部署過程，讓你的開發工作變得更加高效。

---

## 開始之前

在深入主題之前，讓我們先透過 `express` 框架，快速搭建一個運行於 Node.js 上的簡易應用。

---

### Create a `node_sample` folder

```bash
mkdir node_sample
cd node_sample
```

---

### Install node package `express`

```bash
npm init -y
npm install express
```

---

### Create an `app.js` file

```bash
vim app.js
```

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

---

### Create a `.gitignore` file

> ##### TIP
> 
> 請至 [gitignore.io](https://gitignore.io/) 產生 `.gitignore` 檔案，選擇 Node 類型即可。
{: .block-tip }

---

### Run `app.js`

```bash
node app.js
```

在 Chrome 上打開網址 `localhost:3000` 就會看到如下：

{% include figure.liquid path="assets/img/github_container_registry_sample_website.png" title="Sample Website Output" %}

---

## Create a Dockerfile

```bash
vim Dockerfile
```

```dockerfile
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
```

---

## 上傳 Docker Image 到 Github Container Registry

寫完 Dockerfile 後有兩種方式可以將 image 上傳到 GitHub Container Registry：
1. 用 Command line 手動上傳
2. 使用 GitHub Actions 自動化上傳

---

## 用 Command line 方式手動上傳

---

### 利用 Dockerfile 產生 image

```bash
docker build -t node_sample .
```

{% include figure.liquid path="assets/img/github_container_registry_docker_build_image.png" title="Build Image" %}

---

### 查看 Docker images

```bash
docker images
```

{% include figure.liquid path="assets/img/github_container_registry_docker_images.png" title="Docker Images" %}

---

### 創建 image tag

```bash
docker tag node_sample:latest ghcr.io/{NAMESPACE}/node_sample:latest
```

> ##### TIP
> 
> 記得將 `{NAMESPACE}` 替換為你的 GitHub 帳號名稱。
{: .block-tip }

---

### Generate `Personal access tokens (classic)`

登入 GitHub Container Registry 前，需要生成一組 `GITHUB_TOKEN`：

> 打開 GitHub → 右上角 Profile → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

勾選 `write:packages`、`read:packages`、`delete:packages` 權限：

{% include figure.liquid path="assets/img/github_container_registry_generate_github_token.png" title="Generate GitHub Token" %}

---

### 登入 **GitHub Container Registry**

```bash
export CR_PAT=YOUR_TOKEN
```

```bash
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```

Login Succeeded 🎉

---

### 上傳 Images

```bash
docker push ghcr.io/{NAMESPACE}/node_sample:latest
```

{% include figure.liquid path="assets/img/github_container_registry_github_package.png" title="Image Uploaded to GHCR" %}

---

## 用 GitHub Action 方式

使用 GitHub Action 的方式更簡單，在 `node_sample` 目錄下：

---

### Create a `deploy-image.yml`

```bash
mkdir -p .github/workflows
vim .github/workflows/deploy-image.yml
```

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

---

### Pushing `node_sample` repository

將 node_sample 推到 GitHub，之後每次 `release` 分支 push 變更時就會自動觸發 GitHub Action，並完成 image 上傳。

{% include figure.liquid path="assets/img/github_container_registry_github_package.png" title="Published Package on GitHub" %}

---

## 下載 image

---

### Install from the command line

```bash
docker pull ghcr.io/nickhuangcyh/node_sample:TAG
```

---

### Use as base image in Dockerfile

```dockerfile
FROM ghcr.io/nickhuangcyh/node_sample:TAG
```

{% include figure.liquid path="assets/img/github_container_registry_download_image.png" title="Download Image" %}

> ##### TIP
> 
> 您可於此 [node_sample](https://github.com/nickhuangcyh/design_pattern) 下載 `node_sample` 的程式碼。
{: .block-tip }
