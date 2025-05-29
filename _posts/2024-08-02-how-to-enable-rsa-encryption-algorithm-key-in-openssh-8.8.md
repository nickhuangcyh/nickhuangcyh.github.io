---
layout: post
title: How to Enable RSA Encryption Algorithm Key in OpenSSH 8.8
date: 2024-08-02 19:50:00 +0800
description: 如何在 OpenSSH 8.8 中重新啟用 RSA 加密支援，確保可以繼續使用 RSA 金鑰。
tags: [RSA Encryption, OpenSSH 8.8, Encryption Support]
categories: [Cryptography, OpenSSH, Security]
toc:
#   beginning: true
  sidebar: right
thumbnail: /assets/img/rsa-algorithm.jpg
---

## 前言

最近在修改公司的 Jenkins CI/CD 架構時，為了 Dockerize Android Building Environment，我啟動了 Debian 12 的 container。然而在配置 RSA Key 至 GitLab server 時，卻發現無法拉取原始碼。這篇文章記錄了解決過程，讓我日後可以快速複習，也希望能幫助到遇到同樣問題的開發者。

深入調查後才發現，Debian 12 使用的 OpenSSH 版本為 8.8，而 OpenSSH 8.8 預設停用 RSA 加密演算法（因為安全性與過時性考量）。但我們內部的 GitLab server 較舊，只支援 RSA Key，所以我們需要手動重新啟用 RSA 支援。

---

## 準備作業

> ##### TIP  
> 如果你已有環境，可略過此步驟，直接進入測試與修正段落。  
{: .block-tip }

首先，我用 Docker 啟動一台 Debian 12 container：

```bash
docker pull debian:bookworm
docker run -it --name debian-bookworm-for-test-openssh debian:bookworm
```

---

### 更新 apt

```bash
apt update
```

---

### 安裝 Git

```bash
apt install git
```

---

### 確認 OpenSSH 版本

```bash
ssh -V
# OpenSSH_9.2p1 Debian-2+deb12u3, OpenSSL 3.0.13
```

---

### 建立 SSH RSA Key

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

---

### 將 Public Key 上傳至 Git Server

```bash
cat ~/.ssh/id_rsa.pub
```

將該內容複製貼上至 Git Server 內部帳號的 SSH 設定中。

---

## 測試 SSH 連線

以 verbose 模式連線 Git server（請替換 IP/domain）：

```bash
ssh -T -v git@x.x.x.x
```

執行後，若看到以下錯誤訊息：

```bash
debug1: send_pubkey_test: no mutual signature algorithm
```

代表你的 client 與 server 之間沒有共同支援的簽名演算法，RSA 因被 OpenSSH 預設關閉而導致驗證失敗。

---

## 解決方法

打開官方文件：[OpenSSH 8.8 Release Notes](https://www.openssh.com/txt/release-8.8) 可以看到如下說明：

> ...it may be necessary to selectively re-enable RSA/SHA1 to allow connection and/or user authentication via the HostkeyAlgorithms and PubkeyAcceptedAlgorithms options...

這表示我們可以透過 `.ssh/config` 設定檔來手動啟用 `ssh-rsa`：

```bash
Host x.x.x.x
  HostkeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
```

儲存後，再次執行：

```bash
ssh -T -v git@x.x.x.x
```

你將會看到登入成功的訊息 🎉

---

## 參考

- [OpenSSH 8.8 Release Document](https://www.openssh.com/txt/release-8.8)
