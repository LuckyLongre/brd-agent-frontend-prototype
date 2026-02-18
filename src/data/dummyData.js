// Dummy data for the application
// These are realistic sample projects and data for demonstration

export const dummyProjects = [
  {
    id: '1',
    name: 'Mobile App Redesign',
    description: 'Complete redesign of our mobile application for improved UX',
    status: 'BRD Generated',
    stepProgress: 4,
    platforms: ['Gmail', 'Slack'],
    factsExtracted: 24,
    conflictsDetected: 3,
    conflictsResolved: 3,
    lastEdited: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    filesCount: 3,
  },
  {
    id: '2',
    name: 'Payment System Integration',
    description: 'Integrate new payment gateway with existing system',
    status: 'Summary',
    stepProgress: 3,
    platforms: ['Discord', 'WhatsApp'],
    factsExtracted: 18,
    conflictsDetected: 5,
    conflictsResolved: 4,
    lastEdited: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    filesCount: 2,
  },
  {
    id: '3',
    name: 'API Documentation',
    description: 'Generate comprehensive API documentation',
    status: 'Conflict',
    stepProgress: 2,
    platforms: ['Slack'],
    factsExtracted: 12,
    conflictsDetected: 2,
    conflictsResolved: 0,
    lastEdited: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    filesCount: 1,
  },
];

// Dummy facts that would be extracted in Step 1
export const dummyFacts = [
  {
    id: '1',
    content: 'The system should support user authentication',
    source: 'Gmail - conversation with stakeholders',
    date: new Date(Date.now() - 1 * 60 * 60 * 1000),
    platform: 'Gmail',
  },
  {
    id: '2',
    content: 'Payment processing must be PCI DSS compliant',
    source: 'Slack - #compliance channel',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    platform: 'Slack',
  },
  {
    id: '3',
    content: 'Mobile app should work offline',
    source: 'Discord - mobile team',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    platform: 'Discord',
  },
  {
    id: '4',
    content: 'API response time must be under 2 seconds',
    source: 'WhatsApp - performance discussion',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    platform: 'WhatsApp',
  },
];

// Dummy conflicts that would be detected in Step 2
export const dummyConflicts = [
  {
    id: 'conflict-1',
    factA: {
      id: 'fact-a1',
      content: 'Users should be limited to 10 login attempts',
    },
    factB: {
      id: 'fact-b1',
      content: 'Users should have unlimited login attempts',
    },
    sources: 'Security team vs. User experience team',
  },
  {
    id: 'conflict-2',
    factA: {
      id: 'fact-a2',
      content: 'Data should be retained for 1 year',
    },
    factB: {
      id: 'fact-b2',
      content: 'Data should be retained for 5 years',
    },
    sources: 'Privacy policy vs. Compliance requirements',
  },
];

// Dummy platforms available for connection
export const platforms = [
  {
    name: 'Gmail',
    connected: true,
    icon: '📧',
  },
  {
    name: 'Slack',
    connected: true,
    icon: '💬',
  },
  {
    name: 'Discord',
    connected: false,
    icon: '🎮',
  },
  {
    name: 'WhatsApp',
    connected: false,
    icon: '📱',
  },
];

// Platform groups and channels for the New Project tree
export const platformHierarchy = {
  WhatsApp: {
    icon: '📱',
    groups: ['Group 1', 'Group 2', 'Chat 1', 'Chat 2'],
  },
  Gmail: {
    icon: '📧',
    groups: ['Inbox', 'Drafts', 'Sent', 'Custom Labels'],
  },
  Slack: {
    icon: '💬',
    groups: ['#frontend', '#marketing', '#engineering', '#general'],
  },
  Discord: {
    icon: '🎮',
    groups: ['#announcements', '#general', '#tech-help', '#off-topic'],
  },
};

// Dummy BRD document for display
export const sampleBRD = {
  id: '1',
  title: 'Business Requirements Document - Mobile App Redesign',
  executiveSummary:
    'This document outlines the comprehensive requirements for a complete redesign of our mobile application. The redesign aims to improve user experience, increase engagement, and reduce support tickets by 40%.',
  businessObjectives: [
    'Improve user engagement by 50%',
    'Reduce app crashes by 80%',
    'Decrease load time by 60%',
    'Increase user retention to 75%',
  ],
  stakeholderAnalysis: [
    {
      role: 'Product Manager',
      responsibility: 'Define and prioritize features',
    },
    {
      role: 'Engineering Lead',
      responsibility: 'Validate technical feasibility and estimate effort',
    },
    {
      role: 'UX Designer',
      responsibility: 'Create wireframes and prototypes',
    },
    {
      role: 'Business Analyst',
      responsibility: 'Document requirements and success metrics',
    },
  ],
  functionalRequirements: [
    'User must be able to create account with email or social login',
    'Application should support offline functionality',
    'Users should be able to sync data across devices',
    'Push notifications for important updates',
    'In-app messaging system',
  ],
  nonFunctionalRequirements: [
    'Support 1,000,000+ concurrent users',
    'App load time < 2 seconds',
    'API response time < 500ms',
    '99.99% uptime availability',
    'End-to-end encryption for user data',
  ],
  assumptions: [
    'Users have internet connectivity',
    'Devices run iOS 12+ or Android 8+',
    'Users have sufficient storage space',
  ],
  timeline: {
    phase1: 'Requirements & Design (3 weeks)',
    phase2: 'Development & Integration (8 weeks)',
    phase3: 'Testing & QA (2 weeks)',
    phase4: 'Soft Launch & Monitoring (1 week)',
    phase5: 'Full Release & Support (Ongoing)',
  },
  successMetrics: [
    'User adoption: 500,000 downloads in first month',
    'App rating: >4.7 stars',
    'Daily active users: 100,000+',
    'Crash rate: <0.1%',
    'User satisfaction score: >85%',
  ],
};
