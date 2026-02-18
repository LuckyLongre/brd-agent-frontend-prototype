import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Button, Card, EmptyState, Badge } from '../components/common/index';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import { dummyProjects } from '../data/dummyData';

/**
 * User Dashboard Page - Shows all projects and allows creating new ones
 * Layout: Sidebar on left, project grid on right
 */
export function UserDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { projects, addProject } = useProject();
  const [displayProjects, setDisplayProjects] = useState([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  // Initialize projects on component mount
  useEffect(() => {
    if (projects.length === 0) {
      // Add dummy projects to context
      dummyProjects.forEach((project) => {
        addProject(project);
      });
    }
  }, []);

  // Update display projects when projects in context change
  useEffect(() => {
    setDisplayProjects(projects);
  }, [projects]);

  // Get status badge color based on project status
  const getStatusColor = (status) => {
    const colors = {
      Extraction: 'default',
      Conflict: 'warning',
      Summary: 'primary',
      'BRD Generated': 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header with Title and New Project Button */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  My Projects
                </h1>
                <p className="text-text-secondary">
                  Manage and view all your BRD projects
                </p>
              </div>
              <Link to="/user/project/new">
                <Button className="text-lg px-6 py-3">+ New Project</Button>
              </Link>
            </div>

            {/* Projects Grid */}
            {displayProjects.length === 0 ? (
              <EmptyState
                icon="📁"
                title="No Projects Yet"
                description="Create your first project to get started with BRD generation"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProjects.map((project) => (
                  <Link key={project.id} to={`/user/project/${project.id}/dashboard`}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-text-primary mb-1">
                            {project.name}
                          </h3>
                          <p className="text-sm text-text-secondary">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-4">
                        <Badge variant={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>

                      {/* Step Progress Indicator */}
                      <div className="flex items-center gap-2 mb-4">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`flex-1 h-2 rounded-full ${
                              step <= project.stepProgress
                                ? 'bg-primary'
                                : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Project Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
                        <div>
                          <p className="text-xs text-text-secondary">Facts Extracted</p>
                          <p className="text-lg font-semibold text-text-primary">
                            {project.factsExtracted}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-text-secondary">Conflicts</p>
                          <p className="text-lg font-semibold text-text-primary">
                            {project.conflictsDetected}
                          </p>
                        </div>
                      </div>

                      {/* Platforms Used */}
                      <div className="mb-4">
                        <p className="text-xs text-text-secondary mb-2">Platforms</p>
                        <div className="flex gap-2">
                          {project.platforms.map((platform) => (
                            <span key={platform} className="text-lg">
                              {getPlatformIcon(platform)}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Last Edited Date */}
                      <div className="text-xs text-text-secondary">
                        Last edited{' '}
                        {formatDate(project.lastEdited)}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper function to get emoji icon for platform
 */
function getPlatformIcon(platform) {
  const icons = {
    Gmail: '📧',
    Slack: '💬',
    Discord: '🎮',
    WhatsApp: '📱',
  };
  return icons[platform] || '📱';
}

/**
 * Helper function to format date as relative time
 */
function formatDate(date) {
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours === 0) return 'just now';
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
}
