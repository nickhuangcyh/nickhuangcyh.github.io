---
layout: post
title: "Jenkins (2) - 如何架設 Jenkins 伺服器"
date: 2024-08-15 17:00:00 +0800
description: "學習如何使用 Docker 映像檔來架設 Jenkins 伺服器，提升開發團隊的自動化能力。"
tags: [Jenkins, CI/CD, DevOps, Docker]
categories: [DevOps]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## 如何架設 Jenkins 伺服器

在這篇文章中，我們將介紹如何使用 Docker 映像檔來架設 Jenkins 伺服器。這種方法不僅簡單快捷，還能確保環境的一致性。

---

### 步驟一：拉取 Docker 映像檔

首先，我們需要從 GitHub Container Registry 拉取 Jenkins 的 Docker 映像檔。打開終端機並執行以下指令：

```bash
docker pull jenkins/jenkins:lts-jdk17 # 單純 jenkins 環境
```

or

```bash
docker pull ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17 # jenkins 環境 + Android 建構環境
```

---

### 步驟二：運行 Jenkins 容器

接下來，我們將運行 Jenkins 容器。請確保替換 `${volume path}` 為你希望 Jenkins 資料儲存的本地路徑。執行以下指令：

```bash
docker run -d -v ${volume path}:/var/jenkins_home -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts-jdk17 # 單純 jenkins 環境
```

or

```bash
docker run -d -v ${volume path}:/var/jenkins_home -p 8080:8080 -p 50000:50000 ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17 # jenkins 環境 + Android 建構環境
```

這個指令會在背景運行 Jenkins 容器，並將 Jenkins 的資料儲存在你指定的路徑中。同時，容器會綁定本地的 8080 端口和 50000 端口，分別用於 Jenkins 的 Web 介面和代理通訊。

---

### 步驟三：訪問 Jenkins

容器啟動後，你可以在瀏覽器中打開 [http://localhost:8080](http://localhost:8080) 來訪問 Jenkins 的 Web 介面。首次訪問時，系統會要求你輸入初始管理員密碼。

{% include figure.liquid path="assets/img/jenkins_setup_initialAdminPassword.png" title="Jenkins 初始密碼頁面" %}

> ##### TIP
>
> 還記得我們剛剛在 run container 時有設定 `${volume path}` 嗎？你可以透過以下路徑找到初始密碼：
>
> `/var/jenkins_home/secrets/initialAdminPassword`
> {: .block-tip }

輸入密碼後，按照指示安裝 Plugin 並完成初始設定，你就成功架設好 Jenkins 啦！🎉

{% include figure.liquid path="assets/img/jenkins_setup_main_page.png" title="Jenkins 初始主頁" %}

---

## 總結

通過以上步驟，我們成功地使用 Docker 映像檔架設了一個 Jenkins 伺服器。這種方法不僅快速，而且能確保環境一致性，對開發團隊來說是一個實用又穩定的解決方案。如果你還沒使用 Jenkins，現在就是開始的好時機！

> ##### TIP
>
> 想了解更多關於 Jenkins 的資訊，請參考 [Jenkins 官方文件](https://jenkins.io/doc/)。
> {: .block-tip }
