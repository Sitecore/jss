[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / NativeDataFetcher

# Class: NativeDataFetcher

[index](../modules/index.md).NativeDataFetcher

## Table of contents

### Constructors

- [constructor](index.NativeDataFetcher.md#constructor)

### Properties

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

[native-fetcher.ts:23](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/native-fetcher.ts#L23)

## Properties

### config

• `Protected` **config**: [`NativeDataFetcherConfig`](../modules/index.md#nativedatafetcherconfig) = `{}`

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

[native-fetcher.ts:114](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/native-fetcher.ts#L114)

___

### fetch

▸ **fetch**<`T`\>(`url`, `data?`): `Promise`<[`HttpResponse`](../interfaces/index.HttpResponse.md)<`T`\>\>

Implements a data fetcher. @see HttpDataFetcher<T> type for implementation details/notes.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `data?` | `unknown` | - |

#### Returns

`Promise`<[`HttpResponse`](../interfaces/index.HttpResponse.md)<`T`\>\>

response

#### Defined in

[native-fetcher.ts:31](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/native-fetcher.ts#L31)

___

### getRequestInit

▸ `Protected` **getRequestInit**(`init?`, `data?`): `RequestInit`

Determines settings for the request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `init` | `RequestInit` | Custom settings for request |
| `data?` | `unknown` | - |

#### Returns

`RequestInit`

The final request settings

#### Defined in

[native-fetcher.ts:96](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss/src/native-fetcher.ts#L96)
