---
layout: post
title: "Octopress SEO 完整教學：Google Search Console 與搜尋引擎索引優化"
date: 2020-09-10 23:29:22 +0800
description: "學會如何讓 Octopress 靜態網站被 Google 收錄與索引。詳細解析 Google Search Console 設定、Sitemap 提交、網站驗證與 SEO 優化流程。包含 robots.txt 配置、網址結構與最佳實踐。"
tags:
  [
    Octopress SEO,
    Google Search Console,
    Search Engine Indexing,
    Static Site SEO,
    Website Visibility,
    Sitemap Optimization,
    Blog SEO,
    Search Marketing,
  ]
categories: [Blog]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 在 Google 搜尋不到我的 Blog？

當我們架設好 Octopress 或 Jekyll 的部落格後，可能會遇到一個狀況。在 Google 搜尋自己的網站名稱，卻怎麼樣也找不到。

別擔心，這並不是網站出了什麼問題。問題在於我們還沒有主動將它提交給 Google 的搜尋引擎。

Google 並不會自動知道你的新網站存在，需要我們主動「告訴」它。

---

## 將網站加入 Google Search Console

Google Search Console 是 Google 提供的免費工具。它能幫助你監控網站在搜尋結果中的表現。

### 步驟 1：進入 Search Console

首先，打開 [Google Search Console](https://search.google.com/search-console/welcome?hl=zh-CN&utm_source=about-page&pli=1)

### 步驟 2：新增網站

接著，選擇「網址前綴」的方式來新增網站。填入你的 Blog 網域名稱後按下繼續。

這個方式比較直觀，適合個人部落格使用。

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

### 步驟 3：驗證網站擁有權

Google 會要求你下載一個 HTML 檔案，像這樣：

    googlexxxxxxxxxx.html

這個檔案是用來證明你確實擁有這個網站的。

### 步驟 4：上傳驗證檔

把這個檔案放進你的 Octopress 專案資料夾中：

    octopress/source/

### 步驟 5：部署到 GitHub

接著記得 commit 並推送到 GitHub 上：

```bash
rake gen_deploy
```

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console_verify.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

### 步驟 6：完成驗證

部署完成後，回到 Search Console 點擊「驗證」。

如果一切順利，就會看到成功訊息 👍

這代表 Google 已經確認你是網站的擁有者了。

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console_verified.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

---

## 下一步呢？

驗證完成只是讓 Google 認得你的網站。這只是第一步，但是很重要的一步。

接下來你可以：

- **監控收錄狀況**：查看哪些頁面被 Google 索引了
- **分析搜尋表現**：了解使用者透過什麼關鍵字找到你的網站
- **提交 sitemap**：告訴 Google 你的網站結構，加快收錄速度
- **修正錯誤**：發現並解決 SEO 問題

有了這一步，你的網站才真正踏上 SEO 的起點！

> 如果你有不同的方法、遇到什麼問題，或想交流更多 SEO 技巧，歡迎留言或寄信給我，我們一起研究、一起進步 🙂
