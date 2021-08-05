[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / [middleware/editing-render-middleware](../modules/middleware_editing_render_middleware.md) / EditingRenderMiddleware

# Class: EditingRenderMiddleware

[middleware/editing-render-middleware](../modules/middleware_editing_render_middleware.md).EditingRenderMiddleware

Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
which is required for Sitecore Experience Editor support.

## Table of contents

### Constructors

- [constructor](middleware_editing_render_middleware.EditingRenderMiddleware.md#constructor)

### Properties

- [dataFetcher](middleware_editing_render_middleware.EditingRenderMiddleware.md#datafetcher)
- [editingDataService](middleware_editing_render_middleware.EditingRenderMiddleware.md#editingdataservice)
- [resolvePageUrl](middleware_editing_render_middleware.EditingRenderMiddleware.md#resolvepageurl)
- [resolveServerUrl](middleware_editing_render_middleware.EditingRenderMiddleware.md#resolveserverurl)

### Methods

- [defaultResolvePageUrl](middleware_editing_render_middleware.EditingRenderMiddleware.md#defaultresolvepageurl)
- [defaultResolveServerUrl](middleware_editing_render_middleware.EditingRenderMiddleware.md#defaultresolveserverurl)
- [getHandler](middleware_editing_render_middleware.EditingRenderMiddleware.md#gethandler)
- [handler](middleware_editing_render_middleware.EditingRenderMiddleware.md#handler)

## Constructors

### constructor

• **new EditingRenderMiddleware**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingRenderMiddlewareConfig`](../interfaces/middleware_editing_render_middleware.EditingRenderMiddlewareConfig.md) |

#### Defined in

[src/middleware/editing-render-middleware.ts:56](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L56)

## Properties

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](index.AxiosDataFetcher.md)

#### Defined in

[src/middleware/editing-render-middleware.ts:49](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L49)

___

### editingDataService

• `Private` **editingDataService**: [`EditingDataService`](services_editing_data_service.EditingDataService.md)

#### Defined in

[src/middleware/editing-render-middleware.ts:48](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L48)

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

[src/middleware/editing-render-middleware.ts:50](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L50)

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

[src/middleware/editing-render-middleware.ts:51](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L51)

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

[src/middleware/editing-render-middleware.ts:166](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L166)

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

[src/middleware/editing-render-middleware.ts:180](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L180)

___

### getHandler

▸ **getHandler**(): (`req`: `NextApiRequest`, `res`: `NextApiResponse`<`any`\>) => `Promise`<`void`\>

Gets the Next.js API route handler

#### Returns

`fn`

route handler

▸ (`req`, `res`): `Promise`<`void`\>

Gets the Next.js API route handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`<`any`\> |

##### Returns

`Promise`<`void`\>

route handler

#### Defined in

[src/middleware/editing-render-middleware.ts:68](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L68)

___

### handler

▸ `Private` **handler**(`req`, `res`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`<`any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/middleware/editing-render-middleware.ts:72](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L72)
