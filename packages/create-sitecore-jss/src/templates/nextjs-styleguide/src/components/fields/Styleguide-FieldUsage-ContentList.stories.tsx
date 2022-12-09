import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageContentList from './Styleguide-FieldUsage-ContentList';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-ContentList',
  component: StyleguideFieldUsageContentList,
} as ComponentMeta<typeof StyleguideFieldUsageContentList>;

const Template: ComponentStory<typeof StyleguideFieldUsageContentList> = (args) => (
  <StyleguideFieldUsageContentList {...args} />
);

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

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-FieldUsage-ContentList',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-ContentList',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: {
      value: 'Content List',
    },
    description: {
      value: `<p>
        <small>
          Content Lists are a way to reference zero or more other content items.
          Referenced items may be shared.
          To reference a single content item, use an <em>Item Link</em> field.<br />
          <strong>Note:</strong> Sitecore does not support inline editing of Content List fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.
        </small>
      </p>`,
    },
    sharedContentList: [
      {
        name: 'Name',
        fields: {
          textField: {
            value: 'ContentList Demo (Shared) Item 1 Text Field',
          },
        },
      },
    ],
    localContentList: [
      {
        name: 'Name',
        fields: {
          textField: {
            value: 'ContentList Demo (Local) Item 2 Text Field',
          },
        },
      },
    ],
  },
};
Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
