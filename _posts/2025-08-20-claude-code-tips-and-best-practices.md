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

AI Agent 最重要的是 **Rule（規則）** 與 **Memory（記憶）**。

試想一下我們平常的工作流程：當需求或 bug 來的時候，我們會先依靠以前的經驗來實作或解決問題。如果碰到沒遇過的問題就會上網找以及深入研究，最後解決後會學起來，下次遇到就知道如何解決。

AI Agent 也是一樣的。當遇到不存在資料庫的知識時，他會上網找，找完後解決。但如果你沒有將解決問題的方式記錄下來，下次問同樣問題 AI Agent 還是會再去上網找一次，跟人忘記了一樣。所以把解決 domain knowhow 記錄在文件中，就讓 AI 有了記憶的能力。

可以把 AI Agent 當成一個**很聰明但需要指導的 junior engineer**，擁有龐大的知識資料庫。我們要做的就是把我們 senior engineer 所知道的 architecture、system design 知識慢慢交給他，讓他在錯誤時糾正他，並請他更新文件（memory），慢慢將他訓練成符合我們專案的資深工程師或架構師，提高產出的精確度。

## Essential Setup 必要設置

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

Claude Code 採用**四層階層式記憶系統**，提供從企業級到個人的完整記憶管理：

| 記憶類型 | 範圍 | Location | 優先級 | 說明 | 共享範圍 |
|----------|------|----------|--------|------|---------|
| Enterprise Policy | 企業級 | 系統級配置檔案 | 最高 | 企業編碼標準、安全政策、合規要求 | 組織內所有用戶 |
| Project Memory | 專案共享 | `./CLAUDE.md` | 高 | 專案架構、編碼標準、共同工作流程、領域知識 | 透過版本控制與團隊共享 |
| User Memory | 個人偏好 | `~/.claude/CLAUDE.md` | 中 | 程式碼風格偏好、個人工具快捷方式 | 個人所有專案 |
| ~~Project Local Memory~~ | ~~本地專案~~ | ~~`./CLAUDE.local.md`~~ | ~~低~~ | **已棄用**，功能已由匯入功能取代 | ~~僅個人當前專案~~ |

#### 記憶查找與載入流程

Claude Code 採用**階層式記憶查找機制**：

1. **遞迴目錄搜尋**：
   - 從當前工作目錄開始
   - 向上攀爬目錄樹，載入所有 CLAUDE.md 檔案
   - 較高層級的記憶具有更高優先級

2. **優先級順序**：
   - Enterprise Policy > Project Memory > User Memory
   - 高優先級記憶會覆蓋低優先級的相同設定

3. **匯入處理**：
   - 遞迴處理 `@path/to/import` 語法
   - 最多支援 5 層深度的嵌套匯入

> **企業部署**：透過配置管理系統部署 Enterprise Policy，確保組織內一致的編碼標準和安全政策。

#### 記憶匯入功能

Claude Code 支援**匯入外部記憶檔案**，讓您組織複雜的專案記憶：

```markdown
# 在 CLAUDE.md 中引用其他檔案
@docs/architecture.md
@docs/coding-standards.md
@team-conventions/frontend.md
```

**匯入特性：**
- 使用 `@path/to/file` 語法引用檔案
- 支援相對路徑和絕對路徑
- **最多 5 層深度**的嵌套匯入（遞迴深度限制）
- 取代已棄用的 `CLAUDE.local.md` 功能
- 使用 `/memory` 指令檢視已載入的記憶檔案

**實用場景：**
- **模組化記憶管理**：將大型專案記憶分割成功能模組
- **團隊專業分工**：前端、後端、DevOps 團隊各自維護專業記憶
- **框架特定文件**：React、Vue、Angular 等框架的最佳實踐
- **企業級標準化**：透過 Enterprise Policy 確保組織一致性
- **新人學習資源**：建立結構化的 onboarding 記憶檔案

## Memory Management 記憶管理

### 快速記憶管理

**Tip: 使用 `#` 快速新增記憶項目**
> 在對話開始時輸入 `#記憶內容`，系統會提示您選擇要儲存到哪個記憶檔案。

**Tip: 使用 `/memory` 指令編輯記憶**
> 直接開啟系統編輯器進行廣泛的記憶管理，檢視所有已載入的記憶檔案。

### 記憶撰寫最佳實踐

**具體性原則：**
- ✅ 好：「使用 2 空格縮排」
- ❌ 差：「使用適當縮排」
- ✅ 好：「測試檔案命名：`*.test.js`」
- ❌ 差：「遵循測試慣例」

**結構化組織：**
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

**團隊協作記憶：**
- **版本控制整合**：將 Project Memory 加入 Git，確保團隊同步
- **定期記憶審查**：建立 sprint review 時檢視記憶內容的機制
- **問題解決記錄**：將 troubleshooting 步驟記錄到記憶中
- **階層式記憶設計**：善用 Enterprise → Project → User 的優先級

**企業級記憶管理：**
- **中央化政策**：透過 Enterprise Policy 統一編碼規範
- **合規性要求**：將安全政策、資料處理規範寫入企業記憶
- **配置管理**：使用 Ansible、Chef 等工具部署企業級記憶檔案
- **權限控制**：確保只有授權人員可修改企業級記憶

## Basic Tips 基礎技巧

**Tip: 使用 Escape 鍵隨時中斷操作**
> 按下 `Escape` 鍵可立即停止 Claude Code 的執行。

**Tip: 永遠使用 Manual 模式審查建議**
> 不要使用 auto-accept，逐步審查每個建議，發現錯誤時及時停止並指導修改。

**Tip: 使用 `/clear` 清理無關的上下文**
> 完成任務後，若下個任務無關聯，使用 `/clear` 或開新 session。避免 AI 被無關資訊混淆，同時節省 token 資源並防止 context window 達到上限。

**Tip: 使用 `/compact` 壓縮長對話**
> 當對話過長時，使用 `/compact` 擷取重點資訊。

**Tip: 及時記錄錯誤修正到 CLAUDE.md**
> 當 Claude 犯錯時，指導修正並更新到 CLAUDE.md，建立長期記憶。

**Tip: 善用記憶匯入組織複雜專案**
> 使用 `@path/to/file` 將大型專案記憶分割成模組，便於管理和維護。

## Intermediate Tips 進階技巧

**Tip: 使用 Plan mode 先規劃再執行**
> 在撰寫程式碼前，先用 Plan mode 規劃，確認計劃後再開始執行。

**Tip: 開啟多個 Claude Code 實例並行工作**
> 同時開啟多個實例，分工處理不同功能或測試，提升效率。

**Tip: 將大型任務拆分為 Markdown checklist**
> 大型修改時，先執行 lint 檢查，將錯誤列成清單逐項修復。

**Tip: 為 agents 準備專屬文件**
> 建立 `/docs` 文件讓 agents 執行前先讀取，包含架構、風格、測試框架等。

**Tip: 利用記憶檔案層級結構**
> 在子目錄建立專門的 CLAUDE.md 檔案，Claude Code 會遞迴載入所有相關記憶。

**Tip: 善用企業級記憶管理**
> 大型組織可部署 Enterprise Policy 記憶，統一所有開發者的編碼標準和安全規範。

## Advanced Tips 高階技巧

**Tip: 根據問題複雜度選擇思考層級**
> 使用不同層級：`think` < `think hard` < `think harder` < `ultrathink`

**Tip: 建立自訂 `/` 指令自動化工作流程**
> 配合 system reminder，讓重複的工作流程自動化。

**Tip: 使用 `/permissions` 管理工具權限**
> 或編輯 `.claude/settings.json`，針對專案設定適當權限。

**Tip: 使用 git worktrees 多分支並行開發**
> 允許同時在多個分支上工作而不互相干擾。

**Tip: 採用 TDD 流程開發**
> 先寫測試 → 確認失敗 → 實作程式 → 驗證通過 → 分別提交

## Workflow Optimization 工作流程優化

**Tip: 遵循 Explore → Plan → Code → Commit 流程**
> 先理解架構 → 規劃方案 → 漸進實作 → 驗證提交

**Tip: 使用螢幕截圖進行視覺化迭代**
> 截圖比對設計稿，持續迭代直到視覺效果匹配。

**Tip: 使用 headless 模式自動化 CI/CD**
> 整合到 pipeline 中進行自動化作業。

**Tip: 建立自訂 Slash Commands**
> 為重複的工作流程建立專屬指令。

## Summary 總結

Claude Code 就像一個需要培養的 junior engineer，透過建立 **Rule（規則）** 與 **Memory（記憶）**，逐步將其訓練成符合專案需求的資深開發者。

記住這些核心原則：
- **記憶優先**：持續更新 CLAUDE.md，建立專案知識庫
- **逐步指導**：Manual 模式審查，及時糾正錯誤
- **並行效率**：多實例分工，提升開發速度
- **規劃先行**：Plan mode 確保方向正確

> 最好的 AI 協作不是讓 AI 取代你，而是讓 AI 成為你的得力助手。

## 參考 References

- [Anthropic Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

**Note:** 如果有任何建議、問題或不同的使用經驗，歡迎留言或寄信給我，可以一起討論進步成長 🙂
{: .notice--success}