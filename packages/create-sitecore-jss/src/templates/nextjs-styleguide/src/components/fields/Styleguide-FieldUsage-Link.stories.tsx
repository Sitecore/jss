import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';
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

type EditingArgs = StorybookEditingArgs<Props>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-Link',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-Link',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: '<span class="jss-border">General Link Editing</span>',
      description:
        '<p class="jss-border">A <em>General Link</em> is a field that represents an <code>&lt;a&gt;</code> tag.</p>',

      externalLink: {
        value: {
          text: 'Link to Sitecore',
          href: 'https://www.sitecore.com',
        },
        editableFirstPart: '<span class="jss-border">https://www.sitecore.com</span>',
        editableLastPart: '<span class="jss-border">Link to Sitecore</span>',
      },
      internalLink: {
        value: {
          href: '/',
        },
        editableFirstPart: '<span class="jss-border">/</span>',
      },
      emailLink: {
        value: {
          href: 'mailto:foo@bar.com',
          text: 'Send an Email',
        },
        editableFirstPart: '<span class="jss-border">mailto:foo@bar.com</span>',
        editableLastPart: '<span class="jss-border">Send an Email</span>',
      },
      paramsLink: {
        value: {
          href: 'https://dev.sitecore.net',
          text: 'Sitecore Dev Site',
          target: '_blank',
          class: 'font-weight-bold',
          title: '<a> title attribute',
        },
        editableFirstPart: '<span class="jss-border">https://dev.sitecore.net</span>',
        editableLastPart: '<span class="jss-border">Sitecore Dev Site</span>',
      },
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];
