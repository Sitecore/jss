[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / [cache-client](../modules/cache_client.md) / MemoryCacheClient

# Class: MemoryCacheClient<T\>

[cache-client](../modules/cache_client.md).MemoryCacheClient

A cache client that uses the 'memory-cache' library (https://github.com/ptarjan/node-cache).
This class is meant to be extended or used as a mixin; it's not meant to be used directly.

**`mixin`**

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of data being cached. |

## Implements

- [`CacheClient`](../interfaces/cache_client.CacheClient.md)<`T`\>

## Table of contents

### Constructors

- [constructor](cache_client.MemoryCacheClient.md#constructor)

### Properties

- [cache](cache_client.MemoryCacheClient.md#cache)
- [options](cache_client.MemoryCacheClient.md#options)

### Methods

- [getCacheValue](cache_client.MemoryCacheClient.md#getcachevalue)
- [setCacheValue](cache_client.MemoryCacheClient.md#setcachevalue)

## Constructors

### constructor

• **new MemoryCacheClient**<`T`\>(`options`)

Initializes a new instance of @see MemoryCacheClient using the provided @see CacheOptions

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CacheOptions`](../interfaces/cache_client.CacheOptions.md) | Configuration options |

#### Defined in

[cache-client.ts:61](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/cache-client.ts#L61)

## Properties

### cache

• `Private` **cache**: `CacheClass`<`string`, `T`\>

#### Defined in

[cache-client.ts:55](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/cache-client.ts#L55)

___

### options

• **options**: [`CacheOptions`](../interfaces/cache_client.CacheOptions.md)

## Methods

### getCacheValue

▸ **getCacheValue**(`key`): ``null`` \| `T`

Retrieves a value from the cache.

**`template`** The type of data being cached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |

#### Returns

``null`` \| `T`

The cache value as {T}, or null if the specified key is not found in the cache.

#### Implementation of

[CacheClient](../interfaces/cache_client.CacheClient.md).[getCacheValue](../interfaces/cache_client.CacheClient.md#getcachevalue)

#### Defined in

[cache-client.ts:77](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/cache-client.ts#L77)

___

### setCacheValue

▸ **setCacheValue**(`key`, `value`): `T`

Adds a value to the cache for the specified cache key.

**`template`** The type of data being cached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The cache key. |
| `value` | `T` | The value to cache. |

#### Returns

`T`

The value added to the cache.

#### Implementation of

[CacheClient](../interfaces/cache_client.CacheClient.md).[setCacheValue](../interfaces/cache_client.CacheClient.md#setcachevalue)

#### Defined in

[cache-client.ts:88](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/cache-client.ts#L88)
