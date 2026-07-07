/* ── FSWD Course Page — app.js ─────────────────────────────── */
(function () {
  'use strict';

  const sidebar       = document.getElementById('sidebar');
  const overlay       = document.getElementById('sidebarOverlay');
  const menuToggle    = document.getElementById('menuToggle');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const contentFrame  = document.getElementById('contentFrame');
  const toolbar       = document.getElementById('viewerToolbar');
  const crumbCurrent  = document.getElementById('crumbCurrent');
  const openNewTab    = document.getElementById('openNewTab');
  const closeBtn      = document.getElementById('closeViewer');

  let activeNav = null;

  /* ── Sidebar toggle (mobile) ───────────────────────────────── */
  menuToggle.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', open);
  });

  overlay.addEventListener('click', closeSidebar);

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  /* ── Load a resource ────────────────────────────────────────── */
  function loadResource(src, label, type) {
    welcomeScreen.style.display = 'none';
    contentFrame.classList.add('visible');
    toolbar.classList.add('visible');
    crumbCurrent.textContent = label;

    if (type === 'video') {
      openNewTab.href = src.replace('/embed/', '/watch?v=');
      contentFrame.src = src + '?autoplay=1&rel=0';
    } else {
      openNewTab.href = src;
      contentFrame.src = src;
    }

    closeSidebar();
  }

  /* ── Show welcome screen ────────────────────────────────────── */
  function showWelcome() {
    contentFrame.classList.remove('visible');
    contentFrame.src = '';
    toolbar.classList.remove('visible');
    welcomeScreen.style.display = '';

    if (activeNav) {
      activeNav.classList.remove('active');
      activeNav = null;
    }
  }

  /* ── Highlight active nav item ──────────────────────────────── */
  function setActiveNav(el) {
    if (activeNav) activeNav.classList.remove('active');
    el.classList.add('active');
    activeNav = el;
  }

  /* ── Sidebar nav clicks ─────────────────────────────────────── */
  document.querySelectorAll('.nav-item[data-src]').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const { src, label, type } = item.dataset;
      setActiveNav(item);
      loadResource(src, label, type);
    });
  });

  /* ── Quick-access card clicks ───────────────────────────────── */
  document.querySelectorAll('.quick-card[data-src]').forEach(card => {
    card.addEventListener('click', () => {
      const { src, label, type } = card.dataset;
      const match = document.querySelector(`.nav-item[data-src="${CSS.escape(src)}"]`);
      if (match) setActiveNav(match);
      loadResource(src, label, type);
    });
  });

  /* ── Close viewer ───────────────────────────────────────────── */
  closeBtn.addEventListener('click', showWelcome);

})();
