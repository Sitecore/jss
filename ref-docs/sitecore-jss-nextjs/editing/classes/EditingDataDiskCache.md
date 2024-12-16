[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataDiskCache

# Class: EditingDataDiskCache

A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)

## See

EditingDataCache

## Implements

- [`EditingDataCache`](../interfaces/EditingDataCache.md)

## Constructors

### new EditingDataDiskCache()

> **new EditingDataDiskCache**(`tmpDir`?): [`EditingDataDiskCache`](EditingDataDiskCache.md)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tmpDir`? | `string` | Temp directory to use. Default is the OS temp directory (os.tmpdir()). |

#### Returns

[`EditingDataDiskCache`](EditingDataDiskCache.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:25](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L25)

## Methods

### get()

> **get**(`key`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`get`](../interfaces/EditingDataCache.md#get)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L41)

***

### set()

> **set**(`key`, `editingData`): `Promise`\<`void`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../type-aliases/EditingData.md) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`set`](../interfaces/EditingDataCache.md#set)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-cache.ts:30](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-nextjs/src/editing/editing-data-cache.ts#L30)
