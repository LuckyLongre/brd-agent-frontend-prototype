/**
 * WhatsApp Dummy Data
 * Real-world conversations from product team groups
 */
export const whatsAppData = {
  groups: [
    {
      id: 'wa-group-1',
      name: 'Product Team',
      icon: '👥',
      chats: [
        {
          id: 'chat-1',
          name: 'Mobile App Discussion',
          messages: [
            {
              sender: 'Sarah (PM)',
              timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              text: 'The app should support offline mode for better UX',
              tags: ['Feature Request'],
            },
            {
              sender: 'Mike (Developer)',
              timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
              text: 'Offline support would require local database setup',
              tags: ['Technical'],
            },
            {
              sender: 'Sarah (PM)',
              timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              text: 'Users need instant notifications for important updates',
              tags: ['Requirement'],
            },
          ],
        },
        {
          id: 'chat-2',
          name: 'Performance Requirements',
          messages: [
            {
              sender: 'Emma (Performance Lead)',
              timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
              text: 'App load time must be under 2 seconds',
              tags: ['Non-Functional Requirement'],
            },
            {
              sender: 'Mike (Developer)',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
              text: 'That means we need to optimize image loading and caching',
              tags: ['Technical Solution'],
            },
          ],
        },
      ],
    },
    {
      id: 'wa-group-2',
      name: 'Security & Compliance',
      icon: '🔒',
      chats: [
        {
          id: 'chat-3',
          name: 'Data Protection',
          messages: [
            {
              sender: 'Alex (Security)',
              timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
              text: 'All user data must be encrypted with AES-256',
              tags: ['Security Requirement'],
            },
            {
              sender: 'Tom (Compliance)',
              timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              text: 'GDPR requires data retention limit of 1 year',
              tags: ['Compliance'],
            },
            {
              sender: 'Alex (Security)',
              timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
              text: 'CCPA requires 2 years retention for audit purposes',
              tags: ['Conflict'],
            },
          ],
        },
      ],
    },
  ],
};

/**
 * Slack Dummy Data
 * Real-world conversations from various Slack channels
 */
export const slackData = {
  channels: [
    {
      id: 'slack-ch-1',
      name: '#product-development',
      icon: '💬',
      threads: [
        {
          id: 'thread-1',
          title: 'Authentication Flow Discussion',
          messages: [
            {
              sender: 'Jennifer (Designer)',
              timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              text: 'Users should have option for social login (Google, GitHub)',
              tags: ['Feature'],
            },
            {
              sender: 'David (Backend)',
              timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
              text: 'Social login means OAuth 2.0 integration',
              tags: ['Technical'],
            },
            {
              sender: 'Sarah (PM)',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
              text: 'Also need email/password option for users who prefer traditional login',
              tags: ['Requirement'],
            },
          ],
        },
        {
          id: 'thread-2',
          title: 'API Rate Limiting',
          messages: [
            {
              sender: 'David (Backend)',
              timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
              text: 'API should rate limit to 1000 requests per hour per user',
              tags: ['Non-Functional'],
            },
            {
              sender: 'Rachel (DevOps)',
              timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              text: 'Actually, high-tier users need 5000 requests per hour',
              tags: ['Conflict'],
            },
          ],
        },
      ],
    },
    {
      id: 'slack-ch-2',
      name: '#engineering',
      icon: '⚙️',
      threads: [
        {
          id: 'thread-3',
          title: 'Database Selection',
          messages: [
            {
              sender: 'Kevin (Architect)',
              timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
              text: 'We should use PostgreSQL for relational data',
              tags: ['Technical Decision'],
            },
            {
              sender: 'Lisa (Data)',
              timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
              text: 'NoSQL like MongoDB would be better for flexible schema',
              tags: ['Conflict'],
            },
          ],
        },
      ],
    },
    {
      id: 'slack-ch-3',
      name: '#marketing',
      icon: '📢',
      threads: [
        {
          id: 'thread-4',
          title: 'User Analytics',
          messages: [
            {
              sender: 'Mark (Marketing)',
              timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
              text: 'We need to track user behavior and send analytics to Mixpanel',
              tags: ['Requirement'],
            },
            {
              sender: 'Sarah (PM)',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
              text: 'Analytics should respect opt-in/opt-out preferences',
              tags: ['Privacy Requirement'],
            },
          ],
        },
      ],
    },
  ],
};

/**
 * Discord Dummy Data
 * Real-world conversations from Discord community
 */
export const discordData = {
  servers: [
    {
      id: 'discord-1',
      name: 'Development',
      icon: '🎮',
      channels: [
        {
          id: 'discord-ch-1',
          name: 'general',
          messages: [
            {
              sender: 'DevLead#1234',
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
              text: 'Mobile app should support iOS 13+ and Android 9+',
              tags: ['Platform Requirement'],
            },
            {
              sender: 'DevOps#5678',
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
              text: 'Actually, let\'s support iOS 14+ for better performance',
              tags: ['Conflict'],
            },
          ],
        },
        {
          id: 'discord-ch-2',
          name: 'feature-requests',
          messages: [
            {
              sender: 'Designer#9999',
              timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
              text: 'Implement dark mode for better user experience at night',
              tags: ['Feature Request'],
            },
            {
              sender: 'PM#1111',
              timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
              text: 'Dark mode should follow system preferences automatically',
              tags: ['Enhancement'],
            },
          ],
        },
      ],
    },
  ],
};

/**
 * Gmail Dummy Data
 * Real-world email conversations
 */
export const gmailData = {
  conversations: [
    {
      id: 'email-1',
      subject: 'Re: Project Vision and Roadmap',
      participants: ['sarah@company.com', 'mike@company.com', 'emma@company.com'],
      emails: [
        {
          from: 'sarah@company.com',
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          body: 'Our platform needs to support multi-language (i18n) by Q2',
          tags: ['Requirement'],
        },
        {
          from: 'mike@company.com',
          timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
          body: 'That would require translation management system. Should we use i18next?',
          tags: ['Technical Solution'],
        },
      ],
    },
    {
      id: 'email-2',
      subject: 'Payment Gateway Integration',
      participants: ['finance@company.com', 'dev@company.com'],
      emails: [
        {
          from: 'finance@company.com',
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
          body: 'We need Stripe integration for payments. Must support credit cards and wallets.',
          tags: ['Requirement'],
        },
        {
          from: 'dev@company.com',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          body: 'Stripe PCI compliance requires PCI DSS Level 1 certification',
          tags: ['Compliance'],
        },
      ],
    },
  ],
};

/**
 * Real-world Conflicts (extracted from conversations)
 */
export const realWorldConflicts = [
  {
    id: 'conflict-1',
    title: 'Data Retention Policy',
    description: 'Different regulatory requirements for data retention periods',
    factA: {
      id: 'fact-retention-gdpr',
      content: 'GDPR requires data deletion within 1 year of inactivity',
      source: 'Email - Legal Team',
      platform: 'Gmail',
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    },
    factB: {
      id: 'fact-retention-ccpa',
      content: 'CCPA requires keeping audit logs for 2 years',
      source: 'WhatsApp - Security & Compliance Group',
      platform: 'WhatsApp',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    severity: 'high',
    impact: 'Regulatory compliance',
  },
  {
    id: 'conflict-2',
    title: 'iOS Minimum Version Support',
    description: 'Different opinions on minimum iOS version support',
    factA: {
      id: 'fact-ios-13',
      content: 'Support iOS 13+ to reach 85% of app store users',
      source: 'Slack - #product-development',
      platform: 'Slack',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    factB: {
      id: 'fact-ios-14',
      content: 'iOS 14+ only for better performance and modern APIs',
      source: 'Discord - development server',
      platform: 'Discord',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    severity: 'medium',
    impact: 'Market reach vs performance',
  },
  {
    id: 'conflict-3',
    title: 'API Rate Limiting',
    description: 'Disagreement on API request limits per hour',
    factA: {
      id: 'fact-rate-1000',
      content: 'Rate limit should be 1000 requests/hour for all users',
      source: 'Slack - #engineering',
      platform: 'Slack',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    factB: {
      id: 'fact-rate-5000',
      content: 'Premium users should have 5000 requests/hour limit',
      source: 'Slack - #engineering',
      platform: 'Slack',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    severity: 'medium',
    impact: 'Tiered pricing model',
  },
  {
    id: 'conflict-4',
    title: 'Database Technology',
    description: 'SQL vs NoSQL for primary database',
    factA: {
      id: 'fact-postgres',
      content: 'Use PostgreSQL for strong ACID compliance and relational queries',
      source: 'Slack - #engineering',
      platform: 'Slack',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    factB: {
      id: 'fact-mongodb',
      content: 'MongoDB for flexible schema and horizontal scaling',
      source: 'Slack - #engineering',
      platform: 'Slack',
      timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    },
    severity: 'high',
    impact: 'Architecture & scalability',
  },
];

/**
 * Real-world Facts (extracted from all conversations)
 */
export const realWorldFacts = [
  // Authentication & Security
  {
    id: 'fact-1',
    content: 'System must support OAuth 2.0 integration with Google and GitHub',
    source: 'Slack - #product-development',
    platform: 'Slack',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: 'Authentication',
    priority: 'high',
  },
  {
    id: 'fact-2',
    content: 'All user data must be encrypted with AES-256 at rest',
    source: 'WhatsApp - Security & Compliance',
    platform: 'WhatsApp',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    category: 'Security',
    priority: 'high',
  },
  {
    id: 'fact-3',
    content: 'Support email/password authentication for traditional users',
    source: 'Slack - #product-development',
    platform: 'Slack',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    category: 'Authentication',
    priority: 'high',
  },

  // Performance & Infrastructure
  {
    id: 'fact-4',
    content: 'App load time must be under 2 seconds on 4G networks',
    source: 'WhatsApp - Product Team',
    platform: 'WhatsApp',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    category: 'Performance',
    priority: 'high',
  },
  {
    id: 'fact-5',
    content: 'API response time should be under 500ms for 95th percentile',
    source: 'Email - Engineering Team',
    platform: 'Gmail',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    category: 'Performance',
    priority: 'high',
  },

  // Platform Support
  {
    id: 'fact-6',
    content: 'Support WhatsApp, Slack, Discord, and Gmail integrations',
    source: 'Slack - #product-development',
    platform: 'Slack',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    category: 'Platform Integration',
    priority: 'critical',
  },
  {
    id: 'fact-7',
    content: 'Minimum iOS version should support iOS 13 or newer',
    source: 'Discord - development',
    platform: 'Discord',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: 'Platform Support',
    priority: 'medium',
  },
  {
    id: 'fact-8',
    content: 'Minimum Android version should be Android 8.0 or newer',
    source: 'WhatsApp - Product Team',
    platform: 'WhatsApp',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: 'Platform Support',
    priority: 'medium',
  },

  // Features
  {
    id: 'fact-9',
    content: 'Implement offline mode with local data synchronization',
    source: 'WhatsApp - Product Team',
    platform: 'WhatsApp',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    category: 'Feature',
    priority: 'high',
  },
  {
    id: 'fact-10',
    content: 'Send push notifications for all important updates and alerts',
    source: 'WhatsApp - Product Team',
    platform: 'WhatsApp',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: 'Feature',
    priority: 'high',
  },
  {
    id: 'fact-11',
    content: 'Implement dark mode following system preferences',
    source: 'Discord - feature-requests',
    platform: 'Discord',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: 'Feature',
    priority: 'medium',
  },
  {
    id: 'fact-12',
    content: 'Support multi-language internationalization (i18n) by Q2',
    source: 'Email - Project Vision and Roadmap',
    platform: 'Gmail',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    category: 'Feature',
    priority: 'medium',
  },

  // Compliance & Legal
  {
    id: 'fact-13',
    content: 'Must comply with GDPR requirements for EU users',
    source: 'WhatsApp - Security & Compliance',
    platform: 'WhatsApp',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    category: 'Compliance',
    priority: 'critical',
  },
  {
    id: 'fact-14',
    content: 'Must maintain PCI DSS Level 1 certification for payment processing',
    source: 'Email - Payment Gateway Integration',
    platform: 'Gmail',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    category: 'Compliance',
    priority: 'critical',
  },
  {
    id: 'fact-15',
    content: 'CCPA requires keeping audit logs for 2 years',
    source: 'WhatsApp - Security & Compliance',
    platform: 'WhatsApp',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    category: 'Compliance',
    priority: 'high',
  },

  // Analytics
  {
    id: 'fact-16',
    content: 'Track user behavior and send analytics to Mixpanel',
    source: 'Slack - #marketing',
    platform: 'Slack',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    category: 'Analytics',
    priority: 'medium',
  },
  {
    id: 'fact-17',
    content: 'Analytics implementation must respect user opt-in/opt-out preferences',
    source: 'Slack - #marketing',
    platform: 'Slack',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: 'Privacy',
    priority: 'high',
  },

  // Payment
  {
    id: 'fact-18',
    content: 'Integrate Stripe for credit card and wallet payments',
    source: 'Email - Payment Gateway Integration',
    platform: 'Gmail',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    category: 'Payment',
    priority: 'critical',
  },
];

/**
 * Sample Real-world Projects
 */
export const realWorldProjects = [
  {
    id: 'p-1',
    name: 'Mobile App Enhancement',
    description: 'Complete overhaul of mobile app features and performance',
    status: 'BRD Generated',
    stepProgress: 4,
    platforms: ['WhatsApp', 'Slack'],
    factsExtracted: 18,
    conflictsDetected: 4,
    conflictsResolved: 4,
    lastEdited: new Date(Date.now() - 12 * 60 * 60 * 1000),
    filesCount: 5,
    sources: ['Product Team', 'Engineering', 'Security'],
  },
  {
    id: 'p-2',
    name: 'Compliance & Security Project',
    description: 'Ensure GDPR and CCPA compliance across all systems',
    status: 'Summary',
    stepProgress: 3,
    platforms: ['Discord', 'Gmail', 'WhatsApp'],
    factsExtracted: 15,
    conflictsDetected: 3,
    conflictsResolved: 2,
    lastEdited: new Date(Date.now() - 2 * 60 * 60 * 1000),
    filesCount: 3,
    sources: ['Legal Team', 'Security', 'Dev Ops'],
  },
  {
    id: 'p-3',
    name: 'Payment Gateway Integration',
    description: 'Integrate Stripe and handle payment processing',
    status: 'Conflict',
    stepProgress: 2,
    platforms: ['Slack', 'Gmail'],
    factsExtracted: 12,
    conflictsDetected: 2,
    conflictsResolved: 1,
    lastEdited: new Date(Date.now() - 45 * 60 * 1000),
    filesCount: 2,
    sources: ['Finance', 'Engineering'],
  },
  {
    id: 'p-4',
    name: 'API Documentation',
    description: 'Comprehensive API documentation and developer guide',
    status: 'Extraction',
    stepProgress: 1,
    platforms: ['Slack'],
    factsExtracted: 8,
    conflictsDetected: 0,
    conflictsResolved: 0,
    lastEdited: new Date(Date.now() - 30 * 60 * 1000),
    filesCount: 1,
    sources: ['Engineering'],
  },
];
