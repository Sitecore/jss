[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / BasicEditingDataService

# Class: BasicEditingDataService

Service responsible for maintaining Sitecore editor data between requests
on self-hosted deployment architectures.
Utilizes a cache for storage and retrieval of editing data.

## Implements

- [`EditingDataService`](../interfaces/EditingDataService.md)

## Constructors

### new BasicEditingDataService()

> **new BasicEditingDataService**(`config`?): [`BasicEditingDataService`](BasicEditingDataService.md)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config`? | [`BasicEditingDataServiceConfig`](../interfaces/BasicEditingDataServiceConfig.md) | Editing data service config |

#### Returns

[`BasicEditingDataService`](BasicEditingDataService.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:79](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L79)

## Properties

### generateKey()

> `protected` **generateKey**: (`data`) => `string`

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

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:73](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L73)

## Methods

### getEditingData()

> **getEditingData**(`previewData`): `Promise`\<`undefined` \| [`EditingData`](../type-aliases/EditingData.md)\>

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

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:105](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L105)

***

### setEditingData()

> **setEditingData**(`data`): `Promise`\<[`EditingPreviewData`](../interfaces/EditingPreviewData.md)\>

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

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:88](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L88)
