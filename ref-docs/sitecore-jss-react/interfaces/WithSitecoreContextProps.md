[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / WithSitecoreContextProps

# Interface: WithSitecoreContextProps

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

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:16](https://github.com/Sitecore/jss/blob/a15efa5d093b942bf15d369c501495a2d7251cd3/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L16)

***

### sitecoreContext

> **sitecoreContext**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

#### Defined in

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:15](https://github.com/Sitecore/jss/blob/a15efa5d093b942bf15d369c501495a2d7251cd3/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L15)

***

### updateSitecoreContext?

> `optional` **updateSitecoreContext**: `false` \| (`value`) => `void`

#### Defined in

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:17](https://github.com/Sitecore/jss/blob/a15efa5d093b942bf15d369c501495a2d7251cd3/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L17)
