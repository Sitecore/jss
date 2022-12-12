import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StyleguideLayoutReuse, {
  StyleguideLayoutReuseProps as Props,
} from './Styleguide-Layout-Reuse';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Layout-Reuse',
  component: StyleguideLayoutReuse,
} as ComponentMeta<typeof StyleguideLayoutReuse>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideLayoutReuse> = (args) => (
  <StyleguideLayoutReuse {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {},
  fields: {
    heading: 'Reusing Content',
    description:
      '<p>JSS provides powerful options to reuse content, whether its sharing a common piece of text across pages or sketching out a site with repeating <em>lorem ipsum</em> content.</p>',
  },
  rendering: {
    uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
    componentName: 'Styleguide-Styleguide-Layout-Reuse',
    dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
    fields: {
      heading: {
        value: 'Reusing Content',
      },
      description: {
        value:
          '<p>JSS provides powerful options to reuse content, whether its sharing a common piece of text across pages or sketching out a site with repeating <em>lorem ipsum</em> content.</p>',
      },
    },
  },
});
Default.decorators = [withSitecoreContext()];
