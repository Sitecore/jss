[@sitecore-jss/sitecore-jss-proxy](../README.md) / [index](index.md) / headlessProxy

# Namespace: headlessProxy

[index](index.md).headlessProxy

## Table of contents

### Interfaces

- [ProxyConfig](../interfaces/index.headlessProxy.ProxyConfig.md)
- [ServerBundle](../interfaces/index.headlessProxy.ServerBundle.md)

### Functions

- [middleware](index.headlessProxy.md#middleware)
- [removeEmptyAnalyticsCookie](index.headlessProxy.md#removeemptyanalyticscookie)
- [rewriteRequestPath](index.headlessProxy.md#rewriterequestpath)

## Functions

### middleware

▸ **middleware**(`renderer`, `config`, `parseRouteUrl`): `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | [`AppRenderer`](index.md#apprenderer) |
| `config` | [`ProxyConfig`](../interfaces/index.headlessProxy.ProxyConfig.md) |
| `parseRouteUrl` | [`RouteUrlParser`](index.md#routeurlparser) |

#### Returns

`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts:579](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L579)

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

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts:23](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L23)

___

### rewriteRequestPath

▸ **rewriteRequestPath**(`reqPath`, `req`, `config`, `parseRouteUrl?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reqPath` | `string` |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `config` | [`ProxyConfig`](../interfaces/index.headlessProxy.ProxyConfig.md) |
| `parseRouteUrl?` | [`RouteUrlParser`](index.md#routeurlparser) |

#### Returns

`string`

#### Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts:349](https://github.com/Sitecore/jss/blob/61a0c5a54/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L349)
