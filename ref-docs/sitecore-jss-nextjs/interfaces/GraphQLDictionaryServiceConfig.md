[Sitecore JavaScript Rendering SDK (JSS) for Next.js](../README.md) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

Configuration options for @see GraphQLDictionaryService instances

## Hierarchy

- `SearchServiceConfig`

- `CacheOptions`

  ↳ **`GraphQLDictionaryServiceConfig`**

## Table of contents

### Properties

- [apiKey](GraphQLDictionaryServiceConfig.md#apikey)
- [cacheEnabled](GraphQLDictionaryServiceConfig.md#cacheenabled)
- [cacheTimeout](GraphQLDictionaryServiceConfig.md#cachetimeout)
- [dictionaryEntryTemplateId](GraphQLDictionaryServiceConfig.md#dictionaryentrytemplateid)
- [endpoint](GraphQLDictionaryServiceConfig.md#endpoint)
- [jssAppTemplateId](GraphQLDictionaryServiceConfig.md#jssapptemplateid)
- [pageSize](GraphQLDictionaryServiceConfig.md#pagesize)
- [rootItemId](GraphQLDictionaryServiceConfig.md#rootitemid)
- [siteName](GraphQLDictionaryServiceConfig.md#sitename)
- [templates](GraphQLDictionaryServiceConfig.md#templates)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication.

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:18

___

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`default`** true

#### Inherited from

CacheOptions.cacheEnabled

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/cache-client.d.ts:28

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`default`** 60

#### Inherited from

CacheOptions.cacheTimeout

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/cache-client.d.ts:33

___

### dictionaryEntryTemplateId

• `Optional` **dictionaryEntryTemplateId**: `string`

Optional. The template ID to use when searching for dictionary entries.

**`default`** '6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:23

___

### endpoint

• **endpoint**: `string`

The URL of the graphQL endpoint.

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:14

___

### jssAppTemplateId

• `Optional` **jssAppTemplateId**: `string`

Optional. The template ID of a JSS App to use when searching for the appRootId.

**`default`** '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/i18n/graphql-dictionary-service.d.ts:28

___

### pageSize

• `Optional` **pageSize**: `number`

Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

SearchServiceConfig.pageSize

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/graphql/search-service.d.ts:42

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

SearchServiceConfig.rootItemId

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/graphql/search-service.d.ts:37

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Inherited from

SearchServiceConfig.siteName

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/graphql/search-service.d.ts:60

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

SearchServiceConfig.templates

#### Defined in

node_modules/@sitecore-jss/sitecore-jss/types/graphql/search-service.d.ts:46
