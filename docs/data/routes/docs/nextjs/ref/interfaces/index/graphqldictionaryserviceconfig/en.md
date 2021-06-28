---
name: graphqldictionaryserviceconfig
routeTemplate: ./data/component-templates/article.yml
title: graphqldictionaryserviceconfig
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [index](/docs/nextjs/ref/modules/index) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

[index](/docs/nextjs/ref/modules/index).GraphQLDictionaryServiceConfig

Configuration options for @see GraphQLDictionaryService instances

## Hierarchy

- `SearchServiceConfig`

- `CacheOptions`

  ↳ **`GraphQLDictionaryServiceConfig`**

## Table of contents

### Properties

- [apiKey](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#apikey)
- [cacheEnabled](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#cacheenabled)
- [cacheTimeout](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#cachetimeout)
- [dictionaryEntryTemplateId](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#dictionaryentrytemplateid)
- [endpoint](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#endpoint)
- [pageSize](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#pagesize)
- [rootItemId](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#rootitemid)
- [siteName](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#sitename)
- [templates](/docs/nextjs/ref/interfaces/index/graphqldictionaryserviceconfig#templates)

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

CacheOptions.cacheEnabled

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`default`** 60

#### Inherited from

CacheOptions.cacheTimeout

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

SearchServiceConfig.pageSize

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

SearchServiceConfig.rootItemId

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Inherited from

SearchServiceConfig.siteName

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

SearchServiceConfig.templates
