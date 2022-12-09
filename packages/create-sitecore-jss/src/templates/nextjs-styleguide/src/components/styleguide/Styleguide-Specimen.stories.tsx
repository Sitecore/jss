import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  title: 'Components/styleguide/Styleguide-Specimen',
  component: StyleguideSpecimen,
} as ComponentMeta<typeof StyleguideSpecimen>;

const Template: ComponentStory<typeof StyleguideSpecimen> = (args) => (
  <StyleguideSpecimen {...args}>
    <b>Custom children</b>
  </StyleguideSpecimen>
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-Specimen',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Specimen',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    description: {
      value: 'Styleguide Specimen Component',
    },
    heading: {
      value: 'Styleguide Specimen',
    },
  },
  e2eId: 'test-e2e-id',
};
