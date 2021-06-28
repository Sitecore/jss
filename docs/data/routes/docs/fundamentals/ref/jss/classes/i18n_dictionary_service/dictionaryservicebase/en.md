---
name: dictionaryservicebase
routeTemplate: ./data/component-templates/article.yml
title: dictionaryservicebase
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [i18n/dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_dictionary_service) / DictionaryServiceBase

# Class: DictionaryServiceBase

[i18n/dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_dictionary_service).DictionaryServiceBase

Base implementation of @see DictionaryService that handles caching dictionary values

## Hierarchy

- **`DictionaryServiceBase`**

  ↳ [`GraphQLDictionaryService`](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice)

  ↳ [`RestDictionaryService`](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice)

## Implements

- [`DictionaryService`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryservice)
- [`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#constructor)

### Properties

- [cache](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#cache)
- [options](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#options)

### Methods

- [fetchDictionaryData](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#fetchdictionarydata)
- [getCacheClient](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#getcacheclient)
- [getCacheValue](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#getcachevalue)
- [setCacheValue](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#setcachevalue)

## Constructors

### constructor

• **new DictionaryServiceBase**(`options`)

Initializes a new instance of @see DictionaryService using the provided @see CacheOptions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CacheOptions`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions) | Configuration options |

## Properties

### cache

• `Private` **cache**: [`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

___

### options

• **options**: [`CacheOptions`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions)

## Methods

### fetchDictionaryData

▸ `Abstract` **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

#### Implementation of

[DictionaryService](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryservice).[fetchDictionaryData](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryservice#fetchdictionarydata)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

implementation

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)

Retrieves a @see DictionaryPhrases value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)

The @see DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Implementation of

[CacheClient](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient).[getCacheValue](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient#getcachevalue)

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)

Caches a @see DictionaryPhrases value for the specified cache key.

**`mixes`** CacheClient<DictionaryPhrases>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases) | The value to cache. |

#### Returns

[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)

The value added to the cache.

#### Implementation of

[CacheClient](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient).[setCacheValue](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient#setcachevalue)
