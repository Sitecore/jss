[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / SitecoreContextState

# Interface: SitecoreContextState

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:33](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L33)
=======
Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:33](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L33)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### api?

> `optional` **api?**: `object`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:36](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L36)
=======
Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:36](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L36)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### edge?

> `optional` **edge?**: `object`

Sitecore XM Cloud Edge endpoint credentials for Sitecore connection.

##### edge.contextId

> **contextId**: `string`

A unified identifier used to connect and retrieve data from XM Cloud instance

##### edge.edgeUrl?

> `optional` **edgeUrl?**: `string`

XM Cloud endpoint that the app will communicate and retrieve data from

###### Default

```ts
https://edge-platform.sitecorecloud.io
```

***

### context

> **context**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:35](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L35)
=======
Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:35](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L35)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### setContext

> **setContext**: (`value`) => `void`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:34](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L34)
=======
Defined in: [packages/sitecore-jss-react/src/components/SitecoreContext.tsx:34](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/components/SitecoreContext.tsx#L34)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`LayoutServiceData`](LayoutServiceData.md) \| [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md) |

#### Returns

`void`
