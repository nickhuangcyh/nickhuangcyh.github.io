---
layout: post
title: OpenSSH 8.8 RSA 加密支援完整教學：解決相容性問題與安全配置
date: 2024-08-02 19:50:00 +0800
description: 學會如何解決 OpenSSH 8.8 版本中 RSA 加密算法被禁用的問題。詳細解析安全性考量、相容性解決方案與最佳實踐。包含 Jenkins CI/CD、Docker 環境與 GitLab 整合等實用情境。
tags: [OpenSSH Security, RSA Encryption, SSH Configuration, System Administration, DevOps, Jenkins CI/CD, Docker Security, GitLab Integration]
categories: [Cryptography, OpenSSH, Security]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/rsa-algorithm.jpg
---

## 前言

最近在修改公司的 Jenkins CI/CD 架構時，為了 Dockerize Android Building Environment，我啟動了 Debian 12 的 container。然而在配置 RSA Key 至 GitLab server 時，卻發現無法拉取原始碼。

這篇文章記錄了完整的解決過程，讓我日後可以快速複習。同時也希望能幫助到遇到同樣問題的開發者，特別是需要維護舊版 Git server 的系統管理員。

### 問題的根本原因

深入調查後才發現，Debian 12 使用的 OpenSSH 版本為 8.8 或更新版本。OpenSSH 8.8 基於安全性考量，預設停用了 RSA 加密演算法。

這個改變主要是因為 RSA with SHA-1 被視為較不安全的加密方式。但在實際環境中，許多內部的 GitLab server 仍然較舊，只支援 RSA Key 認證。

因此，我們需要手動重新啟用 RSA 支援，以維持與舊版伺服器的相容性。

---

## 準備作業

> ##### TIP
>
> 如果你已有環境，可略過此步驟，直接進入測試與修正段落。  
> {: .block-tip }

為了示範這個問題和解決方案，我們先建立一個測試環境。這個步驟會幫助你重現問題，並驗證解決方案的有效性。

### 建立測試環境

首先，我用 Docker 啟動一台 Debian 12 container：

```bash
docker pull debian:bookworm
docker run -it --name debian-bookworm-for-test-openssh debian:bookworm
```

### 系統基本設定

更新套件列表以確保我們安裝最新版本：

```bash
apt update
```

安裝 Git 工具（SSH 連線測試需要）：

```bash
apt install git
```

### 確認 OpenSSH 版本

檢查系統中的 OpenSSH 版本，確認是否為 8.8 或更新版本：

```bash
ssh -V
# 預期輸出：OpenSSH_9.2p1 Debian-2+deb12u3, OpenSSL 3.0.13
```

這個版本確實會停用 RSA 演算法支援。

### 建立 SSH RSA Key

現在我們需要產生一個 RSA 金鑰對用於測試。使用 4096 位元的金鑰長度可以提高安全性：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

這些指令會產生一對 RSA 金鑰，並將私鑰加入到 SSH agent 中。

### 設定 Git Server 認證

將公鑰複製出來，準備上傳至 Git Server：

```bash
cat ~/.ssh/id_rsa.pub
```

將顯示的公鑰內容完整複製貼上至 Git Server 內部帳號的 SSH 設定中。確保沒有遺漏任何字元，包括開頭的 `ssh-rsa` 和結尾的電子郵件地址。

---

## 測試 SSH 連線

現在我們來測試 SSH 連線，看看是否會遇到 RSA 演算法被停用的問題。

### 執行連線測試

使用 verbose 模式連線到 Git server，這樣可以看到詳細的連線過程（請替換 `x.x.x.x` 為實際的 IP 或 domain）：

```bash
ssh -T -v git@x.x.x.x
```

`-T` 參數代表不分配 TTY，`-v` 參數會顯示詳細的除錯訊息。這些除錯訊息對於診斷連線問題非常重要。

### 識別錯誤訊息

執行指令後，如果你看到以下錯誤訊息：

```bash
debug1: send_pubkey_test: no mutual signature algorithm
```

這個錯誤訊息的意思是：你的 SSH client 與 server 之間沒有共同支援的簽名演算法。

### 問題分析

出現這個錯誤的原因是：RSA 演算法已被 OpenSSH 8.8 預設關閉，但 Git server 仍然只支援 RSA 認證。因此雙方無法找到共同的加密演算法來完成認證程序，導致連線失敗。

---

## 解決方法

好消息是，OpenSSH 官方文件提供了解決這個相容性問題的方法。讓我們來看看如何重新啟用 RSA 支援。

### 查閱官方文件

打開官方文件：[OpenSSH 8.8 Release Notes](https://www.openssh.com/txt/release-8.8) 可以看到如下說明：

> ...it may be necessary to selectively re-enable RSA/SHA1 to allow connection and/or user authentication via the HostkeyAlgorithms and PubkeyAcceptedAlgorithms options...

這段說明告訴我們，可以選擇性地重新啟用 RSA/SHA1 演算法。這正是我們需要的解決方案。

### 設定 SSH 客戶端

我們可以透過修改 `.ssh/config` 設定檔來手動啟用 `ssh-rsa` 演算法。在你的家目錄下建立或編輯這個檔案：

```bash
Host x.x.x.x
  HostkeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
```

這個設定的含意是：
- `HostkeyAlgorithms +ssh-rsa`：允許使用 RSA 演算法進行主機認證
- `PubkeyAcceptedAlgorithms +ssh-rsa`：允許使用 RSA 演算法進行公鑰認證
- `+` 符號代表在現有演算法清單中**新增**這個選項，而不是完全取代

### 驗證解決方案

儲存設定檔後，再次執行連線測試：

```bash
ssh -T -v git@x.x.x.x
```

這次你應該會看到登入成功的訊息，表示 RSA 演算法已經成功重新啟用，連線問題得到解決。

---

## 參考

- [OpenSSH 8.8 Release Document](https://www.openssh.com/txt/release-8.8)
