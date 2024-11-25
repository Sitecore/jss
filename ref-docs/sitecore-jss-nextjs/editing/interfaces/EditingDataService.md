[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataService

# Interface: EditingDataService

Defines an editing data service implementation

## Methods

### getEditingData()

> **getEditingData**(`previewData`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

Retrieves Sitecore editor payload data

#### Parameters

• **previewData**: `PreviewData`

Editing preview data containing the information to use for retrieval

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

The [EditingData](../type-aliases/EditingData.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:38](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L38)

***

### setEditingData()

> **setEditingData**(`data`, `serverUrl`, `params`?): `Promise`\<[`EditingPreviewData`](EditingPreviewData.md)\>

Stores Sitecore editor payload data for later retrieval

#### Parameters

• **data**: [`EditingData`](../type-aliases/EditingData.md)

Editing data

• **serverUrl**: `string`

The server url e.g. which can be used for further API requests

• **params?**

#### Returns

`Promise`\<[`EditingPreviewData`](EditingPreviewData.md)\>

The [EditingPreviewData](EditingPreviewData.md) containing the information to use for retrieval

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:28](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L28)
