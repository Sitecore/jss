import React from 'react';
import { I18nProvider } from 'next-localization';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideMultilingual, {
  StyleguideMultilingualProps as Props,
} from './Styleguide-Multilingual';
import { ValueFields, withFields } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Multilingual',
  component: StyleguideMultilingual,
} as ComponentMeta<typeof StyleguideMultilingual>;

const lngDict = {
  en: {
    'styleguide-sample': 'This text can be translated in en.yml',
  },
};
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

const Template: ComponentStory<typeof StyleguideMultilingual> = (args) => (
  <StyleguideMultilingual {...args} />
);

type Args = Omit<Props, 'fields'> & {
  fields: ValueFields<Props['fields']>;
};

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-ComponentParams',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Multilingual',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Translation Patterns',
    description: 'Description',
    sample: 'This text can be translated in en.yml',
    },
  sitecoreContext: {},
});

Default.decorators = [
  (Story) => (
    <I18nProvider lngDict={lngDict} locale="en">
      <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
        <Story />
      </SitecoreContext>
    </I18nProvider>
  ),
];
