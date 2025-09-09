[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / RestDictionaryService

# Class: RestDictionaryService

Defined in: packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:34

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses NativeDataFetcher as the default data fetcher (@see NativeDataFetcher).

## Extends

- `DictionaryServiceBase`

## Constructors

### Constructor

> **new RestDictionaryService**(`options`): `RestDictionaryService`

Defined in: packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:36

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | `RestDictionaryServiceConfig` |

#### Returns

`RestDictionaryService`

#### Overrides

`DictionaryServiceBase.constructor`

## Properties

### options

> **options**: `RestDictionaryServiceConfig`

Defined in: packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:35

#### Overrides

`DictionaryServiceBase.options`

## Accessors

### defaultFetcher

#### Get Signature

> **get** **defaultFetcher**(): [`HttpDataFetcher`](../type-aliases/HttpDataFetcher.md)\<`RestDictionaryServiceData`\>

Defined in: packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:40

Provides default

##### See

NativeDataFetcher data fetcher

##### Returns

[`HttpDataFetcher`](../type-aliases/HttpDataFetcher.md)\<`RestDictionaryServiceData`\>

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Defined in: packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:46

Fetch dictionary data for a language.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

#### Overrides

`DictionaryServiceBase.fetchDictionaryData`

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Defined in: packages/sitecore-jss/types/i18n/dictionary-service.d.ts:49

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

`DictionaryServiceBase.getCacheClient`

***

### getCacheValue()

> **getCacheValue**(`key`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Defined in: packages/sitecore-jss/types/i18n/dictionary-service.d.ts:42

Retrieves a

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The cache key. |

#### Returns

[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The

#### See

 - DictionaryPhrases value from the cache.
 - DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

`DictionaryServiceBase.getCacheValue`

***

### getUrl()

> `protected` **getUrl**(`language`): `string`

Defined in: packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:52

Generate dictionary service url

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`string`

dictionary service url

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Defined in: packages/sitecore-jss/types/i18n/dictionary-service.d.ts:36

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

#### Inherited from

`DictionaryServiceBase.setCacheValue`
