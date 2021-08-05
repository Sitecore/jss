[Sitecore JavaScript Rendering SDK](../README.md) / [i18n/dictionary-service](../modules/i18n_dictionary_service.md) / DictionaryServiceBase

# Class: DictionaryServiceBase

[i18n/dictionary-service](../modules/i18n_dictionary_service.md).DictionaryServiceBase

Base implementation of @see DictionaryService that handles caching dictionary values

## Hierarchy

- **`DictionaryServiceBase`**

  ↳ [`GraphQLDictionaryService`](i18n_graphql_dictionary_service.GraphQLDictionaryService.md)

  ↳ [`RestDictionaryService`](i18n_rest_dictionary_service.RestDictionaryService.md)

## Implements

- [`DictionaryService`](../interfaces/i18n_dictionary_service.DictionaryService.md)
- [`CacheClient`](../interfaces/cache_client.CacheClient.md)<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

## Table of contents

### Constructors

- [constructor](i18n_dictionary_service.DictionaryServiceBase.md#constructor)

### Properties

- [cache](i18n_dictionary_service.DictionaryServiceBase.md#cache)
- [options](i18n_dictionary_service.DictionaryServiceBase.md#options)

### Methods

- [fetchDictionaryData](i18n_dictionary_service.DictionaryServiceBase.md#fetchdictionarydata)
- [getCacheClient](i18n_dictionary_service.DictionaryServiceBase.md#getcacheclient)
- [getCacheValue](i18n_dictionary_service.DictionaryServiceBase.md#getcachevalue)
- [setCacheValue](i18n_dictionary_service.DictionaryServiceBase.md#setcachevalue)

## Constructors

### constructor

• **new DictionaryServiceBase**(`options`)

Initializes a new instance of @see DictionaryService using the provided @see CacheOptions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CacheOptions`](../interfaces/cache_client.CacheOptions.md) | Configuration options |

#### Defined in

[i18n/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/dictionary-service.ts#L32)

## Properties

### cache

• `Private` **cache**: [`CacheClient`](../interfaces/cache_client.CacheClient.md)<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

#### Defined in

[i18n/dictionary-service.ts:26](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/dictionary-service.ts#L26)

___

### options

• **options**: [`CacheOptions`](../interfaces/cache_client.CacheOptions.md)

## Methods

### fetchDictionaryData

▸ `Abstract` **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

#### Implementation of

[DictionaryService](../interfaces/i18n_dictionary_service.DictionaryService.md).[fetchDictionaryData](../interfaces/i18n_dictionary_service.DictionaryService.md#fetchdictionarydata)

#### Defined in

[i18n/dictionary-service.ts:70](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/dictionary-service.ts#L70)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](../interfaces/cache_client.CacheClient.md)<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/cache_client.CacheClient.md)<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

implementation

#### Defined in

[i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)

Retrieves a @see DictionaryPhrases value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)

The @see DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Implementation of

[CacheClient](../interfaces/cache_client.CacheClient.md).[getCacheValue](../interfaces/cache_client.CacheClient.md#getcachevalue)

#### Defined in

[i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)

Caches a @see DictionaryPhrases value for the specified cache key.

**`mixes`** CacheClient<DictionaryPhrases>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md) | The value to cache. |

#### Returns

[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)

The value added to the cache.

#### Implementation of

[CacheClient](../interfaces/cache_client.CacheClient.md).[setCacheValue](../interfaces/cache_client.CacheClient.md#setcachevalue)

#### Defined in

[i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
