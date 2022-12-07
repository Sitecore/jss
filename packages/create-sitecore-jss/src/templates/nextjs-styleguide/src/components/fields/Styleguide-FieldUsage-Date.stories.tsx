import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageDate from 'components/fields/Styleguide-FieldUsage-Date';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Date',
  component: StyleguideFieldUsageDate,
} as ComponentMeta<typeof StyleguideFieldUsageDate>;

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

const Template: ComponentStory<typeof StyleguideFieldUsageDate> = (args) => (
  <StyleguideFieldUsageDate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-FieldUsage-Date',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Date',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: {
      value: 'Heading',
    },
    description: {
      value: 'Description',
    },
    date: {
      value: '2021-09-15T00:00:00Z',
    },
    dateTime: {
      value: '2021-09-15T23:00:00Z',
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
