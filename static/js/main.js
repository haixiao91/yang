/**
 * 君通智库 - 首页交互脚本
 * juntong_thinktank v1.0
 */

$(function () {
  // ========== 侧边栏折叠 ==========
  $('.sidebar-collapse-btn').on('click', function () {
    const $sidebar = $('.sidebar');
    const $main = $('.main-content');
    $sidebar.toggleClass('collapsed');
    $main.toggleClass('sidebar-collapsed');
  });

  // ========== 导航菜单交互 ==========
  $('.nav-item.has-sub > .nav-item').on('click', function () {
    const $parent = $(this);
    const $submenu = $parent.next('.nav-submenu');
    
    // 切换展开状态
    $parent.toggleClass('open');
    
    // 箭头旋转
    const $arrow = $parent.find('.nav-arrow');
    $arrow.css('transform', $parent.hasClass('open') ? 'rotate(90deg)' : '');
    
    // 子菜单动画
    $submenu.stop().slideToggle(200);
  });

  // ========== 导航高亮 ==========
  $('.nav-item[data-menu]').on('click', function () {
    const menuKey = $(this).data('menu');
    
    // 移除所有高亮
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
    
    // 如果有子菜单，也展开
    $(this).parents('.nav-submenu').prev().addClass('active open');
  });

  // ========== 搜索框 ==========
  const $searchInput = $('.topbar-search input');
  const $searchWrap = $('.topbar-search');
  
  $searchInput.on('focus', function () {
    $searchWrap.addClass('focused');
  }).on('blur', function () {
    $searchWrap.removeClass('focused');
  });

  // 回车搜索
  $searchInput.on('keydown', function (e) {
    if (e.key === 'Enter') {
      const keyword = $(this).val().trim();
      if (keyword) {
        console.log('搜索:', keyword);
        // TODO: 实现搜索功能
      }
    }
  });

  // ========== 工具提示 ==========
  $('[data-tip]').hover(function () {
    const tip = $(this).data('tip');
    // 可扩展为 tooltip
  });

  // ========== 卡片悬浮效果 ==========
  // 模块卡片已有 CSS 实现，JS 可做额外增强
  $('.module-card').on('mouseenter', function () {
    $(this).find('.module-icon').css('transform', 'scale(1.1)');
  }).on('mouseleave', function () {
    $(this).find('.module-icon').css('transform', 'scale(1)');
  });

  // ========== 案例卡片点击 ==========
  $('.case-card').on('click', function () {
    const title = $(this).find('.case-title').text();
    console.log('查看案例:', title);
    // TODO: 跳转案例详情
  });

  // ========== 工具卡片点击 ==========
  $('.tool-card').on('click', function () {
    const name = $(this).find('.tool-name').text();
    console.log('使用工具:', name);
    // TODO: 跳转工具页
  });

  // ========== 滚动动画 (Intersection Observer) ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).addClass('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 数字滚动动画
  function animateNumber($el, target, duration) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(start + (target - start) * eased);
      $el.text(current.toLocaleString());
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  let statsAnimated = false;
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      $('.stat-number').each(function () {
        const target = parseInt($(this).data('value'), 10);
        animateNumber($(this), target, 1500);
      });
    }
  }, { threshold: 0.5 });

  const $statsSection = $('.stats-section');
  if ($statsSection.length) {
    statsObserver.observe($statsSection[0]);
  }

  // 各区块滚动进入动画
  $('section[data-animate]').each(function () {
    observer.observe(this);
  });

  // ========== 顶部通知小红点闪烁 ==========
  setInterval(() => {
    const $badge = $('.topbar-icon-btn .badge');
    if ($badge.is(':visible')) {
      $badge.css('opacity', $badge.css('opacity') === '1' ? '0.3' : '1');
    }
  }, 1000);

  // ========== 平滑滚动到锚点 ==========
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 400);
    }
  });

  // ========== 响应移动端菜单 ==========
  $('.topbar-menu-btn').on('click', function () {
    $('.sidebar').addClass('mobile-open');
  });

  $('.sidebar-overlay').on('click', function () {
    $('.sidebar').removeClass('mobile-open');
  });

  // ========== 初始化 ==========
  console.log('🦐 君通智库初始化完成');
});
