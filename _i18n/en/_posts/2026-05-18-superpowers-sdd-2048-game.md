---
layout: post
title: "When Vibe Coding Gets Superpowers: A Deep Dive into Fully Automated Precision Development, Building 2048 as a Case Study"
date: 2026-05-18 02:00:00 +0800
description: "Continuing the SDD (Specification-Driven Development) journey, this time experiencing Superpowers' fully automated methodology. Building a 2048 game with Gemini CLI, analyzing the power and cost of subagent-driven development, enforced TDD, and more."
tags: [AI, SDD, Superpowers, React, LLM, Agent, Gemini]
categories: [AI, Software Engineering]
toc:
  sidebar: right
thumbnail: /assets/img/superpowers_installation.png
---

{% include figure.liquid path="assets/img/superpowers_cover.png" title="vibe with superpowers" %}

## Preface: From Spec Kit to OpenSpec, and Now Superpowers

In my previous two articles, I used **Spec Kit** to build a Go game engine, and **OpenSpec** to build an SEC Insider Tracker. Both experiences validated the same thing: **SDD (Specification-Driven Development) effectively eliminates AI hallucinations and produces high-quality code.**

But these two tools share a common trait: they both require **deep human involvement** during the **specification phase**. You need to write prompts, confirm specs, review task lists, and make decisions at key checkpoints (though the implementation phase can be automated).

Then I came across **Superpowers** — a "methodology framework for AI development" with 195k Stars on GitHub. Its core promise is:

> Once installed, your AI agent will automatically follow rigorous software development processes. With Claude Code, for example, it's not uncommon for it to work autonomously for a couple hours at a time without deviating from the plan.

This sounded too good to be true. As a developer who has hands-on tested multiple SDD tools, I decided to use a medium-complexity project — **the 2048 game** — to fully experience Superpowers' end-to-end workflow, and honestly document its strengths and costs.

---

## What Is Superpowers?

**Superpowers is not a library — it's a skills framework and software development methodology for AI coding agents.**

Its core design philosophy is: the implementation plan must be clear enough for "an enthusiastic junior engineer with poor taste, no judgment, no project context, and an aversion to testing" to follow. It uses extensive processes and guardrails to ensure output quality, emphasizing TDD, YAGNI (You Aren't Gonna Need It), and DRY principles.

### Core Skills

Below are the main skills triggered during this hands-on experience (see [official docs](https://github.com/obra/superpowers) for the full list):

| Category          | Skill                          | Purpose                                       |
| ----------------- | ------------------------------ | --------------------------------------------- |
| **Collaboration** | brainstorming                  | Socratic design Q&A to clarify requirements   |
| **Collaboration** | writing-plans                  | Break design into 2-5 minute atomic tasks     |
| **Collaboration** | subagent-driven-development    | Dispatch subagent per task + two-stage review |
| **Collaboration** | executing-plans                | Batch execution with checkpoints              |
| **Collaboration** | finishing-a-development-branch | Decide merge/PR/keep/discard after completion |
| **Testing**       | test-driven-development        | Enforced RED-GREEN-REFACTOR                   |
| **Debugging**     | systematic-debugging           | 4-phase root cause analysis                   |
| **Debugging**     | verification-before-completion | Verify before declaring done                  |
| **Collaboration** | using-git-worktrees            | Isolated development branches                 |

### Auto-Trigger Mechanism

Superpowers skills don't need manual invocation. The agent **automatically determines** which skill to activate based on current context:

- Detects you want to build a feature → auto-triggers `brainstorming`
- Design confirmed → auto-triggers `using-git-worktrees` (creates isolated workspace)
- Then triggers `writing-plans`
- Implementation begins → auto-triggers `test-driven-development`
- Between tasks → auto-triggers `requesting-code-review`
- Bug encountered → auto-triggers `systematic-debugging`

---

## Setup: Gemini CLI + Superpowers

### Prerequisites

- [Gemini CLI](https://github.com/google-gemini/gemini-cli) installed and logged in
- A Git-initialized project directory

### Installing the Superpowers Extension

```bash
gemini extensions install https://github.com/obra/superpowers
```

During installation, it lists all Agent Skills to be installed and warns that this extension contains auto-executable Hooks:

{% include figure.liquid path="assets/img/superpowers_installation.png" title="Superpowers installation: listing all skills and hooks warning" %}

After installation, all skills are stored in `~/.gemini/extensions/superpowers/skills/`.

---

## Hands-On: Building 2048 with Superpowers

### Step 1: Launch Gemini CLI and Describe Requirements

Launch Gemini CLI in the project directory and describe requirements in natural language:

```
I want to build a 2048 game. Using React + TypeScript + Vite.
It needs sliding animations, a scoring system, high score tracking (localStorage),
Game Over and Win detection, keyboard arrow key support and mobile touch swipe.
```

After input, Superpowers immediately auto-triggered two skills:

1. **using-superpowers** — Establishes how the skill system works
2. **brainstorming** — Clarifies requirements before writing any code

Each skill trigger shows an **"Action Required"** confirmation dialog where you can choose `Allow once`, `Allow for this session`, or reject:

{% include figure.liquid path="assets/img/superpowers_using_superpowers.png" title="Auto-triggered using-superpowers skill" %}

{% include figure.liquid path="assets/img/superpowers_brainstorming.png" title="Auto-triggered brainstorming skill, loading Socratic design Q&A resources" %}

---

### Step 2: Brainstorming — Socratic Design Q&A

After entering the brainstorming phase, the AI **doesn't write code directly**. Instead, it asks a series of design questions. This is one of Superpowers' core values:

**Question 1: Visual Style**

The AI launched a local HTTP server (`localhost:54715`), displaying mockups of three visual approaches in HTML:

- Classic — beige/brown tones
- Modern Dark
- Minimalist Light

{% include figure.liquid path="assets/img/superpowers_brainstorming_q_1_result.png" title="Brainstorming: visual style selection via local HTTP server mockups" %}

**Question 2: Board Size**

```
Next, I'd like to confirm the game board size. While 2048's standard is 4x4,
some versions support 5x5 or larger. Would you prefer:

1. Standard 4x4 (classic difficulty and pace)
2. Switchable sizes (e.g., offering 3x3, 4x4, 5x5 options)
3. Custom size (specify a specific number, e.g., 5x5)
```

{% include figure.liquid path="assets/img/superpowers_brainstorming_q_2_result.png" title="Brainstorming: board size selection" %}

**Question 3: Animation Implementation**

```
Regarding animation and interaction, the "sliding animation" you mentioned is
the soul of 2048. For a smooth experience, which implementation do you prefer?

1. CSS Transitions / Animations (handwritten CSS, lightweight and performant)
2. Framer Motion (popular React animation library, powerful for enter/exit/layout)
3. React Spring (physics-based animations, more natural feel but steeper learning curve)
```

{% include figure.liquid path="assets/img/superpowers_brainstorming_q_3_result.png" title="Brainstorming: animation technology selection" %}

After answering all questions, the AI summarized the design direction and waited for confirmation:

> - Tech stack: React + TypeScript + Vite
> - Visual: Classic 2048 style
> - Features: Multiple board sizes (3x3, 4x4, 5x5), score & high score tracking (localStorage), keyboard & mobile swipe support
> - Animation: Pure CSS Transitions for smooth movement

---

### Step 3: Design Document Output

After confirming the design direction, the AI automatically created the `docs/superpowers/specs/` directory and wrote a formal design specification:

{% include figure.liquid path="assets/img/superpowers_do_specs.png" title="Auto-generated design document 2048-game-design.md" %}

The generated design document is well-structured, covering overview, tech stack, core features, UI/UX design, implementation strategy, and test plan:

```markdown
# 2048 Game Design Specification

**Date:** 2026-05-17
**Status:** Approved
**Tech Stack:** React, TypeScript, Vite, Vanilla CSS

## 1. Overview

A high-performance, visually faithful 2048 puzzle game.

## 2. Tech Stack

- **Framework:** React 18+ (TypeScript)
- **Build Tool:** Vite
- **Styling:** Vanilla CSS for performance-critical animations
- **State Management:** Custom Hook using `useReducer`

## 5. Implementation Strategy

- **Tile Identity:** Each tile has a unique persistent ID
  to ensure React can track it during moves, enabling CSS transitions.
- **Move Algorithm:**
  1. Filter non-empty tiles
  2. Merge adjacent identical tiles
  3. Move to target direction
  4. Compare with previous state to determine if move was valid
```

---

### Step 4: Implementation Plan

After confirming the design document, Superpowers auto-triggered the **writing-plans** skill, producing a detailed implementation plan:

{% include figure.liquid path="assets/img/superpowers_do_plan.png" title="Auto-triggered writing-plans skill, producing implementation plan" %}

The plan broke the entire development into 6 Tasks, each with clear file paths, steps, and verification methods:

```markdown
# 2048 Game Implementation Plan

**Goal:** Build a classic 2048 game using React + TypeScript + Vite
with multiple board sizes, smooth CSS animations, and high score persistence.

### Task 1: Project Initialization & Build Environment

### Task 2: Define Core Types & Game Logic (Game Engine)

### Task 3: Implement Move & Merge Logic

### Task 4: Build GameBoard & Tile Components (UI Layer)

### Task 5: Input Listeners & State Integration (Hooks)

### Task 6: Score Persistence & UI Polish
```

---

### Step 5: Subagent-Driven Development

After plan confirmation, the AI asked about execution approach:

> 1. **Subagent-Driven (Recommended)** — I'll dispatch a fresh subagent for each task, reviewing between tasks for fast iteration.
> 2. **Inline Execution** — Execute tasks directly in the current session with checkpoints for your review.

After choosing Subagent-Driven, Superpowers loaded three key prompts:

- `implementer-prompt.md` — Guides subagent implementation
- `spec-reviewer-prompt.md` — Spec compliance review
- `code-quality-reviewer-prompt.md` — Code quality review

{% include figure.liquid path="assets/img/superpowers_subagent.png" title="Subagent-Driven Development launched, loading implementation and review prompts" %}

Then selecting `Yes, automatically accept edits` to enter fully automatic mode:

{% include figure.liquid path="assets/img/superpowers_implement.png" title="Confirming plan and selecting auto-accept edits" %}

---

### Step 6: TDD & Incremental Task Completion

During each Task's execution, Superpowers:

1. **Dispatches a Subagent** to execute the task
2. Updates `todo.md` (checks off items) upon completion
3. **Re-triggers skills** — this is where the "ceremony" feeling is strongest

After Task 1 completed, `todo.md` was updated, and the subagent again requested activation of `writing-plans` and `test-driven-development` skills:

{% include figure.liquid path="assets/img/superpowers_task1.png" title="Task 1 complete, todo.md updated" %}

{% include figure.liquid path="assets/img/superpowers_task1_tdd.png" title="Each new task re-requests Skill Activation (TDD, brainstorming, etc.)" %}

After Task 2, the same pattern repeated — Agent Completed → Edit todo.md → Activate Skills → next Task:

{% include figure.liquid path="assets/img/superpowers_task2.png" title="Task 2 complete, triggering another round of skill confirmations" %}

By Tasks 3-4, you can see `todo.md` being checked off progressively, with subagents auto-committing and advancing:

{% include figure.liquid path="assets/img/superpowers_task3_4.png" title="Tasks 3-4 complete, auto git commit and progress update" %}

---

### Step 7: Bug Fix — systematic-debugging

After all Tasks completed, I checked the results in the browser and found a bug: **all Tiles were overlapping at the top-left corner (0, 0) position**.

Reported to the AI:

```
The game has a bug — all UI positions are completely wrong, everything is clustered in the top-left corner
```

Superpowers immediately auto-triggered the **systematic-debugging** skill, loading the complete debugging toolkit:

{% include figure.liquid path="assets/img/superpowers_bugfix1.png" title="Auto-triggered systematic-debugging skill, 4-phase root cause analysis" %}

After analysis, the AI found the root cause:

> **Root Cause:** When defining CSS variables (like `--tile-size`) directly in React's `style` object, TypeScript's type definitions sometimes prevent these custom properties from rendering correctly to the DOM, causing all Tile position calculations to fail and overlap at (0, 0).

Fixed, auto-committed, and pushed:

{% include figure.liquid path="assets/img/superpowers_bugfix2.png" title="Bug fix complete, auto commit and push to origin/main" %}

---

## Code Output Showcase

Let's look at the code quality Superpowers actually produced.

### Core Type Definitions

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

### Core Game Logic — Move & Merge

The movement algorithm produced by Superpowers uses a "rotation normalization" strategy — converting all directional moves into "move left" for unified processing:

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

### State Management — useGame Hook

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

### TDD Tests — Enforced by Superpowers

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

The commit history auto-generated by Superpowers is clean and structured, with each task corresponding to a commit:

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

## In-Depth Review: Pros and Cons of Superpowers

### ✅ Pros

**1. Fully Automated Process, Zero Manual Triggering**

You don't need to remember any commands or workflows. Once Superpowers is installed, the AI activates the right skill at the right time. This significantly lowers the barrier for those unfamiliar with development processes.

**2. Enforced TDD, No Skipping Tests**

Every Task must have tests written before implementation. If you try to write code first, it deletes and restarts. This ensures all output code has test coverage.

**3. Auto Commit & Progress Tracking**

Each completed Task automatically triggers a `git commit` and updates `todo.md` checkboxes. You can check progress at any time.

**4. Subagent Two-Stage Review**

After each subagent completes, it goes through:

1. Spec compliance check (does it match the specification)
2. Code quality check (does it follow best practices)

This provides quality assurance beyond typical AI coding.

**5. systematic-debugging Root Cause Analysis**

When encountering bugs, instead of blind guessing, it follows a 4-phase process (Observe → Hypothesize → Verify → Fix). My CSS positioning bug was precisely located by this skill.

---

### ❌ Cons

**1. Massive Token Consumption**

This is the most significant issue. Each Task is a complete agent session:

- Subagent startup (with full context + skill instructions)
- Two-stage review (more agent calls)
- Code review between tasks

A 6-step plan actually triggers 20-30+ LLM calls. Token consumption is **3-5x** that of Spec Kit/OpenSpec.

**2. Slow Execution Speed**

Because every small task goes through the full ceremony:

```
Task N → Activate Skills (wait for confirmation) → TDD → Write tests → Run tests → Write code
  → Run tests → commit → review → update todo → next Task → Activate Skills again...
```

For a project of 2048's complexity, Spec Kit might finish in 20 minutes; Superpowers took over 1 hour.

**3. Excessive Ceremony — "Action Required" Fatigue**

This was my biggest pain point. **At the start of each Task, Superpowers re-requests activation of 2-4 Skills**, each popping up an "Action Required" confirmation dialog. Across 6 Tasks, I clicked "Allow once" over 15 times.

Even after selecting `Allow for this session`, the subagent triggers it again next time since it's a brand new session. This seriously undermines the "fully automatic" promise.

**4. Lack of UI Detail Control**

Superpowers focuses on logical correctness (TDD guarantee) but has virtually no mechanism for visual detail review. My Tile positioning bug was only discovered manually after all Tasks completed. Without me checking the screen, it would have considered "all tests pass = task successful."

**5. Still Requires Manual Adjustment After Completion**

Despite the "fully automatic" promise, reality is:

- Visual effects need manual checking
- CSS animation fine-tuning (timing, easing) requires human judgment
- Responsive layout needs testing across devices

**Superpowers only guarantees "logical correctness," not "product completeness."**

---

## Deep Comparison of Three SDD Tools

| Dimension               | Spec Kit                                                                       | OpenSpec                                                                      | Superpowers                                                                  |
| :---------------------- | :----------------------------------------------------------------------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **Core Philosophy**     | Precise spec definition, eliminate AI hallucinations                           | Artifact-guided, fluid iteration                                              | Fully automated methodology, auto-triggered skills                           |
| **Workflow Model**      | Linear commands: constitution → specify → (clarify) → plan → tasks → implement | Artifact-guided: propose → apply → archive (can revisit any artifact anytime) | Auto-triggered loop: brainstorming → spec → plan → subagent execution        |
| **Human Role**          | Director — deep involvement in spec phase, implementation can be automated     | Reviewer — confirm each artifact then advance                                 | Observer — confirm design then hands-off                                     |
| **Token Efficiency**    | ⭐⭐⭐⭐⭐ Most efficient, one-shot implementation after spec                  | ⭐⭐⭐⭐ Efficient, some overlap between artifacts but manageable             | ⭐⭐ Most expensive, each task is a full session                             |
| **Execution Speed**     | ⭐⭐⭐⭐⭐ Fastest                                                             | ⭐⭐⭐⭐ Fast                                                                 | ⭐⭐ Slowest                                                                 |
| **Human Control**       | ⭐⭐⭐⭐⭐ Full control                                                        | ⭐⭐⭐⭐ High (can modify artifacts anytime)                                  | ⭐⭐ Low (hard to intervene after handoff)                                   |
| **Quality Assurance**   | Rely on clear spec definitions                                                 | Artifact constraints + human review                                           | TDD + subagent two-stage review                                              |
| **TDD Enforcement**     | Optional (defined in constitution)                                             | Optional (defined in rules)                                                   | Mandatory (auto-triggered skill, cannot skip)                                |
| **Auto Commit**         | Partially auto (auto branch creation, manual commit)                           | ❌ Manual control                                                             | ✅ Auto commit per task                                                      |
| **Bug Fix Mechanism**   | No special mechanism                                                           | No special mechanism                                                          | systematic-debugging 4-phase analysis                                        |
| **Best For**            | Small-medium projects, precise control needed, efficiency-focused              | Cross-stack integration, team collaboration, documentation traceability       | Large projects hands-off, don't want to think about process, full automation |
| **Not Ideal For**       | Long-running unattended large tasks                                            | Small scripts, simple features                                                | Efficiency-focused, token-sensitive, UI refinement needed                    |
| **Learning Curve**      | Low — a few commands to get started                                            | Medium — need to understand artifact relationships                            | Lowest — works automatically after installation                              |
| **Artifact Management** | .specify/ directory (specs + plans + tasks)                                    | openspec/ directory (auto-archived)                                           | docs/superpowers/ (specs + plans)                                            |
| **Supported AI Agents** | 30+ (Copilot, Claude Code, Gemini CLI, Cursor, Codex, Kiro, etc.)              | 25+ (Claude Code, Gemini CLI, Cursor, Copilot, etc.)                          | Claude Code, Gemini CLI, Codex, Cursor, Copilot, OpenCode, etc.              |
| **GitHub Stars**        | ~101k                                                                          | ~49k                                                                          | ~195k                                                                        |

---

### Who Should Use Superpowers?

**✅ Good fit:**

- Those who want to "completely hands-off" and let AI develop autonomously
- Beginners unfamiliar with development process planning
- The "spec is confirmed, just needs execution" phase of large projects
- Those who value TDD but are too lazy to enforce it themselves

**❌ Not ideal for:**

- Developers with limited token budgets
- Those who like controlling details and adjusting direction on the fly
- Efficiency-focused professional developers
- Projects heavily dependent on UI/UX visual effects
- Scenarios requiring rapid prototype iteration

---

## Conclusion: Choose the Right SDD Tool for Your Needs

After hands-on experience with all three tools, my recommendation is:

> **There's no best tool — only the best tool for your scenario.**

| Your Need                                            | Recommended Tool                                        |
| :--------------------------------------------------- | :------------------------------------------------------ |
| Fast delivery, token-sensitive                       | **Spec Kit**                                            |
| Cross-stack integration, documentation traceability  | **OpenSpec**                                            |
| Want to go fully hands-off, don't mind waiting       | **Superpowers**                                         |
| Hybrid mode (tool A for specs, tool B for execution) | Spec Kit/OpenSpec for specs + Superpowers for execution |

For me personally, Superpowers' "full automation" is more of a **trade-off**: you exchange **tokens and time** for the convenience of **not having to think about process**. If you enjoy control and value efficiency, Spec Kit or OpenSpec remain more practical choices.

But if you want to experience the futuristic feeling of "AI fully autonomous development," Superpowers does demonstrate what's possible in this direction — the cost is just still a bit high for now.

---

### 💡 Discussion

Have you tried Superpowers? Do you think "fully automated" or "human-in-the-loop" better suits your workflow?

**Feel free to share your experience in the comments below!**

---

### 🎮 Demo

{% include figure.liquid path="assets/img/superpowers_2048_game.png" title="2048 Game Result" %}

[**👉 Play 2048 Online**](https://nickhuangcyh.github.io/2048-game/) | [**GitHub Repo**](https://github.com/nickhuangcyh/2048-game)

### 📚 Article Series

- [Spec Kit + SDD: Building a Go Game](https://nickhuangcyh.github.io/blog/2026/speckit-sdd-go-game/)
- [OpenSpec Artifact-Driven: Building SEC Insider Tracker](https://nickhuangcyh.github.io/blog/2026/openspec-sdd-insider-tracker/)
