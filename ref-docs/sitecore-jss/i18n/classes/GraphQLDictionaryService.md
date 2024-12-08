[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

Service that fetch dictionary data using Sitecore's GraphQL API.

## Mixes

SearchQueryService<DictionaryQueryResult>

## Extends

- [`DictionaryServiceBase`](DictionaryServiceBase.md)

## Constructors

### new GraphQLDictionaryService()

> **new GraphQLDictionaryService**(`options`): [`GraphQLDictionaryService`](GraphQLDictionaryService.md)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLDictionaryServiceConfig`](../interfaces/GraphQLDictionaryServiceConfig.md) | instance |

#### Returns

[`GraphQLDictionaryService`](GraphQLDictionaryService.md)

#### Overrides

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`constructor`](DictionaryServiceBase.md#constructors)

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:147](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L147)

## Properties

### options

> **options**: [`GraphQLDictionaryServiceConfig`](../interfaces/GraphQLDictionaryServiceConfig.md)

instance

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`options`](DictionaryServiceBase.md#options)

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:147](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L147)

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetches dictionary data for internalization. Uses search query by default

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

#### Throws

if the app root was not found for the specified site and language.

#### Overrides

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`fetchDictionaryData`](DictionaryServiceBase.md#fetchdictionarydata)

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:159](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L159)

***

### fetchWithSearchQuery()

> **fetchWithSearchQuery**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetches dictionary data with search query
This is the default behavior for non-XMCloud deployments. Uses `query` to retrieve data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

#### Throws

if the app root was not found for the specified site and language.

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:182](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L182)

***

### fetchWithSiteQuery()

> **fetchWithSiteQuery**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetches dictionary data with site query
This is the default behavior for XMCloud deployments. Uses `siteQuery` to retrieve data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:221](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L221)

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`getCacheClient`](DictionaryServiceBase.md#getcacheclient)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

***

### getCacheValue()

> **getCacheValue**(`key`): `null` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Retrieves a

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The cache key. |

#### Returns

`null` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The

#### See

 - DictionaryPhrases value from the cache.
 - DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`getCacheValue`](DictionaryServiceBase.md#getcachevalue)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:267](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L267)

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

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`setCacheValue`](DictionaryServiceBase.md#setcachevalue)

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
