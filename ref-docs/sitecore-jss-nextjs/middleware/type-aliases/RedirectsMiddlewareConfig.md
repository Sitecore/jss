[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / RedirectsMiddlewareConfig

# Type Alias: RedirectsMiddlewareConfig

> **RedirectsMiddlewareConfig** = `Omit`\<`GraphQLRedirectsServiceConfig`, `"fetch"`\> & [`MiddlewareBaseConfig`](MiddlewareBaseConfig.md) & `object`

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:57](https://github.com/Sitecore/jss/blob/f0e2e06bb2f342643ad363bccbc1316fe0bceeee/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L57)

extended RedirectsMiddlewareConfig config type for RedirectsMiddleware

## Type Declaration

### locales

> **locales**: `string`[]

These are all the locales you support in your application.
These should match those in your next.config.js (i18n.locales).
