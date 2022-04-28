[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [middleware](../modules/middleware.md) / EditingRenderMiddlewareConfig

# Interface: EditingRenderMiddlewareConfig

[middleware](../modules/middleware.md).EditingRenderMiddlewareConfig

## Table of contents

### Properties

- [dataFetcher](middleware.EditingRenderMiddlewareConfig.md#datafetcher)
- [editingDataService](middleware.EditingRenderMiddlewareConfig.md#editingdataservice)

### Methods

- [resolvePageUrl](middleware.EditingRenderMiddlewareConfig.md#resolvepageurl)
- [resolveServerUrl](middleware.EditingRenderMiddlewareConfig.md#resolveserverurl)

## Properties

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](../classes/index.AxiosDataFetcher.md)

The `AxiosDataFetcher` instance to use for API requests.

**`default`** new AxiosDataFetcher()

**`see`** AxiosDataFetcher

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:15](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L15)

___

### editingDataService

• `Optional` **editingDataService**: [`EditingDataService`](../classes/index.EditingDataService.md)

The `EditingDataService` instance to use.
This would typically only be necessary if you've got a custom `EditingDataService` instance (e.g. using a custom API route).
By default, this is `editingDataService` (an `EditingDataService` singleton).

**`default`** editingDataService

**`see`** EditingDataService

#### Defined in

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:23](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L23)

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

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:33](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L33)

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

[sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts:41](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L41)
