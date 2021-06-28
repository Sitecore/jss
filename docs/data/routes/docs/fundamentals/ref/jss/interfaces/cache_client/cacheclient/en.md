---
name: cacheclient
routeTemplate: ./data/component-templates/article.yml
title: cacheclient
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [cache-client](/docs/fundamentals/ref/jss/modules/cache_client) / CacheClient

# Interface: CacheClient<T\>

[cache-client](/docs/fundamentals/ref/jss/modules/cache_client).CacheClient

An interface for cache clients.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of data being cached. |

## Implemented by

- [`DictionaryServiceBase`](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase)
- [`MemoryCacheClient`](/docs/fundamentals/ref/jss/classes/cache_client/memorycacheclient)

## Table of contents

### Methods

- [getCacheValue](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient#getcachevalue)
- [setCacheValue](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheclient#setcachevalue)

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
