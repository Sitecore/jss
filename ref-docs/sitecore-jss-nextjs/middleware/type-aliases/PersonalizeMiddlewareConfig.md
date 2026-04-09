[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / PersonalizeMiddlewareConfig

# Type Alias: PersonalizeMiddlewareConfig

> **PersonalizeMiddlewareConfig** = [`MiddlewareBaseConfig`](MiddlewareBaseConfig.md) & `object`

Defined in: [sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:39](https://github.com/Sitecore/jss/blob/8e5111fb559f48e10ceb0f08db83263998e91c3d/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L39)

## Type Declaration

### cdpConfig

> **cdpConfig**: `CdpServiceConfig`

Configuration for your Sitecore CDP endpoint

### edgeConfig

> **edgeConfig**: `Omit`\<`GraphQLPersonalizeServiceConfig`, `"fetch"`\>

Configuration for your Sitecore Experience Edge endpoint

### scope?

> `optional` **scope?**: `string`

Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments
