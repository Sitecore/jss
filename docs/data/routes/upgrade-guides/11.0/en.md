---
name: "11.0"
routeTemplate: ./data/component-templates/full-page.yml
title: Upgrading to JSS 11.0
---

# Upgrading from JSS 9.0 (Technical Preview 4) to JSS 11.0 (GA)

Upgrading a JSS 9.0 or later application to JSS 11.0 is relatively simple.

## JSS Server Upgrade (Sitecore)

1. If you are upgrading Sitecore to Sitecore 9.1 from 9.0.x, do that first.
1. Upgrade the Headless Server Components. Follow [the Server Install instructions](/docs/client-frameworks/getting-started/jss-server-install); original installation and upgrading are the same steps.
1. *If upgrading Sitecore to 9.1 only*, migrate your SSC API key. In 9.1, the API keys moved to the `master` database from the `core` database. The `Transfer` function can help you move the API key item between databases, or you can elect to create a new key and update the API key in the JSS config.

## JSS Application Upgrade (JS)

1. For Vue or React apps, ensure to upgrade your referenced [React version to 16.4.2 or later](https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html) or [Vue to 2.5.17 or later](https://twitter.com/vuejs/status/1024754536877973504) to patch a security issue.
1. Upgrade all `@sitecore-jss/*` packages to the latest 11.x version.
1. Update your `dataApi` usages to provide a `fetcher`. JSS no longer dictates that you use `axios` to fetch route data via its API, so you may continue to use `axios` or implement a similar fetcher in another HTTP library (SSR must be supported):
    * Add `axios` to your dependencies (`npm i axios`)
    * Search for `dataApi` within your project - in a route handler for most projects. When the `dataApi` is invoked, ensure that its options include a fetcher. The following code is an example `axios` fetcher that preserves existing fetch behavior:

      ```js
      // dataFetcher.js
      import axios from 'axios';

      export function dataFetcher(url, data) {
        return axios({
          url,
          method: data ? 'POST' : 'GET',
          data,
          withCredentials: true,
        });
      }

      // i.e. RouteHandler.js:
      import { dataFetcher } from './path/to/dataFetcher';

      // example dataApi options
      const fetchOptions = {
        layoutServiceConfig: { host: config.sitecoreApiHost },
        querystringParams: { sc_lang: language, sc_apikey: config.sitecoreApiKey },
        // remove any existing requestConfig property and replace with 'fetcher'
        fetcher: dataFetcher,
      };

      // example dataApi call
      const dataResultPromise = dataApi.fetchRouteData('/', fetchOptions);
      ```

## If using Disconnected Development (manifesting)

### Update for Helix import compatibility

The default import paths when a disconnected app have changed to be Helix-compatible in JSS 11.0. This change brings JSS into compliance with standard Sitecore development procedures, but means that importing a JSS 9 app will cause duplicated items in the new Helix paths when the app is imported. To upgrade, there are two options:

1. Move the existing deployed app Sitecore items into Helix-compatible locations (each needs to be moved to `$oldRoot/Project/JssAppName` from `$oldRoot/JssAppName`; the `Project` folder should already exist after installing JSS 10.0)
    * Renderings: `/sitecore/layout/Renderings/$appName` -> `/sitecore/layout/Renderings/Project/$appName`
    * Templates: `/sitecore/templates/$appName` -> `/sitecore/templates/Project/$appName`
    * Placeholder Settings: `/sitecore/layout/Placeholder Settings/$appName` -> `/sitecore/layout/Placeholder Settings/Project/$appName`
    * Layouts: `/sitecore/layout/Layouts/JavaScriptServices/$appName` -> `/sitecore/layout/Layouts/Project/$appName/$appName Layout` **NOTE THE LAYOUT ITEM RENAME**
    * After moving these items, running an import should result in no changes reported.
1. Enable the `App_Config\Sitecore\JavaScriptServices\Sitecore.JavaScriptServices.Apps.Legacy.disabled` config file, which will cause JSS to import apps using the same paths as technical preview versions used. This is appropriate if you to not wish to move items; the Helix mode is entirely config-driven, so this is not considered a deprecated usage.

### Set insert options on route templates in manifest

**Optional**, but maintains imported content compatibility with TP4. This will preserve the ability for authors to easily insert new routes in Sitecore (and you now have the control over which route types can be inserted from the manifest side).

1. Edit `/sitecore/definitions.routes.sitecore.js`
1. Find `manifest.setDefaultRouteType()`
1. Add `insertOptions: ['App Route'],` to the function arguments. 

## If using Tracking (Sitecore XP with xConnect)

### Add robot detection support 

JSS 11.0 supports Sitecore's robot detection features, whereas 9.0 did not and had to disable robot detection. This upgrade is optional, but will allow filtering out robot traffic from your Sitecore analytics data which is generally desirable.

1. Remove the following settings from your JSS app's Sitecore config file (for code-first, this is stored in `$appRoot/sitecore/config`):

    ```
    <setting name="Analytics.AutoDetectBots" set:value="false" />
    <setting name="Analytics.Robots.IgnoreRobots" set:value="false" />
    ```
1. Compare the [JSS 9.0 sample app](https://github.com/Sitecore/jss/tree/a137e11f39982adb7f0ad9284e16a171c337d990/samples) for your selected framework with the [JSS 11.0 equivalent sample](https://github.com/Sitecore/jss/tree/master/samples), and merge the changes into your app relating to `VisitorIdentification`. Each framework's VI implementation differs slightly.

### Add tracking API support

If you wish to track client-side analytics events, goals, outcomes, etc with your JSS app, this is now supported. It is recommended to review the `Tracking` example component in a JSS 11 sample app's styleguide to see how to integrate tracking with your app.

## If using GraphQL

### Update API key to explicitly whitelist GraphQL endpoints

GraphQL in JSS 11.0 requires explicit GraphQL endpoint URL whitelisting on the SSC API key. This allows API keys to grant access to only a subset of GraphQL endpoints. See [the App Deployment guide](/docs/client-frameworks/getting-started/app-deployment) API key section for details about how to whitelist GraphQL endpoints by URL.

Add the following configurations to your JSS app's GraphQL endpoint configuration (default: `$approot/sitecore/config/appname.config`) to enable full security when deployed to a content delivery environment:

```xml
<myAppNameGraphQLEndpoint url="/api/myappname" type="Sitecore.Services.GraphQL.Hosting.DatabaseAwareGraphQLEndpoint, Sitecore.Services.GraphQL.NetFxHost" resolve="true">
    <!-- ADD THESE HERE; leave the rest alone -->
    <graphiql role:require="ContentDelivery">false</graphiql>
    <enableSchemaExport role:require="ContentDelivery">false</enableSchemaExport>
    <enableStats role:require="ContentDelivery">false</enableStats>
    <enableCacheStats role:require="ContentDelivery">false</enableCacheStats>
    <disableIntrospection role:require="ContentDelivery">true</disableIntrospection>
</myAppNameGraphQLEndpoint>
```

### Update included templates path if using Helix import

If you use the default import settings which use Helix pathing in JSS 11, the path to your app's templates will have changed. This path needs to be updated in your GraphQL endpoint configuration to add the `Project` parent folder name:

```xml
<paths hint="list:AddIncludedPath">
  <templates>/sitecore/templates/Project/$appName</templates>
</paths>
```