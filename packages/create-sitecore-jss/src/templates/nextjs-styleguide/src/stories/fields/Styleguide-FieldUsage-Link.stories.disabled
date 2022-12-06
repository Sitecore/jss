import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideFieldUsageLink from '../../components/fields/Styleguide-FieldUsage-Link';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Link',
  component: StyleguideFieldUsageLink,
} as ComponentMeta<typeof StyleguideFieldUsageLink>;

const Template: ComponentStory<typeof StyleguideFieldUsageLink> = (args) => (
  <StyleguideFieldUsageLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'Styleguide-FieldUsage-Link',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Link',
  },
  fields: {
    heading: {
      value: 'Heading',
    },
    description: {
      value: 'Description',
    },
    externalLink: {
      value: {
        href: 'https://www.sitecore.com',
        text: 'Link to Sitecore',
      },
    },
    internalLink: {
      value: {
        href: '/',
      },
    },
    emailLink: {
      value: {
        href: 'mailto:foo@bar.com',
        text: 'Send an Email',
      },
    },
    paramsLink: {
      value: {
        href: 'https://dev.sitecore.net',
        text: 'Sitecore Dev Site',
        target: '_blank',
        class: 'font-weight-bold',
        title: '<a> title attribute',
      },
    },
  },
};
