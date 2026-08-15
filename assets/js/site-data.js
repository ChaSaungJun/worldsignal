/**
 * World Signal - 중앙 데이터 정의
 * 헤더 메뉴, 카테고리 탭 (연결 링크 정보 포함), 푸터 메뉴, 통합 포스트 데이터
 */
window.SITE_DATA = {
  title: "World Signal",
  tagline: "Delivering Korea's latest news and insights to the world in English",

  // 상단 네비게이션 메뉴
  headerNav: [
    { title: "Home", path: "" },
    { title: "About", path: "about/" }
  ],

  // 카테고리 탭 네비게이션 (이동 연결 링크 path 및 카테고리 식별자)
  categoryTabs: [
    { id: "notice", name: "Notice", path: "#notice", targetCategory: "notice" },
    { id: "news", name: "News", path: "#news", targetCategory: "news" },
    { id: "ent", name: "Ent.", path: "#ent", targetCategory: "ent" }
  ],

  // 푸터 메뉴
  footerNav: [
    { title: "Home", path: "" },
    { title: "About", path: "about/" }
  ],

  // 허용된 태그 사전 (사전 정의된 목록 내에서만 선택하여 동종 주제 매칭에 활용)
  allowedTags: [
    "k-pop",
    "k-drama",
    "culture",
    "gaming",
    "music-awards",
    "tech",
    "society",
    "policy",
    "streaming",
    "comeback"
  ],

  // 게시글 데이터 (날짜순 정렬 및 동적 렌더링에 사용)
  posts: [
    {
      id: "bill-gates-korea-visit-terrapower-smr-2026",
      title: "Why Bill Gates Came to Korea: AI Power Surge and the Critical Role of Korean Supply Chains in TerraPower's SMR Strategy",
      path: "posts/bill-gates-korea-visit-terrapower-smr-2026/",
      category: "news",
      categoryName: "News",
      tags: ["tech", "policy", "society"],
      date: "August 15, 2026",
      datetime: "2026-08-15",
      thumbnail: "assets/img/bill-gates-korea-visit-smr-thumbnail.png",
      excerpt: "TerraPower founder Bill Gates visited South Korea to solidify next-generation SMR supply chain partnerships with SK, HD Hyundai, Doosan Enerbility, and KHNP amid surging AI energy demand..."
    },
    {
      id: "hwasa-jensen-huang-handwritten-letter-2026",
      title: "Hwasa Reveals Story Behind Handwritten Letter to NVIDIA CEO Jensen Huang: The Unexpected Backstory",
      path: "posts/hwasa-jensen-huang-handwritten-letter-2026/",
      category: "ent",
      categoryName: "Ent.",
      tags: ["k-pop", "tech"],
      date: "August 9, 2026",
      datetime: "2026-08-09",
      thumbnail: "assets/img/hwasa-jensen-huang-handwritten-letter-thumbnail.png",
      excerpt: "K-pop star Hwasa reveals the story behind her handwritten letter to NVIDIA CEO Jensen Huang following his praise of her songs 'Good Goodbye' and 'So Cute'..."
    },
    {
      id: "chzzk-singcup-galaxy-song-contest-2026",
      title: "Naver’s Chzzk Hosts Streamer Song Competition 'Singcup Galaxy' Ahead of GXG 2026 Finals",
      path: "posts/chzzk-singcup-galaxy-song-contest-2026/",
      category: "ent",
      categoryName: "Ent.",
      tags: ["gaming", "streaming", "music-awards"],
      date: "August 6, 2026",
      datetime: "2026-08-06",
      thumbnail: "assets/img/chzzk-singcup-galaxy-thumbnail.png",
      excerpt: "Naver's live streaming platform Chzzk returns with 'Singcup Galaxy', expanding entries to VTubers and group duets with live viewer voting leading to the grand finals at GXG 2026 in Pangyo..."
    },
    {
      id: "2026-kwda-lineup-27-artists",
      title: "2026 KWDA Lineup: Key Highlights of the 27 Performing Acts",
      path: "posts/2026-kwda-lineup-27-artists/",
      category: "ent",
      categoryName: "Ent.",
      tags: ["k-pop", "music-awards"],
      date: "August 6, 2026",
      datetime: "2026-08-06",
      thumbnail: "assets/img/kwda-2026-lineup-thumbnail.png",
      excerpt: "2026 K World Dream Awards lineup features 27 acts including ATEEZ, RIIZE, LE SSERAFIM, SeeYa, and Hearts2Hearts..."
    },
    {
      id: "red-velvet-velvet-summer-comeback-2026",
      title: "Red Velvet Tops Charts with Comeback: Changes More Surprising Than Numbers",
      path: "posts/red-velvet-velvet-summer-comeback-2026/",
      category: "ent",
      categoryName: "Ent.",
      tags: ["k-pop", "comeback"],
      date: "August 5, 2026",
      datetime: "2026-08-05",
      thumbnail: "https://harvestsciencelab.com/wp-content/uploads/2026/08/step5_thumbnail-3.jpg",
      excerpt: "Red Velvet tops charts with new mini-album Velvet Summer..."
    },
    {
      id: "sample-post",
      title: "Welcome to World Signal — Introducing Our English Channel",
      path: "posts/sample-post/",
      category: "news",
      categoryName: "News",
      tags: ["culture", "society"],
      date: "July 4, 2026",
      datetime: "2026-07-04",
      thumbnail: "assets/img/thumb-sample.svg",
      excerpt: "World Signal delivers curated news and stories from Korea..."
    }
  ]
};
