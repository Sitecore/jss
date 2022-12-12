import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideSection, { StyleguideSectionProps as Props } from './Styleguide-Section';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Section',
  component: StyleguideSection,
} as ComponentMeta<typeof StyleguideSection>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideSection> = (args) => (
  <StyleguideSection {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-ComponentParams',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Section',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Content Data',
  },
});

Default.decorators = [withSitecoreContext()];
