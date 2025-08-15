[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / RestDictionaryServiceConfig

# Type Alias: RestDictionaryServiceConfig

> **RestDictionaryServiceConfig** = [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:14](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L14)

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
