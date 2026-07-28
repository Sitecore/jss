[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [middleware](../README.md) / RedirectsMiddlewareConfig

# Type Alias: RedirectsMiddlewareConfig

> **RedirectsMiddlewareConfig** = `Omit`\<`GraphQLRedirectsServiceConfig`, `"fetch"`\> & [`MiddlewareBaseConfig`](MiddlewareBaseConfig.md) & `object`

Defined in: [sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:57](https://github.com/Sitecore/jss/blob/f4957d5c6e983a3410c0b93729730736470f6107/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L57)

extended RedirectsMiddlewareConfig config type for RedirectsMiddleware

## Type Declaration

### locales

> **locales**: `string`[]

These are all the locales you support in your application.
These should match those in your next.config.js (i18n.locales).
