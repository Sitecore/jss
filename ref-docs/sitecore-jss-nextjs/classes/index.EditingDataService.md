[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / EditingDataService

# Class: EditingDataService

[index](../modules/index.md).EditingDataService

Service responsible for maintaining Sitecore Experience Editor data between requests

## Table of contents

### Constructors

- [constructor](index.EditingDataService.md#constructor)

### Properties

- [apiRoute](index.EditingDataService.md#apiroute)
- [dataFetcher](index.EditingDataService.md#datafetcher)

### Methods

- [generateKey](index.EditingDataService.md#generatekey)
- [getEditingData](index.EditingDataService.md#geteditingdata)
- [getUrl](index.EditingDataService.md#geturl)
- [setEditingData](index.EditingDataService.md#seteditingdata)

## Constructors

### constructor

• **new EditingDataService**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingDataServiceConfig`](../interfaces/index.EditingDataServiceConfig.md) |

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:35](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L35)

## Properties

### apiRoute

• `Private` **apiRoute**: `string`

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:29](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L29)

___

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](index.AxiosDataFetcher.md)

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:30](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L30)

## Methods

### generateKey

▸ `Protected` **generateKey**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EditingData`](../modules/index.md#editingdata) |

#### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:83](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L83)

___

### getEditingData

▸ **getEditingData**(`previewData`): `Promise`<`undefined` \| [`EditingData`](../modules/index.md#editingdata)\>

Retrieves Experience Editor payload data by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `previewData` | `PreviewData` | Editing preview data containing the key and serverUrl to use for retrieval |

#### Returns

`Promise`<`undefined` \| [`EditingData`](../modules/index.md#editingdata)\>

The [EditingData](../modules/index.md#editingdata)

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:70](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L70)

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

[sitecore-jss-nextjs/src/services/editing-data-service.ts:93](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L93)

___

### setEditingData

▸ **setEditingData**(`data`, `serverUrl`): `Promise`<[`EditingPreviewData`](../interfaces/index.EditingPreviewData.md)\>

Stores Experience Editor payload data for later retrieval by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`EditingData`](../modules/index.md#editingdata) | Editing data |
| `serverUrl` | `string` | The server url to use for subsequent data API requests |

#### Returns

`Promise`<[`EditingPreviewData`](../interfaces/index.EditingPreviewData.md)\>

The [EditingPreviewData](../interfaces/index.EditingPreviewData.md) containing the generated key and serverUrl to use for retrieval

#### Defined in

[sitecore-jss-nextjs/src/services/editing-data-service.ts:50](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L50)
