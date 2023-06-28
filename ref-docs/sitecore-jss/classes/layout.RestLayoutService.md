[@sitecore-jss/sitecore-jss](../README.md) / [layout](../modules/layout.md) / RestLayoutService

# Class: RestLayoutService

[layout](../modules/layout.md).RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `LayoutServiceBase`

  ↳ **`RestLayoutService`**

## Table of contents

### Constructors

- [constructor](layout.RestLayoutService.md#constructor)

### Properties

- [serviceConfig](layout.RestLayoutService.md#serviceconfig)

### Methods

- [fetchLayoutData](layout.RestLayoutService.md#fetchlayoutdata)
- [fetchPlaceholderData](layout.RestLayoutService.md#fetchplaceholderdata)
- [getDefaultFetcher](layout.RestLayoutService.md#getdefaultfetcher)
- [getFetchParams](layout.RestLayoutService.md#getfetchparams)
- [resolveLayoutServiceUrl](layout.RestLayoutService.md#resolvelayoutserviceurl)
- [setupReqHeaders](layout.RestLayoutService.md#setupreqheaders)
- [setupResHeaders](layout.RestLayoutService.md#setupresheaders)

## Constructors

### constructor

• **new RestLayoutService**(`serviceConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](../modules/layout.md#restlayoutserviceconfig) |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

[src/layout/rest-layout-service.ts:65](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L65)

## Properties

### serviceConfig

• `Private` **serviceConfig**: [`RestLayoutServiceConfig`](../modules/layout.md#restlayoutserviceconfig)

#### Defined in

[src/layout/rest-layout-service.ts:65](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L65)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md)\>

Fetch layout data for an item.

**`Throws`**

the item with the specified path is not found

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language?` | `string` | the language to fetch layout data for. |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse` | Response instance |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md)\>

layout service data

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

[src/layout/rest-layout-service.ts:78](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L78)

___

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`<[`PlaceholderData`](../interfaces/layout.PlaceholderData.md)\>

Fetch layout data for a particular placeholder.
Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `placeholderName` | `string` | the name of the placeholder to fetch layout data for. |
| `itemPath` | `string` | the path to the item to fetch layout data for. |
| `language?` | `string` | the language to fetch data for. |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse` | Response instance |

#### Returns

`Promise`<[`PlaceholderData`](../interfaces/layout.PlaceholderData.md)\>

placeholder data

#### Defined in

[src/layout/rest-layout-service.ts:133](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L133)

___

### getDefaultFetcher

▸ `Protected` **getDefaultFetcher**<`T`\>(`req?`, `res?`): (`url`: `string`, `data?`: `unknown`) => `Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`T`\>\>

Provides default

**`See`**

AxiosDataFetcher data fetcher

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse` | Response instance |

#### Returns

`fn`

default fetcher

▸ (`url`, `data?`): `Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `data?` | `unknown` |

##### Returns

`Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`T`\>\>

#### Defined in

[src/layout/rest-layout-service.ts:193](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L193)

___

### getFetchParams

▸ `Protected` **getFetchParams**(`language?`): `FetchParams`

Provides fetch options in order to fetch data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language?` | `string` | language will be applied to `sc_lang` param |

#### Returns

`FetchParams`

fetch options

#### Defined in

[src/layout/rest-layout-service.ts:167](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L167)

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

[src/layout/rest-layout-service.ts:181](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L181)

___

### setupReqHeaders

▸ `Protected` **setupReqHeaders**(`req`): (`reqConfig`: `AxiosRequestConfig`) => `AxiosRequestConfig`

Setup request headers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `IncomingMessage` | Request instance |

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

[src/layout/rest-layout-service.ts:215](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L215)

___

### setupResHeaders

▸ `Protected` **setupResHeaders**(`res`): (`serverRes`: [`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>) => [`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>

Setup response headers based on response from layout service

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `res` | `ServerResponse` | Response instance |

#### Returns

`fn`

response

▸ (`serverRes`): [`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `serverRes` | [`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\> |

##### Returns

[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>

#### Defined in

[src/layout/rest-layout-service.ts:234](https://github.com/Sitecore/jss/blob/e9cd91178/packages/sitecore-jss/src/layout/rest-layout-service.ts#L234)
