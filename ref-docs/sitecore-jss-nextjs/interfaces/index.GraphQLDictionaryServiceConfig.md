[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

[index](../modules/index.md).GraphQLDictionaryServiceConfig

Configuration options for

**`See`**

GraphQLDictionaryService instances

## Hierarchy

- `SearchServiceConfig`

- `CacheOptions`

- `Pick`<`GraphQLRequestClientConfig`, ``"retries"``\>

  ↳ **`GraphQLDictionaryServiceConfig`**

## Table of contents

### Properties

- [apiKey](index.GraphQLDictionaryServiceConfig.md#apikey)
- [cacheEnabled](index.GraphQLDictionaryServiceConfig.md#cacheenabled)
- [cacheTimeout](index.GraphQLDictionaryServiceConfig.md#cachetimeout)
- [dictionaryEntryTemplateId](index.GraphQLDictionaryServiceConfig.md#dictionaryentrytemplateid)
- [endpoint](index.GraphQLDictionaryServiceConfig.md#endpoint)
- [jssAppTemplateId](index.GraphQLDictionaryServiceConfig.md#jssapptemplateid)
- [pageSize](index.GraphQLDictionaryServiceConfig.md#pagesize)
- [retries](index.GraphQLDictionaryServiceConfig.md#retries)
- [rootItemId](index.GraphQLDictionaryServiceConfig.md#rootitemid)
- [siteName](index.GraphQLDictionaryServiceConfig.md#sitename)
- [templates](index.GraphQLDictionaryServiceConfig.md#templates)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication.

#### Defined in

sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:18

___

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`Default`**

true

#### Inherited from

CacheOptions.cacheEnabled

#### Defined in

sitecore-jss/types/cache-client.d.ts:28

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`Default`**

60

#### Inherited from

CacheOptions.cacheTimeout

#### Defined in

sitecore-jss/types/cache-client.d.ts:33

___

### dictionaryEntryTemplateId

• `Optional` **dictionaryEntryTemplateId**: `string`

Optional. The template ID to use when searching for dictionary entries.

**`Default`**

'6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)

#### Defined in

sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:23

___

### endpoint

• **endpoint**: `string`

The URL of the graphQL endpoint.

#### Defined in

sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:14

___

### jssAppTemplateId

• `Optional` **jssAppTemplateId**: `string`

Optional. The template ID of a JSS App to use when searching for the appRootId.

**`Default`**

'061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)

#### Defined in

sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:28

___

### pageSize

• `Optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`Default`**

10

#### Inherited from

SearchServiceConfig.pageSize

#### Defined in

sitecore-jss/types/graphql/search-service.d.ts:51

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will be used if endpoint responds with 429 (rate limit reached) error

#### Inherited from

Pick.retries

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:39

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
