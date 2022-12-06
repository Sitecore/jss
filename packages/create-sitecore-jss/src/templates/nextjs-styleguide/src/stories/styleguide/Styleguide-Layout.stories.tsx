import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideLayout from '../../components/styleguide/Styleguide-Layout';

export default {
  title: 'Components/styleguide/Styleguide-Layout',
  component: StyleguideLayout,
} as ComponentMeta<typeof StyleguideLayout>;

const Template: ComponentStory<typeof StyleguideLayout> = (args) => <StyleguideLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-Layout',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Layout',
  },
};
