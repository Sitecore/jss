---
name: axiosdatafetcher
routeTemplate: ./data/component-templates/article.yml
title: axiosdatafetcher
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [index](/docs/nextjs/ref/modules/index) / AxiosDataFetcher

# Class: AxiosDataFetcher

[index](/docs/nextjs/ref/modules/index).AxiosDataFetcher

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/index/axiosdatafetcher#constructor)

### Properties

- [instance](/docs/nextjs/ref/classes/index/axiosdatafetcher#instance)

### Methods

- [delete](/docs/nextjs/ref/classes/index/axiosdatafetcher#delete)
- [fetch](/docs/nextjs/ref/classes/index/axiosdatafetcher#fetch)
- [get](/docs/nextjs/ref/classes/index/axiosdatafetcher#get)
- [head](/docs/nextjs/ref/classes/index/axiosdatafetcher#head)
- [post](/docs/nextjs/ref/classes/index/axiosdatafetcher#post)
- [put](/docs/nextjs/ref/classes/index/axiosdatafetcher#put)

## Constructors

### constructor

• **new AxiosDataFetcher**(`dataFetcherConfig?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataFetcherConfig?` | [`AxiosDataFetcherConfig`](/docs/nextjs/ref/modules/index#axiosdatafetcherconfig) | Axios data fetcher configuration. Note `withCredentials` is set to `true` by default in order for Sitecore cookies to be included in CORS requests (which is necessary for analytics and such). |

## Properties

### instance

• `Private` **instance**: `any`

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
