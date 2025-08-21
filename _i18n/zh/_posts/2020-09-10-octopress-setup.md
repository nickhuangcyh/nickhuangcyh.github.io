---
layout: post
title: "Octopress 靜態部落格完整教學：GitHub Pages 部署與主題客製化指南"
date: 2020-09-10 23:18:16 +0800
description: "學會使用 Octopress 框架建置專業的靜態部落格。詳細解析 Ruby 環境設置、GitHub Pages 部署、主題客製化與內容管理流程。包含 Markdown 寫作、網站優化與維護技巧。"
tags: [Octopress Framework, Static Site Generator, GitHub Pages, Blog Development, Ruby Environment, Markdown Writing, Website Deployment, Theme Customization]
categories: [Blog]
toc:
  # beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 為什麼我開始寫 Blog？

工作中，我經常受益於許多教學網站與技術部落格。像是簡書、CSDN、Medium 等平台的文章，幫助我解決了不少問題。

為了整理學習心得，也希望回饋社群，我決定開始經營自己的技術部落格。

分享知識不僅能幫助其他人，也能讓自己對技術有更深入的理解。

---

## 為什麼選 Octopress 架站？

市面上有很多免費部落格平台可用，例如 Medium、Blogger 等。不過我最後還是選擇 Octopress，主要原因有幾點：

### 對開發者友善的特色

1. **版本控制整合**：能搭配 Git 做版本控制，並部署到 GitHub
2. **Markdown 支援**：使用 Markdown 撰寫，語法直觀好上手
3. **技術學習機會**：架設流程中可學習前端與靜態網站架構
4. **高度自由**：開源且免費，擁有高度彈性

### 為什麼這些優點重要？

對軟體開發者來說，Git 和 GitHub 幾乎是日常工具。透過 Markdown 寫文章，也能提升我撰寫 README 或技術文件的熟練度。

綜合這些考量，我選擇了 Octopress。

---

## 開始前的準備

---

### 註冊 [GitHub](https://github.com) 帳號

---

### 安裝 [Git](https://git-scm.com)

```bash
brew install git
```

---

### 安裝 [Ruby](https://www.ruby-lang.org/zh_tw/documentation/installation/)

```bash
brew install ruby
```

確認安裝是否成功：

```bash
ruby --version
```

---

## Octopress 架站流程

```bash
git clone git://github.com/imathis/octopress.git octopress
cd octopress
```

接著安裝相關套件：

```bash
gem install bundler
rbenv rehash
bundle install
```

安裝預設主題：

```bash
rake install
```

---

## GitHub Pages 是什麼？

[GitHub Pages](https://pages.github.com/) 是 GitHub 提供的免費靜態網站託管服務。

### 為什麼選擇 GitHub Pages？

- **完全免費**：不需支付任何費用
- **無需維護**：不需伺服器設定或資料庫支援
- **適合個人網站**：非常適合用來架設個人部落格或技術頁面

### 建立 GitHub 儲存庫

1. 到 [GitHub](https://github.com/) 註冊帳號
2. 建立一個新 repo，命名為 `[你的用戶名].github.io`

> 注意：這個命名格式很重要，必須遵循 GitHub Pages 的規則。

建立後會得到 repo 的 SSH 位址：

    git@github.com:username/username.github.io.git

這個 URL 就是你日後部署部落格所需的遠端位置。

---

## 部署到 GitHub Pages

---

### 設定遠端儲存庫位置：

```bash
rake setup_github_pages
```

輸入剛剛的 SSH 路徑：

```bash
git@github.com:username/username.github.io.git
```

---

### 產生與部署網站內容：

```bash
rake generate
rake deploy
```

這兩個指令會生成網站檔案，並自動將內容部署到 GitHub Pages 上。

完成後，你可以打開瀏覽器，輸入 `http://username.github.io/` 就能看到你的部落格！

別忘了也要將原始碼同步到 source 分支：

```bash
git add .
git commit -m 'init commit'
git push origin source
```

---

## 如何發布文章？

現在來學習如何在 Octopress 中寫文章。

Octopress 的文章都放在 `source/_posts` 資料夾下。

---

### 步驟 1：建立新文章

```bash
rake new_post["文章標題"]
```

這個指令會在 `source/_posts/` 裡產生一個新檔案。檔案命名格式是 `YYYY-MM-DD-post-title.markdown`。

### 步驟 2：編輯文章內容

你可以用 Vim 或任何你喜歡的編輯器打開檔案。推薦使用 [VSCode](https://code.visualstudio.com/)，對 Markdown 支援很好。

```bash
cd source/_posts/
vim YYYY-MM-DD-post-title.markdown
```

### 步驟 3：部署文章

寫好文章後，需要產生靜態檔案並部署到網站上。

**完整指令**：
```bash
rake generate
rake deploy
```

**簡化指令**：
```bash
rake gen_deploy
```

> `gen_deploy` 指令會同時執行 generate 和 deploy，更加方便。

### 步驟 4：備份原始碼

最後，別忘了將原始檔案也推送到 GitHub：

```bash
git add .
git commit -m '新增文章'
git push origin source
```

> 為什麼需要這步？因為 Octopress 會將編譯後的檔案放在 master 分支，但原始碼需要獨立儲存在 source 分支。

<div>
    {% include figure.liquid loading="eager" path="assets/img/octopress_github_pages.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

---

## 總結

以上就是用 Octopress 架設 GitHub Pages 靜態部落格的完整流程。

### 主要步驟回顧：

1. **環境準備**：Git、Ruby 安裝
2. **Octopress 安裝**：下載與設定
3. **GitHub Pages 設定**：建立儲存庫與部署
4. **文章發布**：撰寫與部署文章

未來我也會繼續研究更多進階設定與佈景客製技巧，再陸續分享給大家。

> 如果你有不同的作法、碰到問題，或有想交流的經驗，歡迎留言或寫信給我，一起切磋交流 🙂
