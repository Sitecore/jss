[**@sitecore-jss/sitecore-jss-vue**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-vue](../README.md) / MemoryCacheClient

# Class: MemoryCacheClient\<T\>

A cache client that uses the 'memory-cache' library (https://github.com/ptarjan/node-cache).
This class is meant to be extended or used as a mixin; it's not meant to be used directly.

## Mixin

## Type Parameters

• **T**

The type of data being cached.

## Implements

- [`CacheClient`](../interfaces/CacheClient.md)\<`T`\>

## Constructors

### new MemoryCacheClient()

> **new MemoryCacheClient**\<`T`\>(`options`): [`MemoryCacheClient`](MemoryCacheClient.md)\<`T`\>

Initializes a new instance of

#### Parameters

• **options**: [`CacheOptions`](../interfaces/CacheOptions.md)

Configuration options

#### Returns

[`MemoryCacheClient`](MemoryCacheClient.md)\<`T`\>

#### See

 - MemoryCacheClient using the provided
 - CacheOptions

#### Defined in

packages/sitecore-jss/types/cache-client.d.ts:48

## Properties

### options

> **options**: [`CacheOptions`](../interfaces/CacheOptions.md)

#### Defined in

packages/sitecore-jss/types/cache-client.d.ts:42

## Methods

### getCacheValue()

> **getCacheValue**(`key`): `T`

Retrieves a value from the cache.

#### Parameters

• **key**: `string`

The cache key.

#### Returns

`T`

The cache value as {T}, or null if the specified key is not found in the cache.

#### Implementation of

[`CacheClient`](../interfaces/CacheClient.md).[`getCacheValue`](../interfaces/CacheClient.md#getcachevalue)

#### Defined in

packages/sitecore-jss/types/cache-client.d.ts:55

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

#### Implementation of

[`CacheClient`](../interfaces/CacheClient.md).[`setCacheValue`](../interfaces/CacheClient.md#setcachevalue)

#### Defined in

packages/sitecore-jss/types/cache-client.d.ts:63
