/**
 * Handles sidebar behavior:
 * - On small screens: Uses drawer behavior (already implemented via FlyonUI)
 * - On larger screens: Toggles between collapsed (icons only) and expanded (icons with text) states
 */
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('multilevel-with-separator');
    const toggleButton = document.querySelector('[aria-controls="multilevel-with-separator"]');
    
    // Define collapsed and expanded classes
    const COLLAPSED_CLASS = 'max-w-16'; // Width for icon-only sidebar
    const EXPANDED_CLASS = 'max-w-64'; // Width for icon + text sidebar
    
    // Track sidebar state for larger screens
    let isExpanded = true;
    
    // Add aria-sidebar attribute for tracking this as a sidebar
    sidebar.setAttribute('aria-sidebar', 'true');
    
    // Function to handle sidebar toggle on larger screens
    function toggleSidebar() {
      // Only toggle width if we're on larger screens (SM and up)
      if (window.innerWidth >= 640) { // 640px is Tailwind's SM breakpoint
        isExpanded = !isExpanded;
        
        if (isExpanded) {
          sidebar.classList.remove(COLLAPSED_CLASS);
          sidebar.classList.add(EXPANDED_CLASS);
          
          // Make text visible again
          const menuItems = sidebar.querySelectorAll('.menu a');
          menuItems.forEach(item => {
            item.classList.remove('justify-center');
            const iconElement = item.querySelector('[class*="icon-"]');
            if (iconElement && iconElement.nextSibling) {
              iconElement.nextSibling.classList.remove('hidden');
            }
            const chevron = item.querySelector('.icon-\\[tabler--chevron-down\\]');
            if (chevron) chevron.classList.remove('hidden');
          });
        } else {
          sidebar.classList.remove(EXPANDED_CLASS);
          sidebar.classList.add(COLLAPSED_CLASS);
          
          // Hide text and center icons
          const menuItems = sidebar.querySelectorAll('.menu a');
          menuItems.forEach(item => {
            item.classList.add('justify-center');
            const iconElement = item.querySelector('[class*="icon-"]');
            if (iconElement && iconElement.nextSibling) {
              iconElement.nextSibling.classList.add('hidden');
            }
            const chevron = item.querySelector('.icon-\\[tabler--chevron-down\\]');
            if (chevron) chevron.classList.add('hidden');
          });
        }
      }
    }
    
    // Handle toggle button click
    toggleButton.addEventListener('click', function(e) {
      if (window.innerWidth >= 640) {
        // For larger screens, prevent default drawer behavior
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
      }
      // For smaller screens, let the default drawer behavior take over
    });
    
    // Handle window resize to adjust behavior when crossing breakpoints
    let lastScreenSize = window.innerWidth >= 640;
    
    window.addEventListener('resize', function() {
      const isLargeScreen = window.innerWidth >= 640;
      
      // If we crossed the breakpoint threshold
      if (lastScreenSize !== isLargeScreen) {
        lastScreenSize = isLargeScreen;
        
        if (isLargeScreen) {
          // Reset to initial desktop state when going from mobile to desktop
          if (!isExpanded) {
            toggleSidebar(); // Ensure we're in expanded state
          }
          
          // Remove drawer-specific classes if they exist
          if (sidebar.classList.contains('drawer-open')) {
            sidebar.classList.remove('drawer-open');
          }
          
          // Make sidebar visible on large screens
          sidebar.classList.remove('translate-x-0');
          sidebar.style.transform = '';
        }
      }
    });
    
    // Initialize proper state based on screen size on load
    if (window.innerWidth >= 640) {
      // Start in expanded mode on larger screens
      sidebar.classList.add(EXPANDED_CLASS);
      sidebar.style.transform = '';
    }
  });