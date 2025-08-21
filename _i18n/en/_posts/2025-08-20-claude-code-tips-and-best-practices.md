---
layout: post
title: "Claude Code 使用技巧與最佳實踐 - Tips and Best Practices"
date: 2025-08-22 00:10:00 +0800
description: "探索 Claude Code 的最佳使用方式，從基礎操作到進階工作流程，提升 AI 輔助開發的效率與品質。"
tags: [Claude Code, AI Tools, Development Tips, Best Practices]
categories: [AI Development Tools]
toc:
  sidebar: right
thumbnail: /assets/img/claude_code_tips.jpg
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

- **隨時中斷**：按 `Escape` 結束當前操作，避免 AI 跑太遠
- **Manual 模式**：永遠審查建議，不要盲目 auto-accept
- **清理上下文**：用 `/clear` 或開新 session，避免舊任務干擾新任務
- **壓縮對話**：`/compact` 保留重點，避免 context window 滿載
- **錯誤即時記錄**：發現錯誤 → 修正 → 更新到 `CLAUDE.md`

> ✅ 官方建議：保持互動簡單。不要一次給 AI 一大堆需求，而是逐步分解，每個回合只解決一小部分。

---

## Intermediate Tips 進階技巧

- **Plan mode 先規劃再寫**：就像寫程式要先畫流程圖一樣
- **並行工作**：開多個 Claude Code 實例，分工處理不同功能
- **Checklist 管理大型修改**：先跑 lint，然後分段修正
- **為 AI 準備專屬文件**：把架構設計、API 說明放在 `/docs`，讓 AI 先讀再寫

---

## Advanced Tips 高階技巧

- **多層次思考**：依問題複雜度選擇 `think` → `think hard` → `ultrathink`
- **自訂 Slash Commands**：用 `/deploy` 或 `/test-all` 一鍵觸發流程
- **權限管理**：用 `/permissions` 控制 AI 可以動哪些檔案
- **Git worktrees**：平行開發多分支，避免干擾
- **TDD 流程**：先寫測試再寫程式，Claude 特別適合這種迭代

---

## Workflow Optimization 工作流程優化

一個建議的黃金流程：  
**Explore → Plan → Code → Commit**

1. **Explore**：先跟 Claude 一起理解需求
2. **Plan**：規劃實作步驟
3. **Code**：逐步撰寫程式，隨時檢查
4. **Commit**：驗證通過後才提交

👉 如果遇到設計稿或 UI 開發，可以用「截圖對比」方式，讓 Claude 幫你比對差異，持續迭代。  
👉 在 CI/CD pipeline 中，Claude 也能 headless 運行，自動化檢查與測試。

---

## 結論：AI 是得力助手，不是替代品

Claude Code 的最佳使用方式，關鍵在於：

- **規則明確**：用 Rule 與 Memory 建立專案知識庫
- **逐步互動**：簡化任務、逐步推進，而不是一次丟出龐大需求
- **持續優化**：當錯誤出現時，馬上更新記憶，讓 AI 變得更穩定

Anthropic 的理念其實很簡單：  
👉 AI 不應該取代你，而是讓你「專注在高層次決策」，把繁瑣重複的部分交給 AI。

---

## 參考 References

- [Anthropic Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

---
