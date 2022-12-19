import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideFieldUsageItemLink, {
  StyleguideFieldUsageItemLinkProps as Props,
} from './Styleguide-FieldUsage-ItemLink';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-ItemLink',
  component: StyleguideFieldUsageItemLink,
} as ComponentMeta<typeof StyleguideFieldUsageItemLink>;

type Args = StorybookArgs<Props, 'sharedItemLink' | 'localItemLink'>;

const Template: ComponentStory<typeof StyleguideFieldUsageItemLink> = (args) => (
  <StyleguideFieldUsageItemLink {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-ItemLink',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-ItemLink',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Heading',
    description: 'Description',
    sharedItemLink: {
      name: 'Name',
      fields: {
        textField: {
          value: 'ContentList Demo (Shared) Item 1 Text Field',
        },
      },
    },
    localItemLink: {
      name: 'Name',
      fields: {
        textField: {
          value: 'ContentList Demo (Shared) Item 2 Text Field',
        },
      },
    },
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>({
  params: {
    name: 'Styleguide-FieldUsage-ItemLink',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-ItemLink',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: '<span class="jss-border">Heading Editing</span>',
    description: '<span class="jss-border">Description Editing</span>',
    sharedItemLink: {
      name: 'Name',
      fields: {
        textField: {
          value: 'ContentList Demo (Shared) Item 1 Text Field',
        },
      },
    },
    localItemLink: {
      name: 'Name',
      fields: {
        textField: {
          value: 'ContentList Demo (Shared) Item 2 Text Field',
        },
      },
    },
  },
});
Editing.decorators = [withSitecoreContext()];
