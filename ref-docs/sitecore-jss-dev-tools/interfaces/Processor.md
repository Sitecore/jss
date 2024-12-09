[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Processor

# Interface: Processor

## Properties

### args?

> `optional` **args**: `any`

additional arguments that should be passed to the processor when invoked

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:19](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L19)

***

### modulePath?

> `optional` **modulePath**: `string` \| `object`

optional but must be specified if process is not

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:11](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L11)

***

### moduleWrapper?

> `optional` **moduleWrapper**: `any`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:20](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L20)

***

### name

> **name**: `string`

name of the processor

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:7](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L7)

***

### process()?

> `optional` **process**: (`args`) => `any`

optional but must be specified if modulePath is not

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `args` | `any` |

#### Returns

`any`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:15](https://github.com/Sitecore/jss/blob/b543e221483be0d7e4e3ae7b76785619d291d2d3/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L15)
