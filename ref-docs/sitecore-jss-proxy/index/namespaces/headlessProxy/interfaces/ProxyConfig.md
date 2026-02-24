[**@sitecore-jss/sitecore-jss-proxy**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../../../README.md) / [index](../../../README.md) / [headlessProxy](../README.md) / ProxyConfig

# Interface: ProxyConfig

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:29](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L29)

## Properties

### apiHost

> **apiHost**: `string`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:31](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L31)

Hostname to proxy to (i.e. Sitecore CD server 'http://siteco.re')

***

### apiKey

> **apiKey**: `string`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:35](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L35)

SSC endpoint to use when sending Layout Service requests to proxy

***

### createViewBag()?

> `optional` **createViewBag**: (`request`, `response`, `proxyResponse`, `layoutServiceData`) => `Promise`\<\{\[`key`: `string`\]: `unknown`; \}\> \| \{\[`key`: `string`\]: `unknown`; \}

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:79](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L79)

Hook to fill the SSR viewBag object; if you're customizing the viewBag in Sitecore integrated SSR mode, do the same here.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `IncomingMessage` |
| `response` | `ServerResponse` |
| `proxyResponse` | `IncomingMessage` |
| `layoutServiceData` | `LayoutServiceData` |

#### Returns

`Promise`\<\{\[`key`: `string`\]: `unknown`; \}\> \| \{\[`key`: `string`\]: `unknown`; \}

***

### debug?

> `optional` **debug**: `boolean`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:56](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L56)

Enables or disables proxy diagnostics in console.log (disable for production or get bad performance)

***

### layoutServiceRoute

> **layoutServiceRoute**: `string`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:33](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L33)

Path to layout service endpoint on proxy target server

***

### maxResponseSizeBytes?

> `optional` **maxResponseSizeBytes**: `number`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:92](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L92)

Responses from the proxy greater than this size (in bytes) are rejected.

***

### onError()?

> `optional` **onError**: (`error`, `response`) => \{ `content?`: `string`; `statusCode?`: `number`; \} \| `Promise`\<\{ `content?`: `string`; `headers?`: `Record`\<`string`, `string` \| `string`[]\>; `statusCode?`: `number`; \}\> \| `null`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:58](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L58)

Callback when an exception is thrown during SSR; decides what to send back to client (500 errors)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |
| `response` | `IncomingMessage` |

#### Returns

\{ `content?`: `string`; `statusCode?`: `number`; \} \| `Promise`\<\{ `content?`: `string`; `headers?`: `Record`\<`string`, `string` \| `string`[]\>; `statusCode?`: `number`; \}\> \| `null`

***

### pathRewriteExcludePredicate()?

> `optional` **pathRewriteExcludePredicate**: (`originalUrl`) => `boolean`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:52](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L52)

Function to determine if a given URL should be SSRed (return true), or passed through (return false)
Mutually exclusive with pathRewriteExcludeRoutes.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `originalUrl` | `string` |

#### Returns

`boolean`

***

### pathRewriteExcludeRoutes?

> `optional` **pathRewriteExcludeRoutes**: `string`[]

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:43](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L43)

Array of paths to proxy without any SSR transformation (i.e. do not treat as app routes).
Note: exclusions are case-insensitive.
Mutually exclusive with pathRewriteExcludePredicate.

***

### proxyOptions?

> `optional` **proxyOptions**: `LegacyOptions`\<`IncomingMessage`, `ServerResponse`\<`IncomingMessage`\>\>

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:54](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L54)

Configure `http-proxy-middleware`

***

### qsParams?

> `optional` **qsParams**: `string`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:37](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L37)

Custom Query String parameters to send to Layout Service, e.g. sc_site=my-site&tracing=false

***

### serverBundle

> **serverBundle**: [`ServerBundle`](ServerBundle.md)

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:94](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L94)

The require'd server.bundle.js file from your pre-built JSS app

***

### setHeaders()?

> `optional` **setHeaders**: (`request`, `response`, `proxyResponse`) => `void`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:86](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L86)

Hook to alter HTTP headers in a custom way.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | `IncomingMessage` |
| `response` | `ServerResponse` |
| `proxyResponse` | `IncomingMessage` |

#### Returns

`void`

***

### transformSSRContent()?

> `optional` **transformSSRContent**: (`response`, `request`, `serverResponse`) => `Promise`\<`string`\>

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:73](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L73)

Enables transforming SSR'ed HTML after it is rendered, i.e. to replace paths.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `response` | [`RenderResponse`](../../../interfaces/RenderResponse.md) |
| `request` | `IncomingMessage` |
| `serverResponse` | `ServerResponse` |

#### Returns

`Promise`\<`string`\>

***

### ws?

> `optional` **ws**: `boolean`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:47](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L47)

Turn WebSocket requests processing on or off
