[**@sitecore-jss/sitecore-jss-vue**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-vue](../README.md) / RestLayoutService

# Class: RestLayoutService

Fetch layout data using the Sitecore Layout Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Extends

- `LayoutServiceBase`

## Constructors

### new RestLayoutService()

> **new RestLayoutService**(`serviceConfig`): [`RestLayoutService`](RestLayoutService.md)

#### Parameters

• **serviceConfig**: `RestLayoutServiceConfig`

#### Returns

[`RestLayoutService`](RestLayoutService.md)

#### Overrides

`LayoutServiceBase.constructor`

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:55

## Properties

### getDefaultFetcher()

> `protected` **getDefaultFetcher**: \<`T`\>(`req`?, `res`?) => (`url`, `data`?) => `Promise`\<`AxiosResponse`\<`T`\>\>

Provides default

#### Type Parameters

• **T**

#### Parameters

• **req?**: `IncomingMessage`

Request instance

• **res?**: `ServerResponse`\<`IncomingMessage`\>

Response instance

#### Returns

`Function`

default fetcher

##### Parameters

• **url**: `string`

• **data?**: `unknown`

##### Returns

`Promise`\<`AxiosResponse`\<`T`\>\>

#### See

AxiosDataFetcher data fetcher

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:96

***

### getFetchParams()

> `protected` **getFetchParams**: (`language`?) => `FetchParams`

Provides fetch options in order to fetch data

#### Parameters

• **language?**: `string`

language will be applied to `sc_lang` param

#### Returns

`FetchParams`

fetch options

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:83

## Methods

### fetchLayoutData()

> **fetchLayoutData**(`itemPath`, `language`?, `req`?, `res`?): `Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

Fetch layout data for an item.

#### Parameters

• **itemPath**: `string`

item path to fetch layout data for.

• **language?**: `string`

the language to fetch layout data for.

• **req?**: `IncomingMessage`

Request instance

• **res?**: `ServerResponse`\<`IncomingMessage`\>

Response instance

#### Returns

`Promise`\<[`LayoutServiceData`](../interfaces/LayoutServiceData.md)\>

layout service data

#### Throws

the item with the specified path is not found

#### Overrides

`LayoutServiceBase.fetchLayoutData`

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:65

***

### fetchPlaceholderData()

> **fetchPlaceholderData**(`placeholderName`, `itemPath`, `language`?, `req`?, `res`?): `Promise`\<`PlaceholderData`\>

Fetch layout data for a particular placeholder.
Makes a request to Sitecore Layout Service for the specified placeholder in
a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.

#### Parameters

• **placeholderName**: `string`

the name of the placeholder to fetch layout data for.

• **itemPath**: `string`

the path to the item to fetch layout data for.

• **language?**: `string`

the language to fetch data for.

• **req?**: `IncomingMessage`

Request instance

• **res?**: `ServerResponse`\<`IncomingMessage`\>

Response instance

#### Returns

`Promise`\<`PlaceholderData`\>

placeholder data

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:77

***

### resolveLayoutServiceUrl()

> `protected` **resolveLayoutServiceUrl**(`apiType`): `string`

Resolves layout service url

#### Parameters

• **apiType**: `"render"` \| `"placeholder"`

which layout service API to call ('render' or 'placeholder')

#### Returns

`string`

the layout service url

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:89

***

### setupReqHeaders()

> `protected` **setupReqHeaders**(`req`): (`reqConfig`) => `AxiosRequestConfig`

Setup request headers

#### Parameters

• **req**: `IncomingMessage`

Request instance

#### Returns

`Function`

axios request config

##### Parameters

• **reqConfig**: `AxiosRequestConfig`

##### Returns

`AxiosRequestConfig`

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:102

***

### setupResHeaders()

> `protected` **setupResHeaders**(`res`): (`serverRes`) => `AxiosResponse`\<`any`\>

Setup response headers based on response from layout service

#### Parameters

• **res**: `ServerResponse`\<`IncomingMessage`\>

Response instance

#### Returns

`Function`

response

##### Parameters

• **serverRes**: `AxiosResponse`\<`any`\>

##### Returns

`AxiosResponse`\<`any`\>

#### Defined in

packages/sitecore-jss/types/layout/rest-layout-service.d.ts:108
