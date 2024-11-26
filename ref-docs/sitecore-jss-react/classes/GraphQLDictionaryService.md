[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

Service that fetch dictionary data using Sitecore's GraphQL API.

## Mixes

SearchQueryService<DictionaryQueryResult>

## Extends

- `DictionaryServiceBase`

## Constructors

### new GraphQLDictionaryService()

> **new GraphQLDictionaryService**(`options`): [`GraphQLDictionaryService`](GraphQLDictionaryService.md)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `GraphQLDictionaryServiceConfig` | instance |

#### Returns

[`GraphQLDictionaryService`](GraphQLDictionaryService.md)

#### Overrides

`DictionaryServiceBase.constructor`

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:73

## Properties

### options

> **options**: `GraphQLDictionaryServiceConfig`

#### Overrides

`DictionaryServiceBase.options`

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:66

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

`DictionaryServiceBase.fetchDictionaryData`

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:80

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

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:88

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

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:95

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

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:102

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
