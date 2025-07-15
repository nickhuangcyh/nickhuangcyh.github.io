---
layout: post
title: "如何在 OpenSSH 8.8 启用 RSA 加密算法密钥：安全 SSH 连接全流程指南"
date: 2024-08-02 19:50:00 +0800
description: "掌握在 OpenSSH 8.8+ 环境下为旧系统和 Git 服务器重新启用 RSA 加密支持的完整方法，涵盖排错、安全建议与配置技巧。"
tags: [RSA Encryption, OpenSSH 8.8, SSH, Encryption Support, Security, Git, Linux, DevOps, Troubleshooting, Compatibility]
categories: [Cryptography, OpenSSH, Security, DevOps]
toc:
  sidebar: right
thumbnail: /assets/img/rsa-algorithm.jpg
---

> 💡 **专业建议：** 尽量优先使用最新安全算法，仅为兼容旧系统时启用 RSA！

---

## 🎯 **OpenSSH 8.8 为何默认禁用 RSA？**

OpenSSH 8.8+ 出于安全与淘汰考虑，默认禁用 RSA/SHA-1。部分旧系统（如老版 Git 服务器）仍需依赖 RSA 密钥进行认证。

**要点总结：**
- ✅ **RSA/SHA-1 已被视为弱加密**
- ✅ **OpenSSH 推荐使用 ED25519、ECDSA 等现代算法**
- ✅ **部分遗留服务器仅支持 RSA**

---

## 🚀 **OpenSSH 8.8+ 启用 RSA 步骤详解**

### **1. 环境准备**
- 建议用 Docker 或虚拟机测试
- 确保已安装 OpenSSH 8.8+ 与目标旧服务器（如 GitLab）

### **2. 生成 RSA 密钥**
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

### **3. 上传公钥到服务器**
```bash
cat ~/.ssh/id_rsa.pub
# 复制到 Git 服务器 SSH 设置
```

### **4. 测试 SSH 连接**
```bash
ssh -T -v git@x.x.x.x
# 若出现 send_pubkey_test: no mutual signature algorithm
# 说明默认已禁用 RSA
```

---

## 🔧 **如何在 OpenSSH 重新启用 RSA/SHA-1**

编辑 `~/.ssh/config` 文件：
```bash
Host x.x.x.x
  HostkeyAlgorithms +ssh-rsa
  PubkeyAcceptedAlgorithms +ssh-rsa
```

保存后重试 SSH 连接：
```bash
ssh -T -v git@x.x.x.x
# 应可正常连接
```

---

## 📊 **OpenSSH 8.8+ 与旧版本对比**

| 版本 | 默认 RSA 支持 | 安全等级 | 推荐场景 |
|------|---------------|----------|----------|
| **OpenSSH <8.8** | ✅ 启用 | ⚠️ 较低 | 兼容/遗留系统 |
| **OpenSSH 8.8+** | ❌ 禁用 | ✅ 更高 | 现代安全系统 |

---

## 🛡️ **安全最佳实践**
- 新系统优先用 ED25519 或 ECDSA 密钥
- 仅为兼容旧系统时启用 RSA
- 定期更新 OpenSSH 并关注安全公告
- 仅对特定主机启用 RSA，勿全局放开
- 切勿泄露私钥

---

## 🔗 **相关文章推荐**
- [多 GitHub 账号 SSH 配置指南](/2025-05-18-how-to-use-multiple-github-accounts-using-ssh.md)
- [Jenkins 服务器 SSH 密钥配置](/2024-08-15-jenkins-2-how-to-setup-jenkins-server.md)
- [P2P 技术基础：IPv4 与 NAT](/2022-01-03-p2p-tech-1-ipv4-nat)
- [STUN、TURN、ICE 协议详解](/2022-01-04-p2p-tech-2-stun-turn-ice)

---

## ✅ **总结**

在 OpenSSH 8.8+ 环境下重新启用 RSA 主要用于兼容旧系统，日常建议优先采用更安全的现代算法。

**核心要点：**
- 🎯 **RSA/SHA-1 已不再安全**
- 🛡️ **仅限遗留系统使用**
- 🔧 **需手动配置 SSH 客户端兼容性**
- 📊 **新部署优先用 ED25519/ECDSA**

---

**💡 专业建议：** 定期审查 SSH 密钥与配置，持续保障系统安全！
