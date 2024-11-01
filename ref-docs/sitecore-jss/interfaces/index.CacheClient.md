[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / CacheClient

# Interface: CacheClient\<T\>

[index](../modules/index.md).CacheClient

An interface for cache clients.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of data being cached. |

## Implemented by

- [`DictionaryServiceBase`](../classes/i18n.DictionaryServiceBase.md)
- [`MemoryCacheClient`](../classes/index.MemoryCacheClient.md)

## Table of contents

### Methods

- [getCacheValue](index.CacheClient.md#getcachevalue)
- [setCacheValue](index.CacheClient.md#setcachevalue)

## Methods

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| `T`

Retrieves a value from the cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| `T`

The cache value as {T}, or null if the specified key was not found in the cache.

#### Defined in

[packages/sitecore-jss/src/cache-client.ts:21](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss/src/cache-client.ts#L21)

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

[packages/sitecore-jss/src/cache-client.ts:14](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss/src/cache-client.ts#L14)
