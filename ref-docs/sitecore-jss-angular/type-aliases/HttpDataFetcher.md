[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / HttpDataFetcher

# Type Alias: HttpDataFetcher()\<T\>

> **HttpDataFetcher**\<`T`\>: (`url`, `data`?) => `Promise`\<[`HttpResponse`](../interfaces/HttpResponse.md)\<`T`\>\>

Describes functions that fetch data asynchronously (i.e. from an API endpoint).
This interface conforms to Axios' public API, but is adaptable to other HTTP libraries and
fetch polyfills.
The interface implementation must:
- Support SSR
- Comply with the rules of REST by returning appropriate response status codes when there is an error instead of throwing exceptions.
- Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests

## Type Parameters

• **T**

## Parameters

• **url**: `string`

• **data?**: `unknown`

## Returns

`Promise`\<[`HttpResponse`](../interfaces/HttpResponse.md)\<`T`\>\>

## Defined in

packages/sitecore-jss/types/data-fetcher.d.ts:23
