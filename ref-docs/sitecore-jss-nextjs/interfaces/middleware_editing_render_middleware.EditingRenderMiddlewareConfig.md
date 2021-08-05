[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [middleware/editing-render-middleware](../modules/middleware_editing_render_middleware.md) / EditingRenderMiddlewareConfig

# Interface: EditingRenderMiddlewareConfig

[middleware/editing-render-middleware](../modules/middleware_editing_render_middleware.md).EditingRenderMiddlewareConfig

## Table of contents

### Properties

- [dataFetcher](middleware_editing_render_middleware.EditingRenderMiddlewareConfig.md#datafetcher)
- [editingDataService](middleware_editing_render_middleware.EditingRenderMiddlewareConfig.md#editingdataservice)

### Methods

- [resolvePageUrl](middleware_editing_render_middleware.EditingRenderMiddlewareConfig.md#resolvepageurl)
- [resolveServerUrl](middleware_editing_render_middleware.EditingRenderMiddlewareConfig.md#resolveserverurl)

## Properties

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](../classes/index.AxiosDataFetcher.md)

The `AxiosDataFetcher` instance to use for API requests.

**`default`** new AxiosDataFetcher()

**`see`** AxiosDataFetcher

#### Defined in

[src/middleware/editing-render-middleware.ts:14](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L14)

___

### editingDataService

• `Optional` **editingDataService**: [`EditingDataService`](../classes/services_editing_data_service.EditingDataService.md)

The `EditingDataService` instance to use.
This would typically only be necessary if you've got a custom `EditingDataService` instance (e.g. using a custom API route).
By default, this is `editingDataService` (an `EditingDataService` singleton).

**`default`** editingDataService

**`see`** EditingDataService

#### Defined in

[src/middleware/editing-render-middleware.ts:22](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L22)

## Methods

### resolvePageUrl

▸ `Optional` **resolvePageUrl**(`serverUrl`, `itemPath`): `string`

Function used to determine route/page URL to render.
This may be necessary for certain custom Next.js routing configurations.

**`default`** `${serverUrl}${itemPath}`

**`see`** resolveServerUrl

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverUrl` | `string` | The root server URL e.g. 'http://localhost:3000' |
| `itemPath` | `string` | The Sitecore relative item path e.g. '/styleguide' |

#### Returns

`string`

The URL to render

#### Defined in

[src/middleware/editing-render-middleware.ts:32](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L32)

___

### resolveServerUrl

▸ `Optional` **resolveServerUrl**(`req`): `string`

Function used to determine the root server URL. This is used for the route/page and subsequent data API requests.
By default, the host header is used, with https protocol on Vercel (due to serverless function architecture) and http protocol elsewhere.

**`default`** `${process.env.VERCEL ? 'https' : 'http'}://${req.headers.host}`;

**`see`** resolvePageUrl

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextApiRequest` | The current request. |

#### Returns

`string`

#### Defined in

[src/middleware/editing-render-middleware.ts:40](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L40)
