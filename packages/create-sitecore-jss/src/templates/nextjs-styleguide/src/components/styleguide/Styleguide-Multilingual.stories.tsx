import React from 'react';
import { I18nProvider } from 'next-localization';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideMultilingual, {
  StyleguideMultilingualProps as Props,
} from './Styleguide-Multilingual';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

export default {
  title: 'Components/styleguide/Styleguide-Multilingual',
  component: StyleguideMultilingual,
} as ComponentMeta<typeof StyleguideMultilingual>;

const lngDict = {
  en: {
    'styleguide-sample': 'This text can be translated in en.yml',
  },
};

const Template: ComponentStory<typeof StyleguideMultilingual> = (args) => (
  <StyleguideMultilingual {...args} />
);

type Args = StorybookArgs<Props>;

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-ComponentParams',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Multilingual',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'Translation Patterns',
    description: 'Description',
    sample: 'This text can be translated in en.yml',
  },
  sitecoreContext: {},
});

Default.decorators = [
  (Story) => (
    <I18nProvider lngDict={lngDict} locale="en">
      <Story />
    </I18nProvider>
  ),
  withSitecoreContext(),
];
