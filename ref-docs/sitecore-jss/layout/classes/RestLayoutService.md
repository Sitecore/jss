[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / RestLayoutService

# Class: RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses NativeDataFetcher as the default data fetcher (@see NativeDataFetcher).

## Extends

- `LayoutServiceBase`

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

[packages/sitecore-jss/src/layout/rest-layout-service.ts:68](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/layout/rest-layout-service.ts#L68)

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

[packages/sitecore-jss/src/layout/rest-layout-service.ts:81](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/layout/rest-layout-service.ts#L81)

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

[packages/sitecore-jss/src/layout/rest-layout-service.ts:137](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/layout/rest-layout-service.ts#L137)

***

### getDefaultFetcher()

> `protected` **getDefaultFetcher**\<`T`\>(`req`?, `res`?): (`url`, `data`?) => `Promise`\<[`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Returns a fetcher function pre-configured with headers from the incoming request.
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
| `data`? | `RequestInit` |

##### Returns

`Promise`\<[`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

#### See

NativeDataFetcher data fetcher

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:198](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/layout/rest-layout-service.ts#L198)

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

[packages/sitecore-jss/src/layout/rest-layout-service.ts:171](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/layout/rest-layout-service.ts#L171)

***

### resolveLayoutServiceUrl()

> `protected` **resolveLayoutServiceUrl**(`apiType`): `string`

Resolves layout service url

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiType` | `"render"` \| `"placeholder"` | which layout service API to call ('render' or 'placeholder') |

#### Returns

`string`

the layout service url

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:185](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/layout/rest-layout-service.ts#L185)

***

### setupReqHeaders()

> `protected` **setupReqHeaders**(`req`?): `Headers`

Creates an HTTP `Headers` object populated with headers from the incoming request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req`? | `IncomingMessage` | The incoming HTTP request, used to extract headers. |

#### Returns

`Headers`

- An instance of the `Headers` object populated with the extracted headers.

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:224](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/layout/rest-layout-service.ts#L224)

***

### setupResHeaders()

> `protected` **setupResHeaders**\<`T`\>(`res`, `serverRes`): [`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>

Setup response headers based on response from layout service

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `res` | `ServerResponse`\<`IncomingMessage`\> | Response instance |
| `serverRes` | [`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\> |  |

#### Returns

[`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>

response

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:251](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/layout/rest-layout-service.ts#L251)
