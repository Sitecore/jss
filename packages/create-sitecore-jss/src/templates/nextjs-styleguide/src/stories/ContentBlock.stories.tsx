import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ContentBlock from '../components/ContentBlock';

export default {
  title: 'Components/ContentBlock',
  component: ContentBlock,
} as ComponentMeta<typeof ContentBlock>;

const Template: ComponentStory<typeof ContentBlock> = (args) => <ContentBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'ContentBlock',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'ContentBlock',
  },
  fields: {
    heading: {
      value: 'Heading',
    },
    content: {
      value: 'Content',
    },
  },
};
