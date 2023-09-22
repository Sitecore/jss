[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingDataService

# Interface: EditingDataService

[editing](../modules/editing.md).EditingDataService

Defines an editing data service implementation

## Implemented by

- [`BasicEditingDataService`](../classes/editing.BasicEditingDataService.md)
- [`ServerlessEditingDataService`](../classes/editing.ServerlessEditingDataService.md)

## Table of contents

### Methods

- [getEditingData](editing.EditingDataService.md#geteditingdata)
- [setEditingData](editing.EditingDataService.md#seteditingdata)

## Methods

### getEditingData

▸ **getEditingData**(`previewData`): `Promise`<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

Retrieves Sitecore editor payload data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `previewData` | `PreviewData` | Editing preview data containing the information to use for retrieval |

#### Returns

`Promise`<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

The [EditingData](../modules/editing.md#editingdata)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:33](https://github.com/Sitecore/jss/blob/8004fe2cf/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L33)

___

### setEditingData

▸ **setEditingData**(`data`, `serverUrl`): `Promise`<[`EditingPreviewData`](editing.EditingPreviewData.md)\>

Stores Sitecore editor payload data for later retrieval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`EditingData`](../modules/editing.md#editingdata) | Editing data |
| `serverUrl` | `string` | The server url e.g. which can be used for further API requests |

#### Returns

`Promise`<[`EditingPreviewData`](editing.EditingPreviewData.md)\>

The [EditingPreviewData](editing.EditingPreviewData.md) containing the information to use for retrieval

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:27](https://github.com/Sitecore/jss/blob/8004fe2cf/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L27)
