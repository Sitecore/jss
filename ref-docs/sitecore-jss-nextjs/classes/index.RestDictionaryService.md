[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / RestDictionaryService

# Class: RestDictionaryService

[index](../modules/index.md).RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `DictionaryServiceBase`

  ↳ **`RestDictionaryService`**

## Table of contents

### Constructors

- [constructor](index.RestDictionaryService.md#constructor)

### Properties

- [options](index.RestDictionaryService.md#options)

### Accessors

- [defaultFetcher](index.RestDictionaryService.md#defaultfetcher)

### Methods

- [fetchDictionaryData](index.RestDictionaryService.md#fetchdictionarydata)
- [getCacheClient](index.RestDictionaryService.md#getcacheclient)
- [getCacheValue](index.RestDictionaryService.md#getcachevalue)
- [getUrl](index.RestDictionaryService.md#geturl)
- [setCacheValue](index.RestDictionaryService.md#setcachevalue)

## Constructors

### constructor

• **new RestDictionaryService**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RestDictionaryServiceConfig`](../modules/index.md#restdictionaryserviceconfig) |

#### Overrides

DictionaryServiceBase.constructor

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:40

## Properties

### options

• **options**: [`RestDictionaryServiceConfig`](../modules/index.md#restdictionaryserviceconfig)

#### Overrides

DictionaryServiceBase.options

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:35

## Accessors

### defaultFetcher

• `get` **defaultFetcher**(): [`HttpDataFetcher`](../modules/index.md#httpdatafetcher)\<`RestDictionaryServiceData`\>

Provides default

#### Returns

[`HttpDataFetcher`](../modules/index.md#httpdatafetcher)\<`RestDictionaryServiceData`\>

**`See`**

AxiosDataFetcher data fetcher

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:39

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)\>

dictionary phrases

#### Overrides

DictionaryServiceBase.fetchDictionaryData

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:46

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`\<[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

`CacheClient`\<[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)\>

implementation

#### Inherited from

DictionaryServiceBase.getCacheClient

#### Defined in

sitecore-jss/types/i18n/dictionary-service.d.ts:49

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)

Retrieves a

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)

The

**`See`**

 - DictionaryPhrases value from the cache.
 - DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

DictionaryServiceBase.getCacheValue

#### Defined in

sitecore-jss/types/i18n/dictionary-service.d.ts:42

___

### getUrl

▸ `Protected` **getUrl**(`language`): `string`

Generate dictionary service url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`string`

dictionary service url

#### Defined in

sitecore-jss/types/i18n/rest-dictionary-service.d.ts:52

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)

Caches a

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md) | The value to cache. |

#### Returns

[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)

The value added to the cache.

**`See`**

DictionaryPhrases value for the specified cache key.

**`Mixes`**

CacheClient<DictionaryPhrases>

#### Inherited from

DictionaryServiceBase.setCacheValue

#### Defined in

sitecore-jss/types/i18n/dictionary-service.d.ts:36
