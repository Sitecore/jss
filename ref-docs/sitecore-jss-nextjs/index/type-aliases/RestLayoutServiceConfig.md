[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / RestLayoutServiceConfig

# Type Alias: RestLayoutServiceConfig

> **RestLayoutServiceConfig** = `object`

Defined in: sitecore-jss/types/layout/rest-layout-service.d.ts:13

## Properties

### apiHost

> **apiHost**: `string`

Defined in: sitecore-jss/types/layout/rest-layout-service.d.ts:17

Your Sitecore instance hostname that is the backend for JSS

***

### apiKey

> **apiKey**: `string`

Defined in: sitecore-jss/types/layout/rest-layout-service.d.ts:21

The Sitecore SSC API key your app uses

***

### configurationName?

> `optional` **configurationName**: `string`

Defined in: sitecore-jss/types/layout/rest-layout-service.d.ts:40

Layout Service "named" configuration

***

### dataFetcherResolver?

> `optional` **dataFetcherResolver**: `DataFetcherResolver`

Defined in: sitecore-jss/types/layout/rest-layout-service.d.ts:36

Function that handles fetching API data

***

### siteName

> **siteName**: `string`

Defined in: sitecore-jss/types/layout/rest-layout-service.d.ts:25

The JSS application name

***

### tracking?

> `optional` **tracking**: `boolean`

Defined in: sitecore-jss/types/layout/rest-layout-service.d.ts:32

Enables/disables analytics tracking for the Layout Service invocation (default is true).
More than likely, this would be set to false for SSG/hybrid implementations, and the
JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)

#### Default

```ts
true
```
