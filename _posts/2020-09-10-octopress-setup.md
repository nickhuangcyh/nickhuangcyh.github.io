---
layout: post
title: 用 Octopress 架設靜態部落格｜GitHub Pages 實戰教學
date: 2020-09-10 23:18:16 +0800
description: 想不到架一個部落格，其實可以這麼簡單又有趣！
tags: [Octopress, 靜態網站, GitHub Pages, 部落格架設]
categories: [Blog]
toc:
  # beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 為什麼我開始寫 Blog？

工作中，我經常受益於許多教學網站與技術部落格（像是簡書、CSDN、Medium 等），這些資源幫助我解決了不少問題。為了整理學習心得，也希望回饋社群，我決定開始經營自己的技術部落格。

---

## 為什麼選 Octopress 架站？

市面上有很多免費平台可用，例如 Medium、Blogger 等，不過我最後還是選擇 Octopress，主要原因有幾點：

1. 能搭配 Git 做版本控制，並部署到 GitHub
2. 使用 Markdown 撰寫，語法直觀好上手
3. 架設流程中可學習前端與靜態網站架構
4. 開源且免費，擁有高度彈性

對軟體開發者來說，Git 和 GitHub 幾乎是日常工具；而透過 Markdown 寫文章，也提升我撰寫 README 或技術文件的熟練度。綜合這些考量，我選擇了 Octopress。

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

[GitHub Pages](https://pages.github.com/) 提供免費的靜態網站託管服務，不需伺服器設定或資料庫支援，非常適合用來架設個人部落格或技術頁面。

1. 到 [GitHub](https://github.com/) 註冊帳號
2. 建立一個新 repo，命名為 `[你的用戶名].github.io`

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

Octopress 的文章都放在 `source/_posts` 資料夾下。

---

### 建立新文章：
```bash
rake new_post["文章標題"]
```

這會在 `source/_posts/` 裡產生一個 `YYYY-MM-DD-post-title.markdown` 的檔案。

你可以用 Vim 或任何你喜歡的編輯器（像是 [VSCode](https://code.visualstudio.com/)）打開開始撰寫：

```bash
cd source/_posts/
vim YYYY-MM-DD-post-title.markdown
```

寫好後再次部署即可：

```bash
rake generate
rake deploy
```

或使用簡化流程：
```bash
rake gen_deploy
```

最後將文章推送上 GitHub：

```bash
git add .
git commit -m '新增文章'
git push origin source
```

<div>
    {% include figure.liquid loading="eager" path="assets/img/octopress_github_pages.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

---

## 總結

以上就是用 Octopress 架設 GitHub Pages 靜態部落格的完整流程。未來我也會繼續研究更多進階設定與佈景客製技巧，再陸續分享給大家。


> 如果你有不同的作法、碰到問題，或有想交流的經驗，歡迎留言或寫信給我，一起切磋交流 🙂