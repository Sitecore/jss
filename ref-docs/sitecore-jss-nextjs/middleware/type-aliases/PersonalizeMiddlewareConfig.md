[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / PersonalizeMiddlewareConfig

# Type Alias: PersonalizeMiddlewareConfig

> **PersonalizeMiddlewareConfig**: [`MiddlewareBaseConfig`](MiddlewareBaseConfig.md) & `object`

## Type declaration

### cdpConfig

> **cdpConfig**: `CdpServiceConfig`

Configuration for your Sitecore CDP endpoint

### edgeConfig

> **edgeConfig**: `Omit`\<`GraphQLPersonalizeServiceConfig`, `"fetch"`\>

Configuration for your Sitecore Experience Edge endpoint

### scope?

> `optional` **scope**: `string`

Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments

## Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:39](https://github.com/Sitecore/jss/blob/3399500f695e00432c0b3d5ffc5aedbd18b30146/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L39)
