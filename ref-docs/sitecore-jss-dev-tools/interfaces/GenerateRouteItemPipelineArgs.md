[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GenerateRouteItemPipelineArgs

# Interface: GenerateRouteItemPipelineArgs

## Indexable

 \[`key`: `string`\]: `any`

## Properties

### components

> **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:416](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L416)

***

### datasourceDisplayNamer()

> **datasourceDisplayNamer**: (`__namedParameters`) => `string`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | `object` |
| `__namedParameters.index` | `number` |
| `__namedParameters.item` | `any` |
| `__namedParameters.placeholder` | `any` |
| `__namedParameters.rendering` | `any` |

#### Returns

`string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:431](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L431)

***

### datasourceNamer()

> **datasourceNamer**: (`__namedParameters`) => `string`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | `object` |
| `__namedParameters.index` | `number` |
| `__namedParameters.item` | `any` |
| `__namedParameters.placeholder` | `any` |
| `__namedParameters.rendering` | `any` |

#### Returns

`string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:420](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L420)

***

### dynamicPlaceholderKeyGenerator()

> **dynamicPlaceholderKeyGenerator**: (`key`, `rendering`, `parentKey`) => `string`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `rendering` | `any` |
| `parentKey` | `string` |

#### Returns

`string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:419](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L419)

***

### item

> **item**: `any`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:418](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L418)

***

### onRenderingProcessed()?

> `optional` **onRenderingProcessed**: (`rendering`) => `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rendering` | `any` |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:440](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L440)

***

### pipelines

> **pipelines**: `object`

#### Index Signature

 \[`key`: `string`\]: [`ExecutablePipeline`](ExecutablePipeline.md)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:417](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L417)

***

### route

> **route**: [`RouteDefinition`](RouteDefinition.md)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:415](https://github.com/Sitecore/jss/blob/66dbe29bcafc730605f916c533e5227741eba3b6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L415)
