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

  // 함께 보면 좋은 글 (Related Posts) 동적 렌더링 (사전 정의 태그 매칭 -> 카테고리 매칭 -> 최신순)
  function renderRelatedPosts(rootPrefix) {
    const section = document.getElementById('related-posts-section');
    const container = document.getElementById('related-posts-container');
    if (!section || !container || !window.SITE_DATA || !window.SITE_DATA.posts) return;

    // 현재 페이지 경로 파악 및 포스트 매칭
    const pathName = window.location.pathname;
    let currentPost = window.SITE_DATA.posts.find(p => {
      return pathName.includes(p.id) || pathName.includes(p.path.replace(/\/$/, ''));
    });

    // 경로 매칭 실패 시 fallback (예: sample-post 기본 매칭)
    if (!currentPost && pathName.includes('posts/')) {
      const parts = pathName.split('/').filter(Boolean);
      const lastFolder = parts[parts.length - 1];
      currentPost = window.SITE_DATA.posts.find(p => p.id === lastFolder);
    }

    if (!currentPost) {
      section.style.display = 'none';
      return;
    }

    const allowedTags = window.SITE_DATA.allowedTags || [];
    const currentTags = (currentPost.tags || []).filter(t => allowedTags.includes(t));
    const currentCategory = currentPost.category;

    // 점수 계산 및 후보 포스트 필터링
    const scoredPosts = window.SITE_DATA.posts
      .filter(p => p.id !== currentPost.id)
      .map(p => {
        const postTags = (p.tags || []).filter(t => allowedTags.includes(t));
        const overlapCount = postTags.filter(t => currentTags.includes(t)).length;
        const isSameCategory = (p.category === currentCategory);

        // 태그 1개 일치 당 10점, 동일 카테고리 3점
        const score = (overlapCount * 10) + (isSameCategory ? 3 : 0);

        return { post: p, score, datetime: p.datetime || '' };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.datetime.localeCompare(a.datetime);
      });

    // 추천 관련 글 0개일 경우 영역 완전히 숨김
    if (scoredPosts.length === 0) {
      section.style.display = 'none';
      return;
    }

    // 3~5개 선별 (최대 5개)
    const selected = scoredPosts.slice(0, 5);

    container.innerHTML = '';
    selected.forEach(item => {
      const p = item.post;
      const card = document.createElement('article');
      card.className = 'related-post-card';

      // 썸네일 URL 처리
      let thumbUrl = p.thumbnail || '';
      if (thumbUrl && !thumbUrl.startsWith('http://') && !thumbUrl.startsWith('https://')) {
        thumbUrl = rootPrefix + thumbUrl;
      }

      const postHref = rootPrefix + p.path;

      // 표준 <a href="...">를 포함한 크롤러 수집 가용성 최적화 구조
      card.innerHTML = `
        <a href="${postHref}" class="related-post-card-link" aria-label="${p.title}">
          <div class="related-post-thumb">
            ${thumbUrl ? `<img src="${thumbUrl}" alt="${p.title}" loading="lazy">` : `<div class="related-post-noimg">No Image</div>`}
          </div>
          <div class="related-post-body">
            <span class="related-post-cat">${p.categoryName || p.category}</span>
            <h4 class="related-post-title">${p.title}</h4>
            <span class="related-post-date">${p.date || ''}</span>
          </div>
        </a>
      `;

      container.appendChild(card);
    });

    section.style.display = 'block';
  }

  function init() {
    const rootPrefix = getRootPrefix();

    renderHeader(rootPrefix);
    renderCategoryBar(rootPrefix);
    renderSidebarWidget(rootPrefix);
    renderFooterNav(rootPrefix);
    renderRelatedPosts(rootPrefix);
  }

  // DOM 상태에 따라 즉시 실행 또는 DOMContentLoaded 처리 (이미 로드된 경우 대응)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
