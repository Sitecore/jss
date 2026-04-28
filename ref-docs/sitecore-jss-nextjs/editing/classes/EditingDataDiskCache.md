[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataDiskCache

# Class: EditingDataDiskCache

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L19)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L19)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)

## See

EditingDataCache

## Implements

- [`EditingDataCache`](../interfaces/EditingDataCache.md)

## Constructors

### Constructor

> **new EditingDataDiskCache**(`tmpDir?`): `EditingDataDiskCache`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:25](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L25)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:25](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L25)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tmpDir?` | `string` | Temp directory to use. Default is the OS temp directory (os.tmpdir()). |

#### Returns

`EditingDataDiskCache`

## Methods

### get()

> **get**(`key`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L41)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L41)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`get`](../interfaces/EditingDataCache.md#get)

***

### set()

> **set**(`key`, `editingData`): `Promise`\<`void`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:30](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L30)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:30](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L30)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../type-aliases/EditingData.md) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`set`](../interfaces/EditingDataCache.md#set)
