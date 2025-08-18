[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / GenerateContentItemArgs

# Interface: GenerateContentItemArgs

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:398](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L398)

## Extends

- [`GeneratePipelineArgs`](GeneratePipelineArgs.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### appName

> **appName**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:392](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L392)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`appName`](GeneratePipelineArgs.md#appname)

***

### components

> **components**: [`ComponentDefinition`](ComponentDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:386](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L386)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`components`](GeneratePipelineArgs.md#components)

***

### content

> **content**: `any`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:399](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L399)

#### Overrides

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`content`](GeneratePipelineArgs.md#content)

***

### debug

> **debug**: `boolean`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:384](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L384)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`debug`](GeneratePipelineArgs.md#debug)

***

### dictionary

> **dictionary**: [`DictionaryDefinition`](DictionaryDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:389](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L389)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`dictionary`](GeneratePipelineArgs.md#dictionary)

***

### item?

> `optional` **item**: `any`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:400](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L400)

***

### language

> **language**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:393](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L393)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`language`](GeneratePipelineArgs.md#language)

***

### pipelineResult

> **pipelineResult**: [`ManifestInstance`](ManifestInstance.md) & `object`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:395](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L395)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`pipelineResult`](GeneratePipelineArgs.md#pipelineresult)

***

### pipelines

> **pipelines**: `object`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:394](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L394)

#### Index Signature

\[`key`: `string`\]: [`ExecutablePipeline`](ExecutablePipeline.md)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`pipelines`](GeneratePipelineArgs.md#pipelines)

***

### placeholders

> **placeholders**: [`PlaceholderDefinition`](PlaceholderDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:391](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L391)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`placeholders`](GeneratePipelineArgs.md#placeholders)

***

### routes

> **routes**: [`RouteDefinition`](RouteDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:387](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L387)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`routes`](GeneratePipelineArgs.md#routes)

***

### skipPlaceholderBlacklist

> **skipPlaceholderBlacklist**: `boolean`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:385](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L385)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`skipPlaceholderBlacklist`](GeneratePipelineArgs.md#skipplaceholderblacklist)

***

### templates

> **templates**: [`TemplateDefinition`](TemplateDefinition.md)[]

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:390](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L390)

#### Inherited from

[`GeneratePipelineArgs`](GeneratePipelineArgs.md).[`templates`](GeneratePipelineArgs.md#templates)
