document.addEventListener('DOMContentLoaded', function() {
  // Periksa apakah AOS ada sebelum inisialisasi
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false
    });
  }

  // Preloader - gunakan pendekatan yang lebih kompatibel
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    // Gunakan readyState sebagai fallback jika event load sudah terjadi
    if (document.readyState === 'complete') {
      preloader.classList.add('preloader-hide');
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 500);
    } else {
      window.addEventListener('load', function() {
        preloader.classList.add('preloader-hide');
        setTimeout(function() {
          preloader.style.display = 'none';
        }, 500);
      });
    }
  }

  const hamburger = document.querySelector('.hamburger');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  // Fungsi untuk menutup menu
  const closeMenu = () => {
    navbarMenu.classList.remove('active');
    hamburger.classList.remove('active');
  };
  
  // Toggle menu saat hamburger diklik
  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation(); // Hindari trigger klik di luar
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
  
  // Klik di luar menu untuk menutupnya
  document.addEventListener('click', (event) => {
    if (!navbarMenu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  });
  
  // Tutup menu saat salah satu link diklik
  navbarMenu?.addEventListener('click', (event) => {
    if (event.target.classList.contains('navbar-link')) {
      closeMenu();
    }
  });
  


  // Smooth scrolling with better compatibility
  const anchors = document.querySelectorAll('a[href^="#"]');
  if (anchors.length > 0) {
    anchors.forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip empty anchors
        
        const target = document.querySelector(targetId);
        if (target) {
          // Fallback for browsers that don't support smooth scroll
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
          
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          } else {
            // Polyfill for browsers without smooth scroll
            window.scrollTo(0, offsetTop);
          }
        }
      });
    });
  }

  // Services Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabBtns.length > 0 && tabPanes.length > 0) {
    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        tabBtns.forEach(function(b) {
          b.classList.remove('active');
        });
        // Add active class to current button
        this.classList.add('active');
        
        // Hide all tab panes
        tabPanes.forEach(function(pane) {
          pane.classList.remove('active');
        });
        
        // Show the selected tab pane
        const tabId = this.getAttribute('data-tab');
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
          targetTab.classList.add('active');
        }
      });
    });
  }

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval = null;
  
  if (testimonialSlides.length > 0) {
    function showSlide(n) {
      // Reset active slides and dots
      testimonialSlides.forEach(function(slide) {
        slide.classList.remove('active');
      });
      
      if (dots.length > 0) {
        dots.forEach(function(dot) {
          dot.classList.remove('active');
        });
      }
      
      // Handle wrapping of slides
      if (n >= testimonialSlides.length) {
        currentSlide = 0;
      } else if (n < 0) {
        currentSlide = testimonialSlides.length - 1;
      } else {
        currentSlide = n;
      }
      
      // Set active slide and dot
      testimonialSlides[currentSlide].classList.add('active');
      if (dots.length > 0 && currentSlide < dots.length) {
        dots[currentSlide].classList.add('active');
      }
    }
    
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
      showSlide(currentSlide - 1);
    }
    
    // Event listeners for testimonial navigation
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);
    }
    
    // Dot navigation
    if (dots.length > 0) {
      dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
          showSlide(index);
        });
      });
    }
    
    // Auto-advance testimonials every 5 seconds
    // Clear any previous intervals to avoid multiple animations
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    
    // Only start interval if there's more than one slide
    if (testimonialSlides.length > 1) {
      slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Initialize first slide
    showSlide(0);
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(function(header) {
      header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        const content = this.nextElementSibling;
        
        if (!accordionItem || !content) return;
        
        // Toggle active class
        accordionItem.classList.toggle('active');
        
        // Get icon (work with both FontAwesome and custom icons)
        const icon = this.querySelector('i, .icon');
        
        if (accordionItem.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
          if (icon) {
            // Handle different icon libraries
            if (icon.classList.contains('fa-plus')) {
              icon.classList.replace('fa-plus', 'fa-minus');
            } else {
              icon.classList.add('active');
            }
          }
        } else {
          content.style.maxHeight = '0';
          if (icon) {
            if (icon.classList.contains('fa-minus')) {
              icon.classList.replace('fa-minus', 'fa-plus');
            } else {
              icon.classList.remove('active');
            }
          }
        }
      });
    });
  }

  // Background music toggle with compatibility improvements
  const toggleMusicBtn = document.getElementById('toggle-music');
  const backgroundMusic = document.getElementById('background-music');
  let isMusicPlaying = false;
  
  if (toggleMusicBtn && backgroundMusic) {
    // Check if browser supports audio API
    const canPlayAudio = typeof Audio !== 'undefined';
    
    toggleMusicBtn.addEventListener('click', function() {
      if (!canPlayAudio) {
        alert('Maaf, browser Anda tidak mendukung pemutaran audio.');
        return;
      }
      
      if (isMusicPlaying) {
        backgroundMusic.pause();
        toggleMusicBtn.textContent = '🔇';
      } else {
        // Use promise with catch for better compatibility
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
          playPromise.then(function() {
            toggleMusicBtn.textContent = '🔊';
          }).catch(function(e) {
            // Auto-play was prevented
            alert('Autoplay diblokir oleh browser. Silakan klik tombol lagi untuk memutar musik.');
            console.log('Auto-play was prevented:', e);
          });
        } else {
          // Older browsers might not return a promise
          toggleMusicBtn.textContent = '🔊';
        }
      }
      isMusicPlaying = !isMusicPlaying;
    });
  }

  // Particle Animation for Hero Section with feature detection
  const heroParticles = document.querySelector('.hero-particles');
  
  if (heroParticles) {
    // Check if browser supports advanced animations
    const supportsAnimation = 'animation' in document.documentElement.style;
    
    if (supportsAnimation) {
      // Reduce particle count for mobile devices
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 20 : 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size (smaller on mobile)
        const size = isMobile ? 
          (Math.random() * 3 + 1) : 
          (Math.random() * 5 + 2);
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 10 + 5;
        particle.style.animationDuration = duration + 's';
        
        // Random animation delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        
        heroParticles.appendChild(particle);
      }
    }
  }

  // Counter Animation (for statistics) with Intersection Observer polyfill
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the faster
  
  if (counters.length > 0) {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const startCounting = function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = counter.innerText;
            let count = 0;
            
            // Check if target contains a plus sign (like 100+)
            const hasPlus = target.includes('+');
            const numTarget = parseInt(target.replace('+', ''));
            
            if (isNaN(numTarget)) return; // Skip if not a number
            
            const updateCount = function() {
              const increment = numTarget / speed;
              
              if (count < numTarget) {
                count += increment;
                counter.innerText = Math.ceil(count) + (hasPlus ? '+' : '');
                setTimeout(updateCount, 1);
              } else {
                counter.innerText = target;
              }
            };
            
            updateCount();
            observer.unobserve(counter);
          }
        });
      };
      
      // Create intersection observer for counters
      const counterObserver = new IntersectionObserver(startCounting, {
        threshold: 0.4
      });
      
      // Observe all counter elements
      counters.forEach(function(counter) {
        counterObserver.observe(counter);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
      
      // Simple animation for all counters when they come into view
      function handleCounterScroll() {
        counters.forEach(function(counter) {
          if (isElementInViewport(counter) && !counter.dataset.counted) {
            counter.dataset.counted = true;
            
            const target = counter.innerText;
            let count = 0;
            
            // Check if target contains a plus sign (like 100+)
            const hasPlus = target.includes('+');
            const numTarget = parseInt(target.replace('+', ''));
            
            if (isNaN(numTarget)) return; // Skip if not a number
            
            const updateCount = function() {
              const increment = numTarget / speed;
              
              if (count < numTarget) {
                count += increment;
                counter.innerText = Math.ceil(count) + (hasPlus ? '+' : '');
                setTimeout(updateCount, 1);
              } else {
                counter.innerText = target;
              }
            };
            
            updateCount();
          }
        });
      }
      
      // Check counters on scroll
      window.addEventListener('scroll', handleCounterScroll);
      // Check once at load
      setTimeout(handleCounterScroll, 500);
    }
  }

  // Add floating animation to tech icons in about section
  const floatingIcons = document.querySelectorAll('.floating-icons i');
  
  if (floatingIcons.length > 0) {
    // Check if browser supports CSS animations
    const supportsAnimation = 'animation' in document.documentElement.style;
    
    if (supportsAnimation) {
      floatingIcons.forEach(function(icon, index) {
        // Set random animation properties
        const animDuration = 2 + Math.random() * 3;
        const animDelay = Math.random() * 2;
        
        icon.style.animationDuration = animDuration + 's';
        icon.style.animationDelay = animDelay + 's';
      });
    }
  }
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
});
