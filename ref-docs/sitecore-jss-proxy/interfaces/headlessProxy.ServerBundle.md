[@sitecore-jss/sitecore-jss-proxy](../README.md) / [headlessProxy](../modules/headlessProxy.md) / ServerBundle

# Interface: ServerBundle

[headlessProxy](../modules/headlessProxy.md).ServerBundle

Interface for the server.bundle.js file

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [apiKey](headlessProxy.ServerBundle.md#apikey)
- [appName](headlessProxy.ServerBundle.md#appname)
- [parseRouteUrl](headlessProxy.ServerBundle.md#parserouteurl)
- [renderView](headlessProxy.ServerBundle.md#renderview)
- [setUpDefaultAgents](headlessProxy.ServerBundle.md#setupdefaultagents)
- [siteName](headlessProxy.ServerBundle.md#sitename)

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[middleware/headless-ssr-proxy/ProxyConfig.ts:24](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L24)

___

### appName

• **appName**: `string`

#### Defined in

[middleware/headless-ssr-proxy/ProxyConfig.ts:22](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L22)

___

### parseRouteUrl

• **parseRouteUrl**: [`RouteUrlParser`](../README.md#routeurlparser)

#### Defined in

[middleware/headless-ssr-proxy/ProxyConfig.ts:26](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L26)

___

### renderView

• **renderView**: [`AppRenderer`](../README.md#apprenderer)

#### Defined in

[middleware/headless-ssr-proxy/ProxyConfig.ts:25](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L25)

___

### setUpDefaultAgents

• `Optional` **setUpDefaultAgents**: (`httpAgent`: `Agent`, `httpsAgent`: `Agent`) => `void`

#### Type declaration

▸ (`httpAgent`, `httpsAgent`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `httpAgent` | `Agent` |
| `httpsAgent` | `Agent` |

##### Returns

`void`

#### Defined in

[middleware/headless-ssr-proxy/ProxyConfig.ts:27](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L27)

___

### siteName

• **siteName**: `string`

#### Defined in

[middleware/headless-ssr-proxy/ProxyConfig.ts:23](https://github.com/Sitecore/jss/blob/0935408b6/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L23)
