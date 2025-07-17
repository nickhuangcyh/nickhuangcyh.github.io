---
layout: post
title: "Jenkins 3：設定 SSH 憑證，實現安全 Git 程式碼拉取"
date: 2024-12-09 20:00:00 +0800
description: "詳解如何在 Jenkins 中設定 SSH 憑證，實現安全拉取 Git 倉庫程式碼。涵蓋金鑰產生、憑證管理與流水線整合全流程。"
tags: [Jenkins, SSH, Credentials, Git, CI/CD, DevOps, Security, Authentication, SSH Keys, Repository Access]
categories: [DevOps, CI/CD, Security, Jenkins, Git, Authentication]
toc:
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

> 本文詳解如何在 Jenkins 中設定 SSH 憑證，實現安全拉取 Git 程式碼，助力 CI/CD 流水線自動化與安全。

## 引言：Jenkins 安全拉取程式碼的最佳實踐

本文將帶你完成 Jenkins 設定 SSH 憑證的全流程，包括金鑰產生、憑證新增、流水線整合與安全加強，是保障自動化部署與程式碼安全的關鍵環節。

## 為什麼用 SSH 拉取 Git 程式碼？

SSH（安全殼層協定）相較於 HTTPS 具備多項優勢：
- **安全性高**：通訊全程加密
- **無需儲存密碼**：金鑰認證更安全
- **自動化存取**：無需人工干預
- **稽核追蹤**：便於權限管理與操作追蹤
- **權限細緻**：可為不同倉庫分配不同金鑰

## 前置條件
- Jenkins 伺服器已建置
- Git 倉庫支援 SSH 存取
- 擁有 Jenkins 管理員權限
- 已安裝 SSH 用戶端工具

## 步驟 1：產生 SSH 金鑰對

在終端執行：
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
依提示完成金鑰產生，記下公鑰與私鑰路徑。

### 其他金鑰產生方式
```bash
# 推薦：4096 位 RSA 金鑰
ssh-keygen -t rsa -b 4096 -C "jenkins@company.com"
# Ed25519（更安全）
ssh-keygen -t ed25519 -C "jenkins@company.com"
# 自訂檔名
ssh-keygen -t rsa -b 4096 -f ~/.ssh/jenkins_rsa -C "jenkins@company.com"
```

### 常見金鑰類型對比
| 類型 | 安全性 | 長度 | 相容性 |
|------|--------|------|--------|
| **RSA** | 高 | 2048-4096 | 通用 |
| **Ed25519** | 很高 | 256 | 現代系統 |
| **ECDSA** | 高 | 256-521 | 主流系統 |
| **DSA** | 低 | 1024 | 僅限舊系統 |

## 步驟 2：將公鑰新增到程式碼託管平台

以 GitHub 為例：
1. 登入 GitHub，進入「Settings」
2. 選擇「SSH and GPG keys」
3. 點擊「New SSH key」，貼上公鑰內容
4. 儲存

### 不同平台操作
- **GitHub**：`cat ~/.ssh/id_rsa.pub | pbcopy`（macOS）
- **GitLab**：使用者設定 → SSH Keys
- **Bitbucket**：個人設定 → SSH Keys

## 步驟 3：在 Jenkins 新增 SSH 憑證

### 1. 進入 Jenkins 管理介面
- 訪問 `http://localhost:8080/`
- 登入管理員帳號
- 依序點擊「Credentials」→「System」

### 2. 新增網域（可選）
- 點擊「Add domain」
- 填寫網域名稱（如「GitHub」）
- 確認

### 3. 新增 SSH 憑證
- 選擇新建網域，點擊「Add Credentials」
- 填寫如下資訊：

| 欄位 | 值 | 說明 |
|------|----|------|
| Kind | SSH Username with private key | 憑證類型 |
| Scope | Global | 作用範圍 |
| ID | `github-ssh-key` | 唯一識別（可選） |
| Description | `SSH key for GitHub access` | 備註 |
| Username | `git` | Git 倉庫預設用戶名 |
| Private Key | Enter directly | 貼上私鑰內容 |

### 4. 私鑰格式要求
```bash
cat ~/.ssh/id_rsa
```
範例：
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

## 步驟 4：設定 Jenkins Job 使用 SSH 憑證

### 1. 建立或編輯 Job
- 選擇「Git」作為原始碼管理
- 倉庫位址使用 SSH 格式：
```bash
git@github.com:username/repository.git
```

### 2. 選擇憑證
- 在「Credentials」下拉選擇 SSH 憑證
- 選擇分支，儲存設定

### 範例 Jenkinsfile
```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'git@github.com:username/repository.git',
                        credentialsId: 'github-ssh-key'
                    ]]
                ])
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
    }
}
```

## 進階 SSH 設定

### 1. SSH 設定檔

`~/.ssh/config` 範例：
```bash
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_rsa
    IdentitiesOnly yes
```

### 2. 多金鑰管理

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_rsa -C "jenkins@company.com"
ssh-keygen -t rsa -b 4096 -f ~/.ssh/gitlab_rsa -C "jenkins@company.com"
ssh-keygen -t rsa -b 4096 -f ~/.ssh/bitbucket_rsa -C "jenkins@company.com"
```

### 3. SSH Agent 設定

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github_rsa
ssh-add ~/.ssh/gitlab_rsa
```

## 安全最佳實踐

### 1. 金鑰管理
- 獨立金鑰，專用 Jenkins
- 定期輪換金鑰
- 權限設定（私鑰 600）
- 安全儲存
```bash
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

### 2. 權限與存取控制
- 最小權限原則
- 倉庫專用金鑰
- 定期稽核

### 3. 監控與告警
- 監控 SSH 日誌
- 追蹤金鑰使用
- 異常行為告警

## 常見問題排查

### 1. 權限拒絕
```bash
ssh -T git@github.com
ls -la ~/.ssh/
ssh-add -l
```

### 2. 主機金鑰驗證失敗
```bash
ssh-keyscan -H github.com >> ~/.ssh/known_hosts
```

### 3. 找不到憑證
- 檢查憑證 ID
- 檢查作用範圍
- 檢查網域設定

### 4. 認證逾時
```bash
ssh -o ConnectTimeout=30 git@github.com
ping github.com
```

## 測試 SSH 設定

### 1. 測試連線
```bash
ssh -T git@github.com
ssh -T git@gitlab.com
ssh -vT git@github.com
```

### 2. 測試 Git 操作
```bash
git clone git@github.com:username/repository.git
cd repository
git pull origin main
```

### 3. Jenkins 測試 Job
```groovy
pipeline {
    agent any
    stages {
        stage('Test SSH') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'git@github.com:username/test-repo.git',
                        credentialsId: 'github-ssh-key'
                    ]]
                ])
                sh 'git log --oneline -5'
            }
        }
    }
}
```

## 效能優化建議

### 1. SSH 連線複用
```bash
Host github.com
    HostName github.com
    User git
    ControlMaster auto
    ControlPath ~/.ssh/control-%h-%p-%r
    ControlPersist 1h
```

### 2. 金鑰快取
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

## CI/CD 流水線整合

### 1. 多分支流水線
```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh'
            }
        }
    }
}
```

### 2. 參數化建置
```groovy
pipeline {
    agent any
    parameters {
        choice(
            name: 'BRANCH',
            choices: ['main', 'develop', 'feature/*'],
            description: '選擇建置分支'
        )
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${params.BRANCH}"]],
                    userRemoteConfigs: [[
                        url: 'git@github.com:username/repository.git',
                        credentialsId: 'github-ssh-key'
                    ]]
                ])
            }
        }
    }
}
```

## 監控與維護

### 1. 定期維護
- 金鑰輪換（6-12 個月）
- 權限審查
- 日誌分析
- 金鑰備份

### 2. 健康檢查
```bash
ssh-keygen -l -f ~/.ssh/id_rsa
ssh -T git@github.com
curl -u username:api_token http://jenkins:8080/job/test-job/lastBuild/api/json
```

## 總結

透過上述步驟，Jenkins 可安全高效地透過 SSH 拉取 Git 程式碼，提升 CI/CD 自動化與安全性。建議每個 Jenkins 環境都規範設定 SSH 憑證，避免因權限問題導致建置中斷。

**主要優勢：**
- **安全性提升**：加密通訊與金鑰認證
- **自動化存取**：無需人工干預
- **稽核追蹤**：便於權限管理
- **彈性控制**：細緻權限分配

## 相關文章

- [Jenkins 1：什麼是 Jenkins](/2024-08-15-jenkins-1-what-is-jenkins/)
- [Jenkins 2：Jenkins 伺服器建置](/2024-08-15-jenkins-2-how-to-setup-jenkins-server/)
- [Git 安全最佳實踐](/2025-05-18-how-to-use-multiple-github-accounts-using-ssh/)
- [DevOps 安全指南](/2024-08-02-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8.8.md/)

> **專業建議**：更多 Jenkins 憑證系統與進階設定，請參考 [Jenkins 官方文件](https://jenkins.io/doc/)。
