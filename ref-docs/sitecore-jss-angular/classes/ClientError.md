[@sitecore-jss/sitecore-jss-angular](../README.md) / ClientError

# Class: ClientError

## Hierarchy

- `Error`

  ↳ **`ClientError`**

## Table of contents

### Constructors

- [constructor](ClientError.md#constructor)

### Properties

- [message](ClientError.md#message)
- [name](ClientError.md#name)
- [originalStack](ClientError.md#originalstack)
- [request](ClientError.md#request)
- [response](ClientError.md#response)
- [stack](ClientError.md#stack)
- [zoneAwareStack](ClientError.md#zoneawarestack)
- [extractMessage](ClientError.md#extractmessage)
- [prepareStackTrace](ClientError.md#preparestacktrace)
- [stackTraceLimit](ClientError.md#stacktracelimit)

### Methods

- [captureStackTrace](ClientError.md#capturestacktrace)

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

### originalStack

• `Optional` **originalStack**: `string`

Original stack trace with no modifications

#### Inherited from

Error.originalStack

#### Defined in

packages/sitecore-jss-angular/node_modules/zone.js/lib/zone.d.ts:38

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

### zoneAwareStack

• `Optional` **zoneAwareStack**: `string`

Stack trace where extra frames have been removed and zone names added.

#### Inherited from

Error.zoneAwareStack

#### Defined in

packages/sitecore-jss-angular/node_modules/zone.js/lib/zone.d.ts:34

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

packages/sitecore-jss-angular/node_modules/@types/node/ts4.8/globals.d.ts:27

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

packages/sitecore-jss-angular/node_modules/@types/node/ts4.8/globals.d.ts:29

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

packages/sitecore-jss-angular/node_modules/@types/node/ts4.8/globals.d.ts:20
