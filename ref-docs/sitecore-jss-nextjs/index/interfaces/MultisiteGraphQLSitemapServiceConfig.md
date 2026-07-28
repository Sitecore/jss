[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / MultisiteGraphQLSitemapServiceConfig

# Interface: MultisiteGraphQLSitemapServiceConfig

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:15](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L15)

Configuration options for

## See

GraphQLSitemapService instances

## Extends

- `BaseGraphQLSitemapServiceConfig`

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../graphql/type-aliases/GraphQLRequestClientFactory.md)

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:120](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L120)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.clientFactory`

***

### excludedPaths?

> `optional` **excludedPaths?**: `string`[]

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:75](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L75)

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.excludedPaths`

***

### includedPaths?

> `optional` **includedPaths?**: `string`[]

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:71](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L71)

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.includedPaths`

***

### pageSize?

> `optional` **pageSize?**: `number`

Defined in: [sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:83](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L83)

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

Defined in: [sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:19](https://github.com/Sitecore/jss/blob/6a2141b19499db8b9d9ff2b68d0840d689bed5d8/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L19)

Names of the configured sites
