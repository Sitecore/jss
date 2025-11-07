[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Processor

# Interface: Processor

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:3](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L3)

## Properties

### args?

> `optional` **args**: `any`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:19](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L19)

additional arguments that should be passed to the processor when invoked

***

### modulePath?

> `optional` **modulePath**: `string` \| \{ `filePath`: `string`; `workingDirectory`: `string`; \}

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:11](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L11)

optional but must be specified if process is not

***

### moduleWrapper?

> `optional` **moduleWrapper**: `any`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:20](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L20)

***

### name

> **name**: `string`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:7](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L7)

name of the processor

***

### process()?

> `optional` **process**: (`args`) => `any`

Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:15](https://github.com/Sitecore/jss/blob/7b1d590947708f2d812c76be6fe1d85191219baa/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L15)

optional but must be specified if modulePath is not

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `args` | `any` |

#### Returns

`any`
