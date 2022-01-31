@sitecore-jss/sitecore-jss-proxy

# @sitecore-jss/sitecore-jss-proxy

## Table of contents

### Interfaces

- [ProxyIncomingMessage](interfaces/ProxyIncomingMessage.md)

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
| `config` | `ProxyConfig` |
| `parseRouteUrl` | `RouteUrlParser` |

#### Returns

`NextHandleFunction`

#### Defined in

[src/index.ts:568](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-proxy/src/index.ts#L568)

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

[src/index.ts:32](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-proxy/src/index.ts#L32)

___

### rewriteRequestPath

▸ **rewriteRequestPath**(`reqPath`, `req`, `config`, `parseRouteUrl?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reqPath` | `string` |
| `req` | `IncomingMessage` |
| `config` | `ProxyConfig` |
| `parseRouteUrl?` | `RouteUrlParser` |

#### Returns

`string`

#### Defined in

[src/index.ts:351](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-proxy/src/index.ts#L351)
