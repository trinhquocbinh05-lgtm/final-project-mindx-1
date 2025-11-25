// ============================================
// REUSABLE COMPONENTS: SIDEBAR & HEADER
// ============================================

// ============================================
// SIDEBAR COMPONENT
// ============================================

/**
 * Render Sidebar component
 * @param {string} activePage - Current active page (e.g., 'dashboard', 'employees', 'attendance')
 * @returns {string} HTML string for sidebar
 */
function renderSidebar(activePage = '') {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: 'dashboard.html' },
    { id: 'employees', label: 'All Employees', icon: 'users', href: 'employees.html' },
    { id: 'departments', label: 'All Departments', icon: 'user', href: 'departments.html' },
    { id: 'attendance', label: 'Attendance', icon: 'calendar', href: 'attendance.html' },
    { id: 'payroll', label: 'Payroll', icon: 'dollar', href: 'payroll.html' },
    { id: 'jobs', label: 'Jobs', icon: 'briefcase', href: 'jobs.html' },
    { id: 'candidates', label: 'Candidates', icon: 'user-plus', href: 'candidates.html' },
    { id: 'leaves', label: 'Leaves', icon: 'calendar-x', href: 'leaves.html' },
    { id: 'settings', label: 'Settings', icon: 'settings', href: 'settings.html' }
  ];

  const icons = {
    dashboard: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>',
    user: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
    dollar: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
    'user-plus': '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>',
    'calendar-x': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
    settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>'
  };

  let menuHTML = '';
  menuItems.forEach(item => {
    const isActive = item.id === activePage ? 'active' : '';
    menuHTML += `
            <a href="${item.href}" class="menu-item ${isActive}" data-tooltip="${item.label}">
                <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${icons[item.icon]}
                </svg>
                <span>${item.label}</span>
            </a>`;
  });

  return `
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6m8.66-15.66l-4.24 4.24m-8.48 8.48l-4.24 4.24M1 12h6m6 0h6M3.34 3.34l4.24 4.24m8.48 8.48l4.24 4.24"></path>
                </svg>
                <span class="logo-text">HRMS</span>
            </div>
            <button class="sidebar-toggle" id="sidebar-toggle" data-tooltip="Thu gọn">
                <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6"></path>
                </svg>
            </button>
        </div>

        <nav class="sidebar-menu">
            ${menuHTML}
        </nav>

        <div class="sidebar-footer">
            <div id="theme-toggle" class="theme-toggle-switch">
                <div class="toggle-thumb">
                    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </aside>
  `;
}

// ============================================
// HEADER COMPONENT
// ============================================

/**
 * Render Header component
 * @param {string} title - Page title
 * @param {string} subtitle - Page subtitle/breadcrumb
 * @param {Object} options - Additional options (showSearch, showAddButton, addButtonText, addButtonCallback)
 * @returns {string} HTML string for header
 */
function renderHeader(title, subtitle = '', options = {}) {
  const {
    showSearch = true,
    showAddButton = false,
    addButtonText = 'Add New',
    addButtonId = 'add-new-btn',
    showFilter = false
  } = options;

  return `
    <header class="header">
        <div class="header-left">
            <h1>${title}</h1>
            ${subtitle ? `<p class="breadcrumb">${subtitle}</p>` : ''}
        </div>
        <div class="header-right">
            ${showSearch ? `
            <div class="search-box">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" placeholder="Search" id="header-search">
            </div>
            ` : ''}
            ${showAddButton ? `
            <button class="btn-primary" id="${addButtonId}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                ${addButtonText}
            </button>
            ` : ''}
            ${showFilter ? `
            <button class="btn-secondary" id="filter-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Filter
            </button>
            ` : ''}
            
            <div class="user-profile">
                <img src="/assets/img/default.png" alt="User" id="user-avatar" class="user-avatar">
                <div class="user-info">
                    <span class="user-name" id="user-name">Loading...</span>
                    <span class="user-role" id="user-role">...</span>
                </div>
            </div>
        </div>
    </header>
  `;
}

// ============================================
// INITIALIZE COMPONENTS
// ============================================

function initComponents(activePage, pageTitle, pageSubtitle = '', headerOptions = {}) {
  // 1. Inject Sidebar
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = renderSidebar(activePage);
  }

  // 2. Inject Header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = renderHeader(pageTitle, pageSubtitle, headerOptions);
  }

  console.log('✅ HTML Components injected');

  // 3. KÍCH HOẠT LOGIC TỪ GLOBAL.JS
  // Vì HTML đã có, giờ ta mới gắn sự kiện (Event Listeners)
  if (window.setupUserInfo) window.setupUserInfo();
  if (window.setupSidebarLogic) window.setupSidebarLogic();
  if (window.setupThemeLogic) window.setupThemeLogic();
  if (window.setupLogout) window.setupLogout();
  if (window.setupPageTransition) window.setupPageTransition();
}