---
layout: post
title: "告別 Vibe Coding 的架構崩壞：透過 OpenSpec 的『構件驅動』實作 SEC 追蹤器，讓 AI 成為你的資深架構師"
date: 2026-05-16 23:30:00 +0800
description: "延續 SDD (規格驅動開發) 的精神，這次我們進化到 OpenSpec 框架。透過 Proposal、Specs、Design 到 Tasks 的『構件驅動』工作流，以 SEC Insider Tracker 為例，示範如何讓 AI 穩定產出跨技術棧的複雜系統。"
tags: [AI, SDD, OpenSpec, GitHub Actions, Python, LLM, Agent]
categories: [AI, Software Engineering]
toc:
  sidebar: right
thumbnail: /assets/img/openspec_cover.png
---

{% include figure.liquid path="assets/img/openspec_cover.png" title="openspec-cover" %}

## 前言：同一個理念，不同的工具

在上一篇文章中，我用 SpecKit 走了一次完整的 **SDD (Specification-Driven Development)** 流程，讓 AI 精準寫出了圍棋引擎。那次的結論很明確：只要規格定義得夠清楚，AI 就能克服幻覺，產出高品質的程式碼。

既然 SDD 的核心理念已經驗證成功，我自然好奇：**市面上不同的 SDD 工具，在工作流設計上有什麼差異？各自適合什麼場景？**

這次我選了 **OpenSpec** 來實作一個跨技術棧的整合系統（Python + YAML + HTML/JS），目的是比較它與 SpecKit 在流程設計上的不同風格。兩者都是優秀的 SDD 框架，但切入角度不同 —— SpecKit 強調規格的精確定義，而 OpenSpec 則引入了「構件驅動 (Artifact-driven)」的分階段工作流。

以下是我在這次實作中，感受到 OpenSpec 獨特的地方：

- **強制分階段產出**：不能跳過 proposal 直接寫 code，每一步都有明確的交付物。
- **構件間有依賴關係**：specs 和 design 都依賴 proposal、tasks 依賴 specs + design，形成 DAG 結構。
- **內建封存與同步機制**：完成的 change 會被歸檔，specs 自動合併成專案的 Source of Truth。
- **流動式迭代**：在實作過程中隨時可以回頭修改任何 artifact，不像傳統瀑布模型被鎖死在某個階段。

### 從「規格驅動」到「構件驅動 (Artifact-driven)」

OpenSpec 最強大的地方在於它引入了「構件 (Artifacts)」的概念。它不再只是產出一份 `spec.md`，而是強制開發流程必須像一支專業的軟體團隊一樣，逐步產出四個關鍵檔案：

| 構件 (Artifact)   | 角色          | 解決什麼問題？                                     |
| :---------------- | :------------ | :------------------------------------------------- |
| **`proposal.md`** | 提案人        | 定義 WHY & WHAT，確立「能力 (Capabilities)」邊界。 |
| **`specs/`**      | 系統分析 (SA) | 定義每一項能力的行為守則與測試場景。               |
| **`design.md`**   | 系統設計 (SD) | 定義 HOW，確定目錄架構、資料 Schema 與技術選型。   |
| **`tasks.md`**    | 專案經理 (PM) | 將所有設計拆解成具體可追蹤的原子任務。             |

**在 `tasks.md` 產生之前，AI 被禁止寫下任何一行 Production Code。** 這種強制的設計優先（Design First）模式，徹底消滅了開發過程中的隨機性。

---

## 環境建置：安裝與設定 OpenSpec

在進入實戰案例之前，先讓我們把工具準備好。

### 1. 安裝 OpenSpec

```bash
npm install -g @fission-ai/openspec@latest
```

安裝完成後，確認版本：

```bash
openspec --version
```

### 2. 初始化專案：`openspec init`

進入你的專案根目錄，執行初始化：

```bash
cd ~/your-project
openspec init
```

初始化過程中，OpenSpec 會問你要搭配哪個 AI 工具。以我搭配 Gemini CLI 為例，選擇 `gemini`。這會在專案中產生：

- `openspec/` —— OpenSpec 的工作目錄（存放 config、changes、specs）
- `.gemini/skills/openspec-*/` —— AI Skills 檔案
- `.gemini/commands/opsx/` —— 可用的 slash commands（如 `/opsx:explore`、`/opsx:new` 等）

{% include figure.liquid path="assets/img/openspec_init_1.png" title="Init1" %}

{% include figure.liquid path="assets/img/openspec_init_2.png" title="Init2" %}

{% include figure.liquid path="assets/img/openspec_init_3.png" title="Init3" %}

### 3. 設定 Profile：`openspec config profile`

接著設定你的 delivery mode 和可用的 workflow commands：

```bash
openspec config profile
```

互動式選單會依序出現：

```
? What do you want to configure?
❯ Delivery and workflows
```

選 **Delivery and workflows**，接著設定 delivery mode：

```
✔ Delivery mode (how workflows are installed): Both (skills + commands)
```

最後勾選所有可用的 workflows（按空白鍵全選）：

```
? Select workflows to make available:
 [x] Propose change
 [x] Explore ideas
 [x] New change
 [x] Continue change
 [x] Apply tasks
 [x] Fast-forward
 [x] Sync specs
 [x] Archive change
 [x] Bulk archive
 [x] Verify change
 [x] Onboard
```

{% include figure.liquid path="assets/img/openspec_config_profile.png" title="Config Profile" %}

設定完成後，執行 `openspec update` 將選擇套用到專案：

```bash
openspec update
```

這會根據你的選擇，重新產生所有 skill/command 檔案。

### 4. 設定 Project Config

編輯 `openspec/config.yaml`，告訴 AI 你的專案上下文和規則：

```yaml
schema: spec-driven
context: |
  Tech stack: Python (scripts), Vanilla JS + Tailwind CSS (frontend)
  Data source: SEC EDGAR API (free, no API key, requires User-Agent header)
  Deployment: GitHub Pages (static site)
  Data pipeline: GitHub Actions cron job, commits JSON to repo
  Library: edgartools (Python)
  Testing: manual verification
rules:
  proposal:
    - Include SEC EDGAR API endpoint details
    - Specify GitHub Actions schedule
  specs:
    - Use Given/When/Then format for scenarios
  design:
    - Include data flow diagram
    - Specify file structure
  tasks:
    - Group by layer (pipeline / frontend / deployment)
```

**`config.yaml` 的作用**：每次 AI 產出任何 artifact 時，`context` 會自動注入到指令中，讓 AI 知道你的技術棧和慣例，不用你每次重複說明。`rules` 則針對個別 artifact 設定額外規則，確保產出符合你的品質標準。

> 💡 **簡單講：沒有 config → AI 亂猜你的 tech stack；有 config → AI 產出的東西直接符合你專案的慣例。**

---

## 實戰案例：SEC Insider Tracker (美國內部人交易追蹤器)

我的目標是建立一個追蹤系統，每天自動抓取 SEC Form 4 申報，並發布到 GitHub Pages。最硬的約束是：**零成本、無後端、無動態資料庫。**

### 第一步：`/opsx:explore` —— 架構師的腦力激盪

OpenSpec 提供了探索模式。我們不直接開工，而是先跟 AI 討論架構：

> 「SEC Form 4 資料怎麼抓最穩？GitHub Pages 沒資料庫怎麼存半年份資料？」

AI 幫我分析了 `edgartools` 庫的優缺點，並建議了 **「每日一檔 (Daily JSON Sharding)」** 的策略：每天產出一個 `YYYY-MM-DD.json` 配合一個 `index.json` 索引。這比單一大型 JSON 更適合前端讀取。

{% include figure.liquid path="assets/img/openspec_explore.png" title="Explore Mode" %}

---

### 第二步：從 Proposal 到 Design —— 確立技術藍圖

透過 `/opsx:new` 與 `/opsx:continue`，我們逐步固化了構件。在 `design.md` 中，我們下達了幾個關鍵指令：

1. **目錄結構**：嚴格區分 `scripts/` (Python), `data/` (JSON), `.github/workflows/` (Actions)。
2. **存儲策略**：只保留最近 180 天的檔案，超過的由腳本自動刪除。
3. **前端策略**：不使用複雜框架，用 Vanilla JS + Tailwind CDN，直接 fetch 靜態 JSON。

> 💡 **這就是關鍵：** 所有的「未決問題」（例如是否要做分頁、過濾功能怎麼實現）都在 Design 階段就決定好了，這防止了 AI 在實作時「自作主張」。

{% include figure.liquid path="assets/img/openspec_new.png" title="New Change" %}

{% include figure.liquid path="assets/img/openspec_continue.png" title="Continue Change" %}

---

### 第三步：`/opsx:apply` —— 按表操課的實作藝術

進入實作階段，OpenSpec 的 Agent 會讀取所有的文件作為上下文，然後開始逐一執行 `tasks.md`。

```bash
/opsx:apply setup-insider-tracker
```

在這個過程中，我們遇到了一個有趣的挑戰：SEC 的 API 在週末不更新，導致腳本抓不到資料而超時。因為我們有嚴謹的 `specs`，AI 並沒有瞎猜，而是主動暫停並跟我討論，最後我們修改了邏輯：**「自動回推三天，抓到有交易資料的最近一個交易日為止。」**

**這種「暫停 -> 討論 -> 修改構件 -> 繼續實作」的流暢度，是傳統 Vibe Coding 完全無法比擬的。**

---

### 第四步：`/opsx:archive` —— 規格即資產

當任務全部打勾後，執行封存。OpenSpec 會做一件很酷的事：它會自動將這次開發中寫的 `specs` 合併回專案的主目錄。

這意味著，隨着專案成長，你的規格書會自動變得豐富，**它是與代碼同步的、真實的開發紀錄，而不是寫完就過時的廢紙。**

{% include figure.liquid path="assets/img/openspec_insider_trading.png" title="Insider Trading" %}

---

## 結語：工程師的靈魂在於「定義」

> "Automation is not about making coding faster; it's about making correctness easier."

使用 OpenSpec 之後，我發現我花在「寫程式碼」的時間變少了，但花在「定義系統」的時間變多了。而這正是資深工程師的價值所在。

透過構件驅動的工作流，AI 不再是一個不聽話的打字員，而是一個能忠實執行你架構圖的軟體團隊。如果你也在開發稍微有點複雜度的系統，我強烈建議你放下對話框，試試看用 OpenSpec 走一次完整的 SDD 流程。

### 💡 互動與分享

如果是你，你會想用 OpenSpec 來設計什麼樣的自動化系統？是個人理財看板、自動化爬蟲、還是 AI 內容農場管理員？

**在下方留言分享你的想法，讓我們一起探索 AI 工程化的極限！**

---

### 🚀 成果展示

目前這個 SEC 內部人交易追蹤器已經穩定運作中，你可以看到這套「構件驅動」流程產出的高品質成果：

[**👉 查看 SEC Insider Tracker 實品**](https://nickhuangcyh.github.io/sec-insider-tracker/)
[**👉 參考本專案的 OpenSpec 構件紀錄**](https://github.com/nickhuangcyh/sec-insider-tracker/tree/main/openspec)
