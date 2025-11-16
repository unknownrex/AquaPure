// Dummy user data
const dummyUsers = {
   user: {
      username: 'user',
      password: 'user',
      role: 'user',
      redirectUrl: './pages/user-dashboard.html'
   },
   admin: {
      username: 'admin',
      password: 'admin',
      role: 'admin',
      redirectUrl: './pages/admin-dashboard.html'
   }
};

// Form validation and login handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
   e.preventDefault();

   // Reset error messages
   const loginError = document.getElementById('loginError');
   loginError.classList.add('d-none');
   loginError.textContent = '';

   // Get input values
   const username = document.getElementById('username').value.trim();
   const password = document.getElementById('password').value;

   // Validate inputs
   if (!validateInputs(username, password)) {
      return;
   }

   // Authenticate user
   if (authenticateUser(username, password)) {
      // Get the redirect URL based on credentials
      const user = Object.values(dummyUsers).find(u => u.username === username);
      if (user) {
         // Redirect to appropriate dashboard
         window.location.href = user.redirectUrl;
      }
   } else {
      // Show error message
      loginError.textContent = 'Invalid username or password. Please try again.';
      loginError.classList.remove('d-none');
      
      // Clear password field
      document.getElementById('password').value = '';
   }
});

// Validation function
function validateInputs(username, password) {
   let isValid = true;

   // Username validation
   if (username === '') {
      showError('usernameError', 'Username is required');
      isValid = false;
   } else if (username.length < 3) {
      showError('usernameError', 'Username must be at least 3 characters');
      isValid = false;
   } else {
      clearError('usernameError');
   }

   // Password validation
   if (password === '') {
      showError('passwordError', 'Password is required');
      isValid = false;
   } else if (password.length < 3) {
      showError('passwordError', 'Password must be at least 3 characters');
      isValid = false;
   } else {
      clearError('passwordError');
   }

   return isValid;
}

// Helper function to show error
function showError(errorId, message) {
   const errorElement = document.getElementById(errorId);
   errorElement.textContent = message;
   errorElement.style.display = 'block';
   
   // Add is-invalid class to the corresponding input
   const inputId = errorId.replace('Error', '');
   const inputElement = document.getElementById(inputId);
   if (inputElement) {
      inputElement.classList.add('is-invalid');
   }
}

// Helper function to clear error
function clearError(errorId) {
   const errorElement = document.getElementById(errorId);
   errorElement.textContent = '';
   errorElement.style.display = 'none';
   
   // Remove is-invalid class from the corresponding input
   const inputId = errorId.replace('Error', '');
   const inputElement = document.getElementById(inputId);
   if (inputElement) {
      inputElement.classList.remove('is-invalid');
   }
}

// Authentication function
function authenticateUser(username, password) {
   // Check if user exists and credentials match
   for (const key in dummyUsers) {
      const user = dummyUsers[key];
      if (user.username === username && user.password === password) {
         // Store user info in session storage
         sessionStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            role: user.role
         }));
         return true;
      }
   }
   return false;
}

// Clear error messages on input focus
document.getElementById('username').addEventListener('focus', function() {
   clearError('usernameError');
   document.getElementById('loginError').classList.add('d-none');
});

document.getElementById('password').addEventListener('focus', function() {
   clearError('passwordError');
   document.getElementById('loginError').classList.add('d-none');
});

// Password visibility toggle
const togglePasswordButton = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const togglePasswordIcon = document.getElementById('togglePasswordIcon');

// Password visibility state
let isPasswordVisible = false;

togglePasswordButton.addEventListener('click', function() {
   // Toggle the state
   isPasswordVisible = !isPasswordVisible;
   
   if (isPasswordVisible === true) {
      // Show password
      passwordInput.type = 'text';
      togglePasswordIcon.classList.remove('bi-eye-fill');
      togglePasswordIcon.classList.add('bi-eye-slash-fill');
   } else if (isPasswordVisible === false) {
      // Hide password
      passwordInput.type = 'password';
      togglePasswordIcon.classList.remove('bi-eye-slash-fill');
      togglePasswordIcon.classList.add('bi-eye-fill');
   }
});
