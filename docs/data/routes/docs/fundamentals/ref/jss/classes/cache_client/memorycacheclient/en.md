---
name: memorycacheclient
routeTemplate: ./data/component-templates/article.yml
title: memorycacheclient
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [cache-client](/docs/fundamentals/ref/jss/modules/cache_client) / MemoryCacheClient

# Class: MemoryCacheClient<T\>

[cache-client](/docs/fundamentals/ref/jss/modules/cache_client).MemoryCacheClient

A cache client that uses the 'memory-cache' library (https://github.com/ptarjan/node-cache).
This class is meant to be extended or used as a mixin; it's not meant to be used directly.

**`mixin`**

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of data being cached. |

## Implements

- [`CacheClient`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient)<`T`\>

## Table of contents

### Constructors

- [constructor](/docs/fundamentals/ref/jss/classes/cache_client/memorycacheclient#constructor)

### Properties

- [cache](/docs/fundamentals/ref/jss/classes/cache_client/memorycacheclient#cache)
- [options](/docs/fundamentals/ref/jss/classes/cache_client/memorycacheclient#options)

### Methods

- [getCacheValue](/docs/fundamentals/ref/jss/classes/cache_client/memorycacheclient#getcachevalue)
- [setCacheValue](/docs/fundamentals/ref/jss/classes/cache_client/memorycacheclient#setcachevalue)

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
| `options` | [`CacheOptions`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions) | Configuration options |

## Properties

### cache

• `Private` **cache**: `CacheClass`<`string`, `T`\>

___

### options

• **options**: [`CacheOptions`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions)

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

[CacheClient](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient).[getCacheValue](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient#getcachevalue)

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

[CacheClient](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient).[setCacheValue](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient#setcachevalue)
