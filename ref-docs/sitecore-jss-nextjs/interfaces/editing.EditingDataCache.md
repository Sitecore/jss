[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingDataCache

# Interface: EditingDataCache

[editing](../modules/editing.md).EditingDataCache

Defines an editing data cache implementation

## Implemented by

- [`EditingDataDiskCache`](../classes/editing.EditingDataDiskCache.md)

## Table of contents

### Methods

- [get](editing.EditingDataCache.md#get)
- [set](editing.EditingDataCache.md#set)

## Methods

### get

▸ **get**(`key`): `undefined` \| [`EditingData`](../modules/editing.md#editingdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EditingData`](../modules/editing.md#editingdata)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L12)

___

### set

▸ **set**(`key`, `editingData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../modules/editing.md#editingdata) |

#### Returns

`void`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L11)
