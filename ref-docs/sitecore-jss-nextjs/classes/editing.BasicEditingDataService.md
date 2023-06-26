[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / BasicEditingDataService

# Class: BasicEditingDataService

[editing](../modules/editing.md).BasicEditingDataService

Service responsible for maintaining Sitecore editor data between requests
on self-hosted deployment architectures.
Utilizes a cache for storage and retrieval of editing data.

## Implements

- [`EditingDataService`](../interfaces/editing.EditingDataService.md)

## Table of contents

### Constructors

- [constructor](editing.BasicEditingDataService.md#constructor)

### Properties

- [editingDataCache](editing.BasicEditingDataService.md#editingdatacache)
- [generateKey](editing.BasicEditingDataService.md#generatekey)

### Methods

- [getEditingData](editing.BasicEditingDataService.md#geteditingdata)
- [setEditingData](editing.BasicEditingDataService.md#seteditingdata)

## Constructors

### constructor

• **new BasicEditingDataService**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`BasicEditingDataServiceConfig`](../interfaces/editing.BasicEditingDataServiceConfig.md) | Editing data service config |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:74](https://github.com/Sitecore/jss/blob/8e27b9987/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L74)

## Properties

### editingDataCache

• `Private` **editingDataCache**: [`EditingDataCache`](../interfaces/editing.EditingDataCache.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:69](https://github.com/Sitecore/jss/blob/8e27b9987/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L69)

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

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:68](https://github.com/Sitecore/jss/blob/8e27b9987/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L68)

## Methods

### getEditingData

▸ **getEditingData**(`previewData`): `Promise`<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

Retrieves Sitecore editor payload data by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `previewData` | `PreviewData` | Editing preview data containing the key to use for retrieval |

#### Returns

`Promise`<`undefined` \| [`EditingData`](../modules/editing.md#editingdata)\>

The [EditingData](../modules/editing.md#editingdata)

#### Implementation of

[EditingDataService](../interfaces/editing.EditingDataService.md).[getEditingData](../interfaces/editing.EditingDataService.md#geteditingdata)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:100](https://github.com/Sitecore/jss/blob/8e27b9987/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L100)

___

### setEditingData

▸ **setEditingData**(`data`): `Promise`<[`EditingPreviewData`](../interfaces/editing.EditingPreviewData.md)\>

Stores Sitecore editor payload data for later retrieval by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`EditingData`](../modules/editing.md#editingdata) | Editing data |

#### Returns

`Promise`<[`EditingPreviewData`](../interfaces/editing.EditingPreviewData.md)\>

The [EditingPreviewData](../interfaces/editing.EditingPreviewData.md) containing the generated key to use for retrieval

#### Implementation of

[EditingDataService](../interfaces/editing.EditingDataService.md).[setEditingData](../interfaces/editing.EditingDataService.md#seteditingdata)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:83](https://github.com/Sitecore/jss/blob/8e27b9987/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L83)
