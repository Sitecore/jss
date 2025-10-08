[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GenerateRouteItemPipelineArgs

# Interface: GenerateRouteItemPipelineArgs

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:413](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L413)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### components

> **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:416](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L416)

***

### datasourceDisplayNamer()

> **datasourceDisplayNamer**: (`__namedParameters`) => `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:431](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L431)

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

### datasourceNamer()

> **datasourceNamer**: (`__namedParameters`) => `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:420](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L420)

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

### dynamicPlaceholderKeyGenerator()

> **dynamicPlaceholderKeyGenerator**: (`key`, `rendering`, `parentKey`) => `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:419](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L419)

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

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:418](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L418)

***

### onRenderingProcessed()?

> `optional` **onRenderingProcessed**: (`rendering`) => `void`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:440](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L440)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rendering` | `any` |

#### Returns

`void`

***

### pipelines

> **pipelines**: `object`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:417](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L417)

#### Index Signature

\[`key`: `string`\]: [`ExecutablePipeline`](ExecutablePipeline.md)

***

### route

> **route**: [`RouteDefinition`](RouteDefinition.md)

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:415](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L415)
