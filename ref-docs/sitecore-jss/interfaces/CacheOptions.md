[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / CacheOptions

# Interface: CacheOptions

Minimum configuration options for classes that implement @see CacheClient

## Hierarchy

- **`CacheOptions`**

  ↳ [`GraphQLDictionaryServiceConfig`](GraphQLDictionaryServiceConfig.md)

## Table of contents

### Properties

- [cacheEnabled](CacheOptions.md#cacheenabled)
- [cacheTimeout](CacheOptions.md#cachetimeout)

## Properties

### cacheEnabled

• `Optional` **cacheEnabled**: `boolean`

Enable/disable caching mechanism

**`default`** true

#### Defined in

[cache-client.ts:40](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/cache-client.ts#L40)

___

### cacheTimeout

• `Optional` **cacheTimeout**: `number`

Cache timeout (sec)

**`default`** 60

#### Defined in

[cache-client.ts:45](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/cache-client.ts#L45)
