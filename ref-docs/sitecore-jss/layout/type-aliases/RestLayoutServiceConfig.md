[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / RestLayoutServiceConfig

# Type Alias: RestLayoutServiceConfig

> **RestLayoutServiceConfig** = `object`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:21](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss/src/layout/rest-layout-service.ts#L21)

## Properties

### apiHost

> **apiHost**: `string`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:25](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss/src/layout/rest-layout-service.ts#L25)

Your Sitecore instance hostname that is the backend for JSS

***

### apiKey

> **apiKey**: `string`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:29](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss/src/layout/rest-layout-service.ts#L29)

The Sitecore SSC API key your app uses

***

### configurationName?

> `optional` **configurationName**: `string`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:49](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss/src/layout/rest-layout-service.ts#L49)

Layout Service "named" configuration

***

### dataFetcherResolver?

> `optional` **dataFetcherResolver**: [`DataFetcherResolver`](DataFetcherResolver.md)

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:44](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss/src/layout/rest-layout-service.ts#L44)

Function that handles fetching API data

***

### siteName

> **siteName**: `string`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:33](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss/src/layout/rest-layout-service.ts#L33)

The JSS application name

***

### tracking?

> `optional` **tracking**: `boolean`

Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:40](https://github.com/Sitecore/jss/blob/7850a950628417dc324c206dda9373199373a925/packages/sitecore-jss/src/layout/rest-layout-service.ts#L40)

Enables/disables analytics tracking for the Layout Service invocation (default is true).
More than likely, this would be set to false for SSG/hybrid implementations, and the
JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)

#### Default

```ts
true
```
