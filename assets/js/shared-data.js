// Shared user data for the application

const appData = {
   users: [
      {
         id: 'user-001',
         username: 'admin',
         email: 'admin@aquapure.com',
         password: 'admin',
         role: 'admin'
      },
      {
         id: 'user-002',
         username: 'user',
         email: 'user@aquapure.com',
         password: 'user',
         role: 'user'
      }
   ]
};

// Helper function to authenticate user
function authenticateUser(username, password) {
   const user = appData.users.find(u => u.username === username && u.password === password);
   return user || null;
}
