[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / RestLayoutService

# Class: RestLayoutService

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:53

Fetch layout data using the Sitecore Layout Service REST API.
Uses NativeDataFetcher as the default data fetcher (@see NativeDataFetcher).

## Extends

- `LayoutServiceBase`

## Constructors

### Constructor

> **new RestLayoutService**(`serviceConfig`): `RestLayoutService`

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:55

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `serviceConfig` | `RestLayoutServiceConfig` |

#### Returns

`RestLayoutService`

#### Overrides

`LayoutServiceBase.constructor`

## Properties

### getDefaultFetcher()

> `protected` **getDefaultFetcher**: \<`T`\>(`req?`, `res?`) => (`url`, `data?`) => `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:98

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
| `res?` | `ServerResponse` | Response instance |

#### Returns

default fetcher

> (`url`, `data?`): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `data?` | `RequestInit` |

##### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

#### See

NativeDataFetcher data fetcher

***

### getFetcher()

> `protected` **getFetcher**: (`req?`, `res?`) => [`HttpDataFetcher`](../type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\> \| `NativeDataFetcherFunction`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:84

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req?` | `IncomingMessage` |
| `res?` | `ServerResponse` |

#### Returns

[`HttpDataFetcher`](../type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\> \| `NativeDataFetcherFunction`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

***

### getFetchParams()

> `protected` **getFetchParams**: (`language?`) => `FetchParams`

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:83

Provides fetch options in order to fetch data

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language?` | `string` | language will be applied to `sc_lang` param |

#### Returns

`FetchParams`

fetch options

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language?`, `req?`, `res?`): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:65

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language?` | `string` | the language to fetch layout data for. |
| `req?` | `IncomingMessage` | Request instance |
| `res?` | `ServerResponse` | Response instance |

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Throws

the item with the specified path is not found

#### Overrides

`LayoutServiceBase.fetchLayoutData`

***

### fetchPlaceholderData()

> **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language?`, `req?`, `res?`): `Promise`\<`PlaceholderData`\>

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:77

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
| `res?` | `ServerResponse` | Response instance |

#### Returns

`Promise`\<`PlaceholderData`\>

placeholder data

***

### resolveLayoutServiceUrl()

> `protected` **resolveLayoutServiceUrl**(`apiType`): `string`

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:90

Resolves layout service url

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `apiType` | `"component"` \| `"placeholder"` \| `"render"` | which layout service API to call ('render' or 'placeholder') |

#### Returns

`string`

the layout service url

***

### setupReqHeaders()

> `protected` **setupReqHeaders**(`req?`): `Headers`

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:104

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

> `protected` **setupResHeaders**\<`T`\>(`res`, `serverRes`): [`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>

Defined in: packages/sitecore-jss/types/layout/rest-layout-service.d.ts:111

Setup response headers based on response from layout service

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `res` | `ServerResponse` | Response instance |
| `serverRes` | [`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\> |  |

#### Returns

[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>

response
