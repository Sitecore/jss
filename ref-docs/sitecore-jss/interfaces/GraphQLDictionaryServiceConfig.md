[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

Configuration options for @see GraphQLDictionaryService instances

## Hierarchy

- [`SearchServiceConfig`](SearchServiceConfig.md)

- [`CacheOptions`](CacheOptions.md)

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

[i18n/graphql-dictionary-service.ts:60](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L60)

___

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`default`** true

#### Inherited from

[CacheOptions](CacheOptions.md).[cacheEnabled](CacheOptions.md#cacheenabled)

#### Defined in

[cache-client.ts:40](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/cache-client.ts#L40)

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`default`** 60

#### Inherited from

[CacheOptions](CacheOptions.md).[cacheTimeout](CacheOptions.md#cachetimeout)

#### Defined in

[cache-client.ts:45](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/cache-client.ts#L45)

___

### dictionaryEntryTemplateId

• `Optional` **dictionaryEntryTemplateId**: `string`

Optional. The template ID to use when searching for dictionary entries.

**`default`** '6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)

#### Defined in

[i18n/graphql-dictionary-service.ts:66](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L66)

___

### endpoint

• **endpoint**: `string`

The URL of the graphQL endpoint.

#### Defined in

[i18n/graphql-dictionary-service.ts:55](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L55)

___

### jssAppTemplateId

• `Optional` **jssAppTemplateId**: `string`

Optional. The template ID of a JSS App to use when searching for the appRootId.

**`default`** '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)

#### Defined in

[i18n/graphql-dictionary-service.ts:72](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L72)

___

### pageSize

• `Optional` **pageSize**: `number`

Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

[SearchServiceConfig](SearchServiceConfig.md).[pageSize](SearchServiceConfig.md#pagesize)

#### Defined in

[graphql/search-service.ts:49](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L49)

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

[SearchServiceConfig](SearchServiceConfig.md).[rootItemId](SearchServiceConfig.md#rootitemid)

#### Defined in

[graphql/search-service.ts:43](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L43)

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Inherited from

[SearchServiceConfig](SearchServiceConfig.md).[siteName](SearchServiceConfig.md#sitename)

#### Defined in

[graphql/search-service.ts:69](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L69)

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

[SearchServiceConfig](SearchServiceConfig.md).[templates](SearchServiceConfig.md#templates)

#### Defined in

[graphql/search-service.ts:54](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/graphql/search-service.ts#L54)
