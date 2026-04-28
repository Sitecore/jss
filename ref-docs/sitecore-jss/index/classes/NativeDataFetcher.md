[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / NativeDataFetcher

# Class: NativeDataFetcher

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:54](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L54)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:54](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L54)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Constructors

### Constructor

> **new NativeDataFetcher**(`config`): `NativeDataFetcher`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:57](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L57)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:57](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L57)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md) |

#### Returns

`NativeDataFetcher`

## Properties

### config

> `protected` **config**: [`NativeDataFetcherConfig`](../type-aliases/NativeDataFetcherConfig.md) = `{}`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:57](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L57)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:57](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L57)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Methods

### delete()

> **delete**\<`T`\>(`url`, `options?`): `Promise`\<[`NativeDataFetcherResponse`](../interfaces/NativeDataFetcherResponse.md)\<`T`\>\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:150](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L150)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:150](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L150)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:201](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L201)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:201](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L201)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:65](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L65)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:65](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L65)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:125](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L125)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:125](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L125)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:184](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L184)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:184](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L184)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:175](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L175)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:175](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L175)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:136](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L136)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:136](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L136)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:161](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/native-fetcher.ts#L161)
=======
Defined in: [packages/sitecore-jss/src/native-fetcher.ts:161](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/native-fetcher.ts#L161)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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
