$(function(){ $("#navbar").load("../partials/_navbar.html"); });
$(function(){ 
   $("#sidebar").load("../partials/_sidebar.html", function() {
      initScrollSpy();
   }); 
});

// Scroll Spy Functionality
function initScrollSpy() {
   const sections = document.querySelectorAll('h1[id]');
   const navLinks = document.querySelectorAll('.sidebar .nav-link');
   const mainContent = document.querySelector('.main-content');
   
   let isScrolling = false;
   let scrollTimeout;
   
   // Smooth scroll on click
   navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
         const href = this.getAttribute('href');
         if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
               // Set flag to prevent scroll spy during smooth scroll
               isScrolling = true;
               
               // Remove active class from all links
               navLinks.forEach(l => l.classList.remove('active'));
               // Add active class to clicked link immediately
               this.classList.add('active');
               
               // Smooth scroll to section
               targetSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
               });
               
               // Re-enable scroll spy after smooth scroll completes
               setTimeout(function() {
                  isScrolling = false;
               }, 1000);
            }
         }
      });
   });
   
   // Update active state on scroll
   if (mainContent) {
      mainContent.addEventListener('scroll', function() {
         // Skip scroll spy if currently smooth scrolling
         if (isScrolling) {
            return;
         }
         
         // Clear existing timeout
         clearTimeout(scrollTimeout);
         
         // Debounce scroll event
         scrollTimeout = setTimeout(function() {
            let current = '';
            const scrollPos = mainContent.scrollTop;
            const containerHeight = mainContent.clientHeight;
            const scrollHeight = mainContent.scrollHeight;
            
            // Check if scrolled to bottom
            if (scrollPos + containerHeight >= scrollHeight - 50) {
               // Get the last section
               if (sections.length > 0) {
                  current = sections[sections.length - 1].getAttribute('id');
               }
            } else {
               // Normal scroll detection
               sections.forEach(section => {
                  const sectionTop = section.offsetTop;
                  
                  if (scrollPos >= sectionTop - 150) {
                     current = section.getAttribute('id');
                  }
               });
            }
            
            navLinks.forEach(link => {
               link.classList.remove('active');
               const href = link.getAttribute('href');
               if (href === '#' + current) {
                  link.classList.add('active');
               }
            });
         }, 100);
      });
   }
}