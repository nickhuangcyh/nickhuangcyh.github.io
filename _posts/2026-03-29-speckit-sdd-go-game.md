---
layout: post
title: "別再用 Vibe Coding 寫玩具了，透過 SDD 開發模式利用 SpecKit 實作圍棋小遊戲，讓 AI 不再產生幻覺"
date: 2026-03-29 21:00:00 +0800
description: "探討工作上常見的 Spec 規劃痛點，並透過 Speckit 結合 SDD (Specification-Driven Development) 開發模式，精準引導 AI 實作圍棋與形勢判斷功能，告別 Vibe Coding 的幻覺問題。"
tags: [AI, SDD, Speckit, React, LLM, Agent]
categories: [AI, Software Engineering]
toc:
  sidebar: right
thumbnail: /assets/img/vibe_coding_vs_sdd_speckit.svg
---

{% include figure.liquid path="assets/img/vibe_coding_vs_sdd_speckit.svg" title="vibe-vs-sdd" %}

## 前言：為什麼我們需要 SDD？

在軟體開發的日常中，你是否也常遇到這樣的場景？PM 開了需求 Spec 給軟體工程師，工程師實作到一半才發現 Spec 邏輯有漏洞，於是回頭跟 PM 討論。如果只是小地方還好，但遇到核心邏輯的衝突，往往會導致整個功能做白工、打掉重練。

有經驗的軟體工程師（像是 SA 或 Staff Engineer），通常能在 PM 開完 Spec 後，先針對軟體進行架構設計與技術規劃，並在必要時與 PM 釐清邊界條件，藉此節省不必要的開發資源浪費。然而，現實是大部分的公司並沒有 SA 或 Staff Engineer 這樣的專職角色。通常需求一下來，伴隨的就是緊迫的 deadline，直接壓在工程師身上。

工程師迫於時程壓力，根本沒有時間好好做軟體設計，只能硬著頭皮直接動手。這往往導致後期產出擴充性極差的義大利麵條程式碼（Spaghetti Code）。更慘的是，如果在 deadline 前遇到技術瓶頸，或是跟 PM 溝通 Spec 沒寫到的 edge cases 時，PM 又大筆一揮修改 Spec，工程師前面的努力瞬間化為烏有。

> 工作上常常遇到 Spec 不夠詳細、缺乏全面性思考的問題，根本原因在於開需求的客戶或 PM 並沒有技術背景。在專案時程的壓力下，團隊常常邊設計邊實作，最後才發現技術原理與原 Spec 設想的完全不同，只好再重新討論與修改。

這也是為什麼我開始推崇 **SDD (Specification-Driven Development，規格驅動開發)**。

雖然現在很流行 Vibe Coding（用自然語言直接叫 AI 寫扣），它在解決簡單問題或寫寫小腳本時確實很爽，但在處理「較複雜的業務邏輯」時，Vibe Coding 常常會出現嚴重的**幻覺 (Hallucination)**，寫出看似合理但根本無法運作的程式碼。

### 為什麼 Vibe Coding 在這行不通？

在動手之前，我們先快速對比一下兩種開發思維的差異：

| 維度           | Vibe Coding (隨興自然語言)                   | SDD + SpecKit (規格驅動)                         |
| :------------- | :------------------------------------------- | :----------------------------------------------- |
| **邏輯正確性** | 經常出現「幻覺」，遺漏打劫、禁入點等邊界規則 | **嚴謹定義**，AI 必須根據 `spec.md` 實作所有規則 |
| **程式碼品質** | 邏輯與 UI 混雜，產生「義大利麵條」程式碼     | **DDD 架構**，核心邏輯 (Core) 與 UI 徹底分離     |
| **擴充性**     | 改一個 Bug 壞三個功能，後期維護是災難        | **任務清單清晰**，新增「形勢判斷」等複雜功能極快 |
| **開發心法**   | 靠運氣 (Hope-driven)                         | **靠設計 (Design-driven)**                       |

而 Github 推出的 **Speckit** 工具，其最強大的地方就在於 `clarify` 階段。它能在開發前期，透過 AI 幫助我們快速 Brainstorming，補足 PM 對技術不熟悉而遺漏的細節。我們可以先透過 Speckit 產生出**「兼具業務需求與技術考量」的完美 Spec**，再讓 AI Agent 去實作。這不僅大幅減少了溝通成本與做白工的風險，也讓未來的程式碼維護變得更加便利。

今天這篇文章，我將示範如何不寫一行 Code，透過 SDD 模式與 SpecKit，實作一個包含「算氣、提子、打劫」且帶有「形勢判斷 (Territory Estimation)」功能的純前端圍棋小遊戲。

---

## 實戰：用 Speckit 打造純前端圍棋引擎

### 環境安裝與初始化

首先，我們需要安裝 Speckit 並初始化專案：

```bash
# 安裝 specify-cli
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 初始化專案，這裡我指定使用 gemini 模型
specify init go-game-react --ai gemini
```

{% include figure.liquid path="assets/img/speckit_ssd_go_game_1.png" title="speckit_ssd_go_game_1" %}

### Speckit 指令快速地圖

在進入實戰前，我們認識 Speckit 的核心與進階指令。這套工具不僅能產出代碼，更重要的是它提供了完整的**品質驗證機制**：

| 指令 (Command)          | 官方定義 (Description)          | 在 SDD 中的角色                                    |
| :---------------------- | :------------------------------ | :------------------------------------------------- |
| **核心流程**            |                                 |                                                    |
| `/speckit.constitution` | Create governing principles     | **專案憲法**：定義開發守則與架構規範               |
| `/speckit.specify`      | Define what you want to build   | **需求定義**：描述業務邏輯與用戶故事               |
| `/speckit.plan`         | Create technical plans          | **技術規劃**：選定技術棧並制定實作路徑             |
| `/speckit.tasks`        | Generate actionable task lists  | **任務拆解**：將計畫轉化為可執行的任務             |
| `/speckit.implement`    | Execute all tasks               | **自動實作**：讓 AI 根據任務清單撰寫代碼           |
| **進階檢核 (推薦)**     |                                 |                                                    |
| `/speckit.clarify`      | Clarify underspecified areas    | **需求釐清**：在 Plan 之前挖掘潛在幻覺與邊界條件   |
| `/speckit.analyze`      | Consistency & coverage analysis | **一致性分析**：檢查任務是否完整覆蓋了規格需求     |
| `/speckit.checklist`    | Generate quality checklists     | **品質檢核**：像「需求層級的單元測試」確保邏輯無誤 |

接下來，我們就按照這個順序，一步步實作出我們的圍棋小遊戲。

---

### 第一步：`/speckit.constitution` (建立專案憲法與治理原則)

👉 **這是做什麼**： 根據官方定義，這是用來**建立或更新專案的治理原則 (Governing Principles)**。我們不寫任何功能，而是定義「這個專案的程式碼品質、開發守則與架構規範」。因為我們要展示 SDD 的嚴謹性，所以這裡的重點是「強型別」、「測試驅動 (TDD)」以及「UI 與邏輯絕對分離」。

```text
/speckit.constitution Create project principles focused on strict Domain-Driven Design (DDD). Rule 1: Absolute separation of Core Logic and UI. Core game logic must be pure functions with zero UI dependencies. Rule 2: Strict TypeScript typing. Use interfaces and types for all entities (Board, Stone, Group, Position). No `any` types. Rule 3: Test-Driven Development (TDD) approach for all algorithmic logic, especially graph traversal for graph algorithms. Rule 4: Predictable state management without mutation.
```

---

### 第二步：`/speckit.specify` (定義功能規格與業務邏輯) —— 🌟 這裡要寫圍棋規則！

👉 **這是做什麼**： 這是 SDD 最精華的一步。在這裡你要詳細描述「你要做什麼」，**絕對不要**在這裡提到 React、Vite 或任何技術框架。我們要把圍棋最複雜的規則（算氣、提子、打劫）在這裡用清晰的邏輯定義出來，讓 AI 寫入 `spec.md`。

```text
/speckit.specify Develop a local two-player Go (Weiqi / Baduk) game engine. The game consists of a 19x19 grid board. Two players (Black and White) take turns placing one stone on an empty intersection.

Core Rules to specify:
1. Liberties (氣): A stone or a connected group of stones of the same color must have at least one orthogonally adjacent empty point (Liberty) to remain on the board.
2. Capture (提子): If a stone is placed so that an adjacent enemy group's liberties are reduced to zero, that enemy group is removed from the board.
3. Suicide Rule (禁入點): A player cannot place a stone that would result in their own group having zero liberties, UNLESS that placement simultaneously captures an enemy group (opening up a liberty).
4. Ko Rule (打劫): A player may not make a move that returns the board to the exact same state it was in prior to their opponent's last move.

The application should track the current turn, captured stones count for both colors, and allow passing a turn. The game ends when both players pass consecutively.
```

---

### 第三步：`/speckit.clarify` —— 當 AI 開始「教你做事」 🌟

👉 **這是做什麼**：
在 AI 幫你寫好 `spec.md` 之後，這個指令會讓 AI **釐清 (Clarify) 需求中的模糊地帶**。這是整場開發中最令我驚艷的環節。Speckit 並沒有急著去寫 Code，而是透過 `clarify` 針對圍棋這項高度複雜的運動，向我拋出了幾個**連資深開發者都可能遺漏的邊界問題**：

> **AI 反問我的關鍵細節：**
>
> 1. 「關於『打劫』，我們是否需要記錄全域的棋盤狀態來防止無限循環？」
> 2. 「計分方式要採中國規則（子空皆地）還是日本規則（地多為勝）？這會影響核心演算法。」
> 3. 「當棋盤填滿且雙方連續停手時，是否需要自動觸發結算邏輯？」

這些問題顯示了 **SDD 的核心價值：在還沒寫下任何一行 Bug 之前，就把潛在的需求模糊地帶徹底剷除。** AI 在這個階段化身為你的 **Senior SA (系統分析師)**，幫你把關規格的嚴密性。

```text
/speckit.clarify
```

_(執行後，AI 會問你幾個問題，你可以簡單回答：`No handicaps for now. Use area scoring (Chinese rules) as a basic implementation.` 這樣就能過關。)_

這個步驟非常棒，AI 幫助我在這個階段想到了很多技術與需求方面的邊界問題（例如：是否支援悔棋？是否需要持久化儲存？）：

{% include figure.liquid path="assets/img/speckit_ssd_go_game_2.png" title="speckit_ssd_go_game_2" %}

{% include figure.liquid path="assets/img/speckit_ssd_go_game_3.png" title="speckit_ssd_go_game_3" %}

{% include figure.liquid path="assets/img/speckit_ssd_go_game_4.png" title="speckit_ssd_go_game_4" %}

{% include figure.liquid path="assets/img/speckit_ssd_go_game_5.png" title="speckit_ssd_go_game_5" %}

{% include figure.liquid path="assets/img/speckit_ssd_go_game_6.png" title="speckit_ssd_go_game_6" %}

---

### 第四步：`/speckit.plan` (制定純前端技術計畫)

👉 **檢查重點**： 我們要用最強烈的語氣告訴 AI：「不准寫後端！」所有狀態（棋盤、提子數量、輪到誰）都只存在瀏覽器的記憶體（React State）裡。

```text
/speckit.plan Architect this as a 100% Client-Side strictly static Single Page Application (SPA) using React, TypeScript, and Vite. The deployment target is GitHub Pages.

CRITICAL ARCHITECTURE CONSTRAINTS:
1. NO BACKEND, NO DATABASE, NO APIs, NO WEBSOCKETS. Zero server-side code.
2. Multiplayer Mode: Local Hot-Seat only. Both Black and White players play on the exact same physical device/browser, taking turns clicking the board.
3. State Management: All game state (board grid, captured stones, turn history for the Ko rule) must live entirely in browser memory using standard React Hooks (useState, useReducer).
4. Core Engine (`src/core/`): Must be pure TypeScript containing only the Go game rules (liberties, capture, Ko) with absolutely no DOM, UI, or network dependencies.
5. Build output must be a simple static `dist` folder compatible with GitHub Pages static hosting.
```

---

### 第五步：`/speckit.tasks` (產生可執行的任務清單)

👉 **這是做什麼**： 根據官方定義，這是**為實作生成可操作的任務列表 (Actionable Task Lists)**。當你輸入 `/speckit.tasks` 後，AI 會生成一份 `tasks.md` 檔案。這時候請你**務必**打開這個檔案看一眼。

- ✅ **正常情況**： 任務應該專注在建立 `types.ts`、實作核心演算法（算氣、打劫）、寫 Unit Test，最後才是 React 元件（Board, Stone）。
- ❌ **異常情況（需退件）**： 如果你在 `tasks.md` 裡面看到類似 `Setup Express server`、`Create API endpoints` 或是 `Configure database`，請立刻向 AI 反應：`This is a frontend-only app, remove all backend/server tasks and regenerate the plan.`

> 💡 **進階技巧：`/speckit.analyze`**
> 在執行下一步實作之前，我強烈建議執行 `/speckit.analyze`。它會進行**一致性與覆蓋率分析**，確保你的 `tasks.md` 確實完美覆蓋了 `spec.md` 中定義的所有需求。這對於確保「圖論演算法」這種高複雜度邏輯的完整性非常有幫助。

💬 **你的 Prompt (直接輸入即可)**：

```text
/speckit.tasks
/speckit.analyze
```

---

### 第六步：`/speckit.implement` (執行任務並自動實作)

👉 **這是做什麼**： 這是最後一步，**執行所有任務以根據計畫構建功能 (Execute all tasks to build the feature)**。只要 `tasks.md` 確認都是純前端任務，這一步你就可以放心讓 AI 去寫 code 了。

> 💡 **進階技巧：`/speckit.checklist`**
> 如果你想要更極致的品質，可以在實作後使用 `/speckit.checklist`。它會生成自定義的品質核查清單，驗證需求的完整性、清晰度與一致性，就像是「針對自然語言的單元測試」。

💬 **你的 Prompt (直接輸入即可)**：

```text
/speckit.implement
```

> 💡 **進階技巧：`/speckit.checklist`**
> 如果你想要更極致的品質，可以在實作後使用 `/speckit.checklist`。它會生成自定義的品質核查清單，驗證需求的完整性、清晰度與一致性，就像是「針對自然語言的單元測試」。
> {: .notice--info}

---

### 品質驗證：SDD 不只是寫代碼，更是寫「正確的代碼」

在實作完成後，你會發現 AI 不僅寫出了 React 元件，更根據我們在 `/speckit.constitution` 中定義的 **TDD 守則**，在 `src/core/__tests__/` 目錄下生成了完整的單元測試。

執行測試指令：

```bash
npm test
```

你會看到關於「算氣、提子、打劫」的邏輯全部通過測試。這就是 SDD 的威力：**它讓 AI 產出的每一行邏輯，都有對應的測試案例來背書，徹底解決了 Vibe Coding 「跑得起來但邏輯可能有洞」的隱憂。**

---

## 為什麼 SDD 能徹底消除 AI 幻覺？

> **大師觀點：AI 幻覺的解藥，不是更多的自然語言，而是更精確的邊界定義。**

為什麼同樣是用 LLM，SDD 模式比直接對話強這麼多？

1. **上下文壓縮 (Context Compression)**：透過 `spec.md` 與 `tasks.md`，我們將原本龐大的開發任務拆解成極小、語境極度明確的「原子任務」。AI 在每一回合只需要專注於解決一個明確的邏輯問題。
2. **多重驗證鏈**：從憲法、規格、計畫到任務清單，每一層都在為下一層建立邊界（Guardrails）。
3. **消除隨機性**：當規則被白紙黑字寫在規格書中，AI 就不再需要「猜測」你的意圖，而是「執行」你的指令。

---

到這邊，基本的圍棋引擎與介面就已經完成了！

{% include figure.liquid path="assets/img/speckit_ssd_go_game_7.png" title="speckit_ssd_go_game_7" %}

---

## 進階：新增「形勢判斷 (Territory Estimation)」功能

基本的圍棋做完後，我想新增一個更硬核的功能：**形勢判斷**。

這不僅僅是畫幾個方塊在畫面上，這背後涉及的是純粹的**圖論 (Graph Theory) 演算法**。在傳統開發模式下，手寫這段邏輯（包含處理 BFS/DFS 洪水填充、判斷連通分量、處理中立區域）至少要耗費半天以上。

在 SDD 模式下，我們不直接討論代碼，而是走一次正規的擴充流程：

### 第一步：定義新功能規格 (Specify)

我們要告訴 AI，現在畫面上要多一個按鈕，而且要定義什麼叫做「領地」。

```text
/speckit.specify Add a "Territory Estimation" (形勢判斷) feature to the existing Go engine.

Requirements:
1. Add a "Toggle Territory" button to the UI.
2. When toggled ON, the board should visually display the estimated territory for both Black and White on empty intersections.
3. Visual representation: Use small square markers on the intersections (black squares for Black's territory, white squares with a dark border for White's territory), exactly like professional Go servers (e.g., Fox Weiqi).
4. Territory Rule: An empty intersection is considered Black's territory if all empty paths from it strictly lead to Black stones (it is completely enclosed by Black). The same applies to White.
5. Neutral points (Dame): If a connected group of empty intersections touches BOTH Black and White stones, it is neutral and receives no marker.
6. The game can continue to be played; if a stone is placed while the estimation is ON, the territory markers must update dynamically or the toggle should automatically turn OFF.
```

---

### 第二步：技術實作計畫 (Plan) —— 注入圖論演算法

這裡是最關鍵的！我們要求 AI 在核心邏輯層 (Core Engine) 實作一個純粹的運算邏輯，絕對不能把複雜計算塞在 React Component 裡。

```text
/speckit.plan Technical implementation for the Territory Estimation feature:

1. Core Engine (`src/core/`):
   - Add a pure function `calculateTerritory(boardState)` that returns a map or 2D array of territory ownership.
   - Algorithm: Use a **Breadth-First Search (BFS) Flood Fill algorithm**. Find all connected components of empty intersections. For each component, check the color of all adjacent stones. If adjacent to ONLY Black -> Black territory. ONLY White -> White territory. BOTH -> Neutral.

2. State Management:
   - Add an `isEstimating` boolean to the React state.
   - Calculate the `territoryMap` derived state only when `isEstimating` is true.

3. UI Layer (`src/components/`):
   - Update the Intersection/Board component to accept a `territoryOwner` prop.
   - If `territoryOwner` is 'Black', render a small CSS-styled black square (e.g., width/height 30%, background-color black) positioned at the center of the intersection.
```

> 💡 **深度思考：為什麼這裡要寫 BFS 演算法？**
> 在 SDD 模式下，我們不只是叫 AI 「加個形勢判斷」，而是明確指定使用 **BFS Flood Fill**。這是在引導 AI 選擇最合適的資料結構與演算法路徑，防止它在處理邊界情況（如中立區）時產生幻覺。
> {: .notice--info}

**結果令人震驚：** AI 僅憑這份嚴謹的規格描述，就寫出了 100% 正確的圖論實作。我們成功讓 AI 擺脫了「猜測程式碼」的幻覺，而是根據數學邏輯精準產出。

---

### 第三步：生成任務清單並檢查 (Tasks)

```text
/speckit.tasks
```

---

### 第四步：自動實作 (Implement)

```text
/speckit.implement
```

完成後的「形勢判斷」功能如下圖所示，黑白雙方的地盤一目了然！

{% include figure.liquid path="assets/img/speckit_ssd_go_game_8.png" title="speckit_ssd_go_game_8" %}

---

## 結語：Automation is about respecting your time

> "好的工程師不只是會寫程式，更是會設計系統。"

透過 Speckit 與 SDD 開發模式，我們成功將一個複雜的圍棋規則與圖論演算法，轉化為有條理的架構設計與任務清單。**這不僅僅是加快了開發速度，更是提升了開發的「確定感」。**

AI 不再像無頭蒼蠅一樣瞎猜（Vibe Coding），而是乖乖遵循我們定義好的核心領域模型（DDD）與純函數原則進行實作。如果你也在為專案初期 Spec 不清、後期架構崩壞而苦惱，不妨試試看把 Speckit 納入你的開發工作流。讓 AI 成為幫你梳理邏輯、把關技術計畫的最佳隊友吧！

### 💡 互動與分享

如果是你，你會想用 SDD 挑戰什麼樣的複雜專案？（例如：德州撲克引擎、自動化排班系統、或是更複雜的金融交易邏輯？）

**歡迎在下方留言區分享你的想法，或是訂閱我的部落格獲取更多 AI 開發實戰經驗！**
{: .notice--success}

---

### 🎮 網頁成品展示

如果你想親自體驗這個由 SDD 模式打造的圍棋小遊戲，歡迎點擊下方連結：

[**👉 點我玩圍棋遊戲 (Go Game React)**](https://nickhuangcyh.github.io/go-game-react/)
