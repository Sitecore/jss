[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingRenderMiddlewareConfig

# Type Alias: EditingRenderMiddlewareConfig

> **EditingRenderMiddlewareConfig**: `object`

Configuration for the Editing Render Middleware.

## Type declaration

### dataFetcher?

> `optional` **dataFetcher**: [`AxiosDataFetcher`](../../index/classes/AxiosDataFetcher.md)

-- Edit Mode Chromes --

The `AxiosDataFetcher` instance to use for API requests.

#### Default

```ts
new AxiosDataFetcher()
```

#### See

AxiosDataFetcher

### editingDataService?

> `optional` **editingDataService**: [`EditingDataService`](../interfaces/EditingDataService.md)

-- Edit Mode Chromes --

The `EditingDataService` instance to use.
This would typically only be necessary if you've got a custom `EditingDataService` instance (e.g. using a custom API route).
By default, this is `editingDataService` (the `EditingDataService` default instance).
This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise.

#### Default

```ts
editingDataService
```

#### See

EditingDataService

### resolvePageUrl()?

> `optional` **resolvePageUrl**: (`args`) => `string`

-- Edit Mode Chromes / Metadata --

Function used to determine route/page URL to render.
This may be necessary for certain custom Next.js routing configurations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `args` | `object` | Arguments for resolving the page URL |
| `args.itemPath` | `string` | - |
| `args.serverUrl`? | `string` | The root server URL e.g. 'http://localhost:3000'. Available in Chromes Edit Mode only. |

#### Returns

`string`

The URL to render

#### Default

`${serverUrl}${itemPath}` In Edit Mode Chromes

#### Default

`${itemPath}` In XMCloud Pages for Edit Mode Metadata

#### See

resolveServerUrl

### resolveServerUrl()?

> `optional` **resolveServerUrl**: (`req`) => `string`

-- Edit Mode Chromes --

Function used to determine the root server URL. This is used for the route/page and subsequent data API requests.
By default, the host header is used, with https protocol on Vercel (due to serverless function architecture) and http protocol elsewhere.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `req` | `NextApiRequest` | The current request. |

#### Returns

`string`

#### Default

`${process.env.VERCEL ? 'https' : 'http'}://${req.headers.host}`;

#### See

resolvePageUrl

## Defined in

[sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:21](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L21)
