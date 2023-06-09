[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ExecutablePipeline

# Interface: ExecutablePipeline

## Hierarchy

- **`ExecutablePipeline`**

  ↳ [`Pipeline`](Pipeline.md)

## Table of contents

### Properties

- [args](ExecutablePipeline.md#args)
- [name](ExecutablePipeline.md#name)
- [processors](ExecutablePipeline.md#processors)

## Properties

### args

• **args**: `any`

Base args object for the pipeline.

#### Defined in

[pipelines/pipelineFactory.ts:40](https://github.com/Sitecore/jss/blob/9a2c6b283/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L40)

___

### name

• **name**: `string`

name of the pipeline

#### Defined in

[pipelines/pipelineFactory.ts:36](https://github.com/Sitecore/jss/blob/9a2c6b283/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L36)

___

### processors

• **processors**: () => [`Processor`](Processor.md)[]

#### Type declaration

▸ (): [`Processor`](Processor.md)[]

the processors for the pipeline

##### Returns

[`Processor`](Processor.md)[]

#### Defined in

[pipelines/pipelineFactory.ts:44](https://github.com/Sitecore/jss/blob/9a2c6b283/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L44)
