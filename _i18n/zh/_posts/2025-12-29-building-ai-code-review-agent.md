---
layout: post
title: "從零打造 AI Code Review Agent：同步提升團隊效率與程式碼品質"
date: 2025-12-29 22:00:00 +0800
description: "本文分享運用 AI Agent 打造 AI Code Review 系統，透過自定義規則手冊實作精確的程式碼品質檢測，有效提升團隊開發效率並降低人工審核負擔。"
tags: [AI, Code Review, LLM, Agent, Automation, Software Quality]
categories: [AI, Software Engineering]
toc:
  sidebar: right
thumbnail: /assets/img/ai_code_review_agent.png
---

{% include figure.liquid path="assets/img/ai_code_review_agent.png" title="ai_code_review_agent" %}

## 從零打造 AI Code Review Agent：讓 AI 替你守護程式碼品質

在軟體開發的過程中，Code Review (CR) 絕對是提升團隊工程品質最重要的一環。但說實話，CR 也是最消耗心神的工作之一。

你是否也遇過以下場景：

1. 重複瑣碎的糾錯：每次都要提醒同事「這裡命名要用駝峰」、「這邊會造成 Memory Leak、Thread Safety 問題」、「不要用 !! 強制解包」。
2. 標準不一致：資深 A 說可以，資深 B 說不行，新人夾在中間不知所措。
3. 人眼遺漏：看了幾百行 Code 後，疲勞導致漏看了明顯的 Memory Leak 或 Thread 安全問題。
4. **互相卡住的進度瓶頸**：當自身專案時程緊迫，卻遇上同事其他產品線的大型發版請求。大量的 Review 工作不僅佔用開發時間，拖慢了自己，也因為來不及看而卡住了別人的發版進度。

最近我在 Android TouchPad 專案中實作了一個 Code Review Agent，目標很簡單：把「規則明確」的檢查交給 AI，把「架構邏輯」的討論留給人類。

今天這篇文章，就來拆解我是如何設計這個 Agent，以及它是如何運作的。

## 為什麼通用的 AI Review 不夠好？

很多人會直接把程式碼丟給 ChatGPT 叫它 Review，但效果通常不穩定：

- 幻覺 (Hallucination)：AI 喜歡無中生有，建議一些不存在的最佳實踐。
- 缺乏上下文：它不知道你們專案是用 MVP 或 MVVM，不知道你們對 Flavor 的隔離規範。
- 過度解釋：寫了一堆廢話，重點卻沒講到。

為了解決這些問題，我採用了 RAG (Retrieval-Augmented Generation) 的概念，將「團隊規範」變成 AI 的知識庫。

## 核心架構：Agent 的大腦與守則

我的 Code Review Agent 由三個核心部分組成：

1. Agent 定義檔 (code-reviewer.json)
2. 規則法典 (rules.md)
3. 實例教學 (bad-examples.md / good-examples.md)

下面是我的目錄結構

```bash
.
├── .kiro/
│   └── agents/
│       └── code-reviewer.json  # Agent 的定義檔 (System Prompt)
└── docs/
    └── code-review/            # AI 的知識庫 (Context)
         ├── rules.md            # 規則總表 (Critical/Important/Minor)
         ├── coding-style.md     # 命名與格式規範
         └── examples/
             ├── bad-examples.md
             └── good-examples.md
```

> 如果你使用的是 Claude Code、Gemini-CLI 等 AI Agent, 也能依樣畫葫蘆搬移到相應的 `.claude/` , `.gemini/` 中

### 1. Agent 定義檔 (code-reviewer.json)

這是在 Kiro CLI 中的設定檔，它定義了 AI 的人設與行為模式。我在 Prompt 中下了幾個關鍵指令：

- 精確檢測：只報告明確違反 `rules.md` 的程式碼，減少誤報。
- 引用規則：每個問題都要帶上編號（例如 `RULE-C001`），有憑有據。
- 分層報告：將問題分為 Critical (致命)、Important (重要)、Minor (輕微)。

````json
{
  "name": "code-reviewer",
  "description": "Android Code Review Agent - 精確檢測違反規則的程式碼。支援 git diff、commit hash、branch name 輸入。",
  "prompt": "你是 TouchPad 專案的 Code Review Agent，專門精確找出違反規則的程式碼。\n\n## 核心原則\n\n1. **精確檢測**: 只報告明確違反 rules.md 中定義規則的程式碼\n2. **引用規則**: 每個問題必須引用規則編號（如 RULE-C001）\n3. **提供行號**: 指出問題所在的檔案和行號\n4. **分層報告**: 按 Critical → Important → Minor 順序報告\n5. **減少誤報**: 不確定的問題歸類為「建議」而非「違規」\n\n## 檢測流程\n\n1. **取得程式碼變更**\n   - 如果使用者提供 branch name: 執行 `git diff {base_branch} {feature_branch}`\n   - 如果使用者提供 commit hash: 執行 `git diff {commit1} {commit2}`\n   - 如果使用者直接貼上 diff: 直接分析\n\n2. **逐條比對規則**\n   - 讀取 rules.md 中的所有規則\n   - 對每個變更的程式碼行，檢查是否違反任何規則\n   - 只報告新增或修改的程式碼（+ 開頭的行）\n\n3. **產生報告**\n   - 按優先級分類問題\n   - 提供具體的修改建議\n
## 輸出格式\n
```markdown
# Code Review Report\n\n## 📊 Summary\n- 檢查檔案數: X\n- 發現問題數: Critical: X, Important: X, Minor: X\n- 整體評價: [PASS/NEEDS_WORK/CRITICAL_ISSUES]\n\n## 🔴 Critical Issues (必須修正)\n\n### [RULE-C001] 檔案名:行號\n**問題**: 使用 !! 強制解包\n**程式碼**:\n
## 重要注意事項\n\n1. **只檢查新增/修改的程式碼**: 不要報告已存在的問題\n2. **不要過度解讀**: 如果不確定是否違規，放到 Suggestions\n3. **提供可執行的建議**: 每個問題都要有具體的修改方案\n4. **保持建設性**: 語氣友善，重點是幫助改善程式碼\n\n## 規則優先級說明\n\n- **Critical (RULE-C###)**: 會造成 crash、記憶體洩漏、安全問題、架構違反\n- **Important (RULE-I###)**: 可維護性、效能、DRY 原則\n- **Minor (RULE-M###)**: 格式、命名、風格",
  "mcpServers": {},
  "tools": [
    "execute_bash",
    "fs_read",
    "grep",
    "glob"
  ],
  "toolAliases": {},
  "allowedTools": [],
  "resources": [
    "file://docs/code-review/rules.md",
    "file://docs/code-review/coding-style.md",
    "file://docs/code-review/README.md",
    "file://docs/code-review/examples/bad-examples.md",
    "file://docs/code-review/examples/good-examples.md",
    "file://docs/unit_test_guidelines.md"
  ],
  "hooks": {},
  "toolsSettings": {},
  "useLegacyMcpJson": false,
  "model": "claude-sonnet-4.5"
}
````

注意到了嗎？我把規則文件直接掛載 (resources) 給 Agent，讓它閱讀。

### 2. 規則法典 (rules.md)

這是整個系統的靈魂。我將過往在 CR 中常講的規範，結構化地寫成 Markdown。這樣 AI 就不需要「猜測」什麼是好程式碼，而是「查表」。

我將規則分為三個等級：

- 🔴 Critical (RULE-C###)：會導致 Crash (NPE)、Memory Leak、資安問題或嚴重違反 MVP 架構。
  - 例子 `RULE-C001`：禁止使用 !!。
  - 例子 `RULE-C004`：禁止使用 GlobalScope。

- 🟡 Important (RULE-I###)：影響可維護性、效能或 DRY 原則。
  - 例子 `RULE-I001`：UI 初始化必須在 Coroutine 之前（避免閃爍）。
  - 例子 `RULE-I005`：避免重複的 Flavor 判斷邏輯。

- 🔵 Minor (RULE-M###)：命名風格、格式問題。
  - 例子 `RULE-M001`：if 後面要有空格。

每一條規則都包含了原因、檢測模式以及正確/錯誤範例：

````markdown
# Code Review Rules

> 本檔案定義所有 Code Review 規則，供 AI Agent 精確檢測違規程式碼。
>
> **規則編號說明**:
>
> - `RULE-C###`: Critical - 必須修正（crash、記憶體洩漏、安全、架構違反）
> - `RULE-I###`: Important - 應該修正（可維護性、效能）
> - `RULE-M###`: Minor - 建議改善（格式、風格）

---

## 🔴 Critical Rules (必須修正)

### RULE-C001: 禁止使用 !! 強制解包

- **類別**: Null Safety
- **原因**: 可能導致 NullPointerException crash
- **檢測模式**: `!!` 出現在程式碼中
- **錯誤範例**: `val length = text!!.length`
- **正確範例**: `val length = text?.length ?: 0`

---

### RULE-C005: 禁止硬編碼敏感資料

- **類別**: Security
- **原因**: 安全風險，敏感資料可能外洩
- **檢測模式**: 程式碼中包含 API key、密碼、token 等字串常數
- **錯誤範例**:

```kotlin
const val API_KEY = "sk_live_abc123xyz"
```

- **正確範例**:

```kotlin
val apiKey = BuildConfig.API_KEY
```

---

## 🟡 Important Rules (應該修正)

### RULE-I001: UI 初始化應在 Coroutine 之前

- **類別**: Performance
- **原因**: UI 初始化放在 coroutine 後面會導致延遲顯示
- **檢測模式**: `launch { }` 區塊後面有 `view?.update` 或 `visibility` 設定
- **錯誤範例**:

```kotlin
override fun onViewCreated() {
    launch {
        val data = interactor?.getData()
    }
    view?.updateButtonVisibility(true)
}
```

- **正確範例**:

```kotlin
override fun onViewCreated() {
    view?.updateButtonVisibility(true)

    launch {
        val data = interactor?.getData()
    }
}
```

---

### RULE-I007: 主執行緒禁止執行耗時操作

- **類別**: Performance
- **原因**: 阻塞主執行緒會導致 ANR
- **檢測模式**: 在非 coroutine 區塊中直接呼叫 database、network、file 操作
- **錯誤範例**:

```kotlin
fun loadData() {
    val data = database.query(...)  // 阻塞主執行緒
    textView.text = data
}
```

- **正確範例**:

```kotlin
fun loadData() {
    viewModelScope.launch {
        val data = withContext(Dispatchers.IO) {
            database.query(...)
        }
        textView.text = data
    }
}
```

---

## 🔵 Minor Rules (建議改善)

### RULE-M001: if 後面應有空格

- **類別**: Formatting
- **原因**: 符合 Kotlin 編碼風格
- **檢測模式**: `if(` 沒有空格
- **錯誤範例**: `if(condition) { ... }`
- **正確範例**: `if (condition) { ... }`
````

### 3. 實例教學 (bad-examples.md / good-examples.md)

除了死板的規則，我也準備了豐富的範例庫。這就像是給 AI 的 Few-Shot Learning，讓它看到什麼是我們團隊認為的「好味道」與「壞味道」。

例如在 bad-examples.md 中，我特別指出了 MVP 架構常見的錯誤：

> Presenter 持有 Context：這是導致記憶體洩漏的元兇，AI 只要看到 Presenter 建構子傳入 Context，就會立刻報警。

[`good-examples.md`]

````markdown
### Nullable 安全處理

```kotlin
// ✅ 使用 let 處理 nullable drawable
val customDividerItemDecoration = DividerItemDecoration(context, DividerItemDecoration.VERTICAL)
ContextCompat.getDrawable(requireContext(), R.drawable.normal_recyclerview_divider)?.let {
    customDividerItemDecoration.setDrawable(it)
}

// ✅ 使用 Elvis operator
val userName = user?.name ?: "Guest"
val length = text?.length ?: 0

// ✅ 使用 safe call chain
val city = user?.address?.city?.name

...
```
````

[`bad-examples.md`]

````markdown
## MVP 架構違反

### Presenter 持有 Context

```kotlin
// ❌ Bad - 記憶體洩漏風險
class LoginPresenter(
    private val context: Context
) {
    fun showMessage() {
        Toast.makeText(context, "Hello", Toast.LENGTH_SHORT).show()
    }
}

// ✅ Good
class LoginPresenter(
    private val view: LoginContract.View
) {
    fun showMessage() {
        view.showToast("Hello")
    }
}
```

### Presenter 直接操作 View

```kotlin
// ❌ Bad
class LoginPresenter(
    private val activity: LoginActivity
) {
    fun updateUI() {
        activity.textView.text = "Hello"
        activity.button.isEnabled = false
        activity.progressBar.visibility = View.VISIBLE
    }
}

// ✅ Good
class LoginPresenter(
    private val view: LoginContract.View
) {
    fun updateUI() {
        view.updateTitle("Hello")
        view.setButtonEnabled(false)
        view.showLoading()
    }
}
```
````

## 實際運作流程

當開發者準備提交 PR 前，只需要在 CLI 下指令：

```bash
kiro-cli chat --agent code-reviewer
> 請 review feature/login-page 和 develop 的差異
```

Agent 會執行以下步驟：

1. 呼叫 git diff 取得變更內容。
2. 讀取 rules.md 載入規則。
3. 逐行掃描 diff，比對違規事項。
4. 產出一份結構化的 Markdown 報告。

輸出的報告長這樣：

```markdown
# Code Review Report

## 🔴 Critical Issues (必須修正)

### [RULE-C001] LoginPresenter.kt:45

**問題**: 使用 !! 強制解包
**程式碼**: `val token = user!!.token`
**建議修改**: `val token = user?.token ?: ""`

## 🟡 Important Issues (應該修正)

### [RULE-I001] LoginActivity.kt:20

**問題**: UI 初始化在 Coroutine 之後，可能導致畫面延遲顯示。

## ✅ Good Practices

- 使用了 `viewBinding` 正確處理生命週期。
```

## 帶來的改變

自從引入這個 Code Review Agent 後，我們團隊發生了幾個顯著的變化：

1. Code Review 時間減半：人類 Reviewer 不用再花時間去抓「命名不對」、「排版跑掉」這種瑣事，專注在商業邏輯和架構設計上。
2. 情緒成本降低：被機器人指正錯誤，比被同事指正心裡舒服多了😂。
3. 新人上手更快：Agent 的報告本身就是最好的教材，新人提交程式碼前先跑一次 Agent，就能學到專案的規範。
4. 規範文件活化：以前 Wiki 上的 Coding Style 沒人看，現在它直接變成了 AI 的執法依據，每次更新 `rules.md`，全團隊的標準就同步升級。
5. **規則的持續演進**：透過 AI Code Review，我們可以讓團隊成員一起不斷更新精進 `rules.md`，使 Code Review 規則更加全面。當發現新的坑或好的實踐時，大家會主動發起 PR 更新規則，讓規範隨著專案成長。

---

## 結語

> "Automation is about respecting your time."

透過將 Code Review 規則標準化並交給 AI 執行，我們不僅提升了效率，更重要的是，我們建立了一套可演進的品質守門機制。

如果你也在為團隊的程式碼品質煩惱，不妨試試看建立屬於你們的 rules.md 和 Agent。讓 AI 成為你們團隊最嚴格但也最忠實的守門員吧！

---
