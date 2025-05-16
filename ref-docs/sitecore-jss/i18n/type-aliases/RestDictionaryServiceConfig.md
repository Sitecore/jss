[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / RestDictionaryServiceConfig

# Type Alias: RestDictionaryServiceConfig

> **RestDictionaryServiceConfig**: [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

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

## Defined in

[packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:14](https://github.com/Sitecore/jss/blob/14068e13d97b2f9a6b2ce3492264bc318c225ff1/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L14)
