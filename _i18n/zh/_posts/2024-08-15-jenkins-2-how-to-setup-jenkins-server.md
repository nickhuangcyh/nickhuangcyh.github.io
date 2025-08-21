---
layout: post
title: "Jenkins（2）伺服器架設完全指南：Docker 環境快速部署教學"
date: 2024-08-15 17:00:00 +0800
description: "完整解析 Jenkins 伺服器架設步驟，學習使用 Docker 快速部署 Jenkins CI/CD 環境，包含標準版與 Android 建構環境配置，掌握 DevOps 自動化基礎設施建置技巧。"
tags: [Jenkins, CI/CD, DevOps, Docker, Server Setup, Automation, Container, Infrastructure, Build Environment, Development Tools]
categories: [DevOps]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## 如何架設 Jenkins 伺服器

在[上一篇文章](/zh/blog/2024/jenkins-1-what-is-jenkins/)中，我們了解了 Jenkins 的基本概念和核心功能。現在，讓我們進入實戰階段，學習如何架設自己的 Jenkins 伺服器。

本文將介紹使用 Docker 來架設 Jenkins 的方法。選擇 Docker 的原因有三：

- **環境一致性**：無論在 Windows、macOS 或 Linux 上都能獲得相同的執行環境
- **快速部署**：幾個指令就能完成安裝，省去複雜的環境配置
- **易於維護**：可以輕鬆升級、備份或重新部署

---

### 步驟一：拉取 Docker 映像檔

在開始之前，請確保你的電腦已經安裝了 Docker。如果尚未安裝，請先到 [Docker 官網](https://www.docker.com/get-started) 下載並安裝。

接下來，我們需要從官方倉庫拉取 Jenkins 的 Docker 映像檔。打開終端機（或命令提示字元），執行以下任一指令：

#### 選項一：標準 Jenkins 環境

```bash
docker pull jenkins/jenkins:lts-jdk17
```

這是官方維護的標準 Jenkins 映像檔，包含 Java 17 執行環境，適合大多數一般用途。

#### 選項二：Jenkins + Android 建構環境

```bash
docker pull ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17
```

這是包含 Android 建構工具的客製化映像檔，如果你需要建置 Android 應用程式，建議選用這個版本。

---

### 步驟二：運行 Jenkins 容器

現在我們要啟動 Jenkins 容器。在執行指令之前，請先準備一個本地資料夾來儲存 Jenkins 的資料，這樣即使容器重新啟動，你的設定和資料也不會遺失。

#### 準備資料儲存目錄

首先，建立一個資料夾來儲存 Jenkins 資料：

```bash
# 在你的家目錄下建立 jenkins_home 資料夾
mkdir ~/jenkins_home
```

#### 啟動容器

根據你在步驟一選擇的映像檔，執行對應的指令：

**使用標準 Jenkins 環境：**

```bash
docker run -d \
  --name jenkins \
  -v ~/jenkins_home:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  jenkins/jenkins:lts-jdk17
```

**使用 Jenkins + Android 環境：**

```bash
docker run -d \
  --name jenkins \
  -v ~/jenkins_home:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17
```

#### 參數說明

讓我們來理解這些參數的含義：

- `-d`：讓容器在背景執行
- `--name jenkins`：為容器取名，方便後續管理
- `-v ~/jenkins_home:/var/jenkins_home`：將本機的資料夾掛載到容器內的 Jenkins 資料目錄
- `-p 8080:8080`：將容器的 8080 端口對應到本機的 8080 端口，用於訪問 Jenkins Web 介面
- `-p 50000:50000`：將容器的 50000 端口對應到本機，用於 Jenkins Agent 的通訊

---

### 步驟三：訪問 Jenkins

容器啟動後，我們需要等待 Jenkins 完全載入。你可以使用以下指令檢查容器狀態：

```bash
docker logs jenkins
```

當你看到 `Jenkins is fully up and running` 這樣的訊息時，就表示 Jenkins 已經準備就緒。

#### 開啟 Jenkins Web 介面

在瀏覽器中打開 [http://localhost:8080](http://localhost:8080) 來訪問 Jenkins 的 Web 介面。首次訪問時，你會看到要求輸入初始管理員密碼的頁面。

{% include figure.liquid path="assets/img/jenkins_setup_initialAdminPassword.png" title="Jenkins 初始密碼頁面" %}

#### 取得初始密碼

有兩種方式可以取得初始管理員密碼：

**方法一：從 Docker 日誌中取得**

```bash
docker logs jenkins | grep -A 5 -B 5 "password"
```

**方法二：從儲存的檔案中取得**

```bash
cat ~/jenkins_home/secrets/initialAdminPassword
```

> ##### TIP
>
> 記住我們在步驟二設定的資料儲存目錄 `~/jenkins_home` 嗎？初始密碼就儲存在這個目錄下的 `secrets/initialAdminPassword` 檔案中。
> {: .block-tip }

#### 完成初始設定

1. **輸入密碼**：將取得的密碼輸入到密碼欄位中
2. **安裝插件**：建議選擇 "Install suggested plugins" 來安裝常用的插件
3. **建立管理員帳號**：設定你的管理員使用者名稱和密碼
4. **設定 Jenkins URL**：通常保持預設值即可

完成這些步驟後，你就成功架設好 Jenkins 了！

{% include figure.liquid path="assets/img/jenkins_setup_main_page.png" title="Jenkins 初始主頁" %}

---

## 總結

恭喜你！透過這篇文章，我們成功完成了 Jenkins 伺服器的架設。讓我們回顧一下完成的重要步驟：

### 我們做了什麼

1. **選擇合適的 Docker 映像檔**：根據需求選擇標準版或包含 Android 環境的版本
2. **正確配置容器參數**：包括資料持久化、端口對應等重要設定
3. **完成初始設定流程**：從取得密碼到安裝插件，建立完整的 Jenkins 環境

### 使用 Docker 的優勢

- **快速部署**：幾個指令就能完成整個安裝過程
- **環境隔離**：不會影響你的本機系統環境
- **易於維護**：可以輕鬆備份、還原或升級

### 下一步

現在你已經有了一個運行中的 Jenkins 伺服器，接下來我們將學習[如何配置憑證系統](/zh/blog/2024/jenkins-3-configure-credentials-ssh/)，讓 Jenkins 能夠安全地從 Git 倉庫拉取程式碼。這是實現自動化建置流程的關鍵步驟。

準備好進入下一個階段了嗎？讓我們繼續探索 Jenkins 的強大功能！

---

## Jenkins 系列文章導覽

1. **[Jenkins（1）什麼是 Jenkins](/zh/blog/2024/jenkins-1-what-is-jenkins/)** - Jenkins 基本概念與核心功能介紹 ✅
2. **Jenkins（2）伺服器架設完全指南** ← 你正在閱讀 ✅
3. **[Jenkins（3）SSH 憑證配置完全指南](/zh/blog/2024/jenkins-3-configure-credentials-ssh/)** - 下一步：設定安全的程式碼存取

### 相關技術文章推薦

- [GitHub Container Registry 入門](/zh/blog/2024/getting-started-with-github-container-registry/) - 容器化部署進階應用
- [使用 SSH 管理多個 GitHub 帳號](/zh/blog/2025/how-to-use-multiple-github-accounts-using-ssh/) - Git 多帳號管理技巧
- [在新 macOS 上設定開發環境](/zh/blog/2024/setup-development-environment-on-a-new-macos/) - 完整開發環境建置指南

> ##### TIP
>
> 想了解更多關於 Jenkins 的資訊，請參考 [Jenkins 官方文件](https://jenkins.io/doc/)。
> {: .block-tip }
