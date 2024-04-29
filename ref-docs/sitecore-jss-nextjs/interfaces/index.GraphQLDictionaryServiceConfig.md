[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

[index](../modules/index.md).GraphQLDictionaryServiceConfig

Configuration options for

**`See`**

GraphQLDictionaryService instances

## Hierarchy

- `SearchServiceConfig`

- `CacheOptions`

- `Pick`\<`GraphQLRequestClientConfig`, ``"retries"`` \| ``"retryStrategy"``\>

  ↳ **`GraphQLDictionaryServiceConfig`**

## Table of contents

### Properties

- [cacheEnabled](index.GraphQLDictionaryServiceConfig.md#cacheenabled)
- [cacheTimeout](index.GraphQLDictionaryServiceConfig.md#cachetimeout)
- [clientFactory](index.GraphQLDictionaryServiceConfig.md#clientfactory)
- [dictionaryEntryTemplateId](index.GraphQLDictionaryServiceConfig.md#dictionaryentrytemplateid)
- [jssAppTemplateId](index.GraphQLDictionaryServiceConfig.md#jssapptemplateid)
- [pageSize](index.GraphQLDictionaryServiceConfig.md#pagesize)
- [retries](index.GraphQLDictionaryServiceConfig.md#retries)
- [retryStrategy](index.GraphQLDictionaryServiceConfig.md#retrystrategy)
- [rootItemId](index.GraphQLDictionaryServiceConfig.md#rootitemid)
- [siteName](index.GraphQLDictionaryServiceConfig.md#sitename)
- [templates](index.GraphQLDictionaryServiceConfig.md#templates)

## Properties

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`Default`**

```ts
true
```

#### Inherited from

CacheOptions.cacheEnabled

#### Defined in

sitecore-jss/types/cache-client.d.ts:28

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`Default`**

```ts
60
```

#### Inherited from

CacheOptions.cacheTimeout

#### Defined in

sitecore-jss/types/cache-client.d.ts:33

___

### clientFactory

• **clientFactory**: [`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:15

___

### dictionaryEntryTemplateId

• `Optional` **dictionaryEntryTemplateId**: `string`

Optional. The template ID to use when searching for dictionary entries.

**`Default`**

```ts
'6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)
```

#### Defined in

sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:20

___

### jssAppTemplateId

• `Optional` **jssAppTemplateId**: `string`

Optional. The template ID of a JSS App to use when searching for the appRootId.

**`Default`**

```ts
'061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
```

#### Defined in

sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:25

___

### pageSize

• `Optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`Default`**

```ts
10
```

#### Inherited from

SearchServiceConfig.pageSize

#### Defined in

sitecore-jss/types/graphql/search-service.d.ts:51

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

Pick.retries

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:87

___

### retryStrategy

• `Optional` **retryStrategy**: [`RetryStrategy`](graphql.RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

Pick.retryStrategy

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:92

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

SearchServiceConfig.rootItemId

#### Defined in

sitecore-jss/types/graphql/search-service.d.ts:41

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Inherited from

SearchServiceConfig.siteName

#### Defined in

sitecore-jss/types/graphql/search-service.d.ts:65

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

SearchServiceConfig.templates

#### Defined in

sitecore-jss/types/graphql/search-service.d.ts:45
