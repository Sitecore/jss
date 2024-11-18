[@sitecore-jss/sitecore-jss-proxy](../README.md) / [index](../modules/index.md) / [headlessProxy](../modules/index.headlessProxy.md) / ServerBundle

# Interface: ServerBundle

[index](../modules/index.md).[headlessProxy](../modules/index.headlessProxy.md).ServerBundle

Interface for the server.bundle.js file

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [apiKey](index.headlessProxy.ServerBundle.md#apikey)
- [appName](index.headlessProxy.ServerBundle.md#appname)
- [parseRouteUrl](index.headlessProxy.ServerBundle.md#parserouteurl)
- [renderView](index.headlessProxy.ServerBundle.md#renderview)
- [setUpDefaultAgents](index.headlessProxy.ServerBundle.md#setupdefaultagents)
- [siteName](index.headlessProxy.ServerBundle.md#sitename)

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:24](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L24)

___

### appName

• **appName**: `string`

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:22](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L22)

___

### parseRouteUrl

• **parseRouteUrl**: [`RouteUrlParser`](../modules/index.md#routeurlparser)

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:26](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L26)

___

### renderView

• **renderView**: [`AppRenderer`](../modules/index.md#apprenderer)

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:25](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L25)

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

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:27](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L27)

___

### siteName

• **siteName**: `string`

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts:23](https://github.com/Sitecore/jss/blob/da1ead189/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/ProxyConfig.ts#L23)
