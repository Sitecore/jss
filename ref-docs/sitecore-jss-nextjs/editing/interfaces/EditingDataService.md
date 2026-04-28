[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingDataService

# Interface: EditingDataService

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:21](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L21)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:21](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L21)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Defines an editing data service implementation

## Methods

### getEditingData()

> **getEditingData**(`previewData`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:38](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L38)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:38](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L38)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Retrieves Sitecore editor payload data

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `previewData` | `PreviewData` | Editing preview data containing the information to use for retrieval |

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

The [EditingData](../type-aliases/EditingData.md)

***

### setEditingData()

> **setEditingData**(`data`, `serverUrl`, `params?`): `Promise`\<[`EditingPreviewData`](EditingPreviewData.md)\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:28](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L28)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:28](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L28)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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
