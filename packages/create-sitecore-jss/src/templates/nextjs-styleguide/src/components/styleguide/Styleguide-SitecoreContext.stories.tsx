import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideSitecoreContext, {
  StyleguideSitecoreContextProps as Props,
} from './Styleguide-SitecoreContext';
import { StorybookArgs, StorybookEditingArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';

type Args = StorybookArgs<Props>;

export default {
  title: 'Components/styleguide/Styleguide-SitecoreContext',
  component: StyleguideSitecoreContext,
  args: withFields<Args, Props>({
    params: {},
    fields: {
      heading: 'Sitecore Context',
      description:
        '<p><small>The Sitecore Context contains route-level data about the current context - for example, <code>pageState</code> enables conditionally executing code based on whether Sitecore is in Experience Editor or not.</small></p>',
    },
    rendering: {
      uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
      componentName: 'Styleguide-SitecoreContext',
      dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
      fields: {
        heading: {
          value: 'Sitecore Context',
        },
        description: {
          value:
            '<p><small>The Sitecore Context contains route-level data about the current context - for example, <code>pageState</code> enables conditionally executing code based on whether Sitecore is in Experience Editor or not.</small></p>',
        },
      },
    },
  }),
} as ComponentMeta<typeof StyleguideSitecoreContext>;

type StoryArgs = typeof StyleguideSitecoreContext;

const Template: ComponentStory<StoryArgs> = (args) => <StyleguideSitecoreContext {...args} />;

export const Default = Template.bind({});

Default.decorators = [withSitecoreContext()];

//EDITING part
type EditingArgs = StorybookEditingArgs<Props, 'heading' | 'description'>;

export const Editing = Template.bind({});

  // title: 'Components/styleguide/Styleguide-SitecoreContext',
  // component: StyleguideSitecoreContext,
  Editing.args = withFields<EditingArgs, Props>(
    {
    params: {},
    fields: {
      heading: {
      value: '',
      editable: '<span class="jss-border">Sitecore Context Editing</span'
      },
      description: {
        value: '',
        editable: '<p><small class="jss-border">The Sitecore Context contains route-level data about the current context - for example, <code>pageState</code> enables conditionally executing code based on whether Sitecore is in Experience Editor or not.</small></p>'
      }
    },
    rendering: {
      uid: '8daff8fe-210a-54c6-b344-ffccef4c4743',
      componentName: 'Styleguide-SitecoreContext',
      dataSource: '{ACFA7F84-7BF5-5877-9C29-72341A2DCEB6}',
      fields: {
        heading: {
          value: 'Sitecore Context',
        },
        description: {
          value:
            '<p><small>The Sitecore Context contains route-level data about the current context - for example, <code>pageState</code> enables conditionally executing code based on whether Sitecore is in Experience Editor or not.</small></p>',
        },
      },
    },
  }, true
  ),

Editing.decorators = [withSitecoreContext()];