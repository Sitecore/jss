import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';
import StyleguideFieldUsageNumber, {
  StyleguideFieldUsageTextProps as Props,
} from './Styleguide-FieldUsage-Number';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Number',
  component: StyleguideFieldUsageNumber,
} as ComponentMeta<typeof StyleguideFieldUsageNumber>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideFieldUsageNumber> = (args) => (
  <StyleguideFieldUsageNumber {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-Number',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Number',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Number',
    description: '<small>Number tells Sitecore to use a number entry for editing.</small>',
    sample: 1.21,
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props, 'sample'>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-Number',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-Number',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: '<span class="jss-border">Number Editing</span>',
      description:
        '<small class="jss-border">Number tells Sitecore to use a number entry for editing.</small>',
      sample: {
        value: 1.21,
        editable: '<span class="jss-border">1.21</span>',
      },
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];
