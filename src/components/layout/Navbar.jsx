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

  // Style for active links - Responsive spacing
  const getLinkClass = (path) => {
    const baseClass = 'px-2 sm:px-3 md:px-4 mx-1 sm:mx-2 font-medium transition-colors duration-200 text-xs sm:text-sm md:text-base';
    if (isActive(path)) {
      return `${baseClass} text-primary border-b-2 border-primary`;
    }
    return `${baseClass} text-text-secondary hover:text-text-primary`;
  };

  return (
    <nav className="bg-surface border-b border-border shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo - Responsive text sizing */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl flex-shrink-0">
          <span className="text-xl sm:text-2xl">📋</span>
          <span className="text-text-primary hidden sm:inline">BRD Agent</span>
        </Link>

        {/* Navigation Links - Hidden on mobile, visible on sm+ */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-4 md:gap-6">
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

        {/* Auth Buttons - Responsive spacing */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/signin" className="hidden sm:block">
                <Button variant="secondary" className="text-xs sm:text-sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2">Sign Up</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xs sm:text-sm font-medium text-text-primary">
                  {currentUser?.name}
                </span>
              </div>
              <Button onClick={logout} variant="secondary" className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2">
                <span className="sm:hidden">Exit</span>
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
