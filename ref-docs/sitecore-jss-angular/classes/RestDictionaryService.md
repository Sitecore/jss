[@sitecore-jss/sitecore-jss-angular](../README.md) / RestDictionaryService

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
| `options` | `RestDictionaryServiceConfig` |

#### Overrides

DictionaryServiceBase.constructor

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:40

## Properties

### options

• **options**: `RestDictionaryServiceConfig`

#### Overrides

DictionaryServiceBase.options

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:35

## Accessors

### defaultFetcher

• `get` **defaultFetcher**(): [`HttpDataFetcher`](../README.md#httpdatafetcher)\<`RestDictionaryServiceData`\>

Provides default

#### Returns

[`HttpDataFetcher`](../README.md#httpdatafetcher)\<`RestDictionaryServiceData`\>

**`See`**

AxiosDataFetcher data fetcher

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:39

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`\<`DictionaryPhrases`\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<`DictionaryPhrases`\>

dictionary phrases

#### Overrides

DictionaryServiceBase.fetchDictionaryData

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:46

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)\<`DictionaryPhrases`\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)\<`DictionaryPhrases`\>

implementation

#### Inherited from

DictionaryServiceBase.getCacheClient

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:49

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| `DictionaryPhrases`

Retrieves a

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| `DictionaryPhrases`

The

**`See`**

 - DictionaryPhrases value from the cache.
 - DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

DictionaryServiceBase.getCacheValue

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:42

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

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:52

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): `DictionaryPhrases`

Caches a

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | `DictionaryPhrases` | The value to cache. |

#### Returns

`DictionaryPhrases`

The value added to the cache.

**`See`**

DictionaryPhrases value for the specified cache key.

**`Mixes`**

CacheClient<DictionaryPhrases>

#### Inherited from

DictionaryServiceBase.setCacheValue

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:36
