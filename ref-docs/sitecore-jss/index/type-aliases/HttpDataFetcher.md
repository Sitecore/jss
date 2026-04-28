[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / HttpDataFetcher

# Type Alias: HttpDataFetcher\<T\>

> **HttpDataFetcher**\<`T`\> = (`url`, `data?`) => `Promise`\<[`HttpResponse`](../interfaces/HttpResponse.md)\<`T`\>\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/data-fetcher.ts:27](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/data-fetcher.ts#L27)
=======
Defined in: [packages/sitecore-jss/src/data-fetcher.ts:27](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/data-fetcher.ts#L27)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Describes functions that fetch data asynchronously (i.e. from an API endpoint).
This interface conforms to 'fetch' public API, but is adaptable to other HTTP libraries and
fetch polyfills.
The interface implementation must:
- Support SSR
- Comply with the rules of REST by returning appropriate response status codes when there is an error instead of throwing exceptions.
- Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `data?` | `unknown` |

## Returns

`Promise`\<[`HttpResponse`](../interfaces/HttpResponse.md)\<`T`\>\>
