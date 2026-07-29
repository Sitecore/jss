[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingRenderMiddleware

# Class: EditingRenderMiddleware

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:257](https://github.com/Sitecore/jss/blob/f0e2e06bb2f342643ad363bccbc1316fe0bceeee/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L257)

Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
which is required for Sitecore editing support.

## Extends

- `RenderMiddlewareBase`

## Constructors

### Constructor

> **new EditingRenderMiddleware**(`config?`): `EditingRenderMiddleware`

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:261](https://github.com/Sitecore/jss/blob/f0e2e06bb2f342643ad363bccbc1316fe0bceeee/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L261)

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

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:261](https://github.com/Sitecore/jss/blob/f0e2e06bb2f342643ad363bccbc1316fe0bceeee/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L261)

Editing render middleware config

## Methods

### getHandler()

> **getHandler**(): (`req`, `res`) => `Promise`\<`void`\>

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:269](https://github.com/Sitecore/jss/blob/f0e2e06bb2f342643ad363bccbc1316fe0bceeee/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L269)

Gets the Next.js API route handler

#### Returns

route handler

(`req`, `res`) => `Promise`\<`void`\>

***

### getHeadersForPropagation()

> `protected` **getHeadersForPropagation**(`headers`): `object`

Defined in: [sitecore-jss-nextjs/src/editing/render-middleware.ts:39](https://github.com/Sitecore/jss/blob/f0e2e06bb2f342643ad363bccbc1316fe0bceeee/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L39)

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

Defined in: [sitecore-jss-nextjs/src/editing/render-middleware.ts:17](https://github.com/Sitecore/jss/blob/f0e2e06bb2f342643ad363bccbc1316fe0bceeee/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L17)

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
