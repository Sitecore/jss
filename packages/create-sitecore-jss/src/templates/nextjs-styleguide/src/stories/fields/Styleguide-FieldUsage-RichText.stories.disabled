import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageRichText from '../../components/fields/Styleguide-FieldUsage-RichText';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-RichText',
  component: StyleguideFieldUsageRichText,
} as ComponentMeta<typeof StyleguideFieldUsageRichText>;

const Template: ComponentStory<typeof StyleguideFieldUsageRichText> = (args) => (
  <StyleguideFieldUsageRichText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-FieldUsage-RichText',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-RichText',
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
        '<p>This is a sample rich text field. <mark>HTML is always supported.</mark> In Sitecore, editors will see a WYSIWYG editor for these fields.</p>',
    },
    sample2: {
      value: `<p>Another sample rich text field, using options. Keep markup entered in rich text fields as simple as possible - ideally bare tags only (no classes). Adding a wrapping class can help with styling within rich text blocks.</p>
        <marquee>But you can use any valid HTML in a rich text field!</marquee>`,
    },
  },
};
