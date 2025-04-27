/**
 * Utility functions for the portfolio website
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  /**
   * Throttle function to limit how often a function can be called
   * @param {Function} func - The function to throttle
   * @param {number} limit - The time limit in milliseconds
   * @returns {Function} - Throttled function
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  /**
   * Get viewport dimensions
   * @returns {Object} - Object containing width and height of viewport
   */
  function getViewport() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight
    };
  }
  
  /**
   * Check if an element is in viewport
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} - True if element is in viewport
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const viewport = getViewport();
    
    return (
      rect.top <= viewport.height &&
      rect.bottom >= 0 &&
      rect.left <= viewport.width &&
      rect.right >= 0
    );
  }
  
  /**
   * Get random number between min and max
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} - Random number between min and max
   */
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  /**
   * Format date to locale string
   * @param {Date|string} date - Date object or date string
   * @param {string} locale - Locale string (default: 'en-US')
   * @returns {string} - Formatted date string
   */
  function formatDate(date, locale = 'en-US') {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }