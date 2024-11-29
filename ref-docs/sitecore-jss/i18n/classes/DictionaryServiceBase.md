[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / DictionaryServiceBase

# Class: `abstract` DictionaryServiceBase

Base implementation of

## See

DictionaryService that handles caching dictionary values

## Extended by

- [`GraphQLDictionaryService`](GraphQLDictionaryService.md)
- [`RestDictionaryService`](RestDictionaryService.md)

## Implements

- [`DictionaryService`](../interfaces/DictionaryService.md)
- [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

## Constructors

### new DictionaryServiceBase()

> **new DictionaryServiceBase**(`options`): [`DictionaryServiceBase`](DictionaryServiceBase.md)

Initializes a new instance of

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`CacheOptions`](../../index/interfaces/CacheOptions.md) | Configuration options |

#### Returns

[`DictionaryServiceBase`](DictionaryServiceBase.md)

#### See

 - DictionaryService using the provided
 - CacheOptions

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss/src/i18n/dictionary-service.ts#L32)

## Properties

### options

> **options**: [`CacheOptions`](../../index/interfaces/CacheOptions.md)

Configuration options

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss/src/i18n/dictionary-service.ts#L32)

## Methods

### fetchDictionaryData()

> `abstract` **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

#### Implementation of

[`DictionaryService`](../interfaces/DictionaryService.md).[`fetchDictionaryData`](../interfaces/DictionaryService.md#fetchdictionarydata)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:71](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss/src/i18n/dictionary-service.ts#L71)

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

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

#### Implementation of

[`CacheClient`](../../index/interfaces/CacheClient.md).[`getCacheValue`](../../index/interfaces/CacheClient.md#getcachevalue)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

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

#### Implementation of

[`CacheClient`](../../index/interfaces/CacheClient.md).[`setCacheValue`](../../index/interfaces/CacheClient.md#setcachevalue)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
