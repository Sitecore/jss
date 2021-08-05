[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [cache-client](../modules/cache_client.md) / CacheClient

# Interface: CacheClient<T\>

[cache-client](../modules/cache_client.md).CacheClient

An interface for cache clients.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of data being cached. |

## Implemented by

- [`DictionaryServiceBase`](../classes/i18n_dictionary_service.DictionaryServiceBase.md)
- [`MemoryCacheClient`](../classes/cache_client.MemoryCacheClient.md)

## Table of contents

### Methods

- [getCacheValue](cache_client.CacheClient.md#getcachevalue)
- [setCacheValue](cache_client.CacheClient.md#setcachevalue)

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

[cache-client.ts:21](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/cache-client.ts#L21)

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

[cache-client.ts:14](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/cache-client.ts#L14)
