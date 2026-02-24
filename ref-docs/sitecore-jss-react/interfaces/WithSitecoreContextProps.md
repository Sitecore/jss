[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / WithSitecoreContextProps

# Interface: WithSitecoreContextProps

Defined in: [packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:14](https://github.com/Sitecore/jss/blob/599f0e6b512d3f0cc854ae617d0fb9161e8e024b/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L14)

## Properties

### api?

> `optional` **api**: `object`

Defined in: [packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:16](https://github.com/Sitecore/jss/blob/599f0e6b512d3f0cc854ae617d0fb9161e8e024b/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L16)

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

### sitecoreContext

> **sitecoreContext**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

Defined in: [packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:15](https://github.com/Sitecore/jss/blob/599f0e6b512d3f0cc854ae617d0fb9161e8e024b/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L15)

***

### updateSitecoreContext?

> `optional` **updateSitecoreContext**: `false` \| (`value`) => `void`

Defined in: [packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:17](https://github.com/Sitecore/jss/blob/599f0e6b512d3f0cc854ae617d0fb9161e8e024b/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L17)
