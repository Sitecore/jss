import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSitecoreContext, {
  StyleguideSitecoreContextProps as Props,
} from './Styleguide-SitecoreContext';
import { StorybookArgs, withFields } from 'storybook-utils/utils';

const layoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: '<%- appName %>',
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
      },
      databaseName: 'master',
      deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
      itemId: '45be1451-fa83-5f80-9f0d-d7457b480b58',
      itemLanguage: 'en',
      itemVersion: 1,
      layoutId: '1db67245-f673-5e7f-9726-e7c5e76350f1',
      templateId: '787584c0-a057-5876-9836-f8b3708f0caf',
      templateName: 'App Route',
      placeholders: {
        '<%- helper.getAppPrefix(appPrefix, appName) %>jss-main': [
          {
            uid: '3464271b-705f-5f98-b59c-0b1560a70641',
            componentName: 'ContentBlock',
            dataSource: '{FF9EA4CA-02B4-5D65-ABC5-7D860DBCD0C6}',
            fields: {
              heading: {
                value: 'Welcome to Sitecore JSS',
              },
              content: {
                value:
                  '<p>Thanks for using JSS!! Here are some resources to get you started:</p>\n\n<h3><a href="https://jss.sitecore.com" rel="noopener noreferrer">Documentation</a></h3>\n<p>The official JSS documentation can help you with any JSS task from getting started to advanced techniques.</p>\n\n<h3><a href="/styleguide">Styleguide</a></h3>\n<p>The JSS styleguide is a living example of how to use JSS, hosted right in this app.\nIt demonstrates most of the common patterns that JSS implementations may need to use,\nas well as useful architectural patterns.</p>\n\n<h3><a href="/graphql">GraphQL</a></h3>\n<p>JSS features integration with the Sitecore GraphQL API to enable fetching non-route data from Sitecore - or from other internal backends as an API aggregator or proxy.\nThis route is a living example of how to use an integrate with GraphQL data in a JSS app.</p>\n\n<div class="alert alert-dark">\n  <h4>This app is a boilerplate</h4>\n  <p>The JSS samples are a boilerplate, not a library. That means that any code in this app is meant for you to own and customize to your own requirements.</p>\n  <p>Want to change the lint settings? Do it. Want to read manifest data from a MongoDB database? Go for it. This app is yours.</p>\n</div>\n\n<div class="alert alert-dark">\n  <h4>How to start with an empty app</h4>\n  <p>To start with a fresh app with no boilerplate, run <code>jss create {name of your app} nextjs --empty</code>. Note, disconnected mode is not supported this way</p>\n  <p>To remove all of the default sample content (the Styleguide and GraphQL routes) and start out with an empty JSS app:</p>\n  <ol>\n    <li>Delete <code>/data/dictionary/*.yml</code></li>\n    <li>Delete <code>/data/routes/styleguide</code> and <code>/data/routes/graphql</code></li>\n    <li>Delete <code>/data/content/Styleguide</code></li>\n    <li>Delete <code>/data/component-content/Styleguide</code></li>\n    <li>Delete <code>/sitecore/definitions/components/Styleguide*</code>, <code>/sitecore/definitions/templates/Styleguide*</code>, and <code>/sitecore/definitions/components/GraphQL*</code></li>\n    <li>Delete <code>graphql-let</code> command from <code>bootstrap</code> npm command in <code>package.json</code> until you create <code>.graphql</code> files</li>\n    <li>Delete <code>/src/components/*</code></li>\n  </ol>\n</div>\n',
              },
            },
          },
        ],
      },
    },
  },
};

// eslint-disable-next-line react/display-name
const componentFactory = () => () => <div>Test</div>;

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

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<StoryArgs> = (args) => <StyleguideSitecoreContext {...args} />;

export const Default = Template.bind({});

Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
