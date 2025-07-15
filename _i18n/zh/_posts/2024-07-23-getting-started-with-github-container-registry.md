---
layout: post
title: "GitHub Container Registry (GHCR) 入门全攻略：容器镜像管理与 CI/CD 实战"
date: 2024-07-23 18:00:00 +0800
description: "全面掌握 GitHub Container Registry，涵盖 Docker 镜像管理、GitHub Actions 自动化与容器化应用 CI/CD 最佳实践。"
tags: [GitHub Container Registry, Docker, Container Registry, GitHub Actions, CI/CD, DevOps, Container Images, Docker Hub Alternative, Container Management]
categories: [DevOps, GitHub, Container Technology, CI/CD]
toc:
  sidebar: right
thumbnail: /assets/img/github_container_registry.png
---

## 🚀 **为什么选择 GitHub Container Registry？**

随着项目数量和环境需求的增长，我们将原本基于 Docker 的 Android Jenkins Server 架构升级为主 Jenkins Server（Master）+ 多个 Android 构建环境（Slave），后者通过 Docker 动态创建，保证环境干净。本文记录了这一转型过程，既是个人学习总结，也为其他开发者提供参考。

**GHCR 主要优势：**
- 🏛️ **公有包免费**，开源项目零成本
- 🔒 **内建安全**，自动漏洞扫描
- 🔄 **GitHub Actions 无缝集成**，CI/CD 自动化
- 📦 **统一镜像管理**，集中存储
- 🛡️ **细粒度权限控制**

---

## 🗂️ **文章结构与学习目标**

本指南适合初学者与希望深入集成 GitHub 新工具的开发者。通过清晰步骤与实用技巧，带你掌握如何将容器镜像推送到 GHCR，并用 GitHub Actions 自动化构建与部署流程。

**你将学到：**
- 🐳 **Docker 镜像创建与管理**
- 🛠️ **GHCR 配置与使用**
- ⚡ **GitHub Actions 自动化容器构建**
- 🔒 **容器安全最佳实践**
- 📈 **CI/CD 流水线集成策略**

---

## 🛠️ **环境准备与项目初始化**

以 Node.js + Express 为例，快速搭建演示项目：

### **1. 创建项目目录**
```bash
mkdir node_sample
cd node_sample
```

### **2. 初始化 Node.js 项目**
```bash
npm init -y
npm install express
```

### **3. 创建应用主文件**
```bash
vim app.js
```

**示例代码：**
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

### **4. 创建 .gitignore 文件**

> 💡 **专业建议：** 使用 [gitignore.io](https://gitignore.io/) 生成适合 Node.js 的 `.gitignore` 文件。

### **5. 本地测试应用**
```bash
node app.js
```

浏览器访问 `localhost:3000` 查看效果。

{% include figure.liquid path="assets/img/github_container_registry_sample_website.png" title="示例网站输出" %}

---

## 🐳 **编写 Dockerfile 实现容器化**

```bash
vim Dockerfile
```

**Dockerfile 示例：**
```dockerfile
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
```

**关键说明：**
- **FROM node:latest**：基础镜像
- **WORKDIR /usr/src/app**：工作目录
- **COPY ...**：复制依赖与主程序
- **RUN npm install**：安装依赖
- **EXPOSE 3000**：暴露端口
- **CMD ...**：启动命令

---

## 📦 **上传 Docker 镜像到 GHCR**

镜像构建完成后，有两种上传方式：
1. **命令行手动上传**
2. **GitHub Actions 自动上传**

---

### **方法一：命令行手动上传**

#### **1. 构建镜像**
```bash
docker build -t node_sample .
```

#### **2. 查看镜像**
```bash
docker images
```

#### **3. 镜像打标签**
```bash
docker tag node_sample:latest ghcr.io/{NAMESPACE}/node_sample:latest
```
> ⚠️ `{NAMESPACE}` 替换为你的 GitHub 用户名

#### **4. 生成 Personal Access Token**
1. GitHub 个人设置 → Developer settings → Personal access tokens
2. 生成新 token，勾选 `write:packages`、`read:packages`、`delete:packages`（可选）

#### **5. 登录 GHCR**
```bash
export CR_PAT=YOUR_TOKEN
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```

#### **6. 推送镜像**
```bash
docker push ghcr.io/{NAMESPACE}/node_sample:latest
```

---

### **方法二：GitHub Actions 自动化上传**

在 `node_sample` 目录下创建工作流：
```bash
mkdir -p .github/workflows
vim .github/workflows/deploy-image.yml
```

**workflow 配置：**
```yaml
name: Build and Push Docker Image
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
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

## 🔍 **验证与拉取镜像**

1. GitHub 个人主页 → Packages 查看上传的镜像
2. 拉取镜像并运行：
```bash
docker pull ghcr.io/{NAMESPACE}/node_sample:latest
docker run -p 3000:3000 ghcr.io/{NAMESPACE}/node_sample:latest
```

---

## 📊 **GHCR 与 Docker Hub 对比**

| 功能 | GHCR | Docker Hub |
|------|------|------------|
| 公有包免费 | ✅ 无限 | ✅ 无限 |
| 私有包免费 | ✅ 500MB/月 | ❌ 付费 |
| GitHub 集成 | ✅ 原生 | ⚠️ 有限 |
| 漏洞扫描 | ✅ 内建 | ✅ 可用 |
| 权限控制 | ✅ 细粒度 | ⚠️ 基础 |
| CI/CD 集成 | ✅ GitHub Actions | ⚠️ 需第三方 |

---

## 🛡️ **容器安全最佳实践**

### 1. 指定基础镜像版本
```dockerfile
# ❌ 不推荐
FROM node:latest
# ✅ 推荐
FROM node:18-alpine
```

### 2. 多阶段构建
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

### 3. 漏洞扫描
```yaml
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
    format: 'sarif'
    output: 'trivy-results.sarif'
```

---

## 🚨 **常见问题与解决方案**

### 1. 认证失败
```bash
Error: unauthorized: authentication required
```
**解决：** 检查 token 权限、用户名与 token 是否正确

### 2. 权限拒绝
```bash
Error: denied: permission_denied
```
**解决：** 检查包可见性、仓库权限、token 范围

### 3. 镜像未找到
```bash
Error: manifest for ghcr.io/user/image:tag not found
```
**解决：** 检查镜像名、tag、命名空间与推送状态

---

## 📈 **进阶用法与自动化场景**

### 1. 多架构镜像构建
```yaml
- name: Build and push multi-arch image
  uses: docker/build-push-action@v5
  with:
    context: .
    platforms: linux/amd64,linux/arm64
    push: true
    tags: ${{ steps.meta.outputs.tags }}
```

### 2. 自动版本号生成
```yaml
- name: Generate version tag
  id: version
  run: echo "::set-output name=version::$(date +'%Y%m%d')-$(git rev-parse --short HEAD)"
```

### 3. 条件发布
```yaml
- name: Push to Registry
  if: github.ref == 'refs/heads/main'
  run: docker push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.version.outputs.version }}
```

---

## 🔗 **相关文章推荐**
- [完整 Git 工作流指南](/2025-05-18-how-to-use-multiple-github-accounts-using-ssh)
- [macOS 开发环境搭建](/2024-01-11-setup-development-environment-on-a-new-macos)
- [Jenkins 服务器配置](/2024-08-15-jenkins-2-how-to-setup-jenkins-server)
- [SSH 密钥管理](/2024-08-02-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8.8)

---

## ✅ **总结**

GitHub Container Registry 为容器镜像管理与 CI/CD 提供了强大的一体化解决方案。通过本指南，你已学会：

**核心收获：**
- 🐳 **高效创建与管理 Docker 镜像**
- 🛠️ **用 GitHub Actions 实现自动化工作流**
- 🔒 **容器安全最佳实践**
- 📦 **流水线集成与自动化管理**

**后续建议：**
1. 深入体验漏洞扫描等高级功能
2. 实现多架构镜像构建
3. 配置镜像自动化测试
4. 考虑镜像签名增强安全

---

**💡 专业建议：** 善用 GHCR 内建漏洞扫描，自动发现并修复安全隐患。

**🔔 关注我们：** 持续关注 DevOps 系列，获取更多容器与 CI/CD 实战干货！

---

**📚 延伸阅读：**
- [GHCR 官方文档](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [容器安全指南](https://cloud.google.com/architecture/best-practices-for-building-containers)
