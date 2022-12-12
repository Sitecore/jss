import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideTracking, { StyleguideTrackingProps as Props } from './Styleguide-Tracking';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Tracking',
  component: StyleguideTracking,
} as ComponentMeta<typeof StyleguideTracking>;

type Args = StorybookArgs<Props>;

const Template: ComponentStory<typeof StyleguideTracking> = (args) => (
  <StyleguideTracking {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  sitecoreContext: {},
  params: {},
  fields: {
    heading: 'Tracking',
    description:
      '<p><small>JSS supports tracking Sitecore analytics events from within apps. Give it a try with this handy interactive demo.</small></p>',
  },
  rendering: {
    uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
    componentName: 'Styleguide-Tracking',
    dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
  },
});
Default.decorators = [withSitecoreContext()];
