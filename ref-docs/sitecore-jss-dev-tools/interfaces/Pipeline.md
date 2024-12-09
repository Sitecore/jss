[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Pipeline

# Interface: Pipeline

## Extends

- [`ExecutablePipeline`](ExecutablePipeline.md)

## Properties

### addProcessor()

> **addProcessor**: (`processor`) => `void`

adds a processor to the pipeline

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `processor` | [`Processor`](Processor.md) |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:63](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L63)

***

### args

> **args**: `any`

Base args object for the pipeline.

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`args`](ExecutablePipeline.md#args)

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:55](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L55)

***

### name

> **name**: `string`

name of the pipeline

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`name`](ExecutablePipeline.md#name)

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:51](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L51)

***

### processors()

> **processors**: () => [`Processor`](Processor.md)[]

the processors for the pipeline

#### Returns

[`Processor`](Processor.md)[]

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`processors`](ExecutablePipeline.md#processors)

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:59](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L59)

***

### run()

> **run**: () => `Promise`\<`any`\>

runs the pipeline with the given pipeline args

#### Returns

`Promise`\<`any`\>

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:67](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L67)

***

### runWithCompilers()

> **runWithCompilers**: (`compilers`) => `Promise`\<`any`\>

runs the pipeline with the given pipeline args, importing the given compilers first

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `compilers` | `string`[] |

#### Returns

`Promise`\<`any`\>

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:71](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L71)
