$(function(){ 
   $("#navbar").load("../partials/_navbar.html"); 
});
$(function(){ 
   $("#sidebar").load("../partials/_sidebar.html", function() {
      initScrollTracker();
      handleHashNavigation();
   }); 
});

// Handle hash navigation on page load
function handleHashNavigation() {
   const hash = window.location.hash;
   if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
         setTimeout(function() {
            targetSection.scrollIntoView({ 
               behavior: 'smooth',
               block: 'start'
            });
            
            if (typeof setActiveNavLink === 'function') {
               setActiveNavLink();
            }
         }, 300);
      }
   } else {
      if (typeof setActiveNavLink === 'function') {
         setActiveNavLink();
      }
   }
}

// Scroll Tracker Functionality
function initScrollTracker() {
   const sections = document.querySelectorAll('h1[id]');
   const navLinks = document.querySelectorAll('.sidebar .nav-link');
   const mainContent = document.querySelector('.main-content');
   
   let isScrolling = false;
   let scrollTimeout;
   
   navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
         const href = this.getAttribute('href');
         
         if (href && href.includes('#')) {
            const hashPart = href.split('#')[1];
            const currentPage = window.location.pathname.split('/').pop();
            const linkPage = href.split('#')[0] || currentPage;
            
            if (!linkPage || linkPage === currentPage || linkPage === '') {
               e.preventDefault();
               const targetSection = document.getElementById(hashPart);
               
               if (targetSection) {
                  isScrolling = true;
                  
                  navLinks.forEach(l => l.classList.remove('active'));
                  this.classList.add('active');
                  
                  targetSection.scrollIntoView({ 
                     behavior: 'smooth',
                     block: 'start'
                  });
                  
                  setTimeout(function() {
                     isScrolling = false;
                  }, 1000);
               }
            }
         }
      });
   });
   
   if (mainContent && sections.length > 0) {
      mainContent.addEventListener('scroll', function() {
         if (isScrolling) {
            return;
         }
         
         clearTimeout(scrollTimeout);
         
         scrollTimeout = setTimeout(function() {
            let current = '';
            const scrollPos = mainContent.scrollTop;
            const containerHeight = mainContent.clientHeight;
            const scrollHeight = mainContent.scrollHeight;
            
            if (scrollPos + containerHeight >= scrollHeight - 50) {
               if (sections.length > 0) {
                  current = sections[sections.length - 1].getAttribute('id');
               }
            } else {
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
               if (href && href.includes('#' + current)) {
                  link.classList.add('active');
               }
            });
            
            if (current && window.location.hash !== '#' + current) {
               history.replaceState(null, null, '#' + current);
            }
         }, 100);
      });
   }
}