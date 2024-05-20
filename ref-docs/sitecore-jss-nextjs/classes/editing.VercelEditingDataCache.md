[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / VercelEditingDataCache

# Class: VercelEditingDataCache

[editing](../modules/editing.md).VercelEditingDataCache

Implementation of editing cache for Vercel deployments
Uses Vercel KV database and client to store data
Set TTL for cache data in constructor (default: 60 seconds)

## Implements

- [`EditingDataCache`](../interfaces/editing.EditingDataCache.md)

## Table of contents

### Constructors

- [constructor](editing.VercelEditingDataCache.md#constructor)

### Properties

- [defaultTtl](editing.VercelEditingDataCache.md#defaultttl)
- [redisCache](editing.VercelEditingDataCache.md#rediscache)

### Methods

- [get](editing.VercelEditingDataCache.md#get)
- [set](editing.VercelEditingDataCache.md#set)

## Constructors

### constructor

• **new VercelEditingDataCache**(`redisUrl`, `redisToken`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redisUrl` | `undefined` \| `string` | KV endpoint URL. Usually stored in process.env.KV_REST_API_URL |
| `redisToken` | `undefined` \| `string` | KV endpoint tokem. Usually stored in process.env.KV_REST_API_TOKEN |

#### Defined in

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/1a8ceb545/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L19)

## Properties

### defaultTtl

• `Private` **defaultTtl**: `number` = `120`

#### Defined in

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:13](https://github.com/Sitecore/jss/blob/1a8ceb545/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L13)

___

### redisCache

• `Protected` **redisCache**: `VercelKV`

#### Defined in

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/1a8ceb545/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L12)

## Methods

### get

▸ **get**(`key`): `Promise`\<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

#### Implementation of

[EditingDataCache](../interfaces/editing.EditingDataCache.md).[get](../interfaces/editing.EditingDataCache.md#get)

#### Defined in

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/1a8ceb545/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L41)

___

### set

▸ **set**(`key`, `editingData`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../modules/editing.md#editingdata) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[EditingDataCache](../interfaces/editing.EditingDataCache.md).[set](../interfaces/editing.EditingDataCache.md#set)

#### Defined in

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:31](https://github.com/Sitecore/jss/blob/1a8ceb545/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L31)
