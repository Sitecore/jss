const guidesNav = {
  url: 'guides',
  displayName: 'Guides & Recommended Practices',
  children: [
    {
      url: 'getting-started',
      displayName: 'Getting Started',
      children: [
        {
          url: 'solution-setup',
          displayName: 'Solution Setup'
        },
        {
          url: 'solution-structure',
          displayName: 'Solution Structure'
        },
        {
          url: 'component-granularity',
          displayName: 'Component Granularity'
        }
      ]
    },
    {
      url: 'code-patterns',
      displayName: 'Code Patterns',
      children: [
        {
          url: 'ssr',
          displayName: 'SSR'
        },
        {
          url: 'content-resolvers',
          displayName: 'Content Resolvers'
        },
        {
          url: 'custom-error-pages',
          displayName: 'Custom Error Pages'
        }
      ]
    },
    {
      url: 'content-patterns',
      displayName: 'Content Patterns',
      children: [
        {
          url: 'shared-content',
          displayName: 'Shared Content'
        }
      ]
    },
    {
      url: 'devex',
      displayName: 'Developer Experience',
      children: [
        {
          url: 'front-end debugging',
          displayName: 'Front-End Debugging'
        },
        {
          url: 'back-end debugging',
          displayName: 'Back-End Debugging'
        },
        {
          url: 'tools',
          displayName: 'Tools'
        }
      ]
    }
  ],
  links: []
};

export default guidesNav;
