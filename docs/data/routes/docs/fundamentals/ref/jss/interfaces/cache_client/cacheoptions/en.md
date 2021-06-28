---
name: cacheoptions
routeTemplate: ./data/component-templates/article.yml
title: cacheoptions
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [cache-client](/docs/fundamentals/ref/jss/modules/cache_client) / CacheOptions

# Interface: CacheOptions

[cache-client](/docs/fundamentals/ref/jss/modules/cache_client).CacheOptions

Minimum configuration options for classes that implement @see CacheClient

## Hierarchy

- **`CacheOptions`**

  ↳ [`GraphQLDictionaryServiceConfig`](/docs/fundamentals/ref/jss/interfaces/i18n_graphql_dictionary_service/graphqldictionaryserviceconfig)

## Table of contents

### Properties

- [cacheEnabled](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions#cacheenabled)
- [cacheTimeout](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions#cachetimeout)

## Properties

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`default`** true

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`default`** 60
