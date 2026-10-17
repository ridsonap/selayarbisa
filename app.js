document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  const themeLabel = document.getElementById('themeLabel');
  const metaThemeColor = document.getElementById('metaThemeColor');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const filterPills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.card');
  const emptyState = document.getElementById('emptyState');
  const toast = document.getElementById('toast');
  const copyButtons = document.querySelectorAll('.copy-btn');

  // Theme Management (Default Terang per instruksi)
  const getPreferredTheme = () => {
    const saved = localStorage.getItem('selayar_bisa_theme');
    // Jika belum pernah dipilih, default mutlak adalah 'light' (tema terang)
    return saved === 'dark' ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    const isDark = (theme === 'dark');
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      if (themeLabel) themeLabel.textContent = 'Gelap';
      if (themeToggle) themeToggle.title = 'Mode: Gelap (Klik untuk ganti Terang)';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#090d16');
    } else {
      document.documentElement.removeAttribute('data-theme');
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
      if (themeLabel) themeLabel.textContent = 'Terang';
      if (themeToggle) themeToggle.title = 'Mode: Terang (Klik untuk ganti Gelap)';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#f8fafc');
    }
    localStorage.setItem('selayar_bisa_theme', isDark ? 'dark' : 'light');
  };

  // Inisialisasi tema saat pertama kali render (Default: Terang)
  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isCurrentlyDark ? 'light' : 'dark');
      showToast(`Tema diubah ke Mode ${isCurrentlyDark ? 'Terang' : 'Gelap'}`);
    });
  }

  // State
  let activeFilter = 'all';
  let searchQuery = '';

  // Filter & Search Logic
  const filterCards = () => {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    cards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const keywords = card.getAttribute('data-keywords').toLowerCase();
      const title = card.querySelector('.card-title')?.innerText.toLowerCase() || '';
      const desc = card.querySelector('.card-desc')?.innerText.toLowerCase() || '';

      const matchesCategory = (activeFilter === 'all' || category === activeFilter);
      const matchesSearch = !query || 
        keywords.includes(query) || 
        title.includes(query) || 
        desc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  };

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchQuery.length > 0) {
        clearSearch?.classList.remove('hidden');
      } else {
        clearSearch?.classList.add('hidden');
      }
      filterCards();
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearch.classList.add('hidden');
      searchInput.focus();
      filterCards();
    });
  }

  // Filter Pill Listeners
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-filter');
      filterCards();
    });
  });

  // Toast Helper
  let toastTimeout;
  const showToast = (message) => {
    if (!toast) return;
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.remove('hidden');
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2200);
  };

  // Copy Link Buttons
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.getAttribute('data-url');
      if (!url) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = url;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        showToast(`Tautan disalin: ${url}`);
      } catch (err) {
        showToast('Gagal menyalin tautan');
      }
    });
  });
});
