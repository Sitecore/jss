---
name: layout_rest_layout_service
routeTemplate: ./data/component-templates/article.yml
title: layout_rest_layout_service
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / layout/rest-layout-service

# Module: layout/rest-layout-service

## Table of contents

### Classes

- [RestLayoutService](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice)

### Interfaces

- [LayoutServiceConfig](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutserviceconfig)
- [LayoutServiceRequestOptions](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutservicerequestoptions)

### Type aliases

- [DataFetcherResolver](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service#datafetcherresolver)
- [RestLayoutServiceConfig](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service#restlayoutserviceconfig)

### Functions

- [fetchPlaceholderData](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service#fetchplaceholderdata)
- [fetchRouteData](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service#fetchroutedata)
- [resolveLayoutServiceUrl](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service#resolvelayoutserviceurl)

## Type aliases

### DataFetcherResolver

Ƭ **DataFetcherResolver**: <T\>(`req?`: `IncomingMessage`, `res?`: `ServerResponse`) => [`HttpDataFetcher`](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)<`T`\>

#### Type declaration

▸ <`T`\>(`req?`, `res?`): [`HttpDataFetcher`](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)<`T`\>

Data fetcher resolver in order to provide custom data fetcher

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

##### Returns

[`HttpDataFetcher`](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)<`T`\>

___

### RestLayoutServiceConfig

Ƭ **RestLayoutServiceConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiHost` | `string` | Your Sitecore instance hostname that is the backend for JSS |
| `apiKey` | `string` | The Sitecore SSC API key your app uses |
| `configurationName?` | `string` | Layout Service "named" configuration |
| `dataFetcherResolver?` | [`DataFetcherResolver`](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service#datafetcherresolver) | Function that handles fetching API data |
| `siteName` | `string` | The JSS application name |
| `tracking?` | `boolean` | Enables/disables analytics tracking for the Layout Service invocation (default is true). More than likely, this would be set to false for SSG/hybrid implementations, and the JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)  **`default`** true |

## Functions

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `options`): `Promise`<[`PlaceholderData`](/docs/fundamentals/ref/jss/interfaces/layout_models/placeholderdata)\>

Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

**`deprecated`** Will be removed in a future release. Please use LayoutService.fetchPlaceholderData instead,

**`see`** {LayoutService} - fetchPlaceholderData

#### Parameters

| Name | Type |
| :------ | :------ |
| `placeholderName` | `string` |
| `itemPath` | `string` |
| `options` | [`LayoutServiceRequestOptions`](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutservicerequestoptions)<[`PlaceholderData`](/docs/fundamentals/ref/jss/interfaces/layout_models/placeholderdata)\> |

#### Returns

`Promise`<[`PlaceholderData`](/docs/fundamentals/ref/jss/interfaces/layout_models/placeholderdata)\>

placeholder data

___

### fetchRouteData

▸ **fetchRouteData**(`itemPath`, `options`): `Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

Makes a request to Sitecore Layout Service for the specified route item path.

**`deprecated`** Will be removed in a future release. Please use LayoutService.fetchLayoutData instead,

**`see`** {LayoutService} - fetchLayoutData

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `options` | [`LayoutServiceRequestOptions`](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutservicerequestoptions)<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\> |

#### Returns

`Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

layout data

___

### resolveLayoutServiceUrl

▸ **resolveLayoutServiceUrl**(`options?`, `apiType`): `string`

Resolves layout service url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`LayoutServiceConfig`](/docs/fundamentals/ref/jss/interfaces/layout_rest_layout_service/layoutserviceconfig) | - |
| `apiType` | ``"render"`` \| ``"placeholder"`` | which layout service API to call ('render' or 'placeholder') |

#### Returns

`string`

the layout service url
