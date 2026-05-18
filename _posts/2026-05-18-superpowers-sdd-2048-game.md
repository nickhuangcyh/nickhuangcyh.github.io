---
layout: post
title: "當 Vibe Coding 擁有 Superpowers：全自動精準開發方法論深度體驗，以 2048 遊戲實戰為例"
date: 2026-05-18 02:00:00 +0800
description: "延續 SDD（Specification-Driven Development）精神，這次體驗 Superpowers 的全自動方法論。透過 Gemini CLI 實作 2048 遊戲，深入分析 subagent-driven development、強制 TDD 等機制的威力與代價。"
tags: [AI, SDD, Superpowers, React, LLM, Agent, Gemini]
categories: [AI, Software Engineering]
toc:
  sidebar: right
thumbnail: /assets/img/superpowers_cover.png
---

{% include figure.liquid path="assets/img/superpowers_cover.png" title="superpowers-cover" %}

## 前言：從 Spec Kit 到 OpenSpec，再到 Superpowers

在前兩篇文章中，我分別用 **Spec Kit** 做了圍棋引擎、用 **OpenSpec** 做了 SEC Insider Tracker。兩次體驗都驗證了同一件事：**SDD（Specification-Driven Development）能有效消除 AI 幻覺，產出高品質程式碼。**

但這兩套工具有個共同特點：它們在**規格定義階段**都需要**人類深度參與**。你得寫 Prompt、確認規格、檢視任務清單、在關鍵節點做判斷（雖然實作階段可以自動化執行）。

然後我看到了 **Superpowers** —— 一套在 GitHub 上擁有 195k Stars 的「AI 開發方法論框架」。它的核心承諾是：

> 安裝後，你的 AI agent 會自動遵循嚴謹的軟體開發流程。以 Claude Code 為例，它可以自主運行數小時不偏離計畫。

這聽起來太美好了。身為一個實測過多套 SDD 工具的開發者，我決定用一個中等複雜度的專案 —— **2048 遊戲** —— 來完整體驗 Superpowers 的全流程，並誠實記錄它的威力與代價。

---

## Superpowers 是什麼？

**Superpowers 不是一個程式庫，而是一套給 AI coding agent 使用的技能框架與軟體開發方法論。**

它的核心設計哲學是：產出的實施計畫必須明確到連一個「充滿熱情但沒品味、沒判斷力、沒有專案上下文、且討厭寫測試的 Junior Engineer」都能照著走。因此用大量流程和 guardrails 來確保產出品質，並強調 TDD、YAGNI（You Aren't Gonna Need It）和 DRY 原則。

### 核心 Skills（技能）

以下列出本次實戰中觸發的主要 skills（完整列表見[官方文件](https://github.com/obra/superpowers)）：

| 類別     | Skill                          | 用途                                    |
| -------- | ------------------------------ | --------------------------------------- |
| **協作** | brainstorming                  | Socratic 式設計問答，釐清需求           |
| **協作** | writing-plans                  | 將設計拆解成 2-5 分鐘的原子任務         |
| **協作** | subagent-driven-development    | 每個 task 派 subagent 執行 + 兩階段審查 |
| **協作** | executing-plans                | 批次執行任務並設置檢查點                |
| **協作** | finishing-a-development-branch | 任務完成後決定 merge/PR/保留/捨棄       |
| **測試** | test-driven-development        | 強制 RED-GREEN-REFACTOR                 |
| **除錯** | systematic-debugging           | 4 階段根因分析                          |
| **除錯** | verification-before-completion | 完成前驗證                              |
| **協作** | using-git-worktrees            | 隔離開發分支                            |

### 自動觸發機制

Superpowers 的 skills 不需要你手動呼叫。Agent 會根據當前上下文**自動判斷**該啟用哪個 skill：

- 看到你要建功能 → 自動觸發 `brainstorming`
- 設計確認後 → 自動觸發 `using-git-worktrees`（建立隔離 workspace）
- 接著觸發 `writing-plans`
- 開始實作 → 自動觸發 `test-driven-development`
- Task 之間 → 自動觸發 `requesting-code-review`
- 遇到 Bug → 自動觸發 `systematic-debugging`

---

## 環境安裝：Gemini CLI + Superpowers

### 前置條件

- [Gemini CLI](https://github.com/google-gemini/gemini-cli) 已安裝並登入
- Git 已初始化的專案目錄

### 安裝 Superpowers Extension

```bash
gemini extensions install https://github.com/obra/superpowers
```

安裝過程中，它會列出所有即將安裝的 Agent Skills，並警告這個 extension 包含可自動執行的 Hooks：

{% include figure.liquid path="assets/img/superpowers_installation.png" title="Superpowers 安裝過程：列出所有 skills 與 hooks 警告" %}

安裝完成後，所有 skills 會存放在 `~/.gemini/extensions/superpowers/skills/` 目錄下。

---

## 實戰：用 Superpowers 做 2048 遊戲

### 第一步：啟動 Gemini CLI 並輸入需求

在專案目錄中啟動 Gemini CLI，直接用自然語言描述需求：

```
我想做一個 2048 遊戲。用 React + TypeScript + Vite。
要有滑動動畫、分數系統、最高分記錄（localStorage）、
Game Over 和 Win 判斷、支援鍵盤方向鍵和手機觸控滑動。
```

輸入後，Superpowers 立刻自動觸發了兩個 skills：

1. **using-superpowers** — 建立 skill 系統的使用方式
2. **brainstorming** — 在寫任何 code 之前，先釐清需求

每個 skill 觸發時都會彈出 **"Action Required"** 確認框，你可以選擇 `Allow once`、`Allow for this session` 或拒絕：

{% include figure.liquid path="assets/img/superpowers_using_superpowers.png" title="自動觸發 using-superpowers skill" %}

{% include figure.liquid path="assets/img/superpowers_brainstorming.png" title="自動觸發 brainstorming skill，載入 Socratic 設計問答資源" %}

---

### 第二步：Brainstorming — Socratic 式設計問答

進入 brainstorming 階段後，AI **不會直接寫 code**，而是開始問你一系列設計問題。這是 Superpowers 最核心的價值之一：

**問題 1：視覺風格**

AI 在本地啟動了一個 HTTP server（`localhost:54715`），用 HTML 展示了三種視覺方案的 mockup，讓你選擇：

- 經典 (Classic) — 米色/棕色調
- 現代暗黑 (Modern Dark)
- 極簡亮色 (Minimalist Light)

{% include figure.liquid path="assets/img/superpowers_brainstorming_q_1_result.png" title="Brainstorming：視覺風格選擇，透過本地 HTTP server 展示 mockup" %}

**問題 2：棋盤大小**

```
接著，我想確認一下遊戲的棋盤大小。雖然 2048 標準是 4x4，但有些版本也支援 5x5 或更大。你希望：

1. 標準 4x4（最經典的難度與節奏）
2. 可切換大小（例如提供 3x3, 4x4, 5x5 選項）
3. 自定義大小（指定一個特定的數字，例如 5x5）
```

{% include figure.liquid path="assets/img/superpowers_brainstorming_q_2_result.png" title="Brainstorming：棋盤大小選擇" %}

**問題 3：動畫實作方式**

```
關於動畫與互動，你提到的「滑動動畫」是 2048 的靈魂。為了達到流暢的效果，你偏向哪種實作方式？

1. CSS Transitions / Animations（純手寫 CSS，輕量且效能好）
2. Framer Motion（熱門的 React 動畫庫，處理進入/離開和佈局變化非常強大且直覺）
3. React Spring（基於物理特性的動畫，感覺更自然但學習曲線稍高）
```

{% include figure.liquid path="assets/img/superpowers_brainstorming_q_3_result.png" title="Brainstorming：動畫技術選型" %}

回答完所有問題後，AI 總結了設計方向並等待確認：

> - 技術棧：React + TypeScript + Vite
> - 視覺：經典 2048 風格 (Classic)
> - 功能：支援多種棋盤大小 (3x3, 4x4, 5x5)、分數與最高分紀錄 (localStorage)、支援鍵盤與手機滑動
> - 動畫：使用純 CSS Transitions 實現流暢的移動效果

---

### 第三步：設計文檔產出

確認設計方向後，AI 自動建立了 `docs/superpowers/specs/` 目錄，並寫入正式的設計規範文檔：

{% include figure.liquid path="assets/img/superpowers_do_specs.png" title="自動產出設計文檔 2048-game-design.md" %}

產出的設計文檔結構完整，涵蓋概述、技術棧、核心功能、UI/UX 設計、實施策略與測試計劃：

```markdown
# 2048 遊戲設計規範

**日期：** 2026-05-17
**狀態：** 已批准
**技術棧：** React, TypeScript, Vite, Vanilla CSS

## 1. 概述

一個高效能、視覺忠於原著的 2048 益智遊戲。

## 2. 技術棧

- **框架：** React 18+ (TypeScript)
- **建構工具：** Vite
- **樣式：** Vanilla CSS，用於效能關鍵的動畫
- **狀態管理：** 使用 `useReducer` 的自定義 Hook

## 5. 實施策略

- **數字塊唯一性 (Tile Identity)：** 每個數字塊將具有唯一的持久 ID，
  以確保 React 可以在移動過程中追蹤它，從而實現 CSS 過渡動畫。
- **移動演算法：**
  1. 過濾非空數字塊
  2. 合併相鄰的相同數字塊
  3. 移至目標方向
  4. 與先前狀態進行比較，以確定移動是否有效
```

---

### 第四步：實施計畫撰寫

確認設計文檔後，Superpowers 自動觸發 **writing-plans** skill，產出詳細的實施計畫：

{% include figure.liquid path="assets/img/superpowers_do_plan.png" title="自動觸發 writing-plans skill，產出實施計畫" %}

計畫將整個開發拆解為 6 個 Tasks，每個 Task 包含明確的檔案路徑、步驟和驗證方式：

```markdown
# 2048 遊戲實施計劃

**Goal:** 使用 React + TypeScript + Vite 建立一個支援多種棋盤大小、
具備平滑 CSS 動畫與最高分持久化的經典 2048 遊戲。

### Task 1: 專案初始化與建構環境

### Task 2: 定義核心類型與遊戲邏輯 (Game Engine)

### Task 3: 實作移動與合併邏輯

### Task 4: 建立 GameBoard 與 Tile 組件 (UI 層)

### Task 5: 輸入監聽與狀態整合 (Hooks)

### Task 6: 分數持久化與 UI 優化
```

---

### 第五步：Subagent-Driven Development

計畫確認後，AI 詢問執行方式：

> 1. **子代理驅動 (Subagent-Driven, 推薦)** — 我會為每個任務分派一個全新的子代理，任務之間我會進行審查，迭代速度快。
> 2. **內聯執行 (Inline Execution)** — 在當前會話中直接執行任務，並在關鍵點設定檢查站供你審查。

選擇 Subagent-Driven 後，Superpowers 載入了三個關鍵 prompt：

- `implementer-prompt.md` — 指導 subagent 如何實作
- `spec-reviewer-prompt.md` — 規格合規性審查
- `code-quality-reviewer-prompt.md` — 程式碼品質審查

{% include figure.liquid path="assets/img/superpowers_subagent.png" title="Subagent-Driven Development 啟動，載入實作與審查 prompts" %}

接著選擇 `Yes, automatically accept edits` 進入全自動模式：

{% include figure.liquid path="assets/img/superpowers_implement.png" title="確認計畫並選擇自動接受編輯" %}

---

### 第六步：TDD 與任務逐步完成

每個 Task 的執行過程中，Superpowers 會：

1. **派出 Subagent** 執行任務
2. 完成後更新 `todo.md`（打勾）
3. **重新觸發 skills** —— 這是最讓人感受到「儀式感」的地方

Task 1 完成後，可以看到 `todo.md` 被更新，同時 subagent 又重新要求啟用 `writing-plans` 和 `test-driven-development` skills：

{% include figure.liquid path="assets/img/superpowers_task1.png" title="Task 1 完成，todo.md 更新" %}

{% include figure.liquid path="assets/img/superpowers_task1_tdd.png" title="每個新 task 都會重新要求 Activate Skill（TDD、brainstorming 等）" %}

Task 2 完成後，同樣的 pattern 再次出現 —— Agent Completed → Edit todo.md → Activate Skills → 下一個 Task：

{% include figure.liquid path="assets/img/superpowers_task2.png" title="Task 2 完成，又觸發新一輪的 skill 確認" %}

到 Task 3-4 時，可以看到 `todo.md` 逐步打勾，subagent 自動 commit 並推進：

{% include figure.liquid path="assets/img/superpowers_task3_4.png" title="Task 3-4 完成，自動 git commit 並更新進度" %}

---

### 第七步：Bug 修復 — systematic-debugging

所有 Task 完成後，我在瀏覽器中查看結果，發現了一個 Bug：**所有 Tile 全部重疊在左上角 (0, 0) 位置**。

向 AI 報告：

```
遊戲有 bug，我發現 UI 位置完全錯誤，全部集中在左上角
```

Superpowers 立刻自動觸發 **systematic-debugging** skill，載入了完整的除錯工具箱：

{% include figure.liquid path="assets/img/superpowers_bugfix1.png" title="自動觸發 systematic-debugging skill，4 階段根因分析" %}

經過分析，AI 找到了根因：

> **問題原因：** 在 React 的 `style` 物件中直接定義 CSS 變數（如 `--tile-size`）時，TypeScript 的類型定義有時會導致這些自定義屬性未能正確渲染到 DOM 中，使得所有 Tile 的位置計算失效，最終全部重疊在 (0, 0) 位置。

修復後自動 commit 並 push：

{% include figure.liquid path="assets/img/superpowers_bugfix2.png" title="Bug 修復完成，自動 commit 並 push 到 origin/main" %}

---

## 程式碼成果展示

讓我們看看 Superpowers 實際產出的程式碼品質。

### 核心類型定義

```typescript
// src/types/index.ts
export interface Tile {
  id: number;
  value: number;
  position: [number, number]; // [row, col]
  mergedFrom?: [Tile, Tile];
}

export interface GameState {
  tiles: Tile[];
  score: number;
  bestScore: number;
  size: number;
  status: "playing" | "won" | "over";
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
```

### 核心遊戲邏輯 — 移動與合併

Superpowers 產出的移動演算法採用了「旋轉歸一化」策略 —— 將所有方向的移動都轉換為「向左移動」後統一處理：

```typescript
// src/logic/gameLogic.ts
export const moveRow = (row: (Tile | null)[]): { newRow: (Tile | null)[]; scoreIncrease: number } => {
  const filteredRow = row.filter((tile): tile is Tile => tile !== null);
  const newRow: (Tile | null)[] = [];
  let scoreIncrease = 0;

  for (let i = 0; i < filteredRow.length; i++) {
    if (i + 1 < filteredRow.length && filteredRow[i].value === filteredRow[i + 1].value) {
      const mergedValue = filteredRow[i].value * 2;
      scoreIncrease += mergedValue;
      newRow.push({
        ...filteredRow[i],
        value: mergedValue,
        mergedFrom: [filteredRow[i], filteredRow[i + 1]],
      });
      i++; // Skip the next tile as it's merged
    } else {
      newRow.push({ ...filteredRow[i], mergedFrom: undefined });
    }
  }

  while (newRow.length < row.length) {
    newRow.push(null);
  }
  return { newRow, scoreIncrease };
};

export const moveTiles = (state: GameState, direction: Direction): { newState: GameState; hasMoved: boolean } => {
  const { tiles, size, score, bestScore } = state;

  // 1. Convert flat tiles to 2D grid
  const grid: (Tile | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  tiles.forEach((tile) => {
    grid[tile.position[0]][tile.position[1]] = tile;
  });

  // 2. Rotate grid to normalize to "Move Left"
  const rotationsMap: Record<Direction, number> = { LEFT: 0, DOWN: 1, RIGHT: 2, UP: 3 };
  const rotations = rotationsMap[direction];
  const normalizedGrid = rotateGrid(grid, rotations);

  // 3. Move each row
  let totalScoreIncrease = 0;
  const movedGrid = normalizedGrid.map((row) => {
    const { newRow, scoreIncrease } = moveRow(row);
    totalScoreIncrease += scoreIncrease;
    return newRow;
  });

  // 4. Rotate back and update state
  const finalGrid = rotateGrid(movedGrid, (4 - rotations) % 4);
  // ... (convert back to tiles, check win/loss, spawn new tile)
};
```

### 狀態管理 — useGame Hook

```typescript
// src/hooks/useGame.ts
export const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "MOVE": {
      if (state.status !== "playing") return state;
      const { newState, hasMoved } = moveTiles(state, action.direction);
      if (!hasMoved) return state;
      if (newState.bestScore > state.bestScore) {
        localStorage.setItem(BEST_SCORE_KEY, newState.bestScore.toString());
      }
      return newState;
    }
    case "RESTART": {
      const bestScore = getInitialBestScore();
      return { ...initGame(state.size), bestScore };
    }
    case "CONTINUE": {
      return { ...state, status: "playing" };
    }
    case "CHANGE_SIZE": {
      const bestScore = getInitialBestScore();
      return { ...initGame(action.size), bestScore };
    }
    default:
      return state;
  }
};
```

### TDD 測試 — Superpowers 強制產出

```typescript
// src/logic/gameLogic.test.ts
describe("moveRow", () => {
  it("should slide tiles to the left", () => {
    const row = createRow([null, 2, null, 2]);
    const { newRow } = moveRow(row);
    expect(getValues(newRow)).toEqual([4, null, null, null]);
  });

  it("should not merge a tile twice in one move", () => {
    const row = createRow([2, 2, 4, null]);
    const { newRow } = moveRow(row);
    expect(getValues(newRow)).toEqual([4, 4, null, null]);
  });

  it("should handle triple identical tiles", () => {
    const row = createRow([2, 2, 2, null]);
    const { newRow } = moveRow(row);
    expect(getValues(newRow)).toEqual([4, 2, null, null]);
  });
});

describe("moveTiles", () => {
  it("should set status to won when 2048 is reached", () => {
    const state = {
      tiles: [createTile([0, 0], 1024), createTile([0, 1], 1024)],
      score: 0,
      bestScore: 0,
      size: 4,
      status: "playing" as const,
    };
    const { newState } = moveTiles(state, "LEFT");
    expect(newState.status).toBe("won");
  });
});
```

### Git Commit History

Superpowers 自動產出的 commit 記錄，結構清晰，每個 task 對應一個 commit：

```
95edcf4 Merge branch 'main' into release
1b8b99c fix: correct tile translation logic using percentage of element size
8dd9446 fix: correct tile positioning and CSS variable injection
0705174 chore: ignore .superpowers directory
556a89d feat: persist game state and polish UI
b69aaab fix: hook performance and win/loss UI logic
94a923b feat: integrate game state with input listeners
e1bcbb4 feat: implement useGame hook
381411e fix: support dynamic grid sizes in GameBoard and Tile
3b65097 feat: create GameBoard and Tile components with CSS animations
f74fe6f feat: implement move and merge logic
2a59acd feat: define core types and initial game logic
b2cb574 chore: project initialization with Vite, React, and TypeScript
b822464 Initial commit
```

---

## 深度評價：Superpowers 的優缺點

### ✅ 優點

**1. 全自動流程，零手動觸發**

你不需要記住任何指令或 workflow。只要安裝好 Superpowers，AI 會在對的時機自動啟用對的 skill。這對不熟悉開發流程的人來說是巨大的降低門檻。

**2. 強制 TDD，不允許跳過測試**

每個 Task 都必須先寫測試再寫實作。如果你偷偷先寫 code，它會刪掉重來。這確保了產出的程式碼都有測試覆蓋。

**3. 自動 Commit 與進度追蹤**

每完成一個 Task 就自動 `git commit`，並更新 `todo.md` 的 checkbox。你可以隨時看到進度。

**4. Subagent 兩階段審查**

每個 subagent 完成後，會經過：

1. 規格合規性檢查（是否符合 spec）
2. 程式碼品質檢查（是否符合 best practices）

這提供了超越一般 AI coding 的品質保障。

**5. systematic-debugging 根因分析**

遇到 Bug 時，不是瞎猜修改，而是走 4 階段流程（觀察 → 假設 → 驗證 → 修復）。我的 CSS 定位 Bug 就是被這個 skill 精準定位的。

---

### ❌ 缺點

**1. Token 消耗巨大**

這是最顯著的問題。每個 Task 都是一個完整的 agent session：

- Subagent 啟動（帶完整 context + skill instructions）
- 兩階段 review（又是新的 agent 呼叫）
- Task 之間還有 code review

一個 6 步的計畫，實際觸發 20-30+ 次 LLM 呼叫。Token 消耗是 Spec Kit/OpenSpec 的 **3-5 倍**。

**2. 執行速度慢**

因為每個小任務都走完整的 ceremony：

```
Task N → Activate Skills (等待確認) → TDD → 寫測試 → 跑測試 → 寫碼
  → 跑測試 → commit → review → 更新 todo → 下一個 Task → 又 Activate Skills...
```

2048 這種複雜度的專案，用 Spec Kit 可能 20 分鐘搞定，Superpowers 花了超過 1 小時。

**3. 儀式感過重 — "Action Required" 疲勞**

這是我最大的痛點。**每個 Task 開始時，Superpowers 都會重新要求啟用 2-4 個 Skills**，每個都彈出 "Action Required" 確認框。6 個 Tasks 下來，我點了超過 15 次 "Allow once"。

即使選了 `Allow for this session`，subagent 因為是全新的 session，下次還是會重新觸發。這嚴重打斷了「全自動」的承諾。

**4. 缺乏 UI 細節控制**

Superpowers 專注在邏輯正確性（TDD 保障），但對 UI 的視覺細節幾乎沒有把關機制。我的 Tile 定位 Bug 就是在所有 Task 完成後才被手動發現的。如果不是我自己去看畫面，它會認為「所有測試通過 = 任務成功」。

**5. 完成後仍需人工調整**

雖然承諾「全自動」，但現實是：

- 視覺效果需要手動檢查
- CSS 動畫的微調（timing、easing）需要人工判斷
- 響應式佈局需要在不同裝置上測試

**Superpowers 只保障了「邏輯正確性」，無法保障「產品完成度」。**

---

## 三大 SDD 工具深度比較

| 維度                | Spec Kit                                                                | OpenSpec                                                      | Superpowers                                                    |
| :------------------ | :---------------------------------------------------------------------- | :------------------------------------------------------------ | :------------------------------------------------------------- |
| **核心理念**        | 規格精確定義，消除 AI 幻覺                                              | 構件引導 (Artifact-guided)，流動式迭代                        | 全自動方法論，skills 自動觸發                                  |
| **工作流模式**      | 線性指令：constitution → specify → (clarify) → plan → tasks → implement | 構件引導：propose → apply → archive（可隨時回頭修改任何構件） | 自動觸發循環：brainstorming → spec → plan → subagent execution |
| **人類角色**        | 主導者 — 規格階段由你深度參與，實作可自動化                             | 審核者 — 確認每個構件後推進                                   | 旁觀者 — 確認設計後放手                                        |
| **Token 效率**      | ⭐⭐⭐⭐⭐ 最省，規格完就一次性實作                                     | ⭐⭐⭐⭐ 省，構件間有重複但可控                               | ⭐⭐ 最耗，每個 task 都是完整 session                          |
| **執行速度**        | ⭐⭐⭐⭐⭐ 最快                                                         | ⭐⭐⭐⭐ 快                                                   | ⭐⭐ 最慢                                                      |
| **人類控制感**      | ⭐⭐⭐⭐⭐ 完全控制                                                     | ⭐⭐⭐⭐ 高（可隨時修改構件）                                 | ⭐⭐ 低（放手後難介入）                                        |
| **品質保證方式**    | 靠你在規格層定義清楚                                                    | 靠構件間的約束 + 人類審核                                     | 靠 TDD + subagent 兩階段審查                                   |
| **TDD 強制性**      | 可選（在 constitution 中定義）                                          | 可選（在 rules 中定義）                                       | 強制（skill 自動觸發，不可跳過）                               |
| **自動 Commit**     | 部分自動（自動建 branch，commit 需手動）                                | ❌ 手動控制                                                   | ✅ 每個 task 自動 commit                                       |
| **Bug 修復機制**    | 無特殊機制                                                              | 無特殊機制                                                    | systematic-debugging 4 階段分析                                |
| **適合場景**        | 中小型專案、需要精確控制、注重效率                                      | 跨技術棧整合系統、團隊協作、需要文件追溯                      | 大型專案放手不管、不想思考流程、全自動需求                     |
| **不適合場景**      | 需要長時間無人值守的大型任務                                            | 小腳本、簡單功能                                              | 注重效率、Token 敏感、需要 UI 精修                             |
| **學習曲線**        | 低 — 幾個指令就上手                                                     | 中 — 需理解構件間關係                                         | 最低 — 安裝完就自動運作                                        |
| **產出物管理**      | .specify/ 目錄（specs + plans + tasks）                                 | openspec/ 目錄（自動封存歸檔）                                | docs/superpowers/（specs + plans）                             |
| **支援的 AI Agent** | 30+ 個（Copilot, Claude Code, Gemini CLI, Cursor, Codex, Kiro 等）      | 25+ 個（Claude Code, Gemini CLI, Cursor, Copilot 等）         | Claude Code, Gemini CLI, Codex, Cursor, Copilot, OpenCode 等   |
| **GitHub Stars**    | ~101k                                                                   | ~49k                                                          | ~195k                                                          |

---

### 誰適合用 Superpowers？

**✅ 適合：**

- 想要「完全放手」讓 AI 自主開發的人
- 不擅長規劃開發流程的初學者
- 大型專案中「規格已確定，只需要執行」的階段
- 重視 TDD 但懶得自己強制執行的人

**❌ 不適合：**

- Token 預算有限的開發者
- 喜歡掌控細節、隨時調整方向的人
- 追求效率的專業開發者
- UI/UX 重度依賴視覺效果的專案
- 需要快速迭代原型的場景

---

## 結語：選擇適合自己的 SDD 工具

經過三套工具的實戰體驗，我的建議是：

> **沒有最好的工具，只有最適合場景的工具。**

| 你的需求                       | 推薦工具                                      |
| :----------------------------- | :-------------------------------------------- |
| 快速出活、Token 敏感           | **Spec Kit**                                  |
| 跨技術棧整合、需要文件追溯     | **OpenSpec**                                  |
| 想完全放手、不介意等待         | **Superpowers**                               |
| 混合模式（規格用 A，執行用 B） | Spec Kit/OpenSpec 做規格 + Superpowers 做執行 |

對我個人而言，Superpowers 的「全自動」更像是一個 **trade-off**：你用 **Token 和時間** 換取 **不用思考流程** 的便利。如果你享受掌控感並追求效率，Spec Kit 或 OpenSpec 仍然是更實用的選擇。

但如果你想體驗「AI 完全自主開發」的未來感，Superpowers 確實展示了這個方向的可能性 —— 只是目前的代價還有點高。

---

### 💡 互動與分享

你試過 Superpowers 嗎？你覺得「全自動」和「人在迴圈」哪種模式更適合你的工作流？

**歡迎在下方留言分享你的體驗！**

---

### 🎮 成果展示

{% include figure.liquid path="assets/img/superpowers_2048_game.png" title="2048 遊戲成果畫面" %}

[**👉 線上試玩 2048 遊戲**](https://nickhuangcyh.github.io/2048-game/) | [**GitHub Repo**](https://github.com/nickhuangcyh/2048-game)

### 📚 系列文章

- [Spec Kit + SDD 實作圍棋小遊戲](https://nickhuangcyh.github.io/blog/2026/speckit-sdd-go-game/)
- [OpenSpec 構件驅動實作 SEC Insider Tracker](https://nickhuangcyh.github.io/blog/2026/openspec-sdd-insider-tracker/)
