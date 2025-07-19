---
layout: post
title: "如何編譯 CHIPTool for Android：Matter 協議開發全流程實戰"
date: 2024-07-16 19:50:00 +0800
description: "從原始碼編譯 Android 版 CHIPTool APK，詳解 Matter 協議開發、Docker 環境建置與常見建構問題排查。"
tags: [CHIP, Matter, Android Development, IoT, Smart Home, Connected Home over IP, Docker, Build Process, Protocol Development, Home Automation]
categories: [Android Development, IoT, Smart Home, Development Tools, Protocol Development]
toc:
  sidebar: right
thumbnail: /assets/img/matter.jpg
---

> 本文詳解如何從原始碼編譯 Android 版 CHIPTool，涵蓋 Docker 環境建置、原始碼編譯與常見問題排查，助力開發者高效參與 Matter 協議生態。

## 引言：Matter 協議與 CHIPTool 概述

近期因專案需求，研究了如何從原始碼編譯 CHIPTool Android APK。官方文件雖有基礎流程，但實際操作中遇到不少未記錄的坑，本文旨在幫助開發者避坑並便於後續查閱。

## 什麼是 Matter 協議？

Matter（前身為 Project CHIP, Connected Home over IP）是由 CSA（Connectivity Standards Alliance）主導的開源智慧家庭互聯標準，成員包括 Apple、Google、Amazon、Zigbee 等。Matter 強調安全性、易用性與開發友好，支援 Thread、Wi-Fi 等多種通訊協議，推動跨品牌智慧家庭互通。

### Matter 協議核心特性

- **互通性**：跨品牌、跨生態相容
- **安全性**：內建安全機制
- **多傳輸層**：支援 Thread、Wi-Fi、乙太網路
- **開放標準**：中立、開源
- **開發友好**：豐富 SDK 與工具

## 環境準備與相依

建議使用官方 CHIP Docker 映像，避免本地環境污染。

### 必備工具

- **Docker**：容器化建構環境
- **Git**：原始碼管理
- **磁碟空間**：建議 10GB 以上

### 系統需求

| 元件   | 最低配置            | 推薦配置 |
| ------ | ------------------- | -------- |
| 記憶體 | 8GB                 | 16GB+    |
| 儲存   | 10GB                | 20GB+    |
| CPU    | 4核                 | 8核+     |
| 系統   | Linux/macOS/Windows | Linux    |

## 步驟 1：拉取 Docker 映像

```bash
docker pull ghcr.io/project-chip/chip-build-android:latest
```

## 步驟 2：執行容器

```bash
docker run -it -v ~/workspace/connectedhomeip:/connectedhomeip ghcr.io/project-chip/chip-build-android:latest
```

## 步驟 3：設定 Git 安全目錄

```bash
git config --global --add safe.directory /connectedhomeip
git config --global --add safe.directory /connectedhomeip/third_party/pigweed/repo
```

## 步驟 4：下載原始碼與子模組

```bash
git clone https://github.com/project-chip/connectedhomeip.git
cd connectedhomeip
git submodule sync && git submodule update --init
```

### 目錄結構說明

```
connectedhomeip/
├── examples/           # 範例應用
│   └── chip-tool/      # CHIPTool 應用
├── src/                # Matter 協議核心實作
├── third_party/        # 第三方相依
├── scripts/            # 建構與工具腳本
└── docs/               # 文件
```

## 步驟 5：接受 Android SDK 授權協議

```bash
export PATH=$PATH:/opt/android/sdk/tools/bin
sdkmanager --licenses
```

## 步驟 6：驗證環境變數

```bash
echo $ANDROID_HOME  # /opt/android/sdk
echo $ANDROID_NDK_HOME  # /opt/android/android-ndk-r23c
```

## 步驟 7：專案初始化與相依安裝

```bash
cd /connectedhomeip
source scripts/bootstrap.sh
```

## 步驟 8：編譯 Android CHIPTool

```bash
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

> 若遇到 `ninja: error: loading 'build.ninja': No such file or directory`，需手動產生 build.ninja：

```bash
cd /connectedhomeip/out/android-arm64-chip-tool
gn gen .
cd ../..
./scripts/build/build_examples.py --target android-arm64-chip-tool build
```

編譯完成後，APK 路徑：

```
out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk
```

## 進階建構與常見問題排查

### 1. 多架構與發佈模式

```bash
# ARM64（推薦）
./scripts/build/build_examples.py --target android-arm64-chip-tool build
# ARM32
./scripts/build/build_examples.py --target android-arm32-chip-tool build
# x86（模擬器）
./scripts/build/build_examples.py --target android-x64-chip-tool build
# Release 建構
./scripts/build/build_examples.py --target android-arm64-chip-tool build --release
```

### 2. 常見錯誤與解決

- **build.ninja 缺失**：手動執行 gn gen .
- **SDK 授權未接受**：執行 sdkmanager --licenses
- **記憶體不足**：增加 swap 或降低並行數
- **網路逾時**：增大 git buffer 並重試

### 3. 測試 APK

```bash
adb install out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk
adb shell pm list packages | grep chip
adb shell am start -n com.matter.example.chip.tool/.MainActivity
```

### 4. 增量與清理建構

```bash
# 增量建構
./scripts/build/build_examples.py --target android-arm64-chip-tool build --incremental
# 清理建構
./scripts/build/build_examples.py --target android-arm64-chip-tool clean
```

### 5. 效能優化建議

- 並行編譯：`--jobs 8`
- 增量建構：`--incremental`
- 啟用 ccache：`--enable-ccache`
- 分散式建構：`--distributed`
- 降低記憶體佔用：`export MAKEFLAGS="-j2"`

### 6. 開發與 CI/CD 整合

- 本地程式碼修改可即時同步到容器
- GitHub Actions 自動化建構與 APK 上傳

```yaml
name: Build CHIPTool
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive
      - name: Build CHIPTool
        run: |
          docker pull ghcr.io/project-chip/chip-build-android:latest
          docker run -v ${{ github.workspace }}:/connectedhomeip \
            ghcr.io/project-chip/chip-build-android:latest \
            bash -c "cd /connectedhomeip && \
                     source scripts/bootstrap.sh && \
                     ./scripts/build/build_examples.py --target android-arm64-chip-tool build"
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: chiptool-apk
          path: out/android-arm64-chip-tool/outputs/apk/debug/app-debug.apk
```

## 相關技術與參考資料

- **Thread 協議**：低功耗組網
- **Wi-Fi**：高頻寬通訊
- **Bluetooth LE**：裝置發現與配對
- **Zigbee**：傳統智慧家庭協議
- [官方 Android 建構文件](https://github.com/project-chip/connectedhomeip/blob/master/docs/guides/android_building.md)
- [相關 Issue 參考](https://github.com/project-chip/connectedhomeip/issues/28317)

## 相關文章

- [Matter 協議概覽](/2024-07-05-google-wallet-smart-tap-exploring/)
- [Android 開發最佳實踐](/2024-01-11-setup-development-environment-on-a-new-macos/)
- [IoT 開發指南](/2024-07-23-getting-started-with-github-container-registry/)
