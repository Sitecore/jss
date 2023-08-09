[@sitecore-jss/sitecore-jss-nextjs](../README.md) / middleware

# Module: middleware

## Table of contents

### References

- [debug](middleware.md#debug)

### Classes

- [MultisiteMiddleware](../classes/middleware.MultisiteMiddleware.md)
- [PersonalizeMiddleware](../classes/middleware.PersonalizeMiddleware.md)
- [RedirectsMiddleware](../classes/middleware.RedirectsMiddleware.md)

### Type Aliases

- [MultisiteMiddlewareConfig](middleware.md#multisitemiddlewareconfig)
- [PersonalizeMiddlewareConfig](middleware.md#personalizemiddlewareconfig)
- [RedirectsMiddlewareConfig](middleware.md#redirectsmiddlewareconfig)

## References

### debug

Re-exports [debug](index.md#debug)

## Type Aliases

### MultisiteMiddlewareConfig

Ƭ **MultisiteMiddlewareConfig**: `Omit`<`MiddlewareBaseConfig`, ``"disabled"``\> & { `useCookieResolution?`: (`req`: `NextRequest`) => `boolean`  }

#### Defined in

[sitecore-jss-nextjs/src/middleware/multisite-middleware.ts:6](https://github.com/Sitecore/jss/blob/64e3c2dd6/packages/sitecore-jss-nextjs/src/middleware/multisite-middleware.ts#L6)

___

### PersonalizeMiddlewareConfig

Ƭ **PersonalizeMiddlewareConfig**: `MiddlewareBaseConfig` & { `cdpConfig`: `Omit`<`CdpServiceConfig`, ``"dataFetcherResolver"``\> ; `edgeConfig`: `Omit`<`GraphQLPersonalizeServiceConfig`, ``"fetch"``\> ; `getPointOfSale?`: (`site`: [`SiteInfo`](index.md#siteinfo), `language`: `string`) => `string`  }

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:15](https://github.com/Sitecore/jss/blob/64e3c2dd6/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L15)

___

### RedirectsMiddlewareConfig

Ƭ **RedirectsMiddlewareConfig**: `Omit`<`GraphQLRedirectsServiceConfig`, ``"fetch"``\> & `MiddlewareBaseConfig` & { `locales`: `string`[]  }

extended RedirectsMiddlewareConfig config type for RedirectsMiddleware

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:20](https://github.com/Sitecore/jss/blob/64e3c2dd6/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L20)
