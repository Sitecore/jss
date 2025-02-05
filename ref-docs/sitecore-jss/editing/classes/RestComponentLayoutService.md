[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / RestComponentLayoutService

# Class: RestComponentLayoutService

REST service that enables Component Library functioality
Makes a request to /sitecore/api/layout/component in 'library' mode in Pages.
Returns layoutData for one single rendered component

## Extends

- [`RestLayoutService`](../../layout/classes/RestLayoutService.md)

## Constructors

### new RestComponentLayoutService()

> **new RestComponentLayoutService**(`config`): [`RestComponentLayoutService`](RestComponentLayoutService.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`RestLayoutServiceConfig`](../../layout/type-aliases/RestLayoutServiceConfig.md) |

#### Returns

[`RestComponentLayoutService`](RestComponentLayoutService.md)

#### Overrides

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`constructor`](../../layout/classes/RestLayoutService.md#constructors)

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:51](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L51)

## Methods

### fetchComponentData()

> **fetchComponentData**(`params`, `req`?, `res`?): `Promise`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ComponentLayoutRequestParams`](../interfaces/ComponentLayoutRequestParams.md) |
| `req`? | `IncomingMessage` |
| `res`? | `ServerResponse`\<`IncomingMessage`\> |

#### Returns

`Promise`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:55](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L55)

***

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language`?, `req`?, `res`?): `Promise`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `itemPath` | `string` | item path to fetch layout data for. |
| `language`? | `string` | the language to fetch layout data for. |
| `req`? | `IncomingMessage` | Request instance |
| `res`? | `ServerResponse`\<`IncomingMessage`\> | Response instance |

#### Returns

`Promise`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

layout service data

#### Throws

the item with the specified path is not found

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`fetchLayoutData`](../../layout/classes/RestLayoutService.md#fetchlayoutdata)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:81](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/layout/rest-layout-service.ts#L81)

***

### fetchPlaceholderData()

> **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language`?, `req`?, `res`?): `Promise`\<[`PlaceholderData`](../../layout/interfaces/PlaceholderData.md)\>

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

`Promise`\<[`PlaceholderData`](../../layout/interfaces/PlaceholderData.md)\>

placeholder data

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`fetchPlaceholderData`](../../layout/classes/RestLayoutService.md#fetchplaceholderdata)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:134](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/layout/rest-layout-service.ts#L134)

***

### getComponentFetchParams()

> `protected` **getComponentFetchParams**(`params`): `any`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ComponentLayoutRequestParams`](../interfaces/ComponentLayoutRequestParams.md) |

#### Returns

`any`

#### Defined in

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:83](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L83)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`getDefaultFetcher`](../../layout/classes/RestLayoutService.md#getdefaultfetcher)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:201](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/layout/rest-layout-service.ts#L201)

***

### getFetcher()

> `protected` **getFetcher**(`req`?, `res`?): [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\> \| `NativeDataFetcherFunction`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req`? | `IncomingMessage` |
| `res`? | `ServerResponse`\<`IncomingMessage`\> |

#### Returns

[`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\> \| `NativeDataFetcherFunction`\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`getFetcher`](../../layout/classes/RestLayoutService.md#getfetcher)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:177](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/layout/rest-layout-service.ts#L177)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`getFetchParams`](../../layout/classes/RestLayoutService.md#getfetchparams)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:168](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/layout/rest-layout-service.ts#L168)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`resolveLayoutServiceUrl`](../../layout/classes/RestLayoutService.md#resolvelayoutserviceurl)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:188](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/layout/rest-layout-service.ts#L188)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`setupReqHeaders`](../../layout/classes/RestLayoutService.md#setupreqheaders)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:227](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/layout/rest-layout-service.ts#L227)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`setupResHeaders`](../../layout/classes/RestLayoutService.md#setupresheaders)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:254](https://github.com/Sitecore/jss/blob/383d8e61a72d5a3951f6e86b737e4b4ebf730610/packages/sitecore-jss/src/layout/rest-layout-service.ts#L254)
