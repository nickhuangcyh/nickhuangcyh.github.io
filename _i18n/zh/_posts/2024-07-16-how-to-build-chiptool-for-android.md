---
layout: post
title: Android CHIPTool 建置完整教學：從原始碼編譯 Matter 開發工具指南
date: 2024-07-16 19:50:00 +0800
description: 學會如何從 Matter 原始碼編譯出 CHIPTool Android APK。詳細解決編譯過程中常見的環境配置、依賴套件與錯誤排除問題。包含完整的開發環境設置、編譯指令與實用技巧。
tags: [Android Development, CHIPTool, Matter Protocol, IoT Development, Android Build, Source Code Compilation, Smart Home, Connected Devices]
categories: [Tools]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/matter.jpg
---

## 前言

最近因工作需要，研究了一下如何從源碼 Build CHIPTool 的 Android apk。官方文件雖然提供了基本流程，但實際操作時會遇到一些未提及的錯誤。

這些問題讓我多花了不少時間逐一解決。因此，這篇文章將幫助大家避開這些常見陷阱。同時也方便日後自己複習查閱。

---

## 簡介

Matter（原名 Project CHIP，Connected Home over IP）是一個開源連接標準。其主要目的是提升智慧家庭設備之間的互通性與相容性。

這個標準由連接標準聯盟（CSA）發起，成員包含 Apple、Google、Amazon 和 Zigbee 等業界大廠。Matter 的核心優勢在於強調安全性、可用性與開發友善性。

它支援 Thread 與 Wi-Fi 等主流通訊協議，為打造跨品牌智慧家居生態系統奠定了重要基礎。

---

## 事前準備

直接在本機環境進行 Build 操作容易打亂現有設定，特別是 ANDROID_HOME、ANDROID_NDK_HOME 等重要環境變數。

為了避免環境汙染問題，本文推薦使用 CHIP 官方提供的 Docker image。這種方式不僅能確保環境純淨，還能避免與既有開發環境產生衝突。

---

### 需要工具：

- Docker

---

## 下載 Docker Image

首先需要下載官方的 Docker image。這個步驟會需要一些時間，建議可以先去喝杯咖啡。

```bash
docker pull ghcr.io/project-chip/chip-build-android:latest
```

該 image 包含了所有必要的建置工具和預配置環境，大幅簡化了後續的設置步驟。

---

## 啟動容器

下載完成後，使用以下指令啟動 Docker 容器：

```bash
docker run -it -v ~/workspace/connectedhomeip:/connectedhomeip ghcr.io/project-chip/chip-build-android:latest
```

這個指令會將本地的 `~/workspace/connectedhomeip` 目錄掛載到容器內的 `/connectedhomeip` 路徑。執行完成後，我們就獲得了一個乾淨且完整的 CHIPTool 建置環境。

---

## 設定 Git 安全目錄

在容器環境中，Git 可能會將某些目錄視為不安全。為了順利進行後續的 Git 操作，需要將相關目錄標示為安全：

```bash
git config --global --add safe.directory /connectedhomeip
git config --global --add safe.directory /connectedhomeip/third_party/pigweed/repo
```

這個設定確保我們能在容器內正常執行 Git 指令，避免權限相關的錯誤訊息。

---

## 下載源碼與子模組

接下來需要下載 Matter 專案的完整源碼。由於 Matter 專案包含大量的第三方依賴，資料量相當龐大。

```bash
git clone https://github.com/project-chip/connectedhomeip.git
cd connectedhomeip
git submodule sync && git submodule update --init
```

這個過程可能需要等待較長時間，建議可以先去處理其他事情。下載時間取決於網路速度，通常需要 30 分鐘到數小時不等。

---

## 同意 Android SDK 授權條款

在開始建置之前，必須先同意 Android SDK 的授權條款。如果跳過這個步驟，建置過程會失敗並出現以下錯誤訊息：

```bash
> Failed to install the following Android SDK packages as some licences have not been accepted.
> build-tools;30.0.2 Android SDK Build-Tools 30.0.2
> platforms;android-31 Android SDK Platform 31
```

為了解決這個問題，首先需要將 Android SDK 工具路徑加入環境變數：

```bash
export PATH=$PATH:/opt/android/sdk/tools/bin
```

接著執行以下指令來同意所有必要的授權條款：

```bash
sdkmanager --licenses
```

執行過程中，系統會詢問是否同意各項授權條款，輸入 `y` 或 `yes` 即可完成設定。

---

## 驗證環境變數

使用官方 Docker image 的一大優勢，在於 Android SDK 與 NDK 都已經預先配置完成。我們可以透過以下指令來確認環境變數是否設定正確：

```bash
echo $ANDROID_HOME
# /opt/android/sdk

echo $ANDROID_NDK_HOME
# /opt/android/android-ndk-r23c
```

這些路徑確認無誤後，就表示建置環境已經準備就緒，可以進入下一個階段。

---

## 建置前準備

在開始正式建置之前，還需要完成幾個重要的準備步驟。

首先，切換到 Matter 專案的根目錄：

```bash
cd /connectedhomeip
```

接著執行 bootstrap 腳本來初始化建置環境。這個步驟對於首次建置是必要的：

```bash
source scripts/bootstrap.sh
```

bootstrap 過程會下載並配置所有必要的建置工具和依賴項目。同樣地，這個步驟也需要一段時間來完成。

---

## 建置 Android CHIPTool

現在可以開始執行實際的建置過程。使用官方提供的建置腳本來產生 CHIPTool APK：

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

### 解決常見建置錯誤

在執行上述指令時，很可能會遇到以下錯誤：

```bash
ninja: error: loading 'build.ninja': No such file or directory
```

這個問題在官方文件中並未提及，但可以透過手動產生 `build.ninja` 檔案來解決。

首先，切換到建置輸出目錄：

```bash
cd /connectedhomeip/out/android-arm64-chip-tool
```

然後執行 GN 工具來產生必要的建置檔案：

```bash
gn gen .
```

接著返回專案根目錄：

```bash
cd ../..
```

最後重新執行建置指令：

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

### 取得建置結果

建置完成後，您可以在以下路徑找到產生的 APK 檔案：

```
out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk
```

> ##### TIP
>
> 如果你在 Build 過程中遇到 `build.ninja` 相關錯誤，記得先手動 `gn gen .` 一下再繼續，這是目前官方文件中未提到但必要的步驟！
> {: .block-tip }

---

## 參考資料

- [CHIP Android Building](https://github.com/project-chip/connectedhomeip/blob/master/docs/guides/android_building.md)
- [CHIP Issue #28317](https://github.com/project-chip/connectedhomeip/issues/28317)
- [CHIP Issue #21093](https://github.com/project-chip/connectedhomeip/issues/21093)
- [CHIP Issue #32794](https://github.com/project-chip/connectedhomeip/issues/32795)
- [CHIP Docker Versions](https://github.com/project-chip/connectedhomeip/pkgs/container/chip-build-android/versions?filters%5Bversion_type%5D=tagged)
