import { EDITING_COMPONENT_PLACEHOLDER } from '@sitecore-jss/sitecore-jss/layout';
import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss/src/layout';

const basicPage = {
  path: '/Styleguide',
  layoutData: {
    sitecore: {
      context: {
        pageEditing: false,
        user: {
          domain: 'sitecore',
          name: 'Admin',
        },
        site: {
          name: 'JssNextWeb',
        },
        pageState: LayoutServicePageState.Normal,
        language: 'en',
        itemPath: '/Styleguide',
      },
      route: {
        name: 'Styleguide',
        displayName: 'Styleguide',
        fields: {
          pageTitle: {
            value: 'Styleguide | Sitecore JSS',
          },
        },
        databaseName: 'master',
        deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
        itemId: '52961eea-bafd-5287-a532-a72e36bd8a36',
        itemLanguage: 'en',
        itemVersion: 1,
        layoutId: '4092f843-b14e-5f7a-9ae6-3ed9f5c2b919',
        templateId: 'ca5a5aeb-55ae-501b-bb10-d37d009a97e1',
        templateName: 'App Route',
        placeholders: {},
      },
    },
  },
};

// default setup for placeholder-less component
const contentBlock = [
  {
    uid: 'test-content',
    componentName: 'ContentBlock',
    dataSource: '{FC218D50-FC56-5B2B-99BA-38D570A83386}',
    params: {},
    fields: {
      content: {
        value: '<p>This is a live set of examples of how to use JSS</p>\r\n',
      },
      heading: {
        value: 'JSS Styleguide',
      },
    },
    placeholders: {},
  },
];

// content for placeholder-yes component
const innerBlock = [
  {
    uid: 'test-inner',
    componentName: 'InnerBlock',
    params: {},
    fields: {
      text: {
        value: 'Its an inner component',
      },
    },
  },
];

export const getTestLayoutData = (placeholder?: boolean) => {
  // making hard copies to not have layout modified
  const layout = JSON.parse(JSON.stringify(basicPage));
  const content = JSON.parse(JSON.stringify(contentBlock));
  if (placeholder) {
    content[0].placeholders.inner = innerBlock;
  }
  layout.layoutData.sitecore.route.placeholders[EDITING_COMPONENT_PLACEHOLDER] = content;
  return layout;
};
