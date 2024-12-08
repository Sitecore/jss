[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / RestLayoutServiceConfig

# Type Alias: RestLayoutServiceConfig

> **RestLayoutServiceConfig**: `object`

## Type declaration

### apiHost

> **apiHost**: `string`

Your Sitecore instance hostname that is the backend for JSS

### apiKey

> **apiKey**: `string`

The Sitecore SSC API key your app uses

### configurationName?

> `optional` **configurationName**: `string`

Layout Service "named" configuration

### dataFetcherResolver?

> `optional` **dataFetcherResolver**: `DataFetcherResolver`

Function that handles fetching API data

### siteName

> **siteName**: `string`

The JSS application name

### tracking?

> `optional` **tracking**: `boolean`

Enables/disables analytics tracking for the Layout Service invocation (default is true).
More than likely, this would be set to false for SSG/hybrid implementations, and the
JSS tracker would instead be used on the client-side: [https://jss.sitecore.com/docs/fundamentals/services/tracking](https://jss.sitecore.com/docs/fundamentals/services/tracking)

#### Default

```ts
true
```

## Defined in

sitecore-jss/types/layout/rest-layout-service.d.ts:13
