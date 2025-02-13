[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / NativeDataFetcher

# Class: NativeDataFetcher

## Constructors

### new NativeDataFetcher()

> **new NativeDataFetcher**(`config`): [`NativeDataFetcher`](NativeDataFetcher.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md) |

#### Returns

[`NativeDataFetcher`](NativeDataFetcher.md)

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:57](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L57)

## Properties

### config

> `protected` **config**: [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md) = `{}`

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:57](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L57)

## Methods

### delete()

> **delete**\<`T`\>(`url`, `options`?): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Perform a DELETE request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `options`? | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:145](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L145)

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Safely extract all headers for debug logging

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `incomingHeaders` | `HeadersInit` | Incoming headers |

#### Returns

`object`

Object with headers as key/value pairs

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:196](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L196)

***

### fetch()

> **fetch**\<`T`\>(`url`, `options`?): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Implements a data fetcher.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `options`? | `RequestInit` | Optional fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:65](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L65)

***

### get()

> **get**\<`T`\>(`url`, `options`?): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Perform a GET request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `options`? | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:120](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L120)

***

### getRequestInit()

> `protected` **getRequestInit**(`init`): `RequestInit`

Determines settings for the request

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `init` | `RequestInit` | Custom settings for request |

#### Returns

`RequestInit`

The final request settings

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:179](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L179)

***

### head()

> **head**\<`T`\>(`url`, `options`?): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Perform a HEAD request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `options`? | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:170](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L170)

***

### post()

> **post**\<`T`\>(`url`, `body`, `options`?): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Perform a POST request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `body` | `unknown` | The data to send with the request |
| `options`? | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:131](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L131)

***

### put()

> **put**\<`T`\>(`url`, `body`, `options`?): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Perform a PUT request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `body` | `unknown` | The data to send with the request |
| `options`? | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

#### Defined in

[packages/sitecore-jss/src/native-fetcher.ts:156](https://github.com/Sitecore/jss/blob/ae6f916d439f946bec091261304f83eefbcedd38/packages/sitecore-jss/src/native-fetcher.ts#L156)
