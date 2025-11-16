

console.log(' global.js loaded');

// ============================================
// BƯỚC 1: KIỂM TRA ĐĂNG NHẬP
// ============================================

// Đọc thông tin user từ bộ nhớ tạm (localStorage)
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Nếu không có thông tin user, bắt đăng nhập lại
if (!currentUser) {
  alert('Vui lòng đăng nhập!');
  window.location.href = 'login.html';
}

// ============================================
// BƯỚC 2: HIỂN THỊ THÔNG TIN USER Ở HEADER
// ============================================

const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userRole = document.getElementById('user-role');

// Chỉ chạy nếu tìm thấy thông tin user VÀ các thẻ HTML
if (currentUser && userAvatar && userName && userRole) {
  userAvatar.src = currentUser.avatarPath || '/Final_Project/assets/img/default.png';
  userAvatar.alt = currentUser.fullName;
  userName.textContent = currentUser.fullName;
  userRole.textContent = currentUser.role;
  console.log('✅ Loaded user info:', currentUser);
}

// ============================================
// BƯỚC 6: CHỨC NĂNG TOGGLE DARK/LIGHT MODE
// ============================================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body; // Lấy thẻ <body>

if (themeToggle) {
  
  // Hàm này dùng để ÁP DỤNG theme (thêm/xóa class)
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      themeToggle.classList.add('dark-mode-active');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      themeToggle.classList.remove('dark-mode-active');
    }
  };

  // Xử lý khi bấm nút toggle
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    
    // 1. Lưu lựa chọn mới vào localStorage
    localStorage.setItem('theme', newTheme);
    
    // 2. Áp dụng theme mới
    applyTheme(newTheme);
  });

  // Load theme đã lưu khi tải trang
  const savedTheme = localStorage.getItem('theme') || 'light'; // Mặc định là 'light'
  applyTheme(savedTheme);
  console.log('✅ Applied theme:', savedTheme);
}

// ============================================
// BƯỚC 7: CHỨC NĂNG ĐĂNG XUẤT (LOGOUT)
// ============================================

const userProfile = document.querySelector('.user-profile');

if (userProfile) {
  userProfile.addEventListener('click', () => {
    const confirmLogout = confirm('Bạn có muốn đăng xuất?');
    if (confirmLogout) {
      // Xóa thông tin đăng nhập
      localStorage.removeItem('currentUser');
      
      // Quay về trang login
      window.location.href = 'login.html';
    }
  });
}

// ============================================
// BƯỚC 8: HIỆU ỨNG CHUYỂN TRANG (KHẮC PHỤC LỖI CHỚP SÁNG)
// ============================================

/* --- PHẦN 1: FADE-IN KHI VÀO TRANG --- */

// Chúng ta dùng 'DOMContentLoaded' để đảm bảo <body> đã tải xong
// trước khi thêm class 'is-entering'

document.addEventListener('DOMContentLoaded', () => {
  /*
   * Thêm class 'is-entering' vào <body>.
   * CSS (ở file employees.css) sẽ bắt class này và thực hiện:
   * 1. body { opacity: 0; } (Mặc định)
   * 2. body.is-entering { opacity: 1; transition: ...; } (Hiện ra)
   */
  body.classList.add('is-entering');
  console.log('✅ Page fade-in executed.');
});

/* --- PHẦN 2: FADE-OUT KHI RỜI TRANG --- */

console.log('✅ Initializing page transitions (fade-out links)');

// Tìm tất cả các link <a> trong sidebar
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

sidebarLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    
    const href = this.href;
    const currentUrl = window.location.href.split('#')[0];

    // Chỉ chạy nếu bấm vào link của trang KHÁC
    if (href !== currentUrl) {
      
      // 1. Ngăn trình duyệt chuyển trang ngay lập tức
      e.preventDefault();
      
      // 2. Xóa class 'is-entering' và thêm class 'is-leaving'
      //    để kích hoạt animation mờ đi (fade-out)
      body.classList.remove('is-entering');
      body.classList.add('is-leaving');
      
      // 3. Đợi animation (300ms) chạy xong
      setTimeout(() => {
        // 4. Chuyển trang
        window.location.href = href;
      }, 300); // 300ms = 0.3s (Phải khớp với CSS 'transition' của body.is-leaving)
    }
  });
});
