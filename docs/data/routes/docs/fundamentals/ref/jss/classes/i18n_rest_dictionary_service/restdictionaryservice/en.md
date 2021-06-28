---
name: restdictionaryservice
routeTemplate: ./data/component-templates/article.yml
title: restdictionaryservice
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [i18n/rest-dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service) / RestDictionaryService

# Class: RestDictionaryService

[i18n/rest-dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service).RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- [`DictionaryServiceBase`](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase)

  ↳ **`RestDictionaryService`**

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice#constructor)

### Properties

- [options](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice#options)

### Accessors

- [defaultFetcher](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice#defaultfetcher)

### Methods

- [fetchDictionaryData](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice#fetchdictionarydata)
- [getCacheClient](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice#getcacheclient)
- [getCacheValue](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice#getcachevalue)
- [getUrl](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice#geturl)
- [setCacheValue](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice#setcachevalue)

## Constructors

### constructor

• **new RestDictionaryService**(`options`)

Initializes a new instance of @see DictionaryService using the provided @see CacheOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RestDictionaryServiceConfig`](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service#restdictionaryserviceconfig) |

#### Overrides

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[constructor](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#constructor)

## Properties

### options

• **options**: [`RestDictionaryServiceConfig`](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service#restdictionaryserviceconfig)

#### Inherited from

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[options](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#options)

## Accessors

### defaultFetcher

• `get` **defaultFetcher**(): [`HttpDataFetcher`](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)<[`RestDictionaryServiceData`](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service#restdictionaryservicedata)\>

Provides default @see AxiosDataFetcher data fetcher

#### Returns

[`HttpDataFetcher`](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)<[`RestDictionaryServiceData`](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service#restdictionaryservicedata)\>

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

#### Overrides

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[fetchDictionaryData](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#fetchdictionarydata)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

implementation

#### Inherited from

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[getCacheClient](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#getcacheclient)

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

#### Inherited from

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[getCacheValue](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#getcachevalue)

___

### getUrl

▸ `Protected` **getUrl**(`language`): `string`

Generate dictionary service url

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`string`

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

#### Inherited from

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[setCacheValue](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#setcachevalue)
