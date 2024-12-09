[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / PipelineRegistry

# Interface: PipelineRegistry

## Properties

### addPipeline()

> **addPipeline**: (`pipeline`) => `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pipeline` | [`Pipeline`](Pipeline.md) |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts:4](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L4)

***

### deletePipeline()

> **deletePipeline**: (`pipelineName`) => `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pipelineName` | `string` |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts:6](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L6)

***

### getPipeline()

> **getPipeline**: (`pipelineName`) => [`Pipeline`](Pipeline.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pipelineName` | `string` |

#### Returns

[`Pipeline`](Pipeline.md)

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts:7](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L7)

***

### getPipelines()

> **getPipelines**: () => `object`

#### Returns

`object`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts:8](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L8)

***

### updatePipeline()

> **updatePipeline**: (`pipeline`, `pipelineName`?) => `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pipeline` | [`Pipeline`](Pipeline.md) |
| `pipelineName`? | `string` |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts:5](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-dev-tools/src/pipelines/pipelinesRegistry.ts#L5)
