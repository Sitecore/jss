[@sitecore-jss/sitecore-jss-proxy](../README.md) / headlessProxy

# Namespace: headlessProxy

## Table of contents

### Interfaces

- [ProxyConfig](../interfaces/headlessProxy.ProxyConfig.md)
- [ServerBundle](../interfaces/headlessProxy.ServerBundle.md)

### Functions

- [middleware](headlessProxy.md#middleware)
- [removeEmptyAnalyticsCookie](headlessProxy.md#removeemptyanalyticscookie)
- [rewriteRequestPath](headlessProxy.md#rewriterequestpath)

## Functions

### middleware

▸ **middleware**(`renderer`, `config`, `parseRouteUrl`): `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | [`AppRenderer`](../README.md#apprenderer) |
| `config` | [`ProxyConfig`](../interfaces/headlessProxy.ProxyConfig.md) |
| `parseRouteUrl` | [`RouteUrlParser`](../README.md#routeurlparser) |

#### Returns

`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

#### Defined in

[middleware/headless-ssr-proxy/index.ts:579](https://github.com/Sitecore/jss/blob/ff54a91b9/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L579)

___

### removeEmptyAnalyticsCookie

▸ **removeEmptyAnalyticsCookie**(`proxyResponse`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyResponse` | `IncomingMessage` |

#### Returns

`void`

#### Defined in

[middleware/headless-ssr-proxy/index.ts:23](https://github.com/Sitecore/jss/blob/ff54a91b9/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L23)

___

### rewriteRequestPath

▸ **rewriteRequestPath**(`reqPath`, `req`, `config`, `parseRouteUrl?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reqPath` | `string` |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `config` | [`ProxyConfig`](../interfaces/headlessProxy.ProxyConfig.md) |
| `parseRouteUrl?` | [`RouteUrlParser`](../README.md#routeurlparser) |

#### Returns

`string`

#### Defined in

[middleware/headless-ssr-proxy/index.ts:349](https://github.com/Sitecore/jss/blob/ff54a91b9/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L349)
