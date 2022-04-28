[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / EditingRenderMiddleware

# Class: EditingRenderMiddleware

[middleware](../modules/middleware.md).EditingRenderMiddleware

Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
which is required for Sitecore Experience Editor support.

## Table of contents

### Constructors

- [constructor](middleware.EditingRenderMiddleware.md#constructor)

### Properties

- [dataFetcher](middleware.EditingRenderMiddleware.md#datafetcher)
- [editingDataService](middleware.EditingRenderMiddleware.md#editingdataservice)
- [resolvePageUrl](middleware.EditingRenderMiddleware.md#resolvepageurl)
- [resolveServerUrl](middleware.EditingRenderMiddleware.md#resolveserverurl)

### Methods

- [defaultResolvePageUrl](middleware.EditingRenderMiddleware.md#defaultresolvepageurl)
- [defaultResolveServerUrl](middleware.EditingRenderMiddleware.md#defaultresolveserverurl)
- [getHandler](middleware.EditingRenderMiddleware.md#gethandler)
- [handler](middleware.EditingRenderMiddleware.md#handler)

## Constructors

### constructor

• **new EditingRenderMiddleware**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingRenderMiddlewareConfig`](../interfaces/middleware.EditingRenderMiddlewareConfig.md) |

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:57](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L57)

## Properties

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](index.AxiosDataFetcher.md)

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:50](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L50)

___

### editingDataService

• `Private` **editingDataService**: [`EditingDataService`](index.EditingDataService.md)

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:49](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L49)

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

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:51](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L51)

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

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:52](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L52)

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

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:186](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L186)

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

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:200](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L200)

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

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:69](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L69)

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

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:73](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L73)
