// === BIẾN TOÀN CỤC ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// === HÀM ÁP DỤNG THEME ===
const applyTheme = (theme) => {
  if (theme === 'light') {
    body.classList.add('light-mode');
    themeToggle.classList.add('light-mode-active');
  } else {
    body.classList.remove('light-mode');
    themeToggle.classList.remove('light-mode-active');
  }
};

// === XỬ LÝ CLICK TOGGLE ===
const handleToggleClick = () => {
  const isLightMode = body.classList.contains('light-mode');
  const newTheme = isLightMode ? 'dark' : 'light';
  
  // Lưu theme vào localStorage
  localStorage.setItem('theme', newTheme);
  
  // Áp dụng theme
  applyTheme(newTheme);
};

// === GẮNG SỰ KIỆN CHO TOGGLE ===
if (themeToggle) {
  themeToggle.addEventListener('click', handleToggleClick);
}

// === KIỂM TRA THEME KHI TẢI TRANG ===
document.addEventListener('DOMContentLoaded', () => {
  // Lấy theme đã lưu từ localStorage (mặc định là dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
  
  // === SMOOTH SCROLL CHO NAVIGATION LINKS ===
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Trừ đi height của navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // === ANIMATION KHI SCROLL VÀO VIEW ===
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Áp dụng animation cho các feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Áp dụng animation cho stat cards
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  
  console.log('🚀 Landing page đã load thành công!');
  console.log('🎨 Theme hiện tại:', savedTheme);
});

// === HÀM TOGGLE FAQ ===
function toggleFAQ(button) {
  const answer = button.nextElementSibling;
  button.classList.toggle('active');
  answer.classList.toggle('active');
  
  // Đóng các FAQ khác (optional)
  const allQuestions = document.querySelectorAll('.faq-question');
  allQuestions.forEach(q => {
    if (q !== button && q.classList.contains('active')) {
      q.classList.remove('active');
      q.nextElementSibling.classList.remove('active');
    }
  });
}

// === XỬ LÝ SUBMIT FORM ===
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        companySize: document.getElementById('company-size').value,
        message: document.getElementById('message').value,
        requestDemo: document.getElementById('request-demo').checked
      };
      
      console.log('📧 Form submitted:', formData);
      alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24 giờ.');
      this.reset();
    });
  }
});