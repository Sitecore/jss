[@sitecore-jss/sitecore-jss-proxy](../README.md) / ProxyConfig

# Interface: ProxyConfig

## Table of contents

### Properties

- [apiHost](ProxyConfig.md#apihost)
- [apiKey](ProxyConfig.md#apikey)
- [debug](ProxyConfig.md#debug)
- [layoutServiceRoute](ProxyConfig.md#layoutserviceroute)
- [maxResponseSizeBytes](ProxyConfig.md#maxresponsesizebytes)
- [pathRewriteExcludeRoutes](ProxyConfig.md#pathrewriteexcluderoutes)
- [proxyOptions](ProxyConfig.md#proxyoptions)
- [qsParams](ProxyConfig.md#qsparams)
- [serverBundle](ProxyConfig.md#serverbundle)

### Methods

- [createViewBag](ProxyConfig.md#createviewbag)
- [onError](ProxyConfig.md#onerror)
- [pathRewriteExcludePredicate](ProxyConfig.md#pathrewriteexcludepredicate)
- [setHeaders](ProxyConfig.md#setheaders)
- [transformSSRContent](ProxyConfig.md#transformssrcontent)

## Properties

### apiHost

• **apiHost**: `string`

Hostname to proxy to (i.e. Sitecore CD server 'http://siteco.re')

#### Defined in

[src/ProxyConfig.ts:30](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L30)

___

### apiKey

• **apiKey**: `string`

SSC endpoint to use when sending Layout Service requests to proxy

#### Defined in

[src/ProxyConfig.ts:34](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L34)

___

### debug

• `Optional` **debug**: `boolean`

Enables or disables proxy diagnostics in console.log (disable for production or get bad performance)

#### Defined in

[src/ProxyConfig.ts:51](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L51)

___

### layoutServiceRoute

• **layoutServiceRoute**: `string`

Path to layout service endpoint on proxy target server

#### Defined in

[src/ProxyConfig.ts:32](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L32)

___

### maxResponseSizeBytes

• `Optional` **maxResponseSizeBytes**: `number`

Responses from the proxy greater than this size (in bytes) are rejected.

#### Defined in

[src/ProxyConfig.ts:87](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L87)

___

### pathRewriteExcludeRoutes

• `Optional` **pathRewriteExcludeRoutes**: `string`[]

Array of paths to proxy without any SSR transformation (i.e. do not treat as app routes).
Note: exclusions are case-insensitive.
Mutually exclusive with pathRewriteExcludePredicate.

#### Defined in

[src/ProxyConfig.ts:42](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L42)

___

### proxyOptions

• `Optional` **proxyOptions**: `Config`

Configure `http-proxy-middleware`

#### Defined in

[src/ProxyConfig.ts:49](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L49)

___

### qsParams

• `Optional` **qsParams**: `string`

Custom Query String parameters to send to Layout Service, e.g. sc_site=my-site&tracing=false

#### Defined in

[src/ProxyConfig.ts:36](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L36)

___

### serverBundle

• **serverBundle**: [`ServerBundle`](ServerBundle.md)

The require'd server.bundle.js file from your pre-built JSS app

#### Defined in

[src/ProxyConfig.ts:89](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L89)

## Methods

### createViewBag

▸ `Optional` **createViewBag**(`request`, `response`, `proxyResponse`, `layoutServiceData`): `Promise`<`Object`\> \| { [key: string]: `unknown`;  }

Hook to fill the SSR viewBag object; if you're customizing the viewBag in Sitecore integrated SSR mode, do the same here.

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `IncomingMessage` |
| `response` | `ServerResponse` |
| `proxyResponse` | `IncomingMessage` |
| `layoutServiceData` | `LayoutServiceData` |

#### Returns

`Promise`<`Object`\> \| { [key: string]: `unknown`;  }

#### Defined in

[src/ProxyConfig.ts:74](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L74)

___

### onError

▸ `Optional` **onError**(`error`, `response`): ``null`` \| { `content?`: `string` ; `statusCode?`: `number`  } \| `Promise`<`Object`\>

Callback when an exception is thrown during SSR; decides what to send back to client (500 errors)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `response` | `IncomingMessage` |

#### Returns

``null`` \| { `content?`: `string` ; `statusCode?`: `number`  } \| `Promise`<`Object`\>

#### Defined in

[src/ProxyConfig.ts:53](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L53)

___

### pathRewriteExcludePredicate

▸ `Optional` **pathRewriteExcludePredicate**(`originalUrl`): `boolean`

Function to determine if a given URL should be SSRed (return true), or passed through (return false)
Mutually exclusive with pathRewriteExcludeRoutes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalUrl` | `string` |

#### Returns

`boolean`

#### Defined in

[src/ProxyConfig.ts:47](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L47)

___

### setHeaders

▸ `Optional` **setHeaders**(`request`, `response`, `proxyResponse`): `void`

Hook to alter HTTP headers in a custom way.

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `IncomingMessage` |
| `response` | `ServerResponse` |
| `proxyResponse` | `IncomingMessage` |

#### Returns

`void`

#### Defined in

[src/ProxyConfig.ts:81](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L81)

___

### transformSSRContent

▸ `Optional` **transformSSRContent**(`response`, `request`, `serverResponse`): `Promise`<`string`\>

Enables transforming SSR'ed HTML after it is rendered, i.e. to replace paths.

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `RenderResponse` |
| `request` | `IncomingMessage` |
| `serverResponse` | `ServerResponse` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/ProxyConfig.ts:68](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L68)
