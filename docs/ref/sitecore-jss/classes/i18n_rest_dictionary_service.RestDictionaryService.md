[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [i18n/rest-dictionary-service](../modules/i18n_rest_dictionary_service.md) / RestDictionaryService

# Class: RestDictionaryService

[i18n/rest-dictionary-service](../modules/i18n_rest_dictionary_service.md).RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- [`DictionaryServiceBase`](i18n_dictionary_service.DictionaryServiceBase.md)

  ↳ **`RestDictionaryService`**

## Table of contents

### Constructors

- [constructor](i18n_rest_dictionary_service.RestDictionaryService.md#constructor)

### Properties

- [options](i18n_rest_dictionary_service.RestDictionaryService.md#options)

### Accessors

- [defaultFetcher](i18n_rest_dictionary_service.RestDictionaryService.md#defaultfetcher)

### Methods

- [fetchDictionaryData](i18n_rest_dictionary_service.RestDictionaryService.md#fetchdictionarydata)
- [getCacheClient](i18n_rest_dictionary_service.RestDictionaryService.md#getcacheclient)
- [getCacheValue](i18n_rest_dictionary_service.RestDictionaryService.md#getcachevalue)
- [getUrl](i18n_rest_dictionary_service.RestDictionaryService.md#geturl)
- [setCacheValue](i18n_rest_dictionary_service.RestDictionaryService.md#setcachevalue)

## Constructors

### constructor

• **new RestDictionaryService**(`options`)

Initializes a new instance of @see DictionaryService using the provided @see CacheOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RestDictionaryServiceConfig`](../modules/i18n_rest_dictionary_service.md#restdictionaryserviceconfig) |

#### Overrides

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[constructor](i18n_dictionary_service.DictionaryServiceBase.md#constructor)

#### Defined in

[i18n/rest-dictionary-service.ts:47](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L47)

## Properties

### options

• **options**: [`RestDictionaryServiceConfig`](../modules/i18n_rest_dictionary_service.md#restdictionaryserviceconfig)

#### Inherited from

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[options](i18n_dictionary_service.DictionaryServiceBase.md#options)

## Accessors

### defaultFetcher

• `get` **defaultFetcher**(): [`HttpDataFetcher`](../modules/data_fetcher.md#httpdatafetcher)<[`RestDictionaryServiceData`](../modules/i18n_rest_dictionary_service.md#restdictionaryservicedata)\>

Provides default @see AxiosDataFetcher data fetcher

#### Returns

[`HttpDataFetcher`](../modules/data_fetcher.md#httpdatafetcher)<[`RestDictionaryServiceData`](../modules/i18n_rest_dictionary_service.md#restdictionaryservicedata)\>

#### Defined in

[i18n/rest-dictionary-service.ts:42](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L42)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

#### Overrides

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[fetchDictionaryData](i18n_dictionary_service.DictionaryServiceBase.md#fetchdictionarydata)

#### Defined in

[i18n/rest-dictionary-service.ts:55](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L55)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](../interfaces/cache_client.CacheClient.md)<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/cache_client.CacheClient.md)<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

implementation

#### Inherited from

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[getCacheClient](i18n_dictionary_service.DictionaryServiceBase.md#getcacheclient)

#### Defined in

[i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

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

#### Inherited from

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[getCacheValue](i18n_dictionary_service.DictionaryServiceBase.md#getcachevalue)

#### Defined in

[i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

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

[i18n/rest-dictionary-service.ts:76](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L76)

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

#### Inherited from

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[setCacheValue](i18n_dictionary_service.DictionaryServiceBase.md#setcachevalue)

#### Defined in

[i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
