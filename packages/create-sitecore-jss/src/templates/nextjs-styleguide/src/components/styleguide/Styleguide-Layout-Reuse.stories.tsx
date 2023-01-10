import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideLayoutReuse, { StyleguideLayoutReuseProps as Props } from './Styleguide-Layout-Reuse';
import { StorybookArgs, StorybookEditingArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';
import { Default as ContentBlockStory } from './../ContentBlock.stories';
import ContentBlock from './../ContentBlock';

export default {
  title: 'Components/styleguide/Styleguide-Layout-Reuse',
  component: StyleguideLayoutReuse,
} as ComponentMeta<typeof StyleguideLayoutReuse>;

type Args = StorybookArgs<Props>;

const components = new Map();
components.set('ContentBlock', ContentBlock);
// eslint-disable-next-line react/display-name
const componentFactory = (name: string) => components.get(name);

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
    placeholders: {
      'NextjsApp-jss-reuse-example': [
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'ContentBlock',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          fields: ContentBlockStory.args?.fields,
        },
      ],
    },
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
Default.decorators = [withSitecoreContext({ componentFactory })];

type EditingArgs = StorybookEditingArgs<Props>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>(
  {
    params: {},
    fields: {
      heading: '<span class="jss-border">Reusing Content Editing</span>',
      description:
          '<p class="jss-border">JSS provides powerful options to reuse content, whether its sharing a common piece of text across pages or sketching out a site with repeating <em>lorem ipsum</em> content.</p>'
    },
    rendering: {
      uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
      componentName: 'Styleguide-Styleguide-Layout-Reuse',
      dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
      placeholders: {
        'NextjsApp-jss-reuse-example': [
          {
            uid: '1846c499-afa7-56c4-bade-e3880eac0134',
            componentName: 'ContentBlock',
            dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
            fields: {
              heading: {
                value: '',
                editable: '<span class="jss-border">Heading Editing</span>'
              },
              content: {
                value: '',
                editable: '<span class="jss-border">Content Editing</span>'
              },
            },
          },
        ],
      },
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
  },
  true
);
Editing.decorators = [withSitecoreContext({ componentFactory })];
