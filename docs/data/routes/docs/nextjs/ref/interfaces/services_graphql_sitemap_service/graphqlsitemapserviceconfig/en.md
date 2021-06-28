---
name: graphqlsitemapserviceconfig
routeTemplate: ./data/component-templates/article.yml
title: graphqlsitemapserviceconfig
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [services/graphql-sitemap-service](/docs/nextjs/ref/modules/services_graphql_sitemap_service) / GraphQLSitemapServiceConfig

# Interface: GraphQLSitemapServiceConfig

[services/graphql-sitemap-service](/docs/nextjs/ref/modules/services_graphql_sitemap_service).GraphQLSitemapServiceConfig

Configuration options for @see GraphQLSitemapService instances

## Hierarchy

- `SearchServiceConfig`

  ↳ **`GraphQLSitemapServiceConfig`**

## Table of contents

### Properties

- [apiKey](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig#apikey)
- [endpoint](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig#endpoint)
- [pageSize](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig#pagesize)
- [rootItemId](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig#rootitemid)
- [siteName](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig#sitename)
- [templates](/docs/nextjs/ref/interfaces/services_graphql_sitemap_service/graphqlsitemapserviceconfig#templates)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication.

___

### endpoint

• **endpoint**: `string`

Your Graphql endpoint

___

### pageSize

• `Optional` **pageSize**: `number`

Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

**`default`** 10

#### Inherited from

SearchServiceConfig.pageSize

___

### rootItemId

• `Optional` **rootItemId**: `string`

Optional. The ID of the search root item. Fetch items that have this item as an ancestor.

#### Inherited from

SearchServiceConfig.rootItemId

___

### siteName

• **siteName**: `string`

The name of the current Sitecore site. This is used to to determine the search query root
in cases where one is not specified by the caller.

#### Inherited from

SearchServiceConfig.siteName

___

### templates

• `Optional` **templates**: `string`

Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).

#### Inherited from

SearchServiceConfig.templates
