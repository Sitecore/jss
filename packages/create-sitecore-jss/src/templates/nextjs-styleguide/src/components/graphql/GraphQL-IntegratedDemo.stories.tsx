import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GraphQLIntegratedDemo from './GraphQL-IntegratedDemo';
import { withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/graphql/GraphQL-IntegratedDemo',
  component: GraphQLIntegratedDemo,
} as ComponentMeta<typeof GraphQLIntegratedDemo>;

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
        name: 'graphql-<%- helper.getAppPrefix(appPrefix, appName) %>jss-graphql75D1D7D41C7DF462FC4CB776C7D60D06BDCE7759549F7EB5DF733EE454D9DFA3',
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
Default.decorators = [withSitecoreContext()];
