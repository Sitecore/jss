[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [services/editing-data-service](../modules/services_editing_data_service.md) / EditingDataService

# Class: EditingDataService

[services/editing-data-service](../modules/services_editing_data_service.md).EditingDataService

Service responsible for maintaining Sitecore Experience Editor data between requests

## Table of contents

### Constructors

- [constructor](services_editing_data_service.EditingDataService.md#constructor)

### Properties

- [apiRoute](services_editing_data_service.EditingDataService.md#apiroute)
- [dataFetcher](services_editing_data_service.EditingDataService.md#datafetcher)

### Methods

- [generateKey](services_editing_data_service.EditingDataService.md#generatekey)
- [getEditingData](services_editing_data_service.EditingDataService.md#geteditingdata)
- [getUrl](services_editing_data_service.EditingDataService.md#geturl)
- [setEditingData](services_editing_data_service.EditingDataService.md#seteditingdata)

## Constructors

### constructor

• **new EditingDataService**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingDataServiceConfig`](../interfaces/services_editing_data_service.EditingDataServiceConfig.md) |

#### Defined in

[src/services/editing-data-service.ts:34](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L34)

## Properties

### apiRoute

• `Private` **apiRoute**: `string`

#### Defined in

[src/services/editing-data-service.ts:28](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L28)

___

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](index.AxiosDataFetcher.md)

#### Defined in

[src/services/editing-data-service.ts:29](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L29)

## Methods

### generateKey

▸ `Protected` **generateKey**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata) |

#### Returns

`string`

#### Defined in

[src/services/editing-data-service.ts:78](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L78)

___

### getEditingData

▸ **getEditingData**(`previewData`): `Promise`<`undefined` \| [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata)\>

Retrieves Experience Editor payload data by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `previewData` | [`EditingPreviewData`](../interfaces/sharedTypes_editing_data.EditingPreviewData.md) | Editing preview data containing the key and serverUrl to use for retrieval |

#### Returns

`Promise`<`undefined` \| [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata)\>

The [EditingData](../modules/sharedTypes_editing_data.md#editingdata)

#### Defined in

[src/services/editing-data-service.ts:69](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L69)

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

[src/services/editing-data-service.ts:88](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L88)

___

### setEditingData

▸ **setEditingData**(`data`, `serverUrl`): `Promise`<[`EditingPreviewData`](../interfaces/sharedTypes_editing_data.EditingPreviewData.md)\>

Stores Experience Editor payload data for later retrieval by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`EditingData`](../modules/sharedTypes_editing_data.md#editingdata) | Editing data |
| `serverUrl` | `string` | The server url to use for subsequent data API requests |

#### Returns

`Promise`<[`EditingPreviewData`](../interfaces/sharedTypes_editing_data.EditingPreviewData.md)\>

The [EditingPreviewData](../interfaces/sharedTypes_editing_data.EditingPreviewData.md) containing the generated key and serverUrl to use for retrieval

#### Defined in

[src/services/editing-data-service.ts:49](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/services/editing-data-service.ts#L49)
