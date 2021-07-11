---
name: restlayoutservice
routeTemplate: ./data/component-templates/article.yml
title: restlayoutservice
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [layout/rest-layout-service](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service) / RestLayoutService

# Class: RestLayoutService

[layout/rest-layout-service](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service).RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- [`LayoutServiceBase`](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase)

  ↳ **`RestLayoutService`**

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice#constructor)

### Methods

- [fetchLayoutData](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice#fetchlayoutdata)
- [fetchPlaceholderData](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice#fetchplaceholderdata)
- [getDefaultFetcher](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice#getdefaultfetcher)
- [getFetchOptions](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice#getfetchoptions)
- [setupReqHeaders](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice#setupreqheaders)
- [setupResHeaders](/docs/fundamentals/ref/jss/classes/layout_rest_layout_service/restlayoutservice#setupresheaders)

## Constructors

### constructor

• **new RestLayoutService**(`serviceConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](/docs/fundamentals/ref/jss/modules/layout_rest_layout_service#restlayoutserviceconfig) |

#### Overrides

[LayoutServiceBase](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase).[constructor](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase#constructor)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](/docs/fundamentals/ref/jss/interfaces/layout_models/layoutservicedata)\>

layout service data

#### Overrides

[LayoutServiceBase](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase).[fetchLayoutData](/docs/fundamentals/ref/jss/classes/layout_layout_service/layoutservicebase#fetchlayoutdata)

___

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`<[`PlaceholderData`](/docs/fundamentals/ref/jss/interfaces/layout_models/placeholderdata)\>

Fetch layout data for a particular placeholder.
Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `placeholderName` | `string` |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`PlaceholderData`](/docs/fundamentals/ref/jss/interfaces/layout_models/placeholderdata)\>

placeholder data

___

### getDefaultFetcher

▸ `Private` **getDefaultFetcher**<`T`\>(`req?`, `res?`): (`url`: `string`, `data?`: `unknown`) => `Promise`<`AxiosResponse`<`T`\>\>

Provides default @see AxiosDataFetcher data fetcher

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`fn`

default fetcher

▸ (`url`, `data?`): `Promise`<`AxiosResponse`<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `data?` | `unknown` |

##### Returns

`Promise`<`AxiosResponse`<`T`\>\>

___

### getFetchOptions

▸ `Private` **getFetchOptions**(`language?`): `FetchOptions`

Provides fetch options in order to fetch data

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |

#### Returns

`FetchOptions`

fetch options

___

### setupReqHeaders

▸ `Private` **setupReqHeaders**(`req`): (`reqConfig`: `AxiosRequestConfig`) => `AxiosRequestConfig`

Setup request headers

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |

#### Returns

`fn`

axios request config

▸ (`reqConfig`): `AxiosRequestConfig`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reqConfig` | `AxiosRequestConfig` |

##### Returns

`AxiosRequestConfig`

___

### setupResHeaders

▸ `Private` **setupResHeaders**(`res`): (`serverRes`: `AxiosResponse`<`any`\>) => `AxiosResponse`<`any`\>

Setup response headers based on response from layout service

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `ServerResponse` |

#### Returns

`fn`

response

▸ (`serverRes`): `AxiosResponse`<`any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `serverRes` | `AxiosResponse`<`any`\> |

##### Returns

`AxiosResponse`<`any`\>
