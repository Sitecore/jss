[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / SitecoreContextState

# Interface: SitecoreContextState

Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:33](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L33)

## Properties

### api?

> `optional` **api**: `object`

Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:36](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L36)

#### edge?

> `optional` **edge**: `object`

Sitecore XM Cloud Edge endpoint credentials for Sitecore connection.

##### edge.contextId

> **contextId**: `string`

A unified identifier used to connect and retrieve data from XM Cloud instance

##### edge.edgeUrl?

> `optional` **edgeUrl**: `string`

XM Cloud endpoint that the app will communicate and retrieve data from

###### Default

```ts
https://edge-platform.sitecorecloud.io
```

***

### context

> **context**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:35](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L35)

***

### setContext()

> **setContext**: (`value`) => `void`

Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:34](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L34)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`LayoutServiceData`](LayoutServiceData.md) \| [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md) |

#### Returns

`void`
