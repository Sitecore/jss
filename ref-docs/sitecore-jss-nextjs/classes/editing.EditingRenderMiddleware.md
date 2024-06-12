[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingRenderMiddleware

# Class: EditingRenderMiddleware

[editing](../modules/editing.md).EditingRenderMiddleware

Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
which is required for Sitecore editing support.

## Hierarchy

- `RenderMiddlewareBase`

  ↳ **`EditingRenderMiddleware`**

## Table of contents

### Constructors

- [constructor](editing.EditingRenderMiddleware.md#constructor)

### Properties

- [config](editing.EditingRenderMiddleware.md#config)

### Methods

- [getHandler](editing.EditingRenderMiddleware.md#gethandler)
- [getQueryParamsForPropagation](editing.EditingRenderMiddleware.md#getqueryparamsforpropagation)
- [handler](editing.EditingRenderMiddleware.md#handler)

## Constructors

### constructor

• **new EditingRenderMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`EditingRenderMiddlewareConfig`](../modules/editing.md#editingrendermiddlewareconfig) | Editing render middleware config |

#### Overrides

RenderMiddlewareBase.constructor

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:416](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L416)

## Properties

### config

• `Optional` **config**: [`EditingRenderMiddlewareConfig`](../modules/editing.md#editingrendermiddlewareconfig)

Editing render middleware config

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:416](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L416)

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

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:424](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L424)

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

[sitecore-jss-nextjs/src/editing/render-middleware.ts:15](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L15)

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

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:428](https://github.com/Sitecore/jss/blob/c9d87aeba/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L428)
