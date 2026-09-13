/* ===== Мобильное меню ===== */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');

if (mobileMenuBtn && mobileMenuOverlay) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
}

if (mobileMenuClose && mobileMenuOverlay) {
  mobileMenuClose.addEventListener('click', () => {
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
      mobileMenuOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

/* ===== Поиск ===== */
const searchLinks = document.querySelectorAll('.top-bar-link[href="#"], .mobile-nav-link[href="#"]');
searchLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    if (link.textContent.includes('Поиск') || link.querySelector('.fa-search')) {
      e.preventDefault();
      if (searchOverlay) {
        searchOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    }
  });
});

if (searchClose && searchOverlay) {
  searchClose.addEventListener('click', () => {
    searchOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

if (searchOverlay) {
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

/* ===== Плавная прокрутка ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    if (href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });

      if (window.innerWidth <= 992 && mobileMenuOverlay) {
        mobileMenuOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });
});

/* ===== Фиксация шапки ===== */
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
    }
  });
}

/* ===== Карта (Leaflet) ===== */
const mapEl = document.getElementById('map');

if (mapEl && typeof L !== 'undefined') {
  const map = L.map('map').setView([59.9868, 30.1803], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([59.9868, 30.1803])
    .addTo(map)
    .bindPopup('<b>ПАО «Газпром»</b><br>Лахтинский проспект, д. 2, корп. 3, стр. 1')
    .openPopup();
}

/* ===== Боковое меню инвесторов ===== */
const investorsMenu = document.querySelector('[data-investors-menu]');

if (investorsMenu) {
  const links = investorsMenu.querySelectorAll('.sidebar-link');

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          links.forEach((l) => l.classList.remove('active'));
          this.classList.add('active');

          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ===== Вкладки пресс-центра ===== */
const pressTabs = document.querySelector('[data-press-tabs]');

if (pressTabs) {
  const tabButtons = pressTabs.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('[data-tab-content]');

  const switchTab = (tabId) => {
    /* Все вкладки скрываем */
    tabContents.forEach((content) => {
      content.hidden = content.dataset.tabContent !== tabId;
    });

    /* Все кнопки деактивируем */
    tabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  /* По умолчанию — «События» */
  switchTab('events');
}