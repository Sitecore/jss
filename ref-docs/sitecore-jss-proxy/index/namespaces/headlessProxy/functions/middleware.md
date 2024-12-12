[**@sitecore-jss/sitecore-jss-proxy**](../../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-proxy](../../../../README.md) / [index](../../../README.md) / [headlessProxy](../README.md) / middleware

# Function: middleware()

> **middleware**(`renderer`, `config`, `parseRouteUrl`): `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | [`AppRenderer`](../../../type-aliases/AppRenderer.md) |  |
| `config` | [`ProxyConfig`](../interfaces/ProxyConfig.md) |  |
| `parseRouteUrl` | [`RouteUrlParser`](../../../type-aliases/RouteUrlParser.md) |  |

## Returns

`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

## Defined in

[sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts:579](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L579)
