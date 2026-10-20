[**@sitecore-jss/sitecore-jss-proxy**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../../../README.md) / [headlessProxy](../README.md) / middleware

# Function: middleware()

> **middleware**(`renderer`, `config`, `parseRouteUrl`): `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts:583](https://github.com/Sitecore/jss/blob/217ee09e2bb877a0daa2bea2caf7b49d38f600a5/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L583)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | [`AppRenderer`](../../../../type-aliases/AppRenderer.md) | - |
| `config` | [`ProxyConfig`](../interfaces/ProxyConfig.md) | - |
| `parseRouteUrl` | [`RouteUrlParser`](../../../../type-aliases/RouteUrlParser.md) | - |

## Returns

`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]
