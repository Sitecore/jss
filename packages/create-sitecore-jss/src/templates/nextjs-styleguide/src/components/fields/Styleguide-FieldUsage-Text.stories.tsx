import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideFieldUsageText, {
  StyleguideFieldUsageTextProps as Props,
} from './Styleguide-FieldUsage-Text';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';

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

type EditingArgs = StorybookEditingArgs<Props, 'sample2'>;

export const SingleLineEditing = Template.bind({});
SingleLineEditing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-Text',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-Text',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: "<span class='jss-border'>Single-Line Text Editing</span>",
      description: "<span class='jss-border'>Description Editing</span>",
      sample:
        '<span class="jss-border">This is a sample EDITABLE text field. <mark>HTML is encoded.</mark> In Sitecore, editors will see the following Single-Line Text field: <input type="text"></span>',
      sample2: {
        value:
          'This is another sample text field using rendering options. <mark>HTML supported with encode=false.</mark> Cannot edit because editable=false.',
        editable:
          '<span class="jss-border">This is another sample text field using rendering options. <mark>HTML supported with encode=false.</mark> Cannot edit because editable=false.</span>',
      },
    },
  },
  true
);
SingleLineEditing.decorators = [withSitecoreContext()];

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

export const MultiLineEditing = Template.bind({});
MultiLineEditing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-Text',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-Text',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: "<span class='jss-border'>Multi-Line Text Editing</span>",
      description: "<span class='jss-border'>Description Editing</span>",
      sample:
        '<span class="jss-border">This is a sample EDITABLE multi-line text field. <mark>HTML is encoded.</mark> In Sitecore, editors will see a textarea.</span>',
      sample2: {
        value:
          'This is another sample multi-line text field using rendering options. <mark>HTML supported with encode=false.</mark>',
        editable:
          '<span class="jss-border">This is another sample multi-line text field using rendering options. <mark>HTML supported with encode=false.</mark></span>',
      },
    },
  },
  true
);
MultiLineEditing.decorators = [withSitecoreContext()];
