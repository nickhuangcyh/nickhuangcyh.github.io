---
layout: post
title: 🤖 AI Agent 系列（一）：搞懂 LLM、RAG 與 MCP 的核心互動邏輯
date: 2025-07-24 20:00:00 +0800
description: 這篇文章會帶你從零開始理解什麼是 AI Agent，深入介紹 LLM、RAG、MCP 等背後技術，並揭開它們如何協作完成智慧任務的神秘面紗。
tags: [AI Agent, LLM, RAG, MCP, AI Programming]
categories: [AI, Agent, Developer Tools]
toc:
  # beginning: true
  sidebar: right
thumbnail: /assets/img/igor-omilaev-eGGFZ5X2LnA-unsplash.jpg
---

# 🧠 AI Agent 系列（一）：解密 AI Agent、MCP、LLM 與 RAG

---

## 🤖 什麼是 AI？

人工智慧（Artificial Intelligence, AI）是指讓電腦系統能夠執行過去只有人類才能完成的「智慧型」任務，例如：理解語言、辨識圖像、規劃路徑、下棋、甚至創作內容。AI 的本質，是讓機器能夠「感知、推理、學習、決策」，並根據環境做出適當反應。

AI 的發展經歷了幾個重要階段：

- **符號式 AI（Symbolic AI）**：早期以邏輯規則、專家系統為主，強調明確規則推理。
- **機器學習（Machine Learning）**：讓電腦從資料中自動學習規律，包含監督式、非監督式、強化學習等。
- **深度學習（Deep Learning）**：以類神經網路為基礎，能處理大量非結構化資料（如語音、影像、自然語言）。
- **生成式 AI（Generative AI）**：如近年的 LLM（大型語言模型），能生成自然語言、程式碼、圖像等內容。

現今最熱門的 AI 技術，正是以深度學習為基礎的 LLM（如 Google Gemini 2.5 Pro、Anthropic Claude Sonnet 4、OpenAI GPT-4.1），它們能理解語意、推理、甚至創造新知。

---

## 🚀 什麼是 AI Agent？

AI Agent 是 AI 技術的進階應用。它不僅僅是「會聊天」的機器人，而是能主動感知環境、規劃行動、執行任務的智慧體。你可以把 AI Agent 想像成一位「數位助理」：

- 能理解你的需求（靠 LLM）
- 不懂的會主動查資料（靠 RAG）
- 能和各種工具協作（靠 MCP）
- 最終幫你完成複雜的自動化工作

AI Agent 的核心組件有三個：
**LLM（大腦）**、**RAG（查資料的助手）**、**MCP（溝通協議）**。

---

## 🧩 AI Agent 背後的三大核心技術

### 1. LLM：AI Agent 的大腦

大語言模型（Large Language Models, LLM）是 AI Agent 的「大腦」，負責理解需求、記住上下文、產生回應。

目前最強的 LLM 代表有：

- **Google Gemini 2.5 Pro**
- **Anthropic Claude Sonnet 4**
- **OpenAI GPT-4.1**

這些模型能理解自然語言、生成程式碼、甚至推理和規劃。

📌 **關鍵限制**：
LLM 雖然很強，但「記憶力」有限（context window），遇到大型專案或複雜資料時，容易遺漏細節或胡亂猜測。

---

### 2. RAG：AI Agent 的「查資料小幫手」

RAG（Retrieval-Augmented Generation）就像是 LLM 的「資料助理」。
當 LLM（如 Google Gemini 2.5 Pro、Claude Sonnet 4、GPT-4.1）不知道答案時，RAG 會幫它「先去查資料」，再把找到的內容丟給 LLM 產生更準確的回應。

舉例：
你問 Agent：「請幫我總結這個專案的 utils 功能」
→ RAG 先在程式碼庫裡找出 utils 相關內容
→ 再交給 LLM 產生總結

---

### 3. MCP：AI Agent 的「專屬 API 協議」

MCP（Multi-Component Protocol）就像是 AI Agent 的「溝通語言」或「API 協議」。
它讓 LLM（如 Gemini 2.5 Pro、Claude Sonnet 4、GPT-4.1）能和外部工具（如 CLI、Git、IDE）進行結構化、多輪的溝通。

例如：

- `get_codebase_summary`
- `refactor_file`
- `generate_unit_test`

MCP 通常用 JSON 格式，讓 LLM 和外部世界順暢對話。

---

## 🧠 三者如何協作？

1. **LLM** 理解你的需求（如「重構 utils」）
2. **RAG** 幫忙查找相關內容
3. **MCP** 負責下指令、溝通外部工具
4. **LLM** 綜合資料，產生最終回應

這就像你請一位助理（LLM）幫你寫報告，助理不懂的地方會先去圖書館（RAG）查資料，查完後再用專業術語（MCP）和其他部門協作，最後交出一份完整的成果。

---

## 🎯 Agent 與 Chatbot 的差異是什麼？

| 項目       | Chatbot    | AI Agent                       |
| ---------- | ---------- | ------------------------------ |
| 功能       | 問答、對話 | 主動任務執行、自動操作         |
| 記憶能力   | 多為短期   | 可結合 Memory 長期記憶 + RAG   |
| 工具整合   | 少         | 深度整合 CLI、Git、IDE、API 等 |
| 任務複雜度 | 一問一答   | 多步驟推理（Multi-turn Task）  |

---

## 🧱 延伸閱讀（預告下一篇）

在接下來的系列中，我會針對每一套熱門的 AI Agent 工具進行深入解析，例如：

- Cursor：如何幫你理解整個專案
- Claude Code：怎麼幫你多檔案推理
- Trae：如何打造你自己的簡易 Agent 框架
- Gemini CLI、Copilot、Kiro 又各自有什麼優劣？

👉 **下一篇文章將帶你認識 Trae：一套最適合開發者的輕量 Agent 框架！**

---

📌 如果你覺得這系列對你有幫助，歡迎分享給對 AI 編程有興趣的朋友，或留言告訴我你最期待哪一篇！
