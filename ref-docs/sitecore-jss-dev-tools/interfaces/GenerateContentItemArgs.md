[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GenerateContentItemArgs

# Interface: GenerateContentItemArgs

## Extends

- [`GeneratePipelineArgs`](GeneratePipelineArgs.md)

## Properties

### appName

> **appName**: `string`

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`appName`](GeneratePipelineArgs.md#appname)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:392](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L392)

***

### components

> **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`components`](GeneratePipelineArgs.md#components)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:386](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L386)

***

### content

> **content**: `any`

#### Overrides

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`content`](GeneratePipelineArgs.md#content)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:399](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L399)

***

### debug

> **debug**: `boolean`

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`debug`](GeneratePipelineArgs.md#debug)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:384](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L384)

***

### dictionary

> **dictionary**: [`DictionaryDefinition`](DictionaryDefinition.md)[]

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`dictionary`](GeneratePipelineArgs.md#dictionary)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:389](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L389)

***

### item?

> `optional` **item**: `any`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:400](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L400)

***

### language

> **language**: `string`

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`language`](GeneratePipelineArgs.md#language)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:393](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L393)

***

### pipelineResult

> **pipelineResult**: [`ManifestInstance`](ManifestInstance.md) & `object`

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`pipelineResult`](GeneratePipelineArgs.md#pipelineresult)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:395](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L395)

***

### pipelines

> **pipelines**: `object`

#### Index Signature

 \[`key`: `string`\]: [`ExecutablePipeline`](ExecutablePipeline.md)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`pipelines`](GeneratePipelineArgs.md#pipelines)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:394](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L394)

***

### placeholders

> **placeholders**: [`PlaceholderDefinition`](PlaceholderDefinition.md)[]

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`placeholders`](GeneratePipelineArgs.md#placeholders)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:391](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L391)

***

### routes

> **routes**: [`RouteDefinition`](RouteDefinition.md)[]

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`routes`](GeneratePipelineArgs.md#routes)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:387](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L387)

***

### skipPlaceholderBlacklist

> **skipPlaceholderBlacklist**: `boolean`

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`skipPlaceholderBlacklist`](GeneratePipelineArgs.md#skipplaceholderblacklist)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:385](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L385)

***

### templates

> **templates**: [`TemplateDefinition`](TemplateDefinition.md)[]

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`templates`](GeneratePipelineArgs.md#templates)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:390](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L390)
