[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLRedirectsServiceConfig

# Type Alias: GraphQLRedirectsServiceConfig

> **GraphQLRedirectsServiceConfig** = [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

Defined in: [packages/sitecore-jss/src/site/graphql-redirects-service.ts:36](https://github.com/Sitecore/jss/blob/49f05cc2548832e88b3947a3b5bd5c20e32dc093/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L36)

## Type Declaration

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

### fetch?

> `optional` **fetch?**: *typeof* `fetch`

Override fetch method. Uses 'GraphQLRequestClient' default otherwise.
