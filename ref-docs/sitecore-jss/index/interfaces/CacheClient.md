[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / CacheClient

# Interface: CacheClient\<T\>

Defined in: [packages/sitecore-jss/src/cache-client.ts:7](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss/src/cache-client.ts#L7)

An interface for cache clients.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of data being cached. |

## Methods

### getCacheValue()

> **getCacheValue**(`key`): `null` \| `T`

Defined in: [packages/sitecore-jss/src/cache-client.ts:21](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss/src/cache-client.ts#L21)

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

Defined in: [packages/sitecore-jss/src/cache-client.ts:14](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss/src/cache-client.ts#L14)

Adds a value to the cache for the specified cache key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The cache key. |
| `value` | `T` | The value to cache. |

#### Returns

`T`

The value added to the cache.
