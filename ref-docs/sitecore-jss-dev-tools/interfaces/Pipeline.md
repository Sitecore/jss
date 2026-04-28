[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Pipeline

# Interface: Pipeline

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:47](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L47)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:47](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L47)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Extends

- [`ExecutablePipeline`](ExecutablePipeline.md)

## Properties

### addProcessor

> **addProcessor**: (`processor`) => `void`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:63](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L63)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:63](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L63)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:55](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L55)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:55](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L55)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Base args object for the pipeline.

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`args`](ExecutablePipeline.md#args)

***

### name

> **name**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:51](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L51)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:51](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L51)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

name of the pipeline

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`name`](ExecutablePipeline.md#name)

***

### processors

> **processors**: () => [`Processor`](Processor.md)[]

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:59](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L59)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:59](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L59)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

the processors for the pipeline

#### Returns

[`Processor`](Processor.md)[]

#### Overrides

[`ExecutablePipeline`](ExecutablePipeline.md).[`processors`](ExecutablePipeline.md#processors)

***

### run

> **run**: () => `Promise`\<`any`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:67](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L67)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:67](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L67)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

runs the pipeline with the given pipeline args

#### Returns

`Promise`\<`any`\>

***

### runWithCompilers

> **runWithCompilers**: (`compilers`) => `Promise`\<`any`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:71](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L71)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:71](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L71)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

runs the pipeline with the given pipeline args, importing the given compilers first

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `compilers` | `string`[] |

#### Returns

`Promise`\<`any`\>
