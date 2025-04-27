// Initialize the intro scene
function initIntroScene() {
    const introScene = document.getElementById('intro-scene');
    const skipIntro = document.getElementById('skip-intro');
    const mainContent = document.getElementById('main-content');
    
    // Check if user has already seen intro
    const hasSeenIntro = getFromStorage('hasSeenIntro') === 'false';
    
    // Skip intro if already seen
    if (hasSeenIntro) {
      completeIntro();
      return;
    }
    
    // Set up intro animation
    const sunriseBackground = document.getElementById('sunrise-bg');
    const mountainSilhouette = document.getElementById('mountain-silhouette');
    const sun = document.getElementById('sun');
    const birds = document.querySelectorAll('.bird');
    const introText = document.getElementById('intro-text');
    
    // Skip intro button
    skipIntro.addEventListener('click', completeIntro);
    
    // Start the animation sequence
    setTimeout(() => {
      // Sunrise background
      sunriseBackground.classList.add('active');
      
      setTimeout(() => {
        // Mountain silhouette
        mountainSilhouette.classList.add('active');
        
        setTimeout(() => {
          // Sun rises
          sun.classList.add('active');
          
          setTimeout(() => {
            // Birds appear
            birds.forEach((bird, index) => {
              setTimeout(() => {
                bird.classList.add('active');
                
                // Set up bird animation
                animateBird(bird, index);
              }, index * 500);
            });
            
            // Show intro text
            introText.classList.add('active');
            
            // Complete intro after delay
            setTimeout(completeIntro, 3000);
          }, 1000);
        }, 1500);
      }, 500);
    }, 1000);
    
    // Function to animate a bird
    function animateBird(birdElement, index) {
      let duration, startX, startY, endX, endY;
      
      switch(index) {
        case 0: // First bird
          duration = 15000;
          startX = -100;
          startY = 100;
          endX = 300;
          endY = 50;
          break;
        case 1: // Second bird
          duration = 20000;
          startX = -50;
          startY = 150;
          endX = 400;
          endY = 100;
          break;
        case 2: // Third bird
          duration = 18000;
          startX = 0;
          startY = 80;
          endX = 350;
          endY = 30;
          break;
      }
      
      // Position the bird
      birdElement.style.left = `${startX}px`;
      birdElement.style.top = `${startY}px`;
      
      // Animate the bird
      birdElement.animate(
        [
          { left: `${startX}px`, top: `${startY}px` },
          { left: `${endX}px`, top: `${endY}px` }
        ],
        {
          duration: duration,
          iterations: Infinity,
          easing: 'linear'
        }
      );
    }
    
    // Function to complete intro
    function completeIntro() {
      // Mark intro as seen
      saveToStorage('hasSeenIntro', 'true');
      
      // Hide intro scene
      introScene.classList.add('hidden');
      
      // Show main content
      mainContent.classList.add('active');
    }
  }
  
  // Local storage helper functions with fallbacks
  function saveToStorage(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      console.warn('SessionStorage is not accessible:', error);
    }
  }
  
  function getFromStorage(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      console.warn('SessionStorage is not accessible:', error);
      return null;
    }
  }