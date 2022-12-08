/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GraphQLLayout from 'components/graphql/GraphQL-Layout';
import GraphQLIntegratedDemo from './GraphQL-IntegratedDemo';
import GraphQLConnectedDemo, {
  GraphQLConnectedDemoProps,
  RouteItem,
} from './GraphQL-ConnectedDemo.dynamic';
import { Default as ConnectedDemoStory } from './GraphQL-ConnectedDemo.stories';
import { Default as IntegratedDemoStory } from './GraphQL-IntegratedDemo.stories';
import { ReactAppGraphQlConnectedDemo } from './GraphQL-ConnectedDemo.dynamic.graphql';

export default {
  title: 'Components/graphql/GraphQL-Layout',
  component: GraphQLLayout,
} as ComponentMeta<typeof GraphQLLayout>;

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

const components = new Map();
components.set('GraphQL-IntegratedDemo', GraphQLIntegratedDemo);
components.set('GraphQL-ConnectedDemo', (props: GraphQLConnectedDemoProps) => (
  <GraphQLConnectedDemo
    {...props}
    contextItem={ConnectedDemoStory.args?.contextItem as RouteItem}
    datasource={ConnectedDemoStory.args?.datasource as ReactAppGraphQlConnectedDemo}
  />
));

const componentFactory = (name: string) => components.get(name);

const Template: ComponentStory<typeof GraphQLLayout> = (args) => <GraphQLLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'GraphQL-Layout',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'GraphQL-Layout',
    placeholders: {
      'ReactApp-jss-graphql-layout': [
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'GraphQL-IntegratedDemo',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          fields: IntegratedDemoStory.args?.fields as any,
        },
        {
          uid: '1eae6515-6768-5bc6-9355-c7eeb9e3721a',
          componentName: 'GraphQL-ConnectedDemo',
          dataSource: '{815D1A52-4FFF-57F2-96A3-24E5117AEC93}',
          fields: ConnectedDemoStory.args?.rendering?.fields,
        },
      ],
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
