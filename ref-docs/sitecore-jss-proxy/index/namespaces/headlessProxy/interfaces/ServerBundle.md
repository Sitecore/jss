[**@sitecore-jss/sitecore-jss-proxy**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../../../README.md) / [index](../../../README.md) / [headlessProxy](../README.md) / ServerBundle

# Interface: ServerBundle

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:20](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L20)

Interface for the server.bundle.js file

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:24](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L24)

***

### appName

> **appName**: `string`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:22](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L22)

***

### parseRouteUrl

> **parseRouteUrl**: [`RouteUrlParser`](../../../type-aliases/RouteUrlParser.md)

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:26](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L26)

***

### renderView

> **renderView**: [`AppRenderer`](../../../type-aliases/AppRenderer.md)

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:25](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L25)

***

### setUpDefaultAgents()?

> `optional` **setUpDefaultAgents**: (`httpAgent`, `httpsAgent`) => `void`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:27](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L27)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `httpAgent` | `Agent` |
| `httpsAgent` | `Agent` |

#### Returns

`void`

***

### siteName

> **siteName**: `string`

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:23](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L23)
