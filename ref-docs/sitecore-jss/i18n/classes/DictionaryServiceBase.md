[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / DictionaryServiceBase

# Abstract Class: DictionaryServiceBase

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:24](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/i18n/dictionary-service.ts#L24)
=======
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:24](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/i18n/dictionary-service.ts#L24)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

### Constructor

> **new DictionaryServiceBase**(`options`): `DictionaryServiceBase`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/i18n/dictionary-service.ts#L32)
=======
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/i18n/dictionary-service.ts#L32)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Initializes a new instance of

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`CacheOptions`](../../index/interfaces/CacheOptions.md) | Configuration options |

#### Returns

`DictionaryServiceBase`

#### See

 - DictionaryService using the provided
 - CacheOptions

## Properties

### options

> **options**: [`CacheOptions`](../../index/interfaces/CacheOptions.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/i18n/dictionary-service.ts#L32)
=======
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/i18n/dictionary-service.ts#L32)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Configuration options

## Methods

### fetchDictionaryData()

> `abstract` **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:71](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/i18n/dictionary-service.ts#L71)
=======
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:71](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/i18n/dictionary-service.ts#L71)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Fetch dictionary data for a language.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

#### Implementation of

[`DictionaryService`](../interfaces/DictionaryService.md).[`fetchDictionaryData`](../interfaces/DictionaryService.md#fetchdictionarydata)

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)
=======
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

***

### getCacheValue()

> **getCacheValue**(`key`): `null` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)
=======
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
=======
Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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
