'use strict';

export default {
  url: 'nextjs',
  displayName: 'Next.js',
  children: [
    {
      url: 'getting-started-nextjs',
      displayName: 'Getting Started with Next.js',
      children: [
        {
          url: 'why-nextjs',
          displayName: 'Why Next.js',
        },
        {
          url: 'how-is-nextjs-different',
          displayName: 'Differences from other JSS SDKs'
        },
        {
          url: 'workflow-options',
          displayName: 'Workflow Options',
        },
        {
          url: 'walkthrough-dotnetnew',
          displayName: 'Walkthrough: with Sitecore Containers',
        },
        {
          url: 'walkthrough-jsscreate',
          displayName: 'Walkthrough: with \'jss create\'',
        },
        {
          url: 'disable-nextjs-telemetry',
          displayName: 'Disable Next.js telemetry'
        }
      ],
    },
    {
      url: 'services',
      displayName: 'Services & APIs',
      children: [
        {
          url: 'graphql-sitemap-service',
          displayName: 'GraphQL Sitemap Service'
        }
      ]
    },
    {
      url: 'experience-editor',
      displayName: 'Experience Editor',
      children: [
        {
          url: 'architecture',
          displayName: 'Integration architecture and APIs',
        },
        {
          url: 'walkthrough',
          displayName: 'Connect to the Experience Editor',
        },
      ],
    },
    {
      url: 'creating-components',
      displayName: 'Creating Components',
      children: [
        {
          url: 'layout-concepts',
          displayName: 'Layout & Component Concepts'
        },
        {
          url: 'new-component',
          displayName: 'Walkthrough: Creating a new component'
        },
        /*
        {
          url: 'placeholders',
          displayName: 'Component nesting with Placeholder',
        },
        {
          url: 'rendering-fields',
          displayName: 'Rendering Fields',
        },
        {
          url: 'sitecore-context',
          displayName: 'Using Sitecore context',
        },
        */
      ],
    },
    {
      url: 'page-routing',
      displayName: 'Page Routing',
      children: [
        {
          url: 'jss-routes',
          displayName: 'JSS routes with Next.js',
        },
        {
          url: 'getStaticPaths',
          displayName: 'Handling dynamic routes',
        },
        {
          url: 'switching-to-ssr',
          displayName: 'Switching between SSG and SSR',
        },
        {
          url: 'error-pages',
          displayName: 'Error Pages',
        },
      ],
    },
    {
      url: 'data-fetching',
      displayName: 'Data Fetching',
      children: [
        {
          url: 'data-services',
          displayName: 'Data Services',
        },

        //{
        //  url: 'customizing-static-paths',
        //  displayName: 'Customizing static paths',
        //},
        {
          url: 'component-level-data-fetching',
          displayName: 'Component-level data fetching',
        },
        {
          url: 'switching-fetch-method',
          displayName: 'Switching between REST and GraphQL',
        }
      ],
    },
    {
      url: 'graphql',
      displayName: 'GraphQL',
      children: [
        //{
        //  url: 'edge-schema-introduction',
        //  displayName: 'Introduction to the Edge Schema',
        //},
        //{
        //  url: 'sample-app',
        //  displayName: 'Sitecore GraphQL in the sample app',
        //},
        {
          url: 'introspection',
          displayName: 'Introspecting the GraphQL schema'
        },
        {
          url: 'component-level-graphql',
          displayName: 'Using component-level GraphQL'
        },
      ],
    },
    {
      url: 'internationalization',
      displayName: 'Internationalization',
      children: [
        {
          url: 'using-i18n',
          displayName: 'Using i18n',
        },
        //{
        //  url: 'dictionary-service',
        //  displayName: 'Dictionary service and client',
        //},
        //{
        //  url: 'walkthrough-language-switcher',
        //  displayName: 'Creating a language switcher',
        //},
      ],
    },
    {
      url: 'tracking-and-analytics',
      displayName: 'Tracking & Analytics',
      children: [
        {
          url: 'overview',
          displayName: 'Overview and architecture',
        },
        {
          url: 'configuration',
          displayName: 'Enabling tracking and analytics',
        },
      ],
    },
    //{
    //  url: 'multitenancy',
    //  displayName: 'Multitenancy',
    //},
    {
      url: 'deploying-to-production',
      displayName: 'Deploying to Production',
      children: [
        {
          url: 'deployment-options',
          displayName: 'Deployment Options',
        },
        {
          url: 'vercel',
          displayName: 'Deploying to Vercel',
        },
        {
          url: 'export',
          displayName: 'Using `next export`',
        },
        {
          url: 'server-components',
          displayName: 'Installing Sitecore Headless Services',
        },
      ],
    },
    {
      url: 'ref',
      displayName: 'SDK reference',
      children: [
        {
          url: 'modules',
          displayName: 'Modules'
        }
      ]
    },
    {
      url: 'troubleshooting',
      displayName: 'Troubleshooting',
    },
  ],
  links: [],
};
