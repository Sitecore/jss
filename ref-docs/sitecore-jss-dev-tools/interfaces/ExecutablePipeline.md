[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ExecutablePipeline

# Interface: ExecutablePipeline

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:32](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L32)

## Extended by

- [`Pipeline`](Pipeline.md)

## Properties

### args

> **args**: `any`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:40](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L40)

Base args object for the pipeline.

***

### name

> **name**: `string`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:36](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L36)

name of the pipeline

***

### processors()

> **processors**: () => [`Processor`](Processor.md)[]

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:44](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L44)

the processors for the pipeline

#### Returns

[`Processor`](Processor.md)[]
