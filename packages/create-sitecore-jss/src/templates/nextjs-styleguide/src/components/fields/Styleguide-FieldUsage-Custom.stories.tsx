import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';

import StyleguideFieldUsageCustom, {
  StyleguideFieldUsageCustomProps as Props,
} from './Styleguide-FieldUsage-Custom';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-Custom',
  component: StyleguideFieldUsageCustom,
} as ComponentMeta<typeof StyleguideFieldUsageCustom>;

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
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-FieldUsage-Custom',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-FieldUsage-Custom',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      heading: '<span class="jss-border">Custom Fields Editing</span>',
      description: `<p>
        <small class="jss-border">
          Any Sitecore field type can be consumed by JSS.
          In this sample we consume the <em>Integer</em> field type.<br />
          <strong>Note:</strong> For field types with complex data, custom <code>FieldSerializer</code>s may need to be implemented on the Sitecore side.
        </small>
      </p>`,
      customIntField: '<span class="jss-border">31337</span>'
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];
