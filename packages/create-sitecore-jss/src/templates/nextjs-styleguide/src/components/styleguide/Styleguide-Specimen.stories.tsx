import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideSpecimen, { StyleguideSpecimenProps as Props } from './Styleguide-Specimen';
import { StorybookArgs, StorybookEditingArgs, withFields } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Specimen',
  component: StyleguideSpecimen,
} as ComponentMeta<typeof StyleguideSpecimen>;

const Template: ComponentStory<typeof StyleguideSpecimen> = (args) => (
  <StyleguideSpecimen {...args}>
    <b>Custom children</b>
  </StyleguideSpecimen>
);

type Args = StorybookArgs<Props>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  children: null,
  params: {
    name: 'Styleguide-Specimen',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Specimen',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    description: 'Styleguide Specimen Component',
    heading: 'Styleguide Specimen',
  },
  e2eId: 'test-e2e-id',
});

type EditingArgs = StorybookEditingArgs<Props>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>({
  children: null,
  params: {
    name: 'Styleguide-Specimen',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Specimen',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    description: '<span class="jss-border">Styleguide Specimen Component Editing</span>',
    heading: '<span class="jss-border">Styleguide Specimen Editing</span>'
  },
  e2eId: 'test-e2e-id',
 },
 true
);
