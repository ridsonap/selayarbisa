document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const filterPills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.card');
  const emptyState = document.getElementById('emptyState');
  const toast = document.getElementById('toast');
  const copyButtons = document.querySelectorAll('.copy-btn');

  // Theme Management
  const getPreferredTheme = () => {
    const saved = localStorage.getItem('selayar_bisa_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      document.documentElement.removeAttribute('data-theme');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
    localStorage.setItem('selayar_bisa_theme', theme);
  };

  // Init Theme
  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

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
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery.length > 0) {
      clearSearch.classList.remove('hidden');
    } else {
      clearSearch.classList.add('hidden');
    }
    filterCards();
  });

  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearch.classList.add('hidden');
    searchInput.focus();
    filterCards();
  });

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
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.remove('hidden');
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
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
