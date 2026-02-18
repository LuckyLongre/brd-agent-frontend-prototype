import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Button, Input, Card, ConfirmModal } from '../components/common/index';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import { platformHierarchy } from '../data/dummyData';

/**
 * New Project Page - Create a new project with platform selection and file upload
 * Layout: Left panel (40%) for platform tree, right panel (60%) for form
 */
export function NewProject() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addProject } = useProject();

  // Form state
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState({});

  // UI state
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [fileToRemove, setFileToRemove] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  // Initialize selected platforms state
  React.useEffect(() => {
    const initialState = {};
    Object.keys(platformHierarchy).forEach((platform) => {
      initialState[platform] = false;
      platformHierarchy[platform].groups.forEach((group, idx) => {
        initialState[`${platform}-${idx}`] = false;
      });
    });
    setSelectedPlatforms(initialState);
  }, []);

  // Handle platform selection toggle
  const togglePlatform = (key) => {
    setSelectedPlatforms({
      ...selectedPlatforms,
      [key]: !selectedPlatforms[key],
    });
  };

  // Handle file selection from input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter((f) => !selectedFiles.some((sf) => sf.name === f.name));

    if (selectedFiles.length + newFiles.length > 10) {
      setErrors({ files: 'Maximum 10 files allowed' });
      return;
    }

    setSelectedFiles([...selectedFiles, ...newFiles]);
    setErrors({ ...errors, files: '' });
  };

  // Handle drag and drop for files
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleFileChange({ target: { files } });
  };

  // Handle file removal with confirmation
  const handleRemoveFile = (index) => {
    setFileToRemove(index);
    setShowConfirm(true);
  };

  const confirmRemoveFile = () => {
    const updated = selectedFiles.filter((_, i) => i !== fileToRemove);
    setSelectedFiles(updated);
    setShowConfirm(false);
    setFileToRemove(null);
  };

  // Validate and handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    if (!projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    }

    const selectedAny = Object.values(selectedPlatforms).some((v) => v === true);
    if (!selectedAny) {
      newErrors.platforms = 'Select at least one platform';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create project
    setIsCreating(true);
    setTimeout(() => {
      const newProject = addProject({
        name: projectName,
        description: projectDescription,
        platforms: Object.keys(selectedPlatforms)
          .filter((k) => selectedPlatforms[k] && !k.includes('-'))
          .map((p) => (p.includes('-') ? null : p))
          .filter(Boolean),
        filesCount: selectedFiles.length,
        factsExtracted: 0,
        conflictsDetected: 0,
        conflictsResolved: 0,
      });

      setIsCreating(false);
      navigate(`/user/project/${newProject.id}/dashboard`);
    }, 1500);
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

        {/* Main Content - Fully Responsive */}
        <div className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mb-6 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
              title="Toggle sidebar"
            >
              ☰ Menu
            </button>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6 sm:mb-8">
              Create New Project
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Grid - Responsive: Stack on mobile, side-by-side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Left Panel - Platform Tree Selector (Stacks on mobile, 1 col on desktop) */}
                <div className="md:col-span-1">
                  <Card>
                    <h2 className="font-semibold text-base sm:text-lg text-text-primary mb-4">
                      Select Platforms
                    </h2>

                    {errors.platforms && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-danger text-xs sm:text-sm">{errors.platforms}</p>
                      </div>
                    )}

                    <div className="space-y-3 sm:space-y-4">
                      {Object.keys(platformHierarchy).map((platform) => (
                        <div key={platform}>
                          {/* Platform Checkbox */}
                          <label className="flex items-center gap-3 cursor-pointer mb-2">
                            <input
                              type="checkbox"
                              checked={selectedPlatforms[platform] || false}
                              onChange={() => togglePlatform(platform)}
                              className="w-4 h-4"
                            />
                            <span className="text-lg flex-shrink-0">
                              {platformHierarchy[platform].icon}
                            </span>
                            <span className="font-medium text-text-primary text-sm sm:text-base">
                              {platform}
                            </span>
                          </label>

                          {/* Platform Groups */}
                          <div className="ml-7 sm:ml-8 space-y-2">
                            {platformHierarchy[platform].groups.map((group, idx) => (
                              <label
                                key={`${platform}-${idx}`}
                                className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedPlatforms[`${platform}-${idx}`] || false
                                  }
                                  onChange={() =>
                                    togglePlatform(`${platform}-${idx}`)
                                  }
                                  className="w-4 h-4"
                                />
                                <span className="text-text-secondary truncate">{group}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Right Panel - Form (Stacks on mobile, 2 cols on desktop) */}
                <div className="md:col-span-2">
                  <div className="space-y-5 sm:space-y-6">
                    {/* Project Name */}
                    <Card>
                      <Input
                        label="Project Name"
                        placeholder="e.g. Mobile App Redesign"
                        value={projectName}
                        onChange={(e) => {
                          setProjectName(e.target.value);
                          setErrors({ ...errors, projectName: '' });
                        }}
                        error={errors.projectName}
                      />
                    </Card>

                    {/* Project Description */}
                    <Card>
                      <label className="block text-xs sm:text-sm font-medium text-text-primary mb-2">
                        Project Description
                      </label>
                      <textarea
                        placeholder="Describe the project and its goals..."
                        value={projectDescription}
                        onChange={(e) => {
                          setProjectDescription(e.target.value);
                          setErrors({ ...errors, projectDescription: '' });
                        }}
                        className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-colors resize-none h-24 sm:h-32 text-sm ${
                          errors.projectDescription
                            ? 'border-danger focus:ring-danger'
                            : 'border-border focus:ring-primary'
                        }`}
                      />
                      {errors.projectDescription && (
                        <p className="text-danger text-xs sm:text-sm mt-1">
                          {errors.projectDescription}
                        </p>
                      )}
                    </Card>

                    {/* File Upload */}
                    <Card>
                      <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-4">
                        Upload Files
                      </h3>

                      {/* Drag and Drop Area */}
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-border rounded-xl p-6 sm:p-8 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors mb-4"
                      >
                        <p className="text-2xl sm:text-3xl mb-2">📁</p>
                        <p className="text-text-primary font-medium text-sm sm:text-base mb-1">
                          Drag and drop files here
                        </p>
                        <p className="text-text-secondary text-xs sm:text-sm mb-4">
                          or click to select (Max 10 files)
                        </p>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-input"
                        />
                        <label htmlFor="file-input" className="cursor-pointer inline-block">
                          <Button variant="secondary" className="text-xs sm:text-sm">
                            Select Files
                          </Button>
                        </label>
                      </div>

                      {errors.files && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                          <p className="text-danger text-xs sm:text-sm">{errors.files}</p>
                        </div>
                      )}

                      {/* File List */}
                      {selectedFiles.length > 0 && (
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-text-primary mb-3">
                            Selected Files ({selectedFiles.length}/10)
                          </p>
                          <div className="space-y-2">
                            {selectedFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span>📄</span>
                                  <span className="text-xs sm:text-sm text-text-primary truncate">
                                    {file.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(idx)}
                                  className="text-danger hover:bg-red-100 px-2 sm:px-3 py-1 rounded transition-colors text-xs sm:text-sm flex-shrink-0"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        type="submit"
                        fullWidth={false}
                        disabled={isCreating}
                        className="text-base sm:text-lg py-2 sm:py-3 px-6 sm:px-8 flex-1"
                      >
                        {isCreating ? 'Creating...' : 'Create Project'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for File Removal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Remove File"
        message={
          fileToRemove !== null
            ? `Are you sure you want to remove "${selectedFiles[fileToRemove]?.name}"?`
            : ''
        }
        onConfirm={confirmRemoveFile}
        onCancel={() => setShowConfirm(false)}
        isDangerous
      />
    </div>
  );
}
