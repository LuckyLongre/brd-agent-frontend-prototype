import React, { createContext, useState, useContext } from 'react';

// Create the Authentication Context
const AuthContext = createContext();

// AuthProvider component that wraps the app
export function AuthProvider({ children }) {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to store current user data
  const [currentUser, setCurrentUser] = useState(null);
  // State to show loading indicator during login
  const [isLoading, setIsLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState(null);

  // Dummy user credentials
  const DUMMY_USER = {
    email: 'test@example.com',
    password: '123456',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  };

  // Login function - validates against dummy user and simulates API call
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // Simulate API delay with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if credentials match dummy user
        if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
          setIsAuthenticated(true);
          setCurrentUser({
            id: '1',
            email: DUMMY_USER.email,
            name: DUMMY_USER.name,
            avatar: DUMMY_USER.avatar,
          });
          setIsLoading(false);
          resolve(true);
        } else {
          // Invalid credentials
          setError('Invalid email or password');
          setIsLoading(false);
          resolve(false);
        }
      }, 1500); // 1.5 second fake loading time
    });
  };

  // Logout function - clear authentication
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setError(null);
  };

  // Signup function (dummy implementation)
  const signup = async (email, password, name) => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, any signup is successful
        // In real app, would validate email, password strength, etc.
        setIsAuthenticated(true);
        setCurrentUser({
          id: '1',
          email,
          name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        });
        setIsLoading(false);
        resolve(true);
      }, 1500);
    });
  };

  // Provide auth state and functions to all child components
  const value = {
    isAuthenticated,
    currentUser,
    isLoading,
    error,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use Auth Context - makes it easy to access auth state
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
