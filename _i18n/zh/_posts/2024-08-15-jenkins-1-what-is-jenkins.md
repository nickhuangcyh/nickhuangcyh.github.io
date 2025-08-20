---
layout: post
title: Jenkins (1) - 什麼是 Jenkins
date: 2024-08-15 15:00:00 +0800
description: 了解Jenkins這個強大的自動化伺服器，如何幫助開發團隊實現持續整合與持續交付，提升軟體開發效率。
tags: [Jenkins, CI/CD, DevOps]
categories: [DevOps]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## 什麼是 Jenkins

Jenkins 是一個開源的自動化伺服器，主要用於實現持續整合（CI）和持續交付（CD）。簡單來說，它就像是一個勤勞的助手，能夠自動執行各種重複性的開發任務。

這些任務包括建置應用程式、執行測試案例、以及將程式碼部署到不同環境。透過自動化這些流程，Jenkins 幫助開發團隊減少人為錯誤，提升工作效率和軟體品質。

對於剛接觸 DevOps 的開發者來說，Jenkins 是入門 CI/CD 概念的絕佳工具。它不僅功能強大，而且擁有豐富的學習資源和社群支援。

---

## 為什麼選擇 Jenkins

在眾多 CI/CD 工具中，Jenkins 之所以廣受歡迎，主要有以下四個關鍵原因：

### 成本效益高
**開源且免費**：Jenkins 是一個開源專案，任何人都可以免費使用和修改。這對於預算有限的團隊或個人開發者來說，是一個非常實用的選擇。

### 擴展性極佳
**豐富的插件生態系統**：Jenkins 擁有超過 1,500 個官方和社群開發的插件。無論你需要整合什麼工具或服務，幾乎都能找到對應的插件，大大降低了客製化開發的成本。

### 學習資源豐富
**活躍的社群支持**：Jenkins 擁有龐大且活躍的開發者社群，提供大量的教學文件、討論區和技術支援。遇到問題時，通常都能快速找到解決方案。

### 整合能力強
**與主流工具無縫整合**：Jenkins 可以輕鬆整合 Git、Docker、Kubernetes、AWS 等現代開發工具和雲端平台。這種高度的相容性使其能夠適應各種開發環境。

---

## Jenkins 的核心概念

要有效使用 Jenkins，必須先了解其核心概念。以下四個概念是 Jenkins 架構的基礎：

### Pipeline (流水線)
**程式碼化的建置流程**：Jenkins Pipeline 是一套強大的插件，讓你可以用程式碼來定義整個 CI/CD 流程。就像寫程式一樣，你可以定義從程式碼拉取、建置、測試到部署的完整流程，這種方式稱為 "Pipeline as Code"。

### Node (節點)
**工作執行的場所**：Node 是 Jenkins 執行工作的實體或虛擬機器。主要分為兩種類型：
- **Master Node（主節點）**：Jenkins 的控制中心，負責排程和管理工作
- **Agent Node（代理節點）**：實際執行建置任務的工作機器

### Job (工作)
**任務的基本單位**：Job 是 Jenkins 中定義特定建置任務的基本單元。每個 Job 可以包含程式碼拉取、編譯、測試等多個步驟，是 Jenkins 運作的核心組件。

### Executor (執行器)
**並行處理的關鍵**：Executor 是實際執行 Job 的執行單元。一個 Node 可以配置多個 Executor，讓多個 Job 同時並行執行，大幅提升建置效率。

---

## 總結

透過這篇文章，我們了解了 Jenkins 這個強大的自動化工具。它不僅是一個免費的開源解決方案，更是現代 DevOps 實踐中不可或缺的核心工具。

Jenkins 的主要價值在於：
- **自動化重複任務**：減少人為錯誤，提升開發效率
- **豐富的生態系統**：超過 1,500 個插件滿足各種需求
- **靈活的架構設計**：Pipeline、Node、Job、Executor 等概念讓系統既強大又易於擴展

對於想要踏入 DevOps 領域的開發者來說，Jenkins 是一個理想的起點。在接下來的系列文章中，我們將深入探討如何架設和配置 Jenkins，讓你能夠實際運用這個強大的工具。

---

## Jenkins 系列文章導覽

這是 Jenkins 系列教學的第一篇文章，後續文章將帶你從零開始建立完整的 CI/CD 環境：

1. **Jenkins (1) - 什麼是 Jenkins** ← 你正在閱讀
2. **Jenkins (2) - 如何架設 Jenkins 伺服器** - 使用 Docker 快速建立 Jenkins 環境
3. **Jenkins (3) - 如何配置 Credentials 以透過 SSH 從 git 上拉取程式碼** - 設定安全的程式碼存取

建議依序閱讀，每一篇都會為下一步的實作奠定基礎。

> ##### TIP
>
> 想了解更多關於 Jenkins 的資訊，請參考 [Jenkins 官方文件](https://jenkins.io/doc/)。  
> {: .block-tip }
