---
layout: post
title: "Beyond Vibe Coding's Architectural Chaos: Building an SEC Tracker with OpenSpec's 'Artifact-Driven' Workflow, Turning AI into Your Senior Architect"
date: 2026-05-16 23:30:00 +0800
description: "Continuing the spirit of SDD (Specification-Driven Development), this time we level up to the OpenSpec framework. Using the Proposal → Specs → Design → Tasks 'artifact-driven' workflow, we demonstrate how to make AI reliably produce complex cross-stack systems, with SEC Insider Tracker as our case study."
tags: [AI, SDD, OpenSpec, GitHub Actions, Python, LLM, Agent]
categories: [AI, Software Engineering]
toc:
  sidebar: right
thumbnail: /assets/img/openspec_cover.png
---

{% include figure.liquid path="assets/img/openspec_cover.png" title="openspec-vs-vibe" %}

## Introduction: Same Philosophy, Different Tools

In my previous article, I used SpecKit to run a full **SDD (Specification-Driven Development)** workflow, having AI precisely implement a Go game engine. The conclusion was clear: as long as specifications are defined clearly enough, AI can overcome hallucinations and produce high-quality code.

With the core SDD philosophy validated, I naturally became curious: **How do different SDD tools on the market differ in workflow design? What scenarios is each best suited for?**

This time I chose **OpenSpec** to implement a cross-stack integration system (Python + YAML + HTML/JS), with the goal of comparing its workflow style against SpecKit's. Both are excellent SDD frameworks, but they approach the problem from different angles — SpecKit emphasizes precise specification definition, while OpenSpec introduces an "artifact-driven" phased workflow.

Here's what stood out about OpenSpec during this implementation:

- **Enforced phased delivery**: You cannot skip the proposal and jump straight to code — every step has an explicit deliverable.
- **Inter-artifact dependencies**: Specs depend on the proposal, design depends on specs, tasks depend on design — each link in the chain builds upon the last.
- **Built-in archival and sync mechanisms**: Completed changes are archived, and specs are automatically merged into the project's Source of Truth.

### From "Specification-Driven" to "Artifact-Driven"

OpenSpec's greatest strength lies in its introduction of the "Artifacts" concept. Instead of producing just a single `spec.md`, it enforces a development workflow that operates like a professional software team, progressively producing four key documents:

| Artifact          | Role                 | What Problem Does It Solve?                                               |
| :---------------- | :------------------- | :------------------------------------------------------------------------ |
| **`proposal.md`** | Product Owner        | Defines WHY & WHAT, establishing "Capabilities" boundaries.               |
| **`specs/`**      | System Analyst (SA)  | Defines behavioral contracts and test scenarios for each capability.      |
| **`design.md`**   | System Designer (SD) | Defines HOW — directory structure, data schema, and tech stack decisions. |
| **`tasks.md`**    | Project Manager (PM) | Breaks down all designs into concrete, trackable atomic tasks.            |

**Before `tasks.md` is generated, AI is forbidden from writing a single line of production code.** This enforced Design First mode eliminates randomness from the development process.

---

## Environment Setup: Installing and Configuring OpenSpec

Before diving into the case study, let's get the tooling ready.

### 1. Install OpenSpec

```bash
npm install -g openspec-ai
```

After installation, verify the version:

```bash
openspec --version
```

### 2. Initialize the Project: `openspec init`

Navigate to your project root and run initialization:

```bash
cd ~/your-project
openspec init
```

During initialization, OpenSpec will ask which AI tool you want to pair with. In my case, I chose `gemini` for Gemini CLI. This generates:

- `openspec/` — OpenSpec's working directory (stores config, changes, specs)
- `.gemini/skills/openspec-*/` — AI Skills files
- `.gemini/commands/opsx/` — Available slash commands (e.g., `/opsx:explore`, `/opsx:new`, etc.)

{% include figure.liquid path="assets/img/openspec_init_1.png" title="Init1" %}

{% include figure.liquid path="assets/img/openspec_init_2.png" title="Init2" %}

{% include figure.liquid path="assets/img/openspec_init_3.png" title="Init3" %}

### 3. Configure Profile: `openspec config profile`

Next, set up your delivery mode and available workflow commands:

```bash
openspec config profile
```

The interactive menu will appear in sequence:

```
? What do you want to configure?
❯ Delivery and workflows
```

Select **Delivery and workflows**, then set the delivery mode:

```
✔ Delivery mode (how workflows are installed): Both (skills + commands)
```

Finally, check all available workflows (press Space to select all):

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

After configuration, run `openspec update` to apply your choices to the project:

```bash
openspec update
```

This regenerates all skill/command files based on your selections.

### 4. Set Up Project Config

Edit `openspec/config.yaml` to tell AI about your project context and rules:

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

**What `config.yaml` does**: Every time AI produces any artifact, the `context` is automatically injected into its instructions, so AI knows your tech stack and conventions without you repeating them every time. The `rules` section sets additional constraints for individual artifacts, ensuring outputs meet your quality standards.

> 💡 **In short: No config → AI guesses your tech stack; With config → AI outputs directly match your project's conventions.**
> {: .notice--info}

---

## Case Study: SEC Insider Tracker

My goal was to build a tracking system that automatically fetches SEC Form 4 filings daily and publishes them to GitHub Pages. The hardest constraint: **zero cost, no backend, no dynamic database.**

### Step 1: `/opsx:explore` — The Architect's Brainstorm

OpenSpec provides an exploration mode. Instead of jumping straight into work, we first discuss architecture with AI:

> "What's the most reliable way to fetch SEC Form 4 data? How do we store 6 months of data on GitHub Pages with no database?"

AI analyzed the pros and cons of the `edgartools` library and suggested a **"Daily JSON Sharding"** strategy: produce one `YYYY-MM-DD.json` file per day alongside an `index.json` manifest. This is far more suitable for frontend consumption than a single large JSON file.

{% include figure.liquid path="assets/img/openspec_explore.png" title="Explore Mode" %}

---

### Step 2: From Proposal to Design — Establishing the Technical Blueprint

Through `/opsx:new` and `/opsx:continue`, we progressively solidified our artifacts. In `design.md`, we established several key decisions:

1. **Directory structure**: Strict separation of `scripts/` (Python), `data/` (JSON), `.github/workflows/` (Actions).
2. **Storage strategy**: Keep only the most recent 180 days of files; older ones are automatically deleted by the script.
3. **Frontend strategy**: No complex frameworks — use Vanilla JS + Tailwind CDN, directly fetching static JSON.

> 💡 **This is the key:** All "open questions" (e.g., whether to implement pagination, how filtering works) are decided during the Design phase, preventing AI from "improvising" during implementation.
> {: .notice--info}

{% include figure.liquid path="assets/img/openspec_new.png" title="New Change" %}

{% include figure.liquid path="assets/img/openspec_continue.png" title="Continue Change" %}

---

### Step 3: `/opsx:apply` — Implementation by the Book

Entering the implementation phase, OpenSpec's Agent reads all documents as context, then begins executing `tasks.md` items one by one.

```bash
/opsx:apply setup-insider-tracker
```

During this process, we encountered an interesting challenge: SEC's API doesn't update on weekends, causing the script to time out when no data is available. Because we had rigorous `specs`, AI didn't guess blindly — it paused and discussed with me. We ultimately modified the logic: **"Automatically look back up to three days to find the most recent trading day with data."**

**This fluidity of "pause → discuss → modify artifacts → continue implementation" is something traditional Vibe Coding simply cannot match.**

{% include figure.liquid path="assets/img/openspec_apply.png" title="Task Execution" %}

---

### Step 4: `/opsx:archive` — Specs as Assets

Once all tasks are checked off, we archive. OpenSpec does something very cool: it automatically merges the specs written during this development cycle back into the project's main specs directory.

This means that as your project grows, your specification library automatically becomes richer — **it's a living development record that stays in sync with the code, not documentation that becomes outdated the moment it's written.**

{% include figure.liquid path="assets/img/openspec_archive.png" title="Archiving the Change" %}

{% include figure.liquid path="assets/img/openspec_insider_trading.png" title="Insider Trading" %}

---

## Conclusion: The Engineer's Soul Lies in "Defining"

> "Automation is not about making coding faster; it's about making correctness easier."

After using OpenSpec, I found myself spending less time "writing code" but more time "defining systems." And that is precisely where a senior engineer's value lies.

Through the artifact-driven workflow, AI is no longer an unruly typist — it becomes a software team that faithfully executes your architectural blueprint. If you're building systems with any degree of complexity, I strongly recommend you step away from the chat box and try running a full SDD workflow with OpenSpec.

### 💡 Discussion & Sharing

If it were you, what kind of automated system would you want to design with OpenSpec? A personal finance dashboard, an automated scraper, or an AI content farm manager?

**Share your thoughts in the comments below — let's explore the limits of AI engineering together!**
{: .notice--success}

---

### 🚀 Live Demo

This SEC Insider Trading Tracker is currently running in production. You can see the high-quality results produced by this "artifact-driven" workflow:

[**👉 View the SEC Insider Tracker**](https://nickhuangcyh.github.io/sec-insider-tracker/)
[**👉 Browse the OpenSpec Artifacts for This Project**](https://github.com/nickhuangcyh/sec-insider-tracker/tree/main/openspec)
