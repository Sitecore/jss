[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataDiskCache

# Class: EditingDataDiskCache

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L19)

A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)

## See

EditingDataCache

## Implements

- [`EditingDataCache`](../interfaces/EditingDataCache.md)

## Constructors

### Constructor

> **new EditingDataDiskCache**(`tmpDir?`): `EditingDataDiskCache`

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:25](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L25)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tmpDir?` | `string` | Temp directory to use. Default is the OS temp directory (os.tmpdir()). |

#### Returns

`EditingDataDiskCache`

## Methods

### get()

> **get**(`key`): `Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L41)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`get`](../interfaces/EditingDataCache.md#get)

***

### set()

> **set**(`key`, `editingData`): `Promise`\<`void`\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-cache.ts:30](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L30)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../type-aliases/EditingData.md) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`set`](../interfaces/EditingDataCache.md#set)
