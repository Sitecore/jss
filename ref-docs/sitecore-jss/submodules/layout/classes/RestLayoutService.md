[@sitecore-jss/sitecore-jss](../README.md) / RestLayoutService

# Class: RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `LayoutServiceBase`

  ↳ **`RestLayoutService`**

## Table of contents

### Constructors

- [constructor](RestLayoutService.md#constructor)

### Methods

- [fetchLayoutData](RestLayoutService.md#fetchlayoutdata)
- [fetchPlaceholderData](RestLayoutService.md#fetchplaceholderdata)
- [getDefaultFetcher](RestLayoutService.md#getdefaultfetcher)
- [getFetchParams](RestLayoutService.md#getfetchparams)
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

[rest-layout-service.ts:63](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L63)

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

[rest-layout-service.ts:75](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L75)

___

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`<[`PlaceholderData`](../interfaces/PlaceholderData.md)\>

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

`Promise`<[`PlaceholderData`](../interfaces/PlaceholderData.md)\>

placeholder data

#### Defined in

[rest-layout-service.ts:130](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L130)

___

### getDefaultFetcher

▸ `Protected` **getDefaultFetcher**<`T`\>(`req?`, `res?`): (`url`: `string`, `data?`: `unknown`) => `Promise`<`AxiosResponse`<`T`\>\>

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

#### Defined in

[rest-layout-service.ts:190](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L190)

___

### getFetchParams

▸ `Protected` **getFetchParams**(`language?`): `FetchParams`

Provides fetch options in order to fetch data

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |

#### Returns

`FetchParams`

fetch options

#### Defined in

[rest-layout-service.ts:164](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L164)

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

[rest-layout-service.ts:178](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L178)

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

##### Parameters

| Name | Type |
| :------ | :------ |
| `reqConfig` | `AxiosRequestConfig` |

##### Returns

`AxiosRequestConfig`

#### Defined in

[rest-layout-service.ts:212](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L212)

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

##### Parameters

| Name | Type |
| :------ | :------ |
| `serverRes` | `AxiosResponse`<`any`\> |

##### Returns

`AxiosResponse`<`any`\>

#### Defined in

[rest-layout-service.ts:231](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/layout/rest-layout-service.ts#L231)
