---
layout: post
title: "Jenkins 伺服器建置：Docker 安裝全流程實戰指南"
date: 2024-08-15 17:00:00 +0800
description: "透過 Docker 容器快速建置 Jenkins 伺服器，詳解 CI/CD 自動化、Android 建置環境整合與生產部署最佳實踐。"
tags: [Jenkins, CI/CD, DevOps, Docker, Container, Automation, Build Server, GitHub Container Registry, Android Development]
categories: [DevOps, CI/CD, Docker, Automation]
toc:
  sidebar: right
thumbnail: /assets/img/jenkins.jpg
---

## 🚀 **Jenkins 伺服器建置全覽**

本指南將帶你透過 Docker 容器快速建置 Jenkins 伺服器。這種方式不僅簡單高效，還能確保多環境一致性。

**你將學到：**

- 🐳 基於 Docker 的 Jenkins 安裝
- 🛠️ 步驟詳盡的建置流程
- 📱 整合 Android 建置環境
- 🛡️ 生產部署最佳實踐
- 🔍 常見問題排查技巧

---

## 🎯 **為什麼用 Docker 部署 Jenkins？**

### **Docker 方案優勢：**

- ✅ 環境一致性，開發/測試/生產無差異
- ✅ 部署快速，易於擴充與遷移
- ✅ 版本可控，支援多版本並存
- ✅ 資源隔離，避免衝突
- ✅ 易於橫向擴充

### **主流 Jenkins 映像：**

- **標準版 Jenkins**：`jenkins/jenkins:lts-jdk17`
- **整合 Android 環境**：`ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17`

---

## 🛠️ **Jenkins 建置步驟詳解**

### **步驟 1：拉取 Docker 映像**

在終端執行以下指令，拉取所需 Jenkins 映像：

#### **A. 標準 Jenkins 環境**

```bash
docker pull jenkins/jenkins:lts-jdk17
```

#### **B. 整合 Android 建置環境**

```bash
docker pull ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17
```

**映像對比：**
| 映像 | 說明 | 適用場景 |
|------|------|----------|
| `jenkins/jenkins:lts-jdk17` | 標準 Jenkins，JDK 17 | 通用 CI/CD |
| `ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17` | 整合 Android SDK | Android 開發 |

### **步驟 2：執行 Jenkins 容器**

將 `${volume_path}` 替換為本機 Jenkins 資料儲存路徑。

#### **A. 標準 Jenkins 容器**

```bash
docker run -d \
  --name jenkins-server \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  jenkins/jenkins:lts-jdk17
```

#### **B. 整合 Android 環境容器**

```bash
docker run -d \
  --name jenkins-android-server \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  ghcr.io/nickhuangcyh/docker-jenkins-and-android-env:v1.0.0-jdk17
```

**指令說明：**

- `-d`：背景執行
- `--name`：容器命名
- `-v`：掛載本機目錄
- `-p 8080:8080`：Web UI 埠口對應
- `-p 50000:50000`：Agent 通訊埠口

### **步驟 3：存取 Jenkins Web 介面**

容器啟動後，瀏覽器訪問 [http://localhost:8080](http://localhost:8080)。首次訪問需輸入初始管理員密碼。

{% include figure.liquid path="assets/img/jenkins_setup_initialAdminPassword.png" title="Jenkins 初始密碼頁面" %}

#### **取得初始密碼**

> **💡 專業建議：** `${volume_path}` 即為資料目錄，初始密碼路徑為：
>
> ```bash
> cat ${volume_path}/secrets/initialAdminPassword
> ```

**其他取得方式：**

```bash
# 查看容器日誌
docker logs jenkins-server

# 容器內執行指令
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword

# 直接讀取掛載目錄
cat ${volume_path}/secrets/initialAdminPassword
```

### **步驟 4：完成初始化設定**

1. 輸入初始密碼
2. 安裝推薦外掛或自訂安裝
3. 建立管理員帳號
4. 設定 Jenkins URL（本機用 `http://localhost:8080`）
5. 開始使用 Jenkins！🎉

{% include figure.liquid path="assets/img/jenkins_setup_main_page.png" title="Jenkins 主面板" %}

---

## 🔧 **進階設定與最佳實踐**

### **自訂 Docker 啟動指令**

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

**參數說明：**

- `--restart unless-stopped`：自動重啟
- `-v /var/run/docker.sock:/var/run/docker.sock`：支援 Docker in Docker
- `-e JAVA_OPTS`：JVM 參數
- `-e JENKINS_OPTS`：Jenkins 啟動參數

### **Docker Compose 管理**

編寫 `docker-compose.yml`，便於多容器管理：

```yaml
version: "3.8"
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

**啟動指令：**

```bash
docker-compose up -d
```

---

## 🚨 **常見問題排查**

### **1. 容器無法啟動**

```bash
# 查看容器狀態
docker ps -a
# 查看日誌
docker logs jenkins-server
# 埠口占用
sudo lsof -i :8080
# 權限問題
sudo chown -R 1000:1000 ${volume_path}
```

### **2. 無法存取 Web 介面**

```bash
# 檢查容器是否執行
docker ps
# 檢查埠口對應
docker port jenkins-server
# 測試連通性
curl http://localhost:8080
```

### **3. 權限拒絕**

```bash
# 修復權限
sudo chown -R 1000:1000 ${volume_path}
# 以 root 用戶執行
docker run -d \
  --name jenkins-server \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  --user root \
  jenkins/jenkins:lts-jdk17
```

### **4. 記憶體不足**

```bash
# 增加記憶體限制
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

## 📈 **效能優化建議**

### **資源推薦配置**

| 環境 | CPU  | 記憶體 | 儲存  |
| ---- | ---- | ------ | ----- |
| 開發 | 1核  | 2GB    | 10GB  |
| 測試 | 2核  | 4GB    | 20GB  |
| 生產 | 4核+ | 8GB+   | 50GB+ |

### **JVM 調校**

```bash
# 生產環境 JVM 優化
docker run -d \
  --name jenkins-server \
  -v ${volume_path}:/var/jenkins_home \
  -p 8080:8080 \
  -p 50000:50000 \
  -e JAVA_OPTS="-Xmx4g -Xms2g -XX:+UseG1GC" \
  jenkins/jenkins:lts-jdk17
```

---

## 🔒 **安全最佳實踐**

### **1. 生產環境啟用 HTTPS**

```bash
# 掛載 SSL 憑證
docker run -d \
  --name jenkins-server \
  -v ${volume_path}:/var/jenkins_home \
  -v /path/to/ssl:/var/jenkins_ssl \
  -p 443:8080 \
  -e JENKINS_OPTS="--httpPort=-1 --httpsPort=8080 --httpsCertificate=/var/jenkins_ssl/cert.pem --httpsPrivateKey=/var/jenkins_ssl/key.pem" \
  jenkins/jenkins:lts-jdk17
```

### **2. 啟用認證與權限管理**

- 整合 LDAP/AD
- 啟用 Jenkins 安全功能
- 定期更換密碼
- 開啟雙因素認證

### **3. 網路安全**

```bash
# 自訂網路與防火牆
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

## 🛡️ **監控與維護**

### **健康檢查**

```bash
# 新增健康檢查
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

### **備份策略**

```bash
# 備份腳本範例
#!/bin/bash
BACKUP_DIR="/backup/jenkins"
DATE=$(date +%Y%m%d_%H%M%S)

docker stop jenkins-server
tar -czf "${BACKUP_DIR}/jenkins_backup_${DATE}.tar.gz" -C ${volume_path} .
docker start jenkins-server
echo "Backup completed: jenkins_backup_${DATE}.tar.gz"
```

---

## 🔗 **相關文章推薦**

- [Jenkins 基礎原理](/2024-08-15-jenkins-1-what-is-jenkins)
- [Jenkins SSH 憑證設定](/2024-08-16-jenkins-3-configure-credentials-ssh)
- [GitHub 容器倉庫建置](/2024-07-23-getting-started-with-github-container-registry)
- [macOS 開發環境建置](/2024-01-11-setup-development-environment-on-a-new-macos)

---

## ✅ **總結**

恭喜你，已成功透過 Docker 建置 Jenkins 伺服器！

**本方案優勢：**

- 🚀 部署高效
- 🛠️ 環境一致性
- 📱 支援 Android 建置
- 🛡️ 備份與還原便捷
- 📈 架構可擴充

**後續建議：**

1. 設定首個流水線
2. 設定分散式建置代理
3. 整合版本控制系統
4. 強化生產安全
5. 設定監控與告警

> **💡 專業建議：** 開發環境推薦用 Docker Compose 管理，生產環境建議自動化備份。

---

**💡 專業建議：** 推薦體驗 Jenkins Blue Ocean 外掛，獲得更現代的流水線視覺化。

**🔔 關注我們：** 持續關注 DevOps 系列，獲取更多 CI/CD 自動化乾貨！

---

**📚 延伸閱讀：**

- [Jenkins 官方文件](https://jenkins.io/doc/)
- [Docker Jenkins 映像](https://hub.docker.com/r/jenkins/jenkins/)
- [Jenkins 最佳實踐](https://jenkins.io/doc/book/architecting-for-scale/)
- [CI/CD 流水線設計](https://jenkins.io/doc/book/pipeline/)
