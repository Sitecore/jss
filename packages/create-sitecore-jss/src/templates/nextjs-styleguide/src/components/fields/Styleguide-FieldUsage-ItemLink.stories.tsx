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
    heading: 'Item Link',
    description: `<p>
    <small>
    Item Links are a way to reference another content item to use data from it.
    Referenced items may be shared.
    To reference multiple content items, use a <em>Content List</em> field.<br />
    <strong>Note:</strong> Sitecore does not support inline editing of Item Link fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.
    </small>
    </p>`,
    sharedItemLink: {
      name: 'Name',
      fields: {
        textField: {
          value: 'ItemLink Demo (Shared) Item 1 Text Field',
        },
      },
    },
    localItemLink: {
      name: 'Name',
      fields: {
        textField: {
          value: 'Referenced item textField',
        },
      },
    },
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props, 'sharedItemLink'|'localItemLink'>;

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
    heading: '<span class="jss-border">Item Link Editing</span>',
    description: `<p>
    <small class="jss-border">
    Item Links are a way to reference another content item to use data from it.
    Referenced items may be shared.
    To reference multiple content items, use a <em>Content List</em> field.<br />
    <strong>Note:</strong> Sitecore does not support inline editing of Item Link fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.
    </small>`,
    sharedItemLink: {
      name: 'Name',
      fields: {
        textField: {
          value: 'ItemLink Demo (Shared) Item 1 Text Field',
          editable: '<span class="jss-border">ItemLink Demo (Shared) Item 1 Text Field</span>',
        },
      },
    },
    localItemLink: {
      name: 'Name',
      fields: {
        textField: {
          value: 'Referenced item textField',
          editable: '<span class="jss-border">Referenced item textField</span>',
        },
      },
    },
  },
});
Editing.decorators = [withSitecoreContext()];
