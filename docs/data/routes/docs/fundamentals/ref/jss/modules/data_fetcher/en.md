---
name: data_fetcher
routeTemplate: ./data/component-templates/article.yml
title: data_fetcher
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / data-fetcher

# Module: data-fetcher

## Table of contents

### Interfaces

- [HttpResponse](/docs/fundamentals/ref/jss/interfaces/data_fetcher/httpresponse)

### Type aliases

- [HttpDataFetcher](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)

### Functions

- [fetchData](/docs/fundamentals/ref/jss/modules/data_fetcher#fetchdata)

## Type aliases

### HttpDataFetcher

Ƭ **HttpDataFetcher**<`T`\>: (`url`: `string`, `data?`: { [key: string]: `unknown`;  }) => `Promise`<[`HttpResponse`](/docs/fundamentals/ref/jss/interfaces/data_fetcher/httpresponse)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`url`, `data?`): `Promise`<[`HttpResponse`](/docs/fundamentals/ref/jss/interfaces/data_fetcher/httpresponse)<`T`\>\>

Describes functions that fetch data asynchronously (i.e. from an API endpoint).
This interface conforms to Axios' public API, but is adaptable to other HTTP libraries and
fetch polyfills.
The interface implementation must:
- Support SSR
- Comply with the rules of REST by returning appropriate response status codes when there is an error instead of throwing exceptions.
- Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `data?` | `Object` |

##### Returns

`Promise`<[`HttpResponse`](/docs/fundamentals/ref/jss/interfaces/data_fetcher/httpresponse)<`T`\>\>

## Functions

### fetchData

▸ **fetchData**<`T`\>(`url`, `fetcher`, `params?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `fetcher` | [`HttpDataFetcher`](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)<`T`\> |
| `params` | `querystring.ParsedUrlQueryInput` |

#### Returns

`Promise`<`T`\>
