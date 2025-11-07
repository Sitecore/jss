[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Pipeline

# Interface: Pipeline

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:47](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L47)

## Extends

- [`ExecutablePipeline`](ExecutablePipeline.md)

## Properties

### addProcessor()

> **addProcessor**: (`processor`) => `void`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:63](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L63)

adds a processor to the pipeline

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `processor` | [`Processor`](Processor.md) |

#### Returns

`void`

***

### args

> **args**: `any`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:55](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L55)

Base args object for the pipeline.

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`args`](ExecutablePipeline.md#args)

***

### name

> **name**: `string`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:51](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L51)

name of the pipeline

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`name`](ExecutablePipeline.md#name)

***

### processors()

> **processors**: () => [`Processor`](Processor.md)[]

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:59](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L59)

the processors for the pipeline

#### Returns

[`Processor`](Processor.md)[]

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`processors`](ExecutablePipeline.md#processors)

***

### run()

> **run**: () => `Promise`\<`any`\>

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:67](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L67)

runs the pipeline with the given pipeline args

#### Returns

`Promise`\<`any`\>

***

### runWithCompilers()

> **runWithCompilers**: (`compilers`) => `Promise`\<`any`\>

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:71](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L71)

runs the pipeline with the given pipeline args, importing the given compilers first

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `compilers` | `string`[] |

#### Returns

`Promise`\<`any`\>
