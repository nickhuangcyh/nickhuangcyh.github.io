---
layout: post
title: 💡 一台電腦操作多個 GitHub 帳號：最簡單快速的 SSH 設定方法
date: 2025-05-18 14:00:00 +0800
description: 讓你的電腦同時操作多個 GitHub 帳號，適合有多個身分或工作/個人帳號的開發者使用。
tags: [GitHub, SSH, Git]
categories: [DevOps, Productivity, GitHub]
toc:
  #   beginning: true
  sidebar: right
thumbnail: /assets/img/github.jpg
---

# 💡 一台電腦管理多個 GitHub 帳號：SSH 完整設定指南

在現代開發環境中，許多開發者面臨一個共同挑戰：如何同時管理工作和個人的 GitHub 帳號？

想像一下：你早上需要用公司帳號推送工作專案，下午又想用個人帳號更新自己的開源項目。如果沒有適當的設定，這個簡單的需求可能變成一場噩夢。

本文將教你如何透過 SSH 配置，在同一台電腦上安全、便捷地操作多個 GitHub 帳號。完成設定後，你將能夠無縫切換不同身分，再也不用擔心帳號混淆的問題。

---

## 🚀 為什麼需要多個 GitHub 帳號？

### 常見使用場景

在以下情況下，開發者通常會需要管理多個 GitHub 帳號：

- 👔 **工作與個人分離**：公司專案使用工作帳號，個人專案使用私人帳號
- 🏢 **多家公司項目**：同時為不同客戶或公司工作
- 🔒 **權限管理需求**：不同項目需要不同的存取權限
- 📊 **貢獻記錄分類**：分別追蹤工作和個人的程式碼貢獻

### 傳統方法的痛點

你可能曾經嘗試過以下方法，但很快就發現它們的問題：

❌ **低效率的做法**：
- **頻繁登入登出**：每次都要在瀏覽器中切換 GitHub 帳號
- **手動修改配置**：不斷更改全域 Git 設定 (`git config --global`)
- **人工檢查身分**：每次 commit 前都要確認使用者資訊

這些方法不僅浪費時間，還容易出錯。一個不小心，你的個人專案就可能以公司名義提交，造成尷尬的狀況。

✅ **我們的智慧解決方案**：
- **SSH 金鑰自動配對**：讓系統自動識別應該使用哪個帳號
- **智慧身分切換**：透過 SSH config 實現無感切換
- **零手動干預**：設定一次，終身受用

---

## 🛠 完整解決方案：SSH 多帳號配置

### 開始前的準備工作

在進入具體設定步驟之前，我們需要確認幾個基本條件：

**必要條件檢查**：
- ✅ **SSH 金鑰已準備**：為每個 GitHub 帳號生成獨立的 SSH 金鑰對
- ✅ **公鑰已上傳**：將對應的公鑰添加到各自的 GitHub 帳號中
- ✅ **基本操作技能**：熟悉 Terminal 或命令提示字元的基本使用

**還沒準備好？**

如果你還沒有 SSH 金鑰，不用擔心！GitHub 提供了詳細的官方教學。建議先完成金鑰建立，再回來繼續閱讀本文。

> 💡 **新手友善提醒**：SSH 金鑰就像你的數位身分證，每個帳號都需要一套獨特的金鑰對。參考 [GitHub 官方教學](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) 來建立你的第一組金鑰。

---

## 📋 步驟詳解：從檢查到設定完成

### 步驟 1：檢查目前的 SSH 金鑰狀態

讓我們先了解系統目前的金鑰載入情況。這一步就像檢查你錢包裡有哪些身分證件一樣重要。

**執行檢查指令**：
```bash
ssh-add -l
```

**可能看到的結果**：

**情況一**：已有預設金鑰
```bash
256 SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx nick25932219@gmail.com (ED25519)
```
這表示你的個人帳號金鑰已經載入，狀況良好！

**情況二**：沒有任何金鑰
```bash
The agent has no identities.
```
這表示系統還沒有載入任何金鑰，我們需要從頭開始設定。

**結果解讀**：
- **單一金鑰**：通常是你的個人 GitHub 帳號
- **多組金鑰**：太好了！你可能已經部分設定過
- **無金鑰**：別擔心，我們會一步步建立完整配置

### 步驟 2：載入額外帳號的金鑰

現在是時候讓系統認識你的其他身分了！我們將把工作帳號的金鑰也載入到系統中。

**載入工作帳號金鑰**：
```bash
ssh-add ~/.ssh/id_ed25519_company
```

**關於金鑰檔名的小知識**：

不同的檔名代表不同的用途，建議使用有意義的命名：

> 📝 **常見命名範例**：
> - `id_ed25519` → 個人帳號的預設金鑰
> - `id_ed25519_company` → 公司工作帳號
> - `id_ed25519_client` → 特定客戶專案
> - `id_ed25519_freelance` → 自由接案工作

**驗證載入結果**：

讓我們再次檢查，確保兩組金鑰都已成功載入：

```bash
ssh-add -l
```

**成功的輸出應該像這樣**：
```bash
256 SHA256:abcd1234... nick25932219@gmail.com (ED25519)
256 SHA256:efgh5678... nickhuang@company.com (ED25519)
```

看到兩行記錄就代表設定成功了！每一行代表一個不同的身分。

### 步驟 3：設定 SSH 智慧配置檔案

這是整個解決方案的核心！我們要建立一個「路由表」，告訴系統在不同情況下應該使用哪個身分。

**開啟配置檔案**：

選擇你熟悉的編輯器來編輯 SSH 配置檔案：

```bash
# 簡單易用的 nano 編輯器
nano ~/.ssh/config

# 功能強大的 vim 編輯器
vim ~/.ssh/config

# VS Code 編輯器（如果已安裝）
code ~/.ssh/config
```

**為什麼需要這個檔案？**

想像 SSH config 檔案就像你手機的聯絡人清單。當你說「打電話給媽媽」時，手機知道要撥哪個號碼。同樣地，當你說「連接到 github.com-company」時，系統就知道要用工作帳號的金鑰。

**添加以下配置**：

```bash
# ===========================================
# GitHub 多帳號 SSH 配置
# ===========================================

# 個人帳號（預設）
Host github.com
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes  # macOS 專用，Linux 使用者可刪除此行
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519

# 工作帳號
Host github.com-company
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes  # macOS 專用，Linux 使用者可刪除此行
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519_company

# 客戶專案帳號（可選）
Host github.com-client
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_ed25519_client
```

**配置參數詳解**：

每個參數都有特定的作用，了解它們能幫你更好地掌控設定：

| 參數 | 作用說明 | 重要性 |
|------|----------|--------|
| `Host` | 你自定義的「暱稱」，用來區分不同帳號 | ⭐⭐⭐ |
| `HostName` | 真正的 GitHub 服務器位址（都是 github.com） | ⭐⭐⭐ |
| `AddKeysToAgent` | 自動載入金鑰，避免重複輸入密碼 | ⭐⭐ |
| `UseKeychain` | 將金鑰安全存放在 macOS 鑰匙圈中 | ⭐⭐ |
| `PreferredAuthentications` | 優先使用更安全的公鑰認證方式 | ⭐⭐ |
| `IdentityFile` | 告訴系統要使用哪個私鑰檔案 | ⭐⭐⭐ |

**重點理解**：
- `Host` 是你給每個身分取的「代號」
- `IdentityFile` 指向對應的私鑰檔案
- 其他參數主要是為了提升使用體驗和安全性

---

## 🔧 實際應用：讓不同專案使用正確身分

設定完成後，關鍵在於實際使用。讓我們學習如何在不同情境下套用這些配置。

### 方法一：從頭開始的新專案

這是最簡單的情況，因為我們可以在一開始就設定正確的身分。

**clone 個人專案**（使用預設帳號）：
```bash
git clone git@github.com:personal-username/repo-name.git
```

**clone 工作專案**（使用工作帳號）：
```bash
git clone git@github.com-company:company-username/repo-name.git
```

**注意差異**：
- 個人專案：`git@github.com:`
- 工作專案：`git@github.com-company:`

這個微小的差別（多了 `-company`）就是觸發不同身分的關鍵！

### 方法二：轉換現有專案的身分

你可能已經有一些專案，需要從個人帳號切換到工作帳號，或是反過來。別擔心，這很容易處理！

**步驟 1：檢查目前狀態**
```bash
git remote -v
```

你可能會看到類似這樣的輸出：
```bash
origin  git@github.com:username/repo-name.git (fetch)
origin  git@github.com:username/repo-name.git (push)
```

**步驟 2：切換到工作帳號**
```bash
git remote set-url origin git@github.com-company:company-username/repo-name.git
```

**步驟 3：驗證修改結果**
```bash
git remote -v
```

現在應該會顯示：
```bash
origin  git@github.com-company:company-username/repo-name.git (fetch)
origin  git@github.com-company:company-username/repo-name.git (push)
```

**成功！** 從現在開始，這個專案就會使用工作帳號進行所有 Git 操作。

### 方法三：設定專案專屬的提交者資訊

雖然 SSH 設定解決了連線問題，但我們還需要確保 commit 記錄顯示正確的作者資訊。這就像在每份文件上簽上正確的名字一樣重要。

**進入專案目錄並設定身分**：

首先，確保你在正確的專案目錄中：
```bash
cd /path/to/your/work-project
```

然後設定這個專案的提交者資訊：
```bash
# 設定工作專案的使用者資訊
git config user.name "Nick Huang"
git config user.email "nickhuang@company.com"
```

**驗證設定是否正確**：
```bash
# 檢查設定結果
git config user.name
git config user.email
```

**關鍵觀念**：
- 這些設定只影響當前專案
- 不會覆蓋你的全域設定
- 每個專案都可以有獨立的身分資訊

這樣設定後，在這個專案中的所有 commit 都會正確顯示你的工作身分！

---

## 🔍 驗證設定：確保多重身分運作正常

設定完成後，讓我們進行全面測試，確保每個身分都能正常工作。這就像測試每把鑰匙是否都能開對應的門一樣重要。

### 第一步：測試 SSH 連線

我們需要分別測試每個帳號的連線狀況：

**測試個人帳號連線**：
```bash
ssh -T git@github.com
```

**成功的話會看到**：
```bash
Hi personal-username! You've successfully authenticated, but GitHub does not provide shell access.
```

**測試工作帳號連線**：
```bash
ssh -T git@github.com-company
```

**成功的話會看到**：
```bash
Hi company-username! You've successfully authenticated, but GitHub does not provide shell access.
```

**如何解讀結果**：
- 看到正確的使用者名稱 = 連線成功！
- 「GitHub does not provide shell access」是正常訊息，不是錯誤
- 如果看到「Permission denied」，請檢查前面的設定步驟

### 第二步：完整的實戰測試

現在讓我們進行真實的 Git 操作測試，確保整個流程都能正常運作：

**在工作專案目錄中執行**：

```bash
# 1. 做一個小修改來測試
echo "Testing multi-account setup" >> README.md

# 2. 加入暫存區
git add README.md

# 3. 提交變更（這一步會顯示作者資訊）
git commit -m "Test commit with company account"

# 4. 推送到遠端
git push -u origin main
```

**檢查結果**：

提交完成後，檢查 commit 記錄：
```bash
git log --oneline -1
```

你應該會看到類似這樣的輸出，顯示正確的作者資訊：
```bash
a1b2c3d (HEAD -> main, origin/main) Test commit with company account
```

**最終確認**：
- commit 成功推送到 GitHub
- 在 GitHub 網站上查看，commit 作者顯示為工作帳號
- 沒有出現權限錯誤或身分混淆

如果一切都正常，恭喜你！多帳號設定已經完成並正常運作了。

---

## 🛠 進階技巧與最佳實踐

### 自動化腳本：快速切換專案配置

建立一個腳本來快速設定專案的 Git 配置：

**建立 `setup-work-project.sh`**：
```bash
#!/bin/bash

# 檢查是否在 Git repository 中
if [ ! -d ".git" ]; then
    echo "❌ 錯誤：請在 Git repository 根目錄執行此腳本"
    exit 1
fi

# 設定工作帳號的使用者資訊
git config user.name "Nick Huang"
git config user.email "nickhuang@company.com"

# 取得目前的 remote URL
current_url=$(git remote get-url origin)

# 如果是 HTTPS URL，轉換為 SSH
if [[ $current_url == https://github.com/* ]]; then
    ssh_url=$(echo $current_url | sed 's|https://github.com/|git@github.com-company:|')
    git remote set-url origin $ssh_url
    echo "✅ 已將 remote URL 轉換為工作帳號的 SSH 格式"
fi

echo "✅ 工作專案配置完成！"
echo "📧 使用者：$(git config user.name) <$(git config user.email)>"
echo "🔗 Remote URL：$(git remote get-url origin)"
```

**使用方式**：
```bash
chmod +x setup-work-project.sh
./setup-work-project.sh
```

### 全域 Git 別名設定

在 `~/.gitconfig` 中添加實用的別名：

```bash
[alias]
    # 快速檢查目前專案的設定
    whoami = !echo "Name: $(git config user.name)" && echo "Email: $(git config user.email)" && echo "Remote: $(git remote get-url origin)"
    
    # 快速設定為工作帳號
    work = !git config user.name "Nick Huang" && git config user.email "nickhuang@company.com"
    
    # 快速設定為個人帳號
    personal = !git config user.name "Nick Huang" && git config user.email "nick25932219@gmail.com"
```

**使用範例**：
```bash
# 檢查目前專案設定
git whoami

# 切換為工作帳號
git work

# 切換為個人帳號
git personal
```

---

## ⚠️ 疑難排解：常見問題快速解決

在使用多帳號設定的過程中，你可能會遇到一些問題。別擔心，這些都是常見情況，有標準的解決方法。

### 問題 1：連線被拒絕 (Permission denied)

**當你看到這個錯誤時**：
```bash
git@github.com: Permission denied (publickey).
```

**這表示什麼？**
系統無法驗證你的身分，就像你的鑰匙打不開門一樣。

**解決步驟**：

1. **檢查金鑰是否已載入**：
   ```bash
   ssh-add -l
   ```
   如果看不到你需要的金鑰，重新載入：
   ```bash
   ssh-add ~/.ssh/id_ed25519_company
   ```

2. **檢查 SSH config 檔案**：
   確認 `~/.ssh/config` 中的路徑正確無誤

3. **確認 GitHub 設定**：
   登入 GitHub，檢查對應的公鑰是否已正確添加到帳號中

### 問題 2：commit 顯示錯誤的作者身分

**當你發現**：
剛剛的 commit 顯示了錯誤的使用者名稱或 email

**為什麼會這樣？**
這通常是因為專案沒有設定本地的 Git 使用者資訊，系統就會使用全域設定（通常是個人帳號）。

**立即修正方法**：

1. **檢查目前的設定**：
   ```bash
   git config user.name
   git config user.email
   ```

2. **如果顯示錯誤或空值，重新設定**：
   ```bash
   git config user.name "正確的使用者名稱"
   git config user.email "正確的email@domain.com"
   ```

3. **修正上一次的 commit**（如果還沒 push）：
   ```bash
   git commit --amend --author="正確姓名 <正確email@domain.com>"
   ```

**預防措施**：
每當進入新的工作專案時，記得先設定正確的使用者資訊。

### 問題 3：重開機後金鑰需要重新載入

**你可能會遇到**：
重新開機後，執行 `ssh-add -l` 顯示沒有任何金鑰載入

**這是正常現象**：
為了安全考量，SSH agent 通常不會在重啟後自動載入金鑰。

**簡單解決方式**：

我們在 SSH config 中已經設定了 `AddKeysToAgent yes`，這表示當你第一次使用某個金鑰時，系統會自動載入它。

**手動載入所有金鑰**：
```bash
ssh-add ~/.ssh/id_ed25519
ssh-add ~/.ssh/id_ed25519_company
```

**進階：自動化載入腳本**

如果你希望開機時自動載入，可以建立腳本：

1. **建立載入腳本** `~/.ssh/load-keys.sh`：
   ```bash
   #!/bin/bash
   ssh-add ~/.ssh/id_ed25519
   ssh-add ~/.ssh/id_ed25519_company
   echo "✅ SSH 金鑰載入完成"
   ```

2. **設定執行權限**：
   ```bash
   chmod +x ~/.ssh/load-keys.sh
   ```

3. **需要時手動執行**：
   ```bash
   ~/.ssh/load-keys.sh
   ```

**小提醒**：大多數情況下，你不需要自動載入。當你第一次使用某個專案時，金鑰會自動載入。

---

## 📊 配置總結與檢查清單

### 最終檔案結構

你的 `~/.ssh/` 目錄應該包含：

```
~/.ssh/
├── config                 # SSH 配置檔案
├── id_ed25519             # 個人帳號私鑰
├── id_ed25519.pub         # 個人帳號公鑰
├── id_ed25519_company     # 工作帳號私鑰
├── id_ed25519_company.pub # 工作帳號公鑰
└── known_hosts           # 已知主機清單
```

### 完成檢查清單

- [ ] ✅ 為每個帳號生成獨立的 SSH 金鑰對
- [ ] ✅ 將公鑰添加到對應的 GitHub 帳號
- [ ] ✅ 設定 `~/.ssh/config` 檔案
- [ ] ✅ 使用 `ssh-add` 載入所有私鑰
- [ ] ✅ 測試每個帳號的 SSH 連線
- [ ] ✅ 為不同類型的專案設定正確的 remote URL
- [ ] ✅ 在專案中設定正確的 Git 使用者資訊
- [ ] ✅ 進行實際的 commit 和 push 測試

---

## 🚀 延伸應用與進階技巧

### 整合到 IDE 中

**VS Code 使用者**：
- 安裝 "GitLens" 擴充套件來更好地管理 Git 資訊
- 在工作區設定中指定 Git 路徑

**JetBrains IDE 使用者**：
- 在 Settings > Version Control > Git 中確認使用正確的 Git 執行檔
- 使用 "Git Branch" 面板檢查目前分支和遠端資訊

### 團隊協作建議

如果你的團隊也需要管理多個帳號，可以：

1. **建立團隊 SSH 設定範本**
2. **分享自動化腳本**
3. **建立專案層級的 Git hooks**
4. **使用統一的命名規範**

---

## 📚 延伸閱讀與參考資源

### 官方文件
- [GitHub：連接到 GitHub 使用 SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GitHub：管理多個帳號](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address)
- [Git 官方文件：配置 Git](https://git-scm.com/book/zh-tw/v2/自訂-Git-Git-配置)

### 相關工具
- **Git Credential Manager**：跨平台的 Git 憑證管理工具
- **SSH Keychain**：macOS 的 SSH 金鑰管理工具
- **GitHub CLI**：GitHub 的官方命令列工具

---

## ✅ 總結：你已經掌握了多帳號管理的精髓

恭喜你完成了整個設定流程！現在你擁有了一個強大而靈活的多帳號管理系統。

### 🎯 你現在能做到什麼

通過本文的完整設定，你已經實現了：

**工作效率大提升**：
- ✅ 在同一台電腦上無縫操作多個 GitHub 帳號
- ✅ 告別手動切換帳號的繁瑣過程
- ✅ 徹底避免權限混淆和身分錯亂問題
- ✅ 讓開發工作流程變得前所未有的順暢

**技術掌握要點**：
- ✅ SSH config 檔案是整個解決方案的核心大腦
- ✅ Host 別名機制讓系統智慧識別不同身分
- ✅ 專案層級的 Git 設定確保每次 commit 都有正確的作者標記

### 💡 持續優化建議

**命名規範**：為你的 SSH 金鑰使用清楚明確的檔名，未來的你會感謝現在的細心。

**安全備份**：定期備份你的 SSH 金鑰和配置檔案到安全的地方。

**自動化思維**：善用腳本來處理重複性的設定工作，讓技術為你服務。

### 🚀 擴展應用

這套方法的威力遠不止於 GitHub：
- **GitLab 專案**：同樣適用
- **Bitbucket 倉庫**：完美兼容  
- **自建 Git 服務**：通用解決方案

現在就開始享受多帳號開發的便利吧！你會發現，原本複雜的身分管理問題已經徹底解決，剩下的只有專注於程式碼本身的純粹快樂。

---

🔖 **相關文章推薦**：
- Git 分支管理最佳實踐
- GitHub Actions 自動化部署指南  
- SSH 安全性配置深度解析