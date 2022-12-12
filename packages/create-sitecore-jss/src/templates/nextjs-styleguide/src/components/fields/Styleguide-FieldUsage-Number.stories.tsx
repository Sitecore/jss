import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StorybookArgs, withFields } from 'storybook-utils/utils';

import StyleguideFieldUsageNumber, {
  StyleguideFieldUsageTextProps as Props,
} from './Styleguide-FieldUsage-Number';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Number',
  component: StyleguideFieldUsageNumber,
} as ComponentMeta<typeof StyleguideFieldUsageNumber>;

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

type Args = StorybookArgs<Props>;

// eslint-disable-next-line react/display-name
const componentFactory = () => () => <div>Test</div>;

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
Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
