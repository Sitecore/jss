[@sitecore-jss/sitecore-jss-react](../README.md) / CacheClient

# Interface: CacheClient\<T\>

An interface for cache clients.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of data being cached. |

## Implemented by

- [`MemoryCacheClient`](../classes/MemoryCacheClient.md)

## Table of contents

### Methods

- [getCacheValue](CacheClient.md#getcachevalue)
- [setCacheValue](CacheClient.md#setcachevalue)

## Methods

### getCacheValue

▸ **getCacheValue**(`key`): `T`

Retrieves a value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

`T`

The cache value as {T}, or null if the specified key was not found in the cache.

#### Defined in

packages/sitecore-jss/types/cache-client.d.ts:18

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): `T`

Adds a value to the cache for the specified cache key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | `T` | The value to cache. |

#### Returns

`T`

The value added to the cache.

#### Defined in

packages/sitecore-jss/types/cache-client.d.ts:12
