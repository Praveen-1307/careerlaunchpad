// Local authentication utilities using localStorage
import { auth } from '../firebase';

// Validate email domain - allow any email
export const isValidDomain = (email) => {
  return true;
};

// Initialize user database if it doesn't exist
const initUserDB = () => {
  if (!localStorage.getItem('userDB')) {
    localStorage.setItem('userDB', JSON.stringify([
      // Default test user
      {
        email: 'user@example.com',
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
  // No domain check
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
  // No domain check
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
  try {
    // Try to get user from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    // Return the user if it exists
    if (user && user.email) {
      return user;
    }
    
    // If no valid user in localStorage, check if Firebase auth has a user
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      // Create a user object from Firebase user
      const userObj = {
        firstName: firebaseUser.displayName ? firebaseUser.displayName.split(' ')[0] : 'User',
        lastName: firebaseUser.displayName ? firebaseUser.displayName.split(' ').slice(1).join(' ') : '',
        email: firebaseUser.email,
        uid: firebaseUser.uid
      };
      
      // Store in localStorage for future use
      localStorage.setItem('currentUser', JSON.stringify(userObj));
      return userObj;
    }
    
    // No user found in localStorage or Firebase auth
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
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