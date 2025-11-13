[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [personalize](../README.md) / GraphQLPersonalizeServiceConfig

# Type Alias: GraphQLPersonalizeServiceConfig

> **GraphQLPersonalizeServiceConfig** = [`CacheOptions`](../../index/interfaces/CacheOptions.md) & `object`

Defined in: [packages/sitecore-jss/src/personalize/graphql-personalize-service.ts:6](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss/src/personalize/graphql-personalize-service.ts#L6)

## Type declaration

### clientFactory

> **clientFactory**: [`GraphQLRequestClientFactory`](../../index/type-aliases/GraphQLRequestClientFactory.md)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

### fetch?

> `optional` **fetch**: *typeof* `fetch`

Override fetch method. Uses 'GraphQLRequestClient' default otherwise.

### ~~scope?~~

> `optional` **scope**: `string`

Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments

#### Deprecated

Will be removed in a future release.

### timeout?

> `optional` **timeout**: `number`

Timeout (ms) for the Personalize request. Default is 400.
