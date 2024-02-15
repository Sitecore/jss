[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / RestLayoutService

# Class: RestLayoutService

[index](../modules/index.md).RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `LayoutServiceBase`

  ↳ **`RestLayoutService`**

## Table of contents

### Constructors

- [constructor](index.RestLayoutService.md#constructor)

### Properties

- [getDefaultFetcher](index.RestLayoutService.md#getdefaultfetcher)
- [getFetchParams](index.RestLayoutService.md#getfetchparams)
- [serviceConfig](index.RestLayoutService.md#serviceconfig)

### Methods

- [fetchLayoutData](index.RestLayoutService.md#fetchlayoutdata)
- [fetchPlaceholderData](index.RestLayoutService.md#fetchplaceholderdata)
- [resolveLayoutServiceUrl](index.RestLayoutService.md#resolvelayoutserviceurl)
- [setupReqHeaders](index.RestLayoutService.md#setupreqheaders)
- [setupResHeaders](index.RestLayoutService.md#setupresheaders)

## Constructors

### constructor

• **new RestLayoutService**(`serviceConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](../modules/index.md#restlayoutserviceconfig) |

#### Overrides

LayoutServiceBase.constructor

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:57

## Properties

### getDefaultFetcher

• `Protected` **getDefaultFetcher**: \<T\>(`req?`: `IncomingMessage`, `res?`: `ServerResponse`\<`IncomingMessage`\>) => (`url`: `string`, `data?`: `unknown`) => `Promise`\<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`T`\>\>

#### Type declaration

▸ \<`T`\>(`req?`, `res?`): (`url`: `string`, `data?`: `unknown`) => `Promise`\<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`T`\>\>

Provides default

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

##### Returns

`fn`

default fetcher

▸ (`url`, `data?`): `Promise`\<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `data?` | `unknown` |

##### Returns

`Promise`\<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`T`\>\>

**`See`**

AxiosDataFetcher data fetcher

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:98

___

### getFetchParams

• `Protected` **getFetchParams**: (`language?`: `string`) => `FetchParams`

#### Type declaration

▸ (`language?`): `FetchParams`

Provides fetch options in order to fetch data

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language?` | `string` | language will be applied to `sc_lang` param |

##### Returns

`FetchParams`

fetch options

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:85

___

### serviceConfig

• `Private` **serviceConfig**: `any`

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:56

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`\<[`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language?` | `string` | the language to fetch layout data for. |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)\>

layout service data

**`Throws`**

the item with the specified path is not found

#### Overrides

LayoutServiceBase.fetchLayoutData

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:67

___

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`\<[`PlaceholderData`](../interfaces/index.PlaceholderData.md)\>

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
| `res?` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`PlaceholderData`](../interfaces/index.PlaceholderData.md)\>

placeholder data

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:79

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

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:91

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

Setup request headers

##### Parameters

| Name | Type |
| :------ | :------ |
| `reqConfig` | `AxiosRequestConfig` |

##### Returns

`AxiosRequestConfig`

axios request config

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:104

___

### setupResHeaders

▸ `Protected` **setupResHeaders**(`res`): (`serverRes`: [`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`any`\>) => [`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`any`\>

Setup response headers based on response from layout service

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `res` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`fn`

response

▸ (`serverRes`): [`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`any`\>

Setup response headers based on response from layout service

##### Parameters

| Name | Type |
| :------ | :------ |
| `serverRes` | [`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`any`\> |

##### Returns

[`AxiosResponse`](../interfaces/index.AxiosResponse.md)\<`any`\>

response

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:110
