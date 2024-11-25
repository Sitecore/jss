[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Processor

# Interface: Processor

## Properties

### args?

> `optional` **args**: `any`

additional arguments that should be passed to the processor when invoked

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:19](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L19)

***

### modulePath?

> `optional` **modulePath**: `string` \| `object`

optional but must be specified if process is not

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:11](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L11)

***

### moduleWrapper?

> `optional` **moduleWrapper**: `any`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:20](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L20)

***

### name

> **name**: `string`

name of the processor

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:7](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L7)

***

### process()?

> `optional` **process**: (`args`) => `any`

optional but must be specified if modulePath is not

#### Parameters

• **args**: `any`

#### Returns

`any`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:15](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L15)
