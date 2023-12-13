@sitecore-jss/sitecore-jss-proxy

# @sitecore-jss/sitecore-jss-proxy

## Table of contents

### Interfaces

- [ProxyConfig](interfaces/ProxyConfig.md)
- [ServerBundle](interfaces/ServerBundle.md)

### Functions

- [default](README.md#default)
- [removeEmptyAnalyticsCookie](README.md#removeemptyanalyticscookie)
- [rewriteRequestPath](README.md#rewriterequestpath)

## Functions

### default

▸ **default**(`renderer`, `config`, `parseRouteUrl`): `RequestHandler`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | `AppRenderer` |
| `config` | [`ProxyConfig`](interfaces/ProxyConfig.md) |
| `parseRouteUrl` | `RouteUrlParser` |

#### Returns

`RequestHandler`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>[]

#### Defined in

[index.ts:580](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss-proxy/src/index.ts#L580)

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

[index.ts:24](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss-proxy/src/index.ts#L24)

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

[index.ts:350](https://github.com/Sitecore/jss/blob/3eda201f7/packages/sitecore-jss-proxy/src/index.ts#L350)
