[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ExecutablePipeline

# Interface: ExecutablePipeline

## Extended by

- [`Pipeline`](Pipeline.md)

## Properties

### args

> **args**: `any`

Base args object for the pipeline.

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:40](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L40)

***

### name

> **name**: `string`

name of the pipeline

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:36](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L36)

***

### processors()

> **processors**: () => [`Processor`](Processor.md)[]

the processors for the pipeline

#### Returns

[`Processor`](Processor.md)[]

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:44](https://github.com/Sitecore/jss/blob/19bb6642e4427b5db18d1ab2d795fea2aea54ea3/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L44)
