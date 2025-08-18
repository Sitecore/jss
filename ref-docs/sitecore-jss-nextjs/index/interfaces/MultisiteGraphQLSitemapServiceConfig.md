[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / MultisiteGraphQLSitemapServiceConfig

# Interface: MultisiteGraphQLSitemapServiceConfig

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:15](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L15)

Configuration options for

## See

GraphQLSitemapService instances

## Extends

- `BaseGraphQLSitemapServiceConfig`

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../graphql/type-aliases/GraphQLRequestClientFactory.md)

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:152](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L152)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.clientFactory`

***

### enableDisplayNameRouting?

> `optional` **enableDisplayNameRouting**: `boolean`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:147](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L147)

Gets a flag indicating whether display name routing is enabled.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.enableDisplayNameRouting`

***

### excludedPaths?

> `optional` **excludedPaths**: `string`[]

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:91](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L91)

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.excludedPaths`

***

### includedPaths?

> `optional` **includedPaths**: `string`[]

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:87](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L87)

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.includedPaths`

***

### includePersonalizedRoutes?

> `optional` **includePersonalizedRoutes**: `boolean`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:143](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L143)

A flag for whether to include personalized routes in service output.
Only works on XM Cloud for pages using Embedded Personalization (not Component A/B testing).
Turned off by default.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.includePersonalizedRoutes`

***

### pageSize?

> `optional` **pageSize**: `number`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:99](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L99)

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

### sites

> **sites**: `string`[]

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:19](https://github.com/Sitecore/jss/blob/d3bf50b80df4dcadad47358abdcbfeb3a7908b5b/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L19)

Names of the configured sites
