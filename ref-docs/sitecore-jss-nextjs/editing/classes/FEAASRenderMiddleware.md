[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / FEAASRenderMiddleware

# Class: FEAASRenderMiddleware

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:27](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L27)
=======
Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:27](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L27)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Middleware / handler for use in the feaas render Next.js API route (e.g. '/api/editing/feaas/render')
which is required for Sitecore editing support.

## Extends

- `RenderMiddlewareBase`

## Constructors

### Constructor

> **new FEAASRenderMiddleware**(`config?`): `FEAASRenderMiddleware`

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)
=======
Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`FEAASRenderMiddlewareConfig`](../interfaces/FEAASRenderMiddlewareConfig.md) | Editing render middleware config |

#### Returns

`FEAASRenderMiddleware`

#### Overrides

`RenderMiddlewareBase.constructor`

## Properties

### config?

> `protected` `optional` **config?**: [`FEAASRenderMiddlewareConfig`](../interfaces/FEAASRenderMiddlewareConfig.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)
=======
Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Editing render middleware config

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:44](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L44)
=======
Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:44](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L44)
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
