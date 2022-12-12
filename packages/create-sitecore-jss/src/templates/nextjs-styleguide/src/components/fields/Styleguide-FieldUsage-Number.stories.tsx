import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';
import StyleguideFieldUsageNumber, {
  StyleguideFieldUsageTextProps as Props,
} from './Styleguide-FieldUsage-Number';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Number',
  component: StyleguideFieldUsageNumber,
} as ComponentMeta<typeof StyleguideFieldUsageNumber>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideFieldUsageNumber> = (args) => (
  <StyleguideFieldUsageNumber {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-Number',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Number',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Number',
    description: '<small>Number tells Sitecore to use a number entry for editing.</small>',
    sample: 1.21,
  },
});
Default.decorators = [withSitecoreContext()];
