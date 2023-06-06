[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / ServerlessEditingDataService

# Class: ServerlessEditingDataService

[editing](../modules/editing.md).ServerlessEditingDataService

Service responsible for maintaining Sitecore editor data between requests
on serverless deployment architectures (e.g. Vercel).
Utilizes another Next.js API route ('/api/editing/data/[key]') for storage and retrieval of editing data.

## Implements

- [`EditingDataService`](../interfaces/editing.EditingDataService.md)

## Table of contents

### Constructors

- [constructor](editing.ServerlessEditingDataService.md#constructor)

### Properties

- [apiRoute](editing.ServerlessEditingDataService.md#apiroute)
- [dataFetcher](editing.ServerlessEditingDataService.md#datafetcher)
- [generateKey](editing.ServerlessEditingDataService.md#generatekey)

### Methods

- [getEditingData](editing.ServerlessEditingDataService.md#geteditingdata)
- [getUrl](editing.ServerlessEditingDataService.md#geturl)
- [setEditingData](editing.ServerlessEditingDataService.md#seteditingdata)

## Constructors

### constructor

• **new ServerlessEditingDataService**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`ServerlessEditingDataServiceConfig`](../interfaces/editing.ServerlessEditingDataServiceConfig.md) | Editing data service config |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:138](https://github.com/Sitecore/jss/blob/45a2d0807/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L138)

## Properties

### apiRoute

• `Private` **apiRoute**: `string`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:132](https://github.com/Sitecore/jss/blob/45a2d0807/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L132)

___

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](index.AxiosDataFetcher.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:133](https://github.com/Sitecore/jss/blob/45a2d0807/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L133)

___

### generateKey

• `Protected` **generateKey**: (`data`: [`EditingData`](../modules/editing.md#editingdata)) => `string` = `generateKey`

#### Type declaration

▸ (`data`): `string`

Unique key generator.
Need more than just the item GUID since requests are made "live" during editing in EE.
The suffix code will produce a random 10 character alpha-numeric (a-z 0-9) sequence, which is URI-safe.
Example generated key: 52961eea-bafd-5287-a532-a72e36bd8a36-qkb4e3fv5x

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`EditingData`](../modules/editing.md#editingdata) | The editing data |

##### Returns

`string`

The unique key

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:131](https://github.com/Sitecore/jss/blob/45a2d0807/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L131)

## Methods

### getEditingData

▸ **getEditingData**(`previewData`): `Promise`<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

Retrieves Sitecore editor payload data by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `previewData` | `PreviewData` | Editing preview data containing the key and serverUrl to use for retrieval |

#### Returns

`Promise`<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

The [EditingData](../modules/editing.md#editingdata)

#### Implementation of

[EditingDataService](../interfaces/editing.EditingDataService.md).[getEditingData](../interfaces/editing.EditingDataService.md#geteditingdata)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:172](https://github.com/Sitecore/jss/blob/45a2d0807/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L172)

___

### getUrl

▸ `Protected` **getUrl**(`serverUrl`, `key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serverUrl` | `string` |
| `key` | `string` |

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:185](https://github.com/Sitecore/jss/blob/45a2d0807/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L185)

___

### setEditingData

▸ **setEditingData**(`data`, `serverUrl`): `Promise`<[`EditingPreviewData`](../interfaces/editing.EditingPreviewData.md)\>

Stores Sitecore editor payload data for later retrieval by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`EditingData`](../modules/editing.md#editingdata) | Editing data |
| `serverUrl` | `string` | The server url to use for subsequent data API requests |

#### Returns

`Promise`<[`EditingPreviewData`](../interfaces/editing.EditingPreviewData.md)\>

The [EditingPreviewData](../interfaces/editing.EditingPreviewData.md) containing the generated key and serverUrl to use for retrieval

#### Implementation of

[EditingDataService](../interfaces/editing.EditingDataService.md).[setEditingData](../interfaces/editing.EditingDataService.md#seteditingdata)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:152](https://github.com/Sitecore/jss/blob/45a2d0807/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L152)
