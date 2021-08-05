[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [middleware/editing-data-cache](../modules/middleware_editing_data_cache.md) / EditingDataDiskCache

# Class: EditingDataDiskCache

[middleware/editing-data-cache](../modules/middleware_editing_data_cache.md).EditingDataDiskCache

A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)

**`see`** EditingDataCache

## Implements

- [`EditingDataCache`](../interfaces/middleware_editing_data_cache.EditingDataCache.md)

## Table of contents

### Constructors

- [constructor](middleware_editing_data_cache.EditingDataDiskCache.md#constructor)

### Properties

- [cache](middleware_editing_data_cache.EditingDataDiskCache.md#cache)

### Methods

- [get](middleware_editing_data_cache.EditingDataDiskCache.md#get)
- [set](middleware_editing_data_cache.EditingDataDiskCache.md#set)

## Constructors

### constructor

• **new EditingDataDiskCache**()

#### Defined in

[src/middleware/editing-data-cache.ts:22](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L22)

## Properties

### cache

• `Private` **cache**: `CacheInstance`

#### Defined in

[src/middleware/editing-data-cache.ts:20](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L20)

## Methods

### get

▸ **get**(`key`): `undefined` \| [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata)

#### Implementation of

[EditingDataCache](../interfaces/middleware_editing_data_cache.EditingDataCache.md).[get](../interfaces/middleware_editing_data_cache.EditingDataCache.md#get)

#### Defined in

[src/middleware/editing-data-cache.ts:34](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L34)

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

#### Implementation of

[EditingDataCache](../interfaces/middleware_editing_data_cache.EditingDataCache.md).[set](../interfaces/middleware_editing_data_cache.EditingDataCache.md#set)

#### Defined in

[src/middleware/editing-data-cache.ts:27](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L27)
