[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / ClientError

# Class: ClientError

## Extends

- `Error`

## Constructors

### new ClientError()

> **new ClientError**(`response`, `request`): [`ClientError`](ClientError.md)

#### Parameters

• **response**: `GraphQLResponse`\<`any`\>

• **request**: `GraphQLRequestContext`\<`Variables`\>

#### Returns

[`ClientError`](ClientError.md)

#### Overrides

`Error.constructor`

#### Defined in

packages/sitecore-jss/node\_modules/graphql-request/dist/types.d.ts:29

## Properties

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### request

> **request**: `GraphQLRequestContext`\<`Variables`\>

#### Defined in

packages/sitecore-jss/node\_modules/graphql-request/dist/types.d.ts:28

***

### response

> **response**: `GraphQLResponse`\<`any`\>

#### Defined in

packages/sitecore-jss/node\_modules/graphql-request/dist/types.d.ts:27

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

packages/sitecore-jss/node\_modules/@types/node/globals.d.ts:143

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

packages/sitecore-jss/node\_modules/@types/node/globals.d.ts:145

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Defined in

packages/sitecore-jss/node\_modules/@types/node/globals.d.ts:136
