[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / SitecoreContextState

# Interface: SitecoreContextState

## Properties

### api?

> `optional` **api**: `object`

#### edge?

> `optional` **edge**: `object`

Sitecore XM Cloud Edge endpoint credentials for Sitecore connection.

#### edge.contextId

> **contextId**: `string`

A unified identifier used to connect and retrieve data from XM Cloud instance

#### edge.edgeUrl?

> `optional` **edgeUrl**: `string`

XM Cloud endpoint that the app will communicate and retrieve data from

##### Default

```ts
https://edge-platform.sitecorecloud.io
```

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:33

***

### context

> **context**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:32

***

### setContext()

> **setContext**: (`value`) => `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`LayoutServiceData`](LayoutServiceData.md) \| [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md) |

#### Returns

`void`

#### Defined in

sitecore-jss-react/types/components/SitecoreContext.d.ts:31
