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
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
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
        },{id: "post-如何抓取-ios-的網路封包",
        
          title: "如何抓取 iOS 的網路封包",
        
        description: "教你如何使用 rvictl 與 Wireshark 抓取 iOS 裝置封包，快速分析連線問題，是 iOS 與 IoT 開發必備技巧！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/how-to-capture-network-packet-on-ios/";
          
        },
      },{id: "post-如何抓取-android-的網路封包",
        
          title: "如何抓取 Android 的網路封包",
        
        description: "實戰教你如何使用 tcpdump 搭配 Wireshark 抓取 Android 手機的封包資料，解決連線與串流問題的強大除錯技巧。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/how-to-capture-network-packet-on-android-using-tcpdump/";
          
        },
      },{id: "post-搞懂-p2p-技術-3-webrtc-x-aws-x-kvs",
        
          title: "搞懂 P2P 技術 (3) - WebRTC x AWS x KVS",
        
        description: "深入解析 WebRTC 架構、Signaling Server 設計、ICE 協議流程與 AWS KVS 串流實作，搞懂 P2P 在即時通訊與 IoT 中的應用。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/p2p-tech-3-webrtc-kvs/";
          
        },
      },{id: "post-搞懂-p2p-技術-2-stun-x-turn-x-ice",
        
          title: "搞懂 P2P 技術 (2) - STUN x TURN x ICE",
        
        description: "解析 STUN、TURN 與 ICE 協議，搞懂 P2P 穿透技術，突破 NAT 限制建立穩定連線，打造強大 iOS / Android 即時通訊架構。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/p2p-tech-2-stun-turn-ice/";
          
        },
      },{id: "post-搞懂-p2p-技術-1-p2p-x-ipv4-x-nat",
        
          title: "搞懂 P2P 技術 (1) - P2P x IPv4 x NAT",
        
        description: "深入解析 P2P 穿透技術、NAT 類型與通訊限制，掌握物聯網與分佈式架構下的網路連線原理。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/p2p-tech-1-ipv4-nat/";
          
        },
      },{id: "post-3d-graphic-engine-tips-三角形-x-uv-mapping-x-vertices-amp-indices",
        
          title: "3D Graphic Engine Tips - 三角形 x UV mapping x Vertices &amp; Indices...",
        
        description: "寫 3D 繪圖程式必需要知道的知識，這篇帶你快速掌握基本建模邏輯與映射概念。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/3d_graphic_tips/";
          
        },
      },{id: "post-如何讓-jekyll-網站被-google-搜尋到-search-console-sitemap-教學",
        
          title: "如何讓 Jekyll 網站被 Google 搜尋到｜Search Console + Sitemap 教學",
        
        description: "Google 大大，你把我的網頁藏哪去了？教你兩步驟：提交 Search Console、啟用 Sitemap！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/how-to-add-your-jekyll-blog-website-to-google-search-console/";
          
        },
      },{id: "post-使用-jekyll-minimal-mistakes-在-github-pages-上架設自己的部落格",
        
          title: "使用 Jekyll + minimal-mistakes 在 GitHub Pages 上架設自己的部落格",
        
        description: "原來架設 Blog 也能如此輕鬆簡單！這篇文章手把手教你從 0 開始，用 Jekyll + Minimal Mistakes 架站。",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/creating_a_github_pages_with_jekyll_and_minimal_mistakes/";
          
        },
      },{id: "post-如何讓-octopress-網站被-google-找到-search-console-實作教學",
        
          title: "如何讓 Octopress 網站被 Google 找到｜Search Console 實作教學",
        
        description: "Google 大大，你把我的網頁藏哪去了？",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/how-to-add-your-octopress-blog-website-to-google-search-console/";
          
        },
      },{id: "post-用-octopress-架設靜態部落格-github-pages-實戰教學",
        
          title: "用 Octopress 架設靜態部落格｜GitHub Pages 實戰教學",
        
        description: "想不到架一個部落格，其實可以這麼簡單又有趣！",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/octopress-setup/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
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
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
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
