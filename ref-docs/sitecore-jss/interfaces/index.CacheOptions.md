[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / CacheOptions

# Interface: CacheOptions

[index](../modules/index.md).CacheOptions

Minimum configuration options for classes that implement

**`See`**

CacheClient

## Hierarchy

- **`CacheOptions`**

  ↳ [`GraphQLDictionaryServiceConfig`](i18n.GraphQLDictionaryServiceConfig.md)

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

[packages/sitecore-jss/src/cache-client.ts:40](https://github.com/Sitecore/jss/blob/fd2c15d9c/packages/sitecore-jss/src/cache-client.ts#L40)

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`Default`**

```ts
60
```

#### Defined in

[packages/sitecore-jss/src/cache-client.ts:45](https://github.com/Sitecore/jss/blob/fd2c15d9c/packages/sitecore-jss/src/cache-client.ts#L45)
