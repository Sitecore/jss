[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Pipeline

# Interface: Pipeline

## Hierarchy

- [`ExecutablePipeline`](ExecutablePipeline.md)

  ↳ **`Pipeline`**

## Table of contents

### Properties

- [addProcessor](Pipeline.md#addprocessor)
- [args](Pipeline.md#args)
- [name](Pipeline.md#name)
- [processors](Pipeline.md#processors)
- [run](Pipeline.md#run)
- [runWithCompilers](Pipeline.md#runwithcompilers)

## Properties

### addProcessor

• **addProcessor**: (`processor`: [`Processor`](Processor.md)) => `void`

#### Type declaration

▸ (`processor`): `void`

adds a processor to the pipeline

##### Parameters

| Name | Type |
| :------ | :------ |
| `processor` | [`Processor`](Processor.md) |

##### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:63](https://github.com/Sitecore/jss/blob/f4a52d996/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L63)

___

### args

• **args**: `any`

Base args object for the pipeline.

#### Overrides

[ExecutablePipeline](ExecutablePipeline.md).[args](ExecutablePipeline.md#args)

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:55](https://github.com/Sitecore/jss/blob/f4a52d996/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L55)

___

### name

• **name**: `string`

name of the pipeline

#### Overrides

[ExecutablePipeline](ExecutablePipeline.md).[name](ExecutablePipeline.md#name)

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:51](https://github.com/Sitecore/jss/blob/f4a52d996/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L51)

___

### processors

• **processors**: () => [`Processor`](Processor.md)[]

#### Type declaration

▸ (): [`Processor`](Processor.md)[]

the processors for the pipeline

##### Returns

[`Processor`](Processor.md)[]

#### Overrides

[ExecutablePipeline](ExecutablePipeline.md).[processors](ExecutablePipeline.md#processors)

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:59](https://github.com/Sitecore/jss/blob/f4a52d996/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L59)

___

### run

• **run**: () => `Promise`\<`any`\>

#### Type declaration

▸ (): `Promise`\<`any`\>

runs the pipeline with the given pipeline args

##### Returns

`Promise`\<`any`\>

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:67](https://github.com/Sitecore/jss/blob/f4a52d996/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L67)

___

### runWithCompilers

• **runWithCompilers**: (`compilers`: `string`[]) => `Promise`\<`any`\>

#### Type declaration

▸ (`compilers`): `Promise`\<`any`\>

runs the pipeline with the given pipeline args, importing the given compilers first

##### Parameters

| Name | Type |
| :------ | :------ |
| `compilers` | `string`[] |

##### Returns

`Promise`\<`any`\>

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts:71](https://github.com/Sitecore/jss/blob/f4a52d996/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L71)
