[**@sitecore-jss/sitecore-jss-vue**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-vue](../README.md) / CacheClient

# Interface: CacheClient\<T\>

An interface for cache clients.

## Type Parameters

• **T**

The type of data being cached.

## Methods

### getCacheValue()

> **getCacheValue**(`key`): `T`

Retrieves a value from the cache.

#### Parameters

• **key**: `string`

The cache key.

#### Returns

`T`

The cache value as {T}, or null if the specified key was not found in the cache.

#### Defined in

packages/sitecore-jss/types/cache-client.d.ts:18

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

packages/sitecore-jss/types/cache-client.d.ts:12
