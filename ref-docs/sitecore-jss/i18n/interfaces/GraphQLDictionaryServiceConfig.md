[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

Configuration options for

## See

GraphQLDictionaryService instances

## Extends

- `Omit`\<[`SearchQueryVariables`](../../graphql/interfaces/SearchQueryVariables.md), `"language"`\>.[`CacheOptions`](../../index/interfaces/CacheOptions.md).`Pick`\<[`GraphQLRequestClientConfig`](../../index/type-aliases/GraphQLRequestClientConfig.md), `"retries"` \| `"retryStrategy"`\>

## Properties

### cacheEnabled?

> `optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

#### Default

```ts
true
```

#### Inherited from

[`CacheOptions`](../../index/interfaces/CacheOptions.md).[`cacheEnabled`](../../index/interfaces/CacheOptions.md#cacheenabled)

#### Defined in

[packages/sitecore-jss/src/cache-client.ts:40](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/cache-client.ts#L40)

***

### cacheTimeout?

> `optional` **cacheTimeout**: `number`

Cache timeout (sec)

#### Default

```ts
60
```

#### Inherited from

[`CacheOptions`](../../index/interfaces/CacheOptions.md).[`cacheTimeout`](../../index/interfaces/CacheOptions.md#cachetimeout)

#### Defined in

[packages/sitecore-jss/src/cache-client.ts:45](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/cache-client.ts#L45)

***

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:95](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L95)

***

### dictionaryEntryTemplateId?

> `optional` **dictionaryEntryTemplateId**: `string`

Optional. The template ID to use when searching for dictionary entries.

#### Default

```ts
'6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)
```

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:101](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L101)

***

### jssAppTemplateId?

> `optional` **jssAppTemplateId**: `string`

Optional. The template ID of a JSS App to use when searching for the appRootId.

#### Default

```ts
'061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
```

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:107](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L107)

***

### pageSize?

> `optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
10
```

#### Inherited from

`Omit.pageSize`

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:61](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql/search-service.ts#L61)

***

### retries?

> `optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

`Pick.retries`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql-request-client.ts#L83)

***

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../../index/interfaces/RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

`Pick.retryStrategy`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql-request-client.ts#L88)

***

### rootItemId?

> `optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

`Omit.rootItemId`

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:48](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql/search-service.ts#L48)

***

### siteName

> **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:89](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L89)

***

### templates?

> `optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

`Omit.templates`

#### Defined in

[packages/sitecore-jss/src/graphql/search-service.ts:53](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql/search-service.ts#L53)

***

### useSiteQuery?

> `optional` **useSiteQuery**: `boolean`

Optional. Use site query for dictionary fetch instead of search query (XM Cloud only)

#### Defined in

[packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts:112](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L112)
