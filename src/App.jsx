import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { AppRoutes } from './routes/AppRoutes';

/**
 * Main App Component
 * Provides authentication and project context to all child components
 * Configures routing for the entire application
 */
function App() {
  return (
    <Router>
      {/* Authentication Provider - manages user login/logout state */}
      <AuthProvider>
        {/* Project Provider - manages project and step state */}
        <ProjectProvider>
          {/* Routes - defines all page routes and navigation */}
          <AppRoutes />
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
