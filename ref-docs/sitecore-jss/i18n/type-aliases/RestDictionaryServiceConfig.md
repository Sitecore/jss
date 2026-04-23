[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / RestDictionaryServiceConfig

# Type Alias: RestDictionaryServiceConfig

> **RestDictionaryServiceConfig** = [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:14](https://github.com/Sitecore/jss/blob/160c9db33d573313249f7ebd0d506c84e50e0731/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L14)

## Type Declaration

### apiHost

> **apiHost**: `string`

Your Sitecore instance hostname that is the backend for JSS

### apiKey

> **apiKey**: `string`

The Sitecore SSC API key your app uses

### dataFetcher?

> `optional` **dataFetcher?**: [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`RestDictionaryServiceData`](RestDictionaryServiceData.md)\>

Custom data fetcher

#### See

HttpDataFetcher<T>

### siteName

> **siteName**: `string`

The JSS application name
