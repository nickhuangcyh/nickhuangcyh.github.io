---
layout: post
title: "Jekyll 建站完整教學：使用 Minimal Mistakes 主題在 GitHub Pages 架設部落格"
date: 2021-12-29 15:45:03 +0800
description: "學會從零開始使用 Jekyll 與 Minimal Mistakes 主題建置個人部落格。詳細解析 GitHub Pages 部署、主題客製化、網站配置與內容管理流程。包含 Ruby 環境設定、Markdown 寫作與 SEO 優化。"
tags: [Jekyll Tutorial, Minimal Mistakes Theme, GitHub Pages, Static Site Generator, Blog Setup, Ruby Development, Markdown Writing, Website Deployment]
categories: [Blog]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 為什麼寫 Blog？

在工作上，我經常從技術網站與部落格文章中獲得啟發與幫助。這些優質內容不僅解決了我的問題，也讓我學到了新技術。

為了記錄自己所學的知識，也為了將來的複習查閱，我決定開始寫技術 Blog。同時，我也希望能透過分享經驗，幫助到其他開發者。

---

## 為什麼選擇 Jekyll + Minimal Mistakes？

在眾多部落格架設選擇中，Jekyll 搭配 Minimal Mistakes 主題是個絕佳組合。讓我們來看看它們各自的優勢。

---

### Jekyll 的優點：

1. **簡單易用**：支援 Markdown 寫作，自動轉換為 HTML 靜態頁面
2. **社群支持**：社群活躍、主題豐富，遇到問題容易找到解決方案
3. **高度彈性**：可高度自訂，滿足各種客製化需求

---

### Minimal Mistakes 的特色：

1. **廣受歡迎**：超過 9k GitHub stars，使用者眾多，代表品質可靠
2. **現代化設計**：支援 Dark Mode（暗黑主題），符合當前設計趨勢
3. **優質體驗**：圖片可放大功能，閱讀體驗類似 Medium 平台

> **個人經驗分享**  
> 我原先使用 Octopress，但因為已停止維護，加上主題較少，最終選擇 Jekyll 重建部落格 👉 [Octopress](http://octopress.org/)

現在，讓我們一步步建置起自己的 Blog 吧！

---

## 為什麼選用 GitHub Pages？

GitHub Pages 是架設靜態網站的絕佳選擇，主要有以下優勢：

**完全免費**：不需要花費任何費用，也不需要自行管理伺服器或 SSL 憑證。只需要將程式碼 Push 到 GitHub，GitHub Pages 就會自動幫你建置和部署網站。

**擴展性佳**：未來如果你想要使用自己的網域名稱，也可以輕鬆綁定自訂網域與 SSL 憑證。

---

## 事前準備

在開始架設部落格之前，我們需要先準備好開發環境。這個章節會帶你逐步安裝所有必要的工具和軟體。

---

### 註冊 GitHub 帳號

首先，你需要一個 GitHub 帳號來託管你的部落格程式碼。

👉 [前往註冊](https://github.com)

如果你已經有 GitHub 帳號，可以直接跳過這個步驟。

---

### 安裝 Git 做版本控管

Git 是必要的版本控制工具，用來管理你的程式碼變更。

```bash
brew install git
git --version
```

執行 `git --version` 確認安裝成功，應該會顯示 Git 的版本號。

---

### 安裝 rbenv（Ruby 版本管理工具）

rbenv 可以幫你管理不同版本的 Ruby，避免版本衝突問題。

```bash
brew install rbenv
rbenv init

# 若使用 Zsh，加入到 ~/.zshrc
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc

rbenv -v
```

安裝完成後，重新載入終端機設定或重開終端機。

---

### 安裝 Ruby

Jekyll 需要 Ruby 環境才能運行，我們使用 rbenv 來安裝特定版本的 Ruby。

```bash
rbenv install 3.0.0
rbenv global 3.0.0
rbenv rehash
```

這個步驟可能需要幾分鐘時間，請耐心等待編譯完成。

---

### 檢查 RubyGems 是否正常

RubyGems 是 Ruby 的套件管理系統，確保它運作正常。

```bash
gem update --system
gem -v
```

如果顯示版本號，代表 RubyGems 已經準備就緒。

---

### 確認 GCC / Make 安裝狀態

這些編譯工具是安裝某些 Ruby gems 時所必需的。

```bash
gcc -v
g++ -v
make -v
```

每個指令都應該顯示對應的版本資訊。

> ##### 重要提醒
>
> 上述環境若有任何缺漏，可能導致 Jekyll 安裝過程中發生錯誤。建議在繼續下一步之前，確保所有工具都已正確安裝。
> {: .block-warning }

---

## 建立 Jekyll Blog 網站

現在環境準備完成，我們可以開始建立 Jekyll 網站了。這個章節會按照 GitHub 官方建議的方式來建置網站。

參考官方教學：[Creating a GitHub Pages site with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

---

### 切換到你的開發資料夾

首先，移動到你想要存放專案的目錄。

```bash
cd PARENT-FOLDER
```

請將 `PARENT-FOLDER` 替換成你實際的專案目錄路徑。

---

### 初始化 Git 專案

建立一個新的 Git 專案資料夾，並進入該目錄。

```bash
git init blog
cd blog
```

這會建立一個名為 `blog` 的資料夾，你也可以改成其他你喜歡的名稱。

---

### 建立 gh-pages branch（作為 GitHub Pages 的來源）

GitHub Pages 可以從 `gh-pages` 分支自動部署網站。

```bash
git checkout --orphan gh-pages
```

這個指令會建立一個全新的分支，沒有任何歷史記錄。

---

### 建立 Jekyll 網站（跳過初次 bundle）

使用 Jekyll 命令建立基本的網站結構。

```bash
jekyll new --skip-bundle .
```

`--skip-bundle` 參數讓我們稍後再安裝 gem 套件，避免版本衝突。

---

### 修改 Gemfile，加入 GitHub Pages gem

編輯 `Gemfile` 檔案，註解掉原本的 jekyll gem，改用 github-pages。

```ruby
# gem "jekyll"
gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins
```

> ⚠️ **版本號更新**  
> 請將 `GITHUB-PAGES-VERSION` 替換為 [這裡](https://pages.github.com/versions/) 所列的最新版本號

---

### 安裝所有 gem 套件

執行 bundle install 來安裝所有相依的套件。

```bash
bundle install
```

這個步驟會下載並安裝 Jekyll 和相關的 gem 套件。

---

### 修改 `_config.yml`

編輯 Jekyll 的主要設定檔，加入你的網站資訊。

```yaml
domain: my-site.github.io
url: https://my-site.github.io
baseurl: /blog/
```

請將 `my-site` 替換成你的 GitHub 使用者名稱，`blog` 替換成你的專案名稱。

---

### 加入 webrick gem（避免 serve 出錯）

在較新版本的 Ruby 中，webrick 不再是預設套件，需要手動加入。

```bash
bundle add webrick
```

這個步驟可以避免執行 `jekyll serve` 時出現錯誤。

---

### 避免 favicon.ico 錯誤訊息

建立一個空的 favicon.ico 檔案，避免瀏覽器找不到圖示時出現錯誤訊息。

```bash
touch favicon.ico
```

這是一個小細節，但可以讓網站更加完整。

---

## 在本地測試 Jekyll 網站

完成基本設定後，讓我們在本地環境測試網站是否正常運作。這是一個重要步驟，可以在上傳到 GitHub 之前確認一切運作正常。

首先，確保所有套件都已安裝，然後啟動本地伺服器：

```bash
bundle install
bundle exec jekyll serve
```

Jekyll 會編譯你的網站，並啟動一個本地伺服器。終端機會顯示類似以下的資訊：

```bash
Server address: http://127.0.0.1:4000/
```

在瀏覽器中開啟這個網址，就可以看到你的網站畫面了！如果一切正常，你會看到 Jekyll 的預設首頁。

{% include figure.liquid path="assets/img/jekyll_local_test.png" title="本地測試 Jekyll 網站" %}

---

## 上傳 GitHub，讓 GitHub Pages 自動建置 Blog

本地測試成功後，現在我們要將網站部署到 GitHub Pages。這個過程包含三個主要步驟：建立 GitHub repository、連結本地專案，以及設定 GitHub Pages。

---

### 1️⃣ 建立一個 GitHub Repository

登入你的 GitHub 帳號，建立一個新的 repository。

**Repository 設定建議：**
- 選擇 **Public**（公開），這樣才能使用免費的 GitHub Pages 服務
- Repository 名稱可以自由命名，例如：`blog` 或 `my-website`
- 不需要初始化 README、.gitignore 或 license（因為我們已經有本地專案了）

{% include figure.liquid path="assets/img/create_a_new_repo_on_github.png" title="在 GitHub 建立新 repo" %}

---

### 2️⃣ 將本地專案與 GitHub repo 連結

建立 repository 後，我們需要將本地的程式碼推送到 GitHub。

```bash
git add .
git commit -m "[feature] Initial GitHub Pages site with Jekyll"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin gh-pages
```

請記得將 `USERNAME` 替換成你的 GitHub 使用者名稱，`REPOSITORY` 替換成你剛才建立的 repository 名稱。

> **重要提醒**  
> 確保你推送到的是 `gh-pages` 分支，因為我們稍後會設定 GitHub Pages 從這個分支部署網站。

---

### 3️⃣ 開啟網址預覽網站

程式碼推送成功後，需要在 GitHub 上啟用 Pages 功能。

**設定步驟：**
1. 回到 GitHub 專案頁面
2. 點選頂部的 **Settings** 選項
3. 在左側選單找到並點選 **Pages**
4. 在 Source 設定中選擇 `gh-pages` 分支
5. 儲存設定後，GitHub 會顯示你的網站網址

預設的網站網址格式會是：

```
https://USERNAME.github.io/REPOSITORY/
```

{% include figure.liquid path="assets/img/jekyll_github_pages.png" title="成功部署 Jekyll 網站至 GitHub Pages" %}

GitHub Pages 建置過程可能需要幾分鐘時間。建置完成後，你就可以透過上述網址存取你的網站了！

🎉 恭喜你，網站已正式上線！

---

## 美化 Blog：安裝 Minimal Mistakes 主題

到目前為止，我們已經成功建立了一個基本的 Jekyll 網站。但預設的樣式比較簡陋，現在讓我們安裝 Minimal Mistakes 主題來美化網站。

Minimal Mistakes 是一款設計現代、功能強大的 Jekyll 主題。我們將使用「Remote Theme」的方式來安裝，這種方法比較簡單，也方便日後更新主題。

📚 官方文件：[Minimal Mistakes Quick-Start Guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

---

### 1️⃣ 編輯 `Gemfile`

首先，我們需要修改 `Gemfile` 來加入必要的 gem 套件。

```bash
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
```

`jekyll-include-cache` 是 Minimal Mistakes 主題所需要的套件，可以提升網站效能。

---

### 2️⃣ 編輯 `_config.yml`

接下來，修改 Jekyll 的設定檔來啟用 Minimal Mistakes 主題。

```yaml
remote_theme: "mmistakes/minimal-mistakes@4.24.0"

plugins:
  - jekyll-include-cache
```

在 `_config.yml` 中加入上述設定。記住以下重要事項：

> **重要提醒**  
> - 移除其他 `theme:` 或 `remote_theme:` 設定，避免衝突  
> - 保留你先前設定的 `domain`, `url`, `baseurl` 等基本設定

---

### 3️⃣ 抓取並安裝所有 gem

執行 bundle install 來安裝新增的套件。

```bash
bundle install
```

這個步驟會下載 Minimal Mistakes 主題以及相關的依賴套件。

---

### 4️⃣ 調整必要檔案結構

為了讓主題正常運作，我們需要調整一些檔案：

**調整首頁：**
- 將 `index.md` 替換為 Minimal Mistakes 提供的範本，或根據主題文件建立新的首頁

**修改文章格式：**
- 編輯 `_posts/0000-00-00-welcome-to-jekyll.md`（日期可能不同）
- 確保文章的 frontmatter 包含正確的 layout：
  ```yaml
  layout: post
  ```

**清理不需要的檔案：**
- 刪除 `about.md`（如果你不打算使用預設的關於頁面）

---

### 🔁 再次啟動網站，檢查效果！

現在讓我們測試主題是否成功安裝。

```bash
bundle exec jekyll serve
```

如果一切順利，你會看到網站已經套用了 Minimal Mistakes 的現代化設計。主題包含響應式設計、深色模式支援，以及許多實用功能。

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_local_test.png" title="Minimal Mistakes 主題成功套用" %}

---

### ✅ 最後再次上傳 GitHub

本地測試成功後，將變更推送到 GitHub，讓線上網站也套用新主題。

```bash
git add .
git commit -m "[feature] Add Minimal Mistakes theme to Jekyll"
git push origin gh-pages
```

等待 GitHub Pages 重新建置完成（通常需要幾分鐘），然後重新整理你的網站頁面。

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_github_pages.png" title="部署後的新外觀！" %}

---

## 完成！

🎉🎉🎉 恭喜你！你已經成功使用 Jekyll + Minimal Mistakes 在 GitHub Pages 上架設了一個現代化的技術 Blog！

**你現在擁有的功能：**
- 響應式設計，在手機和電腦上都有良好體驗
- 支援深色模式切換
- 圖片放大功能
- 完整的 SEO 優化
- 文章分類和標籤系統
- 評論功能（可選）

**下一步建議：**
- 開始撰寫你的第一篇技術文章
- 根據需求客製化主題設定
- 加入 Google Analytics 追蹤網站流量
- 設定自訂網域名稱

> **需要幫助嗎？**  
> 如果你有不同的實作方法、遇到技術問題，或想進一步客製化佈景主題，歡迎留言或寄信給我。我們一起成長與交流！ 🙂
