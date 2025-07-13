---
layout: post
title: "Jenkins 服务器搭建：Docker 安装全流程实战指南"
date: 2024-08-15 17:00:00 +0800
description: "通过 Docker 容器快速搭建 Jenkins 服务器，详解 CI/CD 自动化、Android 构建环境集成与生产部署最佳实践。"
tags: [Jenkins, CI/CD, DevOps, Docker, Container, Automation, Build Server, GitHub Container Registry, Android Development]
categories: [DevOps, CI/CD, Docker, Automation]
toc:
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## 🚀 **Jenkins 服务器搭建全览**

本指南将带你通过 Docker 容器快速搭建 Jenkins 服务器。这种方式不仅简单高效，还能确保多环境一致性。

**你将学到：**
- 🐳 基于 Docker 的 Jenkins 安装
- 🛠️ 步骤详尽的搭建流程
- 📱 集成 Android 构建环境
- 🛡️ 生产部署最佳实践
- 🔍 常见问题排查技巧

---

## 🎯 **为什么用 Docker 部署 Jenkins？**

### **Docker 方案优势：**
- ✅ 环境一致性，开发/测试/生产无差异
- ✅ 部署快捷，易于扩展与迁移
- ✅ 版本可控，支持多版本并存
- ✅ 资源隔离，避免冲突
- ✅ 易于横向扩展

### **主流 Jenkins 镜像：**
- **标准版 Jenkins**：`jenkins/jenkins:lts-jdk17`
- **集成 Android 环境**：`ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17`

---

## 🛠️ **Jenkins 搭建步骤详解**

### **步骤 1：拉取 Docker 镜像**

在终端执行以下命令，拉取所需 Jenkins 镜像：

#### **A. 标准 Jenkins 环境**
```bash
docker pull jenkins/jenkins:lts-jdk17
```

#### **B. 集成 Android 构建环境**
```bash
docker pull ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17
```

**镜像对比：**
| 镜像 | 说明 | 适用场景 |
|------|------|----------|
| `jenkins/jenkins:lts-jdk17` | 标准 Jenkins，JDK 17 | 通用 CI/CD |
| `ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17` | 集成 Android SDK | Android 开发 |

### **步骤 2：运行 Jenkins 容器**

将 `${volume_path}` 替换为本地 Jenkins 数据存储路径。

#### **A. 标准 Jenkins 容器**
```bash
docker run -d \
  --name jenkins-server \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  jenkins/jenkins:lts-jdk17
```

#### **B. 集成 Android 环境容器**
```bash
docker run -d \
  --name jenkins-android-server \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17
```

**命令说明：**
- `-d`：后台运行
- `--name`：容器命名
- `-v`：挂载本地目录
- `-p 8080:8080`：Web UI 端口映射
- `-p 50000:50000`：Agent 通信端口

### **步骤 3：访问 Jenkins Web 界面**

容器启动后，浏览器访问 [http://localhost:8080](http://localhost:8080)。首次访问需输入初始管理员密码。

{% include figure.liquid path="assets/img/jenkins_setup_initialAdminPassword.png" title="Jenkins 初始密码页面" %}

#### **获取初始密码**

> **💡 专业建议：** `${volume_path}` 即为数据目录，初始密码路径为：
>
> ```bash
> cat ${volume_path}/secrets/initialAdminPassword
> ```

**其他获取方式：**
```bash
# 查看容器日志
docker logs jenkins-server

# 容器内执行命令
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword

# 直接读取挂载目录
cat ${volume_path}/secrets/initialAdminPassword
```

### **步骤 4：完成初始化配置**

1. 输入初始密码
2. 安装推荐插件或自定义安装
3. 创建管理员账号
4. 配置 Jenkins URL（本地用 `http://localhost:8080`）
5. 开始使用 Jenkins！🎉

{% include figure.liquid path="assets/img/jenkins_setup_main_page.png" title="Jenkins 主面板" %}

---

## 🔧 **进阶配置与最佳实践**

### **自定义 Docker 启动命令**

```bash
docker run -d \
  --name jenkins-server \
  --restart unless-stopped \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/bin/docker:/usr/bin/docker \
  -p 8080:8080 \
  -p 50000:50000 \
  -e JAVA_OPTS="-Djenkins.install.runSetupWizard=false" \
  -e JENKINS_OPTS="--prefix=/jenkins" \
  jenkins/jenkins:lts-jdk17
```

**参数说明：**
- `--restart unless-stopped`：自动重启
- `-v /var/run/docker.sock:/var/run/docker.sock`：支持 Docker in Docker
- `-e JAVA_OPTS`：JVM 参数
- `-e JENKINS_OPTS`：Jenkins 启动参数

### **Docker Compose 管理**

编写 `docker-compose.yml`，便于多容器管理：

```yaml
version: '3.8'
services:
  jenkins:
    image: jenkins/jenkins:lts-jdk17
    container_name: jenkins-server
    restart: unless-stopped
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=false
    networks:
      - jenkins-network

volumes:
  jenkins_home:

networks:
  jenkins-network:
    driver: bridge
```

**启动命令：**
```bash
docker-compose up -d
```

---

## 🚨 **常见问题排查**

### **1. 容器无法启动**
```bash
# 查看容器状态
docker ps -a
# 查看日志
docker logs jenkins-server
# 端口占用
sudo lsof -i :8080
# 权限问题
sudo chown -R 1000:1000 ${volume_path}
```

### **2. 无法访问 Web 界面**
```bash
# 检查容器是否运行
docker ps
# 检查端口映射
docker port jenkins-server
# 测试连通性
curl http://localhost:8080
```

### **3. 权限拒绝**
```bash
# 修复权限
sudo chown -R 1000:1000 ${volume_path}
# 以 root 用户运行
docker run -d \
  --name jenkins-server \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  --user root \
  jenkins/jenkins:lts-jdk17
```

### **4. 内存不足**
```bash
# 增加内存限制
docker run -d \
  --name jenkins-server \
  --memory=2g \
  --memory-swap=4g \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  jenkins/jenkins:lts-jdk17
```

---

## 📈 **性能优化建议**

### **资源推荐配置**

| 环境 | CPU | 内存 | 存储 |
|------|-----|------|------|
| 开发 | 1核 | 2GB  | 10GB |
| 测试 | 2核 | 4GB  | 20GB |
| 生产 | 4核+| 8GB+ | 50GB+|

### **JVM 调优**

```bash
# 生产环境 JVM 优化
docker run -d \
  --name jenkins-server \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  -e JAVA_OPTS="-Xmx4g -Xms2g -XX:+UseG1GC" \
  jenkins/jenkins:lts-jdk17
```

---

## 🔒 **安全最佳实践**

### **1. 生产环境启用 HTTPS**
```bash
# 挂载 SSL 证书
docker run -d \
  --name jenkins-server \
  -v ${volume_path}:/var/jenkins_home \
  -v /path/to/ssl:/var/jenkins_ssl \
  -p 443:8080 \
  -e JENKINS_OPTS="--httpPort=-1 --httpsPort=8080 --httpsCertificate=/var/jenkins_ssl/cert.pem --httpsPrivateKey=/var/jenkins_ssl/key.pem" \
  jenkins/jenkins:lts-jdk17
```

### **2. 启用认证与权限管理**
- 集成 LDAP/AD
- 启用 Jenkins 安全功能
- 定期更换密码
- 开启双因素认证

### **3. 网络安全**
```bash
# 自定义网络与防火墙
docker network create --driver bridge --subnet=172.20.0.0/16 jenkins-network

docker run -d \
  --name jenkins-server \
  --network jenkins-network \
  --ip 172.20.0.2 \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  jenkins/jenkins:lts-jdk17
```

---

## 🛡️ **监控与维护**

### **健康检查**
```bash
# 添加健康检查
docker run -d \
  --name jenkins-server \
  --health-cmd="curl -f http://localhost:8080 || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  jenkins/jenkins:lts-jdk17
```

### **备份策略**
```bash
# 备份脚本示例
#!/bin/bash
BACKUP_DIR="/backup/jenkins"
DATE=$(date +%Y%m%d_%H%M%S)

docker stop jenkins-server
tar -czf "${BACKUP_DIR}/jenkins_backup_${DATE}.tar.gz" -C ${volume_path} .
docker start jenkins-server
echo "Backup completed: jenkins_backup_${DATE}.tar.gz"
```

---

## 🔗 **相关文章推荐**

- [Jenkins 基础原理](/2024-08-15-jenkins-1-what-is-jenkins)
- [Jenkins SSH 凭据配置](/2024-08-16-jenkins-3-configure-credentials-ssh)
- [GitHub 容器仓库搭建](/2024-07-23-getting-started-with-github-container-registry)
- [macOS 开发环境搭建](/2024-01-11-setup-development-environment-on-a-new-macos)

---

## ✅ **总结**

恭喜你，已成功通过 Docker 搭建 Jenkins 服务器！

**本方案优势：**
- 🚀 部署高效
- 🛠️ 环境一致性
- 📱 支持 Android 构建
- 🛡️ 备份与恢复便捷
- 📈 架构可扩展

**后续建议：**
1. 配置首个流水线
2. 设置分布式构建代理
3. 集成版本控制系统
4. 强化生产安全
5. 配置监控与告警

> **💡 专业建议：** 开发环境推荐用 Docker Compose 管理，生产环境建议自动化备份。

---

**💡 专业建议：** 推荐体验 Jenkins Blue Ocean 插件，获得更现代的流水线可视化。

**🔔 关注我们：** 持续关注 DevOps 系列，获取更多 CI/CD 自动化干货！

---

**📚 延伸阅读：**
- [Jenkins 官方文档](https://jenkins.io/doc/)
- [Docker Jenkins 镜像](https://hub.docker.com/r/jenkins/jenkins/)
- [Jenkins 最佳实践](https://jenkins.io/doc/book/architecting-for-scale/)
- [CI/CD 流水线设计](https://jenkins.io/doc/book/pipeline/)
