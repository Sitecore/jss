import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideRouteFields, { StyleguideRouteFieldsProps as Props } from './Styleguide-RouteFields';
import { StorybookArgs, StorybookEditingArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';

export default {
  title: 'Components/styleguide/Styleguide-RouteFields',
  component: StyleguideRouteFields,
} as ComponentMeta<typeof StyleguideRouteFields>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideRouteFields> = (args) => (
  <StyleguideRouteFields {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {},
  fields: {
    heading: 'Route-level Fields',
    description:
      '<p><small>Route-level content fields are defined on the <em>route</em> instead of on a <em>component</em>. This allows multiple components to share the field data on the same route - and querying is much easier on route level fields, making <em>custom route types</em> ideal for filterable/queryable data such as articles.</small></p>',
  },
  rendering: {
    uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
    componentName: 'Styleguide-Styleguide-Layout-Reuse',
    dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
    fields: {
      heading: {
        value: 'Route-level Fields',
      },
      description: {
        value:
          '<p><small>Route-level content fields are defined on the <em>route</em> instead of on a <em>component</em>. This allows multiple components to share the field data on the same route - and querying is much easier on route level fields, making <em>custom route types</em> ideal for filterable/queryable data such as articles.</small></p>',
      },
    },
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props>;

export const Editing = Template.bind({});

const editingLayoutData: LayoutServiceData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: 'nextjs-app',
      },
      language: 'en',
      itemPath: '/',
    },
    route: {
      name: 'home',
      displayName: 'home',
      fields: {
        pageTitle: {
          value: '',
          editable: '<span class="jss-border">Welcome to Sitecore JSS</span>' 
        }
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

Editing.args = withFields<EditingArgs, Props>({
  params: {},
  fields: {
    heading: '<span class="jss-border">Route-level Fields Editing</span>',
    description: '<p><small class="jss-border">Route-level content fields are defined on the <em>route</em> instead of on a <em>component</em>. This allows multiple components to share the field data on the same route - and querying is much easier on route level fields, making <em>custom route types</em> ideal for filterable/queryable data such as articles.</small></p>'
  },
  rendering: {
    uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
    componentName: 'Styleguide-Styleguide-Layout-Reuse',
    dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
    fields: {
      heading: {
        value: 'Route-level Fields',
      },
      description: {
        value:
          '<p><small>Route-level content fields are defined on the <em>route</em> instead of on a <em>component</em>. This allows multiple components to share the field data on the same route - and querying is much easier on route level fields, making <em>custom route types</em> ideal for filterable/queryable data such as articles.</small></p>',
      },
    },
  },
}, true
);
Editing.decorators = [withSitecoreContext({layoutData: editingLayoutData})];