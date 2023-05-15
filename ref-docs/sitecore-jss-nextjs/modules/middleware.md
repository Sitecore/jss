[@sitecore-jss/sitecore-jss-nextjs](../README.md) / middleware

# Module: middleware

## Table of contents

### Classes

- [PersonalizeMiddleware](../classes/middleware.PersonalizeMiddleware.md)
- [RedirectsMiddleware](../classes/middleware.RedirectsMiddleware.md)

### Type aliases

- [PersonalizeMiddlewareConfig](middleware.md#personalizemiddlewareconfig)
- [RedirectsMiddlewareConfig](middleware.md#redirectsmiddlewareconfig)

## Type aliases

### PersonalizeMiddlewareConfig

Ƭ **PersonalizeMiddlewareConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cdpConfig` | `Omit`<`CdpServiceConfig`, ``"dataFetcherResolver"``\> | Configuration for your Sitecore CDP endpoint |
| `edgeConfig` | `Omit`<`GraphQLPersonalizeServiceConfig`, ``"fetch"``\> | Configuration for your Sitecore Experience Edge endpoint |
| `disabled?` | (`req?`: `NextRequest`, `res?`: `NextResponse`) => `boolean` | - |
| `excludeRoute?` | (`pathname`: `string`) => `boolean` | - |
| `getPointOfSale` | (`locale`: `string`) => `string` | - |

#### Defined in

[sitecore-jss-nextjs/src/middleware/personalize-middleware.ts:12](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/middleware/personalize-middleware.ts#L12)

___

### RedirectsMiddlewareConfig

Ƭ **RedirectsMiddlewareConfig**: `Omit`<`GraphQLRedirectsServiceConfig`, ``"fetch"``\> & { `locales`: `string`[]  }

extended RedirectsMiddlewareConfig config type for RedirectsMiddleware

#### Defined in

[sitecore-jss-nextjs/src/middleware/redirects-middleware.ts:15](https://github.com/Sitecore/jss/blob/f3aaeea83/packages/sitecore-jss-nextjs/src/middleware/redirects-middleware.ts#L15)
