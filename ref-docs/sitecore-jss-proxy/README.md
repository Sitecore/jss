@sitecore-jss/sitecore-jss-proxy

# @sitecore-jss/sitecore-jss-proxy

## Table of contents

### Namespaces

- [headlessProxy](modules/headlessProxy.md)

### Interfaces

- [RenderResponse](interfaces/RenderResponse.md)

### Type Aliases

- [AppRenderer](README.md#apprenderer)
- [RouteUrlParser](README.md#routeurlparser)

### Functions

- [editingRouter](README.md#editingrouter)
- [healthCheck](README.md#healthcheck)

## Type Aliases

### AppRenderer

Ƭ **AppRenderer**: (`callback`: (`error`: `Error` \| ``null``, `result`: [`RenderResponse`](interfaces/RenderResponse.md) \| ``null``) => `void`, `path`: `string`, `data`: `LayoutServiceData`, `viewBag`: \{ `[key: string]`: `unknown`; `dictionary`: `DictionaryPhrases`  }) => `void`

#### Type declaration

▸ (`callback`, `path`, `data`, `viewBag`): `void`

AppRenderer is a function that renders a JSS app's markup for a given route and data.

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error` \| ``null``, `result`: [`RenderResponse`](interfaces/RenderResponse.md) \| ``null``) => `void` |
| `path` | `string` |
| `data` | `LayoutServiceData` |
| `viewBag` | `Object` |
| `viewBag.dictionary` | `DictionaryPhrases` |

##### Returns

`void`

#### Defined in

[types/AppRenderer.ts:26](https://github.com/Sitecore/jss/blob/881196c17/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L26)

___

### RouteUrlParser

Ƭ **RouteUrlParser**: (`url`: `string`) => \{ `lang?`: `string` ; `qsParams?`: `string` ; `sitecoreRoute?`: `string`  }

#### Type declaration

▸ (`url`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `lang?` | `string` |
| `qsParams?` | `string` |
| `sitecoreRoute?` | `string` |

#### Defined in

[types/RouteUrlParser.ts:1](https://github.com/Sitecore/jss/blob/881196c17/packages/sitecore-jss-proxy/src/types/RouteUrlParser.ts#L1)

## Functions

### editingRouter

▸ **editingRouter**(`options`): `Router`

Creates a router for editing requests.
Supports the following routes:
- <routerPath>/render (GET) - renders a route
- <routerPath>/config (GET) - returns the current application configuration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `EditingRouterConfig` | Editing router configuration |

#### Returns

`Router`

Editing router

#### Defined in

[middleware/editing/index.ts:97](https://github.com/Sitecore/jss/blob/881196c17/packages/sitecore-jss-proxy/src/middleware/editing/index.ts#L97)

___

### healthCheck

▸ **healthCheck**(): `Router`

Creates a router for health check requests.

#### Returns

`Router`

Editing router

#### Defined in

[middleware/healthcheck/index.ts:7](https://github.com/Sitecore/jss/blob/881196c17/packages/sitecore-jss-proxy/src/middleware/healthcheck/index.ts#L7)
