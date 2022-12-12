import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GraphQLConnectedDemo, { RouteItem } from './GraphQL-ConnectedDemo.dynamic';
import {
  ItemSearchResults,
  TextField,
  NextjsAppGraphQlConnectedDemo as GrapQLConnectedDemoDatasource,
} from './GraphQL-ConnectedDemo.dynamic.graphql';
import { withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/graphql/GraphQL-ConnectedDemo',
  component: GraphQLConnectedDemo,
} as ComponentMeta<typeof GraphQLConnectedDemo>;

const Template: ComponentStory<typeof GraphQLConnectedDemo> = (args) => (
  <GraphQLConnectedDemo {...args} />
);

const datasource = {
  id: 'EDDB0FDBBBCA5907948D628B324A1C1F',
  name: 'graphql-<%- helper.getAppPrefix(appPrefix, appName) %>jss-graphql-layout-A65B4AA5-AEAA-5325-AA80-DEC3CEC40AE2-0-GraphQL-ConnectedDemo-2',
  sample1: {
    jsonValue: {
      value: 'Hello connected GraphQL world!',
    },
    value: 'Hello connected GraphQL world!',
  },
  sample2: {
    jsonValue: {
      value: {
        href: 'https://www.sitecore.com',
        text: 'GraphQL lets you get structured field data too',
        target: '_blank',
        url: 'https://www.sitecore.com',
        linktype: 'external',
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
} as GrapQLConnectedDemoDatasource;

const contextItem = {
  id: 'A25DF9564773559F887B92FBC2E95D8D',
  pageTitle: {
    value: 'GraphQL | Sitecore JSS',
  } as TextField,
  children: {
    results: [
      {
        id: '450FF9710C415F8B8E0B54A8B879C994',
        pageTitle: {
          jsonValue: {
            value: 'Sample 1 Page Title',
          },
          value: 'Sample 1 Page Title',
        },
        url: {
          path: '/graphql/sample-1',
        },
      } as RouteItem,
      {
        id: '11904CF3DA915E0BAB1B5B1C9D41E945',
        pageTitle: {
          jsonValue: {
            value: 'Sample 2 Page Title',
          },
          value: 'Sample 2 Page Title',
        },
        url: {
          path: '/graphql/sample-2',
        },
      } as RouteItem,
    ],
  } as ItemSearchResults,
} as RouteItem;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'GraphQL-ConnectedDemo',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'GraphQL-ConnectedDemo',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  contextItem,
  datasource,
};
Default.decorators = [withSitecoreContext()];
