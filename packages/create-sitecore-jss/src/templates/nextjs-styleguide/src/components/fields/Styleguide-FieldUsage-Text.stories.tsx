import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageText from './Styleguide-FieldUsage-Text';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Text',
  component: StyleguideFieldUsageText,
} as ComponentMeta<typeof StyleguideFieldUsageText>;

const layoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: '<%- appName %>',
      },
      language: 'en',
      itemPath: '/',
    },
    route: {
      name: 'home',
      displayName: 'home',
      fields: {
        pageTitle: {
          value: 'Welcome to Sitecore JSS',
        },
      },
      databaseName: 'master',
      deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
      itemId: '45be1451-fa83-5f80-9f0d-d7457b480b58',
      itemLanguage: 'en',
      itemVersion: 1,
      layoutId: '1db67245-f673-5e7f-9726-e7c5e76350f1',
      templateId: '787584c0-a057-5876-9836-f8b3708f0caf',
      templateName: 'App Route',
      placeholders: {},
    },
  },
};

// eslint-disable-next-line react/display-name
const componentFactory = () => () => <div>Test</div>;

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
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: {
      value: 'Single-Line Text',
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
SingleLine.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];

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
MultiLine.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
