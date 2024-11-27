[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / VercelEditingDataCache

# Class: VercelEditingDataCache

Implementation of editing cache for Vercel deployments
Uses Vercel KV database and client to store data
Set TTL for cache data in constructor (default: 60 seconds)

## Implements

- [`EditingDataCache`](../interfaces/EditingDataCache.md)

## Constructors

### new VercelEditingDataCache()

> **new VercelEditingDataCache**(`redisUrl`, `redisToken`): [`VercelEditingDataCache`](VercelEditingDataCache.md)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `redisUrl` | `undefined` \| `string` | KV endpoint URL. Usually stored in process.env.KV_REST_API_URL |
| `redisToken` | `undefined` \| `string` | KV endpoint tokem. Usually stored in process.env.KV_REST_API_TOKEN |

#### Returns

[`VercelEditingDataCache`](VercelEditingDataCache.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:19](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L19)

## Properties

### redisCache

> `protected` **redisCache**: `VercelKV`

#### Defined in

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:12](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L12)

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

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:41](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L41)

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

[sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts:31](https://github.com/Sitecore/jss/blob/d56062542bc79b861e80260c109b6674c65ef288/packages/sitecore-jss-nextjs/src/editing/vercel-editing-data-cache.ts#L31)
