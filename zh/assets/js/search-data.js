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
      },{id: "post-complete-macos-development-environment-setup-guide-for-2024",
        
          title: "Complete macOS Development Environment Setup Guide for 2024",
        
        description: "Master the complete setup of a professional development environment on macOS. Step-by-step guide covering Homebrew, Git, iTerm2, Zsh, and mobile development tools for maximum productivity.",
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
      },{id: "post-设计模式-21-中介者模式全解析与实战聊天室案例",
        
          title: "设计模式 21：中介者模式全解析与实战聊天室案例",
        
        description: "掌握中介者模式，结合聊天室与系统协调实战案例，深入理解如何降低耦合、提升可扩展性、集中通信逻辑。",
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
      },{id: "post-jenkins-3-配置-ssh-凭据-实现安全-git-代码拉取",
        
          title: "Jenkins 3：配置 SSH 凭据，实现安全 Git 代码拉取",
        
        description: "详解如何在 Jenkins 中配置 SSH 凭据，实现安全拉取 Git 仓库代码。涵盖密钥生成、凭据管理与流水线集成全流程。",
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
      },{id: "post-google-adsense-网站变现全攻略-开发者必读指南",
        
          title: "Google AdSense 网站变现全攻略：开发者必读指南",
        
        description: "掌握如何将 Google AdSense 集成到你的网站，实现被动收入。涵盖注册、设置、优化与收益提升的实用技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/monetization/google/web%20development/google-adsense/";
          
        },
      },{id: "post-jenkins-服务器搭建-docker-安装全流程实战指南",
        
          title: "Jenkins 服务器搭建：Docker 安装全流程实战指南",
        
        description: "通过 Docker 容器快速搭建 Jenkins 服务器，详解 CI/CD 自动化、Android 构建环境集成与生产部署最佳实践。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/ci/cd/docker/automation/jenkins-2-how-to-setup-jenkins-server/";
          
        },
      },{id: "post-jenkins-1-什么是-jenkins-ci-cd-自动化服务器全解析",
        
          title: "Jenkins 1：什么是 Jenkins——CI/CD 自动化服务器全解析",
        
        description: "深入了解 Jenkins 这款强大的开源自动化服务器，掌握其核心理念、优势及如何革新软件开发流程。",
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
      },{id: "post-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8-8-step-by-step-guide-for-secure-ssh-connections",
        
          title: "How to Enable RSA Encryption Algorithm Key in OpenSSH 8.8: Step-by-Step Guide for...",
        
        description: "Learn how to re-enable RSA encryption support in OpenSSH 8.8+ for legacy systems and Git servers. Step-by-step troubleshooting, security best practices, and configuration tips.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/cryptography/openssh/security/devops/how-to-enable-rsa-encryption-algorithm-key-in-openssh-8-8/";
          
        },
      },{id: "post-complete-guide-getting-started-with-github-container-registry-ghcr",
        
          title: "Complete Guide: Getting Started with GitHub Container Registry (GHCR)",
        
        description: "Master GitHub Container Registry with step-by-step tutorials. Learn Docker image management, GitHub Actions automation, and CI/CD best practices for containerized applications.",
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
      },{id: "post-how-to-build-chiptool-for-android-complete-guide-to-matter-protocol-development",
        
          title: "How to Build CHIPTool for Android: Complete Guide to Matter Protocol Development",
        
        description: "Learn how to build CHIPTool APK for Android from source code. Step-by-step guide for Matter protocol development, Docker setup, and troubleshooting common build issues.",
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
      },{id: "post-google-wallet-smart-tap-deep-dive-exploring-the-future-of-contactless-payments",
        
          title: "Google Wallet Smart Tap Deep Dive: Exploring the Future of Contactless Payments",
        
        description: "Explore Google Wallet Smart Tap technology and how it&#39;s revolutionizing payment systems. Learn about NFC communication, terminal integration, and the future of contactless transactions.",
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
      },{id: "post-how-to-capture-network-packets-on-ios-complete-guide-with-rvictl-and-wireshark",
        
          title: "How to Capture Network Packets on iOS: Complete Guide with rvictl and Wireshark...",
        
        description: "Master iOS network packet capture using rvictl and Wireshark. Learn debugging techniques for iOS apps, IoT development, and network troubleshooting with step-by-step instructions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tools/ios%20development/network%20analysis/how-to-capture-network-packet-on-ios/";
          
        },
      },{id: "post-android-network-packet-capture-complete-guide-with-tcpdump-and-wireshark",
        
          title: "Android Network Packet Capture: Complete Guide with tcpdump and Wireshark",
        
        description: "Master Android network packet capture using tcpdump and Wireshark. Step-by-step guide for debugging network issues, analyzing traffic, and troubleshooting connectivity problems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/android%20development/network%20analysis/debugging/tools/how-to-capture-network-packet-on-android-using-tcpdump/";
          
        },
      },{id: "post-complete-webrtc-guide-understanding-p2p-technology-with-aws-kvs-implementation",
        
          title: "Complete WebRTC Guide: Understanding P2P Technology with AWS KVS Implementation",
        
        description: "Deep dive into WebRTC architecture, signaling server design, ICE protocol flow, and AWS Kinesis Video Streams implementation. Master P2P technology for real-time communication and IoT applications.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/web%20development/cloud%20computing/p2p-tech-3-webrtc-kvs/";
          
        },
      },{id: "post-stun-turn-and-ice-complete-guide-to-nat-traversal-protocols",
        
          title: "STUN, TURN, and ICE: Complete Guide to NAT Traversal Protocols",
        
        description: "Master NAT traversal with STUN, TURN, and ICE protocols. Learn how to establish P2P connections, handle Symmetric NAT, and build robust real-time communication systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/network%20technology/webrtc/development/p2p-tech-2-stun-turn-ice/";
          
        },
      },{id: "post-p2p-technology-deep-dive-understanding-ipv4-nat-and-peer-to-peer-communication",
        
          title: "P2P Technology Deep Dive: Understanding IPv4, NAT, and Peer-to-Peer Communication",
        
        description: "Master P2P technology fundamentals: IPv4 addressing, NAT traversal techniques, and peer-to-peer communication protocols. Essential guide for IoT developers and network engineers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/network%20technology/iot/development/p2p-tech-1-ipv4-nat/";
          
        },
      },{id: "post-3d-graphics-engine-fundamentals-triangles-uv-mapping-vertices-amp-indices-explained",
        
          title: "3D Graphics Engine Fundamentals: Triangles, UV Mapping, Vertices &amp; Indices Explained",
        
        description: "Essential knowledge for 3D graphics programming. Master basic modeling logic, UV mapping concepts, and vertex/index management for game development, AR, and 3D applications.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/computer%20graphics/game%20development/3d-graphic-tips/";
          
        },
      },{id: "post-seo-guide-add-your-jekyll-blog-to-google-search-console-and-submit-sitemap",
        
          title: "SEO Guide: Add Your Jekyll Blog to Google Search Console and Submit Sitemap...",
        
        description: "Complete step-by-step guide to make your Jekyll blog discoverable on Google. Learn how to verify site ownership with Google Search Console and submit XML sitemaps for better SEO indexing.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/seo/web%20development/how-to-add-your-jekyll-blog-website-to-google-search-console/";
          
        },
      },{id: "post-complete-guide-build-a-professional-blog-with-jekyll-minimal-mistakes-on-github-pages",
        
          title: "Complete Guide: Build a Professional Blog with Jekyll + Minimal Mistakes on GitHub...",
        
        description: "Step-by-step tutorial to create a modern, SEO-friendly blog using Jekyll and Minimal Mistakes theme on GitHub Pages. Learn Ruby setup, theme customization, and deployment best practices for developers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/web%20development/tutorial/creating-a-github-pages-with-jekyll-and-minimal-mistakes/";
          
        },
      },{id: "post-seo-guide-add-your-octopress-blog-to-google-search-console-for-better-visibility",
        
          title: "SEO Guide: Add Your Octopress Blog to Google Search Console for Better Visibility...",
        
        description: "Step-by-step guide to make your Octopress or Jekyll blog discoverable on Google. Learn how to verify site ownership and submit your blog to Google Search Console for improved SEO.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/seo/web%20development/how-to-add-your-octopress-blog-website-to-google-search-console/";
          
        },
      },{id: "post-complete-guide-setting-up-a-static-blog-with-octopress-and-github-pages",
        
          title: "Complete Guide: Setting Up a Static Blog with Octopress and GitHub Pages",
        
        description: "Learn how to create a professional static blog using Octopress and GitHub Pages. Step-by-step tutorial covering installation, configuration, deployment, and content management for developers.",
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
