import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideLayoutTabsTab, {
  StyleguideLayoutTabsTabProps as Props,
} from './Styleguide-Layout-Tabs-Tab';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

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
