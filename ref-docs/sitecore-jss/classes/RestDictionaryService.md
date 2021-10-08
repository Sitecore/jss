[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / RestDictionaryService

# Class: RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- [`DictionaryServiceBase`](DictionaryServiceBase.md)

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

Initializes a new instance of @see DictionaryService using the provided @see CacheOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RestDictionaryServiceConfig`](../README.md#restdictionaryserviceconfig) |

#### Overrides

[DictionaryServiceBase](DictionaryServiceBase.md).[constructor](DictionaryServiceBase.md#constructor)

#### Defined in

[i18n/rest-dictionary-service.ts:51](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L51)

## Properties

### options

• **options**: [`RestDictionaryServiceConfig`](../README.md#restdictionaryserviceconfig)

#### Inherited from

[DictionaryServiceBase](DictionaryServiceBase.md).[options](DictionaryServiceBase.md#options)

## Accessors

### defaultFetcher

• `get` **defaultFetcher**(): [`HttpDataFetcher`](../README.md#httpdatafetcher)<[`RestDictionaryServiceData`](../README.md#restdictionaryservicedata)\>

Provides default @see AxiosDataFetcher data fetcher

#### Returns

[`HttpDataFetcher`](../README.md#httpdatafetcher)<[`RestDictionaryServiceData`](../README.md#restdictionaryservicedata)\>

#### Defined in

[i18n/rest-dictionary-service.ts:42](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L42)

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

[DictionaryServiceBase](DictionaryServiceBase.md).[fetchDictionaryData](DictionaryServiceBase.md#fetchdictionarydata)

#### Defined in

[i18n/rest-dictionary-service.ts:59](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L59)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

[DictionaryServiceBase](DictionaryServiceBase.md).[getCacheClient](DictionaryServiceBase.md#getcacheclient)

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

#### Inherited from

[DictionaryServiceBase](DictionaryServiceBase.md).[getCacheValue](DictionaryServiceBase.md#getcachevalue)

#### Defined in

[i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

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

[i18n/rest-dictionary-service.ts:80](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L80)

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

[DictionaryServiceBase](DictionaryServiceBase.md).[setCacheValue](DictionaryServiceBase.md#setcachevalue)

#### Defined in

[i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
