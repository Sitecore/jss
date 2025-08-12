[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / FEAASRenderMiddleware

# Class: FEAASRenderMiddleware

Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:27](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L27)

Middleware / handler for use in the feaas render Next.js API route (e.g. '/api/editing/feaas/render')
which is required for Sitecore editing support.

## Extends

- `RenderMiddlewareBase`

## Constructors

### Constructor

> **new FEAASRenderMiddleware**(`config?`): `FEAASRenderMiddleware`

Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)

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

> `protected` `optional` **config**: [`FEAASRenderMiddlewareConfig`](../interfaces/FEAASRenderMiddlewareConfig.md)

Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)

Editing render middleware config

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

Defined in: [sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:44](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L44)

Gets the Next.js API route handler

#### Returns

route handler

> (`req`, `res`): `Promise`\<`void`\>

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse` |

##### Returns

`Promise`\<`void`\>

***

### getHeadersForPropagation()

> `protected` **getHeadersForPropagation**(`headers`): `object`

Defined in: [sitecore-jss-nextjs/src/editing/render-middleware.ts:39](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L39)

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

Defined in: [sitecore-jss-nextjs/src/editing/render-middleware.ts:17](https://github.com/Sitecore/jss/blob/c0b821df4c623f8a29aeda82a67bff7ec76d5317/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L17)

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
