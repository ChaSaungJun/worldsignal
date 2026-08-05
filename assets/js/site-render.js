/**
 * World Signal - 공통 UI 렌더러
 * 중앙 데이터(SITE_DATA)를 기반으로 헤더, 카테고리 탭 (연결 링크 포함), 사이드바 최신글, 푸터를 동적으로 동기화합니다.
 */
(function() {
  // 스크립트 상대 경로 기준으로 루트 경로 계산 (예: "", "../", "../../")
  function getRootPrefix() {
    const script = document.querySelector('script[src*="site-render.js"]');
    if (script) {
      const src = script.getAttribute('src');
      const idx = src.indexOf('assets/');
      if (idx !== -1) {
        return src.substring(0, idx);
      }
    }
    return '';
  }

  // 상단 헤더 및 메인 네비게이션 렌더링
  function renderHeader(rootPrefix) {
    const headerTitleLink = document.querySelector('.site-header .main-title a');
    if (headerTitleLink && window.SITE_DATA) {
      headerTitleLink.href = rootPrefix || './';
      headerTitleLink.textContent = window.SITE_DATA.title || 'World Signal';
    }

    const navUl = document.querySelector('.main-navigation ul');
    if (navUl && window.SITE_DATA && window.SITE_DATA.headerNav) {
      navUl.innerHTML = '';
      window.SITE_DATA.headerNav.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = rootPrefix + item.path;
        a.textContent = item.title;
        li.appendChild(a);
        navUl.appendChild(li);
      });
    }
  }

  // 카테고리 탭 네비게이션 렌더링 (각 탭과 연결된 링크 정보 포함)
  function renderCategoryBar(rootPrefix) {
    const categoryBar = document.querySelector('.category-bar');
    if (categoryBar && window.SITE_DATA && window.SITE_DATA.categoryTabs) {
      categoryBar.innerHTML = '';
      window.SITE_DATA.categoryTabs.forEach((tab, index) => {
        if (index > 0) {
          const divider = document.createElement('div');
          divider.className = 'divider';
          categoryBar.appendChild(divider);
        }
        const a = document.createElement('a');
        a.href = rootPrefix + tab.path;
        a.setAttribute('data-category', tab.targetCategory || tab.id);
        a.className = 'category-btn';
        a.textContent = tab.name;

        categoryBar.appendChild(a);
      });
    }
  }

  // 우측 사이드바 위젯 최신글 렌더링 (홈페이지 Latest Stories와 동일하게 datetime 내림차순 정렬)
  function renderSidebarWidget(rootPrefix) {
    const recentPostsUl = document.querySelector('.sidebar .recent-posts');
    if (recentPostsUl && window.SITE_DATA && window.SITE_DATA.posts) {
      recentPostsUl.innerHTML = '';

      // datetime 기준 내림차순 (최신 날짜순) 정렬
      const sortedPosts = [...window.SITE_DATA.posts].sort((a, b) => {
        return (b.datetime || '').localeCompare(a.datetime || '');
      });

      sortedPosts.forEach(post => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.href = rootPrefix + post.path;
        a.textContent = post.title;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'recent-post-date';
        dateSpan.textContent = post.date;

        li.appendChild(a);
        li.appendChild(dateSpan);
        recentPostsUl.appendChild(li);
      });
    }
  }

  // 푸터 네비게이션 렌더링
  function renderFooterNav(rootPrefix) {
    const footerUl = document.querySelector('.gi-footer__list');
    if (footerUl && window.SITE_DATA && window.SITE_DATA.footerNav) {
      footerUl.innerHTML = '';
      window.SITE_DATA.footerNav.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = rootPrefix + item.path;
        a.textContent = item.title;
        li.appendChild(a);
        footerUl.appendChild(li);
      });
    }
  }

  function init() {
    const rootPrefix = getRootPrefix();

    renderHeader(rootPrefix);
    renderCategoryBar(rootPrefix);
    renderSidebarWidget(rootPrefix);
    renderFooterNav(rootPrefix);
  }

  // DOM 상태에 따라 즉시 실행 또는 DOMContentLoaded 처리 (이미 로드된 경우 대응)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
