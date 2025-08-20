---
layout: post
title: 如何讓 Jekyll 網站被 Google 搜尋到｜Search Console + Sitemap 教學
date: 2021-12-31 11:26:00 +0800
description: Google 大大，你把我的網頁藏哪去了？教你兩步驟：提交 Search Console、啟用 Sitemap！
tags: [Jekyll, Google, SEO, Search Console, Sitemap]
categories: [Blog]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 在 Google 找不到我的 Blog？

你是不是也遇到過剛建好的 Jekyll 網站，在 Google 上怎麼搜尋都找不到？別擔心，這不是網站壞掉，而是因為我們還沒向 Google 「自我介紹」。

要讓搜尋引擎知道你的網站存在，需要做兩件事：

1. 將網站提交給 **Google Search Console**
2. 提交 **Sitemap（網站地圖）**

---

## 步驟一：將網站加入 Google Search Console

前往 👉 [Google Search Console](https://search.google.com/search-console/welcome?hl=zh-CN&utm_source=about-page&pli=1)

選擇「網址前綴」方式，輸入你的 blog 網址（建議使用 HTTPS 格式），點擊繼續。

{% include figure.liquid path="assets/img/google_search_console.png" title="新增網站到 Google Search Console" %}

接著會要求你下載驗證檔 `googlexxxxxxxxxx.html`，請將它放入你的 Jekyll 根目錄。

```bash
# 放到專案根目錄
mv ~/Downloads/googlexxxxxxxxxx.html ./googlexxxxxxxxxx.html

# 確認檔案已進入版本控制並推送
git add googlexxxxxxxxxx.html
git commit -m "[seo] Add Google Search Console verification file"
git push origin main  # 或你使用的 branch 名稱
```

回到 Search Console，點選「驗證」按鈕。

{% include figure.liquid path="assets/img/google_search_console_verify.png" title="驗證網站擁有權" %}

成功驗證後，會看到這個畫面：

{% include figure.liquid path="assets/img/google_search_console_verified.png" title="驗證成功！" %}

---

## 步驟二：提交 Sitemap

Sitemap 是一份 XML 文件，告訴搜尋引擎你網站的所有內容，包含每個頁面的連結、最後更新時間等。這會幫助 Google 更快、更全面地收錄你的部落格。

📖 [Google 官方說明：Sitemap 是什麼？](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=zh-tw)

---

### 1️⃣ 編輯 `Gemfile`，加入 sitemap 外掛

```bash
group :jekyll_plugins do
  gem "jekyll-sitemap"
end
```

---

### 2️⃣ 在 `_config.yml` 中加入 plugin

```bash
plugins:
  - jekyll-sitemap
```

---

### 3️⃣ 安裝 plugin 並重新編譯網站

```bash
bundle install
bundle exec jekyll serve
```

此時你會發現在 `_site/` 資料夾中出現 `sitemap.xml`，代表 sitemap 已成功產生。

---

### 4️⃣ 提交 Sitemap 到 Google

回到 Search Console 的「Sitemaps」區塊，填入：

```
sitemap.xml
```

然後按下提交。

{% include figure.liquid path="assets/img/google_search_console_sitemap.png" title="提交 sitemap" %}

---

## ✅ 恭喜！你已經完成最基本的 SEO 設定！

Google 現在會開始爬取你的網站內容，雖然不會馬上就出現在搜尋結果中，但只要持續更新、讓內容具備價值，自然就會慢慢被收錄了。

> ##### TIP
>
> 如果你有不同的驗證方法、想了解更多 SEO 設定，歡迎留言或寫信給我，一起研究提升部落格能見度 🙂
> {: .block-tip }
