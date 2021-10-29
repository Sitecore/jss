[@sitecore-jss/sitecore-jss-nextjs](../README.md) / RestDictionaryService

# Class: RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `DictionaryServiceBase`

  ↳ **`RestDictionaryService`**

## Table of contents

### Constructors

- [constructor](RestDictionaryService.md#constructor)

### Properties

- [options](RestDictionaryService.md#options)

### Accessors

- [defaultFetcher](RestDictionaryService.md#defaultfetcher)

### Methods

- [fetchDictionaryData](RestDictionaryService.md#fetchdictionarydata)
- [getCacheClient](RestDictionaryService.md#getcacheclient)
- [getCacheValue](RestDictionaryService.md#getcachevalue)
- [getUrl](RestDictionaryService.md#geturl)
- [setCacheValue](RestDictionaryService.md#setcachevalue)

## Constructors

### constructor

• **new RestDictionaryService**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RestDictionaryServiceConfig`](../README.md#restdictionaryserviceconfig) |

#### Overrides

DictionaryServiceBase.constructor

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:39

## Properties

### options

• **options**: [`RestDictionaryServiceConfig`](../README.md#restdictionaryserviceconfig)

#### Overrides

DictionaryServiceBase.options

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:34

## Accessors

### defaultFetcher

• `get` **defaultFetcher**(): [`HttpDataFetcher`](../README.md#httpdatafetcher)<`RestDictionaryServiceData`\>

Provides default @see AxiosDataFetcher data fetcher

#### Returns

[`HttpDataFetcher`](../README.md#httpdatafetcher)<`RestDictionaryServiceData`\>

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:38

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

#### Overrides

DictionaryServiceBase.fetchDictionaryData

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:44

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

`CacheClient`<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

DictionaryServiceBase.getCacheClient

#### Defined in

sitecore-jss/types/i18n/dictionary-service.d.ts:49

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

#### Inherited from

DictionaryServiceBase.getCacheValue

#### Defined in

sitecore-jss/types/i18n/dictionary-service.d.ts:42

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

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:49

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

#### Inherited from

DictionaryServiceBase.setCacheValue

#### Defined in

sitecore-jss/types/i18n/dictionary-service.d.ts:36
