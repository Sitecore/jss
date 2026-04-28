[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / RestLayoutServiceConfig

# Type Alias: RestLayoutServiceConfig

> **RestLayoutServiceConfig** = `object`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:21](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/layout/rest-layout-service.ts#L21)
=======
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:21](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/layout/rest-layout-service.ts#L21)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Properties

### apiHost

> **apiHost**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:25](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/layout/rest-layout-service.ts#L25)
=======
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:25](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/layout/rest-layout-service.ts#L25)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Your Sitecore instance hostname that is the backend for JSS

***

### apiKey

> **apiKey**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:29](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/layout/rest-layout-service.ts#L29)
=======
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:29](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/layout/rest-layout-service.ts#L29)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The Sitecore SSC API key your app uses

***

### configurationName?

> `optional` **configurationName?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:49](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/layout/rest-layout-service.ts#L49)
=======
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:49](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/layout/rest-layout-service.ts#L49)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Layout Service "named" configuration

***

### dataFetcherResolver?

> `optional` **dataFetcherResolver?**: [`DataFetcherResolver`](DataFetcherResolver.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:44](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/layout/rest-layout-service.ts#L44)
=======
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:44](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/layout/rest-layout-service.ts#L44)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Function that handles fetching API data

***

### siteName

> **siteName**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:33](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/layout/rest-layout-service.ts#L33)
=======
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:33](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/layout/rest-layout-service.ts#L33)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The JSS application name

***

### tracking?

> `optional` **tracking?**: `boolean`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:40](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/layout/rest-layout-service.ts#L40)
=======
Defined in: [packages/sitecore-jss/src/layout/rest-layout-service.ts:40](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/layout/rest-layout-service.ts#L40)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Enables/disables analytics tracking for the Layout Service invocation (default is true).
More than likely, this would be set to false for SSG/hybrid implementations, and the
JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)

#### Default

```ts
true
```
