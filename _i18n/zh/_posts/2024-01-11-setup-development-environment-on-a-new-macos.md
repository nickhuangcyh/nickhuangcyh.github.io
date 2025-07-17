---
layout: post
title: "2024 年最新版 macOS 開發環境搭建全攻略"
date: 2025-01-11 15:00:00 +0800
description: "一站式掌握 macOS 專業開發環境搭建，涵蓋 Homebrew、Git、iTerm2、Zsh 及行動開發工具，助你高效提升生產力。"
tags: [macOS, Development Environment, Homebrew, Git, iTerm2, Zsh, Oh-My-Zsh, Powerlevel10k, Xcode, Mobile Development, Setup Guide, Productivity]
categories: [Setup Guide, Development, macOS, Productivity]
toc:
  sidebar: right
thumbnail: /assets/img/raul-per-e-K2w9VegUIb0-unsplash.jpg
---

## 🚀 為什麼開發環境配置很重要？

新 Mac 開發環境的建置往往讓人頭痛，但一次性配置好合適的工具，將大幅提升你的開發效率。本文將帶你把全新 macOS 打造成高效的開發利器。

**你將收穫：**
- ⚡ 極速終端體驗
- 🎨 美觀可自訂的 Shell，支援語法高亮
- 🛠️ 便捷的套件管理
- 📱 行動開發環境即刻就緒
- 🎯 專業高效的開發工作流

---

## 📋 前置準備清單
- ✅ 最新版 macOS
- ✅ 管理員權限
- ✅ 穩定網路
- ✅ 耐心（全流程約需 30-60 分鐘）

---

## 🍺 步驟 1：安裝 Homebrew 套件管理器

**Homebrew** 是 macOS 上必備的套件管理工具。

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew --version
```

**如遇 PATH 警告：**
```zsh
Warning: /opt/homebrew/bin is not in your PATH
```

**解決方法：**
```zsh
vim ~/.zshrc
export PATH=/opt/homebrew/bin:$PATH
source ~/.zshrc
```

> 💡 Apple Silicon (M1/M2/M3) 機型常見，務必加到 PATH。

---

## 🛠️ 步驟 2：安裝與設定 Git

```zsh
brew install git
git config --global user.email "your.email@example.com"
git config --global user.name "Your Name"
git config --list
```

**常用 Git 別名：**
```zsh
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.br branch
git config --global alias.lg "log --oneline --graph --decorate"
git config --global alias.unstage "reset HEAD --"
```

---

## 🖥️ 步驟 3：安裝 iTerm2 終端機

```zsh
brew install --cask iterm2
```

**iTerm2 優勢對比：**
| 功能 | 系統終端 | iTerm2 |
|------|----------|--------|
| 分割視窗 | ❌ | ✅ |
| 搜尋 | 基本 | 進階 |
| 設定 | 有限 | 豐富 |
| 效能 | 良好 | 優異 |

---

## 🎨 步驟 4：設定 Zsh + Oh-My-Zsh

```zsh
brew install zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**iTerm2 配色建議：**
- Profiles → Colors → Solarized
- 可自訂背景/前景色

**安裝 Nerd Fonts 字型：**
```zsh
brew tap homebrew/cask-fonts
brew install --cask font-meslo-lg-nerd-font
```

iTerm2 → Preferences → Profiles → Text → 選擇 MesloLGS NF 字型

---

## ⚡ 步驟 5：安裝 Powerlevel10k 主題

```zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
vim ~/.zshrc
# 設定主題
ZSH_THEME="powerlevel10k/powerlevel10k"
source ~/.zshrc
p10k configure
```

---

## 🔌 步驟 6：安裝高效 Zsh 外掛

```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
vim ~/.zshrc
# 外掛設定
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)
source ~/.zshrc
```

**外掛亮點：**
- 語法高亮
- 自動補全
- Git 狀態整合

---

## 📱 步驟 7：iOS 開發環境設定

```zsh
xcode-select --install
brew install robotsandpencils/made/xcodes
```

**Xcodes 工具優勢：**
- 多版本 Xcode 管理
- 指令列一鍵切換

**常見 Xcode 問題：**
```zsh
sudo xcode-select --reset
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

如遇問題可直接 App Store 下載 Xcode。

---

## 🧰 步驟 8：常用開發工具安裝

```zsh
brew install node
brew install python
brew install --cask docker
brew install --cask visual-studio-code
```

---

## 📈 效能優化建議

- ~/.zshrc 新增：
skip_global_compinit=1
DISABLE_AUTO_UPDATE=true
DISABLE_UPDATE_PROMPT=true

- iTerm2 → Profiles → Terminal → Scrollback Buffer 10000 行
- 啟用 Unlimited scrollback

---

## ✅ 最終配置檢查表

| 元件 | 檢查 | 測試指令 |
|------|------|----------|
| Homebrew | ✅ | brew --version |
| Git | ✅ | git --version |
| iTerm2 | ✅ | 開啟 iTerm2 |
| Zsh | ✅ | echo $SHELL |
| Oh-My-Zsh | ✅ | 檢查提示字元 |
| Powerlevel10k | ✅ | p10k configure |
| 外掛 | ✅ | 輸入指令測試高亮 |
| Xcode | ✅ | xcode-select --print-path |

---

## 🚨 常見問題排查

- Homebrew 指令無效：檢查 PATH
- Zsh 主題無效：檢查 ZSH_THEME 設定
- 外掛無效：檢查 plugins 設定

---

## 🔗 相關文章
- [完整 Git 工作流指南](/2025-05-18-how-to-use-multiple-github-accounts-using-ssh)
- [GitHub Pages 架設](/2020-09-10-octopress-setup)
- [SSH 金鑰管理](/2024-08-02-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8.8)

---

## 🎉 總結

恭喜你，已成功建置專業 macOS 開發環境！

**核心收穫：**
- 🚀 高效能終端與 iTerm2
- 🎨 美觀 Shell + Powerlevel10k
- 🛠️ 高效套件管理
- 📱 行動開發環境
- ⚡ 提升生產力的外掛與別名

**後續建議：**
1. 用 `p10k configure` 深度自訂主題
2. 按需安裝專案相關工具
3. 設定你喜歡的編輯器
4. 增加更多 Git 別名

> 💡 建議用 dotfiles 倉庫同步設定，跨裝置無憂。

**🔔 關注我們：** 持續關注開發環境與效率提升乾貨！

**📚 延伸閱讀：**
- [Homebrew 官方文件](https://docs.brew.sh/)
- [Oh-My-Zsh Wiki](https://github.com/ohmyzsh/ohmyzsh/wiki)
- [Powerlevel10k 文件](https://github.com/romkatv/powerlevel10k)
- [iTerm2 文件](https://iterm2.com/documentation.html)
