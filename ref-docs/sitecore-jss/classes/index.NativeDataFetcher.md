[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / NativeDataFetcher

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
| `config` | [`NativeDataFetcherConfig`](../modules/index.md#nativedatafetcherconfig) |

#### Defined in

[src/native-fetcher.ts:25](https://github.com/Sitecore/jss/blob/0c74c401b/packages/sitecore-jss/src/native-fetcher.ts#L25)

## Properties

### abortTimeout

• `Private` `Optional` **abortTimeout**: `default`

#### Defined in

[src/native-fetcher.ts:23](https://github.com/Sitecore/jss/blob/0c74c401b/packages/sitecore-jss/src/native-fetcher.ts#L23)

___

### config

• `Protected` **config**: [`NativeDataFetcherConfig`](../modules/index.md#nativedatafetcherconfig) = `{}`

#### Defined in

[src/native-fetcher.ts:25](https://github.com/Sitecore/jss/blob/0c74c401b/packages/sitecore-jss/src/native-fetcher.ts#L25)

## Methods

### extractDebugHeaders

▸ `Protected` **extractDebugHeaders**(`incomingHeaders?`): `Object`

Safely extract all headers for debug logging

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `incomingHeaders` | `HeadersInit` | Incoming headers |

#### Returns

`Object`

Object with headers as key/value pairs

#### Defined in

[src/native-fetcher.ts:114](https://github.com/Sitecore/jss/blob/0c74c401b/packages/sitecore-jss/src/native-fetcher.ts#L114)

___

### fetch

▸ **fetch**<`T`\>(`url`, `data?`): `Promise`<[`HttpResponse`](../interfaces/index.HttpResponse.md)<`T`\>\>

Implements a data fetcher.

**`See`**

HttpDataFetcher<T> type for implementation details/notes.

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

`Promise`<[`HttpResponse`](../interfaces/index.HttpResponse.md)<`T`\>\>

response

#### Defined in

[src/native-fetcher.ts:33](https://github.com/Sitecore/jss/blob/0c74c401b/packages/sitecore-jss/src/native-fetcher.ts#L33)

___

### getRequestInit

▸ `Protected` **getRequestInit**(`init?`, `data?`): `RequestInit`

Determines settings for the request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `init` | `RequestInit` | Custom settings for request |
| `data?` | `unknown` | Optional data to POST with the request |

#### Returns

`RequestInit`

The final request settings

#### Defined in

[src/native-fetcher.ts:96](https://github.com/Sitecore/jss/blob/0c74c401b/packages/sitecore-jss/src/native-fetcher.ts#L96)
