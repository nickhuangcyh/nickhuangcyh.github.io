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

在前面的文章中，我們學習了 Jenkins 的基本概念，並成功架設了 Jenkins 伺服器。現在我們要踏入實際應用的重要環節：讓 Jenkins 能夠安全地從 Git 倉庫拉取程式碼。

### 為什麼需要 SSH 憑證？

當 Jenkins 需要從私有的 Git 倉庫（如 GitHub、GitLab）拉取程式碼時，就需要適當的身份驗證。SSH（Secure Shell）提供了一種安全且便利的驗證方式：
- **安全性高**：使用公鑰加密，避免密碼外洩風險
- **自動化友善**：無需手動輸入密碼，適合 CI/CD 流程
- **權限控制**：可以針對特定倉庫設定不同的存取權限

本文將詳細說明如何設定 SSH 憑證，讓你的 Jenkins 能夠順利與 Git 倉庫整合。

---

### 步驟一：生成 SSH 金鑰

SSH 金鑰採用非對稱加密，包含一對相關聯的金鑰：
- **私鑰（Private Key）**：保存在 Jenkins 伺服器上，用於身份驗證
- **公鑰（Public Key）**：上傳到 Git 服務商（如 GitHub），用於驗證私鑰的合法性

#### 生成金鑰對
打開終端機，執行以下指令來生成 SSH 金鑰：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

#### 參數說明
- `-t rsa`：指定加密類型為 RSA
- `-b 4096`：設定金鑰長度為 4096 位元（更安全）
- `-C "your_email@example.com"`：加入註解，通常使用你的 email

#### 生成過程
執行指令後，系統會詢問幾個問題：

1. **儲存位置**：預設為 `~/.ssh/id_rsa`，通常直接按 Enter 使用預設位置
2. **密碼保護**：可以設定密碼來額外保護私鑰，或直接按 Enter 跳過
3. **確認密碼**：如果上一步設定了密碼，這裡需要再次確認

完成後，你會在指定目錄下看到兩個檔案：
- `id_rsa`：私鑰檔案（保密）
- `id_rsa.pub`：公鑰檔案（可以公開分享）

---

### 步驟二：將公鑰添加到版本控制系統

現在我們需要將公鑰上傳到 Git 服務商，讓它能夠識別和信任我們的私鑰。以下以 GitHub 為例說明設定流程：

#### 複製公鑰內容
首先，我們需要取得公鑰的內容：

```bash
cat ~/.ssh/id_rsa.pub
```

這會顯示類似下面的內容：
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDTgvwj... your_email@example.com
```

選取並複製整段內容（從 `ssh-rsa` 到你的 email）。

#### 在 GitHub 上新增 SSH 金鑰
接下來在 GitHub 上進行設定：

1. **進入 GitHub 設定**
   - 登入你的 GitHub 帳號
   - 點擊右上角的個人頭像，選擇「Settings」

2. **找到 SSH 設定頁面**
   - 在左側選單中點擊「SSH and GPG keys」

3. **新增 SSH 金鑰**
   - 點擊「New SSH key」按鈕
   - **Title**：為這個金鑰取個有意義的名稱（如「Jenkins Server」）
   - **Key**：貼上剛才複製的公鑰內容
   - 點擊「Add SSH key」完成新增

#### 其他 Git 服務商
如果你使用其他 Git 服務商，設定方式大同小異：
- **GitLab**：User Settings → SSH Keys
- **Bitbucket**：Personal settings → SSH keys
- **Azure DevOps**：User settings → SSH public keys

---

### 步驟三：在 Jenkins 中添加憑證

現在我們要將私鑰加入到 Jenkins 的憑證系統中。這是整個設定流程的核心步驟。

#### 進入 Jenkins 憑證管理介面

1. **登入 Jenkins**
   - 在瀏覽器中開啟 `http://localhost:8080/`
   - 使用你在初始設定時建立的管理員帳號登入

2. **進入憑證管理**
   - 點擊左側選單的「Manage Jenkins」
   - 在系統配置區塊中點擊「Credentials」

3. **選擇憑證存放位置**
   - 點擊「System」
   - 點擊「Global credentials (unrestricted)」

#### 新增 SSH 憑證

點擊「Add Credentials」按鈕，然後填寫以下資訊：

**基本設定**
- **Kind**：選擇「SSH Username with private key」
- **Scope**：選擇「Global (Jenkins, nodes, items, all child items, etc)」

**身份識別資訊**
- **ID**：設定一個容易識別的 ID（例如：`github-ssh-key`）
- **Description**：輸入描述，方便日後管理（例如：「GitHub SSH Key for Jenkins」）
- **Username**：輸入 `git`（這是 Git 服務商的標準使用者名稱）

**私鑰設定**
- **Private Key**：選擇「Enter directly」
- 點擊「Add」按鈕
- 將步驟一生成的私鑰內容完整貼上

#### 取得私鑰內容
如果你忘記私鑰內容，可以用以下指令查看：

```bash
cat ~/.ssh/id_rsa
```

私鑰內容看起來會像這樣：
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAA...
-----END OPENSSH PRIVATE KEY-----
```

請確保包含開頭和結尾的標記行，並且完整複製所有內容。

#### 完成設定
填寫完所有資訊後，點擊「OK」按鈕保存憑證設定。

---

### 步驟四：配置 Jenkins Job 使用憑證

現在憑證已經設定完成，讓我們建立一個測試 Job 來驗證 SSH 連線是否正常運作。

#### 建立新的 Jenkins Job

1. **回到 Jenkins 首頁**
   - 點擊左上角的「Jenkins」標誌回到主頁面

2. **建立新 Job**
   - 點擊「New Item」
   - 輸入 Job 名稱（例如：`test-ssh-connection`）
   - 選擇「Freestyle project」
   - 點擊「OK」

#### 設定 Git 倉庫連線

在 Job 配置頁面中：

1. **找到 Source Code Management 區塊**
   - 選擇「Git」選項

2. **設定倉庫資訊**
   - **Repository URL**：輸入 SSH 格式的 Git 倉庫連結
   ```bash
   git@github.com:username/repository.git
   ```
   
   注意：SSH 格式的 URL 特徵是以 `git@` 開頭，而不是 `https://`

3. **選擇憑證**
   - 在「Credentials」下拉選單中選擇剛才建立的 SSH 憑證
   - 如果設定正確，你應該會看到類似「github-ssh-key (GitHub SSH Key for Jenkins)」的選項

4. **其他設定**
   - **Branch Specifier**：通常保持預設的 `*/main` 或 `*/master`
   - 其他進階設定可以暫時保持預設值

#### 測試連線

1. **儲存設定**
   - 點擊頁面底部的「Save」按鈕

2. **執行建置**
   - 點擊「Build Now」開始第一次建置

3. **檢查結果**
   - 在「Build History」中點擊建置編號
   - 點擊「Console Output」查看詳細執行記錄
   - 如果看到成功拉取程式碼的訊息，就表示 SSH 憑證設定成功！

#### 常見的 URL 格式對照

| Git 服務商 | SSH URL 格式 |
|-----------|-------------|
| GitHub | `git@github.com:username/repository.git` |
| GitLab | `git@gitlab.com:username/repository.git` |
| Bitbucket | `git@bitbucket.org:username/repository.git` |

---

## 總結

恭喜你完成了 Jenkins SSH 憑證的完整配置！這是 Jenkins 實用化的重要里程碑。讓我們回顧一下完成的關鍵步驟：

### 我們學到了什麼

1. **SSH 金鑰的原理**：理解公鑰和私鑰的配對機制，以及如何提供安全的身份驗證
2. **金鑰生成與管理**：學會使用 `ssh-keygen` 生成適當強度的 SSH 金鑰對
3. **Git 服務商設定**：將公鑰正確上傳到 GitHub 等 Git 服務商
4. **Jenkins 憑證系統**：在 Jenkins 中建立和管理 SSH 憑證
5. **實際應用測試**：建立測試 Job 來驗證 SSH 連線是否正常運作

### 安全性提升

透過使用 SSH 憑證，我們達成了以下安全優勢：
- **無密碼風險**：避免在程式碼或配置中暴露密碼
- **自動化友善**：CI/CD 流程可以自動執行，無需人工介入
- **存取控制**：可以針對不同專案使用不同的 SSH 金鑰

### 下一步探索

現在你已經具備了 Jenkins 的核心技能：
- ✅ 了解 Jenkins 基本概念
- ✅ 成功架設 Jenkins 伺服器
- ✅ 配置 SSH 憑證系統

接下來，你可以開始探索更進階的功能，如建立 Pipeline、設定自動化測試、或整合部署流程。Jenkins 的強大功能等著你去發掘！

---

## Jenkins 系列文章導覽

恭喜你完成了 Jenkins 系列教學的基礎三部曲！

1. **Jenkins (1) - 什麼是 Jenkins** - Jenkins 基本概念與核心功能介紹 ✅
2. **Jenkins (2) - 如何架設 Jenkins 伺服器** - 使用 Docker 快速建立 Jenkins 環境 ✅
3. **Jenkins (3) - 如何配置 Credentials 以透過 SSH 從 git 上拉取程式碼** ← 你正在閱讀 ✅

現在你已經具備了使用 Jenkins 進行基本 CI/CD 的所有必要技能。未來如果有更進階的主題，我們會持續更新這個系列。

> ##### TIP
>
> 想進一步了解 Jenkins 憑證系統與進階配置，請參考 [Jenkins 官方文件](https://jenkins.io/doc/)。
> {: .block-tip }
