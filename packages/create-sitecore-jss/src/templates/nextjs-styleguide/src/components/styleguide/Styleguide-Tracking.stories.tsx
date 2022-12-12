import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideTracking, { StyleguideTrackingProps as Props } from './Styleguide-Tracking';
import { ValueFields, withFields } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Tracking',
  component: StyleguideTracking,
} as ComponentMeta<typeof StyleguideTracking>;

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

type Args = Omit<Props, 'fields'> & {
  fields: ValueFields<Props['fields']>;
};

// eslint-disable-next-line react/display-name
const componentFactory = () => () => <div>Test</div>;

const Template: ComponentStory<typeof StyleguideTracking> = (args) => (
  <StyleguideTracking {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  sitecoreContext: {},
  params: {},
  fields: {
    heading: 'Tracking',
    description:
      '<p><small>JSS supports tracking Sitecore analytics events from within apps. Give it a try with this handy interactive demo.</small></p>',
  },
  rendering: {
    uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
    componentName: 'Styleguide-Tracking',
    dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
  },
});
Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
