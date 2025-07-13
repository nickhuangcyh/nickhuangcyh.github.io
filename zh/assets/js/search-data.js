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
        },{id: "post-一台電腦操作多個-github-帳號-最簡單快速的-ssh-設定方法",
        
          title: "💡 一台電腦操作多個 GitHub 帳號：最簡單快速的 SSH 設定方法",
        
        description: "讓你的電腦同時操作多個 GitHub 帳號，適合有多個身分或工作/個人帳號的開發者使用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/devops/productivity/github/how-to-use-multiple-github-accounts-using-ssh/";
          
        },
      },{id: "post-如何使用-excalidraw-ai-快速生成專業級圖表-提升工作效率",
        
          title: "🚀 如何使用 Excalidraw AI 快速生成專業級圖表，提升工作效率！",
        
        description: "使用 Excalidraw AI 只需輸入文字描述，即可快速生成流程圖、技術架構圖、心智圖等，提升工作效率！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/ai%20tools/visualization/productivity/ai-tools-excalidraw-chart-guide/";
          
        },
      },{id: "post-setup-development-environment-on-a-new-macos",
        
          title: "Setup Development Environment on a New macOS",
        
        description: "Step-by-step guide to setting up a mobile development environment on a new macOS system.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/setup%20guide/setup-development-environment-on-a-new-macos/";
          
        },
      },{id: "post-design-pattern-28-interpreter-pattern-解譯器模式",
        
          title: "Design Pattern (28) - Interpreter Pattern (解譯器模式)",
        
        description: "解譯器模式用於構建一個可解讀特定語言或語法的系統，適合於處理複雜的規則判斷或指令語法。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-28-interpreter-pattern/";
          
        },
      },{id: "post-design-pattern-27-visitor-pattern-訪問者模式",
        
          title: "Design Pattern (27) - Visitor Pattern (訪問者模式)",
        
        description: "訪問者模式提供了一種方式，讓我們能在不修改物件結構的前提下，為其增加新的操作邏輯，實現高擴展性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-27-visitor-pattern/";
          
        },
      },{id: "post-design-pattern-26-template-method-pattern-模板方法模式",
        
          title: "Design Pattern (26) - Template Method Pattern (模板方法模式)",
        
        description: "模板方法模式提供了一個框架，允許子類別重新定義特定步驟的實作，保持核心流程的一致性，實現高復用性與靈活性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-26-template-method-pattern/";
          
        },
      },{id: "post-design-pattern-25-strategy-pattern-策略模式",
        
          title: "Design Pattern (25) - Strategy Pattern (策略模式)",
        
        description: "策略模式提供了一種靈活的解決方案，讓系統能根據需求動態切換不同的行為邏輯，實現高可擴展性與低耦合性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-25-strategy-pattern/";
          
        },
      },{id: "post-design-pattern-24-state-pattern-狀態模式",
        
          title: "Design Pattern (24) - State Pattern (狀態模式)",
        
        description: "透過狀態模式，設計一個飲水機的運作機制，根據不同狀態執行加熱、冷卻或待機的行為。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-24-state-pattern/";
          
        },
      },{id: "post-design-pattern-23-observer-pattern-觀察者模式",
        
          title: "Design Pattern (23) - Observer Pattern (觀察者模式)",
        
        description: "透過觀察者模式，實現安全系統主機的警報通知機制，當警報觸發時，主機自動通知平板、iOS 和 Android 手機。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-23-observer-pattern/";
          
        },
      },{id: "post-design-pattern-22-memento-pattern-備忘錄模式",
        
          title: "Design Pattern (22) - Memento Pattern (備忘錄模式)",
        
        description: "了解備忘錄模式如何幫助我們實現狀態恢復，像是常見的 Ctrl+Z 功能，讓我們回到之前的操作狀態。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-22-memento-pattern/";
          
        },
      },{id: "post-design-pattern-21-mediator-pattern-中介者模式",
        
          title: "Design Pattern (21) - Mediator Pattern (中介者模式)",
        
        description: "了解中介者模式如何協調物件之間的交互，減少物件之間的耦合性並促進系統的可擴展性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-21-mediator-pattern/";
          
        },
      },{id: "post-design-pattern-20-iterator-pattern-迭代器模式",
        
          title: "Design Pattern (20) - Iterator Pattern (迭代器模式)",
        
        description: "了解迭代器模式如何提供一種順序來訪問集合內元素的方法，而不需要暴露集合的底層表示。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-20-iterator-pattern/";
          
        },
      },{id: "post-design-pattern-19-command-pattern-命令模式",
        
          title: "Design Pattern (19) - Command Pattern (命令模式)",
        
        description: "了解命令模式如何將操作與執行解耦，讓程式具備更高的靈活性與可擴展性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-19-command-pattern/";
          
        },
      },{id: "post-design-pattern-18-chain-of-responsibility-pattern-責任鏈模式",
        
          title: "Design Pattern (18) - Chain of Responsibility Pattern (責任鏈模式)",
        
        description: "了解責任鏈模式如何讓請求能被多個對象動態處理，提升系統靈活性與可擴展性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-18-chain-of-responsibility-pattern/";
          
        },
      },{id: "post-design-pattern-17-proxy-pattern-代理模式",
        
          title: "Design Pattern (17) - Proxy Pattern (代理模式)",
        
        description: "了解代理模式如何通過控制對物件的訪問來提升系統的安全性、效能及靈活性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-17-proxy-pattern/";
          
        },
      },{id: "post-design-pattern-16-flyweight-pattern-享元模式",
        
          title: "Design Pattern (16) - Flyweight Pattern (享元模式)",
        
        description: "探索享元模式如何透過共享技術有效減少記憶體使用，提升應用效能。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-16-flyweight-pattern/";
          
        },
      },{id: "post-design-pattern-15-facade-pattern-外觀模式",
        
          title: "Design Pattern (15) - Facade Pattern (外觀模式)",
        
        description: "探索外觀模式如何簡化系統複雜性，提供一個統一的介面來訪問子系統的功能，提升程式碼的可讀性與維護性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-15-facade-pattern/";
          
        },
      },{id: "post-design-pattern-14-decorator-pattern-裝飾者模式",
        
          title: "Design Pattern (14) - Decorator Pattern (裝飾者模式)",
        
        description: "深入了解裝飾者模式如何動態為物件增加功能，同時保持系統的靈活性與開放性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-14-decorator-pattern/";
          
        },
      },{id: "post-design-pattern-13-composite-pattern-組合模式",
        
          title: "Design Pattern (13) - Composite Pattern (組合模式)",
        
        description: "深入了解組合模式如何以一致的方式操作單個物件與物件集合，實現對樹狀結構的靈活管理。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-13-composite-pattern/";
          
        },
      },{id: "post-jenkins-3-如何配置-credentials-以透過-ssh-從-git-上拉取程式碼",
        
          title: "Jenkins (3) - 如何配置 Credentials 以透過 SSH 從 git 上拉取程式碼",
        
        description: "學習如何在 Jenkins 中配置憑證（Credentials），以便透過 SSH 安全地拉取程式碼。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/devops/jenkins-3-configure-credentials-ssh/";
          
        },
      },{id: "post-design-pattern-12-bridge-pattern-橋接模式",
        
          title: "Design Pattern (12) - Bridge Pattern (橋接模式)",
        
        description: "深入了解橋接模式如何解耦抽象與實現，打造更靈活且易於擴展的系統設計，滿足複雜需求的同時降低維護成本。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-12-bridge-pattern/";
          
        },
      },{id: "post-design-pattern-11-adapter-pattern-轉接器模式",
        
          title: "Design Pattern (11) - Adapter Pattern (轉接器模式)",
        
        description: "了解如何使用轉接器模式來解決介面不兼容問題，讓不同類別無縫合作，增強程式設計靈活性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-11-adapter-pattern/";
          
        },
      },{id: "post-google-adsense",
        
          title: "Google AdSense",
        
        description: "如何透過 Google AdSense 爲我們的網站加入廣告賺取收益",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/google/google-adsense/";
          
        },
      },{id: "post-jenkins-2-如何架設-jenkins-伺服器",
        
          title: "Jenkins (2) - 如何架設 Jenkins 伺服器",
        
        description: "學習如何使用 Docker 映像檔來架設 Jenkins 伺服器，提升開發團隊的自動化能力。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/devops/jenkins-2-how-to-setup-jenkins-server/";
          
        },
      },{id: "post-jenkins-1-什麼是-jenkins",
        
          title: "Jenkins (1) - 什麼是 Jenkins",
        
        description: "了解Jenkins這個強大的自動化伺服器，如何幫助開發團隊實現持續整合與持續交付，提升軟體開發效率。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/devops/jenkins-1-what-is-jenkins/";
          
        },
      },{id: "post-design-pattern-10-singleton-pattern-單例模式",
        
          title: "Design Pattern (10) - Singleton Pattern (單例模式)",
        
        description: "深入單例模式：如何確保一個類別只有一個實體，提供一個全域",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-10-singleton-pattern/";
          
        },
      },{id: "post-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8-8",
        
          title: "How to Enable RSA Encryption Algorithm Key in OpenSSH 8.8",
        
        description: "如何在 OpenSSH 8.8 中重新啟用 RSA 加密支援，確保可以繼續使用 RSA 金鑰。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/cryptography/openssh/security/how-to-enable-rsa-encryption-algorithm-key-in-openssh-8-8/";
          
        },
      },{id: "post-getting-started-with-github-container-registry",
        
          title: "Getting Started with GitHub Container Registry",
        
        description: "A Guide to Using and Managing Container Images",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/devops/getting-started-with-github-container-registry/";
          
        },
      },{id: "post-design-pattern-9-prototype-pattern-原型模式",
        
          title: "Design Pattern (9) - Prototype Pattern (原型模式)",
        
        description: "深入原型模式：探索如何透過物件複製技術，有效提升軟體開發中的資源管理與設計模式的靈活性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-9-prototype-pattern/";
          
        },
      },{id: "post-how-to-build-chiptool-for-android",
        
          title: "How to build CHIPTool for Android",
        
        description: "本篇文章我將介紹如何按照步驟 Build 出 CHIPTool apk",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/tools/how-to-build-chiptool-for-android/";
          
        },
      },{id: "post-design-pattern-8-builder-pattern-建造者模式",
        
          title: "Design Pattern (8) - Builder Pattern (建造者模式)",
        
        description: "探索建造者模式，學習如何分步構建複雜對象，使程式碼更加靈活和易於維護。通過實例展示如何使用建造者模式簡化對象創建過程，提升程式碼的可讀性和可擴展性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-8-builder-pattern/";
          
        },
      },{id: "post-design-pattern-7-abstract-factory-pattern-抽象工廠模式",
        
          title: "Design Pattern (7) - Abstract Factory Pattern (抽象工廠模式)",
        
        description: "探索如何使用抽象工廠模式創建一系列相關或依賴的物件，提升設計靈活性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-7-abstract-factory-pattern/";
          
        },
      },{id: "post-design-pattern-6-factory-method-pattern-工廠方法模式",
        
          title: "Design Pattern (6) - Factory Method Pattern (工廠方法模式)",
        
        description: "深入探討工廠方法模式，通過實例展示其應用，提升程式碼的靈活性和可擴展性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-6-factory-method-pattern/";
          
        },
      },{id: "post-design-pattern-5-simple-factory-pattern-簡單工廠模式",
        
          title: "Design Pattern (5) - Simple Factory Pattern (簡單工廠模式)",
        
        description: "通過飲料點餐系統案例，學習如何使用簡單工廠模式提升程式碼的可讀性和維護性。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-5-simple-factory-pattern/";
          
        },
      },{id: "post-design-pattern-4-uml-統一建模語言",
        
          title: "Design Pattern (4) - UML (統一建模語言)",
        
        description: "深入了解UML，學習如何用UML圖清晰展現設計模式，提升軟體設計能力。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-4-uml/";
          
        },
      },{id: "post-深入解析-google-wallet-smart-tap-未來的支付方式",
        
          title: "深入解析 Google Wallet Smart Tap：未來的支付方式",
        
        description: "探索 Google Wallet Smart Tap 的運作原理和它如何改變我們的支付習慣。本文將帶你了解其背後的技術，以及它對未來支付生態系統的影響。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/pay/technology/google-wallet-smart-tap-exploring/";
          
        },
      },{id: "post-design-pattern-3-design-patterns-設計模式",
        
          title: "Design Pattern (3) - Design Patterns (設計模式)",
        
        description: "深入探討設計模式的概念及其應用步驟，助你高效解決軟體問題。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-3-design-pattern/";
          
        },
      },{id: "post-design-pattern-2-design-principles-設計原則",
        
          title: "Design Pattern (2) - Design Principles (設計原則)",
        
        description: "學習如何透過單一職責和開放封閉等設計原則提升程式碼質量，打造靈活、可維護的軟體系統。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-2-design-principle/";
          
        },
      },{id: "post-design-pattern-1-object-oriented-concepts-物件導向概念",
        
          title: "Design Pattern (1) - Object-Oriented Concepts (物件導向概念)",
        
        description: "探索封裝、繼承、多態和抽象的力量，為理解複雜設計模式奠定基礎。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/design%20pattern/design-pattern-1-object-oriented-concepts/";
          
        },
      },{id: "post-如何抓取-ios-的網路封包",
        
          title: "如何抓取 iOS 的網路封包",
        
        description: "教你如何使用 rvictl 與 Wireshark 抓取 iOS 裝置封包，快速分析連線問題，是 iOS 與 IoT 開發必備技巧！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/tools/how-to-capture-network-packet-on-ios/";
          
        },
      },{id: "post-如何抓取-android-的網路封包",
        
          title: "如何抓取 Android 的網路封包",
        
        description: "實戰教你如何使用 tcpdump 搭配 Wireshark 抓取 Android 手機的封包資料，解決連線與串流問題的強大除錯技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/tools/how-to-capture-network-packet-on-android-using-tcpdump/";
          
        },
      },{id: "post-搞懂-p2p-技術-3-webrtc-x-aws-x-kvs",
        
          title: "搞懂 P2P 技術 (3) - WebRTC x AWS x KVS",
        
        description: "深入解析 WebRTC 架構、Signaling Server 設計、ICE 協議流程與 AWS KVS 串流實作，搞懂 P2P 在即時通訊與 IoT 中的應用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/p2p/aws/p2p-tech-3-webrtc-kvs/";
          
        },
      },{id: "post-搞懂-p2p-技術-2-stun-x-turn-x-ice",
        
          title: "搞懂 P2P 技術 (2) - STUN x TURN x ICE",
        
        description: "解析 STUN、TURN 與 ICE 協議，搞懂 P2P 穿透技術，突破 NAT 限制建立穩定連線，打造強大 iOS / Android 即時通訊架構。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/p2p/p2p-tech-2-stun-turn-ice/";
          
        },
      },{id: "post-搞懂-p2p-技術-1-p2p-x-ipv4-x-nat",
        
          title: "搞懂 P2P 技術 (1) - P2P x IPv4 x NAT",
        
        description: "深入解析 P2P 穿透技術、NAT 類型與通訊限制，掌握物聯網與分佈式架構下的網路連線原理。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/p2p/p2p-tech-1-ipv4-nat/";
          
        },
      },{id: "post-3d-graphic-engine-tips-三角形-x-uv-mapping-x-vertices-amp-indices",
        
          title: "3D Graphic Engine Tips - 三角形 x UV mapping x Vertices &amp; Indices...",
        
        description: "寫 3D 繪圖程式必需要知道的知識，這篇帶你快速掌握基本建模邏輯與映射概念。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/mobile/3d-graphic-tips/";
          
        },
      },{id: "post-如何讓-jekyll-網站被-google-搜尋到-search-console-sitemap-教學",
        
          title: "如何讓 Jekyll 網站被 Google 搜尋到｜Search Console + Sitemap 教學",
        
        description: "Google 大大，你把我的網頁藏哪去了？教你兩步驟：提交 Search Console、啟用 Sitemap！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/blog/how-to-add-your-jekyll-blog-website-to-google-search-console/";
          
        },
      },{id: "post-使用-jekyll-minimal-mistakes-在-github-pages-上架設自己的部落格",
        
          title: "使用 Jekyll + minimal-mistakes 在 GitHub Pages 上架設自己的部落格",
        
        description: "原來架設 Blog 也能如此輕鬆簡單！這篇文章手把手教你從 0 開始，用 Jekyll + Minimal Mistakes 架站。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/blog/creating-a-github-pages-with-jekyll-and-minimal-mistakes/";
          
        },
      },{id: "post-如何讓-octopress-網站被-google-找到-search-console-實作教學",
        
          title: "如何讓 Octopress 網站被 Google 找到｜Search Console 實作教學",
        
        description: "Google 大大，你把我的網頁藏哪去了？",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/blog/how-to-add-your-octopress-blog-website-to-google-search-console/";
          
        },
      },{id: "post-用-octopress-架設靜態部落格-github-pages-實戰教學",
        
          title: "用 Octopress 架設靜態部落格｜GitHub Pages 實戰教學",
        
        description: "想不到架一個部落格，其實可以這麼簡單又有趣！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/zh/blog/blog/octopress-setup/";
          
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
