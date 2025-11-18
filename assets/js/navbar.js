// Navbar Manager - handles dynamic navbar based on user role

function initNavbar() {
   const currentUserJson = sessionStorage.getItem('currentUser');
   
   if (!currentUserJson) {
      window.location.href = '../index.html';
      return;
   }
   
   const currentUser = JSON.parse(currentUserJson);
   
   const locationDropdown = document.getElementById('locationDropdown');
   const deviceDropdown = document.getElementById('deviceDropdown');
   
   if (currentUser.role === 'admin') {
      if (locationDropdown) {
         locationDropdown.parentElement.style.display = 'none';
      }
      if (deviceDropdown) {
         deviceDropdown.parentElement.style.display = 'none';
      }
   } else if (currentUser.role === 'user') {
      if (locationDropdown) {
         locationDropdown.parentElement.style.display = 'block';
      }
      
      if (deviceDropdown) {
         deviceDropdown.parentElement.style.display = 'block';
      }
      
      if (typeof adminData !== 'undefined' && adminData.devices) {
         loadLocationOptions();
         loadDeviceOptions();
         
         if (currentUser.location) {
            const locationText = locationDropdown.querySelector('span');
            if (locationText) {
               locationText.textContent = currentUser.location;
            }
         }
         
         if (currentUser.device) {
            const deviceText = deviceDropdown.querySelector('span');
            if (deviceText) {
               deviceText.textContent = currentUser.device;
            }
         }
      }
   }
}

// Populate location dropdown with unique locations from adminData
function loadLocationOptions() {
   const locationMenu = document.getElementById('locationDropdownMenu');
   const locationDropdown = document.getElementById('locationDropdown');
   
   if (!locationMenu || !locationDropdown || typeof adminData === 'undefined') {
      return;
   }
   
   const currentLocation = locationDropdown.querySelector('span')?.textContent;
   const locations = [...new Set(adminData.devices.map(device => device.location))];
   
   locationMenu.innerHTML = '';
   
   locations.forEach(location => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'dropdown-item';
      a.href = '#';
      
      const isSelected = location === currentLocation;
      a.innerHTML = `<div class="d-flex justify-content-between align-items-center">
         <span>${location}</span>
         ${isSelected ? '<i class="bi bi-check-lg text-primary"></i>' : ''}
      </div>`;
      
      a.onclick = function(e) {
         e.preventDefault();
         const locationText = locationDropdown.querySelector('span');
         if (locationText) {
            locationText.textContent = location;
         }
         loadLocationOptions();
      };
      li.appendChild(a);
      locationMenu.appendChild(li);
   });
}

// Populate device dropdown with devices from adminData
function loadDeviceOptions() {
   const deviceMenu = document.getElementById('deviceDropdownMenu');
   const deviceDropdown = document.getElementById('deviceDropdown');
   
   if (!deviceMenu || !deviceDropdown || typeof adminData === 'undefined') {
      return;
   }
   
   const currentDevice = deviceDropdown.querySelector('span')?.textContent;
   
   deviceMenu.innerHTML = '';
   
   adminData.devices.forEach(device => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'dropdown-item';
      a.href = '#';
      
      const isSelected = device.id === currentDevice;
      a.innerHTML = `<div class="d-flex justify-content-between align-items-center">
         <span>${device.id}</span>
         ${isSelected ? '<i class="bi bi-check-lg text-primary"></i>' : ''}
      </div>`;
      
      a.onclick = function(e) {
         e.preventDefault();
         const deviceText = deviceDropdown.querySelector('span');
         if (deviceText) {
            deviceText.textContent = device.id;
         }
         loadDeviceOptions();
      };
      li.appendChild(a);
      deviceMenu.appendChild(li);
   });
}

// Sidebar Manager - handles dynamic sidebar based on user role
function initSidebar() {
   const currentUserJson = sessionStorage.getItem('currentUser');
   
   if (!currentUserJson) {
      return;
   }
   
   const currentUser = JSON.parse(currentUserJson);
   const currentPage = window.location.pathname.split('/').pop();
   
   const adminPages = ['admin-dashboard.html', 'user-management.html', 'notification-settings.html', 'reports.html', 'manage-devices.html'];
   const userPages = ['user-dashboard.html'];
   
   if (currentUser.role === 'admin' && userPages.includes(currentPage)) {
      window.location.href = 'admin-dashboard.html';
      return;
   } else if (currentUser.role === 'user' && adminPages.includes(currentPage)) {
      window.location.href = 'user-dashboard.html';
      return;
   }
   
   const userNavItems = document.querySelectorAll('.user-nav');
   const adminNavItems = document.querySelectorAll('.admin-nav');
   
   if (currentUser.role === 'admin') {
      userNavItems.forEach(item => {
         item.style.display = 'none';
      });
      adminNavItems.forEach(item => {
         item.style.display = 'block';
      });
   } else if (currentUser.role === 'user') {
      userNavItems.forEach(item => {
         item.style.display = 'block';
      });
      adminNavItems.forEach(item => {
         item.style.display = 'none';
      });
   }
   
   setActiveNavLink();
}

// Set active navigation link based on current page
function setActiveNavLink() {
   const currentPage = window.location.pathname.split('/').pop();
   const currentHash = window.location.hash;
   const navLinks = document.querySelectorAll('.sidebar .nav-link');
   
   navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href) {
         if (href.includes('#')) {
            const linkPage = href.split('#')[0] || currentPage;
            const linkHash = '#' + href.split('#')[1];
            
            if ((linkPage === currentPage || linkPage === '') && linkHash === currentHash) {
               link.classList.add('active');
            }
            else if (!currentHash && linkHash === '#water-status' && (linkPage === currentPage || linkPage === '')) {
               link.classList.add('active');
            }
         }
         else if (href === currentPage || href.includes(currentPage)) {
            link.classList.add('active');
         }
      }
   });
}

// Initialize navbar and sidebar when DOM is ready
$(document).ready(function() {
   const checkInterval = setInterval(function() {
      const navbar = document.querySelector('#navbar .ap-topbar');
      const sidebar = document.querySelector('#sidebar .sidebar');
      
      if (navbar && sidebar) {
         clearInterval(checkInterval);
         initNavbar();
         initSidebar();
      }
   }, 10);
   
   setTimeout(function() {
      clearInterval(checkInterval);
      initNavbar();
      initSidebar();
   }, 200);
});
