---
layout: post
title: 如何讓 Octopress 網站被 Google 找到｜Search Console 實作教學
date: 2020-09-10 23:29:22 +0800
description: Google 大大，你把我的網頁藏哪去了？
tags: [Octopress, SEO, Google Search Console]
categories: [Blog]
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
toc:
  beginning: true
  # sidebar: right
---

## 在 Google 搜尋不到我的 Blog？

當我們架設好 Octopress 或 Jekyll 的部落格後，可能會遇到一個狀況——在 Google 搜尋自己的網站名稱，卻怎麼樣也找不到。

別擔心，其實這並不是網站出了什麼問題，而是因為我們還沒有主動將它提交給 Google 的搜尋引擎。

## 將網站加入 Google Search Console

首先，打開 [Google Search Console](https://search.google.com/search-console/welcome?hl=zh-CN&utm_source=about-page&pli=1)

接著，選擇「網址前綴」的方式來新增網站，填入你的 Blog 網域名稱後按下繼續。

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

Google 會要求你下載一個 HTML 檔案，像這樣：

    googlexxxxxxxxxx.html

把這個檔案放進你的專案資料夾中：

    octopress/source/

接著記得 commit 並推送到 GitHub 上：
```bash
rake gen_deploy
```

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console_verify.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

部署完成後，回到 Search Console 點擊「驗證」，如果一切順利，就會看到成功訊息 👍

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console_verified.png" title="example image" class="img-fluid rounded z-depth-1" %}
</div>

## 下一步呢？

驗證完成只是讓 Google 認得你的網站，接下來可以持續透過 Search Console 查看收錄狀況、搜尋關鍵字表現，甚至提交 sitemap（站點地圖）加快收錄速度。

有了這一步，你的網站才真正踏上 SEO 的起點！

**Note:** 如果你有不同的方法、遇到什麼問題，或想交流更多 SEO 技巧，歡迎留言或寄信給我，我們一起研究、一起進步 🙂
{: .notice--success}