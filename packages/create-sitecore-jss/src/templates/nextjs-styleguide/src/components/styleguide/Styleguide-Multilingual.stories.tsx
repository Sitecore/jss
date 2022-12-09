import React from 'react';
import { I18nProvider } from 'next-localization';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideMultilingual from 'components/styleguide/Styleguide-Multilingual';

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

const Template: ComponentStory<typeof StyleguideMultilingual> = (args) => (
  <StyleguideMultilingual {...args} />
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-ComponentParams',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Multilingual',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: {
      value: 'Translation Patterns',
    },
    description: {
      value: 'Description',
    },
    sample: {
      value: 'This text can be translated in en.yml',
    },
  },
};

Default.decorators = [
  (Story) => (
    <I18nProvider lngDict={lngDict} locale="en">
      <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
        <Story />
      </SitecoreContext>
    </I18nProvider>
  ),
];
