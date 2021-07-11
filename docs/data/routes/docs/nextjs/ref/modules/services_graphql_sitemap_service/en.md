---
name: services_graphql_sitemap_service
routeTemplate: ./data/component-templates/article.yml
title: services_graphql_sitemap_service
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / services/graphql-sitemap-service

# Module: services/graphql-sitemap-service

## Table of contents

### Classes

- [GraphQLSitemapService](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice)

### Interfaces

- [GraphQLSitemapServiceConfig](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig)

### Type aliases

- [PageListQueryResult](/docs/nextjs/ref/modules/services_graphql_sitemap_service#pagelistqueryresult)
- [StaticPath](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)

### Variables

- [languageError](/docs/nextjs/ref/modules/services_graphql_sitemap_service#languageerror)
- [queryError](/docs/nextjs/ref/modules/services_graphql_sitemap_service#queryerror)

## Type aliases

### PageListQueryResult

Ƭ **PageListQueryResult**: `Object`

The schema of data returned in response to a page list query request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `url` | `Object` |
| `url.path` | `string` |

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

## Variables

### languageError

• `Const` `Private` **languageError**: ``"The list of languages cannot be empty"``

___

### queryError

• `Const` `Private` **queryError**: ``"Valid value for rootItemId not provided and failed to auto-resolve app root item."``
