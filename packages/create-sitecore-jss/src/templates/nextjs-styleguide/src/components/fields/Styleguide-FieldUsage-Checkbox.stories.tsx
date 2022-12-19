import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  withFields,
  StorybookArgs,
  withSitecoreContext,
  StorybookEditingArgs,
} from 'storybook-utils/utils';

import StyleguideFieldUsageCheckbox, {
  StyleguideFieldUsageCheckboxProps as Props,
} from './Styleguide-FieldUsage-Checkbox';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Checkbox',
  component: StyleguideFieldUsageCheckbox,
} as ComponentMeta<typeof StyleguideFieldUsageCheckbox>;

const Template: ComponentStory<typeof StyleguideFieldUsageCheckbox> = (args) => (
  <StyleguideFieldUsageCheckbox {...args} />
);

type Args = StorybookArgs<Props>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-Checkbox',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Checkbox',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Checkbox',
    description:
      '<small>Note: Sitecore does not support inline editing of Checkbox fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.</small>',
    checkbox: true,
    checkbox2: false,
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props, 'checkbox' | 'checkbox2'>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-Checkbox',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-Checkbox',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: '<span class="jss-border">Checkbox Editing</span>',
      description:
        '<small class="jss-border">Note: Sitecore does not support inline editing of Checkbox fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.</small>',
      checkbox: {
        value: true,
        editable: '<span class="jss-border">true</span>',
      },
      checkbox2: {
        value: false,
        editable: '<span class="jss-border">false</span>',
      },
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];
