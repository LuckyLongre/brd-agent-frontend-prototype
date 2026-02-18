import React, { createContext, useState, useContext } from 'react';

// Create the Project Context for managing project-related data
const ProjectContext = createContext();

// ProjectProvider component that wraps the app
export function ProjectProvider({ children }) {
  // State to store all projects
  const [projects, setProjects] = useState([]);
  // State to store current project being worked on
  const [currentProject, setCurrentProject] = useState(null);
  // State to track the current step in project processing
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3, or 4
  // State to store extracted facts
  const [facts, setFacts] = useState([]);
  // State to store detected conflicts
  const [conflicts, setConflicts] = useState([]);
  // State to store resolved conflicts
  const [resolvedConflicts, setResolvedConflicts] = useState([]);
  // State for the final BRD document
  const [brdDocument, setBrdDocument] = useState(null);
  // State to track number of edits made to BRD
  const [editCount, setEditCount] = useState(0);
  // Max edits allowed
  const MAX_EDITS = 3;

  // Add a new project
  const addProject = (project) => {
    const newProject = {
      id: Date.now().toString(),
      createdAt: new Date(),
      ...project,
      status: 'Extraction',
      stepProgress: 1,
    };
    setProjects([newProject, ...projects]);
    return newProject;
  };

  // Load a project by ID
  const loadProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      setCurrentStep(project.stepProgress || 1);
      // Reset step-specific data
      setFacts([]);
      setConflicts([]);
      setResolvedConflicts([]);
      setBrdDocument(null);
      setEditCount(0);
    }
  };

  // Update project status
  const updateProjectStatus = (projectId, status, stepProgress) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              status,
              stepProgress,
              lastEdited: new Date(),
            }
          : p
      )
    );
    if (currentProject?.id === projectId) {
      setCurrentProject({
        ...currentProject,
        status,
        stepProgress,
        lastEdited: new Date(),
      });
    }
  };

  // Move to next step
  const moveToNextStep = () => {
    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // Update project's step progress
      if (currentProject) {
        updateProjectStatus(currentProject.id, getStatusForStep(nextStep), nextStep);
      }
    }
  };

  // Get status label based on current step
  const getStatusForStep = (step) => {
    const statuses = {
      1: 'Extraction',
      2: 'Conflict',
      3: 'Summary',
      4: 'BRD Generated',
    };
    return statuses[step] || 'Extraction';
  };

  // Add extracted facts
  const addFact = (fact) => {
    setFacts([
      ...facts,
      {
        id: Date.now().toString(),
        ...fact,
      },
    ]);
  };

  // Remove a fact
  const removeFact = (factId) => {
    setFacts(facts.filter((f) => f.id !== factId));
  };

  // Set conflicts for current project
  const setProjectConflicts = (conflictList) => {
    setConflicts(conflictList);
  };

  // Resolve a conflict by selecting the correct fact
  const resolveConflict = (conflictId, selectedFactId, comment = '') => {
    const conflict = conflicts.find((c) => c.id === conflictId);
    if (conflict) {
      setResolvedConflicts([
        ...resolvedConflicts,
        {
          conflictId,
          selectedFactId,
          comment,
          resolvedAt: new Date(),
        },
      ]);
      setConflicts(conflicts.filter((c) => c.id !== conflictId));
    }
  };

  // Generate BRD document
  const generateBRD = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const brd = {
          id: Date.now().toString(),
          title: currentProject?.name || 'Project BRD',
          executiveSummary:
            'This Business Requirements Document outlines the key requirements and objectives for the project.',
          businessObjectives: [
            'Streamline conversation analysis from multiple platforms',
            'Identify and resolve conflicting requirements',
            'Generate clear, actionable business requirements',
          ],
          stakeholderAnalysis: [
            { role: 'Product Manager', responsibility: 'Define requirements' },
            { role: 'Engineering Lead', responsibility: 'Validate technical feasibility' },
            { role: 'Business Analyst', responsibility: 'Document requirements' },
          ],
          functionalRequirements: [
            'Support multiple conversation platforms',
            'Real-time conflict detection',
            'Interactive conflict resolution interface',
            'Auto-generation of BRD document',
          ],
          nonFunctionalRequirements: [
            'Support 1000+ concurrent users',
            'Process documents in <5 seconds',
            '99.9% uptime availability',
            'End-to-end encryption for conversations',
          ],
          assumptions: [
            'Users have valid platform accounts',
            'Conversations are in English language',
            'Users have appropriate permissions to access conversations',
          ],
          timeline: {
            phase1: 'Research & Planning (2 weeks)',
            phase2: 'Design & Development (4 weeks)',
            phase3: 'Testing & QA (2 weeks)',
            phase4: 'Launch & Optimization (1 week)',
          },
          successMetrics: [
            'User adoption: 10,000+ users in first month',
            'Document accuracy: >95%',
            'User satisfaction: >4.5/5 stars',
            'Conflict resolution rate: >90%',
          ],
          lastUpdated: new Date().toISOString(),
        };
        setBrdDocument(brd);
        setEditCount(0);
        resolve(brd);
      }, 2000); // Simulate generation time
    });
  };

  // Edit BRD using natural language (simulated)
  const editBRDWithAI = async (instruction) => {
    if (editCount >= MAX_EDITS) {
      return { success: false, error: `Maximum ${MAX_EDITS} edits reached` };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI modification
        const updatedBRD = {
          ...brdDocument,
          executiveSummary: `${brdDocument.executiveSummary} [Modified: ${instruction}]`,
          lastUpdated: new Date().toISOString(),
        };
        setBrdDocument(updatedBRD);
        setEditCount(editCount + 1);
        resolve({ success: true, editCount: editCount + 1 });
      }, 1500);
    });
  };

  // Delete a project
  const deleteProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
  };

  // Provide project state and functions to all child components
  const value = {
    projects,
    currentProject,
    currentStep,
    facts,
    conflicts,
    resolvedConflicts,
    brdDocument,
    editCount,
    maxEdits: MAX_EDITS,
    addProject,
    loadProject,
    updateProjectStatus,
    moveToNextStep,
    getStatusForStep,
    addFact,
    removeFact,
    setProjectConflicts,
    resolveConflict,
    generateBRD,
    editBRDWithAI,
    deleteProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

// Custom hook to use Project Context
export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
}
