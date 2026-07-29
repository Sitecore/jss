[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PipelineRegistry

# Interface: PipelineRegistry

Defined in: [pipelines/pipelinesRegistry.ts:3](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L3)

## Properties

### addPipeline

> **addPipeline**: (`pipeline`) => `void`

Defined in: [pipelines/pipelinesRegistry.ts:4](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L4)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pipeline` | [`Pipeline`](Pipeline.md) |

#### Returns

`void`

***

### deletePipeline

> **deletePipeline**: (`pipelineName`) => `void`

Defined in: [pipelines/pipelinesRegistry.ts:6](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L6)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pipelineName` | `string` |

#### Returns

`void`

***

### getPipeline

> **getPipeline**: (`pipelineName`) => [`Pipeline`](Pipeline.md)

Defined in: [pipelines/pipelinesRegistry.ts:7](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L7)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pipelineName` | `string` |

#### Returns

[`Pipeline`](Pipeline.md)

***

### getPipelines

> **getPipelines**: () => `object`

Defined in: [pipelines/pipelinesRegistry.ts:8](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L8)

#### Returns

`object`

***

### updatePipeline

> **updatePipeline**: (`pipeline`, `pipelineName?`) => `void`

Defined in: [pipelines/pipelinesRegistry.ts:5](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L5)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pipeline` | [`Pipeline`](Pipeline.md) |
| `pipelineName?` | `string` |

#### Returns

`void`
