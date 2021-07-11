---
name: graphqldictionaryservice
routeTemplate: ./data/component-templates/article.yml
title: graphqldictionaryservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [index](/docs/nextjs/ref/modules/index) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

[index](/docs/nextjs/ref/modules/index).GraphQLDictionaryService

Service that fetch dictionary data using Sitecore's GraphQL API.

**`mixes`** SearchQueryService<DictionaryQueryResult>

## Hierarchy

- `DictionaryServiceBase`

  ↳ **`GraphQLDictionaryService`**

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/index/graphqldictionaryservice#constructor)

### Properties

- [graphQLClient](/docs/nextjs/ref/classes/index/graphqldictionaryservice#graphqlclient)
- [options](/docs/nextjs/ref/classes/index/graphqldictionaryservice#options)
- [searchService](/docs/nextjs/ref/classes/index/graphqldictionaryservice#searchservice)

### Methods

- [fetchDictionaryData](/docs/nextjs/ref/classes/index/graphqldictionaryservice#fetchdictionarydata)
- [getCacheClient](/docs/nextjs/ref/classes/index/graphqldictionaryservice#getcacheclient)
- [getCacheValue](/docs/nextjs/ref/classes/index/graphqldictionaryservice#getcachevalue)
- [getGraphQLClient](/docs/nextjs/ref/classes/index/graphqldictionaryservice#getgraphqlclient)
- [setCacheValue](/docs/nextjs/ref/classes/index/graphqldictionaryservice#setcachevalue)

## Constructors

### constructor

• **new GraphQLDictionaryService**(`options`)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLDictionaryServiceConfig`](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig) | instance |

#### Overrides

DictionaryServiceBase.constructor

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

___

### options

• **options**: [`GraphQLDictionaryServiceConfig`](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig)

#### Overrides

DictionaryServiceBase.options

___

### searchService

• `Private` **searchService**: `any`

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)\>

Fetches dictionary data for internalization.

**`default`** query (@see query)

**`throws`** {Error} if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`<[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)\>

dictionary phrases

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

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

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
