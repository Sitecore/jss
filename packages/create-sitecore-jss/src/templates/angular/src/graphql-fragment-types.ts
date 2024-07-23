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
            name: 'C__StandardTemplate',
          },
          {
            name: 'C__Route',
          },
          {
            name: 'RenderEngineType',
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
