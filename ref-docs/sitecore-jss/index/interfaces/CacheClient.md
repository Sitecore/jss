[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / CacheClient

# Interface: CacheClient\<T\>

An interface for cache clients.

## Type Parameters

• **T**

The type of data being cached.

## Methods

### getCacheValue()

> **getCacheValue**(`key`): `null` \| `T`

Retrieves a value from the cache.

#### Parameters

• **key**: `string`

The cache key.

#### Returns

`null` \| `T`

The cache value as {T}, or null if the specified key was not found in the cache.

#### Defined in

[packages/sitecore-jss/src/cache-client.ts:21](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/cache-client.ts#L21)

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): `T`

Adds a value to the cache for the specified cache key.

#### Parameters

• **key**: `string`

The cache key.

• **value**: `T`

The value to cache.

#### Returns

`T`

The value added to the cache.

#### Defined in

[packages/sitecore-jss/src/cache-client.ts:14](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss/src/cache-client.ts#L14)
