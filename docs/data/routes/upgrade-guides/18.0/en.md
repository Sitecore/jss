---
name: "18.0"
routeTemplate: ./data/component-templates/full-page.yml
title: Upgrading to JSS 18.0
---

# Upgrading from JSS 16.0 to JSS 18.0

1. Update peer dependencies version.
2. Update all @sitecore-jss/* packages to the latest 18.x version.
3. Angular sample:
 * Upgrade Angular to version 11. Use [Angular update guide](https://update.angular.io/?l=3&v=10.0-11.0).
4. Next.js sample: 
  * Keep only one `[[...path]]` page if upgrading from the source code of the sample application. See the explanation for this in our [Troubleshooting guide for Next.js](/docs/nextjs/troubleshooting#app-fails-to-render-on-vercel-after-1800-upgrade).
## API changes in `sitecore-jss` package

|Service Type|JSS 16.0 API | JSS 18.0 API | change description
|---|---|---|---
|**General data fetching**|||
||`dataApi.fetchData` | `fetchData` | exported directly
||`HttpResponse` | - | no change
||`HttpJsonFetcher` | `HttpDataFetcher` | renamed
||`AxiosDataFetcher` | - | no change
||`AxiosDataFetcherConfig` | - | no change
||`GraphQLRequestClient` | - | no change
||| `GraphQLRequestClientConfig` | new
|**Media API**|||
||`mediaApi.*` | - | no change
|**Layout Service & Route Data**|||
||`dataApi.LayoutServiceConfig` | `LayoutServiceConfig` | exported directly
||`dataApi.BaseRequestOptions` |X| merged into `LayoutServiceRequestOptions`
||`dataApi.LayoutServiceRequestOptions`* |X | removed
||`dataApi.fetchRouteData`** |  - | no change
||`dataApi.fetchPlaceholderData`** | - | no change
||`LayoutService` | - | no change
||`LayoutServiceRequestOptions` | - | no change
||`RestLayoutService` | - | no change
||`RestLayoutServiceConfig` | - | no change
||`DataFetcherResolver` | - | no change
||`LayoutServiceData` | - | no change
||`LayoutServicePageState` | - | no change
||`LayoutServiceContext` | - | no change
||`LayoutServiceContextData` | - | no change
||X| `GraphQLLayoutService` | new
||X| `GraphQLLayoutServiceConfig` | new
||`RouteData` | - | no change
||`PlaceholderData` | - | no change
||`ComponentRendering` | - | no change
||`HtmlElementRendering` | - | no change
||`Field` | - | no change
||`Item` | - | no change
||`PlaceholdersData` | - | no change
||`ComponentFields` | - | no change
||`ComponentParams` | - | no change
||`getFieldValue` | - | no change
||`getChildPlaceholder` | - | no change
|**Internationalization**|||
||`DictionaryPhrases` | - | no change
||`DictionaryService` | - | no change
||`DictionaryServiceData` | `RestDictionaryServiceData` | renamed
||`RestDictionaryService` | - | no change
||`RestDictionaryServiceConfig` | - | no change
||X| `GraphQLDictionaryService` | new
||X| `GraphQLDictionaryServiceConfig` | new
|**Utilities**|||
||`isExperienceEditorActive` | - | no change
||`isServer` | - | no change
||`resetExperienceEditorChromes` | - | no change
||X| `resolveUrl` | new
||X| `getAppRootId` | new
||X| `constants` | new
||X| `debug` | new
||X| `Debugger` | new

> \* in JSS 16.0, `dataApi.LayoutServiceRequestOptions` was also exported as `LayoutServiceRequestOptions`. Only the `dataApi.LayoutServiceRequestOptions` export has been removed. Importing `LayoutServiceRequestOptions` is still valid.

> ** `dataApi.fetchRouteData` and `dataApi.fetchPlaceholderData` are deprecated and will be removed in a future release. These are the only two remaining exports from `dataApi`, so any references to `dataApi` should be removed.
