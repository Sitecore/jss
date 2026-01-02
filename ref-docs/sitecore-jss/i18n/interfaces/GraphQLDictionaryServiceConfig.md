[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:81](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L81)

Configuration options for

## See

GraphQLDictionaryService instances

## Extends

- `Omit`\<[`SearchQueryVariables`](../../graphql/interfaces/SearchQueryVariables.md), `"language"`\>.[`CacheOptions`](../../index/interfaces/CacheOptions.md).`Pick`\<[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md), `"retries"` \| `"retryStrategy"`\>

## Properties

### cacheEnabled?

> `optional` **cacheEnabled**: `boolean`

Defined in: [packages/sitecore-jss/src/cache-client.ts:40](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/cache-client.ts#L40)

Enable/disable caching mechanism

#### Default

```ts
true
```

#### Inherited from

[`CacheOptions`](../../index/interfaces/CacheOptions.md).[`cacheEnabled`](../../index/interfaces/CacheOptions.md#cacheenabled)

***

### cacheTimeout?

> `optional` **cacheTimeout**: `number`

Defined in: [packages/sitecore-jss/src/cache-client.ts:45](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/cache-client.ts#L45)

Cache timeout (sec)

#### Default

```ts
60
```

#### Inherited from

[`CacheOptions`](../../index/interfaces/CacheOptions.md).[`cacheTimeout`](../../index/interfaces/CacheOptions.md#cachetimeout)

***

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:95](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L95)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

***

### dictionaryEntryTemplateId?

> `optional` **dictionaryEntryTemplateId**: `string`

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:101](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L101)

Optional. The template ID to use when searching for dictionary entries.

#### Default

```ts
'6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)
```

***

### jssAppTemplateId?

> `optional` **jssAppTemplateId**: `string`

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:107](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L107)

Optional. The template ID of a JSS App to use when searching for the appRootId.

#### Default

```ts
'061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
```

***

### pageSize?

> `optional` **pageSize**: `number`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:61](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/graphql/search-service.ts#L61)

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
10
```

#### Inherited from

[`SearchQueryVariables`](../../graphql/interfaces/SearchQueryVariables.md).[`pageSize`](../../graphql/interfaces/SearchQueryVariables.md#pagesize)

***

### retries?

> `optional` **retries**: `number`

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/graphql-request-client.ts#L83)

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md).[`retries`](../../index/type-aliases/GraphQLRequestClientConfig.md#retries)

***

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../../index/interfaces/RetryStrategy.md)

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/graphql-request-client.ts#L88)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md).[`retryStrategy`](../../index/type-aliases/GraphQLRequestClientConfig.md#retrystrategy)

***

### rootItemId?

> `optional` **rootItemId**: `string`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/graphql/search-service.ts#L48)

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

[`SearchQueryVariables`](../../graphql/interfaces/SearchQueryVariables.md).[`rootItemId`](../../graphql/interfaces/SearchQueryVariables.md#rootitemid)

***

### siteName

> **siteName**: `string`

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:89](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L89)

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

***

### templates?

> `optional` **templates**: `string`

Defined in: [packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/graphql/search-service.ts#L53)

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

[`SearchQueryVariables`](../../graphql/interfaces/SearchQueryVariables.md).[`templates`](../../graphql/interfaces/SearchQueryVariables.md#templates)

***

### useSiteQuery?

> `optional` **useSiteQuery**: `boolean`

Defined in: [packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:112](https://github.com/Sitecore/jss/blob/e3335a5ab917b1a6cc1586acbfb6dc79aa56fc5a/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L112)

Optional. Use site query for dictionary fetch instead of search query (XM Cloud only)
