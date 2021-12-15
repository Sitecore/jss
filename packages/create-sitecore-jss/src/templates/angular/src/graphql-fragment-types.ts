/* eslint-disable */
export default {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'ItemField',
        possibleTypes: [
          {
            name: 'RichTextField',
          },
          {
            name: 'NumberField',
          },
          {
            name: 'MultilistField',
          },
          {
            name: 'LookupField',
          },
          {
            name: 'LinkField',
          },
          {
            name: 'TextField',
          },
          {
            name: 'IntegerField',
          },
          {
            name: 'ImageField',
          },
          {
            name: 'DateField',
          },
          {
            name: 'CheckboxField',
          },
          {
            name: 'NameValueListField',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'Item',
        possibleTypes: [
          {
            name: 'UnknownItem',
          },
          {
            name: 'StyleguideComponentParamsRenderingParameters',
          },
          {
            name: 'C__StandardTemplate',
          },
          {
            name: 'C__Route',
          },
          {
            name: 'RenderEngineType',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideTracking',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideSitecoreContext',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideSection',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideRouteFields',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideMultilingual',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideLayoutTabsTab',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideLayoutTabs',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideLayoutReuse',
          },
          {
            name:
              '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideItemLinkItemTemplate',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageText',
          },
          {
            name:
              '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageRichText',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageNumber',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageLink',
          },
          {
            name:
              '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageItemLink',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageImage',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageFile',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageDate',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageCustom',
          },
          {
            name:
              '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageContentList',
          },
          {
            name:
              '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideFieldUsageCheckbox',
          },
          {
            name:
              '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideExplanatoryComponent',
          },
          {
            name:
              '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideContentListItemTemplate',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideComponentParams',
          },
          {
            name:
              '<%- helper.getAppPrefix(appPrefix, appName, false) %>StyleguideAngularLazyLoading',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>GraphQLIntegratedDemo',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>GraphQLConnectedDemo',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>ExampleCustomRouteType',
          },
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>ContentBlock',
          },
          {
            name: 'C__<%- helper.getAppPrefix(appPrefix, appName, false) %>AppRoute',
          },
          {
            name: 'JsonRendering',
          },
          {
            name: 'JavaScriptRendering',
          },
          {
            name: 'JSSLayout',
          },
          {
            name: 'App',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'RenderingOptions',
        possibleTypes: [
          {
            name: 'JsonRendering',
          },
          {
            name: 'JavaScriptRendering',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'Layout',
        possibleTypes: [
          {
            name: 'JSSLayout',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>AppRoute',
        possibleTypes: [
          {
            name: '<%- helper.getAppPrefix(appPrefix, appName, false) %>ExampleCustomRouteType',
          },
          {
            name: 'C__<%- helper.getAppPrefix(appPrefix, appName, false) %>AppRoute',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'Caching',
        possibleTypes: [
          {
            name: 'JsonRendering',
          },
          {
            name: 'JavaScriptRendering',
          },
        ],
      },
    ],
  },
};
