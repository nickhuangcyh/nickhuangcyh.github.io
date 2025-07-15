---
layout: post
title: "SEO 指南：將你的 Jekyll 部落格加入 Google Search Console 並提交 Sitemap"
date: 2021-12-31 11:26:00 +0800
description: "完整教學，讓你的 Jekyll 部落格被 Google 搜尋引擎收錄。學會用 Google Search Console 驗證網站所有權並提交 XML Sitemap，提升 SEO 收錄效率。"
tags: [Jekyll, Google Search Console, SEO, Sitemap, XML, Web Development, Blog Optimization, Search Engine]
categories: [SEO, Web Development]
toc:
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 在 Google 搜尋不到你的部落格？

你是否曾經辛苦架設 Jekyll 網站，卻發現 Google 搜尋結果完全找不到？別擔心，這不代表網站有問題，而是你還沒正式向 Google 搜尋引擎「自我介紹」。

要讓搜尋引擎知道你網站的存在，必須完成兩個關鍵步驟：

1. **將網站提交到 Google Search Console**
2. **提交 Sitemap（XML 網站地圖）**

---

## 為什麼 SEO 對部落格很重要？

搜尋引擎優化（SEO）對網站成功至關重要：

- **提升曝光度**：讓用戶更容易找到你的內容
- **帶來自然流量**：吸引免費且精準的訪客
- **建立信任感**：排名越高越具公信力
- **長期成長**：帶來穩定且持續的流量

---

## 步驟一：將網站加入 Google Search Console

前往 👉 [Google Search Console](https://search.google.com/search-console/welcome?hl=zh-TW&utm_source=about-page&pli=1)

選擇「URL 前綴」方式，輸入你的部落格網址（建議用 HTTPS 格式），然後點擊繼續。

{% include figure.liquid path="assets/img/google_search_console.png" title="新增網站到 Google Search Console" %}

Google 會要求你下載一個驗證檔案 `googlexxxxxxxxxx.html`，請將此檔案放到 Jekyll 專案根目錄。

```bash
# 移動到專案根目錄
mv ~/Downloads/googlexxxxxxxxxx.html ./googlexxxxxxxxxx.html

# 加入版本控管並推送
git add googlexxxxxxxxxx.html
git commit -m "[seo] Add Google Search Console verification file"
git push origin main  # 或你的分支名稱
```

回到 Search Console，點擊「驗證」按鈕。

{% include figure.liquid path="assets/img/google_search_console_verify.png" title="驗證網站所有權" %}

驗證成功後，會看到如下畫面：

{% include figure.liquid path="assets/img/google_search_console_verified.png" title="驗證成功！" %}

---

## 步驟二：提交 Sitemap

Sitemap 是一個 XML 檔案，能告訴搜尋引擎你網站所有內容，包括每個頁面的網址、最後更新時間等，有助於 Google 更快、更完整地收錄你的部落格。

📖 [Google 官方說明：什麼是 Sitemap？](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=zh-TW)

### 什麼是 XML Sitemap？

XML Sitemap 是一個結構化檔案：
- 列出網站所有頁面
- 提供每頁的中繼資料
- 幫助搜尋引擎理解網站結構
- 提升爬蟲效率

### 1️⃣ 編輯 `Gemfile` 加入 Sitemap 外掛

```ruby
group :jekyll_plugins do
  gem "jekyll-sitemap"
end
```

### 2️⃣ 在 `_config.yml` 啟用外掛

```yaml
plugins:
  - jekyll-sitemap
```

### 3️⃣ 安裝外掛並重建網站

```bash
bundle install
bundle exec jekyll serve
```

此時 `_site/` 目錄下會出現 `sitemap.xml`，代表產生成功。

### 4️⃣ 向 Google 提交 Sitemap

回到 Search Console 的「Sitemaps」區塊，輸入：

```
sitemap.xml
```

然後點擊提交。

{% include figure.liquid path="assets/img/google_search_console_sitemap.png" title="提交 Sitemap" %}

---

## 進階 SEO 設定

### 自訂 Sitemap 設定

```yaml
# _config.yml
sitemap:
  exclude: ["/admin/", "/private/"]
  include: ["/important-page/"]
  changefreq: weekly
  priority: 0.8
```

### 設定 robots.txt

在網站根目錄建立 `robots.txt`：

```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### 優化 Meta 標籤

```yaml
# 文章 front matter 範例
title: "你的 SEO 最佳化標題"
description: "160 字以內具吸引力的 meta 描述"
keywords: "relevant, keywords, for, your, content"
```

---

## 監控 SEO 成效

### Google Search Console 功能

- **成效報告**：追蹤搜尋查詢與點擊
- **收錄覆蓋**：監控已被索引的頁面
- **核心網頁指標**：檢查頁面速度
- **行動裝置可用性**：確保手機版設計

### 關鍵指標

- **搜尋曝光次數**：網站在搜尋結果出現的次數
- **點擊率（CTR）**：曝光中被點擊的比例
- **平均排名**：在搜尋結果中的平均位置
- **已索引頁面數**：被 Google 收錄的頁面數

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

## Jekyll SEO 最佳實踐

### 內容優化

- **關鍵字研究**：選用熱門且相關的搜尋詞
- **內容品質**：提供有價值且完整的資訊
- **定期更新**：保持內容新穎
- **內部連結**：串連相關文章與頁面

### 技術 SEO

- **加快載入速度**：壓縮圖片、減少 HTTP 請求
- **行動裝置友善**：確保響應式設計
- **結構化資料**：加上 schema 標記
- **乾淨網址**：使用描述性且含關鍵字的網址

### 效能優化

```yaml
# _config.yml 優化
compress_html:
  clippings: all
  comments: all
  endings: all
  profile: false
  blanklines: false
  ignore:
    envs: []
```

---

## SEO 疑難排解

### 驗證檔案無法存取

```bash
# 檢查檔案是否可存取
curl https://yourdomain.com/googlexxxxxxxxxx.html

# 確認檔案權限
chmod 644 googlexxxxxxxxxx.html
```

### Sitemap 產生錯誤

```bash
# 檢查 Jekyll build 日誌
bundle exec jekyll build --verbose

# 驗證外掛安裝
bundle list | grep sitemap
```

### Search Console 錯誤

- 檢查 DNS 傳播延遲
- 驗證 HTTPS 憑證有效性
- 確認無多重轉址
- 檢查 canonical URL 設定

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

---

## 延伸閱讀

- [完整教學：用 Jekyll + Minimal Mistakes 打造專業部落格並部署到 GitHub Pages](/2021-12-30-creating_a_github_pages_with_jekyll_and_minimal_mistakes/)
- [網站圖片效能優化技巧](/2024-01-27-advanced-images/)
- [GitHub Pages 自訂網域設定](/2022-02-01-redirect/)

---

## ✅ 恭喜！你已完成 SEO 基本設置！

Google 會開始爬取你的網站內容。雖然不會立刻出現在搜尋結果，但只要持續更新、提供有價值的內容，網站就會逐步被收錄與排名。

### 下一步建議

1. **監控成效**：定期檢查 Search Console
2. **優化內容**：聚焦品質與相關性
3. **建立外部連結**：爭取高權重網站引用
4. **追蹤進展**：觀察排名與流量變化

> ##### 小提醒
>
> 如果你有不同的驗證方法、想深入了解 SEO 設定，或需要進階優化協助，歡迎留言或來信，一起讓部落格更容易被看見！🙂
> {: .block-tip }
