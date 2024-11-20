[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / NativeDataFetcher

# Class: NativeDataFetcher

## Constructors

### new NativeDataFetcher()

> **new NativeDataFetcher**(`config`?): [`NativeDataFetcher`](NativeDataFetcher.md)

#### Parameters

• **config?**: [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md)

#### Returns

[`NativeDataFetcher`](NativeDataFetcher.md)

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:21

## Properties

### config

> `protected` **config**: [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md)

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:19

## Methods

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`?): `object`

Safely extract all headers for debug logging

#### Parameters

• **incomingHeaders?**: `HeadersInit`

Incoming headers

#### Returns

`object`

Object with headers as key/value pairs

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:41

***

### fetch()

> **fetch**\<`T`\>(`url`, `data`?): `Promise`\<[`HttpResponse`](../interfaces/HttpResponse.md)\<`T`\>\>

Implements a data fetcher.

#### Type Parameters

• **T**

#### Parameters

• **url**: `string`

The URL to request; may include query string

• **data?**: `unknown`

Optional data to POST with the request.

#### Returns

`Promise`\<[`HttpResponse`](../interfaces/HttpResponse.md)\<`T`\>\>

response

#### See

HttpDataFetcher<T> type for implementation details/notes.

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:28

***

### getRequestInit()

> `protected` **getRequestInit**(`init`?, `data`?): `RequestInit`

Determines settings for the request

#### Parameters

• **init?**: `RequestInit`

Custom settings for request

• **data?**: `unknown`

Optional data to POST with the request

#### Returns

`RequestInit`

The final request settings

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:35
