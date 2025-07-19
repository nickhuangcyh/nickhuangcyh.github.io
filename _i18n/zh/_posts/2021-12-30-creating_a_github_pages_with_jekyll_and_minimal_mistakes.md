---
layout: post
title: "完整指南：用 Jekyll + Minimal Mistakes 在 GitHub Pages 打造專業部落格"
date: 2021-12-29 15:45:03 +0800
description: "逐步教學，帶你用 Jekyll 與 Minimal Mistakes 主題在 GitHub Pages 建立現代化、SEO 友善的部落格。涵蓋 Ruby 環境、主題自訂、部署與維護最佳實踐。"
tags: [Jekyll, GitHub Pages, Minimal Mistakes, Ruby, Static Site Generator, Blog Setup, Web Development, SEO]
categories: [Web Development, Tutorial]
toc:
  sidebar: right
thumbnail: /assets/img/alfons-morales-YLSwjSy7stw-unsplash.jpg
---

## 為什麼要經營技術部落格？

在工作中，我經常從技術網站與部落格文章獲得靈感與幫助。為了記錄學習、複習知識、幫助他人，我決定建立自己的技術部落格。

一個經營良好的部落格有多重好處：

- **知識紀錄**：保存你的學習歷程
- **社群交流**：與開發者分享見解
- **職涯成長**：建立專業影響力
- **技能提升**：增進寫作與溝通能力

---

## 為什麼選擇 Jekyll + Minimal Mistakes？

### Jekyll 優勢：

1. **Markdown 支援**：用 Markdown 撰寫內容，自動轉換為 HTML
2. **活躍社群**：生態系龐大、文件豐富
3. **高度自訂**：設計與功能完全掌控
4. **靜態網站產生**：載入快、SEO 佳
5. **Git 整合**：全站版本控管

### Minimal Mistakes 主題特色：

1. **9k+ GitHub 星標**：廣受歡迎且持續維護
2. **深色模式**：現代化用戶體驗
3. **圖片縮放**：類似 Medium 的圖片瀏覽
4. **響應式設計**：各裝置完美呈現
5. **SEO 最佳化**：內建 SEO 與結構化資料

> 我曾用過 Octopress，但因已停止維護且主題有限，最終選擇 Jekyll 重建部落格 👉 [Octopress](http://octopress.org/)

現在就一步步打造你的專業部落格！

---

## 為什麼用 GitHub Pages？

GitHub Pages **免費**、免伺服器維護、SSL 憑證自動配置，只需 push 一次就能自動建置與部署。日後還能綁定自有網域與 SSL。

**主要優點：**

- **零成本**：完全免費託管
- **自動部署**：push 觸發建置
- **SSL 內建**：預設 HTTPS
- **自訂網域**：可用自己的網域名稱
- **版本控管**：完整 Git 流程

---

## 前置準備

### 註冊 GitHub 帳號

👉 [立即註冊](https://github.com)

### 安裝 Git 版本控管

```bash
# macOS
brew install git
git --version

# Ubuntu/Debian
sudo apt-get install git

# Windows
# 下載 https://git-scm.com/
```

### 安裝 rbenv（Ruby 版本管理）

```bash
# macOS
brew install rbenv
rbenv init

# 加入 shell 設定檔
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc

# 驗證安裝
rbenv -v
```

### 安裝 Ruby

```bash
# 安裝 Ruby 3.0.0（或最新版）
rbenv install 3.0.0
rbenv global 3.0.0
rbenv rehash

# 驗證安裝
ruby -v
```

### 檢查 RubyGems

```bash
gem update --system
gem -v
```

### 驗證 GCC/Make 安裝

```bash
gcc -v
g++ -v
make -v
```

> ##### 注意
>
> 上述環境若有缺漏，Jekyll 安裝過程可能會出錯。
> {: .block-warning }

---

## 建立你的 Jekyll 部落格

官方教學參考：[Creating a GitHub Pages site with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

### 進入開發資料夾

```bash
cd PARENT-FOLDER
```

### 初始化 Git 倉庫

```bash
git init blog
cd blog
```

### 建立 gh-pages 分支

```bash
git checkout --orphan gh-pages
```

### 建立 Jekyll 專案（略過初始 bundle）

```bash
jekyll new --skip-bundle .
```

### 修改 Gemfile 以支援 GitHub Pages

```ruby
# gem "jekyll"
gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins
```

> ⚠️ 請將 `GITHUB-PAGES-VERSION` 替換為[官方版本](https://pages.github.com/versions/)對應號碼

### 安裝所有 gem

```bash
bundle install
```

### 設定 `_config.yml`

```yaml
domain: my-site.github.io
url: https://my-site.github.io
baseurl: /blog/
```

### 加入 webrick gem（避免 serve 錯誤）

```bash
bundle add webrick
```

### 建立 favicon.ico

```bash
touch favicon.ico
```

---

## 本地測試 Jekyll 網站

初始化後，可用 Jekyll 內建伺服器預覽網站。

```bash
bundle install
bundle exec jekyll serve
```

終端機會顯示：

```bash
Server address: http://127.0.0.1:4000/
```

打開此網址即可預覽！

{% include figure.liquid path="assets/img/jekyll_local_test.png" title="本地 Jekyll 網站測試" %}

---

## 部署到 GitHub Pages

接下來將網站部署到 GitHub。

### 1️⃣ 建立 GitHub 倉庫

- 建議設為公開倉庫
- 名稱可自訂，如 `blog`

{% include figure.liquid path="assets/img/create_a_new_repo_on_github.png" title="在 GitHub 建立新倉庫" %}

### 2️⃣ 將本地專案連結到 GitHub 倉庫

```bash
git add .
git commit -m "[feature] Initial GitHub Pages site with Jekyll"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin gh-pages
```

> 注意：若選擇 `gh-pages` 為部署來源，請在 GitHub Pages 設定選擇該分支

### 3️⃣ 存取你的網站

回到 GitHub 倉庫頁面，點選：

```
Settings ➝ Pages ➝ Site URL
```

預設網址為：

```
https://USERNAME.github.io/REPOSITORY/
```

{% include figure.liquid path="assets/img/jekyll_github_pages.png" title="Jekyll 網站成功部署到 GitHub Pages" %}

🎉 恭喜！你的網站已經上線！

---

## 美化部落格：安裝 Minimal Mistakes 主題

Minimal Mistakes 是現代化、功能豐富的 Jekyll 主題。這裡採用 Remote Theme 方式安裝。

📚 官方文件：[Minimal Mistakes Quick-Start Guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

### 1️⃣ 編輯 `Gemfile`

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
```

### 2️⃣ 編輯 `_config.yml`

```yaml
remote_theme: "mmistakes/minimal-mistakes@4.24.0"

plugins:
  - jekyll-include-cache
```

> ❗ 請移除其他 `theme:` 或 `remote_theme:` 設定避免衝突  
> 🧩 保留原本的 `domain`、`url`、`baseurl` 設定

### 3️⃣ 安裝所有 gem

```bash
bundle install
```

### 4️⃣ 調整檔案結構

- 用 Minimal Mistakes 樣板取代 `index.md`（或新建頁面）
- 修改 `_posts/0000-00-00-welcome-to-jekyll.md`：
  ```yaml
  layout: post
  ```
- 刪除 `about.md`（如不需使用）

### 🔁 重新啟動網站並檢查效果！

```bash
bundle exec jekyll serve
```

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_local_test.png" title="Minimal Mistakes 主題本地測試成功" %}

### ✅ 最終上傳到 GitHub

```bash
git add .
git commit -m "[feature] Add Minimal Mistakes theme to Jekyll"
git push origin gh-pages
```

{% include figure.liquid path="assets/img/jekyll_with_minimal_mistakes_theme_github_pages.png" title="部署後全新外觀！" %}

🎉🎉🎉 完成！你已用 Jekyll + Minimal Mistakes 在 GitHub Pages 打造現代化技術部落格！

---

## 進階自訂技巧

### SEO 最佳化

```yaml
# _config.yml
title: "Your Blog Title"
description: "Your blog description for search engines"
author:
  name: "Your Name"
  avatar: "/assets/images/bio-photo.jpg"
  bio: "Your bio"
  location: "Your Location"
  links:
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: "https://github.com/yourusername"
```

### 自訂網域設定

1. 向網域商購買網域（Namecheap、GoDaddy 等）
2. 新增 CNAME 記錄指向 `username.github.io`
3. 在倉庫根目錄建立 `CNAME` 檔案，內容為你的網域
4. 在 GitHub Pages 設定啟用自訂網域

### 效能優化

- **圖片優化**：使用 WebP 格式與 lazy loading
- **壓縮**：啟用 CSS/JS 壓縮
- **CDN**：善用 GitHub Pages CDN 全球分發
- **快取**：設定正確快取標頭

---

## 常見問題排解

### bundle install 錯誤

```bash
# 清除 gem 快取
gem cleanup
bundle clean --force

# 重新安裝 gem
bundle install
```

### jekyll serve 問題

```bash
# 檢查 Ruby 版本相容性
ruby -v
gem list jekyll

# 更新 Jekyll
gem update jekyll
```

### GitHub Pages 建置失敗

- 檢查 GitHub Pages 建置日誌
- 確認所有 gem 都在 Gemfile
- 檢查 `_config.yml` 語法
- 避免使用不支援的外掛

---

## 維護部落格最佳實踐

### 內容策略

- **定期更新**：每週／每月發文
- **內容品質**：重質不重量
- **SEO 優化**：正確使用標題、meta 描述
- **內部連結**：串連相關文章

### 技術維護

- **定期更新**：Jekyll 與 gem 保持最新
- **備份策略**：用 Git 版本控管
- **效能監控**：定期檢查網站速度
- **安全性**：依賴套件保持更新

---

## 延伸資源

- [Jekyll 官方文件](https://jekyllrb.com/docs/)
- [Minimal Mistakes 主題](https://mmistakes.github.io/minimal-mistakes/)
- [GitHub Pages 文件](https://pages.github.com/)
- [Ruby 安裝指南](https://www.ruby-lang.org/en/documentation/installation/)
- [Markdown 教學](https://www.markdownguide.org/)

> 如果你有不同的方法、疑問，或想進一步自訂主題，歡迎留言或來信，一起成長、一起學習！🙂
