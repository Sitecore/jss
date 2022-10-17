[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingDataDiskCache

# Class: EditingDataDiskCache

[editing](../modules/editing.md).EditingDataDiskCache

A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)

**`see`** EditingDataCache

## Implements

- [`EditingDataCache`](../interfaces/editing.EditingDataCache.md)

## Table of contents

### Constructors

- [constructor](editing.EditingDataDiskCache.md#constructor)

### Properties

- [cache](editing.EditingDataDiskCache.md#cache)

### Methods

- [get](editing.EditingDataDiskCache.md#get)
- [set](editing.EditingDataDiskCache.md#set)

## Constructors

### constructor

• **new EditingDataDiskCache**(`tmpDir?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tmpDir` | `string` |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:25](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L25)

## Properties

### cache

• `Private` **cache**: `CacheInstance`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:20](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L20)

## Methods

### get

▸ **get**(`key`): `undefined` \| [`EditingData`](../modules/editing.md#editingdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EditingData`](../modules/editing.md#editingdata)

#### Implementation of

[EditingDataCache](../interfaces/editing.EditingDataCache.md).[get](../interfaces/editing.EditingDataCache.md#get)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:37](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L37)

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

#### Implementation of

[EditingDataCache](../interfaces/editing.EditingDataCache.md).[set](../interfaces/editing.EditingDataCache.md#set)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:30](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L30)
