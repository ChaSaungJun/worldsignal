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

  // 게시글 데이터 (날짜순 정렬 및 동적 렌더링에 사용)
  posts: [
    {
      id: "red-velvet-velvet-summer-comeback-2026",
      title: "Red Velvet Tops Charts with Comeback: Changes More Surprising Than Numbers",
      path: "posts/red-velvet-velvet-summer-comeback-2026/",
      category: "ent",
      categoryName: "Ent.",
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
      date: "July 4, 2026",
      datetime: "2026-07-04",
      thumbnail: "assets/img/thumb-sample.svg",
      excerpt: "World Signal delivers curated news and stories from Korea..."
    }
  ]
};
