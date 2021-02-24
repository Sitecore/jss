'use strict';

export default {
  url: 'nextjs',
  displayName: 'Next.js',
  children: [
    {
      url: 'introduction',
      displayName: 'Introduction',
      children: [
        {
          url: 'why-jss',
          displayName: 'Why JSS',
        },
        {
          url: 'why-nextjs',
          displayName: 'Why Next.js',
        },
        {
          url: 'headless-concepts',
          displayName: 'Headless Concepts & Architecture',
        },
        {
          url: 'content-authoring-concepts',
          displayName: 'Content Authoring'
        }
      ]
    },
    {
      url: 'getting-started',
      displayName: 'Getting Started',
      children: [
        {
          url: 'options',
          displayName: 'Options',
        },
        {
          url: 'walkthrough-dotnetnew',
          displayName: 'Walkthrough: with `dot net new`',
        },
        {
          url: 'walkthrough-jsscreate',
          displayName: 'Walkthrough: with `jss create`',
        }
      ]
    },
    {
      url: 'experience-editor',
      displayName: 'Experience Editor',
      children: [
        {
          url: 'architecture',
          displayName: 'Integration architecture and APIs'
        },
        {
          url: 'walkthrough',
          displayName: 'Connect to the Experience Editor'
        },
        {
          url: 'troubleshooting',
          displayName: 'Troubleshooting'
        }
      ]
    },
    {
      url: 'creating-components',
      displayName: 'Creating Components',
      children: [
        {
          url: 'concepts',
          displayName: 'Layout, components, component factory'
        },
        {
          url: 'new-component',
          displayName: 'Walkthrough: Creating a new component'
        },
        {
          url: 'placeholders',
          displayName: 'Component nesting with Placeholder'
        },
        {
          url: 'rendering-fields',
          displayName: 'Rendering Fields'
        },
        {
          url: 'sitecore-context',
          displayName: 'Using Sitecore context'
        }
      ]
    },
    {
      url: 'page-routing',
      displayName: 'Page Routing',
      children: [
        {
          url: 'jss-routes',
          displayName: 'JSS routes with Next.js'
        },
        {
          url: 'switching-to-ssr',
          displayName: 'Switching to SSR'
        },
        {
          url: 'error-routes',
          displayName: 'Error Routes'
        }
      ]
    },
    {
      url: 'data-fetching',
      displayName: 'Data Fetching',
      children: [
        {
          url: 'data-services',
          displayName: 'Data Services'
        },
        {
          url: 'getStaticPaths',
          displayName: 'getStaticPaths & sitemap service'
        },
        {
          url: 'customizing-static-paths',
          displayName: 'Customizing static paths'
        },
        {
          url: 'component-level-data-fetching',
          displayName: 'Component-level data fetching'
        }
      ]
    },
    {
      url: 'graphql',
      displayName: 'GraphQL',
      children: [
        {
          url: 'edge-schema-introduction',
          displayName: 'Introduction to the Edge Schema'
        },
        {
          url: 'sample-app',
          displayName: 'Sitecore GraphQL in the sample app'
        }
      ]
    },
    {
      url: 'internationalization',
      displayName: 'Internationalization',
      children: [
        {
          url: 'using-i18n',
          displayName: 'Using i18n'
        },
        {
          url: 'dictionary-service',
          displayName: 'Dictionary service and client'
        },
        {
          url: 'walkthrough-language-switcher',
          displayName: 'Creating a language switcher'
        }
      ]
    },
    {
      url: 'tracking-and-analytics',
      displayName: 'Tracking & Analytics',
      children: [
        {
          url: 'overview',
          displayName: 'Overview and architecture'
        }
      ]
    },
    {
      url: 'multitenancy',
      displayName: 'Multitenancy',
      children: [
        {
          url: 'overview',
          displayName: 'Multitenancy Overview'
        }
      ]
    },
    {
      url: 'deploying-to-production',
      displayName: 'Deploying to Production',
      children: [
        {
          url: 'deployment-options',
          displayName: 'Deployment Options'
        },
        {
          url: 'vercel',
          displayName: 'Deploying to Vercel'
        },
        {
          url: 'export',
          displayName: 'Using `next export'
        },
        {
          url: 'server-components',
          displayName: 'Installing Sitecore Headless Services'
        }
      ],
    },
    {
      url: 'development-workflows',
      displayName: 'Development Workflows',
      children: [
        {
          url: 'code-first',
          displayName: 'Using code-first'
        },
        {
          url: 'storybook',
          displayName: 'Using Storybook'
        }
      ]
    },
    {
      url: 'other-frameworks',
      displayName: 'Next.js vs Other JSS libraries',
      children: [
        {
          url: 'how-is-nextjs-different',
          displayName: 'What’s different about the Next.js'
        },
      ]
    }
  ],
  links: []
};
