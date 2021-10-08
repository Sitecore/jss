[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / DictionaryServiceBase

# Class: DictionaryServiceBase

Base implementation of @see DictionaryService that handles caching dictionary values

## Hierarchy

- **`DictionaryServiceBase`**

  ↳ [`GraphQLDictionaryService`](GraphQLDictionaryService.md)

  ↳ [`RestDictionaryService`](RestDictionaryService.md)

## Implements

- [`DictionaryService`](../interfaces/DictionaryService.md)
- [`CacheClient`](../interfaces/CacheClient.md)<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

## Table of contents

### Constructors

- [constructor](DictionaryServiceBase.md#constructor)

### Properties

- [cache](DictionaryServiceBase.md#cache)
- [options](DictionaryServiceBase.md#options)

### Methods

- [fetchDictionaryData](DictionaryServiceBase.md#fetchdictionarydata)
- [getCacheClient](DictionaryServiceBase.md#getcacheclient)
- [getCacheValue](DictionaryServiceBase.md#getcachevalue)
- [setCacheValue](DictionaryServiceBase.md#setcachevalue)

## Constructors

### constructor

• **new DictionaryServiceBase**(`options`)

Initializes a new instance of @see DictionaryService using the provided @see CacheOptions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CacheOptions`](../interfaces/CacheOptions.md) | Configuration options |

#### Defined in

[i18n/dictionary-service.ts:32](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L32)

## Properties

### cache

• `Private` **cache**: [`CacheClient`](../interfaces/CacheClient.md)<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

#### Defined in

[i18n/dictionary-service.ts:26](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L26)

___

### options

• **options**: [`CacheOptions`](../interfaces/CacheOptions.md)

## Methods

### fetchDictionaryData

▸ `Abstract` **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

#### Implementation of

[DictionaryService](../interfaces/DictionaryService.md).[fetchDictionaryData](../interfaces/DictionaryService.md#fetchdictionarydata)

#### Defined in

[i18n/dictionary-service.ts:70](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L70)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Defined in

[i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Retrieves a @see DictionaryPhrases value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The @see DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Implementation of

[CacheClient](../interfaces/CacheClient.md).[getCacheValue](../interfaces/CacheClient.md#getcachevalue)

#### Defined in

[i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Caches a @see DictionaryPhrases value for the specified cache key.

**`mixes`** CacheClient<DictionaryPhrases>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md) | The value to cache. |

#### Returns

[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The value added to the cache.

#### Implementation of

[CacheClient](../interfaces/CacheClient.md).[setCacheValue](../interfaces/CacheClient.md#setcachevalue)

#### Defined in

[i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
