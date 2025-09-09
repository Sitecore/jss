[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:139](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L139)

Service that fetch dictionary data using Sitecore's GraphQL API.

## Mixes

SearchQueryService<DictionaryQueryResult>

## Extends

- [`DictionaryServiceBase`](DictionaryServiceBase.md)

## Constructors

### Constructor

> **new GraphQLDictionaryService**(`options`): `GraphQLDictionaryService`

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:147](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L147)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GraphQLDictionaryServiceConfig`](../interfaces/GraphQLDictionaryServiceConfig.md) | instance |

#### Returns

`GraphQLDictionaryService`

#### Overrides

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`constructor`](DictionaryServiceBase.md#constructor)

## Properties

### options

> **options**: [`GraphQLDictionaryServiceConfig`](../interfaces/GraphQLDictionaryServiceConfig.md)

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:147](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L147)

instance

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`options`](DictionaryServiceBase.md#options)

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:159](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L159)

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

***

### fetchWithSearchQuery()

> **fetchWithSearchQuery**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:182](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L182)

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

***

### fetchWithSiteQuery()

> **fetchWithSiteQuery**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:221](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L221)

Fetches dictionary data with site query
This is the default behavior for XMCloud deployments. Uses `siteQuery` to retrieve data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

***

### getCacheClient()

> `protected` **getCacheClient**(): [`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../../index/interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

[`DictionaryServiceBase`](DictionaryServiceBase.md).[`getCacheClient`](DictionaryServiceBase.md#getcacheclient)

***

### getCacheValue()

> **getCacheValue**(`key`): `null` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

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

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:267](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L267)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)

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
