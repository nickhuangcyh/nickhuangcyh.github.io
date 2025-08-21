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
        },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2025-07-24-intro-to-ai-agents-mcp-rag-llm/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2025-05-18-how-to-use-multiple-github-accounts-using-ssh/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2025-03-15-ai-tools-excalidraw-chart-guide/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-29-design-pattern-28-interpreter-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-28-design-pattern-27-visitor-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-28-design-pattern-26-template-method-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-26-design-pattern-25-strategy-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-25-design-pattern-24-state-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-24-design-pattern-23-observer-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-23-design-pattern-22-memento-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-22-design-pattern-21-mediator-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-22-design-pattern-20-iterator-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-21-design-pattern-19-command-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-08-design-pattern-12-bridge-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-07-design-pattern-11-adapter-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-12-01-google-adsense/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-08-02-how-to-enable-rsa-encryption-algorithm-key-in-openssh-8-8/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-07-23-getting-started-with-github-container-registry/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-07-16-how-to-build-chiptool-for-android/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-07-05-google-wallet-smart-tap-exploring/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-07-05-design-pattern-4-uml/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-07-04-design-pattern-3-design-pattern/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-07-03-design-pattern-2-design-principle/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-07-02-design-pattern-1-object-oriented-concepts/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2024-01-11-setup-development-environment-on-a-new-macos/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2022-11-09-how-to-capture-network-packet-on-ios/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2022-11-06-how-to-capture-network-packet-on-android-using-tcpdump/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2022-01-02-3d-graphic-tips/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2021-12-31-how-to-add-your-jekyll-blog-website-to-google-search-console/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2021-12-30-creating-a-github-pages-with-jekyll-and-minimal-mistakes/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2020-09-10-octopress-setup/";
          
        },
      },{id: "post-",
        
          title: "",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/_i18n/en/2020-09-10-how-to-add-your-octopress-blog-website-to-google-search-console/";
          
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
      },{id: "post-design-pattern-9-prototype-pattern-complete-tutorial-object-cloning-and-performance-optimization",
        
          title: "Design Pattern (9) Prototype Pattern Complete Tutorial - Object Cloning and Performance Optimization...",
        
        description: "Learn how Prototype Pattern solves performance issues through object cloning. Deep dive into shallow and deep copy concepts, Cloneable interface implementation, and best practices through game character creation system examples. Includes UML design and example code.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/design%20pattern/design-pattern-9-prototype-pattern/";
          
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
