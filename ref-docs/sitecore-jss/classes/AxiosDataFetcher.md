[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / AxiosDataFetcher

# Class: AxiosDataFetcher

## Table of contents

### Constructors

- [constructor](AxiosDataFetcher.md#constructor)

### Properties

- [instance](AxiosDataFetcher.md#instance)

### Methods

- [delete](AxiosDataFetcher.md#delete)
- [fetch](AxiosDataFetcher.md#fetch)
- [get](AxiosDataFetcher.md#get)
- [head](AxiosDataFetcher.md#head)
- [post](AxiosDataFetcher.md#post)
- [put](AxiosDataFetcher.md#put)

## Constructors

### constructor

• **new AxiosDataFetcher**(`dataFetcherConfig?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataFetcherConfig` | [`AxiosDataFetcherConfig`](../README.md#axiosdatafetcherconfig) | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

#### Defined in

[axios-fetcher.ts:53](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L53)

## Properties

### instance

• `Private` **instance**: `AxiosInstance`

#### Defined in

[axios-fetcher.ts:46](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L46)

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

[axios-fetcher.ts:163](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L163)

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

[axios-fetcher.ts:107](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L107)

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

[axios-fetcher.ts:121](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L121)

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

[axios-fetcher.ts:131](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L131)

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

[axios-fetcher.ts:142](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L142)

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

[axios-fetcher.ts:153](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L153)
