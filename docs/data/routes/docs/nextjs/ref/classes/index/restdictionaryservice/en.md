---
name: restdictionaryservice
routeTemplate: ./data/component-templates/article.yml
title: restdictionaryservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [index](/docs/nextjs/ref/modules/index) / RestDictionaryService

# Class: RestDictionaryService

[index](/docs/nextjs/ref/modules/index).RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- `DictionaryServiceBase`

  ↳ **`RestDictionaryService`**

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/index/restdictionaryservice#constructor)

### Properties

- [options](/docs/nextjs/ref/classes/index/restdictionaryservice#options)

### Accessors

- [defaultFetcher](/docs/nextjs/ref/classes/index/restdictionaryservice#defaultfetcher)

### Methods

- [fetchDictionaryData](/docs/nextjs/ref/classes/index/restdictionaryservice#fetchdictionarydata)
- [getCacheClient](/docs/nextjs/ref/classes/index/restdictionaryservice#getcacheclient)
- [getCacheValue](/docs/nextjs/ref/classes/index/restdictionaryservice#getcachevalue)
- [getUrl](/docs/nextjs/ref/classes/index/restdictionaryservice#geturl)
- [setCacheValue](/docs/nextjs/ref/classes/index/restdictionaryservice#setcachevalue)

## Constructors

### constructor

• **new RestDictionaryService**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RestDictionaryServiceConfig`](/docs/nextjs/ref/modules/index#restdictionaryserviceconfig) |

#### Overrides

DictionaryServiceBase.constructor

## Properties

### options

• **options**: [`RestDictionaryServiceConfig`](/docs/nextjs/ref/modules/index#restdictionaryserviceconfig)

#### Overrides

DictionaryServiceBase.options

## Accessors

### defaultFetcher

• `get` **defaultFetcher**(): [`HttpDataFetcher`](/docs/nextjs/ref/modules/index#httpdatafetcher)<`RestDictionaryServiceData`\>

Provides default @see AxiosDataFetcher data fetcher

#### Returns

[`HttpDataFetcher`](/docs/nextjs/ref/modules/index#httpdatafetcher)<`RestDictionaryServiceData`\>

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)\>

#### Overrides

DictionaryServiceBase.fetchDictionaryData

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`<[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

`CacheClient`<[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)\>

implementation

#### Inherited from

DictionaryServiceBase.getCacheClient

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)

Retrieves a @see DictionaryPhrases value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)

The @see DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

DictionaryServiceBase.getCacheValue

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

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)

Caches a @see DictionaryPhrases value for the specified cache key.

**`mixes`** CacheClient<DictionaryPhrases>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases) | The value to cache. |

#### Returns

[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)

The value added to the cache.

#### Inherited from

DictionaryServiceBase.setCacheValue
