[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / VercelEditingDataCache

# Class: VercelEditingDataCache

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L11)
=======
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L11)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Implementation of editing cache for Vercel deployments
Uses Vercel KV database and client to store data
Set TTL for cache data in constructor (default: 60 seconds)

## Implements

- [`EditingDataCache`](../interfaces/EditingDataCache.md)

## Constructors

### Constructor

> **new VercelEditingDataCache**(`redisUrl`, `redisToken`): `VercelEditingDataCache`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L19)
=======
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L19)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `redisUrl` | `undefined` \| `string` | KV endpoint URL. Usually stored in process.env.KV_REST_API_URL |
| `redisToken` | `undefined` \| `string` | KV endpoint tokem. Usually stored in process.env.KV_REST_API_TOKEN |

#### Returns

`VercelEditingDataCache`

## Properties

### redisCache

> `protected` **redisCache**: `VercelKV`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L12)
=======
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L12)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Methods

### get()

> **get**(`key`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L41)
=======
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L41)
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
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:31](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L31)
=======
Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:31](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L31)
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
