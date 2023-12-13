[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GenerateRouteItemPipelineArgs

# Interface: GenerateRouteItemPipelineArgs

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [components](GenerateRouteItemPipelineArgs.md#components)
- [datasourceDisplayNamer](GenerateRouteItemPipelineArgs.md#datasourcedisplaynamer)
- [datasourceNamer](GenerateRouteItemPipelineArgs.md#datasourcenamer)
- [dynamicPlaceholderKeyGenerator](GenerateRouteItemPipelineArgs.md#dynamicplaceholderkeygenerator)
- [item](GenerateRouteItemPipelineArgs.md#item)
- [onRenderingProcessed](GenerateRouteItemPipelineArgs.md#onrenderingprocessed)
- [pipelines](GenerateRouteItemPipelineArgs.md#pipelines)
- [route](GenerateRouteItemPipelineArgs.md#route)

## Properties

### components

• **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:416](https://github.com/Sitecore/jss/blob/6201d1154/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L416)

___

### datasourceDisplayNamer

• **datasourceDisplayNamer**: (`__namedParameters`: { `index`: `number` ; `item`: `any` ; `placeholder`: `any` ; `rendering`: `any`  }) => `string`

#### Type declaration

▸ (`«destructured»`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `index` | `number` |
| › `item` | `any` |
| › `placeholder` | `any` |
| › `rendering` | `any` |

##### Returns

`string`

#### Defined in

[manifest/generator/manifest.types.ts:431](https://github.com/Sitecore/jss/blob/6201d1154/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L431)

___

### datasourceNamer

• **datasourceNamer**: (`__namedParameters`: { `index`: `number` ; `item`: `any` ; `placeholder`: `any` ; `rendering`: `any`  }) => `string`

#### Type declaration

▸ (`«destructured»`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `index` | `number` |
| › `item` | `any` |
| › `placeholder` | `any` |
| › `rendering` | `any` |

##### Returns

`string`

#### Defined in

[manifest/generator/manifest.types.ts:420](https://github.com/Sitecore/jss/blob/6201d1154/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L420)

___

### dynamicPlaceholderKeyGenerator

• **dynamicPlaceholderKeyGenerator**: (`key`: `string`, `rendering`: `any`, `parentKey`: `string`) => `string`

#### Type declaration

▸ (`key`, `rendering`, `parentKey`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `rendering` | `any` |
| `parentKey` | `string` |

##### Returns

`string`

#### Defined in

[manifest/generator/manifest.types.ts:419](https://github.com/Sitecore/jss/blob/6201d1154/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L419)

___

### item

• **item**: `any`

#### Defined in

[manifest/generator/manifest.types.ts:418](https://github.com/Sitecore/jss/blob/6201d1154/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L418)

___

### onRenderingProcessed

• `Optional` **onRenderingProcessed**: (`rendering`: `any`) => `void`

#### Type declaration

▸ (`rendering`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | `any` |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:440](https://github.com/Sitecore/jss/blob/6201d1154/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L440)

___

### pipelines

• **pipelines**: `Object`

#### Index signature

▪ [key: `string`]: [`ExecutablePipeline`](ExecutablePipeline.md)

#### Defined in

[manifest/generator/manifest.types.ts:417](https://github.com/Sitecore/jss/blob/6201d1154/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L417)

___

### route

• **route**: [`RouteDefinition`](RouteDefinition.md)

#### Defined in

[manifest/generator/manifest.types.ts:415](https://github.com/Sitecore/jss/blob/6201d1154/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L415)
