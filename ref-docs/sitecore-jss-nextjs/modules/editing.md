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
- [GraphQLEditingService](../classes/editing.GraphQLEditingService.md)
- [ServerlessEditingDataService](../classes/editing.ServerlessEditingDataService.md)
- [VercelEditingDataCache](../classes/editing.VercelEditingDataCache.md)

### Interfaces

- [BasicEditingDataServiceConfig](../interfaces/editing.BasicEditingDataServiceConfig.md)
- [EditingDataCache](../interfaces/editing.EditingDataCache.md)
- [EditingDataMiddlewareConfig](../interfaces/editing.EditingDataMiddlewareConfig.md)
- [EditingDataService](../interfaces/editing.EditingDataService.md)
- [EditingPreviewData](../interfaces/editing.EditingPreviewData.md)
- [FEAASRenderMiddlewareConfig](../interfaces/editing.FEAASRenderMiddlewareConfig.md)
- [ServerlessEditingDataServiceConfig](../interfaces/editing.ServerlessEditingDataServiceConfig.md)

### Type Aliases

- [EditingConfigMiddlewareConfig](editing.md#editingconfigmiddlewareconfig)
- [EditingData](editing.md#editingdata)
- [EditingMetadataPreviewData](editing.md#editingmetadatapreviewdata)
- [EditingRenderMiddlewareConfig](editing.md#editingrendermiddlewareconfig)

### Variables

- [editingDataService](editing.md#editingdataservice)

### Functions

- [isEditingMetadataPreviewData](editing.md#iseditingmetadatapreviewdata)

## Type Aliases

### EditingConfigMiddlewareConfig

Ƭ **EditingConfigMiddlewareConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | `string`[] \| `Map`\<`string`, `unknown`\> | Components available in the application |
| `metadata` | `Metadata` | Application metadata |
| `pagesEditMode?` | [`EditMode`](../enums/index.EditMode.md) | Determines which editing mode should be used by Pages. Can be either 'chromes' or 'metadata'. By default its 'metadata' |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-config-middleware.ts:9](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-nextjs/src/editing/editing-config-middleware.ts#L9)

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

[sitecore-jss-nextjs/src/editing/editing-data.ts:7](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-nextjs/src/editing/editing-data.ts#L7)

___

### EditingMetadataPreviewData

Ƭ **EditingMetadataPreviewData**: `Object`

Data for Next.js Preview (Editing) Metadata Edit Mode.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `editMode` | [`Metadata`](../enums/index.EditMode.md#metadata) |
| `itemId` | `string` |
| `language` | `string` |
| `pageState` | `Exclude`\<[`LayoutServicePageState`](../enums/index.LayoutServicePageState.md), ``"Normal"``\> |
| `site` | `string` |
| `variantId` | `string` |
| `version` | `string` |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:299](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L299)

___

### EditingRenderMiddlewareConfig

Ƭ **EditingRenderMiddlewareConfig**: `Object`

Configuration for the Editing Render Middleware.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataFetcher?` | [`AxiosDataFetcher`](../classes/index.AxiosDataFetcher.md) | -- Edit Mode Chromes -- The `AxiosDataFetcher` instance to use for API requests. **`Default`** ```ts new AxiosDataFetcher() ``` **`See`** AxiosDataFetcher |
| `editingDataService?` | [`EditingDataService`](../interfaces/editing.EditingDataService.md) | -- Edit Mode Chromes -- The `EditingDataService` instance to use. This would typically only be necessary if you've got a custom `EditingDataService` instance (e.g. using a custom API route). By default, this is `editingDataService` (the `EditingDataService` default instance). This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise. **`Default`** ```ts editingDataService ``` **`See`** EditingDataService |
| `resolvePageUrl?` | (`args`: \{ `itemPath`: `string` ; `serverUrl?`: `string`  }) => `string` | -- Edit Mode Chromes / Metadata -- Function used to determine route/page URL to render. This may be necessary for certain custom Next.js routing configurations. **`Default`** `${serverUrl}${itemPath}` In Edit Mode Chromes **`Default`** `${itemPath}` In XMCloud Pages for Edit Mode Metadata **`See`** resolveServerUrl |
| `resolveServerUrl?` | (`req`: `NextApiRequest`) => `string` | -- Edit Mode Chromes -- Function used to determine the root server URL. This is used for the route/page and subsequent data API requests. By default, the host header is used, with https protocol on Vercel (due to serverless function architecture) and http protocol elsewhere. **`Default`** `${process.env.VERCEL ? 'https' : 'http'}://${req.headers.host}`; **`See`** resolvePageUrl |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:21](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L21)

## Variables

### editingDataService

• `Const` **editingDataService**: [`BasicEditingDataService`](../classes/editing.BasicEditingDataService.md) \| [`ServerlessEditingDataService`](../classes/editing.ServerlessEditingDataService.md)

The `EditingDataService` default instance.
This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise.

For information about the VERCEL environment variable, see
https://vercel.com/docs/environment-variables#system-environment-variables

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-data-service.ts:223](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-nextjs/src/editing/editing-data-service.ts#L223)

## Functions

### isEditingMetadataPreviewData

▸ **isEditingMetadataPreviewData**(`data`): data is EditingMetadataPreviewData

Type guard for EditingMetadataPreviewData

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `unknown` | preview data to check |

#### Returns

data is EditingMetadataPreviewData

true if the data is EditingMetadataPreviewData

**`See`**

EditingMetadataPreviewData

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:315](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L315)
