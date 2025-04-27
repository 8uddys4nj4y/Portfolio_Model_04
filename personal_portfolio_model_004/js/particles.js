/**
 * Creates animated particles within a container element
 * @param {string} containerId - The ID of the container element
 * @param {object} options - Configuration options for particles
 */
function createParticles(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Default options
    const config = {
      count: options.count || 50,
      color: options.color || 'rgba(255, 255, 255, 0.6)',
      minSize: options.minSize || 3,
      maxSize: options.maxSize || 8,
      speed: options.speed || 20
    };
    
    // Clear any existing particles
    const existingParticles = container.querySelectorAll('.particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create new particles
    for (let i = 0; i < config.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size
      const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random starting position
      const posX = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.bottom = `${-10 - Math.random() * 10}%`;
      
      // Random horizontal drift
      const translateX = (Math.random() - 0.5) * 200;
      particle.style.setProperty('--translateX', `${translateX}px`);
      
      // Random animation duration
      const duration = config.speed + Math.random() * 10;
      particle.style.setProperty('--duration', `${duration}s`);
      
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Apply color
      particle.style.backgroundColor = config.color;
      
      container.appendChild(particle);
    }
  }