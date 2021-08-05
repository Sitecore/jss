[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [layout/rest-layout-service](../modules/layout_rest_layout_service.md) / RestLayoutService

# Class: RestLayoutService

[layout/rest-layout-service](../modules/layout_rest_layout_service.md).RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- [`LayoutServiceBase`](layout_layout_service.LayoutServiceBase.md)

  ↳ **`RestLayoutService`**

## Table of contents

### Constructors

- [constructor](layout_rest_layout_service.RestLayoutService.md#constructor)

### Methods

- [fetchLayoutData](layout_rest_layout_service.RestLayoutService.md#fetchlayoutdata)
- [fetchPlaceholderData](layout_rest_layout_service.RestLayoutService.md#fetchplaceholderdata)
- [getDefaultFetcher](layout_rest_layout_service.RestLayoutService.md#getdefaultfetcher)
- [getFetchOptions](layout_rest_layout_service.RestLayoutService.md#getfetchoptions)
- [setupReqHeaders](layout_rest_layout_service.RestLayoutService.md#setupreqheaders)
- [setupResHeaders](layout_rest_layout_service.RestLayoutService.md#setupresheaders)

## Constructors

### constructor

• **new RestLayoutService**(`serviceConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](../modules/layout_rest_layout_service.md#restlayoutserviceconfig) |

#### Overrides

[LayoutServiceBase](layout_layout_service.LayoutServiceBase.md).[constructor](layout_layout_service.LayoutServiceBase.md#constructor)

#### Defined in

[layout/rest-layout-service.ts:164](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L164)

## Methods

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | `string` |
| `language?` | `string` |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

`Promise`<[`LayoutServiceData`](../interfaces/layout_models.LayoutServiceData.md)\>

layout service data

#### Overrides

[LayoutServiceBase](layout_layout_service.LayoutServiceBase.md).[fetchLayoutData](layout_layout_service.LayoutServiceBase.md#fetchlayoutdata)

#### Defined in

[layout/rest-layout-service.ts:176](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L176)

___

### fetchPlaceholderData

▸ **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`<[`PlaceholderData`](../interfaces/layout_models.PlaceholderData.md)\>

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

`Promise`<[`PlaceholderData`](../interfaces/layout_models.PlaceholderData.md)\>

placeholder data

#### Defined in

[layout/rest-layout-service.ts:226](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L226)

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

#### Defined in

[layout/rest-layout-service.ts:277](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L277)

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

#### Defined in

[layout/rest-layout-service.ts:254](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L254)

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

#### Defined in

[layout/rest-layout-service.ts:299](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L299)

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

#### Defined in

[layout/rest-layout-service.ts:318](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/layout/rest-layout-service.ts#L318)
