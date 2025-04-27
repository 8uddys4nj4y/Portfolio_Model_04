// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize intro scene if not seen before
    initIntroScene();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize the particles backgrounds
    initParticles();
    
    // Initialize mouse parallax effects
    initParallaxEffects();
    
    // Initialize intersection observers for animations
    initIntersectionObservers();
    
    // Initialize the contact form
    initContactForm();
    
    // Set copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
  });
  
  // Initialize the header scroll effect
  function initHeaderScroll() {
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Initialize mobile menu
  function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuButton && mobileMenuClose && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.add('active');
      });
      
      mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
      
      // Close menu when clicking a link
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
        });
      });
    }
  }
  
  // Initialize particles
  function initParticles() {
    // Hero section particles
    createParticles('particle-container', {
      count: 30,
      color: 'rgba(255, 255, 255, 0.6)'
    });
    
    // Skills section particles
    createParticles('skills-particles', {
      count: 25,
      color: 'rgba(143, 184, 140, 0.4)'
    });
    
    // Contact section particles
    createParticles('contact-particles', {
      count: 20,
      color: 'rgba(174, 197, 235, 0.4)'
    });
  }
  
  // Initialize mouse parallax effects
  function initParallaxEffects() {
    const mountainBg1 = document.querySelector('.mountain-bg-1');
    const mountainBg2 = document.querySelector('.mountain-bg-2');
    const profilePhoto = document.querySelector('.profile-photo');
    
    document.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      if (mountainBg1) {
        mountainBg1.style.transform = `translateY(${mouseY * -15}px) translateX(${mouseX * -15}px)`;
      }
      
      if (mountainBg2) {
        mountainBg2.style.transform = `translateY(${mouseY * -30}px) translateX(${mouseX * -30}px)`;
      }
      
      if (profilePhoto) {
        profilePhoto.style.transform = `rotateY(${mouseX * 10}deg) rotateX(${mouseY * -10}deg)`;
      }
    });
  }
  
  // Initialize intersection observers for animations
  function initIntersectionObservers() {
    // Options for the observer
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    // Create observer for headings and content blocks
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, options);
    
    // Observe section headings
    document.querySelectorAll('.skills-heading, .service-heading, .certificate-heading, .project-heading, .contact-heading').forEach(heading => {
      observer.observe(heading);
    });
    
    // Observe skill icons
    document.querySelectorAll('.skill-icon-wrapper').forEach(skill => {
      observer.observe(skill);
    });
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
      observer.observe(card);
    });
    
    // Observe certificate cards
    document.querySelectorAll('.certificate-card').forEach(card => {
      observer.observe(card);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
    });
    
    // Observe contact form
    document.querySelectorAll('.contact-form-container').forEach(form => {
      observer.observe(form);
    });
    
    // Observe footer elements
    document.querySelectorAll('.footer-brand, .footer-nav, .footer-social').forEach(element => {
      observer.observe(element);
    });
  }
  
  // Initialize the contact form
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submit-button');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
          return;
        }
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<div class="spinner"></div>Sending...';
        
        // Simulate form submission
        setTimeout(() => {
          // Reset form
          contactForm.reset();
          
          // Show success toast
          showToast('Message sent!', 'Thanks for reaching out. I\'ll get back to you soon.', 'success');
          
          // Reset button
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }, 1500);
      });
    }
    
    // Form validation
    function validateForm() {
      let isValid = true;
      
      // Validate name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
      } else {
        hideError(nameInput);
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        hideError(emailInput);
      }
      
      // Validate message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      } else {
        hideError(messageInput);
      }
      
      return isValid;
    }
    
    function showError(input, message) {
      const errorElement = input.nextElementSibling;
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
      input.classList.add('error');
    }
    
    function hideError(input) {
      const errorElement = input.nextElementSibling;
      errorElement.classList.add('hidden');
      input.classList.remove('error');
    }
  }
  
  // Show toast notification
  function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    `;
    
    const toastContainer = document.getElementById('toast-container');
    toastContainer.appendChild(toast);
    
    // Show the toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 5000);
  }