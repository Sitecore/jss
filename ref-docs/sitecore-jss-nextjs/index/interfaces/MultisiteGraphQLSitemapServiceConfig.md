[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / MultisiteGraphQLSitemapServiceConfig

# Interface: MultisiteGraphQLSitemapServiceConfig

Configuration options for

## See

GraphQLSitemapService instances

## Extends

- `BaseGraphQLSitemapServiceConfig`

## Properties

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../graphql/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.clientFactory`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:144](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L144)

***

### excludedPaths?

> `optional` **excludedPaths**: `string`[]

Optional. Paths starting with these provided prefixes will be excluded from returned results.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.excludedPaths`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:88](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L88)

***

### includedPaths?

> `optional` **includedPaths**: `string`[]

Optional. Only paths starting with these provided prefixes will be returned.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.includedPaths`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:84](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L84)

***

### includePersonalizedRoutes?

> `optional` **includePersonalizedRoutes**: `boolean`

A flag for whether to include personalized routes in service output.
Only works on XM Cloud for pages using Embedded Personalization (not Component A/B testing).
Turned off by default.

#### Inherited from

`BaseGraphQLSitemapServiceConfig.includePersonalizedRoutes`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:139](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L139)

***

### pageSize?

> `optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
100
```

#### Inherited from

`BaseGraphQLSitemapServiceConfig.pageSize`

#### Defined in

[sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts:96](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/services/base-graphql-sitemap-service.ts#L96)

***

### sites

> **sites**: `string`[]

Names of the configured sites

#### Defined in

[sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts:19](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-nextjs/src/services/mutisite-graphql-sitemap-service.ts#L19)