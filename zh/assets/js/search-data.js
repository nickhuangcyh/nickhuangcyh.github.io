// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Hi, I’m Nick — a software engineer based in Taipei who enjoys building apps that make life a little easier. I specialize in iOS and Android development, with 9+ years of experience in Swift and Objective-C, and 6+ years with Kotlin.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-bookshelf",
          title: "bookshelf",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "post-從零打造-ai-code-review-agent-同步提升團隊效率與程式碼品質",
        
          title: "從零打造 AI Code Review Agent：同步提升團隊效率與程式碼品質",
        
        description: "本文分享運用 AI Agent 打造 AI Code Review 系統，透過自定義規則手冊實作精確的程式碼品質檢測，有效提升團隊開發效率並降低人工審核負擔。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai/software%20engineering/building-ai-code-review-agent/";
          
        },
      },{id: "post-devfest-2025-筆記-ai-agent-時代的開發者進化論",
        
          title: "DevFest 2025 筆記：AI Agent 時代的開發者進化論",
        
        description: "DevFest 2025 精彩回顧。深入探討 AI Agent、Gemini CLI、Google ADK 與 MCP 協議如何改變軟體開發。從 ezBundle 的實戰經驗到企業級 Agentic 架構，紀錄開發者在 AI 時代的角色轉變。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/conference/devfest-2025-notes/";
          
        },
      },{id: "post-claude-code-教學完整指南-30-實用技巧提升-ai-開發效率-2025最新",
        
          title: "Claude Code 教學完整指南：30+ 實用技巧提升 AI 開發效率【2025最新】",
        
        description: "掌握 Claude Code 從入門到進階的完整教學。涵蓋記憶系統、工作流程優化、自定義指令等 30+ 實用技巧。讓 AI 成為你的高效開發助手，提升 10 倍生產力！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai%20development%20tools/claude-code-tips-and-best-practices/";
          
        },
      },{id: "post-ai-agent-系列-一-搞懂-llm-rag-與-mcp-的核心互動邏輯",
        
          title: "🤖 AI Agent 系列（一）：搞懂 LLM、RAG 與 MCP 的核心互動邏輯",
        
        description: "本文將帶你快速了解 AI Agent、LLM、RAG 與 MCP 的核心原理及其協作方式。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai/machine-learning/developer-tools/programming/intro-to-ai-agents-mcp-rag-llm/";
          
        },
      },{id: "post-一台電腦操作多個-github-帳號-最簡單快速的-ssh-設定方法",
        
          title: "💡 一台電腦操作多個 GitHub 帳號：最簡單快速的 SSH 設定方法",
        
        description: "讓你的電腦同時操作多個 GitHub 帳號，適合有多個身分或工作/個人帳號的開發者使用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/git/github/developer-tools/how-to-use-multiple-github-accounts-using-ssh/";
          
        },
      },{id: "post-如何使用-excalidraw-ai-快速生成專業級圖表-提升工作效率",
        
          title: "🚀 如何使用 Excalidraw AI 快速生成專業級圖表，提升工作效率！",
        
        description: "使用 Excalidraw AI 只需輸入文字描述，即可快速生成流程圖、技術架構圖、心智圖等，提升工作效率！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai-tools/visualization/productivity/design/ai-tools-excalidraw-chart-guide/";
          
        },
      },{id: "post-macos-開發環境完整設定教學-行動裝置開發工具鏈配置指南",
        
          title: "macOS 開發環境完整設定教學：行動裝置開發工具鏈配置指南",
        
        description: "學會在新 macOS 系統上建置完整的行動裝置開發環境。詳細解析 Homebrew、Git、Xcode、Android Studio 等工具的安裝與配置。包含終端優化、環境變數設定與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/setup%20guide/setup-development-environment-on-a-new-macos/";
          
        },
      },{id: "post-design-pattern-28-interpreter-pattern-解譯器模式",
        
          title: "Design Pattern (28) - Interpreter Pattern (解譯器模式)",
        
        description: "解譯器模式用於構建一個可解讀特定語言或語法的系統，適合於處理複雜的規則判斷或指令語法。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design-patterns/software-engineering/programming/object-oriented-design/design-pattern-28-interpreter-pattern/";
          
        },
      },{id: "post-design-pattern-27-visitor-pattern-訪問者模式",
        
          title: "Design Pattern (27) - Visitor Pattern (訪問者模式)",
        
        description: "訪問者模式提供了一種方式，讓我們能在不修改物件結構的前提下，為其增加新的操作邏輯，實現高擴展性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design-patterns/software-engineering/iot/mobile-development/design-pattern-27-visitor-pattern/";
          
        },
      },{id: "post-設計模式-26-模板方法模式-定義演算法骨架-提升程式碼復用性與系統擴展能力",
        
          title: "設計模式（26）模板方法模式：定義演算法骨架，提升程式碼復用性與系統擴展能力",
        
        description: "深入解析模板方法模式（Template Method Pattern），學習如何定義演算法骨架、實現程式碼復用，並透過資料格式轉換系統實例，掌握行為型設計模式的核心應用技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-26-template-method-pattern/";
          
        },
      },{id: "post-設計模式-25-策略模式-動態演算法切換-打造高擴展性電商運費系統",
        
          title: "設計模式（25）策略模式：動態演算法切換，打造高擴展性電商運費系統",
        
        description: "完整解析策略模式（Strategy Pattern）的核心概念與實際應用，透過電商運費計算系統範例，學習如何實現動態演算法切換，提升程式碼的擴展性與維護性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-25-strategy-pattern/";
          
        },
      },{id: "post-設計模式-24-狀態模式-智慧飲水機狀態管理-實現物件行為動態切換",
        
          title: "設計模式（24）狀態模式：智慧飲水機狀態管理，實現物件行為動態切換",
        
        description: "深度解析狀態模式（State Pattern）核心概念，透過智慧飲水機系統實例，學習如何優雅管理物件狀態轉換，降低程式耦合度並提升系統擴展性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-24-state-pattern/";
          
        },
      },{id: "post-設計模式-23-觀察者模式-智慧安全系統一對多通知機制-實現即時警報推送",
        
          title: "設計模式（23）觀察者模式：智慧安全系統一對多通知機制，實現即時警報推送",
        
        description: "深入探討觀察者模式（Observer Pattern）核心原理，透過智慧安全系統警報機制實例，學習如何建構鬆耦合的一對多通知系統，提升系統擴展性與維護性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-23-observer-pattern/";
          
        },
      },{id: "post-設計模式-22-備忘錄模式-實現文字編輯器復原功能-完美封裝物件狀態快照",
        
          title: "設計模式（22）備忘錄模式：實現文字編輯器復原功能，完美封裝物件狀態快照",
        
        description: "深入剖析備忘錄模式（Memento Pattern）核心原理，透過文字編輯器復原（Undo）功能實例，學習如何安全保存與恢復物件狀態，實現完整的狀態管理系統。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-22-memento-pattern/";
          
        },
      },{id: "post-設計模式-21-中介者模式-智慧家居系統元件協調-降低物件間複雜耦合關係",
        
          title: "設計模式（21）中介者模式：智慧家居系統元件協調，降低物件間複雜耦合關係",
        
        description: "全面解析中介者模式（Mediator Pattern）設計原理，透過智慧家居控制系統範例，學習如何優雅協調多個物件間的複雜互動，實現低耦合高內聚的系統架構。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-21-mediator-pattern/";
          
        },
      },{id: "post-設計模式-20-迭代器模式-統一資料遍歷介面-優雅存取多種集合結構",
        
          title: "設計模式（20）迭代器模式：統一資料遍歷介面，優雅存取多種集合結構",
        
        description: "詳細探討迭代器模式（Iterator Pattern）的設計精髓，透過音樂播放清單管理實例，學習如何建立統一的遍歷介面，隱藏集合內部結構複雜度。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-20-iterator-pattern/";
          
        },
      },{id: "post-設計模式-19-命令模式-智慧家電遙控系統-實現操作封裝與復原機制",
        
          title: "設計模式（19）命令模式：智慧家電遙控系統，實現操作封裝與復原機制",
        
        description: "深度剖析命令模式（Command Pattern）核心概念，透過智慧家電遙控器實例，學習如何將操作請求封裝成物件，實現復原功能與操作歷史管理。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-19-command-pattern/";
          
        },
      },{id: "post-設計模式-18-責任鏈模式-動態日誌處理系統設計指南-chain-of-responsibility-pattern",
        
          title: "設計模式（18）責任鏈模式：動態日誌處理系統設計指南 Chain of Responsibility Pattern",
        
        description: "完整解析責任鏈模式 Chain of Responsibility Pattern 實作技巧，學習透過動態處理鏈設計靈活的日誌系統，掌握行為型設計模式的核心應用與最佳實踐方法。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-18-chain-of-responsibility-pattern/";
          
        },
      },{id: "post-設計模式-17-代理模式-智能快取系統設計指南-proxy-pattern",
        
          title: "設計模式（17）代理模式：智能快取系統設計指南 Proxy Pattern",
        
        description: "深入解析代理模式 Proxy Pattern 實作技巧，學習透過智慧代理物件控制存取權限，實現快取機制與效能優化，掌握結構型設計模式的進階應用技術。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-17-proxy-pattern/";
          
        },
      },{id: "post-設計模式-16-享元模式-記憶體優化與效能提升指南-flyweight-pattern",
        
          title: "設計模式（16）享元模式：記憶體優化與效能提升指南 Flyweight Pattern",
        
        description: "深入解析享元模式 Flyweight Pattern 實作技巧，學習透過物件共享技術大幅減少記憶體使用，掌握大量物件管理與效能優化的結構型設計模式核心概念。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-16-flyweight-pattern/";
          
        },
      },{id: "post-設計模式-15-外觀模式-統一介面設計與系統整合指南-facade-pattern",
        
          title: "設計模式（15）外觀模式：統一介面設計與系統整合指南 Facade Pattern",
        
        description: "完整解析外觀模式 Facade Pattern 實作技巧，學習如何透過統一介面簡化複雜子系統，掌握結構型設計模式的系統整合與介面封裝核心概念與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-15-facade-pattern/";
          
        },
      },{id: "post-設計模式-14-裝飾者模式-動態功能擴展與組合設計指南-decorator-pattern",
        
          title: "設計模式（14）裝飾者模式：動態功能擴展與組合設計指南 Decorator Pattern",
        
        description: "深入解析裝飾者模式 Decorator Pattern 實作技巧，學習如何透過物件包裝技術動態擴展功能，掌握結構型設計模式的組合式功能增強與靈活系統設計方法。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-14-decorator-pattern/";
          
        },
      },{id: "post-設計模式-13-組合模式-樹狀結構統一操作設計指南-composite-pattern",
        
          title: "設計模式（13）組合模式：樹狀結構統一操作設計指南 Composite Pattern",
        
        description: "深入解析組合模式 Composite Pattern 實作技巧，學習如何統一處理個別物件與物件集合，掌握樹狀結構管理與遞迴操作的結構型設計模式核心應用技術。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-13-composite-pattern/";
          
        },
      },{id: "post-jenkins-3-ssh-憑證配置完全指南-安全連接-git-倉庫實作教學",
        
          title: "Jenkins（3）SSH 憑證配置完全指南：安全連接 Git 倉庫實作教學",
        
        description: "深入解析 Jenkins SSH 憑證配置技巧，學習如何安全地透過 SSH 金鑰連接 GitHub GitLab 等 Git 倉庫，掌握 CI/CD 流程中的身份驗證與程式碼拉取最佳實踐方法。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/jenkins-3-configure-credentials-ssh/";
          
        },
      },{id: "post-設計模式-12-橋接模式-bridge-pattern-完整解析-解耦抽象與實現-打造靈活系統架構",
        
          title: "設計模式（12）橋接模式 Bridge Pattern 完整解析：解耦抽象與實現，打造靈活系統架構",
        
        description: "深入剖析橋接模式如何解決多維度設計難題，透過分離抽象與實現避免類別爆炸問題。從保全系統實例學會 Bridge Pattern 核心概念、UML設計、Kotlin實作與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-12-bridge-pattern/";
          
        },
      },{id: "post-設計模式-11-轉接器模式-adapter-pattern-完整教學-解決介面不相容問題",
        
          title: "設計模式（11）轉接器模式 Adapter Pattern 完整教學：解決介面不相容問題",
        
        description: "學會 Adapter Pattern 如何解決系統整合中的介面不相容問題。從股票數據 XML-JSON 轉換實例學會設計模式核心概念、UML架構、Kotlin實作、適用情境與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-11-adapter-pattern/";
          
        },
      },{id: "post-google-adsense-申請與設定完整教學-讓網站開始獲利",
        
          title: "💰 Google AdSense 申請與設定完整教學：讓網站開始獲利",
        
        description: "如何透過 Google AdSense 爲我們的網站加入廣告賺取收益",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/digital-marketing/monetization/google-services/web-development/google-adsense/";
          
        },
      },{id: "post-jenkins-2-伺服器架設完全指南-docker-環境快速部署教學",
        
          title: "Jenkins（2）伺服器架設完全指南：Docker 環境快速部署教學",
        
        description: "完整解析 Jenkins 伺服器架設步驟，學習使用 Docker 快速部署 Jenkins CI/CD 環境，包含標準版與 Android 建構環境配置，掌握 DevOps 自動化基礎設施建置技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/jenkins-2-how-to-setup-jenkins-server/";
          
        },
      },{id: "post-jenkins-1-什麼是-jenkins-devops-自動化入門完全指南",
        
          title: "Jenkins（1）什麼是 Jenkins：DevOps 自動化入門完全指南",
        
        description: "完整解析 Jenkins 自動化伺服器核心概念，學習 CI/CD 持續整合持續交付基礎知識，掌握 DevOps 工具選擇與 Pipeline 流水線設計，開發團隊效率提升必備技能。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/jenkins-1-what-is-jenkins/";
          
        },
      },{id: "post-design-pattern-10-singleton-pattern-單例模式",
        
          title: "Design Pattern (10) - Singleton Pattern (單例模式)",
        
        description: "深入單例模式：如何確保一個類別只有一個實體，提供一個全域",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design-patterns/software-engineering/programming/system-architecture/design-pattern-10-singleton-pattern/";
          
        },
      },{id: "post-openssh-8-8-rsa-加密支援完整教學-解決相容性問題與安全配置",
        
          title: "OpenSSH 8.8 RSA 加密支援完整教學：解決相容性問題與安全配置",
        
        description: "學會如何解決 OpenSSH 8.8 版本中 RSA 加密算法被禁用的問題。詳細解析安全性考量、相容性解決方案與最佳實踐。包含 Jenkins CI/CD、Docker 環境與 GitLab 整合等實用情境。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/cryptography/openssh/security/how-to-enable-rsa-encryption-algorithm-key-in-openssh-8-8/";
          
        },
      },{id: "post-github-container-registry-完整教學-容器映像管理與-ci-cd-部署指南",
        
          title: "GitHub Container Registry 完整教學：容器映像管理與 CI/CD 部署指南",
        
        description: "學會如何使用 GitHub Container Registry 管理 Docker 映像與建置 CI/CD 流程。從 Jenkins Master-Slave 架構實例深入了解容器化部署、版本管理、身份驗證與最佳實踐。適用於 DevOps 工程師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/getting-started-with-github-container-registry/";
          
        },
      },{id: "post-設計模式-9-原型模式-prototype-pattern-完整教學-物件複製與效能優化",
        
          title: "設計模式（9）原型模式 Prototype Pattern 完整教學：物件複製與效能優化",
        
        description: "學會 Prototype Pattern 如何透過物件複製解決性能問題。從遊戲角色創建系統實例深入了解淺層與深層複製概念、Cloneable 介面實作與最佳實踐。包含 UML 設計與範例程式碼。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-9-prototype-pattern/";
          
        },
      },{id: "post-android-chiptool-建置完整教學-從原始碼編譯-matter-開發工具指南",
        
          title: "Android CHIPTool 建置完整教學：從原始碼編譯 Matter 開發工具指南",
        
        description: "學會如何從 Matter 原始碼編譯出 CHIPTool Android APK。詳細解決編譯過程中常見的環境配置、依賴套件與錯誤排除問題。包含完整的開發環境設置、編譯指令與實用技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tools/how-to-build-chiptool-for-android/";
          
        },
      },{id: "post-設計模式-8-建造者模式-builder-pattern-完整教學-分步構建複雜物件",
        
          title: "設計模式（8）建造者模式 Builder Pattern 完整教學：分步構建複雜物件",
        
        description: "學會 Builder Pattern 如何解決複雜物件的創建問題。從飲料客製化系統實例深入了解如何設計步驟式構建器，提升物件初始化的可讀性與靈活性。包含 UML 設計、實作範例與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-8-builder-pattern/";
          
        },
      },{id: "post-設計模式-7-拽象工廠模式-abstract-factory-pattern-完整教學-產品系列統一創建",
        
          title: "設計模式（7）拽象工廠模式 Abstract Factory Pattern 完整教學：產品系列統一創建",
        
        description: "學會 Abstract Factory Pattern 如何解決相關物件群的創建問題。從飲料店主題套裝實例深入了解如何設計統一的產品系列創建介面。包含 UML 設計、實作範例與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-7-abstract-factory-pattern/";
          
        },
      },{id: "post-設計模式-6-工廠方法模式-factory-method-pattern-完整教學-可擴展物件創建",
        
          title: "設計模式（6）工廠方法模式 Factory Method Pattern 完整教學：可擴展物件創建",
        
        description: "學會 Factory Method Pattern 如何解決 Simple Factory 的擴展性問題。從全球飲料連鎖店實例深入了解如何設計可擴展的物件創建系統。包含 UML 設計、實作範例與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-6-factory-method-pattern/";
          
        },
      },{id: "post-設計模式-5-簡單工廠模式-simple-factory-pattern-完整教學-封裝物件創建邏輯",
        
          title: "設計模式（5）簡單工廠模式 Simple Factory Pattern 完整教學：封裝物件創建邏輯",
        
        description: "從飲料店點餐系統實例學會簡單工廠模式的核心概念。深入了解如何封裝物件創建邏輯、減少程式碼重複、提升可維護性。包含 UML 設計、Swift/Kotlin 實作與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-5-simple-factory-pattern/";
          
        },
      },{id: "post-設計模式-4-uml-統一建模語言完整指南-類別圖與設計模式視覺化表達",
        
          title: "設計模式（4）UML 統一建模語言完整指南：類別圖與設計模式視覺化表達",
        
        description: "學會 UML 類別圖的基礎元素與關係表示法，包含 Class、Interface、繼承、關聯、組合與聚合等核心概念。掌握如何用 UML 視覺化表達設計模式，提升系統架構設計能力。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-4-uml/";
          
        },
      },{id: "post-深入解析-google-wallet-smart-tap-未來的支付方式",
        
          title: "深入解析 Google Wallet Smart Tap：未來的支付方式",
        
        description: "探索 Google Wallet Smart Tap 的運作原理和它如何改變我們的支付習慣。本文將帶你了解其背後的技術，以及它對未來支付生態系統的影響。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/pay/technology/google-wallet-smart-tap-exploring/";
          
        },
      },{id: "post-設計模式-3-設計模式核心概念-design-pattern-完整入門-四大要素與分類系統",
        
          title: "設計模式（3）設計模式核心概念 Design Pattern 完整入門：四大要素與分類系統",
        
        description: "學會 Design Pattern 的定義、目的與結構化思維。深入了解設計模式的四大要素：Context、Forces、Problem與Solution，以及創建型、結構型和行為型模式的完整分類系統。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-3-design-pattern/";
          
        },
      },{id: "post-設計模式-2-設計原則-solid-principles-完整教學-提升程式碼品質的五大原則",
        
          title: "設計模式（2）設計原則 SOLID Principles 完整教學：提升程式碼品質的五大原則",
        
        description: "深入解析 SOLID 五大設計原則：單一職責、開放封閉、里氏替換、介面隔離與依賴反轉。透過實用範例與程式碼演示，學會如何設計穩健、可維護的軟體系統。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-2-design-principle/";
          
        },
      },{id: "post-設計模式-1-物件導向概念-oop-concepts-完整教學-封裝繼承多型抽象核心原理",
        
          title: "設計模式（1）物件導向概念 OOP Concepts 完整教學：封裝繼承多型抽象核心原理",
        
        description: "深入學習物件導向程式設計四大核心概念：封裝、繼承、多型與抽象。透過生活化比喻與實用範例，為後續學習 Design Pattern 系列奠下穩固的技術基礎。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-1-object-oriented-concepts/";
          
        },
      },{id: "post-ios-網路封包捕獲完整教學-使用-rvictl-與-wireshark-除錯技巧",
        
          title: "iOS 網路封包捕獲完整教學：使用 rvictl 與 Wireshark 除錯技巧",
        
        description: "學會在 iOS 裝置上捕獲與分析網路封包的完整流程。詳細解析 rvictl 虛擬網路介面設定、Wireshark 封包分析與常見問題排除。適用於 iOS App 開發、IoT 除錯與網路安全分析。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tools/how-to-capture-network-packet-on-ios/";
          
        },
      },{id: "post-android-網路封包分析完整教學-使用-tcpdump-與-wireshark-除錯實戰",
        
          title: "Android 網路封包分析完整教學：使用 tcpdump 與 Wireshark 除錯實戰",
        
        description: "學會在 Android 裝置上使用 tcpdump 捕獲網路封包的完整流程。詳細解析 root 權限設定、tcpdump 指令使用、Wireshark 分析技巧與常見問題排除。適用於 Android App 開發者。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tools/how-to-capture-network-packet-on-android-using-tcpdump/";
          
        },
      },{id: "post-p2p-技術-3-webrtc-與-aws-kvs-完整實作-即時通訊與串流技術深入教學",
        
          title: "P2P 技術（3）WebRTC 與 AWS KVS 完整實作：即時通訊與串流技術深入教學",
        
        description: "學會 WebRTC 如何整合 STUN/TURN/ICE 技術實現即時通訊。深入了解 Signaling Server 設計、SDP 交換流程、AWS Kinesis Video Streams 雲端串流服務。從理論到實作，打造完整的 P2P 通訊系統。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/aws/p2p-tech-3-webrtc-kvs/";
          
        },
      },{id: "post-p2p-技術-2-stun-turn-ice-協定完整教學-nat-穿透解決方案深入解析",
        
          title: "P2P 技術（2）STUN、TURN、ICE 協定完整教學：NAT 穿透解決方案深入解析",
        
        description: "深入學習 STUN、TURN、ICE 三大協定如何解決 NAT 穿透問題。從伺服器反射、中繼傳輸到連線候選收集等細節，掌握如何建立穩定的 P2P 連線，打造高效率即時通訊系統。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/p2p-tech-2-stun-turn-ice/";
          
        },
      },{id: "post-p2p-技術-1-ipv4-與-nat-穿透完整解析-網路架構與連線原理深入教學",
        
          title: "P2P 技術（1）IPv4 與 NAT 穿透完整解析：網路架構與連線原理深入教學",
        
        description: "學會 P2P 網路通訊的核心概念與 IPv4/NAT 架構限制。深入了解四種 NAT 類型、穿透挑戰與解決方案。從 IPCam 影音串流實例學習物聯網裝置通訊原理，為後續 STUN/TURN/ICE 協定奠基礎。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/p2p-tech-1-ipv4-nat/";
          
        },
      },{id: "post-3d-圖形開發基礎教學-三角網格-uv-映射與頂點索引完整解析",
        
          title: "3D 圖形開發基礎教學：三角網格、UV 映射與頂點索引完整解析",
        
        description: "學會 3D 圖形程式設計的核心概念與實作技巧。深入了解三角網格建模、UV 紋理映射、頂點與索引管理等核心技術。適用於 OpenGL、ARKit、ARCore 等平台開發者。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/mobile/3d-graphic-tips/";
          
        },
      },{id: "post-jekyll-seo-完整教學-google-search-console-與-sitemap-配置指南",
        
          title: "Jekyll SEO 完整教學：Google Search Console 與 Sitemap 配置指南",
        
        description: "學會如何讓 Jekyll 静態網站被 Google 收錄與索引。從 Google Search Console 設定、Sitemap 產生到網站驗證等完整流程。包含 robots.txt 配置、網址結構優化與 SEO 最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/blog/how-to-add-your-jekyll-blog-website-to-google-search-console/";
          
        },
      },{id: "post-jekyll-建站完整教學-使用-minimal-mistakes-主題在-github-pages-架設部落格",
        
          title: "Jekyll 建站完整教學：使用 Minimal Mistakes 主題在 GitHub Pages 架設部落格",
        
        description: "學會從零開始使用 Jekyll 與 Minimal Mistakes 主題建置個人部落格。詳細解析 GitHub Pages 部署、主題客製化、網站配置與內容管理流程。包含 Ruby 環境設定、Markdown 寫作與 SEO 優化。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/blog/creating-a-github-pages-with-jekyll-and-minimal-mistakes/";
          
        },
      },{id: "post-octopress-seo-完整教學-google-search-console-與搜尋引擎索引優化",
        
          title: "Octopress SEO 完整教學：Google Search Console 與搜尋引擎索引優化",
        
        description: "學會如何讓 Octopress 靜態網站被 Google 收錄與索引。詳細解析 Google Search Console 設定、Sitemap 提交、網站驗證與 SEO 優化流程。包含 robots.txt 配置、網址結構與最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/blog/how-to-add-your-octopress-blog-website-to-google-search-console/";
          
        },
      },{id: "post-octopress-靜態部落格完整教學-github-pages-部署與主題客製化指南",
        
          title: "Octopress 靜態部落格完整教學：GitHub Pages 部署與主題客製化指南",
        
        description: "學會使用 Octopress 框架建置專業的靜態部落格。詳細解析 Ruby 環境設置、GitHub Pages 部署、主題客製化與內容管理流程。包含 Markdown 寫作、網站優化與維護技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/blog/octopress-setup/";
          
        },
      },{id: "books-die-kunst-über-geld-nachzudenken",
          title: 'Die Kunst über Geld nachzudenken',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/Die_Kunst_%C3%BCber_Geld_nachzudenken_by_Andr%C3%A9_Kostolany/";
            },},{id: "books-principles-life-and-work",
          title: 'Principles - Life and Work',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/principle_ray_dalio/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-asante-smart-home",
          title: 'Asante Smart Home',
          description: "Simply make your home smarter",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_asante_smart_home/";
            },},{id: "projects-asante-taptap-3",
          title: 'Asante TapTap 3',
          description: "Create stunning AI-powered musical light shows with just a tap",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_asante_taptap/";
            },},{id: "projects-asante-2-0-garageviewer",
          title: 'Asante 2.0 - GarageViewer',
          description: "Next-generation smart garage opener with camera and voice control",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_asante_smart_home_2_0/";
            },},{id: "projects-vesta-home-5",
          title: 'Vesta Home 5',
          description: "A secure and modern smart home app serving international users",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_climax_vesta_home_5/";
            },},{id: "projects-care-alert",
          title: 'Care Alert',
          description: "A healthcare-focused smart home solution for families and elders",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_climax_care_alert/";
            },},{id: "projects-tsp-3-touchscreen-keypad",
          title: 'TSP-3 Touchscreen Keypad',
          description: "A high-resolution touchscreen keypad for security and home automation control",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_climax_tsp3/";
            },},{id: "projects-tsp-1-bus-touchscreen-keypad",
          title: 'TSP-1-BUS Touchscreen Keypad',
          description: "A hardwired 7&quot; touchscreen keypad with RS485 BUS communication and smart home integration",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_climax_tsp1_bus/";
            },},{id: "projects-touchpanel-3",
          title: 'TouchPanel-3',
          description: "A 7&quot; high resolution color graphic touchscreen to control devices in the system via one single intuitive interface, with IP camera integration for real-time visual verification.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_climax_touchpanel_3/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/nickhuangcyh", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@UC6Dnl0rB-HAhfL2XWRIZXmg", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/nickhuangcyh", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/nickhuangcyh", "_blank");
        },
      },{
        id: 'social-facebook',
        title: 'Facebook',
        section: 'Socials',
        handler: () => {
          window.open("https://facebook.com/nickhuangcyh", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/nickhuangcyh", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/zh/feed.xml", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6E%69%63%6B%32%35%39%33%32%32%31%39@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
