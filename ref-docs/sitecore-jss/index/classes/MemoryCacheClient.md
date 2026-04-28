[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / MemoryCacheClient

# Class: MemoryCacheClient\<T\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/cache-client.ts:54](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/cache-client.ts#L54)
=======
Defined in: [packages/sitecore-jss/src/cache-client.ts:54](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/cache-client.ts#L54)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A cache client that uses the 'memory-cache' library (https://github.com/ptarjan/node-cache).
This class is meant to be extended or used as a mixin; it's not meant to be used directly.

## Mixin

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data being cached. |

## Implements

- [`CacheClient`](../interfaces/CacheClient.md)\<`T`\>

## Constructors

### Constructor

> **new MemoryCacheClient**\<`T`\>(`options`): `MemoryCacheClient`\<`T`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/cache-client.ts:61](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/cache-client.ts#L61)
=======
Defined in: [packages/sitecore-jss/src/cache-client.ts:61](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/cache-client.ts#L61)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Initializes a new instance of

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`CacheOptions`](../interfaces/CacheOptions.md) | Configuration options |

#### Returns

`MemoryCacheClient`\<`T`\>

#### See

 - MemoryCacheClient using the provided
 - CacheOptions

## Properties

### options

> **options**: [`CacheOptions`](../interfaces/CacheOptions.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/cache-client.ts:61](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/cache-client.ts#L61)
=======
Defined in: [packages/sitecore-jss/src/cache-client.ts:61](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/cache-client.ts#L61)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Configuration options

## Methods

### getCacheValue()

> **getCacheValue**(`key`): `null` \| `T`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/cache-client.ts:77](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/cache-client.ts#L77)
=======
Defined in: [packages/sitecore-jss/src/cache-client.ts:77](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/cache-client.ts#L77)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Retrieves a value from the cache.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The cache key. |

#### Returns

`null` \| `T`

The cache value as {T}, or null if the specified key is not found in the cache.

#### Implementation of

[`CacheClient`](../interfaces/CacheClient.md).[`getCacheValue`](../interfaces/CacheClient.md#getcachevalue)

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): `T`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/cache-client.ts:88](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/cache-client.ts#L88)
=======
Defined in: [packages/sitecore-jss/src/cache-client.ts:88](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/cache-client.ts#L88)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Adds a value to the cache for the specified cache key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The cache key. |
| `value` | `T` | The value to cache. |

#### Returns

`T`

The value added to the cache.

#### Implementation of

[`CacheClient`](../interfaces/CacheClient.md).[`setCacheValue`](../interfaces/CacheClient.md#setcachevalue)
