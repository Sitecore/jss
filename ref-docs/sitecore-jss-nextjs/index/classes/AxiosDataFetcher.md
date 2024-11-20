[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / AxiosDataFetcher

# Class: AxiosDataFetcher

AxisoDataFetcher is a wrapper for axios library.

## Constructors

### new AxiosDataFetcher()

> **new AxiosDataFetcher**(`dataFetcherConfig`?): [`AxiosDataFetcher`](AxiosDataFetcher.md)

#### Parameters

• **dataFetcherConfig?**: [`AxiosDataFetcherConfig`](../type-aliases/AxiosDataFetcherConfig.md)

Axios data fetcher configuration.
Note `withCredentials` is set to `true` by default in order for Sitecore cookies to
be included in CORS requests (which is necessary for analytics and such).

#### Returns

[`AxiosDataFetcher`](AxiosDataFetcher.md)

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:44

## Methods

### delete()

> **delete**(`url`, `config`?): `Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`any`\>\>

Perform a DELETE request

#### Parameters

• **url**: `string`

The URL to request; may include query string

• **config?**: `AxiosRequestConfig`

Axios config

#### Returns

`Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`any`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:88

***

### fetch()

> **fetch**\<`T`\>(`url`, `data`?): `Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`T`\>\>

Implements a data fetcher.

#### Type Parameters

• **T**

#### Parameters

• **url**: `string`

The URL to request; may include query string

• **data?**: `unknown`

Optional data to POST with the request.

#### Returns

`Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`T`\>\>

response

#### See

HttpDataFetcher<T> type for implementation details/notes.

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:51

***

### get()

> **get**\<`T`\>(`url`, `config`?): `Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`T`\>\>

Perform a GET request

#### Type Parameters

• **T**

#### Parameters

• **url**: `string`

The URL to request; may include query string

• **config?**: `AxiosRequestConfig`

Axios config

#### Returns

`Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`T`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:58

***

### head()

> **head**(`url`, `config`?): `Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`any`\>\>

Perform a HEAD request

#### Parameters

• **url**: `string`

The URL to request; may include query string

• **config?**: `AxiosRequestConfig`

Axios config

#### Returns

`Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`any`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:65

***

### post()

> **post**(`url`, `data`?, `config`?): `Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`any`\>\>

Perform a POST request

#### Parameters

• **url**: `string`

The URL to request; may include query string

• **data?**: `unknown`

Data to POST with the request.

• **config?**: `AxiosRequestConfig`

Axios config

#### Returns

`Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`any`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:73

***

### put()

> **put**(`url`, `data`?, `config`?): `Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`any`\>\>

Perform a PUT request

#### Parameters

• **url**: `string`

The URL to request; may include query string

• **data?**: `unknown`

Data to PUT with the request.

• **config?**: `AxiosRequestConfig`

Axios config

#### Returns

`Promise`\<[`AxiosResponse`](../interfaces/AxiosResponse.md)\<`any`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:81
