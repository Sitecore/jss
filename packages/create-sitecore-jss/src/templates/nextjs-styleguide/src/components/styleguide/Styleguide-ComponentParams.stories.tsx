import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';
import StyleguideComponentParams, {
  StyleguideComponentParamsProps as Props,
} from './Styleguide-ComponentParams';

export default {
  title: 'Components/styleguide/Styleguide-ComponentParams',
  component: StyleguideComponentParams,
} as ComponentMeta<typeof StyleguideComponentParams>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideComponentParams> = (args) => (
  <StyleguideComponentParams {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-ComponentParams',
    cssClass: 'cssClass',
    columns: '3',
    useCallToAction: 'true',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-ComponentParams',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Component Params',
    description:
      '<p><small>Component params (also called Rendering Parameters) allow storing non-content parameters for a component. These params should be used for more technical options such as CSS class names or structural settings.</small></p>',
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props, 'heading' | 'description'>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-ComponentParams',
      cssClass: 'cssClass',
      columns: '3',
      useCallToAction: 'true',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-ComponentParams',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: {
        value: 'Component Params Editing',
        editable: '<span class="jss-border">Component Params Editing</span>',
      },
      description: {
        value:
          '<p><small>Component params (also called Rendering Parameters) allow storing non-content parameters for a component. These params should be used for more technical options such as CSS class names or structural settings.</small></p>',
        editable:
          '<p><small class="jss-border">Component params (also called Rendering Parameters) allow storing non-content parameters for a component. These params should be used for more technical options such as CSS class names or structural settings.</small></p>',
      },
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];
