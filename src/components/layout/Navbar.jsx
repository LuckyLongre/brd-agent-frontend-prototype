import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/index';

/**
 * Navigation bar component for the application
 * Shows logo, active links, and auth buttons
 */
export function Navbar() {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  // Style for active links
  const getLinkClass = (path) => {
    const baseClass = 'mx-4 font-medium transition-colors duration-200';
    if (isActive(path)) {
      return `${baseClass} text-primary border-b-2 border-primary`;
    }
    return `${baseClass} text-text-secondary hover:text-text-primary`;
  };

  return (
    <nav className="bg-surface border-b border-border shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">📋</span>
          <span className="text-text-primary">BRD Agent</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {!isAuthenticated && (
            <>
              <Link to="/">
                <span className={getLinkClass('/')}>Home</span>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <Link to="/user/dashboard">
              <span className={getLinkClass('/user/dashboard')}>Dashboard</span>
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/signin">
                <Button variant="secondary">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-text-primary">
                  {currentUser?.name}
                </span>
              </div>
              <Button onClick={logout} variant="secondary" className="text-sm">
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
