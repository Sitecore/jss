[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GenerateContentItemArgs

# Interface: GenerateContentItemArgs

## Hierarchy

- [`GeneratePipelineArgs`](GeneratePipelineArgs.md)

  ↳ **`GenerateContentItemArgs`**

## Table of contents

### Properties

- [appName](GenerateContentItemArgs.md#appname)
- [components](GenerateContentItemArgs.md#components)
- [content](GenerateContentItemArgs.md#content)
- [debug](GenerateContentItemArgs.md#debug)
- [dictionary](GenerateContentItemArgs.md#dictionary)
- [item](GenerateContentItemArgs.md#item)
- [language](GenerateContentItemArgs.md#language)
- [pipelineResult](GenerateContentItemArgs.md#pipelineresult)
- [pipelines](GenerateContentItemArgs.md#pipelines)
- [placeholders](GenerateContentItemArgs.md#placeholders)
- [routes](GenerateContentItemArgs.md#routes)
- [skipPlaceholderBlacklist](GenerateContentItemArgs.md#skipplaceholderblacklist)
- [templates](GenerateContentItemArgs.md#templates)

## Properties

### appName

• **appName**: `string`

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[appName](GeneratePipelineArgs.md#appname)

#### Defined in

[manifest/generator/manifest.types.ts:392](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L392)

___

### components

• **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[components](GeneratePipelineArgs.md#components)

#### Defined in

[manifest/generator/manifest.types.ts:386](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L386)

___

### content

• **content**: `any`

#### Overrides

[GeneratePipelineArgs](GeneratePipelineArgs.md).[content](GeneratePipelineArgs.md#content)

#### Defined in

[manifest/generator/manifest.types.ts:399](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L399)

___

### debug

• **debug**: `boolean`

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[debug](GeneratePipelineArgs.md#debug)

#### Defined in

[manifest/generator/manifest.types.ts:384](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L384)

___

### dictionary

• **dictionary**: [`DictionaryDefinition`](DictionaryDefinition.md)[]

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[dictionary](GeneratePipelineArgs.md#dictionary)

#### Defined in

[manifest/generator/manifest.types.ts:389](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L389)

___

### item

• `Optional` **item**: `any`

#### Defined in

[manifest/generator/manifest.types.ts:400](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L400)

___

### language

• **language**: `string`

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[language](GeneratePipelineArgs.md#language)

#### Defined in

[manifest/generator/manifest.types.ts:393](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L393)

___

### pipelineResult

• **pipelineResult**: [`ManifestInstance`](ManifestInstance.md) & { [key: string]: `any`;  }

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[pipelineResult](GeneratePipelineArgs.md#pipelineresult)

#### Defined in

[manifest/generator/manifest.types.ts:395](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L395)

___

### pipelines

• **pipelines**: `Object`

#### Index signature

▪ [key: `string`]: [`ExecutablePipeline`](ExecutablePipeline.md)

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[pipelines](GeneratePipelineArgs.md#pipelines)

#### Defined in

[manifest/generator/manifest.types.ts:394](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L394)

___

### placeholders

• **placeholders**: [`PlaceholderDefinition`](PlaceholderDefinition.md)[]

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[placeholders](GeneratePipelineArgs.md#placeholders)

#### Defined in

[manifest/generator/manifest.types.ts:391](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L391)

___

### routes

• **routes**: [`RouteDefinition`](RouteDefinition.md)[]

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[routes](GeneratePipelineArgs.md#routes)

#### Defined in

[manifest/generator/manifest.types.ts:387](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L387)

___

### skipPlaceholderBlacklist

• **skipPlaceholderBlacklist**: `boolean`

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[skipPlaceholderBlacklist](GeneratePipelineArgs.md#skipplaceholderblacklist)

#### Defined in

[manifest/generator/manifest.types.ts:385](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L385)

___

### templates

• **templates**: [`TemplateDefinition`](TemplateDefinition.md)[]

#### Inherited from

[GeneratePipelineArgs](GeneratePipelineArgs.md).[templates](GeneratePipelineArgs.md#templates)

#### Defined in

[manifest/generator/manifest.types.ts:390](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L390)
