[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / AxiosDataFetcher

# Class: AxiosDataFetcher

[index](../modules/index.md).AxiosDataFetcher

AxisoDataFetcher is a wrapper for axios library.

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

sitecore-jss/types/axios-fetcher.d.ts:44

## Properties

### instance

• `Private` **instance**: `any`

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:38

## Methods

### delete

▸ **delete**(`url`, `config?`): `Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>\>

Perform a DELETE request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `config?` | `AxiosRequestConfig` | Axios config |

#### Returns

`Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:88

___

### fetch

▸ **fetch**<`T`\>(`url`, `data?`): `Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`T`\>\>

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

`Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`T`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:51

___

### get

▸ **get**<`T`\>(`url`, `config?`): `Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`T`\>\>

Perform a GET request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `config?` | `AxiosRequestConfig` | Axios config |

#### Returns

`Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`T`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:58

___

### head

▸ **head**(`url`, `config?`): `Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>\>

Perform a HEAD request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `config?` | `AxiosRequestConfig` | Axios config |

#### Returns

`Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:65

___

### post

▸ **post**(`url`, `data?`, `config?`): `Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>\>

Perform a POST request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `data?` | `unknown` | Data to POST with the request. |
| `config?` | `AxiosRequestConfig` | Axios config |

#### Returns

`Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:73

___

### put

▸ **put**(`url`, `data?`, `config?`): `Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>\>

Perform a PUT request

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to request; may include query string |
| `data?` | `unknown` | Data to PUT with the request. |
| `config?` | `AxiosRequestConfig` | Axios config |

#### Returns

`Promise`<[`AxiosResponse`](../interfaces/index.AxiosResponse.md)<`any`\>\>

response

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:81
