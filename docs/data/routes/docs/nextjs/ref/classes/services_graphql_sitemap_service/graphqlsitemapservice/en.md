---
name: graphqlsitemapservice
routeTemplate: ./data/component-templates/article.yml
title: graphqlsitemapservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [Exports](/docs/nextjs/ref/modules) / [services/graphql-sitemap-service](/docs/nextjs/ref/modules/services_graphql_sitemap_service) / GraphQLSitemapService

# Class: GraphQLSitemapService

[services/graphql-sitemap-service](/docs/nextjs/ref/modules/services_graphql_sitemap_service).GraphQLSitemapService

Service that fetches the list of site pages using Sitecore's GraphQL API.
This list is used for SSG and Export functionality.

**`mixes`** SearchQueryService<PageListQueryResult>

## Table of contents

### Constructors

- [constructor](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#constructor)

### Properties

- [graphQLClient](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#graphqlclient)
- [options](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#options)
- [searchService](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#searchservice)

### Accessors

- [query](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#query)

### Methods

- [fetchExportSitemap](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#fetchexportsitemap)
- [fetchSSGSitemap](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#fetchssgsitemap)
- [fetchSitemap](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#fetchsitemap)
- [getGraphQLClient](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#getgraphqlclient)
- [getSearchService](/docs/nextjs/ref/classes/services_graphql_sitemap_service/graphqlsitemapservice#getsearchservice)

## Constructors

### constructor

• **new GraphQLSitemapService**(`options`)

Creates an instance of graphQL sitemap service with the provided options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GraphQLSitemapServiceConfig`](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig) | instance |

## Properties

### graphQLClient

• `Private` **graphQLClient**: `GraphQLClient`

___

### options

• **options**: [`GraphQLSitemapServiceConfig`](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig)

___

### searchService

• `Private` **searchService**: `SearchQueryService`<[`PageListQueryResult`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#pagelistqueryresult)\>

## Accessors

### query

• `Protected` `get` **query**(): `string`

Gets the default query used for fetching the list of site pages

#### Returns

`string`

## Methods

### fetchExportSitemap

▸ **fetchExportSitemap**(`locale`): `Promise`<[`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)[]\>

Fetch sitemap which could be used for generation of static pages during `next export`.
The `locale` parameter will be used in the item query, but since i18n is not supported,
the output paths will not include a `language` property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | which application supports |

#### Returns

`Promise`<[`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)[]\>

an array of @see StaticPath objects

___

### fetchSSGSitemap

▸ **fetchSSGSitemap**(`locales`): `Promise`<[`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)[]\>

Fetch sitemap which could be used for generation of static pages using SSG mode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locales` | `string`[] | locales which application supports |

#### Returns

`Promise`<[`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)[]\>

an array of @see StaticPath objects

___

### fetchSitemap

▸ `Protected` **fetchSitemap**(`languages`, `formatStaticPath`): `Promise`<[`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)[]\>

Fetch a flat list of all pages that are descendants of the specified root item and have a
version in the specified language(s).

**`throws`** {RangeError} if the list of languages is empty.

**`throws`** {Error} if the app root was not found for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languages` | `string`[] | Fetch pages that have versions in this language(s). |
| `formatStaticPath` | (`path`: `string`[], `language`: `string`) => [`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath) | Function for transforming the raw search results into (@see StaticPath) types. |

#### Returns

`Promise`<[`StaticPath`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#staticpath)[]\>

list of pages

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
want to use something else.

#### Returns

`GraphQLClient`

implementation

___

### getSearchService

▸ `Protected` **getSearchService**(): `SearchQueryService`<[`PageListQueryResult`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#pagelistqueryresult)\>

Gets a service that can perform GraphQL "search" queries to fetch @see PageListQueryResult

#### Returns

`SearchQueryService`<[`PageListQueryResult`](/docs/nextjs/ref/modules/services_graphql_sitemap_service#pagelistqueryresult)\>

the search query service
