[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / RestDictionaryService

# Class: RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Extends

- `DictionaryServiceBase`

## Constructors

### new RestDictionaryService()

> **new RestDictionaryService**(`options`): [`RestDictionaryService`](RestDictionaryService.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | `RestDictionaryServiceConfig` |

#### Returns

[`RestDictionaryService`](RestDictionaryService.md)

#### Overrides

`DictionaryServiceBase.constructor`

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:36

## Properties

### options

> **options**: `RestDictionaryServiceConfig`

#### Overrides

`DictionaryServiceBase.options`

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:35

## Accessors

### defaultFetcher

#### Get Signature

> **get** **defaultFetcher**(): `HttpDataFetcher`\<`RestDictionaryServiceData`\>

Provides default

##### See

AxiosDataFetcher data fetcher

##### Returns

`HttpDataFetcher`\<`RestDictionaryServiceData`\>

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:40

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

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

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:46

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

`DictionaryServiceBase.getCacheClient`

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:49

***

### getCacheValue()

> **getCacheValue**(`key`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

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

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:42

***

### getUrl()

> `protected` **getUrl**(`language`): `string`

Generate dictionary service url

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`string`

dictionary service url

#### Defined in

packages/sitecore-jss/types/i18n/rest-dictionary-service.d.ts:52

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

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

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:36
