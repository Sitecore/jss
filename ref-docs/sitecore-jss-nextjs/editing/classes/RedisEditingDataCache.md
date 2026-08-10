[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / RedisEditingDataCache

# Class: RedisEditingDataCache

Defined in: [sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:34](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts#L34)

Implementation of editing cache backed by a Redis-compatible REST API (e.g. Upstash Redis,
available as a Vercel Marketplace integration, or any self-hosted Upstash-compatible endpoint).
Set TTL for cache data in constructor (default: 120 seconds)

## Implements

- [`EditingDataCache`](../interfaces/EditingDataCache.md)

## Constructors

### Constructor

> **new RedisEditingDataCache**(`options`): `RedisEditingDataCache`

Defined in: [sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts#L41)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`RedisEditingDataCacheOptions`](../interfaces/RedisEditingDataCacheOptions.md) | Redis connection and cache options |

#### Returns

`RedisEditingDataCache`

## Properties

### redisCache

> `protected` **redisCache**: `Redis`

Defined in: [sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:35](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts#L35)

## Methods

### get()

> **get**(`key`): `Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

Defined in: [sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:79](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts#L79)

Retrieves editing data for `key` from Redis storage. The entry is expired (invalidated)
immediately after being read, since it is only ever meant to be retrieved once.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Cache key |

#### Returns

`Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

The [EditingData](../type-aliases/EditingData.md) for `key`, or `undefined` on a cache miss

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`get`](../interfaces/EditingDataCache.md#get)

***

### set()

> **set**(`key`, `editingData`): `Promise`\<`void`\>

Defined in: [sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts:63](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss-nextjs/src/editing/redis-editing-data-cache.ts#L63)

Stores editing data in Redis storage, keyed by `key`, with a TTL of [RedisEditingDataCacheOptions.defaultTtl](../interfaces/RedisEditingDataCacheOptions.md#defaultttl)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Cache key |
| `editingData` | [`EditingData`](../type-aliases/EditingData.md) | Editing data to store |

#### Returns

`Promise`\<`void`\>

A Promise that resolves once the data has been stored

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`set`](../interfaces/EditingDataCache.md#set)
