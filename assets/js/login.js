// Form validation and login handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
   e.preventDefault();

   const loginError = document.getElementById('loginError');
   loginError.classList.add('d-none');
   loginError.textContent = '';

   const username = document.getElementById('username').value.trim();
   const password = document.getElementById('password').value;

   if (!validateInputs(username, password)) {
      return;
   }

   const user = authenticateUser(username, password);
   if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify({
         username: user.username,
         role: user.role
      }));
      
      const redirectUrl = user.role === 'admin' ? './pages/admin-dashboard.html' : './pages/user-dashboard.html';
      window.location.href = redirectUrl;
   } else {
      loginError.textContent = 'Invalid username or password. Please try again.';
      loginError.classList.remove('d-none');
      
      document.getElementById('password').value = '';
   }
});

// Validation function
function validateInputs(username, password) {
   let isValid = true;

   if (username === '') {
      showError('usernameError', 'Username is required');
      isValid = false;
   } else if (username.length < 3) {
      showError('usernameError', 'Username must be at least 3 characters');
      isValid = false;
   } else {
      clearError('usernameError');
   }

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
   
   const inputId = errorId.replace('Error', '');
   const inputElement = document.getElementById(inputId);
   if (inputElement) {
      inputElement.classList.remove('is-invalid');
   }
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

let isPasswordVisible = false;

togglePasswordButton.addEventListener('click', function() {
   isPasswordVisible = !isPasswordVisible;
   
   if (isPasswordVisible === true) {
      passwordInput.type = 'text';
      togglePasswordIcon.classList.remove('bi-eye-fill');
      togglePasswordIcon.classList.add('bi-eye-slash-fill');
   } else if (isPasswordVisible === false) {
      passwordInput.type = 'password';
      togglePasswordIcon.classList.remove('bi-eye-slash-fill');
      togglePasswordIcon.classList.add('bi-eye-fill');
   }
});
