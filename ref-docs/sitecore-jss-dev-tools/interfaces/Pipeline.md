[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Pipeline

# Interface: Pipeline

## Hierarchy

- [`ExecutablePipeline`](ExecutablePipeline.md)

  ↳ **`Pipeline`**

## Table of contents

### Properties

- [args](Pipeline.md#args)
- [name](Pipeline.md#name)

### Methods

- [addProcessor](Pipeline.md#addprocessor)
- [processors](Pipeline.md#processors)
- [run](Pipeline.md#run)
- [runWithCompilers](Pipeline.md#runwithcompilers)

## Properties

### args

• **args**: `any`

Base args object for the pipeline.

#### Overrides

[ExecutablePipeline](ExecutablePipeline.md).[args](ExecutablePipeline.md#args)

#### Defined in

[pipelines/pipelineFactory.ts:55](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L55)

___

### name

• **name**: `string`

name of the pipeline

#### Overrides

[ExecutablePipeline](ExecutablePipeline.md).[name](ExecutablePipeline.md#name)

#### Defined in

[pipelines/pipelineFactory.ts:51](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L51)

## Methods

### addProcessor

▸ **addProcessor**(`processor`): `void`

adds a processor to the pipeline

#### Parameters

| Name | Type |
| :------ | :------ |
| `processor` | [`Processor`](Processor.md) |

#### Returns

`void`

#### Defined in

[pipelines/pipelineFactory.ts:63](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L63)

___

### processors

▸ **processors**(): [`Processor`](Processor.md)[]

the processors for the pipeline

#### Returns

[`Processor`](Processor.md)[]

#### Overrides

[ExecutablePipeline](ExecutablePipeline.md).[processors](ExecutablePipeline.md#processors)

#### Defined in

[pipelines/pipelineFactory.ts:59](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L59)

___

### run

▸ **run**(): `Promise`<`any`\>

runs the pipeline with the given pipeline args

#### Returns

`Promise`<`any`\>

#### Defined in

[pipelines/pipelineFactory.ts:67](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L67)

___

### runWithCompilers

▸ **runWithCompilers**(`compilers`): `Promise`<`any`\>

runs the pipeline with the given pipeline args, importing the given compilers first

#### Parameters

| Name | Type |
| :------ | :------ |
| `compilers` | `string`[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[pipelines/pipelineFactory.ts:71](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L71)
