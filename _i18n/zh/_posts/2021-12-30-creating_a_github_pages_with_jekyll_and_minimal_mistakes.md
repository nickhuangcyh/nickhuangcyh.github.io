---
layout: post
title: 使用 Jekyll + minimal-mistakes 在 GitHub Pages 上架設自己的部落格
date: 2021-12-29 15:45:03 +0800
description: 原來架設 Blog 也能如此輕鬆簡單！這篇文章手把手教你從 0 開始，用 Jekyll + Minimal Mistakes 架站。
tags: [Jekyll, Minimal-Mistakes, GitHub Pages, Theme]
categories: [Blog]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 為什麼寫 Blog？

在工作上，我經常從技術網站與部落格文章中獲得啟發與幫助。為了記錄所學、複習知識，也希望幫助他人，我決定建立自己的技術 Blog。

---

## 為什麼選擇 Jekyll + Minimal Mistakes？

---

### Jekyll 的優點：

1. 支援 Markdown 寫作，轉換為 HTML 靜態頁面
2. 社群活躍、主題豐富
3. 可高度自訂

---

### Minimal Mistakes 的特色：

1. 超過 9k GitHub stars，使用者眾多
2. 支援 Dark Mode（暗黑主題）
3. 圖片可放大，體驗類似 Medium

> 我原先使用 Octopress，但因為已停止維護，加上主題較少，最終選擇 Jekyll 重建部落格 👉 [Octopress](http://octopress.org/)

現在，讓我們一步步建置起自己的 Blog 吧！

---

## 為什麼選用 GitHub Pages？

因為 **免費**、不需自行管理伺服器或憑證，只需 Push 一次，GitHub Pages 就會自動建置部署。  
當然，你之後也可以綁定自己的網域與 SSL 憑證。

---

## 事前準備

---

### 註冊 GitHub 帳號

👉 [前往註冊](https://github.com)

---

### 安裝 Git 做版本控管

```bash
brew install git
git --version
```

---

### 安裝 rbenv（Ruby 版本管理工具）

```bash
brew install rbenv
rbenv init

# 若使用 Zsh，加入到 ~/.zshrc
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc

rbenv -v
```

---

### 安裝 Ruby

```bash
rbenv install 3.0.0
rbenv global 3.0.0
rbenv rehash
```

---

### 檢查 RubyGems 是否正常

```bash
gem update --system
gem -v
```

---

### 確認 GCC / Make 安裝狀態

```bash
gcc -v
g++ -v
make -v
```

> ##### WARNING
>
> 上述環境若有缺漏，可能導致 Jekyll 安裝過程中錯誤。
> {: .block-warning }

---

## 建立 Jekyll Blog 網站

參考官方教學：[Creating a GitHub Pages site with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

---

### 切換到你的開發資料夾

```bash
cd PARENT-FOLDER
```

---

### 初始化 Git 專案

```bash
git init blog
cd blog
```

---

### 建立 gh-pages branch（作為 GitHub Pages 的來源）

```bash
git checkout --orphan gh-pages
```

---

### 建立 Jekyll 網站（跳過初次 bundle）

```bash
jekyll new --skip-bundle .
```

---

### 修改 Gemfile，加入 GitHub Pages gem

```ruby
# gem "jekyll"
gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins
```

> ⚠️ 請將 `GITHUB-PAGES-VERSION` 替換為 [這裡](https://pages.github.com/versions/) 所列版本

---

### 安裝所有 gem 套件

```bash
bundle install
```

---

### 修改 `_config.yml`

```yaml
domain: my-site.github.io
url: https://my-site.github.io
baseurl: /blog/
```

---

### 加入 webrick gem（避免 serve 出錯）

```bash
bundle add webrick
```

---

### 避免 favicon.ico 錯誤訊息

```bash
touch favicon.ico
```

---

## 在本地測試 Jekyll 網站

完成初始化後，我們可以透過 Jekyll 提供的伺服器預覽網站。

```bash
bundle install
bundle exec jekyll serve
```

終端機會顯示如下資訊：

```bash
Server address: http://127.0.0.1:4000/
```

點開這個網址就可以看到網站畫面！

{% include figure.liquid path="assets/img/jekyll_local_test.png" title="本地測試 Jekyll 網站" %}

---

## 上傳 GitHub，讓 GitHub Pages 自動建置 Blog

接下來，我們要將網站部署到 GitHub。

---

### 1️⃣ 建立一個 GitHub Repository

- 建議使用公開 repo（Public）
- 命名可以自由，例如：`blog`

{% include figure.liquid path="assets/img/create_a_new_repo_on_github.png" title="在 GitHub 建立新 repo" %}

---

### 2️⃣ 將本地專案與 GitHub repo 連結

```bash
git add .
git commit -m "[feature] Initial GitHub Pages site with Jekyll"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin gh-pages
```

> 注意：若你選擇以 `gh-pages` 為部署來源，請確保 GitHub Pages 設定頁選擇的是 `gh-pages` 分支

---

### 3️⃣ 開啟網址預覽網站

回到 GitHub 專案頁面，點選：

```
Settings ➝ Pages ➝ 網站連結
```

預設會是：

```
https://USERNAME.github.io/REPOSITORY/
```

{% include figure.liquid path="assets/img/jekyll_github_pages.png" title="成功部署 Jekyll 網站至 GitHub Pages" %}

🎉 恭喜你，網站已正式上線！

---

## 美化 Blog：安裝 Minimal Mistakes 主題

Minimal Mistakes 是一款設計現代、功能強大的 Jekyll 主題，我們將以「Remote Theme」方式安裝。

📚 官方文件：[Minimal Mistakes Quick-Start Guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

---

### 1️⃣ 編輯 `Gemfile`

```bash
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
```

---

### 2️⃣ 編輯 `_config.yml`

```yaml
remote_theme: "mmistakes/minimal-mistakes@4.24.0"

plugins:
  - jekyll-include-cache
```

> ❗ 移除其他 `theme:` 或 `remote_theme:` 設定，避免衝突  
> 🧩 建議保留你先前設定的 `domain`, `url`, `baseurl`

---

### 3️⃣ 抓取並安裝所有 gem

```bash
bundle install
```

---

### 4️⃣ 調整必要檔案結構

- 將 `index.md` 替換為 Minimal Mistakes 提供的範本（或建立新頁面）
- 修改 `_posts/0000-00-00-welcome-to-jekyll.md`：
  ```yaml
  layout: post
  ```
- 刪除 `about.md`（如果你不打算使用）

---

### 🔁 再次啟動網站，檢查效果！

```bash
bundle exec jekyll serve
```

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_local_test.png" title="Minimal Mistakes 主題成功套用" %}

---

### ✅ 最後再次上傳 GitHub

```bash
git add .
git commit -m "[feature] Add Minimal Mistakes theme to Jekyll"
git push origin gh-pages
```

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_github_pages.png" title="部署後的新外觀！" %}

🎉🎉🎉 Done！你已經成功使用 Jekyll + Minimal Mistakes 在 GitHub Pages 上架設一個現代化技術 Blog！

> 如果你有不同的方法、問題或想進一步客製佈景，歡迎留言或寄信給我，一起成長與交流 🙂
