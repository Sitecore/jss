[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / EditingRenderMiddlewareConfig

# Interface: EditingRenderMiddlewareConfig

[editing](../modules/editing.md).EditingRenderMiddlewareConfig

## Table of contents

### Properties

- [dataFetcher](editing.EditingRenderMiddlewareConfig.md#datafetcher)
- [editingDataService](editing.EditingRenderMiddlewareConfig.md#editingdataservice)
- [resolvePageUrl](editing.EditingRenderMiddlewareConfig.md#resolvepageurl)
- [resolveServerUrl](editing.EditingRenderMiddlewareConfig.md#resolveserverurl)

## Properties

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](../classes/index.AxiosDataFetcher.md)

The `AxiosDataFetcher` instance to use for API requests.

**`Default`**

new AxiosDataFetcher()

**`See`**

AxiosDataFetcher

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:20](https://github.com/Sitecore/jss/blob/e5d07f7d9/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L20)

___

### editingDataService

• `Optional` **editingDataService**: [`EditingDataService`](editing.EditingDataService.md)

The `EditingDataService` instance to use.
This would typically only be necessary if you've got a custom `EditingDataService` instance (e.g. using a custom API route).
By default, this is `editingDataService` (the `EditingDataService` default instance).
This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise.

**`Default`**

editingDataService

**`See`**

EditingDataService

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:29](https://github.com/Sitecore/jss/blob/e5d07f7d9/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L29)

___

### resolvePageUrl

• `Optional` **resolvePageUrl**: (`serverUrl`: `string`, `itemPath`: `string`) => `string`

#### Type declaration

▸ (`serverUrl`, `itemPath`): `string`

Function used to determine route/page URL to render.
This may be necessary for certain custom Next.js routing configurations.

**`Default`**

`${serverUrl}${itemPath}`

**`See`**

resolveServerUrl

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverUrl` | `string` | The root server URL e.g. 'http://localhost:3000' |
| `itemPath` | `string` | The Sitecore relative item path e.g. '/styleguide' |

##### Returns

`string`

The URL to render

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:39](https://github.com/Sitecore/jss/blob/e5d07f7d9/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L39)

___

### resolveServerUrl

• `Optional` **resolveServerUrl**: (`req`: `NextApiRequest`) => `string`

#### Type declaration

▸ (`req`): `string`

Function used to determine the root server URL. This is used for the route/page and subsequent data API requests.
By default, the host header is used, with https protocol on Vercel (due to serverless function architecture) and http protocol elsewhere.

**`Default`**

`${process.env.VERCEL ? 'https' : 'http'}://${req.headers.host}`;

**`See`**

resolvePageUrl

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextApiRequest` | The current request. |

##### Returns

`string`

#### Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:47](https://github.com/Sitecore/jss/blob/e5d07f7d9/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L47)
