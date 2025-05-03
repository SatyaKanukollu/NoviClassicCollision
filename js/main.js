import AOS from 'aos';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true
  });

  // Initialize navigation
  initializeNavigation();
  
  // Initialize testimonials slider
  initializeTestimonialsSlider();
  
  // Initialize team slider
  initializeTeamSlider();
  
  // Initialize gallery
  initializeGallery();
});

function initializeNavigation() {
  const header = document.getElementById('header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (navMenu) navMenu.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
      }
    });
  });
}

function initializeTestimonialsSlider() {
  new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

function initializeTeamSlider() {
  const slider = document.querySelector('.team-slider');
  const prevBtn = document.querySelector('.team-nav.prev');
  const nextBtn = document.querySelector('.team-nav.next');
  
  if (!slider || !prevBtn || !nextBtn) return;
  
  let position = 0;
  const slideWidth = 300; // Width of team member card + gap
  const container = slider.parentElement;
  
  function updateSliderPosition() {
    slider.style.transform = `translateX(${position}px)`;
  }

  function checkButtonVisibility() {
    const maxScroll = -(slider.scrollWidth - container.clientWidth);
    prevBtn.style.opacity = position === 0 ? '0.5' : '1';
    nextBtn.style.opacity = position <= maxScroll ? '0.5' : '1';
  }

  prevBtn.addEventListener('click', () => {
    position = Math.min(position + slideWidth, 0);
    updateSliderPosition();
    checkButtonVisibility();
  });

  nextBtn.addEventListener('click', () => {
    const maxScroll = -(slider.scrollWidth - container.clientWidth);
    position = Math.max(position - slideWidth, maxScroll);
    updateSliderPosition();
    checkButtonVisibility();
  });

  // Initial check
  checkButtonVisibility();

  // Update on window resize
  window.addEventListener('resize', checkButtonVisibility);
}

function initializeGallery() {
  const filters = document.querySelectorAll('.gallery-filter');
  const items = document.querySelectorAll('.gallery-item');
  
  if (!filters.length || !items.length) return;

  filters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Update active filter
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      const category = this.dataset.filter;
      items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}