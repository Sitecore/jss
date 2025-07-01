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

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:16](https://github.com/Sitecore/jss/blob/ba5495930712b15bb99b05d41785a26aa9a7a604/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L16)

***

### sitecoreContext

> **sitecoreContext**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

#### Defined in

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:15](https://github.com/Sitecore/jss/blob/ba5495930712b15bb99b05d41785a26aa9a7a604/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L15)

***

### updateSitecoreContext?

> `optional` **updateSitecoreContext**: `false` \| (`value`) => `void`

#### Defined in

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:17](https://github.com/Sitecore/jss/blob/ba5495930712b15bb99b05d41785a26aa9a7a604/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L17)
