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

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:55](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L55)

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

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:59](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L59)

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

[packages/sitecore-jss/src/layout/rest-layout-service.ts:77](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L77)

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

[packages/sitecore-jss/src/layout/rest-layout-service.ts:130](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L130)

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

[packages/sitecore-jss/src/editing/rest-component-layout-service.ts:86](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/editing/rest-component-layout-service.ts#L86)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`getDefaultFetcher`](../../layout/classes/RestLayoutService.md#getdefaultfetcher)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:196](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L196)

***

### getFetcher()

> `protected` **getFetcher**(`req`?, `res`?): [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `req`? | `IncomingMessage` |
| `res`? | `ServerResponse`\<`IncomingMessage`\> |

#### Returns

[`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)\>

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`getFetcher`](../../layout/classes/RestLayoutService.md#getfetcher)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`getFetchParams`](../../layout/classes/RestLayoutService.md#getfetchparams)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`resolveLayoutServiceUrl`](../../layout/classes/RestLayoutService.md#resolvelayoutserviceurl)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`setupReqHeaders`](../../layout/classes/RestLayoutService.md#setupreqheaders)

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

#### Inherited from

[`RestLayoutService`](../../layout/classes/RestLayoutService.md).[`setupResHeaders`](../../layout/classes/RestLayoutService.md#setupresheaders)

#### Defined in

[packages/sitecore-jss/src/layout/rest-layout-service.ts:237](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss/src/layout/rest-layout-service.ts#L237)
