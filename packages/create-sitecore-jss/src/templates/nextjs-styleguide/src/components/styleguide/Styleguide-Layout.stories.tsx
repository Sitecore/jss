import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withSitecoreContext } from 'storybook-utils/utils';
import StyleguideLayout from './Styleguide-Layout';
import { SingleLine, MultiLine } from '../fields/Styleguide-FieldUsage-Text.stories';
import StyleguideFieldUsageText from './../fields/Styleguide-FieldUsage-Text';
import StyleguideSection from './Styleguide-Section';

export default {
  title: 'Components/styleguide/Styleguide-Layout',
  component: StyleguideLayout,
} as ComponentMeta<typeof StyleguideLayout>;

const components = new Map();
components.set('Styleguide-Section', StyleguideSection);
components.set('Styleguide-FieldUsage-Text', StyleguideFieldUsageText);
// eslint-disable-next-line react/display-name
const componentFactory = (name: string) => components.get(name);

const Template: ComponentStory<typeof StyleguideLayout> = (args) => <StyleguideLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-Layout',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Layout',
    placeholders: {
      '<%- helper.getAppPrefix(appPrefix, appName) %>jss-styleguide-layout': [
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'Styleguide-Section',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          placeholders: {
            '<%- helper.getAppPrefix(appPrefix, appName) %>jss-styleguide-section': [
              {
                uid: '1846c499-afa7-56c4-bade-e3880eac0134',
                componentName: 'Styleguide-FieldUsage-Text',
                dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
                fields: SingleLine.args?.fields,
              },
              {
                uid: '1846c499-afa7-56c4-bade-e3880eac0134',
                componentName: 'Styleguide-FieldUsage-Text',
                dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
                fields: MultiLine.args?.fields,
              },
            ],
          },
          fields: {
            heading: {
              value: 'Content Data',
            },
          },
        },
      ],
    },
  },
};

Default.decorators = [withSitecoreContext({ componentFactory })];
