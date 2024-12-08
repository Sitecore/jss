[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / CacheOptions

# Interface: CacheOptions

[index](../modules/index.md).CacheOptions

Minimum configuration options for classes that implement

**`See`**

CacheClient

## Hierarchy

- **`CacheOptions`**

  ↳ [`GraphQLDictionaryServiceConfig`](index.GraphQLDictionaryServiceConfig.md)

## Table of contents

### Properties

- [cacheEnabled](index.CacheOptions.md#cacheenabled)
- [cacheTimeout](index.CacheOptions.md#cachetimeout)

## Properties

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`Default`**

```ts
true
```

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

#### Defined in

sitecore-jss/types/cache-client.d.ts:33
