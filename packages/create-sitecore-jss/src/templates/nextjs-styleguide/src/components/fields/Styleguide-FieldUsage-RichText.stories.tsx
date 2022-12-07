import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageRichText from 'components/fields/Styleguide-FieldUsage-RichText';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-RichText',
  component: StyleguideFieldUsageRichText,
} as ComponentMeta<typeof StyleguideFieldUsageRichText>;

const layoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: 'NextjsApp',
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
    dataSource: '{00000000-0000-0000-0000-000000000000}',
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
Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
