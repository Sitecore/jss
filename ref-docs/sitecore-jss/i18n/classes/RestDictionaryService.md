[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / RestDictionaryService

# Class: RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Extends

- [`DictionaryServiceBase`](DictionaryServiceBase.md)

## Constructors

### new RestDictionaryService()

> **new RestDictionaryService**(`options`): [`RestDictionaryService`](RestDictionaryService.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`RestDictionaryServiceConfig`](../type-aliases/RestDictionaryServiceConfig.md) |

#### Returns

[`RestDictionaryService`](RestDictionaryService.md)

#### Overrides

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`constructor`](DictionaryServiceBase.md#constructors)

#### Defined in

[packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:40](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L40)

## Properties

### options

> **options**: [`RestDictionaryServiceConfig`](../type-aliases/RestDictionaryServiceConfig.md)

Configuration options

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`options`](DictionaryServiceBase.md#options)

#### Defined in

[packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:40](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L40)

## Accessors

### defaultFetcher

#### Get Signature

> **get** **defaultFetcher**(): [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`RestDictionaryServiceData`](../type-aliases/RestDictionaryServiceData.md)\>

Provides default

##### See

AxiosDataFetcher data fetcher

##### Returns

[`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`RestDictionaryServiceData`](../type-aliases/RestDictionaryServiceData.md)\>

#### Defined in

[packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:47](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L47)

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

#### Overrides

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`fetchDictionaryData`](DictionaryServiceBase.md#fetchdictionarydata)

#### Defined in

[packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:61](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L61)

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`getCacheClient`](DictionaryServiceBase.md#getcacheclient)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

***

### getCacheValue()

> **getCacheValue**(`key`): `null` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Retrieves a

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The cache key. |

#### Returns

`null` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The

#### See

 - DictionaryPhrases value from the cache.
 - DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`getCacheValue`](DictionaryServiceBase.md#getcachevalue)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

***

### getUrl()

> `protected` **getUrl**(`language`): `string`

Generate dictionary service url

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`string`

dictionary service url

#### Defined in

[packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:83](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L83)

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Caches a

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md) | The value to cache. |

#### Returns

[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The value added to the cache.

#### See

DictionaryPhrases value for the specified cache key.

#### Mixes

CacheClient<DictionaryPhrases>

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`setCacheValue`](DictionaryServiceBase.md#setcachevalue)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
