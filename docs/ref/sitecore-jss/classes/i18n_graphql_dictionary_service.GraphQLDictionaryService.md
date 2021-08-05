[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [i18n/graphql-dictionary-service](../modules/i18n_graphql_dictionary_service.md) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

[i18n/graphql-dictionary-service](../modules/i18n_graphql_dictionary_service.md).GraphQLDictionaryService

Service that fetch dictionary data using Sitecore's GraphQL API.

**`mixes`** SearchQueryService<DictionaryQueryResult>

## Hierarchy

- [`DictionaryServiceBase`](i18n_dictionary_service.DictionaryServiceBase.md)

  ↳ **`GraphQLDictionaryService`**

## Table of contents

### Constructors

- [constructor](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#constructor)

### Properties

- [graphQLClient](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#graphqlclient)
- [options](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#options)
- [searchService](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#searchservice)

### Methods

- [fetchDictionaryData](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#fetchdictionarydata)
- [getCacheClient](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#getcacheclient)
- [getCacheValue](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#getcachevalue)
- [getGraphQLClient](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#getgraphqlclient)
- [setCacheValue](i18n_graphql_dictionary_service.GraphQLDictionaryService.md#setcachevalue)

## Constructors

### constructor

• **new GraphQLDictionaryService**(`options`)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLDictionaryServiceConfig`](../interfaces/i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md) | instance |

#### Overrides

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[constructor](i18n_dictionary_service.DictionaryServiceBase.md#constructor)

#### Defined in

[i18n/graphql-dictionary-service.ts:90](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L90)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/graphql_request_client.GraphQLClient.md)

#### Defined in

[i18n/graphql-dictionary-service.ts:83](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L83)

___

### options

• **options**: [`GraphQLDictionaryServiceConfig`](../interfaces/i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md)

#### Inherited from

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[options](i18n_dictionary_service.DictionaryServiceBase.md#options)

___

### searchService

• `Private` **searchService**: [`SearchQueryService`](graphql_search_service.SearchQueryService.md)<[`DictionaryQueryResult`](../modules/i18n_graphql_dictionary_service.md#dictionaryqueryresult)\>

#### Defined in

[i18n/graphql-dictionary-service.ts:84](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L84)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

Fetches dictionary data for internalization.

**`default`** query (@see query)

**`throws`** {Error} if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`<[`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md)\>

dictionary phrases

#### Overrides

[DictionaryServiceBase](i18n_dictionary_service.DictionaryServiceBase.md).[fetchDictionaryData](i18n_dictionary_service.DictionaryServiceBase.md#fetchdictionarydata)

#### Defined in

[i18n/graphql-dictionary-service.ts:103](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L103)

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

[i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

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

[i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](../interfaces/graphql_request_client.GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../interfaces/graphql_request_client.GraphQLClient.md)

implementation

#### Defined in

[i18n/graphql-dictionary-service.ts:143](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L143)

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

[i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
