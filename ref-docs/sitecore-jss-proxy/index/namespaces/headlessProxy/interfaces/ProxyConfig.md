[**@sitecore-jss/sitecore-jss-proxy**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../../../README.md) / [index](../../../README.md) / [headlessProxy](../README.md) / ProxyConfig

# Interface: ProxyConfig

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:29](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L29)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:29](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L29)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### apiHost

> **apiHost**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:31](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L31)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:31](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L31)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Hostname to proxy to (i.e. Sitecore CD server 'http://siteco.re')

***

### apiKey

> **apiKey**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:35](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L35)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:35](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L35)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

SSC endpoint to use when sending Layout Service requests to proxy

***

### createViewBag?

> `optional` **createViewBag?**: (`request`, `response`, `proxyResponse`, `layoutServiceData`) => `Promise`\<\{\[`key`: `string`\]: `unknown`; \}\> \| \{\[`key`: `string`\]: `unknown`; \}

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:79](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L79)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:79](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L79)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

> `optional` **debug?**: `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:56](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L56)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:56](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L56)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Enables or disables proxy diagnostics in console.log (disable for production or get bad performance)

***

### layoutServiceRoute

> **layoutServiceRoute**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:33](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L33)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:33](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L33)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Path to layout service endpoint on proxy target server

***

### maxResponseSizeBytes?

> `optional` **maxResponseSizeBytes?**: `number`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:92](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L92)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:92](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L92)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Responses from the proxy greater than this size (in bytes) are rejected.

***

### onError?

<<<<<<< HEAD
> `optional` **onError**: (`error`, `response`) => `null` \| \{ `content?`: `string`; `statusCode?`: `number`; \} \| `Promise`\<\{ `content?`: `string`; `headers?`: `Record`\<`string`, `string` \| `string`[]\>; `statusCode?`: `number`; \}\>

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:58](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L58)
=======
> `optional` **onError?**: (`error`, `response`) => \{ `content?`: `string`; `statusCode?`: `number`; \} \| `Promise`\<\{ `content?`: `string`; `headers?`: `Record`\<`string`, `string` \| `string`[]\>; `statusCode?`: `number`; \}\> \| `null`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:58](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L58)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Callback when an exception is thrown during SSR; decides what to send back to client (500 errors)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |
| `response` | `IncomingMessage` |

#### Returns

`null` \| \{ `content?`: `string`; `statusCode?`: `number`; \} \| `Promise`\<\{ `content?`: `string`; `headers?`: `Record`\<`string`, `string` \| `string`[]\>; `statusCode?`: `number`; \}\>

***

### pathRewriteExcludePredicate?

> `optional` **pathRewriteExcludePredicate?**: (`originalUrl`) => `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:52](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L52)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:52](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L52)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

> `optional` **pathRewriteExcludeRoutes?**: `string`[]

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:43](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L43)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:43](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L43)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Array of paths to proxy without any SSR transformation (i.e. do not treat as app routes).
Note: exclusions are case-insensitive.
Mutually exclusive with pathRewriteExcludePredicate.

***

### proxyOptions?

> `optional` **proxyOptions?**: `LegacyOptions`\<`IncomingMessage`, `ServerResponse`\<`IncomingMessage`\>\>

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:54](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L54)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:54](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L54)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Configure `http-proxy-middleware`

***

### qsParams?

> `optional` **qsParams?**: `string`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:37](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L37)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:37](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L37)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Custom Query String parameters to send to Layout Service, e.g. sc_site=my-site&tracing=false

***

### serverBundle

> **serverBundle**: [`ServerBundle`](ServerBundle.md)

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:94](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L94)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:94](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L94)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The require'd server.bundle.js file from your pre-built JSS app

***

### setHeaders?

> `optional` **setHeaders?**: (`request`, `response`, `proxyResponse`) => `void`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:86](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L86)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:86](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L86)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

### transformSSRContent?

> `optional` **transformSSRContent?**: (`response`, `request`, `serverResponse`) => `Promise`\<`string`\>

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:73](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L73)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:73](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L73)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

> `optional` **ws?**: `boolean`

<<<<<<< HEAD
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:47](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L47)
=======
Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:47](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L47)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Turn WebSocket requests processing on or off
