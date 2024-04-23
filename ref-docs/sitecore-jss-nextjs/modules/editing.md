[@sitecore-jss/sitecore-jss-nextjs](../README.md) / editing

# Module: editing

## Table of contents

### Classes

- [BasicEditingDataService](../classes/editing.BasicEditingDataService.md)
- [EditingConfigMiddleware](../classes/editing.EditingConfigMiddleware.md)
- [EditingDataDiskCache](../classes/editing.EditingDataDiskCache.md)
- [EditingDataMiddleware](../classes/editing.EditingDataMiddleware.md)
- [EditingRenderMiddleware](../classes/editing.EditingRenderMiddleware.md)
- [FEAASRenderMiddleware](../classes/editing.FEAASRenderMiddleware.md)
- [ServerlessEditingDataService](../classes/editing.ServerlessEditingDataService.md)
- [VercelEditingDataCache](../classes/editing.VercelEditingDataCache.md)

### Interfaces

- [BasicEditingDataServiceConfig](../interfaces/editing.BasicEditingDataServiceConfig.md)
- [EditingDataCache](../interfaces/editing.EditingDataCache.md)
- [EditingDataMiddlewareConfig](../interfaces/editing.EditingDataMiddlewareConfig.md)
- [EditingDataService](../interfaces/editing.EditingDataService.md)
- [EditingPreviewData](../interfaces/editing.EditingPreviewData.md)
- [EditingRenderMiddlewareConfig](../interfaces/editing.EditingRenderMiddlewareConfig.md)
- [FEAASRenderMiddlewareConfig](../interfaces/editing.FEAASRenderMiddlewareConfig.md)
- [ServerlessEditingDataServiceConfig](../interfaces/editing.ServerlessEditingDataServiceConfig.md)

### Type Aliases

- [EditingConfigMiddlewareConfig](editing.md#editingconfigmiddlewareconfig)
- [EditingData](editing.md#editingdata)

### Variables

- [editingDataService](editing.md#editingdataservice)

## Type Aliases

### EditingConfigMiddlewareConfig

Ƭ **EditingConfigMiddlewareConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | `string`[] \| `Map`\<`string`, `unknown`\> | Components available in the application |
| `metadata` | `Metadata` | Application metadata |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:7](https://github.com/Sitecore/jss/blob/139f50a01/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L7)

___

### EditingData

Ƭ **EditingData**: `Object`

Data sent from Sitecore editors

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dictionary` | [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md) |
| `language` | `string` |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `path` | `string` |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data.ts:7](https://github.com/Sitecore/jss/blob/139f50a01/packages/sitecore-jss-nextjs/src/editing/editing-data.ts#L7)

## Variables

### editingDataService

• `Const` **editingDataService**: [`BasicEditingDataService`](../classes/editing.BasicEditingDataService.md) \| [`ServerlessEditingDataService`](../classes/editing.ServerlessEditingDataService.md)

The `EditingDataService` default instance.
This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise.

For information about the VERCEL environment variable, see
https://vercel.com/docs/environment-variables#system-environment-variables

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:222](https://github.com/Sitecore/jss/blob/139f50a01/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L222)
