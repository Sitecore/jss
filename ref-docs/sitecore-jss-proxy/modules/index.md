[@sitecore-jss/sitecore-jss-proxy](../README.md) / index

# Module: index

## Table of contents

### References

- [PersonalizeConfig](index.md#personalizeconfig)
- [PersonalizeHelper](index.md#personalizehelper)

### Namespaces

- [headlessProxy](index.headlessProxy.md)

### Interfaces

- [RenderResponse](../interfaces/index.RenderResponse.md)

### Type Aliases

- [AppRenderer](index.md#apprenderer)
- [RouteUrlParser](index.md#routeurlparser)

### Variables

- [GRAPHQL\_LAYOUT\_QUERY\_NAME](index.md#graphql_layout_query_name)

### Functions

- [editingRouter](index.md#editingrouter)
- [healthCheck](index.md#healthcheck)

## References

### PersonalizeConfig

Re-exports [PersonalizeConfig](personalize.md#personalizeconfig)

___

### PersonalizeHelper

Re-exports [PersonalizeHelper](../classes/personalize.PersonalizeHelper.md)

## Type Aliases

### AppRenderer

Ƭ **AppRenderer**: (`callback`: (`error`: `Error` \| ``null``, `result`: [`RenderResponse`](../interfaces/index.RenderResponse.md) \| ``null``) => `void`, `path`: `string`, `data`: `LayoutServiceData`, `viewBag`: \{ `[key: string]`: `unknown`; `dictionary`: `DictionaryPhrases`  }) => `void`

#### Type declaration

▸ (`callback`, `path`, `data`, `viewBag`): `void`

AppRenderer is a function that renders a JSS app's markup for a given route and data.

##### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error` \| ``null``, `result`: [`RenderResponse`](../interfaces/index.RenderResponse.md) \| ``null``) => `void` |
| `path` | `string` |
| `data` | `LayoutServiceData` |
| `viewBag` | `Object` |
| `viewBag.dictionary` | `DictionaryPhrases` |

##### Returns

`void`

#### Defined in

[sitecore-jss-proxy/src/types/AppRenderer.ts:26](https://github.com/Sitecore/jss/blob/3ea859f70/packages/sitecore-jss-proxy/src/types/AppRenderer.ts#L26)

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

[sitecore-jss-proxy/src/types/RouteUrlParser.ts:1](https://github.com/Sitecore/jss/blob/3ea859f70/packages/sitecore-jss-proxy/src/types/RouteUrlParser.ts#L1)

## Variables

### GRAPHQL\_LAYOUT\_QUERY\_NAME

• `Const` **GRAPHQL\_LAYOUT\_QUERY\_NAME**: ``"JssLayoutQuery"``

#### Defined in

sitecore-jss/types/layout/graphql-layout-service.d.ts:4

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

[sitecore-jss-proxy/src/middleware/editing/index.ts:97](https://github.com/Sitecore/jss/blob/3ea859f70/packages/sitecore-jss-proxy/src/middleware/editing/index.ts#L97)

___

### healthCheck

▸ **healthCheck**(): `Router`

Creates a router for health check requests.

#### Returns

`Router`

Editing router

#### Defined in

[sitecore-jss-proxy/src/middleware/healthcheck/index.ts:7](https://github.com/Sitecore/jss/blob/3ea859f70/packages/sitecore-jss-proxy/src/middleware/healthcheck/index.ts#L7)
