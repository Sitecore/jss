import sharedConcepts from './sharedConcepts'
import nextjs from './nextjs';
'use strict';

export default {
  url: 'docs',
  displayName: 'Docs',
  children: [
    sharedConcepts,
    nextjs,
    {
      url: 'client-frameworks',
      displayName: 'React / Vue / Angular',
      children: [
        {
          url: 'getting-started',
          displayName: 'Getting Started',
          children: [
            {
              url: 'quick-start',
              displayName: 'Quick Start',
            },
            {
              url: 'first-component',
              displayName: 'Your First Component',
            },
            {
              url: 'jss-server-install',
              displayName: 'JSS Server Setup',
            },
            {
              url: 'app-deployment',
              displayName: 'App Deployment',
            },
          ],
        },
        {
          url: 'react',
          displayName: 'React',
          children: [
            {
              url: 'react-overview',
              displayName: 'Overview',
            },
            {
              url: 'sample-app',
              displayName: 'Sample App',
            },
            {
              url: 'react-placeholders',
              displayName: 'Placeholder Techniques',
            },
          ],
        },
        {
          url: 'vue',
          displayName: 'Vue',
          children: [
            {
              url: 'vue-overview',
              displayName: 'Overview',
            },
            {
              url: 'sample-app',
              displayName: 'Sample App',
            },
            {
              url: 'vue-placeholders',
              displayName: 'Placeholder Techniques',
            },
            {
              url: 'reference',
              displayName: 'Package Reference',
            },
          ],
        },
        {
          url: 'angular',
          displayName: 'Angular',
          children: [
            {
              url: 'angular-overview',
              displayName: 'Overview',
            },
            {
              url: 'sample-app',
              displayName: 'Sample App',
            },
            {
              url: 'angular-tips',
              displayName: 'Tips + Best Practices',
            },
            {
              url: 'angular-placeholders',
              displayName: 'Placeholder Techniques',
            },
            {
              url: 'reference',
              displayName: 'API Reference',
            },
          ],
        },
        {
          url: 'react-native',
          displayName: 'React Native',
          children: [
            {
              url: 'react-native-overview',
              displayName: 'Overview'
            },
            {
              url: 'sample-app',
              displayName: 'Sample App'
            },
            {
              url: 'react-native-placeholders',
              displayName: 'Placeholder Techniques'
            }
          ]
        },
      ],
    },
    {
      url: 'fundamentals',
      displayName: 'Fundamentals',
      children: [
        {
          url: 'architecture',
          displayName: 'Architecture',
        },
        {
          url: 'understanding-layout',
          displayName: 'Understanding layout',
        },
        {
          url: 'personalization',
          displayName: 'Personalization',
        },
        {
          url: 'dev-workflows',
          displayName: 'Developer workflows',
          children: [
            {
              url: 'overview',
              displayName: 'Overview',
            },
            {
              url: 'code-first',
              displayName: 'Code-first',
            },
            {
              url: 'sitecore-first',
              displayName: 'Sitecore-first',
            },
          ],
        },
        {
          url: 'application-modes',
          displayName: 'Application modes',
        },
        {
          url: 'cli',
          displayName: 'JSS CLI',
        },
        {
          url: 'services',
          displayName: 'Services and APIs',
          children: [
            {
              url: 'app-configuration',
              displayName: 'App Configuration',
            },
            {
              url: 'app-import',
              displayName: 'App Import',
            },
            {
              url: 'layout-service',
              displayName: 'Layout Service',
            },
            {
              url: 'graphql',
              displayName: 'GraphQL',
            },
            {
              url: 'tracking',
              displayName: 'Tracking',
            },
            {
              url: 'forms-service',
              displayName: 'Forms',
            },
            {
              url: 'dictionary-service',
              displayName: 'Dictionary Service',
            },
            {
              url: 'view-engine',
              displayName: 'View Engine / SSR',
            },
          ],
        },
      ],
    },
    {
      url: 'techniques',
      displayName: 'Techniques',
      children: [
        {
          url: 'mvc-integration',
          displayName: 'Sitecore MVC Integration',
          children: [
            {
              url: 'javascript-rendering',
              displayName: 'JavaScript Rendering Type',
            },
            {
              url: 'client-side-embedding',
              displayName: 'Client-side Embedding',
            },
          ],
        },
        {
          url: 'working-disconnected',
          displayName: 'Working Disconnected',
          children: [
            {
              url: 'disconnected-overview',
              displayName: 'Overview',
            },
            {
              url: 'manifest-api',
              displayName: 'Data and Component Definitions',
            },
            {
              url: 'import-process',
              displayName: 'The Import Process',
            },
            {
              url: 'extending-import',
              displayName: 'Import Pipeline Extension',
            },
            {
              url: 'customizing-disconnected',
              displayName: 'Customizing Disconnected Data',
            },
          ],
        },
        {
          url: 'working-connected',
          displayName: 'Working Connected',
        },
        {
          url: 'graphql',
          displayName: 'GraphQL + JSS',
          children: [
            {
              url: 'graphql-overview',
              displayName: 'Overview',
            },
            {
              url: 'integrated-graphql',
              displayName: 'Integrated GraphQL',
            },
            {
              url: 'connected-graphql',
              displayName: 'Connected GraphQL',
            },
          ],
        },
        {
          url: 'ssr',
          displayName: 'Server-side Rendering',
          children: [
            {
              url: 'integrated-mode-ssr',
              displayName: 'via Sitecore Integrated Mode',
            },
            {
              url: 'headless-mode-ssr',
              displayName: 'via Headless Mode',
            },
            {
              url: 'server-rendering-viewbag',
              displayName: 'Adding Data for SSR',
            },
            {
              url: 'configuring-and-debugging-ssr',
              displayName: 'Configuring and Debugging SSR',
            },
          ],
        },
        {
          url: 'content-translation',
          displayName: 'Translation',
        },
        {
          url: 'authentication',
          displayName: 'Authentication',
          children: [
            {
              url: 'sitecore-auth',
              displayName: 'Sitecore Authentication',
            },
            {
              url: 'federated-auth',
              displayName: 'Federated Authentication',
            },
          ],
        },
        {
          url: 'extending-layout-service',
          displayName: 'Layout Service Extensibility',
          children: [
            {
              url: 'extending-layout-service-overview',
              displayName: 'Overview',
            },
            {
              url: 'layoutservice-extending-context',
              displayName: 'Extending Route Context Data',
            },
            {
              url: 'layoutservice-static-context-rendering',
              displayName: 'Static Layouts in Context Data',
            },
            {
              url: 'layoutservice-rendering-contents',
              displayName: 'Customizing Rendering Data',
            },
          ],
        },
        {
          url: 'forms',
          displayName: 'Sitecore Forms + JSS',
        },
        {
          url: 'dynamic-placeholders',
          displayName: 'Dynamic Placeholders',
        },
        {
          url: 'devops',
          displayName: 'DevOps Guide',
        },
        {
          url: 'performance',
          displayName: 'Performance Guide',
          children: [
            {
              url: 'caching',
              displayName: 'Caching',
            }
          ]
        },
        {
          url: 'azure-deployment',
          displayName: 'Azure Deployment',
        },
        {
          url: 'custom-create-templates',
          displayName: 'Custom App Templates',
        },
      ],
    },
  ],
  links: [
    {
      url: 'release-notes',
      displayName: 'Release Notes',
      className: 'nav-link'
    },
    {
      url: 'help',
      displayName: 'Help',
      className: 'nav-link'
    },
    {
      url: 'connected-demo/getting-started/prerequisites',
      displayName: 'Connected Demo',
      className: 'nav-link'
    },
  ],
};