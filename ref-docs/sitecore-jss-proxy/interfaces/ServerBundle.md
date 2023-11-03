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

## Properties

### apiKey

• **apiKey**: `string`

#### Defined in

[ProxyConfig.ts:23](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L23)

---

### appName

• **appName**: `string`

#### Defined in

[ProxyConfig.ts:22](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L22)

---

### parseRouteUrl

• **parseRouteUrl**: `RouteUrlParser`

#### Defined in

[ProxyConfig.ts:25](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L25)

---

### renderView

• **renderView**: `AppRenderer`

#### Defined in

[ProxyConfig.ts:24](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L24)

---

### setUpDefaultAgents

• `Optional` **setUpDefaultAgents**: (`httpAgent`: `Agent`, `httpsAgent`: `Agent`) => `void`

#### Type declaration

▸ (`httpAgent`, `httpsAgent`): `void`

##### Parameters

| Name         | Type    |
| :----------- | :------ |
| `httpAgent`  | `Agent` |
| `httpsAgent` | `Agent` |

##### Returns

`void`

#### Defined in

[ProxyConfig.ts:26](https://github.com/Sitecore/jss/blob/0b8b1fca9/packages/sitecore-jss-proxy/src/ProxyConfig.ts#L26)
