[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PipelineRegistry

# Interface: PipelineRegistry

## Table of contents

### Properties

- [addPipeline](PipelineRegistry.md#addpipeline)
- [deletePipeline](PipelineRegistry.md#deletepipeline)
- [getPipeline](PipelineRegistry.md#getpipeline)
- [getPipelines](PipelineRegistry.md#getpipelines)
- [updatePipeline](PipelineRegistry.md#updatepipeline)

## Properties

### addPipeline

• **addPipeline**: (`pipeline`: [`Pipeline`](Pipeline.md)) => `void`

#### Type declaration

▸ (`pipeline`): `void`

##### Parameters

| Name       | Type                      |
| :--------- | :------------------------ |
| `pipeline` | [`Pipeline`](Pipeline.md) |

##### Returns

`void`

#### Defined in

[pipelines/pipelinesRegistry.ts:4](https://github.com/Sitecore/jss/blob/19e6229c3/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L4)

---

### deletePipeline

• **deletePipeline**: (`pipelineName`: `string`) => `void`

#### Type declaration

▸ (`pipelineName`): `void`

##### Parameters

| Name           | Type     |
| :------------- | :------- |
| `pipelineName` | `string` |

##### Returns

`void`

#### Defined in

[pipelines/pipelinesRegistry.ts:6](https://github.com/Sitecore/jss/blob/19e6229c3/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L6)

---

### getPipeline

• **getPipeline**: (`pipelineName`: `string`) => [`Pipeline`](Pipeline.md)

#### Type declaration

▸ (`pipelineName`): [`Pipeline`](Pipeline.md)

##### Parameters

| Name           | Type     |
| :------------- | :------- |
| `pipelineName` | `string` |

##### Returns

[`Pipeline`](Pipeline.md)

#### Defined in

[pipelines/pipelinesRegistry.ts:7](https://github.com/Sitecore/jss/blob/19e6229c3/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L7)

---

### getPipelines

• **getPipelines**: () => { `[key: string]`: [`Pipeline`](Pipeline.md); }

#### Type declaration

▸ (): `Object`

##### Returns

`Object`

#### Defined in

[pipelines/pipelinesRegistry.ts:8](https://github.com/Sitecore/jss/blob/19e6229c3/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L8)

---

### updatePipeline

• **updatePipeline**: (`pipeline`: [`Pipeline`](Pipeline.md), `pipelineName?`: `string`) => `void`

#### Type declaration

▸ (`pipeline`, `pipelineName?`): `void`

##### Parameters

| Name            | Type                      |
| :-------------- | :------------------------ |
| `pipeline`      | [`Pipeline`](Pipeline.md) |
| `pipelineName?` | `string`                  |

##### Returns

`void`

#### Defined in

[pipelines/pipelinesRegistry.ts:5](https://github.com/Sitecore/jss/blob/19e6229c3/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L5)
