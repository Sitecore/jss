[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLRedirectsServiceConfig

# Type Alias: GraphQLRedirectsServiceConfig

> **GraphQLRedirectsServiceConfig**: [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

## Type declaration

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

### fetch?

> `optional` **fetch**: *typeof* `fetch`

Override fetch method. Uses 'GraphQLRequestClient' default otherwise.

## Defined in

[packages/sitecore-jss/src/site/graphql-redirects-service.ts:36](https://github.com/Sitecore/jss/blob/89250cb6aff62e727af20469a4fd43db5c3c8052/packages/sitecore-jss/src/site/graphql-redirects-service.ts#L36)
