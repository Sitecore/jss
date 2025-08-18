[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / NativeDataFetcher

# Class: NativeDataFetcher

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:54](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L54)

## Constructors

### Constructor

> **new NativeDataFetcher**(`config`): `NativeDataFetcher`

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:57](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L57)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md) |

#### Returns

`NativeDataFetcher`

## Properties

### config

> `protected` **config**: [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md) = `{}`

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:57](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L57)

## Methods

### delete()

> **delete**\<`T`\>(`url`, `options?`): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:150](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L150)

Perform a DELETE request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `options?` | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

***

### extractDebugHeaders()

> `protected` **extractDebugHeaders**(`incomingHeaders`): `object`

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:201](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L201)

Safely extract all headers for debug logging

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `incomingHeaders` | `HeadersInit` | Incoming headers |

#### Returns

`object`

Object with headers as key/value pairs

***

### fetch()

> **fetch**\<`T`\>(`url`, `options?`): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:65](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L65)

Implements a data fetcher.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `options?` | `RequestInit` | Optional fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

***

### get()

> **get**\<`T`\>(`url`, `options?`): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:125](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L125)

Perform a GET request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `options?` | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

***

### getRequestInit()

> `protected` **getRequestInit**(`init`): `RequestInit`

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:184](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L184)

Determines settings for the request

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `init` | `RequestInit` | Custom settings for request |

#### Returns

`RequestInit`

The final request settings

***

### head()

> **head**\<`T`\>(`url`, `options?`): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:175](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L175)

Perform a HEAD request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL to request (may include query string) |
| `options?` | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

***

### post()

> **post**\<`T`\>(`url`, `body`, `options?`): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:136](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L136)

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
| `options?` | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response

***

### put()

> **put**\<`T`\>(`url`, `body`, `options?`): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

Defined in: [packages/sitecore-jss/src/native-fetcher.ts:161](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/native-fetcher.ts#L161)

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
| `options?` | `RequestInit` | Fetch options |

#### Returns

`Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

response
