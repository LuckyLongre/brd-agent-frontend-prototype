import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/index';
import { platforms } from '../../data/dummyData';

/**
 * Collapsible sidebar component
 * Shows user profile and platform connections
 */
export function Sidebar() {
  const { currentUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-surface border-r border-border transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      } min-h-screen`}
    >
      {/* Collapse Button */}
      <div className="p-4 border-b border-border flex items-center justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm text-text-primary">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-text-secondary">{currentUser?.email}</p>
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
      <div className="flex-1 p-4">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{platform.icon}</span>
                    <span className="text-sm font-medium text-text-primary">
                      {platform.name}
                    </span>
                  </div>
                  {platform.connected ? (
                    <span className="text-xs bg-success text-white px-2 py-1 rounded-full">
                      Connected
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      className="text-xs py-1 px-2"
                      onClick={() => alert(`Connect ${platform.name}`)}
                    >
                      Connect
                    </Button>
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
