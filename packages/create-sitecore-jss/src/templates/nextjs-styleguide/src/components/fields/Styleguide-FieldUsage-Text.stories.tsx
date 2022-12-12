import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideFieldUsageText, {
  StyleguideFieldUsageTextProps as Props,
} from './Styleguide-FieldUsage-Text';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Text',
  component: StyleguideFieldUsageText,
} as ComponentMeta<typeof StyleguideFieldUsageText>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideFieldUsageText> = (args) => (
  <StyleguideFieldUsageText {...args} />
);

export const SingleLine = Template.bind({});
SingleLine.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-Text',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Text',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Single-Line Text',
    description: 'Description',
    sample:
      'This is a sample text field. <mark>HTML is encoded.</mark> In Sitecore, editors will see a <input type="text">.',
    sample2:
      'This is another sample text field using rendering options. <mark>HTML supported with encode=false.</mark> Cannot edit because editable=false.',
  },
});
SingleLine.decorators = [withSitecoreContext()];

export const MultiLine = Template.bind({});
MultiLine.args = {
  params: {
    name: 'Styleguide-FieldUsage-Text',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Text',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: {
      value: 'Multi-Line Text',
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
MultiLine.decorators = [withSitecoreContext()];
