---
layout: post
title: "Jenkins (1) - 什麼是 Jenkins"
date: 2024-08-15 15:00:00 +0800
description: "了解Jenkins這個強大的自動化伺服器，如何幫助開發團隊實現持續整合與持續交付，提升軟體開發效率。"
tags: [Jenkins, CI/CD, DevOps]
categories: [DevOps]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## 什麼是 Jenkins

Jenkins 是一個開源的自動化伺服器，主要用於實現持續整合（CI）和持續交付（CD）。它能夠自動化各種任務，包括建置、測試和部署軟體，從而幫助開發團隊提升效率和品質。

---

## 為什麼選擇 Jenkins

1. **開源且免費**：Jenkins 是一個開源專案，任何人都可以免費使用和修改。
2. **豐富的插件生態系統**：擁有超過 1,500 個插件，能夠擴展其功能以滿足各種需求。
3. **社群支持**：活躍社群提供大量教學、討論與支援資源。
4. **易於整合**：可以與 Git、Docker、Kubernetes 等工具與平台無縫整合。

---

## Jenkins 的核心概念

1. **Pipeline**：Jenkins Pipeline 是一套插件，支援以程式碼方式定義建置流程，從建置到測試再到部署。
2. **Node**：Jenkins 執行工作的實體或虛擬機器，包含主伺服器與代理伺服器。
3. **Job**：定義特定建置任務的單元，是 Jenkins 中最基本的運作實體。
4. **Executor**：執行 Job 的執行單元，一個 Node 上可以有多個 Executor 並行運作。

---

## 總結

Jenkins 是一個功能強大且靈活的自動化伺服器，能夠幫助團隊實現 CI/CD，提升軟體開發效率與品質。對於還沒接觸 Jenkins 的開發者來說，現在就是開始了解它的最佳時機！

> ##### TIP
>
> 想了解更多關於 Jenkins 的資訊，請參考 [Jenkins 官方文件](https://jenkins.io/doc/)。  
> {: .block-tip }
