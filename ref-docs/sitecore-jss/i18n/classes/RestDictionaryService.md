[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / RestDictionaryService

# Class: RestDictionaryService

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:39](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L39)

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses NativeDataFetcher as the default data fetcher (@see NativeDataFetcher).

## Extends

- [`DictionaryServiceBase`](DictionaryServiceBase.md)

## Constructors

### Constructor

> **new RestDictionaryService**(`options`): `RestDictionaryService`

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:40](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L40)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`RestDictionaryServiceConfig`](../type-aliases/RestDictionaryServiceConfig.md) |

#### Returns

`RestDictionaryService`

#### Overrides

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`constructor`](DictionaryServiceBase.md#constructor)

## Properties

### options

> **options**: [`RestDictionaryServiceConfig`](../type-aliases/RestDictionaryServiceConfig.md)

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:40](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L40)

Configuration options

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`options`](DictionaryServiceBase.md#options)

## Accessors

### defaultFetcher

#### Get Signature

> **get** **defaultFetcher**(): [`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`RestDictionaryServiceData`](../type-aliases/RestDictionaryServiceData.md)\>

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:47](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L47)

Provides default

##### See

NativeDataFetcher data fetcher

##### Returns

[`HttpDataFetcher`](../../index/type-aliases/HttpDataFetcher.md)\<[`RestDictionaryServiceData`](../type-aliases/RestDictionaryServiceData.md)\>

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:61](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L61)

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

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`getCacheClient`](DictionaryServiceBase.md#getcacheclient)

***

### getCacheValue()

> **getCacheValue**(`key`): `null` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

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

***

### getUrl()

> `protected` **getUrl**(`language`): `string`

Defined in: [packages/sitecore-jss/src/i18n/rest-dictionary-service.ts:83](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L83)

Generate dictionary service url

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`string`

dictionary service url

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)

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
