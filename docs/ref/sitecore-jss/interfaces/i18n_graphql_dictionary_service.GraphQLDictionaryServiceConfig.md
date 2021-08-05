[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [i18n/graphql-dictionary-service](../modules/i18n_graphql_dictionary_service.md) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

[i18n/graphql-dictionary-service](../modules/i18n_graphql_dictionary_service.md).GraphQLDictionaryServiceConfig

Configuration options for @see GraphQLDictionaryService instances

## Hierarchy

- [`SearchServiceConfig`](graphql_search_service.SearchServiceConfig.md)

- [`CacheOptions`](cache_client.CacheOptions.md)

  ↳ **`GraphQLDictionaryServiceConfig`**

## Table of contents

### Properties

- [apiKey](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#apikey)
- [cacheEnabled](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#cacheenabled)
- [cacheTimeout](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#cachetimeout)
- [dictionaryEntryTemplateId](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#dictionaryentrytemplateid)
- [endpoint](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#endpoint)
- [pageSize](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#pagesize)
- [rootItemId](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#rootitemid)
- [siteName](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#sitename)
- [templates](i18n_graphql_dictionary_service.GraphQLDictionaryServiceConfig.md#templates)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication.

#### Defined in

[i18n/graphql-dictionary-service.ts:60](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L60)

___

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`default`** true

#### Inherited from

[CacheOptions](cache_client.CacheOptions.md).[cacheEnabled](cache_client.CacheOptions.md#cacheenabled)

#### Defined in

[cache-client.ts:40](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/cache-client.ts#L40)

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`default`** 60

#### Inherited from

[CacheOptions](cache_client.CacheOptions.md).[cacheTimeout](cache_client.CacheOptions.md#cachetimeout)

#### Defined in

[cache-client.ts:45](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/cache-client.ts#L45)

___

### dictionaryEntryTemplateId

• `Optional` **dictionaryEntryTemplateId**: `string`

Optional. The template ID to use when searching for dictionary entries.

**`default`** '6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)

#### Defined in

[i18n/graphql-dictionary-service.ts:66](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L66)

___

### endpoint

• **endpoint**: `string`

The URL of the graphQL endpoint.

#### Defined in

[i18n/graphql-dictionary-service.ts:55](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L55)

___

### pageSize

• `Optional` **pageSize**: `number`

Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

[SearchServiceConfig](graphql_search_service.SearchServiceConfig.md).[pageSize](graphql_search_service.SearchServiceConfig.md#pagesize)

#### Defined in

[graphql/search-service.ts:49](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/graphql/search-service.ts#L49)

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

[SearchServiceConfig](graphql_search_service.SearchServiceConfig.md).[rootItemId](graphql_search_service.SearchServiceConfig.md#rootitemid)

#### Defined in

[graphql/search-service.ts:43](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/graphql/search-service.ts#L43)

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Inherited from

[SearchServiceConfig](graphql_search_service.SearchServiceConfig.md).[siteName](graphql_search_service.SearchServiceConfig.md#sitename)

#### Defined in

[graphql/search-service.ts:69](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/graphql/search-service.ts#L69)

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

[SearchServiceConfig](graphql_search_service.SearchServiceConfig.md).[templates](graphql_search_service.SearchServiceConfig.md#templates)

#### Defined in

[graphql/search-service.ts:54](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/graphql/search-service.ts#L54)
