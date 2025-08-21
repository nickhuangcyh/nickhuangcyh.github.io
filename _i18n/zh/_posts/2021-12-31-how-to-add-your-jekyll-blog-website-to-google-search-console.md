---
layout: post
title: Jekyll SEO 完整教學：Google Search Console 與 Sitemap 配置指南
date: 2021-12-31 11:26:00 +0800
description: 學會如何讓 Jekyll 静態網站被 Google 收錄與索引。從 Google Search Console 設定、Sitemap 產生到網站驗證等完整流程。包含 robots.txt 配置、網址結構優化與 SEO 最佳實踐。
tags: [Jekyll SEO, Google Search Console, Sitemap Optimization, Search Engine Indexing, Static Site SEO, Blog SEO, Website Visibility, Google Analytics]
categories: [Blog]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 在 Google 找不到我的 Blog？

你是不是也遇到過剛建好的 Jekyll 網站，在 Google 上怎麼搜尋都找不到？別擔心，這不是網站壞掉了。

問題在於我們還沒向 Google 「自我介紹」。就像新開的實體店面需要註冊地址一樣，網站也需要主動告知搜尋引擎它的存在。

要讓搜尋引擎知道你的網站存在，需要完成以下兩個步驟：

1. 將網站提交給 **Google Search Console**
2. 提交 **Sitemap（網站地圖）**

這兩個步驟就像是給 Google 一張你網站的「名片」和「地圖」，讓它知道要去哪裡找到你的內容。

---

## 步驟一：將網站加入 Google Search Console

首先，我們需要告訴 Google 我們的網站存在。這就像是在電話簿上登記你的店面資訊一樣重要。

### 新增網站到 Search Console

前往 👉 [Google Search Console](https://search.google.com/search-console/welcome?hl=zh-CN&utm_source=about-page&pli=1)

在驗證方式選項中，選擇「網址前綴」方式。這種方式比較簡單，適合個人部落格使用。

輸入你的 blog 網址（建議使用 HTTPS 格式），然後點擊「繼續」。

{% include figure.liquid path="assets/img/google_search_console.png" title="新增網站到 Google Search Console" %}

### 下載並部署驗證檔案

接下來 Google 會要求你證明這個網站確實是你的。系統會提供一個驗證檔案 `googlexxxxxxxxxx.html`，請將它下載並放入你的 Jekyll 根目錄。

```bash
# 放到專案根目錄
mv ~/Downloads/googlexxxxxxxxxx.html ./googlexxxxxxxxxx.html

# 確認檔案已進入版本控制並推送
git add googlexxxxxxxxxx.html
git commit -m "[seo] Add Google Search Console verification file"
git push origin main  # 或你使用的 branch 名稱
```

### 完成驗證程序

檔案上傳完成後，回到 Search Console 頁面。點選「驗證」按鈕，讓 Google 確認驗證檔案已正確部署。

{% include figure.liquid path="assets/img/google_search_console_verify.png" title="驗證網站擁有權" %}

如果一切順利，你會看到驗證成功的畫面。這表示 Google 已經認可你是這個網站的擁有者！

{% include figure.liquid path="assets/img/google_search_console_verified.png" title="驗證成功！" %}

---

## 步驟二：提交 Sitemap

現在 Google 知道你的網站存在了，但它還不知道你的網站裡面有什麼內容。這時候就需要 Sitemap 來幫忙！

### 什麼是 Sitemap？

Sitemap 是一份 XML 格式的「網站地圖」。它告訴搜尋引擎你網站的所有頁面，包含每個頁面的連結、最後更新時間等重要資訊。

有了 Sitemap，Google 就能更快、更全面地找到並收錄你的部落格內容。就像給郵差一份詳細的住址清單，讓他知道要送信到哪些地方。

📖 想了解更多？查看 [Google 官方說明：Sitemap 是什麼？](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=zh-tw)

---

### 如何為 Jekyll 網站生成 Sitemap

Jekyll 可以透過外掛自動生成 Sitemap，我們只需要進行簡單的設定就能完成。

### 1️⃣ 編輯 `Gemfile`，加入 sitemap 外掛

首先，在你的專案根目錄找到 `Gemfile` 檔案，並加入以下內容：

```bash
group :jekyll_plugins do
  gem "jekyll-sitemap"
end
```

### 2️⃣ 在 `_config.yml` 中啟用外掛

接著，編輯 `_config.yml` 檔案，在 plugins 區塊中加入：

```bash
plugins:
  - jekyll-sitemap
```

### 3️⃣ 安裝外掛並重新編譯網站

在終端機執行以下指令來安裝外掛並重新啟動 Jekyll：

```bash
bundle install
bundle exec jekyll serve
```

完成後，檢查 `_site/` 資料夾。你會發現裡面多了一個 `sitemap.xml` 檔案，這就表示 Sitemap 已經成功生成了！

---

### 4️⃣ 提交 Sitemap 到 Google

現在我們要把這份網站地圖交給 Google。回到 Search Console，在左側選單中找到「Sitemaps」區塊。

在「新增 Sitemap」的欄位中，輸入：

```
sitemap.xml
```

然後按下「提交」按鈕。

{% include figure.liquid path="assets/img/google_search_console_sitemap.png" title="提交 sitemap" %}

提交成功後，Google 就會開始根據你的 Sitemap 來爬取和索引你的網站內容。

---

## ✅ 恭喜！你已經完成最基本的 SEO 設定！

現在你的 Jekyll 網站已經正式「登記」在 Google 的系統中了！Google 會開始爬取你的網站內容。

### 接下來會發生什麼？

雖然網站不會馬上就出現在搜尋結果中，但這是正常的。Google 需要時間來：

1. **爬取你的網站**：根據 Sitemap 逐一造訪你的頁面
2. **分析內容品質**：評估你的文章是否對讀者有價值
3. **建立索引**：將你的頁面加入搜尋資料庫

只要你持續更新優質內容，保持網站活躍度，你的部落格就會逐漸被更多人找到。

### 需要更多協助嗎？

> ##### TIP
>
> 如果你有不同的驗證方法、想了解更多 SEO 設定，歡迎留言或寫信給我，一起研究提升部落格能見度 🙂
> {: .block-tip }
