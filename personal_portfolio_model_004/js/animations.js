/**
 * Animation related functionality for the portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation observers
    initAnimationObservers();
  });
  
  /**
   * Initialize Intersection Observers for animations
   */
  function initAnimationObservers() {
    // Create options for the observer
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1
    };
    
    // Create an observer for triggering animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observe elements with animation classes
    document.querySelectorAll('.animate').forEach(el => {
      observer.observe(el);
    });
  }
  
  /**
   * Create a typing animation effect
   * @param {HTMLElement} element - The element to animate
   * @param {string} text - The text to type
   * @param {number} speed - Typing speed in milliseconds
   * @param {number} delay - Initial delay before typing starts
   */
  function typeAnimation(element, text, speed = 100, delay = 0) {
    if (!element) return;
    
    let index = 0;
    element.textContent = '';
    
    setTimeout(() => {
      const timer = setInterval(() => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    }, delay);
  }
  
  /**
   * Create a count up animation
   * @param {HTMLElement} element - The element to animate
   * @param {number} target - The target number
   * @param {number} duration - Animation duration in milliseconds
   * @param {string} prefix - Text to add before the number
   * @param {string} suffix - Text to add after the number
   */
  function countUpAnimation(element, target, duration = 2000, prefix = '', suffix = '') {
    if (!element) return;
    
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(progress * (target - startValue) + startValue);
      
      element.textContent = `${prefix}${currentValue}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${prefix}${target}${suffix}`;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }