// Local authentication utilities using localStorage

// Validate email domain - only allow cit.edu.in emails
const isValidDomain = (email) => {
  return email.endsWith('@cit.edu.in');
};

// Initialize user database if it doesn't exist
const initUserDB = () => {
  if (!localStorage.getItem('userDB')) {
    localStorage.setItem('userDB', JSON.stringify([
      // Default test user
      {
        email: 'user@cit.edu.in',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
        createdAt: new Date().toISOString()
      }
    ]));
  }
};

// Get all users
export const getUsers = () => {
  initUserDB();
  return JSON.parse(localStorage.getItem('userDB'));
};

// Get active users
export const getActiveUsers = () => {
  return JSON.parse(localStorage.getItem('activeUsers') || '[]');
};

// Add user to active users list
const addActiveUser = (user) => {
  const activeUsers = getActiveUsers();
  if (!activeUsers.find(u => u.email === user.email)) {
    activeUsers.push({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`
    });
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
  }
};

// Remove user from active users list
const removeActiveUser = (email) => {
  const activeUsers = getActiveUsers();
  const updatedUsers = activeUsers.filter(user => user.email !== email);
  localStorage.setItem('activeUsers', JSON.stringify(updatedUsers));
};

// Register a new user
export const registerUser = (userData) => {
  const users = getUsers();
  
  // Check if email has valid domain
  if (!isValidDomain(userData.email)) {
    throw new Error('Only cit.edu.in email addresses are allowed');
  }
  
  // Check if email is already in use
  if (users.find(user => user.email === userData.email)) {
    throw new Error('Email already in use');
  }
  
  // Add user to DB
  const newUser = {
    ...userData,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('userDB', JSON.stringify(users));
  
  // Store current user (logged in)
  const { password, ...userWithoutPassword } = newUser;
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
  
  // Add to active users
  addActiveUser(userWithoutPassword);
  
  return userWithoutPassword;
};

// Login user
export const loginUser = (email, password) => {
  const users = getUsers();
  
  // Check if email has valid domain
  if (!isValidDomain(email)) {
    throw new Error('Only cit.edu.in email addresses are allowed');
  }
  
  // Find user
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Store current user (logged in)
  const { password: pwd, ...userWithoutPassword } = user;
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
  
  // Add to active users
  addActiveUser(userWithoutPassword);
  
  return userWithoutPassword;
};

// Logout user
export const logoutUser = () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    removeActiveUser(currentUser.email);
  }
  localStorage.removeItem('currentUser');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('currentUser') !== null;
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Clear all users and reset to initial state
export const resetUserDB = () => {
  localStorage.removeItem('userDB');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('activeUsers');
  initUserDB();
};

// Update user profile
export const updateUser = (updatedUser) => {
  const users = getUsers();
  const updatedUsers = users.map(user =>
    user.email === updatedUser.email ? { ...user, ...updatedUser } : user
  );
  localStorage.setItem('userDB', JSON.stringify(updatedUsers));
  // Store current user (without password)
  const { password, ...userWithoutPassword } = updatedUser;
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
};

// Initialize the user database
initUserDB(); 