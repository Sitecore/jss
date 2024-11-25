[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / AxiosDataFetcher

# Class: AxiosDataFetcher

AxisoDataFetcher is a wrapper for axios library.

## Constructors

### new AxiosDataFetcher()

> **new AxiosDataFetcher**(`dataFetcherConfig`): [`AxiosDataFetcher`](AxiosDataFetcher.md)

#### Parameters

• **dataFetcherConfig**: [`AxiosDataFetcherConfig`](../type-aliases/AxiosDataFetcherConfig.md) = `{}`

Axios data fetcher configuration.
Note `withCredentials` is set to `true` by default in order for Sitecore cookies to
be included in CORS requests (which is necessary for analytics and such).

#### Returns

[`AxiosDataFetcher`](AxiosDataFetcher.md)

#### Defined in

[packages/sitecore-jss/src/axios-fetcher.ts:56](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/axios-fetcher.ts#L56)

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

[packages/sitecore-jss/src/axios-fetcher.ts:177](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/axios-fetcher.ts#L177)

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

[packages/sitecore-jss/src/axios-fetcher.ts:121](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/axios-fetcher.ts#L121)

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

[packages/sitecore-jss/src/axios-fetcher.ts:135](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/axios-fetcher.ts#L135)

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

[packages/sitecore-jss/src/axios-fetcher.ts:145](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/axios-fetcher.ts#L145)

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

[packages/sitecore-jss/src/axios-fetcher.ts:156](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/axios-fetcher.ts#L156)

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

[packages/sitecore-jss/src/axios-fetcher.ts:167](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss/src/axios-fetcher.ts#L167)
