[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / EditingDataCache

# Interface: EditingDataCache

[middleware](../modules/middleware.md).EditingDataCache

Defines an editing data cache implementation

## Table of contents

### Methods

- [get](middleware.EditingDataCache.md#get)
- [set](middleware.EditingDataCache.md#set)

## Methods

### get

▸ **get**(`key`): `undefined` \| [`EditingData`](../modules/index.md#editingdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EditingData`](../modules/index.md#editingdata)

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L12)

___

### set

▸ **set**(`key`, `editingData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../modules/index.md#editingdata) |

#### Returns

`void`

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L11)
