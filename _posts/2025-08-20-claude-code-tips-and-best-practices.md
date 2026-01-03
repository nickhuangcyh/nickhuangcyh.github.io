---
layout: post
title: "Claude Code 使用技巧與最佳實踐 - Tips and Best Practices"
date: 2025-08-22 00:10:00 +0800
description: "探索 Claude Code 的最佳使用方式，從基礎操作到進階工作流程，提升 AI 輔助開發的效率與品質。"
tags: [Claude Code, AI Tools, Development Tips, Best Practices]
categories: [AI Development Tools]
toc:
  sidebar: right
thumbnail: /assets/img/igor-omilaev-eGGFZ5X2LnA-unsplash.jpg
---

> 本文結合 **Anthropic 官方最佳實踐** 與個人使用經驗，分享如何有效運用 Claude Code 進行軟體開發。目標是讓你把 AI 當成「得力助手」而不是「失控黑箱」，用規則、記憶與正確的工作流程，真正提升開發效率。

---

## AI Agent 的核心：Rule 與 Memory

Claude Code 其實就像一位**非常聰明、但需要你指導的 junior engineer**。

- **Rule（規則）**：決定 AI 要遵守的開發原則。就像公司內部的 coding style guide 或 architecture decision record。
- **Memory（記憶）**：存放已學到的知識與決策，避免 AI 一直「失憶」重複錯誤。

Anthropic 官方建議，把這兩者結合起來，才能讓 AI 穩定地參與長期專案。  
舉例來說：

- 如果你只告訴 AI「請用正確的縮排」，AI 可能會混亂。
- 但如果你在 `CLAUDE.md` 明確寫「統一使用 2 空格縮排」，AI 就能長期維持一致。

👉 小技巧：  
當 Claude 犯錯時，不只是口頭糾正，還要「更新記憶」，把正確解法寫進 `CLAUDE.md`，下次他才會「學會」。

---

## Essential Setup 必要設置

**第一步：建立專案記憶 `CLAUDE.md`**  
這是 Claude Code 的「核心大腦」。建議放在專案根目錄，並且持續更新。

**內容可以包含：**

- **常用指令**：`npm run build`、`npm test`
- **程式碼風格**：縮排規則、命名慣例
- **架構模式**：專案的獨特設計決策
- **工作流程**：PR 流程、測試與部署策略
- **Domain 知識**：業務邏輯、API 規格

**進階技巧：**

- 使用 `/init` 快速生成初始 `CLAUDE.md`
- 用 `@path/to/file` 引用其他記憶檔案
- 利用 `/memory` 指令直接更新

**記憶層級（Memory Hierarchy）：**

| 記憶類型               | 範圍     | Location                                                                                                                                            | 優先級 | 說明                             | 共享範圍               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------- | ---------------------- |
| Enterprise Policy      | 企業級   | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`<br>Linux: `/etc/claude-code/CLAUDE.md`<br>Windows: `C:\ProgramData\ClaudeCode\CLAUDE.md` | 最高   | 企業編碼標準、安全政策、合規要求 | 組織內所有用戶         |
| Project Memory         | 團隊共享 | `./CLAUDE.md`                                                                                                                                       | 高     | 專案架構、編碼標準、共同工作流程 | 透過版本控制與團隊共享 |
| User Memory            | 個人偏好 | `~/.claude/CLAUDE.md`                                                                                                                               | 中     | 程式碼風格偏好、個人工具快捷方式 | 個人所有專案           |
| Project Memory (Local) | 本地專案 | `./CLAUDE.local.md`                                                                                                                                 | 低     | 個人專案特定偏好（已棄用）       | 僅個人當前專案         |

---

## Basic Tips 基礎技巧

- **快速初始化**：使用 `/init` 幫專案創建基礎記憶文件 `CLAUDE.md`
- **隨時中斷**：按 `Escape` 結束當前操作，避免 AI 跑太遠
- **Manual 模式**：永遠審查建議，不要盲目 auto-accept
- **清理上下文**：做完一個 task，保持好習慣用 `/clear` 或開新 session，避免舊任務干擾新任務導致不精準以及浪費不必要的 token
- **壓縮對話**：善用 `/compact` 保留對話重點，節省 token，避免 context window 達上限
- **即時更新記憶**：當你解決一個問題，請 AI 總結並存到記憶檔案 `CLAUDE.md` 或 `/docs/xxx.md`，避免 AI Agent 下次犯錯

> ✅ 官方建議：保持互動簡單。不要一次給 AI 一大堆需求，而是逐步分解，每個回合只解決一小部分。

---

## Intermediate Tips 進階技巧

- **Plan mode 先規劃再寫**：按下 `shift+tab` 切換，就像寫程式要先畫流程圖規劃一樣
- **並行工作**：開多個 Claude Code 實例，分工處理不同功能
- **管理大型修改**：遇到大型修改，先細分再分階段修正
- **建立專屬 Guidelines**：把架構設計、API、Unit Test、Code Review 的 Guidelines 說明放在 `/docs`，讓 AI 先讀再寫

---

## Advanced Tips 高階技巧

### 思考能力調控

遇到較困難的問題可以加上關鍵字，提高 AI 的思考能力：

- `think` - 基礎思考
- `think hard` - 深度思考
- `think harder` - 更深層分析
- `ultrathink` - 極限思考模式

### Subagents 專屬角色

透過 `/agents` 來創建不同的 subagent，使 context 不混亂只專注在自身角色。每個 agent 可以有自己的專屬記憶和任務範圍。

{% include figure.liquid path="assets/img/claude_code_agents.png" title="claude_code_agents" %}

### Custom Slash Commands 自定義指令

將重複的 prompt 用 slash 定義成 command，提升工作效率。

**實際案例：Unit Test 工作流程**

1. 定義測試指令：
   - `/generate-unit-test` - 生成單元測試
   - `/update-unit-test-guidelines` - 更新測試準則

2. 工作流程：
   ```
   /generate-unit-test XXXPresenter  # 請 AI 寫 XXXPresenter 測試
   → Review 並告訴 AI 哪裡有誤修正
   → /update-unit-test-guidelines    # 更新 guidelines，避免下次犯相同錯誤
   ```

{% include figure.liquid path="assets/img/claude_code_commands.png" title="claude_code_commands" %}
{% include figure.liquid path="assets/img/claude_code_commands_2.png" title="claude_code_commands_2" %}

### 其他進階功能

- **權限管理**：用 `/permissions` 控制 AI 可以動哪些檔案（可以排除敏感檔案）
- **Git worktrees**：平行開發多分支，避免干擾
- **TDD 流程**：先寫測試再寫程式，Claude 特別適合這種迭代

---

## Workflow Optimization 工作流程優化

### 🌟 黃金工作流程

**讀取 Guideline → 執行任務 → Review 修正 → 更新 Memory**

1. **讀取 Guideline**：讓 AI Agent 先讀取相關的 guidelines（`/docs/xxx_guideline.md`）
2. **執行任務**：告訴 AI Agent 具體要做的事
3. **Review 修正**：審查結果並告訴 AI 需要修正的地方
4. **更新 Memory**：將學到的經驗更新到記憶檔案，避免下次犯錯

> 💡 實測按照上面的步驟，Claude Code 就會越來越精準。建議大家可以開始幫自己的專案建立各種 guidelines，一起完善這份 guideline 後，就能有 N 個分身參考不同 guideline 幫你處理事情。

### 傳統開發流程整合

**Explore → Plan → Code → Commit**

1. **Explore**：先跟 Claude 一起理解需求
2. **Plan**：規劃實作步驟（使用 Plan mode）
3. **Code**：逐步撰寫程式，隨時檢查
4. **Commit**：驗證通過後才提交

### 實用技巧

- 如果遇到設計稿或 UI 開發，可以用「截圖對比」方式，讓 Claude 幫你比對差異，持續迭代
- 在 CI/CD pipeline 中，Claude 也能 headless 運行，自動化檢查與測試
- 建立專案專屬的 `docs/` 資料夾，存放各種 guidelines，讓 AI 能夠快速學習專案規範

---

## 結論：AI 是得力助手，不是替代品

Claude Code 的最佳使用方式，關鍵在於：

- **規則明確**：用 Rule 與 Memory 建立專案知識庫
- **逐步互動**：簡化任務、逐步推進，而不是一次丟出龐大需求
- **持續優化**：當錯誤出現時，馬上更新記憶，讓 AI 變得更穩定

Anthropic 的理念其實很簡單：  
👉 **AI 不應該取代你，而是讓你「專注在高層次決策」**（像是 Architecture、SOLID、該用什麼 Design Pattern、System Design、軟體設計），把繁瑣重複的部分交給 AI。

> 🎯 建議：請 AI Agent 讀取 guideline → 告訴 AI Agent 你要他做的事 → Review 並告訴 AI 修正問題 → 更新 Rule & Memory（避免下次犯錯）

實測按照上面的步驟，Claude Code 就會越來越精準，建議大家可以開始幫自己的專案建立各種 guidelines（`docs/xxx_guideline.md`），一起完善這份 guideline 後，就能有 N 個分身參考不同 guideline 幫你處理事情。

**歡迎大家分享自己的 Tips，一起交流！** 🚀

---

## 參考 References

- [Anthropic Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

---
