[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / NativeDataFetcher

# Class: NativeDataFetcher

## Constructors

### new NativeDataFetcher()

> **new NativeDataFetcher**(`config`): [`NativeDataFetcher`](NativeDataFetcher.md)

#### Parameters

• **config**: [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md) = `{}`

#### Returns

[`NativeDataFetcher`](NativeDataFetcher.md)

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:25](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/native-fetcher.ts#L25)

## Properties

### config

> `protected` **config**: [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md) = `{}`

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:25](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/native-fetcher.ts#L25)

## Methods

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Safely extract all headers for debug logging

#### Parameters

• **incomingHeaders**: `HeadersInit` = `{}`

Incoming headers

#### Returns

`object`

Object with headers as key/value pairs

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:115](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/native-fetcher.ts#L115)

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

[packages/sitecore-jss/src/native-fetcher.ts:33](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/native-fetcher.ts#L33)

***

### getRequestInit()

> `protected` **getRequestInit**(`init`, `data`?): `RequestInit`

Determines settings for the request

#### Parameters

• **init**: `RequestInit` = `{}`

Custom settings for request

• **data?**: `unknown`

Optional data to POST with the request

#### Returns

`RequestInit`

The final request settings

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:97](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/native-fetcher.ts#L97)
