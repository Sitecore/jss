[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / EditingRenderMiddlewareConfig

# Type Alias: EditingRenderMiddlewareConfig

> **EditingRenderMiddlewareConfig** = `object`

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:18](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L18)

Configuration for the Editing Render Middleware.

## Properties

### dataFetcher?

> `optional` **dataFetcher?**: [`NativeDataFetcher`](../../index/classes/NativeDataFetcher.md)

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:24](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L24)

The `NativeDataFetcher` instance to use for API requests.

#### Default

```ts
new NativeDataFetcher()
```

#### See

NativeDataFetcher

***

### editingDataService?

> `optional` **editingDataService?**: [`EditingDataService`](../interfaces/EditingDataService.md)

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:33](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L33)

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

***

### resolvePageUrl?

> `optional` **resolvePageUrl?**: (`args`) => `string`

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:44](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L44)

Function used to determine route/page URL to render.
This may be necessary for certain custom Next.js routing configurations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `args` | \{ `itemPath`: `string`; `serverUrl?`: `string`; \} | Arguments for resolving the page URL |
| `args.itemPath` | `string` | - |
| `args.serverUrl?` | `string` | The root server URL e.g. 'http://localhost:3000'. |

#### Returns

`string`

The URL to render

#### Default

`${serverUrl}${itemPath}`

#### See

resolveServerUrl

***

### resolveServerUrl?

> `optional` **resolveServerUrl?**: (`req`) => `string`

Defined in: [sitecore-jss-nextjs/src/editing/editing-render-middleware.ts:52](https://github.com/Sitecore/jss/blob/929d50c77d26b9b343517841b1105b6350edff0f/packages/sitecore-jss-nextjs/src/editing/editing-render-middleware.ts#L52)

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
