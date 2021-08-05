[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

[index](../modules/index.md).GraphQLDictionaryService

Service that fetch dictionary data using Sitecore's GraphQL API.

**`mixes`** SearchQueryService<DictionaryQueryResult>

## Hierarchy

- `DictionaryServiceBase`

  ↳ **`GraphQLDictionaryService`**

## Table of contents

### Constructors

- [constructor](index.GraphQLDictionaryService.md#constructor)

### Properties

- [graphQLClient](index.GraphQLDictionaryService.md#graphqlclient)
- [options](index.GraphQLDictionaryService.md#options)
- [searchService](index.GraphQLDictionaryService.md#searchservice)

### Methods

- [fetchDictionaryData](index.GraphQLDictionaryService.md#fetchdictionarydata)
- [getCacheClient](index.GraphQLDictionaryService.md#getcacheclient)
- [getCacheValue](index.GraphQLDictionaryService.md#getcachevalue)
- [getGraphQLClient](index.GraphQLDictionaryService.md#getgraphqlclient)
- [setCacheValue](index.GraphQLDictionaryService.md#setcachevalue)

## Constructors

### constructor

• **new GraphQLDictionaryService**(`options`)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLDictionaryServiceConfig`](../interfaces/index.GraphQLDictionaryServiceConfig.md) | instance |

#### Overrides

DictionaryServiceBase.constructor

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:49

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:43

___

### options

• **options**: [`GraphQLDictionaryServiceConfig`](../interfaces/index.GraphQLDictionaryServiceConfig.md)

#### Overrides

DictionaryServiceBase.options

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:42

___

### searchService

• `Private` **searchService**: `any`

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:44

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)\>

Fetches dictionary data for internalization.

**`default`** query (@see query)

**`throws`** {Error} if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`<[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)\>

dictionary phrases

#### Overrides

DictionaryServiceBase.fetchDictionaryData

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:57

___

### getCacheClient

▸ `Protected` **getCacheClient**(): `CacheClient`<[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

`CacheClient`<[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)\>

implementation

#### Inherited from

DictionaryServiceBase.getCacheClient

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/dictionary-service.d.ts:49

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)

Retrieves a @see DictionaryPhrases value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)

The @see DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

DictionaryServiceBase.getCacheValue

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/dictionary-service.d.ts:42

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:64

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)

Caches a @see DictionaryPhrases value for the specified cache key.

**`mixes`** CacheClient<DictionaryPhrases>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md) | The value to cache. |

#### Returns

[`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md)

The value added to the cache.

#### Inherited from

DictionaryServiceBase.setCacheValue

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/dictionary-service.d.ts:36
