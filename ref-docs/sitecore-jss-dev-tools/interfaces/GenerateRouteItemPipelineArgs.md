[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GenerateRouteItemPipelineArgs

# Interface: GenerateRouteItemPipelineArgs

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:413](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L413)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:413](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L413)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Indexable

> \[`key`: `string`\]: `any`

## Properties

### components

> **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:416](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L416)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:416](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L416)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### datasourceDisplayNamer

> **datasourceDisplayNamer**: (`__namedParameters`) => `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:431](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L431)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:431](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L431)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | \{ `index`: `number`; `item`: `any`; `placeholder`: `any`; `rendering`: `any`; \} |
| `__namedParameters.index` | `number` |
| `__namedParameters.item` | `any` |
| `__namedParameters.placeholder` | `any` |
| `__namedParameters.rendering` | `any` |

#### Returns

`string`

***

### datasourceNamer

> **datasourceNamer**: (`__namedParameters`) => `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:420](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L420)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:420](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L420)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | \{ `index`: `number`; `item`: `any`; `placeholder`: `any`; `rendering`: `any`; \} |
| `__namedParameters.index` | `number` |
| `__namedParameters.item` | `any` |
| `__namedParameters.placeholder` | `any` |
| `__namedParameters.rendering` | `any` |

#### Returns

`string`

***

### dynamicPlaceholderKeyGenerator

> **dynamicPlaceholderKeyGenerator**: (`key`, `rendering`, `parentKey`) => `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:419](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L419)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:419](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L419)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `rendering` | `any` |
| `parentKey` | `string` |

#### Returns

`string`

***

### item

> **item**: `any`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:418](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L418)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:418](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L418)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### onRenderingProcessed?

> `optional` **onRenderingProcessed?**: (`rendering`) => `void`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:440](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L440)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:440](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L440)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rendering` | `any` |

#### Returns

`void`

***

### pipelines

> **pipelines**: `object`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:417](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L417)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:417](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L417)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Index Signature

\[`key`: `string`\]: [`ExecutablePipeline`](ExecutablePipeline.md)

***

### route

> **route**: [`RouteDefinition`](RouteDefinition.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:415](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L415)
=======
Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:415](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L415)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028
