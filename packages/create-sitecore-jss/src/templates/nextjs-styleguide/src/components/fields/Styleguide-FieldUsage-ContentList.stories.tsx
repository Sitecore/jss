import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';
import StyleguideFieldUsageContentList, {
  StyleguideFieldUsageContentListProps as Props,
} from './Styleguide-FieldUsage-ContentList';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-ContentList',
  component: StyleguideFieldUsageContentList,
} as ComponentMeta<typeof StyleguideFieldUsageContentList>;

const Template: ComponentStory<typeof StyleguideFieldUsageContentList> = (args) => (
  <StyleguideFieldUsageContentList {...args} />
);

type Args = StorybookArgs<Props, 'localContentList' | 'sharedContentList'>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-ContentList',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-ContentList',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Content List',
    description: `<p>
        <small>
          Content Lists are a way to reference zero or more other content items.
          Referenced items may be shared.
          To reference a single content item, use an <em>Item Link</em> field.<br />
          <strong>Note:</strong> Sitecore does not support inline editing of Content List fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.
        </small>
      </p>`,
    sharedContentList: [
      {
        name: 'Name',
        fields: {
          textField: {
            value: 'ContentList Demo (Shared) Item 1 Text Field',
          },
        },
      },
    ],
    localContentList: [
      {
        name: 'Name',
        fields: {
          textField: {
            value: 'ContentList Demo (Local) Item 2 Text Field',
          },
        },
      },
    ],
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<
  Props,
  'heading' | 'description' | 'localContentList' | 'sharedContentList'
>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>({
  params: {
    name: 'Styleguide-FieldUsage-ContentList',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-ContentList',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: {
      value: 'Content List Editing',
      editable: '<span class="jss-border">Content List Editing</span>',
    },
    description: {
      value: `<p>
      <small>
        Content Lists are a way to reference zero or more other content items.
        Referenced items may be shared.
        To reference a single content item, use an <em>Item Link</em> field.<br />
        <strong>Note:</strong> Sitecore does not support inline editing of Content List fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.
      </small>
    </p>`,
      editable: `<p>
        <small class="jss-border">
          Content Lists are a way to reference zero or more other content items.
          Referenced items may be shared.
          To reference a single content item, use an <em>Item Link</em> field.<br />
          <strong>Note:</strong> Sitecore does not support inline editing of Content List fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.
        </small>
      </p>`,
    },
    sharedContentList: [
      {
        name: 'Name',
        fields: {
          textField: {
            value: 'ContentList Demo (Shared) Item 1 Text Field',
            editable: '<span class="jss-border">ContentList Demo (Shared) Item 1 Text Field</span>',
          },
        },
      },
    ],
    localContentList: [
      {
        name: 'Name',
        fields: {
          textField: {
            value: 'ContentList Demo (Local) Item 2 Text Field',
            editable: '<span class="jss-border">ContentList Demo (Local) Item 2 Text Field</span>',
          },
        },
      },
    ],
  },
}, true
);
Editing.decorators = [withSitecoreContext()];
