[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / WithSitecoreContextProps

# Interface: WithSitecoreContextProps

Defined in: sitecore-jss-react/types/enhancers/withSitecoreContext.d.ts:7

## Properties

### api?

> `optional` **api**: `object`

Defined in: sitecore-jss-react/types/enhancers/withSitecoreContext.d.ts:9

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

Defined in: sitecore-jss-react/types/enhancers/withSitecoreContext.d.ts:8

***

### updateSitecoreContext?

> `optional` **updateSitecoreContext**: `false` \| (`value`) => `void`

Defined in: sitecore-jss-react/types/enhancers/withSitecoreContext.d.ts:10
