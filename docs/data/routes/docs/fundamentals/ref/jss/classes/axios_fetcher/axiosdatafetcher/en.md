---
name: axiosdatafetcher
routeTemplate: ./data/component-templates/article.yml
title: axiosdatafetcher
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [axios-fetcher](/docs/fundamentals/ref/jss/modules/axios_fetcher) / AxiosDataFetcher

# Class: AxiosDataFetcher

[axios-fetcher](/docs/fundamentals/ref/jss/modules/axios_fetcher).AxiosDataFetcher

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/axios_fetcher/axiosdatafetcher#constructor)

### Properties

- [instance](/docs/fundamentals/ref/jss/classes/axios_fetcher/axiosdatafetcher#instance)

### Methods

- [delete](/docs/fundamentals/ref/jss/classes/axios_fetcher/axiosdatafetcher#delete)
- [fetch](/docs/fundamentals/ref/jss/classes/axios_fetcher/axiosdatafetcher#fetch)
- [get](/docs/fundamentals/ref/jss/classes/axios_fetcher/axiosdatafetcher#get)
- [head](/docs/fundamentals/ref/jss/classes/axios_fetcher/axiosdatafetcher#head)
- [post](/docs/fundamentals/ref/jss/classes/axios_fetcher/axiosdatafetcher#post)
- [put](/docs/fundamentals/ref/jss/classes/axios_fetcher/axiosdatafetcher#put)

## Constructors

### constructor

• **new AxiosDataFetcher**(`dataFetcherConfig?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataFetcherConfig` | [`AxiosDataFetcherConfig`](/docs/fundamentals/ref/jss/modules/axios_fetcher#axiosdatafetcherconfig) | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

## Properties

### instance

• `Private` **instance**: `AxiosInstance`

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
