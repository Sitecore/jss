---
name: editingdatadiskcache
routeTemplate: ./data/component-templates/article.yml
title: editingdatadiskcache
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [middleware/editing-data-cache](/docs/nextjs/ref/modules/middleware_editing_data_cache) / EditingDataDiskCache

# Class: EditingDataDiskCache

[middleware/editing-data-cache](/docs/nextjs/ref/modules/middleware_editing_data_cache).EditingDataDiskCache

A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)

**`see`** EditingDataCache

## Implements

- [`EditingDataCache`](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache)

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/middleware_editing_data_cache/editingdatadiskcache#constructor)

### Properties

- [cache](/docs/nextjs/ref/classes/middleware_editing_data_cache/editingdatadiskcache#cache)

### Methods

- [get](/docs/nextjs/ref/classes/middleware_editing_data_cache/editingdatadiskcache#get)
- [set](/docs/nextjs/ref/classes/middleware_editing_data_cache/editingdatadiskcache#set)

## Constructors

### constructor

• **new EditingDataDiskCache**()

## Properties

### cache

• `Private` **cache**: `CacheInstance`

## Methods

### get

▸ **get**(`key`): `undefined` \| [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)

#### Implementation of

[EditingDataCache](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache).[get](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache#get)

___

### set

▸ **set**(`key`, `editingData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `editingData` | [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata) |

#### Returns

`void`

#### Implementation of

[EditingDataCache](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache).[set](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache#set)
