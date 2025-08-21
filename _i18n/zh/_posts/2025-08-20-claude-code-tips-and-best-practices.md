---
layout: post
title: Claude Code 使用技巧與最佳實踐 - Tips and Best Practices
date: 2025-08-20 22:00:00 +0800
description: 探索 Claude Code 的最佳使用方式，從基礎操作到進階工作流程，提升 AI 輔助開發的效率與品質。
tags: [Claude Code, AI Tools, Development Tips, Best Practices]
categories: [AI Development Tools]
toc:
  sidebar: right
thumbnail: /assets/img/claude_code_tips.jpg
---

> 本文結合 Anthropic 官方最佳實踐與個人使用經驗，分享如何有效運用 Claude Code 進行軟體開發。

## AI Agent 的核心：Rule 與 Memory

要有效使用 AI Agent，最重要的是理解兩個核心概念：**Rule（規則）** 與 **Memory（記憶）**。

讓我們先從一個熟悉的場景開始理解。當我們工程師遇到需求或 bug 時，會先依靠過往經驗來解決。如果碰到陌生的問題，我們會搜尋資料、深入研究，解決後將經驗記在腦海中。下次遇到類似問題，就能快速應對。

AI Agent 的運作模式與此極為相似。當它遇到資料庫中沒有的知識，會透過網路搜尋來解決。然而，關鍵在於：如果我們不將解決方案記錄下來，AI Agent 下次遇到同樣問題時，還是會重新搜尋一次——就像人類忘記了學過的知識一樣。

因此，將 domain knowhow 記錄在文件中，就等於賦予 AI 記憶的能力。這讓 AI 能夠累積經驗，逐步成長。

### 把 AI Agent 當作可培養的夥伴

最好的心態是把 AI Agent 視為一個**擁有龐大知識庫、但需要指導的 junior engineer**。

我們身為 senior engineer，要做的是：
- 將架構設計和系統知識逐步傳授給它
- 在它出錯時及時糾正
- 請它更新文件來強化記憶
- 持續訓練直到它成為符合專案需求的資深工程師

透過這樣的培養過程，AI Agent 會越來越理解你的專案需求，產出的程式碼品質也會不斷提升。

## Essential Setup 必要設置

在開始使用 Claude Code 之前，正確的初始設置至關重要。這將決定你與 AI 協作的效率和品質。

**Tip: 初始化並建立具體且結構化的專案記憶**

> **快速開始：**
> - 使用 `/init` 指令來初始化 CLAUDE.md 文件，這是與 Claude Code 協作的第一步
> - 在專案根目錄的 `CLAUDE.md` 檔案中記錄具體指導原則
> 
> **基本結構建議：**
> - 使用 Markdown 標題將相關記憶分組
> - 每個記憶項目以 bullet point 格式記錄
> - 使用精確的指令而非模糊描述
> 
> **核心記錄內容：**
> - **常用指令**：`npm run build`、`npm test`、`npm run lint`
> - **程式碼風格**：「使用 2 空格縮排」而非「使用適當縮排」
> - **命名規範**：具體的變數、函數、檔案命名規則
> - **架構模式**：專案特有的設計模式與架構決策
> - **工作流程**：PR 流程、測試策略、部署步驟
> - **Domain 知識**：業務邏輯、API 規格、特殊需求解決方案
> 
> **進階技巧：**
> - 使用 `@path/to/file` 引用額外的記憶檔案（最多 5 層深度）
> - 隨專案演進持續更新記憶內容
> - 使用 `#` 快速新增記憶項目到指定檔案
> - 使用 `/memory` 指令檢視和編輯所有記憶檔案

### Claude Code 記憶系統架構

為了支援從個人到企業級的各種開發場景，Claude Code 採用了**四層階層式記憶系統**。這個設計讓記憶管理既靈活又強大。

#### 記憶層級概覽

| 記憶類型 | 範圍 | Location | 優先級 | 說明 | 共享範圍 |
|----------|------|----------|--------|------|---------|
| Enterprise Policy | 企業級 | 系統級配置檔案 | 最高 | 企業編碼標準、安全政策、合規要求 | 組織內所有用戶 |
| Project Memory | 專案共享 | `./CLAUDE.md` | 高 | 專案架構、編碼標準、共同工作流程、領域知識 | 透過版本控制與團隊共享 |
| User Memory | 個人偏好 | `~/.claude/CLAUDE.md` | 中 | 程式碼風格偏好、個人工具快捷方式 | 個人所有專案 |
| ~~Project Local Memory~~ | ~~本地專案~~ | ~~`./CLAUDE.local.md`~~ | ~~低~~ | **已棄用**，功能已由匯入功能取代 | ~~僅個人當前專案~~ |

#### 記憶查找與載入流程

Claude Code 使用智慧的**階層式記憶查找機制**來載入相關記憶：

**1. 遞迴目錄搜尋**
系統會從當前工作目錄開始，向上攀爬目錄樹，載入所有找到的 CLAUDE.md 檔案。較高層級的記憶會獲得更高的優先級。

**2. 優先級處理**
按照 Enterprise Policy > Project Memory > User Memory 的順序處理。當出現衝突時，高優先級的設定會覆蓋低優先級的設定。

**3. 匯入處理**
系統會遞迴處理所有 `@path/to/import` 語法，支援最多 5 層深度的嵌套匯入。這讓你能夠建立模組化的記憶結構。

> **企業部署提示**：透過配置管理系統（如 Ansible、Chef）部署 Enterprise Policy，可確保組織內所有開發者遵循一致的編碼標準和安全政策。

#### 記憶匯入功能詳解

Claude Code 的匯入功能讓你能夠**組織和管理複雜的專案記憶**。這個功能特別適合大型專案和團隊協作。

**基本語法範例：**
```markdown
# 在 CLAUDE.md 中引用其他檔案
@docs/architecture.md
@docs/coding-standards.md
@team-conventions/frontend.md
```

**匯入功能特性：**
- 使用 `@path/to/file` 語法引用檔案
- 支援相對路徑和絕對路徑
- **最多支援 5 層深度**的嵌套匯入（防止無限遞迴）
- 完全取代已棄用的 `CLAUDE.local.md` 功能
- 透過 `/memory` 指令可檢視所有已載入的記憶檔案

**實際應用場景：**

1. **模組化記憶管理**：將大型專案的記憶分割成功能模組，每個模組獨立維護
2. **團隊專業分工**：前端、後端、DevOps 團隊各自維護自己的專業記憶檔案
3. **框架特定文件**：為 React、Vue、Angular 等不同框架維護專屬的最佳實踐文件
4. **企業級標準化**：透過 Enterprise Policy 確保整個組織的一致性
5. **新人學習資源**：建立結構化的 onboarding 記憶檔案，加速新成員上手

## Memory Management 記憶管理

有效的記憶管理是提升 AI 協作效率的關鍵。以下介紹實用的記憶管理技巧。

### 快速記憶管理技巧

**Tip: 使用 `#` 快速新增記憶項目**
> 在對話開始時輸入 `#記憶內容`，系統會自動提示您選擇要儲存到哪個記憶檔案。這是最快速的記憶新增方式。

**Tip: 使用 `/memory` 指令編輯記憶**
> 這個指令會直接開啟系統編輯器，讓你進行廣泛的記憶管理。你可以檢視所有已載入的記憶檔案，並進行批量編輯。

### 記憶撰寫最佳實踐

撰寫清晰、具體的記憶是關鍵。以下是一些實用的準則：

**具體性原則：**

避免模糊的描述，使用精確的指令：
- ✅ 好：「使用 2 空格縮排」
- ❌ 差：「使用適當縮排」
- ✅ 好：「測試檔案命名：`*.test.js`」
- ❌ 差：「遵循測試慣例」

**結構化組織範例：**
```markdown
# 專案記憶範例

## 架構原則
- 使用 MVC 架構模式
- API 路由放在 `/routes` 目錄
- 業務邏輯分離至 `/services` 目錄

## 編碼標準
- 使用 ESLint 與 Prettier
- 函數命名採用 camelCase
- 常數使用 UPPER_SNAKE_CASE

## 工作流程
- 所有 PR 需要 code review
- 執行 `npm test` 確保測試通過
- 部署前執行 `npm run build`
```

### 團隊協作記憶策略

在團隊環境中，記憶管理更需要系統性的方法：

- **版本控制整合**：將 Project Memory (CLAUDE.md) 加入 Git，確保團隊成員同步最新的專案知識
- **定期記憶審查**：在 sprint review 時檢視並更新記憶內容，保持其時效性
- **問題解決記錄**：將重要的 troubleshooting 步驟和解決方案記錄到記憶中
- **階層式記憶設計**：善用 Enterprise → Project → User 的優先級層次，合理分配不同層級的規則

### 企業級記憶管理策略

對於大型組織，記憶管理需要更正式的流程：

- **中央化政策管理**：透過 Enterprise Policy 統一整個組織的編碼規範
- **合規性要求實施**：將安全政策、資料處理規範等合規要求寫入企業記憶
- **自動化配置部署**：使用 Ansible、Chef、Puppet 等工具自動部署企業級記憶檔案
- **權限控制機制**：確保只有授權人員可以修改企業級記憶，維護標準的一致性

## Basic Tips 基礎技巧

掌握這些基礎技巧，能讓你的 Claude Code 使用體驗更加順暢。

**Tip: 使用 Escape 鍵隨時中斷操作**
> 當 Claude Code 執行不如預期時，按下 `Escape` 鍵可立即停止執行。這是最重要的控制技巧。

**Tip: 永遠使用 Manual 模式審查建議**
> 避免使用 auto-accept 模式。逐步審查每個建議，發現錯誤時及時停止並指導修改。這樣能確保程式碼品質，同時訓練 AI 更好地理解你的需求。

**Tip: 使用 `/clear` 清理無關的上下文**
> 完成一個任務後，如果下個任務完全無關，使用 `/clear` 或開啟新的 session。這能避免 AI 被無關資訊混淆，同時節省 token 資源，防止 context window 達到上限。

**Tip: 使用 `/compact` 壓縮長對話**
> 當對話變得冗長時，使用 `/compact` 指令擷取重點資訊。這能保留關鍵上下文，同時釋放 token 空間。

**Tip: 及時記錄錯誤修正到 CLAUDE.md**
> 當 Claude 犯錯時，不只是修正它，更要指導它將正確做法更新到 CLAUDE.md。這樣建立的長期記憶能防止相同錯誤再次發生。

**Tip: 善用記憶匯入組織複雜專案**
> 對於大型專案，使用 `@path/to/file` 語法將記憶分割成多個模組檔案。這讓記憶更容易管理和維護，不同團隊成員也能負責各自的領域。

## Intermediate Tips 進階技巧

當你熟悉基礎操作後，這些進階技巧能大幅提升你的生產力。

**Tip: 使用 Plan mode 先規劃再執行**
> 在處理複雜任務前，先啟用 Plan mode 讓 Claude 規劃整體方案。確認計劃合理後再開始執行，能避免走錯方向浪費時間。

**Tip: 開啟多個 Claude Code 實例並行工作**
> 你可以同時開啟多個 Claude Code 實例，讓它們分工處理不同功能模組或執行不同測試。這種並行作業能顯著提升開發效率。

**Tip: 將大型任務拆分為 Markdown checklist**
> 面對大型重構或功能開發時，先執行 lint 檢查，將所有需要處理的項目列成 Markdown checklist。然後逐項完成，既有條理又能追蹤進度。

**Tip: 為 agents 準備專屬文件**
> 在 `/docs` 目錄建立專門給 AI 讀取的文件，包含系統架構、編碼風格、測試框架說明等。讓 AI 在開始工作前先讀取這些文件，能大幅提升輸出品質。

**Tip: 利用記憶檔案層級結構**
> 在專案的不同子目錄建立專門的 CLAUDE.md 檔案。Claude Code 會遞迴載入所有相關記憶，讓不同模組有各自的專屬規則。

**Tip: 善用企業級記憶管理**
> 如果你在大型組織工作，可以推動部署 Enterprise Policy 記憶。這能統一所有開發者的編碼標準和安全規範，提升整體程式碼品質。

## Advanced Tips 高階技巧

這些高階技巧適合需要極致效率的專業開發者。

**Tip: 根據問題複雜度選擇思考層級**
> Claude Code 提供不同的思考深度：
> - `think`：快速簡單問題
> - `think hard`：中等複雜度
> - `think harder`：複雜問題
> - `ultrathink`：極度複雜的架構設計
> 
> 選擇適當的層級能在速度和品質間取得平衡。

**Tip: 建立自訂 `/` 指令自動化工作流程**
> 配合 system reminder 功能，你可以建立自訂的 slash commands。將重複的工作流程封裝成指令，一鍵執行複雜操作。

**Tip: 使用 `/permissions` 管理工具權限**
> 透過 `/permissions` 指令或直接編輯 `.claude/settings.json`，你可以針對不同專案設定適當的工具權限。這能提升安全性，避免意外操作。

**Tip: 使用 git worktrees 多分支並行開發**
> Git worktrees 允許你同時在多個分支上工作，而不會互相干擾。搭配多個 Claude Code 實例，能實現真正的並行開發。

**Tip: 採用 TDD 流程開發**
> 指導 Claude Code 遵循測試驅動開發：
> 1. 先寫測試案例
> 2. 確認測試失敗
> 3. 實作功能程式碼
> 4. 驗證測試通過
> 5. 分別提交測試和實作
> 
> 這能確保程式碼品質和測試覆蓋率。

## Workflow Optimization 工作流程優化

優化工作流程能讓 AI 協作更加高效順暢。

**Tip: 遵循 Explore → Plan → Code → Commit 流程**
> 建立標準化的開發流程：
> 1. **Explore**：先讓 AI 理解現有架構
> 2. **Plan**：規劃實作方案
> 3. **Code**：漸進式實作功能
> 4. **Commit**：驗證並提交變更
> 
> 這個流程能減少錯誤，提升程式碼品質。

**Tip: 使用螢幕截圖進行視覺化迭代**
> 開發 UI 時，定期截圖並與設計稿比對。將截圖提供給 Claude Code，讓它持續迭代直到視覺效果完全匹配。這比文字描述更精確有效。

**Tip: 使用 headless 模式自動化 CI/CD**
> Claude Code 支援 headless 模式，可以整合到 CI/CD pipeline 中。用於自動化程式碼審查、測試生成或文件更新等任務。

**Tip: 建立自訂 Slash Commands**
> 為你的團隊建立專屬的 slash commands，封裝常用的工作流程。例如：
> - `/deploy-staging`：自動執行測試並部署到 staging
> - `/pr-review`：執行完整的 PR 審查流程
> - `/update-deps`：智慧更新相依套件

## Summary 總結

Claude Code 就像一個充滿潛力、需要培養的 junior engineer。透過建立完善的 **Rule（規則）** 與 **Memory（記憶）**，你能逐步將其訓練成符合專案需求的資深開發夥伴。

### 核心成功原則

掌握這四個核心原則，就能發揮 Claude Code 的最大價值：

1. **記憶優先**：持續更新 CLAUDE.md，建立完整的專案知識庫
2. **逐步指導**：使用 Manual 模式仔細審查，及時糾正錯誤並更新記憶
3. **並行效率**：善用多實例分工協作，大幅提升開發速度
4. **規劃先行**：使用 Plan mode 確保開發方向正確，避免浪費時間

### 最終思考

> 最好的 AI 協作不是讓 AI 取代你，而是讓 AI 成為你的得力助手。

Claude Code 的真正價值在於增強而非取代人類開發者。透過正確的使用方法和持續的記憶建立，它能成為加速開發、提升品質的強大工具。

## 參考 References

- [Anthropic Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

**Note:** 如果有任何建議、問題或不同的使用經驗，歡迎留言或寄信給我，可以一起討論進步成長 🙂
{: .notice--success}