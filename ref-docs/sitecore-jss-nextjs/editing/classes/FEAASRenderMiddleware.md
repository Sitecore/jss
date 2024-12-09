[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / FEAASRenderMiddleware

# Class: FEAASRenderMiddleware

Middleware / handler for use in the feaas render Next.js API route (e.g. '/api/editing/feaas/render')
which is required for Sitecore editing support.

## Extends

- `RenderMiddlewareBase`

## Constructors

### new FEAASRenderMiddleware()

> **new FEAASRenderMiddleware**(`config`?): [`FEAASRenderMiddleware`](FEAASRenderMiddleware.md)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config`? | [`FEAASRenderMiddlewareConfig`](../interfaces/FEAASRenderMiddlewareConfig.md) | Editing render middleware config |

#### Returns

[`FEAASRenderMiddleware`](FEAASRenderMiddleware.md)

#### Overrides

`RenderMiddlewareBase.constructor`

#### Defined in

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)

## Properties

### config?

> `protected` `optional` **config**: [`FEAASRenderMiddlewareConfig`](../interfaces/FEAASRenderMiddlewareConfig.md)

Editing render middleware config

#### Defined in

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

Gets the Next.js API route handler

#### Returns

`Function`

route handler

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse` |

##### Returns

`Promise`\<`void`\>

#### Defined in

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:44](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L44)

***

### getHeadersForPropagation()

> `protected` **getHeadersForPropagation**(`headers`): `object`

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

#### Defined in

[sitecore-jss-nextjs/src/editing/render-middleware.ts:39](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L39)

***

### getQueryParamsForPropagation()

> `protected` **getQueryParamsForPropagation**(`query`): `object`

Gets query parameters that should be passed along to subsequent requests (e.g. for deployment protection bypass)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `Partial`\<`object`\> | Object of query parameters from incoming URL |

#### Returns

`object`

Object of approved query parameters

#### Inherited from

`RenderMiddlewareBase.getQueryParamsForPropagation`

#### Defined in

[sitecore-jss-nextjs/src/editing/render-middleware.ts:17](https://github.com/Sitecore/jss/blob/5454a428df58963ed2d13614972a821a22191cb6/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L17)
