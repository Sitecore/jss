[**@sitecore-jss/sitecore-jss-proxy**](../../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-proxy](../../../../README.md) / [index](../../../README.md) / [headlessProxy](../README.md) / ProxyConfig

# Interface: ProxyConfig

## Properties

### apiHost

> **apiHost**: `string`

Hostname to proxy to (i.e. Sitecore CD server 'http://siteco.re')

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:31](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L31)

***

### apiKey

> **apiKey**: `string`

SSC endpoint to use when sending Layout Service requests to proxy

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:35](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L35)

***

### createViewBag()?

> `optional` **createViewBag**: (`request`, `response`, `proxyResponse`, `layoutServiceData`) => `Promise`\<`object`\> \| `object`

Hook to fill the SSR viewBag object; if you're customizing the viewBag in Sitecore integrated SSR mode, do the same here.

#### Parameters

• **request**: `IncomingMessage`

• **response**: `ServerResponse`\<`IncomingMessage`\>

• **proxyResponse**: `IncomingMessage`

• **layoutServiceData**: `LayoutServiceData`

#### Returns

`Promise`\<`object`\> \| `object`

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:79](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L79)

***

### debug?

> `optional` **debug**: `boolean`

Enables or disables proxy diagnostics in console.log (disable for production or get bad performance)

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:56](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L56)

***

### layoutServiceRoute

> **layoutServiceRoute**: `string`

Path to layout service endpoint on proxy target server

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:33](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L33)

***

### maxResponseSizeBytes?

> `optional` **maxResponseSizeBytes**: `number`

Responses from the proxy greater than this size (in bytes) are rejected.

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:92](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L92)

***

### onError()?

> `optional` **onError**: (`error`, `response`) => `null` \| `object` \| `Promise`\<`object`\>

Callback when an exception is thrown during SSR; decides what to send back to client (500 errors)

#### Parameters

• **error**: `Error`

• **response**: `IncomingMessage`

#### Returns

`null` \| `object` \| `Promise`\<`object`\>

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:58](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L58)

***

### pathRewriteExcludePredicate()?

> `optional` **pathRewriteExcludePredicate**: (`originalUrl`) => `boolean`

Function to determine if a given URL should be SSRed (return true), or passed through (return false)
Mutually exclusive with pathRewriteExcludeRoutes.

#### Parameters

• **originalUrl**: `string`

#### Returns

`boolean`

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:52](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L52)

***

### pathRewriteExcludeRoutes?

> `optional` **pathRewriteExcludeRoutes**: `string`[]

Array of paths to proxy without any SSR transformation (i.e. do not treat as app routes).
Note: exclusions are case-insensitive.
Mutually exclusive with pathRewriteExcludePredicate.

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:43](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L43)

***

### proxyOptions?

> `optional` **proxyOptions**: `Options`

Configure `http-proxy-middleware`

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:54](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L54)

***

### qsParams?

> `optional` **qsParams**: `string`

Custom Query String parameters to send to Layout Service, e.g. sc_site=my-site&tracing=false

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:37](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L37)

***

### serverBundle

> **serverBundle**: [`ServerBundle`](ServerBundle.md)

The require'd server.bundle.js file from your pre-built JSS app

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:94](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L94)

***

### setHeaders()?

> `optional` **setHeaders**: (`request`, `response`, `proxyResponse`) => `void`

Hook to alter HTTP headers in a custom way.

#### Parameters

• **request**: `IncomingMessage`

• **response**: `ServerResponse`\<`IncomingMessage`\>

• **proxyResponse**: `IncomingMessage`

#### Returns

`void`

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:86](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L86)

***

### transformSSRContent()?

> `optional` **transformSSRContent**: (`response`, `request`, `serverResponse`) => `Promise`\<`string`\>

Enables transforming SSR'ed HTML after it is rendered, i.e. to replace paths.

#### Parameters

• **response**: [`RenderResponse`](../../../interfaces/RenderResponse.md)

• **request**: `IncomingMessage`

• **serverResponse**: `ServerResponse`\<`IncomingMessage`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:73](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L73)

***

### ws?

> `optional` **ws**: `boolean`

Turn WebSocket requests processing on or off

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:47](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L47)
