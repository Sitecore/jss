[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / AxiosDataFetcher

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
| `dataFetcherConfig` | [`AxiosDataFetcherConfig`](../modules/index.md#axiosdatafetcherconfig) | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

#### Defined in

[src/axios-fetcher.ts:56](https://github.com/Sitecore/jss/blob/aed30a4f5/packages/sitecore-jss/src/axios-fetcher.ts#L56)

## Properties

### instance

• `Private` **instance**: `AxiosInstance`

#### Defined in

[src/axios-fetcher.ts:49](https://github.com/Sitecore/jss/blob/aed30a4f5/packages/sitecore-jss/src/axios-fetcher.ts#L49)

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

[src/axios-fetcher.ts:177](https://github.com/Sitecore/jss/blob/aed30a4f5/packages/sitecore-jss/src/axios-fetcher.ts#L177)

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

[src/axios-fetcher.ts:121](https://github.com/Sitecore/jss/blob/aed30a4f5/packages/sitecore-jss/src/axios-fetcher.ts#L121)

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

[src/axios-fetcher.ts:135](https://github.com/Sitecore/jss/blob/aed30a4f5/packages/sitecore-jss/src/axios-fetcher.ts#L135)

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

[src/axios-fetcher.ts:145](https://github.com/Sitecore/jss/blob/aed30a4f5/packages/sitecore-jss/src/axios-fetcher.ts#L145)

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

[src/axios-fetcher.ts:156](https://github.com/Sitecore/jss/blob/aed30a4f5/packages/sitecore-jss/src/axios-fetcher.ts#L156)

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

[src/axios-fetcher.ts:167](https://github.com/Sitecore/jss/blob/aed30a4f5/packages/sitecore-jss/src/axios-fetcher.ts#L167)
