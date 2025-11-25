// === KIỂM TRA THEME KHI TẢI TRANG ===
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // === HÀM ÁP DỤNG THEME ===
  const applyTheme = (theme) => {
    if (theme === 'light') {
      body.classList.add('light-mode');
      if (themeToggle) {
        themeToggle.classList.add('light-mode-active');
      }
    } else {
      body.classList.remove('light-mode');
      if (themeToggle) {
        themeToggle.classList.remove('light-mode-active');
      }
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
  
  // === BACK TO TOP BUTTON ===
  const backToTopButton = document.getElementById('backToTop');

  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // === FAQ ACCORDION - Only one open at a time ===
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('toggle', function() {
      if (this.open) {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== this && otherItem.open) {
            otherItem.open = false;
          }
        });
      }
    });
  });

  // === PRICING CARDS MOUSE TRACKING EFFECT ===
  const pricingCards = document.querySelectorAll('.pricing-card');

  pricingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });

  // === SCHEDULE DEMO BUTTON ===
  const scheduleDemoBtn = document.getElementById('schedule-demo-btn');

  if (scheduleDemoBtn) {
    scheduleDemoBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  console.log(' Landing page đã load thành công!');
  console.log('Theme hiện tại:', savedTheme);
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
      
      console.log(' Form submitted:', formData);
      alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24 giờ.');
      this.reset();
    });
  }
});