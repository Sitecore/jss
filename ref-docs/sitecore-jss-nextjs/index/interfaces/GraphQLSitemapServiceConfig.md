[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / GraphQLSitemapServiceConfig

# Interface: GraphQLSitemapServiceConfig

Defined in: [sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:21](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L21)

Configuration options for

## See

GraphQLSitemapService instances

## Extends

- `BaseGraphQLSitemapServiceConfig`

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../graphql/type-aliases/GraphQLRequestClientFactory.md)

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:144](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L144)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.clientFactory`

***

### excludedPaths?

> `optional` **excludedPaths**: `string`[]

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:88](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L88)

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.excludedPaths`

***

### includedPaths?

> `optional` **includedPaths**: `string`[]

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:84](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L84)

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.includedPaths`

***

### includePersonalizedRoutes?

> `optional` **includePersonalizedRoutes**: `boolean`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:139](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L139)

A flag for whether to include personalized routes in service output.
Only works on XM Cloud for pages using Embedded Personalization (not Component A/B testing).
Turned off by default.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.includePersonalizedRoutes`

***

### pageSize?

> `optional` **pageSize**: `number`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:96](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L96)

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
100
```

#### Inherited from

`BaseGraphQLSitemapServiceConfig.pageSize`

***

### siteName

> **siteName**: `string`

Defined in: [sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts:25](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss-nextjs/src/services/graphql-sitemap-service.ts#L25)

Name of the site to retrieve site paths for
