import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageFile from '../../components/fields/Styleguide-FieldUsage-File';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-File',
  component: StyleguideFieldUsageFile,
} as ComponentMeta<typeof StyleguideFieldUsageFile>;

const Template: ComponentStory<typeof StyleguideFieldUsageFile> = (args) => (
  <StyleguideFieldUsageFile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-FieldUsage-File',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-File',
  },
  fields: {
    heading: {
      value: 'Heading',
    },
    description: {
      value: 'Description',
    },
    file: {
      value: {
        src: '/data/media/files/jss.pdf',
        title: 'Example File',
        description: 'This data will be added to the Sitecore Media Library on import',
      },
    },
  },
};
