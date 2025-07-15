---
layout: post
title: 如何在一台電腦上管理多個 GitHub 帳號：完整 SSH 設定教學
日期: 2025-05-18 14:00:00 +0800
description: 學會如何用 SSH 金鑰在同一台電腦上高效管理多個 GitHub 帳號，無縫切換工作與個人身份，提升開發效率。圖文詳解，實戰範例，適合所有軟體工程師！
tags: [GitHub, SSH, Git, DevOps, Multiple Accounts, SSH Keys, Development Tools]
categories: [DevOps, Productivity, GitHub, Development]
toc:
  sidebar: right
thumbnail: /assets/img/github.jpg
---

## 🚀 為什麼你需要多個 GitHub 帳號？

許多開發者同時擁有個人與公司（或學校）GitHub 帳號。若沒有正確的 SSH 設定，在同一台電腦上管理多個帳號會變得非常麻煩。本教學將帶你用最有效率的 SSH 金鑰配置，輕鬆切換多個 GitHub 帳號。

**主要好處：**
- ✅ 無縫切換工作與個人帳號
- ✅ 避免權限衝突與 push 錯誤
- ✅ 金鑰管理安全又簡單
- ✅ 不需重複產生金鑰或修改全域設定

---

## 🛠 最推薦方法：SSH Config 配合多組金鑰

這個方法利用 SSH config 檔自動將不同 repo 對應到不同 GitHub 帳號，設定簡單、維護容易。

---

### 1️⃣ 檢查目前已載入的 SSH 金鑰

先檢查 SSH agent 目前有哪些金鑰：

```bash
ssh-add -l
```

如果只看到預設金鑰（如 `id_ed25519`），代表還沒載入其他帳號的金鑰。

**範例輸出：**
```bash
256 SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx nick25932219@gmail.com(ED25519)
```

---

### 2️⃣ 載入其他帳號的金鑰

將公司（或第二個）帳號的金鑰加入 SSH agent：

```bash
ssh-add ~/.ssh/id_ed25519_company
```

再次檢查：

```bash
ssh-add -l
```

你應該會看到兩組金鑰：

```bash
256 SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx nick25932219@gmail.com
256 SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx nickhuang@company.com.tw (ED25519)
```

---

### 3️⃣ 設定 SSH Config 分帳號路由

編輯 `~/.ssh/config`，加入以下內容：

```bash
# 公司帳號
Host github.com_company
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes  # macOS 專用，Linux 可省略
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519_company
```

這樣連到 `github.com_company` 時就會自動用公司金鑰。

---

### 4️⃣ 更新 Git 遠端 URL

將需要用公司帳號的 repo 遠端網址改成：

```bash
git remote set-url origin git@github.com_company:nickhuangCompany/repo.git
```

**注意**：`github.com_company` 取代了原本的 `github.com`，這樣才能正確分流。

---

## 🔍 驗證 SSH 設定

測試 SSH 連線是否正確：

```bash
ssh -T git@github.com_company
```

成功會看到：

```bash
Hi nickhuangCompany! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 📋 完整設定檢查清單

| 步驟 | 動作 | 狀態 |
|------|------|------|
| 1 | 為每個帳號產生 SSH 金鑰 | ✅ |
| 2 | 將金鑰加入 SSH agent | ✅ |
| 3 | 設定 SSH config 檔 | ✅ |
| 4 | 更新 repo 遠端網址 | ✅ |
| 5 | 測試 SSH 連線 | ✅ |

---

## 🎯 多帳號管理最佳實踐

### 金鑰命名建議
- 用明確名稱：`id_ed25519_personal`、`id_ed25519_work`
- 檔名直接標示用途

### SSH Config 組織
- 依帳號分組
- 加註解說明
- 命名規則一致

### Repo 管理
- 工作與個人 repo 分資料夾存放
- 遠端別名清楚
- 文件標註每個 repo 對應帳號

---

## 🚨 常見問題與解法

### 問題：Permission Denied
```bash
Permission denied (publickey)
```
**解法**：確認正確金鑰已載入，config 設定正確。

### 問題：用錯帳號 push
**解法**：檢查 SSH config 與遠端 URL，確保用對 host alias。

### 問題：找不到金鑰
**解法**：檢查 SSH config 金鑰路徑，檔案是否存在。

---

## 📚 延伸閱讀

- [GitHub 官方 SSH 連線教學](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [SSH 金鑰管理最佳實踐](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub CLI 多帳號管理](https://cli.github.com/)

---

## 🔗 相關文章推薦

- [完整 Git 工作流教學](/2024-01-11-setup-development-environment-on-a-new-macos)
- [SSH 安全最佳實踐](/2024-08-02-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8.8)
- [GitHub Container Registry 快速上手](/2024-07-23-getting-started-with-github-container-registry)

---

## ✅ 結論

透過 SSH config 配合多組金鑰，你可以在同一台電腦上高效管理多個 GitHub 帳號，無需重複產生金鑰或改全域設定，對於需要分開工作與個人身份的開發者來說最方便！

**重點整理：**
- SSH config 讓帳號分流乾淨俐落
- 金鑰管理簡單安全
- 輕鬆切換多帳號
- 保持最佳安全實踐

立即動手設定，享受無縫的 GitHub 多帳號管理體驗！

---

**💡 專家小提醒**：建議搭配 GitHub CLI，讓多帳號切換與 repo 管理更輕鬆！

**🔔 歡迎訂閱部落格，獲取更多 DevOps 與開發效率技巧！**
