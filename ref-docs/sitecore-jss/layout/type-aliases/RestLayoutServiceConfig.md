[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [layout](../README.md) / RestLayoutServiceConfig

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

> `optional` **dataFetcherResolver**: [`DataFetcherResolver`](DataFetcherResolver.md)

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

[packages/sitecore-jss/src/layout/rest-layout-service.ts:17](https://github.com/Sitecore/jss/blob/e846f486ba4fde6c8c1b45e6e57475c6839dad97/packages/sitecore-jss/src/layout/rest-layout-service.ts#L17)
