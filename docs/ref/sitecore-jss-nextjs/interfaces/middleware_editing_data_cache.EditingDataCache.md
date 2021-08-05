[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [middleware/editing-data-cache](../modules/middleware_editing_data_cache.md) / EditingDataCache

# Interface: EditingDataCache

[middleware/editing-data-cache](../modules/middleware_editing_data_cache.md).EditingDataCache

Defines an editing data cache implementation

## Implemented by

- [`EditingDataDiskCache`](../classes/middleware_editing_data_cache.EditingDataDiskCache.md)

## Table of contents

### Methods

- [get](middleware_editing_data_cache.EditingDataCache.md#get)
- [set](middleware_editing_data_cache.EditingDataCache.md#set)

## Methods

### get

▸ **get**(`key`): `undefined` \| [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata)

#### Defined in

[src/middleware/editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L12)

___

### set

▸ **set**(`key`, `editingData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata) |

#### Returns

`void`

#### Defined in

[src/middleware/editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L11)
