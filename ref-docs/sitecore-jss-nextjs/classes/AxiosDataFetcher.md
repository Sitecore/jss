<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / AxiosDataFetcher
=======
[@sitecore-jss/sitecore-jss-nextjs](../README.md) / AxiosDataFetcher
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md

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
<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
| `dataFetcherConfig` | [`AxiosDataFetcherConfig`](../README.md#axiosdatafetcherconfig) | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

#### Defined in

[axios-fetcher.ts:53](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L53)
=======
| `dataFetcherConfig?` | [`AxiosDataFetcherConfig`](../README.md#axiosdatafetcherconfig) | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

#### Defined in

sitecore-jss/types/axios-fetcher.d.ts:41
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md

## Properties

### instance

• `Private` **instance**: `any`

#### Defined in

<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
[axios-fetcher.ts:46](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L46)
=======
sitecore-jss/types/axios-fetcher.d.ts:35
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md

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

<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
[axios-fetcher.ts:163](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L163)
=======
sitecore-jss/types/axios-fetcher.d.ts:85
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md

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

<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
[axios-fetcher.ts:107](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L107)
=======
sitecore-jss/types/axios-fetcher.d.ts:48
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md

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

<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
[axios-fetcher.ts:121](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L121)
=======
sitecore-jss/types/axios-fetcher.d.ts:55
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md

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

<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
[axios-fetcher.ts:131](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L131)
=======
sitecore-jss/types/axios-fetcher.d.ts:62
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md

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

<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
[axios-fetcher.ts:142](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L142)
=======
sitecore-jss/types/axios-fetcher.d.ts:70
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md

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

<<<<<<< HEAD:ref-docs/sitecore-jss/classes/AxiosDataFetcher.md
[axios-fetcher.ts:153](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/axios-fetcher.ts#L153)
=======
sitecore-jss/types/axios-fetcher.d.ts:78
>>>>>>> release/20.0.0:ref-docs/sitecore-jss-nextjs/classes/AxiosDataFetcher.md
