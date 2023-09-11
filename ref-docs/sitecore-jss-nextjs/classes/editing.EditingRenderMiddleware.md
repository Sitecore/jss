[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingRenderMiddleware

# Class: EditingRenderMiddleware

[editing](../modules/editing.md).EditingRenderMiddleware

Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
which is required for Sitecore editing support.

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
- [handler](editing.EditingRenderMiddleware.md#handler)

## Constructors

### constructor

• **new EditingRenderMiddleware**(`config?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`EditingRenderMiddlewareConfig`](../interfaces/editing.EditingRenderMiddlewareConfig.md) | Editing render middleware config |

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:63](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L63)

## Properties

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](index.AxiosDataFetcher.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:56](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L56)

___

### editingDataService

• `Private` **editingDataService**: [`EditingDataService`](../interfaces/editing.EditingDataService.md)

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:55](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L55)

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

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:57](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L57)

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

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:58](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L58)

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

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:205](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L205)

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

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:219](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L219)

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

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:74](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L74)

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

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:78](https://github.com/Sitecore/jss/blob/3ef5b2c1b/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L78)
