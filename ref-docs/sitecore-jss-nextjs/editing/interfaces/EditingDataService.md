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

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `previewData` | `PreviewData` | Editing preview data containing the information to use for retrieval |

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

The [EditingData](../type-aliases/EditingData.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:38](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L38)

***

### setEditingData()

> **setEditingData**(`data`, `serverUrl`, `params`?): `Promise`\<[`EditingPreviewData`](EditingPreviewData.md)\>

Stores Sitecore editor payload data for later retrieval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`EditingData`](../type-aliases/EditingData.md) | Editing data |
| `serverUrl` | `string` | The server url e.g. which can be used for further API requests |
| `params`? | `object` | - |

#### Returns

`Promise`\<[`EditingPreviewData`](EditingPreviewData.md)\>

The [EditingPreviewData](EditingPreviewData.md) containing the information to use for retrieval

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:28](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L28)
