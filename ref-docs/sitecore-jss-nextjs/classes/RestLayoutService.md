[Sitecore JavaScript Rendering SDK (JSS) for Next.js](../README.md) / RestLayoutService

# Class: RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `LayoutServiceBase`

  ↳ **`RestLayoutService`**

## Table of contents

### Constructors

- [constructor](RestLayoutService.md#constructor)

### Properties

- [getDefaultFetcher](RestLayoutService.md#getdefaultfetcher)
- [getFetchParams](RestLayoutService.md#getfetchparams)
- [serviceConfig](RestLayoutService.md#serviceconfig)

### Methods

- [fetchLayoutData](RestLayoutService.md#fetchlayoutdata)
- [fetchPlaceholderData](RestLayoutService.md#fetchplaceholderdata)
- [resolveLayoutServiceUrl](RestLayoutService.md#resolvelayoutserviceurl)
- [setupReqHeaders](RestLayoutService.md#setupreqheaders)
- [setupResHeaders](RestLayoutService.md#setupresheaders)

## Constructors

### constructor

• **new RestLayoutService**(`serviceConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](../README.md#restlayoutserviceconfig) |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:55

## Properties

### getDefaultFetcher

• `Protected` **getDefaultFetcher**: <T\>(`req?`: `IncomingMessage`, `res?`: `ServerResponse`) => (`url`: `string`, `data?`: `unknown`) => `Promise`<`AxiosResponse`<`T`\>\>

#### Type declaration

▸ <`T`\>(`req?`, `res?`): (`url`: `string`, `data?`: `unknown`) => `Promise`<`AxiosResponse`<`T`\>\>

Provides default @see AxiosDataFetcher data fetcher

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

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:95

___

### getFetchParams

• `Protected` **getFetchParams**: (`language?`: `string`) => `FetchParams`

#### Type declaration

▸ (`language?`): `FetchParams`

Provides fetch options in order to fetch data

##### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |

##### Returns

`FetchParams`

fetch options

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:82

___

### serviceConfig

• `Private` **serviceConfig**: `any`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:54

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:64

___

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`<`PlaceholderData`\>

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

`Promise`<`PlaceholderData`\>

placeholder data

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:76

___

### resolveLayoutServiceUrl

▸ `Protected` **resolveLayoutServiceUrl**(`apiType`): `string`

Resolves layout service url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiType` | ``"render"`` \| ``"placeholder"`` | which layout service API to call ('render' or 'placeholder') |

#### Returns

`string`

the layout service url

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:88

___

### setupReqHeaders

▸ `Protected` **setupReqHeaders**(`req`): (`reqConfig`: `AxiosRequestConfig`) => `AxiosRequestConfig`

Setup request headers

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` |

#### Returns

`fn`

axios request config

▸ (`reqConfig`): `AxiosRequestConfig`

Setup request headers

##### Parameters

| Name | Type |
| :------ | :------ |
| `reqConfig` | `AxiosRequestConfig` |

##### Returns

`AxiosRequestConfig`

axios request config

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:101

___

### setupResHeaders

▸ `Protected` **setupResHeaders**(`res`): (`serverRes`: `AxiosResponse`<`any`\>) => `AxiosResponse`<`any`\>

Setup response headers based on response from layout service

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `ServerResponse` |

#### Returns

`fn`

response

▸ (`serverRes`): `AxiosResponse`<`any`\>

Setup response headers based on response from layout service

##### Parameters

| Name | Type |
| :------ | :------ |
| `serverRes` | `AxiosResponse`<`any`\> |

##### Returns

`AxiosResponse`<`any`\>

response

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/layout/rest-layout-service.d.ts:107
