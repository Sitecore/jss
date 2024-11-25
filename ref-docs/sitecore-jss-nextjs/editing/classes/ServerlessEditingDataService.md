[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / ServerlessEditingDataService

# Class: ServerlessEditingDataService

Service responsible for maintaining Sitecore editor data between requests
on serverless deployment architectures (e.g. Vercel).
Utilizes another Next.js API route ('/api/editing/data/[key]') for storage and retrieval of editing data.

## Implements

- [`EditingDataService`](../interfaces/EditingDataService.md)

## Constructors

### new ServerlessEditingDataService()

> **new ServerlessEditingDataService**(`config`?): [`ServerlessEditingDataService`](ServerlessEditingDataService.md)

#### Parameters

• **config?**: [`ServerlessEditingDataServiceConfig`](../interfaces/ServerlessEditingDataServiceConfig.md)

Editing data service config

#### Returns

[`ServerlessEditingDataService`](ServerlessEditingDataService.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:143](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L143)

## Properties

### generateKey()

> `protected` **generateKey**: (`data`) => `string`

Unique key generator.
Need more than just the item GUID since requests are made "live" during editing in EE.
The suffix code will produce a random 10 character alpha-numeric (a-z 0-9) sequence, which is URI-safe.
Example generated key: 52961eea-bafd-5287-a532-a72e36bd8a36-qkb4e3fv5x

#### Parameters

• **data**: [`EditingData`](../type-aliases/EditingData.md)

The editing data

#### Returns

`string`

The unique key

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:136](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L136)

## Methods

### getEditingData()

> **getEditingData**(`previewData`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

Retrieves Sitecore editor payload data by key

#### Parameters

• **previewData**: `PreviewData`

Editing preview data containing the key and serverUrl to use for retrieval

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

The [EditingData](../type-aliases/EditingData.md)

#### Implementation of

[`EditingDataService`](../interfaces/EditingDataService.md).[`getEditingData`](../interfaces/EditingDataService.md#geteditingdata)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:182](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L182)

***

### getUrl()

> `protected` **getUrl**(`serverUrl`, `key`, `params`?): `string`

#### Parameters

• **serverUrl**: `string`

• **key**: `string`

• **params?**

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:199](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L199)

***

### setEditingData()

> **setEditingData**(`data`, `serverUrl`, `params`?): `Promise`\<[`EditingPreviewData`](../interfaces/EditingPreviewData.md)\>

Stores Sitecore editor payload data for later retrieval by key

#### Parameters

• **data**: [`EditingData`](../type-aliases/EditingData.md)

Editing data

• **serverUrl**: `string`

The server url to use for subsequent data API requests

• **params?**

#### Returns

`Promise`\<[`EditingPreviewData`](../interfaces/EditingPreviewData.md)\>

The [EditingPreviewData](../interfaces/EditingPreviewData.md) containing the generated key and serverUrl to use for retrieval

#### Implementation of

[`EditingDataService`](../interfaces/EditingDataService.md).[`setEditingData`](../interfaces/EditingDataService.md#seteditingdata)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:157](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L157)
