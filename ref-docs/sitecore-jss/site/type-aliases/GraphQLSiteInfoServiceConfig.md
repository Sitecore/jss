[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [site](../README.md) / GraphQLSiteInfoServiceConfig

# Type Alias: GraphQLSiteInfoServiceConfig

> **GraphQLSiteInfoServiceConfig**: [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

## Type declaration

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

### pageSize?

> `optional` **pageSize**: `number`

common variable for all GraphQL queries
it will be used for every type of query to regulate result batch size
Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.

#### Default

```ts
10
```

## Defined in

[packages/sitecore-jss/src/site/graphql-siteinfo-service.ts:37](https://github.com/Sitecore/jss/blob/d5a348de45495731b4551f12a8db18ea9a72a20d/packages/sitecore-jss/src/site/graphql-siteinfo-service.ts#L37)
