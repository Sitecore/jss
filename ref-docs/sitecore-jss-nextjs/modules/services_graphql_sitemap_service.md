[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / services/graphql-sitemap-service

# Module: services/graphql-sitemap-service

## Table of contents

### Classes

- [GraphQLSitemapService](../classes/services_graphql_sitemap_service.GraphQLSitemapService.md)

### Interfaces

- [GraphQLSitemapServiceConfig](../interfaces/services_graphql_sitemap_service.GraphQLSitemapServiceConfig.md)

### Type aliases

- [PageListQueryResult](services_graphql_sitemap_service.md#pagelistqueryresult)
- [StaticPath](services_graphql_sitemap_service.md#staticpath)

### Variables

- [languageError](services_graphql_sitemap_service.md#languageerror)
- [queryError](services_graphql_sitemap_service.md#queryerror)

## Type aliases

### PageListQueryResult

Ƭ **PageListQueryResult**: `Object`

The schema of data returned in response to a page list query request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `url` | `Object` |
| `url.path` | `string` |

#### Defined in

[src/services/graphql-sitemap-service.ts:54](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L54)

___

### StaticPath

Ƭ **StaticPath**: `Object`

Object model of a site page item.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `locale?` | `string` |
| `params` | `Object` |
| `params.path` | `string`[] |

#### Defined in

[src/services/graphql-sitemap-service.ts:59](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L59)

## Variables

### languageError

• `Const` `Private` **languageError**: ``"The list of languages cannot be empty"``

#### Defined in

[src/services/graphql-sitemap-service.ts:15](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L15)

___

### queryError

• `Const` `Private` **queryError**: ``"Valid value for rootItemId not provided and failed to auto-resolve app root item."``

#### Defined in

[src/services/graphql-sitemap-service.ts:11](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L11)
