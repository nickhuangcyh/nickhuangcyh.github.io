---
layout: post
title: "Stop Writing Toys with Vibe Coding: Implementing a Go Game via SDD and SpecKit to Eliminate AI Hallucinations"
date: 2026-03-29 21:00:00 +0800
description: "Exploring common pain points in specification planning and using SpecKit combined with SDD (Specification-Driven Development) to precisely guide AI in implementing Go game rules and territory estimation, eliminating Vibe Coding hallucinations."
tags: [AI, SDD, Speckit, React, LLM, Agent]
categories: [AI, Software Engineering]
toc:
  sidebar: right
thumbnail: /assets/img/vibe_coding_vs_sdd_speckit.svg
---

{% include figure.liquid path="assets/img/vibe_coding_vs_sdd_speckit.svg" title="vibe-vs-sdd" %}

## Introduction: Why Do We Need SDD?

In the daily life of software development, do you often encounter this scenario? A PM issues a requirement spec to software engineers, and halfway through implementation, the engineer discovers logic loopholes and has to go back to discuss them with the PM. If it's just a minor detail, it's fine; but encountering conflicts in core logic often leads to wasted effort and starting over from scratch.

Experienced software engineers (such as SAs or Staff Engineers) can usually perform architectural design and technical planning after a PM finishes the spec, clarifying boundary conditions when necessary to save development resources. However, the reality is that most companies do not have dedicated roles like SA or Staff Engineer. Usually, as soon as a requirement comes down, it's accompanied by a tight deadline pressed directly onto the engineers.

Under the pressure of schedules, engineers have no time for proper software design and have to jump straight into coding. This often leads to "spaghetti code" that is difficult to extend later. Worse, if technical bottlenecks are encountered or edge cases not covered in the spec arise near the deadline, the PM might modify the spec with a single stroke, rendering the engineer's previous efforts useless.

> In professional settings, we often encounter problems with insufficient detail or a lack of comprehensive thinking in specs. The root cause is that the clients or PMs defining the requirements lack technical backgrounds. Under project pressure, teams often design while implementing, only to find that the technical principles differ completely from the original spec's assumptions, necessitating further discussion and modification.

This is why I have started advocating for **SDD (Specification-Driven Development)**.

While "Vibe Coding" (using natural language to directly ask AI to write code) is currently popular and feels great for solving simple problems or writing small scripts, it often suffers from severe **hallucinations** when handling complex business logic, producing code that looks plausible but simply doesn't work.

### Why Vibe Coding Fails Here?

Before we start, let's quickly compare the differences between the two development mindsets:

| Dimension                  | Vibe Coding (Casual Natural Language)                                   | SDD + SpecKit (Spec-Driven)                                                       |
| :------------------------- | :---------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **Logical Correctness**    | Frequent "hallucinations," missing edge rules like Ko or suicide moves. | **Strictly defined**; AI must implement all rules based on `spec.md`.             |
| **Code Quality**           | Logic and UI are mixed, producing "spaghetti code."                     | **DDD Architecture**; core logic and UI are completely separated.                 |
| **Scalability**            | Fixing one bug breaks three features; maintenance is a nightmare.       | **Clear task list**; adding complex features like "territory estimation" is fast. |
| **Development Philosophy** | Hope-driven.                                                            | **Design-driven**.                                                                |

The most powerful part of the **SpecKit** tool introduced by GitHub is the `clarify` phase. It helps us brainstorm quickly through AI during the early stages of development, filling in details missed by PMs unfamiliar with technicalities. We can use SpecKit to generate a **"perfect spec that balances business needs and technical considerations"** before letting AI agents implement it. This not only significantly reduces communication costs and the risk of wasted effort but also makes future code maintenance much more convenient.

In this article, I will demonstrate how to implement a pure frontend Go game—including "counting liberties, capturing stones, and the Ko rule" plus a "territory estimation" feature—using the SDD model and SpecKit without writing a single line of code manually.

---

## Hands-on: Building a Pure Frontend Go Engine with SpecKit

### Environment Installation and Initialization

First, we need to install SpecKit and initialize the project:

```bash
# Install specify-cli
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Initialize the project; here I specify the Gemini model
specify init go-game-react --ai gemini
```

{% include figure.liquid path="assets/img/speckit_ssd_go_game_1.png" title="speckit_ssd_go_game_1" %}

### SpecKit Command Cheat Sheet

Before diving in, let's look at the core and advanced commands of SpecKit. This tool doesn't just output code; more importantly, it provides a complete **quality verification mechanism**:

| Command                           | Official Description            | Role in SDD                                                                            |
| :-------------------------------- | :------------------------------ | :------------------------------------------------------------------------------------- |
| **Core Workflow**                 |                                 |                                                                                        |
| `/speckit.constitution`           | Create governing principles     | **Project Constitution**: Defines coding standards and architectural norms.            |
| `/speckit.specify`                | Define what you want to build   | **Requirement Definition**: Describes business logic and user stories.                 |
| `/speckit.plan`                   | Create technical plans          | **Technical Planning**: Selects the tech stack and formulates the implementation path. |
| `/speckit.tasks`                  | Generate actionable task lists  | **Task Decomposition**: Translates the plan into executable tasks.                     |
| `/speckit.implement`              | Execute all tasks               | **Auto Implementation**: Let AI write code based on the task list.                     |
| **Advanced Checks (Recommended)** |                                 |                                                                                        |
| `/speckit.clarify`                | Clarify underspecified areas    | **Clarification**: Unearths potential hallucinations and edge cases before Planning.   |
| `/speckit.analyze`                | Consistency & coverage analysis | **Consistency Analysis**: Checks if tasks completely cover the spec requirements.      |
| `/speckit.checklist`              | Generate quality checklists     | **Quality Check**: "Unit tests for requirements" to ensure logical correctness.        |

Next, we will follow this sequence step-by-step to implement our Go game.

---

### Step 1: `/speckit.constitution` (Establishing the Project Constitution)

👉 **What this does**: According to the official definition, this is used to **establish or update the governing principles of the project**. We don't write any features; instead, we define "the code quality, development rules, and architectural standards for this project." To demonstrate the rigor of SDD, the focus here is on "strong typing," "Test-Driven Development (TDD)," and "absolute separation of UI and logic."

```text
/speckit.constitution Create project principles focused on strict Domain-Driven Design (DDD). Rule 1: Absolute separation of Core Logic and UI. Core game logic must be pure functions with zero UI dependencies. Rule 2: Strict TypeScript typing. Use interfaces and types for all entities (Board, Stone, Group, Position). No `any` types. Rule 3: Test-Driven Development (TDD) approach for all algorithmic logic, especially graph traversal for graph algorithms. Rule 4: Predictable state management without mutation.
```

---

### Step 2: `/speckit.specify` (Defining Functional Specs and Business Logic) —— 🌟 Defining Go Rules!

👉 **What this does**: This is the essence of SDD. Here you describe in detail "what you want to build." **Do not** mention React, Vite, or any technical frameworks here. We need to define the most complex rules of Go (liberties, capture, Ko) with clear logic so the AI can write them into `spec.md`.

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

### Step 3: `/speckit.clarify` —— When AI Starts "Teaching You" 🌟

👉 **What this does**:
After the AI writes the `spec.md`, this command lets the AI **clarify ambiguous areas in the requirements**. This was the most impressive part of the development. SpecKit didn't rush to write code; instead, through `clarify`, it threw several **boundary questions that even senior developers might miss** regarding the complex sport of Go:

> **Critical details the AI asked me back:**
>
> 1. "Regarding the 'Ko rule,' do we need to record the global board state to prevent infinite loops?"
> 2. "Should the scoring use Chinese rules (area scoring) or Japanese rules (territory scoring)? This affects the core algorithm."
> 3. "When the board is full and both sides pass, should we automatically trigger the settlement logic?"

These questions demonstrate the **core value of SDD: eliminating potential requirement ambiguities before a single line of buggy code is written.** At this stage, the AI acts as your **Senior SA (System Analyst)**, guarding the integrity of the specification.

```text
/speckit.clarify
```

_(After execution, the AI will ask you a few questions. You can simply answer: `No handicaps for now. Use area scoring (Chinese rules) as a basic implementation.` This will suffice.)_

This step is fantastic; the AI helped me consider many technical and requirement edge cases (e.g., whether to support undos, whether persistent storage is needed):

{% include figure.liquid path="assets/img/speckit_ssd_go_game_2.png" title="speckit_ssd_go_game_2" %}

{% include figure.liquid path="assets/img/speckit_ssd_go_game_3.png" title="speckit_ssd_go_game_3" %}

{% include figure.liquid path="assets/img/speckit_ssd_go_game_4.png" title="speckit_ssd_go_game_4" %}

{% include figure.liquid path="assets/img/speckit_ssd_go_game_5.png" title="speckit_ssd_go_game_5" %}

{% include figure.liquid path="assets/img/speckit_ssd_go_game_6.png" title="speckit_ssd_go_game_6" %}

---

### Step 4: `/speckit.plan` (Formulating the Technical Plan)

👉 **Key Check**: We must tell the AI in the strongest terms: "No backend!" All state (board, captures, whose turn it is) exists only in the browser's memory (React State).

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

### Step 5: `/speckit.tasks` (Generating the Actionable Task List)

👉 **What this does**: According to the official definition, this **generates an actionable task list for implementation**. When you enter `/speckit.tasks`, the AI will generate a `tasks.md` file. **You must** open this file and take a look.

- ✅ **Normal Situation**: Tasks should focus on creating `types.ts`, implementing core algorithms (liberties, Ko), writing Unit Tests, and finally React components (Board, Stone).
- ✅ **Abnormal Situation (Reject)**: If you see things like `Setup Express server`, `Create API endpoints`, or `Configure database` in `tasks.md`, tell the AI immediately: `This is a frontend-only app, remove all backend/server tasks and regenerate the plan.`

> 💡 **Advanced Tip: `/speckit.analyze`**
> Before proceeding to implementation, I strongly recommend running `/speckit.analyze`. It performs a **consistency and coverage analysis** to ensure that your `tasks.md` perfectly covers all requirements defined in `spec.md`. This is extremely helpful for ensuring the integrity of complex logic like graph algorithms.

💬 **Your Prompt**:

```text
/speckit.tasks
/speckit.analyze
```

---

### Step 6: `/speckit.implement` (Executing Tasks and Auto-implementation)

👉 **What this does**: This is the final step, **executing all tasks to build the feature according to the plan**. As long as `tasks.md` is confirmed to contain only frontend tasks, you can safely let the AI write the code.

> 💡 **Advanced Tip: `/speckit.checklist`**
> If you want even higher quality, use `/speckit.checklist` after implementation. It generates a custom quality checklist to verify the completeness, clarity, and consistency of requirements—like "unit tests for natural language."

💬 **Your Prompt**:

```text
/speckit.implement
```

---

### Quality Verification: SDD is Not Just About Writing Code, But Writing "Correct Code"

After implementation is complete, you will find that the AI not only wrote the React components but also generated a complete set of unit tests in the `src/core/__tests__/` directory, following the **TDD rules** we defined in `/speckit.constitution`.

Run the test command:

```bash
npm test
```

You will see that the logic for "liberties, capture, and Ko" all passes. This is the power of SDD: **Every line of logic produced by the AI is backed by corresponding test cases, completely solving the "runs but logic might have holes" concern of Vibe Coding.**

---

## Why SDD Can Completely Eliminate AI Hallucinations?

> **Expert Insight: The antidote to AI hallucinations is not more natural language, but more precise boundary definitions.**

Why is the SDD model so much stronger than direct conversation when using the same LLM?

1. **Context Compression**: Through `spec.md` and `tasks.md`, we break down a massive development task into tiny, contextually clear "atomic tasks." AI only needs to focus on solving one specific logical problem per round.
2. **Multiple Verification Chains**: From the constitution and specs to the plan and task list, each layer establishes boundaries (guardrails) for the next.
3. **Eliminating Randomness**: When rules are written in black and white in the spec, the AI no longer needs to "guess" your intent but simply "executes" your instructions.

---

At this point, the basic Go engine and interface are complete!

{% include figure.liquid path="assets/img/speckit_ssd_go_game_7.png" title="speckit_ssd_go_game_7" %}

---

## Advanced: Adding "Territory Estimation" Feature

With the basic Go game done, I want to add a more hardcore feature: **Territory Estimation**.

This isn't just about drawing boxes on the screen; it involves pure **Graph Theory algorithms**. In a traditional development model, hand-writing this logic (including BFS/DFS flood fill, identifying connected components, and handling neutral zones) would take at least half a day.

In SDD mode, we don't discuss code directly; instead, we follow a formal extension process:

### Step 1: Define New Feature Spec (Specify)

We tell the AI that there should be a new button on the screen and define what "territory" means.

```text
/speckit.specify Add a "Territory Estimation" feature to the existing Go engine.

Requirements:
1. Add a "Toggle Territory" button to the UI.
2. When toggled ON, the board should visually display the estimated territory for both Black and White on empty intersections.
3. Visual representation: Use small square markers on the intersections (black squares for Black's territory, white squares with a dark border for White's territory), exactly like professional Go servers (e.g., Fox Weiqi).
4. Territory Rule: An empty intersection is considered Black's territory if all empty paths from it strictly lead to Black stones (it is completely enclosed by Black). The same applies to White.
5. Neutral points (Dame): If a connected group of empty intersections touches BOTH Black and White stones, it is neutral and receives no marker.
6. The game can continue to be played; if a stone is placed while the estimation is ON, the territory markers must update dynamically or the toggle should automatically turn OFF.
```

---

### Step 2: Technical Implementation Plan (Plan) —— Injecting Graph Theory

This is the most critical part! We demand the AI implement a pure calculation logic in the Core Engine layer, never stuffing complex calculations into React components.

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

> 💡 **Deep Thinking: Why write the BFS algorithm here?**
> In SDD mode, we don't just ask AI to "add territory estimation"; we explicitly specify using **BFS Flood Fill**. This guides the AI to choose the most appropriate data structure and algorithmic path, preventing hallucinations when handling edge cases like neutral zones.
> {: .notice--info}

**The result was astonishing:** With just this rigorous spec description, the AI wrote a 100% correct graph theory implementation. We successfully steered the AI away from the hallucination of "guessing code" to precise output based on mathematical logic.

---

### Step 3: Generate and Check Task List (Tasks)

```text
/speckit.tasks
```

---

### Step 4: Auto-implementation (Implement)

```text
/speckit.implement
```

The completed "Territory Estimation" feature is shown below, with Black and White territories clearly visible!

{% include figure.liquid path="assets/img/speckit_ssd_go_game_8.png" title="speckit_ssd_go_game_8" %}

---

## Conclusion: Automation is About Respecting Your Time

> "A good engineer doesn't just write code; they design systems."

Through SpecKit and the SDD development model, we successfully transformed complex Go rules and graph theory algorithms into organized architectural designs and task lists. **This isn't just about speeding up development; it's about increasing the "certainty" of development.**

AI no longer guesses blindly like a headless fly (Vibe Coding); it obediently follows our defined core domain models (DDD) and pure function principles for implementation. If you are struggling with unclear specs in early project stages and crumbling architecture later on, try incorporating SpecKit into your development workflow. Let AI become your best teammate for streamlining logic and guarding technical plans!

### 💡 Interaction and Sharing

If it were you, what kind of complex project would you want to challenge with SDD? (For example: a Texas Hold'em engine, an automated scheduling system, or more complex financial trading logic?)

**Feel free to share your thoughts in the comments below, or subscribe to my blog for more AI development hands-on experience!**
{: .notice--success}

---

### 🎮 Live Demo

If you want to experience this Go game built with the SDD model yourself, feel free to click the link below:

[**👉 Click here to play Go Game React**](https://nickhuangcyh.github.io/go-game-react/)
