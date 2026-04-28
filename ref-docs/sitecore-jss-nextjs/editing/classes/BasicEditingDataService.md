[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / BasicEditingDataService

# Class: BasicEditingDataService

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:72](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L72)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:72](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L72)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Service responsible for maintaining Sitecore editor data between requests
on self-hosted deployment architectures.
Utilizes a cache for storage and retrieval of editing data.

## Implements

- [`EditingDataService`](../interfaces/EditingDataService.md)

## Constructors

### Constructor

> **new BasicEditingDataService**(`config?`): `BasicEditingDataService`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:79](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L79)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:79](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L79)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`BasicEditingDataServiceConfig`](../interfaces/BasicEditingDataServiceConfig.md) | Editing data service config |

#### Returns

`BasicEditingDataService`

## Properties

### generateKey

> `protected` **generateKey**: (`data`) => `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:73](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L73)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:73](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L73)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Unique key generator.
Need more than just the item GUID since requests are made "live" during editing in EE.
The suffix code will produce a random 10 character alpha-numeric (a-z 0-9) sequence, which is URI-safe.
Example generated key: 52961eea-bafd-5287-a532-a72e36bd8a36-qkb4e3fv5x

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`EditingData`](../type-aliases/EditingData.md) | The editing data |

#### Returns

`string`

The unique key

## Methods

### getEditingData()

> **getEditingData**(`previewData`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:105](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L105)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:105](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L105)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Retrieves Sitecore editor payload data by key

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `previewData` | `PreviewData` | Editing preview data containing the key to use for retrieval |

#### Returns

`Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

The [EditingData](../type-aliases/EditingData.md)

#### Implementation of

[`EditingDataService`](../interfaces/EditingDataService.md).[`getEditingData`](../interfaces/EditingDataService.md#geteditingdata)

***

### setEditingData()

> **setEditingData**(`data`): `Promise`\<[`EditingPreviewData`](../interfaces/EditingPreviewData.md)\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:88](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L88)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:88](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L88)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Stores Sitecore editor payload data for later retrieval by key

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`EditingData`](../type-aliases/EditingData.md) | Editing data |

#### Returns

`Promise`\<[`EditingPreviewData`](../interfaces/EditingPreviewData.md)\>

The [EditingPreviewData](../interfaces/EditingPreviewData.md) containing the generated key to use for retrieval

#### Implementation of

[`EditingDataService`](../interfaces/EditingDataService.md).[`setEditingData`](../interfaces/EditingDataService.md#seteditingdata)
