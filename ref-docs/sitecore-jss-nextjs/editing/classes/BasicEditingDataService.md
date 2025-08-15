[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / BasicEditingDataService

# Class: BasicEditingDataService

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:72](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L72)

Service responsible for maintaining Sitecore editor data between requests
on self-hosted deployment architectures.
Utilizes a cache for storage and retrieval of editing data.

## Implements

- [`EditingDataService`](../interfaces/EditingDataService.md)

## Constructors

### Constructor

> **new BasicEditingDataService**(`config?`): `BasicEditingDataService`

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:79](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L79)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`BasicEditingDataServiceConfig`](../interfaces/BasicEditingDataServiceConfig.md) | Editing data service config |

#### Returns

`BasicEditingDataService`

## Properties

### generateKey()

> `protected` **generateKey**: (`data`) => `string`

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:73](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L73)

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

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:105](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L105)

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

Defined in: [sitecore-jss-nextjs/src/editing/editing-data-service.ts:88](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L88)

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
