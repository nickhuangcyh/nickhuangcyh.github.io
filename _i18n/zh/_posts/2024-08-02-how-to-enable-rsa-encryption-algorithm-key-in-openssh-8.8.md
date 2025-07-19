---
layout: post
title: "如何在 OpenSSH 8.8 啟用 RSA 加密演算法金鑰：安全 SSH 連線全流程指南"
date: 2024-08-02 19:50:00 +0800
description: "掌握在 OpenSSH 8.8+ 環境下為舊系統和 Git 伺服器重新啟用 RSA 加密支援的完整方法，涵蓋排錯、安全建議與設定技巧。"
tags: [RSA Encryption, OpenSSH 8.8, SSH, Encryption Support, Security, Git, Linux, DevOps, Troubleshooting, Compatibility]
categories: [Cryptography, OpenSSH, Security, DevOps]
toc:
  sidebar: right
thumbnail: /assets/img/rsa-algorithm.jpg
---

> 💡 **專業建議：** 優先使用最新安全演算法，僅於相容舊系統時啟用 RSA！

---

## 🎯 **OpenSSH 8.8 為何預設停用 RSA？**

OpenSSH 8.8+ 出於安全與淘汰考量，預設停用 RSA/SHA-1。部分舊系統（如舊版 Git 伺服器）仍需依賴 RSA 金鑰進行認證。

**重點總結：**

- ✅ **RSA/SHA-1 已被視為弱加密**
- ✅ **OpenSSH 建議使用 ED25519、ECDSA 等現代演算法**
- ✅ **部分遺留伺服器僅支援 RSA**

---

## 🚀 **OpenSSH 8.8+ 啟用 RSA 步驟詳解**

### **1. 環境準備**

- 建議用 Docker 或虛擬機測試
- 確保已安裝 OpenSSH 8.8+ 與目標舊伺服器（如 GitLab）

### **2. 產生 RSA 金鑰**

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

### **3. 上傳公鑰到伺服器**

```bash
cat ~/.ssh/id_rsa.pub
# 複製到 Git 伺服器 SSH 設定
```

### **4. 測試 SSH 連線**

```bash
ssh -T -v git@x.x.x.x
# 若出現 send_pubkey_test: no mutual signature algorithm
# 表示預設已停用 RSA
```

---

## 🔧 **如何在 OpenSSH 重新啟用 RSA/SHA-1**

編輯 `~/.ssh/config` 檔案：

```bash
Host x.x.x.x
  HostkeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
```

儲存後重試 SSH 連線：

```bash
ssh -T -v git@x.x.x.x
# 應可正常連線
```

---

## 📊 **OpenSSH 8.8+ 與舊版本對比**

| 版本             | 預設 RSA 支援 | 安全等級 | 推薦場景      |
| ---------------- | ------------- | -------- | ------------- |
| **OpenSSH <8.8** | ✅ 啟用       | ⚠️ 較低  | 相容/遺留系統 |
| **OpenSSH 8.8+** | ❌ 停用       | ✅ 更高  | 現代安全系統  |

---

## 🛡️ **安全最佳實踐**

- 新系統優先用 ED25519 或 ECDSA 金鑰
- 僅於相容舊系統時啟用 RSA
- 定期更新 OpenSSH 並關注安全公告
- 僅對特定主機啟用 RSA，勿全域放開
- 切勿洩漏私鑰

---

## 🔗 **相關文章推薦**

- [多 GitHub 帳號 SSH 設定指南](/2025-05-18-how-to-use-multiple-github-accounts-using-ssh.md)
- [Jenkins 伺服器 SSH 金鑰設定](/2024-08-15-jenkins-2-how-to-setup-jenkins-server.md)
- [P2P 技術基礎：IPv4 與 NAT](/2022-01-03-p2p-tech-1-ipv4-nat)
- [STUN、TURN、ICE 協議詳解](/2022-01-04-p2p-tech-2-stun-turn-ice)

---

## ✅ **總結**

在 OpenSSH 8.8+ 環境下重新啟用 RSA 主要用於相容舊系統，日常建議優先採用更安全的現代演算法。

**核心重點：**

- 🎯 **RSA/SHA-1 已不再安全**
- 🛡️ **僅限遺留系統使用**
- 🔧 **需手動設定 SSH 用戶端相容性**
- 📊 **新部署優先用 ED25519/ECDSA**

---

**💡 專業建議：** 定期審查 SSH 金鑰與設定，持續保障系統安全！
