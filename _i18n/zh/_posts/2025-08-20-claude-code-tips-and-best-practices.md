---
layout: post
title: "Claude Code 教學完整指南：30+ 實用技巧提升 AI 開發效率【2025最新】"
date: 2025-08-22 00:10:00 +0800
description: "掌握 Claude Code 從入門到進階的完整教學。涵蓋記憶系統、工作流程優化、自定義指令等 30+ 實用技巧。讓 AI 成為你的高效開發助手，提升 10 倍生產力！"
tags: [claude-code, ai-development, productivity, automation, developer-tools, ai-assistant, workflow-optimization]
categories: [AI Development Tools]
toc:
  sidebar: right
thumbnail: /assets/img/igor-omilaev-eGGFZ5X2LnA-unsplash.jpg
---

> 本文結合 **Anthropic 官方最佳實踐** 與個人使用經驗，分享如何有效運用 Claude Code 這個強大的 AI 開發工具進行軟體開發。目標是讓你把 AI 當成「得力助手」而不是「失控黑箱」，用規則、記憶與正確的工作流程，真正提升 10 倍開發效率。

---

## Claude Code 的 AI Agent 核心：Rule 與 Memory

Claude Code 這個 AI 開發工具其實就像一位**非常聰明、但需要你指導的 junior engineer**。要讓它發揮最大效益，提升開發效率，需要理解兩個核心概念。如果你想深入了解 AI Agent 的完整架構，可以參考我的另一篇文章 [AI Agent 系列：搞懂 LLM、RAG 與 MCP 的核心互動邏輯]({% post_url 2025-07-24-intro-to-ai-agents-mcp-rag-llm %})。

### Rule（規則）

規則決定 Claude Code 要遵守的開發原則。就像公司內部的 coding style guide 或 architecture decision record。這些規則確保 AI 開發工具的輸出符合你的專案標準，提升開發效率。

### Memory（記憶）

記憶存放已學到的知識與決策，避免 Claude Code 一直「失憶」重複錯誤。有了記憶系統，這個 AI 開發工具才能累積專案知識，成為真正提升開發效率的助手。

### 實際應用範例

Anthropic 官方建議，把規則與記憶結合起來，才能讓 Claude Code 這個 AI 開發工具穩定地參與長期專案，持續提升開發效率。

**不好的做法：**
- 只告訴 AI「請用正確的縮排」，AI 可能會混亂

**正確的做法：**
- 在 `CLAUDE.md` 明確寫「統一使用 2 空格縮排」，AI 就能長期維持一致

👉 **小技巧：**  
當 Claude 犯錯時，不只是口頭糾正。更重要的是「更新記憶」，把正確解法寫進 `CLAUDE.md`。這樣下次它才會真正「學會」。

---

## Essential Setup 必要設置

### 第一步：建立專案記憶 `CLAUDE.md`

這是 Claude Code 的「核心大腦」，也是提升 AI 開發效率的關鍵。建議放在專案根目錄，並且持續更新。這個檔案會成為 AI 理解你專案的主要依據。如果你在設定開發環境時需要幫助，可以參考 [在新 macOS 上設定開發環境]({% post_url 2024-01-11-setup-development-environment-on-a-new-macos %})。

### 記憶檔案的內容架構

**基礎資訊：**
- **常用指令**：`npm run build`、`npm test`
- **程式碼風格**：縮排規則、命名慣例
- **架構模式**：專案的獨特設計決策

**進階資訊：**
- **工作流程**：PR 流程、測試與部署策略
- **Domain 知識**：業務邏輯、API 規格
- **除錯紀錄**：常見問題與解決方案

### 使用記憶的進階技巧

記憶系統不只是單一檔案，而是一個完整的層級架構：

- 使用 `/init` 快速生成初始 `CLAUDE.md`
- 用 `@path/to/file` 引用其他記憶檔案
- 利用 `/memory` 指令直接更新

### 記憶層級（Memory Hierarchy）

不同層級的記憶有不同的優先級和適用範圍。理解這個層級結構，能幫助你更好地組織專案知識。

| 記憶類型               | 範圍     | Location                                                                                                                                            | 優先級 | 說明                             | 共享範圍               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------- | ---------------------- |
| Enterprise Policy      | 企業級   | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`<br>Linux: `/etc/claude-code/CLAUDE.md`<br>Windows: `C:\ProgramData\ClaudeCode\CLAUDE.md` | 最高   | 企業編碼標準、安全政策、合規要求 | 組織內所有用戶         |
| Project Memory         | 團隊共享 | `./CLAUDE.md`                                                                                                                                       | 高     | 專案架構、編碼標準、共同工作流程 | 透過版本控制與團隊共享 |
| User Memory            | 個人偏好 | `~/.claude/CLAUDE.md`                                                                                                                               | 中     | 程式碼風格偏好、個人工具快捷方式 | 個人所有專案           |
| Project Memory (Local) | 本地專案 | `./CLAUDE.local.md`                                                                                                                                 | 低     | 個人專案特定偏好（已棄用）       | 僅個人當前專案         |

---

## Basic Tips 基礎技巧

### 快速上手的必備操作

這些是你在使用 Claude Code 時每天都會用到的基本指令。熟練掌握它們，能大幅提升工作效率和開發效率。

- **快速初始化**：使用 `/init` 幫專案創建基礎記憶文件 `CLAUDE.md`
- **隨時中斷**：按 `Escape` 結束當前操作，避免 AI 跑太遠
- **Manual 模式**：永遠審查建議，不要盲目 auto-accept

### Context 管理技巧

Context 是 Claude Code 理解你需求的關鍵。適當的 context 管理，能讓這個 AI 開發工具更精準地協助你，大幅提升開發效率。

- **清理上下文**：做完一個 task，保持好習慣用 `/clear` 或開新 session。這能避免舊任務干擾新任務，導致不精準以及浪費不必要的 token
- **壓縮對話**：善用 `/compact` 保留對話重點，節省 token。這樣能避免 context window 達上限
- **即時更新記憶**：當你解決一個問題，請 AI 總結並存到記憶檔案 `CLAUDE.md` 或 `/docs/xxx.md`。這能避免 AI Agent 下次犯同樣的錯

> ✅ **官方建議：**保持互動簡單。不要一次給 AI 一大堆需求，而是逐步分解。每個回合只解決一小部分，這樣更容易掌控結果。

---

## Intermediate Tips 進階技巧

### 規劃與執行分離

當面對複雜任務時，規劃階段與執行階段的分離非常重要。

- **Plan mode 先規劃再寫**：按下 `shift+tab` 切換。就像寫程式要先畫流程圖規劃一樣，讓 AI 先思考再行動
- **並行工作**：開多個 Claude Code 實例，分工處理不同功能。每個實例負責專門的任務，避免 context 混亂

### 大型專案管理策略

大型專案需要更細緻的管理方式。以下策略能幫助你更好地控制 Claude Code 的輸出，提升開發效率。對於需要良好架構設計的專案，建議先了解 [設計模式的基本概念]({% post_url 2024-07-04-design-pattern-3-design-pattern %})。

- **管理大型修改**：遇到大型修改，先細分再分階段修正。這樣每個階段都能確保品質
- **建立專屬 Guidelines**：把架構設計、API、Unit Test、Code Review 的 Guidelines 說明放在 `/docs`。讓 AI 先讀再寫，確保符合專案規範

---

## Advanced Tips 高階技巧

### 思考能力調控

不同難度的問題需要不同程度的思考。透過關鍵字，你可以調整 Claude Code 的思考深度，讓這個 AI 開發工具更好地處理複雜任務。

遇到較困難的問題時，可以加上這些關鍵字來提高 AI 的思考能力：

- `think` - 基礎思考，適合簡單邏輯問題
- `think hard` - 深度思考，適合需要分析的問題
- `think harder` - 更深層分析，適合複雜架構設計
- `ultrathink` - 極限思考模式，適合最困難的挑戰

### Subagents 專屬角色

複雜專案中，不同任務需要不同的專業知識。Claude Code 的 Subagents 能幫助你實現這種分工，大幅提升 AI 開發工具的效能。

透過 `/agents` 來創建不同的 subagent，使 context 不混亂只專注在自身角色。每個 agent 可以有自己的專屬記憶和任務範圍。這就像組建一個虛擬團隊，每個成員都有專精的領域。

{% include figure.liquid path="assets/img/claude_code_agents.png" title="claude_code_agents" %}

### Custom Slash Commands 自定義指令

重複性的工作可以透過自定義指令來簡化。這不僅節省時間，還能確保一致性，是 Claude Code 提升開發效率的重要功能。

將重複的 prompt 用 slash 定義成 command，能大幅提升工作效率。

**實際案例：Unit Test 工作流程**

1. **定義測試指令：**
   - `/generate-unit-test` - 生成單元測試
   - `/update-unit-test-guidelines` - 更新測試準則

2. **工作流程：**
   ```
   /generate-unit-test XXXPresenter  # 請 AI 寫 XXXPresenter 測試
   → Review 並告訴 AI 哪裡有誤修正
   → /update-unit-test-guidelines    # 更新 guidelines，避免下次犯相同錯誤
   ```

{% include figure.liquid path="assets/img/claude_code_commands.png" title="claude_code_commands" %}
{% include figure.liquid path="assets/img/claude_code_commands_2.png" title="claude_code_commands_2" %}

### 其他進階功能

這些功能適合有特殊需求的開發者。掌握它們能讓你的 Claude Code 工作流程更加順暢。

- **權限管理**：用 `/permissions` 控制 AI 可以動哪些檔案。這能有效保護敏感檔案不被意外修改
- **Git worktrees**：平行開發多分支，避免干擾。特別適合需要同時維護多個版本的專案。如需多帳號管理，請參考 [使用 SSH 管理多個 GitHub 帳號]({% post_url 2025-05-18-how-to-use-multiple-github-accounts-using-ssh %})
- **TDD 流程**：先寫測試再寫程式。Claude Code 特別適合這種迭代式開發方式

- **權限管理**：用 `/permissions` 控制 AI 可以動哪些檔案。這能有效保護敏感檔案不被意外修改
- **Git worktrees**：平行開發多分支，避免干擾。特別適合需要同時維護多個版本的專案
- **TDD 流程**：先寫測試再寫程式。Claude 特別適合這種迭代式開發方式

---

## Workflow Optimization 工作流程優化

### 🌟 黃金工作流程

這個流程經過實戰驗證，能確保 AI 的輸出品質持續提升。

**讀取 Guideline → 執行任務 → Review 修正 → 更新 Memory**

1. **讀取 Guideline**
   讓 AI Agent 先讀取相關的 guidelines（`/docs/xxx_guideline.md`）。這確保 AI 理解專案的規範和期望。

2. **執行任務**
   告訴 AI Agent 具體要做的事。任務描述要明確、可量化、有清楚的完成標準。

3. **Review 修正**
   審查結果並告訴 AI 需要修正的地方。這個步驟很重要，它能幫助 AI 理解你的期望。

4. **更新 Memory**
   將學到的經驗更新到記憶檔案。這樣避免下次犯錯，讓 AI 越來越精準。

> 💡 **實測心得：**按照上面的步驟，Claude Code 就會越來越精準。建議大家開始幫自己的專案建立各種 guidelines。一起完善這份 guideline 後，就能有 N 個分身參考不同 guideline 幫你處理事情。

### 傳統開發流程整合

AI 不是要取代現有流程，而是要融入其中。以下是整合的最佳實踐。

**Explore → Plan → Code → Commit**

1. **Explore（探索）**
   先跟 Claude 一起理解需求。讓 AI 幫你分析需求的技術挑戰和可能方案。

2. **Plan（規劃）**
   規劃實作步驟（使用 Plan mode）。將大任務拆解成可管理的小步驟。

3. **Code（編碼）**
   逐步撰寫程式，隨時檢查。每完成一個小功能就測試，確保品質。

4. **Commit（提交）**
   驗證通過後才提交。讓 AI 幫你撰寫清晰的 commit message。

### 實用技巧整理

這些技巧來自實際專案經驗，能幫助你應對各種開發場景。

**UI 開發技巧：**
如果遇到設計稿或 UI 開發，可以用「截圖對比」方式。讓 Claude 幫你比對差異，持續迭代直到符合設計稿。

**自動化整合：**
在 CI/CD pipeline 中，Claude Code 也能 headless 運行。這能實現自動化檢查與測試，提升團隊開發效率。想了解更多 CI/CD 設定，可以參考 [Jenkins 系列教學]({% post_url 2024-08-15-jenkins-1-what-is-jenkins %})。

**知識管理：**
建立專案專屬的 `docs/` 資料夾，存放各種 guidelines。讓 Claude Code 能夠快速學習專案規範，成為真正的專案成員。文件視覺化可以使用 [Excalidraw AI 工具]({% post_url 2025-03-15-ai-tools-excalidraw-chart-guide %})。

---

## Claude Code 與其他 AI 工具比較

### 功能對比表

| 功能特點 | Claude Code | GitHub Copilot | ChatGPT | Cursor |
|----------|-------------|----------------|----------|--------|
| 專案記憶系統 | ✅ 完整層級記憶 | ❌ | ❌ | ✅ 基本記憶 |
| 自定義指令 | ✅ Slash Commands | ❌ | ❌ | ✅ |
| Subagents 分工 | ✅ | ❌ | ❌ | ❌ |
| Plan Mode | ✅ | ❌ | ❌ | ❌ |
| 檔案系統操作 | ✅ 完整支援 | ❌ | ❌ | ✅ |
| 開發效率提升 | 10x | 3x | 2x | 5x |

## 常見問題 FAQ

### Q1: Claude Code 適合哪些開發者使用？
**A:** Claude Code 適合所有層級的開發者，從初學者到資深工程師。初學者可以用它學習最佳實踐，資深開發者則能透過它大幅提升開發效率，節省 80% 的重複性工作時間。

### Q2: 如何開始使用 Claude Code？
**A:** 首先安裝 Claude Code CLI，然後在專案根目錄執行 `/init` 指令建立 `CLAUDE.md` 記憶檔案。接著設定你的開發規則和工作流程，就能開始使用這個強大的 AI 開發工具了。

### Q3: Claude Code 會取代程式設計師嗎？
**A:** 不會。Claude Code 是設計來輔助而非取代開發者的。它處理繁瑣重複的工作，讓開發者能專注在架構設計、業務邏輯等需要創造力和經驗判斷的高階任務上。

### Q4: 使用 Claude Code 需要付費嗎？
**A:** Claude Code 提供免費和付費版本。免費版本已經能滿足大部分開發需求，付費版本則提供更大的 context window、更快的回應速度和進階功能。

### Q5: Claude Code 支援哪些程式語言？
**A:** Claude Code 支援所有主流程式語言，包括但不限於 JavaScript、Python、Java、C++、Go、Rust、TypeScript 等。它也能處理各種框架和工具鏈。

## 結論：AI 是得力助手，不是替代品

### 核心理念

Claude Code 這個 AI 開發工具的最佳使用方式，關鍵在於三個要素：

- **規則明確**：用 Rule 與 Memory 建立專案知識庫
- **逐步互動**：簡化任務、逐步推進，而不是一次丟出龐大需求
- **持續優化**：當錯誤出現時，馬上更新記憶，讓 AI 變得更穩定

### Anthropic 的願景

Anthropic 的理念其實很簡單但深刻：

👉 **AI 不應該取代你，而是讓你「專注在高層次決策」**

這包括 Architecture 設計、SOLID 原則應用、Design Pattern 選擇、System Design 規劃等需要經驗和判斷力的工作。而繁瑣重複的部分，就交給 AI 來處理。

### 最佳實踐總結

> 🎯 **黃金流程：**請 Claude Code 讀取 guideline → 告訴 AI Agent 你要他做的事 → Review 並告訴 AI 修正問題 → 更新 Rule & Memory（避免下次犯錯）

實測按照上面的步驟，Claude Code 就會越來越精準。建議大家可以開始幫自己的專案建立各種 guidelines（`docs/xxx_guideline.md`）。

當你完善這份 guideline 後，就能有 N 個分身參考不同 guideline 幫你處理事情。這不是科幻，而是現在就能透過 Claude Code 實現的高效開發模式，真正達到 10 倍開發效率提升。

**歡迎大家分享自己的 Tips，一起交流！** 🚀

---

## 參考 References

- [Anthropic Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

---