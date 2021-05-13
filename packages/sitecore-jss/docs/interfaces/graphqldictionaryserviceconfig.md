[@sitecore-jss/sitecore-jss](../README.md) / GraphQLDictionaryServiceConfig

# Interface: GraphQLDictionaryServiceConfig

Configuration options for @see GraphQLDictionaryService instances

## Hierarchy

- *CacheOptions*

  ↳ **GraphQLDictionaryServiceConfig**

## Table of contents

### Properties

- [apiKey](graphqldictionaryserviceconfig.md#apikey)
- [cacheEnabled](graphqldictionaryserviceconfig.md#cacheenabled)
- [cacheTimeout](graphqldictionaryserviceconfig.md#cachetimeout)
- [endpoint](graphqldictionaryserviceconfig.md#endpoint)
- [pageSize](graphqldictionaryserviceconfig.md#pagesize)
- [rootItemId](graphqldictionaryserviceconfig.md#rootitemid)
- [siteName](graphqldictionaryserviceconfig.md#sitename)

## Properties

### apiKey

• **apiKey**: *string*

The API key to use for authentication.

Defined in: [i18n/graphql-dictionary-service.ts:77](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L77)

___

### cacheEnabled

• `Optional` **cacheEnabled**: *boolean*

Enable/disable caching mechanism

**`default`** true

Inherited from: CacheOptions.cacheEnabled

Defined in: [i18n/dictionary-service.ts:23](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/dictionary-service.ts#L23)

___

### cacheTimeout

• `Optional` **cacheTimeout**: *number*

Cache timeout (sec)

**`default`** 60

Inherited from: CacheOptions.cacheTimeout

Defined in: [i18n/dictionary-service.ts:28](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/dictionary-service.ts#L28)

___

### endpoint

• **endpoint**: *string*

The URL of the graphQL endpoint.

Defined in: [i18n/graphql-dictionary-service.ts:55](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L55)

___

### pageSize

• `Optional` **pageSize**: *number*

How many dictionary items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

Defined in: [i18n/graphql-dictionary-service.ts:67](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L67)

___

### rootItemId

• `Optional` **rootItemId**: *string*

The GUID of the Sitecore item to use as the root for the dictionary service search.

**`default`** The GUID of the root item of the specified Sitecore site.

Defined in: [i18n/graphql-dictionary-service.ts:61](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L61)

___

### siteName

• **siteName**: *string*

The name of the current Sitecore site.

Defined in: [i18n/graphql-dictionary-service.ts:72](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/graphql-dictionary-service.ts#L72)
