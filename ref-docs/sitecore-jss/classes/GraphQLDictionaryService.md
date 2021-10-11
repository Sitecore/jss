[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

Service that fetch dictionary data using Sitecore's GraphQL API.

**`mixes`** SearchQueryService<DictionaryQueryResult>

## Hierarchy

- [`DictionaryServiceBase`](DictionaryServiceBase.md)

  ↳ **`GraphQLDictionaryService`**

## Table of contents

### Constructors

- [constructor](GraphQLDictionaryService.md#constructor)

### Properties

- [graphQLClient](GraphQLDictionaryService.md#graphqlclient)
- [options](GraphQLDictionaryService.md#options)
- [searchService](GraphQLDictionaryService.md#searchservice)

### Methods

- [fetchDictionaryData](GraphQLDictionaryService.md#fetchdictionarydata)
- [getCacheClient](GraphQLDictionaryService.md#getcacheclient)
- [getCacheValue](GraphQLDictionaryService.md#getcachevalue)
- [getGraphQLClient](GraphQLDictionaryService.md#getgraphqlclient)
- [setCacheValue](GraphQLDictionaryService.md#setcachevalue)

## Constructors

### constructor

• **new GraphQLDictionaryService**(`options`)

Creates an instance of graphQL dictionary service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLDictionaryServiceConfig`](../interfaces/GraphQLDictionaryServiceConfig.md) | instance |

#### Overrides

[DictionaryServiceBase](DictionaryServiceBase.md).[constructor](DictionaryServiceBase.md#constructor)

#### Defined in

[i18n/graphql-dictionary-service.ts:96](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L96)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/GraphQLClient.md)

#### Defined in

[i18n/graphql-dictionary-service.ts:89](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L89)

___

### options

• **options**: [`GraphQLDictionaryServiceConfig`](../interfaces/GraphQLDictionaryServiceConfig.md)

#### Inherited from

[DictionaryServiceBase](DictionaryServiceBase.md).[options](DictionaryServiceBase.md#options)

___

### searchService

• `Private` **searchService**: [`SearchQueryService`](SearchQueryService.md)<`DictionaryQueryResult`\>

#### Defined in

[i18n/graphql-dictionary-service.ts:90](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L90)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetches dictionary data for internalization.

**`default`** query (@see query)

**`throws`** {Error} if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

#### Overrides

[DictionaryServiceBase](DictionaryServiceBase.md).[fetchDictionaryData](DictionaryServiceBase.md#fetchdictionarydata)

#### Defined in

[i18n/graphql-dictionary-service.ts:109](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L109)

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

[DictionaryServiceBase](DictionaryServiceBase.md).[getCacheClient](DictionaryServiceBase.md#getcacheclient)

#### Defined in

[i18n/dictionary-service.ts:62](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L62)

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Retrieves a @see DictionaryPhrases value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The @see DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

[DictionaryServiceBase](DictionaryServiceBase.md).[getCacheValue](DictionaryServiceBase.md#getcachevalue)

#### Defined in

[i18n/dictionary-service.ts:52](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L52)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](../interfaces/GraphQLClient.md)

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

[`GraphQLClient`](../interfaces/GraphQLClient.md)

implementation

#### Defined in

[i18n/graphql-dictionary-service.ts:154](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L154)

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Caches a @see DictionaryPhrases value for the specified cache key.

**`mixes`** CacheClient<DictionaryPhrases>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md) | The value to cache. |

#### Returns

[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The value added to the cache.

#### Inherited from

[DictionaryServiceBase](DictionaryServiceBase.md).[setCacheValue](DictionaryServiceBase.md#setcachevalue)

#### Defined in

[i18n/dictionary-service.ts:43](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L43)
