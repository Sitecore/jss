import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideRouteFields, {
  StyleguideRouteFieldsProps as Props,
} from './Styleguide-RouteFields';
import { StorybookArgs, StorybookEditingArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

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

type EditingArgs = StorybookEditingArgs<Props, 'heading' | 'description' >;

export const Editing = Template.bind({});

Editing.args = withFields<EditingArgs, Props>({
  params: {},
  fields: {
    heading: {
      value: '',
      editable: '<span class="jss-border">Route-level Fields Editing</span>'
    },
    description: {
      value: '',
      editable:  '<p><small class="jss-border">Route-level content fields are defined on the <em>route</em> instead of on a <em>component</em>. This allows multiple components to share the field data on the same route - and querying is much easier on route level fields, making <em>custom route types</em> ideal for filterable/queryable data such as articles.</small></p>'
    }
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
Editing.decorators = [withSitecoreContext()];