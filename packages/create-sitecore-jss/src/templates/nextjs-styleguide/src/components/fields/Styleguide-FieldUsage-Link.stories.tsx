import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageLink from 'components/fields/Styleguide-FieldUsage-Link';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Link',
  component: StyleguideFieldUsageLink,
} as ComponentMeta<typeof StyleguideFieldUsageLink>;

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

const Template: ComponentStory<typeof StyleguideFieldUsageLink> = (args) => (
  <StyleguideFieldUsageLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-FieldUsage-Link',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Link',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: {
      value: 'Heading',
    },
    description: {
      value: 'Description',
    },
    externalLink: {
      value: {
        href: 'https://www.sitecore.com',
        text: 'Link to Sitecore',
      },
    },
    internalLink: {
      value: {
        href: '/',
      },
    },
    emailLink: {
      value: {
        href: 'mailto:foo@bar.com',
        text: 'Send an Email',
      },
    },
    paramsLink: {
      value: {
        href: 'https://dev.sitecore.net',
        text: 'Sitecore Dev Site',
        target: '_blank',
        class: 'font-weight-bold',
        title: '<a> title attribute',
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
