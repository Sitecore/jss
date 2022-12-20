import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideLayoutTabsTab, {
  StyleguideLayoutTabsTabProps as Props,
} from './Styleguide-Layout-Tabs-Tab';
import {
  StorybookArgs,
  StorybookEditingArgs,
  withFields,
  withSitecoreContext,
} from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Layout-Tabs-Tab',
  component: StyleguideLayoutTabsTab,
} as ComponentMeta<typeof StyleguideLayoutTabsTab>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideLayoutTabsTab> = (args) => (
  <StyleguideLayoutTabsTab {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-Layout-Tabs-Tab',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Layout-Tabs-Tab',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    title: 'Tab 1',
    content: '<p>Tab 1 contents!</p>',
  },
});
Default.decorators = [withSitecoreContext()];

type EditingArgs = StorybookEditingArgs<Props, 'title' | 'content'>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {
      name: 'Styleguide-Layout-Tabs-Tab',
    },
    rendering: {
      uid: '{00000000-0000-0000-0000-000000000000}',
      componentName: 'Styleguide-Layout-Tabs-Tab',
      dataSource: '{00000000-0000-0000-0000-000000000000}',
    },
    fields: {
      title: {
        value: 'Tab 1',
        editable: '<span class="jss-border">Tab 1</span>',
      },
      content: {
        value: '<p>Tab 1 contents!</p>',
        editable: '<p class="jss-border">Tab 1 contents!</p>',
      },
    },
  },
  true
);
Editing.decorators = [withSitecoreContext()];
