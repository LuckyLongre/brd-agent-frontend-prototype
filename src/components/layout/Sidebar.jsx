import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/index';
import { platforms } from '../../data/dummyData';

/**
 * Collapsible sidebar component
 * Responsive - works on mobile and desktop
 * Shows user profile and platform connections
 */
export function Sidebar() {
  const { currentUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-surface border-r border-border transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-60 sm:w-64'
      } min-h-screen h-screen sticky top-0 overflow-y-auto`}
    >
      {/* Collapse Button */}
      <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-10">
        {!isCollapsed && (
          <h3 className="font-semibold text-text-primary text-sm">Sidebar</h3>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-border">
        {!isCollapsed ? (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm text-text-primary truncate">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-text-secondary truncate">{currentUser?.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </div>

      {/* Platforms Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        {!isCollapsed && (
          <h3 className="font-semibold text-sm text-text-primary mb-4">
            Connected Platforms
          </h3>
        )}
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className={`p-3 rounded-lg border transition-colors ${
                platform.connected
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-border'
              }`}
              title={isCollapsed ? platform.name : ''}
            >
              {!isCollapsed ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg flex-shrink-0">{platform.icon}</span>
                    <span className="text-sm font-medium text-text-primary truncate">
                      {platform.name}
                    </span>
                  </div>
                  {platform.connected ? (
                    <span className="text-xs bg-success text-white px-2 py-1 rounded-full flex-shrink-0">
                      ✓
                    </span>
                  ) : (
                    <button
                      className="text-xs bg-gray-200 text-text-secondary px-2 py-1 rounded hover:bg-gray-300 transition-colors flex-shrink-0"
                      onClick={() => alert(`Connect ${platform.name}`)}
                    >
                      +
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex justify-center text-lg">{platform.icon}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
