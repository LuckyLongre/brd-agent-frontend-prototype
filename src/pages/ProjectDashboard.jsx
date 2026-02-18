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
 * Layout: Sidebar | Step Progress | Dynamic Step Content
 */
export function ProjectDashboard() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isAuthenticated } = useAuth();
  const { currentProject, currentStep, moveToNextStep, loadProject } = useProject();

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

  const handlePrevStep = () => {
    // Navigate back in step
    if (currentStep > 1) {
      // This would be implemented with a previous step function in context
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex">
            {/* Step Progress Panel */}
            <div className="w-80 bg-white border-r border-border p-6 sticky top-20 h-[calc(100vh-80px)]">
              <h3 className="font-bold text-lg text-text-primary mb-6">
                Process Steps
              </h3>

              <div className="space-y-4">
                {/* Step 1 */}
                <StepIndicator
                  stepNumber={1}
                  title="Data Extraction"
                  isCompleted={currentStep > 1}
                  isActive={currentStep === 1}
                  description="Extract facts from conversations"
                />

                {/* Step 2 */}
                <StepIndicator
                  stepNumber={2}
                  title="Conflict Detection"
                  isCompleted={currentStep > 2}
                  isActive={currentStep === 2}
                  description="Identify and resolve conflicts"
                />

                {/* Step 3 */}
                <StepIndicator
                  stepNumber={3}
                  title="Final Summary"
                  isCompleted={currentStep > 3}
                  isActive={currentStep === 3}
                  description="Review all requirements"
                />

                {/* Step 4 */}
                <StepIndicator
                  stepNumber={4}
                  title="BRD Generated"
                  isCompleted={currentStep > 4}
                  isActive={currentStep === 4}
                  description="View and edit the BRD"
                />
              </div>

              {/* Project Info */}
              {currentProject && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">
                    Project Info
                  </h4>
                  <p className="text-sm text-text-primary font-medium">
                    {currentProject.name}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Created {formatDate(currentProject.createdAt)}
                  </p>
                </div>
              )}
            </div>

            {/* Dynamic Content Area */}
            <div className="flex-1 p-8 max-w-4xl">
              {currentStep === 1 && (
                <DataExtraction onNext={handleNextStep} />
              )}
              {currentStep === 2 && (
                <ConflictDetection onNext={handleNextStep} onPrev={handlePrevStep} />
              )}
              {currentStep === 3 && (
                <FinalSummary onNext={handleNextStep} onPrev={handlePrevStep} />
              )}
              {currentStep === 4 && (
                <BRDGenerated onPrev={handlePrevStep} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step Indicator Component
 * Shows the status of each step in the process
 */
function StepIndicator({
  stepNumber,
  title,
  isCompleted,
  isActive,
  description,
}) {
  return (
    <div className="relative">
      {/* Step Circle */}
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${
              isCompleted
                ? 'bg-success'
                : isActive
                  ? 'bg-primary'
                  : 'bg-gray-300'
            }`}
          >
            {isCompleted ? '✓' : stepNumber}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1">
          <h4
            className={`font-semibold text-sm ${
              isActive
                ? 'text-primary'
                : isCompleted
                  ? 'text-success'
                  : 'text-text-secondary'
            }`}
          >
            {title}
          </h4>
          <p className="text-xs text-text-secondary mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
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
