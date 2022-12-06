import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageText from '../../components/fields/Styleguide-FieldUsage-Text';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Text',
  component: StyleguideFieldUsageText,
} as ComponentMeta<typeof StyleguideFieldUsageText>;

const Template: ComponentStory<typeof StyleguideFieldUsageText> = (args) => (
  <StyleguideFieldUsageText {...args} />
);

export const SingleLine = Template.bind({});
SingleLine.args = {
  params: {
    name: 'Styleguide-FieldUsage-Text',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Text',
  },
  fields: {
    heading: {
      value: 'Heading',
    },
    description: {
      value: 'Description',
    },
    sample: {
      value:
        'This is a sample text field. <mark>HTML is encoded.</mark> In Sitecore, editors will see a <input type="text">.',
    },
    sample2: {
      value:
        'This is another sample text field using rendering options. <mark>HTML supported with encode=false.</mark> Cannot edit because editable=false.',
    },
  },
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  params: {
    name: 'Styleguide-FieldUsage-Text',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Text',
  },
  fields: {
    heading: {
      value: 'Heading',
    },
    description: {
      value: 'Description',
    },
    sample: {
      value:
        'This is a sample multi-line text field. <mark>HTML is encoded.</mark> In Sitecore, editors will see a textarea.',
    },
    sample2: {
      value:
        'This is another sample multi-line text field using rendering options. <mark>HTML supported with encode=false.</mark>',
    },
  },
};
