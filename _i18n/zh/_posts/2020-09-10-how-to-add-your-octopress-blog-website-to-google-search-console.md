---
layout: post
title: "SEO 指南：將你的 Octopress 部落格加入 Google Search Console 提升曝光度"
date: 2020-09-10 23:29:22 +0800
description: "逐步教學，讓你的 Octopress 或 Jekyll 部落格被 Google 搜尋引擎收錄。學會驗證網站所有權並提交到 Google Search Console，全面提升 SEO 成效。"
tags: [Octopress, Jekyll, Google Search Console, SEO, Blog Optimization, Search Engine, Web Development]
categories: [SEO, Web Development]
toc:
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 在 Google 搜尋不到你的部落格？

當我們架設 Octopress 或 Jekyll 部落格時，常常會遇到在 Google 搜尋網站名稱卻找不到任何結果的情況。

別擔心，這並不代表你的網站有問題，而是因為我們尚未主動將網站提交給 Google 搜尋引擎。

### 為什麼 SEO 對部落格很重要？

搜尋引擎優化（SEO）對於部落格的成功至關重要：

- **提升曝光度**：讓更多讀者找到你的內容
- **帶來自然流量**：吸引免費且精準的訪客
- **建立權威性**：排名越高越具公信力
- **長期成長**：帶來穩定且持續的流量

---

## 將網站加入 Google Search Console

首先，打開 [Google Search Console](https://search.google.com/search-console/welcome?hl=zh-TW&utm_source=about-page&pli=1)

選擇「URL 前綴」方式新增網站，輸入你的部落格網域名稱，點擊繼續。

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console.png" title="新增網站到 Google Search Console" class="img-fluid rounded z-depth-1" %}
</div>

Google 會要求你下載一個 HTML 驗證檔案，例如：

    googlexxxxxxxxxx.html

將此檔案放到你的專案資料夾：

    octopress/source/

然後記得 commit 並推送到 GitHub：

```bash
rake gen_deploy
```

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console_verify.png" title="驗證網站所有權" class="img-fluid rounded z-depth-1" %}
</div>

部署完成後，回到 Search Console 點擊「驗證」。若一切順利，會看到成功訊息 👍

<div>
    {% include figure.liquid loading="eager" path="assets/img/google_search_console_verified.png" title="驗證成功" class="img-fluid rounded z-depth-1" %}
</div>

---

## 認識 Google Search Console

### 什麼是 Google Search Console？

Google Search Console 是 Google 提供的免費服務，能協助你：
- **監控網站表現**：追蹤網站在搜尋結果的曝光與點擊
- **提交內容**：主動告知 Google 有新頁面或更新
- **修正問題**：發現並解決搜尋相關問題
- **分析流量**：了解用戶搜尋行為與關鍵字

### 主要功能

| 功能 | 說明 | 好處 |
|------|------|------|
| **成效報告** | 追蹤搜尋查詢與點擊 | 找出受歡迎內容 |
| **收錄覆蓋** | 監控已被索引的頁面 | 確保所有內容都被發現 |
| **核心網頁指標** | 檢查頁面速度與體驗 | 提升用戶體驗 |
| **行動裝置可用性** | 測試手機版設計 | 擴展行動用戶 |

---

## 進階 SEO 設定

### 建立 XML Sitemap

建立 `sitemap.xml`，協助 Google 快速發現你的內容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/blog/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 設定 robots.txt

在網站根目錄建立 `robots.txt`：

```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### 優化 Meta 標籤

```html
<!-- 優化 HTML head 區塊 -->
<head>
    <title>你的部落格標題 - 描述性且含關鍵字</title>
    <meta name="description" content="160 字以內、具吸引力且含關鍵字的描述">
    <meta name="keywords" content="relevant, keywords, for, your, content">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://yourdomain.com/current-page">
</head>
```

---

## 內容優化策略

### 關鍵字研究

- **使用 Google 關鍵字規劃工具**：找出熱門搜尋詞
- **分析競爭對手**：觀察他們鎖定哪些關鍵字
- **長尾關鍵字**：聚焦更精準、競爭較低的詞組
- **用戶意圖**：內容要符合搜尋者需求

### 內容品質指引

- **有價值的資訊**：提供實用且完整的內容
- **定期更新**：保持內容新穎
- **內部連結**：串連相關文章與頁面
- **外部參考**：連結權威網站

### 技術 SEO

- **加快載入速度**：壓縮圖片、減少 HTTP 請求
- **行動裝置友善**：確保響應式設計
- **乾淨網址**：使用描述性且含關鍵字的網址
- **結構化資料**：加上 schema 標記

---

## 監控與分析

### Google Search Console 指標

追蹤這些關鍵績效指標：

- **搜尋曝光次數**：網站在搜尋結果出現的次數
- **點擊率（CTR）**：曝光中被點擊的比例
- **平均排名**：在搜尋結果中的平均位置
- **已索引頁面數**：被 Google 收錄的頁面數

### 效能監控

```bash
# 檢查網站載入速度
curl -w "@curl-format.txt" -o /dev/null -s "https://yourdomain.com"

# 監控核心網頁指標
# 使用 Google PageSpeed Insights
```

### 定期 SEO 稽核

1. **技術問題**：檢查爬蟲錯誤與行動裝置可用性
2. **內容品質**：審查並更新過時內容
3. **關鍵字成效**：分析搜尋查詢報告
4. **競爭對手分析**：追蹤競爭者排名

---

## 常見 SEO 問題與解決方案

### 網站未被收錄

**問題**：網站未出現在搜尋結果
**解決方式**：
- 確認 Google Search Console 設定無誤
- 檢查 robots.txt 是否有阻擋
- 確保網站可被爬蟲存取
- 手動提交 sitemap

### 排名過低

**問題**：網站有收錄但排名不佳
**解決方式**：
- 優化標題與 meta 描述
- 提升內容品質與相關性
- 建立高品質外部連結
- 加快頁面載入速度

### 重複內容問題

**問題**：多個網址有相似內容
**解決方式**：
- 使用 canonical 標籤
- 正確實作轉址
- 合併相似內容
- 多語系網站加上 hreflang

---

## Octopress/Jekyll SEO 最佳實踐

### 設定優化

```yaml
# _config.yml
title: "Your Blog Title"
description: "Your blog description for search engines"
url: "https://yourdomain.com"
author: "Your Name"
permalink: /:year/:month/:day/:title/
```

### 文章 Front Matter

```yaml
---
layout: post
title: "SEO-Optimized Post Title"
description: "Compelling meta description under 160 characters"
tags: [relevant, tags, for, SEO]
categories: [Category]
---
```

### 圖片優化

```html
<!-- 使用描述性 alt 文字 -->
<img src="/assets/img/example.jpg" alt="有助 SEO 的圖片描述文字">

<!-- 優化圖片大小 -->
<!-- 優先使用 WebP 格式 -->
<!-- 實作 lazy loading -->
```

---

## 效能優化

### 提升頁面速度

- **圖片壓縮**：使用 TinyPNG、ImageOptim 等工具
- **壓縮 CSS/JS**：減少檔案大小
- **啟用快取**：設定正確的快取標頭
- **使用 CDN**：全球分發內容

### 行動裝置優化

- **響應式設計**：確保手機、平板皆適用
- **觸控友善**：按鈕與連結易於點擊
- **快速載入**：針對行動網路優化
- **易讀字體**：使用適當字級

---

## SEO 疑難排解

### 驗證檔案無法存取

```bash
# 檢查檔案是否可存取
curl https://yourdomain.com/googlexxxxxxxxxx.html

# 確認檔案權限
chmod 644 googlexxxxxxxxxx.html

# 檢查是否有轉址
curl -I https://yourdomain.com/googlexxxxxxxxxx.html
```

### Search Console 錯誤

- 檢查 DNS 傳播延遲
- 驗證 HTTPS 憑證有效性
- 確認無多重轉址
- 檢查 canonical URL 設定

### Octopress 常見問題

```bash
# 重新產生並部署
rake generate
rake deploy

# 檢查建置錯誤
rake check

# 清除並重建
rake clean
rake generate
```

---

## SEO 工具與資源

### 免費 SEO 工具

- **Google Search Console**：官方 SEO 監控
- **Google PageSpeed Insights**：效能分析
- **Google Mobile-Friendly Test**：行動裝置優化
- **Schema.org Validator**：結構化資料測試

### 付費 SEO 工具

- **Ahrefs**：全方位 SEO 分析
- **SEMrush**：關鍵字與競爭對手分析
- **Moz Pro**：SEO 指標追蹤
- **Screaming Frog**：技術 SEO 稽核

### 學習資源

- [Google SEO 入門指南](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Moz SEO 學習中心](https://moz.com/learn/seo)
- [Search Engine Journal](https://www.searchenginejournal.com/)
- [Search Engine Land](https://searchengineland.com/)

---

## 延伸閱讀

- [完整教學：用 Jekyll + Minimal Mistakes 打造專業部落格並部署到 GitHub Pages](/2021-12-30-creating_a_github_pages_with_jekyll_and_minimal_mistakes/)
- [SEO 指南：將你的 Jekyll 部落格加入 Google Search Console 並提交 Sitemap](/2021-12-31-how-to-add-your-jekyll-blog-website-to-google-search-console/)
- [進階圖片優化技巧](/2024-01-27-advanced-images/)

---

## 下一步

驗證完成後，你可以持續透過 Search Console 監控收錄狀態、搜尋關鍵字表現，甚至主動提交 sitemap 加速收錄。

從這一步開始，你的網站正式踏上 SEO 之路！

### 行動清單

1. **監控成效**：定期檢查 Search Console
2. **優化內容**：聚焦品質與相關性
3. **建立外部連結**：爭取高權重網站引用
4. **追蹤進展**：觀察排名與流量變化

### 長期 SEO 策略

- **內容行事曆**：規劃定期更新
- **關鍵字擴展**：持續研究新關鍵字
- **技術優化**：不斷提升網站效能
- **用戶體驗**：專注於為讀者創造價值

> 如果你有不同的方法、遇到任何問題，或想交流更多 SEO 技巧，歡迎留言或來信，一起研究、一起進步！🙂
