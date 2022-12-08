import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GraphQLIntegratedDemo from './GraphQL-IntegratedDemo';

export default {
  title: 'Components/graphql/GraphQL-IntegratedDemo',
  component: GraphQLIntegratedDemo,
} as ComponentMeta<typeof GraphQLIntegratedDemo>;

const layoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: 'NextjsApp',
      },
      language: 'en',
      itemPath: '/',
    },
    route: {
      name: 'home',
      displayName: 'home',
      fields: {
        pageTitle: {
          value: 'Welcome to Sitecore JSS',
        },
      },
      databaseName: 'master',
      deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
      itemId: '45be1451-fa83-5f80-9f0d-d7457b480b58',
      itemLanguage: 'en',
      itemVersion: 1,
      layoutId: '1db67245-f673-5e7f-9726-e7c5e76350f1',
      templateId: '787584c0-a057-5876-9836-f8b3708f0caf',
      templateName: 'App Route',
      placeholders: {},
    },
  },
};

// eslint-disable-next-line react/display-name
const componentFactory = () => () => <div>Test</div>;

const Template: ComponentStory<typeof GraphQLIntegratedDemo> = (args) => (
  <GraphQLIntegratedDemo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'GraphQL-IntegratedDemo',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'GraphQL-IntegratedDemo',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    data: {
      datasource: {
        id: '6E81D12B6E445CD9919A6707B6723FEC',
        name: 'graphql-NextjsStyleguide-jss-graphql75D1D7D41C7DF462FC4CB776C7D60D06BDCE7759549F7EB5DF733EE454D9DFA3',
        sample1: {
          jsonValue: {
            value: 'Hello integrated GraphQL world!',
          },
          value: 'Hello integrated GraphQL world!',
        },
        sample2: {
          jsonValue: {
            value: {
              href: 'https://www.sitecore.com',
              target: '_blank',
              linktype: 'external',
              text: 'GraphQL lets you get structured field data too',
              url: 'https://www.sitecore.com',
            },
          },
          text: 'GraphQL lets you get structured field data too',
          target: '_blank',
          url: 'https://www.sitecore.com',
          definition: {
            type: 'General Link',
            shared: false,
          },
        },
      },
      contextItem: {
        id: 'E610934CD4F65DE6A13C875C1EBDE9E5',
        pageTitle: {
          value: 'GraphQL | Sitecore JSS',
        },
        children: {
          results: [
            {
              id: 'FB6F711BC4645BB4A2593B0A16A0A70E',
              pageTitle: {
                jsonValue: {
                  value: 'Sample 1 Page Title',
                },
                value: 'Sample 1 Page Title',
              },
              url: {
                path: '/graphql/sample-1',
              },
            },
            {
              id: '95BB13A0BAD058D3AC0A67204D619262',
              pageTitle: {
                jsonValue: {
                  value: 'Sample 2 Page Title',
                },
                value: 'Sample 2 Page Title',
              },
              url: {
                path: '/graphql/sample-2',
              },
            },
          ],
        },
      },
    },
  },
};
Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
