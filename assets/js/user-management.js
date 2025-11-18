// Function to render user table
function displayUserList(roleFilter = 'all', search = '') {
   const tbody = document.getElementById('userTableBody');
   tbody.innerHTML = '';
   
   let filteredUsers = roleFilter === 'all' 
      ? appData.users 
      : appData.users.filter(u => u.role === roleFilter);
   
   if (search.trim()) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(u => 
         u.username.toLowerCase().includes(searchLower) || 
         u.email.toLowerCase().includes(searchLower)
      );
   }
   
   filteredUsers.forEach(user => {
      const row = document.createElement('tr');
      
      const isAdmin = user.role === 'admin';
      const roleBg = isAdmin ? 'var(--color-bg-primary-transparent)' : 'var(--color-bg-secondary)';
      const roleColor = isAdmin ? 'var(--color-primary)' : 'var(--color-secondary-text)';
      const roleIcon = isAdmin ? 'bi-shield-fill-check' : 'bi-person-fill';
      const roleText = isAdmin ? 'Admin' : 'User';
      
      row.innerHTML = `
         <td style="color: var(--color-text); font-weight: 500;">${user.username}</td>
         <td style="color: var(--color-secondary-text);">${user.email}</td>
         <td>
            <span class="badge" style="background-color: ${roleBg}; color: ${roleColor}; font-weight: 500; padding: 0.375rem 0.75rem;">
               <i class="bi ${roleIcon} me-1"></i>
               ${roleText}
            </span>
         </td>
         <td class="text-end">
            <button class="btn btn-sm me-1" type="button" onclick="editUser('${user.id}')" style="background-color: transparent; color: var(--color-primary); border: 1px solid var(--color-primary);">
               <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm" type="button" onclick="deleteUser('${user.id}')" style="background-color: transparent; color: var(--color-danger); border: 1px solid var(--color-danger);">
               <i class="bi bi-trash"></i>
            </button>
         </td>
      `;
      
      tbody.appendChild(row);
   });
   
   if (filteredUsers.length === 0) {
      const row = document.createElement('tr');
      const message = search.trim() ? 'No users found matching your search' : 'No users found';
      row.innerHTML = `
         <td colspan="4" class="text-center" style="color: var(--color-muted); padding: 2rem;">
            <i class="bi bi-inbox" style="font-size: 2rem; display: block; margin-bottom: 0.5rem;"></i>
            ${message}
         </td>
      `;
      tbody.appendChild(row);
   }
}

// Current filter state
let currentRoleFilter = 'all';
let currentSearch = '';

// set role filter
function setRoleFilter(role) {
   currentRoleFilter = role;
   
   document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.style.backgroundColor = 'transparent';
      btn.style.color = 'var(--color-primary)';
   });
   
   const activeBtn = document.getElementById('filter' + role.charAt(0).toUpperCase() + role.slice(1));
   if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.style.backgroundColor = 'var(--color-primary)';
      activeBtn.style.color = 'white';
   }
   
   displayUserList(role, currentSearch);
}

// Function to handle user search
function searchUsers(query) {
   currentSearch = query;
   displayUserList(currentRoleFilter, query);
}

// add user
function addUser() {
   document.getElementById('userForm').reset();
   document.getElementById('userId').value = '';
   document.getElementById('userModalLabel').textContent = 'Add New User';
   document.getElementById('passwordHelp').style.display = 'none';
   document.getElementById('userPassword').required = true;
   
   const modal = new bootstrap.Modal(document.getElementById('userModal'));
   modal.show();
}

// edit user
function editUser(userId) {
   const user = appData.users.find(u => u.id === userId);
   if (!user) return;
   
   document.getElementById('userId').value = user.id;
   document.getElementById('userUsername').value = user.username;
   document.getElementById('userEmail').value = user.email;
   document.getElementById('userPassword').value = '';
   document.getElementById('userRole').value = user.role;
   
   document.getElementById('userModalLabel').textContent = 'Edit User';
   document.getElementById('passwordHelp').style.display = 'block';
   document.getElementById('userPassword').required = false;
   
   const modal = new bootstrap.Modal(document.getElementById('userModal'));
   modal.show();
}

// save user
function saveUser() {
   const userId = document.getElementById('userId').value;
   const username = document.getElementById('userUsername').value;
   const email = document.getElementById('userEmail').value;
   const password = document.getElementById('userPassword').value;
   const role = document.getElementById('userRole').value;
   
   if (!username || !email || !role) {
      alert('Please fill in all required fields');
      return;
   }
   
   if (userId) {
      const userIndex = appData.users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
         appData.users[userIndex] = {
            ...appData.users[userIndex],
            username,
            email,
            role
         };
         
         if (password) {
            appData.users[userIndex].password = password;
         }
      }
   } else {
      if (!password) {
         alert('Password is required for new users');
         return;
      }
      
      const newUser = {
         id: 'user-' + String(appData.users.length + 1).padStart(3, '0'),
         username,
         email,
         password,
         role
      };
      
      appData.users.push(newUser);
   }
   
   const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
   modal.hide();
   
   displayUserList(currentRoleFilter, currentSearch);
}

// delete user
function deleteUser(userId) {
   const user = appData.users.find(u => u.id === userId);
   if (!user) return;
   
   const confirmed = confirm(`Are you sure you want to delete user "${user.username}"?`);
   if (confirmed) {
      const index = appData.users.findIndex(u => u.id === userId);
      if (index !== -1) {
         appData.users.splice(index, 1);
         
         displayUserList(currentRoleFilter, currentSearch);
      }
   }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
   displayUserList();
   
   const userSearch = document.getElementById('userSearch');
   if (userSearch) {
      userSearch.addEventListener('input', function(e) {
         searchUsers(e.target.value);
      });
   }
});
