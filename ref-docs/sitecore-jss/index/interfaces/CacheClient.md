[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / CacheClient

# Interface: CacheClient\<T\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/cache-client.ts:7](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/cache-client.ts#L7)
=======
Defined in: [packages/sitecore-jss/src/cache-client.ts:7](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/cache-client.ts#L7)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

An interface for cache clients.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data being cached. |

## Methods

### getCacheValue()

> **getCacheValue**(`key`): `null` \| `T`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/cache-client.ts:21](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/cache-client.ts#L21)
=======
Defined in: [packages/sitecore-jss/src/cache-client.ts:21](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/cache-client.ts#L21)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Retrieves a value from the cache.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The cache key. |

#### Returns

`null` \| `T`

The cache value as {T}, or null if the specified key was not found in the cache.

***

### setCacheValue()

> **setCacheValue**(`key`, `value`): `T`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/cache-client.ts:14](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/cache-client.ts#L14)
=======
Defined in: [packages/sitecore-jss/src/cache-client.ts:14](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/cache-client.ts#L14)
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
