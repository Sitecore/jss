[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / ClientError

# Class: ClientError

[index](../modules/index.md).ClientError

## Hierarchy

- `Error`

  ↳ **`ClientError`**

## Table of contents

### Constructors

- [constructor](index.ClientError.md#constructor)

### Properties

- [message](index.ClientError.md#message)
- [name](index.ClientError.md#name)
- [request](index.ClientError.md#request)
- [response](index.ClientError.md#response)
- [stack](index.ClientError.md#stack)
- [extractMessage](index.ClientError.md#extractmessage)
- [prepareStackTrace](index.ClientError.md#preparestacktrace)
- [stackTraceLimit](index.ClientError.md#stacktracelimit)

### Methods

- [captureStackTrace](index.ClientError.md#capturestacktrace)

## Constructors

### constructor

• **new ClientError**(`response`, `request`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `GraphQLResponse`\<`any`\> |
| `request` | `GraphQLRequestContext`\<`Variables`\> |

#### Overrides

Error.constructor

#### Defined in

packages/sitecore-jss/node_modules/graphql-request/dist/types.d.ts:29

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1029

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

___

### request

• **request**: `GraphQLRequestContext`\<`Variables`\>

#### Defined in

packages/sitecore-jss/node_modules/graphql-request/dist/types.d.ts:28

___

### response

• **response**: `GraphQLResponse`\<`any`\>

#### Defined in

packages/sitecore-jss/node_modules/graphql-request/dist/types.d.ts:27

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1030

___

### extractMessage

▪ `Static` `Private` **extractMessage**: `any`

#### Defined in

packages/sitecore-jss/node_modules/graphql-request/dist/types.d.ts:30

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

packages/sitecore-jss/node_modules/@types/node/ts4.8/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

packages/sitecore-jss/node_modules/@types/node/ts4.8/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

packages/sitecore-jss/node_modules/@types/node/ts4.8/globals.d.ts:4
