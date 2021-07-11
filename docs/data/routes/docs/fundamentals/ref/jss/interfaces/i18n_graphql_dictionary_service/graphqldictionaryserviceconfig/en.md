---
name: graphqldictionaryserviceconfig
routeTemplate: ./data/component-templates/article.yml
title: graphqldictionaryserviceconfig
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [i18n/graphql-dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_graphql_dictionary_service) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

[i18n/graphql-dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_graphql_dictionary_service).GraphQLDictionaryServiceConfig

Configuration options for @see GraphQLDictionaryService instances

## Hierarchy

- [`SearchServiceConfig`](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig)

- [`CacheOptions`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions)

  ↳ **`GraphQLDictionaryServiceConfig`**

## Table of contents

### Properties

- [apiKey](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#apikey)
- [cacheEnabled](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#cacheenabled)
- [cacheTimeout](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#cachetimeout)
- [dictionaryEntryTemplateId](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#dictionaryentrytemplateid)
- [endpoint](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#endpoint)
- [pageSize](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#pagesize)
- [rootItemId](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#rootitemid)
- [siteName](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#sitename)
- [templates](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig#templates)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication.

___

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`default`** true

#### Inherited from

[CacheOptions](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions).[cacheEnabled](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions#cacheenabled)

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`default`** 60

#### Inherited from

[CacheOptions](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions).[cacheTimeout](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions#cachetimeout)

___

### dictionaryEntryTemplateId

• `Optional` **dictionaryEntryTemplateId**: `string`

Optional. The template ID to use when searching for dictionary entries.

**`default`** '6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)

___

### endpoint

• **endpoint**: `string`

The URL of the graphQL endpoint.

___

### pageSize

• `Optional` **pageSize**: `number`

Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

[SearchServiceConfig](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig).[pageSize](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig#pagesize)

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

[SearchServiceConfig](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig).[rootItemId](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig#rootitemid)

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Inherited from

[SearchServiceConfig](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig).[siteName](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig#sitename)

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

[SearchServiceConfig](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig).[templates](/docs/fundamentals/ref/jss/interfaces/graphql_search_service/searchserviceconfig#templates)
