import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';
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
