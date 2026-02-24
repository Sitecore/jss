[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / VercelEditingDataCache

# Class: VercelEditingDataCache

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L11)

Implementation of editing cache for Vercel deployments
Uses Vercel KV database and client to store data
Set TTL for cache data in constructor (default: 60 seconds)

## Implements

- [`EditingDataCache`](../interfaces/EditingDataCache.md)

## Constructors

### Constructor

> **new VercelEditingDataCache**(`redisUrl`, `redisToken`): `VercelEditingDataCache`

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L19)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `redisUrl` | `string` \| `undefined` | KV endpoint URL. Usually stored in process.env.KV_REST_API_URL |
| `redisToken` | `string` \| `undefined` | KV endpoint tokem. Usually stored in process.env.KV_REST_API_TOKEN |

#### Returns

`VercelEditingDataCache`

## Properties

### redisCache

> `protected` **redisCache**: `VercelKV`

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L12)

## Methods

### get()

> **get**(`key`): `Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L41)

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

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:31](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L31)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../type-aliases/EditingData.md) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`set`](../interfaces/EditingDataCache.md#set)
