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
        },{id: "post-claude-code-使用技巧與最佳實踐-tips-and-best-practices",
        
          title: "Claude Code 使用技巧與最佳實踐 - Tips and Best Practices",
        
        description: "探索 Claude Code 的最佳使用方式，從基礎操作到進階工作流程，提升 AI 輔助開發的效率與品質。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai%20development%20tools/claude-code-tips-and-best-practices/";
          
        },
      },{id: "post-ai-agent-series-part-1-understanding-the-core-interaction-logic-of-llm-rag-and-mcp",
        
          title: "🤖 AI Agent Series (Part 1): Understanding the Core Interaction Logic of LLM,...",
        
        description: "This article will help you quickly understand the core principles of AI Agents, LLMs, RAG, and MCP and how they collaborate.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai/machine-learning/developer-tools/programming/intro-to-ai-agents-mcp-rag-llm/";
          
        },
      },{id: "post-managing-multiple-github-accounts-on-one-computer-the-simplest-ssh-configuration-method",
        
          title: "💡 Managing Multiple GitHub Accounts on One Computer: The Simplest SSH Configuration Method...",
        
        description: "Enable your computer to operate multiple GitHub accounts simultaneously, perfect for developers with multiple identities or work/personal accounts.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/git/github/developer-tools/how-to-use-multiple-github-accounts-using-ssh/";
          
        },
      },{id: "post-how-to-use-excalidraw-ai-to-quickly-generate-professional-diagrams-and-boost-work-efficiency",
        
          title: "🚀 How to Use Excalidraw AI to Quickly Generate Professional Diagrams and Boost...",
        
        description: "Use Excalidraw AI to quickly generate flowcharts, technical architecture diagrams, mind maps, and more with just text descriptions, boosting work efficiency!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ai-tools/visualization/productivity/design/ai-tools-excalidraw-chart-guide/";
          
        },
      },{id: "post-complete-macos-development-environment-setup-guide-mobile-development-toolchain-configuration-tutorial",
        
          title: "Complete macOS Development Environment Setup Guide: Mobile Development Toolchain Configuration Tutorial",
        
        description: "Learn to build a comprehensive mobile development environment on a new macOS system. Detailed analysis of installation and configuration for Homebrew, Git, Xcode, Android Studio, and more. Includes terminal optimization, environment variable setup, and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/setup%20guide/setup-development-environment-on-a-new-macos/";
          
        },
      },{id: "post-design-pattern-28-interpreter-pattern",
        
          title: "Design Pattern (28) - Interpreter Pattern",
        
        description: "The Interpreter Pattern is used to build a system that can interpret specific languages or syntax, suitable for handling complex rule judgments or command syntax.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design-patterns/software-engineering/programming/object-oriented-design/design-pattern-28-interpreter-pattern/";
          
        },
      },{id: "post-design-pattern-27-visitor-pattern",
        
          title: "Design Pattern (27) - Visitor Pattern",
        
        description: "The Visitor Pattern provides a way to add new operation logic to objects without modifying their structure, achieving high extensibility.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design-patterns/software-engineering/iot/mobile-development/design-pattern-27-visitor-pattern/";
          
        },
      },{id: "post-design-pattern-26-template-method-pattern-defining-algorithm-skeleton-enhancing-code-reusability-and-system-extensibility",
        
          title: "Design Pattern (26) Template Method Pattern: Defining Algorithm Skeleton, Enhancing Code Reusability and...",
        
        description: "In-depth analysis of Template Method Pattern, learn how to define algorithm skeletons and achieve code reuse, through data format conversion system examples, master core application techniques of behavioral design patterns.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-26-template-method-pattern/";
          
        },
      },{id: "post-design-pattern-25-strategy-pattern-dynamic-algorithm-switching-building-highly-extensible-e-commerce-shipping-system",
        
          title: "Design Pattern (25) Strategy Pattern: Dynamic Algorithm Switching, Building Highly Extensible E-commerce Shipping...",
        
        description: "Complete analysis of Strategy Pattern core concepts and practical applications, through e-commerce shipping calculation system examples, learn how to implement dynamic algorithm switching, improving code extensibility and maintainability.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-25-strategy-pattern/";
          
        },
      },{id: "post-design-pattern-24-state-pattern-smart-water-dispenser-state-management-implementing-dynamic-object-behavior-switching",
        
          title: "Design Pattern (24) State Pattern: Smart Water Dispenser State Management, Implementing Dynamic Object...",
        
        description: "Deep analysis of State Pattern core concepts, through smart water dispenser system examples, learn how to elegantly manage object state transitions, reduce program coupling and improve system extensibility.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-24-state-pattern/";
          
        },
      },{id: "post-design-pattern-23-observer-pattern-smart-security-system-one-to-many-notification-mechanism-implementing-real-time-alert-broadcasting",
        
          title: "Design Pattern (23) Observer Pattern: Smart Security System One-to-Many Notification Mechanism, Implementing Real-time...",
        
        description: "In-depth exploration of Observer Pattern core principles, through smart security system alert mechanism examples, learn how to construct loosely-coupled one-to-many notification systems, improving system extensibility and maintainability.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-23-observer-pattern/";
          
        },
      },{id: "post-design-pattern-22-memento-pattern-implementing-text-editor-undo-functionality-perfect-encapsulation-of-object-state-snapshots",
        
          title: "Design Pattern (22) Memento Pattern: Implementing Text Editor Undo Functionality, Perfect Encapsulation of...",
        
        description: "In-depth analysis of Memento Pattern core principles, through text editor undo functionality examples, learn how to safely save and restore object states, implementing complete state management systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-22-memento-pattern/";
          
        },
      },{id: "post-design-pattern-21-mediator-pattern-smart-home-system-component-coordination-reducing-complex-coupling-relationships-between-objects",
        
          title: "Design Pattern (21) Mediator Pattern: Smart Home System Component Coordination, Reducing Complex Coupling...",
        
        description: "Comprehensive analysis of Mediator Pattern design principles, through smart home control system examples, learn how to elegantly coordinate complex interactions between multiple objects, implementing low-coupling high-cohesion system architecture.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-21-mediator-pattern/";
          
        },
      },{id: "post-design-pattern-20-iterator-pattern-unified-data-traversal-interface-elegant-access-to-multiple-collection-structures",
        
          title: "Design Pattern (20) Iterator Pattern: Unified Data Traversal Interface, Elegant Access to Multiple...",
        
        description: "Detailed exploration of Iterator Pattern design essence, through music playlist management examples, learn how to build unified traversal interfaces, hiding collection internal structure complexity.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-20-iterator-pattern/";
          
        },
      },{id: "post-design-pattern-19-command-pattern-smart-home-remote-control-system-implementing-operation-encapsulation-and-undo-mechanism",
        
          title: "Design Pattern (19) Command Pattern: Smart Home Remote Control System, Implementing Operation Encapsulation...",
        
        description: "In-depth analysis of Command Pattern core concepts, through smart home remote control example, learn how to encapsulate operation requests as objects, implement undo functionality and operation history management.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-19-command-pattern/";
          
        },
      },{id: "post-design-pattern-18-chain-of-responsibility-pattern-dynamic-log-processing-system-design-guide",
        
          title: "Design Pattern (18) Chain of Responsibility Pattern: Dynamic Log Processing System Design Guide...",
        
        description: "Complete analysis of Chain of Responsibility Pattern implementation techniques, learn to design flexible log systems through dynamic processing chains, master core applications and best practices of behavioral design patterns.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-18-chain-of-responsibility-pattern/";
          
        },
      },{id: "post-design-pattern-17-proxy-pattern-smart-caching-system-design-guide",
        
          title: "Design Pattern (17) Proxy Pattern: Smart Caching System Design Guide",
        
        description: "Deep dive into Proxy Pattern implementation techniques, learn how to control access permissions through smart proxy objects, implement caching mechanisms and performance optimization, master advanced application techniques in structural design patterns.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-17-proxy-pattern/";
          
        },
      },{id: "post-design-pattern-16-flyweight-pattern-memory-optimization-and-performance-enhancement-guide",
        
          title: "Design Pattern (16) Flyweight Pattern: Memory Optimization and Performance Enhancement Guide",
        
        description: "Deep dive into Flyweight Pattern implementation techniques, learn how to dramatically reduce memory usage through object sharing technology, master large-scale object management and performance optimization core concepts in structural design patterns.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-16-flyweight-pattern/";
          
        },
      },{id: "post-design-pattern-15-facade-pattern-unified-interface-design-and-system-integration-guide",
        
          title: "Design Pattern (15) Facade Pattern: Unified Interface Design and System Integration Guide",
        
        description: "Complete analysis of Facade Pattern implementation techniques, learn how to simplify complex subsystems through unified interfaces, master system integration and interface encapsulation core concepts and best practices in structural design patterns.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-15-facade-pattern/";
          
        },
      },{id: "post-design-pattern-14-decorator-pattern-dynamic-feature-extension-and-composition-design-guide",
        
          title: "Design Pattern (14) Decorator Pattern: Dynamic Feature Extension and Composition Design Guide",
        
        description: "Deep dive into Decorator Pattern implementation techniques, learn how to dynamically extend functionality through object wrapping techniques, master compositional feature enhancement and flexible system design methods in structural design patterns.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-14-decorator-pattern/";
          
        },
      },{id: "post-design-pattern-13-composite-pattern-tree-structure-unified-operation-design-guide",
        
          title: "Design Pattern (13) Composite Pattern: Tree Structure Unified Operation Design Guide",
        
        description: "Deep dive into Composite Pattern implementation techniques, learn how to uniformly handle individual objects and object collections, master tree structure management and recursive operations in structural design patterns core application techniques.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-13-composite-pattern/";
          
        },
      },{id: "post-jenkins-3-complete-ssh-credentials-configuration-guide-secure-git-repository-connection-implementation-tutorial",
        
          title: "Jenkins (3) Complete SSH Credentials Configuration Guide: Secure Git Repository Connection Implementation Tutorial...",
        
        description: "In-depth analysis of Jenkins SSH credentials configuration techniques, learn how to securely connect to GitHub GitLab and other Git repositories through SSH keys, master authentication and code pulling best practices in CI/CD workflows.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/jenkins-3-configure-credentials-ssh/";
          
        },
      },{id: "post-design-pattern-12-bridge-pattern-complete-analysis-decoupling-abstraction-and-implementation-building-flexible-system-architecture",
        
          title: "Design Pattern (12) Bridge Pattern Complete Analysis: Decoupling Abstraction and Implementation, Building Flexible...",
        
        description: "Deep dive into how the Bridge Pattern solves multi-dimensional design challenges by separating abstraction and implementation to avoid class explosion problems. Learn Bridge Pattern core concepts, UML design, Kotlin implementation, and best practices through a security system example.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-12-bridge-pattern/";
          
        },
      },{id: "post-design-pattern-11-adapter-pattern-complete-tutorial-solving-interface-incompatibility-issues",
        
          title: "Design Pattern (11) Adapter Pattern Complete Tutorial: Solving Interface Incompatibility Issues",
        
        description: "Learn how the Adapter Pattern solves interface incompatibility issues in system integration. Master design pattern core concepts, UML architecture, Kotlin implementation, applicable scenarios, and best practices through a stock data XML-JSON conversion example.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-11-adapter-pattern/";
          
        },
      },{id: "post-complete-google-adsense-application-and-setup-guide-monetize-your-website",
        
          title: "💰 Complete Google AdSense Application and Setup Guide: Monetize Your Website",
        
        description: "How to add ads to our website through Google AdSense to generate revenue",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/digital-marketing/monetization/google-services/web-development/google-adsense/";
          
        },
      },{id: "post-jenkins-2-complete-server-setup-guide-docker-environment-quick-deployment-tutorial",
        
          title: "Jenkins (2) Complete Server Setup Guide: Docker Environment Quick Deployment Tutorial",
        
        description: "Comprehensive analysis of Jenkins server setup steps, learn to quickly deploy Jenkins CI/CD environment using Docker, including standard version and Android build environment configuration, master DevOps automation infrastructure building techniques.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/jenkins-2-how-to-setup-jenkins-server/";
          
        },
      },{id: "post-jenkins-1-what-is-jenkins-complete-guide-to-devops-automation-introduction",
        
          title: "Jenkins (1) What is Jenkins: Complete Guide to DevOps Automation Introduction",
        
        description: "Comprehensive analysis of Jenkins automation server core concepts, learn CI/CD Continuous Integration Continuous Delivery fundamentals, master DevOps tool selection and Pipeline design, essential skills for development team efficiency improvement.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/jenkins-1-what-is-jenkins/";
          
        },
      },{id: "post-design-pattern-10-singleton-pattern-complete-tutorial-ensuring-single-instance-with-global-access",
        
          title: "Design Pattern (10) - Singleton Pattern Complete Tutorial - Ensuring Single Instance with...",
        
        description: "Deep dive into Singleton Pattern - how to ensure a class has only one instance and provide global access point",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design-patterns/software-engineering/programming/system-architecture/design-pattern-10-singleton-pattern/";
          
        },
      },{id: "post-complete-openssh-8-8-rsa-encryption-support-guide-solving-compatibility-issues-and-security-configuration",
        
          title: "Complete OpenSSH 8.8 RSA Encryption Support Guide: Solving Compatibility Issues and Security Configuration...",
        
        description: "Learn how to solve the problem of RSA encryption algorithms being disabled in OpenSSH 8.8. Detailed analysis of security considerations, compatibility solutions, and best practices. Includes practical scenarios for Jenkins CI/CD, Docker environments, and GitLab integration.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/cryptography/openssh/security/how-to-enable-rsa-encryption-algorithm-key-in-openssh-8-8/";
          
        },
      },{id: "post-complete-github-container-registry-guide-container-image-management-and-ci-cd-deployment-tutorial",
        
          title: "Complete GitHub Container Registry Guide: Container Image Management and CI/CD Deployment Tutorial",
        
        description: "Learn how to use GitHub Container Registry to manage Docker images and build CI/CD pipelines. Deep dive into containerized deployment, version management, authentication, and best practices through Jenkins Master-Slave architecture examples. Suitable for DevOps engineers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/getting-started-with-github-container-registry/";
          
        },
      },{id: "post-design-pattern-9-prototype-pattern-complete-tutorial-object-cloning-and-performance-optimization",
        
          title: "Design Pattern (9) Prototype Pattern Complete Tutorial - Object Cloning and Performance Optimization...",
        
        description: "Learn how Prototype Pattern solves performance issues through object cloning. Deep dive into shallow and deep copy concepts, Cloneable interface implementation, and best practices through game character creation system examples. Includes UML design and example code.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-9-prototype-pattern/";
          
        },
      },{id: "post-complete-android-chiptool-build-tutorial-matter-development-tool-compilation-guide-from-source-code",
        
          title: "Complete Android CHIPTool Build Tutorial: Matter Development Tool Compilation Guide from Source Code...",
        
        description: "Learn how to compile CHIPTool Android APK from Matter source code. Detailed solutions for common environment configuration, dependency packages, and troubleshooting issues during compilation. Includes complete development environment setup, compilation commands, and practical tips.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tools/how-to-build-chiptool-for-android/";
          
        },
      },{id: "post-design-pattern-8-builder-pattern-complete-tutorial-step-by-step-construction-of-complex-objects",
        
          title: "Design Pattern (8) Builder Pattern Complete Tutorial - Step-by-Step Construction of Complex Objects...",
        
        description: "Learn how Builder Pattern solves complex object creation problems. Deep dive into designing step-by-step builders through beverage customization system examples, improving object initialization readability and flexibility. Includes UML design, implementation examples, and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-8-builder-pattern/";
          
        },
      },{id: "post-design-pattern-7-abstract-factory-pattern-complete-tutorial-unified-creation-of-product-families",
        
          title: "Design Pattern (7) Abstract Factory Pattern Complete Tutorial - Unified Creation of Product...",
        
        description: "Learn how Abstract Factory Pattern solves the creation problem of related object groups. Deep dive into designing unified product family creation interfaces through beverage shop themed package examples. Includes UML design, implementation examples, and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-7-abstract-factory-pattern/";
          
        },
      },{id: "post-design-pattern-6-factory-method-pattern-complete-tutorial-extensible-object-creation",
        
          title: "Design Pattern (6) Factory Method Pattern Complete Tutorial - Extensible Object Creation",
        
        description: "Learn how Factory Method Pattern solves the extensibility issues of Simple Factory. Deep dive into designing extensible object creation systems through a global beverage chain example. Includes UML design, implementation examples, and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-6-factory-method-pattern/";
          
        },
      },{id: "post-design-pattern-5-simple-factory-pattern-complete-tutorial-encapsulating-object-creation-logic",
        
          title: "Design Pattern (5) Simple Factory Pattern Complete Tutorial - Encapsulating Object Creation Logic...",
        
        description: "Learn the core concepts of Simple Factory Pattern through a beverage ordering system example. Deep dive into encapsulating object creation logic, reducing code duplication, and improving maintainability. Includes UML design, Swift/Kotlin implementation, and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-5-simple-factory-pattern/";
          
        },
      },{id: "post-design-patterns-4-uml-unified-modeling-language-complete-guide-class-diagrams-and-design-pattern-visual-expression",
        
          title: "Design Patterns (4) UML Unified Modeling Language Complete Guide: Class Diagrams and Design...",
        
        description: "Master UML class diagram basic elements and relationship representations, including Class, Interface, inheritance, association, composition, and aggregation core concepts. Learn how to use UML for visual expression of design patterns to enhance system architecture design capabilities.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-4-uml/";
          
        },
      },{id: "post-in-depth-analysis-of-google-wallet-smart-tap-the-future-of-payment-methods",
        
          title: "In-Depth Analysis of Google Wallet Smart Tap: The Future of Payment Methods",
        
        description: "Explore the working principles of Google Wallet Smart Tap and how it&#39;s changing our payment habits. This article will take you through the technology behind it and its impact on the future payment ecosystem.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/pay/technology/google-wallet-smart-tap-exploring/";
          
        },
      },{id: "post-design-patterns-3-core-design-pattern-concepts-complete-introduction-four-elements-and-classification-system",
        
          title: "Design Patterns (3) Core Design Pattern Concepts Complete Introduction: Four Elements and Classification...",
        
        description: "Master the definition, purpose, and structured thinking of Design Patterns. Deep dive into the four elements of design patterns: Context, Forces, Problem, and Solution, plus a complete classification system for Creational, Structural, and Behavioral patterns.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-3-design-pattern/";
          
        },
      },{id: "post-design-patterns-2-solid-design-principles-complete-guide-five-principles-for-improving-code-quality",
        
          title: "Design Patterns (2) SOLID Design Principles Complete Guide: Five Principles for Improving Code...",
        
        description: "In-depth analysis of the five SOLID design principles: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. Learn to design robust, maintainable software systems through practical examples and code demonstrations.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-2-design-principle/";
          
        },
      },{id: "post-design-patterns-1-object-oriented-programming-concepts-complete-guide-core-principles-of-encapsulation-inheritance-polymorphism-and-abstraction",
        
          title: "Design Patterns (1) Object-Oriented Programming Concepts Complete Guide: Core Principles of Encapsulation, Inheritance,...",
        
        description: "Deep dive into the four core concepts of Object-Oriented Programming: encapsulation, inheritance, polymorphism, and abstraction. Build a solid technical foundation for learning Design Pattern series through practical examples and relatable analogies.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-1-object-oriented-concepts/";
          
        },
      },{id: "post-complete-ios-network-packet-capture-tutorial-using-rvictl-and-wireshark-debugging-techniques",
        
          title: "Complete iOS Network Packet Capture Tutorial: Using rvictl and Wireshark Debugging Techniques",
        
        description: "Learn the complete process of capturing and analyzing network packets on iOS devices. Detailed analysis of rvictl virtual network interface setup, Wireshark packet analysis, and common troubleshooting. Suitable for iOS app development, IoT debugging, and network security analysis.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tools/how-to-capture-network-packet-on-ios/";
          
        },
      },{id: "post-complete-android-network-packet-analysis-tutorial-using-tcpdump-and-wireshark-for-debugging",
        
          title: "Complete Android Network Packet Analysis Tutorial: Using tcpdump and Wireshark for Debugging",
        
        description: "Learn the complete process of using tcpdump to capture network packets on Android devices. Detailed analysis of root permission setup, tcpdump command usage, Wireshark analysis techniques, and common troubleshooting. Suitable for Android app developers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/tools/how-to-capture-network-packet-on-android-using-tcpdump/";
          
        },
      },{id: "post-p2p-technology-3-complete-implementation-of-webrtc-and-aws-kvs-in-depth-tutorial-on-real-time-communication-and-streaming-technology",
        
          title: "P2P Technology (3) Complete Implementation of WebRTC and AWS KVS - In-depth Tutorial...",
        
        description: "Learn how WebRTC integrates STUN/TURN/ICE technologies for real-time communication. Deep dive into Signaling Server design, SDP exchange process, AWS Kinesis Video Streams cloud streaming service. From theory to practice, build complete P2P communication systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/aws/p2p-tech-3-webrtc-kvs/";
          
        },
      },{id: "post-p2p-technology-2-complete-guide-to-stun-turn-ice-protocols-in-depth-analysis-of-nat-traversal-solutions",
        
          title: "P2P Technology (2) Complete Guide to STUN, TURN, ICE Protocols - In-depth Analysis...",
        
        description: "Deep dive into how STUN, TURN, ICE protocols solve NAT traversal problems. From server reflexive, relay transmission to connectivity candidate collection, master how to establish stable P2P connections and build high-efficiency real-time communication systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/p2p-tech-2-stun-turn-ice/";
          
        },
      },{id: "post-p2p-technology-1-complete-analysis-of-ipv4-and-nat-traversal-in-depth-tutorial-on-network-architecture-and-connection-principles",
        
          title: "P2P Technology (1) Complete Analysis of IPv4 and NAT Traversal - In-depth Tutorial...",
        
        description: "Master the core concepts of P2P network communication and IPv4/NAT architecture limitations. Deep dive into four types of NAT, traversal challenges and solutions. Learn IoT device communication principles through IPCam video streaming examples, laying the foundation for subsequent STUN/TURN/ICE protocols.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/p2p/p2p-tech-1-ipv4-nat/";
          
        },
      },{id: "post-3d-graphics-development-fundamentals-tutorial-complete-analysis-of-triangle-meshes-uv-mapping-and-vertex-indices",
        
          title: "3D Graphics Development Fundamentals Tutorial: Complete Analysis of Triangle Meshes, UV Mapping, and...",
        
        description: "Master the core concepts and implementation techniques of 3D graphics programming. Deep dive into triangle mesh modeling, UV texture mapping, vertex and index management, and other core technologies. Suitable for developers working with OpenGL, ARKit, ARCore, and other platforms.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/mobile/3d-graphic-tips/";
          
        },
      },{id: "post-complete-jekyll-seo-tutorial-google-search-console-and-sitemap-configuration-guide",
        
          title: "Complete Jekyll SEO Tutorial: Google Search Console and Sitemap Configuration Guide",
        
        description: "Learn how to get your Jekyll static website indexed and crawled by Google. Complete process from Google Search Console setup, Sitemap generation to website verification. Includes robots.txt configuration, URL structure optimization, and SEO best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/blog/how-to-add-your-jekyll-blog-website-to-google-search-console/";
          
        },
      },{id: "post-complete-jekyll-website-creation-tutorial-building-a-blog-with-minimal-mistakes-theme-on-github-pages",
        
          title: "Complete Jekyll Website Creation Tutorial: Building a Blog with Minimal Mistakes Theme on...",
        
        description: "Learn to build a personal blog from scratch using Jekyll and the Minimal Mistakes theme. Detailed analysis of GitHub Pages deployment, theme customization, website configuration, and content management workflow. Includes Ruby environment setup, Markdown writing, and SEO optimization.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/blog/creating-a-github-pages-with-jekyll-and-minimal-mistakes/";
          
        },
      },{id: "post-complete-octopress-seo-tutorial-google-search-console-and-search-engine-indexing-optimization",
        
          title: "Complete Octopress SEO Tutorial: Google Search Console and Search Engine Indexing Optimization",
        
        description: "Learn how to get your Octopress static website indexed and crawled by Google. Detailed analysis of Google Search Console setup, Sitemap submission, website verification, and SEO optimization processes. Includes robots.txt configuration, URL structure, and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/blog/how-to-add-your-octopress-blog-website-to-google-search-console/";
          
        },
      },{id: "post-complete-octopress-static-blog-tutorial-github-pages-deployment-and-theme-customization-guide",
        
          title: "Complete Octopress Static Blog Tutorial: GitHub Pages Deployment and Theme Customization Guide",
        
        description: "Learn to build professional static blogs using the Octopress framework. Detailed analysis of Ruby environment setup, GitHub Pages deployment, theme customization, and content management workflow. Includes Markdown writing, website optimization, and maintenance techniques.",
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
          window.open("/feed.xml", "_blank");
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
