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
        },{id: "post-ai-agent-系列-一-搞懂-llm-rag-與-mcp-的核心互動邏輯",
        
          title: "🤖 AI Agent 系列（一）：搞懂 LLM、RAG 與 MCP 的核心互動邏輯",
        
        description: "這篇文章會帶你從零開始理解什麼是 AI Agent，深入介紹 LLM、RAG、MCP 等背後技術，並揭開它們如何協作完成智慧任務的神秘面紗。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai/agent/developer%20tools/intro-to-ai-agents-mcp-rag-llm/";
          
        },
      },{id: "post-如何在一台電腦上管理多個-github-帳號-完整-ssh-設定教學",
        
          title: "如何在一台電腦上管理多個 GitHub 帳號：完整 SSH 設定教學",
        
        description: "學會如何用 SSH 金鑰在同一台電腦上高效管理多個 GitHub 帳號，無縫切換工作與個人身份，提升開發效率。圖文詳解，實戰範例，適合所有軟體工程師！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/productivity/github/development/how-to-use-multiple-github-accounts-using-ssh/";
          
        },
      },{id: "post-excalidraw-ai-用文字指令生成專業圖表的完整指南",
        
          title: "Excalidraw AI：用文字指令生成專業圖表的完整指南",
        
        description: "善用 Excalidraw AI，透過簡單文字描述快速生成專業流程圖、技術架構圖，極大提升工作效率。適合開發者、設計師、商業分析師與教育工作者。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai%20tools/visualization/productivity/development/ai-tools-excalidraw-chart-guide/";
          
        },
      },{id: "post-2024-年最新版-macos-開發環境搭建全攻略",
        
          title: "2024 年最新版 macOS 開發環境搭建全攻略",
        
        description: "一站式掌握 macOS 專業開發環境搭建，涵蓋 Homebrew、Git、iTerm2、Zsh 及行動開發工具，助你高效提升生產力。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/setup%20guide/development/macos/productivity/setup-development-environment-on-a-new-macos/";
          
        },
      },{id: "post-設計模式-28-解譯器模式-interpreter-pattern-完整實戰指南",
        
          title: "設計模式 28：解譯器模式（Interpreter Pattern）完整實戰指南",
        
        description: "精通解譯器模式，學會打造語言解譯器、運算式解析器與彈性規則引擎。適合開發 DSL、規則系統與表達式處理的工程師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-28-interpreter-pattern/";
          
        },
      },{id: "post-設計模式-27-訪問者模式-visitor-pattern-iot-實戰全攻略",
        
          title: "設計模式 27：訪問者模式（Visitor Pattern）IoT 實戰全攻略",
        
        description: "精通訪問者模式，學會如何為物件結構新增操作、提升系統擴展性，並維持乾淨的程式架構。IoT 與軟體開發實例，適合進階工程師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-27-visitor-pattern/";
          
        },
      },{id: "post-設計模式-26-模板方法模式-template-method-pattern-完整實戰指南",
        
          title: "設計模式 26：模板方法模式（Template Method Pattern）完整實戰指南",
        
        description: "精通模板方法模式，學會打造可重用的演算法框架，實現資料格式轉換與高擴展性系統設計。圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-26-template-method-pattern/";
          
        },
      },{id: "post-設計模式-25-策略模式-strategy-pattern-完整實戰指南",
        
          title: "設計模式 25：策略模式（Strategy Pattern）完整實戰指南",
        
        description: "精通策略模式，學會打造彈性演算法、動態切換行為，讓程式碼低耦合、易維護。圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-25-strategy-pattern/";
          
        },
      },{id: "post-設計模式-24-狀態模式-state-pattern-完整實戰指南",
        
          title: "設計模式 24：狀態模式（State Pattern）完整實戰指南",
        
        description: "精通狀態模式，學會設計狀態機、根據狀態切換物件行為，打造彈性高、易維護的應用程式。圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-24-state-pattern/";
          
        },
      },{id: "post-設計模式-23-觀察者模式-observer-pattern-完整實戰指南",
        
          title: "設計模式 23：觀察者模式（Observer Pattern）完整實戰指南",
        
        description: "精通觀察者模式，學會設計事件驅動系統、通知機制，打造鬆耦合、可擴展的架構。圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-23-observer-pattern/";
          
        },
      },{id: "post-設計模式-22-備忘錄模式-memento-pattern-完整實戰與-undo-redo-範例",
        
          title: "設計模式 22：備忘錄模式（Memento Pattern）完整實戰與 Undo/Redo 範例",
        
        description: "精通備忘錄模式，學會實作狀態快照、歷史管理、強大 Undo/Redo 與資料復原。圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-22-memento-pattern/";
          
        },
      },{id: "post-設計模式-21-中介者模式全解析與實戰聊天室案例",
        
          title: "設計模式 21：中介者模式全解析與實戰聊天室案例",
        
        description: "掌握中介者模式，結合聊天室與系統協調實戰案例，深入理解如何降低耦合、提升可擴展性、集中通信邏輯。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-21-mediator-pattern/";
          
        },
      },{id: "post-設計模式-20-迭代器模式-iterator-pattern-檔案系統遍歷與資料結構彈性存取",
        
          title: "設計模式 20：迭代器模式（Iterator Pattern）——檔案系統遍歷與資料結構彈性存取",
        
        description: "精通迭代器模式，學會封裝集合遍歷邏輯，實現檔案系統、樹狀結構等彈性存取。圖文範例，適合軟體工程師、架構師與進階開發者。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-20-iterator-pattern/";
          
        },
      },{id: "post-設計模式-19-命令模式-command-pattern-遙控器-undo-redo-與操作解耦實戰",
        
          title: "設計模式 19：命令模式（Command Pattern）——遙控器、Undo/Redo 與操作解耦實戰",
        
        description: "精通命令模式，學會將操作封裝為物件，實現遙控器、Undo/Redo、操作日誌等彈性控制。圖文範例，適合軟體工程師、架構師與進階開發者。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-19-command-pattern/";
          
        },
      },{id: "post-設計模式-18-責任鏈模式-chain-of-responsibility-pattern-彈性請求處理與日誌系統實戰",
        
          title: "設計模式 18：責任鏈模式（Chain of Responsibility Pattern）——彈性請求處理與日誌系統實戰",
        
        description: "精通責任鏈模式，學會建立彈性請求處理鏈，動態組合多層處理器，打造高可擴展日誌與中介軟體系統。圖文範例與進階應用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-18-chain-of-responsibility-pattern/";
          
        },
      },{id: "post-設計模式-17-代理模式-proxy-pattern-存取控制-快取與分散式系統效能最佳化",
        
          title: "設計模式 17：代理模式（Proxy Pattern）——存取控制、快取與分散式系統效能最佳化",
        
        description: "精通代理模式，學會透過代理物件控制存取、實現快取與安全，優化分散式系統效能。以影音串流、API、資料庫等場景為例，圖文範例與進階應用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-17-proxy-pattern/";
          
        },
      },{id: "post-設計模式-16-享元模式-flyweight-pattern-大規模物件共享與效能最佳化實戰",
        
          title: "設計模式 16：享元模式（Flyweight Pattern）——大規模物件共享與效能最佳化實戰",
        
        description: "精通享元模式，學會透過物件共享大幅降低記憶體用量，優化效能，打造高效能大規模系統。以森林渲染、遊戲、圖形處理等場景為例，圖文範例與進階應用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-16-flyweight-pattern/";
          
        },
      },{id: "post-設計模式-15-外觀模式-家庭劇院系統簡化與統一介面實戰",
        
          title: "設計模式 15：外觀模式 - 家庭劇院系統簡化與統一介面實戰",
        
        description: "精通外觀模式，簡化複雜子系統，提供統一介面，提升程式碼可維護性。以家庭劇院系統為例，圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-15-facade-pattern/";
          
        },
      },{id: "post-設計模式-14-裝飾者模式-咖啡館-pos-實戰與動態功能擴充全攻略",
        
          title: "設計模式 14：裝飾者模式 - 咖啡館 POS 實戰與動態功能擴充全攻略",
        
        description: "精通裝飾者模式，動態擴充物件功能，維持彈性與可維護性。以咖啡館 POS 系統為例，圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-14-decorator-pattern/";
          
        },
      },{id: "post-設計模式-13-組合模式-composite-pattern-檔案系統與-ui-元件樹的統一管理",
        
          title: "設計模式 13：組合模式（Composite Pattern）——檔案系統與 UI 元件樹的統一管理",
        
        description: "精通組合模式，統一管理樹狀結構，讓單一物件與集合操作一致。檔案系統、UI 元件、組織架構等最佳實踐，圖文範例。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/design-pattern-13-composite-pattern/";
          
        },
      },{id: "post-jenkins-3-設定-ssh-憑證-實現安全-git-程式碼拉取",
        
          title: "Jenkins 3：設定 SSH 憑證，實現安全 Git 程式碼拉取",
        
        description: "詳解如何在 Jenkins 中設定 SSH 憑證，實現安全拉取 Git 倉庫程式碼。涵蓋金鑰產生、憑證管理與流水線整合全流程。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/ci/cd/security/jenkins/git/authentication/jenkins-3-configure-credentials-ssh/";
          
        },
      },{id: "post-設計模式-12-橋接模式-bridge-pattern-抽象與實作分離的彈性架構設計",
        
          title: "設計模式 12：橋接模式（Bridge Pattern）——抽象與實作分離的彈性架構設計",
        
        description: "精通橋接模式，學會抽象與實作分離，打造高彈性、易擴展的安全系統與通知架構。圖文範例，適合軟體工程師、架構師與進階開發者。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-12-bridge-pattern/";
          
        },
      },{id: "post-設計模式-11-介面卡模式-adapter-pattern-跨系統整合與相容性最佳實踐",
        
          title: "設計模式 11：介面卡模式（Adapter Pattern）——跨系統整合與相容性最佳實踐",
        
        description: "精通介面卡模式，學會讓不相容介面協同運作，整合舊系統與新架構，打造靈活可擴展的軟體。以股票資料整合為例，圖文範例與進階應用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-11-adapter-pattern/";
          
        },
      },{id: "post-google-adsense-網站變現全攻略-開發者必讀指南",
        
          title: "Google AdSense 網站變現全攻略：開發者必讀指南",
        
        description: "掌握如何將 Google AdSense 集成到你的网站，实现被动收入。涵盖注册、设置、优化与收益提升的实用技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/monetization/google/web%20development/google-adsense/";
          
        },
      },{id: "post-jenkins-伺服器建置-docker-安裝全流程實戰指南",
        
          title: "Jenkins 伺服器建置：Docker 安裝全流程實戰指南",
        
        description: "透過 Docker 容器快速建置 Jenkins 伺服器，詳解 CI/CD 自動化、Android 建置環境整合與生產部署最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/ci/cd/docker/automation/jenkins-2-how-to-setup-jenkins-server/";
          
        },
      },{id: "post-jenkins-1-什麼是-jenkins-ci-cd-自動化伺服器全解析",
        
          title: "Jenkins 1：什麼是 Jenkins——CI/CD 自動化伺服器全解析",
        
        description: "深入了解 Jenkins 這款強大的開源自動化伺服器，掌握其核心理念、優勢及如何革新軟體開發流程。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/ci/cd/software%20development/automation/build%20tools/jenkins-1-what-is-jenkins/";
          
        },
      },{id: "post-設計模式-10-單例模式-singleton-pattern-資料庫連線與全域狀態管理的唯一實例解決方案",
        
          title: "設計模式 10：單例模式（Singleton Pattern）——資料庫連線與全域狀態管理的唯一實例解決方案",
        
        description: "深入掌握單例模式（Singleton Pattern），確保類別僅有一個實例，並學會實作執行緒安全的單例，應用於資料庫連線、日誌系統與全域設定管理，提升效能與一致性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/database/design-pattern-10-singleton-pattern/";
          
        },
      },{id: "post-如何在-openssh-8-8-啟用-rsa-加密演算法金鑰-安全-ssh-連線全流程指南",
        
          title: "如何在 OpenSSH 8.8 啟用 RSA 加密演算法金鑰：安全 SSH 連線全流程指南",
        
        description: "掌握在 OpenSSH 8.8+ 環境下為舊系統和 Git 伺服器重新啟用 RSA 加密支援的完整方法，涵蓋排錯、安全建議與設定技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/cryptography/openssh/security/devops/how-to-enable-rsa-encryption-algorithm-key-in-openssh-8-8/";
          
        },
      },{id: "post-github-container-registry-ghcr-入門全攻略-容器映像管理與-ci-cd-實戰",
        
          title: "GitHub Container Registry (GHCR) 入門全攻略：容器映像管理與 CI/CD 實戰",
        
        description: "全面掌握 GitHub Container Registry，涵蓋 Docker 映像管理、GitHub Actions 自動化與容器化應用 CI/CD 最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/github/container%20technology/ci/cd/getting-started-with-github-container-registry/";
          
        },
      },{id: "post-設計模式-9-原型模式-高效物件複製與資源最佳化實戰",
        
          title: "設計模式 9：原型模式 - 高效物件複製與資源最佳化實戰",
        
        description: "精通原型模式，快速複製複雜物件，減少資源消耗，提升效能。圖文範例，適合軟體工程師、遊戲開發與高效能應用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/performance/design-pattern-9-prototype-pattern/";
          
        },
      },{id: "post-如何編譯-chiptool-for-android-matter-協議開發全流程實戰",
        
          title: "如何編譯 CHIPTool for Android：Matter 協議開發全流程實戰",
        
        description: "從原始碼編譯 Android 版 CHIPTool APK，詳解 Matter 協議開發、Docker 環境建置與常見建構問題排查。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/android%20development/iot/smart%20home/development%20tools/protocol%20development/how-to-build-chiptool-for-android/";
          
        },
      },{id: "post-設計模式-8-建造者模式-複雜物件的彈性組裝與步驟化建構",
        
          title: "設計模式 8：建造者模式 - 複雜物件的彈性組裝與步驟化建構",
        
        description: "精通建造者模式，逐步構建複雜物件，靈活配置選項參數，提升程式碼可讀性與維護性。圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/code%20quality/design-pattern-8-builder-pattern/";
          
        },
      },{id: "post-設計模式-7-抽象工廠模式-多區域產品家族的彈性創建",
        
          title: "設計模式 7：抽象工廠模式 - 多區域產品家族的彈性創建",
        
        description: "精通抽象工廠模式，打造多區域、多產品家族的彈性物件創建架構。學會支援全球化應用、平台差異與主題切換，圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/globalization/design-pattern-7-abstract-factory-pattern/";
          
        },
      },{id: "post-設計模式-6-工廠方法模式-多區域應用的彈性物件創建",
        
          title: "設計模式 6：工廠方法模式 - 多區域應用的彈性物件創建",
        
        description: "精通工廠方法模式，讓物件創建更具彈性與擴展性。學會實作多區域工廠，支援全球化應用，提升軟體架構靈活度。圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/globalization/design-pattern-6-factory-method-pattern/";
          
        },
      },{id: "post-設計模式-5-簡單工廠模式-動態飲品訂單系統的物件創建解法",
        
          title: "設計模式 5：簡單工廠模式 - 動態飲品訂單系統的物件創建解法",
        
        description: "精通簡單工廠模式，集中管理物件創建邏輯，分離變動與不變程式碼，提升維護性與彈性。圖文範例，適合軟體工程師與架構師。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/code%20quality/design-pattern-5-simple-factory-pattern/";
          
        },
      },{id: "post-設計模式-4-uml-圖解軟體架構與設計模式",
        
          title: "設計模式 4：UML 圖解軟體架構與設計模式",
        
        description: "精通 UML（統一建模語言），用圖像化方式規劃軟體架構與設計模式。學會類別圖、關係、最佳實踐，提升團隊溝通與設計能力。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/software%20architecture/design-pattern-4-uml/";
          
        },
      },{id: "post-google-wallet-smart-tap-深度解析-無接觸支付技術與未來趨勢",
        
          title: "Google Wallet Smart Tap 深度解析：無接觸支付技術與未來趨勢",
        
        description: "全面解讀 Google Wallet Smart Tap 技術，探索 NFC 通訊、終端整合與無接觸支付的未來。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/payments/technology/mobile%20development/digital%20wallets/google-wallet-smart-tap-exploring/";
          
        },
      },{id: "post-設計模式-3-設計模式總覽與系統化解題思路",
        
          title: "設計模式 3：設計模式總覽與系統化解題思路",
        
        description: "掌握設計模式的系統化應用方法，學會 Context-Forces-Problem-Solution 架構、模式分類與步驟，解決常見軟體設計難題。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/software%20architecture/design-pattern-3-design-pattern/";
          
        },
      },{id: "post-設計模式-2-物件導向設計原則-solid-全攻略",
        
          title: "設計模式 2：物件導向設計原則（SOLID）全攻略",
        
        description: "精通 SOLID 五大設計原則，打造高可維護、高擴展性的物件導向軟體。圖文範例，適合軟體工程師、架構師與進階開發者。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/code%20quality/design-pattern-2-design-principle/";
          
        },
      },{id: "post-設計模式-1-物件導向四大核心概念全解析-封裝-繼承-多型-抽象",
        
          title: "設計模式 1：物件導向四大核心概念全解析（封裝、繼承、多型、抽象）",
        
        description: "精通封裝、繼承、多型、抽象四大物件導向核心，打下設計模式與軟體架構的堅實基礎。圖文範例，適合軟體工程師、架構師與進階開發者。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/programming%20fundamentals/design-pattern-1-object-oriented-concepts/";
          
        },
      },{id: "post-ios-網路抓包全攻略-rvictl-wireshark-實戰詳解",
        
          title: "iOS 網路抓包全攻略：rvictl + Wireshark 實戰詳解",
        
        description: "掌握 iOS 網路抓包技巧，結合 rvictl 與 Wireshark，助力行動開發、IoT 除錯與網路分析。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tools/ios%20development/network%20analysis/how-to-capture-network-packet-on-ios/";
          
        },
      },{id: "post-android-網路抓包全攻略-tcpdump-wireshark-實戰詳解",
        
          title: "Android 網路抓包全攻略：tcpdump + Wireshark 實戰詳解",
        
        description: "掌握 Android 網路抓包技巧，結合 tcpdump 與 Wireshark，助力行動開發、流量分析與疑難排查。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/android%20development/network%20analysis/debugging/tools/how-to-capture-network-packet-on-android-using-tcpdump/";
          
        },
      },{id: "post-webrtc-完全指南-p2p-技術原理與-aws-kvs-實戰應用",
        
          title: "WebRTC 完全指南：P2P 技術原理與 AWS KVS 實戰應用",
        
        description: "深入解析 WebRTC 架構、訊號伺服器設計、ICE 協議流程與 AWS Kinesis Video Streams 實作，掌握即時通訊與 IoT 應用的 P2P 技術。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/web%20development/cloud%20computing/p2p-tech-3-webrtc-kvs/";
          
        },
      },{id: "post-stun-turn-與-ice-nat-穿透協議全攻略",
        
          title: "STUN、TURN 與 ICE：NAT 穿透協議全攻略",
        
        description: "精通 STUN、TURN、ICE 協議，掌握 NAT 穿透、P2P 連線、Symmetric NAT 處理與即時通訊系統建構。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/network%20technology/webrtc/development/p2p-tech-2-stun-turn-ice/";
          
        },
      },{id: "post-p2p-技術深度解析-ipv4-nat-與點對點通訊全攻略",
        
          title: "P2P 技術深度解析：IPv4、NAT 與點對點通訊全攻略",
        
        description: "掌握 P2P 技術核心：IPv4 位址、NAT 穿透技巧與點對點通訊協議，IoT 開發者與網路工程師必備指南。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/network%20technology/iot/development/p2p-tech-1-ipv4-nat/";
          
        },
      },{id: "post-3d-圖形引擎基礎-三角形-uv-映射-頂點與索引全解析",
        
          title: "3D 圖形引擎基礎：三角形、UV 映射、頂點與索引全解析",
        
        description: "3D 圖形程式設計必備知識。掌握建模邏輯、UV 映射觀念、頂點與索引管理，適用於遊戲開發、AR 與 3D 應用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/computer%20graphics/game%20development/3d-graphic-tips/";
          
        },
      },{id: "post-seo-指南-將你的-jekyll-部落格加入-google-search-console-並提交-sitemap",
        
          title: "SEO 指南：將你的 Jekyll 部落格加入 Google Search Console 並提交 Sitemap",
        
        description: "完整教學，讓你的 Jekyll 部落格被 Google 搜尋引擎收錄。學會用 Google Search Console 驗證網站所有權並提交 XML Sitemap，提升 SEO 收錄效率。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/seo/web%20development/how-to-add-your-jekyll-blog-website-to-google-search-console/";
          
        },
      },{id: "post-完整指南-用-jekyll-minimal-mistakes-在-github-pages-打造專業部落格",
        
          title: "完整指南：用 Jekyll + Minimal Mistakes 在 GitHub Pages 打造專業部落格",
        
        description: "逐步教學，帶你用 Jekyll 與 Minimal Mistakes 主題在 GitHub Pages 建立現代化、SEO 友善的部落格。涵蓋 Ruby 環境、主題自訂、部署與維護最佳實踐。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/web%20development/tutorial/creating-a-github-pages-with-jekyll-and-minimal-mistakes/";
          
        },
      },{id: "post-seo-指南-將你的-octopress-部落格加入-google-search-console-提升曝光度",
        
          title: "SEO 指南：將你的 Octopress 部落格加入 Google Search Console 提升曝光度",
        
        description: "逐步教學，讓你的 Octopress 或 Jekyll 部落格被 Google 搜尋引擎收錄。學會驗證網站所有權並提交到 Google Search Console，全面提升 SEO 成效。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/seo/web%20development/how-to-add-your-octopress-blog-website-to-google-search-console/";
          
        },
      },{id: "post-完整指南-用-octopress-與-github-pages-架設靜態部落格",
        
          title: "完整指南：用 Octopress 與 GitHub Pages 架設靜態部落格",
        
        description: "學會如何用 Octopress 與 GitHub Pages 建立專業靜態部落格。涵蓋安裝、設定、部署與內容管理的詳細教學，適合開發者入門。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/blog/web%20development/tutorial/octopress-setup/";
          
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
          window.open("https://www.linkedin.com/in/nick-huang-5485b315a", "_blank");
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
