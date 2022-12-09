import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideLayoutReuse from './Styleguide-Layout-Reuse';

export default {
  title: 'Components/styleguide/Styleguide-Layout-Reuse',
  component: StyleguideLayoutReuse,
} as ComponentMeta<typeof StyleguideLayoutReuse>;

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

const Template: ComponentStory<typeof StyleguideLayoutReuse> = (args) => (
  <StyleguideLayoutReuse {...args} />
);

export const Default = Template.bind({});
Default.args = {
  fields: {
    heading: {
      value: 'Reusing Content',
    },
    description: {
      value:
        '<p>JSS provides powerful options to reuse content, whether its sharing a common piece of text across pages or sketching out a site with repeating <em>lorem ipsum</em> content.</p>',
    },
  },
  rendering: {
    uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
    componentName: 'Styleguide-Styleguide-Layout-Reuse',
    dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
    fields: {
      heading: {
        value: 'Sitecore Context',
      },
      description: {
        value:
          '<p>JSS provides powerful options to reuse content, whether its sharing a common piece of text across pages or sketching out a site with repeating <em>lorem ipsum</em> content.</p>',
      },
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
