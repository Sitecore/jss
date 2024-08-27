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
- [getHeadersForPropagation](editing.FEAASRenderMiddleware.md#getheadersforpropagation)
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

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/e8cb65715/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)

## Properties

### config

• `Protected` `Optional` **config**: [`FEAASRenderMiddlewareConfig`](../interfaces/editing.FEAASRenderMiddlewareConfig.md)

Editing render middleware config

#### Defined in

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:34](https://github.com/Sitecore/jss/blob/e8cb65715/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L34)

___

### defaultPageUrl

• `Private` **defaultPageUrl**: `string` = `'/feaas/render'`

#### Defined in

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:29](https://github.com/Sitecore/jss/blob/e8cb65715/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L29)

___

### pageUrl

• `Private` **pageUrl**: `string`

#### Defined in

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:28](https://github.com/Sitecore/jss/blob/e8cb65715/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L28)

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

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:44](https://github.com/Sitecore/jss/blob/e8cb65715/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L44)

___

### getHeadersForPropagation

▸ `Protected` **getHeadersForPropagation**(`headers`): `Object`

Get headers that should be passed along to subsequent requests

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `headers` | `IncomingHttpHeaders` | Incoming HTTP Headers |

#### Returns

`Object`

Object of approved headers

#### Inherited from

RenderMiddlewareBase.getHeadersForPropagation

#### Defined in

[sitecore-jss-nextjs/src/editing/render-middleware.ts:39](https://github.com/Sitecore/jss/blob/e8cb65715/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L39)

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

[sitecore-jss-nextjs/src/editing/render-middleware.ts:17](https://github.com/Sitecore/jss/blob/e8cb65715/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L17)

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

[sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts:48](https://github.com/Sitecore/jss/blob/e8cb65715/packages/sitecore-jss-nextjs/src/editing/feaas-render-middleware.ts#L48)
