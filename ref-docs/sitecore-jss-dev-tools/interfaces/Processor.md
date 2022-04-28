[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Processor

# Interface: Processor

## Table of contents

### Properties

- [args](Processor.md#args)
- [modulePath](Processor.md#modulepath)
- [moduleWrapper](Processor.md#modulewrapper)
- [name](Processor.md#name)

### Methods

- [process](Processor.md#process)

## Properties

### args

• `Optional` **args**: `any`

additional arguments that should be passed to the processor when invoked

#### Defined in

[pipelines/pipelineFactory.ts:19](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L19)

___

### modulePath

• `Optional` **modulePath**: `string` \| { `filePath`: `string` ; `workingDirectory`: `string`  }

optional but must be specified if process is not

#### Defined in

[pipelines/pipelineFactory.ts:11](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L11)

___

### moduleWrapper

• `Optional` **moduleWrapper**: `any`

#### Defined in

[pipelines/pipelineFactory.ts:20](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L20)

___

### name

• **name**: `string`

name of the processor

#### Defined in

[pipelines/pipelineFactory.ts:7](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L7)

## Methods

### process

▸ `Optional` **process**(`args`): `any`

optional but must be specified if modulePath is not

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `any` |

#### Returns

`any`

#### Defined in

[pipelines/pipelineFactory.ts:15](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L15)
