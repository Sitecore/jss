[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / VercelEditingDataCache

# Class: VercelEditingDataCache

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:11](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L11)

Implementation of editing cache for Vercel deployments
Uses Vercel KV database and client to store data
Set TTL for cache data in constructor (default: 60 seconds)

## Implements

- [`EditingDataCache`](../interfaces/EditingDataCache.md)

## Constructors

### Constructor

> **new VercelEditingDataCache**(`redisUrl`, `redisToken`): `VercelEditingDataCache`

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L19)

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

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L12)

## Methods

### get()

> **get**(`key`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L41)

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

Defined in: [sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:31](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L31)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `editingData` | [`EditingData`](../type-aliases/EditingData.md) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`EditingDataCache`](../interfaces/EditingDataCache.md).[`set`](../interfaces/EditingDataCache.md#set)
