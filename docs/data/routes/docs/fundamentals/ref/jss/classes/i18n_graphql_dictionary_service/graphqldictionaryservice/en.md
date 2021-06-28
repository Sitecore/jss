---
name: graphqldictionaryservice
routeTemplate: ./data/component-templates/article.yml
title: graphqldictionaryservice
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [i18n/graphql-dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_graphql_dictionary_service) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

[i18n/graphql-dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_graphql_dictionary_service).GraphQLDictionaryService

Service that fetch dictionary data using Sitecore's GraphQL API.

**`mixes`** SearchQueryService<DictionaryQueryResult>

## Hierarchy

- [`DictionaryServiceBase`](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase)

  ↳ **`GraphQLDictionaryService`**

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#constructor)

### Properties

- [graphQLClient](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#graphqlclient)
- [options](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#options)
- [searchService](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#searchservice)

### Methods

- [fetchDictionaryData](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#fetchdictionarydata)
- [getCacheClient](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#getcacheclient)
- [getCacheValue](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#getcachevalue)
- [getGraphQLClient](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#getgraphqlclient)
- [setCacheValue](/docs/fundamentals/ref/jss/classes/i18n_graphql_dictionary_service/graphqldictionaryservice#setcachevalue)

## Constructors

### constructor

• **new GraphQLDictionaryService**(`options`)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLDictionaryServiceConfig`](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig) | instance |

#### Overrides

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[constructor](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#constructor)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

___

### options

• **options**: [`GraphQLDictionaryServiceConfig`](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig)

#### Inherited from

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[options](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#options)

___

### searchService

• `Private` **searchService**: [`SearchQueryService`](/docs/fundamentals/ref/jss/classes/graphql_search_service/searchqueryservice)<[`DictionaryQueryResult`](/docs/fundamentals/ref/jss/modules/i18n_graphql_dictionary_service#dictionaryqueryresult)\>

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

Fetches dictionary data for internalization.

**`default`** query (@see query)

**`throws`** {Error} if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

dictionary phrases

#### Overrides

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[fetchDictionaryData](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#fetchdictionarydata)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

implementation

#### Inherited from

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[getCacheClient](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#getcacheclient)

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)

Retrieves a @see DictionaryPhrases value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)

The @see DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[getCacheValue](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#getcachevalue)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient)

implementation

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)

Caches a @see DictionaryPhrases value for the specified cache key.

**`mixes`** CacheClient<DictionaryPhrases>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases) | The value to cache. |

#### Returns

[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)

The value added to the cache.

#### Inherited from

[DictionaryServiceBase](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase).[setCacheValue](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase#setcachevalue)
