---
name: editingdataservice
routeTemplate: ./data/component-templates/article.yml
title: editingdataservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [services/editing-data-service](/docs/nextjs/ref/modules/services_editing_data_service) / EditingDataService

# Class: EditingDataService

[services/editing-data-service](/docs/nextjs/ref/modules/services_editing_data_service).EditingDataService

Service responsible for maintaining Sitecore Experience Editor data between requests

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice#constructor)

### Properties

- [apiRoute](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice#apiroute)
- [dataFetcher](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice#datafetcher)

### Methods

- [generateKey](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice#generatekey)
- [getEditingData](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice#geteditingdata)
- [getUrl](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice#geturl)
- [setEditingData](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice#seteditingdata)

## Constructors

### constructor

• **new EditingDataService**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingDataServiceConfig`](/docs/nextjs/ref/interfaces/services_editing_data_service/editingdataserviceconfig) |

## Properties

### apiRoute

• `Private` **apiRoute**: `string`

___

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](/docs/nextjs/ref/classes/index/axiosdatafetcher)

## Methods

### generateKey

▸ `Protected` **generateKey**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata) |

#### Returns

`string`

___

### getEditingData

▸ **getEditingData**(`previewData`): `Promise`<`undefined` \| [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)\>

Retrieves Experience Editor payload data by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `previewData` | [`EditingPreviewData`](/docs/nextjs/ref/interfaces/sharedtypes_editing_data/editingpreviewdata) | Editing preview data containing the key and serverUrl to use for retrieval |

#### Returns

`Promise`<`undefined` \| [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)\>

The [EditingData](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)

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

___

### setEditingData

▸ **setEditingData**(`data`, `serverUrl`): `Promise`<[`EditingPreviewData`](/docs/nextjs/ref/interfaces/sharedtypes_editing_data/editingpreviewdata)\>

Stores Experience Editor payload data for later retrieval by key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata) | Editing data |
| `serverUrl` | `string` | The server url to use for subsequent data API requests |

#### Returns

`Promise`<[`EditingPreviewData`](/docs/nextjs/ref/interfaces/sharedtypes_editing_data/editingpreviewdata)\>

The [EditingPreviewData](/docs/nextjs/ref/interfaces/sharedtypes_editing_data/editingpreviewdata) containing the generated key and serverUrl to use for retrieval
