[@sitecore-jss/sitecore-jss-proxy](../README.md) / ProxyConfig

# Interface: ProxyConfig

## Table of contents

### Properties

- [apiHost](ProxyConfig.md#apihost)
- [apiKey](ProxyConfig.md#apikey)
- [createViewBag](ProxyConfig.md#createviewbag)
- [debug](ProxyConfig.md#debug)
- [layoutServiceRoute](ProxyConfig.md#layoutserviceroute)
- [maxResponseSizeBytes](ProxyConfig.md#maxresponsesizebytes)
- [onError](ProxyConfig.md#onerror)
- [pathRewriteExcludePredicate](ProxyConfig.md#pathrewriteexcludepredicate)
- [pathRewriteExcludeRoutes](ProxyConfig.md#pathrewriteexcluderoutes)
- [proxyOptions](ProxyConfig.md#proxyoptions)
- [qsParams](ProxyConfig.md#qsparams)
- [serverBundle](ProxyConfig.md#serverbundle)
- [setHeaders](ProxyConfig.md#setheaders)
- [transformSSRContent](ProxyConfig.md#transformssrcontent)
- [ws](ProxyConfig.md#ws)

## Properties

### apiHost

• **apiHost**: `string`

Hostname to proxy to (i.e. Sitecore CD server 'http://siteco.re')

#### Defined in

[ProxyConfig.ts:31](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L31)

___

### apiKey

• **apiKey**: `string`

SSC endpoint to use when sending Layout Service requests to proxy

#### Defined in

[ProxyConfig.ts:35](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L35)

___

### createViewBag

• `Optional` **createViewBag**: (`request`: `IncomingMessage`, `response`: `ServerResponse`<`IncomingMessage`\>, `proxyResponse`: `IncomingMessage`, `layoutServiceData`: `LayoutServiceData`) => `Promise`<{ `[key: string]`: `unknown`;  }\> \| { `[key: string]`: `unknown`;  }

#### Type declaration

▸ (`request`, `response`, `proxyResponse`, `layoutServiceData`): `Promise`<{ `[key: string]`: `unknown`;  }\> \| { `[key: string]`: `unknown`;  }

Hook to fill the SSR viewBag object; if you're customizing the viewBag in Sitecore integrated SSR mode, do the same here.

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `IncomingMessage` |
| `response` | `ServerResponse`<`IncomingMessage`\> |
| `proxyResponse` | `IncomingMessage` |
| `layoutServiceData` | `LayoutServiceData` |

##### Returns

`Promise`<{ `[key: string]`: `unknown`;  }\> \| { `[key: string]`: `unknown`;  }

#### Defined in

[ProxyConfig.ts:79](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L79)

___

### debug

• `Optional` **debug**: `boolean`

Enables or disables proxy diagnostics in console.log (disable for production or get bad performance)

#### Defined in

[ProxyConfig.ts:56](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L56)

___

### layoutServiceRoute

• **layoutServiceRoute**: `string`

Path to layout service endpoint on proxy target server

#### Defined in

[ProxyConfig.ts:33](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L33)

___

### maxResponseSizeBytes

• `Optional` **maxResponseSizeBytes**: `number`

Responses from the proxy greater than this size (in bytes) are rejected.

#### Defined in

[ProxyConfig.ts:92](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L92)

___

### onError

• `Optional` **onError**: (`error`: `Error`, `response`: `IncomingMessage`) => ``null`` \| { `content?`: `string` ; `statusCode?`: `number`  } \| `Promise`<{ `content?`: `string` ; `headers?`: `Record`<`string`, `string` \| `string`[]\> ; `statusCode?`: `number`  }\>

#### Type declaration

▸ (`error`, `response`): ``null`` \| { `content?`: `string` ; `statusCode?`: `number`  } \| `Promise`<{ `content?`: `string` ; `headers?`: `Record`<`string`, `string` \| `string`[]\> ; `statusCode?`: `number`  }\>

Callback when an exception is thrown during SSR; decides what to send back to client (500 errors)

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `response` | `IncomingMessage` |

##### Returns

``null`` \| { `content?`: `string` ; `statusCode?`: `number`  } \| `Promise`<{ `content?`: `string` ; `headers?`: `Record`<`string`, `string` \| `string`[]\> ; `statusCode?`: `number`  }\>

#### Defined in

[ProxyConfig.ts:58](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L58)

___

### pathRewriteExcludePredicate

• `Optional` **pathRewriteExcludePredicate**: (`originalUrl`: `string`) => `boolean`

#### Type declaration

▸ (`originalUrl`): `boolean`

Function to determine if a given URL should be SSRed (return true), or passed through (return false)
Mutually exclusive with pathRewriteExcludeRoutes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `originalUrl` | `string` |

##### Returns

`boolean`

#### Defined in

[ProxyConfig.ts:52](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L52)

___

### pathRewriteExcludeRoutes

• `Optional` **pathRewriteExcludeRoutes**: `string`[]

Array of paths to proxy without any SSR transformation (i.e. do not treat as app routes).
Note: exclusions are case-insensitive.
Mutually exclusive with pathRewriteExcludePredicate.

#### Defined in

[ProxyConfig.ts:43](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L43)

___

### proxyOptions

• `Optional` **proxyOptions**: `Options`

Configure `http-proxy-middleware`

#### Defined in

[ProxyConfig.ts:54](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L54)

___

### qsParams

• `Optional` **qsParams**: `string`

Custom Query String parameters to send to Layout Service, e.g. sc_site=my-site&tracing=false

#### Defined in

[ProxyConfig.ts:37](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L37)

___

### serverBundle

• **serverBundle**: [`ServerBundle`](ServerBundle.md)

The require'd server.bundle.js file from your pre-built JSS app

#### Defined in

[ProxyConfig.ts:94](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L94)

___

### setHeaders

• `Optional` **setHeaders**: (`request`: `IncomingMessage`, `response`: `ServerResponse`<`IncomingMessage`\>, `proxyResponse`: `IncomingMessage`) => `void`

#### Type declaration

▸ (`request`, `response`, `proxyResponse`): `void`

Hook to alter HTTP headers in a custom way.

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `IncomingMessage` |
| `response` | `ServerResponse`<`IncomingMessage`\> |
| `proxyResponse` | `IncomingMessage` |

##### Returns

`void`

#### Defined in

[ProxyConfig.ts:86](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L86)

___

### transformSSRContent

• `Optional` **transformSSRContent**: (`response`: `RenderResponse`, `request`: `IncomingMessage`, `serverResponse`: `ServerResponse`<`IncomingMessage`\>) => `Promise`<`string`\>

#### Type declaration

▸ (`response`, `request`, `serverResponse`): `Promise`<`string`\>

Enables transforming SSR'ed HTML after it is rendered, i.e. to replace paths.

##### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `RenderResponse` |
| `request` | `IncomingMessage` |
| `serverResponse` | `ServerResponse`<`IncomingMessage`\> |

##### Returns

`Promise`<`string`\>

#### Defined in

[ProxyConfig.ts:73](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L73)

___

### ws

• `Optional` **ws**: `boolean`

Turn WebSocket requests processing on or off

#### Defined in

[ProxyConfig.ts:47](https://github.com/Sitecore/jss/blob/417cf381b/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L47)
