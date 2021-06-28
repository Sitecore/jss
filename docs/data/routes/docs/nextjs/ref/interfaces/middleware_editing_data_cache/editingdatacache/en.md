---
name: editingdatacache
routeTemplate: ./data/component-templates/article.yml
title: editingdatacache
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [middleware/editing-data-cache](/docs/nextjs/ref/modules/middleware_editing_data_cache) / EditingDataCache

# Interface: EditingDataCache

[middleware/editing-data-cache](/docs/nextjs/ref/modules/middleware_editing_data_cache).EditingDataCache

Defines an editing data cache implementation

## Implemented by

- [`EditingDataDiskCache`](/docs/nextjs/ref/classes/middleware_editing_data_cache/editingdatadiskcache)

## Table of contents

### Methods

- [get](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache#get)
- [set](/docs/nextjs/ref/interfaces/middleware_editing_data_cache/editingdatacache#set)

## Methods

### get

▸ **get**(`key`): `undefined` \| [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)

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
