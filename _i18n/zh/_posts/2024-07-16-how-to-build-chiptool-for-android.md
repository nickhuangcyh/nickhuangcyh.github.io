---
layout: post
title: How to build CHIPTool for Android
date: 2024-07-16 19:50:00 +0800
description: 本篇文章我將介紹如何按照步驟 Build 出 CHIPTool apk
tags: [Android, CHIP, Matter]
categories: [Tools]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/matter.jpg
---

## 前言

最近因工作需要，研究了一下如何從源碼 Build CHIPTool 的 Android apk。雖然官方文件提供了基本流程，但實際操作時會遇到一些沒提到的錯誤，我也因此多花了不少時間逐一解決。這篇文章就是要幫大家避開這些坑，也方便日後自己複習🙂

---

## 簡介

Matter（原名 Project CHIP，Connected Home over IP）是一個開源連接標準，目的是讓智慧家庭設備之間的互通性與相容性更加流暢。這個標準由連接標準聯盟（CSA）發起，成員包含 Apple、Google、Amazon 和 Zigbee 等業界大廠。

Matter 強調安全性、可用性與開發友善，支援 Thread 與 Wi-Fi 通訊協議，是打造跨品牌智慧家居的基礎。

---

## 事前準備

由於直接在本機環境 Build 容易打亂設定（例如 ANDROID_HOME、ANDROID_NDK_HOME），這邊推薦使用 CHIP 官方提供的 Docker image，避免環境汙染。

---

### 需要工具：

- Docker

---

## Pull Docker Image

這個步驟會花點時間，可以去喝杯咖啡。

```bash
docker pull ghcr.io/project-chip/chip-build-android:latest
```

---

## Run container

```bash
docker run -it -v ~/workspace/connectedhomeip:/connectedhomeip ghcr.io/project-chip/chip-build-android:latest
```

執行完後，我們就完成了一個乾淨、可用來 Build CHIPTool 的開發環境。

---

## 將目錄標示為安全，方便 git 操作

```bash
git config --global --add safe.directory /connectedhomeip
git config --global --add safe.directory /connectedhomeip/third_party/pigweed/repo
```

---

## 下載源碼與 submodules

資料量非常大，這步驟可能會跑一陣子，不妨先去處理其他事，或睡個午覺😂

```bash
git clone https://github.com/project-chip/connectedhomeip.git
cd connectedhomeip
git submodule sync && git submodule update --init
```

---

## 同意 Android SDK 的 licenses

若沒先同意 licenses，Build 過程會失敗並出現如下錯誤：

```bash
> Failed to install the following Android SDK packages as some licences have not been accepted.
> build-tools;30.0.2 Android SDK Build-Tools 30.0.2
> platforms;android-31 Android SDK Platform 31
```

為了避免這問題，我們先把路徑加入環境變數：

```bash
export PATH=$PATH:/opt/android/sdk/tools/bin
```

然後同意所有 licenses：

```bash
sdkmanager --licenses
```

過程中輸入 `y` or `yes` 即可。

---

## 檢查環境變數

使用官方 Docker image 最大的好處之一，就是 SDK 與 NDK 都已經配置好了，不用再手動設置：

```bash
echo $ANDROID_HOME
# /opt/android/sdk

echo $ANDROID_NDK_HOME
# /opt/android/android-ndk-r23c
```

---

## Preparing for build

1. 切換到 Matter 專案目錄：

```bash
cd /connectedhomeip
```

2. 執行 bootstrap（首次必需）：

```bash
source scripts/bootstrap.sh
```

這一步也會花一段時間。

---

## 使用官方 script 建構 Android CHIPTool

1. 執行 build script：

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

但跑到最後會出錯，訊息如下：

```bash
ninja: error: loading 'build.ninja': No such file or directory
```

這應該是官方文件漏寫了部分步驟，我的解法是手動在目標目錄下執行以下指令來產生 `build.ninja`：

```bash
cd /connectedhomeip/out/android-arm64-chip-tool
gn gen .
```

接著回到專案根目錄：

```bash
cd ../..
```

再執行一次 Build：

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

完成後你就可以在以下路徑找到 APK：

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
