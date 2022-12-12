import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideLayoutTabs, { StyleguideLayoutTabsProps as Props } from './Styleguide-Layout-Tabs';
import StyleguideLayoutTabsTab from './Styleguide-Layout-Tabs-Tab';
import { StorybookArgs, withFields } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Layout-Tabs',
  component: StyleguideLayoutTabs,
} as ComponentMeta<typeof StyleguideLayoutTabs>;

const tabsPlaceholder = [
  {
    uid: 'fce4dbf1-a017-580c-b9dd-8f2d603a55ff',
    componentName: 'Styleguide-Layout-Tabs-Tab',
    dataSource: '{C926AEE0-BAA5-51A8-9BB7-3798820A87BC}',
    params: {},
    fields: {
      title: {
        value: 'Tab 1',
      },
      content: {
        value: '<p>Tab 1 contents!</p>',
      },
    },
  },
  {
    uid: '20a263a1-6b62-59d8-922a-298ef9c8d6f4',
    componentName: 'Styleguide-Layout-Tabs-Tab',
    dataSource: '{C46EF05E-CA72-5041-A25D-0D43DCEA3409}',
    params: {},
    fields: {
      title: {
        value: 'Tab 2',
      },
      content: {
        value: '<p>Tab 2 contents!</p>',
      },
    },
  },
  {
    uid: '277b3a8b-6316-56d6-a3bc-c7816090ab76',
    componentName: 'Styleguide-Layout-Tabs-Tab',
    dataSource: '{90163B93-F60A-5A78-B25A-88E4EEAE24F7}',
    params: {},
    fields: {
      title: {
        value: 'Tab 3',
      },
      content: {
        value: '<p>Tab 3 contents!</p>',
      },
    },
  },
];

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
      placeholders: {
        '<%- helper.getAppPrefix(appPrefix, appName) %>jss-tabs': tabsPlaceholder,
      },
    },
  },
};

const components = new Map();
components.set('Styleguide-Layout-Tabs-Tab', StyleguideLayoutTabsTab);
// eslint-disable-next-line react/display-name
const componentFactory = (name: string) => components.get(name);

const Template: ComponentStory<typeof StyleguideLayoutTabs> = (args) => (
  <StyleguideLayoutTabs {...args} />
);

type Args = StorybookArgs<Props>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-Layout-Tabs',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Layout-Tabs',
    placeholders: {
      'NextjsApp-jss-tabs': tabsPlaceholder,
    },
    params: {},
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Tabs',
    description:
        "<p>Creating hierarchical components like tabs is made simpler in JSS because it's easy to introspect the layout structure.</p>",
    },
  name: '',
  sitecoreContext: {},
  tabsPlaceholder: [],
});

Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
