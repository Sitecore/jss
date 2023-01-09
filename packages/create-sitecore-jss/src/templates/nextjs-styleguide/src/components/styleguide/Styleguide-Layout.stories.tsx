import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withSitecoreContext } from 'storybook-utils/utils';
import StyleguideLayout from './Styleguide-Layout';
import { SingleLine, MultiLine } from '../fields/Styleguide-FieldUsage-Text.stories';
import StyleguideFieldUsageText from './../fields/Styleguide-FieldUsage-Text';
import StyleguideSection from './Styleguide-Section';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';

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
      'NextjsApp-jss-styleguide-layout': [
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'Styleguide-Section',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          placeholders: {
            'NextjsApp-jss-styleguide-section': [
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

export const Editing = Template.bind({});

Editing.args = {
  params: {
    name: 'Styleguide-Layout Editing',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Layout',
    placeholders: {
      'NextjsApp-jss-styleguide-layout': [
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'Styleguide-Section',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          placeholders: {
            'NextjsApp-jss-styleguide-section': [
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
              editable: '<span class="jss-border">Content Data Editing</span>',
              value: 'Content Data',
            },
          },
        },
      ],
    },
  },
};

Editing.decorators = [withSitecoreContext({ componentFactory })];
