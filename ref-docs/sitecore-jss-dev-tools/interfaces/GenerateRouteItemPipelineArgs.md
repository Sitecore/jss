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

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:416](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L416)

***

### datasourceDisplayNamer()

> **datasourceDisplayNamer**: (`__namedParameters`) => `string`

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.index**: `number`

• **\_\_namedParameters.item**: `any`

• **\_\_namedParameters.placeholder**: `any`

• **\_\_namedParameters.rendering**: `any`

#### Returns

`string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:431](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L431)

***

### datasourceNamer()

> **datasourceNamer**: (`__namedParameters`) => `string`

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.index**: `number`

• **\_\_namedParameters.item**: `any`

• **\_\_namedParameters.placeholder**: `any`

• **\_\_namedParameters.rendering**: `any`

#### Returns

`string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:420](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L420)

***

### dynamicPlaceholderKeyGenerator()

> **dynamicPlaceholderKeyGenerator**: (`key`, `rendering`, `parentKey`) => `string`

#### Parameters

• **key**: `string`

• **rendering**: `any`

• **parentKey**: `string`

#### Returns

`string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:419](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L419)

***

### item

> **item**: `any`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:418](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L418)

***

### onRenderingProcessed()?

> `optional` **onRenderingProcessed**: (`rendering`) => `void`

#### Parameters

• **rendering**: `any`

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:440](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L440)

***

### pipelines

> **pipelines**: `object`

#### Index Signature

 \[`key`: `string`\]: [`ExecutablePipeline`](ExecutablePipeline.md)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:417](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L417)

***

### route

> **route**: [`RouteDefinition`](RouteDefinition.md)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:415](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L415)
