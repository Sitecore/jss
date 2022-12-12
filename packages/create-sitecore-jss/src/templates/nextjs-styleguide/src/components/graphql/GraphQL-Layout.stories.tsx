/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GraphQLLayout from './GraphQL-Layout';
import GraphQLIntegratedDemo from './GraphQL-IntegratedDemo';
import GraphQLConnectedDemo, {
  GraphQLConnectedDemoProps,
  RouteItem,
} from './GraphQL-ConnectedDemo.dynamic';
import { Default as ConnectedDemoStory } from './GraphQL-ConnectedDemo.stories';
import { Default as IntegratedDemoStory } from './GraphQL-IntegratedDemo.stories';
import { NextjsAppGraphQlConnectedDemo } from './GraphQL-ConnectedDemo.dynamic.graphql';
import { withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/graphql/GraphQL-Layout',
  component: GraphQLLayout,
} as ComponentMeta<typeof GraphQLLayout>;

const components = new Map();
components.set('GraphQL-IntegratedDemo', GraphQLIntegratedDemo);
components.set('GraphQL-ConnectedDemo', (props: GraphQLConnectedDemoProps) => (
  <GraphQLConnectedDemo
    {...props}
    contextItem={ConnectedDemoStory.args?.contextItem as RouteItem}
    datasource={ConnectedDemoStory.args?.datasource as <%- helper.getAppPrefix(appPrefix, appName, false) %>GraphQlConnectedDemo}
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
      '<%- helper.getAppPrefix(appPrefix, appName) %>jss-graphql-layout': [
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
Default.decorators = [withSitecoreContext({ componentFactory })];
