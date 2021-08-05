[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / sharedTypes/editing-data

# Module: sharedTypes/editing-data

## Table of contents

### Interfaces

- [EditingPreviewData](../interfaces/sharedTypes_editing_data.EditingPreviewData.md)

### Type aliases

- [EditingData](sharedTypes_editing_data.md#editingdata)

### Functions

- [isEditingData](sharedTypes_editing_data.md#iseditingdata)

## Type aliases

### EditingData

Ƭ **EditingData**: `Object`

Data sent from Experience Editor

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dictionary` | [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md) |
| `language` | `string` |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `path` | `string` |

#### Defined in

[src/sharedTypes/editing-data.ts:6](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/sharedTypes/editing-data.ts#L6)

## Functions

### isEditingData

▸ **isEditingData**(`data`): data is EditingData

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EditingData`](sharedTypes_editing_data.md#editingdata) \| `unknown` |

#### Returns

data is EditingData

#### Defined in

[src/sharedTypes/editing-data.ts:16](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/sharedTypes/editing-data.ts#L16)
