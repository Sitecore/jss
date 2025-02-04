[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / ResponseError

# Class: ResponseError

## Extends

- `Error`

## Constructors

### new ResponseError()

> **new ResponseError**(`message`, `response`): [`ResponseError`](ResponseError.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `response` | [`HttpResponse`](../interfaces/HttpResponse.md)\<`unknown`\> |

#### Returns

[`ResponseError`](ResponseError.md)

#### Overrides

`Error.constructor`

#### Defined in

[packages/sitecore-jss/src/data-fetcher.ts:32](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/data-fetcher.ts#L32)

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

### response

> **response**: [`HttpResponse`](../interfaces/HttpResponse.md)\<`unknown`\>

#### Defined in

[packages/sitecore-jss/src/data-fetcher.ts:30](https://github.com/Sitecore/jss/blob/2c037b1db9e09367420bc13389995d0890265712/packages/sitecore-jss/src/data-fetcher.ts#L30)

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

| Parameter | Type |
| ------ | ------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

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

| Parameter | Type |
| ------ | ------ |
| `targetObject` | `object` |
| `constructorOpt`? | `Function` |

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Defined in

packages/sitecore-jss/node\_modules/@types/node/globals.d.ts:136
