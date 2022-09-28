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

▸ **default**(`renderer`, `config`, `parseRouteUrl`): `NextHandleFunction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | `AppRenderer` |
| `config` | [`ProxyConfig`](interfaces/ProxyConfig.md) |
| `parseRouteUrl` | `RouteUrlParser` |

#### Returns

`NextHandleFunction`

#### Defined in

[src/index.ts:575](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/index.ts#L575)

___

### removeEmptyAnalyticsCookie

▸ `Const` **removeEmptyAnalyticsCookie**(`proxyResponse`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyResponse` | `IncomingMessage` |

#### Returns

`void`

#### Defined in

[src/index.ts:32](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/index.ts#L32)

___

### rewriteRequestPath

▸ **rewriteRequestPath**(`reqPath`, `req`, `config`, `parseRouteUrl?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reqPath` | `string` |
| `req` | `IncomingMessage` |
| `config` | [`ProxyConfig`](interfaces/ProxyConfig.md) |
| `parseRouteUrl?` | `RouteUrlParser` |

#### Returns

`string`

#### Defined in

[src/index.ts:358](https://github.com/Sitecore/jss/blob/25c4adcb9/packages/sitecore-jss-proxy/src/index.ts#L358)
