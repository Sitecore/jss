---
name: sharedtypes_editing_data
routeTemplate: ./data/component-templates/article.yml
title: sharedtypes_editing_data
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / sharedTypes/editing-data

# Module: sharedTypes/editing-data

## Table of contents

### Interfaces

- [EditingPreviewData](/docs/nextjs/ref/interfaces/sharedtypes_editing_data/editingpreviewdata)

### Type aliases

- [EditingData](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata)

### Functions

- [isEditingData](/docs/nextjs/ref/modules/sharedtypes_editing_data#iseditingdata)

## Type aliases

### EditingData

Ƭ **EditingData**: `Object`

Data sent from Experience Editor

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dictionary` | [`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases) |
| `language` | `string` |
| `layoutData` | [`LayoutServiceData`](/docs/nextjs/ref/interfaces/index/layoutservicedata) |
| `path` | `string` |

## Functions

### isEditingData

▸ **isEditingData**(`data`): data is EditingData

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`EditingData`](/docs/nextjs/ref/modules/sharedtypes_editing_data#editingdata) \| `unknown` |

#### Returns

data is EditingData
