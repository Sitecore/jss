const guidesNav = {
  url: 'guides',
  displayName: 'Guides & Recommended Practices',
  children: [
    {
      url: 'thinking-in-jss',
      displayName: 'Thinking in JSS',
      children: [
        {
          url: 'js-vs-jss',
          displayName: `JS Apps vs JSS Apps`
        },
        {
          url: 'terminology',
          displayName: 'Sitecore Terminology & Concepts'
        },
        {
          url: 'project-structure',
          displayName: 'Project Structure'
        },
        {
          url: 'developer-workflows',
          displayName: 'Developer Workflows'
        }
      ]
    },
    {
      url: 'code-patterns',
      displayName: 'Code Patterns',
      children: [
        {
          url: 'layout-service',
          displayName: 'Layout Service Customization'
        },
        {
          url: 'media-handling',
          displayName: 'Media Handling'
        },
        {
          url: 'routing',
          displayName: 'Routing'
        },
        {
          url: 'ssr',
          displayName: 'SSR Recommendations'
        }
      ]
    },
    {
      url: 'multisite',
      displayName: 'Multisite Scenarios',
      children: [
        {
          url: 'content-patterns',
          displayName: 'Content Patterns'
        },
        {
          url: 'implementation-patterns',
          displayName: 'Implementation Patterns'
        },
        {
          url: 'multi-language-support',
          displayName: 'Multi-Lingual Support'
        },
        {
          url: 'sxa-integration',
          displayName: 'SXA Integration'
        },
      ]
    },
    {
      url: 'performance',
      displayName: 'Performance'
    },
    {
      url: 'error-handling-debugging',
      displayName: 'Debugging',
      children: [
        {
          url: 'setup-checklist',
          displayName: 'Setup Checklist'
        },
        {
          url: 'common-pitfalls',
          displayName: 'Common Pitfalls'
        },
        {
          url: 'js-validation',
          displayName: 'Validation in JS'
        },
        {
          url: 'http-status-codes',
          displayName: 'HTTP Status Codes'
        },
        {
          url: 'debugging-help',
          displayName: 'Debugging Help'
        }
      ]
    },
    {
      url: 'graphql',
      displayName: 'GraphQL',
      children: [
        {
          url: 'extending-graphql',
          displayName: 'Extending GraphQL'
        },
        {
          url: 'graphql-security',
          displayName: 'Security'
        },
        {
          url: 'query-recipes',
          displayName: 'Query Recipes'
        }
      ]
    },
    {
      url: 'wip',
      displayName: '🚧 Work in Progress',
      children: [
        {
          url: 'deployment-topologies',
          displayName: 'Deployment Topologies'
        },
        
        
        {
          url: 'migration-guide',
          displayName: 'Migration Guide'
        },
      ]
    },
  ],
  links: []
};

export default guidesNav;
