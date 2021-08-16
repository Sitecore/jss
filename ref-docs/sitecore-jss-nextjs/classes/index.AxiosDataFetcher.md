[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [index](../modules/index.md) / AxiosDataFetcher

# Class: AxiosDataFetcher

[index](../modules/index.md).AxiosDataFetcher

## Table of contents

### Constructors

- [constructor](index.AxiosDataFetcher.md#constructor)

### Properties

- [instance](index.AxiosDataFetcher.md#instance)

### Methods

- [delete](index.AxiosDataFetcher.md#delete)
- [fetch](index.AxiosDataFetcher.md#fetch)
- [get](index.AxiosDataFetcher.md#get)
- [head](index.AxiosDataFetcher.md#head)
- [post](index.AxiosDataFetcher.md#post)
- [put](index.AxiosDataFetcher.md#put)

## Constructors

### constructor

• **new AxiosDataFetcher**(`dataFetcherConfig?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataFetcherConfig?` | [`AxiosDataFetcherConfig`](../modules/index.md#axiosdatafetcherconfig) | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/axios-fetcher.d.ts:41

## Properties

### instance

• `Private` **instance**: `any`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/axios-fetcher.d.ts:35

## Methods

### delete

▸ **delete**(`url`, `config?`): `Promise`<`AxiosResponse`<`any`\>\>

Perform a DELETE request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `config?` | `AxiosRequestConfig` | - |

#### Returns

`Promise`<`AxiosResponse`<`any`\>\>

response

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/axios-fetcher.d.ts:85

___

### fetch

▸ **fetch**<`T`\>(`url`, `data?`): `Promise`<`AxiosResponse`<`T`\>\>

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

`Promise`<`AxiosResponse`<`T`\>\>

response

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/axios-fetcher.d.ts:48

___

### get

▸ **get**<`T`\>(`url`, `config?`): `Promise`<`AxiosResponse`<`T`\>\>

Perform a GET request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `config?` | `AxiosRequestConfig` | - |

#### Returns

`Promise`<`AxiosResponse`<`T`\>\>

response

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/axios-fetcher.d.ts:55

___

### head

▸ **head**(`url`, `config?`): `Promise`<`AxiosResponse`<`any`\>\>

Perform a HEAD request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `config?` | `AxiosRequestConfig` | - |

#### Returns

`Promise`<`AxiosResponse`<`any`\>\>

response

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/axios-fetcher.d.ts:62

___

### post

▸ **post**(`url`, `data?`, `config?`): `Promise`<`AxiosResponse`<`any`\>\>

Perform a POST request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `data?` | `unknown` | - |
| `config?` | `AxiosRequestConfig` | - |

#### Returns

`Promise`<`AxiosResponse`<`any`\>\>

response

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/axios-fetcher.d.ts:70

___

### put

▸ **put**(`url`, `data?`, `config?`): `Promise`<`AxiosResponse`<`any`\>\>

Perform a PUT request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `data?` | `unknown` | - |
| `config?` | `AxiosRequestConfig` | - |

#### Returns

`Promise`<`AxiosResponse`<`any`\>\>

response

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/axios-fetcher.d.ts:78
