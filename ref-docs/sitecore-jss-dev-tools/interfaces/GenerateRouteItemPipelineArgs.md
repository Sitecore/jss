[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GenerateRouteItemPipelineArgs

# Interface: GenerateRouteItemPipelineArgs

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [components](GenerateRouteItemPipelineArgs.md#components)
- [item](GenerateRouteItemPipelineArgs.md#item)
- [pipelines](GenerateRouteItemPipelineArgs.md#pipelines)
- [route](GenerateRouteItemPipelineArgs.md#route)

### Methods

- [datasourceDisplayNamer](GenerateRouteItemPipelineArgs.md#datasourcedisplaynamer)
- [datasourceNamer](GenerateRouteItemPipelineArgs.md#datasourcenamer)
- [dynamicPlaceholderKeyGenerator](GenerateRouteItemPipelineArgs.md#dynamicplaceholderkeygenerator)
- [onRenderingProcessed](GenerateRouteItemPipelineArgs.md#onrenderingprocessed)

## Properties

### components

• **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:416](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L416)

___

### item

• **item**: `any`

#### Defined in

[manifest/generator/manifest.types.ts:418](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L418)

___

### pipelines

• **pipelines**: `Object`

#### Index signature

▪ [key: `string`]: [`ExecutablePipeline`](ExecutablePipeline.md)

#### Defined in

[manifest/generator/manifest.types.ts:417](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L417)

___

### route

• **route**: [`RouteDefinition`](RouteDefinition.md)

#### Defined in

[manifest/generator/manifest.types.ts:415](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L415)

## Methods

### datasourceDisplayNamer

▸ **datasourceDisplayNamer**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.index` | `number` |
| `__namedParameters.item` | `any` |
| `__namedParameters.placeholder` | `any` |
| `__namedParameters.rendering` | `any` |

#### Returns

`string`

#### Defined in

[manifest/generator/manifest.types.ts:431](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L431)

___

### datasourceNamer

▸ **datasourceNamer**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.index` | `number` |
| `__namedParameters.item` | `any` |
| `__namedParameters.placeholder` | `any` |
| `__namedParameters.rendering` | `any` |

#### Returns

`string`

#### Defined in

[manifest/generator/manifest.types.ts:420](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L420)

___

### dynamicPlaceholderKeyGenerator

▸ **dynamicPlaceholderKeyGenerator**(`key`, `rendering`, `parentKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `rendering` | `any` |
| `parentKey` | `string` |

#### Returns

`string`

#### Defined in

[manifest/generator/manifest.types.ts:419](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L419)

___

### onRenderingProcessed

▸ `Optional` **onRenderingProcessed**(`rendering`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | `any` |

#### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:440](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L440)
