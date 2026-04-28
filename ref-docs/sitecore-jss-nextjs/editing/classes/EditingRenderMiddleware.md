[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingRenderMiddleware

# Class: EditingRenderMiddleware

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:489](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L489)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:489](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L489)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
which is required for Sitecore editing support.

## Extends

- `RenderMiddlewareBase`

## Constructors

### Constructor

> **new EditingRenderMiddleware**(`config?`): `EditingRenderMiddleware`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:493](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L493)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:493](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L493)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`EditingRenderMiddlewareConfig`](../type-aliases/EditingRenderMiddlewareConfig.md) | Editing render middleware config |

#### Returns

`EditingRenderMiddleware`

#### Overrides

`RenderMiddlewareBase.constructor`

## Properties

### config?

> `optional` **config?**: [`EditingRenderMiddlewareConfig`](../type-aliases/EditingRenderMiddlewareConfig.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:493](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L493)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:493](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L493)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Editing render middleware config

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:501](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L501)
=======
Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:501](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L501)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets the Next.js API route handler

#### Returns

route handler

(`req`, `res`) => `Promise`\<`void`\>

***

### getHeadersForPropagation()

> `protected` **getHeadersForPropagation**(`headers`): `object`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/render-middleware.ts:39](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L39)
=======
Defined in: [sitecore-jss-nextjs/src/editing/render-middleware.ts:39](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L39)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Get headers that should be passed along to subsequent requests

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `headers` | `IncomingHttpHeaders` | Incoming HTTP Headers |

#### Returns

`object`

Object of approved headers

#### Inherited from

`RenderMiddlewareBase.getHeadersForPropagation`

***

### getQueryParamsForPropagation()

> `protected` **getQueryParamsForPropagation**(`query`): `object`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/render-middleware.ts:17](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L17)
=======
Defined in: [sitecore-jss-nextjs/src/editing/render-middleware.ts:17](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L17)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Gets query parameters that should be passed along to subsequent requests (e.g. for deployment protection bypass)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `Partial`\<\{\[`key`: `string`\]: `string` \| `string`[]; \}\> | Object of query parameters from incoming URL |

#### Returns

`object`

Object of approved query parameters

#### Inherited from

`RenderMiddlewareBase.getQueryParamsForPropagation`
