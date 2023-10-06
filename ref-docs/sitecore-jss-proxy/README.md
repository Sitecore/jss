@sitecore-jss/sitecore-jss-proxy

# @sitecore-jss/sitecore-jss-proxy

## Table of contents

### Interfaces

- [ProxyConfig](interfaces/ProxyConfig.md)
- [ProxyIncomingMessage](interfaces/ProxyIncomingMessage.md)
- [ServerBundle](interfaces/ServerBundle.md)

### Functions

- [default](README.md#default)
- [removeEmptyAnalyticsCookie](README.md#removeemptyanalyticscookie)
- [rewriteRequestPath](README.md#rewriterequestpath)

## Functions

### default

▸ **default**(`renderer`, `config`, `parseRouteUrl`): `RequestHandler`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | `AppRenderer` |
| `config` | [`ProxyConfig`](interfaces/ProxyConfig.md) |
| `parseRouteUrl` | `RouteUrlParser` |

#### Returns

`RequestHandler`

#### Defined in

[src/index.ts:580](https://github.com/Sitecore/jss/blob/e9a41c500/packages/sitecore-jss-proxy/src/index.ts#L580)

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

[src/index.ts:34](https://github.com/Sitecore/jss/blob/e9a41c500/packages/sitecore-jss-proxy/src/index.ts#L34)

___

### rewriteRequestPath

▸ **rewriteRequestPath**(`reqPath`, `req`, `config`, `parseRouteUrl?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reqPath` | `string` |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `config` | [`ProxyConfig`](interfaces/ProxyConfig.md) |
| `parseRouteUrl?` | `RouteUrlParser` |

#### Returns

`string`

#### Defined in

[src/index.ts:360](https://github.com/Sitecore/jss/blob/e9a41c500/packages/sitecore-jss-proxy/src/index.ts#L360)
