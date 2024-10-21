[@sitecore-jss/sitecore-jss-angular](../README.md) / GraphQLDictionaryService

# Class: GraphQLDictionaryService

Service that fetch dictionary data using Sitecore's GraphQL API.

**`Mixes`**

SearchQueryService<DictionaryQueryResult>

## Hierarchy

- `DictionaryServiceBase`

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
- [fetchWithSearchQuery](GraphQLDictionaryService.md#fetchwithsearchquery)
- [fetchWithSiteQuery](GraphQLDictionaryService.md#fetchwithsitequery)
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
| `options` | `GraphQLDictionaryServiceConfig` | instance |

#### Overrides

DictionaryServiceBase.constructor

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:73

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:67

___

### options

• **options**: `GraphQLDictionaryServiceConfig`

#### Overrides

DictionaryServiceBase.options

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:66

___

### searchService

• `Private` **searchService**: `any`

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:68

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetches dictionary data for internalization. Uses search query by default

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

**`Throws`**

if the app root was not found for the specified site and language.

#### Overrides

DictionaryServiceBase.fetchDictionaryData

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:80

___

### fetchWithSearchQuery

▸ **fetchWithSearchQuery**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetches dictionary data with search query
This is the default behavior for non-XMCloud deployments

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

**`Default`**

```ts
query (@see query)
```

**`Throws`**

if the app root was not found for the specified site and language.

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:89

___

### fetchWithSiteQuery

▸ **fetchWithSiteQuery**(`language`): `Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Fetches dictionary data with site query
This is the default behavior for XMCloud deployments

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to fetch |

#### Returns

`Promise`\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

dictionary phrases

**`Default`**

```ts
siteQuery (@see siteQuery)
```

#### Defined in

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:97

___

### getCacheClient

▸ `Protected` **getCacheClient**(): [`CacheClient`](../interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

Gets a cache client that can cache data. Uses memory-cache as the default
library for caching (@see MemoryCacheClient). Override this method if you
want to use something else.

#### Returns

[`CacheClient`](../interfaces/CacheClient.md)\<[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)\>

implementation

#### Inherited from

DictionaryServiceBase.getCacheClient

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:49

___

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Retrieves a

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The

**`See`**

 - DictionaryPhrases value from the cache.
 - DictionaryPhrases value, or null if the specified key is not found in the cache.

#### Inherited from

DictionaryServiceBase.getCacheValue

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:42

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

packages/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:104

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

Caches a

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | [`DictionaryPhrases`](../interfaces/DictionaryPhrases.md) | The value to cache. |

#### Returns

[`DictionaryPhrases`](../interfaces/DictionaryPhrases.md)

The value added to the cache.

**`See`**

DictionaryPhrases value for the specified cache key.

**`Mixes`**

CacheClient<DictionaryPhrases>

#### Inherited from

DictionaryServiceBase.setCacheValue

#### Defined in

packages/sitecore-jss/types/i18n/dictionary-service.d.ts:36
