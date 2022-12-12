import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';
import StyleguideFieldUsageLink, {
  StyleguideFieldUsageLinkProps as Props,
} from './Styleguide-FieldUsage-Link';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Link',
  component: StyleguideFieldUsageLink,
} as ComponentMeta<typeof StyleguideFieldUsageLink>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideFieldUsageLink> = (args) => (
  <StyleguideFieldUsageLink {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-Link',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-Link',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'General Link',
    description:
      '<p>A <em>General Link</em> is a field that represents an <code>&lt;a&gt;</code> tag.</p>',
    externalLink: {
      href: 'https://www.sitecore.com',
      text: 'Link to Sitecore',
    },
    internalLink: {
      href: '/',
    },
    emailLink: {
      href: 'mailto:foo@bar.com',
      text: 'Send an Email',
    },
    paramsLink: {
      href: 'https://dev.sitecore.net',
      text: 'Sitecore Dev Site',
      target: '_blank',
      class: 'font-weight-bold',
      title: '<a> title attribute',
    },
  },
});
Default.decorators = [withSitecoreContext()];
