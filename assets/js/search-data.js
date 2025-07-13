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
        },{id: "post-how-to-use-multiple-github-accounts-on-one-computer-complete-ssh-setup-guide",
        
          title: "How to Use Multiple GitHub Accounts on One Computer: Complete SSH Setup Guide...",
        
        description: "Learn how to manage multiple GitHub accounts on a single computer using SSH keys. Perfect for developers who need to switch between work and personal accounts seamlessly. Step-by-step guide with practical examples.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/productivity/github/development/how-to-use-multiple-github-accounts-using-ssh/";
          
        },
      },{id: "post-excalidraw-ai-create-professional-diagrams-with-text-commands-complete-guide",
        
          title: "Excalidraw AI: Create Professional Diagrams with Text Commands - Complete Guide",
        
        description: "Transform your workflow with Excalidraw AI. Generate professional diagrams, flowcharts, and technical architecture diagrams using simple text descriptions. Perfect for developers, designers, and business analysts.",
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
      },{id: "post-design-pattern-28-interpreter-pattern-complete-guide-with-examples",
        
          title: "Design Pattern 28: Interpreter Pattern - Complete Guide with Examples",
        
        description: "Master the Interpreter Pattern with practical examples. Learn how to build language interpreters, parse expressions, and create flexible rule engines. Perfect for developers working with domain-specific languages.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-28-interpreter-pattern/";
          
        },
      },{id: "post-design-pattern-27-visitor-pattern-complete-guide-with-real-world-iot-examples",
        
          title: "Design Pattern 27: Visitor Pattern - Complete Guide with Real-World IoT Examples",
        
        description: "Master the Visitor Pattern with practical IoT and software examples. Learn how to add new operations to object structures, improve extensibility, and maintain clean code architecture.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-27-visitor-pattern/";
          
        },
      },{id: "post-design-pattern-26-template-method-pattern-complete-guide-with-real-world-examples",
        
          title: "Design Pattern 26: Template Method Pattern - Complete Guide with Real-World Examples",
        
        description: "Master the Template Method Pattern with practical examples. Learn how to create reusable algorithm frameworks, implement data format conversions, and build extensible systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-26-template-method-pattern/";
          
        },
      },{id: "post-design-pattern-25-strategy-pattern-complete-guide-with-real-world-examples",
        
          title: "Design Pattern 25: Strategy Pattern - Complete Guide with Real-World Examples",
        
        description: "Master the Strategy Pattern with practical examples. Learn how to implement flexible algorithms, dynamic behavior switching, and create maintainable code with low coupling.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-25-strategy-pattern/";
          
        },
      },{id: "post-design-pattern-24-state-pattern-complete-guide-with-real-world-examples",
        
          title: "Design Pattern 24: State Pattern - Complete Guide with Real-World Examples",
        
        description: "Master the State Pattern with practical examples. Learn how to implement state machines, manage object behavior based on state, and create flexible state-driven applications.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-24-state-pattern/";
          
        },
      },{id: "post-design-pattern-23-observer-pattern-complete-guide-with-real-world-examples",
        
          title: "Design Pattern 23: Observer Pattern - Complete Guide with Real-World Examples",
        
        description: "Master the Observer Pattern with practical examples. Learn how to implement event-driven systems, notification mechanisms, and create loosely coupled architectures.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-23-observer-pattern/";
          
        },
      },{id: "post-design-pattern-22-memento-pattern-complete-guide-with-undo-redo-examples",
        
          title: "Design Pattern 22: Memento Pattern - Complete Guide with Undo/Redo Examples",
        
        description: "Master the Memento Pattern with practical undo/redo and state recovery examples. Learn how to implement state snapshots, history management, and robust data recovery.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-22-memento-pattern/";
          
        },
      },{id: "post-design-pattern-21-mediator-pattern-complete-guide-with-real-world-chatroom-example",
        
          title: "Design Pattern 21: Mediator Pattern - Complete Guide with Real-World Chatroom Example",
        
        description: "Master the Mediator Pattern with practical chatroom and system coordination examples. Learn how to reduce coupling, improve extensibility, and centralize communication logic.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-21-mediator-pattern/";
          
        },
      },{id: "post-design-pattern-20-iterator-pattern-complete-guide-with-real-world-file-system-examples",
        
          title: "Design Pattern 20: Iterator Pattern - Complete Guide with Real-World File System Examples...",
        
        description: "Master the Iterator Pattern with practical file system traversal examples. Learn how to provide sequential access to collection elements without exposing internal structure, improving code flexibility and maintainability.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-20-iterator-pattern/";
          
        },
      },{id: "post-design-pattern-19-command-pattern-complete-guide-with-undo-redo-and-remote-control-examples",
        
          title: "Design Pattern 19: Command Pattern - Complete Guide with Undo/Redo and Remote Control...",
        
        description: "Master the Command Pattern with practical remote control and undo/redo examples. Learn how to decouple operations, implement flexible controls, and support extensible command history.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-19-command-pattern/";
          
        },
      },{id: "post-design-pattern-18-chain-of-responsibility-pattern-complete-guide-with-real-world-logging-examples",
        
          title: "Design Pattern 18: Chain of Responsibility Pattern - Complete Guide with Real-World Logging...",
        
        description: "Master the Chain of Responsibility Pattern with practical logging system examples. Learn how to create flexible request processing chains, implement dynamic handlers, and build extensible systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-18-chain-of-responsibility-pattern/";
          
        },
      },{id: "post-design-pattern-17-proxy-pattern-complete-guide-with-real-world-video-streaming-examples",
        
          title: "Design Pattern 17: Proxy Pattern - Complete Guide with Real-World Video Streaming Examples...",
        
        description: "Master the Proxy Pattern with practical video streaming examples. Learn how to control object access for improved performance, security, and resource management in distributed systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-17-proxy-pattern/";
          
        },
      },{id: "post-design-pattern-16-flyweight-pattern-complete-guide-with-real-world-forest-rendering-examples",
        
          title: "Design Pattern 16: Flyweight Pattern - Complete Guide with Real-World Forest Rendering Examples...",
        
        description: "Master the Flyweight Pattern with practical forest rendering examples. Learn how to reduce memory usage through object sharing, optimize performance, and build efficient systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-16-flyweight-pattern/";
          
        },
      },{id: "post-design-pattern-15-facade-pattern-complete-guide-with-real-world-home-theater-examples",
        
          title: "Design Pattern 15: Facade Pattern - Complete Guide with Real-World Home Theater Examples...",
        
        description: "Master the Facade Pattern with practical home theater system examples. Learn how to simplify complex subsystems, provide unified interfaces, and improve code maintainability.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-15-facade-pattern/";
          
        },
      },{id: "post-design-pattern-14-decorator-pattern-complete-guide-with-real-world-coffee-shop-examples",
        
          title: "Design Pattern 14: Decorator Pattern - Complete Guide with Real-World Coffee Shop Examples...",
        
        description: "Master the Decorator Pattern with practical coffee shop POS system examples. Learn how to dynamically add functionality to objects while maintaining flexibility and extensibility.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-14-decorator-pattern/";
          
        },
      },{id: "post-design-pattern-13-composite-pattern-unified-tree-structure-management-for-file-systems-and-ui-components",
        
          title: "Design Pattern 13: Composite Pattern - Unified Tree Structure Management for File Systems...",
        
        description: "Master the Composite Pattern to treat individual objects and collections uniformly. Learn how to implement tree structures for file systems, UI components, and organizational hierarchies with practical examples and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/design-pattern-13-composite-pattern/";
          
        },
      },{id: "post-jenkins-3-configure-ssh-credentials-for-secure-git-code-retrieval",
        
          title: "Jenkins 3: Configure SSH Credentials for Secure Git Code Retrieval",
        
        description: "Learn how to configure SSH credentials in Jenkins for secure Git repository access. Step-by-step guide for setting up SSH keys, adding credentials, and configuring Jenkins jobs for secure code retrieval.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/ci/cd/security/jenkins/git/authentication/jenkins-3-configure-credentials-ssh/";
          
        },
      },{id: "post-design-pattern-12-bridge-pattern-complete-guide-with-real-world-security-system-examples",
        
          title: "Design Pattern 12: Bridge Pattern - Complete Guide with Real-World Security System Examples...",
        
        description: "Master the Bridge Pattern with practical security system examples. Learn how to decouple abstraction from implementation, create flexible architectures, and build extensible systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-12-bridge-pattern/";
          
        },
      },{id: "post-design-pattern-11-adapter-pattern-complete-guide-with-real-world-stock-data-integration-examples",
        
          title: "Design Pattern 11: Adapter Pattern - Complete Guide with Real-World Stock Data Integration...",
        
        description: "Master the Adapter Pattern with practical stock data integration examples. Learn how to make incompatible interfaces work together, integrate legacy systems, and build flexible architectures.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/software%20engineering/programming/design-pattern-11-adapter-pattern/";
          
        },
      },{id: "post-how-to-monetize-your-website-with-google-adsense-complete-guide-for-developers",
        
          title: "How to Monetize Your Website with Google AdSense: Complete Guide for Developers",
        
        description: "Learn how to earn passive income by integrating Google AdSense into your website. Step-by-step setup, optimization tips, and best practices for maximizing ad revenue.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/monetization/google/web%20development/google-adsense/";
          
        },
      },{id: "post-jenkins-server-setup-complete-docker-installation-guide",
        
          title: "Jenkins Server Setup: Complete Docker Installation Guide",
        
        description: "Learn how to set up Jenkins server using Docker containers. Step-by-step guide for CI/CD automation, including Android build environment setup and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/ci/cd/docker/automation/jenkins-2-how-to-setup-jenkins-server/";
          
        },
      },{id: "post-jenkins-1-what-is-jenkins-complete-guide-to-ci-cd-automation-server",
        
          title: "Jenkins 1: What is Jenkins - Complete Guide to CI/CD Automation Server",
        
        description: "Learn about Jenkins, the powerful open-source automation server for continuous integration and continuous delivery. Discover its core concepts, benefits, and how it revolutionizes software development workflows.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/devops/ci/cd/software%20development/automation/build%20tools/jenkins-1-what-is-jenkins/";
          
        },
      },{id: "post-design-pattern-10-singleton-pattern-ensuring-single-instance-access-for-database-connections-and-global-state-management",
        
          title: "Design Pattern 10: Singleton Pattern - Ensuring Single Instance Access for Database Connections...",
        
        description: "Master the Singleton Pattern to ensure only one instance of a class exists. Learn how to implement thread-safe singletons for database connections, logging systems, and global configuration management with best practices.",
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
      },{id: "post-design-pattern-9-prototype-pattern-efficient-object-cloning-for-resource-management-and-performance-optimization",
        
          title: "Design Pattern 9: Prototype Pattern - Efficient Object Cloning for Resource Management and...",
        
        description: "Master the Prototype Pattern to create object copies efficiently. Learn how to implement cloning mechanisms for complex objects, reduce resource overhead, and improve application performance with practical examples.",
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
      },{id: "post-design-pattern-8-builder-pattern-step-by-step-construction-of-complex-objects-for-flexible-configuration",
        
          title: "Design Pattern 8: Builder Pattern - Step-by-Step Construction of Complex Objects for Flexible...",
        
        description: "Master the Builder Pattern to construct complex objects step by step. Learn how to create flexible object construction with optional parameters, improve code readability, and handle complex initialization scenarios.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/code%20quality/design-pattern-8-builder-pattern/";
          
        },
      },{id: "post-design-pattern-7-abstract-factory-pattern-creating-families-of-related-objects-for-multi-region-applications",
        
          title: "Design Pattern 7: Abstract Factory Pattern - Creating Families of Related Objects for...",
        
        description: "Master the Abstract Factory Pattern to create families of related objects. Learn how to implement region-specific product families for global applications with practical examples and best practices.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/globalization/design-pattern-7-abstract-factory-pattern/";
          
        },
      },{id: "post-design-pattern-6-factory-method-pattern-flexible-object-creation-for-multi-region-applications",
        
          title: "Design Pattern 6: Factory Method Pattern - Flexible Object Creation for Multi-Region Applications...",
        
        description: "Master the Factory Method Pattern to create objects without specifying exact classes. Learn how to implement region-specific factories, improve flexibility, and support global application expansion.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/globalization/design-pattern-6-factory-method-pattern/";
          
        },
      },{id: "post-design-pattern-5-simple-factory-pattern-centralized-object-creation-for-dynamic-beverage-ordering-systems",
        
          title: "Design Pattern 5: Simple Factory Pattern - Centralized Object Creation for Dynamic Beverage...",
        
        description: "Master the Simple Factory Pattern to centralize object creation logic. Learn how to separate variable and constant code, improve maintainability, and create flexible object instantiation systems.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/code%20quality/design-pattern-5-simple-factory-pattern/";
          
        },
      },{id: "post-design-pattern-4-uml-diagrams-visual-modeling-language-for-software-architecture-and-design-patterns",
        
          title: "Design Pattern 4: UML Diagrams - Visual Modeling Language for Software Architecture and...",
        
        description: "Master UML (Unified Modeling Language) to visualize software architecture and design patterns. Learn class diagrams, relationships, and how to effectively communicate software design concepts.",
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
      },{id: "post-design-pattern-3-design-patterns-overview-systematic-approach-to-solving-common-software-design-problems",
        
          title: "Design Pattern 3: Design Patterns Overview - Systematic Approach to Solving Common Software...",
        
        description: "Master the systematic approach to applying design patterns. Learn the Context-Forces-Problem-Solution framework, pattern categories, and step-by-step methodology for solving software design challenges.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/software%20architecture/design-pattern-3-design-pattern/";
          
        },
      },{id: "post-design-pattern-2-object-oriented-design-principles-solid-principles-for-building-maintainable-software-systems",
        
          title: "Design Pattern 2: Object-Oriented Design Principles - SOLID Principles for Building Maintainable Software...",
        
        description: "Master the SOLID principles to improve object-oriented design quality. Learn Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles with practical examples.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20patterns/software%20development/object-oriented%20programming/code%20quality/design-pattern-2-design-principle/";
          
        },
      },{id: "post-design-pattern-1-object-oriented-concepts-foundation-for-understanding-complex-design-patterns",
        
          title: "Design Pattern 1: Object-Oriented Concepts - Foundation for Understanding Complex Design Patterns",
        
        description: "Master the four core object-oriented concepts: Encapsulation, Inheritance, Polymorphism, and Abstraction. Learn how these fundamental principles form the foundation for understanding and implementing design patterns.",
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
