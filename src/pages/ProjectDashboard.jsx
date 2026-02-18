import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/common/index';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import {
  DataExtraction,
  ConflictDetection,
  FinalSummary,
  BRDGenerated,
} from '../components/project/StepComponents';

/**
 * Project Dashboard Page - Main page for processing a project through 4 steps
 * Simplified responsive layout with horizontal progress indicator
 */
export function ProjectDashboard() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isAuthenticated } = useAuth();
  const { currentProject, currentStep, moveToNextStep, loadProject } = useProject();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  // Load project when component mounts
  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId]);

  // Handle step navigation
  const handleNextStep = () => {
    moveToNextStep();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col lg:flex-row">
        {/* Mobile Sidebar Toggle */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div
          className={`fixed lg:relative top-0 left-0 z-40 lg:z-10 transition-all duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Mobile Sidebar Toggle Button */}
          <div className="lg:hidden sticky top-20 bg-white border-b border-border p-4 z-20">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
              title="Toggle sidebar"
            >
              ☰ Menu
            </button>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="bg-white border-b border-border p-4 sm:p-6 sticky top-20 lg:top-20 z-10">
            {/* Project Title */}
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                {currentProject?.name}
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Step {currentStep} of 4 • {getStepTitle(currentStep)}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-1">
                    <div
                      className={`h-3 rounded-full transition-colors ${
                        step < currentStep
                          ? 'bg-success'
                          : step === currentStep
                            ? 'bg-primary'
                            : 'bg-gray-300'
                      }`}
                    />
                    <p className="text-xs text-text-secondary mt-1 text-center">
                      {['Extract', 'Conflict', 'Summary', 'BRD'][step - 1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl mx-auto w-full">
            {currentStep === 1 && (
              <DataExtraction onNext={handleNextStep} />
            )}
            {currentStep === 2 && (
              <ConflictDetection onNext={handleNextStep} onPrev={() => {}} />
            )}
            {currentStep === 3 && (
              <FinalSummary onNext={handleNextStep} onPrev={() => {}} />
            )}
            {currentStep === 4 && (
              <BRDGenerated onPrev={() => {}} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper to get step title
 */
function getStepTitle(step) {
  const titles = {
    1: 'Data Extraction',
    2: 'Conflict Detection',
    3: 'Final Summary',
    4: 'BRD Generated',
  };
  return titles[step] || '';
}

/**
 * Helper function to format date
 */
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
