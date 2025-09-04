[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / RestDictionaryServiceConfig

# Type Alias: RestDictionaryServiceConfig

> **RestDictionaryServiceConfig** = [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:14](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L14)

## Type declaration

### apiHost

> **apiHost**: `string`

Your Sitecore instance hostname that is the backend for JSS

### apiKey

> **apiKey**: `string`

The Sitecore SSC API key your app uses

### dataFetcher?

> `optional` **dataFetcher**: [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`RestDictionaryServiceData`](RestDictionaryServiceData.md)\>

Custom data fetcher

#### See

HttpDataFetcher<T>

### siteName

> **siteName**: `string`

The JSS application name
