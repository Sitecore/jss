[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / RestLayoutService

# Class: RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Extends

- `LayoutServiceBase`

## Extended by

- [`RestComponentLayoutService`](../../editing/classes/RestComponentLayoutService.md)

## Constructors

### new RestLayoutService()

> **new RestLayoutService**(`serviceConfig`): [`RestLayoutService`](RestLayoutService.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](../type-aliases/RestLayoutServiceConfig.md) |

#### Returns

[`RestLayoutService`](RestLayoutService.md)

#### Overrides

`LayoutServiceBase.constructor`

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:64](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L64)

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language`?, `req`?, `res`?): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language`? | `string` | the language to fetch layout data for. |
| `req`? | `IncomingMessage` | Request instance |
| `res`? | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Throws

the item with the specified path is not found

#### Overrides

`LayoutServiceBase.fetchLayoutData`

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:77](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L77)

***

### fetchPlaceholderData()

> **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language`?, `req`?, `res`?): `Promise`\<[`PlaceholderData`](../interfaces/PlaceholderData.md)\>

Fetch layout data for a particular placeholder.
Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `placeholderName` | `string` | the name of the placeholder to fetch layout data for. |
| `itemPath` | `string` | the path to the item to fetch layout data for. |
| `language`? | `string` | the language to fetch data for. |
| `req`? | `IncomingMessage` | Request instance |
| `res`? | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`PlaceholderData`](../interfaces/PlaceholderData.md)\>

placeholder data

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:130](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L130)

***

### getDefaultFetcher()

> `protected` **getDefaultFetcher**\<`T`\>(`req`?, `res`?): (`url`, `data`?) => `Promise`\<[`AxiosResponse`](../../index/interfaces/AxiosResponse.md)\<`T`\>\>

Provides default

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req`? | `IncomingMessage` | Request instance |
| `res`? | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Function`

default fetcher

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `data`? | `unknown` |

##### Returns

`Promise`\<[`AxiosResponse`](../../index/interfaces/AxiosResponse.md)\<`T`\>\>

#### See

AxiosDataFetcher data fetcher

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:196](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L196)

***

### getFetcher()

> `protected` **getFetcher**(`req`?, `res`?): [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req`? | `IncomingMessage` |
| `res`? | `ServerResponse`\<`IncomingMessage`\> |

#### Returns

[`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:173](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L173)

***

### getFetchParams()

> `protected` **getFetchParams**(`language`?): `FetchParams`

Provides fetch options in order to fetch data

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language`? | `string` | language will be applied to `sc_lang` param |

#### Returns

`FetchParams`

fetch options

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:164](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L164)

***

### resolveLayoutServiceUrl()

> `protected` **resolveLayoutServiceUrl**(`apiType`): `string`

Resolves layout service url

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiType` | `"component"` \| `"render"` \| `"placeholder"` | which layout service API to call ('render' or 'placeholder') |

#### Returns

`string`

the layout service url

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:184](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L184)

***

### setupReqHeaders()

> `protected` **setupReqHeaders**(`req`): (`reqConfig`) => `AxiosRequestConfig`

Setup request headers

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `IncomingMessage` | Request instance |

#### Returns

`Function`

axios request config

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `reqConfig` | `AxiosRequestConfig` |

##### Returns

`AxiosRequestConfig`

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:218](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L218)

***

### setupResHeaders()

> `protected` **setupResHeaders**(`res`): (`serverRes`) => [`AxiosResponse`](../../index/interfaces/AxiosResponse.md)\<`any`\>

Setup response headers based on response from layout service

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `res` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Function`

response

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `serverRes` | [`AxiosResponse`](../../index/interfaces/AxiosResponse.md)\<`any`\> |

##### Returns

[`AxiosResponse`](../../index/interfaces/AxiosResponse.md)\<`any`\>

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:237](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L237)
