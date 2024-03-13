[@sitecore-jss/sitecore-jss-proxy](../README.md) / ServerBundle

# Interface: ServerBundle

Interface for the server.bundle.js file

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [apiKey](ServerBundle.md#apikey)
- [appName](ServerBundle.md#appname)
- [parseRouteUrl](ServerBundle.md#parserouteurl)
- [renderView](ServerBundle.md#renderview)
- [setUpDefaultAgents](ServerBundle.md#setupdefaultagents)
- [siteName](ServerBundle.md#sitename)

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[ProxyConfig.ts:24](https://github.com/Sitecore/jss/blob/833eb02df/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L24)

___

### appName

• **appName**: `string`

#### Defined in

[ProxyConfig.ts:22](https://github.com/Sitecore/jss/blob/833eb02df/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L22)

___

### parseRouteUrl

• **parseRouteUrl**: `RouteUrlParser`

#### Defined in

[ProxyConfig.ts:26](https://github.com/Sitecore/jss/blob/833eb02df/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L26)

___

### renderView

• **renderView**: `AppRenderer`

#### Defined in

[ProxyConfig.ts:25](https://github.com/Sitecore/jss/blob/833eb02df/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L25)

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

[ProxyConfig.ts:27](https://github.com/Sitecore/jss/blob/833eb02df/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L27)

___

### siteName

• **siteName**: `string`

#### Defined in

[ProxyConfig.ts:23](https://github.com/Sitecore/jss/blob/833eb02df/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L23)
