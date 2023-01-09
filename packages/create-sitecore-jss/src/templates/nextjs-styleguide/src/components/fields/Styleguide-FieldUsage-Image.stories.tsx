import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';
import StyleguideFieldUsageImage, {
  StyleguideFieldUsageImageProps as Props,
} from './Styleguide-FieldUsage-Image';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Image',
  component: StyleguideFieldUsageImage,
} as ComponentMeta<typeof StyleguideFieldUsageImage>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideFieldUsageImage> = (args) => (
  <StyleguideFieldUsageImage {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-Image',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Image',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Image',
    description: 'Description',
    sample1: {
      src: '/sc_logo.png',
      alt: 'Sitecore Logo',
    },
    sample2: {
      src: '/jss_logo.png',
      alt: 'Sitecore JSS Logo',
    },
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props, 'sample1' | 'sample2'>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-Image',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-Image',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: '<span class="jss-border">Image Editing</span>',
      description: '<span class="jss-border">Description Editing</span>',
      sample1: {
        value: {
          src: '/sc_logo.png',
          alt: 'Sitecore Logo',
        },
        editable: '<span class="jss-border">/sc_logo.png</span>'
      },
      sample2: {
        value: {
          src: '/jss_logo.png',
          alt: 'Sitecore JSS Logo',
        },
        editable: '<span class="jss-border">/jss_logo.png</span>',
      },
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];
