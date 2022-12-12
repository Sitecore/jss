import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StorybookArgs, withFields } from 'storybook-utils/utils';

import StyleguideFieldUsageCustom, {
  StyleguideFieldUsageCustomProps as Props,
} from './Styleguide-FieldUsage-Custom';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Custom',
  component: StyleguideFieldUsageCustom,
} as ComponentMeta<typeof StyleguideFieldUsageCustom>;

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

const Template: ComponentStory<typeof StyleguideFieldUsageCustom> = (args) => (
  <StyleguideFieldUsageCustom {...args} />
);

type Args = StorybookArgs<Props>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-Custom',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Custom',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Custom Fields',
    description: `<p>
        <small>
          Any Sitecore field type can be consumed by JSS.
          In this sample we consume the <em>Integer</em> field type.<br />
          <strong>Note:</strong> For field types with complex data, custom <code>FieldSerializer</code>s may need to be implemented on the Sitecore side.
        </small>
      </p>`,
    customIntField: 31337,
    },
});
Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
