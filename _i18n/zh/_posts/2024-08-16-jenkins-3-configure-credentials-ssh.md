---
layout: post
title: "Jenkins 3：配置 SSH 凭据，实现安全 Git 代码拉取"
date: 2024-12-09 20:00:00 +0800
description: "详解如何在 Jenkins 中配置 SSH 凭据，实现安全拉取 Git 仓库代码。涵盖密钥生成、凭据管理与流水线集成全流程。"
tags: [Jenkins, SSH, Credentials, Git, CI/CD, DevOps, Security, Authentication, SSH Keys, Repository Access]
categories: [DevOps, CI/CD, Security, Jenkins, Git, Authentication]
toc:
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

> 本文详解如何在 Jenkins 中配置 SSH 凭据，实现安全拉取 Git 代码，助力 CI/CD 流水线自动化与安全。

## 引言：Jenkins 安全拉取代码的最佳实践

本文将带你完成 Jenkins 配置 SSH 凭据的全流程，包括密钥生成、凭据添加、流水线集成与安全加固，是保障自动化部署与代码安全的关键环节。

## 为什么用 SSH 拉取 Git 代码？

SSH（安全外壳协议）相比 HTTPS 具备多项优势：
- **安全性高**：通信全程加密
- **无需存储密码**：密钥认证更安全
- **自动化访问**：无需人工干预
- **审计追踪**：便于权限管理与操作追踪
- **权限细粒度**：可为不同仓库分配不同密钥

## 前置条件
- Jenkins 服务器已部署
- Git 仓库支持 SSH 访问
- 拥有 Jenkins 管理员权限
- 已安装 SSH 客户端工具

## 步骤 1：生成 SSH 密钥对

在终端执行：
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
按提示完成密钥生成，记下公钥与私钥路径。

### 其他密钥生成方式
```bash
# 推荐：4096 位 RSA 密钥
ssh-keygen -t rsa -b 4096 -C "jenkins@company.com"
# Ed25519（更安全）
ssh-keygen -t ed25519 -C "jenkins@company.com"
# 自定义文件名
ssh-keygen -t rsa -b 4096 -f ~/.ssh/jenkins_rsa -C "jenkins@company.com"
```

### 常见密钥类型对比
| 类型 | 安全性 | 长度 | 兼容性 |
|------|--------|------|--------|
| **RSA** | 高 | 2048-4096 | 通用 |
| **Ed25519** | 很高 | 256 | 现代系统 |
| **ECDSA** | 高 | 256-521 | 主流系统 |
| **DSA** | 低 | 1024 | 仅限旧系统 |

## 步骤 2：将公钥添加到代码托管平台

以 GitHub 为例：
1. 登录 GitHub，进入「Settings」
2. 选择「SSH and GPG keys」
3. 点击「New SSH key」，粘贴公钥内容
4. 保存

### 不同平台操作
- **GitHub**：`cat ~/.ssh/id_rsa.pub | pbcopy`（macOS）
- **GitLab**：用户设置 → SSH Keys
- **Bitbucket**：个人设置 → SSH Keys

## 步骤 3：在 Jenkins 添加 SSH 凭据

### 1. 进入 Jenkins 管理界面
- 访问 `http://localhost:8080/`
- 登录管理员账号
- 依次点击「Credentials」→「System」

### 2. 新建域（可选）
- 点击「Add domain」
- 填写域名（如「GitHub」）
- 确认

### 3. 添加 SSH 凭据
- 选择新建域，点击「Add Credentials」
- 填写如下信息：

| 字段 | 值 | 说明 |
|------|----|------|
| Kind | SSH Username with private key | 凭据类型 |
| Scope | Global | 作用域 |
| ID | `github-ssh-key` | 唯一标识（可选） |
| Description | `SSH key for GitHub access` | 备注 |
| Username | `git` | Git 仓库默认用户名 |
| Private Key | Enter directly | 粘贴私钥内容 |

### 4. 私钥格式要求
```bash
cat ~/.ssh/id_rsa
```
示例：
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

## 步骤 4：配置 Jenkins Job 使用 SSH 凭据

### 1. 创建或编辑 Job
- 选择「Git」作为源码管理
- 仓库地址使用 SSH 格式：
```bash
git@github.com:username/repository.git
```

### 2. 选择凭据
- 在「Credentials」下拉选择 SSH 凭据
- 选择分支，保存配置

### 示例 Jenkinsfile
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

## 进阶 SSH 配置

### 1. SSH 配置文件

`~/.ssh/config` 示例：
```bash
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_rsa
    IdentitiesOnly yes
```

### 2. 多密钥管理

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_rsa -C "jenkins@company.com"
ssh-keygen -t rsa -b 4096 -f ~/.ssh/gitlab_rsa -C "jenkins@company.com"
ssh-keygen -t rsa -b 4096 -f ~/.ssh/bitbucket_rsa -C "jenkins@company.com"
```

### 3. SSH Agent 配置

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github_rsa
ssh-add ~/.ssh/gitlab_rsa
```

## 安全最佳实践

### 1. 密钥管理
- 独立密钥，专用 Jenkins
- 定期轮换密钥
- 权限设置（私钥 600）
- 安全存储
```bash
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

### 2. 权限与访问控制
- 最小权限原则
- 仓库专用密钥
- 定期审计

### 3. 监控与告警
- 监控 SSH 日志
- 跟踪密钥使用
- 异常行为告警

## 常见问题排查

### 1. 权限拒绝
```bash
ssh -T git@github.com
ls -la ~/.ssh/
ssh-add -l
```

### 2. 主机密钥校验失败
```bash
ssh-keyscan -H github.com >> ~/.ssh/known_hosts
```

### 3. 找不到凭据
- 检查凭据 ID
- 检查作用域
- 检查域设置

### 4. 认证超时
```bash
ssh -o ConnectTimeout=30 git@github.com
ping github.com
```

## 测试 SSH 配置

### 1. 测试连接
```bash
ssh -T git@github.com
ssh -T git@gitlab.com
ssh -vT git@github.com
```

### 2. 测试 Git 操作
```bash
git clone git@github.com:username/repository.git
cd repository
git pull origin main
```

### 3. Jenkins 测试 Job
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

## 性能优化建议

### 1. SSH 连接复用
```bash
Host github.com
    HostName github.com
    User git
    ControlMaster auto
    ControlPath ~/.ssh/control-%h-%p-%r
    ControlPersist 1h
```

### 2. 密钥缓存
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

## CI/CD 流水线集成

### 1. 多分支流水线
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

### 2. 参数化构建
```groovy
pipeline {
    agent any
    parameters {
        choice(
            name: 'BRANCH',
            choices: ['main', 'develop', 'feature/*'],
            description: '选择构建分支'
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

## 监控与维护

### 1. 定期维护
- 密钥轮换（6-12 个月）
- 权限审查
- 日志分析
- 密钥备份

### 2. 健康检查
```bash
ssh-keygen -l -f ~/.ssh/id_rsa
ssh -T git@github.com
curl -u username:api_token http://jenkins:8080/job/test-job/lastBuild/api/json
```

## 总结

通过上述步骤，Jenkins 可安全高效地通过 SSH 拉取 Git 代码，提升 CI/CD 自动化与安全性。建议每个 Jenkins 环境都规范配置 SSH 凭据，避免因权限问题导致构建中断。

**主要优势：**
- **安全性提升**：加密通信与密钥认证
- **自动化访问**：无需人工干预
- **审计追踪**：便于权限管理
- **灵活控制**：细粒度权限分配

## 相关文章

- [Jenkins 1：什么是 Jenkins](/2024-08-15-jenkins-1-what-is-jenkins/)
- [Jenkins 2：Jenkins 服务器搭建](/2024-08-15-jenkins-2-how-to-setup-jenkins-server/)
- [Git 安全最佳实践](/2025-05-18-how-to-use-multiple-github-accounts-using-ssh/)
- [DevOps 安全指南](/2024-08-02-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8.8.md/)

> **专业建议**：更多 Jenkins 凭据系统与进阶配置，请参考 [Jenkins 官方文档](https://jenkins.io/doc/)。
