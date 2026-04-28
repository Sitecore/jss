[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Processor

# Interface: Processor

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:3](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L3)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:3](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L3)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### args?

> `optional` **args?**: `any`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:19](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L19)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:19](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L19)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

additional arguments that should be passed to the processor when invoked

***

### modulePath?

> `optional` **modulePath?**: `string` \| \{ `filePath`: `string`; `workingDirectory`: `string`; \}

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:11](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L11)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:11](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L11)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

optional but must be specified if process is not

***

### moduleWrapper?

> `optional` **moduleWrapper?**: `any`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:20](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L20)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:20](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L20)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### name

> **name**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:7](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L7)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:7](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L7)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

name of the processor

***

### process?

> `optional` **process?**: (`args`) => `any`

<<<<<<< HEAD
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:15](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L15)
=======
Defined in: [sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:15](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L15)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

optional but must be specified if modulePath is not

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `args` | `any` |

#### Returns

`any`
