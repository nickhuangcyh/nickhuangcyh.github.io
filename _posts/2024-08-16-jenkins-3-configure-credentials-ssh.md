---
layout: post
title: Jenkins (3) - 如何配置 Credentials 以透過 SSH 從 git 上拉取程式碼
date: 2024-12-09 20:00:00 +0800
description: 學習如何在 Jenkins 中配置憑證（Credentials），以便透過 SSH 安全地拉取程式碼。
tags: [Jenkins, CI/CD, DevOps, Credentials, SSH]
categories: [DevOps]
toc:
#   beginning: true
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## 如何配置 Credentials 以透過 SSH 從 git 上拉取程式碼

在這篇文章中，我們將介紹如何在 Jenkins 中配置憑證（Credentials），以便 Jenkins 能夠透過 SSH 安全地從版本控制系統（如 GitHub 或 GitLab）拉取程式碼。

---

### 步驟一：生成 SSH 金鑰

首先，我們需要生成一對 SSH 金鑰。打開終端機並執行以下指令：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

按照提示完成金鑰生成過程，並記下生成的公鑰和私鑰的路徑。

---

### 步驟二：將公鑰添加到版本控制系統

將生成的公鑰內容複製並添加到你的版本控制系統中。例如，在 GitHub 中，你可以按照以下步驟操作：

1. 登入 GitHub，進入「Settings」。
2. 在左側菜單中選擇「SSH and GPG keys」。
3. 點擊「New SSH key」，並將公鑰內容貼上，然後點擊「Add SSH key」。

---

### 步驟三：在 Jenkins 中添加憑證

1. 打開 Jenkins 管理介面：瀏覽器開啟 `http://localhost:8080/`，使用管理員帳號登入。  
2. 進入憑證管理：點擊左側選單「Credentials」→「System」。  
3. 創建新的 Domain：點擊「Domains」旁的「Add domain」，填寫名稱（如 GitHub），點擊「OK」。  
4. 新增憑證：選擇剛新增的 Domain，點選「Add Credentials」。  
5. 填寫憑證資訊：  

- Kind：選擇「SSH Username with private key」  
- Scope：選擇「Global」  
- ID：可選，設定唯一識別用  
- Description：輸入描述以便未來管理  
- Username：通常為 `git`  
- Private Key：選擇「Enter directly」，貼上私鑰內容  

6. 點擊「OK」保存憑證設定。

---

### 步驟四：配置 Jenkins Job 使用憑證

1. 進入 Jenkins 首頁，建立或編輯一個 Job。  
2. 在「Source Code Management」區塊選擇「Git」。  
3. 在「Repository URL」輸入 SSH 格式的 Git 倉庫連結，例如：  
```bash
git@github.com:username/repository.git
```

4. 在「Credentials」下拉選單中，選擇剛剛設定的 SSH 憑證。  
5. 儲存設定並開始 Build！

---

## 總結

透過上述步驟，我們完成了 Jenkins 使用 SSH 拉取 Git 程式碼的完整配置流程。這不僅提升安全性，也讓 CI/CD 過程更順暢。建議每個 Jenkins 環境都配妥正確的 SSH 憑證，避免未來授權問題造成建置中斷。

> ##### TIP
> 
> 想進一步了解 Jenkins 憑證系統與進階配置，請參考 [Jenkins 官方文件](https://jenkins.io/doc/)。
{: .block-tip }
