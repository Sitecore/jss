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

- [dataFetcher](editing.EditingRenderMiddleware.md#datafetcher)
- [editingDataService](editing.EditingRenderMiddleware.md#editingdataservice)
- [resolvePageUrl](editing.EditingRenderMiddleware.md#resolvepageurl)
- [resolveServerUrl](editing.EditingRenderMiddleware.md#resolveserverurl)

### Methods

- [defaultResolvePageUrl](editing.EditingRenderMiddleware.md#defaultresolvepageurl)
- [defaultResolveServerUrl](editing.EditingRenderMiddleware.md#defaultresolveserverurl)
- [getHandler](editing.EditingRenderMiddleware.md#gethandler)
- [getQueryParamsForPropagation](editing.EditingRenderMiddleware.md#getqueryparamsforpropagation)
- [handler](editing.EditingRenderMiddleware.md#handler)

## Constructors

### constructor

• **new EditingRenderMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`EditingRenderMiddlewareConfig`](../interfaces/editing.EditingRenderMiddlewareConfig.md) | Editing render middleware config |

#### Overrides

RenderMiddlewareBase.constructor

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:61](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L61)

## Properties

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](index.AxiosDataFetcher.md)

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:54](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L54)

___

### editingDataService

• `Private` **editingDataService**: [`EditingDataService`](../interfaces/editing.EditingDataService.md)

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:53](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L53)

___

### resolvePageUrl

• `Private` **resolvePageUrl**: (`serverUrl`: `string`, `itemPath`: `string`) => `string`

#### Type declaration

▸ (`serverUrl`, `itemPath`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `serverUrl` | `string` |
| `itemPath` | `string` |

##### Returns

`string`

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:55](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L55)

___

### resolveServerUrl

• `Private` **resolveServerUrl**: (`req`: `NextApiRequest`) => `string`

#### Type declaration

▸ (`req`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |

##### Returns

`string`

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:56](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L56)

## Methods

### defaultResolvePageUrl

▸ `Private` **defaultResolvePageUrl**(`serverUrl`, `itemPath`): `string`

Default page URL resolution.

#### Parameters

| Name | Type |
| :------ | :------ |
| `serverUrl` | `string` |
| `itemPath` | `string` |

#### Returns

`string`

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:217](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L217)

___

### defaultResolveServerUrl

▸ `Private` **defaultResolveServerUrl**(`req`): `string`

Default server URL resolution.
Note we use https protocol on Vercel due to serverless function architecture.
In all other scenarios, including localhost (with or without a proxy e.g. ngrok)
and within a nodejs container, http protocol should be used.

For information about the VERCEL environment variable, see
https://vercel.com/docs/environment-variables#system-environment-variables

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |

#### Returns

`string`

#### Defined in

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:231](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L231)

___

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

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:74](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L74)

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

[packages/sitecore-jss-nextjs/src/editing/render-middleware.ts:15](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/render-middleware.ts#L15)

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

[packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:78](https://github.com/Sitecore/jss/blob/3e2d07cc7/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L78)
