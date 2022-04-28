[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PipelineRegistry

# Interface: PipelineRegistry

## Table of contents

### Methods

- [addPipeline](PipelineRegistry.md#addpipeline)
- [deletePipeline](PipelineRegistry.md#deletepipeline)
- [getPipeline](PipelineRegistry.md#getpipeline)
- [getPipelines](PipelineRegistry.md#getpipelines)
- [updatePipeline](PipelineRegistry.md#updatepipeline)

## Methods

### addPipeline

▸ **addPipeline**(`pipeline`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pipeline` | [`Pipeline`](Pipeline.md) |

#### Returns

`void`

#### Defined in

[pipelines/pipelinesRegistry.ts:4](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L4)

___

### deletePipeline

▸ **deletePipeline**(`pipelineName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pipelineName` | `string` |

#### Returns

`void`

#### Defined in

[pipelines/pipelinesRegistry.ts:6](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L6)

___

### getPipeline

▸ **getPipeline**(`pipelineName`): [`Pipeline`](Pipeline.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pipelineName` | `string` |

#### Returns

[`Pipeline`](Pipeline.md)

#### Defined in

[pipelines/pipelinesRegistry.ts:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L7)

___

### getPipelines

▸ **getPipelines**(): `Object`

#### Returns

`Object`

#### Defined in

[pipelines/pipelinesRegistry.ts:8](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L8)

___

### updatePipeline

▸ **updatePipeline**(`pipeline`, `pipelineName?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pipeline` | [`Pipeline`](Pipeline.md) |
| `pipelineName?` | `string` |

#### Returns

`void`

#### Defined in

[pipelines/pipelinesRegistry.ts:5](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L5)
