[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingDataDiskCache

# Class: EditingDataDiskCache

[editing](../modules/editing.md).EditingDataDiskCache

A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)

**`See`**

EditingDataCache

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `tmpDir?` | `string` | Temp directory to use. Default is the OS temp directory (os.tmpdir()). |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:25](https://github.com/Sitecore/jss/blob/be58a29a4/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L25)

## Properties

### cache

• `Private` **cache**: `CacheInstance`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:20](https://github.com/Sitecore/jss/blob/be58a29a4/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L20)

## Methods

### get

▸ **get**(`key`): `Promise`<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

#### Implementation of

[EditingDataCache](../interfaces/editing.EditingDataCache.md).[get](../interfaces/editing.EditingDataCache.md#get)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/be58a29a4/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L41)

___

### set

▸ **set**(`key`, `editingData`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../modules/editing.md#editingdata) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[EditingDataCache](../interfaces/editing.EditingDataCache.md).[set](../interfaces/editing.EditingDataCache.md#set)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:30](https://github.com/Sitecore/jss/blob/be58a29a4/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L30)
