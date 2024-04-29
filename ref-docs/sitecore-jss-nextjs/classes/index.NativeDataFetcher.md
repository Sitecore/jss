[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / NativeDataFetcher

# Class: NativeDataFetcher

[index](../modules/index.md).NativeDataFetcher

## Table of contents

### Constructors

- [constructor](index.NativeDataFetcher.md#constructor)

### Properties

- [abortTimeout](index.NativeDataFetcher.md#aborttimeout)
- [config](index.NativeDataFetcher.md#config)

### Methods

- [extractDebugHeaders](index.NativeDataFetcher.md#extractdebugheaders)
- [fetch](index.NativeDataFetcher.md#fetch)
- [getRequestInit](index.NativeDataFetcher.md#getrequestinit)

## Constructors

### constructor

• **new NativeDataFetcher**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`NativeDataFetcherConfig`](../modules/index.md#nativedatafetcherconfig) |

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:21

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `any`

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:20

___

### config

• `Protected` **config**: [`NativeDataFetcherConfig`](../modules/index.md#nativedatafetcherconfig)

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:19

## Methods

### extractDebugHeaders

▸ `Protected` **extractDebugHeaders**(`incomingHeaders?`): `Object`

Safely extract all headers for debug logging

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `incomingHeaders?` | `HeadersInit` | Incoming headers |

#### Returns

`Object`

Object with headers as key/value pairs

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:41

___

### fetch

▸ **fetch**\<`T`\>(`url`, `data?`): `Promise`\<[`HttpResponse`](../interfaces/index.HttpResponse.md)\<`T`\>\>

Implements a data fetcher.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `data?` | `unknown` | Optional data to POST with the request. |

#### Returns

`Promise`\<[`HttpResponse`](../interfaces/index.HttpResponse.md)\<`T`\>\>

response

**`See`**

HttpDataFetcher<T> type for implementation details/notes.

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:28

___

### getRequestInit

▸ `Protected` **getRequestInit**(`init?`, `data?`): `RequestInit`

Determines settings for the request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `init?` | `RequestInit` | Custom settings for request |
| `data?` | `unknown` | Optional data to POST with the request |

#### Returns

`RequestInit`

The final request settings

#### Defined in

sitecore-jss/types/native-fetcher.d.ts:35
