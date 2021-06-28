---
name: editingrendermiddlewareconfig
routeTemplate: ./data/component-templates/article.yml
title: editingrendermiddlewareconfig
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [middleware/editing-render-middleware](/docs/nextjs/ref/modules/middleware_editing_render_middleware) / EditingRenderMiddlewareConfig

# Interface: EditingRenderMiddlewareConfig

[middleware/editing-render-middleware](/docs/nextjs/ref/modules/middleware_editing_render_middleware).EditingRenderMiddlewareConfig

## Table of contents

### Properties

- [dataFetcher](/docs/nextjs/ref/interfaces/middleware_editing_render_middleware/editingrendermiddlewareconfig#datafetcher)
- [editingDataService](/docs/nextjs/ref/interfaces/middleware_editing_render_middleware/editingrendermiddlewareconfig#editingdataservice)
- [resolvePageUrl](/docs/nextjs/ref/interfaces/middleware_editing_render_middleware/editingrendermiddlewareconfig#resolvepageurl)
- [resolveServerUrl](/docs/nextjs/ref/interfaces/middleware_editing_render_middleware/editingrendermiddlewareconfig#resolveserverurl)

## Properties

### dataFetcher

• `Optional` **dataFetcher**: [`AxiosDataFetcher`](/docs/nextjs/ref/classes/index/axiosdatafetcher)

The `AxiosDataFetcher` instance to use for API requests.

**`default`** new AxiosDataFetcher()

**`see`** AxiosDataFetcher

___

### editingDataService

• `Optional` **editingDataService**: [`EditingDataService`](/docs/nextjs/ref/classes/services_editing_data_service/editingdataservice)

The `EditingDataService` instance to use.
This would typically only be necessary if you've got a custom `EditingDataService` instance (e.g. using a custom API route).
By default, this is `editingDataService` (an `EditingDataService` singleton).

**`default`** editingDataService

**`see`** EditingDataService

___

### resolvePageUrl

• `Optional` **resolvePageUrl**: (`serverUrl`: `string`, `itemPath`: `string`) => `string`

#### Type declaration

▸ (`serverUrl`, `itemPath`): `string`

Function used to determine route/page URL to render.
This may be necessary for certain custom Next.js routing configurations.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverUrl` | `string` | The root server URL e.g. 'http://localhost:3000' |
| `itemPath` | `string` | The Sitecore relative item path e.g. '/styleguide' |

##### Returns

`string`

The URL to render

___

### resolveServerUrl

• `Optional` **resolveServerUrl**: (`req`: `NextApiRequest`) => `string`

#### Type declaration

▸ (`req`): `string`

Function used to determine the root server URL. This is used for the route/page and subsequent data API requests.
By default, the host header is used, with https protocol on Vercel (due to serverless function architecture) and http protocol elsewhere.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextApiRequest` | The current request. |

##### Returns

`string`
