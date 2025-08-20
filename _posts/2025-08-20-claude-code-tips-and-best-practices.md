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

## Introduction 簡介

Claude Code 作為 Anthropic 推出的 AI 輔助編程工具，不僅能協助撰寫程式碼，更能理解專案脈絡、執行複雜任務。然而，如何善用這個強大的工具，需要掌握正確的使用技巧與工作流程。讓我們從基礎到進階，逐步探索 Claude Code 的使用精髓。

## Basic Tips 基礎技巧

### 基本操作與控制

**使用 Escape 鍵取消操作**
> 當 Claude Code 執行到一半想要停止時，按下 `Escape` 鍵可以立即中斷當前操作。這在測試或調整指令時特別有用。

**永遠使用 Manual 模式**
不要使用 auto-accept 模式，而是逐步審查 AI Agent 的每個建議。當發現錯誤時及時停止並指導修改，將重點記錄到 markdown 檔案中，讓 Claude 下次能夠記住。

> 就像駕駛時需要保持警覺一樣，與 AI 協作也需要持續的監督與指導，確保每一步都朝正確方向前進。

### 基本指令使用

**Context 管理**
使用 `/clear` 指令在無關任務之間清理上下文，避免 context window 被無關資訊填滿，影響效能並浪費 token。

**對話壓縮**
使用 `/compact` 指令壓縮對話內容，擷取重點資訊。

**建立 CLAUDE.md 文件**
在專案根目錄建立 `CLAUDE.md` 檔案，記錄：
- 專案架構說明
- 程式碼風格規範
- 測試框架與限制
- 常用指令集
- 開發環境設定

## Intermediate Tips 進階技巧

### Plan Mode 規劃模式

**開始前先規劃**
在撰寫程式碼前，先使用 Plan mode 請 Claude Code 進行規劃。確認並修改計劃後再開始執行，這樣能確保方向正確，避免走彎路。

> 就像建築師在動工前需要完整藍圖，程式開發也需要清晰的規劃作為指引。

### 任務管理與並行處理

**任務分離原則**
每完成一個任務後，如果下個任務無關聯，建議使用 `/clear` 或開新的 session，避免 context 過多造成混淆。

**多實例並行工作**
不要只開一個 Claude Code，學會同時開啟多個實例，分工處理不同任務。例如：同時開發 A、B、C 功能以及撰寫測試。

> 就像工廠的生產線，合理的分工與並行作業能大幅提升整體效率。

### 大型專案管理

**拆分複雜任務**
遇到大型修改專案時，將任務拆分為細部項目，寫成 markdown 清單：
1. 請 Claude 執行 lint 檢查，將所有錯誤（含檔名和行號）寫入 Markdown checklist
2. 逐項修復錯誤，修復並驗證後勾選完成，再進行下一項

**Agents 與文件規劃**
規劃每個 `/agents` 使用，必要時建立對應的 `/docs` 文件讓 agents 執行前先讀取學習，包含專案架構、程式風格、單元測試框架等限制。

## Advanced Tips 高階技巧

### 思考層級控制

**Think 指令進階使用**
善用不同層級的思考指令：
- `think` < `think hard` < `think harder` < `ultrathink`

每個層級都會提供更深入的分析與建議，根據問題複雜度選擇適當的層級。

> 就像解數學題，簡單的計算無需複雜思考，但困難的證明題需要更深層的邏輯推理。

### 自訂化設定

**自訂指令**
建立自訂的 `/` 指令，並配合 system reminder 使用，讓常用的工作流程自動化。

**工具權限管理**
使用 `/permissions` 指令管理工具權限，或手動編輯 `.claude/settings.json` 檔案，針對特定專案設定適當的工具存取權限。

### Git 工作流程進階

**Git Worktrees 應用**
使用 git worktrees 進行獨立的分支開發，允許同時在多個分支上工作而不互相干擾。

**測試驅動開發**
採用 TDD 流程：
1. 先撰寫測試
2. 確認測試初始失敗
3. 實作程式碼使測試通過
4. 使用 subagents 驗證實作
5. 分別提交測試與程式碼

## Workflow Optimization 工作流程優化

### 標準開發流程

**Explore, Plan, Code, Commit 工作流程**
1. **Explore**: 先讀取相關檔案，理解現有架構
2. **Plan**: 使用思考模式進行規劃
3. **Code**: 漸進式實作解決方案  
4. **Commit**: 驗證方案合理性後提交

### 視覺化迭代

**螢幕截圖比對法**
1. 截取目前實作畫面
2. 與設計稿進行比對
3. 持續迭代直到視覺效果匹配

> 一圖勝千言，視覺化的比對能快速發現設計與實作的差異。

### 自動化與整合

**Headless 模式**
使用 headless 模式進行自動化作業，整合到 CI/CD pipeline 中。

**自訂 Slash Commands**
建立重複工作流程的自訂指令，提升日常開發效率。

## Summary 總結

Claude Code 的強大在於其理解能力與執行效率，但要發揮最大效用，需要掌握正確的使用方式。從基礎的操作控制，到進階的工作流程優化，每個層級都有其重要性：

- **基礎層**：掌握基本操作與安全使用原則
- **進階層**：善用規劃模式與任務管理
- **專家層**：建立個人化的工作流程與自動化系統

> 工具只是手段，方法才是關鍵。適合自己的工作流程，就是最好的最佳實踐。

記住，每個開發者的需求不同，建議多方實驗，找出最適合自己專案與團隊的使用方式。Claude Code 提供了強大的基礎，如何善用它來提升開發效率，則需要持續學習與調整。

## 參考 References

- [Anthropic Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference)

**Note:** 如果有任何建議、問題或不同的使用經驗，歡迎留言或寄信給我，可以一起討論進步成長 🙂
{: .notice--success}