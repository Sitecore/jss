[**@sitecore-jss/sitecore-jss-proxy**](../../../../README.md)

***

[@sitecore-jss/sitecore-jss-proxy](../../../../README.md) / [index](../../../README.md) / [headlessProxy](../README.md) / middleware

# Function: middleware()

> **middleware**(`renderer`, `config`, `parseRouteUrl`): `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

Defined in: [sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts:583](https://github.com/Sitecore/jss/blob/12a6bb3449a4dad9e272b703f7c6e3d52762b05e/packages/sitecore-jss-proxy/src/middleware/headless-ssr-proxy/index.ts#L583)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `renderer` | [`AppRenderer`](../../../type-aliases/AppRenderer.md) |  |
| `config` | [`ProxyConfig`](../interfaces/ProxyConfig.md) |  |
| `parseRouteUrl` | [`RouteUrlParser`](../../../type-aliases/RouteUrlParser.md) |  |

## Returns

`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]
