[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GeneratePipelineArgs

# Interface: GeneratePipelineArgs

## Hierarchy

- **`GeneratePipelineArgs`**

  ↳ [`GenerateContentItemArgs`](GenerateContentItemArgs.md)

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [appName](GeneratePipelineArgs.md#appname)
- [components](GeneratePipelineArgs.md#components)
- [content](GeneratePipelineArgs.md#content)
- [debug](GeneratePipelineArgs.md#debug)
- [dictionary](GeneratePipelineArgs.md#dictionary)
- [language](GeneratePipelineArgs.md#language)
- [pipelineResult](GeneratePipelineArgs.md#pipelineresult)
- [pipelines](GeneratePipelineArgs.md#pipelines)
- [placeholders](GeneratePipelineArgs.md#placeholders)
- [routes](GeneratePipelineArgs.md#routes)
- [skipPlaceholderBlacklist](GeneratePipelineArgs.md#skipplaceholderblacklist)
- [templates](GeneratePipelineArgs.md#templates)

## Properties

### appName

• **appName**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:392](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L392)

___

### components

• **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:386](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L386)

___

### content

• **content**: [`ItemDefinition`](ItemDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:388](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L388)

___

### debug

• **debug**: `boolean`

#### Defined in

[manifest/generator/manifest.types.ts:384](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L384)

___

### dictionary

• **dictionary**: [`DictionaryDefinition`](DictionaryDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:389](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L389)

___

### language

• **language**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:393](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L393)

___

### pipelineResult

• **pipelineResult**: [`ManifestInstance`](ManifestInstance.md) & { [key: string]: `any`;  }

#### Defined in

[manifest/generator/manifest.types.ts:395](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L395)

___

### pipelines

• **pipelines**: `Object`

#### Index signature

▪ [key: `string`]: [`ExecutablePipeline`](ExecutablePipeline.md)

#### Defined in

[manifest/generator/manifest.types.ts:394](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L394)

___

### placeholders

• **placeholders**: [`PlaceholderDefinition`](PlaceholderDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:391](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L391)

___

### routes

• **routes**: [`RouteDefinition`](RouteDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:387](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L387)

___

### skipPlaceholderBlacklist

• **skipPlaceholderBlacklist**: `boolean`

#### Defined in

[manifest/generator/manifest.types.ts:385](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L385)

___

### templates

• **templates**: [`TemplateDefinition`](TemplateDefinition.md)[]

#### Defined in

[manifest/generator/manifest.types.ts:390](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L390)
