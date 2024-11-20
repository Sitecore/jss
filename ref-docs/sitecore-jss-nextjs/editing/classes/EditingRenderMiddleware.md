[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingRenderMiddleware

# Class: EditingRenderMiddleware

Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
which is required for Sitecore editing support.

## Extends

- `RenderMiddlewareBase`

## Constructors

### new EditingRenderMiddleware()

> **new EditingRenderMiddleware**(`config`?): [`EditingRenderMiddleware`](EditingRenderMiddleware.md)

#### Parameters

• **config?**: [`EditingRenderMiddlewareConfig`](../type-aliases/EditingRenderMiddlewareConfig.md)

Editing render middleware config

#### Returns

[`EditingRenderMiddleware`](EditingRenderMiddleware.md)

#### Overrides

`RenderMiddlewareBase.constructor`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:423](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L423)

## Properties

### config?

> `optional` **config**: [`EditingRenderMiddlewareConfig`](../type-aliases/EditingRenderMiddlewareConfig.md)

Editing render middleware config

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:423](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L423)

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

Gets the Next.js API route handler

#### Returns

`Function`

route handler

##### Parameters

• **req**: `NextApiRequest`

• **res**: `NextApiResponse`

##### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:431](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L431)

***

### getHeadersForPropagation()

> `protected` **getHeadersForPropagation**(`headers`): `object`

Get headers that should be passed along to subsequent requests

#### Parameters

• **headers**: `IncomingHttpHeaders`

Incoming HTTP Headers

#### Returns

`object`

Object of approved headers

#### Inherited from

`RenderMiddlewareBase.getHeadersForPropagation`

#### Defined in

[sitecore-jss-nextjs/src/editing/render-middleware.ts:39](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L39)

***

### getQueryParamsForPropagation()

> `protected` **getQueryParamsForPropagation**(`query`): `object`

Gets query parameters that should be passed along to subsequent requests (e.g. for deployment protection bypass)

#### Parameters

• **query**: `Partial`\<`object`\>

Object of query parameters from incoming URL

#### Returns

`object`

Object of approved query parameters

#### Inherited from

`RenderMiddlewareBase.getQueryParamsForPropagation`

#### Defined in

[sitecore-jss-nextjs/src/editing/render-middleware.ts:17](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L17)