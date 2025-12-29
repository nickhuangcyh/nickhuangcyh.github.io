---
layout: post
title: "Building an AI Code Review Agent from Scratch: Let AI Guard Your Code Quality"
date: 2025-12-28 22:00:00 +0800
description: "This article shares how to build an AI Code Review system using AI Agents, implementing precise code quality detection through custom rule manuals to effectively improve team development efficiency and reduce manual review burden."
tags: [AI, Code Review, LLM, Agent, Automation, Software Quality]
categories: [AI, Software Engineering]
toc:
  sidebar: right
thumbnail: /assets/img/ai_code_review_agent.png
---

{% include figure.liquid path="assets/img/ai_code_review_agent.png" title="ai_code_review_agent" %}

## Building an AI Code Review Agent from Scratch: Let AI Guard Your Code Quality

In software development, Code Review (CR) is undoubtedly the most important part of improving a team's engineering quality. But let's be honest, CR is also one of the most mentally exhausting tasks.

Have you ever encountered these scenarios?

1.  **Repetitive, trivial corrections:** Having to remind colleagues every time about "camelCase naming here," "this will cause a Memory Leak or Thread Safety issue," or "don't use `!!` for forced unwrapping."
2.  **Inconsistent standards:** Senior A says it's fine, Senior B says it's not, and the newcomer is caught in the middle, confused.
3.  **Human oversight:** After looking at hundreds of lines of code, fatigue leads to missing obvious Memory Leaks or Thread Safety problems.

Recently, I implemented a Code Review Agent in the Android TouchPad project. The goal was simple: delegate "well-defined rule" checks to AI and leave "architectural logic" discussions to humans.

In this article, I'll break down how I designed this Agent and how it operates.

## Why General AI Reviews Aren't Good Enough?

Many people directly paste code into ChatGPT and ask for a review, but the results are usually inconsistent:

*   **Hallucination:** AI loves to make things up, suggesting non-existent "best practices."
*   **Lack of Context:** It doesn't know if your project uses MVP or MVVM, nor does it know your specific isolation rules for Flavors.
*   **Over-explanation:** Writing a wall of text while missing the actual point.

To solve these problems, I adopted the concept of RAG (Retrieval-Augmented Generation) to turn "team standards" into the AI's knowledge base.

## Core Architecture: The Agent's Brain and Rules

My Code Review Agent consists of three core components:
1.  **Agent Definition File** (code-reviewer.json)
2.  **The Rulebook** (rules.md)
3.  **Example-based Learning** (bad-examples.md / good-examples.md)

Here is my directory structure:
```bash
.
├── .kiro/
│   └── agents/
│       └── code-reviewer.json  # Agent definition (System Prompt)
└── docs/
    └── code-review/            # AI Knowledge Base (Context)
         ├── rules.md            # Master rule list (Critical/Important/Minor)
         ├── coding-style.md     # Naming and formatting standards
         └── examples/
             ├── bad-examples.md
             └── good-examples.md
```

> If you are using AI Agents like Claude Code or Gemini-CLI, you can follow a similar pattern by moving these to the respective `.claude/` or `.gemini/` directories.

### 1. Agent Definition File (code-reviewer.json)

This is the configuration file in Kiro CLI, which defines the AI's persona and behavior. I included several key instructions in the Prompt:

*   **Precise Detection:** Only report code that clearly violates `rules.md` to reduce false positives.
*   **Cite Rules:** Every issue must include a rule ID (e.g., `RULE-C001`) for accountability.
*   **Tiered Reporting:** Categorize issues into Critical, Important, and Minor.

```json
{
  "name": "code-reviewer",
  "description": "Android Code Review Agent - Precisely detects code violating rules. Supports git diff, commit hash, and branch name inputs.",
  "prompt": "You are the Code Review Agent for the TouchPad project, specialized in precisely identifying code that violates rules.\n\n## Core Principles\n\n1. **Precise Detection**: Only report code that clearly violates rules defined in rules.md.\n2. **Cite Rules**: Every issue must cite a rule ID (e.g., RULE-C001).\n3. **Provide Line Numbers**: Indicate the file and line number where the issue occurs.\n4. **Tiered Reporting**: Report in the order of Critical → Important → Minor.\n5. **Reduce False Positives**: Categorize uncertain issues as 'Suggestions' rather than 'Violations'.\n\n## Detection Process\n\n1. **Get Code Changes**\n   - If user provides branch name: Run `git diff {base_branch} {feature_branch}`\n   - If user provides commit hash: Run `git diff {commit1} {commit2}`\n   - If user pastes diff: Analyze directly\n\n2. **Compare Against Rules**\n   - Read all rules in rules.md\n   - For each changed line, check if it violates any rules\n   - Only report added or modified code (lines starting with +)\n\n3. **Generate Report**\n   - Categorize issues by priority\n   - Provide specific fix suggestions\n\n## Output Format\n\n```markdown\n# Code Review Report\n\n## 📊 Summary\n- Files Checked: X\n- Issues Found: Critical: X, Important: X, Minor: X\n- Overall Assessment: [PASS/NEEDS_WORK/CRITICAL_ISSUES]\n\n## 🔴 Critical Issues (Must Fix)\n\n### [RULE-C001] filename:line_number\n**Issue**: Using !! for forced unwrapping\n**Code**:\n```\n\n## Important Notes\n\n1. **Check Only Added/Modified Code**: Do not report existing issues.\n2. **Do Not Over-interpret**: If unsure, put it in Suggestions.\n3. **Provide Actionable Advice**: Each issue must have a specific fix plan.\n4. **Be Constructive**: Maintain a friendly tone; the focus is on helping improve the code.\n\n## Rule Priority Levels\n\n- **Critical (RULE-C###)**: Causes crashes, memory leaks, security risks, or architecture violations.\n- **Important (RULE-I###)**: Affects maintainability, performance, or DRY principles.\n- **Minor (RULE-M###)**: Formatting, naming, and style issues.",
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
```

Notice that I directly mount the rule documents as `resources` for the Agent to read.

### 2. The Rulebook (rules.md)

This is the soul of the entire system. I took the standards I frequently mentioned in CRs and structured them into Markdown. This way, the AI doesn't have to "guess" what good code is; it simply "looks it up."

I divided the rules into three levels:

*   🔴 **Critical (RULE-C###):** Leads to Crashes (NPE), Memory Leaks, security vulnerabilities, or severe violations of the MVP architecture.
    *   Example `RULE-C001`: Prohibit use of `!!`.
    *   Example `RULE-C004`: Prohibit use of `GlobalScope`.

*   🟡 **Important (RULE-I###):** Affects maintainability, performance, or DRY principles.
    *   Example `RULE-I001`: UI initialization must happen before Coroutines (to avoid flickering).
    *   Example `RULE-I005`: Avoid redundant Flavor check logic.

*   🔵 **Minor (RULE-M###):** Naming style and formatting issues.
    *   Example `RULE-M001`: Space required after `if`.

Each rule includes the reason, detection pattern, and correct/incorrect examples:

````markdown
# Code Review Rules

> This file defines all Code Review rules for precise detection by the AI Agent.
> 
> **Rule ID Guide**:
> - `RULE-C###`: Critical - Must fix (crashes, memory leaks, security, architecture violations)
> - `RULE-I###`: Important - Should fix (maintainability, performance)
> - `RULE-M###`: Minor - Suggested improvement (formatting, style)

---

## 🔴 Critical Rules (Must Fix)

### RULE-C001: No !! Forced Unwrapping
- **Category**: Null Safety
- **Reason**: Can lead to NullPointerException crashes.
- **Detection Pattern**: `!!` appearing in the code.
- **Bad Example**: `val length = text!!.length`
- **Good Example**: `val length = text?.length ?: 0`

---

### RULE-C005: No Hardcoded Sensitive Data
- **Category**: Security
- **Reason**: Security risk; sensitive data could be leaked.
- **Detection Pattern**: String constants containing API keys, passwords, tokens, etc.
- **Bad Example**:
```kotlin
const val API_KEY = "sk_live_abc123xyz"
```
- **Good Example**:
```kotlin
val apiKey = BuildConfig.API_KEY
```

---

## 🟡 Important Rules (Should Fix)

### RULE-I001: UI Initialization Before Coroutines
- **Category**: Performance
- **Reason**: UI initialization after a coroutine leads to delayed display.
- **Detection Pattern**: `view?.update` or `visibility` settings following a `launch { }` block.
- **Bad Example**:
```kotlin
override fun onViewCreated() {
    launch {
        val data = interactor?.getData()
    }
    view?.updateButtonVisibility(true)
}
```
- **Good Example**:
```kotlin
override fun onViewCreated() {
    view?.updateButtonVisibility(true)
    
    launch {
        val data = interactor?.getData()
    }
}
```

---


### RULE-I007: No Blocking Operations on Main Thread
- **Category**: Performance
- **Reason**: Blocking the main thread causes ANR (App Not Responding).
- **Detection Pattern**: Direct database, network, or file operations outside of coroutine blocks.
- **Bad Example**:
```kotlin
fun loadData() {
    val data = database.query(...)  // Blocks main thread
    textView.text = data
}
```
- **Good Example**:
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

## 🔵 Minor Rules (Suggested Improvement)

### RULE-M001: Space After 'if'
- **Category**: Formatting
- **Reason**: Follows Kotlin coding style.
- **Detection Pattern**: `if(` without a space.
- **Bad Example**: `if(condition) { ... }`
- **Good Example**: `if (condition) { ... }`
````

### 3. Example-based Learning (bad-examples.md / good-examples.md)

In addition to rigid rules, I prepared an extensive library of examples. This acts like Few-Shot Learning for the AI, showing it what our team considers "Good Smell" vs. "Bad Smell."

For instance, in `bad-examples.md`, I specifically pointed out common MVP architecture errors:

> **Presenter holding Context:** This is a major cause of memory leaks. If the AI sees a Context passed into a Presenter constructor, it will immediately flag it.

## Practical Workflow

Before a developer submits a PR, they simply run a command in the CLI:

```bash
kiro-cli chat --agent code-reviewer
> Please review the differences between feature/login-page and develop
```

The Agent performs the following steps:
1. Calls `git diff` to get the changes.
2. Reads `rules.md` to load the rules.
3. Scans the diff line-by-line, matching against violations.
4. Generates a structured Markdown report.

The output report looks like this:

```markdown
# Code Review Report

## 🔴 Critical Issues (Must Fix)
### [RULE-C001] LoginPresenter.kt:45
**Issue**: Using !! for forced unwrapping
**Code**: `val token = user!!.token`
**Suggested Fix**: `val token = user?.token ?: ""`

## 🟡 Important Issues (Should Fix)
### [RULE-I001] LoginActivity.kt:20
**Issue**: UI initialization after Coroutine may cause display delay.

## ✅ Good Practices
- Correctly handled lifecycle using `viewBinding`.
```

[`good-examples.md`]
````markdown
### Nullable Safe Handling
```kotlin
// ✅ Use 'let' to handle nullable drawable
val customDividerItemDecoration = DividerItemDecoration(context, DividerItemDecoration.VERTICAL)
ContextCompat.getDrawable(requireContext(), R.drawable.normal_recyclerview_divider)?.let {
    customDividerItemDecoration.setDrawable(it)
}

// ✅ Use Elvis operator
val userName = user?.name ?: "Guest"
val length = text?.length ?: 0

// ✅ Use safe call chain
val city = user?.address?.city?.name

...
````

[`bad-examples.md`]
````markdown
## MVP Architecture Violations

### Presenter Holding Context
```kotlin
// ❌ Bad - Memory leak risk
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

### Presenter Directly Manipulating View
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
````

## The Impact of Changes

Since introducing this Code Review Agent, several significant changes have occurred in our team:

1.  **CR Time Cut in Half:** Human reviewers no longer need to spend time catching trivial issues like "incorrect naming" or "broken formatting," allowing them to focus on business logic and architecture.
2.  **Lower Emotional Cost:** Being corrected by a robot feels much better than being corrected by a colleague 😂.
3.  **Faster Onboarding:** The Agent's report is an excellent teaching tool. Newcomers can run the Agent before submitting code to learn the project's standards.
4.  **Living Documentation:** Previously, the Coding Style on the Wiki was ignored. Now, it has become the AI's enforcement basis. Every time `rules.md` is updated, the entire team's standards are synchronized.
5.  **Continuous Evolution of Rules:** Through AI Code Review, we can encourage team members to constantly update and refine `rules.md`. When new pitfalls or better practices are discovered, everyone proactively initiates PRs to update the rules, allowing the standards to grow with the project.

---

## Conclusion

> "Automation is about respecting your time."

By standardizing Code Review rules and delegating execution to AI, we haven't just improved efficiency; more importantly, we've built an evolvable quality gatekeeping mechanism.

If you are struggling with your team's code quality, try creating your own `rules.md` and Agent. Let AI become your team's strictest yet most loyal gatekeeper!

---
