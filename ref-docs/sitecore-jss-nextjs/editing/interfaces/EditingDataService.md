[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataService

# Interface: EditingDataService

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:21](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L21)

Defines an editing data service implementation

## Methods

### getEditingData()

> **getEditingData**(`previewData`): `Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:38](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L38)

Retrieves Sitecore editor payload data

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `previewData` | `PreviewData` | Editing preview data containing the information to use for retrieval |

#### Returns

`Promise`\<[`EditingData`](../type-aliases/EditingData.md) \| `undefined`\>

The [EditingData](../type-aliases/EditingData.md)

***

### setEditingData()

> **setEditingData**(`data`, `serverUrl`, `params?`): `Promise`\<[`EditingPreviewData`](EditingPreviewData.md)\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:28](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L28)

Stores Sitecore editor payload data for later retrieval

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`EditingData`](../type-aliases/EditingData.md) | Editing data |
| `serverUrl` | `string` | The server url e.g. which can be used for further API requests |
| `params?` | \{\[`key`: `string`\]: `string`; \} | - |

#### Returns

`Promise`\<[`EditingPreviewData`](EditingPreviewData.md)\>

The [EditingPreviewData](EditingPreviewData.md) containing the information to use for retrieval
