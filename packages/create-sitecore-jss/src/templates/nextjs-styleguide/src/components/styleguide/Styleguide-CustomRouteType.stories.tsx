import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideCustomRouteType from './Styleguide-CustomRouteType';
import { withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-CustomRouteType',
  component: StyleguideCustomRouteType,
} as ComponentMeta<typeof StyleguideCustomRouteType>;

const Template: ComponentStory<typeof StyleguideCustomRouteType> = StyleguideCustomRouteType;

export const Default = Template.bind({});

Default.decorators = [withSitecoreContext()];
