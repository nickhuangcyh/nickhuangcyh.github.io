---
layout: post
title: "完整指南：用 Octopress 與 GitHub Pages 架設靜態部落格"
date: 2020-09-10 23:18:16 +0800
description: "學會如何用 Octopress 與 GitHub Pages 建立專業靜態部落格。涵蓋安裝、設定、部署與內容管理的詳細教學，適合開發者入門。"
tags: [Octopress, Static Website, GitHub Pages, Blog Setup, Jekyll, Ruby, Git, Web Development, Tutorial]
categories: [Blog, Web Development, Tutorial]
toc:
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 🚀 **為什麼要開始寫技術部落格？**

身為開發者，我從社群分享的技術部落格與教學中受益良多。Medium、CSDN 及各種開發者部落格幫我解決了無數問題，也讓我學到新技術。

**開始經營自己的部落格，是自然而然的下一步**——這不僅能：
- 📝 **記錄學習歷程**
- 🤝 **回饋開發者社群**
- 💼 **建立專業線上形象**
- 📚 **打造知識庫**

---

## 🎯 **為什麼選擇 Octopress 架設部落格？**

雖然有許多免費平台（如 Medium、Blogger、WordPress.com），但我選擇 **Octopress**，原因如下：

### **主要優勢比較：**

| 功能 | Octopress | 其他平台 |
|------|-----------|----------|
| **版本控制** | Git 整合 | 有限 |
| **內容格式** | Markdown | 富文本編輯器 |
| **自訂彈性** | 完全掌控 | 受限 |
| **費用** | 免費託管 | 可能需付費 |
| **學習價值** | 網頁開發技能 | 較少 |

### **Octopress 為開發者量身打造：**

1. **🔧 Git 整合**：與現有 Git 工作流無縫結合
2. **📝 Markdown 支援**：用你最熟悉的格式寫內容
3. **🌐 學習網頁開發**：體驗靜態網站產生與部署
4. **🆓 開源自主**：外觀與功能完全自訂
5. **⚡ 高效能**：靜態網站載入快又安全

---

## 🛠 **前置準備與安裝**

開始前，請先安裝以下工具：

### **1. GitHub 帳號**
若尚未註冊，請至 [GitHub](https://github.com) 免費建立帳號。

### **2. 安裝 Git**
在系統上安裝 Git：

```bash
# macOS（使用 Homebrew）
brew install git

# 驗證安裝
git --version
```

### **3. 安裝 Ruby**
Octopress 需用到 Ruby。可用 Homebrew 安裝：

```bash
# macOS
brew install ruby

# 驗證安裝
ruby --version
```

**預期輸出：**
```bash
ruby 3.0.0p0 (2020-12-25 revision 95aff21468) [x86_64-darwin20]
```

---

## 🚀 **Octopress 安裝與初始化**

### **步驟 1：Clone Octopress 原始碼**

```bash
git clone git://github.com/imathis/octopress.git octopress
cd octopress
```

### **步驟 2：安裝相依套件**

```bash
# 安裝 Bundler 來管理相依套件
gem install bundler

# 若用 rbenv，請刷新 shims
rbenv rehash

# 安裝所有必要 gem
bundle install
```

### **步驟 3：安裝預設主題**

```bash
rake install
```

這會安裝預設主題並建立初始設定。

---

## 🌐 **認識 GitHub Pages**

**GitHub Pages** 是免費的靜態網站託管服務，非常適合個人部落格與專案文件。其特色包括：

- **免費託管** 靜態網站
- **支援自訂網域**
- **自動部署**（從 Git 倉庫）
- **內建 SSL 憑證**
- **免伺服器維護**

### **建立倉庫步驟：**

1. **在 GitHub 建立新倉庫**
2. **命名為** `[你的帳號].github.io`
3. **記下 SSH URL** 以便後續使用：
   ```
   git@github.com:username/username.github.io.git
   ```

---

## 📦 **部署到 GitHub Pages**

### **步驟 1：設定 GitHub Pages 整合**

```bash
rake setup_github_pages
```

依提示輸入你的倉庫 SSH URL：
```bash
git@github.com:username/username.github.io.git
```

### **步驟 2：產生並部署網站**

```bash
# 產生靜態網站檔案
rake generate

# 部署到 GitHub Pages
rake deploy
```

**合併指令：**
```bash
rake gen_deploy
```

### **步驟 3：推送原始碼**

```bash
git add .
git commit -m 'Initial Octopress setup'
git push origin source
```

### **步驟 4：驗證部署**

造訪 `http://username.github.io/` 查看你的部落格！

---

## 📝 **撰寫與發佈內容**

### **建立新文章**

```bash
rake new_post["你的文章標題"]
```

這會在 `source/_posts/` 產生新檔案，格式如下：
```
YYYY-MM-DD-post-title.markdown
```

### **撰寫第一篇文章**

用你喜歡的編輯器打開新檔案：

```bash
# 用 VS Code
code source/_posts/YYYY-MM-DD-post-title.markdown

# 用 Vim
vim source/_posts/YYYY-MM-DD-post-title.markdown
```

### **文章 Front Matter 範例**

每篇文章開頭都要有 YAML front matter：

```yaml
---
layout: post
title: "你的文章標題"
date: 2020-09-10 23:18:16 +0800
description: "文章簡介"
tags: [tag1, tag2]
categories: [category1]
---
```

### **發佈流程**

```bash
# 1. 撰寫內容
# 2. 產生並部署
rake gen_deploy

# 3. 提交原始碼
git add .
git commit -m 'Add new post: 你的文章標題'
git push origin source
```

---

## 🎨 **自訂化選項**

### **主題自訂**
- 編輯 `source/_includes/` 變更版型
- 修改 `sass/` 檔案調整樣式
- 更新 `source/_config.yml` 設定網站資訊

### **自訂網域**
若要使用自訂網域：

1. **在 `source/` 目錄新增 CNAME 檔案**
2. **於網域註冊商設定 DNS**
3. **更新 GitHub 倉庫設定**

### **分析工具整合**
在 `source/_includes/` 加入 Google Analytics 或其他追蹤服務程式碼。

---

## 📊 **部落格效能與 SEO**

### **內建 SEO 功能**
- 每篇文章支援 **Meta 描述**
- **Open Graph 標籤** 方便社群分享
- **自動產生 Sitemap**
- **RSS 訂閱**

### **效能優勢**
- **靜態網站產生**，載入速度快
- **CDN 全球分發**（透過 GitHub Pages）
- **極簡 JavaScript**，效能佳
- **行動裝置響應式主題**

---

## 🔧 **進階設定**

### **自訂外掛**
在 `plugins/` 目錄加入 Ruby 外掛擴充功能。

### **多作者管理**
於 `_config.yml` 設定作者資訊。

### **留言系統**
整合 Disqus 或其他留言服務。

### **搜尋功能**
可用外掛或第三方服務實作站內搜尋。

---

## 🚨 **常見問題與解決方案**

### **問題：bundle install 失敗**
```bash
# 解法：更新 Ruby 與 Bundler
gem update bundler
bundle update
```

### **問題：部署失敗**
```bash
# 解法：檢查 SSH 金鑰設定
ssh -T git@github.com
```

### **問題：網站未更新**
```bash
# 解法：清除快取並重建
rake clean
rake generate
rake deploy
```

---

## 📈 **部落格成長策略**

### **內容規劃**
- **固定發文時程**（每週/每兩週）
- **技術教學與實作分享**
- **問題解決經驗文**
- **產業趨勢觀察**

### **推廣方法**
- **社群媒體分享**（Twitter、LinkedIn）
- **參與開發者社群**
- **與其他部落格互相連結**
- **投稿技術聚合平台**

### **SEO 優化**
- **使用描述性標題與 meta 描述**
- **自然融入關鍵字**
- **建立內部連結**
- **圖片加上 alt 文字**

---

## 🔗 **延伸閱讀**

- [用 Jekyll + Minimal Mistakes 架設 GitHub Pages 部落格](/2021-12-30-creating_a_github_pages_with_jekyll_and_minimal_mistakes)
- [Google Search Console 整合教學](/2021-12-31-how-to-add-your-jekyll-blog-website-to-google-search-console)
- [開發環境建置指南](/2024-01-11-setup-development-environment-on-a-new-macos)

---

## ✅ **結語**

用 Octopress 與 GitHub Pages 架設部落格，讓開發者擁有強大又可自訂的平台，輕鬆分享知識、建立個人品牌。Git 版本控管、Markdown 撰寫、免費託管，都是技術部落客的理想選擇。

**重點回顧：**
- 🚀 **專業部落格**，完全自訂
- 💰 **免費託管**與網域選擇
- 📚 **內容版本控管**
- 🎯 **SEO 最佳化靜態網站**
- 🔧 **開發者友善工作流**

**下一步建議：**
1. **開始撰寫**你的第一篇技術文章
2. **自訂主題**展現個人風格
3. **設定分析工具**追蹤流量
4. **社群互動**累積人氣

---

**💡 小技巧：**建議善用 GitHub Actions 自動化部署與測試部落格。

**🔔 歡迎追蹤本部落格，獲取更多網頁開發與寫作技巧！**

---

**📚 進階資源：**
- [Octopress 官方文件](https://octopress.org/)
- [GitHub Pages 指南](https://pages.github.com/)
- [Jekyll 官方文件](https://jekyllrb.com/)
- [Markdown 教學](https://www.markdownguide.org/)

<div>
    {% include figure.liquid loading="eager" path="assets/img/octopress_github_pages.png" title="Octopress GitHub Pages Setup" class="img-fluid rounded z-depth-1" %}
</div>
