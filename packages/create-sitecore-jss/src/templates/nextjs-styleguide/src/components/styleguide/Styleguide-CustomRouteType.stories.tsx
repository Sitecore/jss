import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideCustomRouteType from './Styleguide-CustomRouteType';
import { withSitecoreContext } from 'storybook-utils/utils';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';

export default {
  title: 'Components/styleguide/Styleguide-CustomRouteType',
  component: StyleguideCustomRouteType,
} as ComponentMeta<typeof StyleguideCustomRouteType>;

const Template: ComponentStory<typeof StyleguideCustomRouteType> = StyleguideCustomRouteType;

export const Default = Template.bind({});

Default.decorators = [withSitecoreContext()];

export const Editing = Template.bind({});

const editingLayoutData: LayoutServiceData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: 'nextjs-app',
      },
      language: 'en',
      itemPath: '/',
    },
    route: {
      name: 'home',
      displayName: 'home',
      fields: {
        pageTitle: {
          value: 'Welcome to Sitecore JSS',
        },
        headLine: {
          editable: '<span class="jss-border">A Treatise on Route-Level Fields in JSS</span>',
          value: '',
        },
        author: {
          value: '',
          editable: '<span class="jss-border">Sitecore Editing</span>',
        },
        content: {
          value: '',
          editable:
            '<p class="jss-border">Custom route type fields are good for things like articles, where you may wish to have a filter UI on content fields, such as author or category. Route level fields are easy to query against, whereas component-level fields are not because it\'s possible to remove a component from a route. Note that route level fields <em>cannot be personalized</em> because you cannot conditionally swap out the route item for a different content item.</p>',
        },
      },
      databaseName: 'master',
      deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
      itemId: '45be1451-fa83-5f80-9f0d-d7457b480b58',
      itemLanguage: 'en',
      itemVersion: 1,
      layoutId: '1db67245-f673-5e7f-9726-e7c5e76350f1',
      templateId: '787584c0-a057-5876-9836-f8b3708f0caf',
      templateName: 'App Route',
      placeholders: {},
    },
  },
};

Editing.decorators = [withSitecoreContext({ layoutData: editingLayoutData })];
