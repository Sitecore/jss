---
name: customizing-disconnected
routeTemplate: ./data/component-templates/article.yml
title: Customizing Disconnected Data
---

# Customizing Disconnected Data

When disconnected mode starts up, it creates a mock version of the JSS services that would run in connected mode on Sitecore.

These mock services may need to be customized to account for [server-side customizations](/docs/techniques/extending-layout-service/extending-layout-service-overview) to Layout Service, so that disconnected mode receives the same customizations.

## The Disconnected Mode Proxy

Disconnected mode starts up a local HTTP server to run the mock APIs. This is defined in the sample apps in `scripts/disconnected-mode-proxy`, and this is what will be customized when you want to alter the disconnected mode data.

The default disconnected mode proxy comes with a number of options to customize its data. The `sitecore-jss-dev-tools` package exports the `DisconnectedLayoutServiceOptions` TypeScript typing that documents the full array of options and their signatures. TS-aware editors, like VS Code, will enable reading this metadata even if the file is not TypeScript.

```js
const proxyOptions = {
  appRoot: __dirname,
  appName: config.appName,
  watchPaths: ['../data'],
  language: config.language,
  port: 3042,
  compilers: ['@babel/register'],
  ...
};
```

## Customizing the Context

When customizing the [Layout Service context](/docs/techniques/extending-layout-service/layoutservice-extending-context) on the Sitecore side, you may wish to apply similar customizations when disconnected. The `customizeContext` hook allows you to do just that:

```js
const proxyOptions = {
  appRoot: __dirname,
  customizeContext: (context, route, currentManifest, request, response) => {
    return { myCustomContextProperty: 'helloworld', ...context };
  },
  ...
};
```

## Customizing Component Data

When customizing component data using [Rendering Contents Resolvers or Integrated GraphQL](/docs/techniques/extending-layout-service/layoutservice-rendering-contents) on the Sitecore side, you may wish to apply similar customizations when disconnected. The `customizeRendering` hook allows you to do just that:

```js
const proxyOptions = {
  appRoot: __dirname,
  customizeRendering: (rendering, rawManifestRendering) => {
    // mock integrated GraphQL results for a specific component name
    if (rendering.componentName === 'ContentBlock' && rendering.fields) {
      rendering.fields = {
        data: {
          item: {
            id: 'mock-graphql-result-id',
            heading: {
              jss: rendering.fields.heading,
            }
          }
        }
      };

      return rendering;
    }

    // customize data based on a flag value added to the component definition on the route
    // i.e. in YAML, 
    // - componentName: Whatever
    //   addCoolStuff: true
    if (rawManifestRendering.dataSource.addCoolStuff) {
      return {
        coolStuff: [
          'React',
          'Vue',
        ],
        ...transformed,
      };
    }

    // returning falsy will cause JSS to use the default value
    return undefined; // is a function
  },
  ...
};
```