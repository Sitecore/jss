[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / RestLayoutService

# Class: RestLayoutService

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:67](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L67)

Fetch layout data using the Sitecore Layout Service REST API.
Uses NativeDataFetcher as the default data fetcher (@see NativeDataFetcher).

## Extends

- `LayoutServiceBase`

## Constructors

### Constructor

> **new RestLayoutService**(`serviceConfig`): `RestLayoutService`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:68](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L68)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `serviceConfig` | [`RestLayoutServiceConfig`](../type-aliases/RestLayoutServiceConfig.md) |

#### Returns

`RestLayoutService`

#### Overrides

`LayoutServiceBase.constructor`

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:81](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L81)

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language?` | `string` | the language to fetch layout data for. |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Throws

the item with the specified path is not found

#### Overrides

`LayoutServiceBase.fetchLayoutData`

***

### fetchPlaceholderData()

> **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`\<[`PlaceholderData`](../interfaces/PlaceholderData.md)\>

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:134](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L134)

Fetch layout data for a particular placeholder.
Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `placeholderName` | `string` | the name of the placeholder to fetch layout data for. |
| `itemPath` | `string` | the path to the item to fetch layout data for. |
| `language?` | `string` | the language to fetch data for. |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`PlaceholderData`](../interfaces/PlaceholderData.md)\>

placeholder data

***

### getDefaultFetcher()

> `protected` **getDefaultFetcher**\<`T`\>(`req?`, `res?`): (`url`, `data?`) => `Promise`\<[`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:201](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L201)

Returns a fetcher function pre-configured with headers from the incoming request.
Provides default

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

default fetcher

> (`url`, `data?`): `Promise`\<[`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `data?` | `RequestInit` |

##### Returns

`Promise`\<[`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

#### See

NativeDataFetcher data fetcher

***

### getFetcher()

> `protected` **getFetcher**(`req?`, `res?`): [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\> \| `NativeDataFetcherFunction`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:177](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L177)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse`\<`IncomingMessage`\> |

#### Returns

[`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\> \| `NativeDataFetcherFunction`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

***

### getFetchParams()

> `protected` **getFetchParams**(`language?`): `FetchParams`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:168](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L168)

Provides fetch options in order to fetch data

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language?` | `string` | language will be applied to `sc_lang` param |

#### Returns

`FetchParams`

fetch options

***

### resolveLayoutServiceUrl()

> `protected` **resolveLayoutServiceUrl**(`apiType`): `string`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:188](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L188)

Resolves layout service url

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiType` | `"component"` \| `"render"` \| `"placeholder"` | which layout service API to call ('render' or 'placeholder') |

#### Returns

`string`

the layout service url

***

### setupReqHeaders()

> `protected` **setupReqHeaders**(`req?`): `Headers`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:227](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L227)

Creates an HTTP `Headers` object populated with headers from the incoming request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req?` | `IncomingMessage` | The incoming HTTP request, used to extract headers. |

#### Returns

`Headers`

- An instance of the `Headers` object populated with the extracted headers.

***

### setupResHeaders()

> `protected` **setupResHeaders**\<`T`\>(`res`, `serverRes`): [`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:254](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/layout/rest-layout-service.ts#L254)

Setup response headers based on response from layout service

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `res` | `ServerResponse` | Response instance |
| `serverRes` | [`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\> |  |

#### Returns

[`NativeDataFetcherResponse`](../../index/interfaces/NativeDataFetcherResponse.md)\<`T`\>

response
