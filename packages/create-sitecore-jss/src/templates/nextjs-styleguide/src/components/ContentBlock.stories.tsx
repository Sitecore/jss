import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';
import ContentBlock, { ContentBlockProps as Props } from './ContentBlock';

export default {
  title: 'Components/ContentBlock',
  component: ContentBlock,
} as ComponentMeta<typeof ContentBlock>;

const Template: ComponentStory<typeof ContentBlock> = (args) => <ContentBlock {...args} />;

type Args = StorybookArgs<Props>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'ContentBlock',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'ContentBlock',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Heading',
    content: 'Content',
  },
});

Default.decorators = [withSitecoreContext()];
