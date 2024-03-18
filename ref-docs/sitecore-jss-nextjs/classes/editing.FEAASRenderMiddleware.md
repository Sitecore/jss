[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / FEAASRenderMiddleware

# Class: FEAASRenderMiddleware

[editing](../modules/editing.md).FEAASRenderMiddleware

Middleware / handler for use in the feaas render Next.js API route (e.g. '/api/editing/feaas/render')
which is required for Sitecore editing support.

## Hierarchy

- `RenderMiddlewareBase`

  ↳ **`FEAASRenderMiddleware`**

## Table of contents

### Constructors

- [constructor](editing.FEAASRenderMiddleware.md#constructor)

### Properties

- [config](editing.FEAASRenderMiddleware.md#config)
- [defaultPageUrl](editing.FEAASRenderMiddleware.md#defaultpageurl)
- [pageUrl](editing.FEAASRenderMiddleware.md#pageurl)

### Methods

- [getHandler](editing.FEAASRenderMiddleware.md#gethandler)
- [getQueryParamsForPropagation](editing.FEAASRenderMiddleware.md#getqueryparamsforpropagation)
- [handler](editing.FEAASRenderMiddleware.md#handler)

## Constructors

### constructor

• **new FEAASRenderMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`FEAASRenderMiddlewareConfig`](../interfaces/editing.FEAASRenderMiddlewareConfig.md) | Editing render middleware config |

#### Overrides

RenderMiddlewareBase.constructor

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:30](https://github.com/Sitecore/jss/blob/09e6290ae/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L30)

## Properties

### config

• `Protected` `Optional` **config**: [`FEAASRenderMiddlewareConfig`](../interfaces/editing.FEAASRenderMiddlewareConfig.md)

Editing render middleware config

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:30](https://github.com/Sitecore/jss/blob/09e6290ae/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L30)

___

### defaultPageUrl

• `Private` **defaultPageUrl**: `string` = `'/feaas/render'`

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:25](https://github.com/Sitecore/jss/blob/09e6290ae/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L25)

___

### pageUrl

• `Private` **pageUrl**: `string`

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:24](https://github.com/Sitecore/jss/blob/09e6290ae/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L24)

## Methods

### getHandler

▸ **getHandler**(): (`req`: `NextApiRequest`, `res`: `NextApiResponse`\<`any`\>) => `Promise`\<`void`\>

Gets the Next.js API route handler

#### Returns

`fn`

route handler

▸ (`req`, `res`): `Promise`\<`void`\>

Gets the Next.js API route handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`\<`any`\> |

##### Returns

`Promise`\<`void`\>

route handler

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:40](https://github.com/Sitecore/jss/blob/09e6290ae/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L40)

___

### getQueryParamsForPropagation

▸ `Protected` **getQueryParamsForPropagation**(`query`): `Object`

Gets query parameters that should be passed along to subsequent requests (e.g. for deployment protection bypass)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `Partial`\<\{ `[key: string]`: `string` \| `string`[];  }\> | Object of query parameters from incoming URL |

#### Returns

`Object`

Object of approved query parameters

#### Inherited from

RenderMiddlewareBase.getQueryParamsForPropagation

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/render-middleware.ts:15](https://github.com/Sitecore/jss/blob/09e6290ae/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L15)

___

### handler

▸ `Private` **handler**(`req`, `res`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`\<`any`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:44](https://github.com/Sitecore/jss/blob/09e6290ae/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L44)
