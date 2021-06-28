---
name: editingrendermiddleware
routeTemplate: ./data/component-templates/article.yml
title: editingrendermiddleware
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [middleware/editing-render-middleware](/docs/nextjs/ref/modules/middleware_editing_render_middleware) / EditingRenderMiddleware

# Class: EditingRenderMiddleware

[middleware/editing-render-middleware](/docs/nextjs/ref/modules/middleware_editing_render_middleware).EditingRenderMiddleware

Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
which is required for Sitecore Experience Editor support.

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#constructor)

### Properties

- [dataFetcher](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#datafetcher)
- [editingDataService](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#editingdataservice)
- [resolvePageUrl](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#resolvepageurl)
- [resolveServerUrl](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#resolveserverurl)

### Methods

- [defaultResolvePageUrl](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#defaultresolvepageurl)
- [defaultResolveServerUrl](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#defaultresolveserverurl)
- [getHandler](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#gethandler)
- [handler](/docs/nextjs/ref/classes/middleware_editing_render_middleware/editingrendermiddleware#handler)

## Constructors

### constructor

• **new EditingRenderMiddleware**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`EditingRenderMiddlewareConfig`](/docs/nextjs/ref/interfaces/middleware_editing_render_middleware/editingrendermiddlewareconfig) |

## Properties

### dataFetcher

• `Private` **dataFetcher**: [`AxiosDataFetcher`](/docs/nextjs/ref/classes/index/axiosdatafetcher)

___

### editingDataService

• `Private` **editingDataService**: [`EditingDataService`](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice)

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

___

### getHandler

▸ **getHandler**(): (`req`: `NextApiRequest`, `res`: `NextApiResponse`<`any`\>) => `Promise`<`void`\>

Gets the Next.js API route handler

#### Returns

`fn`

route handler

▸ (`req`, `res`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `NextApiRequest` |
| `res` | `NextApiResponse`<`any`\> |

##### Returns

`Promise`<`void`\>

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
