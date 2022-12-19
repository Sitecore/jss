import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';
import StyleguideFieldUsageFile, {
  StyleguideFieldUsageFileProps as Props,
} from './Styleguide-FieldUsage-File';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-File',
  component: StyleguideFieldUsageFile,
} as ComponentMeta<typeof StyleguideFieldUsageFile>;

const Template: ComponentStory<typeof StyleguideFieldUsageFile> = (args) => (
  <StyleguideFieldUsageFile {...args} />
);

type Args = StorybookArgs<Props>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-File',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-File',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'File',
    description:
      '<small>Note: Sitecore does not support inline editing of File fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.</small>',
    file: {
      src: '/data/media/files/jss.pdf',
      title: 'Example File',
      description: 'This data will be added to the Sitecore Media Library on import',
    },
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props, 'file'>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-File',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-File',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: "<span class='jss-border'>File Editing</span>",
      description:
        "<small class='jss-border'>Note: Sitecore does not support inline editing of File fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.</small>",
      file: {
        value: {
          src: '/data/media/files/jss.pdf',
          title: 'Example File',
          description: 'This data will be added to the Sitecore Media Library on import',
        },
      },
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];
